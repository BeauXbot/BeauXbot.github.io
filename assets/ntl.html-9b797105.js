import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e as s}from"./app-26293047.js";const d={},l=s(`<h1 id="ntl-c-数论与多项式计算库" tabindex="-1"><a class="header-anchor" href="#ntl-c-数论与多项式计算库" aria-hidden="true">#</a> ntl（C++ 数论与多项式计算库）</h1><blockquote><p>Homebrew 版本 11.6.0 ｜ 主页：见官方文档 ｜ 安装：<code>brew install ntl</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>NTL（Number Theory Library）是一个高性能、可移植的 <strong>C++ 数论与多项式计算库</strong>，由 Victor Shoup 开发维护，为密码学、计算数论、代数与多项式运算提供经过精心优化的任意精度整数、有限域、多项式、矩阵等基础类型与算法。它把&quot;大整数模幂运算、有限域上的多项式算术、最大公因子、素性判定、椭圆曲线算术&quot;等复杂数学操作封装成简洁的 C++ 类，让开发者不必自行实现底层算法。</p><p>典型应用场景：公钥密码学实现（RSA、ElGamal、Paillier 等）、密码学协议原语开发、有限域与多项式运算、计算数论研究、格基约化（LLL 算法）以及教育科研中的算法验证。配合 GMP（GNU Multiple Precision Arithmetic Library）使用可获得更强的性能，其内置的 <code>ZZ</code>（任意精度整数）、<code>ZZ_p</code>（模素数域）、<code>ZZX</code>（整数多项式）等类型被学术与工业界广泛采用。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>通过 Homebrew 安装、升级、卸载，以及验证：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装（会自动拉取依赖的 GMP）</span>
brew <span class="token function">install</span> ntl

<span class="token comment"># 升级到最新版</span>
brew upgrade ntl

<span class="token comment"># 卸载</span>
brew uninstall ntl

<span class="token comment"># 验证安装成功（应输出类似 11.6.0）</span>
brew info ntl

<span class="token comment"># 查看库文件是否已生成（Apple Silicon 路径）</span>
<span class="token function">ls</span> /opt/homebrew/lib/libntl.* /opt/homebrew/include/NTL/*.h

<span class="token comment"># 用 pkg-config 确认版本（NTL 提供 pkg-config 支持）</span>
pkg-config <span class="token parameter variable">--modversion</span> ntl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>brew info ntl</code> 中显示版本号为 <code>11.6.0</code>、<code>ls</code> 能看到 <code>libntl.dylib</code> / <code>libntl.a</code> 以及 <code>NTL</code> 头文件目录即表示安装成功。若提示 <code>command not found</code>，先确认 <code>/opt/homebrew/bin</code>（Apple Silicon）或 <code>/usr/local/bin</code>（Intel）已在 PATH 中。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><p>NTL 是<strong>纯 C++ 库</strong>而非命令行程序，因此&quot;命令&quot;体现为 <code>pkg-config</code>/<code>brew</code> 查询、编译链接参数，以及库内最常用类型与函数。下表给出最常见的用法：</p><table><thead><tr><th>命令/类型/函数</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>pkg-config --cflags --libs ntl</code></td><td>输出编译与链接参数</td><td><code>c++ app.cpp $(pkg-config --cflags --libs ntl)</code></td></tr><tr><td><code>brew info ntl</code> / <code>brew --prefix ntl</code></td><td>查询版本与安装路径</td><td><code>brew --prefix ntl</code> 输出目录</td></tr><tr><td><code>ZZ</code></td><td>任意精度（变长）有符号整数</td><td><code>ZZ a = conv&lt;ZZ&gt;(&quot;12345678901234567890&quot;);</code></td></tr><tr><td><code>ZZ_p</code></td><td>模素数 p 的有限域元素</td><td><code>ZZ_p::init(p); ZZ_p x = random_ZZ_p();</code></td></tr><tr><td><code>power_mod(a, e, m)</code></td><td>大整数模幂运算（快速幂）</td><td><code>ZZ r = power_mod(a, e, m);</code></td></tr><tr><td><code>GCD(a, b)</code></td><td>计算最大公因子</td><td><code>ZZ g = GCD(a, b);</code></td></tr><tr><td><code>ProbPrime(n, t)</code></td><td>概率素性判定（Miller–Rabin，t 轮）</td><td><code>bool isp = ProbPrime(n, 20);</code></td></tr><tr><td><code>LLL()</code></td><td>格基约化（LLL 算法）</td><td><code>mat_ZZ B; LLL(B);</code></td></tr><tr><td><code>ZZX</code> / <code>ZZ_pX</code></td><td>整数/有限域上的多项式</td><td><code>ZZX f = conv&lt;ZZX&gt;(...);</code></td></tr><tr><td><code>RandomLen_ZZ(n)</code> / <code>RandomPrime_ZZ(n)</code></td><td>生成 n 位随机整数 / 随机素数</td><td><code>ZZ prime = RandomPrime_ZZ(256);</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><p>NTL 是纯库，以下示例演示如何用 brew 安装后，在 C/C++ 中链接并使用它的核心数论功能。</p><h3 id="示例-1-最小可编译的数论程序-模幂、gcd、素性判定" tabindex="-1"><a class="header-anchor" href="#示例-1-最小可编译的数论程序-模幂、gcd、素性判定" aria-hidden="true">#</a> 示例 1：最小可编译的数论程序（模幂、GCD、素性判定）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> ntl_demo.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;NTL/ZZ.h&gt;
#include &lt;iostream&gt;

using namespace std;
using namespace NTL;

int main() {
    // 任意精度整数
    ZZ a = conv&lt;ZZ&gt;(&quot;123456789012345678901234567890&quot;);
    ZZ b = conv&lt;ZZ&gt;(&quot;987654321098765432109876543210&quot;);

    cout &lt;&lt; &quot;a = &quot; &lt;&lt; a &lt;&lt; endl
         &lt;&lt; &quot;b = &quot; &lt;&lt; b &lt;&lt; endl;

    // 最大公因子
    cout &lt;&lt; &quot;GCD(a, b) = &quot; &lt;&lt; GCD(a, b) &lt;&lt; endl;

    // 模幂运算：7^100 mod 1000000007
    ZZ p = conv&lt;ZZ&gt;(&quot;1000000007&quot;);
    cout &lt;&lt; &quot;7^100 mod 1000000007 = &quot; &lt;&lt; power_mod(conv&lt;ZZ&gt;(7), conv&lt;ZZ&gt;(100), p) &lt;&lt; endl;

    // 素性判定（Miller–Rabin，20 轮）
    ZZ prime = RandomPrime_ZZ(128);
    cout &lt;&lt; &quot;随机 128 位素数: &quot; &lt;&lt; prime &lt;&lt; endl;
    cout &lt;&lt; &quot;ProbPrime(prime, 20) = &quot; &lt;&lt; ProbPrime(prime, 20) &lt;&lt; endl;
    return 0;
}
EOF</span>

<span class="token comment"># 2. 编译并链接（pkg-config 自动带入 -I 与 -L/-lntl）</span>
c++ ntl_demo.cpp <span class="token parameter variable">-o</span> ntl_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> ntl<span class="token variable">)</span></span>

<span class="token comment"># 3. 运行</span>
./ntl_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出大致为：打印两个大整数、<code>GCD(a, b) = 900000000090000000009</code>、<code>7^100 mod 1000000007 = ...</code>（一个小于模数的整数）、随机生成的 128 位素数及其素性判定 <code>1</code>。</p><h3 id="示例-2-有限域-zz-p-上的运算" tabindex="-1"><a class="header-anchor" href="#示例-2-有限域-zz-p-上的运算" aria-hidden="true">#</a> 示例 2：有限域 <code>ZZ_p</code> 上的运算</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> zzp_demo.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;NTL/ZZ_p.h&gt;
#include &lt;NTL/ZZ.h&gt;
#include &lt;iostream&gt;

using namespace std;
using namespace NTL;

int main() {
    // 初始化模数 p（素数）
    ZZ p = conv&lt;ZZ&gt;(&quot;1000000007&quot;);
    ZZ_p::init(p);

    // 域内元素运算，自动取模
    ZZ_p x = random_ZZ_p();
    ZZ_p y = random_ZZ_p();
    cout &lt;&lt; &quot;x = &quot; &lt;&lt; x &lt;&lt; endl
         &lt;&lt; &quot;y = &quot; &lt;&lt; y &lt;&lt; endl;
    cout &lt;&lt; &quot;x + y = &quot; &lt;&lt; x + y &lt;&lt; endl;
    cout &lt;&lt; &quot;x * y = &quot; &lt;&lt; x * y &lt;&lt; endl;

    // 域内乘法逆元（要求 x 非零）
    if (x != 0) {
        cout &lt;&lt; &quot;x^{-1} = &quot; &lt;&lt; inv(x) &lt;&lt; endl;
        cout &lt;&lt; &quot;x * x^{-1} = &quot; &lt;&lt; x * inv(x) &lt;&lt; endl;
    }
    return 0;
}
EOF</span>

c++ zzp_demo.cpp <span class="token parameter variable">-o</span> zzp_demo <span class="token variable"><span class="token variable">$(</span>pkg-config <span class="token parameter variable">--cflags</span> <span class="token parameter variable">--libs</span> ntl<span class="token variable">)</span></span>
./zzp_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出中的 <code>x * y</code>、<code>x + y</code> 均为模 <code>1000000007</code> 后的结果；<code>x * x^{-1} = 1</code>（在域中等于单位元），验证了求逆的正确性。</p><h3 id="示例-3-用-cmake-集成-ntl-配合-gmp" tabindex="-1"><a class="header-anchor" href="#示例-3-用-cmake-集成-ntl-配合-gmp" aria-hidden="true">#</a> 示例 3：用 CMake 集成 NTL（配合 GMP）</h3><p>写一个 <code>CMakeLists.txt</code> 并构建：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> CMakeLists.txt <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
cmake_minimum_required(VERSION 3.10)
project(ntl_demo CXX)
set(CMAKE_CXX_STANDARD 17)

find_package(PkgConfig REQUIRED)
pkg_check_modules(NTL REQUIRED IMPORTED_TARGET ntl)

add_executable(ntl_demo ntl_demo.cpp)
target_link_libraries(ntl_demo PRIVATE PkgConfig::NTL)
EOF</span>

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> build <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> build
cmake <span class="token punctuation">..</span>
<span class="token function">make</span>
./ntl_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-用-pkg-config-简化编译-避免手写路径" tabindex="-1"><a class="header-anchor" href="#_1-用-pkg-config-简化编译-避免手写路径" aria-hidden="true">#</a> 1. 用 pkg-config 简化编译，避免手写路径</h3><p>只要 <code>PKG_CONFIG_PATH</code> 指向 Homebrew 的 <code>lib/pkgconfig</code>，即可用 <code>$(pkg-config --cflags --libs ntl)</code> 自动获得头文件与链接路径，无需手写 <code>-I</code> 与 <code>-L</code>。若在命令行直接编译，等价写法为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Apple Silicon</span>
c++ demo.cpp <span class="token parameter variable">-o</span> demo -I/opt/homebrew/include -L/opt/homebrew/lib <span class="token parameter variable">-lntl</span> <span class="token parameter variable">-lgmp</span>
<span class="token comment"># Intel</span>
c++ demo.cpp <span class="token parameter variable">-o</span> demo -I/usr/local/include -L/usr/local/lib <span class="token parameter variable">-lntl</span> <span class="token parameter variable">-lgmp</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配合-gmp-获得更高性能" tabindex="-1"><a class="header-anchor" href="#_2-配合-gmp-获得更高性能" aria-hidden="true">#</a> 2. 配合 GMP 获得更高性能</h3><p>NTL 内部可选用 GMP 作为底层大整数引擎。Homebrew 的 <code>ntl</code> 默认链接 GMP，性能显著优于自带的便携实现。若手动从源码构建并希望显式启用 GMP，可配置 <code>./configure NTL_GMP_LIP=on</code>。检查你的构建是否用了 GMP：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># NTL 头文件中的宏（若为 1 表示启用 GMP 作为 LIP 引擎）</span>
<span class="token function">grep</span> <span class="token parameter variable">-r</span> <span class="token string">&quot;NTL_GMP_LIP&quot;</span> /opt/homebrew/include/NTL/ <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-随机数种子与可复现性" tabindex="-1"><a class="header-anchor" href="#_3-随机数种子与可复现性" aria-hidden="true">#</a> 3. 随机数种子与可复现性</h3><p>NTL 的随机数基于内部伪随机生成器。需要可复现结果时可用 <code>SetSeed</code> 设置种子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;NTL/ZZ.h&gt;</span></span>
<span class="token function">SetSeed</span><span class="token punctuation">(</span><span class="token generic-function"><span class="token function">conv</span><span class="token generic class-name"><span class="token operator">&lt;</span>ZZ<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 之后 random_ZZ_p() 等每次产生相同序列</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>科研与调试场景常用此技巧让实验可重复。生产环境则使用系统熵初始化，避免固定种子。</p><h3 id="_4-用-lll-做格基约化与密码分析" tabindex="-1"><a class="header-anchor" href="#_4-用-lll-做格基约化与密码分析" aria-hidden="true">#</a> 4. 用 LLL 做格基约化与密码分析</h3><p>NTL 提供完整的 <code>LLL</code> 格基约化实现，常用于基于格的密码学（如 NTRU）分析与最邻近平面攻击等研究：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;NTL/mat_ZZ.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;NTL/LLL.h&gt;</span></span>
mat_ZZ B<span class="token punctuation">;</span>
<span class="token comment">// ... 填充格基向量 ...</span>
<span class="token function">LLL</span><span class="token punctuation">(</span>B<span class="token punctuation">,</span> <span class="token number">0.99</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// delta 参数控制约化质量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>delta</code> 取值在 <code>0.25</code> 到 <code>1.0</code> 之间，越接近 1 约化越彻底但耗时越高。</p><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-编译时报-fatal-error-ntl-zz-h-file-not-found" tabindex="-1"><a class="header-anchor" href="#_1-编译时报-fatal-error-ntl-zz-h-file-not-found" aria-hidden="true">#</a> 1. 编译时报 &quot;fatal error: &#39;NTL/ZZ.h&#39; file not found&quot;</h3><p>头文件路径未找到。确认编译命令中带上 <code>$(pkg-config --cflags ntl)</code>，或用 <code>brew --prefix ntl</code> 找到安装目录并显式 <code>-I&lt;prefix&gt;/include</code>。Homebrew 的 include 默认在 <code>/opt/homebrew/include</code>。</p><h3 id="_2-链接时报-undefined-symbols-ntl-或-library-not-found-for-lntl" tabindex="-1"><a class="header-anchor" href="#_2-链接时报-undefined-symbols-ntl-或-library-not-found-for-lntl" aria-hidden="true">#</a> 2. 链接时报 &quot;Undefined symbols ... _NTL::...&quot; 或 &quot;library not found for -lntl&quot;</h3><p>链接时遗漏了 <code>-lntl</code> 或库路径。务必在命令末尾加上 <code>$(pkg-config --libs ntl)</code>，或显式写 <code>-L/opt/homebrew/lib -lntl</code>（Intel 机为 <code>/usr/local/lib</code>）。由于 NTL 依赖 GMP，若 GMP 未装或链接顺序错误，可显式追加 <code>-lgmp</code>。</p><h3 id="_3-用-g-gcc-编译-c-代码" tabindex="-1"><a class="header-anchor" href="#_3-用-g-gcc-编译-c-代码" aria-hidden="true">#</a> 3. 用 <code>g++</code>/<code>gcc</code> 编译 C++ 代码</h3><p>NTL 是 <strong>C++</strong> 库，必须用 <code>g++</code>/<code>c++</code>（或 <code>clang++</code>）编译 <code>.cpp</code>，不能用 <code>gcc</code>/<code>cc</code> 直接编译，否则会报 <code>undefined reference</code> 链接错误。头文件用 <code>&lt;NTL/ZZ.h&gt;</code> 而不是 <code>&lt;ZZ.h&gt;</code>。</p><h3 id="_4-忘初始化模数就使用-zz-p" tabindex="-1"><a class="header-anchor" href="#_4-忘初始化模数就使用-zz-p" aria-hidden="true">#</a> 4. 忘初始化模数就使用 <code>ZZ_p</code></h3><p>使用 <code>ZZ_p</code> 之前必须先调用 <code>ZZ_p::init(p)</code> 设定模数 p，否则得到的是模 0 的未定义行为。模数 p 必须为素数，且应大于要参与的运算数。</p><h3 id="_5-浮点-double-与-zz-的转换陷阱" tabindex="-1"><a class="header-anchor" href="#_5-浮点-double-与-zz-的转换陷阱" aria-hidden="true">#</a> 5. 浮点 <code>double</code> 与 <code>ZZ</code> 的转换陷阱</h3><p><code>conv&lt;ZZ&gt;(3.7)</code> 这类浮点到 ZZ 的转换行为取决于舍入，可能产生非预期结果。对大数一律从字符串或整数构造：<code>conv&lt;ZZ&gt;(&quot;...&quot;)</code>、<code>conv&lt;ZZ&gt;(123)</code>，避免经浮点中转。</p><h3 id="_6-性能与安全注意点" tabindex="-1"><a class="header-anchor" href="#_6-性能与安全注意点" aria-hidden="true">#</a> 6. 性能与安全注意点</h3><ul><li>NTL 是<strong>研究/教学友好</strong>的库，但底层算法（如默认大整数、素性判定、随机数）若不针对安全强化，<strong>不建议直接用于生产级密码学密钥生成</strong>；实际密钥与签名应使用专为此设计的库（如 OpenSSL、libsodium）。NTL 更适用于协议原型验证、算法实现与学术研究。</li><li>模幂 <code>power_mod</code>、大数 GCD 等在超大位宽下耗时明显，注意复杂度（约 O(log e) 次乘法）。</li><li><code>ProbPrime</code> 只是概率素性判定，轮数 t 越大误判概率越低（约为 <code>4^(-t)</code>）；对密码学应用还需结合确定性验证。</li><li>LLL 约化的 <code>delta</code> 越大越接近严格 LLL，但时间和内存开销随之上升，按需权衡。</li><li>Homebrew 的 <code>ntl</code> 默认以发布优化构建（含 GMP），性能已较优；如需自研构建，务必开启优化 <code>-O2</code> 并启用 GMP。</li></ul>`,51),i=[l];function t(c,o){return n(),a("div",null,i)}const u=e(d,[["render",t],["__file","ntl.html.vue"]]);export{u as default};
