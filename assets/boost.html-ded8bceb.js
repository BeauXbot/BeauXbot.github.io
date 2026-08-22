import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e}from"./app-09e0be14.js";const t={},o=e(`<h1 id="boost-c-标准库扩展库集合-作为依赖-开发库" tabindex="-1"><a class="header-anchor" href="#boost-c-标准库扩展库集合-作为依赖-开发库" aria-hidden="true">#</a> boost（C++ 标准库扩展库集合（作为依赖/开发库））</h1><blockquote><p>Homebrew 版本 1.x ｜ 主页：见官方文档 ｜ 安装：<code>brew install boost</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>Boost 是一套经过同行评审、广泛使用的 C++ 标准库扩展集合，为开发者提供智能指针、正则表达式、线程、文件系统、图算法、序列化、asio 网络等大量高质量通用组件。它解决的痛点是 C++ 标准库功能覆盖不足、跨平台差异大的问题：很多组件后来直接进入了 C++ 标准库（如 <code>shared_ptr</code>、<code>bind</code>、<code>filesystem</code>、<code>regex</code>），因此 Boost 也是 C++ 标准演进的重要&quot;试验田&quot;。典型应用场景是作为第三方开发依赖，为 C++ 项目提供标准库之外的成熟功能，也常被 CMake、OpenSSL 等软件作为底层依赖被编译安装。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装（默认编译为动态库）</span>
brew <span class="token function">install</span> boost

<span class="token comment"># 安装静态库版本</span>
brew <span class="token function">install</span> boost --build-from-source

<span class="token comment"># 升级到最新版本</span>
brew upgrade boost

<span class="token comment"># 卸载</span>
brew uninstall boost

<span class="token comment"># 查看版本信息</span>
brew info boost

<span class="token comment"># 查看编译时选项（如是否启用 icu/mpi 等）</span>
brew info boost <span class="token parameter variable">--json</span><span class="token operator">=</span>v2 <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">40</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，运行 <code>brew info boost</code> 会显示版本号、安装位置及依赖情况。库文件一般位于 <code>/opt/homebrew/lib/libboost_*.dylib</code>（Apple Silicon）或 <code>/usr/local/lib/libboost_*.dylib</code>（Intel），头文件位于 <code>/opt/homebrew/include/boost/</code>。若头文件找不到，确认 Homebrew 前缀（<code>$(brew --prefix)</code>）下的 <code>include</code> 目录已在编译器的搜索路径中。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>brew install boost</code></td><td>安装 boost 库</td><td><code>brew install boost</code></td></tr><tr><td><code>brew upgrade boost</code></td><td>升级到最新版</td><td><code>brew upgrade boost</code></td></tr><tr><td><code>brew uninstall boost</code></td><td>卸载 boost 库</td><td><code>brew uninstall boost</code></td></tr><tr><td><code>brew info boost</code></td><td>查看版本、依赖、安装位置</td><td><code>brew info boost</code></td></tr><tr><td><code>brew list boost</code></td><td>列出已安装的所有文件</td><td><code>brew list boost</code></td></tr><tr><td><code>brew --prefix boost</code></td><td>查看 boost 的安装前缀路径</td><td><code>brew --prefix boost</code></td></tr><tr><td><code>brew leaves</code> / <code>brew deps boost</code></td><td>查看依赖关系</td><td><code>brew deps boost</code></td></tr><tr><td><code>brew doctor</code></td><td>检查 brew 环境是否健康</td><td><code>brew doctor</code></td></tr><tr><td><code>b2</code> / <code>bjam</code></td><td>Boost.Build 构建工具（源码编译时才用到）</td><td><code>b2 --help</code></td></tr><tr><td><code>brew info boost --json=v2</code></td><td>以 JSON 输出版本与编译选项</td><td><code>brew info boost --json=v2</code></td></tr><tr><td><code>pkg-config --modversion boost</code></td><td>查询已安装版本（若启用 pkg-config）</td><td><code>pkg-config --modversion boost</code></td></tr></tbody></table><blockquote><p>说明：<code>b2</code>/<code>bjam</code> 是 Boost 自带的构建工具，仅在使用源码方式编译 Boost 或自行构建 boost 组件时使用；通过 Homebrew 安装的二进制库通常不需要直接调用它们。</p></blockquote><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><p>由于 Boost 是纯开发库，下面的示例演示如何使用 Homebrew 安装的 Boost 在 C/C++ 中链接并运行一个最小程序。</p><h3 id="示例-1-最小可运行程序-使用-boost-lexical-cast-与正则" tabindex="-1"><a class="header-anchor" href="#示例-1-最小可运行程序-使用-boost-lexical-cast-与正则" aria-hidden="true">#</a> 示例 1：最小可运行程序（使用 boost::lexical_cast 与正则）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> demo.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;boost/lexical_cast.hpp&gt;
#include &lt;boost/regex.hpp&gt;
#include &lt;iostream&gt;

int main() {
    // 字符串转数字
    int n = boost::lexical_cast&lt;int&gt;(&quot;42&quot;);
    std::cout &lt;&lt; &quot;n = &quot; &lt;&lt; n &lt;&lt; std::endl;

    // 正则匹配
    boost::regex re(&quot;\\\\d+&quot;);
    std::string s = &quot;Order 123 shipped&quot;;
    if (boost::regex_search(s, re))
        std::cout &lt;&lt; &quot;matched digits in: &quot; &lt;&lt; s &lt;&lt; std::endl;

    return 0;
}
EOF</span>

<span class="token comment"># 2. 用 clang++ 编译（-lboost_regex 用于正则组件）</span>
clang++ <span class="token parameter variable">-std</span><span class="token operator">=</span>c++17 <span class="token parameter variable">-O2</span> demo.cpp <span class="token parameter variable">-o</span> demo <span class="token parameter variable">-lboost_regex</span>

<span class="token comment"># 3. 运行</span>
./demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>n = 42
matched digits in: Order 123 shipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：<code>boost::regex</code> 依赖单独的 <code>libboost_regex</code>；如果只用了头文件组件（如 lexical_cast、smart_ptr），则无需显式链接任何库。</p></blockquote><h3 id="示例-2-链接-asio-网络库的最小程序" tabindex="-1"><a class="header-anchor" href="#示例-2-链接-asio-网络库的最小程序" aria-hidden="true">#</a> 示例 2：链接 asio 网络库的最小程序</h3><p>asio 是 Boost 中较&quot;重&quot;的组件，需要链接 <code>libboost_system</code>（老版本）或配合 <code>-pthread</code> 使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> net.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;boost/asio.hpp&gt;
#include &lt;iostream&gt;

int main() {
    boost::asio::io_context io;
    boost::asio::steady_timer t(io, boost::asio::chrono::milliseconds(100));
    t.wait(); // 阻塞等待 100ms
    std::cout &lt;&lt; &quot;asio timer done&quot; &lt;&lt; std::endl;
    return 0;
}
EOF</span>

<span class="token comment"># 2. 编译（asio 需要线程库）</span>
clang++ <span class="token parameter variable">-std</span><span class="token operator">=</span>c++17 net.cpp <span class="token parameter variable">-o</span> net <span class="token parameter variable">-lboost_system</span> <span class="token parameter variable">-pthread</span>

<span class="token comment"># 3. 运行</span>
./net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>asio timer done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-3-使用-cmake-链接-boost-更推荐的方式" tabindex="-1"><a class="header-anchor" href="#示例-3-使用-cmake-链接-boost-更推荐的方式" aria-hidden="true">#</a> 示例 3：使用 CMake 链接 Boost（更推荐的方式）</h3><p>在项目里创建 <code>CMakeLists.txt</code>：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.15</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>boost_demo CXX<span class="token punctuation">)</span>

<span class="token keyword">find_package</span><span class="token punctuation">(</span>Boost REQUIRED COMPONENTS regex system<span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span>demo demo.cpp<span class="token punctuation">)</span>
<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span>demo <span class="token namespace">PRIVATE</span> <span class="token inserted class-name">Boost::regex</span> <span class="token inserted class-name">Boost::system</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 配置并编译</span>
cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build
cmake <span class="token parameter variable">--build</span> build

<span class="token comment"># 2. 运行</span>
./build/demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>find_package(Boost)</code> 会自动定位 Homebrew 安装的头文件与库路径，省去手动指定 <code>-I</code>/<code>-L</code> 的麻烦。</p><h3 id="示例-4-常用组件代码速览" tabindex="-1"><a class="header-anchor" href="#示例-4-常用组件代码速览" aria-hidden="true">#</a> 示例 4：常用组件代码速览</h3><p>下面的片段涵盖 Boost 里最常被使用的几类组件，帮你快速熟悉 API 形态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> components.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;boost/smart_ptr.hpp&gt;
#include &lt;boost/container/vector.hpp&gt;
#include &lt;boost/algorithm/string.hpp&gt;
#include &lt;boost/format.hpp&gt;
#include &lt;boost/filesystem.hpp&gt;
#include &lt;iostream&gt;

int main() {
    // 智能指针：make_shared
    auto p = boost::make_shared&lt;int&gt;(42);

    // 容器：boost::container::vector
    boost::container::vector&lt;int&gt; v{1, 2, 3};

    // 算法：字符串切分 / 转小写
    std::string s = &quot;Hello,World&quot;;
    std::vector&lt;std::string&gt; parts;
    boost::split(parts, s, boost::is_any_of(&quot;,&quot;));
    std::cout &lt;&lt; &quot;first part: &quot; &lt;&lt; parts[0] &lt;&lt; std::endl;

    // format：类型安全的格式化
    std::cout &lt;&lt; boost::format(&quot;%s is %d years old&quot;) % &quot;Alice&quot; % *p &lt;&lt; std::endl;

    // filesystem：目录遍历
    boost::filesystem::path d = boost::filesystem::current_path();
    std::cout &lt;&lt; &quot;cwd: &quot; &lt;&lt; d &lt;&lt; std::endl;

    return 0;
}
EOF</span>

<span class="token comment"># 编译（filesystem 是静态库内嵌的 header-only，通常无需单独 -l；旧版本可能需要 -lboost_filesystem）</span>
clang++ <span class="token parameter variable">-std</span><span class="token operator">=</span>c++17 components.cpp <span class="token parameter variable">-o</span> components
./components
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-5-线程与原子-boost-thread-boost-atomic" tabindex="-1"><a class="header-anchor" href="#示例-5-线程与原子-boost-thread-boost-atomic" aria-hidden="true">#</a> 示例 5：线程与原子（boost::thread / boost::atomic）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> thread.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;boost/thread.hpp&gt;
#include &lt;boost/atomic.hpp&gt;
#include &lt;boost/bind/bind.hpp&gt;
#include &lt;iostream&gt;

boost::atomic&lt;int&gt; counter{0};

void work() {
    for (int i = 0; i &lt; 1000; ++i) counter.fetch_add(1);
}

int main() {
    boost::thread_group tg;
    for (int i = 0; i &lt; 4; ++i) tg.create_thread(&amp;work);
    tg.join_all();
    std::cout &lt;&lt; &quot;counter = &quot; &lt;&lt; counter.load() &lt;&lt; std::endl;
    return 0;
}
EOF</span>

<span class="token comment"># 链接线程库</span>
clang++ <span class="token parameter variable">-std</span><span class="token operator">=</span>c++17 thread.cpp <span class="token parameter variable">-o</span> thread <span class="token parameter variable">-lboost_thread</span> <span class="token parameter variable">-pthread</span>
./thread
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行输出（每次累加结果一致，证明原子性生效）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>counter = 4000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_5-1-判断某个组件是否为-header-only" tabindex="-1"><a class="header-anchor" href="#_5-1-判断某个组件是否为-header-only" aria-hidden="true">#</a> 5.1 判断某个组件是否为 header-only</h3><p>Boost 组件分两类，这决定了你是否需要链接库：</p><ul><li><strong>header-only</strong>（只含头文件，无需链接）：<code>smart_ptr</code>、<code>lexical_cast</code>、<code>container</code>、<code>algorithm</code>、<code>variant</code>、<code>optional</code>、<code>format</code>、<code>bimap</code>、<code>property_tree</code> 等。</li><li><strong>需要链接</strong>（有独立 <code>.a</code>/<code>.dylib</code>）：<code>regex</code>、<code>filesystem</code>、<code>system</code>、<code>thread</code>、<code>program_options</code>、<code>serialization</code>、<code>locale</code>、<code>date_time</code>、<code>graph</code>、<code>random</code>、<code>wave</code>、<code>stacktrace</code> 等。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看 Homebrew 实际产出了哪些库文件，据此判断要链接谁</span>
<span class="token function">ls</span> <span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>/lib/libboost_* <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/.*libboost_//; s/\\..*//&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输出里列出名字的组件，用对应的组件时就要加 <code>-lboost_&lt;名字&gt;</code>。</p><h3 id="_5-2-cmake-进阶配置" tabindex="-1"><a class="header-anchor" href="#_5-2-cmake-进阶配置" aria-hidden="true">#</a> 5.2 CMake 进阶配置</h3><p><code>find_package(Boost)</code> 的完整形态支持版本约束、必要组件、静态/动态切换等：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token comment"># 要求版本 &gt;= 1.76 且需要 regex、filesystem、thread 三个组件，找不到直接报错</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>Boost <span class="token number">1.76</span> REQUIRED COMPONENTS regex filesystem thread<span class="token punctuation">)</span>

<span class="token comment"># 与 vcpkg/conan 等同时使用时强制使用 CMake 提供的 targets</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>Boost REQUIRED COMPONENTS system<span class="token punctuation">)</span>
<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span>app <span class="token namespace">PRIVATE</span> <span class="token inserted class-name">Boost::system</span><span class="token punctuation">)</span>

<span class="token comment"># 需要查看/调整 Boost 的版本或路径时</span>
<span class="token keyword">message</span><span class="token punctuation">(</span>STATUS <span class="token string">&quot;Boost version: <span class="token interpolation"><span class="token punctuation">\${</span><span class="token variable">Boost_VERSION_STRING</span><span class="token punctuation">}</span></span>&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">message</span><span class="token punctuation">(</span>STATUS <span class="token string">&quot;Boost lib dir : <span class="token interpolation"><span class="token punctuation">\${</span><span class="token variable">Boost_LIBRARY_DIRS</span><span class="token punctuation">}</span></span>&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CMake 常见变量：</p><ul><li><code>\${Boost_INCLUDE_DIRS}</code> — 头文件目录</li><li><code>\${Boost_LIBRARY_DIRS}</code> — 库目录</li><li><code>\${Boost_LIBRARIES}</code> — 需要链接的库列表（用旧式 <code>target_link_libraries(app \${Boost_LIBRARIES})</code> 时用）</li><li><code>\${Boost_&lt;COMPONENT&gt;_LIBRARY}</code> — 单个组件的库路径</li></ul><p>建议优先使用 <code>Boost::xxx</code> 这样的 imported target 而非裸变量，因为 target 会自动带上头文件目录、传递性依赖等属性。</p><h3 id="_5-3-手动编译-完整编译命令模板" tabindex="-1"><a class="header-anchor" href="#_5-3-手动编译-完整编译命令模板" aria-hidden="true">#</a> 5.3 手动编译：完整编译命令模板</h3><p>不用 CMake 时，手动指定头文件与库路径的通用模板：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">CXX</span><span class="token operator">=</span>clang++
<span class="token assign-left variable">STD</span><span class="token operator">=</span>-std<span class="token operator">=</span>c++17
<span class="token assign-left variable">BOOST_PREFIX</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>
<span class="token assign-left variable">INC</span><span class="token operator">=</span><span class="token string">&quot;-I<span class="token variable">\${BOOST_PREFIX}</span>/include&quot;</span>
<span class="token assign-left variable">LIB</span><span class="token operator">=</span><span class="token string">&quot;-L<span class="token variable">\${BOOST_PREFIX}</span>/lib&quot;</span>

<span class="token comment"># 只用到 header-only 组件</span>
<span class="token variable">$CXX</span> <span class="token variable">$STD</span> <span class="token variable">$INC</span> main.cpp <span class="token parameter variable">-o</span> app

<span class="token comment"># 用到需要链接的组件（regex、filesystem、thread）</span>
<span class="token variable">$CXX</span> <span class="token variable">$STD</span> <span class="token variable">$INC</span> main.cpp <span class="token parameter variable">-o</span> app <span class="token variable">$LIB</span> <span class="token parameter variable">-lboost_regex</span> <span class="token parameter variable">-lboost_filesystem</span> <span class="token parameter variable">-lboost_system</span> <span class="token parameter variable">-lboost_thread</span> <span class="token parameter variable">-pthread</span>

<span class="token comment"># 动态库运行时路径（让程序在任何目录都能找到 dylib）</span>
<span class="token variable">$CXX</span> <span class="token variable">$STD</span> <span class="token variable">$INC</span> main.cpp <span class="token parameter variable">-o</span> app <span class="token variable">$LIB</span> <span class="token parameter variable">-lboost_regex</span> -Wl,-rpath,<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>/lib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>技巧：加 <code>-Wl,-rpath</code> 后，程序运行时不依赖 <code>DYLD_LIBRARY_PATH</code>，换目录执行也不会报&quot;找不到动态库&quot;。</p></blockquote><h3 id="_5-4-指定版本与多版本共存" tabindex="-1"><a class="header-anchor" href="#_5-4-指定版本与多版本共存" aria-hidden="true">#</a> 5.4 指定版本与多版本共存</h3><p>系统可能同时存在多个 Boost（如 Python 自带的旧版 + Homebrew 的新版）。手动编译时用 <code>-I</code>/<code>-L</code> 显式锁定 Homebrew 路径；运行时用 <code>otool -L</code> 确认实际链接版本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>otool <span class="token parameter variable">-L</span> ./app        <span class="token comment"># macOS 查看动态依赖</span>
ldd ./app             <span class="token comment"># Linux 查看动态依赖</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如需临时指定运行时库路径（不推荐作为长期方案）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">DYLD_LIBRARY_PATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>/lib ./app
<span class="token builtin class-name">export</span> <span class="token assign-left variable">LD_LIBRARY_PATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>/lib  <span class="token comment"># Linux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-相关环境变量-build-阶段" tabindex="-1"><a class="header-anchor" href="#_5-5-相关环境变量-build-阶段" aria-hidden="true">#</a> 5.5 相关环境变量（Build 阶段）</h3><p>Homebrew 的 boost 通常已带好配置，但在源码编译（<code>b2</code>）或让工具找到 Boost 时可设置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 让 b2 指定安装前缀</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">BOOST_BUILD_DIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>&quot;</span>

<span class="token comment"># 某些构建系统通过 BOOST_ROOT 找 Boost 安装根</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">BOOST_ROOT</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">BOOST_INCLUDEDIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${BOOST_ROOT}</span>/include&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">BOOST_LIBRARYDIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${BOOST_ROOT}</span>/lib&quot;</span>

<span class="token comment"># pkg-config 手动索引到 Homebrew（boost 若带 .pc 文件）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PKG_CONFIG_PATH</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>/lib/pkgconfig:<span class="token variable">$PKG_CONFIG_PATH</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6-源码编译-需要额外组件如-icu-mpi-时" tabindex="-1"><a class="header-anchor" href="#_5-6-源码编译-需要额外组件如-icu-mpi-时" aria-hidden="true">#</a> 5.6 源码编译（需要额外组件如 ICU/MPI 时）</h3><p>Homebrew 默认构建未必开启 <code>icu</code>、<code>mpi</code>、<code>python</code> 等。需要时从源码自编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 先卸载默认版本</span>
brew uninstall boost

<span class="token comment"># 2. 用临时 Formula 自定义编译选项</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> boost-dev.rb <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
class BoostDev &lt; Formula
  desc &quot;Boost with ICU/MPI&quot;
  homepage &quot;https://www.boost.org&quot;
  url &quot;https://archives.boost.io/release/1.85.0/source/boost_1_85_0.tar.bz2&quot;
  sha256 &quot;YOUR_REAL_SHA256&quot;  # 替换为官方 tarball 的真实 sha256 校验和
  head &quot;https://github.com/boostorg/boost.git&quot;
  option &quot;with-icu&quot;, &quot;Build with ICU support&quot;
  option &quot;with-mpi&quot;, &quot;Build with MPI support&quot;
  def install
    # ... 实际编译逻辑
  end
end
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>更省事的做法：直接用 Homebrew 官方公式的扩展版（社区有 <code>boost@1.xx</code>、<code>boost-python</code>、<code>boost-mpi</code> 等独立配方），需要 ICU/MPI 时 <code>brew search boost</code> 找对应公式，避免手动折腾 b2。源码编译的详细参数可用 <code>b2 --help</code> 或官方文档查看，常用构建参数如 <code>cxxflags</code>、<code>link=static/shared</code>、<code>threading=single/multi</code>。</p></blockquote><h3 id="_5-7-并行编译加速" tabindex="-1"><a class="header-anchor" href="#_5-7-并行编译加速" aria-hidden="true">#</a> 5.7 并行编译加速</h3><p>Boost 是知名的&quot;重编译&quot;依赖。如果你的项目直接引用源码构建 Boost，用并行线程加速：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 b2 中启用 8 线程</span>
b2 <span class="token parameter variable">-j8</span>

<span class="token comment"># 若把 Boost 源码作为第三方构建（如 CMake 的 ExternalProject）</span>
cmake <span class="token parameter variable">--build</span> build <span class="token parameter variable">-j8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><p><strong>头文件找不到</strong>：报错 <code>boost/xxx.hpp: No such file or directory</code>，多半是没把 <code>$(brew --prefix boost)/include</code> 加入 <code>-I</code> 搜索路径。用 <code>brew --prefix boost</code> 确认安装位置，并检查编译器命令是否带了正确的 <code>-I</code> 参数。</p></li><li><p><strong>链接错误 <code>ld: symbol(s) not found</code> 或 <code>Undefined symbols</code></strong>：说明某个组件库没链接（如用了 <code>regex</code> 却没加 <code>-lboost_regex</code>），或链接顺序不对（库应放在源文件之后）。用 CMake 的 <code>find_package(Boost COMPONENTS ...)</code> 可自动处理。</p></li><li><p><strong>运行时找不到动态库 <code>dyld: Library not loaded: libboost_xxx.dylib</code></strong>：一般是链接了动态库但运行时路径未生效，或机器上有多版本 boost。可检查 <code>otool -L ./可执行文件</code> 确认依赖的版本，必要时设置 <code>DYLD_LIBRARY_PATH</code> 指向对应目录，或重新编译统一到同一版本。长期方案是链接时加 <code>-Wl,-rpath,$(brew --prefix boost)/lib</code>。</p></li><li><p><strong>多版本 Boost 冲突</strong>：系统可能自带旧版 boost（如 macOS 的 Python 依赖），手动编译时若 <code>-I</code>/<code>-L</code> 顺序不对可能误用系统库。优先显式指定 Homebrew 路径，并让 CMake 的 <code>find_package</code> 命中正确版本。检查 <code>echo $BOOST_ROOT</code> / <code>echo $BOOST_INCLUDEDIR</code> 是否被意外设置指向旧版本。</p></li><li><p><strong>编译时间与体积</strong>：Boost 头文件很大，首次编译较慢。若仅用头文件组件（如 <code>smart_ptr</code>、<code>lexical_cast</code>），尽量只 <code>#include</code> 所需头文件，避免 <code>#include &lt;boost/...&gt;</code> 全集，以减小编译单元、加快构建。可配合预编译头文件（PCH）或 ccache 缓存重复编译。</p></li><li><p><strong>与 C++ 标准版本配合</strong>：新版本 Boost 要求 C++11 及以上（1.8x 后默认要求 C++14/17）。编译时用 <code>-std=c++17</code> 等明确指定标准，避免旧标准下某些组件 API 不兼容。</p></li><li><p><strong>链接静态库时的顺序问题</strong>：Boost 静态库之间也存在依赖（如 <code>filesystem</code> 依赖 <code>system</code>），手动链接时顺序必须正确：被依赖的库放后面。建议 <code>-lboost_filesystem -lboost_system</code>，写反了会报 undefined symbol。用 CMake 的 imported target 可自动处理这种传递依赖。</p></li><li><p><strong><code>-lboost_system</code> 在新版本可能不存在</strong>：Boost 1.69 之后 <code>system</code> 库被并入 header-only，部分组件不再需要单独链接 <code>libboost_system</code>。若链接报&quot;找不到 libboost_system&quot;，先看 <code>ls $(brew --prefix boost)/lib/libboost_*</code> 里是否真有该库，没有就改用官方推荐的目标组件链接方式。</p></li><li><p><strong>与 vcpkg / Conan 混用</strong>：若机器上同时装了 Homebrew、vcpkg、Conan 的 Boost，<code>find_package</code> 可能命中错误的那个。通过 <code>Boost_ROOT</code> 显式指定，或检查 CMake 输出中的 <code>Boost_INCLUDE_DIRS</code> 指向。Conan 项目可用 <code>conanfile.txt</code> 声明依赖。</p></li><li><p><strong>安全与 ABI 注意</strong>：C++ 标准库（libc++ vs libstdc++）不兼容，混用不同编译器/标准库编译的 boost 库可能导致崩溃或未定义行为。尽量统一用同一编译器（如都 clang++ / 都 g++）编译程序与链接 boost 库；开启 <code>-stdlib=libc++</code>（clang 默认）时不要混入 gcc 的 libstdc++ 版本库。</p></li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_7-1-与-makefile-集成" tabindex="-1"><a class="header-anchor" href="#_7-1-与-makefile-集成" aria-hidden="true">#</a> 7.1 与 Makefile 集成</h3><p>写一个简洁的 Makefile，自动获取 Homebrew 前缀、处理头文件/库路径：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment"># Makefile</span>
CXX      <span class="token operator">?=</span> clang++
CXXFLAGS <span class="token operator">?=</span> -std<span class="token operator">=</span>c++17 -O2 -Wall
BOOST    <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> brew --prefix boost<span class="token punctuation">)</span>
CPPFLAGS <span class="token operator">+=</span> -I<span class="token variable">$</span><span class="token punctuation">(</span>BOOST<span class="token punctuation">)</span>/<span class="token keyword">include</span>
LDFLAGS  <span class="token operator">+=</span> -L<span class="token variable">$</span><span class="token punctuation">(</span>BOOST<span class="token punctuation">)</span>/lib
LDLIBS   <span class="token operator">+=</span> -lboost_regex -lboost_filesystem -lboost_system -pthread

TARGET <span class="token operator">:=</span> app
SRCS   <span class="token operator">:=</span> main.cpp net.cpp

<span class="token target symbol"><span class="token variable">$</span>(TARGET)</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>SRCS<span class="token punctuation">)</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>CXX<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CXXFLAGS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CPPFLAGS<span class="token punctuation">)</span> <span class="token variable">$^</span> -o <span class="token variable">$@</span> <span class="token variable">$</span><span class="token punctuation">(</span>LDFLAGS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>LDLIBS<span class="token punctuation">)</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f <span class="token variable">$</span><span class="token punctuation">(</span>TARGET<span class="token punctuation">)</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用法：<code>make</code>、<code>make clean</code>。</p><h3 id="_7-2-与-xmake-集成" tabindex="-1"><a class="header-anchor" href="#_7-2-与-xmake-集成" aria-hidden="true">#</a> 7.2 与 xmake 集成</h3><p>xmake 能自动拉取并集成 Boost：</p><div class="language-lua line-numbers-mode" data-ext="lua"><pre class="language-lua"><code><span class="token comment">-- xmake.lua</span>
<span class="token function">add_requires</span><span class="token punctuation">(</span><span class="token string">&quot;boost&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>configs <span class="token operator">=</span> <span class="token punctuation">{</span>shared <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">target</span><span class="token punctuation">(</span><span class="token string">&quot;app&quot;</span><span class="token punctuation">)</span>
    <span class="token function">set_kind</span><span class="token punctuation">(</span><span class="token string">&quot;binary&quot;</span><span class="token punctuation">)</span>
    <span class="token function">add_files</span><span class="token punctuation">(</span><span class="token string">&quot;src/*.cpp&quot;</span><span class="token punctuation">)</span>
    <span class="token function">add_packages</span><span class="token punctuation">(</span><span class="token string">&quot;boost&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>xmake f <span class="token operator">&amp;&amp;</span> xmake
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-3-与-bazel-cmake-fetchcontent-集成" tabindex="-1"><a class="header-anchor" href="#_7-3-与-bazel-cmake-fetchcontent-集成" aria-hidden="true">#</a> 7.3 与 Bazel / CMake FetchContent 集成</h3><p>需要从源码拉取指定版本 Boost 时，可用 CMake 的 FetchContent：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token keyword">include</span><span class="token punctuation">(</span>FetchContent<span class="token punctuation">)</span>
<span class="token function">FetchContent_Declare</span><span class="token punctuation">(</span>
  boost
  URL      https://archives.boost.io/release/<span class="token number">1.85.0</span>/source/boost_1_85_0.tar.bz2
  DOWNLOAD_EXTRACT_TIMESTAMP <span class="token boolean">TRUE</span>
<span class="token punctuation">)</span>
<span class="token comment"># 通常仍需借助 boost.cmake / cmake subproject，或用 Hunter、Conan 更省心</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>直接 FetchContent 整个 Boost 编译较慢，生产环境更推荐用 Conan、vcpkg 或系统的包管理器来交付 Boost，便于版本管理与缓存。</p></blockquote><h3 id="_7-4-与其它命令配合做格式转换-批处理" tabindex="-1"><a class="header-anchor" href="#_7-4-与其它命令配合做格式转换-批处理" aria-hidden="true">#</a> 7.4 与其它命令配合做格式转换 / 批处理</h3><p>Boost 常被用作数据处理流水线的一环。例如用 <code>boost::program_options</code> 解析命令行、配合 <code>lexical_cast</code> 批量转换，再通过管道把结果交给其它工具：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用 boost 程序读入行、把每行首列数字翻倍后输出，再交给 sort 排序</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> scale.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;boost/lexical_cast.hpp&gt;
#include &lt;boost/algorithm/string.hpp&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
int main() {
    std::string line;
    while (std::getline(std::cin, line)) {
        std::vector&lt;std::string&gt; f;
        boost::split(f, line, boost::is_any_of(&quot; \\t&quot;));
        double v = boost::lexical_cast&lt;double&gt;(f[0]) * 2.0;
        std::cout &lt;&lt; v &lt;&lt; &quot; &quot; &lt;&lt; boost::algorithm::join(std::vector&lt;std::string&gt;(f.begin()+1, f.end()), &quot; &quot;) &lt;&lt; &quot;\\n&quot;;
    }
    return 0;
}
EOF</span>
clang++ <span class="token parameter variable">-std</span><span class="token operator">=</span>c++17 scale.cpp <span class="token parameter variable">-o</span> scale
<span class="token builtin class-name">printf</span> <span class="token string">&#39;3 alpha\\n5 beta\\n1 gamma\\n&#39;</span> <span class="token operator">|</span> ./scale <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-n</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2 gamma
6 alpha
10 beta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-5-批量编译-源码构建时的脚本自动化" tabindex="-1"><a class="header-anchor" href="#_7-5-批量编译-源码构建时的脚本自动化" aria-hidden="true">#</a> 7.5 批量编译（源码构建时的脚本自动化）</h3><p>当需要给不同架构/标准构建多套 Boost 时，用脚本循环：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail
<span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span> boost<span class="token variable">)</span></span>&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">std</span> <span class="token keyword">in</span> c++14 c++17<span class="token punctuation">;</span> <span class="token keyword">do</span>
    b2 <span class="token parameter variable">--clean</span>
    b2 <span class="token parameter variable">-j8</span> <span class="token assign-left variable">toolset</span><span class="token operator">=</span>clang <span class="token assign-left variable">cxxflags</span><span class="token operator">=</span><span class="token string">&quot;-std=<span class="token variable">$std</span>&quot;</span> <span class="token parameter variable">--prefix</span><span class="token operator">=</span>build/<span class="token variable">$std</span> <span class="token function">install</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>把上面的脚本存成 <code>build_boost.sh</code>，<code>chmod +x build_boost.sh &amp;&amp; ./build_boost.sh</code> 即可按不同 C++ 标准产出多套 Boost，方便在 CI 里交叉验证 ABI 兼容性。</p></blockquote><h3 id="_7-6-ci-集成-github-actions-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#_7-6-ci-集成-github-actions-gitlab-ci" aria-hidden="true">#</a> 7.6 CI 集成（GitHub Actions / GitLab CI）</h3><p>在 CI 里安装 Boost 并跑测试：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/ci.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> CI
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">,</span> pull_request<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install Boost
        <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo apt<span class="token punctuation">-</span>get update <span class="token important">&amp;&amp;</span> sudo apt<span class="token punctuation">-</span>get install <span class="token punctuation">-</span>y libboost<span class="token punctuation">-</span>all<span class="token punctuation">-</span>dev
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Configure
        <span class="token key atrule">run</span><span class="token punctuation">:</span> cmake <span class="token punctuation">-</span>S . <span class="token punctuation">-</span>B build
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> cmake <span class="token punctuation">-</span><span class="token punctuation">-</span>build build <span class="token punctuation">-</span>j2
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Test
        <span class="token key atrule">run</span><span class="token punctuation">:</span> ctest <span class="token punctuation">-</span><span class="token punctuation">-</span>test<span class="token punctuation">-</span>dir build <span class="token punctuation">-</span><span class="token punctuation">-</span>output<span class="token punctuation">-</span>on<span class="token punctuation">-</span>failure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>macOS CI 则改用 Homebrew：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install Boost (macOS)
        <span class="token key atrule">run</span><span class="token punctuation">:</span> brew install boost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>生产实践建议：CI 中显式固定 Boost 版本（如 <code>brew install boost@1.85</code> 或 <code>libboost1.85-dev</code>），避免上游升级导致 CI 与本地不一致。</p></blockquote><h3 id="_7-7-生产级实践要点" tabindex="-1"><a class="header-anchor" href="#_7-7-生产级实践要点" aria-hidden="true">#</a> 7.7 生产级实践要点</h3><ul><li><strong>固定版本</strong>：生产构建用 <code>boost@1.xx</code> 或 CMake 中 <code>find_package(Boost 1.76 REQUIRED)</code> 锁版本，防止漂移。</li><li><strong>使用 CMake imported target</strong>：<code>Boost::xxx</code> 自动处理头文件路径与传递依赖，减少手写 <code>-l</code> 出错。</li><li><strong>做好缓存</strong>：把 Boost 的安装/编译放进 CI 缓存（如 actions/cache），避免每次全量重编译。</li><li><strong>最小化 include</strong>：生产代码只 <code>#include</code> 用到的头文件，配合 PCH/ccache 缩短增量构建。</li><li><strong>安全检查</strong>：对外暴露 API 时避免直接暴露 boost 类型到 ABI 边界，减少版本耦合；定期用 <code>brew upgrade</code> 或安全扫描跟进 CVE。</li></ul>`,98),i=[o];function l(c,d){return n(),a("div",null,i)}const u=s(t,[["render",l],["__file","boost.html.vue"]]);export{u as default};
