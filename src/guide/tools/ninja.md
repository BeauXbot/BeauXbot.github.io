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

### 5. 手写 build.ninja 的核心语法

ninja 的构建文件由三类核心元素组成：**变量（variable）、规则（rule）、构建语句（build）**。

**变量**使用 `名称 = 值` 定义，在 `$名称` 处引用；`$in`、`$out` 是 ninja 预置的隐式变量，分别代表规则的输入与输出列表：

```ninja
# 顶层变量，可在 rule / build 中引用
cc = cc
cflags = -Wall -O2

rule cc
  command = $cc -c $cflags $in -o $out   # $in 和 $out 自动展开
  description = CC $out                  # 构建时显示的可读信息
```

**rule（规则）**描述"如何把输入变成输出"，即一条可复用的命令模板。`command` 是必填项，其余如 `depfile`、`description`、`rspfile`、`generator` 为可选属性。

**build 语句**把"输入 → 输出"与某条 rule 关联起来，并声明隐式依赖：

```ninja
# 语法：build <输出>: <rule> <输入...>
build main.o: cc main.c
build app: link main.o | deps.ld         # | 后是隐式依赖（仅参与依赖判断，不进入 $in）
build app: link main.o || gen_headers    # || 后是 order-only 依赖（先构建但不触发重建）
```

**`default` 语句**声明默认构建目标；缺省时 ninja 构建文件中出现的所有 build 输出：

```ninja
default app
```

### 6. 通过 `depfile` 让头文件依赖生效

手写 build.ninja 时最易忽略的是**头文件依赖**。若编译器修改了某个头文件，而构建文件未声明该依赖，ninja 不会重编相关源文件。正确做法是让编译器输出依赖文件，再用 `depfile` 让 ninja 读取：

```ninja
rule cc
  command = cc -MD -MF $out.d -c $in -o $out   # -MF 指定依赖文件输出路径
  depfile = $out.d                             # 告诉 ninja 读取此依赖文件
  deps = gcc                                   # 依赖文件的语法类型（gcc / msvc）

build main.o: cc main.c
```

`-MD` 让 GCC/Clang 自动生成依赖文件，ninja 解析后即可精确跟踪 `#include` 的头文件，增量构建才真正可靠。

### 7. 用 `rspfile` 处理超长命令行

命令行过长会触发 ARG_MAX 限制。ninja 支持把参数写入响应文件（response file），再通过 `@` 传给编译器：

```ninja
rule link
  command = ld @$out.rsp -o $out
  rspfile = $out.rsp          # 响应文件路径
  rspfile_content = $in       # 写入响应文件的内容

build app: link main.o foo.o bar.o
```

适合链接几百个目标文件的大工程，避免命令行超限。

### 8. 配合 CMake 输出依赖图与诊断

对 CMake 生成的大型 build.ninja，可用 `-t` 系列工具快速定位问题（详见下文诊断工具一节）。

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

### 7. 头文件依赖未声明导致漏编

手工 build.ninja 中最常见的坑。若没有 `depfile`/`deps`，修改 `.h` 不会触发相关 `.o` 重编，产出一致性无法保证。始终为编译规则配置依赖文件（见五-6）。

### 8. 只改一个文件却全量重编

若某目标把多个源文件塞进一条 build 命令（如一次编译所有 `.c`），任何一个变化都会重跑整条命令。应为每个源文件建独立 `build x.o: cc x.c` 语句，让 ninja 能按文件粒度增量。

### 9. 构建目录有残留导致的"幽灵失败"

修改了 CMakeLists 却忘记重新配置，或构建目录里残留旧的中间文件，可能产生难以定位的错误。养成定期 `ninja -t clean` 或直接删除 build 目录重建的习惯。

### 10. `cleandead` 清理失效的旧产物

若从构建脚本中删除了某些目标（如 CMake 里移除了某源文件），`ninja -t clean` 默认不清掉这些已不再受管的旧产物。用 `cleandead` 删除 build 图之外的失效文件：

```bash
ninja -t cleandead
```

注意：它会删除不受任何目标管理但仍在构建目录中的文件，使用前确认没有需要保留的生成物。

### 11. 默认构建目标不包含你要的东西

`ninja` 只构建 `default` 声明的目标。CMake 生成的默认目标通常是 `all`；若只想编某个库/可执行文件，显式指定：`ninja <target>`，或先 `ninja -t targets` 确认目标名。

## 七、实战：与其它工具搭配与自动化

### 1. 与 CMake 配合：`-G Ninja` 与 Ninja Multi-Config

**单配置**：`cmake -S . -B build -G Ninja` 生成单一配置（如 Debug 或 Release，由 `-DCMAKE_BUILD_TYPE` 决定）。

**多配置**：使用 `Ninja Multi-Config` 生成器，可在同一构建目录内存放多个配置，切换无需重新生成：

```bash
cmake -S . -B build -G "Ninja Multi-Config" -DCMAKE_CONFIGURATION_TYPES="Debug;Release"

# 构建指定配置
ninja -C build -f build-Debug.ninja        # 生成器会为每个配置生成独立 ninja 文件
# 或通过 CMake 语法
cmake --build build --config Debug
```

实际使用中更推荐通过 `CMakePresets.json` 定义不同配置的 preset，一键切换：

```json
{
  "version": 6,
  "configurePresets": [
    { "name": "ninja-debug", "generator": "Ninja", "binaryDir": "build/debug",
      "cacheVariables": { "CMAKE_BUILD_TYPE": "Debug" } },
    { "name": "ninja-release", "generator": "Ninja", "binaryDir": "build/release",
      "cacheVariables": { "CMAKE_BUILD_TYPE": "Release" } }
  ]
}
```

```bash
cmake --preset ninja-debug && cmake --build --preset ninja-debug
```

### 2. 与 meson 配合

meson 本身就是 ninja 的忠实用户，默认生成 build.ninja。你几乎看不到 meson 手写 ninja 文件，只需关注 meson 自身命令：

```bash
meson setup build
ninja -C build          # meson 生成的 build 目录就是 ninja 可用的目录
```

meson 生成的 `build.ninja` 中蕴含了完整的依赖与安装逻辑，直接 `ninja -C build` 即可增量编译，也能用 `ninja -t compdb c` 导出编译数据库。

### 3. 用自定义 build.ninja 构建一个小型 C 工程

综合前面语法，构建一个多文件小型 C 工程（含头文件依赖与默认目标）：

```bash
# 准备源码
mkdir -p myproj && cd myproj
cat > math.c <<'EOF'
#include "math.h"
int add(int a, int b) { return a + b; }
EOF
cat > main.c <<'EOF'
#include <stdio.h>
#include "math.h"
int main(void) { printf("%d\n", add(2, 3)); return 0; }
EOF
cat > math.h <<'EOF'
int add(int, int);
EOF

# 手写 build.ninja，使用 depfile 跟踪头文件
cat > build.ninja <<'EOF'
cc = cc

rule cc
  command = $cc -MD -MF $out.d -c $in -o $out
  depfile = $out.d
  deps = gcc
rule link
  command = $cc $in -o $out

build math.o: cc math.c
build main.o: cc main.c
build app: link main.o math.o
default app
EOF

ninja && ./app    # 输出 5
echo '#define ADD_V2 1' >> math.h   # 修改头文件
ninja             # 只重编依赖 math.h 的 math.o、main.o，而非全量
```

### 4. 在 CI 中加速构建

CI（如 GitHub Actions、GitLab CI）里用 ninja 提升反馈速度：

```yaml
# .github/workflows/build.yml（节选）
- name: Build
  run: |
    cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
    cmake --build build -j $(nproc)
```

要点：`-j` 按机器核心数设置并行度；若 CI 缓存依赖（如 ccache），把构建目录纳入缓存以复用增量结果；对纯 ninja 项目直接 `ninja -C build`。

### 5. 性能优化：用 `-t` 诊断工具定位瓶颈

ninja 内置的 `-t` 工具是排查构建问题、理解构建图的利器：

| 子命令 | 作用 | 示例 |
| --- | --- | --- |
| `targets` | 列出目标及规则 | `ninja -t targets all` |
| `commands` | 打印各目标的执行命令 | `ninja -t commands all` |
| `query <目标>` | 查看某目标输入/输出/依赖详情 | `ninja -t query app` |
| `graph` | 输出 DOT 依赖图 | `ninja -t graph > g.dot` |
| `compdb` | 导出编译数据库 | `ninja -t compdb cxx` |
| `deps` | 查看目标的依赖文件列表 | `ninja -t deps` |
| `clean` / `cleandead` | 清理构建产物 / 失效产物 | `ninja -t clean` |
| `restat` | 调试 `restat` 相关时序（高级） | `ninja -t restat` |

```bash
# 查看 app 由哪些文件构建而来，及其依赖
ninja -C build -t query app

# 只打印编译 main.o 的命令
ninja -C build -t commands main.o
```

### 6. 理解增量构建原理：.ninja_log 与 .ninja_deps

ninja 的极速增量依赖两个隐藏文件，位于构建目录根：

- **`.ninja_log`**：记录每次执行过的命令及其输出文件的时间戳。构建时对比输出文件的 mtime 是否变化，判断是否重跑；也用于并行调度。
- **`.ninja_deps`**：记录各输出文件由哪些输入依赖而来（主要是 `depfile` 解析出的头文件依赖），让 ninja 知道某个头文件变化会影响哪些 `.o`。

增量判断流程大致为：某目标的输出文件不存在 → 重建；输出时间戳早于任一输入 → 重建；否则跳过。依赖文件（`.ninja_deps`）中的头文件被当作输入参与同样的时间戳比较。因此**时间戳的正确性**至关重要——用 `touch` 故意刷新 mtime 或跨机器同步时时间不一致，都会干扰增量判断。

手动查看这两个文件可辅助排错：

```bash
tail .ninja_log
# 内容示例：起始时间 结束时间 mtime 输出 命令行hash
```

平时无需手动维护它们；若怀疑增量异常，删除这两个文件（连同 build.ninja）重新 CMake 生成即可复位。