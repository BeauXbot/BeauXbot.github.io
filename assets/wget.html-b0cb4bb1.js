import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,e as s}from"./app-c560c336.js";const t={},i=s(`<h1 id="wget-命令行文件下载工具" tabindex="-1"><a class="header-anchor" href="#wget-命令行文件下载工具" aria-hidden="true">#</a> wget（命令行文件下载工具）</h1><blockquote><p>Homebrew 版本 1.25.0 ｜ 主页：见官方文档 ｜ 安装：<code>brew install wget</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>wget 是 GNU 项目出品的经典命令行文件下载工具，支持 HTTP、HTTPS 和 FTP 协议，擅长<strong>非交互式</strong>批量下载与断点续传——即使终端断开或脚本后台运行也能继续拉取文件。它主要解决服务器间搬运文件、抓取网页镜像、定时拉取数据包等自动化场景，配合 shell 脚本可完全无人值守。典型应用包括：下载软件包/镜像、爬取整个网站、批量抓取一页上的所有资源、以及用 <code>cron</code> 定时同步文件。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>macOS 不自带 wget（预装的是 <code>curl</code>），通过 Homebrew 安装后会自动加入 PATH。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装（默认编译版；如需 HTTPS 支持已内置）</span>
brew <span class="token function">install</span> <span class="token function">wget</span>

<span class="token comment"># 验证安装（注意：1.25.0 已是 wget 的最终版本，GNU 已停止维护 wget，改为 wget2）</span>
<span class="token function">wget</span> <span class="token parameter variable">--version</span>
<span class="token comment"># 期望输出首行：GNU Wget 1.25.0 built on darwin22.6.0</span>

<span class="token comment"># 查看帮助</span>
<span class="token function">wget</span> <span class="token parameter variable">--help</span>

<span class="token comment"># 升级（一般不会再有新版）</span>
brew upgrade <span class="token function">wget</span>

<span class="token comment"># 卸载</span>
brew uninstall <span class="token function">wget</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后 <code>wget</code> 位于 <code>/opt/homebrew/bin/wget</code>（Apple Silicon）或 <code>/usr/local/bin/wget</code>（Intel）。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数/说明</th><th>示例</th></tr></thead><tbody><tr><td><code>wget &lt;url&gt;</code></td><td>下载单个文件到当前目录</td><td><code>wget https://example.com/file.zip</code></td></tr><tr><td><code>-O</code></td><td>指定保存文件名</td><td><code>wget -O index.html https://example.com/</code></td></tr><tr><td><code>-c</code></td><td>断点续传（从上次中断处继续）</td><td><code>wget -c https://example.com/big.iso</code></td></tr><tr><td><code>-b</code></td><td>后台下载，日志写入 wget-log</td><td><code>wget -b https://example.com/a.iso</code></td></tr><tr><td><code>-r</code></td><td>递归抓取整个网站</td><td><code>wget -r -np https://example.com/docs/</code></td></tr><tr><td><code>-A</code> / <code>-R</code></td><td>只接受/拒绝指定后缀</td><td><code>wget -r -A jpg,png https://example.com/gallery/</code></td></tr><tr><td><code>-P</code></td><td>保存到指定目录</td><td><code>wget -P ~/downloads https://example.com/a.tar.gz</code></td></tr><tr><td><code>--limit-rate</code></td><td>限制下载速率（避免占满带宽）</td><td><code>wget --limit-rate=200k https://example.com/a.iso</code></td></tr><tr><td><code>-i</code></td><td>从文件读取 URL 列表批量下载</td><td><code>wget -i urls.txt</code></td></tr><tr><td><code>-q</code></td><td>安静模式，不打印进度</td><td><code>wget -q https://example.com/a.txt</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-下载单个文件并重命名" tabindex="-1"><a class="header-anchor" href="#示例-1-下载单个文件并重命名" aria-hidden="true">#</a> 示例 1：下载单个文件并重命名</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 进入下载目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/downloads <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/downloads

<span class="token comment"># 2. 下载 Go 官方安装包（真实存在的 URL）</span>
<span class="token function">wget</span> https://go.dev/dl/go1.23.4.darwin-arm64.tar.gz

<span class="token comment"># 3. 下载过程中会显示进度条、速度与剩余时间，结束后检查</span>
<span class="token function">ls</span> <span class="token parameter variable">-lh</span> go1.23.4.darwin-arm64.tar.gz
<span class="token comment"># 输出示例：-rw-r--r--  1 wangbo  staff    61M ... go1.23.4.darwin-arm64.tar.gz</span>

<span class="token comment"># 4. 用 -O 直接改名保存</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> go.tgz https://go.dev/dl/go1.23.4.darwin-arm64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-2-断点续传-后台下载大文件" tabindex="-1"><a class="header-anchor" href="#示例-2-断点续传-后台下载大文件" aria-hidden="true">#</a> 示例 2：断点续传 + 后台下载大文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 后台下载并限制速度，日志写入 wget-log</span>
<span class="token function">wget</span> <span class="token parameter variable">-b</span> --limit-rate<span class="token operator">=</span>500k https://releases.ubuntu.com/24.04/ubuntu-24.04.1-desktop-amd64.iso

<span class="token comment"># 2. 查看后台进度（按需多次执行）</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> wget-log

<span class="token comment"># 3. 若中断，用 -c 续传（会接着已有部分下载，而非重新开始）</span>
<span class="token function">wget</span> <span class="token parameter variable">-c</span> https://releases.ubuntu.com/24.04/ubuntu-24.04.1-desktop-amd64.iso

<span class="token comment"># 4. 完成后查看文件</span>
<span class="token function">ls</span> <span class="token parameter variable">-lh</span> ubuntu-24.04.1-desktop-amd64.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-递归抓取一个文档站点-本地镜像" tabindex="-1"><a class="header-anchor" href="#示例-3-递归抓取一个文档站点-本地镜像" aria-hidden="true">#</a> 示例 3：递归抓取一个文档站点（本地镜像）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 递归抓取、不上升到父目录、不追外链、转本地可浏览</span>
<span class="token function">wget</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-np</span> <span class="token parameter variable">-k</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-P</span> ./mirror https://example.com/docs/

<span class="token comment"># 参数说明：</span>
<span class="token comment">#   -r    递归</span>
<span class="token comment">#   -np   不进入父目录（--no-parent）</span>
<span class="token comment">#   -k    把链接转为本地相对链接（--convert-links）</span>
<span class="token comment">#   -p    下载页面所需的图片/样式等资源（--page-requisites）</span>
<span class="token comment">#   -P    保存到 ./mirror 目录</span>

<span class="token comment"># 2. 完成后在浏览器打开镜像首页</span>
<span class="token function">open</span> ./mirror/example.com/docs/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-4-从列表批量下载-自动命名" tabindex="-1"><a class="header-anchor" href="#示例-4-从列表批量下载-自动命名" aria-hidden="true">#</a> 示例 4：从列表批量下载 + 自动命名</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备一个 URL 列表（每行一个地址）</span>
<span class="token builtin class-name">printf</span> <span class="token string">&#39;%s\\n&#39;</span> <span class="token punctuation">\\</span>
  <span class="token string">&#39;https://example.com/a.zip&#39;</span> <span class="token punctuation">\\</span>
  <span class="token string">&#39;https://example.com/b.zip&#39;</span> <span class="token punctuation">\\</span>
  <span class="token string">&#39;https://example.com/c.zip&#39;</span> <span class="token operator">&gt;</span> urls.txt

<span class="token comment"># 2. 批量下载</span>
<span class="token function">wget</span> <span class="token parameter variable">-i</span> urls.txt

<span class="token comment"># 3. 全部下载完成，查看结果</span>
<span class="token function">ls</span> <span class="token parameter variable">-lh</span> a.zip b.zip c.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-登录认证与代理" tabindex="-1"><a class="header-anchor" href="#_1-登录认证与代理" aria-hidden="true">#</a> 1. 登录认证与代理</h3><p>wget 支持 HTTP Basic 认证与常见代理变量，配合环境变量可穿透代理：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 基本认证（用户名:密码 形式）</span>
<span class="token function">wget</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>alice <span class="token parameter variable">--password</span><span class="token operator">=</span>secret https://example.com/private/file

<span class="token comment"># 走 HTTP 代理（也可用环境变量 HTTPS_PROXY）</span>
<span class="token function">wget</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">use_proxy</span><span class="token operator">=</span>yes <span class="token parameter variable">-e</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890 https://example.com/a.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-覆盖与反爬策略" tabindex="-1"><a class="header-anchor" href="#_2-覆盖与反爬策略" aria-hidden="true">#</a> 2. 覆盖与反爬策略</h3><p>默认 wget 的 UA 是 <code>Wget/1.25.0</code>，部分站点会拦截。用 <code>-U</code> 伪装浏览器 UA、用 <code>--header</code> 附加自定义请求头：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-U</span> <span class="token string">&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36&quot;</span> <span class="token punctuation">\\</span>
     <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">&quot;Referer: https://example.com/&quot;</span> <span class="token punctuation">\\</span>
     https://example.com/restricted/file.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-定时任务-增量同步-搭配-cron-与-rsync" tabindex="-1"><a class="header-anchor" href="#_3-定时任务-增量同步-搭配-cron-与-rsync" aria-hidden="true">#</a> 3. 定时任务 + 增量同步（搭配 cron 与 rsync）</h3><p>wget 常与 <code>cron</code> 组合实现每日自动下载，再配合 <code>rsync</code> 增量同步到远端：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 写一个下载脚本</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> ~/bin/daily_dl.sh <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#!/bin/bash
cd ~/data
wget -N -q https://example.com/feeds/latest.csv   # -N 仅当远端更新时才下载
rsync -az ~/data/ user@server:/srv/data/
EOF</span>
<span class="token function">chmod</span> +x ~/bin/daily_dl.sh

<span class="token comment"># 2. 加入 crontab，每天凌晨 2 点执行</span>
<span class="token punctuation">(</span>crontab <span class="token parameter variable">-l</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;0 2 * * * /Users/wangbo/bin/daily_dl.sh&quot;</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token function">crontab</span> -
<span class="token function">crontab</span> <span class="token parameter variable">-l</span>   <span class="token comment"># 确认已添加</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-配置文件-wgetrc" tabindex="-1"><a class="header-anchor" href="#_4-配置文件-wgetrc" aria-hidden="true">#</a> 4. 配置文件 <code>~/.wgetrc</code></h3><p>wget 支持全局配置，把常用参数写进 <code>~/.wgetrc</code> 可免去每次敲参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># ~/.wgetrc 示例内容
use_proxy = on
http_proxy = http://127.0.0.1:7890
https_proxy = http://127.0.0.1:7890
user_agent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
quiet = off
limit_rate = 500k
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此后所有 wget 调用默认走代理、限速并带该 UA。</p><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-断点续传的前提是服务器支持" tabindex="-1"><a class="header-anchor" href="#_1-断点续传的前提是服务器支持" aria-hidden="true">#</a> 1. 断点续传的前提是服务器支持</h3><p><code>-c</code> 依赖服务器的 <code>Range</code>/<code>Accept-Ranges</code> 支持。若服务器不支持续传，<code>-c</code> 会从头重下并可能把已有文件<strong>追加</strong>坏——此时应先删除损坏文件再重下。排查：先看响应头里有没有 <code>Accept-Ranges: bytes</code>。</p><h3 id="_2-https-证书与自签名站点" tabindex="-1"><a class="header-anchor" href="#_2-https-证书与自签名站点" aria-hidden="true">#</a> 2. HTTPS 证书与自签名站点</h3><p>访问自签名或过期证书的站点会报 <code>ERROR: cannot verify ... not certified</code>，原因是 wget 默认严格校验证书。<strong>不要</strong>随手用 <code>--no-check-certificate</code> 绕过（有中间人风险），应使用 <code>--ca-certificate</code> 或安装根证书：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用 CA 证书链验证（推荐）</span>
<span class="token function">wget</span> --ca-certificate<span class="token operator">=</span>/path/to/ca-bundle.crt https://internal.example.com/file

<span class="token comment"># 仅在内网测试环境才考虑：wget --no-check-certificate https://...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-递归抓取容易爬爆磁盘与带宽" tabindex="-1"><a class="header-anchor" href="#_3-递归抓取容易爬爆磁盘与带宽" aria-hidden="true">#</a> 3. 递归抓取容易爬爆磁盘与带宽</h3><p><code>-r</code> 不加 <code>-np</code>/<code>-l</code> 会顺着外链越爬越远，几分钟就能拉下几个 GB 或触发对方服务器封 IP。务必加上 <code>-np</code>（不越级）、<code>-l 1</code> 等限制深度，并对大批量抓取设置 <code>--limit-rate</code> 与 <code>--wait</code> 礼貌下载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-np</span> <span class="token parameter variable">-l</span> <span class="token number">2</span> <span class="token parameter variable">--wait</span><span class="token operator">=</span><span class="token number">2</span> --limit-rate<span class="token operator">=</span>500k https://example.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-后台下载后要记得清理日志" tabindex="-1"><a class="header-anchor" href="#_4-后台下载后要记得清理日志" aria-hidden="true">#</a> 4. 后台下载后要记得清理日志</h3><p><code>-b</code> 后台模式会把日志写入当前目录的 <code>wget-log</code>，每次后台任务都会覆盖这个同名文件。若同时跑多个后台任务，改用 <code>-o</code> 指定各自日志，避免相互覆盖：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_a.log url_a
<span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_b.log url_b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-wget-已停止维护-可迁移到-wget2" tabindex="-1"><a class="header-anchor" href="#_5-wget-已停止维护-可迁移到-wget2" aria-hidden="true">#</a> 5. wget 已停止维护，可迁移到 wget2</h3><p>GNU 已于 2024 年停止维护 wget 1.x（1.25.0 为最终版），后续功能（HTTP/2、并发下载、更完善的重试）都在 wget2 上。若需要新特性，可安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> wget2
wget2 https://example.com/a.iso   <span class="token comment"># 用法与 wget 大体兼容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>日常简单下载用 wget 1.25.0 完全够用；追求新特性与性能建议用 wget2 或 curl。</p>`,49),d=[i];function c(l,r){return a(),n("div",null,d)}const m=e(t,[["render",c],["__file","wget.html.vue"]]);export{m as default};
