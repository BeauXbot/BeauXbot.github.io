---
title: Homebrew 工具集
icon: tools
article: false
category:
  - 指南
  - 工具
tag:
  - Homebrew
  - 工具集
---

# 🧰 Homebrew 工具集

我通过 Homebrew 安装的常用工具速查索引。每个工具都有独立的详细教程，涵盖简介、安装、常用命令、实际示例、进阶技巧和常见问题。

> 本文档由 `brew leaves` 自动导出当前主动安装的核心工具整理而成。新装了工具记得回来补一篇教程，并更新下面的清单。

## 📂 工具分类

### 🛠 开发与构建

| 工具 | 版本 | 用途 | 教程 |
|------|------|------|------|
| [bazel](bazel.md) | 8.4.2 | Google 构建工具，多语言大型项目 | [进入](bazel.md) |
| [cmake](cmake.md) | 4.2.0 | 跨平台构建系统生成器 | [进入](cmake.md) |
| [ninja](ninja.md) | 1.13.2 | 小型高速构建系统 | [进入](ninja.md) |
| [xmake](xmake.md) | 3.0.5 | 基于 Lua 的跨平台构建工具 | [进入](xmake.md) |
| [go](go.md) | 1.25.5 | Go 编程语言 | [进入](go.md) |
| [cling](cling.md) | 1.2 | C++ 交互式解释器 | [进入](cling.md) |
| [emscripten](emscripten.md) | 4.0.21 | C/C++ 编译为 WebAssembly | [进入](emscripten.md) |
| [nasm](nasm.md) | 3.01 | x86/x64 汇编器 | [进入](nasm.md) |
| [yasm](yasm.md) | 1.3.0 | NASM 的模块化重实现 | [进入](yasm.md) |
| [boost](boost.md) | 1.x | C++ 扩展库集合 | [进入](boost.md) |
| [libsodium](libsodium.md) | 1.0.20 | 现代加密/解密 C 库 | [进入](libsodium.md) |
| [ntl](ntl.md) | 11.6.0 | C++ 数论与多项式计算库 | [进入](ntl.md) |

### ⚡ 系统与效率

| 工具 | 版本 | 用途 | 教程 |
|------|------|------|------|
| [btop](btop.md) | 1.4.5 | 现代化终端资源监控器 | [进入](btop.md) |
| [htop](htop.md) | 3.4.1 | 交互式进程查看器 | [进入](htop.md) |
| [fastfetch](fastfetch.md) | 2.55.1 | 快速显示系统信息 | [进入](fastfetch.md) |
| [ripgrep](ripgrep.md) | 15.1.0 | 超高速代码/文本搜索 | [进入](ripgrep.md) |
| [tldr](tldr.md) | 1.0 | 简化命令手册 | [进入](tldr.md) |
| [pv](pv.md) | 1.10.2 | 管道数据进度监视 | [进入](pv.md) |
| [wget](wget.md) | 1.25.0 | 命令行文件下载 | [进入](wget.md) |
| [gh](gh.md) | 2.83.1 | GitHub 官方命令行工具 | [进入](gh.md) |
| [gnupg](gnupg.md) | 2.4.8 | GPG 加密签名工具 | [进入](gnupg.md) |

### 📄 文档与排版

| 工具 | 版本 | 用途 | 教程 |
|------|------|------|------|
| [pandoc](pandoc.md) | 3.8.3 | 万能文档格式转换器 | [进入](pandoc.md) |
| [typst](typst.md) | 0.14.1 | 现代排版系统（LaTeX 替代） | [进入](typst.md) |
| [tectonic](tectonic.md) | 0.15.0 | 自包含 TeX/LaTeX 引擎 | [进入](tectonic.md) |
| [latexindent](latexindent.md) | 3.24.7 | LaTeX 文件格式化 | [进入](latexindent.md) |
| [gnuplot](gnuplot.md) | 6.0.3 | 命令行函数绘图 | [进入](gnuplot.md) |

### 🖼 图像处理

| 工具 | 版本 | 用途 | 教程 |
|------|------|------|------|
| [imagemagick](imagemagick.md) | 7.1.2-9 | 命令行图像处理套件 | [进入](imagemagick.md) |

### 🎯 学习与其它

| 工具 | 版本 | 用途 | 教程 |
|------|------|------|------|
| [exercism](exercism.md) | 3.5.8 | Exercism 编程练习 CLI | [进入](exercism.md) |
| [docker-desktop](docker-desktop.md) | cask | Docker 桌面版图形应用 | [进入](docker-desktop.md) |

## 🔄 如何维护与新增

每次新装了一个 Homebrew 工具，按下面三步更新本索引：

### 1. 查看当前安装的工具

```bash
# 列出所有主动安装的工具（不被其它包依赖的 formula）
brew leaves

# 列出所有主动安装的图形应用
brew list --cask
```

### 2. 新增一个工具教程

在 `src/guide/tools/` 下新建 `<工具名>.md`，复制下面的模板，替换对应的标题、简介和安装命令即可：

```markdown
---
title: 工具名
icon: code
category:
  - 工具
  - 子分类
tag:
  - 所属大类
  - 工具名
---

# 工具名（一句话简介）

> Homebrew 版本 x.x.x ｜ 安装：`brew install 工具名`

## 一、它是什么
这个工具是做什么的……

## 二、安装与升级
brew install / upgrade / uninstall 命令……

## 三、常用命令速查
命令表格……

## 四、实际示例
可复制的完整示例……

## 五、进阶技巧与配置
技巧与配置……

## 六、注意事项与常见问题
坑与解决办法……
```

### 3. 更新索引表

把新工具按用途加到上面合适的分类表格中（`| [工具名](工具名.md) | 版本 | 用途 | [进入](工具名.md) |`），保持分类清晰。

> 💡 **小技巧**：不确定新工具属于哪个分类？看 `brew info 工具名` 的简介再归类即可。

## 📋 附：查看版本与依赖

```bash
# 查看某个工具是否可升级
brew outdated

# 查看某个工具的依赖关系
brew deps --tree 工具名

# 查看某个工具占用的磁盘空间
brew info --size 工具名
```