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

> 说明：`-o` 与 `--outdir` 是 0.15.x 新引入的输出选项；旧版部分行为（如往 `tectonic_aux_files` 目录写中间文件）在新版本中已统一收敛到 `--outdir`/`--keep-logs` 等机制。

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

- **离线缓存与格式文件**：tectonic 首次下载的格式文件和宏包会缓存在本地（macOS 上默认在 `~/Library/Caches/Tectonic`，Linux 下在 `$XDG_CACHE_HOME/tectonic`）。批量/反复编译前先跑一次预热，后续即可离线快速编译。
- **环境变量 `TECTONIC_CACHE_DIR`**：可自定义缓存目录，便于多环境共享或 CI 中持久化缓存以加速构建。
- **多遍编译（biber/引用）**：含 `\bibliography`/`biber` 的文档建议加 `--compile-all` 强制多次传递，保证交叉引用与参考文献编号正确。
- **与编辑器/脚本搭配**：tectonic 是无状态单命令工具，非常适合配合 VS Code LaTeX 插件、Makefile、或 `watchexec` 监听文件变更自动重编译：

```bash
# 监听 main.tex 变化并自动重新编译
watchexec -w main.tex tectonic main.tex
```

- **输出选项差异**：0.15.x 默认把中间辅助文件与最终产物统一处理；用 `--outdir` 指定输出目录可避免污染源码目录，用 `--keep-logs` 保留 `.log` 便于排查。

## 六、注意事项与常见问题

- **网络依赖**：首次编译需要联网下载宏包与格式文件。离线环境请先用在线机器做一次"预热"，或预先准备缓存目录并设置 `TECTONIC_CACHE_DIR` 指向它。
- **宏包/格式版本**：tectonic 使用自己打包的 TeX 格式与宏包版本，与 TeX Live 的版本号并不一一对应。个别古老或冷门宏包可能不被内置，遇到缺失时报错提示 "could not find package"，请更换为等价替代宏包。
- **无网络时的报错**：若下载失败会报网络类错误（如 TLS/404）。先检查网络或代理设置；企业内网可配置 `https_proxy` 等代理环境变量。
- **不要混用旧版输出习惯**：0.15.x 调整了部分命令行选项（如输出文件名/目录的指定方式），从旧版本升级后请以 `tectonic --help` 的实际输出为准，避免依赖已废弃的行为。
- **性能注意**：大文档（数百页、大量图片）首次格式加载仍有一次开销，建议预热缓存；后续增量编译速度很快。
- **安全提示**：tectonic 支持 shell 转义与外部程序调用（`\write18`），默认禁用；编译不可信来源的 `.tex` 文件时尽量保持默认关闭，避免执行恶意系统命令。