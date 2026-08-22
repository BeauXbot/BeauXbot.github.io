import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,e}from"./app-4490560f.js";const t={},i=e(`<h1 id="wget-命令行文件下载工具" tabindex="-1"><a class="header-anchor" href="#wget-命令行文件下载工具" aria-hidden="true">#</a> wget（命令行文件下载工具）</h1><blockquote><p>Homebrew 版本 1.25.0 ｜ 主页：见官方文档 ｜ 安装：<code>brew install wget</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>wget 是 GNU 项目出品的经典命令行文件下载工具，支持 HTTP、HTTPS 和 FTP 协议，擅长<strong>非交互式</strong>批量下载与断点续传——即使终端断开或脚本后台运行也能继续拉取文件。它主要解决服务器间搬运文件、抓取网页镜像、定时拉取数据包等自动化场景，配合 shell 脚本可完全无人值守。典型应用包括：下载软件包/镜像、爬取整个网站、批量抓取一页上的所有资源、以及用 <code>cron</code> 定时同步文件。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>macOS 不自带 wget（预装的是 <code>curl</code>），通过 Homebrew 安装后会自动加入 PATH。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装（默认编译版；如需 HTTPS 支持已内置）</span>
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

<span class="token comment"># 密码走环境变量，避免明文出现在 history 或进程列表（/proc 或 ps 中可见）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">WGET_PASSWORD</span><span class="token operator">=</span><span class="token string">&#39;secret&#39;</span>
<span class="token function">wget</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>alice <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$WGET_PASSWORD</span>&quot;</span> https://example.com/private/file

<span class="token comment"># 走 HTTP 代理（也可用环境变量 HTTPS_PROXY）</span>
<span class="token function">wget</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">use_proxy</span><span class="token operator">=</span>yes <span class="token parameter variable">-e</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890 https://example.com/a.zip

<span class="token comment"># 基于 Cookie 的会话认证：先保存登录后的 Cookie 再携带</span>
<span class="token function">wget</span> --save-cookies cookies.txt --keep-session-cookies <span class="token punctuation">\\</span>
     --post-data<span class="token operator">=</span><span class="token string">&#39;user=alice&amp;pass=secret&#39;</span> <span class="token punctuation">\\</span>
     https://example.com/login
<span class="token function">wget</span> --load-cookies cookies.txt https://example.com/members-only/page.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-覆盖与反爬策略" tabindex="-1"><a class="header-anchor" href="#_2-覆盖与反爬策略" aria-hidden="true">#</a> 2. 覆盖与反爬策略</h3><p>默认 wget 的 UA 是 <code>Wget/1.25.0</code>，部分站点会拦截。用 <code>-U</code> 伪装浏览器 UA、用 <code>--header</code> 附加自定义请求头：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-U</span> <span class="token string">&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36&quot;</span> <span class="token punctuation">\\</span>
     <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">&quot;Referer: https://example.com/&quot;</span> <span class="token punctuation">\\</span>
     https://example.com/restricted/file.pdf

<span class="token comment"># 组合多个请求头，模拟真实浏览器请求</span>
<span class="token function">wget</span> <span class="token parameter variable">-U</span> <span class="token string">&quot;<span class="token variable">$UA</span>&quot;</span> <span class="token punctuation">\\</span>
     <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">&quot;Accept: text/html,application/xhtml+xml&quot;</span> <span class="token punctuation">\\</span>
     <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">&quot;Accept-Language: zh-CN,zh;q=0.9,en;q=0.8&quot;</span> <span class="token punctuation">\\</span>
     <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">&quot;Cookie: session=abc123&quot;</span> <span class="token punctuation">\\</span>
     https://example.com/page
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-定时任务-增量同步-搭配-cron-与-rsync" tabindex="-1"><a class="header-anchor" href="#_3-定时任务-增量同步-搭配-cron-与-rsync" aria-hidden="true">#</a> 3. 定时任务 + 增量同步（搭配 cron 与 rsync）</h3><p>wget 常与 <code>cron</code> 组合实现每日自动下载，再配合 <code>rsync</code> 增量同步到远端：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 写一个下载脚本</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-配置文件-wgetrc" tabindex="-1"><a class="header-anchor" href="#_4-配置文件-wgetrc" aria-hidden="true">#</a> 4. 配置文件 <code>~/.wgetrc</code></h3><p>wget 支持全局配置，把常用参数写进 <code>~/.wgetrc</code> 可免去每次敲参数。配置文件的作用域依次为：系统级 <code>/etc/wgetrc</code> → 用户级 <code>~/.wgetrc</code>（后者覆盖前者），命令行参数优先级最高。<strong>命令行写法与配置文件的对应规则</strong>：命令行中的长选项 <code>--user_agent=xxx</code> 在配置文件中去掉 <code>--</code> 并把 <code>-</code> 换成 <code>_</code> 即可，如 <code>--timeout</code> → <code>timeout</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># ~/.wgetrc 示例内容
use_proxy = on
http_proxy = http://127.0.0.1:7890
https_proxy = http://127.0.0.1:7890
user_agent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
quiet = off
limit_rate = 500k

# ---- 进阶：下载行为 ----
# 断点续传默认开启
continue = on
# 服务器不支持续传时，强制删除并重下（配合 continue）
# （在配置里写 continue=on 后，不要再用 -c；否则会报“已是最新”而跳过）
# 重试次数与超时
tries = 5
timeout = 60
waitretry = 10
# 重试间隔基准（秒），配合 --waitretry 实现指数退避
# 默认 5 个并发连接、单文件不分片
max_redirect = 20
# 递归抓取的默认深度限制（慎开全局递归，否则每个命令都递归）
recursive = off
# 时间戳对比，仅下载更新的文件
timestamping = on
# 不进入父目录
no_parent = on
# 日志文件路径
output_document = /dev/stdout
# 保存 HTML 页面所需的资源
page_requisites = on
# 把下载的 HTML 转成本地可浏览的相对链接
convert_links = on
# 配置代理认证（如代理需要用户名密码）
proxy_user = myproxy
proxy_password = myproxysecret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：全局打开 <code>continue = on</code> 后，个别命令想强制重下可用 <code>--no-clobber</code> 的相反行为，或临时用命令行 <code>--continue</code>/不续传覆盖；多配置文件可用 <code>wget --config=my.conf</code> 指定，或 <code>--no-config</code> 完全忽略配置文件。</p></blockquote><h3 id="_5-下载策略-限速、限时、限重试" tabindex="-1"><a class="header-anchor" href="#_5-下载策略-限速、限时、限重试" aria-hidden="true">#</a> 5. 下载策略：限速、限时、限重试</h3><p>对大文件或慢网络，控制带宽与超时很关键：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 限速（支持 k/M/G 单位），避免占满家庭/办公带宽</span>
<span class="token function">wget</span> --limit-rate<span class="token operator">=</span>300k https://example.com/big.iso

<span class="token comment"># 分时段限速：24 小时内每天凌晨限速最狠</span>
<span class="token function">wget</span> --limit-rate<span class="token operator">=</span>300k <span class="token parameter variable">--timeout</span><span class="token operator">=</span><span class="token number">120</span> https://example.com/big.iso

<span class="token comment"># 限制总下载量（bytes），超出即中止，适合按量计费网络</span>
<span class="token function">wget</span> <span class="token parameter variable">--quota</span><span class="token operator">=</span>500m https://example.com/iso/*.iso

<span class="token comment"># 设定各类超时（连接/读取/总时长），单位秒</span>
<span class="token function">wget</span> --connect-timeout<span class="token operator">=</span><span class="token number">10</span> --read-timeout<span class="token operator">=</span><span class="token number">30</span> <span class="token parameter variable">--timeout</span><span class="token operator">=</span><span class="token number">120</span> https://example.com/a.iso

<span class="token comment"># 失败重试 + 指数退避（等待间隔每次翻倍）</span>
<span class="token function">wget</span> <span class="token parameter variable">--tries</span><span class="token operator">=</span><span class="token number">10</span> <span class="token parameter variable">--waitretry</span><span class="token operator">=</span><span class="token number">5</span> https://unstable.example.com/a.iso

<span class="token comment"># 完全静默 + 遇到失败返回非零退出码，便于脚本判断</span>
<span class="token function">wget</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">--tries</span><span class="token operator">=</span><span class="token number">3</span> https://example.com/a.txt <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> OK <span class="token operator">||</span> <span class="token builtin class-name">echo</span> FAIL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-多连接与并行下载" tabindex="-1"><a class="header-anchor" href="#_6-多连接与并行下载" aria-hidden="true">#</a> 6. 多连接与并行下载</h3><p>wget 1.x 对单个文件<strong>不支持</strong>分片多连接，但可对多个 URL 并行（后台模式），或用 wget2 / axel / aria2 实现单文件分片：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 并行下载多个文件：每个 -b 独立后台 + 独立日志</span>
<span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_a.log url_a
<span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_b.log url_b
<span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_c.log url_c

<span class="token comment"># 2. 单文件分片并行：wget2 原生支持</span>
wget2 --max-threads<span class="token operator">=</span><span class="token number">8</span> https://example.com/big.iso

<span class="token comment"># 3. 或用 aria2 做分片下载（更主流，-x 指定每文件连接数）</span>
aria2c <span class="token parameter variable">-x</span> <span class="token number">16</span> <span class="token parameter variable">-s</span> <span class="token number">16</span> https://example.com/big.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-基于时间戳的增量抓取与镜像同步" tabindex="-1"><a class="header-anchor" href="#_7-基于时间戳的增量抓取与镜像同步" aria-hidden="true">#</a> 7. 基于时间戳的增量抓取与镜像同步</h3><p>利用 <code>-N</code>/<code>--timestamping</code> 只下载更新的文件，实现轻量增量同步：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 只下载比本地更新的文件（HTTP 与 FTP 均支持）</span>
<span class="token function">wget</span> <span class="token parameter variable">-N</span> <span class="token parameter variable">-m</span> https://example.com/files/

<span class="token comment"># -m（镜像）等价于 -r -N -l inf -np，适合整站镜像</span>
<span class="token function">wget</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-k</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">robots</span><span class="token operator">=</span>off https://example.com/

<span class="token comment"># 结合 cron 每日增量镜像：只拉新增/变更，配合 --wait 礼貌抓取</span>
<span class="token comment"># 0 3 * * * cd ~/mirror &amp;&amp; wget -N -m --wait=1 --limit-rate=500k https://example.com/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-输出格式与日志轮转" tabindex="-1"><a class="header-anchor" href="#_8-输出格式与日志轮转" aria-hidden="true">#</a> 8. 输出格式与日志轮转</h3><p>wget 的进度/日志可定制，方便接入自动化与日志系统：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进度条风格：bar / dot（适合管道日志）/ none</span>
<span class="token function">wget</span> <span class="token parameter variable">--progress</span><span class="token operator">=</span>bar https://example.com/a.iso
<span class="token function">wget</span> <span class="token parameter variable">--progress</span><span class="token operator">=</span>dot:mega https://example.com/a.iso   <span class="token comment"># 每 1M 一个点</span>

<span class="token comment"># 指定日志文件（后台与前台都可）</span>
<span class="token function">wget</span> <span class="token parameter variable">-o</span> /var/log/wget_dl.log https://example.com/a.iso

<span class="token comment"># 追加而非覆盖日志（--append-output）</span>
<span class="token function">wget</span> <span class="token parameter variable">-a</span> /var/log/wget_all.log https://example.com/b.iso

<span class="token comment"># 内容同时发到 stdout 和日志</span>
<span class="token function">wget</span> <span class="token parameter variable">-o</span> dl.log https://example.com/a.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-断点续传的前提是服务器支持" tabindex="-1"><a class="header-anchor" href="#_1-断点续传的前提是服务器支持" aria-hidden="true">#</a> 1. 断点续传的前提是服务器支持</h3><p><code>-c</code> 依赖服务器的 <code>Range</code>/<code>Accept-Ranges</code> 支持。若服务器不支持续传，<code>-c</code> 会从头重下并可能把已有文件<strong>追加</strong>坏——此时应先删除损坏文件再重下。排查：先看响应头里有没有 <code>Accept-Ranges: bytes</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用 curl 检查服务器是否支持断点续传</span>
<span class="token function">curl</span> <span class="token parameter variable">-sI</span> https://example.com/big.iso <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;accept-ranges&#39;</span>
<span class="token comment"># 输出 accept-ranges: bytes 则支持；无该头则不支持，需删掉旧文件再重下</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-https-证书与自签名站点" tabindex="-1"><a class="header-anchor" href="#_2-https-证书与自签名站点" aria-hidden="true">#</a> 2. HTTPS 证书与自签名站点</h3><p>访问自签名或过期证书的站点会报 <code>ERROR: cannot verify ... not certified</code>，原因是 wget 默认严格校验证书。<strong>不要</strong>随手用 <code>--no-check-certificate</code> 绕过（有中间人风险），应使用 <code>--ca-certificate</code> 或安装根证书：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用 CA 证书链验证（推荐）</span>
<span class="token function">wget</span> --ca-certificate<span class="token operator">=</span>/path/to/ca-bundle.crt https://internal.example.com/file

<span class="token comment"># 仅在内网测试环境才考虑：wget --no-check-certificate https://...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-递归抓取容易爬爆磁盘与带宽" tabindex="-1"><a class="header-anchor" href="#_3-递归抓取容易爬爆磁盘与带宽" aria-hidden="true">#</a> 3. 递归抓取容易爬爆磁盘与带宽</h3><p><code>-r</code> 不加 <code>-np</code>/<code>-l</code> 会顺着外链越爬越远，几分钟就能拉下几个 GB 或触发对方服务器封 IP。务必加上 <code>-np</code>（不越级）、<code>-l 1</code> 等限制深度，并对大批量抓取设置 <code>--limit-rate</code> 与 <code>--wait</code> 礼貌下载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-np</span> <span class="token parameter variable">-l</span> <span class="token number">2</span> <span class="token parameter variable">--wait</span><span class="token operator">=</span><span class="token number">2</span> --limit-rate<span class="token operator">=</span>500k https://example.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配合 <code>-e robots=off</code> 可忽略对方的 <code>robots.txt</code> 限制，但<strong>仅在确实需要且不违法/不违规时</strong>使用——默认 wget 会遵守 robots.txt。</p><h3 id="_4-后台下载后要记得清理日志" tabindex="-1"><a class="header-anchor" href="#_4-后台下载后要记得清理日志" aria-hidden="true">#</a> 4. 后台下载后要记得清理日志</h3><p><code>-b</code> 后台模式会把日志写入当前目录的 <code>wget-log</code>，每次后台任务都会覆盖这个同名文件。若同时跑多个后台任务，改用 <code>-o</code> 指定各自日志，避免相互覆盖：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_a.log url_a
<span class="token function">wget</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-o</span> dl_b.log url_b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-文件名冲突与覆盖陷阱" tabindex="-1"><a class="header-anchor" href="#_5-文件名冲突与覆盖陷阱" aria-hidden="true">#</a> 5. 文件名冲突与覆盖陷阱</h3><p>默认 wget 若发现本地已有同名文件会<strong>静默跳过</strong>（不覆盖）。想覆盖旧文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 强制覆盖</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> file.zip https://example.com/file.zip

<span class="token comment"># 让 wget 生成唯一名（file.zip.1、file.zip.2 ...）</span>
<span class="token function">wget</span> --content-disposition https://example.com/file.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-编码-中文文件名乱码" tabindex="-1"><a class="header-anchor" href="#_6-编码-中文文件名乱码" aria-hidden="true">#</a> 6. 编码/中文文件名乱码</h3><p>部分站点文件名是 URL 编码的（<code>%E4%B8%AD</code> 等），wget 默认按原始字节保存，导致中文名乱码。可让 wget 从响应头 <code>Content-Disposition</code> 解析文件名：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> --content-disposition <span class="token string">&#39;https://example.com/文件.pdf&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>若服务器不给 <code>Content-Disposition</code> 头，需配合 <code>-O</code> 手工指定正确文件名。</p><h3 id="_7-动态渲染页面下载不完整" tabindex="-1"><a class="header-anchor" href="#_7-动态渲染页面下载不完整" aria-hidden="true">#</a> 7. 动态渲染页面下载不完整</h3><p>wget 只拉取静态 HTML，<strong>不会执行 JavaScript</strong>。对 SPA 站点（React/Vue）或需要 JS 渲染内容的页面，wget 拿到的往往只有空壳骨架。此时应改用 curl + 浏览器渲染工具（如 Playwright/Puppeteer）或直接下载站点提供的 API/导出文件。</p><h3 id="_8-性能与安全提示" tabindex="-1"><a class="header-anchor" href="#_8-性能与安全提示" aria-hidden="true">#</a> 8. 性能与安全提示</h3><ul><li><strong>限速</strong>：大批量抓取务必 <code>--limit-rate</code> + <code>--wait</code>，既保护自己也避免被封。</li><li><strong>不轻易关证书校验</strong>：<code>--no-check-certificate</code> 等于放弃 HTTPS 完整性，仅限已知内网。</li><li><strong>密码保密</strong>：<code>--password</code> 会出现在 shell history 与 <code>ps</code> 输出，敏感密码改用环境变量或 <code>--password=$(cat secret)</code>。</li><li><strong>磁盘空间</strong>：递归镜像前先用 <code>du -sh .</code> 评估磁盘余量，<code>--quota</code> 可设总下载上限。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-与-pv-搭配-直观限速与进度监控" tabindex="-1"><a class="header-anchor" href="#_1-与-pv-搭配-直观限速与进度监控" aria-hidden="true">#</a> 1. 与 pv 搭配：直观限速与进度监控</h3><p><code>wget</code> 自带进度条，但配合 <code>pv</code>（Pipe Viewer）可精确控制流速并显示累计吞吐：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> <span class="token function">pv</span>   <span class="token comment"># 若未安装</span>

<span class="token comment"># 用 pv 做限速（-L 每秒字节数，-r -b 显示速率与累计）</span>
<span class="token function">wget</span> -qO- https://example.com/big.iso <span class="token operator">|</span> <span class="token function">pv</span> <span class="token parameter variable">-L</span> 200k <span class="token parameter variable">-r</span> <span class="token parameter variable">-b</span> <span class="token operator">&gt;</span> big.iso

<span class="token comment"># 下载 tar 包直接流式解压，边下边看进度</span>
<span class="token function">wget</span> -qO- https://example.com/app.tar.gz <span class="token operator">|</span> <span class="token function">pv</span> <span class="token parameter variable">-L</span> 300k <span class="token operator">|</span> <span class="token function">tar</span> <span class="token parameter variable">-xz</span> <span class="token parameter variable">-C</span> ./app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-与-curl-对比与互补" tabindex="-1"><a class="header-anchor" href="#_2-与-curl-对比与互补" aria-hidden="true">#</a> 2. 与 curl 对比与互补</h3><ul><li><strong>wget</strong>：擅长递归、镜像、断点续传、后台、批量列表下载。</li><li><strong>curl</strong>：擅长单次请求、上传、POST/API、输出到 stdout、单行管道。<br> 实际中常混用：wget 负责批量拉文件，curl 负责调用 API：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用 curl 拿下载地址，再用 wget 批量下载</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> https://api.example.com/versions <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-o</span> <span class="token string">&#39;https://[^&quot;]*&#39;</span> <span class="token operator">&gt;</span> urls.txt
<span class="token function">wget</span> <span class="token parameter variable">-i</span> urls.txt <span class="token parameter variable">-P</span> ./dist/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-与-aria2-协作做高速分片下载" tabindex="-1"><a class="header-anchor" href="#_3-与-aria2-协作做高速分片下载" aria-hidden="true">#</a> 3. 与 aria2 协作做高速分片下载</h3><p>wget 单文件不分片，大批量/大文件场景可交给 aria2：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先用 wget 抓列表，再交给 aria2 并行分片</span>
<span class="token function">wget</span> <span class="token parameter variable">-q</span> https://example.com/manifest.txt -O- <span class="token operator">&gt;</span> files.txt
aria2c <span class="token parameter variable">-i</span> files.txt <span class="token parameter variable">-x</span> <span class="token number">8</span> <span class="token parameter variable">-s</span> <span class="token number">8</span> <span class="token parameter variable">-d</span> ./downloads

<span class="token comment"># 断点续传交给 aria2（其 -c 默认开启）</span>
aria2c <span class="token parameter variable">-c</span> <span class="token parameter variable">-x</span> <span class="token number">16</span> https://example.com/ubuntu.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-makefile-脚本自动化" tabindex="-1"><a class="header-anchor" href="#_4-makefile-脚本自动化" aria-hidden="true">#</a> 4. Makefile / 脚本自动化</h3><p>把下载逻辑封装进 Makefile，配合哈希校验保证产物正确：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment"># Makefile 片段</span>
VERSION <span class="token operator">:=</span> 1.23.4
PKG <span class="token operator">:=</span> go1.<span class="token variable">$</span><span class="token punctuation">(</span>VERSION<span class="token punctuation">)</span>.darwin-arm64.tar.gz
URL <span class="token operator">:=</span> https<span class="token punctuation">:</span>//go.dev/dl/<span class="token variable">$</span><span class="token punctuation">(</span>PKG<span class="token punctuation">)</span>
SHA <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> grep <span class="token string">&quot;$(PKG)&quot;</span> checksums.txt <span class="token operator">|</span> awk <span class="token string">&#39;{print $$1}&#39;</span><span class="token punctuation">)</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> fetch verify
<span class="token target symbol">fetch</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>PKG<span class="token punctuation">)</span>

<span class="token target symbol"><span class="token variable">$</span>(PKG)</span><span class="token punctuation">:</span>
	wget -O <span class="token variable">$@</span> <span class="token variable">$</span><span class="token punctuation">(</span>URL<span class="token punctuation">)</span>

<span class="token target symbol">verify</span><span class="token punctuation">:</span> fetch
	echo <span class="token string">&quot;$(SHA)  $(PKG)&quot;</span> <span class="token operator">|</span> shasum -a 256 -c -   <span class="token comment"># 校验 SHA-256</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本里建议<strong>显式检查退出码</strong>，避免半成品被后续步骤误用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># download.sh —— 带重试与状态检查</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$1</span>&quot;</span><span class="token punctuation">;</span> <span class="token assign-left variable">OUT</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$2</span>&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token function">wget</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">-O</span> <span class="token string">&quot;<span class="token variable">$OUT</span>.part&quot;</span> <span class="token string">&quot;<span class="token variable">$URL</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> <span class="token string">&quot;<span class="token variable">$OUT</span>.part&quot;</span> <span class="token string">&quot;<span class="token variable">$OUT</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">break</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;retry <span class="token variable">$i</span> ...&quot;</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token variable"><span class="token variable">$((</span>i<span class="token operator">*</span><span class="token number">3</span><span class="token variable">))</span></span>
<span class="token keyword">done</span>
<span class="token builtin class-name">test</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;<span class="token variable">$OUT</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;OK: <span class="token variable">$OUT</span>&quot;</span> <span class="token operator">||</span> <span class="token punctuation">{</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;download failed&quot;</span><span class="token punctuation">;</span> <span class="token builtin class-name">exit</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-ci-集成-github-actions" tabindex="-1"><a class="header-anchor" href="#_5-ci-集成-github-actions" aria-hidden="true">#</a> 5. CI 集成（GitHub Actions）</h3><p>在 CI 中下载依赖产物并做校验：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/dl.yml 片段</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fetch<span class="token punctuation">-</span>assets
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">fetch</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Download assets
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          wget --tries=3 --timeout=30 \\
               --header=&quot;Authorization: token \${{ secrets.PAT }}&quot; \\
               -P ./assets \\
               https://api.github.com/repos/.../asset.zip</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Verify checksum
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          echo &quot;expected-hash  ./assets/asset.zip&quot; | sha256sum -c -</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload artifact
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> assets/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CI 里用 <code>wget</code> 比 <code>curl -O</code> 更适合需要重试、限速、递归下载的镜像/资源场景。</p><h3 id="_6-批量站点镜像与离线文档" tabindex="-1"><a class="header-anchor" href="#_6-批量站点镜像与离线文档" aria-hidden="true">#</a> 6. 批量站点镜像与离线文档</h3><p>抓取官网文档做成离线包，方便离线查阅：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 整站镜像（含资源、转本地链接、忽略 robots、限速礼貌抓取）</span>
<span class="token function">wget</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-k</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">robots</span><span class="token operator">=</span>off <span class="token punctuation">\\</span>
     <span class="token parameter variable">--wait</span><span class="token operator">=</span><span class="token number">1</span> --random-wait --limit-rate<span class="token operator">=</span>500k <span class="token punctuation">\\</span>
     <span class="token parameter variable">-P</span> ~/docs-offline <span class="token punctuation">\\</span>
     https://example.com/docs/

<span class="token comment"># 用 zip 打包成单一归档</span>
<span class="token builtin class-name">cd</span> ~/docs-offline <span class="token operator">&amp;&amp;</span> <span class="token function">zip</span> <span class="token parameter variable">-r</span> docs-offline.zip <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-登录态资源批量下载-认证-时间戳-日志" tabindex="-1"><a class="header-anchor" href="#_7-登录态资源批量下载-认证-时间戳-日志" aria-hidden="true">#</a> 7. 登录态资源批量下载（认证 + 时间戳 + 日志）</h3><p>综合前面所有技巧的完整生产级脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># mirror_download.sh —— 带认证的增量镜像脚本</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail
<span class="token assign-left variable">BASE</span><span class="token operator">=</span><span class="token string">&quot;https://example.com/members&quot;</span>
<span class="token assign-left variable">DEST</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/mirror&quot;</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$DEST</span>&quot;</span>
<span class="token function">wget</span> <span class="token punctuation">\\</span>
  --load-cookies <span class="token string">&quot;<span class="token environment constant">$HOME</span>/.wget_cookies.txt&quot;</span> <span class="token punctuation">\\</span>
  --keep-session-cookies <span class="token punctuation">\\</span>
  <span class="token parameter variable">-N</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-np</span> <span class="token parameter variable">-k</span> <span class="token parameter variable">-p</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--wait</span><span class="token operator">=</span><span class="token number">1</span> --random-wait --limit-rate<span class="token operator">=</span>300k <span class="token punctuation">\\</span>
  <span class="token parameter variable">--tries</span><span class="token operator">=</span><span class="token number">5</span> <span class="token parameter variable">--timeout</span><span class="token operator">=</span><span class="token number">30</span> <span class="token punctuation">\\</span>
  --user-agent <span class="token string">&quot;Mozilla/5.0 ...&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-P</span> <span class="token string">&quot;<span class="token variable">$DEST</span>&quot;</span> <span class="token parameter variable">-o</span> /var/log/wget_mirror.log <span class="token punctuation">\\</span>
  <span class="token string">&quot;<span class="token variable">$BASE</span>/&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;done at <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">&gt;&gt;</span> /var/log/wget_mirror.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-wget-已停止维护-可迁移到-wget2" tabindex="-1"><a class="header-anchor" href="#_8-wget-已停止维护-可迁移到-wget2" aria-hidden="true">#</a> 8. wget 已停止维护，可迁移到 wget2</h3><p>GNU 已于 2024 年停止维护 wget 1.x（1.25.0 为最终版），后续功能（HTTP/2、并发下载、更完善的重试）都在 wget2 上。若需要新特性，可安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> wget2
wget2 https://example.com/a.iso   <span class="token comment"># 用法与 wget 大体兼容</span>

<span class="token comment"># wget2 特色：并发线程、HTTP/2、更好的重试</span>
wget2 --max-threads<span class="token operator">=</span><span class="token number">8</span> --retry-connrefused https://example.com/a.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日常简单下载用 wget 1.25.0 完全够用；追求新特性与性能建议用 wget2 或 curl。</p>`,99),l=[i];function p(c,o){return s(),n("div",null,l)}const u=a(t,[["render",p],["__file","wget.html.vue"]]);export{u as default};
