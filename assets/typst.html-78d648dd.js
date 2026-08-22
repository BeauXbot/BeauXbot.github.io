import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-09e0be14.js";const t={},i=e(`<h1 id="typst-现代排版系统-可替代-latex-的简易方案" tabindex="-1"><a class="header-anchor" href="#typst-现代排版系统-可替代-latex-的简易方案" aria-hidden="true">#</a> typst（现代排版系统，可替代 LaTeX 的简易方案）</h1><blockquote><p>Homebrew 版本 0.14.1 ｜ 主页：见官方文档 ｜ 安装：<code>brew install typst</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>typst 是一个用 Rust 编写的<strong>现代排版系统</strong>，用简单易懂的标记语法即可生成高质量的 PDF、SVG、PNG 等文档，常被称为&quot;更简单、更快的 LaTeX 替代品&quot;。它解决了 LaTeX 学习曲线陡峭、编译慢、宏包依赖复杂、环境配置麻烦等问题，自带完善的文档与自动编译预览功能，让排版专注在写作而非调环境上。典型应用场景包括：写论文/报告/简历/幻灯片、做公式密集的数学与工程文档、生成带代码高亮的开发文档，以及任何你之前会用 LaTeX 处理的正式文档。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>依赖 <code>@preview/...</code> 需要网络下载（或提前 <code>typst init</code> 拉取），离线时可将包放入本地 <code>packages</code> 目录。</p></blockquote><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-主题与全局设置文件-模板复用" tabindex="-1"><a class="header-anchor" href="#_1-主题与全局设置文件-模板复用" aria-hidden="true">#</a> 1. 主题与全局设置文件（模板复用）</h3><p>把常用样式抽到一个公共文件，用 <code>#include</code> 复用，主文件只负责内容，样式集中管理：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>// theme.typ —— 全局主题
#set document(title: &quot;公司报告&quot;, author: &quot;Wang Bo&quot;, keywords: (&quot;报告&quot;, &quot;技术&quot;))
#set page(
  paper: &quot;a4&quot;,
  margin: (x: 2cm, y: 2.5cm),
  numbering: &quot;1 / 1&quot;,          // 页码显示为 &quot;当前页 / 总页数&quot;
  header: align(right)[#smallcaps[#context page.numbering]],
)
#set text(font: &quot;Source Han Serif SC&quot;, size: 11pt, lang: &quot;zh&quot;)
#set par(justify: true, spacing: 0.8em)
#show heading: set text(size: 1.3em)
#show heading.where(level: 1): set text(font: &quot;Source Han Sans SC&quot;)

// report.typ —— 主文件（只写正文）
#include &quot;theme.typ&quot;

= 第一章 概述
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>用环境变量/<code>--root</code> 区分开发与生产样式</strong>：同一套模板可在编译时通过 <code>--root</code> 配合 <code>#sys.inputs</code> 判断构建环境，加载不同主题：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>// config.typ —— 按环境选择样式
#if sys.inputs.built-in(&quot;draft&quot;) != none {
  #set page(fill: rgb(&quot;#fff9e6&quot;))   // 草稿：浅黄底，便于审阅
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>typst compile <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">--input</span> <span class="token assign-left variable">draft</span><span class="token operator">=</span><span class="token number">1</span> report.typ draft.pdf
typst compile <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> report.typ final.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置字体与中文字体" tabindex="-1"><a class="header-anchor" href="#_2-配置字体与中文字体" aria-hidden="true">#</a> 2. 配置字体与中文字体</h3><p>typst 使用系统字体（macOS 的 <code>/Library/Fonts</code>、<code>~/Library/Fonts</code>，Linux 的 <code>/usr/share/fonts</code>、<code>~/.local/share/fonts</code>）。用 <code>typst fonts</code> 查看可用字体：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出全部字体</span>
typst fonts
<span class="token comment"># 只看某字体家族</span>
typst fonts <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;source han&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>中英文混排建议指定主字体 + fallback：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#set text(font: &quot;Source Han Serif SC&quot;, fallback: &quot;New Computer Modern&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>字体目录自定义</strong>：typst 默认不扫描任意目录，但可用 <code>--font-path</code> 指定额外字体目录（适合项目内自带的开源字体，避免依赖系统安装）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>typst compile --font-path ./fonts report.typ report.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>提示：<code>--font-path</code> 可重复使用，也可在项目根放一个 <code>.fonts</code> 目录由 CI 一起提交，保证在任何机器上编译结果一致。</p></blockquote><h3 id="_3-引用第三方包-包管理" tabindex="-1"><a class="header-anchor" href="#_3-引用第三方包-包管理" aria-hidden="true">#</a> 3. 引用第三方包（包管理）</h3><p>typst 通过 <code>@preview/...</code>、<code>@local/...</code> 引入包（类似 npm/pip）。在文件顶部声明，首次编译自动拉取：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#import &quot;@preview/cetz:0.2.2&quot;: canvas, draw
#import &quot;@preview/codly:1.0.0&quot;: *
#import &quot;@preview/theanorama:1.0.0&quot;: *
#import &quot;@preview/awesomebox:0.6.1&quot;: *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包版本缓存在 <code>~/.cache/typst/packages</code>（或 <code>$XDG_CACHE_HOME/typst/packages</code>）。常用环境变量：</p><table><thead><tr><th>环境变量</th><th>作用</th><th>示例</th></tr></thead><tbody><tr><td><code>XDG_CACHE_HOME</code></td><td>覆盖包缓存目录</td><td><code>XDG_CACHE_HOME=/tmp/typst-cache typst compile a.typ</code></td></tr><tr><td><code>TYPST_FONT_PATHS</code></td><td>追加字体搜索路径（冒号分隔）</td><td><code>TYPST_FONT_PATHS=./fonts typst compile a.typ</code></td></tr><tr><td><code>TYPST_EMIT_DIRECTORY</code></td><td>指定编译输出的目录</td><td><code>TYPST_EMIT_DIRECTORY=out typst compile a.typ</code></td></tr><tr><td><code>TYPST_ROOT</code></td><td>设置项目根目录</td><td><code>TYPST_ROOT=. typst compile a.typ</code></td></tr></tbody></table><p><strong>离线使用包</strong>：把已缓存的包复制到项目目录，配合 <code>--root</code> 加载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先在联网机器拉取依赖</span>
typst compile main.typ main.pdf

<span class="token comment"># 把缓存包拷到项目 packages 目录（结构：packages/包名/版本/）</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> packages/cetz/0.2.2
<span class="token function">cp</span> <span class="token parameter variable">-r</span> ~/.cache/typst/packages/preview/cetz-0.2.2/* packages/cetz/0.2.2/
typst compile <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> main.typ main.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-长文档与多文件拆分-多章节结构" tabindex="-1"><a class="header-anchor" href="#_4-长文档与多文件拆分-多章节结构" aria-hidden="true">#</a> 4. 长文档与多文件拆分（多章节结构）</h3><p>大型项目（论文/书籍/报告）建议<strong>一个文件一个章节</strong>，用 <code>#include</code> 聚合：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book/
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>// main.typ
#include &quot;theme.typ&quot;

= 前言
#include &quot;chapters/01-intro.typ&quot;
#include &quot;chapters/02-methods.typ&quot;
#include &quot;chapters/03-conclusion.typ&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自动目录 + 图表目录</strong>：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#outline(title: &quot;目录&quot;)
#outline(title: &quot;图目录&quot;, target: figure.where(kind: image))
#outline(title: &quot;表目录&quot;, target: figure.where(kind: table))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后用 <code>typst query</code> 提取目录元素做导航或摘要：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 提取所有 heading 的层级与标题文本</span>
typst query main.typ <span class="token string">&#39;&lt;heading&gt;&#39;</span>
<span class="token comment"># 只取一级标题，输出 JSON 保存</span>
typst query main.typ <span class="token string">&#39;&lt;heading level=1&gt;&#39;</span> <span class="token operator">&gt;</span> headings.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-书目管理-biblatex-bibtex-兼容" tabindex="-1"><a class="header-anchor" href="#_5-书目管理-biblatex-bibtex-兼容" aria-hidden="true">#</a> 5. 书目管理（BibLaTeX / BibTeX 兼容）</h3><p>typst 内置 BibLaTeX 兼容的参考文献系统，<code>typst init</code> 模板自带 <code>bibliography.bib</code>。它可直接读取你已有的 <code>.bib</code> 文件，无需转换：</p><div class="language-bib line-numbers-mode" data-ext="bib"><pre class="language-bib"><code>@article{knuth1984,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  year    = {1984},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>// 文末引用，auto 自动排编号、放参考文献列表
#bibliography(&quot;bibliography.bib&quot;, title: &quot;参考文献&quot;, style: &quot;chicago-author-date&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正文用 <code>@knuth1984</code> 或 <code>#cite(&lt;knuth1984&gt;)</code> 引用。<code>style</code> 支持 <code>&quot;apa&quot;</code>、<code>&quot;chicago-author-date&quot;</code>、<code>&quot;ieee&quot;</code>、<code>&quot;mla&quot;</code> 等常见格式。<code>.bib</code> 文件变更后 <code>typst watch</code> 会自动重排，非常适合&quot;参考文献与正文同步迭代&quot;的工作流。</p><h3 id="_6-使用模板参数与复用函数-脚本化" tabindex="-1"><a class="header-anchor" href="#_6-使用模板参数与复用函数-脚本化" aria-hidden="true">#</a> 6. 使用模板参数与复用函数（脚本化）</h3><p>把可复用的片段定义成函数，实现&quot;数据驱动排版&quot;（如自动生成表格、批量卡片）：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>// report.typ
#let report-card(title, body) = block(
  width: 100%,
  inset: 1em,
  radius: 0.5em,
  fill: rgb(&quot;#f3f6ff&quot;),
  [#text(weight: &quot;bold&quot;)[#title]\\ 
   #body]
)

#report-card(title: &quot;本月数据&quot;, body: [销售额 $12.4$ 万元，同比 $+8\\%$。])
#report-card(title: &quot;风险提示&quot;, body: [关注供应商交付延期。])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 <code>#let</code> 组合页眉、页脚、封面，即可把&quot;模板&quot;抽象成可复用组件库，跨项目复用。</p><h3 id="_7-导出为多种格式-页面尺寸" tabindex="-1"><a class="header-anchor" href="#_7-导出为多种格式-页面尺寸" aria-hidden="true">#</a> 7. 导出为多种格式 &amp; 页面尺寸</h3><p><code>-f</code> 支持 <code>pdf</code>、<code>png</code>、<code>svg</code>，还可导出 JSON 结构。常用组合：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 每页单独导出 SVG（常用于网页插图/流程图）</span>
typst compile <span class="token parameter variable">-f</span> svg <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> diag.typ

<span class="token comment"># 导出 PNG 时控制分辨率与纸张</span>
typst compile <span class="token parameter variable">-f</span> png <span class="token parameter variable">--ppi</span> <span class="token number">300</span> <span class="token parameter variable">--ppr</span> a4 <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> main.typ

<span class="token comment"># 生成页面尺寸为自定义纸张</span>
typst compile <span class="token parameter variable">--ppr</span> <span class="token string">&quot;10cm, 10cm&quot;</span> <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> card.typ card.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>--ppr</code> 既可用内置名（<code>a4</code>/<code>letter</code>/<code>legal</code>），也可写 <code>宽, 高</code> 逗号分隔的显式尺寸，适合做名片、海报、幻灯片。</p></blockquote><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><p><strong>1. 中文引号与标点</strong></p><p>typst 默认英文标点，中文排版请设语言并处理引号：</p><div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#set text(lang: &quot;zh&quot;, region: &quot;cn&quot;)
#set text(quotes: (&quot;“&quot;, &quot;”&quot;, &quot;‘&quot;, &quot;’&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>否则直接键入 <code>&quot;</code> 会得到英文引号。</p><p><strong>2. 依赖下载失败或离线无包</strong></p><p><code>@preview/...</code> 或 <code>@local/...</code> 首次使用需要网络。离线时错误形如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>error: package not found in any of: preview, local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决：提前联网 <code>typst compile</code> 一次缓存依赖，或把包放到项目 <code>packages/</code> 目录并设 <code>--root</code>（见五·3）。企业内网可设置代理后重试：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">HTTP_PROXY</span><span class="token operator">=</span>http://proxy:8080
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HTTPS_PROXY</span><span class="token operator">=</span>http://proxy:8080
typst compile main.typ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 字体乱码/缺字</strong></p><p>中文显示为方块通常是字体未安装或未指定。用 <code>typst fonts</code> 确认字体已注册，再在 <code>#set text(font: ...)</code> 显式指定；服务器环境（如 CI）需先安装相应字体（macOS 装到 <code>~/Library/Fonts</code>，Linux 装到 <code>~/.local/share/fonts</code>）。CI 里建议用 <code>--font-path</code> 指向仓库内字体，避免依赖系统字体包。</p><p><strong>4. 编译速度与内存</strong></p><p>typst 比 LaTeX 快得多，但极端大文档或导入海量包时仍可能耗时。<code>typst watch</code> 增量编译只处理改动部分，日常写作可常开。若处理超大图片（上百 MB），建议先压缩或转成 SVG/WebP 再引用；大图可用 <code>#image(&quot;a.webp&quot;, width: 80%)</code> 限定尺寸，避免整页渲染卡顿。</p><p><strong>5. 版本差异</strong></p><p>Homebrew 的 0.14.1 是较新版本，<code>@preview</code> 包与某些 API 会随主版本变动。旧教程里 <code>#import</code>、<code>#let</code>、<code>#show</code> 的写法若报错，注意核对官方文档对应版本的语法。团队协作建议在 CI 里固定 typst 版本，避免&quot;本地能编、CI 报错&quot;。</p><p><strong>6. 输出格式限制</strong></p><p><code>-f svg</code> 或 <code>-f png</code> 输出不支持交互元素（如超链接跳转），且分页会按页分别生成 <code>{n}.svg</code>。需要带链接、书签、内嵌字体的正式成品，请用 PDF 格式。</p><p><strong>7. 常见报错速查</strong></p><table><thead><tr><th>报错片段</th><th>含义 / 解决办法</th></tr></thead><tbody><tr><td><code>expected item, found content</code></td><td>语法位置写错，如 <code>#set</code> 后少了内容，检查括号/中括号配对</td></tr><tr><td><code>unknown variable: foo</code></td><td>引用了未定义的变量，检查是否漏了 <code>#let foo = ...</code></td></tr><tr><td><code>failed to load file: not found</code></td><td><code>#include</code> 路径错，确认相对 <code>--root</code> 的路径及文件名大小写</td></tr><tr><td><code>package not found</code></td><td>见上方第 2 条，检查包名/版本号是否与 <code>@preview</code> 一致</td></tr><tr><td><code>font not found</code></td><td>字体未安装或未通过 <code>--font-path</code> 提供，<code>typst fonts</code> 核对名称</td></tr><tr><td><code>missing comma</code> / <code>unexpected end of expression</code></td><td>参数表漏逗号或括号未闭合，逐行核对 <code>#set</code>/<code>#show</code> 调用</td></tr></tbody></table><p><strong>8. 安全注意点</strong></p><ul><li><code>#include</code>、<code>#import</code> 会加载并执行本文件中的代码。<strong>不要直接编译/打开来源不明的 <code>.typ</code> 文件</strong>，它可能内嵌恶意脚本访问本地文件或发起网络请求。</li><li>用 <code>--root</code> 限定项目根目录可阻止 <code>#include</code> 越界读取根目录之外的文件，多人协作/自动化构建时建议固定 <code>--root .</code>。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-makefile-一键编译-多目标-批量" tabindex="-1"><a class="header-anchor" href="#_1-makefile-一键编译-多目标-批量" aria-hidden="true">#</a> 1. Makefile 一键编译（多目标 / 批量）</h3><p>把&quot;编译、清理、watch、发布&quot;固化进 <code>Makefile</code>，团队人人可跑：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment"># Makefile</span>
TYPST <span class="token operator">:=</span> typst
MAIN  <span class="token operator">:=</span> main.typ
OUT   <span class="token operator">:=</span> main.pdf
FONTS <span class="token operator">:=</span> --font-path ./fonts

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> all pdf png svg watch clean publish

<span class="token target symbol">all</span><span class="token punctuation">:</span> pdf

<span class="token target symbol">pdf</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAIN<span class="token punctuation">)</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>TYPST<span class="token punctuation">)</span> compile <span class="token variable">$</span><span class="token punctuation">(</span>FONTS<span class="token punctuation">)</span> --root . <span class="token variable">$</span><span class="token punctuation">(</span>MAIN<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUT<span class="token punctuation">)</span>

<span class="token target symbol">png</span><span class="token punctuation">:</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>TYPST<span class="token punctuation">)</span> compile -f png --ppi 300 --root . <span class="token variable">$</span><span class="token punctuation">(</span>MAIN<span class="token punctuation">)</span>

<span class="token target symbol">svg</span><span class="token punctuation">:</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>TYPST<span class="token punctuation">)</span> compile -f svg --root . <span class="token variable">$</span><span class="token punctuation">(</span>MAIN<span class="token punctuation">)</span>

<span class="token target symbol">watch</span><span class="token punctuation">:</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>TYPST<span class="token punctuation">)</span> watch <span class="token variable">$</span><span class="token punctuation">(</span>FONTS<span class="token punctuation">)</span> --root . <span class="token variable">$</span><span class="token punctuation">(</span>MAIN<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUT<span class="token punctuation">)</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f <span class="token variable">$</span><span class="token punctuation">(</span>OUT<span class="token punctuation">)</span> *.png *.svg headings.json

<span class="token target symbol">publish</span><span class="token punctuation">:</span> pdf
	mkdir -p dist &amp;&amp; cp <span class="token variable">$</span><span class="token punctuation">(</span>OUT<span class="token punctuation">)</span> dist/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span>            <span class="token comment"># 编译 PDF</span>
<span class="token function">make</span> png        <span class="token comment"># 批量导出 PNG</span>
<span class="token function">make</span> <span class="token function">watch</span>      <span class="token comment"># 开发预览</span>
<span class="token function">make</span> clean      <span class="token comment"># 清理产物</span>
<span class="token function">make</span> publish    <span class="token comment"># 编译并拷贝到 dist/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-批量处理-循环编译多个文件" tabindex="-1"><a class="header-anchor" href="#_2-批量处理-循环编译多个文件" aria-hidden="true">#</a> 2. 批量处理：循环编译多个文件</h3><p>需要为每个章节/每个文档分别出 PDF 时，用脚本循环（避免手输 N 次命令）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 为 chapters/ 下每个 .typ 单独编译一份 PDF</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> out
<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> chapters/*.typ<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> .typ<span class="token variable">)</span></span>&quot;</span>
  typst compile <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token string">&quot;out/<span class="token variable">$name</span>.pdf&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带错误容错、只重编有改动的文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token comment"># build_chapters.sh —— 增量批量编译</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail
<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> chapters/*.typ<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> .typ<span class="token variable">)</span></span>&quot;</span>
  <span class="token assign-left variable">out</span><span class="token operator">=</span><span class="token string">&quot;out/<span class="token variable">$name</span>.pdf&quot;</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$out</span>&quot;</span> <span class="token operator">||</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token parameter variable">-nt</span> <span class="token string">&quot;<span class="token variable">$out</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&gt;&gt;&gt; 编译 <span class="token variable">$name</span>&quot;</span>
    typst compile <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$out</span>&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;!!! <span class="token variable">$name</span> 失败&quot;</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;跳过（未变更）: <span class="token variable">$name</span>&quot;</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-与-latex-pandoc-配合-排版工作流互通" tabindex="-1"><a class="header-anchor" href="#_3-与-latex-pandoc-配合-排版工作流互通" aria-hidden="true">#</a> 3. 与 LaTeX / pandoc 配合（排版工作流互通）</h3><ul><li><strong>从 LaTeX 迁移</strong>：typst 可直接引用现有 <code>.bib</code> 文件（见五·5），公式语法与 LaTeX 高度相似（<code>$x^2$</code>、<code>\\frac</code>、<code>\\sum</code>），迁移成本低。</li><li><strong>与 pandoc 转换</strong>：typst 暂未被 pandoc 原生直接输出，但可先用 pandoc 把 Markdown/HTML 转成 LaTeX 再手动搬运；更多场景是&quot;内容在 Markdown，用 typst 做最终排版&quot;，可通过脚本把 Markdown 转成 <code>#include</code> 的章节再编译。</li><li><strong>生成适合嵌入的插图</strong>：用 <code>typst compile -f svg</code> 生成矢量图，再 <code>#image</code> 进 LaTeX/HTML 文档，或直接作为 Markdown 插图引用：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>typst compile <span class="token parameter variable">-f</span> svg <span class="token parameter variable">--root</span> <span class="token builtin class-name">.</span> plot.typ plot.svg
<span class="token comment"># 在 Markdown 中直接使用：![](plot.svg)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-与-latexindent-类似-代码风格与-lint" tabindex="-1"><a class="header-anchor" href="#_4-与-latexindent-类似-代码风格与-lint" aria-hidden="true">#</a> 4. 与 latexindent 类似：代码风格与 lint</h3><p>typst 官方 CLI 未内置格式化器，但可用 <code>typstfmt</code>（第三方）统一团队代码风格：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 typstfmt（Rust 工具，需 cargo）</span>
<span class="token function">cargo</span> <span class="token function">install</span> typstfmt

<span class="token comment"># 递归格式化整个项目，保持风格一致</span>
typstfmt <span class="token parameter variable">-r</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 与 git 集成：提交前检查是否已格式化</span>
<span class="token function">git</span> <span class="token function">diff</span> --name-only <span class="token string">&#39;*.typ&#39;</span> <span class="token operator">|</span> <span class="token function">xargs</span> typstfmt <span class="token parameter variable">--check</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配合 pre-commit 钩子，保证提交的 <code>.typ</code> 都经过格式化。</p><h3 id="_5-ci-集成-github-actions-自动构建并发布-pdf" tabindex="-1"><a class="header-anchor" href="#_5-ci-集成-github-actions-自动构建并发布-pdf" aria-hidden="true">#</a> 5. CI 集成：GitHub Actions 自动构建并发布 PDF</h3><p>在 <code>.github/workflows/release.yml</code> 中定义：任何 push 到 <code>main</code> 或打 tag 时自动编译并上传：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Build Typst PDF
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
    <span class="token key atrule">tags</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;v*&#39;</span><span class="token punctuation">]</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4

      <span class="token comment"># 用官方 typst-actions，缓存包依赖与字体</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup typst
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> typst<span class="token punctuation">-</span>community/setup<span class="token punctuation">-</span>typst@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">cache-dependency-hash</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/*.typ&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build PDF
        <span class="token key atrule">run</span><span class="token punctuation">:</span> typst compile <span class="token punctuation">-</span><span class="token punctuation">-</span>root . main.typ main.pdf

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload artifact
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> report<span class="token punctuation">-</span>pdf
          <span class="token key atrule">path</span><span class="token punctuation">:</span> main.pdf

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Publish release on tag
        <span class="token key atrule">if</span><span class="token punctuation">:</span> startsWith(github.ref<span class="token punctuation">,</span> &#39;refs/tags/&#39;)
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> softprops/action<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>release@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">files</span><span class="token punctuation">:</span> main.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>.gitignore</code> 中忽略产物、提交源码即可，让 CI 在干净环境重现编译：</p><div class="language-gitignore line-numbers-mode" data-ext="gitignore"><pre class="language-gitignore"><code><span class="token entry string"><span class="token operator">*</span>.pdf</span>
<span class="token entry string"><span class="token operator">*</span>.png</span>
<span class="token entry string"><span class="token operator">*</span>.svg</span>
<span class="token entry string">out<span class="token punctuation">/</span></span>
<span class="token entry string">dist<span class="token punctuation">/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-生产级实践清单" tabindex="-1"><a class="header-anchor" href="#_6-生产级实践清单" aria-hidden="true">#</a> 6. 生产级实践清单</h3><ul><li><strong>固定版本</strong>：CI 用官方 setup action 并锁定 typst 版本，配合 <code>.tectonic</code>/lockfile 思想，保证可复现。</li><li><strong>字体随仓库走</strong>：用 <code>--font-path ./fonts</code> 并提交开源字体，任何机器编译结果一致。</li><li><strong>离线依赖</strong>：把 <code>@preview</code> 包固化进项目 <code>packages/</code>，或提前 <code>typst compile</code> 预热缓存，避免 CI 网络抖动。</li><li><strong>差异可读</strong>：在 Git 中做 <code>typst diff</code>（配合 <code>typst-preview</code> 的 diff 能力或二进制对比）审查排版改动。</li><li><strong>异常隔离</strong>：构建脚本用 <code>set -euo pipefail</code>，编译失败立即中断 CI，避免发布残缺产物。</li></ul>`,113),l=[i];function d(o,c){return s(),a("div",null,l)}const u=n(t,[["render",d],["__file","typst.html.vue"]]);export{u as default};
