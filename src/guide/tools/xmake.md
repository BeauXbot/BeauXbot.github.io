---
title: xmake
icon: code
category:
  - 工具
  - 构建系统
tag:
  - 开发构建
  - xmake
---

# xmake（基于 Lua 的跨平台构建工具）

> Homebrew 版本 3.0.5 ｜ 主页：见官方文档 ｜ 安装：`brew install xmake`

## 一、它是什么
xmake 是一个基于 Lua 语言开发的现代化跨平台构建工具，专注于「简单、快速、易用」三大目标。它解决的是传统构建系统（如 Makefile、CMake）语法繁琐、难以维护的问题：你只需编写一份 `xmake.lua` 描述文件，就能在 Windows、macOS、Linux、iOS、Android 等多个平台上完成编译、链接、打包、运行等全套工作。典型应用场景包括 C/C++ 项目的快速搭建、依赖库的自动下载与集成、以及需要跨平台分发或交叉编译的软件开发。

## 二、安装与升级
```bash
# 安装
brew install xmake

# 升级到最新版本
brew upgrade xmake

# 卸载
brew uninstall xmake

# 查看版本信息
xmake --version
```

安装完成后，运行 `xmake --version` 应能看到类似 `xmake v3.0.5+...` 的输出。若命令找不到，确认 Homebrew 的 bin 目录（通常是 `/opt/homebrew/bin` 或 `/usr/local/bin`）已在 `PATH` 中。

## 三、常用命令速查
| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `xmake create` | 初始化一个新项目模板，`-l` 指定语言（c/c++/cuda 等），`-t` 指定模板类型（console/static/shared） | `xmake create -l c++ -t console hello` |
| `xmake` | 默认执行编译构建，读取 `xmake.lua` | `xmake` |
| `xmake -r` | 重新构建（rebuild，强制重编译） | `xmake -r` |
| `xmake run` | 运行目标程序，可加目标名参数 | `xmake run hello` |
| `xmake f` | 配置/重配置工程（如切换模式、平台） | `xmake f -m debug` |
| `xmake f -p` | 指定编译平台（linux/macosx/windows/android/ios） | `xmake f -p android` |
| `xmake f -m` | 指定构建模式（debug/release） | `xmake f -m release` |
| `xmake clean` | 清理构建产物 | `xmake clean` |
| `xmake build` | 仅构建指定目标，不运行 | `xmake build hello` |
| `xmake install` | 安装产物到指定目录，`-o` 指定输出路径 | `xmake install -o /usr/local` |
| `xmake package` | 打包发布（生成安装包/归档） | `xmake package` |

## 四、实际示例

### 示例 1：快速创建并编译一个 C++ 控制台程序
```bash
# 1. 创建项目（生成 main.cpp 和 xmake.lua）
xmake create -l c++ -t console hello

# 2. 进入项目目录
cd hello

# 3. 编译（默认 release 模式）
xmake

# 4. 运行程序
xmake run
```

执行后终端会输出编译过程，随后 `xmake run` 打印出 `hello xmake!`。生成的 `xmake.lua` 内容大致如下：

```lua
add_rules("mode.debug", "mode.release")

target("hello")
    set_kind("binary")
    add_files("src/*.cpp")
```

### 示例 2：切换调试模式并观察优化选项
```bash
# 1. 重新配置为 debug 模式
xmake f -m debug

# 2. 重新构建
xmake -r

# 3. 查看链接命令，确认带了 -g 调试信息
xmake --verbose
```

### 示例 3：跨平台编译到 Android（需配置 NDK）
```bash
# 1. 配置 Android 平台，指定 NDK 路径
xmake f -p android --ndk=/path/to/your/android-ndk -m release

# 2. 编译
xmake

# 3. 打包 APK/AAB 相关的 so 库
xmake package
```

### 示例 4：自动下载并链接第三方依赖（如 zlib）
在 `xmake.lua` 中添加如下依赖配置：

```lua
add_requires("zlib", {system = false})

target("hello")
    set_kind("binary")
    add_files("src/*.cpp")
    add_packages("zlib")
```

然后在命令行执行：
```bash
# 首次会从远程仓库自动下载 zlib 并编译集成
xmake f
xmake
```

## 五、进阶技巧与配置

1. **多平台一键切换**：使用 `xmake f -p` 切换平台后，不同平台的配置会缓存到 `.xmake` 目录中。交叉编译时可用 `xmake f --sdk=/path/to/sdk` 指定工具链目录，并配合 `--arch=` 指定架构（如 `arm64`、`x86_64`）。

2. **配置文件分层**：核心配置写在项目根目录的 `xmake.lua`；也可以创建 `xmake.rc`（顶层全局配置）或每个子目录的 `xmake.lua` 来分层管理。常用函数如 `add_defines()` 添加宏定义、`add_includedirs()` 添加头文件目录、`add_linkdirs()` 添加链接库目录。

3. **与 CMake 项目集成**：如果已有 CMake 工程，可借助 xmake 的 `import("core.project.project")` 或直接调用系统命令来调用 CMake；反过来 CMake 工程也可通过 `xmake` 的 CMake generator 生成产物。日常使用中，`xmake` 与 `clangd`、`ccls` 等 IDE 工具可通过生成 `compile_commands.json`（执行 `xmake f --cxxflags=` 或 `xmake project -k compile_commands`）配合实现代码补全。

4. **环境变量与自动化**：在 CI 中常用 `XMAKE_ROOT`（xmake 安装根目录）等变量，配合 `xmake -P <project>` 指定项目目录、`xmake --workdir=<dir>` 指定工作目录。还可通过 `xmake l` 直接执行内嵌 Lua 脚本，做自定义构建逻辑扩展。

## 六、注意事项与常见问题

- **xmake.lua 语法报错**：xmake.lua 是 Lua 脚本，注意括号、引号匹配；常见的坑是漏掉 `end` 或把 Lua 布尔值写成 `True/False`（应是小写 `true/false`）。出错时用 `xmake` 查看带行号的报错定位。

- **切换平台/模式后没生效**：切换后务必执行 `xmake -r`（强制重编译），否则增量构建可能沿用旧配置导致链接错误或路径错乱。

- **依赖下载失败**：`add_requires` 从远程拉取包时可能因网络原因失败，可设置镜像源（如 `xmake f --pkg_searchdirs=...` 或配置国内镜像），或改用 `system=true` 使用系统已安装的库。

- **头文件找不到/链接失败**：优先检查 `add_includedirs`、`add_linkdirs`、`add_packages` 是否配置完整；交叉编译时尤其要注意工具链与 SDK 路径必须匹配。

- **性能与增量构建**：首次全量编译较慢，后续 xmake 支持增量构建与并行编译（默认多核）。若改动头文件导致大量重编译，可考虑合理拆分 target 以减小编译单元规模。

- **权限问题**：`xmake install -o /usr/local` 等系统目录安装时需 `sudo`；交叉编译 Android 时确保 NDK 路径无空格、权限可读。