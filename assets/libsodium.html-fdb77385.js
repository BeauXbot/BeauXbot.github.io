import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as c,c as o,a as e,b as n,d as l,e as s}from"./app-26293047.js";const r={},t=s(`<h1 id="libsodium-现代加密-解密-c-库" tabindex="-1"><a class="header-anchor" href="#libsodium-现代加密-解密-c-库" aria-hidden="true">#</a> libsodium（现代加密/解密 C 库）</h1><blockquote><p>Homebrew 版本 1.0.20 ｜ 主页：见官方文档 ｜ 安装：<code>brew install libsodium</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>libsodium 是一个现代、易用、可移植的加密/解密 C 库，它把 NaCl（Networking and Cryptography library）中经过实战验证的密码学原语封装成一套<strong>简洁、安全、面向误用的 API</strong>。它的核心设计哲学是&quot;默认安全&quot;——尽量避免开发者因选错算法、用错参数或误用底层细节而引入漏洞，同时提供密码学领域的多项推荐实现。</p><p>典型应用场景：消息/文件的对称与非对称加密、数字签名、密钥交换（如 X25519）、哈希与密码哈希（如 Argon2、scrypt）、一次性口令（TOTP/HOTP），以及随机数生成等。它被大量语言绑定（Python、Go、Rust、Node、PHP 等）作为底层密码学后端，广泛用于聊天工具、即时通讯、网络协议和各类需要加密能力的应用。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>通过 Homebrew 安装、升级、卸载，以及验证：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出包含一长串以 <code>$argon2id$</code> 开头的哈希，并打印 <code>密码校验通过</code>。同一密码每次运行得到的哈希不同，因为盐是随机的。</p><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-用-pkg-config-简化编译-避免手写路径" tabindex="-1"><a class="header-anchor" href="#_1-用-pkg-config-简化编译-避免手写路径" aria-hidden="true">#</a> 1. 用 pkg-config 简化编译，避免手写路径</h3><p>只要保证 <code>PKG_CONFIG_PATH</code> 指向 Homebrew 的 <code>lib/pkgconfig</code>，即可用 <code>$(pkg-config --cflags --libs libsodium)</code> 自动获得正确的头文件与链接路径，无需手写 <code>-I</code> 和 <code>-L</code>。若 CMake 使用，可这样引入：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># CMakeLists.txt 中</span>
find_package<span class="token punctuation">(</span>PkgConfig<span class="token punctuation">)</span>
pkg_check_modules<span class="token punctuation">(</span>SODIUM REQUIRED libsodium<span class="token punctuation">)</span>
target_link_libraries<span class="token punctuation">(</span>myapp PRIVATE <span class="token variable">\${SODIUM_LIBRARIES}</span><span class="token punctuation">)</span>
target_include_directories<span class="token punctuation">(</span>myapp PRIVATE <span class="token variable">\${SODIUM_INCLUDE_DIRS}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-需要-aes-加速时启用编译期宏" tabindex="-1"><a class="header-anchor" href="#_2-需要-aes-加速时启用编译期宏" aria-hidden="true">#</a> 2. 需要 AES 加速时启用编译期宏</h3><p>libsodium 在部分平台默认可检测 AES-NI 并自动启用。若需显式控制，可在编译时定义宏：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cc aes_demo.c <span class="token parameter variable">-o</span> aes_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> libsodium<span class="token variable">)</span></span>
<span class="token comment"># 若需强制开启 AES 硬件加速，可加 -Dsodium_SSE2 等构建相关宏（依赖平台）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>多数场景不必手动干预，优先使用 <code>crypto_aead_xchacha20poly1305_ietf_*</code> 这类推荐算法，其默认参数即安全。</p><h3 id="_3-内存安全-锁定密钥并清除敏感数据" tabindex="-1"><a class="header-anchor" href="#_3-内存安全-锁定密钥并清除敏感数据" aria-hidden="true">#</a> 3. 内存安全：锁定密钥并清除敏感数据</h3><p>密钥常驻内存会被换页到磁盘，存在泄露风险。用 <code>sodium_mlock</code> 锁定，用 <code>sodium_memzero</code> 或 <code>sodium_free</code> 及时清除：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">char</span> key<span class="token punctuation">[</span>crypto_secretbox_KEYBYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">randombytes_buf</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sodium_mlock</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">/* 防止被换出到磁盘 */</span>
<span class="token comment">/* ... 使用 key ... */</span>
<span class="token function">sodium_memzero</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">/* 用完后立即清零 */</span>
<span class="token function">sodium_munlock</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结合语言绑定使用同一份-c-库" tabindex="-1"><a class="header-anchor" href="#_4-结合语言绑定使用同一份-c-库" aria-hidden="true">#</a> 4. 结合语言绑定使用同一份 C 库</h3>`,42),p={href:"http://golang.org/x/crypto/nacl%EF%BC%89%E3%80%81Rust%EF%BC%88sodiumoxide%EF%BC%89%E3%80%81Node%EF%BC%88libsodium-wrappers%EF%BC%89%E7%AD%89%E7%BB%91%E5%AE%9A%EF%BC%8C%E5%BA%95%E5%B1%82%E9%83%BD%E8%B0%83%E7%94%A8%E8%BF%99%E4%BB%BD",target:"_blank",rel:"noopener noreferrer"},u=e("code",null,"brew install libsodium",-1),v=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> pynacl
python3 <span class="token parameter variable">-c</span> <span class="token string">&quot;import nacl.bindings as b; print(b.sodium_init())&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>若出现找不到共享库的错误，通常是因为系统未安装 libsodium 或动态库路径未指向 <code>/opt/homebrew/lib</code>。</p><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-忘记调用-sodium-init-导致崩溃或未定义行为" tabindex="-1"><a class="header-anchor" href="#_1-忘记调用-sodium-init-导致崩溃或未定义行为" aria-hidden="true">#</a> 1. 忘记调用 <code>sodium_init()</code> 导致崩溃或未定义行为</h3><p>libsodium 要求在使用密码学函数前先调用 <code>sodium_init()</code>。新手最容易忘记，导致随机数生成或加密函数行为异常。请在 <code>main</code> 开头统一初始化，并检查其返回值。</p><h3 id="_2-编译时报-fatal-error-sodium-h-file-not-found" tabindex="-1"><a class="header-anchor" href="#_2-编译时报-fatal-error-sodium-h-file-not-found" aria-hidden="true">#</a> 2. 编译时报 &quot;fatal error: &#39;sodium.h&#39; file not found&quot;</h3><p>说明头文件路径未找到。确认通过 <code>pkg-config</code> 传递了 <code>--cflags</code>，或检查 Homebrew 安装路径：<code>brew --prefix libsodium</code> 输出的目录应存在于编译器的头文件搜索路径中。</p><h3 id="_3-链接时报-undefined-symbols-sodium-init" tabindex="-1"><a class="header-anchor" href="#_3-链接时报-undefined-symbols-sodium-init" aria-hidden="true">#</a> 3. 链接时报 &quot;Undefined symbols ... _sodium_init&quot;</h3><p>链接时遗漏了 <code>-lsodium</code> 或库路径。务必在编译命令末尾加上 <code>$(pkg-config --libs libsodium)</code>，或显式写 <code>-L/opt/homebrew/lib -lsodium</code>（Intel 机为 <code>/usr/local/lib</code>）。</p><h3 id="_4-先设-nonce-再设-key-的误区" tabindex="-1"><a class="header-anchor" href="#_4-先设-nonce-再设-key-的误区" aria-hidden="true">#</a> 4. 先设 nonce 再设 key 的误区</h3><p>libsodium 的很多 API 在加密前会把内部状态初始化为 zero。因此<strong>每次加密都必须使用不同的随机 nonce</strong>，绝不可复用。常见错误是固定或复用 nonce，导致加密强度崩塌。用 <code>randombytes_buf(nonce, sizeof nonce)</code> 生成每次不同的 nonce。</p><h3 id="_5-用旧版-api-踩雷" tabindex="-1"><a class="header-anchor" href="#_5-用旧版-api-踩雷" aria-hidden="true">#</a> 5. 用旧版 API 踩雷</h3><p><code>crypto_box_easy</code> / <code>crypto_secretbox_easy</code> 等新版 API 会自动处理 MAC 校验，而旧版 <code>crypto_box</code> / <code>crypto_secretbox</code> 需要手动分配 MAC 空间并自行校验。优先使用 <code>_easy</code> 系列或 <code>crypto_aead_*</code>，避免底层细节出错。</p><h3 id="_6-性能与安全注意点" tabindex="-1"><a class="header-anchor" href="#_6-性能与安全注意点" aria-hidden="true">#</a> 6. 性能与安全注意点</h3><ul><li><code>crypto_pwhash_str</code> 默认的交互式参数（OPSLIMIT_INTERACTIVE）适合登录场景；对高安全性场景应提高 OPSLIMIT 与 MEMLIMIT，但会显著增加耗时和内存。</li><li>不要自行实现协议或重排 nonce/密文，直接使用 <code>crypto_box</code> / <code>crypto_aead</code> 封装好的接口，其设计已规避大量常见攻击。</li><li>把密钥长度、nonce 长度等<strong>永远通过 <code>crypto_*_BYTES</code> 宏获取</strong>，不要硬编码数字，以免因版本差异而出错。</li><li>密码学库通常较难做 FIPS 合规，若业务有强制合规要求，需评估 libsodium 是否满足你的合规目标。</li></ul>`,15);function b(m,h){const i=d("ExternalLinkIcon");return c(),o("div",null,[t,e("p",null,[n("libsodium 提供 Python（pynacl）、Go（"),e("a",p,[n("golang.org/x/crypto/nacl）、Rust（sodiumoxide）、Node（libsodium-wrappers）等绑定，底层都调用这份"),l(i)]),n(" C 库。用 "),u,n(" 装好后，Python 侧即可：")]),v])}const g=a(r,[["render",b],["__file","libsodium.html.vue"]]);export{g as default};
