---
title: bazel
icon: code
category:
  - 工具
  - 构建系统
tag:
  - 开发构建
  - bazel
---

# bazel（Google 的构建工具，支持多语言大型项目构建）

> Homebrew 版本 8.4.2 ｜ 主页：见官方文档 ｜ 安装：`brew install bazel`

## 一、它是什么

bazel 是 Google 开源的构建与测试工具，核心思路是「可复现构建」：它通过哈希校验源码、构建配置和工具链，只在输入发生变化时才重做增量构建，从而在大型多语言项目中实现快速、可靠、可并行的构建。它自带强大的**沙箱隔离**、**远程缓存**和**远程执行**能力，并内置对 C++、Java、Python、Go、JavaScript、Rust 等众多语言的原生支持。典型应用场景包括：单体仓库（monorepo）多语言构建、需要精确控制依赖版本的可复现 CI/CD、以及基于 Bazel 生态（如 TensorFlow、Google 系开源项目）的开发环境。

## 二、安装与升级

通过 Homebrew 安装、升级和卸载：

```bash
# 安装
brew install bazel

# 升级到最新版本
brew upgrade bazel

# 卸载
brew uninstall bazel
```

验证安装是否成功：

```bash
bazel --version
# 预期输出：bazel 8.4.2
```

> 提示：Homebrew 安装的 bazel 是官方发行版二进制。若需要与 Bazelisk（版本管理器）搭配使用，见下文「五、进阶技巧与配置」。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `bazel build <target>` | 构建指定目标（可带标签/通配符） | `bazel build //src/main:app` |
| `bazel test <target>` | 运行目标的测试 | `bazel test //tests:all` |
| `bazel run <target>` | 构建并运行可执行目标 | `bazel run //src/main:app` |
| `bazel query <expr>` | 查询依赖图/目标（如 `deps(...)`） | `bazel query 'deps(//src/main:app)'` |
| `bazel clean` | 清理构建产物（增量缓存） | `bazel clean --expunge` |
| `bazel analyze-profile <file>` | 分析构建性能 profile | `bazel analyze-profile command.profile.gz` |
| `bazel info <key>` | 查询工作区信息（如 `bazel-bin` 路径） | `bazel info output_base` |
| `bazel shutdown` | 关闭常驻 bazel 服务器进程 | `bazel shutdown` |
| `bazel help <cmd>` | 查看某条命令的详细帮助 | `bazel help query` |
| `bazel build ...` | 构建整个工作区所有目标 | `bazel build //...` |

> 常用修饰参数：`--verbose_failures`（显示详细报错）、`-s`（打印执行的每条命令）、`--keep_going`（出错后继续）、`--jobs=N`（并行任务数）、`--//option=value`（自定义 Starlark 标志）。

## 四、实际示例

### 示例 1：最小 C++ 可执行程序

准备目录结构：

```bash
mkdir -p ~/demo-bazel-cpp/src/main
cd ~/demo-bazel-cpp
```

创建 `MODULE.bazel`（Bazel 8 的模块文件）：

```bash
cat > MODULE.bazel <<'EOF'
module(name = "demo_cpp")
EOF
```

创建源码 `src/main/hello.cc`：

```bash
cat > src/main/hello.cc <<'EOF'
#include <iostream>
int main() {
  std::cout << "Hello, Bazel!\n";
  return 0;
}
EOF
```

创建构建文件 `src/main/BUILD`：

```bash
cat > src/main/BUILD <<'EOF'
cc_binary(
    name = "hello",
    srcs = ["hello.cc"],
)
EOF
```

执行构建并运行：

```bash
bazel build //src/main:hello
# 输出：INFO: Build completed successfully, 1 total action
bazel run //src/main:hello
# 输出：Hello, Bazel!
```

### 示例 2：带单元测试的 Python 程序

```bash
mkdir -p ~/demo-bazel-py && cd ~/demo-bazel-py
cat > MODULE.bazel <<'EOF'
module(name = "demo_py")
EOF

# 库模块
mkdir -p src/lib
cat > src/lib/greet.py <<'EOF'
def greet(name):
    return f"Hello, {name}!"
EOF
cat > src/lib/BUILD <<'EOF'
py_library(
    name = "greet",
    srcs = ["greet.py"],
)
EOF

# 测试模块
mkdir -p tests
cat > tests/greet_test.py <<'EOF'
import unittest
from lib.greet import greet

class GreetTest(unittest.TestCase):
    def test_greet(self):
        self.assertEqual(greet("world"), "Hello, world!")

if __name__ == "__main__":
    unittest.main()
EOF
cat > tests/BUILD <<'EOF'
py_test(
    name = "greet_test",
    srcs = ["greet_test.py"],
    deps = ["//src/lib:greet"],
)
EOF
```

运行测试：

```bash
bazel test //tests:greet_test
# 输出：PASSED in 0.1s
# 信息：Executed 1 test from 1 test target.
```

### 示例 3：Go 程序的构建与运行

```bash
mkdir -p ~/demo-bazel-go && cd ~/demo-bazel-go
cat > MODULE.bazel <<'EOF'
module(name = "demo_go")
go_deps = use_extension("@gazelle//:extensions.bzl", "go_deps")
EOF
mkdir -p src/main
cat > src/main/main.go <<'EOF'
package main

import "fmt"

func main() {
	fmt.Println("Hello from Go via Bazel!")
}
EOF
cat > src/main/BUILD <<'EOF'
load("@rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "app",
    srcs = ["main.go"],
)
EOF
```

> 注意：Go 与 Rust 等规则需先在 `MODULE.bazel` 中声明依赖（`bazel_dep(name = "rules_go", version = "...")`）。构建后：

```bash
bazel run //src/main:app
# 输出：Hello from Go via Bazel!
```

## 五、进阶技巧与配置

### 1. 用 Bazelisk 管理多版本 bazel

Bazel 版本切换频繁，建议用 Bazelisk 按项目自动选择版本：

```bash
brew install bazelisk
# 项目根目录写 .bazelversion 即可固定版本
echo "8.4.2" > .bazelversion
```

之后直接用 `bazelisk`（或软链 `bazel`）运行，它会按 `.bazelversion` 自动下载对应版本。

### 2. 配置文件 `.bazelrc`

Bazel 默认读取工作区根目录的 `.bazelrc`，可放常用默认参数：

```bash
# .bazelrc 示例
build --features=per_object_debug_info   # C++ 更细粒度增量
build --verbose_failures                 # 显示失败详细日志
test --test_output=errors                # 只打印失败测试的输出
common --announce_rc                     # 启动时打印加载的 rc
```

常用环境变量：`HOME` 下的 `~/.bazelrc` 是用户级配置，优先级低于项目级；`JAVA_HOME` 影响 bazel 的 Java 工具链。

### 3. 与其它工具的搭配

- **与 GCC/Clang 混用**：用 `--config` 或 `--cxxopt` 指定编译器与标志，如 `bazel build --cxxopt=-O3 //src/main:hello`。
- **与 CI 集成**：`bazel test --test_output=errors //...` 是常见的 CI 入口；配合 `--build_event_json_file` 输出构建事件供外部系统消费。
- **与 IDE（如 VSCode、CLion、IntelliJ）**：`bazel query` 配合 `bazel build //...` 可生成编译数据库（如 `compile_commands.json`）供编辑器跳转、补全。

### 4. 增量与缓存优化

Bazel 默认启用磁盘缓存（`--disk_cache`），可指定跨机器共享缓存目录；远程执行（`--remote_executor`）可将任务分发到云端。`bazel clean` 不会清空外部依赖下载缓存，彻底清理用 `bazel clean --expunge`。

## 六、注意事项与常见问题

### 新手容易踩的坑

- **别把 BUILD 文件放错层级**：每个目录的 `BUILD` 文件只负责该目录下的目标，跨目录引用必须写完整标签（如 `//src/lib:greet`），不能省略包路径。
- **srcs 只列源码，不列头文件目录**：头文件用 `includes`/`hdrs` 声明，Bazel 沙箱不会默认给你系统搜索路径。
- **工作区必须有 `MODULE.bazel`（或 `WORKSPACE`）**：在空目录直接跑 `bazel build` 会报「not within the directory hierarchy」之类的错，先初始化模块文件。
- **依赖第三方包要声明 `bazel_dep`**：在 `MODULE.bazel` 里声明后用 `bazel fetch` 拉取，不要手动 `cp` 源码进仓库，否则破坏可复现性。

### 常见报错及解决办法

- **`ERROR: /path/BUILD:1:10: no such package '...'`**：目标路径写错，检查标签是否存在、拼写是否一致。
- **`ERROR: Could not find a Python interpreter`**：Bazel 找不到 Python 工具链，安装系统 Python 或在 `.bazelrc` 指定 `--python_path`。
- **`Permission denied` / 沙箱报错**：Bazel 使用沙箱执行，若脚本依赖系统路径，用 `--sandbox_writable_path` 或 `--no_sandbox` 临时关闭沙箱验证。
- **`server crashed` 或异常退出**：删除 `.bazel_cache` 或 `bazel clean --expunge` 后重试；也可能是磁盘/内存不足。

### 性能与安全注意点

- **避免巨型目标**：把代码拆成小目标，Bazel 的增量粒度按目标（target）计算，目标过大会拖慢变更重建。
- **谨慎使用 `glob`**：`glob(["**/*.cc"])` 会扫描全目录，文件多时显著拖慢构建分析，尽量显式列出或缩小范围。
- **默认下载依赖来自网络**：企业内网或安全要求高的环境，先 `bazel fetch //...` 预拉依赖并校验校验和，或配置镜像源。
- **常驻服务器**：`bazel` 会启动常驻 server 进程，占用内存；长期不用可用 `bazel shutdown` 释放。
- **权限与敏感信息**：BUILD 里的 `data` 文件会被复制进沙箱，别把密钥等敏感文件当作 data 或源码提交。