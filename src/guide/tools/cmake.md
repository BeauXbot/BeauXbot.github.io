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
- `CC` / `CXX` 环境变量：指定编译器，例如 `CC=clang CXX=clang++ cmake -S . -B build`。
- 清理缓存：删掉 `build/` 目录重新配置即可，不需要手动清缓存。

### 3. 与 IDE 搭配

- **VS Code**：安装 CMake Tools 扩展后，打开含 `CMakeLists.txt` 的目录即可自动配置、编译、调试。
- **CLion**：直接打开 `CMakeLists.txt` 作为项目文件。
- **Qt Creator**：新建项目时选择「CMake 项目」。
- **生成 IDE 工程**：macOS 上可用 `cmake -G Xcode` 生成 Xcode 工程，Windows 上 `cmake -G "Visual Studio 17 2022"`。

### 4. 测试与打包

在 `CMakeLists.txt` 中加入测试规则，即可用 `ctest` 一键跑测试：

```cmake
enable_testing()
add_test(NAME demo_test COMMAND demo)
```

```bash
cd build && ctest --output-on-failure
# 再用 cpack 生成安装包
cpack -G DEB    # Debian/Ubuntu
cpack -G DragNDrop   # macOS 的 .dmg
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
   CMake 没找到 `find_package` 要求的包。用 `brew install xxx` 安装，或用 `-DCMAKE_PREFIX_PATH` 指定其安装路径。

5. **编译器版本过旧**
   新版 CMake（尤其 4.x）要求较新的编译器和标准。升级编译器（macOS 用 `xcode-select --install` 装/更新 Command Line Tools）或降低 `cmake_minimum_required` 版本。

### 注意要点

- **`cmake_minimum_required` 放第一行**：声明 CMake 最低版本，避免旧版误用新语法。
- **不要污染源码目录**：始终用 `-B` 指定独立构建目录，避免 `build/` 产物混进源码，否则切换平台/构建类型时容易踩坑。
- **区分路径**：`CMAKE_CURRENT_SOURCE_DIR` 是源码目录，`CMAKE_CURRENT_BINARY_DIR` 是构建目录，配置文件的绝对路径引用务必用这两个变量，不要硬编码。
- **`find_package` 依赖 `Config.cmake`**：很多库需 `brew install` 并配合 `-DCMAKE_PREFIX_PATH=$(brew --prefix)` 才能被正确找到。
- **清理构建目录**：改了大量 CMake 配置后若行为异常，删掉 `build/` 重新配置，比手动改缓存更可靠。
- **安全提示**：`FetchContent` 会执行远程仓库里的 CMake 代码，从不可信来源拉取依赖前请先审查。