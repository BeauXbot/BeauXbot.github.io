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

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `emcc` | 主编译命令（编译 C 源码） | `emcc hello.c -o hello.html` |
| `em++` | 编译 C++ 源码（等价于 emcc 的 C++ 版本） | `em++ main.cpp -o main.js` |
| `-O0 / -O1 / -O2 / -O3` | 优化级别，O3 体积与性能较均衡 | `emcc -O3 code.c -o code.wasm` |
| `-s` | 设置链接/编译选项，如 `-s WASM=1` | `emcc main.c -s WASM=1 -o main.js` |
| `-o` | 指定输出文件，扩展名决定产物类型 | `emcc a.c -o a.html` / `-o a.js` / `-o a.wasm` |
| `--bind` | 启用 embind（把 C++ 类/函数导出给 JS 调用） | `em++ --bind api.cpp -o api.js` |
| `-I` / `-L` / `-l` | 指定头文件路径、库路径、链接库 | `emcc main.c -Iinclude -lmylib -o out.js` |
| `-sEXPORTED_FUNCTIONS` | 显式导出指定函数供 JS 调用 | `-sEXPORTED_FUNCTIONS=_add` |
| `-sMODULARIZE=1` | 生成模块化代码，便于按需加载 | `-sMODULARIZE=1 -sEXPORT_NAME=MyModule` |
| `emrun` | 运行生成 HTML 的本地测试服务器 | `emrun --port 8080 index.html` |

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

## 五、进阶技巧与配置

1. **模块化加载**：默认生成的 JS 会立即自执行，不利于现代前端打包。建议用 `-sMODULARIZE=1 -sEXPORT_NAME=MyModule` 生成可 Promise 加载的模块，前端配合 `Webpack`/`Vite` 使用时更顺手：

   ```bash
   emcc main.c -o main.js -sMODULARIZE=1 -sEXPORT_NAME=MyModule
   ```

2. **定制内存初始化文件**：大型 C/C++ 项目会生成 `.data` 内存初始化文件，前端部署时务必与 `.wasm`、`.js` 一同拷贝，并设置正确的 `-sSINGLE_FILE=1` 可将一切内联进单个 JS 文件方便分发：

   ```bash
   emcc main.c -o main.js -sSINGLE_FILE=1
   ```

3. **与 CMake 集成**：设置 `CMAKE_TOOLCHAIN_FILE` 即可用 CMake 原生构建 Emscripten 项目，无需手写 emcc 命令：

   ```bash
   cmake -DCMAKE_TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_BUILD_TYPE=Release ..
   make
   ```

   其中 `$EMSDK` 是 Emscripten SDK 根目录（Homebrew 安装路径通常为 `/opt/homebrew/Cellar/emscripten/<版本>/`，可用 `which emcc` 定位）。

4. **常用环境变量**：通过 `EMCC_DEBUG=1` 可输出详细编译日志排查问题；`EMCC_FORCE_STDLIBS=1` 可强制使用标准库版本。

## 六、注意事项与常见问题

1. **文件系统差异**：浏览器中的 wasm 运行在虚拟文件系统（MEMFS）中，`fopen`/`fread` 无法直接读取服务器上的真实文件。需要先把文件预加载到虚拟文件系统，常用 `--preload-file` 或 `--embed-file` 选项，或通过 JS 侧读取后再传入。

2. **函数导出缺失导致调用为 undefined**：JS 只能调用显式导出的函数。忘记加 `EMSCRIPTEN_KEEPALIVE` 或 `-sEXPORTED_FUNCTIONS`，直接调用会报 `undefined is not a function`。导出时注意 C 函数名前加下划线（`_add`）。

3. **性能与体积权衡**：默认未优化时 wasm 体积大、性能差。发布前务必加 `-O3`；若追求极致体积可用 `-Os`。调试时用 `-O0 -g4` 保留符号便于定位错误。

4. **依赖系统库的问题**：有些 C/C++ 库依赖 POSIX 或系统特性，Emscripten 未完全实现（如 fork、部分网络 API、多线程），移植前先确认目标库是否支持 wasm。启用多线程需要 `-sPTHREADS=1` 并配合 `SharedArrayBuffer`（需站点开启跨域隔离头）。

5. **Node 版本兼容**：生成的 JS 可能在较老 Node 版本上无法运行，建议使用 Node.js 16+；浏览器端注意 wasm 的 MIME 类型需配置为 `application/wasm` 才可正常加载。

6. **升级后缓存失效**：升级 Homebrew 的 emscripten 后，旧的 `.wasm`/`.data` 缓存可能不兼容，务必全量重新编译，避免混用不同版本产物导致的崩溃。