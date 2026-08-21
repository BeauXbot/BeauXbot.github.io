---
title: ninja
icon: code
category:
  - 工具
  - 构建系统
tag:
  - 开发构建
  - ninja
---

# ninja（小型高速构建系统，常与 CMake 配合使用）

> Homebrew 版本 1.13.2 ｜ 主页：见官方文档 ｜ 安装：`brew install ninja`

## 一、它是什么

ninja 是一个专注于**速度**的小型构建系统，它的设计目标是在大规模项目的增量构建中做到极快。它不像 Make 那样内置复杂的构建逻辑，而是依赖上层工具（最常见的是 CMake）先生成描述文件，再由 ninja 快速执行，从而在几百上千个源文件的工程里实现近乎线性的构建时间。

典型应用场景：配合 CMake 生成 ninja 构建文件后编译大型 C/C++ 工程（如 Chromium、LLVM 都基于它），或在 CI 流水线中追求更快的编译反馈。它的定位是"底层执行引擎"，而不是"完整构建框架"。

## 二、安装与升级

通过 Homebrew 安装、升级、卸载，以及验证：

```bash
# 安装
brew install ninja

# 升级到最新版
brew upgrade ninja

# 卸载
brew uninstall ninja

# 验证安装成功（应输出类似 ninja version 1.13.2）
ninja --version

# 查看帮助
ninja -h
```

如果提示 `command not found`，先确认 `/opt/homebrew/bin`（Apple Silicon）或 `/usr/local/bin`（Intel）已在 PATH 中。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `ninja` | 无参数时按默认目标构建 | `ninja` |
| `ninja <target>` | 只构建指定目标 | `ninja ninjatool` |
| `ninja -C <dir>` | 先切换到指定目录再执行构建 | `ninja -C build` |
| `ninja -j N` | 指定并行任务数，默认按 CPU 核心数 | `ninja -j 8` |
| `ninja -t targets` | 列出所有可用的构建目标 | `ninja -t targets` |
| `ninja -t clean` | 清理构建产物 | `ninja -t clean` |
| `ninja -t commands` | 显示将执行的构建命令（不执行） | `ninja -t commands all` |
| `ninja -n` | 预演（dry run），只打印命令不执行 | `ninja -n` |
| `ninja -v` | 显示执行的详细命令行 | `ninja -v` |
| `ninja -t graph` | 以 Graphviz DOT 格式输出依赖图 | `ninja -t graph > graph.dot` |

## 四、实际示例

### 示例 1：与 CMake 配合编译一个 C++ 工程

最典型的用法：CMake 生成 ninja 构建文件，再用 ninja 编译。

```bash
# 1. 准备一个简单的 C++ 工程
mkdir -p demo && cd demo
cat > hello.cpp <<'EOF'
#include <iostream>
int main() {
    std::cout << "Hello, ninja!" << std::endl;
    return 0;
}
EOF

# 2. 用 CMake 生成 ninja 构建文件（进入 build 目录，避免污染源码树）
cmake -S . -B build -G Ninja

# 3. 执行构建
cmake --build build

# 4. 运行生成的可执行文件
./build/hello
```

输出应包含 `Hello, ninja!`。也可直接 `ninja -C build` 代替第 3 步。

### 示例 2：增量构建验证 ninja 的速度

在示例 1 的工程上测试增量编译：

```bash
# 修改源码后重新构建，ninja 只重编受影响的文件
echo '// just a comment to trigger rebuild' >> hello.cpp
time ninja -C build

# 不做任何修改再次构建，应几乎瞬间完成
time ninja -C build
# 第二次输出：ninja: no work to do.
```

第二次构建会因为无改动而立即结束，体现 ninja 的增量构建优势。

### 示例 3：直接手写 build.ninja（不依赖 CMake）

ninja 也可以脱离 CMake 单独使用，手动编写构建文件：

```bash
# 1. 准备源文件
cat > main.c <<'EOF'
#include <stdio.h>
int main(void) { printf("direct ninja\n"); return 0; }
EOF

# 2. 手写最小 build.ninja
cat > build.ninja <<'EOF'
rule cc
  command = cc -c $in -o $out
rule link
  command = cc $in -o $out

build main.o: cc main.c
build app: link main.o
default app
EOF

# 3. 执行
ninja

# 4. 运行
./app
```

输出为 `direct ninja`。此例展示了 ninja 的 `rule`（规则）与 `build`（构建语句）语法。

### 示例 4：生成依赖图辅助调试

对已有构建文件输出依赖关系图：

```bash
# 在示例 1 的 build 目录中
ninja -C build -t graph > graph.dot

# 若安装了 graphviz，可渲染成图片
dot -Tpng graph.dot -o graph.png
```

## 五、进阶技巧与配置

### 1. 让 CMake 默认使用 Ninja

若希望 `cmake ..` 时不写 `-G Ninja`，可在 `CMakePresets.json` 中指定生成器，或设置环境变量：

```bash
export CMAKE_GENERATOR=Ninja
```

此后直接 `cmake -S . -B build` 即用 ninja 构建。

### 2. 配置并行度与 Ninja 自身的常量

`-j` 可手动控制并行度；ninja 读取 `NINJA_STATUS` 环境变量自定义状态行格式：

```bash
export NINJA_STATUS="[%f/%t] "
ninja -j 4
```

常见占位符：`%f`（完成数）、`%t`（总数）、`%p`（百分比）、`%s`（已运行秒数）、`%e`（预计剩余秒数）。

### 3. 用 `-t compdb` 导出 compile_commands.json

需要给 IDE/代码补全工具（如 clangd）提供编译数据库时：

```bash
ninja -C build -t compdb cxx > compile_commands.json
```

### 4. 结合 ccache 加速重复编译

把 ninja 与 ccache 搭配，能显著缓存重复的编译结果：

```bash
# CMake 中启用
cmake -S . -B build -G Ninja -DCMAKE_CXX_COMPILER_LAUNCHER=ccache
```

## 六、注意事项与常见问题

### 1. 不要直接手工维护 build.ninja

对真实项目，build.ninja 应由 CMake 等工具生成。手动编辑后下次 CMake 重新生成会被覆盖，且手写语法容易出错。只在学习或极小场景下才手写。

### 2. 报错 "unknown target"

`ninja: unknown target 'xxx'` 表示目标名写错。先用 `ninja -t targets` 查看可用目标，确认拼写。

### 3. 报错 "build.ninja is missing"

在项目根目录直接运行 `ninja` 而该目录下没有 `build.ninja`。使用 `-C` 指定生成目录，或先运行 CMake 生成。

### 4. 并行任务过多导致内存/编译报错

`-j` 默认等于 CPU 核心数，在内存较小的机器上可能 OOM 或编译器崩溃。可降低并行度：`ninja -j 2`。

### 5. 换编译器后需重新生成

仅修改环境变量编译器不一定生效，ninja 缓存了旧的编译命令。修改后应删除 build 目录重新 `cmake -S . -B build -G Ninja`，避免使用过期命令。

### 6. 性能提示

ninja 本身开销极低，但若 build.ninja 由 CMake 生成，`cmake` 重新配置本身会耗时。把源码与构建目录分开（out-of-source）可减少触发重新配置的干扰文件，保持 ninja 的高效增量构建。