---
title: typst
icon: book
category:
  - 工具
  - 排版
tag:
  - 文档与排版
  - typst
---

# typst（现代排版系统，可替代 LaTeX 的简易方案）

> Homebrew 版本 0.14.1 ｜ 主页：见官方文档 ｜ 安装：`brew install typst`

## 一、它是什么

typst 是一个用 Rust 编写的**现代排版系统**，用简单易懂的标记语法即可生成高质量的 PDF、SVG、PNG 等文档，常被称为"更简单、更快的 LaTeX 替代品"。它解决了 LaTeX 学习曲线陡峭、编译慢、宏包依赖复杂、环境配置麻烦等问题，自带完善的文档与自动编译预览功能，让排版专注在写作而非调环境上。典型应用场景包括：写论文/报告/简历/幻灯片、做公式密集的数学与工程文档、生成带代码高亮的开发文档，以及任何你之前会用 LaTeX 处理的正式文档。

## 二、安装与升级

```bash
# 安装
brew install typst

# 升级
brew upgrade typst

# 卸载
brew uninstall typst

# 验证安装成功（查看版本）
typst --version
```

安装后 `typst` 即进入 PATH，直接可在任意目录调用。若之前用 `cargo install typst-cli` 装过旧版，建议先卸载旧版再 `brew install` 以免版本冲突。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `typst compile [input] [output]` | 将 `.typ` 源文件编译为 PDF/SVG/PNG 等 | `typst compile main.typ main.pdf` |
| `typst watch [input] [output]` | 监听文件变化自动重新编译（预览开发） | `typst watch main.typ main.pdf` |
| `typst query [input]` | 从编译结果中提取元素/元数据（如目录、标题） | `typst query main.typ '<heading>'` |
| `typst fonts` | 列出 typst 可用的字体 | `typst fonts` |
| `typst init [name]` | 初始化一个新的示例项目模板 | `typst init hello` |
| `typst compile -f png` / `--format` | 指定输出格式（png/svg/pdf） | `typst compile -f svg diag.typ diag.svg` |
| `-p` / `--ppr` | 指定纸张/页面尺寸（如 a4、letter） | `typst compile -p a4 main.typ` |
| `--root` | 指定项目根目录（解析相对路径基准） | `typst compile --root . main.typ` |
| `typst preview` / `-w` 相关 | 启动本地服务器实时预览（配合 watch） | `typst preview main.typ` |

> 说明：`typst preview` 会启动本地 Web 服务器并在浏览器中实时预览，`typst watch` 则只负责自动重编译输出文件。二者常搭配使用。

## 四、实际示例

### 示例 1：Hello World 编译成 PDF

```bash
# 准备：新建一个目录并写一个最小的 .typ 源文件
mkdir -p ~/typst-demo && cd ~/typst-demo

cat > hello.typ <<'EOF'
#set page(paper: "a4", margin: 2.5cm)
#set text(font: "New Computer Modern", size: 11pt)

= 欢迎使用 typst

这是一段*斜体*、**粗体**和 $x^2 + y^2 = z^2$ 的示例文本。

- 列表项一
- 列表项二

#align(center)[
  #rect(fill: rgb("#e8f0fe"))[
    边框高亮区块
  ]
]
EOF

# 编译为 PDF
typst compile hello.typ hello.pdf

# 验证产物存在
ls -lh hello.pdf
open hello.pdf   # macOS 用默认阅读器打开
```

编译成功后，`hello.pdf` 即为一份带标题、公式、列表和着色区块的正式排版 PDF。

### 示例 2：监听实时重编译并导出 PNG

```bash
# 准备：复用上面的 hello.typ
cd ~/typst-demo

# 后台监听，改动 hello.typ 自动重编译
typst watch hello.typ hello.pdf &

# 同时导出第一页为 PNG（适合做封面图/预览图）
typst compile -f png --ppi 144 hello.typ hello.png

# 停止监听
kill %1
```

`--ppi 144` 控制 PNG 的分辨率（每英寸像素数），数值越大图片越清晰、体积也越大。

### 示例 3：用 init 快速生成模板并查询结构

```bash
# 准备：创建一个基于内置模板的新项目
typst init tutorial

cd tutorial

# 查看模板生成的文件结构
ls -R

# 查询所有一级标题（#set 之外用 query 提取，输出 JSON 片段）
typst query main.typ '<heading level=1>'

# 编译整个模板
typst compile main.typ main.pdf
```

`typst init` 会生成一个带示例内容、注释和依赖（如 `lib.typ`）的完整项目，是快速上手的绝佳起点。

### 示例 4：生成 SVG 矢量图（适合嵌入网页/文档）

```bash
# 准备：写一个纯矢量绘图脚本
cd ~/typst-demo

cat > diag.typ <<'EOF'
#set page(paper: "a4", fill: white)
#import "@preview/cetz:0.2.2": canvas, draw, path

#canvas(length: 1cm, {
  draw.circle((0, 0), radius: 1, fill: rgb("#4c8bf5"))
  draw.circle((2, 0), radius: 1, fill: rgb("#e05a47"))
  draw.line((1, 1.5), (1, -1.5))
})
EOF

# 导出为 SVG 矢量格式
typst compile -f svg diag.typ diag.svg
```

> 依赖 `@preview/...` 需要网络下载（或提前 `typst init` 拉取），离线时可将包放入本地 `packages` 目录。

## 五、进阶技巧与配置

**1. 主题与全局设置文件（模板复用）**

把常用样式抽到一个公共文件，用 `#include` 复用：

```typ
// theme.typ —— 全局主题
#set document(title: "公司报告", author: "Wang Bo")
#set page(paper: "a4", margin: (x: 2cm, y: 2.5cm))
#set text(font: "Source Han Serif SC", size: 11pt, lang: "zh")
#set par(justify: true, spacing: 0.8em)

// report.typ —— 主文件
#include "theme.typ"

= 第一章 概述
...
```

**2. 配置字体与中文字体**

typst 使用系统字体（macOS 的 `/Library/Fonts`、`~/Library/Fonts` 等）。用 `typst fonts` 查看可用字体，中英文混排建议：

```typ
#set text(font: "Source Han Serif SC", fallback: "New Computer Modern")
```

中文字体缺失时 typst 会用 fallback 兜底，避免乱码方块。

**3. 引用第三方包（包管理）**

typst 通过 `@preview/...` 引入社区包（类似 npm/pip）。在文件顶部声明，首次编译自动拉取：

```typ
#import "@preview/cetz:0.2.2": canvas
#import "@preview/codly:1.0.0": *
#import "@preview/theanorama:1.0.0": *
```

包版本缓存在 `~/.cache/typst` 下，可预先 `typst compile` 一次把依赖拉全，便于离线工作。

**4. 与其它工具搭配**

- **编辑器**：VS Code 装 "Tinymist Typst" 插件，支持语法高亮、悬停提示、实时预览；Neovim 用 `typst.vim`。
- **CI/自动化**：脚本里用 `typst compile -f pdf` 生成文档，配合 GitHub Actions 自动发布：
  ```yaml
  - run: brew install typst && typst compile report.typ report.pdf
  - uses: actions/upload-artifact@v4
    with: { path: report.pdf }
  ```
- **分页/目录**：`typst query '<outline>'` 可提取目录结构，方便二次处理或生成导航。

## 六、注意事项与常见问题

**1. 中文引号与标点**

typst 默认英文标点，中文排版请设语言并处理引号：

```typ
#set text(lang: "zh", region: "cn")
#set text(quotes: ("“", "”", "‘", "’"))
```

否则直接键入 `"` 会得到英文引号。

**2. 依赖下载失败或离线无包**

`@preview/...` 或 `@local/...` 首次使用需要网络。离线时错误形如 `package not found`。解决：提前联网 `typst compile` 一次缓存依赖，或把包放到项目 `packages/` 目录并设 `--root`。

**3. 字体乱码/缺字**

中文显示为方块通常是字体未安装或未指定。用 `typst fonts` 确认字体已注册，再在 `#set text(font: ...)` 显式指定；服务器环境（如 CI）需先安装相应字体（macOS 装到 `~/Library/Fonts`，Linux 装到 `~/.local/share/fonts`）。

**4. 编译速度与内存**

typst 比 LaTeX 快得多，但极端大文档或导入海量包时仍可能耗时。`typst watch` 增量编译只处理改动部分，日常写作可常开。若处理超大图片（上百 MB），建议先压缩或转成 SVG/WebP 再引用。

**5. 版本差异**

Homebrew 的 0.14.1 是较新版本，`@preview` 包与某些 API 会随主版本变动。旧教程里 `#import`、`#let`、`#show` 的写法若报错，注意核对官方文档对应版本的语法。

**6. 输出格式限制**

`-f svg` 或 `-f png` 输出不支持交互元素（如超链接跳转），且分页会按页分别生成 `{n}.svg`。需要带链接、书签、内嵌字体的正式成品，请用 PDF 格式。