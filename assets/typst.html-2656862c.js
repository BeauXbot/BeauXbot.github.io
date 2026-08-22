import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as s,e as a}from"./app-401f6a81.js";const t={},d=a(`<h1 id="typst-现代排版系统-可替代-latex-的简易方案" tabindex="-1"><a class="header-anchor" href="#typst-现代排版系统-可替代-latex-的简易方案" aria-hidden="true">#</a> typst（现代排版系统，可替代 LaTeX 的简易方案）</h1><blockquote><p>Homebrew 版本 0.14.1 ｜ 主页：见官方文档 ｜ 安装：<code>brew install typst</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>typst 是一个用 Rust 编写的<strong>现代排版系统</strong>，用简单易懂的标记语法即可生成高质量的 PDF、SVG、PNG 等文档，常被称为&quot;更简单、更快的 LaTeX 替代品&quot;。它解决了 LaTeX 学习曲线陡峭、编译慢、宏包依赖复杂、环境配置麻烦等问题，自带完善的文档与自动编译预览功能，让排版专注在写作而非调环境上。典型应用场景包括：写论文/报告/简历/幻灯片、做公式密集的数学与工程文档、生成带代码高亮的开发文档，以及任何你之前会用 LaTeX 处理的正式文档。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> typst

<span class="token comment"># 升级</span>
brew upgrade typst

<span class="token comment"># 卸载</span>
brew uninstall typst

<span class="token comment"># 验证安装成功（查看版本）</span>
typst <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后 <code>typst</code> 即进入 PATH，直接可在任意目录调用。若之前用 <code>cargo install typst-cli</code> 装过旧版，建议先卸载旧版再 <code>brew install</code> 以免版本冲突。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>typst compile [input] [output]</code></td><td>将 <code>.typ</code> 源文件编译为 PDF/SVG/PNG 等</td><td><code>typst compile main.typ main.pdf</code></td></tr><tr><td><code>typst watch [input] [output]</code></td><td>监听文件变化自动重新编译（预览开发）</td><td><code>typst watch main.typ main.pdf</code></td></tr><tr><td><code>typst query [input]</code></td><td>从编译结果中提取元素/元数据（如目录、标题）</td><td><code>typst query main.typ &#39;&lt;heading&gt;&#39;</code></td></tr><tr><td><code>typst fonts</code></td><td>列出 typst 可用的字体</td><td><code>typst fonts</code></td></tr><tr><td><code>typst init [name]</code></td><td>初始化一个新的示例项目模板</td><td><code>typst init hello</code></td></tr><tr><td><code>typst compile -f png</code> / <code>--format</code></td><td>指定输出格式（png/svg/pdf）</td><td><code>typst compile -f svg diag.typ diag.svg</code></td></tr><tr><td><code>-p</code> / <code>--ppr</code></td><td>指定纸张/页面尺寸（如 a4、letter）</td><td><code>typst compile -p a4 main.typ</code></td></tr><tr><td><code>--root</code></td><td>指定项目根目录（解析相对路径基准）</td><td><code>typst compile --root . main.typ</code></td></tr><tr><td><code>typst preview</code> / <code>-w</code> 相关</td><td>启动本地服务器实时预览（配合 watch）</td><td><code>typst preview main.typ</code></td></tr></tbody></table><blockquote><p>说明：<code>typst preview</code> 会启动本地 Web 服务器并在浏览器中实时预览，<code>typst watch</code> 则只负责自动重编译输出文件。二者常搭配使用。</p></blockquote><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-hello-world-编译成-pdf" tabindex="-1"><a class="header-anchor" href="#示例-1-hello-world-编译成-pdf" aria-hidden="true">#</a> 示例 1：Hello World 编译成 PDF</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 准备：新建一个目录并写一个最小的 .typ 源文件</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/typst-demo <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/typst-demo

<span class="token function">cat</span> <span class="token operator">&gt;</span> hello.typ <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#set page(paper: &quot;a4&quot;, margin: 2.5cm)
#set text(font: &quot;New Computer Modern&quot;, size: 11pt)

= 欢迎使用 typst

这是一段*斜体*、**粗体**和 $x^2 + y^2 = z^2$ 的示例文本。

- 列表项一
- 列表项二

#align(center)[
  #rect(fill: rgb(&quot;#e8f0fe&quot;))[
    边框高亮区块
  ]
]
EOF</span>

<span class="token comment"># 编译为 PDF</span>
typst compile hello.typ hello.pdf

<span class="token comment"># 验证产物存在</span>
<span class="token function">ls</span> <span class="token parameter variable">-lh</span> hello.pdf
<span class="token function">open</span> hello.pdf   <span class="token comment"># macOS 用默认阅读器打开</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译成功后，<code>hello.pdf</code> 即为一份带标题、公式、列表和着色区块的正式排版 PDF。</p><h3 id="示例-2-监听实时重编译并导出-png" tabindex="-1"><a class="header-anchor" href="#示例-2-监听实时重编译并导出-png" aria-hidden="true">#</a> 示例 2：监听实时重编译并导出 PNG</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 准备：复用上面的 hello.typ</span>
<span class="token builtin class-name">cd</span> ~/typst-demo

<span class="token comment"># 后台监听，改动 hello.typ 自动重编译</span>
typst <span class="token function">watch</span> hello.typ hello.pdf <span class="token operator">&amp;</span>

<span class="token comment"># 同时导出第一页为 PNG（适合做封面图/预览图）</span>
typst compile <span class="token parameter variable">-f</span> png <span class="token parameter variable">--ppi</span> <span class="token number">144</span> hello.typ hello.png

<span class="token comment"># 停止监听</span>
<span class="token function">kill</span> %1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>--ppi 144</code> 控制 PNG 的分辨率（每英寸像素数），数值越大图片越清晰、体积也越大。</p><h3 id="示例-3-用-init-快速生成模板并查询结构" tabindex="-1"><a class="header-anchor" href="#示例-3-用-init-快速生成模板并查询结构" aria-hidden="true">#</a> 示例 3：用 init 快速生成模板并查询结构</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 准备：创建一个基于内置模板的新项目</span>
typst init tutorial

<span class="token builtin class-name">cd</span> tutorial

<span class="token comment"># 查看模板生成的文件结构</span>
<span class="token function">ls</span> <span class="token parameter variable">-R</span>

<span class="token comment"># 查询所有一级标题（#set 之外用 query 提取，输出 JSON 片段）</span>
typst query main.typ <span class="token string">&#39;&lt;heading level=1&gt;&#39;</span>

<span class="token comment"># 编译整个模板</span>
typst compile main.typ main.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>typst init</code> 会生成一个带示例内容、注释和依赖（如 <code>lib.typ</code>）的完整项目，是快速上手的绝佳起点。</p><h3 id="示例-4-生成-svg-矢量图-适合嵌入网页-文档" tabindex="-1"><a class="header-anchor" href="#示例-4-生成-svg-矢量图-适合嵌入网页-文档" aria-hidden="true">#</a> 示例 4：生成 SVG 矢量图（适合嵌入网页/文档）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 准备：写一个纯矢量绘图脚本</span>
<span class="token builtin class-name">cd</span> ~/typst-demo

<span class="token function">cat</span> <span class="token operator">&gt;</span> diag.typ <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#set page(paper: &quot;a4&quot;, fill: white)
#import &quot;@preview/cetz:0.2.2&quot;: canvas, draw, path

#canvas(length: 1cm, {
  draw.circle((0, 0), radius: 1, fill: rgb(&quot;#4c8bf5&quot;))
  draw.circle((2, 0), radius: 1, fill: rgb(&quot;#e05a47&quot;))
  draw.line((1, 1.5), (1, -1.5))
})
EOF</span>

<span class="token comment"># 导出为 SVG 矢量格式</span>
typst compile <span class="token parameter variable">-f</span> svg diag.typ diag.svg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>依赖 <code>@preview/...</code> 需要网络下载（或提前 <code>typst init</code> 拉取），离线时可将包放入本地 <code>packages</code> 目录。</p></blockquote><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><p><strong>1. 主题与全局设置文件（模板复用）</strong></p><p>把常用样式抽到一个公共文件，用 <code>#include</code> 复用：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>// theme.typ —— 全局主题
#set document(title: &quot;公司报告&quot;, author: &quot;Wang Bo&quot;)
#set page(paper: &quot;a4&quot;, margin: (x: 2cm, y: 2.5cm))
#set text(font: &quot;Source Han Serif SC&quot;, size: 11pt, lang: &quot;zh&quot;)
#set par(justify: true, spacing: 0.8em)

// report.typ —— 主文件
#include &quot;theme.typ&quot;

= 第一章 概述
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 配置字体与中文字体</strong></p><p>typst 使用系统字体（macOS 的 <code>/Library/Fonts</code>、<code>~/Library/Fonts</code> 等）。用 <code>typst fonts</code> 查看可用字体，中英文混排建议：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#set text(font: &quot;Source Han Serif SC&quot;, fallback: &quot;New Computer Modern&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>中文字体缺失时 typst 会用 fallback 兜底，避免乱码方块。</p><p><strong>3. 引用第三方包（包管理）</strong></p><p>typst 通过 <code>@preview/...</code> 引入社区包（类似 npm/pip）。在文件顶部声明，首次编译自动拉取：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#import &quot;@preview/cetz:0.2.2&quot;: canvas
#import &quot;@preview/codly:1.0.0&quot;: *
#import &quot;@preview/theanorama:1.0.0&quot;: *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包版本缓存在 <code>~/.cache/typst</code> 下，可预先 <code>typst compile</code> 一次把依赖拉全，便于离线工作。</p><p><strong>4. 与其它工具搭配</strong></p><ul><li><strong>编辑器</strong>：VS Code 装 &quot;Tinymist Typst&quot; 插件，支持语法高亮、悬停提示、实时预览；Neovim 用 <code>typst.vim</code>。</li><li><strong>CI/自动化</strong>：脚本里用 <code>typst compile -f pdf</code> 生成文档，配合 GitHub Actions 自动发布：<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> brew install typst <span class="token important">&amp;&amp;</span> typst compile report.typ report.pdf
<span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v4
  <span class="token key atrule">with</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> report.pdf <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><strong>分页/目录</strong>：<code>typst query &#39;&lt;outline&gt;&#39;</code> 可提取目录结构，方便二次处理或生成导航。</li></ul><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><p><strong>1. 中文引号与标点</strong></p><p>typst 默认英文标点，中文排版请设语言并处理引号：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#set text(lang: &quot;zh&quot;, region: &quot;cn&quot;)
#set text(quotes: (&quot;“&quot;, &quot;”&quot;, &quot;‘&quot;, &quot;’&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>否则直接键入 <code>&quot;</code> 会得到英文引号。</p><p><strong>2. 依赖下载失败或离线无包</strong></p><p><code>@preview/...</code> 或 <code>@local/...</code> 首次使用需要网络。离线时错误形如 <code>package not found</code>。解决：提前联网 <code>typst compile</code> 一次缓存依赖，或把包放到项目 <code>packages/</code> 目录并设 <code>--root</code>。</p><p><strong>3. 字体乱码/缺字</strong></p><p>中文显示为方块通常是字体未安装或未指定。用 <code>typst fonts</code> 确认字体已注册，再在 <code>#set text(font: ...)</code> 显式指定；服务器环境（如 CI）需先安装相应字体（macOS 装到 <code>~/Library/Fonts</code>，Linux 装到 <code>~/.local/share/fonts</code>）。</p><p><strong>4. 编译速度与内存</strong></p><p>typst 比 LaTeX 快得多，但极端大文档或导入海量包时仍可能耗时。<code>typst watch</code> 增量编译只处理改动部分，日常写作可常开。若处理超大图片（上百 MB），建议先压缩或转成 SVG/WebP 再引用。</p><p><strong>5. 版本差异</strong></p><p>Homebrew 的 0.14.1 是较新版本，<code>@preview</code> 包与某些 API 会随主版本变动。旧教程里 <code>#import</code>、<code>#let</code>、<code>#show</code> 的写法若报错，注意核对官方文档对应版本的语法。</p><p><strong>6. 输出格式限制</strong></p><p><code>-f svg</code> 或 <code>-f png</code> 输出不支持交互元素（如超链接跳转），且分页会按页分别生成 <code>{n}.svg</code>。需要带链接、书签、内嵌字体的正式成品，请用 PDF 格式。</p>`,52),i=[d];function l(o,c){return n(),s("div",null,i)}const u=e(t,[["render",l],["__file","typst.html.vue"]]);export{u as default};
