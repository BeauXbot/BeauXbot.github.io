import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as l,a as n,b as e,d as o,e as d}from"./app-09e0be14.js";const c={},p=n("h1",{id:"gnuplot-命令行交互式函数绘图工具",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#gnuplot-命令行交互式函数绘图工具","aria-hidden":"true"},"#"),e(" gnuplot（命令行交互式函数绘图工具）")],-1),r={href:"http://www.gnuplot.info/",target:"_blank",rel:"noopener noreferrer"},u=n("code",null,"brew install gnuplot",-1),v=d(`<h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>gnuplot 是一款老牌的命令行交互式绘图工具，能够从命令行/脚本快速生成函数曲线、数据点图、柱状图、等高线图、三维曲面等高质量二维/三维图形。它不依赖图形界面，支持直接输出到终端（ASCII 图形）、PNG/PDF/SVG/PNG 等文件，也能输出 LaTeX 代码。典型应用场景包括：科研绘图、数据分析可视化、教学演示，以及脚本化批量出图。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> gnuplot

<span class="token comment"># 升级</span>
brew upgrade gnuplot

<span class="token comment"># 卸载</span>
brew uninstall gnuplot

<span class="token comment"># 验证安装</span>
gnuplot <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令/语法</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>plot y=x**2</code></td><td>绘制函数曲线（平方）</td><td><code>plot x**2</code></td></tr><tr><td><code>plot &#39;data.dat&#39; with linespoints</code></td><td>用数据文件绘图</td><td><code>plot &#39;a.dat&#39; u 1:2 w lp</code></td></tr><tr><td><code>set xlabel &#39;X轴&#39;</code></td><td>设置坐标轴标签</td><td><code>set xlabel &quot;time&quot;</code></td></tr><tr><td><code>set title &#39;标题&#39;</code></td><td>设置图标题</td><td><code>set title &quot;sin(x)&quot;</code></td></tr><tr><td><code>set terminal png</code></td><td>设置输出格式</td><td><code>set terminal pngcairo</code></td></tr><tr><td><code>set output &#39;out.png&#39;</code></td><td>指定输出文件</td><td><code>set output &#39;plot.png&#39;</code></td></tr><tr><td><code>splot</code></td><td>绘制三维曲面</td><td><code>splot x*y</code></td></tr><tr><td><code>replot</code></td><td>在已有图基础上叠加绘图</td><td><code>replot x**3</code></td></tr><tr><td><code>set grid</code></td><td>显示网格线</td><td><code>set grid</code></td></tr><tr><td><code>exit</code></td><td>退出交互模式</td><td><code>exit</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-终端-ascii-图" tabindex="-1"><a class="header-anchor" href="#示例-1-终端-ascii-图" aria-hidden="true">#</a> 示例 1：终端 ASCII 图</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入交互模式</span>
gnuplot
<span class="token comment"># 在 gnuplot&gt; 提示符下输入：</span>
<span class="token comment"># set terminal dumb</span>
<span class="token comment"># plot sin(x)</span>
<span class="token comment"># exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者一条命令直接出 PNG 图片：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gnuplot <span class="token parameter variable">-e</span> <span class="token string">&quot;set terminal png; set output &#39;sin.png&#39;; plot sin(x)&quot;</span>
<span class="token comment"># 生成 sin.png 后用图片查看器打开</span>
<span class="token function">open</span> sin.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-2-用数据文件画图" tabindex="-1"><a class="header-anchor" href="#示例-2-用数据文件画图" aria-hidden="true">#</a> 示例 2：用数据文件画图</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 准备数据文件 data.txt（两列：x 和 y）</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;1 2<span class="token entity" title="\\n">\\n</span>2 4<span class="token entity" title="\\n">\\n</span>3 8<span class="token entity" title="\\n">\\n</span>4 16<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token operator">&gt;</span> data.txt

<span class="token comment"># 用 gnuplot 脚本绘图</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> plot.gp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
set terminal png
set output &quot;data_plot.png&quot;
plot &quot;data.txt&quot; using 1:2 with linespoints title &quot;y=2^x&quot;
EOF</span>

gnuplot plot.gp
<span class="token function">open</span> data_plot.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-数据文件里包含表头与注释" tabindex="-1"><a class="header-anchor" href="#示例-3-数据文件里包含表头与注释" aria-hidden="true">#</a> 示例 3：数据文件里包含表头与注释</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 数据文件头部含列名、注释行以 # 开头</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> sample.dat <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
# 时间  温度  湿度
2021 20.5  60
2022 21.2  63
2023 22.0  58
2024 23.1  55
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> plot3.gp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
set terminal pngcairo size 800,600
set output &quot;sample.png&quot;
set datafile commentschars &quot;#&quot;      # 指定注释符
set xlabel &quot;年份&quot;
set ylabel &quot;温度 (°C)&quot;
plot &quot;sample.dat&quot; using 1:2 with linespoints title &quot;温度&quot;
EOF</span>

gnuplot plot3.gp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_5-1-个人配置文件-gnuplot" tabindex="-1"><a class="header-anchor" href="#_5-1-个人配置文件-gnuplot" aria-hidden="true">#</a> 5.1 个人配置文件 <code>~/.gnuplot</code></h3><p>gnuplot 启动时会自动读取用户主目录下的 <code>~/.gnuplot</code> 配置文件（等效于每次进入自动执行其中的命令）。在这里放全局偏好，避免每个脚本重复写：</p><div class="language-gnuplot line-numbers-mode" data-ext="gnuplot"><pre class="language-gnuplot"><code># ~/.gnuplot —— 全局默认配置
set termopt enhanced                 # 允许 &lt;super&gt; &lt;sub&gt; 等上下标语法
set border lw 1.5
set grid lt 0 lc rgb &quot;#cccccc&quot;        # 浅灰网格线
set key top right box
set xlabel font &quot;sans-serif,12&quot;
set ylabel font &quot;sans-serif,12&quot;
set tics font &quot;sans-serif,10&quot;
# 默认字体含中文（macOS 自带 PingFang）
set terminal pngcairo font &quot;PingFang SC,12&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：各版本对中文字体名的写法略有差异，可在 gnuplot 内用 <code>set terminal pngcairo font &quot;?&quot;</code> 列出可检测到的字体。</p></blockquote><h3 id="_5-2-环境变量" tabindex="-1"><a class="header-anchor" href="#_5-2-环境变量" aria-hidden="true">#</a> 5.2 环境变量</h3><table><thead><tr><th>环境变量</th><th>作用</th></tr></thead><tbody><tr><td><code>GNUPLOT_HOME</code></td><td>指定配置文件所在目录（默认 <code>~</code>）</td></tr><tr><td><code>GNUPLOT_DRIVER_DIR</code></td><td>gnuplot 自带终端驱动目录</td></tr><tr><td><code>GNUPLOT_LIB</code></td><td>额外脚本/加载文件的搜索路径（冒号分隔）</td></tr><tr><td><code>GNUPLOT_PS_DIR</code></td><td>PostScript 字体路径</td></tr></tbody></table><p>例如临时让脚本目录也可被搜索到：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GNUPLOT_LIB</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/.config/gnuplot:<span class="token environment constant">$PWD</span>/scripts&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-3-常用配置项一览" tabindex="-1"><a class="header-anchor" href="#_5-3-常用配置项一览" aria-hidden="true">#</a> 5.3 常用配置项一览</h3><table><thead><tr><th>配置</th><th>示例</th><th>说明</th></tr></thead><tbody><tr><td>图尺寸</td><td><code>set size ratio 0.618</code></td><td>宽高比（黄金分割常用）</td></tr><tr><td>输出尺寸</td><td><code>set terminal pngcairo size 800,600</code></td><td>像素宽高</td></tr><tr><td>坐标范围</td><td><code>set xrange [0:10]</code></td><td>限定 x 轴范围</td></tr><tr><td>对数坐标</td><td><code>set logscale y</code></td><td>y 轴取对数</td></tr><tr><td>标题</td><td><code>set title &quot;结果&quot; font &quot;,14&quot;</code></td><td>标题字体</td></tr><tr><td>图例位置</td><td><code>set key bottom right</code></td><td>图例放置</td></tr><tr><td>线型线色</td><td><code>set style line 1 lw 2 lc rgb &quot;#d62728&quot;</code></td><td>定义样式后 <code>ls 1</code> 引用</td></tr><tr><td>边框</td><td><code>set border 3</code></td><td>只显示下左两条轴</td></tr><tr><td>坐标刻度</td><td><code>set xtics 5</code></td><td>x 轴刻度间隔为 5</td></tr><tr><td>数据注释符</td><td><code>set datafile commentschars &quot;#&quot;</code></td><td>忽略 <code>#</code> 开头行</td></tr></tbody></table><h3 id="_5-4-多子图与复杂布局" tabindex="-1"><a class="header-anchor" href="#_5-4-多子图与复杂布局" aria-hidden="true">#</a> 5.4 多子图与复杂布局</h3><div class="language-gnuplot line-numbers-mode" data-ext="gnuplot"><pre class="language-gnuplot"><code>set terminal pngcairo size 800,1000
set output &quot;multi.png&quot;
set multiplot layout 2,2 title &quot;四象限图&quot;
set xlabel &quot;x&quot;
plot sin(x) title &quot;sin&quot;
plot cos(x) title &quot;cos&quot;
plot exp(-x) title &quot;exp(-x)&quot;
plot x**2 title &quot;x^2&quot;
unset multiplot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-终端类型探测与矢量输出" tabindex="-1"><a class="header-anchor" href="#_5-5-终端类型探测与矢量输出" aria-hidden="true">#</a> 5.5 终端类型探测与矢量输出</h3><ul><li><strong>探测所有终端</strong>：<code>set terminal</code> 会列出当前所有支持的输出终端。</li><li><strong>矢量格式</strong>：<code>set terminal svg</code>、<code>set terminal pdfcairo</code>、<code>set terminal postscript</code> 可输出可无损缩放的矢量图，方便论文插图与印刷。</li><li><strong>PNG 透明背景</strong>：<code>set terminal pngcairo transparent</code>。</li></ul><h3 id="_5-6-latex-输出" tabindex="-1"><a class="header-anchor" href="#_5-6-latex-输出" aria-hidden="true">#</a> 5.6 LaTeX 输出</h3><ul><li><strong>epslatex 模式</strong>：<code>set terminal epslatex color</code> 生成 <code>.eps</code>（图形）和 <code>.tex</code>（含文字标注）文件对，可在 LaTeX 文档中 <code>\\includegraphics</code> 引用，且中文/数学公式由 LaTeX 渲染，字体与正文统一。</li><li><strong>cairolatex 模式</strong>：<code>set terminal cairolatex pdf</code> 直接生成可被 LaTeX 引用的 <code>.pdf</code>。</li></ul><div class="language-gnuplot line-numbers-mode" data-ext="gnuplot"><pre class="language-gnuplot"><code>set terminal epslatex color
set output &quot;fig.tex&quot;
set xlabel &quot;$\\xi$&quot;        # 直接写 LaTeX 数学
plot sin(x) title &quot;$\\sin(x)$&quot;
# 之后在 LaTeX 中：\\includegraphics{fig} 即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><strong>中文乱码</strong>：PNG 终端默认字体可能不支持中文，设置 <code>set terminal pngcairo font &quot;sans-serif,12&quot;</code> 并确认系统有中文字体；或改用 <code>epslatex</code>/<code>cairolatex</code> 终端让 LaTeX 渲染文字。</li><li><strong>图片空白/打不开</strong>：必须同时设置 <code>set terminal</code> 和 <code>set output</code>，且 <code>set output</code> 要在第一次 <code>plot</code> 之前执行；输出路径写完整（<code>open</code> 前先确认文件生成）。</li><li><strong>数据列引用</strong>：用 <code>using 1:2</code> 指定列，列号从 1 开始；缺列会报 <code>too few columns</code> 错误。多列数据用 <code>using 1:2:3</code>（如 <code>splot</code> 或 <code>with errorbars</code>）。</li><li><strong>交互模式中文输入</strong>：终端无输入法支持，建议中文内容用英文或写在脚本文件里。</li><li><strong>脚本报 <code>unknown or ambiguous terminal type</code></strong>：<code>set terminal</code> 拼写或终端名不对（如老版本无 <code>pngcairo</code>），先 <code>set terminal</code> 列出可用的再选。</li><li><strong><code>gnuplot</code> 命令找不到</strong>：确认已 <code>brew install gnuplot</code>，并检查 PATH 是否包含 Homebrew 目录（<code>echo $PATH</code>）。</li><li><strong>数据文件列数不齐</strong>：每行列数必须一致，否则该行被忽略并出现 <code>Skipping</code> 警告；可用 <code>awk &#39;{print $1,$2}&#39; file &gt; clean.dat</code> 预处理。</li><li><strong>性能注意</strong>：绘制含上百万点的大数据时，<code>plot</code> 用 <code>with points</code> 会非常慢；改用 <code>set samples</code>（函数）或 <code>plot ... with lines</code>、必要时 <code>every N</code> 抽样 <code>plot &#39;big.dat&#39; every 10 using 1:2</code>。</li><li><strong>安全注意</strong>：脚本会执行任意命令，<code>system()</code> 可在 gnuplot 内调用 shell；<strong>不要</strong>执行来源不明的 <code>.gp</code> 文件（等价于运行不明 shell 脚本）。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_7-1-多数据文件对比" tabindex="-1"><a class="header-anchor" href="#_7-1-多数据文件对比" aria-hidden="true">#</a> 7.1 多数据文件对比</h3><p>把多个数据文件放在同一条 <code>plot</code> 命令里，用 <code>for</code> 循环批量引用：</p><div class="language-gnuplot line-numbers-mode" data-ext="gnuplot"><pre class="language-gnuplot"><code>set terminal pngcairo size 800,600
set output &quot;compare.png&quot;
set key outside
plot for [i=1:5] &quot;run&quot;.i.&quot;.dat&quot; using 1:2 with lines title &quot;Run &quot;.i
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-时间序列数据" tabindex="-1"><a class="header-anchor" href="#_7-2-时间序列数据" aria-hidden="true">#</a> 7.2 时间序列数据</h3><p>用 <code>set timefmt</code> 解析时间戳，<code>set xdata time</code> 让 x 轴按时间显示：</p><div class="language-gnuplot line-numbers-mode" data-ext="gnuplot"><pre class="language-gnuplot"><code>set terminal pngcairo size 900,500
set output &quot;timeseries.png&quot;
set xdata time
set timefmt &quot;%Y-%m-%d&quot;
set format x &quot;%m-%d&quot;
set xlabel &quot;日期&quot;
set ylabel &quot;访问量&quot;
plot &quot;log.csv&quot; using 1:2 with lines title &quot;PV&quot;
# log.csv 每行形如：2024-01-15 1234
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-脚本参数化与循环批量出图" tabindex="-1"><a class="header-anchor" href="#_7-3-脚本参数化与循环批量出图" aria-hidden="true">#</a> 7.3 脚本参数化与循环批量出图</h3><p>gnuplot 支持 <code>-e</code> 传入变量，也支持 <code>argc</code>/<code>ARGV</code>（脚本内参数）。把画图逻辑写成模板脚本，用 shell 循环批量调用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># template.gp —— 用环境变量/命令行参数控制</span>
<span class="token builtin class-name">set</span> terminal pngcairo size <span class="token number">800,600</span>
<span class="token builtin class-name">set</span> output <span class="token string">&quot;out_&quot;</span>.ARG1.<span class="token string">&quot;.png&quot;</span>
<span class="token builtin class-name">set</span> title <span class="token string">&quot;图：&quot;</span>.ARG1
plot <span class="token string">&quot;data_&quot;</span>.ARG1.<span class="token string">&quot;.dat&quot;</span> using <span class="token number">1</span>:2 with linespoints title ARG1

<span class="token comment"># 批量生成 data_A.dat ... data_E.dat 各自的图</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> A B C D E<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">printf</span> <span class="token string">&quot;1 1<span class="token entity" title="\\n">\\n</span>2 4<span class="token entity" title="\\n">\\n</span>3 9<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token operator">&gt;</span> data_<span class="token variable">$i</span>.dat
  gnuplot <span class="token parameter variable">-e</span> <span class="token string">&quot;ARG1=&#39;<span class="token variable">$i</span>&#39;&quot;</span> template.gp
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-条件绘图" tabindex="-1"><a class="header-anchor" href="#_7-4-条件绘图" aria-hidden="true">#</a> 7.4 条件绘图</h3><p>用三元运算实现条件样式/分段函数：</p><div class="language-gnuplot line-numbers-mode" data-ext="gnuplot"><pre class="language-gnuplot"><code># 超过阈值 3 的用红色实线，否则蓝虚线
plot &quot;d.dat&quot; using 1:($2&gt;3 ? $2 : NaN) with lines lc &quot;red&quot; title &quot;high&quot;, \\
     &quot;d.dat&quot; using 1:($2&lt;=3 ? $2 : NaN) with lines lc &quot;blue&quot; lw 1 title &quot;low&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-5-与-pandoc-latex-排版工作流集成" tabindex="-1"><a class="header-anchor" href="#_7-5-与-pandoc-latex-排版工作流集成" aria-hidden="true">#</a> 7.5 与 pandoc / LaTeX 排版工作流集成</h3><p>在 Markdown/LaTeX 文档中内嵌 gnuplot 图，用 Makefile 统一重绘并嵌入文档：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 场景：LaTeX 论文中的插图由 gnuplot 生成，改数据后 make 自动重出图并重编译</span>
<span class="token comment"># （配合 \\includegraphics{fig.pdf}）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment"># Makefile —— gnuplot + LaTeX 自动化</span>
FIGURES <span class="token operator">=</span> fig1.pdf fig2.pdf
TEX     <span class="token operator">=</span> thesis.tex

<span class="token target symbol">all</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>TEX<span class="token punctuation">:</span>.tex<span class="token operator">=</span>.pdf<span class="token punctuation">)</span>

<span class="token target symbol"><span class="token variable">$</span>(TEX</span><span class="token punctuation">:</span>.tex<span class="token operator">=</span>.pdf<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>TEX<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>FIGURES<span class="token punctuation">)</span>
	pdflatex -interaction<span class="token operator">=</span>nonstopmode <span class="token variable">$</span><span class="token punctuation">(</span>TEX<span class="token punctuation">)</span>
<span class="token target symbol">	bibtex <span class="token variable">$</span>(TEX</span><span class="token punctuation">:</span>.tex<span class="token operator">=</span><span class="token punctuation">)</span> 2&gt;/dev/null <span class="token operator">|</span><span class="token operator">|</span> true
	pdflatex -interaction<span class="token operator">=</span>nonstopmode <span class="token variable">$</span><span class="token punctuation">(</span>TEX<span class="token punctuation">)</span>
	pdflatex -interaction<span class="token operator">=</span>nonstopmode <span class="token variable">$</span><span class="token punctuation">(</span>TEX<span class="token punctuation">)</span>

<span class="token target symbol">fig1.pdf</span><span class="token punctuation">:</span> fig1.gp fig1.dat
	gnuplot fig1.gp    <span class="token comment"># 脚本内 set output &quot;fig1.pdf&quot;</span>
<span class="token target symbol">fig2.pdf</span><span class="token punctuation">:</span> fig2.gp fig2.dat
	gnuplot fig2.gp

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> clean
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f *.pdf *.aux *.log *.bbl *.blg *.toc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-6-ci-集成-github-actions" tabindex="-1"><a class="header-anchor" href="#_7-6-ci-集成-github-actions" aria-hidden="true">#</a> 7.6 CI 集成（GitHub Actions）</h3><p>在 GitHub Actions 中安装 gnuplot 并出图、作为构建产物上传：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> plots
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">plot</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install gnuplot
        <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo apt<span class="token punctuation">-</span>get update <span class="token important">&amp;&amp;</span> sudo apt<span class="token punctuation">-</span>get install <span class="token punctuation">-</span>y gnuplot
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Generate plots
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          for f in scripts/*.gp; do gnuplot &quot;$f&quot;; done</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload artifacts
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> plots
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&#39;**/*.png&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-7-批量转换与预处理配合" tabindex="-1"><a class="header-anchor" href="#_7-7-批量转换与预处理配合" aria-hidden="true">#</a> 7.7 批量转换与预处理配合</h3><p>配合 awk / Python 做数据预处理，再交给 gnuplot，形成&quot;数据清洗 → 绘图 → 排版&quot;流水线：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># awk 清洗原始日志，提取两列</span>
<span class="token function">awk</span> <span class="token string">&#39;{print $1, $5}&#39;</span> raw.log <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-n</span> +2 <span class="token operator">&gt;</span> clean.dat

<span class="token comment"># gnuplot 出图</span>
gnuplot <span class="token parameter variable">-e</span> <span class="token string">&quot;set terminal pngcairo; set output &#39;out.png&#39;; \\
  set xdata time; set timefmt &#39;%s&#39;; \\
  plot &#39;clean.dat&#39; using 1:2 with lines&quot;</span>

<span class="token comment"># 再转成 SVG/PDF 交给 LaTeX</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-8-生产级实践清单" tabindex="-1"><a class="header-anchor" href="#_7-8-生产级实践清单" aria-hidden="true">#</a> 7.8 生产级实践清单</h3><ol><li><strong>脚本即文档</strong>：把绘图命令写成 <code>.gp</code> 并纳入版本控制，数据变、图可复现。</li><li><strong>统一入口</strong>：用 Makefile/脚本统一管理&quot;出图 → 嵌入 → 编译&quot;流程。</li><li><strong>矢量优先</strong>：论文/印刷用 <code>pdfcairo</code>/<code>svg</code>/<code>epslatex</code>，避免位图模糊。</li><li><strong>参数外置</strong>：文件名、阈值等用 <code>-e</code> 传入，避免改脚本正文。</li><li><strong>记录环境</strong>：在脚本头部注释 gnuplot 版本与数据文件格式，便于复现。</li></ol>`,60);function m(b,g){const s=t("ExternalLinkIcon");return i(),l("div",null,[p,n("blockquote",null,[n("p",null,[e("Homebrew 版本 6.0.3 ｜ 主页："),n("a",r,[e("http://www.gnuplot.info/"),o(s)]),e(" ｜ 安装："),u])]),v])}const q=a(c,[["render",m],["__file","gnuplot.html.vue"]]);export{q as default};
