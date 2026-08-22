import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e}from"./app-09e0be14.js";const t={},i=e(`<h1 id="gh-github-官方命令行工具" tabindex="-1"><a class="header-anchor" href="#gh-github-官方命令行工具" aria-hidden="true">#</a> gh（GitHub 官方命令行工具）</h1><blockquote><p>Homebrew 版本 2.83.1 ｜ 主页：见官方文档 ｜ 安装：<code>brew install gh</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p><code>gh</code> 是 GitHub 官方推出的命令行工具，它把 GitHub 的核心功能（仓库、PR、Issue、Release、CI）直接搬进终端，让你无需在浏览器和终端之间来回切换。它解决的是开发者在 Git 工作流中频繁「离开终端、打开网页、点击鼠标」的割裂问题，典型应用场景包括：从终端创建/查看仓库、快速发起和合并 Pull Request、管理 Issue、查看 Actions 运行状态、发布 Release 以及维护 GitHub Codespaces。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>macOS 上推荐通过 Homebrew 安装 <code>gh</code>，安装后 <code>gh</code> 会自动加入 PATH（<code>/opt/homebrew/bin</code>），并可通过交互式 <code>gh auth login</code> 完成认证。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>gh alias set</code> 还支持两种更高级的别名形态，能把日常高频动作压成一两个字符：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ① 参数透传（shell 别名）：在命令前面加 ! 即把整条命令交给 shell 执行，可自由混用其他命令</span>
gh <span class="token builtin class-name">alias</span> <span class="token builtin class-name">set</span> prw <span class="token string">&#39;!gh pr view --web &amp;&amp; gh pr checks --watch&#39;</span>
<span class="token comment"># 之后执行：gh prw            （会在浏览器打开当前分支的 PR 并等待 CI 通过）</span>

<span class="token comment"># ② 参数占位（graphql 别名）：把 flag 加在引号内，调用时补齐</span>
gh <span class="token builtin class-name">alias</span> <span class="token builtin class-name">set</span> prj <span class="token string">&#39;pr view --json number,title,author {0}&#39;</span>
<span class="token comment"># 之后执行：gh prj 123        （等价于 gh pr view --json ... 123）</span>

<span class="token comment"># ③ 删除别名</span>
gh <span class="token builtin class-name">alias</span> delete co
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alias 也支持多级（子命令）形式，例如 <code>gh issue</code> 与 <code>gh pr</code> 各自维护别名空间：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 为 issue 单独定义：gh issue w 等价于 gh issue view --web</span>
gh <span class="token builtin class-name">alias</span> <span class="token builtin class-name">set</span> issue.w <span class="token string">&#39;issue view --web&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件 <code>~/.config/gh/config.yml</code> 中对应的原始内容形如：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">aliases</span><span class="token punctuation">:</span>
  <span class="token key atrule">co</span><span class="token punctuation">:</span> pr checkout
  <span class="token key atrule">pco</span><span class="token punctuation">:</span> pr create <span class="token punctuation">-</span><span class="token punctuation">-</span>fill
  <span class="token key atrule">prw</span><span class="token punctuation">:</span> <span class="token string">&#39;!gh pr view --web &amp;&amp; gh pr checks --watch&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-环境变量与配置" tabindex="-1"><a class="header-anchor" href="#_2-环境变量与配置" aria-hidden="true">#</a> 2. 环境变量与配置</h3><p>常用环境变量可直接在 shell 中设置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 指定默认仓库（避免每条命令带 -R）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_REPO</span><span class="token operator">=</span>octo-org/octo-repo

<span class="token comment"># 指定默认编辑器（用于 gh 打开编辑器写 PR/Issue 说明）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_EDITOR</span><span class="token operator">=</span>vim

<span class="token comment"># 指定默认浏览器</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_BROWSER</span><span class="token operator">=</span>open

<span class="token comment"># 关闭交互式提示，用于脚本/CI 场景</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_PROMPT_DISABLED</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些变量可统一写进 shell 的配置文件（<code>~/.zshrc</code> / <code>~/.bashrc</code>）持久生效：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ~/.zshrc 追加以下内容</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_EDITOR</span><span class="token operator">=</span>vim
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_BROWSER</span><span class="token operator">=</span>open
<span class="token comment"># 让 gh 自动接管 git 的 push/fetch 认证（走 gh 的凭据管理器）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_PROMPT_DISABLED</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper <span class="token string">&#39;!gh auth git-credential&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其它常用的环境变量/配置项一览：</p><table><thead><tr><th>配置项</th><th>作用</th><th>示例值</th></tr></thead><tbody><tr><td><code>GH_REPO</code></td><td>默认仓库（<code>owner/repo</code>），省去每条命令 <code>-R</code></td><td><code>octo-org/octo-repo</code></td></tr><tr><td><code>GH_TOKEN</code></td><td>认证令牌，脚本/CI 中优先于交互登录</td><td><code>ghp_xxxx</code></td></tr><tr><td><code>GH_HOST</code></td><td>目标 GitHub 主机（GHES 企业实例）</td><td><code>github.example.com</code></td></tr><tr><td><code>GH_CONFIG_DIR</code></td><td>配置文件所在目录（默认 <code>~/.config/gh</code>）</td><td><code>~/.config/gh</code></td></tr><tr><td><code>GH_EDITOR</code></td><td>写 PR/Issue 说明时使用的编辑器</td><td><code>code</code> / <code>vim</code></td></tr><tr><td><code>GH_BROWSER</code></td><td>打开链接时使用的浏览器</td><td><code>open</code> / <code>firefox</code></td></tr><tr><td><code>GH_PAGER</code></td><td>长输出的分页器（默认 <code>less</code>）</td><td><code>cat</code> / <code>less -R</code></td></tr><tr><td><code>GH_PROMPT_DISABLED</code></td><td>设为 <code>1</code> 关闭所有交互提示</td><td><code>1</code></td></tr><tr><td><code>GH_NO_UPDATE_NOTIFIER</code></td><td>设为 <code>1</code> 关闭版本升级提醒</td><td><code>1</code></td></tr><tr><td><code>GH_FORCE_TTY</code></td><td>强制以 TTY 模式输出（脚本中常配合 \`</td><td>cat\` 使用）</td></tr><tr><td><code>GH_COLUMNS</code></td><td>表格/列表输出的列数</td><td><code>120</code></td></tr><tr><td><code>DEBUG</code></td><td>设为 <code>api</code> 打印底层 HTTP 请求（排查问题极有用）</td><td><code>api</code></td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 调试模式示例：查看 gh 实际发起的 API 请求</span>
<span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>api gh <span class="token function">pr</span> view <span class="token number">123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-在脚本-ci-中无交互使用" tabindex="-1"><a class="header-anchor" href="#_3-在脚本-ci-中无交互使用" aria-hidden="true">#</a> 3. 在脚本 / CI 中无交互使用</h3><p>用个人访问令牌（Personal Access Token）认证后即可在脚本中安全调用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 认证（也可用 GH_TOKEN 环境变量）</span>
gh auth login --with-token <span class="token operator">&lt;&lt;&lt;</span> <span class="token string">&quot;ghp_xxxxxx&quot;</span>

<span class="token comment"># 脚本中设置 token 后直接调用</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_TOKEN</span><span class="token operator">=</span>ghp_xxxxxx
gh <span class="token function">pr</span> list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--limit</span> <span class="token number">50</span> <span class="token parameter variable">--json</span> number,title,headRefName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本中强烈推荐配合 <code>--json</code> + <code>-q</code> 做结构化解析，输出干净且稳定：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 只取 PR 编号和标题，交给 jq 处理</span>
gh <span class="token function">pr</span> list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--json</span> number,title,author <span class="token punctuation">\\</span>
  <span class="token parameter variable">--jq</span> <span class="token string">&#39;.[] | &quot;\\(.number) \\(.title) (@\\(.author.login))&quot;&#39;</span>

<span class="token comment"># 判断当前分支是否已有 PR，若没有则创建（适合 CI 自动提 PR）</span>
<span class="token keyword">if</span> <span class="token operator">!</span> gh <span class="token function">pr</span> view <span class="token parameter variable">--json</span> number <span class="token parameter variable">-q</span> .number <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  gh <span class="token function">pr</span> create <span class="token parameter variable">--fill</span> <span class="token parameter variable">--base</span> main
<span class="token keyword">fi</span>

<span class="token comment"># 用 jq 断言 Release 是否已存在（幂等判断，避免重复发版）</span>
gh release view v1.0.0 <span class="token parameter variable">--json</span> tagName <span class="token parameter variable">-q</span> .tagName <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token punctuation">\\</span>
  <span class="token operator">||</span> gh release create v1.0.0 --generate-notes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写脚本时的几个关键实践：</p><ul><li><strong>绝不硬编码 token</strong>：token 从环境变量或 CI secrets 注入，见下方「七」的 GitHub Actions 示例。</li><li><strong>幂等性</strong>：命令前先做存在性判断（如上面的 <code>if ! gh release view</code>），避免重复创建导致 CI 失败。</li><li><strong>超时与失败处理</strong>：依赖第三方服务会偶发失败，建议 <code>gh run watch --exit-status --interval 10</code> 并配合重试。</li><li><strong>去掉交互提示</strong>：始终 <code>export GH_PROMPT_DISABLED=1</code>，避免脚本因等待输入而挂死。</li></ul><h3 id="_4-与-git-原生命令搭配" tabindex="-1"><a class="header-anchor" href="#_4-与-git-原生命令搭配" aria-hidden="true">#</a> 4. 与 Git 原生命令搭配</h3><p><code>gh</code> 不替代 <code>git</code>，而是补充它。常见搭配：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先 git 本地提交，再用 gh 推送并建 PR 一条龙</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: x&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> push
gh <span class="token function">pr</span> create <span class="token parameter variable">--fill</span>

<span class="token comment"># 用 gh 查看某个 PR 对应的本地分支差异</span>
<span class="token function">git</span> <span class="token function">diff</span> main<span class="token punctuation">..</span>.<span class="token variable"><span class="token variable">$(</span>gh <span class="token function">pr</span> view <span class="token number">123</span> <span class="token parameter variable">--json</span> headRefName <span class="token parameter variable">-q</span> .headRefName<span class="token variable">)</span></span>

<span class="token comment"># 拉取某 PR 到本地分支并基于它新建开发分支</span>
gh <span class="token function">pr</span> checkout <span class="token number">456</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> my-local-work

<span class="token comment"># 合并时想用 rebase 并自动删除分支</span>
gh <span class="token function">pr</span> merge <span class="token parameter variable">--rebase</span> --delete-branch --match-commit-author
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-常用命令的进阶参数" tabindex="-1"><a class="header-anchor" href="#_5-常用命令的进阶参数" aria-hidden="true">#</a> 5. 常用命令的进阶参数</h3><p><strong>PR 工作流：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 一次创建 PR 并直接指派 reviewer、打 label、关联 issue</span>
gh <span class="token function">pr</span> create <span class="token parameter variable">--title</span> <span class="token string">&quot;feat&quot;</span> <span class="token parameter variable">--body</span> <span class="token string">&quot;说明&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--reviewer</span> alice,bob <span class="token punctuation">\\</span>
  <span class="token parameter variable">--label</span> <span class="token string">&quot;enhancement,documentation&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--assignee</span> @me <span class="token punctuation">\\</span>
  <span class="token parameter variable">--milestone</span> v2.0

<span class="token comment"># 查看 PR 的完整审查状态，持续阻塞直到全部通过或失败</span>
gh <span class="token function">pr</span> checks <span class="token parameter variable">--watch</span>

<span class="token comment"># 快速修改某 PR 的标题</span>
gh <span class="token function">pr</span> edit <span class="token number">123</span> <span class="token parameter variable">--title</span> <span class="token string">&quot;新标题&quot;</span> --add-label <span class="token string">&quot;bug&quot;</span>

<span class="token comment"># 把 issue 一键转成 PR 的分支（issue 号即分支后缀）</span>
gh issue develop <span class="token number">88</span> <span class="token parameter variable">--checkout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Issue 工作流：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 带 label/milestone/assignee 创建</span>
gh issue create <span class="token parameter variable">-t</span> <span class="token string">&quot;性能优化&quot;</span> <span class="token parameter variable">-b</span> <span class="token string">&quot;详情...&quot;</span> <span class="token parameter variable">-l</span> <span class="token string">&quot;perf&quot;</span> <span class="token parameter variable">-a</span> @me

<span class="token comment"># 列出并按多种条件过滤</span>
gh issue list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--assignee</span> @me <span class="token parameter variable">--limit</span> <span class="token number">30</span> <span class="token parameter variable">--json</span> number,title

<span class="token comment"># 给 issue 添加评论</span>
gh issue comment <span class="token number">88</span> <span class="token parameter variable">--body</span> <span class="token string">&quot;正在处理，预计周三修复&quot;</span>

<span class="token comment"># 用 \`gh issue transfer\` 或 \`gh issue close\` 收尾</span>
gh issue close <span class="token number">88</span> <span class="token parameter variable">--comment</span> <span class="token string">&quot;已在 #123 修复&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Release 与版本发布：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 发布草稿（不对外可见，供内部核对）</span>
gh release create v1.1.0 <span class="token parameter variable">--draft</span> --generate-notes

<span class="token comment"># 标记为最新版本 / 预发布</span>
gh release create v2.0.0-rc.1 <span class="token parameter variable">--prerelease</span>

<span class="token comment"># 批量上传多个二进制</span>
gh release upload v1.1.0 dist/*.tar.gz dist/*.dmg

<span class="token comment"># 列出所有附件并下载</span>
gh release download v1.1.0 <span class="token parameter variable">--pattern</span> <span class="token string">&quot;*.dmg&quot;</span> <span class="token parameter variable">--dir</span> ./installers

<span class="token comment"># 删除误发的版本</span>
gh release delete v0.9.0 <span class="token parameter variable">--yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>仓库管理：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 给仓库打主题标签、设置描述和主页</span>
gh repo edit <span class="token parameter variable">--description</span> <span class="token string">&quot;...&quot;</span> <span class="token parameter variable">--homepage</span> https://<span class="token punctuation">..</span>. --add-topic cli,devops

<span class="token comment"># 查看依赖关系（Dependabot 告警）</span>
gh api repos/<span class="token punctuation">{</span>owner<span class="token punctuation">}</span>/<span class="token punctuation">{</span>repo<span class="token punctuation">}</span>/vulnerability-alerts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-gh-api-直接调用-github-rest-graphql-api" tabindex="-1"><a class="header-anchor" href="#_6-gh-api-直接调用-github-rest-graphql-api" aria-hidden="true">#</a> 6. <code>gh api</code>：直接调用 GitHub REST/GraphQL API</h3><p><code>gh api</code> 是通向全部 GitHub 能力的「万能钥匙」，凡 <code>gh</code> 没有封装的功能都能用它直接调用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉取某仓库的 issue 评论数</span>
gh api repos/cli/cli/issues/1/comments <span class="token parameter variable">--jq</span> <span class="token string">&#39;.[] | .user.login&#39;</span>

<span class="token comment"># 用 GraphQL 做跨对象查询（变量随 -f 传入）</span>
gh api graphql <span class="token parameter variable">-F</span> <span class="token assign-left variable">owner</span><span class="token operator">=</span>cli <span class="token parameter variable">-F</span> <span class="token assign-left variable">repo</span><span class="token operator">=</span>cli <span class="token punctuation">\\</span>
  <span class="token parameter variable">-f</span> <span class="token assign-left variable">query</span><span class="token operator">=</span><span class="token string">&#39;
    query($owner:String!, $repo:String!) {
      repository(owner:$owner, name:$repo) {
        stargazerCount
        issues(states:OPEN) { totalCount }
      }
    }&#39;</span>

<span class="token comment"># 批量给仓库创建 label（脚本化）</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">l</span> <span class="token keyword">in</span> <span class="token string">&quot;bug:d73a4a&quot;</span> <span class="token string">&quot;enhancement:0052cc&quot;</span> <span class="token string">&quot;docs:fbca04&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token variable">\${l<span class="token operator">%%</span><span class="token operator">:</span>*}</span><span class="token punctuation">;</span> <span class="token assign-left variable">color</span><span class="token operator">=</span><span class="token variable">\${l<span class="token operator">##</span>*<span class="token operator">:</span>}</span>
  gh api <span class="token parameter variable">-X</span> POST repos/cli/cli/labels <span class="token punctuation">\\</span>
    <span class="token parameter variable">-f</span> <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$name</span>&quot;</span> <span class="token parameter variable">-f</span> <span class="token assign-left variable">color</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$color</span>&quot;</span> <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token keyword">done</span>

<span class="token comment"># 用 --paginate 自动翻页拉全量数据</span>
gh api <span class="token parameter variable">--paginate</span> repos/cli/cli/issues <span class="token parameter variable">--jq</span> <span class="token string">&#39;.[].number&#39;</span> <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="常见报错与解决" tabindex="-1"><a class="header-anchor" href="#常见报错与解决" aria-hidden="true">#</a> 常见报错与解决</h3><ul><li><strong>登录是前提</strong>：大部分 <code>gh</code> 命令需要先 <code>gh auth login</code>，否则报错 <code>could not read Username</code> 或 <code>authentication required</code>。用 <code>gh auth status</code> 检查登录状态。</li><li><strong>首次登录网络问题</strong>：<code>gh auth login</code> 走浏览器跳转，若在公司内网/代理环境失败，可改用 <code>--with-token</code> 方式直接粘贴 PAT，或设置 <code>HTTPS_PROXY</code> 环境变量。</li><li><strong>token 权限不足</strong>：创建 PR/Release 需要 <code>repo</code> 权限；管理组织仓库需要 <code>read:org</code> 等。权限不足会报 <code>Resource not accessible by integration</code>，去 GitHub Settings 重新生成 token 并勾选对应 scope。</li><li><strong>密钥冲突（auth host refused）</strong>：本地已有 SSH 时，<code>gh auth login</code> 建议选 HTTPS；若坚持 SSH 会报 <code>failed to sign in using ssh key</code>，可在 <code>gh auth login</code> 时显式选择 <code>GitHub.com</code> + <code>SSH</code> 并重启终端。</li><li><strong>路径/别名覆盖</strong>：若你曾用 <code>git</code> 定义过同名 alias（如 <code>git co</code>），<code>gh alias set</code> 的别名独立于 git，互不影响；但注意 <code>gh</code> 默认不接管 <code>git</code> 命令，二者是平行关系。</li><li><strong>隐私与安全</strong>：<code>GH_TOKEN</code> 属于敏感凭据，不要写进会被提交到仓库的文件；建议用 <code>gh auth login --with-token</code> 或系统钥匙串，并定期在 GitHub 后台撤销无用 token。</li><li><strong>升级后行为变化</strong>：<code>gh</code> 迭代较快，跨大版本时默认值可能变化（如 PR 合并策略），升级后运行 <code>gh --help</code> 或 <code>gh pr merge --help</code> 确认新语法。</li></ul><h3 id="更多新手踩坑点" tabindex="-1"><a class="header-anchor" href="#更多新手踩坑点" aria-hidden="true">#</a> 更多新手踩坑点</h3><ul><li><strong><code>--fill</code> 的「聪明」也有副作用</strong>：它默认取当前分支的最后一条 commit 作为 PR 标题/正文，若 commit 信息不完整，PR 会很难看。多 commit 时用 <code>gh pr create --fill-verbose</code> 逐条拼接。</li><li><strong>未配置 Git 用户信息报错</strong>：<code>git commit</code> 会报 <code>Please tell me who you are</code>，需先 <code>git config --global user.name</code> / <code>user.email</code>；<code>gh</code> 只负责远端交互，不代理本地提交。</li><li><strong><code>gh pr merge</code> 反复失败</strong>：多半是 CI 有 <code>required status check</code> 未通过，或被 branch protection 拦截。先 <code>gh pr checks --watch</code> 确认，再决定用 <code>--admin</code>（管理员跳过检查）——慎用，需有权限。</li><li><strong><code>gh run watch</code> 卡住</strong>：工作流触发条件未满足（如只在特定分支触发）会导致 <code>--exit-status</code> 一直等待。用 <code>gh run list --event push</code> 确认触发事件，必要时加 <code>--interval 30</code> 降低轮询频率。</li><li><strong>大仓库 clone/操作慢</strong>：加 <code>--depth</code>（浅克隆）或指定 <code>--filter</code> 减少体积；<code>gh repo clone</code> 接受透传 git 参数。</li><li><strong>输出被 less 分页锁住</strong>：长列表默认走分页器，在脚本或管道里用 <code>| cat</code>，或 <code>export GH_PAGER=cat</code> 直接输出。</li><li><strong>Windows/WSL 差异</strong>：<code>GH_BROWSER=open</code> 仅适用于 macOS；Windows 上用 <code>start</code>，Linux 桌面用 <code>xdg-open</code>。路径分隔符与 home 目录写法也需注意。</li></ul><h3 id="性能与安全注意点" tabindex="-1"><a class="header-anchor" href="#性能与安全注意点" aria-hidden="true">#</a> 性能与安全注意点</h3><ul><li><strong>网络依赖</strong>：<code>gh</code> 每次调用都会走网络，脚本里尽量合并成一次 <code>gh api</code>（GraphQL 可一次查询多份数据），避免成百次单独调用。</li><li><strong>token 最小权限</strong>：为脚本单独创建 fine-grained token，只授予所需仓库与权限，避免使用有全部权限的经典 token。</li><li><strong>慎用 <code>--admin</code></strong>：合并 PR 时 <code>--admin</code> 会绕过保护分支，非必要不用，防止绕过 review 流程。</li><li><strong>及时轮换凭据</strong>：在 GitHub Settings → Developer settings → Personal access tokens 里定期撤销不再使用的 token。</li><li><strong>HTTPS 而非 SSH</strong>：在代理/公司网络中 HTTPS + <code>gh auth git-credential</code> 比 SSH 更少踩坑，且无需维护私钥。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-与-jq-搭配做结构化处理" tabindex="-1"><a class="header-anchor" href="#_1-与-jq-搭配做结构化处理" aria-hidden="true">#</a> 1. 与 <code>jq</code> 搭配做结构化处理</h3><p><code>gh</code> 的 <code>--json</code> 输出配 <code>jq</code> 是脚本化标配：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 汇总某仓库所有 open PR 的标题，按 author 分组统计</span>
gh <span class="token function">pr</span> list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--limit</span> <span class="token number">100</span> <span class="token parameter variable">--json</span> number,title,author <span class="token punctuation">\\</span>
  <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">&#39;group_by(.author.login)[] | &quot;\\(.[0].author.login): \\(length) 个 PR&quot;&#39;</span>

<span class="token comment"># 找出 30 天内创建、尚未合并的旧 PR</span>
gh <span class="token function">pr</span> list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--json</span> number,title,createdAt <span class="token punctuation">\\</span>
  <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">&#39;.[] | select((now - (.createdAt|fromdateiso8601)) &gt; 30*86400)
            | &quot;\\(.number) 超期 \\(.title)&quot;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-与-fzf-搭配做交互式选择" tabindex="-1"><a class="header-anchor" href="#_2-与-fzf-搭配做交互式选择" aria-hidden="true">#</a> 2. 与 <code>fzf</code> 搭配做交互式选择</h3><p><code>fzf</code> 让 <code>gh</code> 的输出可模糊搜索、回车选定，非常适合日常交互：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 交互式检出某个 PR（输入即过滤，回车 checkout）</span>
gh <span class="token function">pr</span> list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--json</span> number,title <span class="token punctuation">\\</span>
  <span class="token parameter variable">--jq</span> <span class="token string">&#39;.[] | &quot;\\(.number)\\t\\(.title)&quot;&#39;</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> fzf <span class="token parameter variable">--delimiter</span><span class="token operator">=</span><span class="token string">&#39;\\t&#39;</span> --with-nth<span class="token operator">=</span><span class="token number">2</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> gh <span class="token function">pr</span> checkout <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment"># 交互式查看某个 issue 详情</span>
gh issue list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--json</span> number,title <span class="token punctuation">\\</span>
  <span class="token parameter variable">--jq</span> <span class="token string">&#39;.[] | &quot;\\(.number)\\t\\(.title)&quot;&#39;</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> fzf <span class="token parameter variable">--delimiter</span><span class="token operator">=</span><span class="token string">&#39;\\t&#39;</span> --with-nth<span class="token operator">=</span><span class="token number">2</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> gh issue view <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-与-makefile-脚本搭配" tabindex="-1"><a class="header-anchor" href="#_3-与-makefile-脚本搭配" aria-hidden="true">#</a> 3. 与 Makefile / 脚本搭配</h3><p>在项目根目录写一个 <code>Makefile</code>，把发版、提 PR 等重复动作固化成目标：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> pr release clean

<span class="token comment"># 提交并自动创建 PR（简化：git add/commit/push + gh pr create）</span>
<span class="token target symbol">pr</span><span class="token punctuation">:</span>
	git add .
	git commit -m <span class="token string">&quot;$(M)&quot;</span>
	git push -u origin HEAD
	gh pr create --fill --base main

<span class="token comment"># 发布版本：打标签 + 生成发布说明 + 上传二进制</span>
<span class="token target symbol">release</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>test -n <span class="token string">&quot;$(V)&quot;</span> <span class="token operator">|</span><span class="token operator">|</span> <span class="token punctuation">(</span>echo <span class="token string">&quot;用法: make release V=v1.0.0&quot;</span> &amp;&amp; exit 1<span class="token punctuation">)</span>
	git tag <span class="token variable">$</span><span class="token punctuation">(</span>V<span class="token punctuation">)</span>
	git push origin <span class="token variable">$</span><span class="token punctuation">(</span>V<span class="token punctuation">)</span>
	gh release create <span class="token variable">$</span><span class="token punctuation">(</span>V<span class="token punctuation">)</span> --generate-notes --title <span class="token string">&quot;$(V)&quot;</span>
	<span class="token operator">@</span>for f in dist/*<span class="token punctuation">;</span> do gh release upload <span class="token variable">$</span><span class="token punctuation">(</span>V<span class="token punctuation">)</span> <span class="token string">&quot;$$f&quot;</span><span class="token punctuation">;</span> done

<span class="token comment"># 一键完成：提交 → 建 PR → 等 CI → 合并 → 删分支 → 发版</span>
<span class="token target symbol">ship</span><span class="token punctuation">:</span> pr
	gh pr checks --watch
	gh pr merge --squash --delete-branch
	<span class="token operator">@</span>make release V<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>V<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的 Shell 脚本版本（<code>scripts/release.sh</code>）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail                      <span class="token comment"># 任何错误立即退出，脚本更稳</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GH_PROMPT_DISABLED</span><span class="token operator">=</span><span class="token number">1</span>            <span class="token comment"># 无交互</span>

<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:?</span>用法<span class="token operator">:</span> .<span class="token operator">/</span>scripts<span class="token operator">/</span>release.sh v1.0.0}</span>&quot;</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$VERSION</span>&quot;</span>

<span class="token comment"># 幂等：若 tag 已存在则跳过打标签</span>
<span class="token keyword">if</span> <span class="token operator">!</span> <span class="token function">git</span> rev-parse <span class="token string">&quot;<span class="token variable">$TAG</span>&quot;</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token function">git</span> tag <span class="token string">&quot;<span class="token variable">$TAG</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> push origin <span class="token string">&quot;<span class="token variable">$TAG</span>&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment"># 幂等：若 release 已存在则删除重建（或跳过）</span>
gh release view <span class="token string">&quot;<span class="token variable">$TAG</span>&quot;</span> <span class="token parameter variable">--json</span> tagName <span class="token parameter variable">-q</span> .tagName <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token punctuation">\\</span>
  <span class="token operator">||</span> gh release create <span class="token string">&quot;<span class="token variable">$TAG</span>&quot;</span> --generate-notes <span class="token parameter variable">--title</span> <span class="token string">&quot;<span class="token variable">$VERSION</span>&quot;</span>

<span class="token comment"># 上传产物（dist 目录下的文件）</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> dist/*<span class="token punctuation">;</span> <span class="token keyword">do</span>
  gh release upload <span class="token string">&quot;<span class="token variable">$TAG</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token parameter variable">--clobber</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;已发布 <span class="token variable">$TAG</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>别忘了 <code>chmod +x scripts/release.sh</code>。</p><h3 id="_4-批量处理" tabindex="-1"><a class="header-anchor" href="#_4-批量处理" aria-hidden="true">#</a> 4. 批量处理</h3><p><code>gh</code> 支持遍历循环做批量操作，适合清理、迁移、补全元数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 批量关闭 30 天前无人回复的 stale issue</span>
gh issue list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--json</span> number,updatedAt <span class="token parameter variable">--limit</span> <span class="token number">200</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">&#39;.[] | select((now - (.updatedAt|fromdateiso8601)) &gt; 30*86400) | .number&#39;</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> n<span class="token punctuation">;</span> <span class="token keyword">do</span>
      gh issue comment <span class="token string">&quot;<span class="token variable">$n</span>&quot;</span> <span class="token parameter variable">--body</span> <span class="token string">&quot;30 天无活动，自动关闭。如需继续讨论请重新打开。&quot;</span>
      gh issue close <span class="token string">&quot;<span class="token variable">$n</span>&quot;</span>
    <span class="token keyword">done</span>

<span class="token comment"># 批量给某仓库所有 open issue 打 label</span>
gh issue list <span class="token parameter variable">--state</span> <span class="token function">open</span> <span class="token parameter variable">--json</span> number <span class="token parameter variable">--limit</span> <span class="token number">500</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">&#39;.[].number&#39;</span> <span class="token punctuation">\\</span>
  <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> gh issue edit <span class="token punctuation">{</span><span class="token punctuation">}</span> --add-label <span class="token string">&quot;triage&quot;</span>

<span class="token comment"># 批量给 Release 上传同一目录下多个平台的二进制</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> build/*.tar.gz<span class="token punctuation">;</span> <span class="token keyword">do</span>
  gh release upload v2.0.0 <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-与-git-命令深度配合" tabindex="-1"><a class="header-anchor" href="#_5-与-git-命令深度配合" aria-hidden="true">#</a> 5. 与 Git 命令深度配合</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 提交后推送并立即打开浏览器查看 PR</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: x&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> push <span class="token parameter variable">-u</span> origin HEAD <span class="token punctuation">\\</span>
  <span class="token operator">&amp;&amp;</span> gh <span class="token function">pr</span> create <span class="token parameter variable">--fill</span> <span class="token operator">&amp;&amp;</span> gh <span class="token function">pr</span> view <span class="token parameter variable">--web</span>

<span class="token comment"># 用 gh 拿到当前分支 PR 的状态，决定是否合并</span>
<span class="token keyword">if</span> gh <span class="token function">pr</span> checks <span class="token parameter variable">--watch</span> --exit-status<span class="token punctuation">;</span> <span class="token keyword">then</span>
  gh <span class="token function">pr</span> merge <span class="token parameter variable">--squash</span> --delete-branch
<span class="token keyword">fi</span>

<span class="token comment"># 基于最新 main 重开一个干净的 PR 分支</span>
<span class="token function">git</span> checkout main <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> pull <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> fix/typo <span class="token punctuation">\\</span>
  <span class="token operator">&amp;&amp;</span> gh <span class="token function">pr</span> create <span class="token parameter variable">--fill</span> <span class="token parameter variable">--base</span> main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-集成到-github-actions-ci" tabindex="-1"><a class="header-anchor" href="#_6-集成到-github-actions-ci" aria-hidden="true">#</a> 6. 集成到 GitHub Actions（CI）</h3><p><code>gh</code> 在 Actions 里已经内置，无需手动认证，直接拿 <code>\${{ github.token }}</code> 用。常见场景：</p><p><strong>① 发布 Release 的自动化工作流</strong>（<code>.github/workflows/release.yml</code>）：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> release
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">tags</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;v*&#39;</span><span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
      <span class="token key atrule">contents</span><span class="token punctuation">:</span> write            <span class="token comment"># 关键：授予 gh release 写权限</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 构建产物
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          mkdir -p dist
          echo &quot;demo&quot; &gt; dist/app.txt</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建 Release
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          gh release create &quot;$GITHUB_REF_NAME&quot; --generate-notes \\
            dist/* --title &quot;$GITHUB_REF_NAME&quot;</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GH_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.token <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>② 自动给合并后的 PR 打标签 / 发布说明</strong>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>closed<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">changelog</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">if</span><span class="token punctuation">:</span> github.event.pull_request.merged == true
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          # 用 gh 读取合并 PR 的标题生成 changelog 条目
          echo &quot;## 变更&quot; &gt; CHANGELOG.md
          gh pr view &quot;\${{ github.event.pull_request.number }}&quot; \\
            --json title,body -q &#39;.title&#39; &gt;&gt; CHANGELOG.md</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③ 跨仓库自动同步 / 批量操作</strong>：可在 Actions 里用 PAT（存到 repo secrets）做跨仓库的 <code>gh api</code> 调用，例如批量关闭旧 issue、给另一个仓库提 PR 等。</p><h3 id="_7-生产级实践清单" tabindex="-1"><a class="header-anchor" href="#_7-生产级实践清单" aria-hidden="true">#</a> 7. 生产级实践清单</h3><ul><li><strong>版本与依赖锁定</strong>：CI 里用固定版本的 <code>gh</code>（<code>gh --version</code> 记录），避免上游行为变化影响流水线。</li><li><strong>错误即失败</strong>：脚本统一加 <code>set -euo pipefail</code>，<code>gh</code> 非零退出立即终止，避免「带病继续」。</li><li><strong>结构化而非文本解析</strong>：一律用 <code>--json</code> + <code>jq</code>，绝不 <code>grep</code> 文本表格，格式变化才不易崩。</li><li><strong>最小权限 + 临时 token</strong>：CI 用 <code>\${{ github.token }}</code>（自动、短时有效），跨仓库场景才申请 PAT 并存入 secrets。</li><li><strong>可观测性</strong>：关键步骤 <code>echo &quot;::group::发布 Release&quot;</code> … <code>echo &quot;::endgroup::&quot;</code>，让 CI 日志可折叠、可排查。</li><li><strong>优雅处理幂等</strong>：所有「可能已存在」的操作先查后建，避免 CI 重跑时报错。</li></ul><hr><blockquote><p><strong>延伸阅读</strong>：<code>gh api</code> 官方文档、<code>.github/workflows</code> 语法手册、以及 <code>gh</code> 各子命令的 <code>--help</code> 输出是快速上手的最终参考。</p></blockquote>`,97),l=[i];function o(c,p){return n(),a("div",null,l)}const u=s(t,[["render",o],["__file","gh.html.vue"]]);export{u as default};
