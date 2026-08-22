---
title: ripgrep
icon: gauge
category:
  - 工具
  - 搜索
tag:
  - 系统与效率
  - ripgrep
---

# ripgrep（超高速代码/文本搜索工具）

> Homebrew 版本 15.1.0 ｜ 主页：见官方文档 ｜ 安装：`brew install ripgrep`

## 一、它是什么

ripgrep（命令行名 `rg`）是一个基于 Rust 编写、以**极快**著称的递归正则搜索工具，专门用来在文件树中按内容搜索文本。它利用 Rust 的并行执行和 SIMD 指令集，比 grep、ack、ag 快数倍到数十倍，同时**默认遵守 `.gitignore`**，不会把无关的构建产物、二进制和隐藏文件扫进来。典型应用场景包括：在大型代码仓库里快速定位函数定义与调用、查找 TODO 或某个字符串出现在哪些文件、配合 IDE 或脚本做批量替换前的"找到所有出现位置"。

## 二、安装与升级

```bash
# 安装
brew install ripgrep

# 升级
brew upgrade ripgrep

# 卸载
brew uninstall ripgrep

# 验证安装成功（查看版本）
rg --version
```

安装后 `rg` 即进入 PATH，直接可全局调用。如果之前用 `cargo install` 或源码编译过旧版本，建议先卸载旧版再 `brew install` 以免冲突。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `rg pattern [路径]` | 在路径（默认当前目录）中递归搜索匹配 pattern 的行 | `rg "fn main"` |
| `-i` / `--ignore-case` | 忽略大小写搜索 | `rg -i "todo" src/` |
| `-w` / `--word-regexp` | 只匹配完整单词 | `rg -w "fix"` |
| `-l` / `--files-with-matches` | 只列出包含匹配的文件名 | `rg -l "import" app/` |
| `-c` / `--count` | 统计每个文件的匹配行数 | `rg -c "error" --glob '*.log'` |
| `-n` / `--line-number` | 显示匹配行号（默认已开启） | `rg -n "password"` |
| `-A n` / `-B n` | 输出匹配行后 n 行 / 前 n 行上下文 | `rg -A 3 "func" main.go` |
| `-g` / `--glob` | 按文件名模式过滤（可多个） | `rg "debug" -g '*.rs' -g '!test_*'` |
| `-t` / `--type` | 按文件类型过滤（如 rs、py、js） | `rg "log" -t py` |
| `-uu` / `--no-ignore` | 忽略 .gitignore 等规则全量搜索 | `rg -uu "secret" .` |

## 四、实际示例

### 示例 1：在项目里找函数定义与调用位置

```bash
# 准备：进入一个 Rust 项目目录
cd ~/my-rs-project

# 搜索名为 "handle_request" 的所有出现位置（含行号）
rg "handle_request"

# 只看定义（用正则锚定声明）
rg "^\s*(pub\s+)?fn handle_request"

# 只列出命中文件，适合快速概览
rg -l "handle_request"
```

输出形如：

```
src/server.rs:42:    fn handle_request(req: Request) -> Response {
src/handler.rs:17:    handle_request(req);
```

### 示例 2：跨多种语言查找字符串并统计

```bash
# 准备：在某个多语言仓库的根目录
cd ~/repo

# 忽略大小写、统计每个文件里 "api_key" 出现几行
rg -ic "api_key" --glob '!*.min.js'

# 只想看 Python 和 Go 文件，且附带上下文
rg -A 2 -B 2 "api_key" -g '*.py' -g '*.go'
```

### 示例 3：全量扫描（忽略 .gitignore）排查敏感信息

```bash
# 准备：进入任意目录
cd ~/work

# 强制搜索被忽略的隐藏文件（-uu = 忽略所有忽略规则）
rg -uu "BEGIN PRIVATE KEY" .

# 配合 --hidden 显式包含隐藏文件
rg --hidden "password\s*=" ~/config
```

### 示例 4：与 find/xargs 联动做批量操作

```bash
# 找到所有含 "TODO" 的 .ts 文件，逐一交给编辑器打开
rg -l "TODO" -g '*.ts' | xargs code

# 统计命中文件总数
rg -l "TODO" -g '*.ts' | wc -l
```

## 五、进阶技巧与配置

**1. 用别名简化常用组合**

在 shell 配置（`~/.zshrc` 或 `~/.bashrc`）里加：

```bash
alias rgw='rg -w'          # 全词匹配
alias rgs='rg -i'          # 忽略大小写
alias rgl='rg -l'          # 只列文件名
alias rgc='rg --color=always'   # 强制彩色输出
```

**2. 配合 fzf 做模糊搜索跳转**

```bash
# 先查命中文件，再用 fzf 选择并打开
rg -l "error" --glob '*.js' | fzf | xargs code
```

**3. 自定义默认忽略与文件类型**

在任意目录放 `.ignore` 文件（比 .gitignore 优先且全局生效）：

```text
# .ignore
build/
node_modules/
*.lock
```

还可以在 `~/.config/ripgrep/rc` 里写全局默认参数，例如：

```text
--smart-case
--glob "!*.min.js"
```

**4. 性能提示**

- 优先用 `-t` 指定文件类型、`-g` 限定 glob，能大幅减少扫描量。
- 只搜代码时**不必**用 `-uu`，遵守忽略规则正是 ripgrep 快的原因。
- 结合 `--stats` 查看搜索统计，判断是否扫了过多文件：

```bash
rg "foo" -t rs --stats
```

### 深入：配置文件（`~/.config/ripgrep/rc`）

ripgrep 会在每次运行时**自动加载** `$RIPGREP_CONFIG_PATH` 指向的文件；若该变量未设置，则回退到 `~/.config/ripgrep/rc`（macOS 上即 `$XDG_CONFIG_HOME/ripgrep/rc`）。该文件里每行写一个**命令行参数**（可带值，支持引号与 `#` 注释），相当于每次调用都隐式拼在参数前面。

一个实用的完整配置示例：

```text
# ~/.config/ripgrep/rc
--smart-case                # 全小写查询自动忽略大小写
--hidden                    # 默认也搜隐藏文件（谨慎，扫 .git 等会变慢）
--glob "!.git/*"            # 但排除 .git 内部
--glob "!node_modules/*"    # 排除依赖目录
--glob "!dist/*"
--glob "!build/*"
--glob "!target/*"
--glob "!*.lock"
--colors "line:fg:blue"     # 行号着色为蓝色
--colors "match:fg:yellow"  # 命中内容着色为黄色
--colors "path:fg:green"    # 路径着色为绿色
```

> 注意：`--hidden` 全局开启后，搜索仓库时会连同 `.git` 一起扫，速度明显下降。**不推荐**常开，建议仅在 `rc` 里用 `--glob "!.git/*"` 兜底，或干脆不写 `--hidden`。

**5. 关键环境变量**

| 环境变量 | 作用 |
| --- | --- |
| `RIPGREP_CONFIG_PATH` | 指定自定义配置文件路径（默认 `~/.config/ripgrep/rc`） |
| `RIPGREP_MAX_FILESIZE` | 跳过超过指定大小的文件，例如 `RIPGREP_MAX_FILESIZE=10M` |
| `RIPGREP_SUBMODULES` | 是否搜索 git 子模块（默认忽略） |

设置示例：

```bash
# 全局跳过大于 10MB 的文件（在 ~/.zshrc 里写）
export RIPGREP_MAX_FILESIZE=10M

# 用一份独立配置做敏感信息专项扫描
export RIPGREP_CONFIG_PATH=~/cfg/rg-secrets-rc
```

**6. 更多实用默认参数（适合写进 `rc`）**

```text
--max-columns 120     # 超长行只显示前 120 字符，防止刷屏
--heading            # 用标题分隔不同文件，多文件时更易读
--line-number        # 显示行号（本就默认，但显式写出更明确）
--sort path          # 输出按路径排序（默认按文件系统顺序）
--files-with-matches # 默认只列文件名（若你多数场景只看命中文件）
```

**7. 自定文件类型（`--type-add`）**

对于 ripgrep 不认识的扩展名，可以用 `--type-add` 临时定义，或配合 `rc` 长期生效：

```bash
# 把 .vue 与 .svelte 归入 "html" 类型，便于 -thtml
rg --type-add 'html:*.vue,*.svelte' --type html "onMounted" .

# 自定义一种类型，并立即用它过滤
rg --type-add 'frontend:*.ts,*.tsx,*.jsx' --type frontend "className" src/
```

### 8. 深入：多文件类型的精确控制

ripgrep 的 `-t/--type` 已内置数十种常见类型（`rust`、`py`、`js`、`go`、`ts`、`json`、`md`、`html`、`css`、`c`、`cpp` 等），但真实项目常有多后缀、模板引擎、冷门框架，需要更精细的控制：

**① 用 `-t` 组合多类型（`,` 分隔）**

```bash
# 只搜 JS 和 TS 文件
rg "useEffect" -t js,ts

# 查所有前端源码（js+ts+jsx+tsx+vue+svelte）——先归组再搜
rg --type-add 'web:*.{js,jsx,ts,tsx,vue,svelte}' -t web "api.get" .
```

**② 用 `--type-add` 把扩展名并入已有类型，写入 `rc` 长期生效**

```text
# ~/.config/ripgrep/rc
--type-add 'js:*.mjs,*.cjs'      # 现代 JS 模块后缀并入 js 类型
--type-add 'md:*.mdx'            # MDX 并入 markdown
--type-add 'py:*.pyi'            # 类型存根并入 python
```

写进 `rc` 后，所有 `-t js` / `-t md` 调用自动带上这些扩展名，团队项目多后缀/模板文件的搜索需求被统一满足。

**③ 查看某个类型包含哪些扩展名**

```bash
# 列出内置全部类型及其扩展名（确认 -t 具体涵盖哪些文件）
rg --type-list | grep -E '^(js|ts|html|md)'

# 只列文件（不搜内容），配合 -t 限定类型范围
rg --files -t rs
```

**④ 用 glob 做类型之外的精补**

当扩展名无法覆盖（例如按目录、按文件名模式过滤）时，glob 是 `-t` 的有力补充：

```bash
# 只搜 test 目录下、排除 .snap 快照的 .js 文件
rg "describe(" -g 'test/**/*.js' -g '!*.snap'

# 只搜根目录层级的文件（不深入子目录）
rg "config" -g '*.{json,yaml,yml}' -g '!**/node_modules/**'
```

**⑤ 用 `--iglob` 做大小写不敏感的 glob**

glob 默认大小写敏感，`--iglob` 则忽略大小写，适合跨平台/多命名风格项目：

```bash
rg "token" --iglob '*.{ENV,env,Env}'
```

### 9. 深入：速度优化（让 rg 快到极致）

rg 已很快，但针对巨型仓库/海量文件还能再榨性能：

```bash
# ① 用 -m 限制每个文件最多匹配 N 处，命中即停（大量"找存在"场景极快）
rg -m 1 "TODO" -t rs

# ② 只搜内容中的指定列/字段：用正则锚定行首
rg '^import' -t go                    # 只搜每行开头
rg '\b(v2|v3)\b' --json | jq -r '.data.path.text'

# ③ 跳过大文件（避免扫进 GB 级日志/二进制）
export RIPGREP_MAX_FILESIZE=5M        # 或每次 --max-filesize 5M

# ④ 用 --threads 显式控制并行线程数
rg "pattern" --threads 8              # 默认取 CPU 核数，可用 --threads 1 降噪对比

# ⑤ 跳过耗时目录（编译产物、虚拟环境、.git）
rg "foo" -g '!build/**' -g '!venv/**' -g '!target/**' -g '!.git/**'

# ⑥ 用 --stats 看瓶颈（扫了多少文件/多少字节/耗时）
rg "foo" -t rs --stats
# 输出示例：
#   1 matches
#   34 matched lines
#   2 files contained matches
#   402 files searched
#   209164 bytes searched
#   0.148834 seconds
```

**速度优化的核心思路**：让 rg 扫描的**文件更少**（用 `-t`/`-g` 收窄）、**单文件更快**（`-m` 提前退出）、**避开超大/二进制文件**（`--max-filesize`），三条路任意一条都比无脑 `-uu` 全扫快一个数量级。

### 10. 深入：输出格式化的进阶控制

ripgrep 的输出格式化能力远超"打一行匹配"，掌握这些能对接脚本、日志、diff：

**① 颜色控制（`--colors`）**

`--colors` 的完整语法是 `<哪一部分>:<颜色属性>:<值>`，`<哪一部分>` 可选 `path`/`line`/`column`/`match`/`match_context`，`<颜色属性>` 可选 `fg`/`bg`/`style`：

```bash
# 命中文字加粗红底，路径青蓝，行号紫色
rg "error" --colors 'match:fg:red' \
           --colors 'match:style:bold' \
           --colors 'path:fg:cyan' \
           --colors 'line:fg:magenta'

# 关闭某部分颜色
rg "foo" --colors 'match:none'

# 只看 256 色序号：fg:1 到 fg:255
rg "foo" --colors 'match:fg:196'
```

**② 列号与列定位（`--column`）**

默认输出 `文件:行号:内容`，加 `--column` 得到 `文件:行号:列号:内容`，可直接喂给编辑器 `vim file:line:col`：

```bash
rg --column "foo" -t rs | head -3
# 输出：src/main.rs:12:5:    let foo = 1;
```

**③ 空分隔符模式（`-0`）配合 xargs**

文件名可能含空格/换行时，用 `-0`（NUL 分隔）与 `xargs -0` 配对，最安全：

```bash
rg -l -0 "TODO" -g '*.ts' | xargs -0 code
```

**④ 上下文分隔（`--context-separator`）**

`-A/-B/-C` 输出多文件上下文时，用 `--context-separator` 自定义块分隔线：

```bash
rg -C 2 "func" --context-separator '-----' -t go
```

**⑤ 用 `-o` + `--replace` 做"提取"型任务**

`-o` 只输出命中片段，配合 `--replace` 改写，适合抽取/清洗文本：

```bash
# 抽取所有链接地址
rg -o 'href="[^"]+"' index.html

# 把命中片段包上引号或标签
rg -o --replace '<$0>' 'https?://[^ ]+' readme.md

# 统计某类单词出现次数
rg -o '\b[a-z]+\b' file.txt | sort | uniq -c | sort -rn | head
```

**⑥ JSON 结构化输出（`--json`）**

`--json` 每行输出一个 JSON 对象，含 `type`（`begin`/`match`/`end` 等）、`path`、`lines`、`line_number`、`submatches` 等字段。脚本/CI 精确解析应走 JSON，别解析彩色文本：

```bash
# 交给 jq 过滤出命中路径与行号
rg --json "error" -g '*.go' | jq -r 'select(.type=="match") | [.data.path.text,.data.line_number] | @tsv'
```

### 11. 深入：与 sed / fd / awk 的搭配实战

**① rg 定位 + sed 替换（批量重构最常用）**

先 dry-run、再替换、后清理备份，全程三件套，避免误改：

```bash
# 第一步：确认命中的文件与行
rg -l "old_api(" -g '*.py'

# 第二步：dry-run，打印将被替换的内容
sed -n 's/old_api(/new_api(/gp' $(rg -l "old_api(" -g '*.py')

# 第三步：确认无误后再真正写回（-i 原地替换，macOS 需显式备份后缀）
rg -l "old_api(" -g '*.py' | xargs sed -i.bak 's/old_api(/new_api(/g'

# 清理备份文件
rg -l "old_api(" -g '*.py' | xargs -I{} rm -f {}.bak
```

> 注意 macOS 自带 BSD sed 的 `-i` 必须带后缀（`-i.bak`），与 GNU sed 的 `-i` 行为不同。若脚本要跨平台，可用 `perl -pi -e` 替代，或装 GNU 版 `gsed`。

**② fd 按文件名定位 + rg 按内容定位，组合成"精确地图"**

`fd`（Rust 的 find 替代）专司"按文件名/元数据找文件"，rg 专司"按内容找行"，两者配合可把搜索范围收到极精准：

```bash
# 只在 2024 年的日志文件里搜 "ERROR"
fd '2024.*\.log$' logs/ | xargs rg -n "ERROR"

# 只搜 src 下超过 10KB 的 .rs 文件里的 "unsafe"
fd -e rs -s '10k' src/ | xargs rg -n "unsafe"

# 只搜最近 7 天改动过的 .ts 文件（fd 无时间过滤时用 find 兜底）
find src -name '*.ts' -mtime -7 | xargs rg -n "TODO"

# 按文件类型找再按内容搜（fd 的 -e 类型过滤 + rg 的 -t）
fd -e json | xargs rg '"host"' | head
```

**③ rg 输出 + awk 做后处理统计**

```bash
# 统计每个文件匹配行数并排序
rg -c "TODO" -g '*.ts' | awk -F: '{print $2, $1}' | sort -rn | head

# 提取并统计某类 token 的 Top N
rg -o '\b(var|let|const)\b' -t js | sort | uniq -c | sort -rn

# 按模块聚合匹配数
rg -c "legacy_api" -g '*.py' | awk -F: '{print $2, $1}'
```

## 六、注意事项与常见问题

**1. 默认忽略隐藏文件与 .gitignore 内容**

新手常惊讶为什么搜不到 `node_modules` 或 `.env` 里的内容——这是 ripgrep 的**默认行为**。需要时显式加 `-uu`（全部扫描）或 `--hidden`（仅包含隐藏文件）。

**2. 正则语法是 Rust 风格（非 PCRE）**

ripgrep 默认不支持 `\d` 等 PCRE 语法，会报错或按字面匹配。要完整回溯引用需加 `-P` / `--pcre2` 启用 PCRE2：

```bash
rg -P "(?<year>\d{4})-\1" file.txt
```

常见"报错但不知道为什么"的写法：

- `\d`、`\w`、`\b` 直接写会报 **unrecognized escape sequence**——这些属于 PCRE 语法，需 `-P`，或用 Rust 风格 `[0-9]`、`[[:word:]]`、`(?<![[:word:]])` 等。
- 使用 `(a|b)` 是**捕获组**，需要**非捕获组**时写 `(?:a|b)`，别把 `?P<name>`（PCRE 命名组）直接套用，除非加 `-P`。
- 若正则里含 `{`、`}` 等字符而报错，先确认是否被 shell 展开，必要时用单引号包裹 pattern。

**3. 输出默认带行号且按路径排序**

与 grep 行为不同，`rg` 默认打印行号。若脚本里需要纯文本输出，用 `-N` / `--no-line-number`。

**4. 大文件与二进制文件**

搜索超大文件（GB 级）时 ripgrep 速度仍快，但内存占用会上升。二进制文件默认被跳过并提示 "binary file matches"，如需处理二进制内容用 `-a` / `--text` 强制按文本处理，谨慎使用以免乱码。

**5. 中文内容搜索**

直接 `rg "关键字"` 即可搜索 UTF-8 中文，无需额外参数。但若文件是 GBK 等非 UTF-8 编码，可能需要先转码或用 `--encoding gbk` 指定编码：

```bash
rg --encoding gbk "中文" oldfile.txt
```

**6. 与系统 grep 的差异**

`rg` 不是 grep 的直接替代品：它更专注代码搜索，缺少数 grep 的流式处理与 POSIX 兼容性。在管道处理文本流（如 `ps aux | rg xx`）时也完全可用，但涉及 `grep -E` 等严格 POSIX 行为时需注意参数差异。

### 进阶排查：为什么"搜不到"

| 现象 | 最可能原因 | 排查与解决 |
| --- | --- | --- |
| 明明文件里有该字符串却搜不到 | 文件被 `.gitignore` / `.ignore` 忽略，或是隐藏文件 | 先 `rg -l pattern --hidden`，再不行 `rg -uu`；检查 `rg --files` 是否能列出该文件 |
| 报 `unrecognized escape sequence` | 用了 PCRE 语法 `\d` 等 | 加 `-P`，或改用 Rust 风格字符类 |
| 报 `unrecognized flag` | 某个参数拼写/缩写错误，或参数顺序有问题 | `rg --help` 查准确拼写；选项应写在 pattern 之前 |
| 结果乱码/空 | 文件是 GBK 等非 UTF-8 编码 | 加 `--encoding gbk` 显式指定编码 |
| 超大仓库扫得太慢 | 没限定文件范围，扫了构建产物 | 用 `-t`/`-g` 缩小范围；确认没在 `rc` 里误开 `--hidden`；用 `--stats` 看扫了多少文件 |
| `binary file matches` 反复出现 | 撞上含二进制字节的文本/日志 | 若确需全文搜索，加 `-a`；否则可忽略该提示 |
| 内存被占满/OOM | 搜索了巨型或未压缩的二进制大文件 | 设 `RIPGREP_MAX_FILESIZE=10M`；改用 `-g '!*.log'` 等排除 |
| `-t js` 搜不到 `.mjs` 文件 | 类型映射未覆盖新后缀 | `--type-add 'js:*.mjs'` 或加 glob |
| 路径里含空格导致 xargs 报错 | xargs 默认按空格分词 | 用 `rg -0` + `xargs -0` 配对 |
| 文件名中文乱码 | 终端/文件编码非 UTF-8 | 确认 `$LANG` 为 UTF-8；用 `--encoding` 指定源编码 |

**7. 性能与安全注意点**

- **不要把 `-uu` 当默认**：它无视所有忽略规则，会让扫描量暴增，也可能扫入 `.git`、密钥目录等不该看的内容。只在有明确需求时对**指定目录**使用。
- **搜"根目录全盘"要克制**：`rg xxx /` 会扫遍整个磁盘，极慢且无必要。先 `cd` 到目标子目录再搜。
- **注意 `-P`（PCRE2）的性能**：`-P` 启用后性能显著低于默认引擎。能不用回溯就尽量用默认正则；确认必须用时再开。
- **敏感信息扫描要带范围**：排查密钥、Token 时，先想清楚要扫哪些目录，用 `-g` 收窄，避免误报与泄露面扩大。
- **小心 shell 特殊字符**：`!`、`$`、`*`、`(` 等在未加引号时会被 shell 解释。pattern 一律加单引号可避开大部分坑。
- **批量替换前务必 dry-run + 备份**：`rg` 只负责定位，写回用 `sed -i`；正式操作前先在 `sed -n 's/.../.../gp'` 演练，并保留 `.bak` 备份，防手滑误改。
- **大仓库别开 `--heading` 后管道给脚本**：heading 输出含控制字符，脚本解析请用 `--json` 或 `-N` 纯文本。

## 七、实战：与其它工具搭配与自动化

### 1. 与 fd 搭配（"先找文件，再搜内容"）

`fd` 是同类 Rust 工具，专司"按文件名找"。两者组合可精确控制"在哪一类文件里搜"：

```bash
# 只在 2024 年的日志文件里搜 "ERROR"
fd '2024.*\.log$' logs/ | xargs rg -n "ERROR"

# 只搜 src 下超过 10KB 的 .rs 文件里的 "unsafe"
fd -e rs -s '10k' src/ | xargs rg -n "unsafe"

# 只搜最近 7 天改动过的 .ts 文件（fd 无时间过滤时用 find 兜底）
find src -name '*.ts' -mtime -7 | xargs rg -n "TODO"
```

### 2. 与 sed 搭配（先定位，再精确替换）

rg 定位 + sed 批量替换是常见组合，但要**先 dry-run 确认**：

```bash
# 第一步：确认命中的文件与行
rg -l "old_api(" -g '*.py'

# 第二步：dry-run，打印将被替换的内容
sed -n 's/old_api(/new_api(/gp' $(rg -l "old_api(" -g '*.py')

# 第三步：确认无误后再真正写回（-i 原地替换，macOS 需显式备份后缀）
rg -l "old_api(" -g '*.py' | xargs sed -i.bak 's/old_api(/new_api(/g'

# 清理备份文件
rg -l "old_api(" -g '*.py' | xargs -I{} rm -f {}.bak
```

> 注意 macOS 自带 BSD sed 的 `-i` 必须带后缀（`-i.bak`），与 GNU sed 的 `-i` 行为不同。若脚本要跨平台，可用 `perl -pi -e` 替代，或装 GNU 版 `gsed`。

### 3. 与 fzf 形成"搜索 → 选择 → 打开"流水线

把命中文件交给 fzf 交互选择，回车即打开：

```bash
# 定义到 shell 里当函数用（写入 ~/.zshrc）
rgopen() {
  local f
  f=$(rg -l "$1" ${2:-.} | fzf --preview 'rg -n "$1" {}')
  [ -n "$f" ] && $EDITOR "$f"
}
# 用法：rgopen "handle_request" src/
```

配合 `--preview` 还能实时预览命中上下文，无需打开文件即可判断是否要找的目标。

### 4. 与 bat 搭配美化输出

`bat` 是带语法高亮的 cat 替代品，`rg` 的 JSON 输出可配合解析，或直接流水到 bat：

```bash
# 用 bat 的高亮阅读多文件命中结果（手动给文件名加分隔）
rg -n "error" -g '*.rs' | bat

# 若装了 delta（git 高亮 diff 工具），可做更花哨的输出
# export RIPGREP_CONFIG_PATH=~/cfg/rg-bat-rc  # 里面写 --colors 等
```

### 5. 写进 Makefile 自动化

把常用搜索固化为 target，团队一致化：

```makefile
.PHONY: search search-todo check-secrets

# 用法：make search q="TODO"
search:
	rg -n --heading "$(q)" .

search-todo:
	rg -n "TODO|FIXME|HACK" --glob '!vendor/*' --glob '!node_modules/*' .

check-secrets:
	rg -uu -l -e "BEGIN (RSA|OPENSSH|EC) PRIVATE KEY" -e "sk-[A-Za-z0-9]{20,}" . \
		&& echo "!! 发现疑似密钥，请处理" && exit 1 || echo "OK：未发现密钥"
```

```bash
# 调用
make search q="fixme"
make check-secrets
```

### 6. CI 集成（作为静态检查门禁）

在 GitHub Actions 等 CI 里，让 rg 作为"门禁"：搜到敏感信息就让构建失败。

```yaml
# .github/workflows/secret-scan.yml
name: Secret scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install ripgrep
        run: sudo apt-get install -y ripgrep   # 或 cargo install ripgrep
      - name: Scan for leaked secrets
        run: |
          if rg -uu -n -e 'BEGIN PRIVATE KEY' \
                     -e 'AKIA[0-9A-Z]{16}' \
                     -e 'sk-[A-Za-z0-9]{20,}' \
                     --glob '!.git/*' .; then
            echo "::error::检测到疑似密钥泄露，请立即处理"
            exit 1
          else
            echo "::notice::未发现疑似密钥"
          fi
```

> CI 中也可复用 Makefile 的 `check-secrets` target：`make check-secrets`。

### 7. 批量统计与巡检

```bash
# 统计各模块 TODO 数量，辅助排期
for d in src/services src/controllers src/models; do
  printf "%-20s %s\n" "$d" "$(rg -c 'TODO' $d -g '*.ts' | awk -F: '{s+=$2} END{print s+0}')"
done

# 找出重复的 import（同文件出现两次同名模块，示意）
rg -o '^import\s+[A-Za-z0-9_]+' -g '*.go' | sort | uniq -d

# 列出引用某即将废弃 API 的所有文件，供迁移
rg -l "LegacyClient\(" -t js,ts | sort > legacy_users.txt
wc -l legacy_users.txt
```

### 8. 用 rg 做代码规范/未使用依赖门禁

把 rg 接入 lint 流程，可拦截"引用了但未声明的符号"等低级问题（示意）：

```bash
# 检查是否有直接拼错/漏配的引用（配合类型系统可减少误报）
rg -n "from ['\"]\.\./v1" -g '*.ts' | grep -v 'v1/index' || echo "无残留 v1 引用"

# 检查硬编码密钥（简单版，CI 可挂）
rg -n "(password|api_key|token)\s*=\s*['\"][^'\"]+['\"]" -g '!*.test.*' -g '!*.md'
```

### 9. 生产级实践建议

- **配置单一化**：把常用参数收敛进 `~/.config/ripgrep/rc`，团队可把该文件纳入 dotfiles 仓库版本管理，跨机一致。
- **用 `--json` 对接脚本**：需要精确解析（行号、列号、上下文、匹配片段）时走 JSON，比解析彩色文本稳得多。
- **给"危险操作"设保护**：用别名或脚本包裹替换类命令，强制先 dry-run、自动备份，避免误删/误改。
- **配合 CI 固定版本**：锁定 ripgrep 版本号（如 `brew list --versions ripgrep`），CI 用固定版本，保证行为一致。
- **善用 `--stats` 建立基线**：定期跑 `rg --stats` 记录扫描文件数/耗时，异常增长说明忽略了规则被误改或仓库膨胀，可及早发现。
- **把"类型 + glob + 大文件上限"写进 `rc`**：团队统一后，人人搜索都又快又准，还能避免误扫构建产物。
- **给替换类操作加"保护别名"**：例如用 `alias rg-sed-safe` 包裹"先 dry-run + 自动备份"的完整流程，杜绝裸 `sed -i` 事故。