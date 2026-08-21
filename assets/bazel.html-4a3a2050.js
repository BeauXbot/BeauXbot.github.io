import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,e as s}from"./app-f7ddf95e.js";const l={},d=s(`<h1 id="bazel-google-的构建工具-支持多语言大型项目构建" tabindex="-1"><a class="header-anchor" href="#bazel-google-的构建工具-支持多语言大型项目构建" aria-hidden="true">#</a> bazel（Google 的构建工具，支持多语言大型项目构建）</h1><blockquote><p>Homebrew 版本 8.4.2 ｜ 主页：见官方文档 ｜ 安装：<code>brew install bazel</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>bazel 是 Google 开源的构建与测试工具，核心思路是「可复现构建」：它通过哈希校验源码、构建配置和工具链，只在输入发生变化时才重做增量构建，从而在大型多语言项目中实现快速、可靠、可并行的构建。它自带强大的<strong>沙箱隔离</strong>、<strong>远程缓存</strong>和<strong>远程执行</strong>能力，并内置对 C++、Java、Python、Go、JavaScript、Rust 等众多语言的原生支持。典型应用场景包括：单体仓库（monorepo）多语言构建、需要精确控制依赖版本的可复现 CI/CD、以及基于 Bazel 生态（如 TensorFlow、Google 系开源项目）的开发环境。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>通过 Homebrew 安装、升级和卸载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> bazel

<span class="token comment"># 升级到最新版本</span>
brew upgrade bazel

<span class="token comment"># 卸载</span>
brew uninstall bazel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证安装是否成功：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel <span class="token parameter variable">--version</span>
<span class="token comment"># 预期输出：bazel 8.4.2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：Homebrew 安装的 bazel 是官方发行版二进制。若需要与 Bazelisk（版本管理器）搭配使用，见下文「五、进阶技巧与配置」。</p></blockquote><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>bazel build &lt;target&gt;</code></td><td>构建指定目标（可带标签/通配符）</td><td><code>bazel build //src/main:app</code></td></tr><tr><td><code>bazel test &lt;target&gt;</code></td><td>运行目标的测试</td><td><code>bazel test //tests:all</code></td></tr><tr><td><code>bazel run &lt;target&gt;</code></td><td>构建并运行可执行目标</td><td><code>bazel run //src/main:app</code></td></tr><tr><td><code>bazel query &lt;expr&gt;</code></td><td>查询依赖图/目标（如 <code>deps(...)</code>）</td><td><code>bazel query &#39;deps(//src/main:app)&#39;</code></td></tr><tr><td><code>bazel clean</code></td><td>清理构建产物（增量缓存）</td><td><code>bazel clean --expunge</code></td></tr><tr><td><code>bazel analyze-profile &lt;file&gt;</code></td><td>分析构建性能 profile</td><td><code>bazel analyze-profile command.profile.gz</code></td></tr><tr><td><code>bazel info &lt;key&gt;</code></td><td>查询工作区信息（如 <code>bazel-bin</code> 路径）</td><td><code>bazel info output_base</code></td></tr><tr><td><code>bazel shutdown</code></td><td>关闭常驻 bazel 服务器进程</td><td><code>bazel shutdown</code></td></tr><tr><td><code>bazel help &lt;cmd&gt;</code></td><td>查看某条命令的详细帮助</td><td><code>bazel help query</code></td></tr><tr><td><code>bazel build ...</code></td><td>构建整个工作区所有目标</td><td><code>bazel build //...</code></td></tr></tbody></table><blockquote><p>常用修饰参数：<code>--verbose_failures</code>（显示详细报错）、<code>-s</code>（打印执行的每条命令）、<code>--keep_going</code>（出错后继续）、<code>--jobs=N</code>（并行任务数）、<code>--//option=value</code>（自定义 Starlark 标志）。</p></blockquote><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-最小-c-可执行程序" tabindex="-1"><a class="header-anchor" href="#示例-1-最小-c-可执行程序" aria-hidden="true">#</a> 示例 1：最小 C++ 可执行程序</h3><p>准备目录结构：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/demo-bazel-cpp/src/main
<span class="token builtin class-name">cd</span> ~/demo-bazel-cpp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 <code>MODULE.bazel</code>（Bazel 8 的模块文件）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> MODULE.bazel <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
module(name = &quot;demo_cpp&quot;)
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建源码 <code>src/main/hello.cc</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> src/main/hello.cc <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#include &lt;iostream&gt;
int main() {
  std::cout &lt;&lt; &quot;Hello, Bazel!\\n&quot;;
  return 0;
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建构建文件 <code>src/main/BUILD</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> src/main/BUILD <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
cc_binary(
    name = &quot;hello&quot;,
    srcs = [&quot;hello.cc&quot;],
)
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行构建并运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel build //src/main:hello
<span class="token comment"># 输出：INFO: Build completed successfully, 1 total action</span>
bazel run //src/main:hello
<span class="token comment"># 输出：Hello, Bazel!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-2-带单元测试的-python-程序" tabindex="-1"><a class="header-anchor" href="#示例-2-带单元测试的-python-程序" aria-hidden="true">#</a> 示例 2：带单元测试的 Python 程序</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/demo-bazel-py <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/demo-bazel-py
<span class="token function">cat</span> <span class="token operator">&gt;</span> MODULE.bazel <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
module(name = &quot;demo_py&quot;)
EOF</span>

<span class="token comment"># 库模块</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> src/lib
<span class="token function">cat</span> <span class="token operator">&gt;</span> src/lib/greet.py <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
def greet(name):
    return f&quot;Hello, {name}!&quot;
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> src/lib/BUILD <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
py_library(
    name = &quot;greet&quot;,
    srcs = [&quot;greet.py&quot;],
)
EOF</span>

<span class="token comment"># 测试模块</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> tests
<span class="token function">cat</span> <span class="token operator">&gt;</span> tests/greet_test.py <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
import unittest
from lib.greet import greet

class GreetTest(unittest.TestCase):
    def test_greet(self):
        self.assertEqual(greet(&quot;world&quot;), &quot;Hello, world!&quot;)

if __name__ == &quot;__main__&quot;:
    unittest.main()
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> tests/BUILD <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
py_test(
    name = &quot;greet_test&quot;,
    srcs = [&quot;greet_test.py&quot;],
    deps = [&quot;//src/lib:greet&quot;],
)
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel <span class="token builtin class-name">test</span> //tests:greet_test
<span class="token comment"># 输出：PASSED in 0.1s</span>
<span class="token comment"># 信息：Executed 1 test from 1 test target.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-go-程序的构建与运行" tabindex="-1"><a class="header-anchor" href="#示例-3-go-程序的构建与运行" aria-hidden="true">#</a> 示例 3：Go 程序的构建与运行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/demo-bazel-go <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/demo-bazel-go
<span class="token function">cat</span> <span class="token operator">&gt;</span> MODULE.bazel <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
module(name = &quot;demo_go&quot;)
go_deps = use_extension(&quot;@gazelle//:extensions.bzl&quot;, &quot;go_deps&quot;)
EOF</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> src/main
<span class="token function">cat</span> <span class="token operator">&gt;</span> src/main/main.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package main

import &quot;fmt&quot;

func main() {
	fmt.Println(&quot;Hello from Go via Bazel!&quot;)
}
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> src/main/BUILD <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
load(&quot;@rules_go//go:def.bzl&quot;, &quot;go_binary&quot;)

go_binary(
    name = &quot;app&quot;,
    srcs = [&quot;main.go&quot;],
)
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：Go 与 Rust 等规则需先在 <code>MODULE.bazel</code> 中声明依赖（<code>bazel_dep(name = &quot;rules_go&quot;, version = &quot;...&quot;)</code>）。构建后：</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel run //src/main:app
<span class="token comment"># 输出：Hello from Go via Bazel!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-用-bazelisk-管理多版本-bazel" tabindex="-1"><a class="header-anchor" href="#_1-用-bazelisk-管理多版本-bazel" aria-hidden="true">#</a> 1. 用 Bazelisk 管理多版本 bazel</h3><p>Bazel 版本切换频繁，建议用 Bazelisk 按项目自动选择版本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> bazelisk
<span class="token comment"># 项目根目录写 .bazelversion 即可固定版本</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;8.4.2&quot;</span> <span class="token operator">&gt;</span> .bazelversion
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后直接用 <code>bazelisk</code>（或软链 <code>bazel</code>）运行，它会按 <code>.bazelversion</code> 自动下载对应版本。</p><h3 id="_2-配置文件-bazelrc" tabindex="-1"><a class="header-anchor" href="#_2-配置文件-bazelrc" aria-hidden="true">#</a> 2. 配置文件 <code>.bazelrc</code></h3><p>Bazel 默认读取工作区根目录的 <code>.bazelrc</code>，可放常用默认参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .bazelrc 示例</span>
build <span class="token parameter variable">--features</span><span class="token operator">=</span>per_object_debug_info   <span class="token comment"># C++ 更细粒度增量</span>
build <span class="token parameter variable">--verbose_failures</span>                 <span class="token comment"># 显示失败详细日志</span>
<span class="token builtin class-name">test</span> <span class="token parameter variable">--test_output</span><span class="token operator">=</span>errors                <span class="token comment"># 只打印失败测试的输出</span>
common <span class="token parameter variable">--announce_rc</span>                     <span class="token comment"># 启动时打印加载的 rc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用环境变量：<code>HOME</code> 下的 <code>~/.bazelrc</code> 是用户级配置，优先级低于项目级；<code>JAVA_HOME</code> 影响 bazel 的 Java 工具链。</p><h3 id="_3-与其它工具的搭配" tabindex="-1"><a class="header-anchor" href="#_3-与其它工具的搭配" aria-hidden="true">#</a> 3. 与其它工具的搭配</h3><ul><li><strong>与 GCC/Clang 混用</strong>：用 <code>--config</code> 或 <code>--cxxopt</code> 指定编译器与标志，如 <code>bazel build --cxxopt=-O3 //src/main:hello</code>。</li><li><strong>与 CI 集成</strong>：<code>bazel test --test_output=errors //...</code> 是常见的 CI 入口；配合 <code>--build_event_json_file</code> 输出构建事件供外部系统消费。</li><li><strong>与 IDE（如 VSCode、CLion、IntelliJ）</strong>：<code>bazel query</code> 配合 <code>bazel build //...</code> 可生成编译数据库（如 <code>compile_commands.json</code>）供编辑器跳转、补全。</li></ul><h3 id="_4-增量与缓存优化" tabindex="-1"><a class="header-anchor" href="#_4-增量与缓存优化" aria-hidden="true">#</a> 4. 增量与缓存优化</h3><p>Bazel 默认启用磁盘缓存（<code>--disk_cache</code>），可指定跨机器共享缓存目录；远程执行（<code>--remote_executor</code>）可将任务分发到云端。<code>bazel clean</code> 不会清空外部依赖下载缓存，彻底清理用 <code>bazel clean --expunge</code>。</p><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="新手容易踩的坑" tabindex="-1"><a class="header-anchor" href="#新手容易踩的坑" aria-hidden="true">#</a> 新手容易踩的坑</h3><ul><li><strong>别把 BUILD 文件放错层级</strong>：每个目录的 <code>BUILD</code> 文件只负责该目录下的目标，跨目录引用必须写完整标签（如 <code>//src/lib:greet</code>），不能省略包路径。</li><li><strong>srcs 只列源码，不列头文件目录</strong>：头文件用 <code>includes</code>/<code>hdrs</code> 声明，Bazel 沙箱不会默认给你系统搜索路径。</li><li><strong>工作区必须有 <code>MODULE.bazel</code>（或 <code>WORKSPACE</code>）</strong>：在空目录直接跑 <code>bazel build</code> 会报「not within the directory hierarchy」之类的错，先初始化模块文件。</li><li><strong>依赖第三方包要声明 <code>bazel_dep</code></strong>：在 <code>MODULE.bazel</code> 里声明后用 <code>bazel fetch</code> 拉取，不要手动 <code>cp</code> 源码进仓库，否则破坏可复现性。</li></ul><h3 id="常见报错及解决办法" tabindex="-1"><a class="header-anchor" href="#常见报错及解决办法" aria-hidden="true">#</a> 常见报错及解决办法</h3><ul><li><strong><code>ERROR: /path/BUILD:1:10: no such package &#39;...&#39;</code></strong>：目标路径写错，检查标签是否存在、拼写是否一致。</li><li><strong><code>ERROR: Could not find a Python interpreter</code></strong>：Bazel 找不到 Python 工具链，安装系统 Python 或在 <code>.bazelrc</code> 指定 <code>--python_path</code>。</li><li><strong><code>Permission denied</code> / 沙箱报错</strong>：Bazel 使用沙箱执行，若脚本依赖系统路径，用 <code>--sandbox_writable_path</code> 或 <code>--no_sandbox</code> 临时关闭沙箱验证。</li><li><strong><code>server crashed</code> 或异常退出</strong>：删除 <code>.bazel_cache</code> 或 <code>bazel clean --expunge</code> 后重试；也可能是磁盘/内存不足。</li></ul><h3 id="性能与安全注意点" tabindex="-1"><a class="header-anchor" href="#性能与安全注意点" aria-hidden="true">#</a> 性能与安全注意点</h3><ul><li><strong>避免巨型目标</strong>：把代码拆成小目标，Bazel 的增量粒度按目标（target）计算，目标过大会拖慢变更重建。</li><li><strong>谨慎使用 <code>glob</code></strong>：<code>glob([&quot;**/*.cc&quot;])</code> 会扫描全目录，文件多时显著拖慢构建分析，尽量显式列出或缩小范围。</li><li><strong>默认下载依赖来自网络</strong>：企业内网或安全要求高的环境，先 <code>bazel fetch //...</code> 预拉依赖并校验校验和，或配置镜像源。</li><li><strong>常驻服务器</strong>：<code>bazel</code> 会启动常驻 server 进程，占用内存；长期不用可用 <code>bazel shutdown</code> 释放。</li><li><strong>权限与敏感信息</strong>：BUILD 里的 <code>data</code> 文件会被复制进沙箱，别把密钥等敏感文件当作 data 或源码提交。</li></ul>`,53),i=[d];function t(o,c){return a(),n("div",null,i)}const u=e(l,[["render",t],["__file","bazel.html.vue"]]);export{u as default};
