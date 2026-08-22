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

bazel 与其它构建系统（CMake、Make）相比最大的差异在于：它**从设计上假设你在一个大型仓库里做多语言、多目标、可并行的构建**。其「每个目标是独立单元、依赖通过标签显式声明」的模型，让增量与缓存策略远优于传统的按文件时间戳判断的 Make。

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
| `bazel fetch <target>` | 预拉取目标的所有外部依赖 | `bazel fetch //...` |
| `bazel cquery <expr>` | 查询「已配置」的目标（含编译参数展开结果） | `bazel cquery '//...' --output=starlark` |
| `bazel aquery <expr>` | 查询动作图（每个 Action 的具体命令行） | `bazel aquery 'mnemonic("CcCompile", //...)'` |
| `bazel coverage <target>` | 生成测试覆盖率 | `bazel coverage //tests:greet_test` |
| `bazel sync` | 同步外部依赖到本地 | `bazel sync` |
| `bazel dump --packages` | 输出工作区包/目标统计 | `bazel dump --packages` |

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

> 进阶：软链让 `bazel` 命令直接指向 Bazelisk，切换版本时无需改习惯：
>
> ```bash
> # 若 PATH 里已有真实 bazel，可临时覆盖（仅对当前 shell 生效）
> alias bazel=bazelisk
> # 或长期生效：把它写入 ~/.zshrc / ~/.bashrc
> echo 'alias bazel=bazelisk' >> ~/.zshrc
> ```

`.bazelversion` 支持写版本号、`latest`、`last_green` 等特殊值，也支持 `8.4.2@nix` 这类带平台后缀的形式。`bazelisk --version` 可看当前激活版本。

### 2. 配置文件 `.bazelrc`

Bazel 默认读取工作区根目录的 `.bazelrc`，可放常用默认参数：

```bash
# .bazelrc 示例
build --features=per_object_debug_info   # C++ 更细粒度增量
build --verbose_failures                 # 显示失败详细日志
test --test_output=errors                # 只打印失败测试的输出
common --announce_rc                     # 启动时打印加载的 rc
```

`.bazelrc` 支持**多段**配置，常用 `build:`、`test:`、`run:` 前缀分别作用于不同命令，还可定义**命名配置段**用 `--config` 一键切换：

```bash
# .bazelrc —— 完整生产级示例
# ===== 通用 =====
common --enable_bzlmod

# ===== 构建 =====
build --features=per_object_debug_info
build --verbose_failures
build --keep_going
build --jobs=8                     # 并行任务数
build --sandbox_tmpfs_path=/tmp     # 用内存文件系统加速临时文件
build --experimental_ui_max_stdouterr_bytes=-1

# ===== 测试 =====
test --test_output=errors
test --test_summary=short
test --test_timeout=60,300,900,3600  # 短/中/长/极大 四档超时

# ===== 缓存 =====
build --disk_cache=~/.cache/bazel-disk   # 本地磁盘缓存

# ===== 命名配置：发布版 =====
build:release --compilation_mode=opt
build:release --strip=always
build:release --copt=-O3

# ===== 命名配置：调试版 =====
build:debug --compilation_mode=dbg
build:debug --copt=-g

# ===== 命名配置：clang =====
build:clang --cxxopt=-stdlib=libc++

# ===== 命名配置：远程缓存 =====
build:remote --remote_cache=grpcs://remote.example.com
build:remote --remote_upload_local_results=false
EOF
```

用 `--config` 切换命名配置：

```bash
bazel build --config=release //...
bazel build --config=debug --config=clang //src/main:hello
bazel test --config=remote //...
```

### 3. 常用环境变量与关键配置项

| 环境变量 | 作用 |
| --- | --- |
| `HOME` | bazel 读取 `~/.bazelrc` 用户级配置，优先级低于项目级 |
| `JAVA_HOME` | 影响 bazel 的 Java 工具链（Java 规则需要） |
| `BAZELISK_HOME` | Bazelisk 下载各版本二进制的缓存目录（默认 `~/.cache/bazelisk`） |
| `BAZEL_OPTS` | 作为**默认命令参数**注入每次 bazel 调用 |
| `TMPDIR` | bazel 沙箱临时目录位置（磁盘不足时可换到大分区） |
| `PATH` | 决定工具链与各外部命令的解析顺序 |

常用构建标志（可在命令行或 `.bazelrc` 中使用）：

- `--compilation_mode=fastbuild|dbg|opt`：编译优化级别，`opt` 对应 `-O3`。
- `--copt=-O3` / `--cxxopt=-std=c++17`：给编译器传额外参数。
- `--define=foo=bar`：向规则注入自定义宏，供 `select()` 分支判断。
- `--platforms=//:linux_x86_64`：显式指定目标平台（跨编译必备）。
- `--//foo:my_flag=true`：覆盖自定义 Starlark 构建标志。
- `--nobuild`：只做分析与动作图，不真正编译（用于快速查错）。
- `--noincremental_dexing`：Android 场景关闭增量处理，排查诡异 bug。

### 4. 个性化与效率设置

```bash
# 让 bazel 输出更精简
echo 'common --ui_event_filters=-info' >> .bazelrc

# 为每次构建自动打印 action 进度条颜色（默认开启）
# 关闭彩色输出（适合 CI 日志归档）
echo 'common --color=no' >> .bazelrc

# 限制系统资源占用（适合笔记本/共享服务器）
echo 'build --local_cpu_resources=4' >> .bazelrc

# 跳过检查未使用依赖（默认关闭，可显式开启）
echo 'build --experimental_disable_external_package_bounds_check' >> .bazelrc
```

> 提示：`bazel --announce_rc` 会在每次启动时打印它实际加载了哪些 `.bazelrc` 段，排查「为什么参数没生效」很实用。

### 5. 增量与缓存优化

Bazel 默认启用磁盘缓存（`--disk_cache`），可指定跨机器共享缓存目录；远程执行（`--remote_executor`）可将任务分发到云端。`bazel clean` 不会清空外部依赖下载缓存，彻底清理用 `bazel clean --expunge`。

进阶策略：

```bash
# 用远程缓存共享构建产物（CI 与本地共享，命中后秒级）
bazel build --remote_cache=grpcs://remote.example.com:443 //...

# 配合 --remote_download_minimal 只下载结果不下载中间产物
bazel build --remote_download_minimal //...

# 查看某次构建的缓存命中率
bazel build --profile=out.profile.gz //...
bazel analyze-profile out.profile.gz --output=text

# 用 --disk_cache 指定大容量分区，避免占满系统盘
echo 'build --disk_cache=/Volumes/Data/bazel-cache' >> .bazelrc
```

### 6. 多语言混合项目

Bazel 强项之一就是**一个仓库混合多种语言**，用 `cc_`、`py_`、`java_`、`go_` 等规则定义目标，跨语言通过 `deps` 引用即可。跨语言互调用例：

```bash
# BUILD 中：C++ 库被 Python 引用
# 用 py_extension 或 pybind11 规则桥接 C++ 扩展
load("@pybind11_bazel//:build_defs.bzl", "pybind_extension")

pybind_extension(
    name = "my_cpp_ext",
    srcs = ["my_cpp_ext.cc"],
    deps = ["//src/core:core_lib"],
)
```

在 `MODULE.bazel` 声明多个规则集：

```bash
bazel_dep(name = "rules_go", version = "0.55.0")
bazel_dep(name = "gazelle", version = "0.40.0")
bazel_dep(name = "rules_rust", version = "0.54.0")
bazel_dep(name = "rules_python", version = "0.47.0")
bazel_dep(name = "rules_java", version = "8.3. Branches/8.3.0")
```

## 六、注意事项与常见问题

### 新手容易踩的坑

- **别把 BUILD 文件放错层级**：每个目录的 `BUILD` 文件只负责该目录下的目标，跨目录引用必须写完整标签（如 `//src/lib:greet`），不能省略包路径。
- **srcs 只列源码，不列头文件目录**：头文件用 `includes`/`hdrs` 声明，Bazel 沙箱不会默认给你系统搜索路径。
- **工作区必须有 `MODULE.bazel`（或 `WORKSPACE`）**：在空目录直接跑 `bazel build` 会报「not within the directory hierarchy」之类的错，先初始化模块文件。
- **依赖第三方包要声明 `bazel_dep`**：在 `MODULE.bazel` 里声明后用 `bazel fetch` 拉取，不要手动 `cp` 源码进仓库，否则破坏可复现性。
- **修改 `.bazelrc` 后忘了重启**：常驻 server 会缓存部分解析结果，遇到诡异行为先 `bazel shutdown` 再试。
- **忽略 `.bazelignore`**：若仓库含不应被 bazel 管理的目录（如 `vendor/`、`third_party/`），可在根目录写 `.bazelignore` 排除。
- **在 Windows 上踩 `--sandbox` 的坑**：Windows 沙箱支持较弱，必要时用 `--no_sandbox` 或 WSL 2 环境。
- **把构建产物提交进 git**：`bazel-bin`、`bazel-out` 等符号链接目录应加入 `.gitignore`，否则仓库瞬间膨胀。

### 常见报错及解决办法

- **`ERROR: /path/BUILD:1:10: no such package '...'`**：目标路径写错，检查标签是否存在、拼写是否一致。
- **`ERROR: Could not find a Python interpreter`**：Bazel 找不到 Python 工具链，安装系统 Python 或在 `.bazelrc` 指定 `--python_path`。
- **`Permission denied` / 沙箱报错**：Bazel 使用沙箱执行，若脚本依赖系统路径，用 `--sandbox_writable_path` 或 `--no_sandbox` 临时关闭沙箱验证。
- **`server crashed` 或异常退出**：删除 `.bazel_cache` 或 `bazel clean --expunge` 后重试；也可能是磁盘/内存不足。
- **`ERROR: error loading package '': Encountered error while reading extension file`**：`MODULE.bazel` 里某个 `bazel_dep` 版本号写错或不存在，用 `bazel mod graph` 检查依赖树。
- **`Analysis failed due to undeclared inclusion(s)`**：C++ 代码隐式 include 了未在 `hdrs` 声明头文件，把该头加入 `hdrs` 或 `includes`。
- **`java.lang.OutOfMemoryError`**：bazel server 堆内存不足，用 `--host_jvm_args=-Xmx4g` 调大，或 `bazel shutdown` 释放后重试。
- **`Build label ... is too old` / 版本不匹配**：项目 `.bazelversion` 与规则要求的版本冲突，用 Bazelisk 切换到规则支持的版本。
- **`The `sql` dialect ...` 之类语言专用报错**：多为规则版本过旧，升级对应 `rules_*` 依赖。

### 性能与安全注意点

- **避免巨型目标**：把代码拆成小目标，Bazel 的增量粒度按目标（target）计算，目标过大会拖慢变更重建。
- **谨慎使用 `glob`**：`glob(["**/*.cc"])` 会扫描全目录，文件多时显著拖慢构建分析，尽量显式列出或缩小范围。
- **默认下载依赖来自网络**：企业内网或安全要求高的环境，先 `bazel fetch //...` 预拉依赖并校验校验和，或配置镜像源。
- **常驻服务器**：`bazel` 会启动常驻 server 进程，占用内存；长期不用可用 `bazel shutdown` 释放。
- **权限与敏感信息**：BUILD 里的 `data` 文件会被复制进沙箱，别把密钥等敏感文件当作 data 或源码提交。
- **沙箱隔离有限**：Bazel 沙箱能隔离大部分副作用，但对显式逃逸（如 `--sandbox_writable_path`、genrule 里写绝对路径）不设防，生产环境应限制可写路径白名单。
- **远程执行传输敏感数据**：开启远程执行会把源码/产物上传到远端，注意不要涉及未脱敏的数据。

## 七、实战：与其它工具搭配与自动化

### 1. 与编译数据库（compile_commands）搭配，让编辑器完美跳转

CLion / VSCode / 其它 Clang 系 IDE 需要 `compile_commands.json`。可用官方 `compdb` 工具或第三方脚本生成：

```bash
# 安装 compdb（Python 工具）
pip install compdb

# 先构建一次生成 bazel 的编译数据库
bazel build --compdb //...

# 再转换出编辑器可读的 compile_commands.json
compdb -p bazel-bin list > compile_commands.json
```

> 也可用 Heighliner（https://github.com/hedronvision/bazel-compile-commands-extractor）这类规则，在 BUILD 里声明目标后一条命令产出。

### 2. 与 Makefile 封装，简化团队入口

Bazel 命令较长，可用 Makefile 封装常用操作，降低团队成员学习成本：

```bash
# Makefile
.PHONY: build test run clean fmt fetch

build:
	bazel build --config=debug //...

test:
	bazel test --test_output=errors //...

run:
	bazel run $(TARGET)

clean:
	bazel clean --expunge

fmt:
	# 需要先配置 buildifier 格式化 BUILD 文件
	buildifier -r .

fetch:
	bazel fetch //...
EOF
```

用法：`make build`、`make test TARGET=//src/main:hello`。

### 3. 用 buildifier 格式化 BUILD 与 .bzl

保持 BUILD 文件风格统一：

```bash
brew install buildifier
buildifier -r .            # 递归格式化工作区内所有 BUILD/.bzl
buildifier -mode=check .   # 只检查不修改（CI 用）
```

### 4. 与 Git 预提交钩子集成

在 `.pre-commit-config.yaml` 里加 buildifier 检查：

```yaml
repos:
  - repo: https://github.com/bazelbuild/buildtools
    rev: v7.1.2
    hooks:
      - id: buildifier
      - id: buildifier-lint
```

### 5. CI 集成（GitHub Actions / GitLab CI）

Bazel 自带 `--build_event_json_file` 和 `--bes_backend` 事件流，可接入 CI 面板与告警。GitHub Actions 示例：

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Mount bazel cache
        uses: actions/cache@v4
        with:
          path: |
            ~/.cache/bazel
            ~/.cache/bazelisk
          key: ${{ runner.os }}-bazel-${{ hashFiles('.bazelversion') }}
      - name: Build
        run: |
          bazel build --disk_cache=~/.cache/bazel //...
      - name: Test
        run: |
          bazel test --disk_cache=~/.cache/bazel --test_output=errors //...
      - name: Upload coverage
        run: |
          bazel coverage --combined_report=lcov //...
          bash <(curl -s https://codecov.io/bash)
```

关键点：

- 用 `actions/cache` 缓存 bazel 的磁盘缓存目录，CI 命中后构建大幅提速。
- `--disk_cache` 指向缓存目录，跨 job 复用。
- 启用 `--bes_backend=grpc://...` 可把事件流上报给 Build Event Service（如自建或 SaaS），获得更细的时序/告警。

### 6. 批量处理：一次性构建/测试整个仓库

```bash
# 构建与测试所有目标（含测试）
bazel build //...
bazel test //... --test_output=errors

# 只处理某前缀下的目标
bazel build //src/...

# 排除某些标签（如标记为 flaky 或 e2e）
bazel test //... --build_tag_filters=-e2e

# 只看失败测试，忽略 flaky 波动
bazel test //... --flaky_test_attempts=1
```

### 7. 生产级实践建议

- **拆分模块**：用 Bzlmod（`MODULE.bazel` + `bazel_dep`）做依赖管理，取代旧的 `WORKSPACE`。
- **锁定版本**：`MODULE.bazel.lock` 会自动生成，务必提交到 git，保证团队与 CI 依赖一致。
- **善用 `select()`**：在 BUILD 里用平台/配置分支适配不同系统，避免重复定义规则。
- **远端缓存优先**：把 CI 设为主构建方（`--remote_upload_local_results=false`），本地只读远端缓存，避免脏缓存。
- **定期清理**：写个 cron 定期 `bazel clean --expunge` 或清理 `~/.cache/bazel`，防止缓存无限膨胀。

### 8. 与 Gazelle 自动化生成 BUILD

Gazelle 是 Bazel 生态的 BUILD 文件生成器，对 Go、Python 等能自动推导规则：

```bash
# 在 Go 项目根目录
bazel run //:gazelle -- update
# 自动根据 go.mod 与源码生成/更新 BUILD 与 deps
```

把 `gazelle` 声明为根 BUILD 里的可运行目标，团队成员即可一条命令维护 BUILD 文件。

### 9. 一个完整的混合语言生产示例（Go 服务 + C++ 库）

```bash
mkdir -p ~/demo-mono && cd ~/demo-mono

# 模块声明
cat > MODULE.bazel <<'EOF'
module(name = "demo_mono")

bazel_dep(name = "rules_go", version = "0.55.0")
bazel_dep(name = "gazelle", version = "0.40.0")
EOF

# C++ 核心库
mkdir -p core
cat > core/math.cc <<'EOF'
extern "C" int add(int a, int b) { return a + b; }
EOF
cat > core/math.h <<'EOF'
extern "C" int add(int a, int b);
EOF
cat > core/BUILD <<'EOF'
cc_library(
    name = "math",
    srcs = ["math.cc"],
    hdrs = ["math.h"],
    visibility = ["//visibility:public"],
)
EOF

# Go 服务调用 C 库
mkdir -p service
cat > service/main.go <<'EOF'
package main

/*
#cgo LDFLAGS: -L${SRCDIR}/../bazel-bin/core
#include "math.h"
*/
import "C"
import "fmt"

func main() {
	fmt.Println("add(1,2) =", C.add(1, 2))
}
EOF
cat > service/BUILD <<'EOF'
load("@rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "svc",
    srcs = ["main.go"],
    cdeps = ["//core:math"],
    cgo = True,
)
EOF

bazel run //service:svc
# 输出：add(1,2) = 3
```

这个例子展示了 Bazel 处理「跨语言、带原生 cgo、需要正确依赖声明」的真实场景——这正是它优于普通脚本构建的地方。