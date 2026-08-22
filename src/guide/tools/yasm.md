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

> **补充：从源码编译安装**（当需要非 Homebrew 的更新版或自定义特性时）
> ```bash
> git clone https://github.com/yasm/yasm.git
> cd yasm
> ./autogen.sh
> ./configure --prefix="$HOME/.local/yasm"   # 指定安装前缀
> make -j$(sysctl -n hw.ncpu)                 # macOS 上并行编译
> make install
> # 让当前 shell 直接使用该版本（无需写入 PATH）
> alias yasm="$HOME/.local/yasm/bin/yasm"
> ```

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
| `yasm -a x86` | 强制指定指令集架构（x86/x86-64/amd64） | `yasm -a x86 -f elf32 foo.asm` |
| `yasm -m x86` | 强制指定机器/位宽模式（32 位/64 位） | `yasm -m x86 -f win32 foo.asm` |
| `yasm -O0` | 设置优化级别（`-O0`~`-O2`，默认 `-O2`） | `yasm -O0 -f elf64 foo.asm` |

> **提示**：`-a`（architecture）与 `-m`（machine）可单独覆盖默认的架构/位宽推断。多数场景下 yasm 会依据 `-f` 自动推断，无需手动指定；仅在交叉编译或格式推断异常时才有必要显式给出。

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

5. **优化级别 `-O0`~`-O2`**：yasm 内置多种优化开关，默认 `-O2` 会做「短跳转/短分支」收缩与最小化指令编码。若为排错或想精确控制每条指令的字节布局（例如对齐固定的 `nop` 序列用于热补丁），可用 `-O0` 关闭优化。反汇编对比 `.lst` 即可直观看到优化前后的编码差异。

6. **用 `%ifdef` / `%if` 做配置化源码**：这是 yasm 最重要的配置手段，比在外部拼多个 `.asm` 文件更优雅：
   ```nasm
   %ifdef DEBUG
       %define TRACE(x)  mov rdi, x
   %else
       %define TRACE(x)
   %endif

   section .data
   %ifndef MAXBUF
       %define MAXBUF 4096
   %endif
       buf resb MAXBUF
   ```
   编译时用 `yasm -DDEBUG -DMAXBUF=8192 -f elf64 foo.asm` 即可注入配置，不改源码。

7. **宏单行定义 vs 多行宏**：`%define` 是单行文本替换（适合常量/简单表达式），`%macro ... %endmacro` 是多行宏（适合带 `%1`/`%2` 参数的指令序列）。多行宏常配合 `%assign`（可重赋值计数器）实现循环展开：
   ```nasm
   %macro ZERO_REGS 0
       %assign i 0
       %rep 4
           mov qword [rax + i*8], 0
           %assign i i+1
       %endrep
   %endmacro
   ```

8. **结构化 `%if` / `%else` / `%elif`**：yasm 的条件汇编与 C 预处理高度相似，适合做「同一份汇编适配多种调用约定 / 平台」。配合 `-p nasm` 预处理器，几乎所有 NASM 指令（`%include`、`%error`、`%warning` 等）都可用。`%include "common.inc"` 可把共享的头文件/宏库抽出来复用。

9. **ELF 下的重定位与 PIC**：Linux 生成动态库或 PIE 可执行文件时，需用 `default rel` 让相对寻址默认启用，避免链接时报 R_X86_64_32S 之类错误：
   ```nasm
   default rel
   section .text
       global func
   func:
       lea rdi, [msg]   ; 现在自动生成 RIP 相对引用
       ret
   ```

10. **与 NASM 的直接兼容策略**：yasm 与 NASM 语法几乎 1:1 兼容，多数 `.asm` 源码可直接在两者间切换。差别集中在命令行参数（如 yasm 用 `-f macho64`，NASM 用 `-f macho64`，基本一致）和少量指令集支持上。**建议**：将关键的 `.asm` 文件同时用 `yasm --version` 与 `nasm -v` 编译一次做双保险，确保构建脚本在两种汇编器下都能跑。

## 六、注意事项与常见问题

- **忘记 `-f` 参数**：yasm 默认不生成对象文件，必须显式用 `-f` 指定格式。macOS 用 `macho64`，Linux 用 `elf64`/`elf32`，Windows 用 `win64`/`win32`。选错格式会导致链接器无法识别目标文件。

- **Mach-O 与 ELF 的链接差异**：macOS 的入口符号是 `_main`（带下划线），Linux 是 `_start`（不带下划线）；macOS 链接需加 `-lSystem`。把 Linux 教程里的 `_start` 原样复制到 macOS 编译会链接报错。

- **全局符号在 macOS 必须加下划线**：Mach-O 约定 C 符号都带前导下划线，因此函数名要写成 `_main` 而不是 `main`，否则链接时找不到入口。

- **64 位寻址报错**：`mov` 指令把 64 位地址直接当立即数常触发「invalid combination of opcode and operands」或链接 relocation 错误。改用 `lea` + `[rel symbol]` 模式即可。

- **版本较老**：Homebrew 的 yasm 长期停留在 1.3.0（2014 年发布）。它足够稳定成熟，但多年未更新。若需要新指令集扩展支持，可考虑改用 NASM（`brew install nasm`），两者语法基本兼容。

- **`-E` 误以为在编译**：`yasm -E foo.asm` 只做预处理、不会生成对象文件。若直接 `./foo` 会提示不存在该可执行文件。要「预处理 + 编译」得分开两步：先 `-E` 导出，再用 `-f` 编译导出结果。

- **`resb`/`resq` 与 `dd`/`dq` 混淆**：`dd`/`dq` 是「初始化数据」，会在目标文件中占用并写入字节；`resb`/`resq` 是「预留空间」（BSS），不占文件字节。把缓冲区错写成 `dd` 会导致可执行文件异常膨胀或数据区错位。

- **`.lst` 中文/编码问题**：源码含 UTF-8 中文注释时，`-l` 生成的列表文件默认按 ASCII 处理，`objdump`/文本编辑器可能显示乱码。建议源码注释统一用英文，或生成列表时用 `yasm -l` 后以 UTF-8 重新编码查看。

- **性能注意**：`-O2`（默认）会改变编码长度，导致 `objdump -d` 看到的地址/字节与手写假设不符。追求可预测的机器码（如引导扇区、精确指令计数）务必显式 `-O0`。

- **安全注意**：直接 `yasm -f bin` 产出裸二进制（无段、无重定位），一旦 `org` 基址写错，跳转全部失效且难以定位。引导扇区/裸 bin 场景务必先核对 `-l` 列表文件中的绝对地址。

- **常见报错：`error: directive must appear in a section`**：`%define`/`%macro` 等预处理指令可放文件顶部，但真正的指令与 `section` 定义有顺序要求。把 `section .data` 放在所有数据定义之前即可解决。

- **常见报错：`error: symbol 'msg' not defined`**：通常是访问了未声明或大小写不匹配的符号。yasm 符号区分大小写，`msg` 与 `Msg` 是不同符号；跨段引用请确认已用 `global`/`extern` 声明。

- **常见报错：`ld: warning: -pie being ignored`**：在 macOS 上 `ld` 直链 `_main` 入口的裸汇编时常见，属于正常提示，可忽略；或用 `clang` 包装链接器自动处理。

## 七、实战：与其它工具搭配与自动化

### 1. C/C++ 混编：把汇编函数暴露给 C
把性能敏感函数（SIMD、加密、媒体处理）写成汇编，再由 C 调用，是 yasm 最高频的生产场景。
```asm
; math.asm —— 导出供 C 调用的函数（注意 macOS 下符号带下划线）
section .text
    global _add3
_add3:                 ; int add3(int a, int b, int c) 按 SysV ABI 传参
    lea eax, [rdi + rsi]
    add eax, edx
    ret
```
```c
// main.c
#include <stdio.h>
extern int add3(int, int, int);
int main(void) {
    printf("%d\n", add3(10, 20, 30));   // 60
    return 0;
}
```
```bash
# 一步到位：yasm 汇编 + clang 编译 + 链接
yasm -f macho64 -g dwarf2 math.asm -o math.o
clang -O2 -g main.c math.o -o app
./app
```

### 2. 用 Makefile 自动化多目标构建
把「汇编 → 链接 → 测试」固化成可复现的流程，并支持不同格式/优化级别：
```make
# Makefile
AS      := yasm
FORMAT  ?= macho64    # Linux 用 make FORMAT=elf64 覆盖
ASFLAGS := -f $(FORMAT) -g dwarf2 -l
CC      := clang
TARGET  := app
OBJS    := math.o main.o

all: $(TARGET)

%.o: %.asm
	$(AS) $(ASFLAGS) $< -o $@

%.o: %.c
	$(CC) -O2 -c $< -o $@

$(TARGET): $(OBJS)
	$(CC) -o $@ $(OBJS)

.PHONY: clean
clean:
	rm -f *.o *.lst $(TARGET)
```
```bash
make                 # 默认 macho64
make FORMAT=elf64    # 跨平台覆盖格式
make -j4             # 并行构建
```

### 3. 批量处理：脚本循环编译与对照反汇编
```bash
# 批量编译目录下所有 .asm，并逐一生成列表与反汇编供核对
for f in *.asm; do
    yasm -f macho64 -g dwarf2 -l "${f%.asm}.lst" "$f" -o "${f%.asm}.o" || echo "FAIL: $f"
done

# 核对目标文件里的机器码（macOS 下反汇编调用的是系统 otool/llvm-objdump）
objdump -d math.o            # Linux 用 objdump
otool -tv math.o             # macOS 用 otool
```

### 4. CI 集成：GitHub Actions 跨平台矩阵测试
确保同源码在 macOS 与 Linux 都能用 yasm 编译通过：
```yaml
# .github/workflows/asm.yml
name: asm-build
on: [push, pull_request]
jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - name: Install yasm
        run: |
          if [ "${{ runner.os }}" = "macOS" ]; then brew install yasm; fi
          if [ "${{ runner.os }}" = "Linux" ];  then sudo apt-get install -y yasm; fi
      - name: Build
        run: |
          make clean
          make FORMAT=${{ runner.os == 'macOS' && 'macho64' || 'elf64' }}
      - name: Run
        run: ./app
```
> yasm 在主流发行版与 Homebrew 中均有预编译包，CI 无需从源码编译，装上即用。

### 5. 与调试器配合的完整链路
```bash
# 带符号编译 → lldb 单步
yasm -f macho64 -g dwarf2 -l math.lst math.asm -o math.o
clang -O0 -g main.c math.o -o app

lldb ./app
(lldb) b _add3
(lldb) run
(lldb) register read rdi rsi rdx     # 查看入参
(lldb) stepi                         # 单步指令
(lldb) x/4bx $rsp                    # 查看栈上字节
```
列表文件 `math.lst` 里的地址与 lldb 的 `disassemble` 输出对照，可精确定位每条指令在内存中的位置。

### 6. 生产级实践清单
- **默认开 `-g dwarf2` + `-l`**：永远留下可调试、可对照的产物，不要省这两行参数。
- **统一符号命名约定**：导出符号集中写在文件头部注释，macOS 加下划线、Linux 不加，用 `%ifdef` 区分平台生成。
- **为关键模块加 `-O0`**：安全/引导类代码禁止优化，性能敏感路径才开 `-O2`，并在 `.lst` 中人工复核。
- **版本锁定**：在 `requirements`/`.tool-versions`/CI 中锁定 yasm 版本（如 `1.3.0`），避免不同机器优化差异引发回归。
- **单测验证 ABI**：对每个导出函数写一个 C 调用单测，校验返回值与系统调用号，防止寄存器使用违规。