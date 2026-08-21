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

## 六、注意事项与常见问题

**1. 默认忽略隐藏文件与 .gitignore 内容**

新手常惊讶为什么搜不到 `node_modules` 或 `.env` 里的内容——这是 ripgrep 的**默认行为**。需要时显式加 `-uu`（全部扫描）或 `--hidden`（仅包含隐藏文件）。

**2. 正则语法是 Rust 风格（非 PCRE）**

ripgrep 默认不支持 `\d` 等 PCRE 语法，会报错或按字面匹配。要完整回溯引用需加 `-P` / `--pcre2` 启用 PCRE2：

```bash
rg -P "(?<year>\d{4})-\1" file.txt
```

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