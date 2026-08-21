---
title: yasm
icon: code
category:
  - 工具
  - 编译工具
tag:
  - 开发构建
  - yasm
---

# yasm（NASM 的模块化重实现汇编器）

> Homebrew 版本 1.3.0 ｜ 主页：见官方文档 ｜ 安装：`brew install yasm`

## 一、它是什么
yasm 是一个从零开始、模块化重写的汇编器，兼容 NASM 语法，但架构设计上比 NASM 更清晰、更易于扩展。它把汇编器的各个阶段（预处理、解析、优化、代码生成、对象格式输出）拆成独立模块，因此能原生支持多种指令集架构（x86、x86-64、AMD64）和多种对象文件格式（ELF、Mach-O、COFF、Win32/Win64 PE），在 macOS/Linux 上表现尤其出色。典型应用场景包括：手写性能关键的内核或加密汇编、编译 FFmpeg/x264/x265 等媒体库时作为其内部汇编器、以及逆向工程与系统级开发。

## 二、安装与升级
```bash
# 安装
brew install yasm

# 升级到最新版本
brew upgrade yasm

# 卸载
brew uninstall yasm

# 查看版本信息
yasm --version
```

安装完成后，运行 `yasm --version` 应能看到类似 `yasm 1.3.0` 的输出。若命令找不到，确认 Homebrew 的 bin 目录（通常是 `/opt/homebrew/bin` 或 `/usr/local/bin`）已在 `PATH` 中。

## 三、常用命令速查
| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `yasm -f` | 指定对象文件格式（macho64/elf64/elf32/bin/win64 等），**必需参数** | `yasm -f macho64 foo.asm` |
| `yasm -o` | 指定输出文件名 | `yasm -f elf64 -o foo.o foo.asm` |
| `yasm -g` | 生成调试信息（dwarf2/stabs 等） | `yasm -f elf64 -g dwarf2 foo.asm` |
| `yasm -l` | 生成列表文件（.lst），便于查看每行对应的机器码 | `yasm -f elf64 -l foo.lst foo.asm` |
| `yasm -E` | 只做预处理，输出展开后的汇编代码 | `yasm -E foo.asm > foo.expanded.asm` |
| `yasm -p` | 指定预处理器（默认 `nasm`，也可用 `raw`） | `yasm -p raw foo.asm` |
| `yasm -D` | 定义预处理宏，等价于 `-D NAME=VALUE` | `yasm -f elf64 -D DEBUG=1 foo.asm` |
| `yasm --help` | 查看完整参数列表与说明 | `yasm --help` |
| `yasm --license` | 查看许可证与软件声明 | `yasm --license` |

## 四、实际示例

### 示例 1：编译一个 x86-64 的 Mach-O 程序（macOS）
```bash
# 1. 准备源代码 hello.asm
cat > hello.asm <<'EOF'
section .data
    msg db 'Hello, YASM!', 0xA
    len equ $ - msg

section .text
    global _main
_main:
    mov rax, 0x2000004      ; macOS 的 write 系统调用号
    mov rdi, 1              ; 文件描述符 1 = stdout
    lea rsi, [rel msg]      ; 取消息地址（Mach-O 需要 RIP 相对寻址）
    mov rdx, len            ; 消息长度
    syscall
    mov rax, 0x2000001      ; macOS 的 exit 系统调用号
    xor rdi, rdi            ; 退出码 0
    syscall
EOF

# 2. 用 yasm 编译为 Mach-O 64 位对象文件（macOS 上的默认格式）
yasm -f macho64 -g dwarf2 -l hello.lst hello.asm

# 3. 链接（macOS 用 clang 自带的链接器）
ld -o hello hello.o -lSystem

# 4. 运行
./hello
```

执行后终端会打印 `Hello, YASM!`。生成的 `hello.lst` 列表文件会显示每条指令对应的机器码字节，方便对照学习。

### 示例 2：编译 64 位 ELF 并链接运行（Linux 风格，语法同样适用于 mac）
```bash
# 1. 准备源代码
cat > sum.asm <<'EOF'
section .text
    global _start
_start:
    mov rax, 60      ; Linux 的 exit 系统调用号
    xor rdi, rdi
    syscall
EOF

# 2. 用 yasm 编译为 ELF64 对象文件
yasm -f elf64 sum.asm -o sum.o

# 3. 用系统链接器链接
ld -o sum sum.o

# 4. 运行（退出码 0 表示成功）
./sum && echo "exit ok: $?"
```

`$?` 会输出 `exit ok: 0`。这个示例演示了 yasm 作为编译器的核心用法：`-f elf64` 生成 ELF64 目标文件，再交由系统链接器处理。

### 示例 3：只做预处理展开宏
```bash
# 1. 准备带宏的源码
cat > macro.asm <<'EOF'
%define SQUARE(x) ((x)*(x))
section .data
    val dd SQUARE(3)
EOF

# 2. 展开宏查看预处理结果
yasm -E macro.asm
```

输出会显示 `val dd ((3)*(3))`，即宏被完全展开后的汇编代码。`-E` 是排查复杂宏定义错误的好帮手。

## 五、进阶技巧与配置

1. **格式与系统调用号的对应**：yasm 只负责汇编，不处理系统调用。同一段汇编在 macOS 用 `0x2000000` 开头的系统调用号（如 write=0x2000004、exit=0x2000001），在 Linux 则直接用 `0/1/60` 等小号。跨平台代码常用 `%ifdef` 配合 `-D` 宏条件编译来区分平台。

2. **与其它工具链搭配**：日常流程是「yasm 汇编 + 系统链接器链接」。在 macOS 用 `ld -lSystem` 或直接交给 `clang hello.o` 自动链接；C/C++ 混编时，先用 `yasm -f macho64` 产出 `.o`，再与 `gcc`/`clang` 编译的 C 目标文件一起链接。媒体库（FFmpeg、x264 等）的构建脚本通常自动探测并调用 yasm。

3. **列表文件与调试信息**：加 `-l xxx.lst` 生成列表文件，逐行对照「汇编代码 → 机器码 → 地址」；配合 `-g dwarf2` 生成 DWARF 调试信息，就能在 lldb/gdb 里对汇编源码打断点单步执行，是学习或排查汇编逻辑的利器。

4. **RIP 相对寻址**：在 64 位 Mach-O 中访问全局数据必须用 `lea rsi, [rel msg]` 这样的 RIP 相对寻址，直接写 `mov rsi, msg` 会链接失败。这是 macOS 汇编新手最常见的坑，建议统一使用 `rel` 前缀。

## 六、注意事项与常见问题

- **忘记 `-f` 参数**：yasm 默认不生成对象文件，必须显式用 `-f` 指定格式。macOS 用 `macho64`，Linux 用 `elf64`/`elf32`，Windows 用 `win64`/`win32`。选错格式会导致链接器无法识别目标文件。

- **Mach-O 与 ELF 的链接差异**：macOS 的入口符号是 `_main`（带下划线），Linux 是 `_start`（不带下划线）；macOS 链接需加 `-lSystem`。把 Linux 教程里的 `_start` 原样复制到 macOS 编译会链接报错。

- **全局符号在 macOS 必须加下划线**：Mach-O 约定 C 符号都带前导下划线，因此函数名要写成 `_main` 而不是 `main`，否则链接时找不到入口。

- **64 位寻址报错**：`mov` 指令把 64 位地址直接当立即数常触发「invalid combination of opcode and operands」或链接 relocation 错误。改用 `lea` + `[rel symbol]` 模式即可。

- **版本较老**：Homebrew 的 yasm 长期停留在 1.3.0（2014 年发布）。它足够稳定成熟，但多年未更新。若需要新指令集扩展支持，可考虑改用 NASM（`brew install nasm`），两者语法基本兼容。