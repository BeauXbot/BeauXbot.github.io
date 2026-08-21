---
title: nasm
icon: code
category:
  - 工具
  - 编译工具
tag:
  - 开发构建
  - nasm
---

# nasm（Netwide Assembler，x86/x64 汇编器）

> Homebrew 版本 3.01 ｜ 主页：见官方文档 ｜ 安装：`brew install nasm`

## 一、它是什么

nasm（Netwide Assembler）是一个开源的 x86/x64 汇编器，用于把人类可读的汇编源码翻译成机器可执行的二进制目标文件。它支持多种输出格式（ELF、Mach-O、PE/COFF、bin 等），既能为 Linux/macOS 编译 64 位程序，也能为 Windows 或裸机/引导程序输出原始二进制，是学习底层、编写高性能代码、以及做操作系统/内核开发时的常用工具。

相比 GNU 汇编器（as）和 Intel 自带汇编器，nasm 采用更接近 Intel 语法的指令书写方式、宏支持更友好，且可移植性极佳——同一份源码稍作配置即可在多个平台交叉编译。

## 二、安装与升级

```bash
# 安装
brew install nasm

# 升级到最新版
brew upgrade nasm

# 卸载
brew uninstall nasm

# 验证安装成功（应显示版本号，如 3.01）
nasm -v
```

输出示例：

```bash
$ nasm -v
NASM version 3.01 compiled on ...
```

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `-f <fmt>` | 指定输出格式，如 `elf64`（Linux 64 位）、`macho64`（macOS 64 位）、`bin`（裸二进制） | `nasm -f macho64 hello.asm -o hello.o` |
| `-o <file>` | 指定输出文件名 | `nasm -f bin boot.asm -o boot.bin` |
| `-l <file>` | 生成 .lst 列表文件（含地址与机器码，便于调试） | `nasm -f elf64 -l hello.lst hello.asm` |
| `-g` | 生成调试信息（配合 gdb 使用） | `nasm -g -f macho64 hello.asm -o hello.o` |
| `-I <dir>` | 添加头文件（.inc）搜索路径 | `nasm -I./inc -f elf64 main.asm -o main.o` |
| `-D <macro>` | 定义宏，等价于源码里的 `%define` | `nasm -DDEBUG -f elf64 app.asm -o app.o` |
| `-E <file>` | 只做预处理并把结果输出到文件 | `nasm -E -f elf64 -o out.i app.asm` |
| `-p <file>` | 预包含某个文件（类似 C 的 `#include`） | `nasm -p std.inc -f elf64 app.asm -o app.o` |
| `-w <warn>` | 控制警告，如 `-w+error` 把警告视为错误 | `nasm -w+error -f elf64 app.asm -o app.o` |
| `-v` | 打印版本信息 | `nasm -v` |

## 四、实际示例

### 示例 1：macOS（Mach-O 64 位）下的 "Hello, World"

先编写源文件 `hello.asm`：

```bash
cat > hello.asm << 'EOF'
BITS 64
global _main

section .text
_main:
    mov     rax, 0x2000004      ; syscall: write
    mov     rdi, 1              ; fd = 1 (stdout)
    lea     rsi, [rel msg]      ; 消息地址（与位置无关寻址）
    mov     rdx, msg_len        ; 消息长度
    syscall

    mov     rax, 0x2000001      ; syscall: exit
    xor     rdi, rdi            ; 退出码 0
    syscall

section .data
msg:    db "Hello, World!", 10
msg_len equ $ - msg
EOF
```

用 nasm 汇编、再用系统链接器（ld）链接并运行：

```bash
nasm -f macho64 hello.asm -o hello.o
ld -macosx_version_min 10.14 -lSystem -e _main hello.o -o hello
./hello
```

输出：

```text
Hello, World!
```

### 示例 2：Linux（ELF 64 位）下的 "Hello, World"

```bash
cat > hello_linux.asm << 'EOF'
BITS 64
global _start

section .text
_start:
    mov     rax, 1              ; syscall: write
    mov     rdi, 1              ; fd = 1
    mov     rsi, msg
    mov     rdx, msg_len
    syscall

    mov     rax, 60             ; syscall: exit
    xor     rdi, rdi
    syscall

section .data
msg:    db "Hello, Linux!", 10
msg_len equ $ - msg
EOF

nasm -f elf64 hello_linux.asm -o hello_linux.o
ld hello_linux.o -o hello_linux
./hello_linux
```

输出：

```text
Hello, Linux!
```

### 示例 3：生成裸二进制引导扇区（bin 格式）

bin 格式直接输出原始机器码，适合写引导扇区（512 字节）：

```bash
cat > boot.asm << 'EOF'
BITS 16
org 0x7c00

start:
    mov     ax, 0x0e
    mov     al, 'X'
    int     0x10                ; BIOS 中断：在屏幕打印字符

    cli
    hlt

times 510 - ($ - $$) db 0       ; 填充到 510 字节
dw 0xaa55                       ; 引导扇区签名
EOF

nasm -f bin boot.asm -o boot.bin
ls -l boot.bin                  # 应恰好 512 字节
```

### 示例 4：查看列表文件辅助调试

```bash
nasm -f macho64 -l hello.lst hello.asm
cat hello.lst
```

`hello.lst` 中每一行会显示地址、机器码与对应源码，例如：

```text
     1 00000000 B8 04000200            mov     rax, 0x2000004
     2 00000005 BF 01000000            mov     rdi, 1
```

## 五、进阶技巧与配置

- **在 C/C++ 中混合汇编**：nasm 只负责生成目标文件，链接交给 C 编译器。用 `-f macho64 -g` 生成带调试信息的 `.o`，再用 `cc -o app app.c app.o` 一起链接，C 代码里用 `extern` 声明汇编函数即可。
- **使用 `.inc` 头文件复用常量/宏**：把常用结构体偏移量、系统调用号放进 `consts.inc`，用 `%include "consts.inc"` 引入，`-I` 指定搜索目录，避免重复定义。
- **与调试器配合**：编译时加 `-g`，在 gdb/lldb 中可用 `disassemble` 查看反汇编、用 `x/16bx` 查看内存字节，方便核对寄存器与内存布局。
- **注意 PIC 与寻址方式**：macOS 默认要求与位置无关（PIC）代码，访问全局数据务必用 `lea rsi, [rel msg]` 的 RIP 相对寻址，否则链接可能报错。
- **检查指令编码**：遇到问题先用 `-l` 生成列表文件核对机器码，再对照 Intel/AMD 指令集手册（或者 nginx 社区整理的 x86 opcode 参考）确认编码正确。

## 六、注意事项与常见问题

- **平台 syscall 号不同**：macOS 的 write 是 `0x2000004`、exit 是 `0x2000001`，Linux 分别是 `1` 和 `60`。别把两种系统调用号混用，否则会得到错误行为甚至崩溃。
- **不要忘记 `BITS 64` / `BITS 16`**：在 bin 格式下，nasm 默认是 16 位。写 64 位裸代码必须显式声明 `BITS 64`，否则指令会被错误编码成 16 位。
- **程序入口符号要匹配平台**：Linux 用 `_start`，macOS 用 `_main`（带下划线）。入口不对会导致链接或运行时崩溃。
- **`org 0x7c00` 只对 bin 格式有效**：引导程序必须让地址与物理内存对应，`org` 指令在 ELF/Mach-O 中会被忽略，别用它去调试普通程序。
- **栈与退出码**：直接 syscall 退出而不是 `ret` 返回，是因为汇编程序没有调用方提供返回地址；用 `ret` 会跳回未知地址导致段错误。
- **安全建议**：汇编器不做边界检查，数组越界、缓冲区溢出后果不可控；写内核/驱动代码时务必亲自校验长度与对齐。

以上就是 nasm 的常用用法。遇到具体平台差异时，可优先查阅官方文档或 `nasm -h` 的完整帮助信息。