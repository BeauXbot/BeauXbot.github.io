---
title: tectonic
icon: book
category:
  - 工具
  - 排版
tag:
  - 文档与排版
  - tectonic
---

# tectonic（自包含的现代 TeX/LaTeX 引擎）

> Homebrew 版本 0.15.0 ｜ 主页：见官方文档 ｜ 安装：`brew install tectonic`

## 一、它是什么

tectonic 是一个自包含（self-contained）、基于 WebAssembly 重构的现代 TeX/LaTeX 排版引擎。它把完整的一整套 TeX 发行版（包括全部宏包、字体、格式文件）打包进单个二进制中，并在首次编译时自动从网络拉取所需资源，彻底省去传统 TeX Live 那套庞大的安装与配置流程。

它主要解决传统 LaTeX 环境安装繁琐、依赖混乱、跨机器不一致的问题，适合用于自动化文档构建（CI/CD）、快速写论文/报告/简历，以及把排版能力嵌入到脚本或编程语言中。典型场景包括：在 GitHub Actions 里自动编译 PDF、用一条命令在无 TeX Live 的服务器上编译 LaTeX 文档。

## 二、安装与升级

通过 Homebrew 安装：

```bash
# 安装
brew install tectonic

# 升级到最新版本
brew upgrade tectonic

# 卸载
brew uninstall tectonic
```

验证安装是否成功（应输出版本号 0.15.0）：

```bash
tectonic --version
# 输出示例：
# tectonic 0.15.0
# Copyright (C) 2016-2024 ...
```

查看帮助与子命令：

```bash
tectonic --help
```

## 三、常用命令速查

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `tectonic FILE.tex` | 编译单个 LaTeX 文档为 PDF（最常用） | `tectonic main.tex` |
| `tectonic --keep-logs FILE.tex` | 编译后保留日志文件 | `tectonic --keep-logs main.tex` |
| `tectonic -o out.pdf FILE.tex` | 指定输出 PDF 的文件名 | `tectonic -o report.pdf main.tex` |
| `tectonic --outdir DIR FILE.tex` | 指定输出目录 | `tectonic --outdir build main.tex` |
| `tectonic --print FILE.tex` | 输出文档正文（去排版）的文本 | `tectonic --print main.tex` |
| `tectonic --compile-all FILE.tex` | 完整编译（不跳过辅助文件/多次传递） | `tectonic --compile-all thesis.tex` |
| `tectonic --help` | 显示全部选项 | `tectonic --help` |
| `tectonic --version` | 显示版本号 | `tectonic --version` |
| `tectonic --chatter minimal FILE.tex` | 减少输出信息（安静模式） | `tectonic --chatter minimal main.tex` |
| `tectonic -X new NAME` | 创建带项目骨架的新文档目录 | `tectonic -X new thesis` |
| `tectonic -X init` | 在当前空目录初始化项目 | `tectonic -X init` |
| `tectonic -X watch` | 监听源文件变化自动编译 | `tectonic -X watch` |
| `tectonic -X build` | 在项目内按配置构建文档 | `tectonic -X build --open` |
| `tectonic -X bundle search KEY` | 在项目资源包中搜索文件 | `tectonic -X bundle search .bib` |
| `tectonic -X dump FILE` | 输出中间文件（aux/toc/log） | `tectonic -X dump main.aux` |
| `tectonic -X show user-cache-dir` | 打印默认缓存目录路径 | `tectonic -X show user-cache-dir` |

> 说明：`-o` 与 `--outdir` 是 0.15.x 新引入的输出选项；旧版部分行为（如往 `tectonic_aux_files` 目录写中间文件）在新版本中已统一收敛到 `--outdir`/`--keep-logs` 等机制。`-X` 是 0.15 起的实验性子命令体系，详见文末 7.7 节。

## 四、实际示例

### 示例 1：最小文档快速出 PDF

准备一个最小 LaTeX 文件：

```bash
# 创建 main.tex
cat > main.tex <<'EOF'
\documentclass{article}
\begin{document}
Hello, Tectonic! This is a self-contained modern LaTeX engine.
\end{document}
EOF

# 编译（首次会自动下载缺失的宏包与格式文件）
tectonic main.tex
```

执行后会生成 `main.pdf`。首次运行 tectonic 会在后台下载 `format` 与所需宏包并缓存到本地，之后再次编译即为纯离线、秒级完成。

### 示例 2：生成带图片与公式的完整报告

```bash
cat > report.tex <<'EOF'
\documentclass[a4paper,11pt]{article}
\usepackage{graphicx}
\usepackage{amsmath}
\begin{document}
\section*{结果}

欧拉公式：
\begin{equation}
e^{i\pi} + 1 = 0
\end{equation}

插图（假设存在 figure.png）：
\begin{center}
\includegraphics[width=0.5\textwidth]{figure.png}
\end{center}
\end{document}
EOF

# 指定输出文件名
tectonic -o report.pdf report.tex
```

用 `\usepackage{graphicx}`、`\usepackage{amsmath}` 等常用宏包时无需手动安装，tectonic 会自动按需拉取。

### 示例 3：用 `--print` 提取纯文本内容

用于快速核对文档正文或做全文检索：

```bash
tectonic --print report.tex
# 会输出去除了排版标记的纯文本，便于 grep 检索
```

### 示例 4：在 CI 中自动化编译

```bash
# 在 GitHub Actions / 本地脚本中一行搞定，无需安装 TeX Live
tectonic --outdir dist --keep-logs main.tex
```

配合 `--outdir` 把产物集中到 `dist/`，配合 `--keep-logs` 保留编译日志便于排查错误。

## 五、进阶技巧与配置

### 5.1 使用 `.tectonictoml` 配置文件

tectonic 支持在项目根目录放置 `Tectonic.toml` 或 `.tectonictoml` 文件来固化构建选项，之后直接 `tectonic` 即可按配置编译，无需每次敲一长串参数。这是一个真实的、开箱即用的最小配置：

```toml
# Tectonic.toml —— 放在项目根目录
[files]
default = "main.tex"        # 无参数运行 tectonic 时默认编译的文件

[build]
output_dir = "build"        # 产物与中间文件统一输出到 build/
chatter = "minimal"         # 安静模式，减少日志噪音
keep_logs = true            # 保留 .log 便于排查错误
keep_aux_files = false      # 不保留 .aux/.toc/.bbl 等中间文件
shell_escape = false        # 保持默认关闭，编译不可信文档更安全
synctex = true              # 生成 SyncTeX 映射，配合编辑器反向定位

[build.latex]               # 可选：覆盖特定编译通道
```

配置后即可在项目目录直接运行：

```bash
# 无需指定文件与参数，自动读取 Tectonic.toml
tectonic
```

常用配置项一览：

| 配置键 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `[files] default` | 字符串 | — | 默认编译的入口文档 |
| `[files] exclude` | 数组 | `[]` | 明确排除的文件/目录 |
| `[build] output_dir` | 字符串 | `tectonic_aux_files` | 输出与中间文件目录 |
| `[build] chatter` | `minimal`/`default` | `default` | 日志详细程度 |
| `[build] keep_logs` | 布尔 | `false` | 是否保留 `.log` |
| `[build] keep_aux_files` | 布尔 | `false` | 是否保留 `.aux` 等中间文件 |
| `[build] shell_escape` | 布尔 | `false` | 是否允许 `\write18` 执行外部命令 |
| `[build] synctex` | 布尔 | `false` | 是否生成 SyncTeX 数据 |

> 命令行参数优先级高于配置文件；`.tectonictoml` 与 `Tectonic.toml` 命名等价，若项目需同时兼容 windows/大小写敏感文件系统，统一使用 `Tectonic.toml`。

### 5.2 环境变量详解

tectonic 支持通过环境变量微调运行行为，适合在 CI、脚本或 Docker 中批量注入配置：

```bash
export TECTONIC_CACHE_DIR="$HOME/.cache/tectonic"   # 缓存目录（宏包/格式文件）
export TECTONIC_INPUT_DIR="./src"                   # 额外输入搜索路径
export TECTONIC_OUTPUT_DIR="./dist"                 # 默认输出目录（等价 --outdir）
export TECTONIC_BIN_PATH="$(command -v tectonic)"   # 二进制路径（供辅助工具定位）
export TECTONIC_SHELL_ESCAPE="false"                # 控制 shell 转义
export TECTONIC_STARTUP_FILE=""                     # 启动钩子脚本
```

- `TECTONIC_CACHE_DIR`：最常见。多台机器共享缓存可显著减少重复下载；CI 中把它挂到持久化缓存卷即可让每次构建近乎离线秒开。
- `TECTONIC_INPUT_DIR` / `TECTONIC_OUTPUT_DIR`：在脚本里统一重定向输入/输出，避免逐个参数传递。
- `TECTONIC_BIN_PATH`：供 `tectonic` 内置的一些自动化/辅助逻辑定位自身，一般无需手动设置。

### 5.3 离线缓存预热与共享

缓存是 tectonic 的核心优势所在。批量或 CI 构建前先做一次"预热"，把要用的格式与宏包全部下载齐全：

```bash
# 预热：先编译一个覆盖常用宏包的最小文档
cat > warmup.tex <<'EOF'
\documentclass{article}
\usepackage{graphicx,amsmath,hyperref,geometry}
\begin{document}warmup\end{document}
EOF
tectonic --compile-all warmup.tex

# 查看/确认缓存内容
ls -la "${TECTONIC_CACHE_DIR:-$HOME/Library/Caches/Tectonic}"   # macOS
```

预热后删除 `warmup.pdf/.aux`，只保留缓存。在 CI 中把该目录打包上传为 artifact，或挂到 `actions/cache`，即可实现跨构建的离线快速编译。

### 5.4 多遍编译与交叉引用

tectonic 默认采用"按需多遍"策略，但对涉及目录（`.toc`）、引用（`\ref`）、索引（`\index`）和文献的文档，交叉引用编号需要多遍传递才能收敛正确。强制完整多遍：

```bash
# 强制完整编译（含多遍 + 书目），保证 \ref、目录、参考文献编号正确
tectonic --compile-all thesis.tex

# 也可结合 --outdir 把中间文件隔离
tectonic --compile-all --outdir build thesis.tex
```

### 5.5 书目管理（BibTeX）

**tectonic 内置了对经典 BibTeX（`.bib` + `\bibliography`）的原生支持**，无需外部 `bibtex` 程序：

```tex
% 在正文中引用，文末列出书目
\documentclass{article}
\begin{document}
在文中引用 \cite{knuth1984}。

\bibliographystyle{plain}
\bibliography{refs}   % 对应 refs.bib
\end{document}
```

```bash
# 使用 --compile-all 让 tectonic 自动完成 "编译→BibTeX→再编译" 的多遍流程
tectonic --compile-all --outdir build main.tex
```

注意 `.bib` 文件应放在输入搜索路径内（默认当前目录，或用 `TECTONIC_INPUT_DIR` 指向）。

### 5.6 大项目组织：多章节拆分与主文档管理

对论文、报告、书籍等大型项目，务必按章节拆分文件并用主文档统一管理。tectonic 直接支持标准 LaTeX 的拆分机制：

```bash
# 推荐的项目结构
book/
├── Tectonic.toml          # 配置文件
├── main.tex               # 主文档（入口）
├── chapters/
│   ├── intro.tex
│   ├── methods.tex
│   └── results.tex
├── refs.bib               # 书目库
└── figures/
    └── fig1.pdf
```

主文档 `main.tex`：

```tex
\documentclass[11pt]{book}
\usepackage{graphicx}
\begin{document}
\frontmatter
\tableofcontents            % 生成目录（需多遍编译）

\mainmatter
% \input 直接把各章内容并入，适合较小的章节
\input{chapters/intro}
\input{chapters/methods}
% \include 另起一页，配合 \includeonly 可只编译单章调试
\include{chapters/results}

\backmatter
\bibliographystyle{plain}
\bibliography{refs}
\end{document}
```

- **`\input`**：相当于把文件内容原地粘贴进来，不换页，适合小节。
- **`\include`**：每章独立成页，并维护章节级 `.aux`；配合 `\includeonly` 可单独调试一章，显著加快大文档编译：

```tex
\includeonly{chapters/results}   % 只编译 results 章，其余占位
```

- 各章节文件**不要**写 `\documentclass` 与 `\begin{document}`，只写正文内容。
- 多章大文档务必加 `--compile-all`，否则目录和交叉引用编号会错误。

### 5.7 与编辑器搭配

tectonic 无状态、单命令，非常适合接入编辑器与文件监听：

```bash
# VS Code：LaTeX Workshop 插件的 settings.json 中
# "latex-workshop.latex.recipe" 指向 tectonic，或用 watchexec 手动监听
watchexec -w main.tex -w chapters tectonic --outdir build main.tex
```

生成 SyncTeX 后（`[build] synctex = true`），配合支持 SyncTeX 的编辑器可实现「PDF 与源码双向定位」。

## 六、注意事项与常见问题

### 6.1 书目相关的坑

- **tectonic 不支持 biblatex / biber**。biber 是独立的外部程序，tectonic 出于安全与自包含原则**不会调用外部可执行文件**，因此 `\usepackage{biblatex}` + `\addbibresource` 会报错或无法生成参考文献。**请改用经典 BibTeX 流程**（`\bibliography` + `\bibliographystyle`，见 5.5 节）。
- 忘记加 `--compile-all` 时，书目/目录会"不刷新"，表现为引用编号为 `??` 或目录为空——先补上 `--compile-all`。

### 6.2 中文与字体问题

tectonic 底层基于 XeTeX，中文排版需用 `ctex` 宏包（内部走 xeCJK），并依赖**系统字体**：

```tex
\documentclass{ctexart}   % 或 \usepackage{ctex}
\begin{document}
你好，Tectonic！
\end{document}
```

- macOS 用 CoreText、Linux 用 fontconfig 读取系统字体；容器/CI 里若提示缺字体，需先 `apt install fonts-noto-cjk` 之类的 CJK 字体包。
- 中文字体缺失会报 "font not found" 类错误，检查系统字体后再编译。

### 6.3 常见报错与解决

| 报错/现象 | 常见原因 | 解决办法 |
| --- | --- | --- |
| `could not find package` | 宏包不在内置集合（个别冷门/古老宏包） | 换等价宏包，或自行改用内置版本 |
| 网络错误 `TLS`/`404` | 首次拉取资源失败 | 检查网络/代理，设 `https_proxy`，或先预热缓存 |
| 引用显示 `??` | 未多遍编译 | 加 `--compile-all` |
| `font not found` | 系统缺中文字体 | 安装 CJK 字体（如 noto-cjk） |
| `biber`/`biblatex` 相关报错 | 用了不受支持的 biblatex | 改回经典 BibTeX 流程 |
| `Output file ... is not valid` | 编译中途崩溃/磁盘写满 | 清理 `--outdir` 残留中间文件后重试 |
| 文件路径含空格/中文 | 部分内部工具对路径敏感 | 项目路径尽量用 ASCII 无空格，或用 `--outdir` 收拢产物 |

### 6.4 性能与安全注意点

- **性能**：大文档首次编译（含格式加载 + 预热下载）有一次固定开销，先预热缓存；tectonic 缓存格式/宏包后，增量编译通常远快于传统 TeX Live 冷启动。超大项目用 `\includeonly` 单章调试可再提速。
- **安全（重要）**：tectonic 支持 shell 转义（`\write18`），但**默认禁用**。编译来自不可信来源的 `.tex`（网上下载的模板、他人邮件附件）时，务必保持 `shell_escape = false`，防止文档内嵌的 `\write18{...}` 在机器上执行任意系统命令。
- 除非确有必要，不要在公开 CI/共享机器上开启 `shell_escape`。

## 七、实战：与其它工具搭配与自动化

### 7.1 Makefile 自动化

用 Makefile 固化"清理→编译→查看"的完整流程，并利用依赖关系只重编发生变化的文件：

```makefile
# Makefile —— 在项目根目录
OUTDIR   := build
TEX      := main.tex
PDF      := $(OUTDIR)/main.pdf
TECTONIC := tectonic

.PHONY: all clean watch open

all: $(PDF)

# 编译 PDF（依赖所有 .tex 与 .bib，有改动才重建）
$(PDF): $(TEX) $(wildcard chapters/*.tex) refs.bib
	$(TECTONIC) --compile-all --outdir $(OUTDIR) $(TEX)

# 监听源码变化自动重编译（需安装 watchexec）
watch:
	watchexec -w . --exts tex,bib make all

open: $(PDF)
	open $(PDF)

clean:
	rm -rf $(OUTDIR) *.log
```

### 7.2 GitHub Actions CI 集成

tectonic 无需安装 TeX Live，是 CI 的绝配。`pkgforge/tectonic` 等社区 Docker 镜像已内置可用二进制。真实可用的 GitHub Actions 工作流：

```yaml
# .github/workflows/build.yml
name: build-pdf
on:
  push:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # 安装 tectonic
      - uses: wtfjoke/setup-tectonic@v3

      # 用 actions/cache 持久化缓存，实现跨构建离线加速
      - name: Cache tectonic
        uses: actions/cache@v4
        with:
          path: ~/.cache/Tectonic
          key: tectonic-${{ hashFiles('main.tex') }}

      - name: Compile
        run: tectonic --compile-all --outdir dist main.tex

      # 上传 PDF 为构建产物
      - uses: actions/upload-artifact@v4
        with:
          name: main-pdf
          path: dist/main.pdf
```

### 7.3 批量处理脚本

对同一目录下多个文档做批量编译，用循环脚本即可：

```bash
#!/usr/bin/env bash
# batch-build.sh —— 批量编译 ./docs 下所有 .tex
set -euo pipefail
mkdir -p dist

for tex in docs/*.tex; do
  name="$(basename "$tex" .tex)"
  echo "==> 编译 $name"
  tectonic --compile-all --outdir "dist/$name" "$tex"
done
echo "全部完成，产物位于 dist/"
```

### 7.4 与 pandoc 搭配：Markdown → 高质量 LaTeX/PDF

写作用 Markdown、出版用 LaTeX 是常见工作流。pandoc 把 Markdown 转成 tectonic 可直接编译的 LaTeX，再交给 tectonic 出 PDF：

```bash
# Markdown 转 LaTeX（用 citeproc 处理参考文献）
pandoc report.md \
  --citeproc --bibliography=refs.bib --csl=chicago-author-date.csl \
  -o report.tex

# 再由 tectonic 编译出 PDF
tectonic --compile-all --outdir dist report.tex
```

若想完全避开 LaTeX 依赖，也可让 pandoc 配合任意 LaTeX 引擎直接出 PDF，但使用 tectonic 可保证服务器端无需装 TeX Live。

### 7.5 与 latexindent 搭配：代码格式统一

用 `latexindent` 统一多章源码的缩进与格式，再交给 tectonic 编译，适合多人协作保持风格一致：

```bash
# 安装（macOS 通过 Homebrew 或 TeX Live）
brew install latexindent   # 或: perl cpanm -i latexindent

# 批量格式化所有章节
latexindent -w chapters/*.tex main.tex

# 再编译
tectonic --compile-all --outdir dist main.tex
```

latexindent 的规则可用 `latexindent.yaml` 定制（见 latexindent 专题教程），配合 `.pre-commit` 或 CI 可实现「提交前自动格式化」。

### 7.6 生产级实践要点

- **版本锁定**：在 CI 或 Docker 中固定 tectonic 版本（如 `brew install tectonic@0.15` 或固定镜像 tag），避免上游更新导致行为漂移。
- **目录隔离**：始终用 `--outdir`/`output_dir` 把产物与中间文件集中，`.gitignore` 掉 `build/`、`dist/`、`*.log`、`*.aux`，只提交源码与 `.bib`。
- **缓存即资产**：把缓存目录纳入 CI 缓存或私有镜像，让离线/内网环境也能秒级编译。
- **不可信输入**：默认关闭 `shell_escape`；对用户上传或外部来源的 `.tex` 单独沙箱编译。
- **多遍必开**：凡涉及目录/引用/文献的大文档，CI 里固定加 `--compile-all`，防止「本地 OK、CI 缺遍」的编号错乱。

### 7.7 `-X` 实验性命令体系：大型项目的工作流入口

tectonic 0.15 起引入了一套**实验性（experimental）子命令体系**，统一入口为 `tectonic -X`。它把「创建项目 → 编译 → 监听 → 管理资源」整合成一套工程化工作流，**特别适合大型 LaTeX 项目**。用 `tectonic -X --help` 可列出全部子命令：

```bash
tectonic -X          # 列出所有实验性子命令
# build / bundle / compile / dump / init / new / show / watch
```

以下是在大型项目中常用的几个：

#### ① `tectonic -X new` 与 `-X init`：创建标准项目骨架

`-X new` 在当前目录生成一个带 `Tectonic.toml` 配置和 `main.tex` 入口的完整项目骨架，是**大型项目管理的基础**：

```bash
# 创建一个名为 thesis 的新项目目录
tectonic -X new thesis
cd thesis
# 生成的内容包括 Tectonic.toml 与默认 main.tex

# 或在当前空目录初始化
tectonic -X init
```

项目根下的 `Tectonic.toml` 集中管理编译行为（输出目录、编译遍数、shell 转义开关等），比每次都敲一堆命令行参数更利于团队协作与 CI 复用。

#### ② `tectonic -X watch`：监听源文件变化自动编译

写大型文档时，`-X watch` 会**监听所有输入文件（含子章节、`.bib`、图片）的变化并自动重新编译**，省去手动触发。适合与编辑器分屏实时预览 PDF：

```bash
# 默认监听并执行 build
tectonic -X watch

# 监听时指定要执行的命令（默认是 build）
tectonic -X watch -x build --keep-logs --open
```

配合 `--open` 每次编译完自动用系统 PDF 查看器打开，实现「改一下 → 自动刷新」的即时反馈循环。

#### ③ `tectonic -X build`：在项目内构建文档

在 `-X new` 建好的项目里，用 `-X build` 代替手写 `tectonic main.tex`：

```bash
tectonic -X build                 # 按 Tectonic.toml 构建
tectonic -X build --keep-logs     # 保留日志便于排错
tectonic -X build --open          # 构建后自动打开 PDF
tectonic -X build --only-cached   # 只用本地缓存资源（离线构建）
tectonic -X build --untrusted     # 把文档当不可信输入，关闭不安全特性
```

`--only-cached` 对离线/内网环境很有用；`--untrusted` 对编译外部来源文档更安全。

#### ④ `tectonic -X bundle` 与 `-X dump`：管理文件包与中间产物

- `tectonic -X bundle search 关键词`：在项目资源包中按名字过滤文件，排查某宏包/字体是否可用。
- `tectonic -X bundle cat 文件名`：直接查看包内某文件的原始内容，便于检查缓存的格式定义。
- `tectonic -X dump <文件名>`：执行一次**部分编译**并输出某个中间文件（如 `.aux`、`.log`、`.toc`），用于排查目录/引用编号问题。

```bash
# 查看项目里是否包含某字体/宏包
tectonic -X bundle search .bib
# 输出生成的 .aux 看交叉引用辅助信息
tectonic -X dump main.aux
```

#### ⑤ `tectonic -X show`：查看环境信息

```bash
tectonic -X show user-cache-dir   # 打印默认缓存目录路径
```

配合 `TECTONIC_CACHE_DIR` 环境变量，可在脚本里动态获取并持久化缓存位置。

> ⚠️ **注意**：`-X` 命令体系处于**实验阶段**，接口和参数在后续版本可能调整。跨版本升级后请以 `tectonic -X --help` 及各子命令 `--help` 的实际输出为准，勿在关键 CI 中依赖尚未稳定的行为。