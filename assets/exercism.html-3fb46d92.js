import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,e as a}from"./app-401f6a81.js";const i={},c=a(`<h1 id="exercism-exercism-编程练习平台命令行工具" tabindex="-1"><a class="header-anchor" href="#exercism-exercism-编程练习平台命令行工具" aria-hidden="true">#</a> exercism（Exercism 编程练习平台命令行工具）</h1><blockquote><p>Homebrew 版本 3.5.8 ｜ 主页：见官方文档 ｜ 安装：<code>brew install exercism</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p><code>exercism</code> 是 Exercism 编程练习平台的官方命令行客户端。Exercism 是一个免费开源的编程练习社区，提供 70+ 种编程语言的上千个练习题（Exercises），让你在真实语言环境下通过做练习来精进编程技能，并获取社区 Mentor 的反馈。<code>exercism</code> 命令行工具解决的是「如何在终端里无缝下载练习题、提交解答、获取反馈」的问题，典型应用场景包括：用 <code>exercism download</code> 拉取指定题目的模板代码、本地编写解法后用 <code>exercism submit</code> 一键提交、以及用 <code>exercism configure</code> 配置 API token 与工作目录。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>macOS 上推荐通过 Homebrew 安装 <code>exercism</code>，安装后 <code>exercism</code> 会自动加入 PATH，并可通过交互式 <code>exercism configure</code> 完成认证。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> exercism

<span class="token comment"># 验证安装</span>
exercism version
<span class="token comment"># 期望输出：exercism v3.5.8 (OpenAPI spec: v3.0.0)</span>
<span class="token comment"># https://github.com/exercism/cli/releases</span>

<span class="token comment"># 查看命令帮助</span>
exercism <span class="token builtin class-name">help</span>

<span class="token comment"># 升级到最新版</span>
brew upgrade exercism

<span class="token comment"># 卸载</span>
brew uninstall exercism
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后首次使用需要配置 API token（在 Exercism 网站上「Settings」页获取个人 token）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 交互式配置（会提示输入 token 和选择工作目录）</span>
exercism configure

<span class="token comment"># 手动指定 token 与工作目录（非交互，适合脚本）</span>
exercism configure <span class="token parameter variable">--token</span><span class="token operator">=</span>YOUR_TOKEN <span class="token parameter variable">--workspace</span><span class="token operator">=</span>/Users/you/Exercism

<span class="token comment"># 查看当前配置</span>
exercism configure <span class="token parameter variable">--show</span>

<span class="token comment"># 重新配置或清空配置</span>
exercism configure <span class="token parameter variable">--token</span><span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数/说明</th><th>示例</th></tr></thead><tbody><tr><td><code>exercism version</code></td><td>查看版本号</td><td><code>exercism version</code></td></tr><tr><td><code>exercism configure</code></td><td>配置 token、工作目录（<code>--token</code>、<code>--workspace</code>、<code>--show</code>）</td><td><code>exercism configure --show</code></td></tr><tr><td><code>exercism download</code></td><td>下载某个练习（<code>--exercise</code>、<code>--track</code>、<code>-t</code> 指定语言）</td><td><code>exercism download --exercise hello-world --track go</code></td></tr><tr><td><code>exercism submit</code></td><td>提交解答（可一次提交多个文件）</td><td><code>exercism submit hello_world.go</code></td></tr><tr><td><code>exercism open</code></td><td>在浏览器打开某个练习</td><td><code>exercism open --exercise hello-world --track go</code></td></tr><tr><td><code>exercism tracks</code></td><td>列出可用的语言 track</td><td><code>exercism tracks</code></td></tr><tr><td><code>exercism workspace</code></td><td>显示当前工作目录</td><td><code>exercism workspace</code></td></tr><tr><td><code>exercism debug</code></td><td>显示调试信息（用于排查认证/网络问题）</td><td><code>exercism debug</code></td></tr><tr><td><code>exercism help</code></td><td>查看命令帮助</td><td><code>exercism help submit</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-下载并完成你的第一个练习-hello-world" tabindex="-1"><a class="header-anchor" href="#示例-1-下载并完成你的第一个练习-hello-world" aria-hidden="true">#</a> 示例 1：下载并完成你的第一个练习（hello-world）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 先配置好 token 与工作目录（首次使用）</span>
exercism configure <span class="token parameter variable">--token</span><span class="token operator">=</span>YOUR_TOKEN <span class="token parameter variable">--workspace</span><span class="token operator">=~</span>/Exercism

<span class="token comment"># 2. 下载 Go 语言 track 的 hello-world 练习</span>
exercism download <span class="token parameter variable">--exercise</span><span class="token operator">=</span>hello-world <span class="token parameter variable">--track</span><span class="token operator">=</span>go

<span class="token comment"># 3. 进入下载到的练习目录（路径通常为 ~/Exercism/go/hello-world）</span>
<span class="token builtin class-name">cd</span> ~/Exercism/go/hello-world

<span class="token comment"># 4. 查看题目与测试文件</span>
<span class="token function">ls</span>
<span class="token function">cat</span> README.md

<span class="token comment"># 5. 编辑你的解法（hello_world.go），让测试通过</span>
<span class="token comment"># 例如实现：func Hello() string { return &quot;Hello, World!&quot; }</span>

<span class="token comment"># 6. 本地运行测试验证（Go 练习用 go test）</span>
go <span class="token builtin class-name">test</span>

<span class="token comment"># 7. 通过后提交解答</span>
exercism submit hello_world.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code>exercism submit</code> 后，CLI 会返回练习的网页链接，你的解答会出现在 Exercism 网站上等待 Mentor 审阅。</p><h3 id="示例-2-提交多个文件-多文件练习" tabindex="-1"><a class="header-anchor" href="#示例-2-提交多个文件-多文件练习" aria-hidden="true">#</a> 示例 2：提交多个文件（多文件练习）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 某些练习涉及多个源文件，可一次全部提交</span>
exercism submit src/foo.clj test/foo_test.clj

<span class="token comment"># 或直接提交整个目录中的源文件</span>
exercism submit src/ src/foo.clj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-查看可用的语言-track-并浏览练习" tabindex="-1"><a class="header-anchor" href="#示例-3-查看可用的语言-track-并浏览练习" aria-hidden="true">#</a> 示例 3：查看可用的语言 track 并浏览练习</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 列出全部支持的语言 track</span>
exercism tracks

<span class="token comment"># 2. 在浏览器中打开某个练习的页面（查看完整题目描述）</span>
exercism <span class="token function">open</span> <span class="token parameter variable">--exercise</span><span class="token operator">=</span>isogram <span class="token parameter variable">--track</span><span class="token operator">=</span>python

<span class="token comment"># 3. 下载该练习到本地</span>
exercism download <span class="token parameter variable">--exercise</span><span class="token operator">=</span>isogram <span class="token parameter variable">--track</span><span class="token operator">=</span>python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-4-在脚本-ci-中非交互式使用" tabindex="-1"><a class="header-anchor" href="#示例-4-在脚本-ci-中非交互式使用" aria-hidden="true">#</a> 示例 4：在脚本 / CI 中非交互式使用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置好环境变量后即可无交互使用</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">EXERCISM_TOKEN</span><span class="token operator">=</span>YOUR_TOKEN
<span class="token builtin class-name">export</span> <span class="token assign-left variable">EXERCISM_WORKSPACE</span><span class="token operator">=~</span>/Exercism

<span class="token comment"># 一条命令完成下载（无需 configure）</span>
exercism download <span class="token parameter variable">--exercise</span><span class="token operator">=</span>hello-world <span class="token parameter variable">--track</span><span class="token operator">=</span>python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-环境变量替代交互配置" tabindex="-1"><a class="header-anchor" href="#_1-环境变量替代交互配置" aria-hidden="true">#</a> 1. 环境变量替代交互配置</h3><p><code>exercism</code> 支持通过环境变量直接指定认证信息，在脚本或 CI 中无需手动 <code>configure</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 两个最核心的环境变量</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">EXERCISM_TOKEN</span><span class="token operator">=</span>你的API令牌
<span class="token builtin class-name">export</span> <span class="token assign-left variable">EXERCISM_WORKSPACE</span><span class="token operator">=~</span>/Exercism
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置后 <code>exercism download</code> 等命令会自动读取，适合在 CI 流水线中批量拉取/提交练习。</p><h3 id="_2-配置文件位置" tabindex="-1"><a class="header-anchor" href="#_2-配置文件位置" aria-hidden="true">#</a> 2. 配置文件位置</h3><p>CLI 的配置保存在本地 JSON 文件里，可手动查看或修改：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置文件路径（macOS）</span>
~/.config/exercism/config.json

<span class="token comment"># 查看内容</span>
<span class="token function">cat</span> ~/.config/exercism/config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该文件包含 <code>token</code>、<code>workspace</code>、<code>apibaseurl</code> 等字段，亦可直接用编辑器修改。</p><h3 id="_3-设置-api-镜像-自建服务器" tabindex="-1"><a class="header-anchor" href="#_3-设置-api-镜像-自建服务器" aria-hidden="true">#</a> 3. 设置 API 镜像/自建服务器</h3><p>Exercism 支持自托管，可通过配置 <code>apibaseurl</code> 指向私有服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>exercism configure <span class="token parameter variable">--api</span><span class="token operator">=</span>https://api.your-exercism-server.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这对企业内部培训或离线环境很有用。</p><h3 id="_4-与-git-版本管理搭配" tabindex="-1"><a class="header-anchor" href="#_4-与-git-版本管理搭配" aria-hidden="true">#</a> 4. 与 Git 版本管理搭配</h3><p>练习目录往往可纳入 Git 管理，方便追踪你的学习历程：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/Exercism
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;start learning&quot;</span>
<span class="token comment"># 每完成一个练习提交一次，形成自己的练习历史</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><strong>token 必须配置</strong>：<code>exercism download</code>/<code>submit</code> 前必须 <code>exercism configure</code>，否则报错 <code>you are not logged in</code> 或 <code>authentication required</code>。token 在 Exercism 网站「Settings」页获取，不要泄露到公开仓库。</li><li><strong><code>--exercise</code> 参数是必需且精确匹配</strong>：练习名大小写敏感（如 <code>hello-world</code> 不能写成 <code>hello_world</code>），下载前可用 <code>exercism tracks</code> 和网站题库确认准确名称。</li><li><strong><code>--track</code> 语言参数不能漏</strong>：不同语言对应不同 track，<code>exercism download --exercise=hello-world</code> 不带 <code>--track</code> 会提示你选择语言；脚本中建议总是显式指定。</li><li><strong>解答文件命名要对</strong>：提交的文件名必须与题目要求的源文件一致，否则服务端可能无法正确识别或评审你的解法，报错 <code>Unable to find the file</code> 时检查文件名。</li><li><strong>网络/代理问题</strong>：下载或提交失败多因网络问题，报错 <code>connection refused</code> 或 <code>timed out</code> 时可设置 <code>HTTPS_PROXY</code> 环境变量，或用 <code>exercism debug</code> 排查。</li><li><strong>版本差异</strong>：老版本 CLI 语法（如 <code>exercism fetch</code>）已废弃，现统一为 <code>exercism download</code>；遇到 Unknown command 报错时用 <code>exercism help</code> 查看最新用法。</li></ul>`,39),d=[c];function r(o,l){return s(),n("div",null,d)}const p=e(i,[["render",r],["__file","exercism.html.vue"]]);export{p as default};
