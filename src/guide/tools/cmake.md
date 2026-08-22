---
title: cmake
icon: code
category:
  - 工具
  - 构建系统
tag:
  - 开发构建
  - cmake
---

# cmake（跨平台构建系统生成器，C/C++ 项目标配）

> Homebrew 版本 4.2.0 ｜ 主页：见官方文档 ｜ 安装：`brew install cmake`

## 一、它是什么

CMake 是一个**跨平台的构建系统生成器**。它本身不直接编译代码，而是读取 `CMakeLists.txt` 配置文件，为你生成平台原生的构建文件——在 Linux/macOS 上生成 Makefile，在 Windows 上生成 Visual Studio 工程文件。这样同一份源码就能在多个平台上用同一套构建逻辑编译。

它解决的问题是：手写 Makefile 或项目文件非常繁琐、难以维护，且无法跨平台复用。CMake 用简洁的声明式语法描述「项目有什么目标、依赖什么库、编译选项是什么」，然后自动生成对应平台的构建脚本，是当前 C/C++ 项目的事实标准。典型应用场景包括：管理大型 C/C++ 项目、自动发现并链接第三方依赖、配合 IDE（CLion、VS Code、Qt Creator）使用、生成安装/打包规则等。

## 二、安装与升级

使用 Homebrew 安装、升级、卸载：

```bash
# 安装
brew install cmake

# 升级（保持最新版本）
brew upgrade cmake

# 卸载
brew uninstall cmake

# 查看已安装版本
cmake --version

# 查看 brew 管理的 cmake 详情（安装路径、依赖等）
brew info cmake
```

验证安装成功，运行 `cmake --version`，输出应包含版本号 `4.2.0` 以及 `Make/CMake/CTest/CPack` 组件信息，例如：

```text
cmake version 4.2.0

CMake suite maintained and supported by Kitware (kitware.com/cmake).
```

> **提示**：Homebrew 装的 CMake 可能不是最新（brew 默认跟踪稳定版）。若需要新版本或 CI 里用固定版本，可用 `brew install cmake@3` 系列，或用 `pipx`/官方二进制安装最新版。

## 三、常用命令速查

| 命令 | 参数 / 说明 | 示例 |
| --- | --- | --- |
| `cmake --version` | 查看版本号，验证安装 | `cmake --version` |
| `cmake -S <源目录> -B <构建目录>` | 配置项目，生成构建文件（4.0+ 推荐写法） | `cmake -S . -B build` |
| `cmake --build <构建目录>` | 编译构建目录里的项目 | `cmake --build build` |
| `cmake --install <构建目录>` | 安装到指定前缀 | `cmake --install build --prefix /usr/local` |
| `cmake -G <生成器>` | 指定生成器（如 Unix Makefiles、Ninja、Xcode） | `cmake -S . -B build -G Ninja` |
| `cmake -D<变量>=<值>` | 定义/覆盖缓存变量（如开关选项、安装路径） | `cmake -S . -B build -DCMAKE_BUILD_TYPE=Release` |
| `cmake --build build --target install` | 只构建指定目标 | `cmake --build build --target my_app` |
| `ctest` | 运行项目测试（配合 CMake 的 add_test） | `cd build && ctest` |
| `cpack` | 打包生成安装包（deb/rpm/dmg） | `cpack -G DEB` |
| `cmake -L build` | 列出缓存中所有变量 | `cmake -L build` |
| `cmake --build build --clean-first` | 清理后重新编译 | `cmake --build build --clean-first` |
| `cmake --build build --parallel 8` | 指定并行编译线程数 | `cmake --build build --parallel 8` |
| `cmake -LAH build` | 列出缓存全部变量（含高级与帮助） | `cmake -LAH build` |
| `cmake --fresh` | 清空缓存重新配置 | `cmake -S . -B build --fresh` |

## 四、实际示例

### 示例 1：最小 C 项目（Hello World）

这是最基础、最常见的用法，从源码编译一个可执行程序。

**1. 准备项目文件**

```bash
mkdir hello && cd hello
```

创建源码 `hello.c`：

```bash
cat > hello.c <<'EOF'
#include <stdio.h>

int main(void) {
    printf("Hello, CMake!\n");
    return 0;
}
EOF
```

创建构建配置 `CMakeLists.txt`：

```bash
cat > CMakeLists.txt <<'EOF'
cmake_minimum_required(VERSION 3.20)
project(Hello C)

add_executable(hello hello.c)
EOF
```

**2. 配置并编译**

```bash
# -S 指定源目录，-B 指定构建目录（源码与构建产物分离，保持目录干净）
cmake -S . -B build
cmake --build build
```

**3. 运行看结果**

```bash
./build/hello
# 输出：Hello, CMake!
```

### 示例 2：多文件 + 链接第三方库（OpenMP）

展示 C++ 项目、多源文件、链接系统库的常见结构。

**1. 准备项目文件**

```bash
mkdir demo && cd demo
```

创建 `main.cpp` 和 `math_utils.cpp`：

```bash
cat > main.cpp <<'EOF'
#include <iostream>
#include "math_utils.hpp"

int main() {
    std::cout << "sum(3,4) = " << add(3, 4) << std::endl;
    return 0;
}
EOF

cat > math_utils.cpp <<'EOF'
#include "math_utils.hpp"

int add(int a, int b) { return a + b; }
EOF

cat > math_utils.hpp <<'EOF'
#pragma once
int add(int a, int b);
EOF
```

创建 `CMakeLists.txt`，用 `target_include_directories` 指定头文件搜索路径：

```bash
cat > CMakeLists.txt <<'EOF'
cmake_minimum_required(VERSION 3.20)
project(Demo CXX)

add_executable(demo main.cpp math_utils.cpp)
target_include_directories(demo PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
EOF
```

**2. 配置并编译（指定 Release 优化）**

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
./build/demo
# 输出：sum(3,4) = 7
```

### 示例 3：用 CMake 构建 Git 依赖（FetchContent）

当项目依赖一个 Git 仓库时，CMake 3.11+ 的 `FetchContent` 能在配置阶段自动拉取并构建。

**1. 准备项目文件**

```bash
mkdir fetchdemo && cd fetchdemo
```

创建 `main.cpp` 和 `CMakeLists.txt`：

```bash
cat > main.cpp <<'EOF'
#include <iostream>
#include <fmt/core.h>

int main() {
    std::cout << fmt::format("FetchContent demo, answer = {}", 42) << std::endl;
    return 0;
}
EOF

cat > CMakeLists.txt <<'EOF'
cmake_minimum_required(VERSION 3.20)
project(FetchDemo CXX)

include(FetchContent)
FetchContent_Declare(
  fmt
  GIT_REPOSITORY https://github.com/fmtlib/fmt.git
  GIT_TAG 11.0.2
)
FetchContent_MakeAvailable(fmt)

add_executable(fetchdemo main.cpp)
target_link_libraries(fetchdemo PRIVATE fmt::fmt)
EOF
```

**2. 配置（首次会联网拉取 fmt 库）、编译并运行**

```bash
cmake -S . -B build
cmake --build build
./build/fetchdemo
# 输出：FetchContent demo, answer = 42
```

## 五、进阶技巧与配置

### 1. 用 Ninja 加速编译

默认的 Unix Makefiles 生成器是单线程的，改用 Ninja 可自动利用多核并显著提速（构建时加 `-j` 控制并行度）：

```bash
brew install ninja
cmake -S . -B build -G Ninja
cmake --build build -j8   # 8 线程并行编译
```

### 2. 常用缓存变量与环境变量

- `-DCMAKE_BUILD_TYPE=Debug|Release|RelWithDebInfo`：指定构建类型（影响优化级别和调试信息）。
- `-DCMAKE_INSTALL_PREFIX=<路径>`：设置安装前缀，等价于 `cmake --install build --prefix <路径>`。
- `-DCMAKE_PREFIX_PATH=<路径>`：额外的库搜索路径，找不到依赖时很常用。
- `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON`：生成 `compile_commands.json`，供 clangd、IDE 的「转到定义」等功能使用。
- `-DCMAKE_CXX_STANDARD=17` / `-DCMAKE_C_STANDARD=11`：全局设置语言标准（配合 `set` 或 target 级 `cxx_std_17` 使用）。
- `-DCMAKE_TOOLCHAIN_FILE=<路径>`：指定交叉编译工具链文件（见「跨平台编译」一节）。
- `-DCMAKE_GENERATOR=Ninja`：也可以在缓存里固化生成器，但更推荐 `-G` 每次显式传。
- `CC` / `CXX` 环境变量：指定编译器，例如 `CC=clang CXX=clang++ cmake -S . -B build`。
- `CMAKE_PREFIX_PATH` 环境变量：等价于 `-DCMAKE_PREFIX_PATH`，但可在 `.bashrc`/`.zshrc` 里长期导出，省去每次传参。
- `CMAKE_CXX_FLAGS` / `CMAKE_C_FLAGS`：追加编译标志，如 `-DCMAKE_CXX_FLAGS="-Wall -Wextra"`。
- `CMAKE_MAKE_PROGRAM`：生成器找不到 `ninja`/`make` 时可显式指定其绝对路径。
- 清理缓存：删掉 `build/` 目录重新配置即可，不需要手动清缓存；`cmake --fresh` 可在不删目录的情况下清空缓存重配。

**推荐的一行 Release 配置**：

```bash
cmake -S . -B build -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_EXPORT_COMPILE_COMMANDS=ON \
  -DCMAKE_PREFIX_PATH="$(brew --prefix)"
```

### 3. 与 IDE 搭配

- **VS Code**：安装 CMake Tools 扩展后，打开含 `CMakeLists.txt` 的目录即可自动配置、编译、调试。
- **CLion**：直接打开 `CMakeLists.txt` 作为项目文件。
- **Qt Creator**：新建项目时选择「CMake 项目」。
- **生成 IDE 工程**：macOS 上可用 `cmake -G Xcode` 生成 Xcode 工程，Windows 上 `cmake -G "Visual Studio 17 2022"`。
- **配合 clangd**：开启 `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON`，再把生成的 `build/compile_commands.json` 软链到源码根目录，clangd 即可理解所有 include 与编译标志：
  ```bash
  ln -sf build/compile_commands.json compile_commands.json
  ```

### 4. 模块化 CMakeLists：子目录与函数

大型项目不应把所有内容塞进一个文件。用 `add_subdirectory` 组织模块，用 `function()`/`macro()` 抽取可复用逻辑：

```cmake
# 根 CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(MyApp CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 复用函数：统一为可执行目标设置编译警告
function(enable_warnings target)
    target_compile_options(${target} PRIVATE -Wall -Wextra -Wpedantic)
endfunction()

add_subdirectory(core)        # core/CMakeLists.txt
add_subdirectory(app)         # app/CMakeLists.txt
```

```cmake
# core/CMakeLists.txt —— 生成一个静态库
add_library(core STATIC core.cpp)
target_include_directories(core PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
```

```cmake
# app/CMakeLists.txt —— 生成主程序并链接库
add_executable(app main.cpp)
target_link_libraries(app PRIVATE core)
enable_warnings(app)
```

### 5. 用 find_package 发现第三方依赖

`find_package` 是 CMake 发现已安装库的官方方式。它优先找 `<pkg>Config.cmake`（现代库），找不到时退化为找 `Find<pkg>.cmake` 模块。

```cmake
find_package(OpenMP REQUIRED)
if(OpenMP_CXX_FOUND)
    target_link_libraries(demo PRIVATE OpenMP::OpenMP_CXX)
endif()

find_package(fmt QUIET)
if(fmt_FOUND)
    target_link_libraries(demo PRIVATE fmt::fmt)
else()
    message(WARNING "fmt not found, falling back")
endif()
```

在 macOS 上配合 Homebrew 使用很关键：

```bash
# 让 CMake 能搜到 brew 安装的库
export CMAKE_PREFIX_PATH="$(brew --prefix)"
# 或对单个库
cmake -S . -B build -DCMAKE_PREFIX_PATH="$(brew --prefix fmt)"
```

常见 `find_package` 报错与处理见「六、常见问题」第 4 条。

### 6. 测试与打包（CTest + CPack）

在 `CMakeLists.txt` 中加入测试规则，即可用 `ctest` 一键跑测试：

```cmake
include(CTest)                 # 比 enable_testing() 更完善，会注册 BUILD_TESTING 开关
if(BUILD_TESTING)
    add_executable(unit_tests test_main.cpp)
    add_test(NAME unit_tests COMMAND unit_tests)
    # 用 GTest 时更常见的是：
    # enable_testing()
    # gtest_discover_tests(unit_tests)
endif()
```

```bash
cd build && ctest --output-on-failure
# 运行单个测试 / 按正则筛选
ctest -R unit_tests
ctest -R "^test_math" --output-on-failure
# 设置超时（秒）与并行
ctest --timeout 30 -j8
```

CPack 打包：

```cmake
set(CPACK_PACKAGE_NAME "myapp")
set(CPACK_PACKAGE_VERSION "1.0.0")
set(CPACK_PACKAGE_CONTACT "dev@example.com")
set(CPACK_GENERATOR "TGZ;DragNDrop")   # 默认同时生成多种
include(CPack)
```

```bash
cmake -S . -B build
cmake --build build
cpack --config build/CPackConfig.cmake -G DEB   # Debian/Ubuntu
cpack --config build/CPackConfig.cmake -G DragNDrop  # macOS .dmg
cpack --config build/CPackConfig.cmake -G RPM   # Fedora/RHEL
```

### 7. 跨平台编译（交叉编译）

用**工具链文件**（toolchain file）描述目标平台，是 CMake 交叉编译的标准做法：

```cmake
# cross-arm64.cmake
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR aarch64)
set(CMAKE_C_COMPILER aarch64-linux-gnu-gcc)
set(CMAKE_CXX_COMPILER aarch64-linux-gnu-g++)
set(CMAKE_FIND_ROOT_PATH /usr/aarch64-linux-gnu)
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
```

```bash
cmake -S . -B build-arm64 -DCMAKE_TOOLCHAIN_FILE=cross-arm64.cmake
cmake --build build-arm64
```

macOS 上做 iOS 交叉编译用 Xcode 生成器即可：

```bash
cmake -S . -B build-ios -G Xcode \
  -DCMAKE_SYSTEM_NAME=iOS \
  -DCMAKE_OSX_SYSROOT=iphoneos \
  -DCMAKE_OSX_ARCHITECTURES="arm64"
```

**同机多架构（universal 二进制）**——macOS 上直接指定多个架构：

```bash
cmake -S . -B build -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64"
cmake --build build
lipo -info build/myapp   # 查看支持的架构
```

## 六、注意事项与常见问题

### 常见报错

1. **`CMake Error: The source directory ... does not appear to contain CMakeLists.txt`**
   在错误的目录执行了 `cmake -S`，检查 `-S` 指向的目录里确实有 `CMakeLists.txt`。

2. **`fatal error: 'xxx.h' file not found`**
   头文件找不到。用 `target_include_directories` 显式声明头文件目录，或确认第三方库路径已通过 `-DCMAKE_PREFIX_PATH` 指定。

3. **`undefined reference to ...`**
   链接错误，说明声明了函数但没链接到实现库。用 `target_link_libraries` 补上对应的库（如 `m`、`pthread`、第三方库）。

4. **`Could not find a package configuration file provided by "xxx"`**
   CMake 没找到 `find_package` 要求的包。用 `brew install xxx` 安装，或用 `-DCMAKE_PREFIX_PATH` 指定其安装路径。注意：如果安装包里只有 `xxx.pc`（pkg-config 风格）而没有 `xxxConfig.cmake`，可先用 `pkg-config` 探测，或给 `find_package` 传 `xxx_VERSION`/`REQUIRED` 之外的提示。排查时先确认：
   ```bash
   brew info xxx        # 看安装路径
   find "$(brew --prefix)" -name "*Config.cmake" -o -name "Find*.cmake" | grep -i xxx
   ```

5. **编译器版本过旧**
   新版 CMake（尤其 4.x）要求较新的编译器和标准。升级编译器（macOS 用 `xcode-select --install` 装/更新 Command Line Tools）或降低 `cmake_minimum_required` 版本。

6. **`CMakeCache.txt: error reading cache file` 或缓存损坏**
   手动编辑 `CMakeCache.txt` 或用不同编译器/路径复用了同一构建目录。删掉整个 `build/` 重新配置最稳妥。

7. **`Policy CMP0077 is not set` 等 Policy 警告**
   新版 CMake 变更了旧默认行为。可在 `CMakeLists.txt` 顶部显式声明：
   ```cmake
   cmake_policy(SET CMP0077 NEW)
   ```

8. **`ld: library not found for -l<name>`（macOS 特有）**
   链接器找不到库文件，常见于 brew 安装的库在非默认路径。加 `-DCMAKE_PREFIX_PATH="$(brew --prefix)"`，或用 `-L`/`target_link_directories` 显式指向库目录。

9. **`ninja: error: loading 'build.ninja': No such file`**
   直接用 `ninja` 但还没 `cmake -G Ninja` 配置过。先跑配置步骤，或 `cmake --build build` 让它走标准流程。

10. **`--build` 反复重编全部文件（增量失效）**
    通常因为时间戳/依赖变化异常，或跨了不同 `CMAKE_BUILD_TYPE` 复用了同一构建目录。用不同构建目录区分不同配置（如 `build-debug`、`build-release`）。

### 注意要点

- **`cmake_minimum_required` 放第一行**：声明 CMake 最低版本，避免旧版误用新语法。
- **不要污染源码目录**：始终用 `-B` 指定独立构建目录，避免 `build/` 产物混进源码，否则切换平台/构建类型时容易踩坑。
- **区分路径**：`CMAKE_CURRENT_SOURCE_DIR` 是源码目录，`CMAKE_CURRENT_BINARY_DIR` 是构建目录，配置文件的绝对路径引用务必用这两个变量，不要硬编码。
- **`find_package` 依赖 `Config.cmake`**：很多库需 `brew install` 并配合 `-DCMAKE_PREFIX_PATH=$(brew --prefix)` 才能被正确找到。
- **清理构建目录**：缓存异常时，删 `build/` 比手动改 `CMakeCache.txt` 更可靠。
- **`FetchContent` 会执行远程仓库的 CMake 代码**：拉取前务必确认仓库可信。可固定 `GIT_TAG`（commit SHA 而非分支名）保证可复现、防漂移。
- **Debug 与 Release 别共用构建目录**：二者 `CMAKE_BUILD_TYPE` 不同，混合使用会互相覆盖缓存，产出异常结果。用 `build-debug`/`build-release` 分开。
- **并行度不要盲目拉满**：`-j` 超过核数反而因内存/IO 瓶颈变慢。用 `nproc`（Linux）/`sysctl -n hw.ncpu`（macOS）取核数再乘 1.5 左右为经验值。
- **注意 `find_package` 与 `FetchContent` 的冲突**：同名依赖若既被 `find_package` 又由 `FetchContent` 提供，需用 `FetchContent_MakeAvailable` 的覆盖逻辑处理，否则会出现「重复定义/类型冲突」类诡异报错。
- **头文件里 `#pragma once` 优于传统 `#ifndef` 守卫**：避免重复包含，也让 CMake 目标间依赖更直观。

## 七、实战：与其它工具搭配与自动化

### 1. 与 Ninja 配合：更快更清晰的增量构建

Ninja 是现代 CMake 的首选生成器，增量构建准确、并行度高：

```bash
brew install ninja
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j8

# 只看改动目标（Ninja 输出简洁）
ninja -C build my_app
# 图形化依赖图（需 graphviz）
ninja -C build -t graph | dot -Tpng -o build-graph.png
```

Ninja 与 Makefile 的核心差异是**由 CMake 直接生成**（不套一层 Make），增量判定更精确，改一个头文件通常只重编直接依赖它的文件。

### 2. 用 Makefile 包装常用命令

很多人习惯用顶层 Makefile 简化记忆，把长命令收进目标：

```makefile
# 顶层 Makefile
BUILD_DIR ?= build

.PHONY: configure build test install clean run

configure:
	cmake -S . -B $(BUILD_DIR) -G Ninja -DCMAKE_BUILD_TYPE=Release

build: configure
	cmake --build $(BUILD_DIR) -j8

test: build
	cd $(BUILD_DIR) && ctest --output-on-failure

install: build
	cmake --install $(BUILD_DIR)

run: build
	./$(BUILD_DIR)/app

clean:
	rm -rf $(BUILD_DIR)
```

用法：`make configure`、`make build`、`make test`、`make install`、`make clean`。

### 3. 脚本自动化：一键配置 + 构建 + 测试

用一个 shell 脚本串联标准流程，并做健壮性处理：

```bash
#!/usr/bin/env bash
set -euo pipefail          # 出错即停、变量未定义即报错

BUILD_DIR="${1:-build}"
BUILD_TYPE="${BUILD_TYPE:-Release}"
CORES="${CORES:-$(sysctl -n hw.ncpu 2>/dev/null || nproc)}"

echo ">> Configuring ($BUILD_TYPE) into $BUILD_DIR"
cmake -S . -B "$BUILD_DIR" -G Ninja \
  -DCMAKE_BUILD_TYPE="$BUILD_TYPE" \
  -DCMAKE_EXPORT_COMPILE_COMMANDS=ON

echo ">> Building with $CORES jobs"
cmake --build "$BUILD_DIR" -j"$CORES"

echo ">> Running tests"
cd "$BUILD_DIR" && ctest --output-on-failure

echo ">> All done."
```

### 4. 批量处理：遍历子项目/多个配置

当工作区含多个独立 CMake 项目时，用循环批量配置构建：

```bash
for proj in core lib1 lib2 app; do
  echo "=== Building $proj ==="
  cmake -S "$proj" -B "$proj/build" -G Ninja -DCMAKE_BUILD_TYPE=Release
  cmake --build "$proj/build" -j8
done
```

或对同一项目批量产出多套配置：

```bash
for bt in Debug Release; do
  cmake -S . -B "build-$bt" -G Ninja -DCMAKE_BUILD_TYPE="$bt"
  cmake --build "build-$bt" -j8
done
```

### 5. CI 集成（GitHub Actions / GitLab CI）

CMake 项目在 CI 里的标准套路：装工具 → 配置 → 构建 → 测试 → 打包。

**GitHub Actions**（`.github/workflows/ci.yml`）：

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - name: Install deps (Linux)
        if: runner.os == 'Linux'
        run: sudo apt-get update && sudo apt-get install -y ninja-build
      - name: Install deps (macOS)
        if: runner.os == 'macOS'
        run: brew install ninja
      - name: Configure
        run: cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
      - name: Build
        run: cmake --build build -j2
      - name: Test
        run: ctest --test-dir build --output-on-failure
```

**GitLab CI**（`.gitlab-ci.yml`）：

```yaml
image: gcc:latest
before_script:
  - apt-get update && apt-get install -y ninja-build
build:
  stage: build
  script:
    - cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
    - cmake --build build
test:
  stage: test
  script:
    - ctest --test-dir build --output-on-failure
```

**CI 里的实用技巧**：
- 缓存 `build/` 目录以加速增量构建（GitHub Actions 的 `actions/cache`）。
- 把 `ctest` 失败信息带上 `--output-on-failure`，否则 CI 日志看不到断言详情。
- 用 `cmake --install build --prefix <临时目录>` 在 CI 里验证安装规则，再 `cpack` 出安装包产物（artifacts）。

### 6. 与 vcpkg / Conan 配合

Homebrew 之外，跨平台 C/C++ 依赖管理常用 vcpkg 或 Conan，它们与 CMake 深度集成：

```bash
# vcpkg（Windows/Linux 为主）
./vcpkg install fmt
cmake -S . -B build \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake

# Conan（跨平台）
conan install . --output-folder=build --build=missing
cmake -S . -B build \
  -DCMAKE_TOOLCHAIN_FILE=build/conan_toolchain.cmake
```

配合 `presets` 可让一键配置更标准：

```json
// CMakePresets.json
{
  "version": 6,
  "configurePresets": [
    {
      "name": "release",
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/build",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Release",
        "CMAKE_EXPORT_COMPILE_COMMANDS": "ON"
      }
    }
  ],
  "buildPresets": [ { "name": "release", "configurePreset": "release" } ]
}
```

```bash
cmake --preset release
cmake --build --preset release
```

### 7. 生产级实践建议

- **用 target 级命令而非全局命令**：优先 `target_include_directories`/`target_compile_options`/`target_link_libraries`，而不是全局 `include_directories`/`add_compile_options`。这让依赖关系显式、可移植，是现代 CMake 的核心规范。
- **定义库目标 + `::` 命名空间别名**：库导出时用 `add_library(foo::foo ALIAS foo)`，让使用者 `find_package` 后能直接 `target_link_libraries(app PRIVATE foo::foo)`，避免名字冲突。
- **开启编译警告并尽量消除**：见「5. 模块化 CMakeLists」中的 `enable_warnings` 函数，配合 `-Werror` 让 CI 把警告当错误拦截。
- **区分共享/静态库与安装导出**：用 `BUILD_SHARED_LIBS` 变量控制默认库类型：
  ```cmake
  option(BUILD_SHARED_LIBS "Build shared libraries" ON)
  ```
- **做好「安装规则」**：`install(TARGETS ...)`、`install(DIRECTORY include/ ...)`、`install(EXPORT ...)` 三件套，让下游能 `find_package` 到你的包。
- **为公共库生成 `xxxConfig.cmake` 导出文件**：配合 CMake 的 `CMakePackageConfigHelpers` 模块，让安装后的包可被其他 CMake 项目 `find_package`。

## 八、总结

CMake 的核心心智模型是**「配置阶段 + 生成阶段」**：配置阶段解析 `CMakeLists.txt` 并生成构建文件，生成阶段由底层工具（Make/Ninja/Xcode）真正编译。掌握四件事就能高效使用：

1. **会写 `CMakeLists.txt`**——目标、依赖、安装规则三件套。
2. **会选生成器**——日常用 Ninja，IDE 场景用 Xcode/VS，交叉编译用工具链文件。
3. **会管理依赖**——`find_package` + `FetchContent`，配 vcpkg/Conan/brew。
4. **会自动化**——CTest 测试、CPack 打包、Makefile/脚本封装、CI 集成。

把这些串起来，你的 C/C++ 项目就能做到「一次编写，多平台构建，一键测试打包」，这正是 CMake 作为行业标准的价值所在。