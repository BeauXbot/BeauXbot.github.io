---
title: latexindent
icon: book
category:
  - 工具
  - LaTeX 工具
tag:
  - 文档与排版
  - latexindent
---

# latexindent（LaTeX 文件自动缩进/格式化工具）

> Homebrew 版本 3.24.7 ｜ 主页：见官方文档 ｜ 安装：`brew install latexindent`

## 一、它是什么

latexindent 是一个专门用于 LaTeX 源文件的自动缩进与格式化工具，它根据 LaTeX 的环境、命令、括号嵌套层级和代码注释，自动把混乱的 `.tex` 源文件整理成统一、清晰、易读的排版结构。它能解决"手写 LaTeX 缩进不规范、多人协作格式混乱、从编辑器复制粘贴后排版错乱"这类痛点，非常适合在提交代码前格式化、批量整理旧文档、或配合编辑器保存时自动整理使用。

## 二、安装与升级

```bash
# 安装
brew install latexindent

# 升级
brew upgrade latexindent

# 卸载
brew uninstall latexindent

# 验证安装成功（查看版本号）
latexindent --version
```

安装成功后，终端输入 `latexindent -h` 可查看帮助信息。它会附带安装 Perl 及若干依赖模块（如 `YAML::Tiny`、`File::HomeDir` 等），首次运行时无需额外配置。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `latexindent <file>` | 格式化指定文件，结果输出到 `<file-indent.log>`（默认不覆盖原文件） | `latexindent main.tex` |
| `-w` / `--overwrite` | 覆盖写入原文件（原地格式化） | `latexindent -w main.tex` |
| `-o <outfile>` | 把结果输出到指定文件 | `latexindent -o formatted.tex main.tex` |
| `-s` / `--silent` | 静默模式，抑制日志输出 | `latexindent -s -w main.tex` |
| `-l <yaml>` / `--local` | 使用自定义配置文件（localSettings YAML） | `latexindent -l my.tex` |
| `-m` / `--modifylinebreaks` | 修改断行（配合 `-l` 设置的文件行宽） | `latexindent -m -l my.tex main.tex` |
| `-r` / `--replacement` | 配合 `-m` 使用，允许替换旧文档的断行方式 | `latexindent -m -r -w main.tex` |
| `-g <log>` / `--logfile` | 指定日志文件路径 | `latexindent -g fmt.log main.tex` |
| `-c <dir>` | 指定操作目录（方便批量处理多个文件） | `latexindent -c src main.tex` |
| `-t` / `--trace` | 输出详细调试追踪信息 | `latexindent -t -w main.tex` |
| `-vv` | 显示 verbose 级日志 | `latexindent -vv -w main.tex` |

> 提示：不带 `-w` 时 latexindent **不会修改原文件**，结果写入 `<文件名>-indent.log` 中，方便先检查效果再决定是否覆盖。

## 四、实际示例

### 示例 1：格式化单个文件并预览结果

```bash
# 准备一个缩进混乱的测试文件
cat > messy.tex <<'EOF'
\documentclass{article}
\begin{document}
\begin{itemize}
\item 苹果
\item 香蕉
\begin{enumerate}
\item 子项一
\item 子项二
\end{enumerate}
\end{itemize}
\end{document}
EOF

# 格式化（不覆盖原文件，结果写到 messy-indent.log）
latexindent messy.tex

# 查看格式化结果
cat messy-indent.log
```

执行后 `messy-indent.log` 中每个环境内的内容会正确缩进，`\item` 与嵌套环境层级清晰。

### 示例 2：原地覆盖格式化并静默处理

```bash
# 直接覆盖原文件，且不输出多余日志
latexindent -s -w messy.tex

# 确认文件已被改写
cat messy.tex
```

`-s` 抑制日志、`-w` 原地写回，两者组合适合在脚本或编辑器保存钩子里调用。

### 示例 3：用自定义配置控制缩进宽度与换行

```bash
# 编写自定义配置 localSettings.yaml
cat > localSettings.yaml <<'EOF'
indentAfterItems:
    - enumerate
    - itemize
defaultIndent: "    "
```

```bash
# 使用配置格式化（-m 按配置调整断行，-w 覆盖原文件）
latexindent -m -l localSettings.yaml -w main.tex
```

自定义 YAML 中可设置默认缩进、是否在列表项后缩进、环境放行/排除规则、替换文件头（preamble）等大量参数，实现项目级统一的格式规范。

### 示例 4：批量格式化目录下的所有 .tex 文件

```bash
# 对 src 目录下所有 .tex 文件逐个原地格式化
for f in src/*.tex; do
    latexindent -s -w "$f"
done

# 或使用 -c 指定目录
latexindent -c src -s -w src/main.tex
```

批量处理时注意：不带 `-w` 会在每个文件旁生成 `.indent.log`，正式提交前可用 `git diff` 检查改动。

## 五、进阶技巧与配置

### 5.1 配置文件位置与加载优先级

latexindent 按**从低到高**的优先级合并配置，后者覆盖前者：

1. 内建 `defaultSettings.yaml`（安装目录中的默认值）；
2. 用户级 `~/.indentconfig.yaml`（或 `~/.latexindent.yaml`），对所有项目生效；
3. 项目级 `localSettings.yaml`（当前目录），通过 `-l` 显式指定，或在当前目录自动发现。

```bash
# 查看本机内建默认配置（可作为个性化起点，参考其所有可用键）
latexindent --defaults | less
# 或直接查看安装位置的原始文件
less "$(brew --prefix latexindent)"/defaultSettings.yaml
```

> 提示：`defaultSettings.yaml` 是唯一权威的"完整键表"。个人配置只需写想覆盖的键即可，未写到的仍取默认值。

### 5.2 一份可直接使用的个性化配置

把下面的内容存成 `~/.indentconfig.yaml`（对所有项目生效）或项目根目录的 `localSettings.yaml`：

```yaml
# 缩进基础
defaultIndent: "  "                    # 两级空格缩进
indentAfterItems: []                    # 列表项后不再额外缩进（紧凑风格）

# 命名规则与放行环境
lookForAlignDelims:
    tabular:
        alignDoubleBackSlash: 1         # 表格中对齐 & 分隔
    matrix:
        alignDoubleBackSlash: 1

# 断行控制（modifylinebreaks）
modifyLineBreaks:
    preserveBlankLines: 1
    condenseMultipleBlankLinesInto: 0   # 不合并连续空行
    removeSentenceLineBreaks: 0         # 保持中文/句子的手动换行不被改动
    oneSentencePerLine: 0               # 不强制每句一行（对中文长句尤其重要）

# 放行环境 / 排除环境
noAdditionalIndent:
    - verbatim
    - lstlisting
    - minted
    - equation
    - align

# 允许 latexindent 在找不到匹配时也尝试缩进
alwaysLookforHit: 1
```

> 说明：`removeSentenceLineBreaks: 0` 和 `oneSentencePerLine: 0` 对**中文/混排文档**是保命选项——latexindent 默认会尝试合并行，中文断句规则不同，极易把注释或句段拼错行，务必显式关闭。

### 5.3 常用配置键速查表

| 配置键 | 作用 | 常用取值 |
| --- | --- | --- |
| `defaultIndent` | 默认缩进字符串 | `"  "` 或 `"\t"`（用制表符） |
| `indentAfterItems` | 列表项(`\item`)后是否缩进 | `[]`（不缩）或 `[enumerate,itemize]` |
| `noAdditionalIndent` | 这些环境不再额外缩进 | 数组，如 `[verbatim,equation]` |
| `alwaysLookforHit` | 找不到括号匹配时也缩进 | `1` / `0` |
| `modifyLineBreaks.preserveBlankLines` | 保留空行 | `1` / `0` |
| `modifyLineBreaks.removeSentenceLineBreaks` | 是否合并句间换行 | `1` / `0` |
| `modifyLineBreaks.oneSentencePerLine` | 每句独立一行 | `1` / `0` |
| `lookForAlignDelims` | 表格/矩阵对齐 `&` 与 `\\` | 见官方文档 |
| `textWrapOptions` | 配合 `-m` 设定行宽折行 | `{columns: 80, ...}` |

### 5.4 环境变量

- `LATEXINDENT_LOGFILE`：设置默认日志文件路径，代替每次敲 `-g`。
- `LATEXINDENT_LOCAL_SETTINGS`：指定默认的 localSettings 文件，代替 `-l`。
- `HOME` / `XDG_CONFIG_HOME`：影响用户级配置文件查找位置。
- `PERL5LIB`：自定义 Perl 库路径，用于指向额外安装的 `YAML::Tiny` 等模块（一般不需手动设置，Homebrew 已配好）。

```bash
# 示例：用环境变量固定配置与日志位置
export LATEXINDENT_LOCAL_SETTINGS="$HOME/dotfiles/latex/latexindent.yaml"
export LATEXINDENT_LOGFILE="/tmp/latexindent.log"
latexindent -m -w main.tex        # 自动读上面配置，日志写到 /tmp/latexindent.log
```

### 5.5 与编辑器深度集成

**Vim / Neovim**（保存时自动格式化）：

```vim
" ~/.vimrc 或 ~/.config/nvim/init.vim
autocmd FileType tex setlocal formatprg=latexindent\ -s\ -t
autocmd BufWritePre *.tex silent! execute '%! latexindent -s -t -g /dev/null'
```

> 说明：`%!` 是把当前缓冲区内容通过管道交给外部命令再写回。`-t` 生成 trace 日志便于排查，生产可去掉。若想用项目级配置，把 `-s` 换成 `-s -m -l localSettings.yaml`。

**VS Code**：配合 `LaTeX Workshop` 扩展，在其 `settings.json` 中：

```json
{
  "latex-workshop.formatting.latex": "latexindent",
  "latex-workshop.formatting.latex.args": [
    "-l",
    "%DIR%/localSettings.yaml",
    "-c",
    "%DIR%/",
    "%TMPFILE%",
    "-o",
    "%TMPFILE%"
  ],
  "[latex]": { "editor.formatOnSave": true }
}
```

**Sublime Text**：用 LaTeXing 等包的 `latexindent` 命令，绑定 `alt+shift+f` 一键格式化。

### 5.6 检查改动而不是盲覆盖

先在无 `-w` 模式下生成 `.indent.log`，用 `diff` 对比确认符合预期后再落盘：

```bash
latexindent -s -m -l localSettings.yaml main.tex
diff main.tex main-indent.log   # 逐行查看差异
# 确认无误后真正覆盖
latexindent -s -m -l localSettings.yaml -w main.tex
```

## 六、注意事项与常见问题

### 6.1 新手踩坑

1. **不覆盖原文件是默认行为**：很多新手以为命令执行后文件已格式化，其实结果写在 `<文件名>-indent.log`。需要真正改文件务必加 `-w`（`--overwrite`）。

2. **忘记 `-l` 时项目配置不生效**：默认不会自动读取项目级 `localSettings.yaml`，除非该文件就在当前目录且被自动发现。多目录项目建议始终显式 `-l`，避免不同子目录行为不一致。

3. **先跑通小文件再上大文件**：新配置第一次使用，先在几十行的样例上跑一遍看效果，再应用到全书，否则错误的缩进规则会污染整个项目。

4. **`-r` 必须搭配 `-m`**：`-r`（replacement）只与 `-m` 配合使用，用来替换旧断行方式；单独用 `-r` 可能无效或报参数错误。

### 6.2 常见报错及解决办法

| 报错 / 现象 | 原因 | 解决办法 |
| --- | --- | --- |
| `Can't locate YAML/Tiny.pm` | Perl 模块缺失（环境异常） | `brew reinstall latexindent` 重新装依赖；或 `cpan YAML::Tiny File::HomeDir Unicode::GCString` |
| 中文乱码、注释被改写 | 源文件非 UTF-8 编码 | 先 `iconv -f GBK -t UTF-8 in.tex > out.tex` 转码再处理 |
| 长中文句被合并成一行 | 默认句子断行规则不适合中文 | 配置 `modifyLineBreaks.removeSentenceLineBreaks: 0` 与 `oneSentencePerLine: 0` |
| `align` 等环境内部缩进被改坏 | `noAdditionalIndent` 未放行数学环境 | 在配置 `noAdditionalIndent` 里加入 `equation`、`align`、`gather` 等 |
| 生成大量 `.indent.log` | 批量处理未加 `-w` | 批量脚本统一加 `-s -w`，或每次清理 `find . -name '*-indent.log' -delete` |
| 处理时速度极慢 | 打开了 `-t` trace 或 `-vv` | 正式批处理用 `-s`，关掉追踪 |

### 6.3 性能与安全注意点

- **大文件性能**：处理几百 KB 到 MB 级的大型文档时，trace/verbose 模式会显著变慢，正式批处理建议用 `-s` 静默模式并关闭 `-t` 追踪。
- **不要格式化算法/宏密集的片段**：对包含大量复杂 `\if...\else`、自定义宏嵌套的代码，latexindent 可能调整其本不该动的断行。使用 `-m` 时要先 `diff` 检查，或利用 `modifyLineBreaks` 白名单/黑名单按需排除。
- **进版控制前先看 diff**：批量覆盖前用 `git diff --stat` 确认改动规模合理，防止把全项目几百行无谓重排带入提交。
- **备份**：涉及大规模历史文档重排，建议先 `git checkout` 一份或 `cp -r` 备份目录，再跑格式化。

## 七、实战：与其它工具搭配与自动化

### 7.1 大型 LaTeX 项目组织（多章节 + 主文档管理）

对大项目，常把文档拆成多个章节文件，用 `\input` 或 `\subfile` 组装，latexindent 逐文件处理但保持统一风格：

```text
book/
├── main.tex            # 主文档（\input 或 \subfile 引入各章节）
├── localSettings.yaml  # 项目级统一缩进配置
├── chapters/
│   ├── intro.tex
│   ├── method.tex
│   └── conclusion.tex
└── figures/
```

```bash
# 一次性格式化主文档 + 所有章节，全用同一份项目配置
latexindent -s -m -l localSettings.yaml -w main.tex chapters/*.tex
```

> 注意：用 `\subfile` 的项目，`main.tex` 里 `\input` 路径与各子文件 `\subfile{}` 的路径结构不同，latexindent 不解析跨文件，只逐文件格式化，无需特殊处理。

### 7.2 书目管理（bibtex / biblatex）

latexindent 只格式化 `.tex`，书目 `.bib` 用专门工具（如 `bibtool`、`bibtex-tidy`）。在自动化脚本里把它们串联：

```bash
# 先整理 bib 引用，再格式化正文
bibtex-tidy --omit=abstract,file note refs.bib -o refs.tidy.bib && mv refs.tidy.bib refs.bib
latexindent -s -m -l localSettings.yaml -w main.tex
```

### 7.3 图表目录与浮动体

表格/浮动体建议用 `lookForAlignDelims.tabular` 对齐 `&`，并在格式化后检查对齐结果：

```bash
# 强制对齐 tabular 中的 & 与 \\
latexindent -s -m -l localSettings.yaml -w tables/data-table.tex
```

### 7.4 Makefile 自动化

把格式化、清理、编译串成目标，纳入日常构建：

```makefile
# Makefile（顶层）
LATEXINDENT ?= latexindent
INDENT_ARGS ?= -s -m -l localSettings.yaml
TEXFILES := $(shell find . -name '*.tex' -not -path './build/*')

.PHONY: fmt clean pdf

fmt:                      # 统一格式化所有 .tex
	$(LATEXINDENT) $(INDENT_ARGS) -w $(TEXFILES)

clean-log:                # 清理格式化产生的日志
	find . -name '*-indent.log' -delete

check:                    # 只检查不覆盖（CI 里常用）
	@for f in $(TEXFILES); do \
	  $(LATEXINDENT) $(INDENT_ARGS) "$$f"; \
	  diff -q "$$f" "$${f%.tex}-indent.log" >/dev/null || echo "DIFF: $$f"; \
	done

pdf:                      # 格式化后走 tectonic 编译
	$(LATEXINDENT) $(INDENT_ARGS) -w main.tex
	tectonic -X compile main.tex
```

### 7.5 CI 集成（GitHub Actions 示例）

在 CI 里做"格式校验"，不通过的提交直接报红：

```yaml
# .github/workflows/format-check.yml
name: latexindent-check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install latexindent
        run: |
          sudo apt-get update
          sudo apt-get install -y latexindent
      - name: Verify formatting
        run: |
          # 对每个 tex 生成格式化结果并 diff，有差异则退出码非 0
          find . -name '*.tex' -print0 | while IFS= read -r -d '' f; do
            latexindent -s -m -l localSettings.yaml "$f"
            diff -q "$f" "${f%.tex}-indent.log" \
              || { echo "需要格式化: $f"; exit 1; }
          done
```

> 提示：在 `pre-commit` 阶段用同一套 `diff` 逻辑，让开发者本地就能自查，减少 CI 被打回。

### 7.6 批量处理与生产级实践

**批量格式化目录树（含子目录，跳过 `build/`）**：

```bash
# 用 find + 并行，处理大型项目更快
find . -name '*.tex' -not -path './build/*' -print0 \
  | xargs -0 -P 4 -I{} latexindent -s -m -l localSettings.yaml -w {}
```

**配合 pandoc 转换工作流**：pandoc 生成或他人提交的 `.tex` 格式往往不统一，先 latexindent 再进主项目：

```bash
# 用 pandoc 从 Markdown 生成 .tex，再格式化到项目规范
pandoc chapter.md -o chapter.tex
latexindent -s -m -l localSettings.yaml -w chapter.tex
```

**生产级建议清单**：

- 项目根目录固定一份 `localSettings.yaml`，团队统一引用；
- 所有脚本统一 `-s -m -l localSettings.yaml` 参数组合，避免各人写法漂移；
- 提交前 `git diff --stat` 检查改动规模；
- 在 CI 用只校验（`diff` 不覆盖）策略，代替直接 `-w` 覆盖，防止线上被悄悄改写；
- 对 `verbatim`、`minted`、算法环境显式放行，防止源码被误格式化。