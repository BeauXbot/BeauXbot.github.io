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

### 1. 主题与全局设置文件（模板复用）

把常用样式抽到一个公共文件，用 `#include` 复用，主文件只负责内容，样式集中管理：

```typ
// theme.typ —— 全局主题
#set document(title: "公司报告", author: "Wang Bo", keywords: ("报告", "技术"))
#set page(
  paper: "a4",
  margin: (x: 2cm, y: 2.5cm),
  numbering: "1 / 1",          // 页码显示为 "当前页 / 总页数"
  header: align(right)[#smallcaps[#context page.numbering]],
)
#set text(font: "Source Han Serif SC", size: 11pt, lang: "zh")
#set par(justify: true, spacing: 0.8em)
#show heading: set text(size: 1.3em)
#show heading.where(level: 1): set text(font: "Source Han Sans SC")

// report.typ —— 主文件（只写正文）
#include "theme.typ"

= 第一章 概述
...
```

**用环境变量/`--root` 区分开发与生产样式**：同一套模板可在编译时通过 `--root` 配合 `#sys.inputs` 判断构建环境，加载不同主题：

```typ
// config.typ —— 按环境选择样式
#if sys.inputs.built-in("draft") != none {
  #set page(fill: rgb("#fff9e6"))   // 草稿：浅黄底，便于审阅
}
```

```bash
typst compile --root . --input draft=1 report.typ draft.pdf
typst compile --root . report.typ final.pdf
```

### 2. 配置字体与中文字体

typst 使用系统字体（macOS 的 `/Library/Fonts`、`~/Library/Fonts`，Linux 的 `/usr/share/fonts`、`~/.local/share/fonts`）。用 `typst fonts` 查看可用字体：

```bash
# 列出全部字体
typst fonts
# 只看某字体家族
typst fonts | grep -i "source han"
```

中英文混排建议指定主字体 + fallback：

```typ
#set text(font: "Source Han Serif SC", fallback: "New Computer Modern")
```

**字体目录自定义**：typst 默认不扫描任意目录，但可用 `--font-path` 指定额外字体目录（适合项目内自带的开源字体，避免依赖系统安装）：

```bash
typst compile --font-path ./fonts report.typ report.pdf
```

> 提示：`--font-path` 可重复使用，也可在项目根放一个 `.fonts` 目录由 CI 一起提交，保证在任何机器上编译结果一致。

### 3. 引用第三方包（包管理）

typst 通过 `@preview/...`、`@local/...` 引入包（类似 npm/pip）。在文件顶部声明，首次编译自动拉取：

```typ
#import "@preview/cetz:0.2.2": canvas, draw
#import "@preview/codly:1.0.0": *
#import "@preview/theanorama:1.0.0": *
#import "@preview/awesomebox:0.6.1": *
```

包版本缓存在 `~/.cache/typst/packages`（或 `$XDG_CACHE_HOME/typst/packages`）。常用环境变量：

| 环境变量 | 作用 | 示例 |
| --- | --- | --- |
| `XDG_CACHE_HOME` | 覆盖包缓存目录 | `XDG_CACHE_HOME=/tmp/typst-cache typst compile a.typ` |
| `TYPST_FONT_PATHS` | 追加字体搜索路径（冒号分隔） | `TYPST_FONT_PATHS=./fonts typst compile a.typ` |
| `TYPST_EMIT_DIRECTORY` | 指定编译输出的目录 | `TYPST_EMIT_DIRECTORY=out typst compile a.typ` |
| `TYPST_ROOT` | 设置项目根目录 | `TYPST_ROOT=. typst compile a.typ` |

**离线使用包**：把已缓存的包复制到项目目录，配合 `--root` 加载：

```bash
# 先在联网机器拉取依赖
typst compile main.typ main.pdf

# 把缓存包拷到项目 packages 目录（结构：packages/包名/版本/）
mkdir -p packages/cetz/0.2.2
cp -r ~/.cache/typst/packages/preview/cetz-0.2.2/* packages/cetz/0.2.2/
typst compile --root . main.typ main.pdf
```

### 4. 长文档与多文件拆分（多章节结构）

大型项目（论文/书籍/报告）建议**一个文件一个章节**，用 `#include` 聚合：

```
book/
├── main.typ            # 主入口：主题 + include 各章
├── theme.typ           # 全局样式
├── bibliography.bib    # 参考文献（见第 6 节）
├── chapters/
│   ├── 01-intro.typ
│   ├── 02-methods.typ
│   └── 03-conclusion.typ
└── figures/
    ├── fig1.svg
    └── fig2.png
```

```typ
// main.typ
#include "theme.typ"

= 前言
#include "chapters/01-intro.typ"
#include "chapters/02-methods.typ"
#include "chapters/03-conclusion.typ"
```

**自动目录 + 图表目录**：

```typ
#outline(title: "目录")
#outline(title: "图目录", target: figure.where(kind: image))
#outline(title: "表目录", target: figure.where(kind: table))
```

编译后用 `typst query` 提取目录元素做导航或摘要：

```bash
# 提取所有 heading 的层级与标题文本
typst query main.typ '<heading>'
# 只取一级标题，输出 JSON 保存
typst query main.typ '<heading level=1>' > headings.json
```

### 5. 书目管理（BibLaTeX / BibTeX 兼容）

typst 内置 BibLaTeX 兼容的参考文献系统，`typst init` 模板自带 `bibliography.bib`。它可直接读取你已有的 `.bib` 文件，无需转换：

```bib
@article{knuth1984,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  year    = {1984},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
}
```

```typ
// 文末引用，auto 自动排编号、放参考文献列表
#bibliography("bibliography.bib", title: "参考文献", style: "chicago-author-date")
```

正文用 `@knuth1984` 或 `#cite(<knuth1984>)` 引用。`style` 支持 `"apa"`、`"chicago-author-date"`、`"ieee"`、`"mla"` 等常见格式。`.bib` 文件变更后 `typst watch` 会自动重排，非常适合"参考文献与正文同步迭代"的工作流。

### 6. 使用模板参数与复用函数（脚本化）

把可复用的片段定义成函数，实现"数据驱动排版"（如自动生成表格、批量卡片）：

```typ
// report.typ
#let report-card(title, body) = block(
  width: 100%,
  inset: 1em,
  radius: 0.5em,
  fill: rgb("#f3f6ff"),
  [#text(weight: "bold")[#title]\ 
   #body]
)

#report-card(title: "本月数据", body: [销售额 $12.4$ 万元，同比 $+8\%$。])
#report-card(title: "风险提示", body: [关注供应商交付延期。])
```

用 `#let` 组合页眉、页脚、封面，即可把"模板"抽象成可复用组件库，跨项目复用。

### 7. 导出为多种格式 & 页面尺寸

`-f` 支持 `pdf`、`png`、`svg`，还可导出 JSON 结构。常用组合：

```bash
# 每页单独导出 SVG（常用于网页插图/流程图）
typst compile -f svg --root . diag.typ

# 导出 PNG 时控制分辨率与纸张
typst compile -f png --ppi 300 --ppr a4 --root . main.typ

# 生成页面尺寸为自定义纸张
typst compile --ppr "10cm, 10cm" --root . card.typ card.png
```

> `--ppr` 既可用内置名（`a4`/`letter`/`legal`），也可写 `宽, 高` 逗号分隔的显式尺寸，适合做名片、海报、幻灯片。

## 六、注意事项与常见问题

**1. 中文引号与标点**

typst 默认英文标点，中文排版请设语言并处理引号：

```typ
#set text(lang: "zh", region: "cn")
#set text(quotes: ("“", "”", "‘", "’"))
```

否则直接键入 `"` 会得到英文引号。

**2. 依赖下载失败或离线无包**

`@preview/...` 或 `@local/...` 首次使用需要网络。离线时错误形如：

```
error: package not found in any of: preview, local
```

解决：提前联网 `typst compile` 一次缓存依赖，或把包放到项目 `packages/` 目录并设 `--root`（见五·3）。企业内网可设置代理后重试：

```bash
export HTTP_PROXY=http://proxy:8080
export HTTPS_PROXY=http://proxy:8080
typst compile main.typ
```

**3. 字体乱码/缺字**

中文显示为方块通常是字体未安装或未指定。用 `typst fonts` 确认字体已注册，再在 `#set text(font: ...)` 显式指定；服务器环境（如 CI）需先安装相应字体（macOS 装到 `~/Library/Fonts`，Linux 装到 `~/.local/share/fonts`）。CI 里建议用 `--font-path` 指向仓库内字体，避免依赖系统字体包。

**4. 编译速度与内存**

typst 比 LaTeX 快得多，但极端大文档或导入海量包时仍可能耗时。`typst watch` 增量编译只处理改动部分，日常写作可常开。若处理超大图片（上百 MB），建议先压缩或转成 SVG/WebP 再引用；大图可用 `#image("a.webp", width: 80%)` 限定尺寸，避免整页渲染卡顿。

**5. 版本差异**

Homebrew 的 0.14.1 是较新版本，`@preview` 包与某些 API 会随主版本变动。旧教程里 `#import`、`#let`、`#show` 的写法若报错，注意核对官方文档对应版本的语法。团队协作建议在 CI 里固定 typst 版本，避免"本地能编、CI 报错"。

**6. 输出格式限制**

`-f svg` 或 `-f png` 输出不支持交互元素（如超链接跳转），且分页会按页分别生成 `{n}.svg`。需要带链接、书签、内嵌字体的正式成品，请用 PDF 格式。

**7. 常见报错速查**

| 报错片段 | 含义 / 解决办法 |
| --- | --- |
| `expected item, found content` | 语法位置写错，如 `#set` 后少了内容，检查括号/中括号配对 |
| `unknown variable: foo` | 引用了未定义的变量，检查是否漏了 `#let foo = ...` |
| `failed to load file: not found` | `#include` 路径错，确认相对 `--root` 的路径及文件名大小写 |
| `package not found` | 见上方第 2 条，检查包名/版本号是否与 `@preview` 一致 |
| `font not found` | 字体未安装或未通过 `--font-path` 提供，`typst fonts` 核对名称 |
| `missing comma` / `unexpected end of expression` | 参数表漏逗号或括号未闭合，逐行核对 `#set`/`#show` 调用 |

**8. 安全注意点**

- `#include`、`#import` 会加载并执行本文件中的代码。**不要直接编译/打开来源不明的 `.typ` 文件**，它可能内嵌恶意脚本访问本地文件或发起网络请求。
- 用 `--root` 限定项目根目录可阻止 `#include` 越界读取根目录之外的文件，多人协作/自动化构建时建议固定 `--root .`。

## 七、实战：与其它工具搭配与自动化

### 1. Makefile 一键编译（多目标 / 批量）

把"编译、清理、watch、发布"固化进 `Makefile`，团队人人可跑：

```makefile
# Makefile
TYPST := typst
MAIN  := main.typ
OUT   := main.pdf
FONTS := --font-path ./fonts

.PHONY: all pdf png svg watch clean publish

all: pdf

pdf: $(MAIN)
	$(TYPST) compile $(FONTS) --root . $(MAIN) $(OUT)

png:
	$(TYPST) compile -f png --ppi 300 --root . $(MAIN)

svg:
	$(TYPST) compile -f svg --root . $(MAIN)

watch:
	$(TYPST) watch $(FONTS) --root . $(MAIN) $(OUT)

clean:
	rm -f $(OUT) *.png *.svg headings.json

publish: pdf
	mkdir -p dist && cp $(OUT) dist/
```

使用：

```bash
make            # 编译 PDF
make png        # 批量导出 PNG
make watch      # 开发预览
make clean      # 清理产物
make publish    # 编译并拷贝到 dist/
```

### 2. 批量处理：循环编译多个文件

需要为每个章节/每个文档分别出 PDF 时，用脚本循环（避免手输 N 次命令）：

```bash
# 为 chapters/ 下每个 .typ 单独编译一份 PDF
mkdir -p out
for f in chapters/*.typ; do
  name="$(basename "$f" .typ)"
  typst compile --root . "$f" "out/$name.pdf"
done
```

带错误容错、只重编有改动的文件：

```bash
#!/usr/bin/env bash
# build_chapters.sh —— 增量批量编译
set -euo pipefail
for f in chapters/*.typ; do
  name="$(basename "$f" .typ)"
  out="out/$name.pdf"
  if [[ ! -f "$out" || "$f" -nt "$out" ]]; then
    echo ">>> 编译 $name"
    typst compile --root . "$f" "$out" || echo "!!! $name 失败"
  else
    echo "跳过（未变更）: $name"
  fi
done
```

### 3. 与 LaTeX / pandoc 配合（排版工作流互通）

- **从 LaTeX 迁移**：typst 可直接引用现有 `.bib` 文件（见五·5），公式语法与 LaTeX 高度相似（`$x^2$`、`\frac`、`\sum`），迁移成本低。
- **与 pandoc 转换**：typst 暂未被 pandoc 原生直接输出，但可先用 pandoc 把 Markdown/HTML 转成 LaTeX 再手动搬运；更多场景是"内容在 Markdown，用 typst 做最终排版"，可通过脚本把 Markdown 转成 `#include` 的章节再编译。
- **生成适合嵌入的插图**：用 `typst compile -f svg` 生成矢量图，再 `#image` 进 LaTeX/HTML 文档，或直接作为 Markdown 插图引用：

```bash
typst compile -f svg --root . plot.typ plot.svg
# 在 Markdown 中直接使用：![](plot.svg)
```

### 4. 与 latexindent 类似：代码风格与 lint

typst 官方 CLI 未内置格式化器，但可用 `typstfmt`（第三方）统一团队代码风格：

```bash
# 安装 typstfmt（Rust 工具，需 cargo）
cargo install typstfmt

# 递归格式化整个项目，保持风格一致
typstfmt -r .

# 与 git 集成：提交前检查是否已格式化
git diff --name-only '*.typ' | xargs typstfmt --check
```

配合 pre-commit 钩子，保证提交的 `.typ` 都经过格式化。

### 5. CI 集成：GitHub Actions 自动构建并发布 PDF

在 `.github/workflows/release.yml` 中定义：任何 push 到 `main` 或打 tag 时自动编译并上传：

```yaml
name: Build Typst PDF
on:
  push:
    branches: [main]
    tags: ['v*']
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # 用官方 typst-actions，缓存包依赖与字体
      - name: Setup typst
        uses: typst-community/setup-typst@v3
        with:
          cache-dependency-hash: ${{ hashFiles('**/*.typ') }}

      - name: Build PDF
        run: typst compile --root . main.typ main.pdf

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: report-pdf
          path: main.pdf

      - name: Publish release on tag
        if: startsWith(github.ref, 'refs/tags/')
        uses: softprops/action-gh-release@v2
        with:
          files: main.pdf
```

在 `.gitignore` 中忽略产物、提交源码即可，让 CI 在干净环境重现编译：

```gitignore
*.pdf
*.png
*.svg
out/
dist/
```

### 6. 生产级实践清单

- **固定版本**：CI 用官方 setup action 并锁定 typst 版本，配合 `.tectonic`/lockfile 思想，保证可复现。
- **字体随仓库走**：用 `--font-path ./fonts` 并提交开源字体，任何机器编译结果一致。
- **离线依赖**：把 `@preview` 包固化进项目 `packages/`，或提前 `typst compile` 预热缓存，避免 CI 网络抖动。
- **差异可读**：在 Git 中做 `typst diff`（配合 `typst-preview` 的 diff 能力或二进制对比）审查排版改动。
- **异常隔离**：构建脚本用 `set -euo pipefail`，编译失败立即中断 CI，避免发布残缺产物。