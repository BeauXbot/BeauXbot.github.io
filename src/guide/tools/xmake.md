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
| `xmake project` | 生成 IDE/工具链项目文件 | `xmake project -k compile_commands` |
| `xmake l` / `xmake lua` | 直接执行内嵌 Lua 脚本 | `xmake l xmake.lua` |
| `xmake show` | 查看当前配置/环境信息 | `xmake show -l` |
| `xmake update` | 从仓库更新 xmake 自身 | `xmake update` |

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

1. **多平台一键切换**：使用 `xmake f -p` 切换平台后，不同平台的配置会缓存到 `.xmake` 目录中。交叉编译时可用 `xmake f --sdk=/path/to/sdk` 指定工具链目录，并配合 `--arch=` 指定架构（如 `arm64`、`x86_64`）。若要彻底重置配置（例如换用了不同的 NDK 版本），可删除 `.xmake` 目录后再 `xmake f`：
   ```bash
   rm -rf .xmake
   xmake f -p android --ndk=/opt/android-ndk -a arm64-v8a -m release
   ```

2. **配置文件分层**：核心配置写在项目根目录的 `xmake.lua`；也可以创建 `xmake.rc`（顶层全局配置）或每个子目录的 `xmake.lua` 来分层管理。常用函数如 `add_defines()` 添加宏定义、`add_includedirs()` 添加头文件目录、`add_linkdirs()` 添加链接库目录。在子目录的 `xmake.lua` 中，用 `parent()` 表示继承父目录配置：
   ```lua
   -- 根目录 xmake.lua
   set_languages("c++17")
   add_defines("GLOBAL_FLAG")

   -- src/xmake.lua 中引用父级
   target("mylib")
       set_kind("static")
       add_files("*.cpp")
       add_includedirs("$(projectdir)/include")
   ```

3. **与 CMake 项目集成**：如果已有 CMake 工程，可借助 xmake 的 `import("core.project.project")` 或直接调用系统命令来调用 CMake；反过来 CMake 工程也可通过 `xmake` 的 CMake generator 生成产物。日常使用中，`xmake` 与 `clangd`、`ccls` 等 IDE 工具可通过生成 `compile_commands.json`（执行 `xmake f --cxxflags=` 或 `xmake project -k compile_commands`）配合实现代码补全：
   ```bash
   # 生成 compile_commands.json，供 clangd/ccls/VSCode 使用
   xmake project -k compile_commands
   # 也可直接生成 CMakeLists.txt / Makefile / vscode / xcode 等
   xmake project -k cmake
   xmake project -k makefile
   xmake project -k vscode
   ```

4. **环境变量与自动化**：在 CI 中常用 `XMAKE_ROOT`（xmake 安装根目录）等变量，配合 `xmake -P <project>` 指定项目目录、`xmake --workdir=<dir>` 指定工作目录。还可通过 `xmake l` 直接执行内嵌 Lua 脚本，做自定义构建逻辑扩展。
   ```bash
   # 在指定目录构建
   xmake -P /path/to/project
   # 覆盖安装根目录（常用于 CI 中安装到固定路径）
   XMAKE_ROOT=/opt/xmake xmake -P ./project
   # 执行一段 Lua 构建逻辑
   xmake l "import('core.project.config'); print(config.get('mode'))"
   ```

5. **常用配置函数详解**：掌握以下核心 API 即可覆盖绝大多数项目需求：
   ```lua
   set_languages("c11", "c++17")            -- 设置语言标准
   set_optimize("fastest")                   -- 优化级别：none/fast/faster/fastest/smallest
   set_warnings("all", "error")              -- 警告级别：none/less/all/more/everything/error
   set_strip("all")                          -- 剥离符号（发布时减小体积）
   add_cxxflags("-fno-rtti")                 -- 追加自定义编译选项
   add_ldflags("-Wl,--gc-sections")          -- 追加自定义链接选项
   add_undefines("DEBUG")                    -- 取消某个宏定义
   add_defines("VERSION=1.0")                -- 等价于 -DVERSION=1.0
   add_packages("zlib", "openssl")           -- 链接已声明的依赖包
   add_deps("mylib")                         -- 声明目标间的依赖顺序
   on_load(function(target) end)             -- 目标加载时的回调
   before_build / after_build(...)           -- 构建前后钩子
   ```

6. **条件化与平台差异化配置**：通过 `is_plat()`、`is_arch()`、`is_mode()`、`is_os()` 做条件分支，一套 `xmake.lua` 通吃多平台：
   ```lua
   target("app")
       set_kind("binary")
       add_files("src/*.cpp")
       if is_plat("windows") then
           add_syslinks("ws2_32")
       elseif is_plat("linux") then
           add_syslinks("pthread")
       end
       if is_mode("release") then
           set_optimize("fastest")
           set_strip("all")
       end
   ```

7. **自定义规则与工具链**：`add_rules()` 允许复用内置规则（如 `qt.static`、`cuda`、`swift`），也可用 `rule()` 自定义编译规则；`set_toolchains()` 可切换到自定义编译器（如 clang、msvc）：
   ```lua
   add_rules("qt.static")          -- 启用 Qt 静态库规则
   set_toolchains("clang")         -- 切换编译器
   -- 也可在命令行指定
   -- xmake f --toolchain=clang
   ```

8. **多目标与库的组织**：大型项目常拆分为多个 target，用 `add_deps()` 表达依赖，`set_kind("static"/"shared"/"binary")` 区分产物类型：
   ```lua
   target("core")
       set_kind("static")
       add_files("core/*.cpp")

   target("app")
       set_kind("binary")
       add_files("app/*.cpp")
       add_deps("core")          -- app 依赖 core，先构建 core
       add_linkdirs("$(buildir)")-- 链接到 core 生成的静态库
       add_links("core")
   ```

## 六、注意事项与常见问题

- **xmake.lua 语法报错**：xmake.lua 是 Lua 脚本，注意括号、引号匹配；常见的坑是漏掉 `end` 或把 Lua 布尔值写成 `True/False`（应是小写 `true/false`）。出错时用 `xmake` 查看带行号的报错定位。
  ```bash
  # 语法错误会提示到具体行号，例如：
  # error: unexpected symbol near 'end'  in xmake.lua:line 12
  xmake
  ```

- **切换平台/模式后没生效**：切换后务必执行 `xmake -r`（强制重编译），否则增量构建可能沿用旧配置导致链接错误或路径错乱。若问题依旧，删除 `.xmake` 缓存目录后重新 `xmake f`。

- **依赖下载失败**：`add_requires` 从远程拉取包时可能因网络原因失败，可设置镜像源（如 `xmake f --pkg_searchdirs=...` 或配置国内镜像），或改用 `system=true` 使用系统已安装的库。国内网络可配置代理或镜像：
  ```bash
  # 指定本地包目录
  xmake f --pkg_searchdirs=/path/to/packages
  # 使用代理拉取依赖
  export http_proxy=http://127.0.0.1:7890
  export https_proxy=http://127.0.0.1:7890
  ```

- **头文件找不到/链接失败**：优先检查 `add_includedirs`、`add_linkdirs`、`add_packages` 是否配置完整；交叉编译时尤其要注意工具链与 SDK 路径必须匹配。可用 `xmake --verbose` 查看实际传给编译器的 `-I` / `-L` 参数来诊断。

- **性能与增量构建**：首次全量编译较慢，后续 xmake 支持增量构建与并行编译（默认多核）。若改动头文件导致大量重编译，可考虑合理拆分 target 以减小编译单元规模。控制并行度与输出：
  ```bash
  xmake -j 8          # 指定并行度
  xmake -v            # 显示详细编译命令
  xmake -D            # 打印更多调试信息
  ```

- **权限问题**：`xmake install -o /usr/local` 等系统目录安装时需 `sudo`；交叉编译 Android 时确保 NDK 路径无空格、权限可读。

- **NDK 版本不匹配**：Android 交叉编译报错多因 NDK 路径错误或版本过旧。建议使用官方 `r21+` 以上版本，并核对 `--ndk=` 指向的确实是 NDK 根目录（含 `toolchains`、`platforms` 子目录），而不是其父目录。

- **`add_files` 通配符与排除**：通配符 `*` 匹配当前目录，`**` 递归匹配子目录；可用 `{excludes = "..."}` 排除不需要的文件：
  ```lua
  add_files("src/**.cpp", {excludes = {"src/test/**.cpp", "src/gen/*.cpp"}})
  ```

- **Windows 下路径/编码问题**：`add_files` 中尽量使用正斜杠 `/`；若源码含非 UTF-8 编码（如 GBK 注释）可能触发编译器警告，建议统一 UTF-8。

- **安全与发布**：发布 release 时建议开启 `set_strip("all")` 并关闭调试信息，避免符号泄露；对外分发的库注意头文件与 ABI 兼容性，使用 `xmake package` 生成规范的发布归档。

## 七、实战：与其它工具搭配与自动化

### 7.1 与 CMake 双向集成

**从 CMake 迁移到 xmake**：CMake 工程通常有 `CMakeLists.txt` 和 `cmake/` 目录。xmake 可直接在 Lua 中调用 CMake 构建已有的 C/C++ 库，也能通过 CMakeLists 生成 CMake 项目让现有 CI 继续使用：
```bash
# 由 xmake 生成 CMakeLists.txt（适合迁移/供其他工具消费）
xmake project -k cmake -o ./cmake_out
```
**在 xmake 中直接调用 CMake 构建第三方源码**：
```lua
-- 用 os.exec 在配置阶段调用 cmake 构建一个第三方库
after_configure(function()
    os.exec("cmake -S 3rd/lib -B build_3rd -DCMAKE_BUILD_TYPE=Release")
    os.exec("cmake --build build_3rd -j 4")
end)
```

### 7.2 与 Makefile / Ninja 搭配

xmake 内置构建引擎，默认不需要外部构建器，但它也可以生成并消费 `Makefile` 和 `ninja`：
```bash
# 生成 Makefile 供传统 Make 流程使用
xmake project -k makefile
# 生成 ninja 构建文件
xmake project -k ninja
# 与 ninja 结合控制并行度
xmake project -k ninja && ninja -j 8 -C ./build
```
若项目里已有 `Makefile`，可在 xmake 的钩子里调用它：
```lua
before_build(function(target)
    os.exec("make -C legacy clean all")
end)
```

### 7.3 与 Git 集成（忽略构建产物）

在项目根目录添加 `.gitignore`，避免把 `.xmake` 缓存和 `build` 目录提交到仓库：
```gitignore
.xmake/
build/
*.o
*.obj
compile_commands.json
```

### 7.4 Makefile 脚本自动化

写一个顶层 `Makefile` 把 xmake 命令封装成常用目标，方便团队统一入口：
```makefile
.PHONY: all config build run clean install package test

all: build

config:
	xmake f -m release

build: config
	xmake

run: build
	xmake run

test:
	xmake run test

clean:
	xmake clean

install:
	sudo xmake install -o /usr/local

package: build
	xmake package
```

### 7.5 CI 集成（GitHub Actions / GitLab CI）

**GitHub Actions** 示例：在 `.github/workflows/build.yml` 中配置多平台矩阵构建：
```yaml
name: build
on: [push, pull_request]
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - name: Install xmake
        run: |
          curl -fsSL https://xmake.io/shget.text | bash
          echo "$HOME/.xmake" >> $GITHUB_PATH
      - name: Configure
        run: xmake f -m release
      - name: Build
        run: xmake
      - name: Run tests
        run: xmake run test
      - name: Package
        run: xmake package
```

**GitLab CI**（`.gitlab-ci.yml`）：
```yaml
image: ubuntu:22.04
build:
  script:
    - apt-get update && apt-get install -y build-essential curl
    - curl -fsSL https://xmake.io/shget.text | bash
    - export PATH="$HOME/.xmake:$PATH"
    - xmake f -m release
    - xmake
  artifacts:
    paths:
      - build/
```

### 7.6 批量处理与多配置构建

一次性对多个平台/架构组合执行全流程：
```bash
for target in "macosx arm64" "macosx x86_64" "android arm64-v8a"; do
  set -- $target
  xmake f -p $1 -a $2 -m release --clean
  xmake
  xmake package -o dist/$1-$2
done
```
配合 `xmake show` 快速确认当前生效的工具链与平台信息：
```bash
xmake show -l          # 列出所有 target
xmake show -p          # 显示当前平台
xmake show --toolchain # 显示当前工具链
```

### 7.7 生产级实践建议

- **版本固化**：在 CI 与团队间统一 xmake 版本，避免行为差异，可用 `xmake update` 或锁在 Docker 镜像里。
- **依赖锁定**：对第三方依赖明确指定版本，保证可复现构建：`add_requires("zlib 1.3.1")`。
- **产物路径统一**：用 `set_targetdir("$(buildir)/$(plat)/$(arch)/$(mode)")` 让不同平台/架构/模式的产物互不覆盖，便于归档与发布。
- **测试纳入构建**：把单元测试写成独立 target 并在 CI 中运行，用 `xmake run test` 一键触发，形成「构建 → 测试 → 打包」的完整流水线。
- **缓存复用**：在 CI 中缓存 `~/.xmake/packages` 目录，可显著加快依赖安装；本地多次切换配置时保留 `.xmake` 目录能利用增量缓存。