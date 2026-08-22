---
title: gnuplot
icon: book
category:
  - 工具
  - 科学绘图
tag:
  - 文档与排版
  - gnuplot
---

# gnuplot（命令行交互式函数绘图工具）

> Homebrew 版本 6.0.3 ｜ 主页：http://www.gnuplot.info/ ｜ 安装：`brew install gnuplot`

## 一、它是什么

gnuplot 是一款老牌的命令行交互式绘图工具，能够从命令行/脚本快速生成函数曲线、数据点图、柱状图、等高线图、三维曲面等高质量二维/三维图形。它不依赖图形界面，支持直接输出到终端（ASCII 图形）、PNG/PDF/SVG/PNG 等文件，也能输出 LaTeX 代码。典型应用场景包括：科研绘图、数据分析可视化、教学演示，以及脚本化批量出图。

## 二、安装与升级

```bash
# 安装
brew install gnuplot

# 升级
brew upgrade gnuplot

# 卸载
brew uninstall gnuplot

# 验证安装
gnuplot --version
```

## 三、常用命令速查

| 命令/语法 | 说明 | 示例 |
|-----------|------|------|
| `plot y=x**2` | 绘制函数曲线（平方） | `plot x**2` |
| `plot 'data.dat' with linespoints` | 用数据文件绘图 | `plot 'a.dat' u 1:2 w lp` |
| `set xlabel 'X轴'` | 设置坐标轴标签 | `set xlabel "time"` |
| `set title '标题'` | 设置图标题 | `set title "sin(x)"` |
| `set terminal png` | 设置输出格式 | `set terminal pngcairo` |
| `set output 'out.png'` | 指定输出文件 | `set output 'plot.png'` |
| `splot` | 绘制三维曲面 | `splot x*y` |
| `replot` | 在已有图基础上叠加绘图 | `replot x**3` |
| `set grid` | 显示网格线 | `set grid` |
| `exit` | 退出交互模式 | `exit` |

## 四、实际示例

### 示例 1：终端 ASCII 图

```bash
# 进入交互模式
gnuplot
# 在 gnuplot> 提示符下输入：
# set terminal dumb
# plot sin(x)
# exit
```

或者一条命令直接出 PNG 图片：

```bash
gnuplot -e "set terminal png; set output 'sin.png'; plot sin(x)"
# 生成 sin.png 后用图片查看器打开
open sin.png
```

### 示例 2：用数据文件画图

```bash
# 准备数据文件 data.txt（两列：x 和 y）
printf "1 2\n2 4\n3 8\n4 16\n" > data.txt

# 用 gnuplot 脚本绘图
cat > plot.gp <<'EOF'
set terminal png
set output "data_plot.png"
plot "data.txt" using 1:2 with linespoints title "y=2^x"
EOF

gnuplot plot.gp
open data_plot.png
```

### 示例 3：数据文件里包含表头与注释

```bash
# 数据文件头部含列名、注释行以 # 开头
cat > sample.dat <<'EOF'
# 时间  温度  湿度
2021 20.5  60
2022 21.2  63
2023 22.0  58
2024 23.1  55
EOF

cat > plot3.gp <<'EOF'
set terminal pngcairo size 800,600
set output "sample.png"
set datafile commentschars "#"      # 指定注释符
set xlabel "年份"
set ylabel "温度 (°C)"
plot "sample.dat" using 1:2 with linespoints title "温度"
EOF

gnuplot plot3.gp
```

## 五、进阶技巧与配置

### 5.1 个人配置文件 `~/.gnuplot`

gnuplot 启动时会自动读取用户主目录下的 `~/.gnuplot` 配置文件（等效于每次进入自动执行其中的命令）。在这里放全局偏好，避免每个脚本重复写：

```gnuplot
# ~/.gnuplot —— 全局默认配置
set termopt enhanced                 # 允许 <super> <sub> 等上下标语法
set border lw 1.5
set grid lt 0 lc rgb "#cccccc"        # 浅灰网格线
set key top right box
set xlabel font "sans-serif,12"
set ylabel font "sans-serif,12"
set tics font "sans-serif,10"
# 默认字体含中文（macOS 自带 PingFang）
set terminal pngcairo font "PingFang SC,12"
```

> 提示：各版本对中文字体名的写法略有差异，可在 gnuplot 内用 `set terminal pngcairo font "?"` 列出可检测到的字体。

### 5.2 环境变量

| 环境变量 | 作用 |
|----------|------|
| `GNUPLOT_HOME` | 指定配置文件所在目录（默认 `~`） |
| `GNUPLOT_DRIVER_DIR` | gnuplot 自带终端驱动目录 |
| `GNUPLOT_LIB` | 额外脚本/加载文件的搜索路径（冒号分隔） |
| `GNUPLOT_PS_DIR` | PostScript 字体路径 |

例如临时让脚本目录也可被搜索到：

```bash
export GNUPLOT_LIB="$HOME/.config/gnuplot:$PWD/scripts"
```

### 5.3 常用配置项一览

| 配置 | 示例 | 说明 |
|------|------|------|
| 图尺寸 | `set size ratio 0.618` | 宽高比（黄金分割常用） |
| 输出尺寸 | `set terminal pngcairo size 800,600` | 像素宽高 |
| 坐标范围 | `set xrange [0:10]` | 限定 x 轴范围 |
| 对数坐标 | `set logscale y` | y 轴取对数 |
| 标题 | `set title "结果" font ",14"` | 标题字体 |
| 图例位置 | `set key bottom right` | 图例放置 |
| 线型线色 | `set style line 1 lw 2 lc rgb "#d62728"` | 定义样式后 `ls 1` 引用 |
| 边框 | `set border 3` | 只显示下左两条轴 |
| 坐标刻度 | `set xtics 5` | x 轴刻度间隔为 5 |
| 数据注释符 | `set datafile commentschars "#"` | 忽略 `#` 开头行 |

### 5.4 多子图与复杂布局

```gnuplot
set terminal pngcairo size 800,1000
set output "multi.png"
set multiplot layout 2,2 title "四象限图"
set xlabel "x"
plot sin(x) title "sin"
plot cos(x) title "cos"
plot exp(-x) title "exp(-x)"
plot x**2 title "x^2"
unset multiplot
```

### 5.5 终端类型探测与矢量输出

- **探测所有终端**：`set terminal` 会列出当前所有支持的输出终端。
- **矢量格式**：`set terminal svg`、`set terminal pdfcairo`、`set terminal postscript` 可输出可无损缩放的矢量图，方便论文插图与印刷。
- **PNG 透明背景**：`set terminal pngcairo transparent`。

### 5.6 LaTeX 输出

- **epslatex 模式**：`set terminal epslatex color` 生成 `.eps`（图形）和 `.tex`（含文字标注）文件对，可在 LaTeX 文档中 `\includegraphics` 引用，且中文/数学公式由 LaTeX 渲染，字体与正文统一。
- **cairolatex 模式**：`set terminal cairolatex pdf` 直接生成可被 LaTeX 引用的 `.pdf`。

```gnuplot
set terminal epslatex color
set output "fig.tex"
set xlabel "$\xi$"        # 直接写 LaTeX 数学
plot sin(x) title "$\sin(x)$"
# 之后在 LaTeX 中：\includegraphics{fig} 即可
```

## 六、注意事项与常见问题

- **中文乱码**：PNG 终端默认字体可能不支持中文，设置 `set terminal pngcairo font "sans-serif,12"` 并确认系统有中文字体；或改用 `epslatex`/`cairolatex` 终端让 LaTeX 渲染文字。
- **图片空白/打不开**：必须同时设置 `set terminal` 和 `set output`，且 `set output` 要在第一次 `plot` 之前执行；输出路径写完整（`open` 前先确认文件生成）。
- **数据列引用**：用 `using 1:2` 指定列，列号从 1 开始；缺列会报 `too few columns` 错误。多列数据用 `using 1:2:3`（如 `splot` 或 `with errorbars`）。
- **交互模式中文输入**：终端无输入法支持，建议中文内容用英文或写在脚本文件里。
- **脚本报 `unknown or ambiguous terminal type`**：`set terminal` 拼写或终端名不对（如老版本无 `pngcairo`），先 `set terminal` 列出可用的再选。
- **`gnuplot` 命令找不到**：确认已 `brew install gnuplot`，并检查 PATH 是否包含 Homebrew 目录（`echo $PATH`）。
- **数据文件列数不齐**：每行列数必须一致，否则该行被忽略并出现 `Skipping` 警告；可用 `awk '{print $1,$2}' file > clean.dat` 预处理。
- **性能注意**：绘制含上百万点的大数据时，`plot` 用 `with points` 会非常慢；改用 `set samples`（函数）或 `plot ... with lines`、必要时 `every N` 抽样 `plot 'big.dat' every 10 using 1:2`。
- **安全注意**：脚本会执行任意命令，`system()` 可在 gnuplot 内调用 shell；**不要**执行来源不明的 `.gp` 文件（等价于运行不明 shell 脚本）。

## 七、实战：与其它工具搭配与自动化

### 7.1 多数据文件对比

把多个数据文件放在同一条 `plot` 命令里，用 `for` 循环批量引用：

```gnuplot
set terminal pngcairo size 800,600
set output "compare.png"
set key outside
plot for [i=1:5] "run".i.".dat" using 1:2 with lines title "Run ".i
```

### 7.2 时间序列数据

用 `set timefmt` 解析时间戳，`set xdata time` 让 x 轴按时间显示：

```gnuplot
set terminal pngcairo size 900,500
set output "timeseries.png"
set xdata time
set timefmt "%Y-%m-%d"
set format x "%m-%d"
set xlabel "日期"
set ylabel "访问量"
plot "log.csv" using 1:2 with lines title "PV"
# log.csv 每行形如：2024-01-15 1234
```

### 7.3 脚本参数化与循环批量出图

gnuplot 支持 `-e` 传入变量，也支持 `argc`/`ARGV`（脚本内参数）。把画图逻辑写成模板脚本，用 shell 循环批量调用：

```bash
# template.gp —— 用环境变量/命令行参数控制
set terminal pngcairo size 800,600
set output "out_".ARG1.".png"
set title "图：".ARG1
plot "data_".ARG1.".dat" using 1:2 with linespoints title ARG1

# 批量生成 data_A.dat ... data_E.dat 各自的图
for i in A B C D E; do
  printf "1 1\n2 4\n3 9\n" > data_$i.dat
  gnuplot -e "ARG1='$i'" template.gp
done
```

### 7.4 条件绘图

用三元运算实现条件样式/分段函数：

```gnuplot
# 超过阈值 3 的用红色实线，否则蓝虚线
plot "d.dat" using 1:($2>3 ? $2 : NaN) with lines lc "red" title "high", \
     "d.dat" using 1:($2<=3 ? $2 : NaN) with lines lc "blue" lw 1 title "low"
```

### 7.5 与 pandoc / LaTeX 排版工作流集成

在 Markdown/LaTeX 文档中内嵌 gnuplot 图，用 Makefile 统一重绘并嵌入文档：

```bash
# 场景：LaTeX 论文中的插图由 gnuplot 生成，改数据后 make 自动重出图并重编译
# （配合 \includegraphics{fig.pdf}）
```

```makefile
# Makefile —— gnuplot + LaTeX 自动化
FIGURES = fig1.pdf fig2.pdf
TEX     = thesis.tex

all: $(TEX:.tex=.pdf)

$(TEX:.tex=.pdf): $(TEX) $(FIGURES)
	pdflatex -interaction=nonstopmode $(TEX)
	bibtex $(TEX:.tex=) 2>/dev/null || true
	pdflatex -interaction=nonstopmode $(TEX)
	pdflatex -interaction=nonstopmode $(TEX)

fig1.pdf: fig1.gp fig1.dat
	gnuplot fig1.gp    # 脚本内 set output "fig1.pdf"
fig2.pdf: fig2.gp fig2.dat
	gnuplot fig2.gp

.PHONY: clean
clean:
	rm -f *.pdf *.aux *.log *.bbl *.blg *.toc
```

### 7.6 CI 集成（GitHub Actions）

在 GitHub Actions 中安装 gnuplot 并出图、作为构建产物上传：

```yaml
name: plots
on: [push]
jobs:
  plot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install gnuplot
        run: sudo apt-get update && sudo apt-get install -y gnuplot
      - name: Generate plots
        run: |
          for f in scripts/*.gp; do gnuplot "$f"; done
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: plots
          path: '**/*.png'
```

### 7.7 批量转换与预处理配合

配合 awk / Python 做数据预处理，再交给 gnuplot，形成"数据清洗 → 绘图 → 排版"流水线：

```bash
# awk 清洗原始日志，提取两列
awk '{print $1, $5}' raw.log | tail -n +2 > clean.dat

# gnuplot 出图
gnuplot -e "set terminal pngcairo; set output 'out.png'; \
  set xdata time; set timefmt '%s'; \
  plot 'clean.dat' using 1:2 with lines"

# 再转成 SVG/PDF 交给 LaTeX
```

### 7.8 生产级实践清单

1. **脚本即文档**：把绘图命令写成 `.gp` 并纳入版本控制，数据变、图可复现。
2. **统一入口**：用 Makefile/脚本统一管理"出图 → 嵌入 → 编译"流程。
3. **矢量优先**：论文/印刷用 `pdfcairo`/`svg`/`epslatex`，避免位图模糊。
4. **参数外置**：文件名、阈值等用 `-e` 传入，避免改脚本正文。
5. **记录环境**：在脚本头部注释 gnuplot 版本与数据文件格式，便于复现。