---
title: go
icon: code
category:
  - 工具
  - 编程语言
tag:
  - 开发构建
  - go
---

# go（Go 编程语言（Golang））

> Homebrew 版本 1.25.5 ｜ 主页：见官方文档 ｜ 安装：`brew install go`

## 一、它是什么
Go（又称 Golang）是 Google 于 2009 年推出的开源静态类型编译语言，以极简语法、并发原语（goroutine + channel）和极快的编译/启动速度著称。它主要解决高并发网络服务、云原生基础设施与 CLI 工具开发中的工程化问题——单一二进制交付、内置垃圾回收、无虚拟机直接编译成机器码。典型应用场景包括：Web 后端（如 Gin、Echo 框架）、微服务与 API 网关、云原生工具（Docker、Kubernetes、Prometheus 均为 Go 编写）以及运维 CLI 工具。

## 二、安装与升级
Go 在 macOS 上推荐通过 Homebrew 安装，会同时带来 `go` 命令行、标准库与工具链。

```bash
# 安装
brew install go

# 验证安装
go version
# 期望输出：go version go1.25.5 darwin/arm64

# 查看环境配置（GOROOT、GOPATH、GOBIN 等）
go env

# 升级到最新版
brew upgrade go

# 卸载
brew uninstall go
```

安装后 `go` 自动加入 PATH（Homebrew 的 `/opt/homebrew/bin`）。若需手动设置环境变量，参考第五节。

## 三、常用命令速查

| 命令 | 参数/说明 | 示例 |
|------|-----------|------|
| `go run` | 编译并直接运行 main 包 | `go run main.go` |
| `go build` | 编译当前目录为可执行文件 | `go build -o myapp .` |
| `go install` | 编译并安装到 `GOBIN`/`GOPATH/bin` | `go install ./cmd/mytool` |
| `go test` | 运行测试（`-v` 显示详细、`-run` 过滤用例） | `go test -v ./...` |
| `go mod init` | 初始化模块（生成 `go.mod`） | `go mod init example.com/myapp` |
| `go mod tidy` | 同步依赖，清理 `go.mod`/`go.sum` | `go mod tidy` |
| `go get` | 添加或升级模块依赖 | `go get github.com/gin-gonic/gin` |
| `go fmt` | 格式化源码（gofmt 的等价命令） | `go fmt ./...` |
| `go vet` | 静态检查常见错误 | `go vet ./...` |
| `go env` | 查看/设置 Go 环境变量 | `go env GOPATH` |

## 四、实际示例

### 示例 1：Hello World 与运行
```bash
# 1. 创建项目目录并初始化模块
mkdir ~/hello && cd ~/hello
go mod init hello

# 2. 编写源码
cat > main.go <<'EOF'
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
}
EOF

# 3. 直接运行
go run main.go
# 输出：Hello, 世界

# 4. 编译成可执行文件（可脱离 Go 环境直接运行）
go build -o hello .
./hello
# 输出：Hello, 世界
```

### 示例 2：HTTP 服务器（标准库，无需第三方依赖）
```bash
# 1. 初始化模块
mkdir ~/webserver && cd ~/webserver
go mod init webserver

# 2. 编写源码
cat > main.go <<'EOF'
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "你好，%s！", r.URL.Path)
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("监听 :8080 ...")
    http.ListenAndServe(":8080", nil)
}
EOF

# 3. 运行并在浏览器打开 http://localhost:8080/你好
go run main.go
curl http://localhost:8080/world
# 输出：你好，/world！
```

### 示例 3：并发编程（goroutine 与 channel）
```bash
# 1. 创建项目
mkdir ~/concurrency && cd ~/concurrency
go mod init concurrency

# 2. 编写并发示例
cat > main.go <<'EOF'
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d 处理任务 %d\n", id, j)
        time.Sleep(100 * time.Millisecond) // 模拟耗时
        results <- j * 2
    }
}

func main() {
    const numJobs = 5
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)

    // 启动 3 个并发 worker
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // 派发任务
    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    // 收集结果
    for r := 1; r <= numJobs; r++ {
        fmt.Println("结果：", <-results)
    }
}
EOF

# 3. 运行
go run main.go
```

### 示例 4：编写并运行单元测试
```bash
# 1. 创建项目
mkdir ~/mymath && cd ~/mymath
go mod init mymath

# 2. 编写被测代码
cat > math.go <<'EOF'
package mymath

func Add(a, b int) int { return a + b }
EOF

# 3. 编写测试文件（文件名必须以 _test.go 结尾）
cat > math_test.go <<'EOF'
package mymath

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    if got != 5 {
        t.Errorf("Add(2,3) = %d, 期望 5", got)
    }
}
EOF

# 4. 运行测试
go test -v .
# 输出：PASS  ok  mymath
```

## 五、进阶技巧与配置

### 1. 常用环境变量（`go env` 查看，`go env -w` 持久化）
```bash
# 查看当前值
go env GOPATH GOBIN GOPROXY

# 设置 GOPROXY（国内加速，默认已含 goproxy.cn 链）
go env -w GOPROXY=https://proxy.golang.com.cn,direct

# 自定义模块缓存目录
go env -w GOMODCACHE=$HOME/.go/mod
```

### 2. 与编辑器搭配（LSP 语言服务器）
安装 `gopls` 获得代码补全、跳转定义、重构等 IDE 能力，主流编辑器（VS Code、Neovim、JetBrains）均原生支持：
```bash
go install golang.org/x/tools/gopls@latest
```
VS Code 安装 Go 扩展后自动使用 gopls；Neovim 用户可用 `lspconfig` 接入。

### 3. 热重载开发（第三方工具）
日常迭代可用 `air` 实现文件变更自动重启，避免手动 `go run`：
```bash
go install github.com/air-verse/air@latest
# 在项目根目录运行 air，即可监听 .go 文件并自动重启
air
```

### 4. 交叉编译（为不同平台构建二进制）
通过 `GOOS`/`GOARCH` 环境变量轻松交叉编译：
```bash
# 在 macOS 上为 Linux x86_64 编译
GOOS=linux GOARCH=amd64 go build -o myapp-linux .
# 在 macOS 上为 Windows 编译
GOOS=windows GOARCH=amd64 go build -o myapp.exe .
```

## 六、注意事项与常见问题

### 1. GOPATH 模式与 module 模式
新版 Go 默认使用模块模式，不要在 `GOPATH/src` 外缺少 `go.mod` 的目录里运行 `go build`，否则会报 `go: cannot find main module`。先执行 `go mod init 模块名`。

### 2. 网络与依赖下载
国内拉取模块常遇超时。已内置 `proxy.golang.com.cn` 加速，若仍失败可显式设置 `GOPROXY`（见第五节）。构建时建议使用 `go mod tidy` 而非手动 `go get`，避免 go.mod 出现多余条目。

### 3. 错误处理与返回值
新手常忽略 Go 的多返回值错误约定：函数末尾通常是 `(value, err)`，必须显式检查 `err != nil`，否则可能静默失败。另外，**Go 对未使用的局部变量和导入会直接编译报错**，这与许多语言不同，属设计约束而非缺陷。

### 4. 编译产物与体积
Go 默认静态链接且支持跨平台，二进制体积较大属正常现象。若需缩小体积，可加构建参数：
```bash
go build -ldflags "-s -w" -trimpath .
```
注意：`-s -w` 会去掉符号表与调试信息，牺牲部分调试能力。

### 5. 并发陷阱
goroutine 廉价但并非零成本，滥用会导致内存暴涨。往 channel 发送前需确认有接收方，否则会永久阻塞；defer 的互斥锁与 goroutine 泄漏是高频 bug 来源，建议配合 `go test -race` 做竞态检测：
```bash
go test -race ./...
```