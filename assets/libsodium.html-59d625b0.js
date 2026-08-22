import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c,a as s,b as n,d as p,e as a}from"./app-4490560f.js";const l={},d=a(`<h1 id="libsodium-现代加密-解密-c-库" tabindex="-1"><a class="header-anchor" href="#libsodium-现代加密-解密-c-库" aria-hidden="true">#</a> libsodium（现代加密/解密 C 库）</h1><blockquote><p>Homebrew 版本 1.0.20 ｜ 主页：见官方文档 ｜ 安装：<code>brew install libsodium</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>libsodium 是一个现代、易用、可移植的加密/解密 C 库，它把 NaCl（Networking and Cryptography library）中经过实战验证的密码学原语封装成一套<strong>简洁、安全、面向误用的 API</strong>。它的核心设计哲学是&quot;默认安全&quot;——尽量避免开发者因选错算法、用错参数或误用底层细节而引入漏洞，同时提供密码学领域的多项推荐实现。</p><p>典型应用场景：消息/文件的对称与非对称加密、数字签名、密钥交换（如 X25519）、哈希与密码哈希（如 Argon2、scrypt）、一次性口令（TOTP/HOTP），以及随机数生成等。它被大量语言绑定（Python、Go、Rust、Node、PHP 等）作为底层密码学后端，广泛用于聊天工具、即时通讯、网络协议和各类需要加密能力的应用。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>通过 Homebrew 安装、升级、卸载，以及验证：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> libsodium

<span class="token comment"># 升级到最新版</span>
brew upgrade libsodium

<span class="token comment"># 卸载</span>
brew uninstall libsodium

<span class="token comment"># 验证安装成功（应输出类似 1.0.20）</span>
pkg-config <span class="token parameter variable">--modversion</span> libsodium

<span class="token comment"># 查看是否已在系统中正确链接</span>
brew info libsodium

<span class="token comment"># 确认库文件存在（Apple Silicon 路径）</span>
<span class="token function">ls</span> /opt/homebrew/lib/libsodium.*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>pkg-config --modversion libsodium</code> 输出 <code>1.0.20</code> 即表示安装成功。若提示 <code>command not found</code>，先确认 <code>/opt/homebrew/bin</code>（Apple Silicon）或 <code>/usr/local/bin</code>（Intel）已在 PATH 中。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><p>libsodium 是一个<strong>库</strong>而非命令行工具，因此&quot;命令&quot;体现为 <code>pkg-config</code> 查询、编译链接参数以及库内常用函数调用。下表给出最常见的用法：</p><table><thead><tr><th>命令/函数</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>pkg-config --cflags --libs libsodium</code></td><td>输出编译与链接参数</td><td><code>cc app.c $(pkg-config --cflags --libs libsodium)</code></td></tr><tr><td><code>sodium_init()</code></td><td>初始化库（需在其它函数前调用）</td><td><code>if (sodium_init() &lt; 0) return 1;</code></td></tr><tr><td><code>randombytes_buf(buf, n)</code></td><td>生成 n 字节安全随机数</td><td><code>randombytes_buf(key, 32);</code></td></tr><tr><td><code>crypto_aead_xchacha20poly1305_ietf_encrypt()</code></td><td>AEAD 认证加密（带密钥交换）</td><td>见示例 2</td></tr><tr><td><code>crypto_box_easy()</code></td><td>公钥认证加密（密封/非密封）</td><td>见示例 2</td></tr><tr><td><code>crypto_sign_detached()</code></td><td>生成 Ed25519 签名</td><td>见示例 3</td></tr><tr><td><code>crypto_pwhash_str()</code></td><td>密码哈希（Argon2id）</td><td>见示例 4</td></tr><tr><td><code>crypto_secretbox_easy()</code></td><td>对称密钥加密</td><td><code>crypto_secretbox_easy(c, m, mlen, nonce, key)</code></td></tr><tr><td><code>sodium_mlock()</code> / <code>sodium_munlock()</code></td><td>锁定/解锁内存防交换到磁盘</td><td><code>sodium_mlock(secret, sizeof secret);</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><p>libsodium 是纯库，以下示例演示如何在 C/C++ 中链接并使用它做加密、签名与密码哈希。</p><h3 id="示例-1-最小可编译的对称加密-secretbox" tabindex="-1"><a class="header-anchor" href="#示例-1-最小可编译的对称加密-secretbox" aria-hidden="true">#</a> 示例 1：最小可编译的对称加密（secretbox）</h3><p>用 C 编写一个使用对称密钥加密/解密的完整程序：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> secretbox_demo.c <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;sodium.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void) {
    if (sodium_init() &lt; 0) { /* 初始化失败，无法使用密码学函数 */
        return 1;
    }
    unsigned char key[crypto_secretbox_KEYBYTES];
    unsigned char nonce[crypto_secretbox_NONCEBYTES];
    randombytes_buf(key, sizeof key);
    randombytes_buf(nonce, sizeof nonce);

    const char *msg = &quot;Hello, libsodium!&quot;;
    unsigned long long mlen = strlen(msg) + 1; /* 含结尾 &#39;\\0&#39; */

    unsigned char ciphertext[mlen + crypto_secretbox_MACBYTES];
    crypto_secretbox_easy(ciphertext, (const unsigned char *)msg, mlen, nonce, key);

    /* 解密验证 */
    unsigned char decrypted[mlen];
    if (crypto_secretbox_open_easy(decrypted, ciphertext, sizeof ciphertext, nonce, key) != 0) {
        printf(&quot;解密失败，数据被篡改或密钥错误\\n&quot;);
        return 1;
    }
    printf(&quot;解密成功: %s\\n&quot;, decrypted);
    return 0;
}
EOF</span>

<span class="token comment"># 2. 编译并链接（pkg-config 自动带入 -I 和 -L/-lsodium）</span>
cc secretbox_demo.c <span class="token parameter variable">-o</span> secretbox_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>

<span class="token comment"># 3. 运行</span>
./secretbox_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出应为 <code>解密成功: Hello, libsodium!</code>。若更改密文中任意一个字节再解密，<code>crypto_secretbox_open_easy</code> 会返回非 0，体现 AEAD 的完整性校验。</p><h3 id="示例-2-公钥加密与密钥交换-crypto-box-x25519" tabindex="-1"><a class="header-anchor" href="#示例-2-公钥加密与密钥交换-crypto-box-x25519" aria-hidden="true">#</a> 示例 2：公钥加密与密钥交换（crypto_box / X25519）</h3><p>生成密钥对并用对方公钥加密，这是端到端加密的典型模式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> box_demo.c <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;sodium.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void) {
    if (sodium_init() &lt; 0) return 1;

    unsigned char alice_pk[crypto_box_PUBLICKEYBYTES];
    unsigned char alice_sk[crypto_box_SECRETKEYBYTES];
    unsigned char bob_pk[crypto_box_PUBLICKEYBYTES];
    unsigned char bob_sk[crypto_box_SECRETKEYBYTES];
    crypto_box_keypair(alice_pk, alice_sk);
    crypto_box_keypair(bob_pk, bob_sk);

    const char *msg = &quot;secret for Bob&quot;;
    unsigned long long mlen = strlen(msg) + 1;
    unsigned char nonce[crypto_box_NONCEBYTES];
    randombytes_buf(nonce, sizeof nonce);

    /* Alice 用 Bob 公钥 + 自己私钥加密 */
    unsigned char ciphertext[mlen + crypto_box_MACBYTES];
    crypto_box_easy(ciphertext, (const unsigned char *)msg, mlen, nonce,
                    bob_pk, alice_sk);

    /* Bob 用自己的私钥 + Alice 公钥解密 */
    unsigned char decrypted[mlen];
    if (crypto_box_open_easy(decrypted, ciphertext, sizeof ciphertext, nonce,
                             alice_pk, bob_sk) != 0) {
        printf(&quot;解密失败\\n&quot;);
        return 1;
    }
    printf(&quot;Bob 收到: %s\\n&quot;, decrypted);
    return 0;
}
EOF</span>

cc box_demo.c <span class="token parameter variable">-o</span> box_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>
./box_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为 <code>Bob 收到: secret for Bob</code>。双方各自持有公钥/私钥，即可在不共享对称密钥的情况下安全通信。</p><h3 id="示例-3-ed25519-数字签名" tabindex="-1"><a class="header-anchor" href="#示例-3-ed25519-数字签名" aria-hidden="true">#</a> 示例 3：Ed25519 数字签名</h3><p>用私钥签名、公钥验签，适用于软件包、文档或消息的完整性校验：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> sign_demo.c <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;sodium.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void) {
    if (sodium_init() &lt; 0) return 1;

    unsigned char pk[crypto_sign_PUBLICKEYBYTES];
    unsigned char sk[crypto_sign_SECRETKEYBYTES];
    crypto_sign_keypair(pk, sk);

    const char *msg = &quot;important message&quot;;
    unsigned long long mlen = strlen(msg) + 1;
    unsigned char sig[crypto_sign_BYTES];

    /* 对消息生成分离式签名 */
    crypto_sign_detached(sig, NULL, (const unsigned char *)msg, mlen, sk);

    /* 用公钥验证签名 */
    if (crypto_sign_verify_detached(sig, (const unsigned char *)msg, mlen, pk) == 0) {
        printf(&quot;签名有效\\n&quot;);
    } else {
        printf(&quot;签名无效\\n&quot;);
    }
    return 0;
}
EOF</span>

cc sign_demo.c <span class="token parameter variable">-o</span> sign_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>
./sign_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为 <code>签名有效</code>。将 <code>msg</code> 改为另一串字符串再验签，会输出 <code>签名无效</code>。</p><h3 id="示例-4-密码哈希与校验-argon2id" tabindex="-1"><a class="header-anchor" href="#示例-4-密码哈希与校验-argon2id" aria-hidden="true">#</a> 示例 4：密码哈希与校验（Argon2id）</h3><p>存储密码时用 <code>crypto_pwhash_str</code> 生成带随机盐的哈希字符串，用 <code>crypto_pwhash_str_verify</code> 校验，切勿明文存储密码：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> pwhash_demo.c <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;sodium.h&gt;
#include &lt;stdio.h&gt;

int main(void) {
    if (sodium_init() &lt; 0) return 1;

    const char *password = &quot;correct horse battery staple&quot;;
    char hashed[crypto_pwhash_STRBYTES];

    /* 生成 Argon2id 哈希（自动使用安全默认参数并内嵌随机盐） */
    if (crypto_pwhash_str(hashed, password, strlen(password),
                          crypto_pwhash_OPSLIMIT_INTERACTIVE,
                          crypto_pwhash_MEMLIMIT_INTERACTIVE) != 0) {
        printf(&quot;内存不足，哈希失败\\n&quot;);
        return 1;
    }
    printf(&quot;哈希: %s\\n&quot;, hashed);

    /* 校验正确密码 */
    if (crypto_pwhash_str_verify(hashed, password, strlen(password)) == 0) {
        printf(&quot;密码校验通过\\n&quot;);
    } else {
        printf(&quot;密码校验失败\\n&quot;);
    }
    return 0;
}
EOF</span>

cc pwhash_demo.c <span class="token parameter variable">-o</span> pwhash_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>
./pwhash_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出包含一长串以 <code>$argon2id$</code> 开头的哈希，并打印 <code>密码校验通过</code>。同一密码每次运行得到的哈希不同，因为盐是随机的。</p><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-用-pkg-config-简化编译-避免手写路径" tabindex="-1"><a class="header-anchor" href="#_1-用-pkg-config-简化编译-避免手写路径" aria-hidden="true">#</a> 1. 用 pkg-config 简化编译，避免手写路径</h3><p>只要保证 <code>PKG_CONFIG_PATH</code> 指向 Homebrew 的 <code>lib/pkgconfig</code>，即可用 <code>$(pkg-config --cflags --libs libsodium)</code> 自动获得正确的头文件与链接路径，无需手写 <code>-I</code> 和 <code>-L</code>。若 CMake 使用，可这样引入：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token comment"># CMakeLists.txt 中</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>PkgConfig<span class="token punctuation">)</span>
<span class="token function">pkg_check_modules</span><span class="token punctuation">(</span>SODIUM REQUIRED libsodium<span class="token punctuation">)</span>
<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span>myapp <span class="token namespace">PRIVATE</span> <span class="token punctuation">\${</span>SODIUM_LIBRARIES<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">target_include_directories</span><span class="token punctuation">(</span>myapp <span class="token namespace">PRIVATE</span> <span class="token punctuation">\${</span>SODIUM_INCLUDE_DIRS<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>提示</strong>：Homebrew 安装的 pkg-config 文件位于 <code>$(brew --prefix libsodium)/lib/pkgconfig/sodium.pc</code>。若 <code>pkg-config</code> 找不到，显式导出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PKG_CONFIG_PATH</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> libsodium<span class="token variable">)</span></span>/lib/pkgconfig:<span class="token variable">\${PKG_CONFIG_PATH}</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><h3 id="_2-一个可直接复用的通用-makefile-配置" tabindex="-1"><a class="header-anchor" href="#_2-一个可直接复用的通用-makefile-配置" aria-hidden="true">#</a> 2. 一个可直接复用的通用 Makefile 配置</h3><p>把常用编译、链接与测试步骤固化到 <code>Makefile</code>，可避免每次敲一长串命令：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>CC      <span class="token operator">?=</span> cc
CFLAGS  <span class="token operator">?=</span> -O2 -Wall -Wextra
LIBS    <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> pkg-config --cflags --libs libsodium<span class="token punctuation">)</span>

<span class="token target symbol">all</span><span class="token punctuation">:</span> secretbox_demo box_demo sign_demo pwhash_demo aead_demo

<span class="token target symbol">%.o</span><span class="token punctuation">:</span> %.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBS<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span> -o <span class="token variable">$@</span>

<span class="token target symbol">secretbox_demo</span><span class="token punctuation">:</span> secretbox_demo.o
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBS<span class="token punctuation">)</span> -o <span class="token variable">$@</span>

<span class="token target symbol">box_demo</span><span class="token punctuation">:</span> box_demo.o
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBS<span class="token punctuation">)</span> -o <span class="token variable">$@</span>

<span class="token target symbol">sign_demo</span><span class="token punctuation">:</span> sign_demo.o
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBS<span class="token punctuation">)</span> -o <span class="token variable">$@</span>

<span class="token target symbol">pwhash_demo</span><span class="token punctuation">:</span> pwhash_demo.o
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBS<span class="token punctuation">)</span> -o <span class="token variable">$@</span>

<span class="token target symbol">aead_demo</span><span class="token punctuation">:</span> aead_demo.o
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBS<span class="token punctuation">)</span> -o <span class="token variable">$@</span>

<span class="token target symbol">test</span><span class="token punctuation">:</span> all
	./secretbox_demo
	./box_demo
	./sign_demo
	./pwhash_demo
	./aead_demo

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f *.o secretbox_demo box_demo sign_demo pwhash_demo aead_demo

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> all test clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-需要-aes-加速时启用编译期宏" tabindex="-1"><a class="header-anchor" href="#_3-需要-aes-加速时启用编译期宏" aria-hidden="true">#</a> 3. 需要 AES 加速时启用编译期宏</h3><p>libsodium 在部分平台默认可检测 AES-NI 并自动启用。若需显式控制，可在编译时定义宏：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cc aes_demo.c <span class="token parameter variable">-o</span> aes_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>
<span class="token comment"># 若需强制开启 AES 硬件加速，可加 -Dsodium_SSE2 等构建相关宏（依赖平台）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>多数场景不必手动干预，优先使用 <code>crypto_aead_xchacha20poly1305_ietf_*</code> 这类推荐算法，其默认参数即安全。</p><h3 id="_4-内存安全-锁定密钥并清除敏感数据" tabindex="-1"><a class="header-anchor" href="#_4-内存安全-锁定密钥并清除敏感数据" aria-hidden="true">#</a> 4. 内存安全：锁定密钥并清除敏感数据</h3><p>密钥常驻内存会被换页到磁盘，存在泄露风险。用 <code>sodium_mlock</code> 锁定，用 <code>sodium_memzero</code> 或 <code>sodium_free</code> 及时清除：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">char</span> key<span class="token punctuation">[</span>crypto_secretbox_KEYBYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">randombytes_buf</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sodium_mlock</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">/* 防止被换出到磁盘 */</span>
<span class="token comment">/* ... 使用 key ... */</span>
<span class="token function">sodium_memzero</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">/* 用完后立即清零 */</span>
<span class="token function">sodium_munlock</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-对称密钥的派生-crypto-generichash-与-crypto-kdf" tabindex="-1"><a class="header-anchor" href="#_5-对称密钥的派生-crypto-generichash-与-crypto-kdf" aria-hidden="true">#</a> 5. 对称密钥的派生：<code>crypto_generichash</code> 与 <code>crypto_kdf</code></h3><p>从主密钥派生子密钥，或用密钥+上下文派生多个用途不同的子密钥，是密码学实践中的常见需求：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sodium.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sodium_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">/* crypto_kdf：由主密钥派生多个子密钥 */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> master_key<span class="token punctuation">[</span>crypto_kdf_KEYBYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> subkey1<span class="token punctuation">[</span>crypto_kdf_BYTES_MIN<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> subkey2<span class="token punctuation">[</span>crypto_kdf_BYTES_MIN<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">randombytes_buf</span><span class="token punctuation">(</span>master_key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> master_key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* context 固定 8 字节，标识用途 */</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> ctx<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;appmail&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">crypto_kdf_derive_from_key</span><span class="token punctuation">(</span>subkey1<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> subkey1<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> master_key<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">||</span>
        <span class="token function">crypto_kdf_derive_from_key</span><span class="token punctuation">(</span>subkey2<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> subkey2<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> master_key<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* crypto_generichash：用密钥作 MAC 的消息认证 */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> mac<span class="token punctuation">[</span>crypto_generichash_BYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> key<span class="token punctuation">[</span>crypto_generichash_KEYBYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">randombytes_buf</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>msg <span class="token operator">=</span> <span class="token string">&quot;authenticate me&quot;</span><span class="token punctuation">;</span>
    <span class="token function">crypto_generichash</span><span class="token punctuation">(</span>mac<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> mac<span class="token punctuation">,</span>
                       <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span>msg<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">,</span>
                       key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;generichash MAC: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">size_t</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">sizeof</span> mac<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%02x&quot;</span><span class="token punctuation">,</span> mac<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-流式加密-大文件分块处理" tabindex="-1"><a class="header-anchor" href="#_6-流式加密-大文件分块处理" aria-hidden="true">#</a> 6. 流式加密：大文件分块处理</h3><p>对于大文件，不应一次性把整块内容放入 <code>crypto_secretbox_easy</code>。用 <code>crypto_secretstream_xchacha20poly1305_*</code> 做分块加密流，可边读边写：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sodium.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sodium_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> key<span class="token punctuation">[</span>crypto_secretstream_xchacha20poly1305_KEYBYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">randombytes_buf</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    crypto_secretstream_xchacha20poly1305_state st<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> header<span class="token punctuation">[</span>crypto_secretstream_xchacha20poly1305_HEADERBYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">crypto_secretstream_xchacha20poly1305_init_push</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>st<span class="token punctuation">,</span> header<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> plaintext<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;chunked message&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">long</span> plen <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> ciphertext<span class="token punctuation">[</span>plen <span class="token operator">+</span> crypto_secretstream_xchacha20poly1305_ABYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> tag<span class="token punctuation">;</span>
    <span class="token function">crypto_secretstream_xchacha20poly1305_push</span><span class="token punctuation">(</span>
        <span class="token operator">&amp;</span>st<span class="token punctuation">,</span> ciphertext<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span>plaintext<span class="token punctuation">,</span> plen<span class="token punctuation">,</span>
        <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> crypto_secretstream_xchacha20poly1305_TAG_FINAL<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;header+stream ciphertext written; total %llu bytes\\n&quot;</span><span class="token punctuation">,</span>
           <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token keyword">sizeof</span> header <span class="token operator">+</span> <span class="token keyword">sizeof</span> ciphertext<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-结合语言绑定使用同一份-c-库" tabindex="-1"><a class="header-anchor" href="#_7-结合语言绑定使用同一份-c-库" aria-hidden="true">#</a> 7. 结合语言绑定使用同一份 C 库</h3>`,52),r={href:"http://golang.org/x/crypto/nacl%EF%BC%89%E3%80%81Rust%EF%BC%88sodiumoxide%EF%BC%89%E3%80%81Node%EF%BC%88libsodium-wrappers%EF%BC%89%E7%AD%89%E7%BB%91%E5%AE%9A%EF%BC%8C%E5%BA%95%E5%B1%82%E9%83%BD%E8%B0%83%E7%94%A8%E8%BF%99%E4%BB%BD",target:"_blank",rel:"noopener noreferrer"},u=s("code",null,"brew install libsodium",-1),k=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> pynacl
python3 <span class="token parameter variable">-c</span> <span class="token string">&quot;import nacl.bindings as b; print(b.sodium_init())&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Python 侧用 PyNaCl 做对称加密，与 C 端互操作：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python3 - <span class="token operator">&lt;&lt;</span><span class="token string">&#39;PY&#39;
from nacl.secret import SecretBox
box = SecretBox(b&quot;12345678901234567890123456789012&quot;)
enc = box.encrypt(b&quot;hello from python&quot;)
print(&quot;ciphertext bytes:&quot;, len(enc))
print(&quot;decrypted:&quot;, box.decrypt(enc))
PY</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若出现找不到共享库的错误，通常是因为系统未安装 libsodium 或动态库路径未指向 <code>/opt/homebrew/lib</code>。可用 <code>DYLD_LIBRARY_PATH=&quot;$(brew --prefix libsodium)/lib&quot;</code> 临时指定，或配置 <code>pip</code> 前的 <code>LDFLAGS</code> 环境变量。</p><h3 id="_8-用环境变量辅助多平台构建" tabindex="-1"><a class="header-anchor" href="#_8-用环境变量辅助多平台构建" aria-hidden="true">#</a> 8. 用环境变量辅助多平台构建</h3><p>在不同的机器（Intel/Apple Silicon/CI）上，路径可能不同。用环境变量与 <code>uname</code> 自动适配：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">SOD_PREFIX</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> libsodium<span class="token variable">)</span></span>&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PKG_CONFIG_PATH</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${SOD_PREFIX}</span>/lib/pkgconfig&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CFLAGS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${CFLAGS<span class="token operator">:-</span>}</span> <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> libsodium<span class="token variable">)</span></span>&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${LDFLAGS<span class="token operator">:-</span>}</span> <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>&quot;</span>

<span class="token comment"># 统一编译入口</span>
<span class="token function-name function">build_app</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cc <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token parameter variable">-o</span> <span class="token string">&quot;<span class="token variable">$2</span>&quot;</span> <span class="token variable">\${CFLAGS}</span> <span class="token variable">\${LDFLAGS}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-忘记调用-sodium-init-导致崩溃或未定义行为" tabindex="-1"><a class="header-anchor" href="#_1-忘记调用-sodium-init-导致崩溃或未定义行为" aria-hidden="true">#</a> 1. 忘记调用 <code>sodium_init()</code> 导致崩溃或未定义行为</h3><p>libsodium 要求在使用密码学函数前先调用 <code>sodium_init()</code>。新手最容易忘记，导致随机数生成或加密函数行为异常。请在 <code>main</code> 开头统一初始化，并检查其返回值。</p><h3 id="_2-编译时报-fatal-error-sodium-h-file-not-found" tabindex="-1"><a class="header-anchor" href="#_2-编译时报-fatal-error-sodium-h-file-not-found" aria-hidden="true">#</a> 2. 编译时报 &quot;fatal error: &#39;sodium.h&#39; file not found&quot;</h3><p>说明头文件路径未找到。确认通过 <code>pkg-config</code> 传递了 <code>--cflags</code>，或检查 Homebrew 安装路径：<code>brew --prefix libsodium</code> 输出的目录应存在于编译器的头文件搜索路径中。</p><h3 id="_3-链接时报-undefined-symbols-sodium-init" tabindex="-1"><a class="header-anchor" href="#_3-链接时报-undefined-symbols-sodium-init" aria-hidden="true">#</a> 3. 链接时报 &quot;Undefined symbols ... _sodium_init&quot;</h3><p>链接时遗漏了 <code>-lsodium</code> 或库路径。务必在编译命令末尾加上 <code>$(pkg-config --libs libsodium)</code>，或显式写 <code>-L/opt/homebrew/lib -lsodium</code>（Intel 机为 <code>/usr/local/lib</code>）。</p><h3 id="_4-先设-nonce-再设-key-的误区" tabindex="-1"><a class="header-anchor" href="#_4-先设-nonce-再设-key-的误区" aria-hidden="true">#</a> 4. 先设 nonce 再设 key 的误区</h3><p>libsodium 的很多 API 在加密前会把内部状态初始化为 zero。因此<strong>每次加密都必须使用不同的随机 nonce</strong>，绝不可复用。常见错误是固定或复用 nonce，导致加密强度崩塌。用 <code>randombytes_buf(nonce, sizeof nonce)</code> 生成每次不同的 nonce。</p><h3 id="_5-用旧版-api-踩雷" tabindex="-1"><a class="header-anchor" href="#_5-用旧版-api-踩雷" aria-hidden="true">#</a> 5. 用旧版 API 踩雷</h3><p><code>crypto_box_easy</code> / <code>crypto_secretbox_easy</code> 等新版 API 会自动处理 MAC 校验，而旧版 <code>crypto_box</code> / <code>crypto_secretbox</code> 需要手动分配 MAC 空间并自行校验。优先使用 <code>_easy</code> 系列或 <code>crypto_aead_*</code>，避免底层细节出错。</p><h3 id="_6-性能与安全注意点" tabindex="-1"><a class="header-anchor" href="#_6-性能与安全注意点" aria-hidden="true">#</a> 6. 性能与安全注意点</h3><ul><li><code>crypto_pwhash_str</code> 默认的交互式参数（OPSLIMIT_INTERACTIVE）适合登录场景；对高安全性场景应提高 OPSLIMIT 与 MEMLIMIT，但会显著增加耗时和内存。</li><li>不要自行实现协议或重排 nonce/密文，直接使用 <code>crypto_box</code> / <code>crypto_aead</code> 封装好的接口，其设计已规避大量常见攻击。</li><li>把密钥长度、nonce 长度等<strong>永远通过 <code>crypto_*_BYTES</code> 宏获取</strong>，不要硬编码数字，以免因版本差异而出错。</li><li>密码学库通常较难做 FIPS 合规，若业务有强制合规要求，需评估 libsodium 是否满足你的合规目标。</li></ul><h3 id="_7-dyld-library-path-在-macos-上默认被-sip-清空" tabindex="-1"><a class="header-anchor" href="#_7-dyld-library-path-在-macos-上默认被-sip-清空" aria-hidden="true">#</a> 7. <code>DYLD_LIBRARY_PATH</code> 在 macOS 上默认被 SIP 清空</h3><p>Apple Silicon / macOS 上，系统会出于安全考虑默认清空 <code>DYLD_LIBRARY_PATH</code>，导致动态库找不到。不要依赖它，正确的做法是：<strong>直接把 <code>/opt/homebrew/lib</code> 加入链接路径</strong>（静态链接或让可执行文件记录安装路径），或在 <code>~/.zshrc</code> 中 <code>export LDFLAGS=&quot;-L/opt/homebrew/lib&quot;</code>。若用 Python 等解释器，优先用 <code>brew install</code> 的绑定包，它们已正确链接。</p><h3 id="_8-混用不同内存分配器导致崩溃" tabindex="-1"><a class="header-anchor" href="#_8-混用不同内存分配器导致崩溃" aria-hidden="true">#</a> 8. 混用不同内存分配器导致崩溃</h3><p>libsodium 用 <code>sodium_malloc</code> 分配的内存应配套 <code>sodium_free</code> 释放。若与 <code>free()</code> / <code>realloc()</code> 混用，会造成堆损坏。务必成对使用 libsodium 的内存接口。</p><h3 id="_9-线程安全" tabindex="-1"><a class="header-anchor" href="#_9-线程安全" aria-hidden="true">#</a> 9. 线程安全</h3><p>libsodium 的核心函数（加密、签名、哈希）是<strong>线程安全的</strong>（sodium_init 后）。但在多线程中：<code>sodium_init()</code> 只应调用一次（或保证互斥），且<strong>不要在线程间共享可变状态对象</strong>（如 secretstream 状态机、generichash 状态）。每个线程用各自的 state 对象。</p><h3 id="_10-误用-randombytes-直接生成密码-密钥字符串" tabindex="-1"><a class="header-anchor" href="#_10-误用-randombytes-直接生成密码-密钥字符串" aria-hidden="true">#</a> 10. 误用 <code>randombytes</code> 直接生成密码/密钥字符串</h3><p><code>randombytes_buf</code> 产生的是<strong>二进制随机字节</strong>，可能含不可打印字符，不能直接当作字符串密钥传给需要可打印文本的接口（如某些 RPC）。要生成可打印的密钥/口令，应先用随机字节做 Base64/Hex 编码：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* 生成 32 字节随机密钥并编码为 hex 字符串 */</span>
<span class="token keyword">unsigned</span> <span class="token keyword">char</span> key<span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> hex<span class="token punctuation">[</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">randombytes_buf</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sodium_bin2hex</span><span class="token punctuation">(</span>hex<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> hex<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;hex key: %s\\n&quot;</span><span class="token punctuation">,</span> hex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-大文件一次性读入内存导致的-oom" tabindex="-1"><a class="header-anchor" href="#_11-大文件一次性读入内存导致的-oom" aria-hidden="true">#</a> 11. 大文件一次性读入内存导致的 OOM</h3><p>用 <code>crypto_secretbox_easy</code> 加密数百 MB 文件时，若一次 <code>fread</code> 全部读入，会瞬间占满内存。对大文件务必改用<strong>流式方案</strong>（见第五节第 6 条 <code>crypto_secretstream_*</code>）或分块读写。</p><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-与-shell-脚本配合做批量文件加密" tabindex="-1"><a class="header-anchor" href="#_1-与-shell-脚本配合做批量文件加密" aria-hidden="true">#</a> 1. 与 shell 脚本配合做批量文件加密</h3><p>写一个脚本遍历目录下所有 <code>.conf</code> 文件，用对称密钥加密为 <code>.enc</code>，并记录校验和：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail

<span class="token assign-left variable">KEYFILE</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>key.bin}</span>&quot;</span>
<span class="token assign-left variable">SRC_DIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${2<span class="token operator">:-</span>.<span class="token operator">/</span>configs}</span>&quot;</span>
<span class="token assign-left variable">OUT_DIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${3<span class="token operator">:-</span>.<span class="token operator">/</span>encrypted}</span>&quot;</span>

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$OUT_DIR</span>&quot;</span>

<span class="token comment"># 生成 32 字节密钥（若不存在）</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$KEYFILE</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">head</span> <span class="token parameter variable">-c</span> <span class="token number">32</span> /dev/urandom <span class="token operator">&gt;</span> <span class="token string">&quot;<span class="token variable">$KEYFILE</span>&quot;</span>
    <span class="token function">chmod</span> <span class="token number">600</span> <span class="token string">&quot;<span class="token variable">$KEYFILE</span>&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;已生成密钥: <span class="token variable">$KEYFILE</span>&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$SRC_DIR</span>&quot;</span>/*.conf<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">continue</span>
    <span class="token assign-left variable">base</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span><span class="token variable">)</span></span>&quot;</span>
    ./encrypt_file <span class="token string">&quot;<span class="token variable">$KEYFILE</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$OUT_DIR</span>/<span class="token variable">\${base}</span>.enc&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;已加密: <span class="token variable">$f</span> -&gt; <span class="token variable">\${OUT_DIR}</span>/<span class="token variable">\${base}</span>.enc&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>encrypt_file</code> 是一个用 <code>crypto_secretstream</code> 流式加密文件的 C 小程序。加密后可用 <code>shasum -a 256</code> 验证文件一致性。</p><h3 id="_2-与-openssl-对比-统一用-libsodium-做口令派生" tabindex="-1"><a class="header-anchor" href="#_2-与-openssl-对比-统一用-libsodium-做口令派生" aria-hidden="true">#</a> 2. 与 <code>openssl</code> 对比：统一用 libsodium 做口令派生</h3><p>不熟悉 libsodium 时容易用 <code>openssl passwd</code> 或自写 hash，建议统一用 Argon2id：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成一个可存库的 Argon2id 哈希</span>
./pwhash_demo <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-与-makefile-ci-集成做加密密钥的分发" tabindex="-1"><a class="header-anchor" href="#_3-与-makefile-ci-集成做加密密钥的分发" aria-hidden="true">#</a> 3. 与 Makefile / CI 集成做加密密钥的分发</h3><p>在 CI 中，把签名密钥（.sk 文件）放入加密的 secret 变量，构建时派生并写入编译产物签名：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/build.yml 片段</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 生成签名并校验
  <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    ./sign_demo &gt;/dev/null        # 确保依赖已编译
    # 用 CI secret 环境变量提供密钥派生上下文
    echo &quot;SODIUM_CTX=\${SODIUM_CTX}&quot; &gt;&gt; $GITHUB_ENV</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本地则用 Makefile 的目标封装签名流程：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">sign</span><span class="token punctuation">:</span> release.tar.gz
	./sign_tool <span class="token variable">$</span><span class="token punctuation">(</span>SIGN_KEY<span class="token punctuation">)</span> release.tar.gz release.sig
	shasum -a 256 release.tar.gz &gt; release.tar.gz.sha256

<span class="token target symbol">verify</span><span class="token punctuation">:</span>
	./verify_tool <span class="token variable">$</span><span class="token punctuation">(</span>VERIFY_PUBKEY<span class="token punctuation">)</span> release.tar.gz release.sig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-与-python-脚本批量处理用户密码" tabindex="-1"><a class="header-anchor" href="#_4-与-python-脚本批量处理用户密码" aria-hidden="true">#</a> 4. 与 Python 脚本批量处理用户密码</h3><p>把 C 端 <code>crypto_pwhash_str</code> 的哈希能力通过 PyNaCl 暴露，批量迁移明文密码库：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python3 - <span class="token operator">&lt;&lt;</span><span class="token string">&#39;PY&#39;
import sys, csv, hashlib
import nacl.pwhash

def hash_pw(pw: str) -&gt; str:
    # 使用 Argon2id（与 C 端 crypto_pwhash_str 同算法）
    return nacl.pwhash.str(pw.encode(&quot;utf-8&quot;)).decode(&quot;ascii&quot;)

with open(&quot;users.csv&quot;, newline=&quot;&quot;) as f:
    for row in csv.reader(f):
        uid, pw = row[0], row[1]
        print(f&quot;{uid},{hash_pw(pw)}&quot;)
PY</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-生产级实践清单" tabindex="-1"><a class="header-anchor" href="#_5-生产级实践清单" aria-hidden="true">#</a> 5. 生产级实践清单</h3><ul><li><strong>密钥托管</strong>：把主密钥（master key）用 <code>sodium_mlock</code> 锁定，进程结束前清零；生产环境建议用 KMS（如云厂商密钥管理服务）托管，密钥不落盘。</li><li><strong>滚动密钥</strong>：用 <code>crypto_kdf</code> 按版本号派生不同子密钥，旧版本保留解密、新版本用于加密，实现优雅的密钥轮换。</li><li><strong>审计日志</strong>：记录&quot;何时、用哪个密钥版本、加密了哪些文件&quot;到日志，便于安全事故回溯。</li><li><strong>完整性</strong>：除加密外，对明文/密文同时计算 <code>crypto_generichash</code> 或 <code>crypto_sign</code>，防止中间人篡改。</li><li><strong>测试</strong>：在 CI 中跑「加密→篡改一个字节→解密必须失败」的负面测试，确保 AEAD 完整性校验生效。</li></ul>`,49);function v(b,m){const e=t("ExternalLinkIcon");return o(),c("div",null,[d,s("p",null,[n("libsodium 提供 Python（pynacl）、Go（"),s("a",r,[n("golang.org/x/crypto/nacl）、Rust（sodiumoxide）、Node（libsodium-wrappers）等绑定，底层都调用这份"),p(e)]),n(" C 库。用 "),u,n(" 装好后，Python 侧即可：")]),k])}const _=i(l,[["render",v],["__file","libsodium.html.vue"]]);export{_ as default};
