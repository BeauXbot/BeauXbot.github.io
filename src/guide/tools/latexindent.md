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

1. **配置文件位置与格式**：latexindent 默认按优先级加载 `defaultSettings.yaml` → 用户级 `~/.indentconfig.yaml`（或 `~/.latexindent.yaml`）→ 项目级 `localSettings.yaml`。配置为 YAML 格式，常用键包括 `defaultIndent`（默认缩进）、`indentAfterItems`（列表项后缩进）、`alwaysLookforHit`、`modifyLineBreaks`、`noAdditionalIndent` 等，见官方 `defaultSettings.yaml` 文档。

2. **与编辑器集成**：Vim 中可在 `.vimrc` 添加 `autocmd BufWritePre *.tex silent! execute '%! latexindent -s -t'` 实现保存时自动格式化；VS Code 可在 `settings.json` 里配置 `"[tex]": { "editor.formatOnSave": true }` 并配合相关扩展调用 latexindent；这能保证团队代码风格一致。

3. **检查改动而不是盲覆盖**：先在无 `-w` 模式下生成 `.indent.log`，用 `diff messy.tex messy-indent.log` 对比，确认格式符合预期后再加 `-w` 真正落盘，避免误改。

4. **与 git hook 搭配**：在 `.git/hooks/pre-commit` 中调用 `latexindent -s -w` 对暂存的 `.tex` 文件格式化，可让所有提交自动遵循统一缩进规范。

## 六、注意事项与常见问题

1. **不覆盖原文件是默认行为**：很多新手以为命令执行后文件已格式化，其实结果写在 `<文件名>-indent.log`。需要真正改文件务必加 `-w`（`--overwrite`）。

2. **依赖 Perl 与 CPAN 模块**：latexindent 用 Perl 编写，依赖 `YAML::Tiny`、`File::HomeDir`、`Unicode::GCString` 等模块。Homebrew 安装会自带依赖，若自行升级 Perl 或系统环境异常，可能报 `Can't locate YAML/Tiny.pm` 之类的错误，可重新 `brew reinstall latexindent` 修复。

3. **中文注释与特殊字符编码**：源码需为 UTF-8 编码，若文件含 GBK 等非 UTF-8 字符，格式化可能出现乱码或解析异常，处理前先用 `iconv` 转码。

4. **不要格式化算法/宏密集的片段**：对包含大量复杂 `\if...\else`、自定义宏嵌套的代码，latexindent 可能调整其本不该动的断行。使用 `-m`（modifylinebreaks）时要先 `diff` 检查，或利用配置中的 `modifyLineBreaks` 白名单/黑名单按需排除。

5. **大文件性能**：处理几百 KB 到 MB 级的大型文档时，trace/verbose 模式会显著变慢，正式批处理建议用 `-s` 静默模式并关闭 `-t` 追踪。

6. **`-r` 与 `-m` 的关系**：`-r`（replacement）只与 `-m` 配合使用，用来替换旧断行方式；单独用 `-r` 可能无效或报参数错误，注意命令组合。