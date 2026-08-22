---
title: emscripten
icon: code
category:
  - 工具
  - 编译工具
tag:
  - 开发构建
  - emscripten
---

# emscripten（把 C/C++ 编译为 WebAssembly/JavaScript）

> Homebrew 版本 4.0.21 ｜ 主页：见官方文档 ｜ 安装：`brew install emscripten`

## 一、它是什么

Emscripten 是一个完整的 LLVM-to-WebAssembly 编译工具链，能把 C/C++ 源码直接编译成可以在浏览器、Node.js 或其他 JavaScript 运行时中运行的 WebAssembly（`.wasm`）二进制文件和配套的 JavaScript 胶水代码。它解决的核心问题是：让海量的 C/C++ 遗产代码和成熟库（如 SDL、OpenGL、zlib、SQLite）无需重写就能跑在 Web 平台上。典型应用场景包括把游戏引擎、音视频处理、图像识别、密码学库等高性能模块编译为 wasm，在浏览器中实现接近原生的性能。

Emscripten 工具链由三部分组成：`emcc`（主编译器，类似 gcc/clang）、`em++`（C++ 版本）、`emar`（归档工具，对应 `ar`，用于打静态库）、`embuilder`（预构建/自构建系统库）、`emrun`（本地测试服务器）、`emsh`（SDK 环境 shell）以及 `em-config`/`em-config-abi` 等辅助工具。这些命令都由 Homebrew 安装后自动加入 PATH，可直接使用。

## 二、安装与升级

```bash
# 安装
brew install emscripten

# 升级到最新版本
brew upgrade emscripten

# 卸载
brew uninstall emscripten

# 验证安装成功（打印版本号）
emcc --version
```

验证输出类似：

```bash
emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 4.0.21 (4e14c0e2c47ddb60d62ebc1839cc2a7eef94daf2)
Copyright (C) 2014 the Emscripten authors (see AUTHORS.txt)
```

同时可以确认 WebAssembly 支持情况：

```bash
# 确认 clang 与 wasm 后端可用
emcc -v
```

常用环境变量（在 shell 中 `export` 即可）也有助于定位工具链位置：

```bash
# 查看当前配置的 SDK 根目录
echo $EMSDK
# 若未设置，也可通过 which 定位 emcc 真实安装路径
which emcc
```

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `emcc` | 主编译命令（编译 C 源码） | `emcc hello.c -o hello.html` |
| `em++` | 编译 C++ 源码（等价于 emcc 的 C++ 版本） | `em++ main.cpp -o main.js` |
| `emar` | 打静态库（对应 `ar`） | `emar rcs libfoo.a foo.o` |
| `emrun` | 运行生成 HTML 的本地测试服务器 | `emrun --port 8080 index.html` |
| `embuilder` | 预构建/自构建系统库 | `embuilder build zlib` |
| `-O0 / -O1 / -O2 / -O3 / -Os / -Oz` | 优化级别，O3 体积与性能较均衡，Os/Oz 极致压缩 | `emcc -O3 code.c -o code.wasm` |
| `-g / -g0~-g4` | 调试级别，g4 保留全部符号与源映射 | `emcc -O0 -g4 code.c -o code.js` |
| `-s` | 设置链接/编译选项，如 `-s WASM=1` | `emcc main.c -s WASM=1 -o main.js` |
| `-o` | 指定输出文件，扩展名决定产物类型 | `emcc a.c -o a.html` / `-o a.js` / `-o a.wasm` |
| `--bind` | 启用 embind（把 C++ 类/函数导出给 JS 调用） | `em++ --bind api.cpp -o api.js` |
| `-I` / `-L` / `-l` | 指定头文件路径、库路径、链接库 | `emcc main.c -Iinclude -lmylib -o out.js` |
| `-sEXPORTED_FUNCTIONS` | 显式导出指定函数供 JS 调用 | `-sEXPORTED_FUNCTIONS=_add` |
| `-sMODULARIZE=1` | 生成模块化代码，便于按需加载 | `-sMODULARIZE=1 -sEXPORT_NAME=MyModule` |
| `--preload-file` / `--embed-file` | 把文件打入虚拟文件系统 | `emcc app.c --preload-file assets/ -o app.js` |

## 四、实际示例

### 示例 1：编译 C 为 HTML，在浏览器中运行

准备一个 C 文件 `hello.c`：

```c
#include <stdio.h>
#include <emscripten.h>

int main() {
    printf("Hello, WebAssembly!\n");
    return 0;
}
```

编译生成 HTML：

```bash
emcc hello.c -o hello.html
```

用 emrun 启动本地服务器并打开页面，打开浏览器开发者工具（F12）Console 即可看到 `Hello, WebAssembly!` 输出：

```bash
emrun --port 8080 hello.html
```

### 示例 2：编译为独立 wasm 并在 Node.js 中调用导出函数

准备 `math.c`，声明一个可供 JS 调用的函数：

```c
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}
```

编译时导出该函数：

```bash
emcc math.c -o math.js -sEXPORTED_FUNCTIONS=_add -sEXPORTED_RUNTIME_METHODS=ccall,cwrap
```

在 Node.js 中调用：

```bash
node -e "
const m = require('./math.js');
const add = m.cwrap('add', 'number', ['number', 'number']);
console.log('1 + 2 =', add(1, 2));
"
```

输出：`1 + 2 = 3`

### 示例 3：编译 C++ 并用 embind 导出类给 JavaScript

准备 `greet.cpp`：

```cpp
#include <emscripten/bind.h>
#include <string>

class Greeter {
public:
    Greeter() : name_("world") {}
    void setName(const std::string& n) { name_ = n; }
    std::string greet() const { return "Hello, " + name_ + "!"; }
private:
    std::string name_;
};

EMSCRIPTEN_BINDINGS(greeter) {
    emscripten::class_<Greeter>("Greeter")
        .constructor<>()
        .function("setName", &Greeter::setName)
        .function("greet", &Greeter::greet);
}
```

编译：

```bash
em++ greet.cpp -o greet.js --bind
```

在 Node.js 中调用：

```bash
node -e "
require('./greet.js').then(m => {
    const g = new m.Greeter();
    g.setName('Emscripten');
    console.log(g.greet());
});
"
```

输出：`Hello, Emscripten!`

### 示例 4：配合主循环调用 C 侧函数（游戏/动画）

Emscripten 提供了 `emscripten_set_main_loop` 让 C 代码每帧执行回调，配合 `emscripten_sleep` 实现帧循环，适合游戏、动画、实时计算：

```c
#include <emscripten.h>
#include <stdio.h>

static int frame = 0;

void tick() {
    printf("frame %d\n", ++frame);
    if (frame >= 60) emscripten_cancel_main_loop(); // 60 帧后停止
}

int main() {
    emscripten_set_main_loop(tick, 0, 1);
    return 0;
}
```

编译并打开：

```bash
emcc loop.c -o loop.html
emrun --port 8080 loop.html
```

## 五、进阶技巧与配置

### 5.1 模块化加载与前端打包

默认生成的 JS 会立即自执行，不利于现代前端打包。建议用 `-sMODULARIZE=1 -sEXPORT_NAME=MyModule` 生成可 Promise 加载的模块，前端配合 `Webpack`/`Vite` 使用时更顺手：

```bash
emcc main.c -o main.js -sMODULARIZE=1 -sEXPORT_NAME=MyModule
```

生成的 `main.js` 导出一个工厂函数，可在前端这样加载：

```js
import MyModule from './main.js';
const m = await MyModule();
console.log(m._add(2, 3));
```

### 5.2 定制内存初始化文件与单文件分发

大型 C/C++ 项目会生成 `.data` 内存初始化文件，前端部署时务必与 `.wasm`、`.js` 一同拷贝，并设置正确的 MIME 类型（`.data` 为 `application/octet-stream`、`.wasm` 为 `application/wasm`）。若想简化部署，可用 `-sSINGLE_FILE=1` 将 wasm、JS、data 全部 base64 内联进单个 JS 文件，便于 CDN 与离线分发：

```bash
# 单文件分发（wasm 内联进 JS）
emcc main.c -o main.js -sSINGLE_FILE=1
```

注意：`SINGLE_FILE` 会显著增大 JS 体积（base64 放大约 33%），适合中小模块；大型模块建议保持分离并开启压缩与 HTTP 缓存。

### 5.3 与 CMake 集成

设置 `CMAKE_TOOLCHAIN_FILE` 即可用 CMake 原生构建 Emscripten 项目，无需手写 emcc 命令：

```bash
cmake -DCMAKE_TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_BUILD_TYPE=Release ..
make
```

其中 `$EMSDK` 是 Emscripten SDK 根目录（Homebrew 安装路径通常为 `/opt/homebrew/Cellar/emscripten/<版本>/`，可用 `which emcc` 定位）。

更规范的做法是在 CMakeLists.txt 中先探测工具链：

```cmake
cmake_minimum_required(VERSION 3.16)
project(mywasm C)

# 启用 wasm 相关的目标属性
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O3")
set(CMAKE_EXECUTABLE_SUFFIX ".js")

add_executable(main main.c)
set_target_properties(main PROPERTIES
    LINK_FLAGS "-sEXPORTED_FUNCTIONS=_add -sEXPORTED_RUNTIME_METHODS=ccall,cwrap")
```

构建产物（`main.js`/`main.wasm`/`main.data`）都会输出到构建目录。

### 5.4 常用环境变量

| 环境变量 | 作用 |
| --- | --- |
| `EMCC_DEBUG=1` | 输出详细编译日志，排查链接/优化问题 |
| `EMCC_FORCE_STDLIBS=1` | 强制链接标准库副本，避免与系统库冲突 |
| `EMSDK` | SDK 根目录，很多脚本靠它定位工具链 |
| `EMCC_CACHE_DIR` | 指定编译缓存目录（默认 `~/.emscripten_cache`） |
| `EMCC_LOCAL_PORTS` | 本地端口/库缓存目录 |
| `EMCC_SKIP_SANITY_CHECK=1` | 跳过环境自检（升级后首次编译建议保持自检） |

### 5.5 常用 `-s` 配置项速查

`-s` 选项是 Emscripten 功能的核心，下面列出生产中最常用的一批（注意新旧版本语法都接受，新版本推荐 `-sXXX=YYY` 无空格写法）：

| 选项 | 作用 |
| --- | --- |
| `-sWASM=1`（默认）| 输出 WebAssembly；`=0` 则输出 asm.js 兼容代码 |
| `-sEXPORTED_RUNTIME_METHODS=ccall,cwrap,FS` | 导出运行时工具方法 |
| `-sEXPORTED_FUNCTIONS=_add,_main` | 显式导出符号（C 函数加下划线前缀） |
| `-sALLOW_MEMORY_GROWTH=1` | 允许堆内存按需增长 |
| `-sINITIAL_MEMORY=16777216` | 指定初始堆大小（字节），省去反复扩容开销 |
| `-sMAXIMUM_MEMORY=536870912` | 设置最大堆上限 |
| `-sPTHREADS=1` | 启用 Web Worker 多线程 |
| `-sASSERTIONS=1`（默认）| 开启运行时断言，调试友好 |
| `-sSTACK_SIZE=1048576` | 设置调用栈大小，递归深的代码需调大 |
| `-sMINIFY_HTML=0` | 不压缩生成的 HTML，便于调试阅读 |
| `-sFETCH=1` | 启用基于 JS Fetch 的网络能力 |
| `-sFILESYSTEM=1` | 启用虚拟文件系统（默认已开启） |
| `-sDISABLE_EXCEPTION_CATCHING=0` | 开启 C++ 异常捕获（默认关闭以省体积） |

### 5.6 编译选项与 WebAssembly 优化

除 `-O0~-O3` 之外，还有一些专门针对 wasm 的调优手段：

```bash
# 极致体积（-Os 优化体积、-Oz 更激进地牺牲速度）
emcc -Os code.c -o code.js

# 生成可读的 wasm 文本（.wat）便于人工审查
emcc -O1 code.c -sWASM=1 -S -o code.wat

# 开启 Binaryen 优化（默认随 -O 级别自动启用，也可强制指定）
emcc -O3 --llvm-lto 2 code.c -o code.js   # 开启 LTO 链接期优化，跨文件内联

# 压缩 wasm 二进制（部署时用 gzip/brotli）
gzip -k code.wasm
```

体积优化经验：能编译成 C 就别用 C++ 模板爆炸；避免导出过多函数；字符串和全局数据用 `-Os`；发布前始终压缩 gzip/brotli，wasm 对 gzip 压缩率通常很好。

### 5.7 多线程（Pthreads）进阶

启用多线程需要 `-sPTHREADS=1`，同时浏览器端必须开启跨域隔离（发送 `COOP`/`COEP` 响应头）才能使用 `SharedArrayBuffer`：

```bash
emcc -O3 -sPTHREADS=1 -sALLOW_MEMORY_GROWTH=1 worker.c -o worker.js
```

Node.js 侧运行时：

```bash
node --experimental-wasm-threads --experimental-wasm-bulk-memory worker.js
```

跨域隔离响应头（Nginx/开发服务器）示例：

```nginx
add_header Cross-Origin-Opener-Policy same-origin;
add_header Cross-Origin-Embedder-Policy require-corp;
```

注意：多线程 wasm 的初始化是全异步的，`Module.onRuntimeInitialized` 或 promise 加载时须等待 `PThread` 完全 ready 再使用。

### 5.8 与其他工具链对比（本系列 n 其他篇衔接）

本教程系列还包含 `emscripten`、`cling`、`nasm`、`yasm` 等编译工具。与它们的分工定位不同：`emscripten` 面向 Web 平台，把 C/C++ 编为 wasm；`cling` 是交互式 C++ 解释器，侧重探索与调试；`nasm`/`yasm` 则面向 x86/其他架构的汇编编程。若同时学习这些工具，注意它们在命令行风格、输出目标、优化模型上差异很大，不要混用参数。

## 六、注意事项与常见问题

### 6.1 新手最常踩的坑

1. **文件系统差异**：浏览器中的 wasm 运行在虚拟文件系统（MEMFS）中，`fopen`/`fread` 无法直接读取服务器上的真实文件。需要先把文件预加载到虚拟文件系统，常用 `--preload-file` 或 `--embed-file` 选项，或通过 JS 侧读取后再传入。

2. **函数导出缺失导致调用为 undefined**：JS 只能调用显式导出的函数。忘记加 `EMSCRIPTEN_KEEPALIVE` 或 `-sEXPORTED_FUNCTIONS`，直接调用会报 `undefined is not a function`。导出时注意 C 函数名前加下划线（`_add`）。

3. **没有用 `-o xxx.js` 而是漏了输出类型**：emcc 默认需要 `-o` 指定产物类型，忘记写会报 `no output` 或直接生成 `a.out.js`。写清楚 `-o xxx.html` / `.js` / `.wasm`。

4. **直接 `node xxx.js` 在无 `-sMODULARIZE` 时立即自执行**：若只想拿到导出函数而没看到输出，可能是 main 已跑完、进程立即退出。加 `-sMODULARIZE=1` 并按 Promise 使用即可。

5. **`#include <emscripten.h>` 报找不到头文件**：说明未用 emcc/em++ 而误用了系统 gcc/g++。务必通过 emcc 编译，它内置了 Emscripten 头文件路径。

6. **浏览器加载 wasm 报 MIME 错误**：`.wasm` 必须返回 `application/wasm` 的 Content-Type，本地用 emrun 会自动配好，自己部署静态服务器时需手动配置。

### 6.2 常见报错及解决办法

| 报错/现象 | 原因 | 解决办法 |
| --- | --- | --- |
| `undefined symbol: _foo` | 链接时缺少实现 | 确认源文件被编译、未声明未定义、导出名与符号一致 |
| `unreachable` / `RuntimeError: memory access out of bounds` | 越界访问或内存不足 | 增大 `-sINITIAL_MEMORY`、开 `-sALLOW_MEMORY_GROWTH=1`，检查指针/长度 |
| `ReferenceError: Module is not defined` | 非 MODULARIZE 模式直接 `require` | 用 `-sMODULARIZE=1` 生成 Promise 模块，或先全局 `Module` |
| `Segmentation fault` in Node | 栈溢出或空指针 | 调大 `-sSTACK_SIZE`，用 `-O0 -g4` 配合 `--source-map-base` 定位 |
| `wasm-opt` 报未知 feature | 目标浏览器过旧 | 换用 `-mtarget-features` 或降级优化级别，升级浏览器 |
| `error: unknown argument` | 误传了宿主平台参数 | emcc 是 wasm 交叉编译，去掉 `-m64`/`-march=native` 等宿主专用选项 |

### 6.3 性能与安全注意点

1. **性能与体积权衡**：默认未优化时 wasm 体积大、性能差。发布前务必加 `-O3`；若追求极致体积可用 `-Os`。调试时用 `-O0 -g4` 保留符号便于定位错误。

2. **依赖系统库的问题**：有些 C/C++ 库依赖 POSIX 或系统特性，Emscripten 未完全实现（如 fork、部分网络 API、多线程），移植前先确认目标库是否支持 wasm。启用多线程需要 `-sPTHREADS=1` 并配合 `SharedArrayBuffer`（需站点开启跨域隔离头）。

3. **Node 版本兼容**：生成的 JS 可能在较老 Node 版本上无法运行，建议使用 Node.js 16+；浏览器端注意 wasm 的 MIME 类型需配置为 `application/wasm` 才可正常加载。

4. **升级后缓存失效**：升级 Homebrew 的 emscripten 后，旧的 `.wasm`/`.data` 缓存可能不兼容，务必全量重新编译，避免混用不同版本产物导致的崩溃。若 `~/.emscripten_cache` 报陈旧，可删掉后重新构建：`rm -rf ~/.emscripten_cache`。

5. **安全：避免把敏感数据编译进 wasm**：wasm 与 JS 同样易被逆向，密钥、token 不要硬编码进源码；对输入做边界校验，防止越界读写；对外暴露的导出函数要最小化，减少攻击面。

6. **性能：小心字符串与类型转换**：wasm 与 JS 边界来回传字符串/对象开销很大，尽量批量、整块传递数据（如用 typed array 一次性传 Buffer），避免频繁小调用。

7. **安全：CSP 与权限**：若站点启用严格内容安全策略，需把 `'wasm-unsafe-eval'` 加入 `script-src`，否则 wasm 实例化会被浏览器拦截。

## 七、实战：与其它工具搭配与自动化

### 7.1 与 Webpack / Vite 集成

前端构建时把 wasm 当模块使用。以 Vite 为例，安装 vite 插件后直接在 JS 里 import：

```js
// 编译时生成模块化产物
// emcc main.c -o main.js -sMODULARIZE=1 -sEXPORT_NAME=MyModule

import MyModule from '../wasm/main.js?url';
// 或直接用插件处理 wasm 文件
```

若用 Webpack 5，内置 wasm 支持，可直接：

```js
import main from './main.wasm';
main({}).then(m => console.log(m._add(1, 2)));
```

推荐统一约定：所有 wasm 产物放入 `wasm/` 目录，通过构建脚本统一编译，避免每次手敲命令。

### 7.2 用 Makefile 自动化编译

把常用编译流程固化成 Makefile，增量构建 + 清理：

```makefile
CC := emcc
CFLAGS := -O3 -sWASM=1
EXPORT := -sEXPORTED_FUNCTIONS=_add -sEXPORTED_RUNTIME_METHODS=ccall,cwrap

SRC := math.c
JS_OUT := dist/math.js
WASM_OUT := dist/math.wasm

all: $(JS_OUT) $(WASM_OUT)

dist/%.js dist/%.wasm: %.c
	mkdir -p dist
	$(CC) $(CFLAGS) $(EXPORT) $< -o $(JS_OUT)

clean:
	rm -rf dist

.PHONY: all clean
```

### 7.3 与 CMake 的自动化构建脚本

```bash
#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR=build-wasm
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

cmake -DCMAKE_TOOLCHAIN_FILE="$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake" \
      -DCMAKE_BUILD_TYPE=Release \
      ..
cmake --build . -j"$(sysctl -n hw.ncpu)"
```

### 7.4 批量编译多个源文件

使用 glob 展开所有源文件一次性编译：

```bash
emcc -O3 -sEXPORTED_RUNTIME_METHODS=ccall,cwrap \
     src/*.c -o bundle.js -sMODULARIZE=1 -sEXPORT_NAME=Bundle
```

配合 `find` 收集源文件列表（用于条件排除）：

```bash
SRCS=$(find src -name '*.c' ! -name '*test*')
emcc -O3 $SRCS -o bundle.js -sMODULARIZE=1 -sEXPORT_NAME=Bundle
```

### 7.5 CI 集成（GitHub Actions）

在 CI 中安装 emscripten 并构建、跑测试、上传产物：

```yaml
name: wasm-build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: mymindstorm/setup-emsdk@v14
      - name: Build
        run: |
          emcc -O3 -sEXPORTED_FUNCTIONS=_add -sEXPORTED_RUNTIME_METHODS=ccall,cwrap \
               math.c -o math.js
      - name: Test
        run: node -e "const m=require('./math.js');console.log(m.cwrap('add','number',['number','number'])(2,3))"
      - uses: actions/upload-artifact@v4
        with:
          name: wasm-dist
          path: |
            math.js
            math.wasm
```

### 7.6 与其他语言工具链搭配

- **与 CMake + FetchContent 拉取开源 C/C++ 库**：用 CMake 的 `FetchContent` 自动下载 zlib、sqlite 等，再统一链接进 wasm，省去手工交叉编译依赖的麻烦。
- **与 Node.js 原生模块对比**：Node 侧也可用 N-API 编译原生插件，但 wasm 的跨平台（浏览器+Node+小程序）优势明显，同一份产物可到处跑。
- **与 `wasm-opt` / `wasm-objdump`（Binaryen）配合**：发布前用 Binaryen 的 `wasm-opt -O3` 再压一轮，用 `wasm-objdump -d` 审查指令，帮助定位性能瓶颈。
- **与 emscripten 的测试框架（Test Internals）**：可写 `*.test.js` 调用 wasm 导出做单元测试，在 CI 中统一跑。

### 7.7 生产级实践清单

- 发布流程固定为：`-O3` + gzip/brotli 压缩 + 正确 MIME。
- 产物分离存放（`.js`/`.wasm`/`.data`），开启长期 HTTP 缓存并带内容哈希指纹。
- 用 `-sMODULARIZE=1 -sEXPORT_NAME` 暴露工厂函数，前端按需懒加载。
- 对外只导出最小函数集，降低逆向与攻击面。
- 用 CMake + Makefile + CI 三层脚本把编译、测试、发布全部自动化。
- 记录并固化 emcc 版本号到 `package.json` 或 README，保证可复现构建。

> 提示：本教程系列中关于其他编译工具（`cling`、`nasm`、`yasm`）的中文进阶用法，可在本工具分类目录下继续查阅对应文档。