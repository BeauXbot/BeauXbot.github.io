---
title: pandoc
icon: book
category:
  - 工具
  - 文档转换
tag:
  - 文档与排版
  - pandoc
---

# pandoc（万能文档格式转换器）

> Homebrew 版本 3.8.3 ｜ 主页：见官方文档 ｜ 安装：`brew install pandoc`

## 一、它是什么

pandoc 是一款"瑞士军刀"式的文档格式转换器，能在一百多种标记语言和文本格式之间自由转换，比如 Markdown、HTML、LaTeX、Word（docx）、PDF、epub、reStructuredText、Org-mode 等。它解决的核心问题是"写一次、处处可用"：你用 Markdown 写内容，一个命令就能输出论文、演示文稿、电子书或网页，无需手工排版。典型应用场景包括：把 Markdown 笔记导出为 Word 交作业、把 LaTeX 论文转成 epub 上传电子书平台、把多份 Markdown 拼接成一份 HTML 报告，或配合模板引擎生成 PDF。

## 二、安装与升级

```bash
# 安装（依赖 pandoc 引擎，会自动拉取，体积约几十 MB）
brew install pandoc

# 升级到最新版
brew upgrade pandoc

# 卸载
brew uninstall pandoc

# 验证安装成功（应输出版本号，如 pandoc 3.8.3）
pandoc --version
```

> 提示：`pandoc --version` 第一行会显示版本号。若需要 PDF 输出，还需额外安装 LaTeX 引擎（如 `brew install --cask mactex-no-gui` 或 lightweight 的 `basictex`）。

## 三、常用命令速查

| 命令/参数 | 作用 | 示例 |
| --- | --- | --- |
| `pandoc 输入 -o 输出` | 基础转换，根据扩展名自动判断格式 | `pandoc a.md -o a.html` |
| `-f 格式 -t 格式` | 显式指定输入/输出格式 | `pandoc a.txt -f markdown -t html` |
| `--toc` | 生成目录（适用于 PDF/HTML/epub） | `pandoc a.md --toc -o a.html` |
| `--number-sections` | 章节自动编号（LaTeX/PDF/HTML） | `pandoc a.md --number-sections -o a.pdf` |
| `--template=文件` | 使用自定义模板 | `pandoc a.md --template=my.tex -o a.pdf` |
| `--metadata title=xx` | 在命令行注入元数据（标题/作者等） | `pandoc a.md --metadata title="报告" -o a.pdf` |
| `--standalone` / `-s` | 输出完整独立文档（含头尾），HTML 时必须有 | `pandoc a.md -s -o a.html` |
| `--highlight-style=名称` | 代码高亮风格（如 zenburn、tango） | `pandoc a.md --highlight-style=zenburn -o a.html` |
| `--reference-doc=文件` | 用参考文档控制 docx 的样式 | `pandoc a.md --reference-doc=ref.docx -o a.docx` |
| `-M` / `--variable` | 设置模板变量 | `pandoc a.md --variable fontsize=11pt -o a.pdf` |

## 四、实际示例

**示例 1：Markdown 转 HTML 网页（最常用）**

准备一个 `report.md`：

```markdown
---
title: 项目周报
author: 张三
date: 2025-01-10
---

# 本周进展

- 完成接口联调
- 修复 3 个 bug

```python
print("hello pandoc")
```
```

执行转换：

```bash
# 用 -s 生成完整网页，--toc 加目录
pandoc report.md -s --toc --metadata lang=zh-CN -o report.html
# 打开查看
open report.html
```

**示例 2：Markdown 转 Word（docx）并指定样式**

```bash
# 直接转换（默认样式）
pandoc report.md -o report.docx

# 先用官方模板生成参考文档，再自定义样式
pandoc -o custom-reference.docx --print-default-data-file reference.docx
# 编辑 custom-reference.docx 的字体/标题样式后：
pandoc report.md --reference-doc=custom-reference.docx -o report.docx
```

**示例 3：多份 Markdown 合并生成 PDF（含封面、目录）**

```bash
# 合并多个 md 文件（按顺序），--toc 生成目录，-N 自动编号
pandoc chapter1.md chapter2.md chapter3.md \
  -o book.pdf \
  --toc --number-sections \
  --metadata title="我的书" \
  --metadata author="作者名" \
  --pdf-engine=xelatex
```

> 说明：中文字体需要 xelatex 引擎，否则默认 pdflatex 对中文支持很差，会报 "Missing character" 或乱码。

**示例 4：Markdown 转演示文稿（reveal.js HTML 幻灯片）**

```bash
pandoc slides.md -t revealjs -s -o slides.html
# 打开即浏览器演示，按方向键翻页
open slides.html
```

`slides.md` 里用 `---` 分隔每一页：

```markdown
# 第一页标题

- 要点一

---

# 第二页标题

| 列A | 列B |
| --- | --- |
| 1 | 2 |
```

## 五、进阶技巧与配置

### 5.1 自定义模板（模板变量与控制）

`pandoc -D` 可导出任意格式的默认模板，改完再 `--template` 传回复用：

```bash
# 导出默认模板
pandoc -D html > mytemplate.html
pandoc -D latex > myreport.tex      # LaTeX/PDF 模板
pandoc -D docx > myref.docx         # docx 参考文档

# 使用自定义模板
pandoc report.md --template=mytemplate.html -s -o report.html
```

模板内部使用 `$title$`、`$author$`、`$date$`、`$body$`、`$toc$` 等变量占位，可用 `$if(变量)$...$else$...$endif$` 做条件分支。`--metadata` 与 `-V/--variable` 都能向模板传值，区别是：

- `--metadata/-M`：写入文档元数据，仅用于模板、可作为过滤器读取。
- `-V/--variable`：仅作为模板变量传给渲染层，不写入文档元数据（适合传字体、字号等排版参数）。

```bash
# 用变量控制 LaTeX 排版参数
pandoc report.md -o report.pdf --pdf-engine=xelatex \
  -V geometry:margin=2.5cm \
  -V fontsize=11pt \
  -V linestretch=1.3 \
  -V colorlinks=true \
  -V linkcolor=blue
```

### 5.2 目录、章节编号与页码

```bash
# --toc 目录深度 + --number-sections 编号 + 底部目录
pandoc report.md -s --toc --toc-depth=3 --number-sections -o report.html

# LaTeX/PDF 里目录标题用中文
pandoc report.md -o report.pdf --pdf-engine=xelatex \
  --toc -V toc-title="目录"
```

### 5.3 引用管理与 citeproc（参考文献）

pandoc 内置 citeproc 处理器，把 Markdown 里的 `[@citekey]` 自动渲染为参考文献列表：

```bash
# 生成带引用的文档（--citeproc 自动排序并输出 Bibliography）
pandoc paper.md --citeproc --bibliography=refs.bib \
  --csl=ieee.csl -o paper.html
```

配套 `.bib`（BibTeX 格式）示例：

```bibtex
@article{knuth1984,
  author  = {Donald E. Knuth},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  year    = {1984},
  volume  = {27},
  pages   = {97--111}
}
```

正文里写 `见 [@knuth1984, pp.~100]`，pandoc 会根据所选 CSL 样式（如 `ieee`、`apa`、`chicago-author-date`）自动生成文内引注和文末参考文献。常用 CSL 可从 [citationstyles.org](https://www.zotero.org/styles) 下载。

### 5.4 Lua 过滤器（改写文档结构）

Lua 过滤器在转换的 AST（抽象语法树）阶段介入，可批量改写。例如给所有图片自动加编号与标题的 `figure.lua`：

```lua
-- figure.lua：给图片补充 caption 编号
local counter = 0
function Image(el)
  counter = counter + 1
  if not el.caption then
    el.caption = pandoc.List{pandoc.Str("图 " .. counter)}
  end
  return el
end
```

```bash
pandoc report.md --lua-filter=figure.lua -o report.html
```

也可用 JSON 管道把 pandoc 接进任意程序：

```bash
# 导出 JSON AST → 用脚本处理 → 再导回（等价于自定义过滤器）
pandoc report.md -t json | jq '.blocks' | pandoc -f json -t html
```

### 5.5 常用配置项与环境变量

| 配置/环境变量 | 作用 |
| --- | --- |
| `--pdf-engine=xelatex/lualatex/wkhtmltopdf/weasyprint` | 指定 PDF 引擎 |
| `--toc-depth=数字` | 目录层级深度 |
| `--number-sections` / `-N` | 章节自动编号 |
| `--highlight-style=名称` | 代码高亮主题（tango/zenburn/kate 等） |
| `--columns=数字` | 指定输出列宽 |
| `--wrap=auto/none/preserve` | 控制换行行为 |
| `--resource-path=路径` | 附加资源搜索路径（图片/模板） |
| `--defaults=配置文件.yml` / `-d` | 读取 YAML 默认配置（见下） |
| `--embed-resources` | 把图片/样式内嵌进 HTML（离线单文件） |
| `--self-contained`（旧名） | 旧版内嵌资源的别名 |
| `PANDOC_*` 系列环境变量 | 与 `--*` 命令参数一一对应（见下） |

**环境变量前缀机制**：任何命令行参数 `--foo` 都有对应的环境变量 `PANDOC_FOO`，便于在 CI 或脚本里统一注入默认行为：

```bash
export PANDOC_PDF_ENGINE=xelatex
export PANDOC_TOC=true
export PANDOC_NUMBER_SECTIONS=true
pandoc report.md -o report.pdf   # 自动套用上面三项
```

**默认配置文件（`--defaults`）**：把整套参数固化到 YAML，团队/项目间复用，尤其适合多章节大文档：

```yaml
# pandoc-defaults.yaml
from: markdown
to: pdf
pdf-engine: xelatex
toc: true
toc-depth: 2
number-sections: true
variables:
  mainfont: "PingFang SC"
  geometry: "margin=2.5cm"
filters:
  - figure.lua
bibliography: refs.bib
citeproc: true
metadata:
  lang: zh-CN
```

```bash
pandoc report.md --defaults=pandoc-defaults.yaml -o report.pdf
# 也可用 -d 缩写
pandoc report.md -d pandoc-defaults.yaml -o report.pdf
```

### 5.6 多章节大文档组织（\input / 主文档拆分）

对书籍、学位论文等大型项目，把内容按章节拆成多个 `.md`，用主文档统一装配。有两种主流思路：

**方式 A：命令行按顺序拼接（最灵活）**

```bash
pandoc 00-cover.md 01-intro.md 02-method.md 03-results.md \
  99-appendix.md \
  -o thesis.pdf \
  --toc --number-sections \
  --bibliography=refs.bib --citeproc \
  --pdf-engine=xelatex \
  -V mainfont="PingFang SC"
```

**方式 B：借助 Lua 过滤器实现 `\input` 式包含（LaTeX 风格）**

若想让 Markdown 里也能写 `:::{.include} file.md :::` 之类指令，可写一个 `include.lua` 过滤器在 AST 阶段把子文件内容并入，从而在正文中控章节、复用片段：

```lua
-- include.lua：按需读取并解析子文档（简化示例）
function Div(el)
  if el.classes[1] == "include" then
    local f = io.open(el.identifier .. ".md", "r")
    if f then
      local content = f:read("*a")
      f:close()
      return pandoc.read(content, "markdown").blocks
    end
  end
  return el
end
```

配合上述方式 A 已足够覆盖绝大多数场景：**拆文件 → 主文档拼接 → 统一目录/编号/文献**。

### 5.7 输出 epub / docx / pptx 的进阶

```bash
# epub：指定封面与书信息
pandoc novel.md -o novel.epub \
  --epub-cover-image=cover.jpg \
  --epub-metadata=meta.xml \
  --toc

# docx：生成参考文档做精细排版
pandoc -o custom-reference.docx --print-default-data-file reference.docx
# 用 word 打开改样式后：
pandoc report.md --reference-doc=custom-reference.docx -o report.docx

# pptx：Markdown 直接出演示文稿
pandoc slides.md -o slides.pptx
```

## 六、注意事项与常见问题

- **中文 PDF 乱码/缺字**：默认 pdflatex 引擎不含中文字体，会输出空白或乱码。务必改用 `--pdf-engine=xelatex`，并加 `-V CJKmainfont="PingFang SC"` 或 `-V mainfont="PingFang SC"`；更省事的是装 `mactex-no-gui` 或 `basictex`。若用 `lualatex`，则通过 `-V mainfont=` 指定字体即可。

- **HTML 输出没有 `<html>` 头尾**：没加 `-s/--standalone` 时只输出正文片段。要完整网页必须加 `-s`。

- **docx 样式不对**：直接转的 docx 用默认样式，想对齐公司模板要先生成 `--print-default-data-file reference.docx` 参考文档并改样式，再以 `--reference-doc` 传回。注意：改完的参考文档结构需与官方一致，若增删样式可能会被忽略。

- **`pandoc: Unknown command` 或找不到引擎**：多半是 LaTeX 引擎缺失。检查 `which xelatex`，没有就用 `brew install --cask basictex` 或 `mactex-no-gui` 安装。也可改用不需要 TeX 的引擎如 `--pdf-engine=weasyprint`（HTML→PDF，对中文更省心）或 `--pdf-engine=wkhtmltopdf`。

- **`Could not load module Text.Pandoc` 类报错**：多为版本或依赖不完整。先 `brew upgrade pandoc`，仍失败则 `brew uninstall` 后 `brew install` 重装。

- **图片路径丢失 / 资源找不到**：Markdown 里图片用相对路径时，转换后可能找不到。用 `--resource-path=.` 或 `--resource-path=images` 指定资源搜索目录；生成单文件 HTML 时加 `--embed-resources` 把图片内嵌，避免外链失效。

- **`--toc` 目录为空**：目录依赖文档的章节标题结构。确认内容确实用了标题（`#`/`##`），且没被 `--shift-heading-level-by` 或自定义模板破坏标题层级。

- **BibTeX 引用不出现**：加了 `--bibliography` 却无参考文献，多半漏了 `--citeproc`。两者需同时出现；或确认 `.bib` 里确实有对应 key 被正文 `[@key]` 引用到。

- **CSL 样式报错 / 版本不符**：`--csl` 文件需与 pandoc 的 citeproc 版本兼容，若报解析错误，去 [citationstyles.org](https://www.zotero.org/styles) 下载最新版替换。

- **输出 PDF 很慢 / 报 TeX 内存不足**：大型文档可提高 TeX 的 `main_memory`，或用 `--pdf-engine=latexmk` 自动重跑。也可先转 LaTeX 再手动编译，便于排查 LaTeX 语法错误：

  ```bash
  pandoc report.md -t latex -o report.tex
  xelatex report.tex
  ```

- **性能**：pandoc 是单进程、整篇载入内存转换。超大文件（数十 MB）会占较多内存，建议按章节拆分再拼接，或分批转换后合并。

- **安全**：pandoc 模板与 Lua 过滤器可执行任意代码。官方明确提醒——**不要用来源不可信的模板或过滤器**，也不要把不可信输入渲染进会执行模板的输出流程。转换外部来源的 `.tex` 模板前务必先审查内容。

## 七、实战：与其它工具搭配与自动化

### 7.1 与 LaTeX/排版工作流集成

pandoc 与 LaTeX 双向打通：Markdown 写内容 → pandoc 出 LaTeX 主文档 → 再用 LaTeX 工具链细化排版。

```bash
# 一键 Markdown → 规范 LaTeX 源码
pandoc chapter.md -s -t latex --number-sections --citeproc \
  --bibliography=refs.bib -o chapter.tex

# 直接产出学位论文风格的 PDF（自定义 preamble）
pandoc thesis.md -o thesis.pdf --pdf-engine=xelatex \
  -H preamble.tex \
  --toc --number-sections
```

其中 `-H preamble.tex` 把自定义导言区（宏包、页眉页脚、标题样式）插入生成的 LaTeX 前部，是定制 PDF 最常用的手法。

### 7.2 与 latexindent 配合格式化生成的 LaTeX

把 pandoc 输出的 LaTeX 交给 `latexindent` 统一缩进与排版，再提交版本库：

```bash
# latexindent 格式化（需先安装：brew install latexindent）
pandoc report.md -s -t latex -o report.tex
latexindent report.tex -s -o report-formatted.tex
mv report-formatted.tex report.tex
```

### 7.3 与 pandoc-crossref / pandoc-citeproc 联动

大型文档常需公式、图表、章节交叉引用。`pandoc-crossref` 是社区过滤器，能给公式/图/表编号并交叉引用：

```bash
# 安装过滤器
brew install pandoc-crossref

# 正文里写 {#fig:name}、[@fig:name]、{@eq:name} 等
pandoc paper.md -s --filter pandoc-crossref --citeproc \
  --bibliography=refs.bib -o paper.html
```

Markdown 示例：

```markdown
![实验流程图](flow.png){#fig:flow}

图 @fig:flow 展示了流程，公式见 @eq:loss。

$$ loss = ||\hat{y} - y||^2 $$ {#eq:loss}
```

### 7.4 Makefile 自动化（书籍/报告多目标构建）

把全套构建流程固化为 `Makefile`，一次 `make` 出全部产物：

```makefile
# Makefile —— pandoc 书籍构建
MD   := 00-cover.md 01-intro.md 02-method.md 03-results.md
PDF  := book.pdf
HTML := book.html
DOCX := book.docx

all: $(PDF) $(HTML) $(DOCX)

%.pdf: $(MD)
	pandoc $(MD) -o $@ --toc --number-sections \
		--pdf-engine=xelatex -V mainfont="PingFang SC"

%.html: $(MD)
	pandoc $(MD) -s -o $@ --toc --metadata lang=zh-CN

%.docx: $(MD)
	pandoc $(MD) -o $@

clean:
	rm -f $(PDF) $(HTML) $(DOCX) *.tex

.PHONY: all clean
```

```bash
make          # 构建全部产物
make book.pdf # 只构建 PDF
make clean    # 清理
```

### 7.5 批量转换脚本（目录/多格式）

```bash
# 目录内全部 md → HTML（保留相对路径结构）
mkdir -p build
for f in $(find src -name '*.md'); do
  out="build/${f#src/}"
  mkdir -p "$(dirname "$out")"
  pandoc "$f" -s -o "${out%.md}.html"
done

# 同一份 md 一次输出多种格式
pandoc report.md -o report.html -o report.docx -o report.pdf \
  --pdf-engine=xelatex

# 带进度提示的批量转换
for f in chapters/*.md; do
  echo "converting $f ..."
  pandoc "$f" -o "out/$(basename "${f%.md}").docx"
done
```

### 7.6 CI 集成（GitHub Actions）

在 CI 中自动构建并上传产物，适合文档站点、书籍出版流水线：

```yaml
# .github/workflows/build-docs.yml
name: Build Docs

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - uses: pandoc/actions/setup@v1

      - name: Install TeX for PDF
        run: sudo apt-get update && sudo apt-get install -y \
             texlive-xetex texlive-lang-chinese

      - name: Build
        run: make all

      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: |
            book.pdf
            book.html
            book.docx
```

### 7.7 生产级实践要点

- **固定版本**：在 CI 与本地用同一 pandoc 版本（`pandoc -v` 记录版本号），或锁住 brew 公式，避免升级导致输出差异。
- **用默认配置文件固话参数**：把 `--defaults` 配置入库，团队统一风格、避免命令漂移。
- **产物与源分离**：源文件进 `src/`，产物进 `build/` 并加入 `.gitignore`，让 CI 从干净环境重建。
- **善用 `--verbose`**：出问题时加 `--verbose` 看完整日志，快速定位是语法、字体还是引用问题。
- **先小后大**：先转一章验证模板/字体/过滤器正常，再跑全量，避免大文档反复踩坑浪费时间。