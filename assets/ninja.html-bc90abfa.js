import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as e,e as s}from"./app-42caee4a.js";const i={},d=s(`<h1 id="ninja-小型高速构建系统-常与-cmake-配合使用" tabindex="-1"><a class="header-anchor" href="#ninja-小型高速构建系统-常与-cmake-配合使用" aria-hidden="true">#</a> ninja（小型高速构建系统，常与 CMake 配合使用）</h1><blockquote><p>Homebrew 版本 1.13.2 ｜ 主页：见官方文档 ｜ 安装：<code>brew install ninja</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>ninja 是一个专注于<strong>速度</strong>的小型构建系统，它的设计目标是在大规模项目的增量构建中做到极快。它不像 Make 那样内置复杂的构建逻辑，而是依赖上层工具（最常见的是 CMake）先生成描述文件，再由 ninja 快速执行，从而在几百上千个源文件的工程里实现近乎线性的构建时间。</p><p>典型应用场景：配合 CMake 生成 ninja 构建文件后编译大型 C/C++ 工程（如 Chromium、LLVM 都基于它），或在 CI 流水线中追求更快的编译反馈。它的定位是&quot;底层执行引擎&quot;，而不是&quot;完整构建框架&quot;。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>通过 Homebrew 安装、升级、卸载，以及验证：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> ninja

<span class="token comment"># 升级到最新版</span>
brew upgrade ninja

<span class="token comment"># 卸载</span>
brew uninstall ninja

<span class="token comment"># 验证安装成功（应输出类似 ninja version 1.13.2）</span>
ninja <span class="token parameter variable">--version</span>

<span class="token comment"># 查看帮助</span>
ninja <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果提示 <code>command not found</code>，先确认 <code>/opt/homebrew/bin</code>（Apple Silicon）或 <code>/usr/local/bin</code>（Intel）已在 PATH 中。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>ninja</code></td><td>无参数时按默认目标构建</td><td><code>ninja</code></td></tr><tr><td><code>ninja &lt;target&gt;</code></td><td>只构建指定目标</td><td><code>ninja ninjatool</code></td></tr><tr><td><code>ninja -C &lt;dir&gt;</code></td><td>先切换到指定目录再执行构建</td><td><code>ninja -C build</code></td></tr><tr><td><code>ninja -j N</code></td><td>指定并行任务数，默认按 CPU 核心数</td><td><code>ninja -j 8</code></td></tr><tr><td><code>ninja -t targets</code></td><td>列出所有可用的构建目标</td><td><code>ninja -t targets</code></td></tr><tr><td><code>ninja -t clean</code></td><td>清理构建产物</td><td><code>ninja -t clean</code></td></tr><tr><td><code>ninja -t commands</code></td><td>显示将执行的构建命令（不执行）</td><td><code>ninja -t commands all</code></td></tr><tr><td><code>ninja -n</code></td><td>预演（dry run），只打印命令不执行</td><td><code>ninja -n</code></td></tr><tr><td><code>ninja -v</code></td><td>显示执行的详细命令行</td><td><code>ninja -v</code></td></tr><tr><td><code>ninja -t graph</code></td><td>以 Graphviz DOT 格式输出依赖图</td><td><code>ninja -t graph &gt; graph.dot</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-与-cmake-配合编译一个-c-工程" tabindex="-1"><a class="header-anchor" href="#示例-1-与-cmake-配合编译一个-c-工程" aria-hidden="true">#</a> 示例 1：与 CMake 配合编译一个 C++ 工程</h3><p>最典型的用法：CMake 生成 ninja 构建文件，再用 ninja 编译。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备一个简单的 C++ 工程</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> demo <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> demo
<span class="token function">cat</span> <span class="token operator">&gt;</span> hello.cpp <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;iostream&gt;
int main() {
    std::cout &lt;&lt; &quot;Hello, ninja!&quot; &lt;&lt; std::endl;
    return 0;
}
EOF</span>

<span class="token comment"># 2. 用 CMake 生成 ninja 构建文件（进入 build 目录，避免污染源码树）</span>
cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build <span class="token parameter variable">-G</span> Ninja

<span class="token comment"># 3. 执行构建</span>
cmake <span class="token parameter variable">--build</span> build

<span class="token comment"># 4. 运行生成的可执行文件</span>
./build/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出应包含 <code>Hello, ninja!</code>。也可直接 <code>ninja -C build</code> 代替第 3 步。</p><h3 id="示例-2-增量构建验证-ninja-的速度" tabindex="-1"><a class="header-anchor" href="#示例-2-增量构建验证-ninja-的速度" aria-hidden="true">#</a> 示例 2：增量构建验证 ninja 的速度</h3><p>在示例 1 的工程上测试增量编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改源码后重新构建，ninja 只重编受影响的文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;// just a comment to trigger rebuild&#39;</span> <span class="token operator">&gt;&gt;</span> hello.cpp
<span class="token function">time</span> ninja <span class="token parameter variable">-C</span> build

<span class="token comment"># 不做任何修改再次构建，应几乎瞬间完成</span>
<span class="token function">time</span> ninja <span class="token parameter variable">-C</span> build
<span class="token comment"># 第二次输出：ninja: no work to do.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二次构建会因为无改动而立即结束，体现 ninja 的增量构建优势。</p><h3 id="示例-3-直接手写-build-ninja-不依赖-cmake" tabindex="-1"><a class="header-anchor" href="#示例-3-直接手写-build-ninja-不依赖-cmake" aria-hidden="true">#</a> 示例 3：直接手写 build.ninja（不依赖 CMake）</h3><p>ninja 也可以脱离 CMake 单独使用，手动编写构建文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> main.c <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;stdio.h&gt;
int main(void) { printf(&quot;direct ninja\\n&quot;); return 0; }
EOF</span>

<span class="token comment"># 2. 手写最小 build.ninja</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> build.ninja <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
rule cc
  command = cc -c $in -o $out
rule link
  command = cc $in -o $out

build main.o: cc main.c
build app: link main.o
default app
EOF</span>

<span class="token comment"># 3. 执行</span>
ninja

<span class="token comment"># 4. 运行</span>
./app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为 <code>direct ninja</code>。此例展示了 ninja 的 <code>rule</code>（规则）与 <code>build</code>（构建语句）语法。</p><h3 id="示例-4-生成依赖图辅助调试" tabindex="-1"><a class="header-anchor" href="#示例-4-生成依赖图辅助调试" aria-hidden="true">#</a> 示例 4：生成依赖图辅助调试</h3><p>对已有构建文件输出依赖关系图：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在示例 1 的 build 目录中</span>
ninja <span class="token parameter variable">-C</span> build <span class="token parameter variable">-t</span> graph <span class="token operator">&gt;</span> graph.dot

<span class="token comment"># 若安装了 graphviz，可渲染成图片</span>
dot <span class="token parameter variable">-Tpng</span> graph.dot <span class="token parameter variable">-o</span> graph.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-让-cmake-默认使用-ninja" tabindex="-1"><a class="header-anchor" href="#_1-让-cmake-默认使用-ninja" aria-hidden="true">#</a> 1. 让 CMake 默认使用 Ninja</h3><p>若希望 <code>cmake ..</code> 时不写 <code>-G Ninja</code>，可在 <code>CMakePresets.json</code> 中指定生成器，或设置环境变量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">CMAKE_GENERATOR</span><span class="token operator">=</span>Ninja
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此后直接 <code>cmake -S . -B build</code> 即用 ninja 构建。</p><h3 id="_2-配置并行度与-ninja-自身的常量" tabindex="-1"><a class="header-anchor" href="#_2-配置并行度与-ninja-自身的常量" aria-hidden="true">#</a> 2. 配置并行度与 Ninja 自身的常量</h3><p><code>-j</code> 可手动控制并行度；ninja 读取 <code>NINJA_STATUS</code> 环境变量自定义状态行格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">NINJA_STATUS</span><span class="token operator">=</span><span class="token string">&quot;[%f/%t] &quot;</span>
ninja <span class="token parameter variable">-j</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>常见占位符：<code>%f</code>（完成数）、<code>%t</code>（总数）、<code>%p</code>（百分比）、<code>%s</code>（已运行秒数）、<code>%e</code>（预计剩余秒数）。</p><h3 id="_3-用-t-compdb-导出-compile-commands-json" tabindex="-1"><a class="header-anchor" href="#_3-用-t-compdb-导出-compile-commands-json" aria-hidden="true">#</a> 3. 用 <code>-t compdb</code> 导出 compile_commands.json</h3><p>需要给 IDE/代码补全工具（如 clangd）提供编译数据库时：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ninja <span class="token parameter variable">-C</span> build <span class="token parameter variable">-t</span> compdb cxx <span class="token operator">&gt;</span> compile_commands.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-结合-ccache-加速重复编译" tabindex="-1"><a class="header-anchor" href="#_4-结合-ccache-加速重复编译" aria-hidden="true">#</a> 4. 结合 ccache 加速重复编译</h3><p>把 ninja 与 ccache 搭配，能显著缓存重复的编译结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># CMake 中启用</span>
cmake <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-B</span> build <span class="token parameter variable">-G</span> Ninja <span class="token parameter variable">-DCMAKE_CXX_COMPILER_LAUNCHER</span><span class="token operator">=</span>ccache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-不要直接手工维护-build-ninja" tabindex="-1"><a class="header-anchor" href="#_1-不要直接手工维护-build-ninja" aria-hidden="true">#</a> 1. 不要直接手工维护 build.ninja</h3><p>对真实项目，build.ninja 应由 CMake 等工具生成。手动编辑后下次 CMake 重新生成会被覆盖，且手写语法容易出错。只在学习或极小场景下才手写。</p><h3 id="_2-报错-unknown-target" tabindex="-1"><a class="header-anchor" href="#_2-报错-unknown-target" aria-hidden="true">#</a> 2. 报错 &quot;unknown target&quot;</h3><p><code>ninja: unknown target &#39;xxx&#39;</code> 表示目标名写错。先用 <code>ninja -t targets</code> 查看可用目标，确认拼写。</p><h3 id="_3-报错-build-ninja-is-missing" tabindex="-1"><a class="header-anchor" href="#_3-报错-build-ninja-is-missing" aria-hidden="true">#</a> 3. 报错 &quot;build.ninja is missing&quot;</h3><p>在项目根目录直接运行 <code>ninja</code> 而该目录下没有 <code>build.ninja</code>。使用 <code>-C</code> 指定生成目录，或先运行 CMake 生成。</p><h3 id="_4-并行任务过多导致内存-编译报错" tabindex="-1"><a class="header-anchor" href="#_4-并行任务过多导致内存-编译报错" aria-hidden="true">#</a> 4. 并行任务过多导致内存/编译报错</h3><p><code>-j</code> 默认等于 CPU 核心数，在内存较小的机器上可能 OOM 或编译器崩溃。可降低并行度：<code>ninja -j 2</code>。</p><h3 id="_5-换编译器后需重新生成" tabindex="-1"><a class="header-anchor" href="#_5-换编译器后需重新生成" aria-hidden="true">#</a> 5. 换编译器后需重新生成</h3><p>仅修改环境变量编译器不一定生效，ninja 缓存了旧的编译命令。修改后应删除 build 目录重新 <code>cmake -S . -B build -G Ninja</code>，避免使用过期命令。</p><h3 id="_6-性能提示" tabindex="-1"><a class="header-anchor" href="#_6-性能提示" aria-hidden="true">#</a> 6. 性能提示</h3><p>ninja 本身开销极低，但若 build.ninja 由 CMake 生成，<code>cmake</code> 重新配置本身会耗时。把源码与构建目录分开（out-of-source）可减少触发重新配置的干扰文件，保持 ninja 的高效增量构建。</p>`,55),c=[d];function t(l,r){return n(),e("div",null,c)}const m=a(i,[["render",t],["__file","ninja.html.vue"]]);export{m as default};
