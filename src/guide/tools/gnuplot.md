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

## 五、进阶技巧与配置

- **批量出图**：把 gnuplot 命令写进 `.gp` 脚本文件，用 `gnuplot script.gp` 一键执行，适合批量生成多张图。
- **输出矢量图**：`set terminal svg` 或 `set terminal postscript` 可输出可无损缩放的矢量格式，方便论文插图。
- **LaTeX 输出**：`set terminal epslatex color` 生成 `.eps` 和 `.tex` 对，可在 LaTeX 文档中引用。
- **多子图布局**：用 `set multiplot layout 2,1` 在一张图里排布多个子图。
- **终端类型探测**：`set terminal` 会列出当前所有支持的输出终端，挑适合的用。

## 六、注意事项与常见问题

- **中文乱码**：PNG 终端默认字体可能不支持中文，设置 `set terminal pngcairo font "sans-serif,12"` 并确认系统有中文字体。
- **图片空白/打不开**：必须同时设置 `set terminal` 和 `set output`，且输出路径写完整（`open` 前先确认文件生成）。
- **数据列引用**：用 `using 1:2` 指定列，列号从 1 开始；缺列会报 `too few columns` 错误。
- **交互模式中文输入**：终端无输入法支持，建议中文内容用英文或写在脚本文件里。