import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-09e0be14.js";const i={},l=e(`<h1 id="go-go-编程语言-golang" tabindex="-1"><a class="header-anchor" href="#go-go-编程语言-golang" aria-hidden="true">#</a> go（Go 编程语言（Golang））</h1><blockquote><p>Homebrew 版本 1.25.5 ｜ 主页：见官方文档 ｜ 安装：<code>brew install go</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>Go（又称 Golang）是 Google 于 2009 年推出的开源静态类型编译语言，以极简语法、并发原语（goroutine + channel）和极快的编译/启动速度著称。它主要解决高并发网络服务、云原生基础设施与 CLI 工具开发中的工程化问题——单一二进制交付、内置垃圾回收、无虚拟机直接编译成机器码。典型应用场景包括：Web 后端（如 Gin、Echo 框架）、微服务与 API 网关、云原生工具（Docker、Kubernetes、Prometheus 均为 Go 编写）以及运维 CLI 工具。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>Go 在 macOS 上推荐通过 Homebrew 安装，会同时带来 <code>go</code> 命令行、标准库与工具链。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> go

<span class="token comment"># 验证安装</span>
go version
<span class="token comment"># 期望输出：go version go1.25.5 darwin/arm64</span>

<span class="token comment"># 查看环境配置（GOROOT、GOPATH、GOBIN 等）</span>
go <span class="token function">env</span>

<span class="token comment"># 升级到最新版</span>
brew upgrade go

<span class="token comment"># 卸载</span>
brew uninstall go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后 <code>go</code> 自动加入 PATH（Homebrew 的 <code>/opt/homebrew/bin</code>）。若需手动设置环境变量，参考第五节。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数/说明</th><th>示例</th></tr></thead><tbody><tr><td><code>go run</code></td><td>编译并直接运行 main 包</td><td><code>go run main.go</code></td></tr><tr><td><code>go build</code></td><td>编译当前目录为可执行文件</td><td><code>go build -o myapp .</code></td></tr><tr><td><code>go install</code></td><td>编译并安装到 <code>GOBIN</code>/<code>GOPATH/bin</code></td><td><code>go install ./cmd/mytool</code></td></tr><tr><td><code>go test</code></td><td>运行测试（<code>-v</code> 显示详细、<code>-run</code> 过滤用例）</td><td><code>go test -v ./...</code></td></tr><tr><td><code>go mod init</code></td><td>初始化模块（生成 <code>go.mod</code>）</td><td><code>go mod init example.com/myapp</code></td></tr><tr><td><code>go mod tidy</code></td><td>同步依赖，清理 <code>go.mod</code>/<code>go.sum</code></td><td><code>go mod tidy</code></td></tr><tr><td><code>go get</code></td><td>添加或升级模块依赖</td><td><code>go get github.com/gin-gonic/gin</code></td></tr><tr><td><code>go fmt</code></td><td>格式化源码（gofmt 的等价命令）</td><td><code>go fmt ./...</code></td></tr><tr><td><code>go vet</code></td><td>静态检查常见错误</td><td><code>go vet ./...</code></td></tr><tr><td><code>go env</code></td><td>查看/设置 Go 环境变量</td><td><code>go env GOPATH</code></td></tr><tr><td><code>go doc</code></td><td>查看包/函数的在线文档</td><td><code>go doc net/http</code></td></tr><tr><td><code>go run -race</code></td><td>带竞态检测运行</td><td><code>go run -race main.go</code></td></tr><tr><td><code>go clean -cache</code></td><td>清空构建与模块缓存</td><td><code>go clean -cache -modcache</code></td></tr><tr><td><code>go generate</code></td><td>运行源码中 <code>//go:generate</code> 指令</td><td><code>go generate ./...</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-hello-world-与运行" tabindex="-1"><a class="header-anchor" href="#示例-1-hello-world-与运行" aria-hidden="true">#</a> 示例 1：Hello World 与运行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建项目目录并初始化模块</span>
<span class="token function">mkdir</span> ~/hello <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/hello
go mod init hello

<span class="token comment"># 2. 编写源码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> main.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package main

import &quot;fmt&quot;

func main() {
    fmt.Println(&quot;Hello, 世界&quot;)
}
EOF</span>

<span class="token comment"># 3. 直接运行</span>
go run main.go
<span class="token comment"># 输出：Hello, 世界</span>

<span class="token comment"># 4. 编译成可执行文件（可脱离 Go 环境直接运行）</span>
go build <span class="token parameter variable">-o</span> hello <span class="token builtin class-name">.</span>
./hello
<span class="token comment"># 输出：Hello, 世界</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-2-http-服务器-标准库-无需第三方依赖" tabindex="-1"><a class="header-anchor" href="#示例-2-http-服务器-标准库-无需第三方依赖" aria-hidden="true">#</a> 示例 2：HTTP 服务器（标准库，无需第三方依赖）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 初始化模块</span>
<span class="token function">mkdir</span> ~/webserver <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/webserver
go mod init webserver

<span class="token comment"># 2. 编写源码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> main.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package main

import (
    &quot;fmt&quot;
    &quot;net/http&quot;
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, &quot;你好，%s！&quot;, r.URL.Path)
}

func main() {
    http.HandleFunc(&quot;/&quot;, handler)
    fmt.Println(&quot;监听 :8080 ...&quot;)
    http.ListenAndServe(&quot;:8080&quot;, nil)
}
EOF</span>

<span class="token comment"># 3. 运行并在浏览器打开 http://localhost:8080/你好</span>
go run main.go
<span class="token function">curl</span> http://localhost:8080/world
<span class="token comment"># 输出：你好，/world！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-3-并发编程-goroutine-与-channel" tabindex="-1"><a class="header-anchor" href="#示例-3-并发编程-goroutine-与-channel" aria-hidden="true">#</a> 示例 3：并发编程（goroutine 与 channel）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建项目</span>
<span class="token function">mkdir</span> ~/concurrency <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/concurrency
go mod init concurrency

<span class="token comment"># 2. 编写并发示例</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> main.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package main

import (
    &quot;fmt&quot;
    &quot;time&quot;
)

func worker(id int, jobs &lt;-chan int, results chan&lt;- int) {
    for j := range jobs {
        fmt.Printf(&quot;worker %d 处理任务 %d\\n&quot;, id, j)
        time.Sleep(100 * time.Millisecond) // 模拟耗时
        results &lt;- j * 2
    }
}

func main() {
    const numJobs = 5
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)

    // 启动 3 个并发 worker
    for w := 1; w &lt;= 3; w++ {
        go worker(w, jobs, results)
    }

    // 派发任务
    for j := 1; j &lt;= numJobs; j++ {
        jobs &lt;- j
    }
    close(jobs)

    // 收集结果
    for r := 1; r &lt;= numJobs; r++ {
        fmt.Println(&quot;结果：&quot;, &lt;-results)
    }
}
EOF</span>

<span class="token comment"># 3. 运行</span>
go run main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-4-编写并运行单元测试" tabindex="-1"><a class="header-anchor" href="#示例-4-编写并运行单元测试" aria-hidden="true">#</a> 示例 4：编写并运行单元测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建项目</span>
<span class="token function">mkdir</span> ~/mymath <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/mymath
go mod init mymath

<span class="token comment"># 2. 编写被测代码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> math.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package mymath

func Add(a, b int) int { return a + b }
EOF</span>

<span class="token comment"># 3. 编写测试文件（文件名必须以 _test.go 结尾）</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> math_test.go <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
package mymath

import &quot;testing&quot;

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    if got != 5 {
        t.Errorf(&quot;Add(2,3) = %d, 期望 5&quot;, got)
    }
}
EOF</span>

<span class="token comment"># 4. 运行测试</span>
go <span class="token builtin class-name">test</span> <span class="token parameter variable">-v</span> <span class="token builtin class-name">.</span>
<span class="token comment"># 输出：PASS  ok  mymath</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_1-常用环境变量-go-env-查看-go-env-w-持久化" tabindex="-1"><a class="header-anchor" href="#_1-常用环境变量-go-env-查看-go-env-w-持久化" aria-hidden="true">#</a> 1. 常用环境变量（<code>go env</code> 查看，<code>go env -w</code> 持久化）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看当前值</span>
go <span class="token function">env</span> GOPATH GOBIN GOPROXY

<span class="token comment"># 设置 GOPROXY（国内加速，默认已含 goproxy.cn 链）</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://proxy.golang.com.cn,direct

<span class="token comment"># 自定义模块缓存目录</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOMODCACHE</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/.go/mod

<span class="token comment"># 设置 GOBIN（go install 的安装目录，加入 PATH 后工具可直接调用）</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOBIN</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/go/bin

<span class="token comment"># 启用/关闭模块模式（1.16 起默认开启）</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on

<span class="token comment"># 设置代理与校验；GONOSUMDB 用于私有库跳过校验</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GONOSUMDB</span><span class="token operator">=</span>git.example.com
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GONOSUMCHECK</span><span class="token operator">=</span><span class="token number">1</span>   <span class="token comment"># 仅作示意，实际用 GONOSUMDB / GONOSUMCHECK 已被 GONOSUMDB 取代</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>~/.bashrc</code> / <code>~/.zshrc</code> 中的推荐配置：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 追加到 ~/.zshrc 或 ~/.bashrc</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/go&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOBIN</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$GOPATH</span>/bin&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$GOBIN</span>:<span class="token environment constant">$PATH</span>&quot;</span>

<span class="token comment"># 国内代理（一次性写入 go env，无需每次 source）</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://proxy.golang.com.cn,direct

<span class="token comment"># 私有仓库跳过 sumdb 与代理（可选）</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GONOSUMDB</span><span class="token operator">=</span><span class="token string">&#39;*.corp.example.com&#39;</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPRIVATE</span><span class="token operator">=</span><span class="token string">&#39;*.corp.example.com&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-与编辑器搭配-lsp-语言服务器" tabindex="-1"><a class="header-anchor" href="#_2-与编辑器搭配-lsp-语言服务器" aria-hidden="true">#</a> 2. 与编辑器搭配（LSP 语言服务器）</h3><p>安装 <code>gopls</code> 获得代码补全、跳转定义、重构等 IDE 能力，主流编辑器（VS Code、Neovim、JetBrains）均原生支持：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token function">install</span> golang.org/x/tools/gopls@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>VS Code 安装 Go 扩展后自动使用 gopls；Neovim 用户可用 <code>lspconfig</code> 接入：</p><div class="language-lua line-numbers-mode" data-ext="lua"><pre class="language-lua"><code><span class="token comment">-- Neovim (lspconfig) 示例</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;lspconfig&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>gopls<span class="token punctuation">.</span><span class="token function">setup</span> <span class="token punctuation">{</span>
  settings <span class="token operator">=</span> <span class="token punctuation">{</span> gopls <span class="token operator">=</span> <span class="token punctuation">{</span> staticcheck <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">,</span> analyses <span class="token operator">=</span> <span class="token punctuation">{</span> unusedparams <span class="token operator">=</span> <span class="token keyword">true</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-热重载开发-第三方工具" tabindex="-1"><a class="header-anchor" href="#_3-热重载开发-第三方工具" aria-hidden="true">#</a> 3. 热重载开发（第三方工具）</h3><p>日常迭代可用 <code>air</code> 实现文件变更自动重启，避免手动 <code>go run</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token function">install</span> github.com/air-verse/air@latest
<span class="token comment"># 在项目根目录运行 air，即可监听 .go 文件并自动重启</span>
air
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>air</code> 支持通过 <code>.air.toml</code> 配置监听目录、排除项、构建命令等：</p><div class="language-toml line-numbers-mode" data-ext="toml"><pre class="language-toml"><code><span class="token comment"># .air.toml（项目根目录）</span>
<span class="token punctuation">[</span><span class="token table class-name">build</span><span class="token punctuation">]</span>
<span class="token key property">cmd</span> <span class="token punctuation">=</span> <span class="token string">&quot;go build -o ./tmp/main .&quot;</span>
<span class="token key property">bin</span> <span class="token punctuation">=</span> <span class="token string">&quot;./tmp/main&quot;</span>
<span class="token key property">include_ext</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tpl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tmpl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;html&quot;</span><span class="token punctuation">]</span>
<span class="token key property">exclude_dir</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;assets&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tmp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;vendor&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;testdata&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 Web 项目，<code>fresh</code>（<code>github.com/gravityblast/fresh</code>）也是常用替代品。</p><h3 id="_4-交叉编译-为不同平台构建二进制" tabindex="-1"><a class="header-anchor" href="#_4-交叉编译-为不同平台构建二进制" aria-hidden="true">#</a> 4. 交叉编译（为不同平台构建二进制）</h3><p>通过 <code>GOOS</code>/<code>GOARCH</code> 环境变量轻松交叉编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 macOS 上为 Linux x86_64 编译</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token parameter variable">-o</span> myapp-linux <span class="token builtin class-name">.</span>
<span class="token comment"># 在 macOS 上为 Windows 编译</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token parameter variable">-o</span> myapp.exe <span class="token builtin class-name">.</span>

<span class="token comment"># Apple Silicon Mac 为 Intel Mac 编译</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token parameter variable">-o</span> myapp-intel <span class="token builtin class-name">.</span>
<span class="token comment"># 常用组合：arm64（ARM64 服务器/树莓派）</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>arm64 go build <span class="token parameter variable">-o</span> myapp-arm64 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：含 CGO 的代码交叉编译需额外配置交叉工具链（如 <code>CC=aarch64-linux-gnu-gcc</code>），纯 Go 代码无需。</p><h3 id="_5-依赖管理与模块代理" tabindex="-1"><a class="header-anchor" href="#_5-依赖管理与模块代理" aria-hidden="true">#</a> 5. 依赖管理与模块代理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看模块依赖树</span>
go mod graph
<span class="token comment"># 查看某依赖为何被引入</span>
go mod why github.com/gin-gonic/gin
<span class="token comment"># 查看所有间接依赖</span>
go list <span class="token parameter variable">-m</span> all

<span class="token comment"># 升级依赖到最新</span>
go get <span class="token parameter variable">-u</span> ./<span class="token punctuation">..</span>.
<span class="token comment"># 升级到指定版本</span>
go get github.com/gin-gonic/gin@v1.10.0

<span class="token comment"># 校验 go.mod / go.sum 的一致性</span>
go mod verify

<span class="token comment"># 创建 vendor 目录（离线/CI 可用）</span>
go mod vendor
go build <span class="token parameter variable">-mod</span><span class="token operator">=</span>vendor <span class="token builtin class-name">.</span>   <span class="token comment"># 强制使用 vendor 目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-构建参数与优化" tabindex="-1"><a class="header-anchor" href="#_6-构建参数与优化" aria-hidden="true">#</a> 6. 构建参数与优化</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 缩小体积 + 去掉路径信息</span>
go build <span class="token parameter variable">-ldflags</span> <span class="token string">&quot;-s -w -X main.version=1.0.0&quot;</span> <span class="token parameter variable">-trimpath</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 在编译期注入版本号（通过 -ldflags -X）</span>
<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> describe <span class="token parameter variable">--tags</span> <span class="token parameter variable">--always</span><span class="token variable">)</span></span>
go build <span class="token parameter variable">-ldflags</span> <span class="token string">&quot;-X main.version=<span class="token variable">$VERSION</span>&quot;</span> <span class="token parameter variable">-o</span> myapp <span class="token builtin class-name">.</span>

<span class="token comment"># 用 go build 配合环境变量控制：</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> go build <span class="token parameter variable">-o</span> myapp <span class="token builtin class-name">.</span>   <span class="token comment"># 关闭 CGO，静态纯 Go 二进制</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-代码质量工具链" tabindex="-1"><a class="header-anchor" href="#_7-代码质量工具链" aria-hidden="true">#</a> 7. 代码质量工具链</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 代码格式化与静态检查</span>
gofmt <span class="token parameter variable">-w</span> <span class="token builtin class-name">.</span>                 <span class="token comment"># 格式化</span>
goimports <span class="token parameter variable">-w</span> <span class="token builtin class-name">.</span>             <span class="token comment"># 按需安装：go install golang.org/x/tools/cmd/goimports@latest</span>
go vet ./<span class="token punctuation">..</span>.               <span class="token comment"># 内置静态检查</span>

<span class="token comment"># 第三方 lint（综合静态分析）</span>
go <span class="token function">install</span> github.com/golangci/golangci-lint/cmd/golangci-lint@latest
golangci-lint run ./<span class="token punctuation">..</span>.

<span class="token comment"># 错误处理检查</span>
go <span class="token function">install</span> github.com/kisielk/errcheck@latest
errcheck ./<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-gopath-模式与-module-模式" tabindex="-1"><a class="header-anchor" href="#_1-gopath-模式与-module-模式" aria-hidden="true">#</a> 1. GOPATH 模式与 module 模式</h3><p>新版 Go 默认使用模块模式，不要在 <code>GOPATH/src</code> 外缺少 <code>go.mod</code> 的目录里运行 <code>go build</code>，否则会报 <code>go: cannot find main module</code>。先执行 <code>go mod init 模块名</code>。若遇到 <code>go: cannot find main module; see &#39;go help modules&#39;</code>，说明当前目录无 <code>go.mod</code>。</p><h3 id="_2-网络与依赖下载" tabindex="-1"><a class="header-anchor" href="#_2-网络与依赖下载" aria-hidden="true">#</a> 2. 网络与依赖下载</h3><p>国内拉取模块常遇超时。已内置 <code>proxy.golang.com.cn</code> 加速，若仍失败可显式设置 <code>GOPROXY</code>（见第五节）。构建时建议使用 <code>go mod tidy</code> 而非手动 <code>go get</code>，避免 go.mod 出现多余条目。<br><strong>报错 <code>dial tcp: lookup proxy.golang.org: no such host</code></strong> 或超时，多半是代理未生效，按第五节设置 <code>GOPROXY</code> 后重试。企业内网/私有库可用 <code>GOPROXY=direct</code> 直连并配合 <code>GOPRIVATE</code> 跳过代理。</p><h3 id="_3-错误处理与返回值" tabindex="-1"><a class="header-anchor" href="#_3-错误处理与返回值" aria-hidden="true">#</a> 3. 错误处理与返回值</h3><p>新手常忽略 Go 的多返回值错误约定：函数末尾通常是 <code>(value, err)</code>，必须显式检查 <code>err != nil</code>，否则可能静默失败。另外，<strong>Go 对未使用的局部变量和导入会直接编译报错</strong>，这与许多语言不同，属设计约束而非缺陷。<br><strong>报错 <code>xxx declared and not used</code></strong> 与 <strong><code>imported and not used</code></strong>：删除未使用变量/导入，或用 <code>_</code> 占位忽略。</p><h3 id="_4-编译产物与体积" tabindex="-1"><a class="header-anchor" href="#_4-编译产物与体积" aria-hidden="true">#</a> 4. 编译产物与体积</h3><p>Go 默认静态链接且支持跨平台，二进制体积较大属正常现象。若需缩小体积，可加构建参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go build <span class="token parameter variable">-ldflags</span> <span class="token string">&quot;-s -w&quot;</span> <span class="token parameter variable">-trimpath</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：<code>-s -w</code> 会去掉符号表与调试信息，牺牲部分调试能力。调试崩溃可用 <code>GOTRACEBACK=all</code> 获得完整堆栈：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">GOTRACEBACK</span><span class="token operator">=</span>all ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-并发陷阱" tabindex="-1"><a class="header-anchor" href="#_5-并发陷阱" aria-hidden="true">#</a> 5. 并发陷阱</h3><p>goroutine 廉价但并非零成本，滥用会导致内存暴涨。往 channel 发送前需确认有接收方，否则会永久阻塞；defer 的互斥锁与 goroutine 泄漏是高频 bug 来源，建议配合 <code>go test -race</code> 做竞态检测：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token builtin class-name">test</span> <span class="token parameter variable">-race</span> ./<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>deadlock 检测</strong>：<code>go run</code> 会默认启用内建的死锁检测，程序若永久阻塞会在 60 秒后 panic 并打印堆栈。可用 <code>sync.WaitGroup</code> 确保所有 goroutine 结束。</p><h3 id="_6-环境与工具版本不匹配" tabindex="-1"><a class="header-anchor" href="#_6-环境与工具版本不匹配" aria-hidden="true">#</a> 6. 环境与工具版本不匹配</h3><p><code>gopls</code> 或 <code>golangci-lint</code> 报错 <code>requires go &gt;= x</code> 时，用 <code>go install ...@latest</code> 升级。Homebrew 升级 Go 后，若二进制报 <code>linker or compiler not found</code>，通常是 CGO 环境问题，可 <code>go clean -cache</code> 后重试或 <code>CGO_ENABLED=0</code> 规避。</p><h3 id="_7-安全与性能注意点" tabindex="-1"><a class="header-anchor" href="#_7-安全与性能注意点" aria-hidden="true">#</a> 7. 安全与性能注意点</h3><ul><li><strong>依赖供应链</strong>：<code>go get</code> 会拉取任意公开模块，务必通过 <code>go.sum</code> 校验完整性，不要关闭校验。</li><li><strong>环境变量注入</strong>：<code>-ldflags -X</code> 可注入版本号，但不要用它注入敏感信息（可被读取）。</li><li><strong>二进制默认不加密</strong>：发布前可用 <code>upx</code> 压缩（<code>upx myapp</code>），注意部分场景会被安全软件误报。</li><li><strong>构建缓存</strong>：<code>go build</code> 有缓存，修改代码后记得重新构建，避免发布旧产物。查看缓存：<code>go env GOCACHE</code>。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-与-makefile-自动化构建" tabindex="-1"><a class="header-anchor" href="#_1-与-makefile-自动化构建" aria-hidden="true">#</a> 1. 与 Makefile 自动化构建</h3><p>标准 Go 项目常用 Makefile 封装常见命令，配合 git tag 生成版本号：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment"># Makefile</span>
BINARY  <span class="token operator">=</span> myapp
VERSION <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> git describe --tags --always<span class="token punctuation">)</span>
LDFLAGS <span class="token operator">:=</span> -s -w -X main.version<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>VERSION<span class="token punctuation">)</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> build test vet lint clean install

<span class="token target symbol">build</span><span class="token punctuation">:</span>
	CGO_ENABLED<span class="token operator">=</span>0 go build -ldflags <span class="token string">&quot;$(LDFLAGS)&quot;</span> -o bin/<span class="token variable">$</span><span class="token punctuation">(</span>BINARY<span class="token punctuation">)</span> .

<span class="token target symbol">test</span><span class="token punctuation">:</span>
	go test -race -cover ./...

<span class="token target symbol">vet</span><span class="token punctuation">:</span>
	go vet ./...

<span class="token target symbol">lint</span><span class="token punctuation">:</span>
	golangci-lint run ./...

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -rf bin tmp

<span class="token target symbol">install</span><span class="token punctuation">:</span>
	go install -ldflags <span class="token string">&quot;$(LDFLAGS)&quot;</span> .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用法：<code>make build</code>、<code>make test</code>、<code>make lint</code>、<code>make install</code>。</p><h3 id="_2-与-docker-多阶段构建" tabindex="-1"><a class="header-anchor" href="#_2-与-docker-多阶段构建" aria-hidden="true">#</a> 2. 与 Docker 多阶段构建</h3><p>生产级实践通常用多阶段构建，先编译再拷贝最小镜像，并关闭 CGO 以获得静态二进制：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># Dockerfile</span>
<span class="token comment"># 阶段一：编译</span>
<span class="token instruction"><span class="token keyword">FROM</span> golang:1.25-alpine <span class="token keyword">AS</span> builder</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>
<span class="token instruction"><span class="token keyword">COPY</span> go.mod go.sum ./</span>
<span class="token instruction"><span class="token keyword">RUN</span> go mod download</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 go build -ldflags <span class="token string">&quot;-s -w&quot;</span> -o /app/server .</span>

<span class="token comment"># 阶段二：运行（极简镜像）</span>
<span class="token instruction"><span class="token keyword">FROM</span> alpine:3.20</span>
<span class="token instruction"><span class="token keyword">RUN</span> adduser -D appuser</span>
<span class="token instruction"><span class="token keyword">USER</span> appuser</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/server /server</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/server&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建并运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> myapp <span class="token builtin class-name">.</span>
<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-与-ci-github-actions-集成" tabindex="-1"><a class="header-anchor" href="#_3-与-ci-github-actions-集成" aria-hidden="true">#</a> 3. 与 CI（GitHub Actions）集成</h3><p>在 <code>.github/workflows/go.yml</code> 中加入 Go 检查、测试与构建：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Go
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">,</span> pull_request<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>go@v5
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">go-version</span><span class="token punctuation">:</span> <span class="token string">&#39;1.25&#39;</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Vet
        <span class="token key atrule">run</span><span class="token punctuation">:</span> go vet ./<span class="token punctuation">...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Test
        <span class="token key atrule">run</span><span class="token punctuation">:</span> go test <span class="token punctuation">-</span>race <span class="token punctuation">-</span>cover ./<span class="token punctuation">...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> go build <span class="token punctuation">-</span>o bin/app .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配合缓存，CI 中 <code>go mod download</code> 可通过 actions/setup-go 的 <code>cache: true</code> 加速依赖拉取。</p><h3 id="_4-批量处理与代码生成" tabindex="-1"><a class="header-anchor" href="#_4-批量处理与代码生成" aria-hidden="true">#</a> 4. 批量处理与代码生成</h3><p>利用 <code>go:generate</code> 批量生成代码，避免手写重复样板：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//go:generate go run github.com/99designs/gqlgen generate</span>
<span class="token keyword">package</span> main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配合 shell 批量处理多个模块或文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 批量格式化所有 .go 文件</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">&#39;*.go&#39;</span> <span class="token parameter variable">-not</span> <span class="token parameter variable">-path</span> <span class="token string">&#39;./vendor/*&#39;</span> <span class="token parameter variable">-exec</span> gofmt <span class="token parameter variable">-w</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>

<span class="token comment"># 批量运行每个子模块的测试</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">d</span> <span class="token keyword">in</span> ./services/*/<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token punctuation">(</span>cd <span class="token string">&quot;<span class="token variable">$d</span>&quot;</span> <span class="token operator">&amp;&amp;</span> go <span class="token builtin class-name">test</span> ./<span class="token punctuation">..</span>.<span class="token punctuation">)</span>
<span class="token keyword">done</span>

<span class="token comment"># 批量静态检查</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">d</span> <span class="token keyword">in</span> ./cmd/*/<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token punctuation">(</span>cd <span class="token string">&quot;<span class="token variable">$d</span>&quot;</span> <span class="token operator">&amp;&amp;</span> go vet ./<span class="token punctuation">..</span>.<span class="token punctuation">)</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-与其它工具搭配" tabindex="-1"><a class="header-anchor" href="#_5-与其它工具搭配" aria-hidden="true">#</a> 5. 与其它工具搭配</h3><ul><li><strong>与 Delve 调试</strong>：<code>go install github.com/go-delve/delve/cmd/dlv@latest</code>，在 VS Code 或命令行中断点调试。</li><li><strong>与 sqlc / ORM 生成</strong>：<code>go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest</code>，从 SQL 生成类型安全的 Go 代码。</li><li><strong>与 swag 文档生成</strong>：<code>go install github.com/swaggo/swag/cmd/swag@latest</code>，从注释自动生成 Swagger/OpenAPI 文档。</li><li><strong>与 ko 容器工具</strong>：<code>go install github.com/google/ko@latest</code>，无需 Dockerfile 直接构建并推送 Go 应用镜像。</li></ul><h3 id="_6-生产级发布脚本示例" tabindex="-1"><a class="header-anchor" href="#_6-生产级发布脚本示例" aria-hidden="true">#</a> 6. 生产级发布脚本示例</h3><p>一个结合 git tag、交叉编译、构建多平台二进制的发布脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail

<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> describe <span class="token parameter variable">--tags</span> <span class="token parameter variable">--always</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;发布版本：<span class="token variable">$VERSION</span>&quot;</span>

<span class="token comment"># 清理</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> dist <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> dist

<span class="token comment"># 多平台交叉编译</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">os</span> <span class="token keyword">in</span> linux darwin windows<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">arch</span> <span class="token keyword">in</span> amd64 arm64<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$os</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;windows&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">ext</span><span class="token operator">=</span><span class="token string">&quot;.exe&quot;</span> <span class="token operator">||</span> <span class="token assign-left variable">ext</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;构建 <span class="token variable">$os</span>/<span class="token variable">$arch</span> ...&quot;</span>
    <span class="token assign-left variable">GOOS</span><span class="token operator">=</span><span class="token variable">$os</span> <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span><span class="token variable">$arch</span> <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">\\</span>
      go build <span class="token parameter variable">-ldflags</span> <span class="token string">&quot;-s -w -X main.version=<span class="token variable">$VERSION</span>&quot;</span> <span class="token punctuation">\\</span>
      <span class="token parameter variable">-o</span> <span class="token string">&quot;dist/myapp-<span class="token variable">\${os}</span>-<span class="token variable">\${arch}</span><span class="token variable">\${ext}</span>&quot;</span> <span class="token builtin class-name">.</span>
  <span class="token keyword">done</span>
<span class="token keyword">done</span>

<span class="token comment"># 生成校验和</span>
<span class="token punctuation">(</span>cd dist <span class="token operator">&amp;&amp;</span> sha256sum * <span class="token operator">&gt;</span> SHA256SUMS<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;完成，产物在 dist/ 目录：&quot;</span>
<span class="token function">ls</span> <span class="token parameter variable">-lh</span> dist/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-性能剖析与调优" tabindex="-1"><a class="header-anchor" href="#_7-性能剖析与调优" aria-hidden="true">#</a> 7. 性能剖析与调优</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成 CPU/内存剖析文件</span>
go <span class="token builtin class-name">test</span> <span class="token parameter variable">-cpuprofile</span> cpu.prof <span class="token parameter variable">-memprofile</span> mem.prof <span class="token parameter variable">-bench</span> <span class="token builtin class-name">.</span> ./<span class="token punctuation">..</span>.
<span class="token comment"># 用 pprof 交互分析</span>
go tool pprof myapp.test cpu.prof

<span class="token comment"># 对运行中的程序采集（pprof 端口）</span>
go tool pprof http://localhost:6060/debug/pprof/profile
<span class="token comment"># 需在程序中引入 _ &quot;net/http/pprof&quot; 并启动 HTTP 服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 在 main.go 中启用 pprof（仅供调试，生产环境建议按需开启）</span>
<span class="token keyword">import</span> <span class="token boolean">_</span> <span class="token string">&quot;net/http/pprof&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,92),o=[l];function t(c,d){return s(),a("div",null,o)}const u=n(i,[["render",t],["__file","go.html.vue"]]);export{u as default};
