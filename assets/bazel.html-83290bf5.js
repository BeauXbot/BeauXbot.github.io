import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as t,c as o,a as n,b as e,d as c,e as a}from"./app-4490560f.js";const d={},r=a(`<h1 id="bazel-google-的构建工具-支持多语言大型项目构建" tabindex="-1"><a class="header-anchor" href="#bazel-google-的构建工具-支持多语言大型项目构建" aria-hidden="true">#</a> bazel（Google 的构建工具，支持多语言大型项目构建）</h1><blockquote><p>Homebrew 版本 8.4.2 ｜ 主页：见官方文档 ｜ 安装：<code>brew install bazel</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>bazel 是 Google 开源的构建与测试工具，核心思路是「可复现构建」：它通过哈希校验源码、构建配置和工具链，只在输入发生变化时才重做增量构建，从而在大型多语言项目中实现快速、可靠、可并行的构建。它自带强大的<strong>沙箱隔离</strong>、<strong>远程缓存</strong>和<strong>远程执行</strong>能力，并内置对 C++、Java、Python、Go、JavaScript、Rust 等众多语言的原生支持。典型应用场景包括：单体仓库（monorepo）多语言构建、需要精确控制依赖版本的可复现 CI/CD、以及基于 Bazel 生态（如 TensorFlow、Google 系开源项目）的开发环境。</p><p>bazel 与其它构建系统（CMake、Make）相比最大的差异在于：它<strong>从设计上假设你在一个大型仓库里做多语言、多目标、可并行的构建</strong>。其「每个目标是独立单元、依赖通过标签显式声明」的模型，让增量与缓存策略远优于传统的按文件时间戳判断的 Make。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>通过 Homebrew 安装、升级和卸载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> bazel

<span class="token comment"># 升级到最新版本</span>
brew upgrade bazel

<span class="token comment"># 卸载</span>
brew uninstall bazel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证安装是否成功：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel <span class="token parameter variable">--version</span>
<span class="token comment"># 预期输出：bazel 8.4.2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：Homebrew 安装的 bazel 是官方发行版二进制。若需要与 Bazelisk（版本管理器）搭配使用，见下文「五、进阶技巧与配置」。</p></blockquote><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>bazel build &lt;target&gt;</code></td><td>构建指定目标（可带标签/通配符）</td><td><code>bazel build //src/main:app</code></td></tr><tr><td><code>bazel test &lt;target&gt;</code></td><td>运行目标的测试</td><td><code>bazel test //tests:all</code></td></tr><tr><td><code>bazel run &lt;target&gt;</code></td><td>构建并运行可执行目标</td><td><code>bazel run //src/main:app</code></td></tr><tr><td><code>bazel query &lt;expr&gt;</code></td><td>查询依赖图/目标（如 <code>deps(...)</code>）</td><td><code>bazel query &#39;deps(//src/main:app)&#39;</code></td></tr><tr><td><code>bazel clean</code></td><td>清理构建产物（增量缓存）</td><td><code>bazel clean --expunge</code></td></tr><tr><td><code>bazel analyze-profile &lt;file&gt;</code></td><td>分析构建性能 profile</td><td><code>bazel analyze-profile command.profile.gz</code></td></tr><tr><td><code>bazel info &lt;key&gt;</code></td><td>查询工作区信息（如 <code>bazel-bin</code> 路径）</td><td><code>bazel info output_base</code></td></tr><tr><td><code>bazel shutdown</code></td><td>关闭常驻 bazel 服务器进程</td><td><code>bazel shutdown</code></td></tr><tr><td><code>bazel help &lt;cmd&gt;</code></td><td>查看某条命令的详细帮助</td><td><code>bazel help query</code></td></tr><tr><td><code>bazel build ...</code></td><td>构建整个工作区所有目标</td><td><code>bazel build //...</code></td></tr><tr><td><code>bazel fetch &lt;target&gt;</code></td><td>预拉取目标的所有外部依赖</td><td><code>bazel fetch //...</code></td></tr><tr><td><code>bazel cquery &lt;expr&gt;</code></td><td>查询「已配置」的目标（含编译参数展开结果）</td><td><code>bazel cquery &#39;//...&#39; --output=starlark</code></td></tr><tr><td><code>bazel aquery &lt;expr&gt;</code></td><td>查询动作图（每个 Action 的具体命令行）</td><td><code>bazel aquery &#39;mnemonic(&quot;CcCompile&quot;, //...)&#39;</code></td></tr><tr><td><code>bazel coverage &lt;target&gt;</code></td><td>生成测试覆盖率</td><td><code>bazel coverage //tests:greet_test</code></td></tr><tr><td><code>bazel sync</code></td><td>同步外部依赖到本地</td><td><code>bazel sync</code></td></tr><tr><td><code>bazel dump --packages</code></td><td>输出工作区包/目标统计</td><td><code>bazel dump --packages</code></td></tr></tbody></table><blockquote><p>常用修饰参数：<code>--verbose_failures</code>（显示详细报错）、<code>-s</code>（打印执行的每条命令）、<code>--keep_going</code>（出错后继续）、<code>--jobs=N</code>（并行任务数）、<code>--//option=value</code>（自定义 Starlark 标志）。</p></blockquote><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-最小-c-可执行程序" tabindex="-1"><a class="header-anchor" href="#示例-1-最小-c-可执行程序" aria-hidden="true">#</a> 示例 1：最小 C++ 可执行程序</h3><p>准备目录结构：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/demo-bazel-cpp/src/main
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后直接用 <code>bazelisk</code>（或软链 <code>bazel</code>）运行，它会按 <code>.bazelversion</code> 自动下载对应版本。</p><blockquote><p>进阶：软链让 <code>bazel</code> 命令直接指向 Bazelisk，切换版本时无需改习惯：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 若 PATH 里已有真实 bazel，可临时覆盖（仅对当前 shell 生效）</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">bazel</span><span class="token operator">=</span>bazelisk
<span class="token comment"># 或长期生效：把它写入 ~/.zshrc / ~/.bashrc</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;alias bazel=bazelisk&#39;</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p><code>.bazelversion</code> 支持写版本号、<code>latest</code>、<code>last_green</code> 等特殊值，也支持 <code>8.4.2@nix</code> 这类带平台后缀的形式。<code>bazelisk --version</code> 可看当前激活版本。</p><h3 id="_2-配置文件-bazelrc" tabindex="-1"><a class="header-anchor" href="#_2-配置文件-bazelrc" aria-hidden="true">#</a> 2. 配置文件 <code>.bazelrc</code></h3><p>Bazel 默认读取工作区根目录的 <code>.bazelrc</code>，可放常用默认参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .bazelrc 示例</span>
build <span class="token parameter variable">--features</span><span class="token operator">=</span>per_object_debug_info   <span class="token comment"># C++ 更细粒度增量</span>
build <span class="token parameter variable">--verbose_failures</span>                 <span class="token comment"># 显示失败详细日志</span>
<span class="token builtin class-name">test</span> <span class="token parameter variable">--test_output</span><span class="token operator">=</span>errors                <span class="token comment"># 只打印失败测试的输出</span>
common <span class="token parameter variable">--announce_rc</span>                     <span class="token comment"># 启动时打印加载的 rc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.bazelrc</code> 支持<strong>多段</strong>配置，常用 <code>build:</code>、<code>test:</code>、<code>run:</code> 前缀分别作用于不同命令，还可定义<strong>命名配置段</strong>用 <code>--config</code> 一键切换：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .bazelrc —— 完整生产级示例</span>
<span class="token comment"># ===== 通用 =====</span>
common <span class="token parameter variable">--enable_bzlmod</span>

<span class="token comment"># ===== 构建 =====</span>
build <span class="token parameter variable">--features</span><span class="token operator">=</span>per_object_debug_info
build <span class="token parameter variable">--verbose_failures</span>
build <span class="token parameter variable">--keep_going</span>
build <span class="token parameter variable">--jobs</span><span class="token operator">=</span><span class="token number">8</span>                     <span class="token comment"># 并行任务数</span>
build <span class="token parameter variable">--sandbox_tmpfs_path</span><span class="token operator">=</span>/tmp     <span class="token comment"># 用内存文件系统加速临时文件</span>
build <span class="token parameter variable">--experimental_ui_max_stdouterr_bytes</span><span class="token operator">=</span>-1

<span class="token comment"># ===== 测试 =====</span>
<span class="token builtin class-name">test</span> <span class="token parameter variable">--test_output</span><span class="token operator">=</span>errors
<span class="token builtin class-name">test</span> <span class="token parameter variable">--test_summary</span><span class="token operator">=</span>short
<span class="token builtin class-name">test</span> <span class="token parameter variable">--test_timeout</span><span class="token operator">=</span><span class="token number">60,300</span>,900,3600  <span class="token comment"># 短/中/长/极大 四档超时</span>

<span class="token comment"># ===== 缓存 =====</span>
build <span class="token parameter variable">--disk_cache</span><span class="token operator">=~</span>/.cache/bazel-disk   <span class="token comment"># 本地磁盘缓存</span>

<span class="token comment"># ===== 命名配置：发布版 =====</span>
build:release <span class="token parameter variable">--compilation_mode</span><span class="token operator">=</span>opt
build:release <span class="token parameter variable">--strip</span><span class="token operator">=</span>always
build:release <span class="token parameter variable">--copt</span><span class="token operator">=</span>-O3

<span class="token comment"># ===== 命名配置：调试版 =====</span>
build:debug <span class="token parameter variable">--compilation_mode</span><span class="token operator">=</span>dbg
build:debug <span class="token parameter variable">--copt</span><span class="token operator">=</span>-g

<span class="token comment"># ===== 命名配置：clang =====</span>
build:clang <span class="token parameter variable">--cxxopt</span><span class="token operator">=</span>-stdlib<span class="token operator">=</span>libc++

<span class="token comment"># ===== 命名配置：远程缓存 =====</span>
build:remote <span class="token parameter variable">--remote_cache</span><span class="token operator">=</span>grpcs://remote.example.com
build:remote <span class="token parameter variable">--remote_upload_local_results</span><span class="token operator">=</span>false
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 <code>--config</code> 切换命名配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel build <span class="token parameter variable">--config</span><span class="token operator">=</span>release //<span class="token punctuation">..</span>.
bazel build <span class="token parameter variable">--config</span><span class="token operator">=</span>debug <span class="token parameter variable">--config</span><span class="token operator">=</span>clang //src/main:hello
bazel <span class="token builtin class-name">test</span> <span class="token parameter variable">--config</span><span class="token operator">=</span>remote //<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-常用环境变量与关键配置项" tabindex="-1"><a class="header-anchor" href="#_3-常用环境变量与关键配置项" aria-hidden="true">#</a> 3. 常用环境变量与关键配置项</h3><table><thead><tr><th>环境变量</th><th>作用</th></tr></thead><tbody><tr><td><code>HOME</code></td><td>bazel 读取 <code>~/.bazelrc</code> 用户级配置，优先级低于项目级</td></tr><tr><td><code>JAVA_HOME</code></td><td>影响 bazel 的 Java 工具链（Java 规则需要）</td></tr><tr><td><code>BAZELISK_HOME</code></td><td>Bazelisk 下载各版本二进制的缓存目录（默认 <code>~/.cache/bazelisk</code>）</td></tr><tr><td><code>BAZEL_OPTS</code></td><td>作为<strong>默认命令参数</strong>注入每次 bazel 调用</td></tr><tr><td><code>TMPDIR</code></td><td>bazel 沙箱临时目录位置（磁盘不足时可换到大分区）</td></tr><tr><td><code>PATH</code></td><td>决定工具链与各外部命令的解析顺序</td></tr></tbody></table><p>常用构建标志（可在命令行或 <code>.bazelrc</code> 中使用）：</p><ul><li><code>--compilation_mode=fastbuild|dbg|opt</code>：编译优化级别，<code>opt</code> 对应 <code>-O3</code>。</li><li><code>--copt=-O3</code> / <code>--cxxopt=-std=c++17</code>：给编译器传额外参数。</li><li><code>--define=foo=bar</code>：向规则注入自定义宏，供 <code>select()</code> 分支判断。</li><li><code>--platforms=//:linux_x86_64</code>：显式指定目标平台（跨编译必备）。</li><li><code>--//foo:my_flag=true</code>：覆盖自定义 Starlark 构建标志。</li><li><code>--nobuild</code>：只做分析与动作图，不真正编译（用于快速查错）。</li><li><code>--noincremental_dexing</code>：Android 场景关闭增量处理，排查诡异 bug。</li></ul><h3 id="_4-个性化与效率设置" tabindex="-1"><a class="header-anchor" href="#_4-个性化与效率设置" aria-hidden="true">#</a> 4. 个性化与效率设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 让 bazel 输出更精简</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;common --ui_event_filters=-info&#39;</span> <span class="token operator">&gt;&gt;</span> .bazelrc

<span class="token comment"># 为每次构建自动打印 action 进度条颜色（默认开启）</span>
<span class="token comment"># 关闭彩色输出（适合 CI 日志归档）</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;common --color=no&#39;</span> <span class="token operator">&gt;&gt;</span> .bazelrc

<span class="token comment"># 限制系统资源占用（适合笔记本/共享服务器）</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;build --local_cpu_resources=4&#39;</span> <span class="token operator">&gt;&gt;</span> .bazelrc

<span class="token comment"># 跳过检查未使用依赖（默认关闭，可显式开启）</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;build --experimental_disable_external_package_bounds_check&#39;</span> <span class="token operator">&gt;&gt;</span> .bazelrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：<code>bazel --announce_rc</code> 会在每次启动时打印它实际加载了哪些 <code>.bazelrc</code> 段，排查「为什么参数没生效」很实用。</p></blockquote><h3 id="_5-增量与缓存优化" tabindex="-1"><a class="header-anchor" href="#_5-增量与缓存优化" aria-hidden="true">#</a> 5. 增量与缓存优化</h3><p>Bazel 默认启用磁盘缓存（<code>--disk_cache</code>），可指定跨机器共享缓存目录；远程执行（<code>--remote_executor</code>）可将任务分发到云端。<code>bazel clean</code> 不会清空外部依赖下载缓存，彻底清理用 <code>bazel clean --expunge</code>。</p><p>进阶策略：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用远程缓存共享构建产物（CI 与本地共享，命中后秒级）</span>
bazel build <span class="token parameter variable">--remote_cache</span><span class="token operator">=</span>grpcs://remote.example.com:443 //<span class="token punctuation">..</span>.

<span class="token comment"># 配合 --remote_download_minimal 只下载结果不下载中间产物</span>
bazel build <span class="token parameter variable">--remote_download_minimal</span> //<span class="token punctuation">..</span>.

<span class="token comment"># 查看某次构建的缓存命中率</span>
bazel build <span class="token parameter variable">--profile</span><span class="token operator">=</span>out.profile.gz //<span class="token punctuation">..</span>.
bazel analyze-profile out.profile.gz <span class="token parameter variable">--output</span><span class="token operator">=</span>text

<span class="token comment"># 用 --disk_cache 指定大容量分区，避免占满系统盘</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;build --disk_cache=/Volumes/Data/bazel-cache&#39;</span> <span class="token operator">&gt;&gt;</span> .bazelrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-多语言混合项目" tabindex="-1"><a class="header-anchor" href="#_6-多语言混合项目" aria-hidden="true">#</a> 6. 多语言混合项目</h3><p>Bazel 强项之一就是<strong>一个仓库混合多种语言</strong>，用 <code>cc_</code>、<code>py_</code>、<code>java_</code>、<code>go_</code> 等规则定义目标，跨语言通过 <code>deps</code> 引用即可。跨语言互调用例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># BUILD 中：C++ 库被 Python 引用</span>
<span class="token comment"># 用 py_extension 或 pybind11 规则桥接 C++ 扩展</span>
load<span class="token punctuation">(</span><span class="token string">&quot;@pybind11_bazel//:build_defs.bzl&quot;</span>, <span class="token string">&quot;pybind_extension&quot;</span><span class="token punctuation">)</span>

pybind_extension<span class="token punctuation">(</span>
    name <span class="token operator">=</span> <span class="token string">&quot;my_cpp_ext&quot;</span>,
    srcs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;my_cpp_ext.cc&quot;</span><span class="token punctuation">]</span>,
    deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;//src/core:core_lib&quot;</span><span class="token punctuation">]</span>,
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>MODULE.bazel</code> 声明多个规则集：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bazel_dep<span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;rules_go&quot;</span>, version <span class="token operator">=</span> <span class="token string">&quot;0.55.0&quot;</span><span class="token punctuation">)</span>
bazel_dep<span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;gazelle&quot;</span>, version <span class="token operator">=</span> <span class="token string">&quot;0.40.0&quot;</span><span class="token punctuation">)</span>
bazel_dep<span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;rules_rust&quot;</span>, version <span class="token operator">=</span> <span class="token string">&quot;0.54.0&quot;</span><span class="token punctuation">)</span>
bazel_dep<span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;rules_python&quot;</span>, version <span class="token operator">=</span> <span class="token string">&quot;0.47.0&quot;</span><span class="token punctuation">)</span>
bazel_dep<span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;rules_java&quot;</span>, version <span class="token operator">=</span> <span class="token string">&quot;8.3. Branches/8.3.0&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="新手容易踩的坑" tabindex="-1"><a class="header-anchor" href="#新手容易踩的坑" aria-hidden="true">#</a> 新手容易踩的坑</h3><ul><li><strong>别把 BUILD 文件放错层级</strong>：每个目录的 <code>BUILD</code> 文件只负责该目录下的目标，跨目录引用必须写完整标签（如 <code>//src/lib:greet</code>），不能省略包路径。</li><li><strong>srcs 只列源码，不列头文件目录</strong>：头文件用 <code>includes</code>/<code>hdrs</code> 声明，Bazel 沙箱不会默认给你系统搜索路径。</li><li><strong>工作区必须有 <code>MODULE.bazel</code>（或 <code>WORKSPACE</code>）</strong>：在空目录直接跑 <code>bazel build</code> 会报「not within the directory hierarchy」之类的错，先初始化模块文件。</li><li><strong>依赖第三方包要声明 <code>bazel_dep</code></strong>：在 <code>MODULE.bazel</code> 里声明后用 <code>bazel fetch</code> 拉取，不要手动 <code>cp</code> 源码进仓库，否则破坏可复现性。</li><li><strong>修改 <code>.bazelrc</code> 后忘了重启</strong>：常驻 server 会缓存部分解析结果，遇到诡异行为先 <code>bazel shutdown</code> 再试。</li><li><strong>忽略 <code>.bazelignore</code></strong>：若仓库含不应被 bazel 管理的目录（如 <code>vendor/</code>、<code>third_party/</code>），可在根目录写 <code>.bazelignore</code> 排除。</li><li><strong>在 Windows 上踩 <code>--sandbox</code> 的坑</strong>：Windows 沙箱支持较弱，必要时用 <code>--no_sandbox</code> 或 WSL 2 环境。</li><li><strong>把构建产物提交进 git</strong>：<code>bazel-bin</code>、<code>bazel-out</code> 等符号链接目录应加入 <code>.gitignore</code>，否则仓库瞬间膨胀。</li></ul><h3 id="常见报错及解决办法" tabindex="-1"><a class="header-anchor" href="#常见报错及解决办法" aria-hidden="true">#</a> 常见报错及解决办法</h3><ul><li><strong><code>ERROR: /path/BUILD:1:10: no such package &#39;...&#39;</code></strong>：目标路径写错，检查标签是否存在、拼写是否一致。</li><li><strong><code>ERROR: Could not find a Python interpreter</code></strong>：Bazel 找不到 Python 工具链，安装系统 Python 或在 <code>.bazelrc</code> 指定 <code>--python_path</code>。</li><li><strong><code>Permission denied</code> / 沙箱报错</strong>：Bazel 使用沙箱执行，若脚本依赖系统路径，用 <code>--sandbox_writable_path</code> 或 <code>--no_sandbox</code> 临时关闭沙箱验证。</li><li><strong><code>server crashed</code> 或异常退出</strong>：删除 <code>.bazel_cache</code> 或 <code>bazel clean --expunge</code> 后重试；也可能是磁盘/内存不足。</li><li><strong><code>ERROR: error loading package &#39;&#39;: Encountered error while reading extension file</code></strong>：<code>MODULE.bazel</code> 里某个 <code>bazel_dep</code> 版本号写错或不存在，用 <code>bazel mod graph</code> 检查依赖树。</li><li><strong><code>Analysis failed due to undeclared inclusion(s)</code></strong>：C++ 代码隐式 include 了未在 <code>hdrs</code> 声明头文件，把该头加入 <code>hdrs</code> 或 <code>includes</code>。</li><li><strong><code>java.lang.OutOfMemoryError</code></strong>：bazel server 堆内存不足，用 <code>--host_jvm_args=-Xmx4g</code> 调大，或 <code>bazel shutdown</code> 释放后重试。</li><li><strong><code>Build label ... is too old</code> / 版本不匹配</strong>：项目 <code>.bazelversion</code> 与规则要求的版本冲突，用 Bazelisk 切换到规则支持的版本。</li><li><strong><code>The </code>sql<code> dialect ...</code> 之类语言专用报错</strong>：多为规则版本过旧，升级对应 <code>rules_*</code> 依赖。</li></ul><h3 id="性能与安全注意点" tabindex="-1"><a class="header-anchor" href="#性能与安全注意点" aria-hidden="true">#</a> 性能与安全注意点</h3><ul><li><strong>避免巨型目标</strong>：把代码拆成小目标，Bazel 的增量粒度按目标（target）计算，目标过大会拖慢变更重建。</li><li><strong>谨慎使用 <code>glob</code></strong>：<code>glob([&quot;**/*.cc&quot;])</code> 会扫描全目录，文件多时显著拖慢构建分析，尽量显式列出或缩小范围。</li><li><strong>默认下载依赖来自网络</strong>：企业内网或安全要求高的环境，先 <code>bazel fetch //...</code> 预拉依赖并校验校验和，或配置镜像源。</li><li><strong>常驻服务器</strong>：<code>bazel</code> 会启动常驻 server 进程，占用内存；长期不用可用 <code>bazel shutdown</code> 释放。</li><li><strong>权限与敏感信息</strong>：BUILD 里的 <code>data</code> 文件会被复制进沙箱，别把密钥等敏感文件当作 data 或源码提交。</li><li><strong>沙箱隔离有限</strong>：Bazel 沙箱能隔离大部分副作用，但对显式逃逸（如 <code>--sandbox_writable_path</code>、genrule 里写绝对路径）不设防，生产环境应限制可写路径白名单。</li><li><strong>远程执行传输敏感数据</strong>：开启远程执行会把源码/产物上传到远端，注意不要涉及未脱敏的数据。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-与编译数据库-compile-commands-搭配-让编辑器完美跳转" tabindex="-1"><a class="header-anchor" href="#_1-与编译数据库-compile-commands-搭配-让编辑器完美跳转" aria-hidden="true">#</a> 1. 与编译数据库（compile_commands）搭配，让编辑器完美跳转</h3><p>CLion / VSCode / 其它 Clang 系 IDE 需要 <code>compile_commands.json</code>。可用官方 <code>compdb</code> 工具或第三方脚本生成：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 compdb（Python 工具）</span>
pip <span class="token function">install</span> compdb

<span class="token comment"># 先构建一次生成 bazel 的编译数据库</span>
bazel build <span class="token parameter variable">--compdb</span> //<span class="token punctuation">..</span>.

<span class="token comment"># 再转换出编辑器可读的 compile_commands.json</span>
compdb <span class="token parameter variable">-p</span> bazel-bin list <span class="token operator">&gt;</span> compile_commands.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,75),p={href:"https://github.com/hedronvision/bazel-compile-commands-extractor%EF%BC%89%E8%BF%99%E7%B1%BB%E8%A7%84%E5%88%99%EF%BC%8C%E5%9C%A8",target:"_blank",rel:"noopener noreferrer"},u=a(`<h3 id="_2-与-makefile-封装-简化团队入口" tabindex="-1"><a class="header-anchor" href="#_2-与-makefile-封装-简化团队入口" aria-hidden="true">#</a> 2. 与 Makefile 封装，简化团队入口</h3><p>Bazel 命令较长，可用 Makefile 封装常用操作，降低团队成员学习成本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Makefile</span>
.PHONY: build <span class="token builtin class-name">test</span> run clean <span class="token function">fmt</span> fetch

build:
	bazel build <span class="token parameter variable">--config</span><span class="token operator">=</span>debug //<span class="token punctuation">..</span>.

test:
	bazel <span class="token builtin class-name">test</span> <span class="token parameter variable">--test_output</span><span class="token operator">=</span>errors //<span class="token punctuation">..</span>.

run:
	bazel run <span class="token variable"><span class="token variable">$(</span>TARGET<span class="token variable">)</span></span>

clean:
	bazel clean <span class="token parameter variable">--expunge</span>

fmt:
	<span class="token comment"># 需要先配置 buildifier 格式化 BUILD 文件</span>
	buildifier <span class="token parameter variable">-r</span> <span class="token builtin class-name">.</span>

fetch:
	bazel fetch //<span class="token punctuation">..</span>.
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用法：<code>make build</code>、<code>make test TARGET=//src/main:hello</code>。</p><h3 id="_3-用-buildifier-格式化-build-与-bzl" tabindex="-1"><a class="header-anchor" href="#_3-用-buildifier-格式化-build-与-bzl" aria-hidden="true">#</a> 3. 用 buildifier 格式化 BUILD 与 .bzl</h3><p>保持 BUILD 文件风格统一：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> buildifier
buildifier <span class="token parameter variable">-r</span> <span class="token builtin class-name">.</span>            <span class="token comment"># 递归格式化工作区内所有 BUILD/.bzl</span>
buildifier <span class="token parameter variable">-mode</span><span class="token operator">=</span>check <span class="token builtin class-name">.</span>   <span class="token comment"># 只检查不修改（CI 用）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-与-git-预提交钩子集成" tabindex="-1"><a class="header-anchor" href="#_4-与-git-预提交钩子集成" aria-hidden="true">#</a> 4. 与 Git 预提交钩子集成</h3><p>在 <code>.pre-commit-config.yaml</code> 里加 buildifier 检查：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">repos</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">repo</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/bazelbuild/buildtools
    <span class="token key atrule">rev</span><span class="token punctuation">:</span> v7.1.2
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> buildifier
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> buildifier<span class="token punctuation">-</span>lint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-ci-集成-github-actions-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#_5-ci-集成-github-actions-gitlab-ci" aria-hidden="true">#</a> 5. CI 集成（GitHub Actions / GitLab CI）</h3><p>Bazel 自带 <code>--build_event_json_file</code> 和 <code>--bes_backend</code> 事件流，可接入 CI 面板与告警。GitHub Actions 示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/ci.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> CI
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">,</span> pull_request<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Mount bazel cache
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ~/.cache/bazel
            ~/.cache/bazelisk</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>bazel<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;.bazelversion&#39;) <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          bazel build --disk_cache=~/.cache/bazel //...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Test
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          bazel test --disk_cache=~/.cache/bazel --test_output=errors //...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload coverage
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          bazel coverage --combined_report=lcov //...
          bash &lt;(curl -s https://codecov.io/bash)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键点：</p><ul><li>用 <code>actions/cache</code> 缓存 bazel 的磁盘缓存目录，CI 命中后构建大幅提速。</li><li><code>--disk_cache</code> 指向缓存目录，跨 job 复用。</li><li>启用 <code>--bes_backend=grpc://...</code> 可把事件流上报给 Build Event Service（如自建或 SaaS），获得更细的时序/告警。</li></ul><h3 id="_6-批量处理-一次性构建-测试整个仓库" tabindex="-1"><a class="header-anchor" href="#_6-批量处理-一次性构建-测试整个仓库" aria-hidden="true">#</a> 6. 批量处理：一次性构建/测试整个仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 构建与测试所有目标（含测试）</span>
bazel build //<span class="token punctuation">..</span>.
bazel <span class="token builtin class-name">test</span> //<span class="token punctuation">..</span>. <span class="token parameter variable">--test_output</span><span class="token operator">=</span>errors

<span class="token comment"># 只处理某前缀下的目标</span>
bazel build //src/<span class="token punctuation">..</span>.

<span class="token comment"># 排除某些标签（如标记为 flaky 或 e2e）</span>
bazel <span class="token builtin class-name">test</span> //<span class="token punctuation">..</span>. <span class="token parameter variable">--build_tag_filters</span><span class="token operator">=</span>-e2e

<span class="token comment"># 只看失败测试，忽略 flaky 波动</span>
bazel <span class="token builtin class-name">test</span> //<span class="token punctuation">..</span>. <span class="token parameter variable">--flaky_test_attempts</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-生产级实践建议" tabindex="-1"><a class="header-anchor" href="#_7-生产级实践建议" aria-hidden="true">#</a> 7. 生产级实践建议</h3><ul><li><strong>拆分模块</strong>：用 Bzlmod（<code>MODULE.bazel</code> + <code>bazel_dep</code>）做依赖管理，取代旧的 <code>WORKSPACE</code>。</li><li><strong>锁定版本</strong>：<code>MODULE.bazel.lock</code> 会自动生成，务必提交到 git，保证团队与 CI 依赖一致。</li><li><strong>善用 <code>select()</code></strong>：在 BUILD 里用平台/配置分支适配不同系统，避免重复定义规则。</li><li><strong>远端缓存优先</strong>：把 CI 设为主构建方（<code>--remote_upload_local_results=false</code>），本地只读远端缓存，避免脏缓存。</li><li><strong>定期清理</strong>：写个 cron 定期 <code>bazel clean --expunge</code> 或清理 <code>~/.cache/bazel</code>，防止缓存无限膨胀。</li></ul><h3 id="_8-与-gazelle-自动化生成-build" tabindex="-1"><a class="header-anchor" href="#_8-与-gazelle-自动化生成-build" aria-hidden="true">#</a> 8. 与 Gazelle 自动化生成 BUILD</h3><p>Gazelle 是 Bazel 生态的 BUILD 文件生成器，对 Go、Python 等能自动推导规则：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 Go 项目根目录</span>
bazel run //:gazelle -- update
<span class="token comment"># 自动根据 go.mod 与源码生成/更新 BUILD 与 deps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 <code>gazelle</code> 声明为根 BUILD 里的可运行目标，团队成员即可一条命令维护 BUILD 文件。</p><h3 id="_9-一个完整的混合语言生产示例-go-服务-c-库" tabindex="-1"><a class="header-anchor" href="#_9-一个完整的混合语言生产示例-go-服务-c-库" aria-hidden="true">#</a> 9. 一个完整的混合语言生产示例（Go 服务 + C++ 库）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/demo-mono <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/demo-mono

<span class="token comment"># 模块声明</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> MODULE.bazel <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
module(name = &quot;demo_mono&quot;)

bazel_dep(name = &quot;rules_go&quot;, version = &quot;0.55.0&quot;)
bazel_dep(name = &quot;gazelle&quot;, version = &quot;0.40.0&quot;)
EOF</span>

<span class="token comment"># C++ 核心库</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> core
<span class="token function">cat</span> <span class="token operator">&gt;</span> core/math.cc <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
extern &quot;C&quot; int add(int a, int b) { return a + b; }
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> core/math.h <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
extern &quot;C&quot; int add(int a, int b);
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> core/BUILD <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
cc_library(
    name = &quot;math&quot;,
    srcs = [&quot;math.cc&quot;],
    hdrs = [&quot;math.h&quot;],
    visibility = [&quot;//visibility:public&quot;],
)
EOF</span>

<span class="token comment"># Go 服务调用 C 库</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token function">service</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> service/main.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package main

/*
#cgo LDFLAGS: -L\${SRCDIR}/../bazel-bin/core
#include &quot;math.h&quot;
*/
import &quot;C&quot;
import &quot;fmt&quot;

func main() {
	fmt.Println(&quot;add(1,2) =&quot;, C.add(1, 2))
}
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> service/BUILD <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
load(&quot;@rules_go//go:def.bzl&quot;, &quot;go_binary&quot;)

go_binary(
    name = &quot;svc&quot;,
    srcs = [&quot;main.go&quot;],
    cdeps = [&quot;//core:math&quot;],
    cgo = True,
)
EOF</span>

bazel run //service:svc
<span class="token comment"># 输出：add(1,2) = 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子展示了 Bazel 处理「跨语言、带原生 cgo、需要正确依赖声明」的真实场景——这正是它优于普通脚本构建的地方。</p>`,26);function b(v,m){const s=i("ExternalLinkIcon");return t(),o("div",null,[r,n("blockquote",null,[n("p",null,[e("也可用 Heighliner（"),n("a",p,[e("https://github.com/hedronvision/bazel-compile-commands-extractor）这类规则，在"),c(s)]),e(" BUILD 里声明目标后一条命令产出。")])]),u])}const g=l(d,[["render",b],["__file","bazel.html.vue"]]);export{g as default};
