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

> 常用格式名速记：`bin`（裸二进制）、`elf32`/`elf64`（Linux ELF）、`macho32`/`macho64`（macOS）、`win32`/`win64`（Windows COFF）、`obj`（DOS/16 位 obj）、`aout`/`aoutb`（旧式 a.out）、`as86`（BSD）。用 `nasm -hf` 可列出全部支持的格式。

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

### 5.1 在 C/C++ 中混合汇编

nasm 只负责生成目标文件，链接交给 C 编译器。用 `-f macho64 -g` 生成带调试信息的 `.o`，再用 `cc -o app app.c app.o` 一起链接，C 代码里用 `extern` 声明汇编函数即可。

汇编侧注意遵循 System V AMD64 ABI：整数/指针参数依次放进 `rdi, rsi, rdx, rcx, r8, r9`，浮点参数放进 `xmm0..xmm7`，返回值放 `rax`；被调用函数需在返回前恢复 `rbx, rbp, rsp, r12..r15`。下面是一个完整可运行的 C 调用汇编函数的例子：

`math.asm`（计算两数之和，返回 `rax`）：

```bash
cat > math.asm << 'EOF'
BITS 64
global add_ints
section .text
add_ints:
    lea     rax, [rdi + rsi]    ; rdi=a, rsi=b
    ret
EOF
```

`main.c`：

```bash
cat > main.c << 'EOF'
#include <stdio.h>

extern long add_ints(long a, long b);

int main(void) {
    printf("3 + 4 = %ld\n", add_ints(3, 4));
    return 0;
}
EOF
```

macOS 下编译、链接、运行：

```bash
nasm -f macho64 -g math.asm -o math.o
cc -g -o app main.c math.o
./app
```

Linux 下只需把 `-f macho64` 换成 `-f elf64`。注意 macOS 的汇编符号名要加下划线（`_add_ints`），而 Linux 不加。

### 5.2 使用 `.inc` 头文件复用常量/宏

把常用结构体偏移量、系统调用号放进 `consts.inc`，用 `%include "consts.inc"` 引入，`-I` 指定搜索目录，避免重复定义。

`consts.inc`：

```asm
; ---- 系统调用号（Linux x86_64）----
%define SYS_READ   0
%define SYS_WRITE  1
%define SYS_EXIT   60

; ---- 文件描述符 ----
%define STDIN_FILENO  0
%define STDOUT_FILENO 1
%define STDERR_FILENO 2

; ---- 常见结构体偏移量（示意）----
struc   point
    .x:    resq 1
    .y:    resq 1
endstruc
```

使用它的源码：

```asm
%include "consts.inc"

global _start
section .text
_start:
    mov     rax, SYS_WRITE
    mov     rdi, STDOUT_FILENO
    ...
```

用 `-I` 指定搜索目录：

```bash
nasm -I./inc -f elf64 app.asm -o app.o
```

### 5.3 宏系统（`%define` / `%macro` / `%rep`）

nasm 的宏系统远比 `as` 强大。除简单的 `%define` 外，`%macro` 可以定义带参数的指令宏：

```asm
; 定义一个"函数序言"宏
%macro PROLOGUE 0
    push    rbp
    mov     rbp, rsp
    sub     rsp, 16
%endmacro

%macro EPILOGUE 0
    mov     rsp, rbp
    pop     rbp
    ret
%endmacro

my_func:
    PROLOGUE
    ; ... 函数体 ...
    EPILOGUE
```

可变参数宏用 `%0` 表示参数个数，`%1`~`%n` 引用参数。`%rep` 可批量展开重复代码，配合 `%assign` 做循环计数：

```asm
%assign i 0
%rep 8
    mov     rax, i
    inc     rax
    %assign i i+1
%endrep
```

多行宏内用 `%rotate` 可循环左移参数列表，适合写需要反复取参数的宏。条件编译用 `%ifdef` / `%ifndef` / `%else` / `%endif`，配合命令行 `-D` 开关控制不同构建。

### 5.4 与调试器（gdb / lldb）配合

编译时加 `-g`，在 gdb/lldb 中可用 `disassemble` 查看反汇编、用 `x/16bx` 查看内存字节，方便核对寄存器与内存布局。

常用 gdb 命令组合：

```bash
# 启动并进入调试
gdb ./app

# 在汇编函数入口下断点
(gdb) break add_ints
(gdb) run

# 单步执行一条汇编指令
(gdb) stepi

# 查看寄存器
(gdb) info registers rdi rsi rdx

# 查看内存（16 个字节，十六进制）
(gdb) x/16bx $rsi

# 查看反汇编当前函数
(gdb) disassemble add_ints

# 同时显示汇编与源码
(gdb) set disassembly-flavor intel
(gdb) layout asm
```

要点：用 `set disassembly-flavor intel` 让 gdb 用 Intel 语法反汇编，与 nasm 源码风格一致，减少心智负担。用 `stepi`（而非 `step`）逐指令跟踪，结合寄存器变化核对机器码与预期是否一致。

### 5.5 PIC 与寻址方式

macOS 默认要求与位置无关（PIC）代码，访问全局数据务必用 `lea rsi, [rel msg]` 的 RIP 相对寻址，否则链接可能报错。

推荐规则：**凡是在 `.data`/`.bss` 里声明的全局标签，都用 `lea reg, [rel label]` 取地址**；普通临时数据可直接 `mov reg, imm`。Linux 默认 PIE 下也建议如此，便于生成重定位友好的代码。

### 5.6 预处理器与构建配置

用 `-D`、`-U`（取消宏）、`-p`（预包含）、`-d`（依赖文件）控制构建变体：

```bash
# 定义宏 + 预包含头文件
nasm -DDEBUG -p config.inc -f elf64 app.asm -o app.o

# 生成 Makefile 依赖（供 make 跟踪 .inc 变化）
nasm -M -f elf64 app.asm
```

`-w+error` 把警告当错误，可在 CI 中强制代码质量；`-w-number` 可针对性关闭某类警告（如 `-w-number-overflow`）。

### 5.7 常用配置总结（一页速查）

| 需求 | 命令 |
| --- | --- |
| macOS 64 位 + 调试信息 | `nasm -f macho64 -g -l app.lst app.asm -o app.o` |
| Linux 64 位 + 调试信息 | `nasm -f elf64 -g app.asm -o app.o` |
| 裸二进制引导扇区 | `nasm -f bin -l boot.lst boot.asm -o boot.bin` |
| 用 .inc 头文件 | `nasm -I./inc -f elf64 app.asm -o app.o` |
| 只做预处理查看 | `nasm -E -f elf64 app.asm` |
| 警告变错误（CI） | `nasm -w+error -f elf64 app.asm -o app.o` |
| 生成依赖文件 | `nasm -M -f elf64 app.asm` |

## 六、注意事项与常见问题

- **平台 syscall 号不同**：macOS 的 write 是 `0x2000004`、exit 是 `0x2000001`，Linux 分别是 `1` 和 `60`。别把两种系统调用号混用，否则会得到错误行为甚至崩溃。建议把系统调用号集中放进 `.inc` 头文件按平台 `%ifdef` 区分。
- **不要忘记 `BITS 64` / `BITS 16`**：在 bin 格式下，nasm 默认是 16 位。写 64 位裸代码必须显式声明 `BITS 64`，否则指令会被错误编码成 16 位。ELF/Mach-O 格式下 nasm 会按 `-f elf64` 等推断位数，但 `BITS` 声明仍是好习惯。
- **程序入口符号要匹配平台**：Linux 用 `_start`，macOS 用 `_main`（带下划线）。入口不对会导致链接或运行时崩溃。另外 Linux 下若用 C 运行库，入口通常还是 `_start`（由 crt 提供），别自定义成别的。
- **`org 0x7c00` 只对 bin 格式有效**：引导程序必须让地址与物理内存对应，`org` 指令在 ELF/Mach-O 中会被忽略，别用它去调试普通程序。
- **栈与退出码**：直接 syscall 退出而不是 `ret` 返回，是因为汇编程序没有调用方提供返回地址；用 `ret` 会跳回未知地址导致段错误。裸机引导程序中同理，用 `hlt` 停机而非 `ret`。
- **符号下划线规则**：macOS/Windows 的 C 符号带前缀下划线，Linux 不带。C 里声明 `extern long add_ints(...)`，汇编里 macOS 写 `_add_ints`、Linux 写 `add_ints`。写跨平台汇编时用 `%ifdef` 或头文件统一处理。
- **ABI 与寄存器约定**：调用 C 库函数或从 C 调汇编时，必须遵循调用约定（macOS/Linux x64 是 System V）。破坏保留寄存器（`rbx, rbp, rsp, r12..r15`）会导致调用方崩溃。栈必须 16 字节对齐（`call` 前）。
- **缓冲区溢出与越界**：汇编器不做边界检查，数组越界、缓冲区溢出后果不可控。`mov [buf+rax], al` 这类动态寻址必须自行校验 `rax` 范围。
- **`mov` 与 `lea` 别搞混**：`mov rax, [rel msg]` 把 msg 指向的**内存内容**装入 rax；`lea rax, [rel msg]` 把 msg 的**地址**装入 rax。取字符串地址要用 `lea`。
- **常见的 `-w` 警告**：`-w+error` 会把警告变错误；常见警告如 `number-overflow`（立即数溢出）、`label-redef`（标签重复定义）。可用 `-w-number-overflow` 单独关掉某类。
- **性能注意**：`mov rax, 0` 可被 `xor rax, rax` 替代（更短更快）；除法很慢，能用移位/乘法近似就避免；内存寻址尽量用 RIP 相对与简单索引，减少地址计算开销。
- **安全建议**：汇编器不做边界检查，写内核/驱动代码时务必亲自校验长度与对齐；不要盲信外部输入长度直接写入固定缓冲区。

## 七、实战：与其它工具搭配与自动化

### 7.1 与 C/C++ 项目集成（cc / clang / gcc）

把汇编函数编成目标文件后，用 C 编译器统一链接，是嵌入式、驱动、性能热点模块的常见做法：

```bash
nasm -f macho64 -g crc32.asm -o crc32.o
cc -O2 -o demo demo.c crc32.o
```

用 `gcc -S` 反看 C 的汇编输出、再手工优化热点函数，是"先用 C 验证逻辑、再换成手工汇编提速"的标准工作流：

```bash
gcc -O2 -S demo.c            # 生成 demo.s
```

### 7.2 Makefile 自动化

编写 Makefile 管理多源文件与增量构建（`.asm` → `.o`）：

```makefile
# 平台自适应
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
    FMT := elf64
    NASM_FLAGS := -f elf64 -g
else
    FMT := macho64
    NASM_FLAGS := -f macho64 -g
endif

CC      := cc
CFLAGS  := -O2 -Wall
NASM    := nasm
OBJS    := main.o crc32.o math.o

app: $(OBJS)
	$(CC) $(CFLAGS) -o $@ $(OBJS)

%.o: %.asm
	$(NASM) $(NASM_FLAGS) $< -o $@

# 自动追踪 .inc 头文件的依赖
%.d: %.asm
	$(NASM) -M -f $(FMT) $< > $@
-include $(OBJS:.o=.d)

.PHONY: clean
clean:
	rm -f app *.o *.d *.lst
```

用 `make` 一行完成构建，`make clean` 清理产物。

### 7.3 CI 集成（GitHub Actions / GitLab CI）

在 CI 里编译并运行测试，可针对多平台矩阵并行验证。`.github/workflows/nasm.yml` 示例：

```yaml
name: nasm build

on: [push, pull_request]

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - name: Install nasm
        run: |
          if [ "$RUNNER_OS" = "macOS" ]; then brew install nasm; fi
          if [ "$RUNNER_OS" = "Linux" ]; then sudo apt-get update && sudo apt-get install -y nasm; fi
      - name: Build
        run: make
      - name: Run tests
        run: ./app && ./tests/run_tests.sh
```

关键点：CI 中加 `-w+error` 强制无警告；在 Linux 与 macOS 双矩阵上跑，可自动暴露平台 syscall 号、符号下划线等差异。

### 7.4 批量处理与测试脚本

对一组汇编文件批量编译并核对列表文件，适合做回归测试：

```bash
for f in tests/*.asm; do
    base=$(basename "$f" .asm)
    nasm -f elf64 -g -l "build/$base.lst" "$f" -o "build/$base.o" || {
        echo "FAIL: $base"; exit 1
    }
done
echo "All $(ls tests/*.asm | wc -l) files assembled OK"
```

### 7.5 生产级实践清单

- **符号可见性**：`global` 只导出需要被外部使用的符号，内部标签（如 `.loop`）用局部标号 `%%`/`.` 限定作用域，避免链接期符号冲突。
- **代码注释与清单**：提交 `.lst` 列表文件便于 review 核对机器码；在注释里标注对应 C 源码行与 ABI 说明。
- **错误码与退出约定**：程序用 `exit` syscall 返回非零错误码，CI 里据此判断失败。
- **跨平台头文件**：用 `%ifdef __?ELF?__` / `%ifdef __?MACH?__` 等自动检测平台，同一份源码适配多系统。
- **安全硬化**：对来自外部的长度/索引先做范围检查再寻址；敏感代码避免可预测的栈布局，降低被攻击面。

以上就是 nasm 的常用用法与实战要点。遇到具体平台差异时，可优先查阅官方文档或 `nasm -h` 的完整帮助信息，并结合 `nasm -hf` 查看支持的全部输出格式。