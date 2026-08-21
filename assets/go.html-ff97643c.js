import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,e as a}from"./app-f7ddf95e.js";const i={},d=a(`<h1 id="go-go-编程语言-golang" tabindex="-1"><a class="header-anchor" href="#go-go-编程语言-golang" aria-hidden="true">#</a> go（Go 编程语言（Golang））</h1><blockquote><p>Homebrew 版本 1.25.5 ｜ 主页：见官方文档 ｜ 安装：<code>brew install go</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>Go（又称 Golang）是 Google 于 2009 年推出的开源静态类型编译语言，以极简语法、并发原语（goroutine + channel）和极快的编译/启动速度著称。它主要解决高并发网络服务、云原生基础设施与 CLI 工具开发中的工程化问题——单一二进制交付、内置垃圾回收、无虚拟机直接编译成机器码。典型应用场景包括：Web 后端（如 Gin、Echo 框架）、微服务与 API 网关、云原生工具（Docker、Kubernetes、Prometheus 均为 Go 编写）以及运维 CLI 工具。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><p>Go 在 macOS 上推荐通过 Homebrew 安装，会同时带来 <code>go</code> 命令行、标准库与工具链。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后 <code>go</code> 自动加入 PATH（Homebrew 的 <code>/opt/homebrew/bin</code>）。若需手动设置环境变量，参考第五节。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数/说明</th><th>示例</th></tr></thead><tbody><tr><td><code>go run</code></td><td>编译并直接运行 main 包</td><td><code>go run main.go</code></td></tr><tr><td><code>go build</code></td><td>编译当前目录为可执行文件</td><td><code>go build -o myapp .</code></td></tr><tr><td><code>go install</code></td><td>编译并安装到 <code>GOBIN</code>/<code>GOPATH/bin</code></td><td><code>go install ./cmd/mytool</code></td></tr><tr><td><code>go test</code></td><td>运行测试（<code>-v</code> 显示详细、<code>-run</code> 过滤用例）</td><td><code>go test -v ./...</code></td></tr><tr><td><code>go mod init</code></td><td>初始化模块（生成 <code>go.mod</code>）</td><td><code>go mod init example.com/myapp</code></td></tr><tr><td><code>go mod tidy</code></td><td>同步依赖，清理 <code>go.mod</code>/<code>go.sum</code></td><td><code>go mod tidy</code></td></tr><tr><td><code>go get</code></td><td>添加或升级模块依赖</td><td><code>go get github.com/gin-gonic/gin</code></td></tr><tr><td><code>go fmt</code></td><td>格式化源码（gofmt 的等价命令）</td><td><code>go fmt ./...</code></td></tr><tr><td><code>go vet</code></td><td>静态检查常见错误</td><td><code>go vet ./...</code></td></tr><tr><td><code>go env</code></td><td>查看/设置 Go 环境变量</td><td><code>go env GOPATH</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-hello-world-与运行" tabindex="-1"><a class="header-anchor" href="#示例-1-hello-world-与运行" aria-hidden="true">#</a> 示例 1：Hello World 与运行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建项目目录并初始化模块</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-与编辑器搭配-lsp-语言服务器" tabindex="-1"><a class="header-anchor" href="#_2-与编辑器搭配-lsp-语言服务器" aria-hidden="true">#</a> 2. 与编辑器搭配（LSP 语言服务器）</h3><p>安装 <code>gopls</code> 获得代码补全、跳转定义、重构等 IDE 能力，主流编辑器（VS Code、Neovim、JetBrains）均原生支持：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token function">install</span> golang.org/x/tools/gopls@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>VS Code 安装 Go 扩展后自动使用 gopls；Neovim 用户可用 <code>lspconfig</code> 接入。</p><h3 id="_3-热重载开发-第三方工具" tabindex="-1"><a class="header-anchor" href="#_3-热重载开发-第三方工具" aria-hidden="true">#</a> 3. 热重载开发（第三方工具）</h3><p>日常迭代可用 <code>air</code> 实现文件变更自动重启，避免手动 <code>go run</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token function">install</span> github.com/air-verse/air@latest
<span class="token comment"># 在项目根目录运行 air，即可监听 .go 文件并自动重启</span>
air
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-交叉编译-为不同平台构建二进制" tabindex="-1"><a class="header-anchor" href="#_4-交叉编译-为不同平台构建二进制" aria-hidden="true">#</a> 4. 交叉编译（为不同平台构建二进制）</h3><p>通过 <code>GOOS</code>/<code>GOARCH</code> 环境变量轻松交叉编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 macOS 上为 Linux x86_64 编译</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token parameter variable">-o</span> myapp-linux <span class="token builtin class-name">.</span>
<span class="token comment"># 在 macOS 上为 Windows 编译</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token parameter variable">-o</span> myapp.exe <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><h3 id="_1-gopath-模式与-module-模式" tabindex="-1"><a class="header-anchor" href="#_1-gopath-模式与-module-模式" aria-hidden="true">#</a> 1. GOPATH 模式与 module 模式</h3><p>新版 Go 默认使用模块模式，不要在 <code>GOPATH/src</code> 外缺少 <code>go.mod</code> 的目录里运行 <code>go build</code>，否则会报 <code>go: cannot find main module</code>。先执行 <code>go mod init 模块名</code>。</p><h3 id="_2-网络与依赖下载" tabindex="-1"><a class="header-anchor" href="#_2-网络与依赖下载" aria-hidden="true">#</a> 2. 网络与依赖下载</h3><p>国内拉取模块常遇超时。已内置 <code>proxy.golang.com.cn</code> 加速，若仍失败可显式设置 <code>GOPROXY</code>（见第五节）。构建时建议使用 <code>go mod tidy</code> 而非手动 <code>go get</code>，避免 go.mod 出现多余条目。</p><h3 id="_3-错误处理与返回值" tabindex="-1"><a class="header-anchor" href="#_3-错误处理与返回值" aria-hidden="true">#</a> 3. 错误处理与返回值</h3><p>新手常忽略 Go 的多返回值错误约定：函数末尾通常是 <code>(value, err)</code>，必须显式检查 <code>err != nil</code>，否则可能静默失败。另外，<strong>Go 对未使用的局部变量和导入会直接编译报错</strong>，这与许多语言不同，属设计约束而非缺陷。</p><h3 id="_4-编译产物与体积" tabindex="-1"><a class="header-anchor" href="#_4-编译产物与体积" aria-hidden="true">#</a> 4. 编译产物与体积</h3><p>Go 默认静态链接且支持跨平台，二进制体积较大属正常现象。若需缩小体积，可加构建参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go build <span class="token parameter variable">-ldflags</span> <span class="token string">&quot;-s -w&quot;</span> <span class="token parameter variable">-trimpath</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：<code>-s -w</code> 会去掉符号表与调试信息，牺牲部分调试能力。</p><h3 id="_5-并发陷阱" tabindex="-1"><a class="header-anchor" href="#_5-并发陷阱" aria-hidden="true">#</a> 5. 并发陷阱</h3><p>goroutine 廉价但并非零成本，滥用会导致内存暴涨。往 channel 发送前需确认有接收方，否则会永久阻塞；defer 的互斥锁与 goroutine 泄漏是高频 bug 来源，建议配合 <code>go test -race</code> 做竞态检测：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token builtin class-name">test</span> <span class="token parameter variable">-race</span> ./<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,46),l=[d];function o(c,t){return e(),s("div",null,l)}const m=n(i,[["render",o],["__file","go.html.vue"]]);export{m as default};
