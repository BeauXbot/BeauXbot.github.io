---
title: tldr
icon: gauge
category:
  - 工具
  - 帮助文档
tag:
  - 系统效率
  - tldr
---

# tldr（简化的命令手册（community cheatsheets））

> Homebrew 版本 1.0 ｜ 主页：见官方文档 ｜ 安装：`brew install tldr`

## 一、它是什么

tldr（Too Long; Didn't Read）是一个"简化的命令行手册"工具：它把 Linux/Unix 命令的官方 `man` 手册浓缩成一张张**精简的速查表（cheatsheet）**，只保留最常用、最实用的参数和示例，让你一眼就能上手某个命令，而不是在几千行的 man 手册里大海捞针。它解决的是"知道有某个命令但记不住用法""懒得翻 man 手册"的痛点，典型应用场景是：快速复习 `tar`、`git`、`awk` 等常用命令的常见组合，或在新装的服务器上快速确认某个工具怎么用。

## 二、安装与升级

```bash
# 安装
brew install tldr

# 升级
brew upgrade tldr

# 卸载
brew uninstall tldr

# 验证安装成功（查看版本）
tldr --version
```

安装后 `tldr` 即进入 PATH，直接可全局调用。若之前用 `npm install -g tldr` 装过别的实现，建议先卸载旧版再 `brew install` 以免命令冲突。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `tldr 命令名` | 查看某个命令的简化手册 | `tldr tar` |
| `-p, --platform=平台` | 指定操作系统平台（linux / osx / sunos / windows / common） | `tldr -p osx open` |
| `-r, --render=路径` | 渲染本地的手册文件（用于测试/自建） | `tldr -r ./mypage.md tar` |
| `-u, --update` | 更新本地手册数据库 | `tldr --update` |
| `-c, --clear-cache` | 清空本地数据库缓存 | `tldr --clear-cache` |
| `-l, --list` | 列出本地数据库里的全部命令条目 | `tldr --list` |
| `-C, --color` | 强制彩色输出 | `tldr -C git` |
| `-V, --verbose` | 更新/清空缓存时显示详细过程 | `tldr -u -V` |
| `-L, --language=语言` | 指定输出语言（如 `zh`、`en`），优先级高于平台默认 | `tldr -L zh git` |
| `-e, --example=编号` | 只显示某个示例（多用于脚本解析） | `tldr -e 2 tar` |
| `-a, --show-all` | 显示所有平台/语言的所有版本（`--update` 时全部拉取） | `tldr -a git` |
| `--source=来源` | 指定数据源（官方仓库 / 镜像 / 自建服务器） | `tldr --source 镜像 tldr` |

> 提示：`-V`（大写）是 verbose，`-v`（小写）才是版本号。

## 四、实际示例

### 示例 1：查看 `tar` 命令的常用用法

```bash
# 准备：无需任何准备，tldr 首次使用时会自动下载数据库
tldr tar
```

输出形如：

```
tar

  Archiving utility. Often combined with a compression method, such as gzip or bzip.
  More information: https://www.gnu.org/software/tar/.

  - Create an archive from files:
      tar cf target.tar file1 file2 file3

  - Create a gzipped archive:
      tar czf target.tar.gz file1 file2 file3

  - Extract a (compressed) archive into the current directory:
      tar xzf source.tar.gz
  ...
```

### 示例 2：按平台查看（macOS 与 Linux 命令差异）

```bash
# macOS 上查看 open 命令的速查（open 是 mac 专属）
tldr -p osx open

# 查看 Linux 平台下的 ifconfig（不同平台参数不同）
tldr -p linux ifconfig
```

### 示例 3：更新缓存并查看全部可用命令

```bash
# 更新本地数据库到最新
tldr --update

# 列出本地已有全部命令条目（方便发现新工具）
tldr --list
```

### 示例 4：快速对比多个相似命令

```bash
# 一口气查三个压缩/归档相关命令，快速对比用法
tldr tar && tldr zip && tldr gzip
```

## 五、进阶技巧与配置

**1. 用 shell 别名绑定常用命令速查**

在 `~/.zshrc` 或 `~/.bashrc` 里加：

```bash
alias tl='tldr'        # 少敲几个字
alias man2='tldr'      # 把 tldr 当"精简 man"用
alias t2='tldr -L zh'  # 默认中文输出
```

**2. 与 `which`/`command -v` 搭配快速查工具**

```bash
# 先确认命令确实存在，再查用法
command -v jq && tldr jq

# 查可执行文件的实际位置，避免查到别名/内置命令
which -a docker
```

**3. 与 fzf 联动，本地数据库交互式浏览**

```bash
# 用 fzf 在本地命令列表里模糊选择再查看
tldr --list | fzf | xargs -I{} tldr {}

# 带预览窗口（先看前几行再决定）
tldr --list | fzf --preview 'tldr {} 2>/dev/null' | xargs -I{} tldr {}
```

**4. 数据库与缓存管理**

- 首次运行 `tldr` 时自动下载数据库并缓存到本地；之后离线也能查。
- 若内容过旧或想强制刷新，运行 `tldr --update`。
- 清理缓存用 `tldr --clear-cache`，配合 `-V` 可看清理了哪些文件。
- Homebrew 版的数据库默认放在 Homebrew 缓存目录下，一般无需手动干预。

**5. 环境变量配置（TDLR 系列）**

tldr 客户端大量行为通过环境变量控制，常用如下：

```bash
# 指定数据库目录（默认在缓存目录，可自定义到 ~/.config/tldr）
export TLDR_CACHE_DIR="$HOME/.config/tldr"

# 指定 tldr 客户端实现（可选 homebrew、node、python 等）
export TLDR_PLATFORM=linux      # 强制平台
export TLDR_LANGUAGE=zh         # 强制语言，效果等同 -L zh

# 指定自定义数据源（官方 / 镜像 / 自建 tldr 服务）
# 不同客户端变量名略有差异，常见有 TLDR_SOURCE / TLDR_MIRROR
export TLDR_SOURCE=https://tldr.mirror.example.com

# 关闭颜色或强制颜色
export NO_COLOR=1
```

写进 `~/.zshrc` 后，所有 tldr 调用自动生效，无需每次加参数。

**6. 常用配置项速查（`tldr --help` 可全量查看）**

| 配置项 | 作用 | 示例 |
| --- | --- | --- |
| `--language` | 输出语言 | `tldr --language zh git` |
| `--platform` | 输出平台 | `tldr --platform osx open` |
| `--source` | 数据源 | `tldr --source 镜像 tar` |
| `--example` | 只显示指定序号示例 | `tldr --example 3 tar` |
| `--show-all` | 显示全部平台/语言版本 | `tldr --show-all git` |
| `--color` | 强制颜色 | `tldr --color tar` |
| `--no-color` | 关闭颜色（管道脚本场景） | `tldr --no-color tar` |

**7. 本地渲染与自建条目测试**

```bash
# 渲染一个尚未进库的手写 md 文件，验证格式再提交
tldr -r ./mypage.md tar
```

**8. 个性化：自定义 logo / 配色**

tldr 客户端本身不渲染 logo，但你可结合 `bat` 给输出套一层主题色，或用一个 wrapper 函数统一风格：

```bash
# 给 tldr 套 bat 主题（先 brew install bat）
tldr-bat() { tldr "$@" | bat --language=man --style=grid; }
```

**9. 深入：平台命令差异的正确处理**

tldr 的速查表按平台细分（`linux` / `osx` / `sunos` / `windows` / `common`），**同名命令在不同平台参数往往不同**，这是新手最容易踩的坑：

**① 先看当前平台默认走哪个**

macOS 上跑 `tldr sed`，默认查的是 `osx` 平台页；Linux 上跑则是 `linux` 页。两个页面的 `sed -i` 用法**截然不同**（macOS BSD 版要 `-i.bak`，GNU 版直接 `-i`）。

```bash
# macOS 上显式指定 Linux 页，看 GNU 用法
tldr -p linux sed

# 显示该命令在所有平台的所有页面，逐一对比差异
tldr -a sed
```

**② 用 `-a` 看"同一个命令的所有平台版本"**

`tldr -a 命令名` 会把 `linux`、`osx`、`windows` 的页面**全部展开**，是对比"跨平台命令差异"的最快方式。写脚本要跨平台时，先 `-a` 对比参数再写，能避免大量返工。

**③ 给"常用但有平台差异"的命令建别名**

```bash
# 在 mac 上做 GNU 风格替换，先装 gsed 再定义
alias sed='gsed'            # GNU sed（需 brew install gnu-sed）
alias tldr-sed='tldr -p linux sed'   # 直接查 GNU 页
```

**④ 平台页缺失时的兜底**

某命令只有 `linux` 页没有 `osx` 页时，mac 上直接 `tldr cmd` 会提示找不到。此时：

```bash
# 显式指定有页的平台（如 linux）
tldr -p linux apt
# 或强制只查 common 公共页
tldr -p common env
```

**10. 深入：自建 / 私有 tldr 页面**

**① 原理**：tldr 页面本质是带约定格式的 Markdown 文件，放在本地目录或自建服务器，客户端用 `--source` 指向即可。这让你能维护**团队内部私有命令**的速查表，甚至补全社区没有的冷门命令。

**② 约定格式（必须是这个结构，否则渲染报错）**：

```markdown
# cmdname

> 一行简介。支持 [链接](https://example.com)。

- 第一个示例：描述

`cmdname --flag arg1`

- 第二个示例：描述

`cmdname subcommand arg2`

- 更多信息: <https://example.com>
```

写完后用 `-r` 本地渲染验证：

```bash
tldr -r ./mydoc.md          # 渲染本地页面，检查格式是否合法
```

**③ 本地私有页目录 + 自动追加到查询链**

不同客户端支持程度不同，常见的做法是把私有页放进一个目录，再封装成函数，让 `tldr` 查不到公共页时回退到私有页：

```bash
# ~/.zshrc —— 团队私有速查封装
mytldr() {
  local page="$1"
  if [ -f "$HOME/.tldr-local/$1.md" ]; then
    tldr -r "$HOME/.tldr-local/$1.md"   # 命中私有页则渲染本地
  else
    tldr "$@"                            # 否则走公共库
  fi
}
# 用法：mytldr deploy  —— 先查私有页，没有再走公共库
```

**④ 自建 HTTP 源**

若公司内网有统一速查服务器，可用 `--source` 指向：

```bash
# 指向自建 tldr 服务（需按 tldr 的 zip/md 结构提供服务）
tldr --source https://tldr.internal.example.com --update
```

**⑤ 用 `-e` 只取某条示例，供脚本复用**

```bash
# 只显示第 2 条示例（脚本提取命令体）
tldr -e 2 tar
```

**11. 深入：脚本搭配（把 tldr 当数据源）**

tldr 虽为人类阅读设计，但配合 `-e`/`-N`/`--no-color` 可稳定输出供脚本解析：

```bash
# 关闭颜色 + 关闭行号 + 只取示例，输出最干净
tldr --no-color -N tar

# 取第 1 条示例的命令体（缩进行），供脚本复用
tldr --no-color tar | sed -n 's/^  \(.*\)$/\1/p' | grep -v '^$' | head -1

# 判断某命令是否有速查页（脚本门禁用）
if tldr "$cmd" >/dev/null 2>&1; then echo "has page"; else echo "missing"; fi
```

**12. 与其它工具搭配速查**

```bash
# 查 man 太冗长时，先 tldr 快速上手
# 想深入再 man 看权威细节 —— 组合成"速查漏斗"
alias quick='tldr $1 && echo "—— 想深入请 man '$1'"'

# 与 fzf 联动：交互式翻本地命令库
tldr --list | fzf --preview 'tldr {} 2>/dev/null' | xargs tldr

# 与脚本批处理：批量抽查一批命令是否有速查
for cmd in git awk sed jq curl; do tldr "$cmd" >/dev/null 2>&1 && echo "OK $cmd" || echo "MISS $cmd"; done
```

## 六、注意事项与常见问题

**1. 首次使用需要联网**

第一次运行 `tldr` 会从网络拉取数据库，如果没网或代理配置不对，会报错或卡住。解决办法：检查网络/代理后重试，或先 `tldr --update` 手动触发下载。

**2. `-v` 与 `-V` 别搞混**

- `tldr -v`：打印版本号。
- `tldr -V`（大写）：配合 `-u`/`-c` 显示详细输出。
新手常把大写当版本号用而报错。

**3. 命令名大小写与平台差异**

tldr 的速查表按平台区分，`osx`（macOS）与 `linux` 的同名命令参数可能不同。在 macOS 上查 Linux 专用命令（如 `apt`）时，记得加 `-p linux` 否则可能提示找不到。

**4. 找不到某个命令**

如果 `tldr foo` 提示找不到，可能原因：
- 该命令确实没有对应的速查表（tldr 覆盖的是社区常见命令）。
- 数据库太旧，先 `tldr --update` 再试。
- 也可以用 `tldr --list | grep foo` 确认是否收录。
- 命令是"别名/内置/函数"而非独立二进制：`type foo` 看来源，`tldr` 只收录有速查页的独立命令。

**5. 它只是速查表，不是完整手册**

tldr 只提供最常用参数，不覆盖 man 的全部细节。遇到边界情况、高级配置或版本差异时，仍应以 `man 命令名` 或官方文档为准——把 tldr 当作"快速上手入口"，man 当作"权威参考"。

**6. 数据库是社区维护的，可能有瑕疵**

tldr 的速查表由 tldr-pages 社区众包维护，个别条目可能过时或不完整。命令行为与预期不符时，多结合 `man` 和 `--version` 交叉核对。

**7. 中文输出不全或乱码**

- 若 `-L zh` 无中文，可能该命令尚未有中文翻译页，退回英文属正常现象。
- 终端编码问题：确认 `$LANG` 为 `UTF-8`（如 `export LANG=en_US.UTF-8`）。

**8. 代理 / 镜像环境拉取失败**

公司内网或受限网络下，`--update` 常超时。解决：
```bash
# 走代理
export HTTPS_PROXY=http://127.0.0.1:7890
# 或切换数据源/镜像
tldr --source 镜像 --update
```

**9. 自建页渲染报错的常见原因**

| 现象 | 原因 | 解决办法 |
| --- | --- | --- |
| `-r` 渲染后格式错乱 | Markdown 标题层级或代码块符号不对 | 严格按"页面约定格式"（`# 名`、`> 简介`、`- 描述` + 代码块） |
| 中文注释乱码 | 文件非 UTF-8 | 确认用 UTF-8 无 BOM 保存 |
| 首行不是 `# 命令名` | 客户端按首行识别命令名 | 保证第一行是 `# 命令名` |
| 代码块未用反引号包裹 | 命令体需在 `` ` `` 反引号内 | 每条示例的命令行用反引号包住 |

**10. 性能 / 安全注意**

- 日常查询走本地缓存、离线可查，几乎无 IO 开销；不必频繁 `--update`。
- 不要盲目信任脚本里 `tldr` 输出的示例并直接执行——个别示例含占位符或依赖环境，建议先 `man` 确认再跑。
- 若提示需你手动下载一个"压缩包/脚本"，务必核验来源，避免供应链风险。
- **自建源的安全**：用 `--source` 指向自建服务器时，确认该源受控、可信；`--update` 会从该源拉取内容，若被篡改可能诱导执行恶意命令。

## 七、实战：与其它工具搭配与自动化

**1. 与 grep / 脚本配合做命令速查批处理**

```bash
# 一批命令逐个出速查
for cmd in tar gzip zip curl; do tldr $cmd; done

# 只取命令名，便于集成进文档
tldr --list | grep -E '^(git|awk|sed)'

# 提取某条示例的命令体（第二行缩进内容），供脚本复用
tldr tar | sed -n 's/^  \(.*\)$/\1/p' | grep -v '^$'
```

**2. 与 fd 搭配做"新工具速查"巡览**

```bash
# 列出 /usr/local/bin 下常用工具，挨个出速查（可控输出）
for bin in $(fd -t x -d 1 -x basename {} /usr/local/bin | head -30); do
  tldr "$bin" 2>/dev/null
done
```

**3. 与 sed / awk 联用做格式化**

```bash
# 把输出转成 Markdown 用 （粗配，需结合 sed 清洗）
tldr --list | awk '{print "## " $0}' | head

# 去色、去行号后落盘，供离线文档
tldr --no-color tar > tar-cheatsheet.txt
```

**4. Makefile 自动化：新装环境自动灌入速查库**

在项目根目录放 `Makefile`：

```makefile
.PHONY: tldr-setup tldr-refresh tldr-team

tldr-setup:
	command -v tldr >/dev/null || brew install tldr
	tldr --update

tldr-refresh:
	tldr --update && tldr --list | wc -l

# 导出团队常用命令的速查为离线文档
tldr-team:
	mkdir -p docs/cheats
	for c in git docker kubectl make; do tldr --no-color "$$c" > docs/cheats/$$c.md; done
	@echo "已导出到 docs/cheats/"
```

```bash
# 使用
make tldr-setup    # 首次：装 tldr 并拉库
make tldr-refresh  # 后续：刷新并统计条目数
make tldr-team     # 导出团队常用速查为文档
```

**5. CI 集成：在流水线里校验命令速查**

GitHub Actions 示例 `.github/workflows/tldr-check.yml`：

```yaml
name: tldr-check
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: 安装并更新 tldr
        run: |
          sudo apt-get update && sudo apt-get install -y tldr
          tldr --update
      - name: 校验关键命令速查存在
        run: |
          for c in git tar awk jq; do
            tldr "$c" >/dev/null && echo "OK: $c" || { echo "MISSING: $c"; exit 1; }
          done
```

**6. 批量提取+文档生成**

```bash
# 把常用命令速查批量导出为 Markdown 文档，方便团队分享
mkdir -p cheats
for cmd in git curl docker; do
  tldr --no-color "$cmd" > "cheats/$cmd.md"
done
# 生成索引
printf '# 常用速查\n\n' > cheats/README.md
ls cheats/*.md | sed 's#cheats/##;s#\.md$##' | sed 's#^#- []#;s#$#](cheats/&.md)#' >> cheats/README.md
```

**7. 自建团队速查库 + 部署为离线/内网页**

```bash
# 1) 用脚本把常用命令批量导出为本地 Markdown 页
mkdir -p ~/.tldr-local
for c in deploy rollback healthcheck; do
  # 为团队私有命令编写约定格式页面，见第五节"自建页面"
  cat > ~/.tldr-local/$c.md << EOF
# $c

> 团队内部部署命令速查。

- 部署到 staging：\`deploy --env staging\`

- 回滚上一个版本：\`deploy --rollback\`
EOF
done

# 2) 封装 mytldr 函数（见第五节），让私有页优先
# 3) 若团队大，可把私有页推送到自建 HTTP 服务，用 --source 统一分发
```

**8. 生产级实践建议**

- 把 `tldr` 与 `man`、`info`、`help` 组合成"速查漏斗"：`tldr`（快）→ `man`（全）→ `info`（权威）。
- 在团队 onboarding 脚本里预装 tldr 并 `--update`，新成员开箱即用。
- 定期（如每周 cron）`tldr --update`，保持速查不过期：

```bash
# crontab：每周一 3 点刷新
0 3 * * 1 tldr --update >> ~/.local/log/tldr.log 2>&1
```

- 自建内网 tldr 服务时，用 `--source` 指向内部地址，避免公网访问受限并统一版本。
- 把"平台差异提醒"写进团队 wiki：mac/Linux 下 `sed`、`find`、`du`、`tar` 等命令参数差异最大，写脚本前先 `tldr -a 命令` 对比，能省大量调试时间。
- 用 `TLDR_LANGUAGE=zh` + `-L en` 临时切换，兼顾中文速查与英文原版准确性，两头不误。
- 自建页面纳入 git 版本管理，团队私有速查随代码库演进，随人随环境可迁移。