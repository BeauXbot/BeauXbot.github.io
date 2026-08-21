import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,e as s}from"./app-f7ddf95e.js";const d={},i=s(`<h1 id="cmake-跨平台构建系统生成器-c-c-项目标配" tabindex="-1"><a class="header-anchor" href="#cmake-跨平台构建系统生成器-c-c-项目标配" aria-hidden="true">#</a> cmake（跨平台构建系统生成器，C/C++ 项目标配）</h1><blockquote><p>Homebrew 版本 4.2.0 ｜ 主页：见官方文档 ｜ 安装：<code>brew install cmake</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>CMake 是一个<strong>跨平台的构建系统生成器</strong>。它本身不直接编译代码，而是读取 <code>CMakeLists.txt</code> 配置文件，为你生成平台原生的构建文件——在 Linux/macOS 上生成 Makefile，在 Windows 上生成 Visual Studio 工程文件。这样同一份源码就能在多个平台上用同一套构建逻辑编译。</p><p>它解决的问题是：手写 Makefile 或项目文件非常繁琐、难以维护，且无法跨平台复用。CMake 用简洁的声明式语法描述「项目有什么目标、依赖什么库、编译选项是什么」，然后自动生成对应平台的构建脚本，是当前 C/C++ 项目的事实标准。典型应用场景包括：管理大型 C/C++ 项目、自动发现并链接第三方依赖、配合 IDE（CLion、VS Code、Qt Creator）使用、生成安装/打包规则等。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>使用 Homebrew 安装、升级、卸载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> cmake

<span class="token comment"># 升级（保持最新版本）</span>
brew upgrade cmake

<span class="token comment"># 卸载</span>
brew uninstall cmake

<span class="token comment"># 查看已安装版本</span>
cmake <span class="token parameter variable">--version</span>

<span class="token comment"># 查看 brew 管理的 cmake 详情（安装路径、依赖等）</span>
brew info cmake
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证安装成功，运行 <code>cmake --version</code>，输出应包含版本号 <code>4.2.0</code> 以及 <code>Make/CMake/CTest/CPack</code> 组件信息，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cmake version 4.2.0

CMake suite maintained and supported by Kitware (kitware.com/cmake).
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数 / 说明</th><th>示例</th></tr></thead><tbody><tr><td><code>cmake --version</code></td><td>查看版本号，验证安装</td><td><code>cmake --version</code></td></tr><tr><td><code>cmake -S &lt;源目录&gt; -B &lt;构建目录&gt;</code></td><td>配置项目，生成构建文件（4.0+ 推荐写法）</td><td><code>cmake -S . -B build</code></td></tr><tr><td><code>cmake --build &lt;构建目录&gt;</code></td><td>编译构建目录里的项目</td><td><code>cmake --build build</code></td></tr><tr><td><code>cmake --install &lt;构建目录&gt;</code></td><td>安装到指定前缀</td><td><code>cmake --install build --prefix /usr/local</code></td></tr><tr><td><code>cmake -G &lt;生成器&gt;</code></td><td>指定生成器（如 Unix Makefiles、Ninja、Xcode）</td><td><code>cmake -S . -B build -G Ninja</code></td></tr><tr><td><code>cmake -D&lt;变量&gt;=&lt;值&gt;</code></td><td>定义/覆盖缓存变量（如开关选项、安装路径）</td><td><code>cmake -S . -B build -DCMAKE_BUILD_TYPE=Release</code></td></tr><tr><td><code>cmake --build build --target install</code></td><td>只构建指定目标</td><td><code>cmake --build build --target my_app</code></td></tr><tr><td><code>ctest</code></td><td>运行项目测试（配合 CMake 的 add_test）</td><td><code>cd build &amp;&amp; ctest</code></td></tr><tr><td><code>cpack</code></td><td>打包生成安装包（deb/rpm/dmg）</td><td><code>cpack -G DEB</code></td></tr><tr><td><code>cmake -L build</code></td><td>列出缓存中所有变量</td><td><code>cmake -L build</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-最小-c-项目-hello-world" tabindex="-1"><a class="header-anchor" href="#示例-1-最小-c-项目-hello-world" aria-hidden="true">#</a> 示例 1：最小 C 项目（Hello World）</h3><p>这是最基础、最常见的用法，从源码编译一个可执行程序。</p><p><strong>1. 准备项目文件</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> hello <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建源码 <code>hello.c</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> hello.c <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;stdio.h&gt;

int main(void) {
    printf(&quot;Hello, CMake!\\n&quot;);
    return 0;
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建构建配置 <code>CMakeLists.txt</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> CMakeLists.txt <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
cmake_minimum_required(VERSION 3.20)
project(Hello C)

add_executable(hello hello.c)
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 配置并编译</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -S 指定源目录，-B 指定构建目录（源码与构建产物分离，保持目录干净）</span>
cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build
cmake <span class="token parameter variable">--build</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 运行看结果</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./build/hello
<span class="token comment"># 输出：Hello, CMake!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-2-多文件-链接第三方库-openmp" tabindex="-1"><a class="header-anchor" href="#示例-2-多文件-链接第三方库-openmp" aria-hidden="true">#</a> 示例 2：多文件 + 链接第三方库（OpenMP）</h3><p>展示 C++ 项目、多源文件、链接系统库的常见结构。</p><p><strong>1. 准备项目文件</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> demo <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建 <code>main.cpp</code> 和 <code>math_utils.cpp</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> main.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;iostream&gt;
#include &quot;math_utils.hpp&quot;

int main() {
    std::cout &lt;&lt; &quot;sum(3,4) = &quot; &lt;&lt; add(3, 4) &lt;&lt; std::endl;
    return 0;
}
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> math_utils.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &quot;math_utils.hpp&quot;

int add(int a, int b) { return a + b; }
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> math_utils.hpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#pragma once
int add(int a, int b);
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 <code>CMakeLists.txt</code>，用 <code>target_include_directories</code> 指定头文件搜索路径：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> CMakeLists.txt <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
cmake_minimum_required(VERSION 3.20)
project(Demo CXX)

add_executable(demo main.cpp math_utils.cpp)
target_include_directories(demo PRIVATE \${CMAKE_CURRENT_SOURCE_DIR})
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 配置并编译（指定 Release 优化）</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build <span class="token parameter variable">-DCMAKE_BUILD_TYPE</span><span class="token operator">=</span>Release
cmake <span class="token parameter variable">--build</span> build
./build/demo
<span class="token comment"># 输出：sum(3,4) = 7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-用-cmake-构建-git-依赖-fetchcontent" tabindex="-1"><a class="header-anchor" href="#示例-3-用-cmake-构建-git-依赖-fetchcontent" aria-hidden="true">#</a> 示例 3：用 CMake 构建 Git 依赖（FetchContent）</h3><p>当项目依赖一个 Git 仓库时，CMake 3.11+ 的 <code>FetchContent</code> 能在配置阶段自动拉取并构建。</p><p><strong>1. 准备项目文件</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> fetchdemo <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> fetchdemo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建 <code>main.cpp</code> 和 <code>CMakeLists.txt</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> main.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;iostream&gt;
#include &lt;fmt/core.h&gt;

int main() {
    std::cout &lt;&lt; fmt::format(&quot;FetchContent demo, answer = {}&quot;, 42) &lt;&lt; std::endl;
    return 0;
}
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> CMakeLists.txt <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
cmake_minimum_required(VERSION 3.20)
project(FetchDemo CXX)

include(FetchContent)
FetchContent_Declare(
  fmt
  GIT_REPOSITORY https://github.com/fmtlib/fmt.git
  GIT_TAG 11.0.2
)
FetchContent_MakeAvailable(fmt)

add_executable(fetchdemo main.cpp)
target_link_libraries(fetchdemo PRIVATE fmt::fmt)
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 配置（首次会联网拉取 fmt 库）、编译并运行</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build
cmake <span class="token parameter variable">--build</span> build
./build/fetchdemo
<span class="token comment"># 输出：FetchContent demo, answer = 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-用-ninja-加速编译" tabindex="-1"><a class="header-anchor" href="#_1-用-ninja-加速编译" aria-hidden="true">#</a> 1. 用 Ninja 加速编译</h3><p>默认的 Unix Makefiles 生成器是单线程的，改用 Ninja 可自动利用多核并显著提速（构建时加 <code>-j</code> 控制并行度）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> ninja
cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build <span class="token parameter variable">-G</span> Ninja
cmake <span class="token parameter variable">--build</span> build <span class="token parameter variable">-j8</span>   <span class="token comment"># 8 线程并行编译</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-常用缓存变量与环境变量" tabindex="-1"><a class="header-anchor" href="#_2-常用缓存变量与环境变量" aria-hidden="true">#</a> 2. 常用缓存变量与环境变量</h3><ul><li><code>-DCMAKE_BUILD_TYPE=Debug|Release|RelWithDebInfo</code>：指定构建类型（影响优化级别和调试信息）。</li><li><code>-DCMAKE_INSTALL_PREFIX=&lt;路径&gt;</code>：设置安装前缀，等价于 <code>cmake --install build --prefix &lt;路径&gt;</code>。</li><li><code>-DCMAKE_PREFIX_PATH=&lt;路径&gt;</code>：额外的库搜索路径，找不到依赖时很常用。</li><li><code>CC</code> / <code>CXX</code> 环境变量：指定编译器，例如 <code>CC=clang CXX=clang++ cmake -S . -B build</code>。</li><li>清理缓存：删掉 <code>build/</code> 目录重新配置即可，不需要手动清缓存。</li></ul><h3 id="_3-与-ide-搭配" tabindex="-1"><a class="header-anchor" href="#_3-与-ide-搭配" aria-hidden="true">#</a> 3. 与 IDE 搭配</h3><ul><li><strong>VS Code</strong>：安装 CMake Tools 扩展后，打开含 <code>CMakeLists.txt</code> 的目录即可自动配置、编译、调试。</li><li><strong>CLion</strong>：直接打开 <code>CMakeLists.txt</code> 作为项目文件。</li><li><strong>Qt Creator</strong>：新建项目时选择「CMake 项目」。</li><li><strong>生成 IDE 工程</strong>：macOS 上可用 <code>cmake -G Xcode</code> 生成 Xcode 工程，Windows 上 <code>cmake -G &quot;Visual Studio 17 2022&quot;</code>。</li></ul><h3 id="_4-测试与打包" tabindex="-1"><a class="header-anchor" href="#_4-测试与打包" aria-hidden="true">#</a> 4. 测试与打包</h3><p>在 <code>CMakeLists.txt</code> 中加入测试规则，即可用 <code>ctest</code> 一键跑测试：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token keyword">enable_testing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">add_test</span><span class="token punctuation">(</span><span class="token property">NAME</span> demo_test COMMAND demo<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> build <span class="token operator">&amp;&amp;</span> ctest --output-on-failure
<span class="token comment"># 再用 cpack 生成安装包</span>
cpack <span class="token parameter variable">-G</span> DEB    <span class="token comment"># Debian/Ubuntu</span>
cpack <span class="token parameter variable">-G</span> DragNDrop   <span class="token comment"># macOS 的 .dmg</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="常见报错" tabindex="-1"><a class="header-anchor" href="#常见报错" aria-hidden="true">#</a> 常见报错</h3><ol><li><p><strong><code>CMake Error: The source directory ... does not appear to contain CMakeLists.txt</code></strong><br> 在错误的目录执行了 <code>cmake -S</code>，检查 <code>-S</code> 指向的目录里确实有 <code>CMakeLists.txt</code>。</p></li><li><p><strong><code>fatal error: &#39;xxx.h&#39; file not found</code></strong><br> 头文件找不到。用 <code>target_include_directories</code> 显式声明头文件目录，或确认第三方库路径已通过 <code>-DCMAKE_PREFIX_PATH</code> 指定。</p></li><li><p><strong><code>undefined reference to ...</code></strong><br> 链接错误，说明声明了函数但没链接到实现库。用 <code>target_link_libraries</code> 补上对应的库（如 <code>m</code>、<code>pthread</code>、第三方库）。</p></li><li><p><strong><code>Could not find a package configuration file provided by &quot;xxx&quot;</code></strong><br> CMake 没找到 <code>find_package</code> 要求的包。用 <code>brew install xxx</code> 安装，或用 <code>-DCMAKE_PREFIX_PATH</code> 指定其安装路径。</p></li><li><p><strong>编译器版本过旧</strong><br> 新版 CMake（尤其 4.x）要求较新的编译器和标准。升级编译器（macOS 用 <code>xcode-select --install</code> 装/更新 Command Line Tools）或降低 <code>cmake_minimum_required</code> 版本。</p></li></ol><h3 id="注意要点" tabindex="-1"><a class="header-anchor" href="#注意要点" aria-hidden="true">#</a> 注意要点</h3><ul><li><strong><code>cmake_minimum_required</code> 放第一行</strong>：声明 CMake 最低版本，避免旧版误用新语法。</li><li><strong>不要污染源码目录</strong>：始终用 <code>-B</code> 指定独立构建目录，避免 <code>build/</code> 产物混进源码，否则切换平台/构建类型时容易踩坑。</li><li><strong>区分路径</strong>：<code>CMAKE_CURRENT_SOURCE_DIR</code> 是源码目录，<code>CMAKE_CURRENT_BINARY_DIR</code> 是构建目录，配置文件的绝对路径引用务必用这两个变量，不要硬编码。</li><li><strong><code>find_package</code> 依赖 <code>Config.cmake</code></strong>：很多库需 <code>brew install</code> 并配合 <code>-DCMAKE_PREFIX_PATH=$(brew --prefix)</code> 才能被正确找到。</li><li><strong>清理构建目录</strong>：改了大量 CMake 配置后若行为异常，删掉 <code>build/</code> 重新配置，比手动改缓存更可靠。</li><li><strong>安全提示</strong>：<code>FetchContent</code> 会执行远程仓库里的 CMake 代码，从不可信来源拉取依赖前请先审查。</li></ul>`,60),t=[i];function l(c,r){return a(),n("div",null,t)}const m=e(d,[["render",l],["__file","cmake.html.vue"]]);export{m as default};
