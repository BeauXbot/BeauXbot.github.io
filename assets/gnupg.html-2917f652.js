import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e as n}from"./app-42caee4a.js";const d={},t=n(`<h1 id="gnupg-gpg-加密签名工具-pgp-实现" tabindex="-1"><a class="header-anchor" href="#gnupg-gpg-加密签名工具-pgp-实现" aria-hidden="true">#</a> gnupg（GPG 加密签名工具（PGP 实现））</h1><blockquote><p>Homebrew 版本 2.4.8 ｜ 主页：见官方文档 ｜ 安装：<code>brew install gnupg</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>GnuPG（GNU Privacy Guard，简称 GPG）是 PGP（Pretty Good Privacy）加密标准的自由开源实现，用于数据加密、数字签名以及身份认证。它解决的核心问题是如何在公开网络上安全地传输数据、验证文件来源的真实性和完整性——典型场景包括：用公钥加密文件后发送给他人、对发布包或 Git 提交做数字签名、以及用密钥对加密和解密口令/备份。其加密算法基于现代非对称加密（如 RSA、ECC），安全性经过了全球广泛验证。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> gnupg

<span class="token comment"># 升级（先更新 brew 索引）</span>
brew update
brew upgrade gnupg

<span class="token comment"># 卸载</span>
brew uninstall gnupg

<span class="token comment"># 验证安装成功（应输出类似 gpg (GnuPG) 2.4.8）</span>
gpg <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>gpg --full-generate-key</code></td><td>交互式生成新密钥对（推荐用 <code>--full-*</code> 以便自定义算法）</td><td><code>gpg --full-generate-key</code></td></tr><tr><td><code>gpg --list-keys</code></td><td>列出本地所有公钥</td><td><code>gpg --list-keys</code></td></tr><tr><td><code>gpg --list-secret-keys</code></td><td>列出本地所有私钥</td><td><code>gpg --list-secret-keys</code></td></tr><tr><td><code>gpg --export</code></td><td>导出公钥（ASCII 格式用 <code>--armor</code>）</td><td><code>gpg --armor --export alice@example.com</code></td></tr><tr><td><code>gpg --import</code></td><td>导入他人公钥</td><td><code>gpg --import bob.pub.asc</code></td></tr><tr><td><code>gpg -e</code> / <code>--encrypt</code></td><td>加密文件（配合 <code>-r</code> 指定收件人公钥）</td><td><code>gpg -e -r bob@example.com secret.txt</code></td></tr><tr><td><code>gpg -d</code> / <code>--decrypt</code></td><td>解密文件</td><td><code>gpg -d secret.txt.gpg</code></td></tr><tr><td><code>gpg -s</code> / <code>--sign</code></td><td>对文件做签名（默认二进制签名）</td><td><code>gpg -s release.tar.gz</code></td></tr><tr><td><code>gpg --verify</code></td><td>验证签名</td><td><code>gpg --verify release.tar.gz.sig release.tar.gz</code></td></tr><tr><td><code>gpg --delete-secret-keys</code></td><td>删除私钥（删除公钥用 <code>--delete-keys</code>）</td><td><code>gpg --delete-secret-keys KEYID</code></td></tr><tr><td><code>gpg --export-secret-keys</code></td><td>备份私钥（务必加 <code>--armor</code> 并妥善保管）</td><td><code>gpg --armor --export-secret-keys KEYID &gt; backup.asc</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-生成密钥对" tabindex="-1"><a class="header-anchor" href="#示例-1-生成密钥对" aria-hidden="true">#</a> 示例 1：生成密钥对</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 交互式生成，按提示选择密钥类型与用途，设置口令（passphrase）</span>
gpg --full-generate-key

<span class="token comment"># 查看生成的密钥</span>
gpg --list-keys

<span class="token comment"># 输出示例（KEYID 是第二行十六进制指纹的后 16 位）</span>
<span class="token comment"># pub   rsa3072 2026-01-01 [SC] [有效至: 2028-01-01]</span>
<span class="token comment">#       ABCDEF0123456789ABCDEF0123456789ABCDEF01</span>
<span class="token comment"># uid           [ 终极 ] Alice &lt;alice@example.com&gt;</span>
<span class="token comment"># sub   rsa3072 2026-01-01 [E] [有效至: 2028-01-01]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-2-加密与解密文件" tabindex="-1"><a class="header-anchor" href="#示例-2-加密与解密文件" aria-hidden="true">#</a> 示例 2：加密与解密文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 导出自己的公钥发给对方（或导入对方的公钥）</span>
gpg <span class="token parameter variable">--armor</span> <span class="token parameter variable">--export</span> alice@example.com <span class="token operator">&gt;</span> alice.pub.asc

<span class="token comment"># 2. 导入对方（Bob）的公钥</span>
gpg <span class="token parameter variable">--import</span> bob.pub.asc

<span class="token comment"># 3. 用 Bob 的公钥加密文件（只有 Bob 的私钥能解密）</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;绝密内容&quot;</span> <span class="token operator">&gt;</span> secret.txt
gpg <span class="token parameter variable">-e</span> <span class="token parameter variable">-r</span> bob@example.com secret.txt
<span class="token comment"># 生成 secret.txt.gpg</span>

<span class="token comment"># 4. Bob 解密</span>
gpg <span class="token parameter variable">-d</span> secret.txt.gpg
<span class="token comment"># 输出原始内容到屏幕；如需写回文件用 --output</span>
gpg <span class="token parameter variable">-d</span> secret.txt.gpg <span class="token parameter variable">--output</span> secret.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-签名并校验文件完整性" tabindex="-1"><a class="header-anchor" href="#示例-3-签名并校验文件完整性" aria-hidden="true">#</a> 示例 3：签名并校验文件完整性</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 对发布包做二进制签名</span>
gpg <span class="token parameter variable">-s</span> release-2.4.8.tar.gz
<span class="token comment"># 生成 release-2.4.8.tar.gz.gpg（内含原文+签名）</span>

<span class="token comment"># 2. 单独分离签名（--detach-sign），不修改原文件</span>
gpg --detach-sign <span class="token parameter variable">--armor</span> release-2.4.8.tar.gz
<span class="token comment"># 生成 release-2.4.8.tar.gz.asc</span>

<span class="token comment"># 3. 校验签名</span>
gpg <span class="token parameter variable">--verify</span> release-2.4.8.tar.gz.asc release-2.4.8.tar.gz
<span class="token comment"># 输出 gpg: 好的签名 以及签名者身份，说明文件未被篡改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><ol><li><p><strong>为 Git 提交签名</strong>：GPG 与 Git 搭配是最常见的场景。生成密钥后执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.signingkey KEYID
<span class="token function">git</span> config <span class="token parameter variable">--global</span> commit.gpgsign <span class="token boolean">true</span>   <span class="token comment"># 之后所有提交自动签名</span>
<span class="token function">git</span> commit <span class="token parameter variable">-S</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;签名提交&quot;</span>              <span class="token comment"># 或临时用 -S 强制签名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 GitHub/GitLab 的 SSH 或 GPG 设置里粘贴 <code>gpg --armor --export KEYID</code> 的输出来绑定身份。</p></li><li><p><strong>配置文件位置</strong>：用户级配置在 <code>~/.gnupg/</code>，常用文件为 <code>~/.gnupg/gpg.conf</code>（命令行默认参数）、<code>~/.gnupg/dirmngr.conf</code>（密钥服务器网络）。可在 <code>gpg.conf</code> 里持久化常用选项，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ~/.gnupg/gpg.conf</span>
default-key KEYID
keyserver hkps://keys.openpgp.org
auto-key-retrieve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>明文输出与二进制混合</strong>：加密时若希望可读/可传输到邮件，加 <code>--armor</code> 生成 ASCII 装甲格式（<code>.asc</code>）；不加则默认二进制。命令行参数优先级高于配置文件。</p></li><li><p><strong>环境变量</strong>：GPG 常用 <code>GNUPGHOME</code> 指定密钥目录（默认 <code>~/.gnupg</code>），便于多密钥集隔离或用于 CI：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GNUPGHOME</span><span class="token operator">=</span>/path/to/my/gpg-home
gpg --list-keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><strong>私钥绝不外泄</strong>：<code>--export-secret-keys</code> 导出的私钥一旦泄露，任何人可冒充你签名、解密你的数据。备份私钥文件时应加密存储，且不同平台分开保管。吊销证书（<code>gpg --gen-revoke KEYID</code>）应在生成密钥时就生成并妥善保存。</li><li><strong>口令（passphrase）遗忘无法找回</strong>：GPG 私钥加密后没有找回机制，忘记口令即永久失去该私钥，请务必使用密码管理器保存。</li><li><strong>公钥信任与认证</strong>：仅导入公钥不等于信任其身份，建议通过 <code>gpg --edit-key KEYID</code> 进入交互模式用 <code>trust</code> 命令设置信任级别，防止中间人攻击。</li><li><strong>常见报错 <code>no valid OpenPGP data found</code></strong>：通常因解密/校验对象不是 GPG 数据（如未加密的普通文件），或导入的是一段被截断的 ASCII 内容——检查文件类型并确保命令与对象匹配。</li><li><strong>性能与安全</strong>：非对称加密（RSA/ECC）较慢，加密大文件时建议先压缩（如 <code>tar czf</code>）再加密；或先用对称加密（<code>gpg -c</code>）再用公钥加密会话密钥。生成密钥时选择 3072 位 RSA 或 256 位 ECC（如 <code>ed25519</code>）为目前推荐强度。</li></ul>`,19),i=[t];function c(r,l){return a(),s("div",null,i)}const g=e(d,[["render",c],["__file","gnupg.html.vue"]]);export{g as default};
