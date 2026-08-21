import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,e as a}from"./app-c560c336.js";const i={},t=a(`<h1 id="gh-github-官方命令行工具" tabindex="-1"><a class="header-anchor" href="#gh-github-官方命令行工具" aria-hidden="true">#</a> gh（GitHub 官方命令行工具）</h1><blockquote><p>Homebrew 版本 2.83.1 ｜ 主页：见官方文档 ｜ 安装：<code>brew install gh</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p><code>gh</code> 是 GitHub 官方推出的命令行工具，它把 GitHub 的核心功能（仓库、PR、Issue、Release、CI）直接搬进终端，让你无需在浏览器和终端之间来回切换。它解决的是开发者在 Git 工作流中频繁「离开终端、打开网页、点击鼠标」的割裂问题，典型应用场景包括：从终端创建/查看仓库、快速发起和合并 Pull Request、管理 Issue、查看 Actions 运行状态、发布 Release 以及维护 GitHub Codespaces。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>macOS 上推荐通过 Homebrew 安装 <code>gh</code>，安装后 <code>gh</code> 会自动加入 PATH（<code>/opt/homebrew/bin</code>），并可通过交互式 <code>gh auth login</code> 完成认证。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> gh

<span class="token comment"># 验证安装</span>
gh <span class="token parameter variable">--version</span>
<span class="token comment"># 期望输出：gh version 2.83.1 (2025-xx-xx)</span>
<span class="token comment"># https://github.com/cli/cli/releases/latest</span>

<span class="token comment"># 查看命令帮助</span>
gh <span class="token parameter variable">--help</span>

<span class="token comment"># 升级到最新版</span>
brew upgrade gh

<span class="token comment"># 卸载</span>
brew uninstall gh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后首次使用需要登录 GitHub 账号：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 交互式登录（支持浏览器 / 浏览器自动 / token 三种方式）</span>
gh auth login

<span class="token comment"># 查看当前登录状态</span>
gh auth status

<span class="token comment"># 登出</span>
gh auth <span class="token builtin class-name">logout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数/说明</th><th>示例</th></tr></thead><tbody><tr><td><code>gh auth login</code></td><td>登录 GitHub 账号（支持 HTTPS/SSH、浏览器/token）</td><td><code>gh auth login</code></td></tr><tr><td><code>gh repo create</code></td><td>创建仓库（<code>--public</code> 公开、<code>--clone</code> 本地克隆、<code>--source</code> 从已有目录推送）</td><td><code>gh repo create myrepo --public --source=. --push</code></td></tr><tr><td><code>gh repo view</code></td><td>查看仓库信息（<code>-w</code> 在浏览器打开）</td><td><code>gh repo view --web</code></td></tr><tr><td><code>gh repo clone</code></td><td>克隆仓库到本地</td><td><code>gh repo clone cli/cli</code></td></tr><tr><td><code>gh pr create</code></td><td>创建 Pull Request（<code>-t</code> 标题、<code>-b</code> 说明、<code>-f</code> 用 commit 信息）</td><td><code>gh pr create -t &quot;fix bug&quot; -b &quot;detail&quot;</code></td></tr><tr><td><code>gh pr list</code></td><td>列出 PR（<code>--author</code>、<code>--state</code>、<code>-R</code> 指定仓库）</td><td><code>gh pr list --state open</code></td></tr><tr><td><code>gh pr merge</code></td><td>合并 PR（<code>--squash</code>/<code>--rebase</code>、<code>-d</code> 删除分支）</td><td><code>gh pr merge 123 --squash -d</code></td></tr><tr><td><code>gh issue list</code></td><td>列出 Issue</td><td><code>gh issue list --label bug</code></td></tr><tr><td><code>gh issue create</code></td><td>创建 Issue</td><td><code>gh issue create -t &quot;标题&quot; -b &quot;描述&quot;</code></td></tr><tr><td><code>gh run list</code></td><td>查看 Actions 工作流运行记录</td><td><code>gh run list --limit 10</code></td></tr><tr><td><code>gh run watch</code></td><td>实时跟踪某个工作流运行</td><td><code>gh run watch 1234567</code></td></tr><tr><td><code>gh release create</code></td><td>发布 Release</td><td><code>gh release create v1.0.0 --generate-notes</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-从本地目录创建并推送一个新仓库" tabindex="-1"><a class="header-anchor" href="#示例-1-从本地目录创建并推送一个新仓库" aria-hidden="true">#</a> 示例 1：从本地目录创建并推送一个新仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 初始化 Git 仓库并提交代码</span>
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;init project&quot;</span>

<span class="token comment"># 2. 用 gh 创建远程公开仓库，并从当前目录推送</span>
gh repo create my-awesome-tool <span class="token parameter variable">--public</span> <span class="token parameter variable">--source</span><span class="token operator">=</span>. <span class="token parameter variable">--push</span>

<span class="token comment"># 3. 查看仓库是否创建成功</span>
gh repo view my-awesome-tool <span class="token parameter variable">--web</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后终端会返回仓库地址（如 <code>https://github.com/&lt;你的用户名&gt;/my-awesome-tool</code>），并自动把本地代码推送上去。</p><h3 id="示例-2-发起并合并一个-pull-request" tabindex="-1"><a class="header-anchor" href="#示例-2-发起并合并一个-pull-request" aria-hidden="true">#</a> 示例 2：发起并合并一个 Pull Request</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 基于 main 分支创建功能分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/new-login
<span class="token comment"># ... 修改代码并提交 ...</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;add login page&quot;</span>

<span class="token comment"># 2. 推送分支到远端</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin feature/new-login

<span class="token comment"># 3. 创建 PR（标题自动取 commit 信息）</span>
gh <span class="token function">pr</span> create <span class="token parameter variable">--title</span> <span class="token string">&quot;新增登录页&quot;</span> <span class="token parameter variable">--body</span> <span class="token string">&quot;实现邮箱密码登录&quot;</span> <span class="token parameter variable">--base</span> main

<span class="token comment"># 4. 查看该 PR</span>
gh <span class="token function">pr</span> view <span class="token parameter variable">--web</span>

<span class="token comment"># 5. 检查通过后合并（squash 合并并删除远程分支）</span>
gh <span class="token function">pr</span> merge <span class="token parameter variable">--squash</span> --delete-branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-查看并跟踪-github-actions-的运行结果" tabindex="-1"><a class="header-anchor" href="#示例-3-查看并跟踪-github-actions-的运行结果" aria-hidden="true">#</a> 示例 3：查看并跟踪 GitHub Actions 的运行结果</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 列出最近的 5 次工作流运行</span>
gh run list <span class="token parameter variable">--limit</span> <span class="token number">5</span>
<span class="token comment"># 输出示例：X  main  2025-xx-xxT12:00:00Z  CI  1234567  completed</span>

<span class="token comment"># 2. 实时跟踪某次运行（直到结束，日志实时滚动）</span>
gh run <span class="token function">watch</span> <span class="token number">1234567</span>

<span class="token comment"># 3. 查看某次运行中失败 job 的日志</span>
gh run view <span class="token number">1234567</span> --log-failed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-4-发布一个-release-版本" tabindex="-1"><a class="header-anchor" href="#示例-4-发布一个-release-版本" aria-hidden="true">#</a> 示例 4：发布一个 Release 版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 打标签并推送</span>
<span class="token function">git</span> tag v1.0.0
<span class="token function">git</span> push origin v1.0.0

<span class="token comment"># 2. 用 gh 发布 Release（自动从 commit 生成发布说明）</span>
gh release create v1.0.0 <span class="token parameter variable">--title</span> <span class="token string">&quot;v1.0.0 稳定版&quot;</span> --generate-notes

<span class="token comment"># 3. 上传二进制附件</span>
gh release upload v1.0.0 ./dist/app-darwin-arm64.tar.gz

<span class="token comment"># 4. 查看发布页</span>
gh release view v1.0.0 <span class="token parameter variable">--web</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-配置别名-alias-加速日常操作" tabindex="-1"><a class="header-anchor" href="#_1-配置别名-alias-加速日常操作" aria-hidden="true">#</a> 1. 配置别名（alias）加速日常操作</h3><p>配置文件位于 <code>~/.config/gh/config.yml</code>，可以用 <code>gh alias set</code> 快速定义：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 定义 alias：git co 等效于 gh pr checkout</span>
gh <span class="token builtin class-name">alias</span> <span class="token builtin class-name">set</span> co <span class="token string">&#39;pr checkout&#39;</span>
<span class="token comment"># 之后即可：gh co 123</span>

<span class="token comment"># 定义 alias：pco 创建 PR 并直接 checkout 到对应分支</span>
gh <span class="token builtin class-name">alias</span> <span class="token builtin class-name">set</span> pco <span class="token string">&#39;pr create --fill&#39;</span>

<span class="token comment"># 查看所有 alias</span>
gh <span class="token builtin class-name">alias</span> list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-环境变量与配置" tabindex="-1"><a class="header-anchor" href="#_2-环境变量与配置" aria-hidden="true">#</a> 2. 环境变量与配置</h3><p>常用环境变量可直接在 shell 中设置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 指定默认仓库（避免每条命令带 -R）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_REPO</span><span class="token operator">=</span>octo-org/octo-repo

<span class="token comment"># 指定默认编辑器（用于 gh 打开编辑器写 PR/Issue 说明）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_EDITOR</span><span class="token operator">=</span>vim

<span class="token comment"># 指定默认浏览器</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_BROWSER</span><span class="token operator">=</span>open

<span class="token comment"># 关闭交互式提示，用于脚本/CI 场景</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_PROMPT_DISABLED</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-在脚本-ci-中无交互使用" tabindex="-1"><a class="header-anchor" href="#_3-在脚本-ci-中无交互使用" aria-hidden="true">#</a> 3. 在脚本 / CI 中无交互使用</h3><p>用个人访问令牌（Personal Access Token）认证后即可在脚本中安全调用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 认证（也可用 GH_TOKEN 环境变量）</span>
gh auth login --with-token <span class="token operator">&lt;&lt;&lt;</span> <span class="token string">&quot;ghp_xxxxxx&quot;</span>

<span class="token comment"># 脚本中设置 token 后直接调用</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_TOKEN</span><span class="token operator">=</span>ghp_xxxxxx
gh <span class="token function">pr</span> list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--limit</span> <span class="token number">50</span> <span class="token parameter variable">--json</span> number,title,headRefName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-与-git-原生命令搭配" tabindex="-1"><a class="header-anchor" href="#_4-与-git-原生命令搭配" aria-hidden="true">#</a> 4. 与 Git 原生命令搭配</h3><p><code>gh</code> 不替代 <code>git</code>，而是补充它。常见搭配：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先 git 本地提交，再用 gh 推送并建 PR 一条龙</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: x&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> push
gh <span class="token function">pr</span> create <span class="token parameter variable">--fill</span>

<span class="token comment"># 用 gh 查看某个 PR 对应的本地分支差异</span>
<span class="token function">git</span> <span class="token function">diff</span> main<span class="token punctuation">..</span>.<span class="token variable"><span class="token variable">$(</span>gh <span class="token function">pr</span> view <span class="token number">123</span> <span class="token parameter variable">--json</span> headRefName <span class="token parameter variable">-q</span> .headRefName<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><strong>登录是前提</strong>：大部分 <code>gh</code> 命令需要先 <code>gh auth login</code>，否则报错 <code>could not read Username</code> 或 <code>authentication required</code>。用 <code>gh auth status</code> 检查登录状态。</li><li><strong>首次登录网络问题</strong>：<code>gh auth login</code> 走浏览器跳转，若在公司内网/代理环境失败，可改用 <code>--with-token</code> 方式直接粘贴 PAT，或设置 <code>HTTPS_PROXY</code> 环境变量。</li><li><strong>token 权限不足</strong>：创建 PR/Release 需要 <code>repo</code> 权限；管理组织仓库需要 <code>read:org</code> 等。权限不足会报 <code>Resource not accessible by integration</code>，去 GitHub Settings 重新生成 token 并勾选对应 scope。</li><li><strong>密钥冲突（auth host refused）</strong>：本地已有 SSH 时，<code>gh auth login</code> 建议选 HTTPS；若坚持 SSH 会报 <code>failed to sign in using ssh key</code>，可在 <code>gh auth login</code> 时显式选择 <code>GitHub.com</code> + <code>SSH</code> 并重启终端。</li><li><strong>路径/别名覆盖</strong>：若你曾用 <code>git</code> 定义过同名 alias（如 <code>git co</code>），<code>gh alias set</code> 的别名独立于 git，互不影响；但注意 <code>gh</code> 默认不接管 <code>git</code> 命令，二者是平行关系。</li><li><strong>隐私与安全</strong>：<code>GH_TOKEN</code> 属于敏感凭据，不要写进会被提交到仓库的文件；建议用 <code>gh auth login --with-token</code> 或系统钥匙串，并定期在 GitHub 后台撤销无用 token。</li><li><strong>升级后行为变化</strong>：<code>gh</code> 迭代较快，跨大版本时默认值可能变化（如 PR 合并策略），升级后运行 <code>gh --help</code> 或 <code>gh pr merge --help</code> 确认新语法。</li></ul>`,36),c=[t];function d(l,o){return s(),n("div",null,c)}const u=e(i,[["render",d],["__file","gh.html.vue"]]);export{u as default};
