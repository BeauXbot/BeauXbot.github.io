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

- **用自定义模板控制输出**：`pandoc -D html > mytemplate.html` 可导出默认 HTML 模板，改完后用 `--template=mytemplate.html` 复用；LaTeX/PDF 用 `pandoc -D latex` 同理。模板里可用 `$title$`、`$author$`、`$body$` 等变量占位。

- **过滤器和管道（filter）**：pandoc 支持 Lua 过滤器，用于自定义转换逻辑。写一个 `change.lua`，然后在命令里加 `--lua-filter=change.lua` 即可在转换前后改写文档结构（如给所有图片加 caption、自动编号公式等）。

- **批量转换脚本**：配合 find 循环，一条命令批量转整个目录：

  ```bash
  for f in src/*.md; do pandoc "$f" -s -o "build/$(basename "${f%.md}").html"; done
  ```

- **与其它工具搭配**：把 pandoc 嵌进构建流程（如 Makefile / xmake / CI），或在编辑器里用插件一键导出。输出 PDF 前可先 `--pdf-engine=xelatex` 配 `-V mainfont="PingFang SC"` 指定中文字体；输出为 epub 时加 `--epub-metadata` 与 `--epub-cover-image` 补全书信息。

## 六、注意事项与常见问题

- **中文 PDF 乱码/缺字**：默认 pdflatex 引擎不含中文字体，会输出空白或乱码。务必改用 `--pdf-engine=xelatex`，并加 `-V CJKmainfont="PingFang SC"` 或 `-V mainfont="PingFang SC"`；更省事的是装 `mactex-no-gui` 或 `basictex`。

- **HTML 输出没有 `<html>` 头尾**：没加 `-s/--standalone` 时只输出正文片段。要完整网页必须加 `-s`。

- **docx 样式不对**：直接转的 docx 用默认样式，想对齐公司模板要先生成 `--print-default-data-file reference.docx` 参考文档并改样式，再以 `--reference-doc` 传回。

- **`pandoc: Unknown command` 或找不到引擎**：多半是 LaTeX 引擎缺失。检查 `which xelatex`，没有就用 `brew install --cask basictex` 或 `mactex-no-gui` 安装。

- **性能与安全**：处理超大文档或上千个文件时，pandoc 是单进程内存转换，超大文件会占用较多内存，可分批转换。官方提醒：不要直接渲染来源不可信的输入，pandoc 模板/过滤器可能执行任意代码；转换外部来源的模板文件前先审查其内容。