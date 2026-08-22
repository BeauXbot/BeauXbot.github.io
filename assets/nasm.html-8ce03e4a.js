import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e}from"./app-4490560f.js";const i={},d=e(`<h1 id="nasm-netwide-assembler-x86-x64-汇编器" tabindex="-1"><a class="header-anchor" href="#nasm-netwide-assembler-x86-x64-汇编器" aria-hidden="true">#</a> nasm（Netwide Assembler，x86/x64 汇编器）</h1><blockquote><p>Homebrew 版本 3.01 ｜ 主页：见官方文档 ｜ 安装：<code>brew install nasm</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>nasm（Netwide Assembler）是一个开源的 x86/x64 汇编器，用于把人类可读的汇编源码翻译成机器可执行的二进制目标文件。它支持多种输出格式（ELF、Mach-O、PE/COFF、bin 等），既能为 Linux/macOS 编译 64 位程序，也能为 Windows 或裸机/引导程序输出原始二进制，是学习底层、编写高性能代码、以及做操作系统/内核开发时的常用工具。</p><p>相比 GNU 汇编器（as）和 Intel 自带汇编器，nasm 采用更接近 Intel 语法的指令书写方式、宏支持更友好，且可移植性极佳——同一份源码稍作配置即可在多个平台交叉编译。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> nasm

<span class="token comment"># 升级到最新版</span>
brew upgrade nasm

<span class="token comment"># 卸载</span>
brew uninstall nasm

<span class="token comment"># 验证安装成功（应显示版本号，如 3.01）</span>
nasm <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nasm <span class="token parameter variable">-v</span>
NASM version <span class="token number">3.01</span> compiled on <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>-f &lt;fmt&gt;</code></td><td>指定输出格式，如 <code>elf64</code>（Linux 64 位）、<code>macho64</code>（macOS 64 位）、<code>bin</code>（裸二进制）</td><td><code>nasm -f macho64 hello.asm -o hello.o</code></td></tr><tr><td><code>-o &lt;file&gt;</code></td><td>指定输出文件名</td><td><code>nasm -f bin boot.asm -o boot.bin</code></td></tr><tr><td><code>-l &lt;file&gt;</code></td><td>生成 .lst 列表文件（含地址与机器码，便于调试）</td><td><code>nasm -f elf64 -l hello.lst hello.asm</code></td></tr><tr><td><code>-g</code></td><td>生成调试信息（配合 gdb 使用）</td><td><code>nasm -g -f macho64 hello.asm -o hello.o</code></td></tr><tr><td><code>-I &lt;dir&gt;</code></td><td>添加头文件（.inc）搜索路径</td><td><code>nasm -I./inc -f elf64 main.asm -o main.o</code></td></tr><tr><td><code>-D &lt;macro&gt;</code></td><td>定义宏，等价于源码里的 <code>%define</code></td><td><code>nasm -DDEBUG -f elf64 app.asm -o app.o</code></td></tr><tr><td><code>-E &lt;file&gt;</code></td><td>只做预处理并把结果输出到文件</td><td><code>nasm -E -f elf64 -o out.i app.asm</code></td></tr><tr><td><code>-p &lt;file&gt;</code></td><td>预包含某个文件（类似 C 的 <code>#include</code>）</td><td><code>nasm -p std.inc -f elf64 app.asm -o app.o</code></td></tr><tr><td><code>-w &lt;warn&gt;</code></td><td>控制警告，如 <code>-w+error</code> 把警告视为错误</td><td><code>nasm -w+error -f elf64 app.asm -o app.o</code></td></tr><tr><td><code>-v</code></td><td>打印版本信息</td><td><code>nasm -v</code></td></tr></tbody></table><blockquote><p>常用格式名速记：<code>bin</code>（裸二进制）、<code>elf32</code>/<code>elf64</code>（Linux ELF）、<code>macho32</code>/<code>macho64</code>（macOS）、<code>win32</code>/<code>win64</code>（Windows COFF）、<code>obj</code>（DOS/16 位 obj）、<code>aout</code>/<code>aoutb</code>（旧式 a.out）、<code>as86</code>（BSD）。用 <code>nasm -hf</code> 可列出全部支持的格式。</p></blockquote><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-macos-mach-o-64-位-下的-hello-world" tabindex="-1"><a class="header-anchor" href="#示例-1-macos-mach-o-64-位-下的-hello-world" aria-hidden="true">#</a> 示例 1：macOS（Mach-O 64 位）下的 &quot;Hello, World&quot;</h3><p>先编写源文件 <code>hello.asm</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> hello.asm <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
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
msg:    db &quot;Hello, World!&quot;, 10
msg_len equ $ - msg
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 nasm 汇编、再用系统链接器（ld）链接并运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nasm <span class="token parameter variable">-f</span> macho64 hello.asm <span class="token parameter variable">-o</span> hello.o
ld <span class="token parameter variable">-macosx_version_min</span> <span class="token number">10.14</span> <span class="token parameter variable">-lSystem</span> <span class="token parameter variable">-e</span> _main hello.o <span class="token parameter variable">-o</span> hello
./hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hello, World!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-2-linux-elf-64-位-下的-hello-world" tabindex="-1"><a class="header-anchor" href="#示例-2-linux-elf-64-位-下的-hello-world" aria-hidden="true">#</a> 示例 2：Linux（ELF 64 位）下的 &quot;Hello, World&quot;</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> hello_linux.asm <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
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
msg:    db &quot;Hello, Linux!&quot;, 10
msg_len equ $ - msg
EOF</span>

nasm <span class="token parameter variable">-f</span> elf64 hello_linux.asm <span class="token parameter variable">-o</span> hello_linux.o
ld hello_linux.o <span class="token parameter variable">-o</span> hello_linux
./hello_linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hello, Linux!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-3-生成裸二进制引导扇区-bin-格式" tabindex="-1"><a class="header-anchor" href="#示例-3-生成裸二进制引导扇区-bin-格式" aria-hidden="true">#</a> 示例 3：生成裸二进制引导扇区（bin 格式）</h3><p>bin 格式直接输出原始机器码，适合写引导扇区（512 字节）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> boot.asm <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
BITS 16
org 0x7c00

start:
    mov     ax, 0x0e
    mov     al, &#39;X&#39;
    int     0x10                ; BIOS 中断：在屏幕打印字符

    cli
    hlt

times 510 - ($ - $$) db 0       ; 填充到 510 字节
dw 0xaa55                       ; 引导扇区签名
EOF</span>

nasm <span class="token parameter variable">-f</span> bin boot.asm <span class="token parameter variable">-o</span> boot.bin
<span class="token function">ls</span> <span class="token parameter variable">-l</span> boot.bin                  <span class="token comment"># 应恰好 512 字节</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-4-查看列表文件辅助调试" tabindex="-1"><a class="header-anchor" href="#示例-4-查看列表文件辅助调试" aria-hidden="true">#</a> 示例 4：查看列表文件辅助调试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-l</span> hello.lst hello.asm
<span class="token function">cat</span> hello.lst
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>hello.lst</code> 中每一行会显示地址、机器码与对应源码，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>     1 00000000 B8 04000200            mov     rax, 0x2000004
     2 00000005 BF 01000000            mov     rdi, 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><h3 id="_5-1-在-c-c-中混合汇编" tabindex="-1"><a class="header-anchor" href="#_5-1-在-c-c-中混合汇编" aria-hidden="true">#</a> 5.1 在 C/C++ 中混合汇编</h3><p>nasm 只负责生成目标文件，链接交给 C 编译器。用 <code>-f macho64 -g</code> 生成带调试信息的 <code>.o</code>，再用 <code>cc -o app app.c app.o</code> 一起链接，C 代码里用 <code>extern</code> 声明汇编函数即可。</p><p>汇编侧注意遵循 System V AMD64 ABI：整数/指针参数依次放进 <code>rdi, rsi, rdx, rcx, r8, r9</code>，浮点参数放进 <code>xmm0..xmm7</code>，返回值放 <code>rax</code>；被调用函数需在返回前恢复 <code>rbx, rbp, rsp, r12..r15</code>。下面是一个完整可运行的 C 调用汇编函数的例子：</p><p><code>math.asm</code>（计算两数之和，返回 <code>rax</code>）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> math.asm <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
BITS 64
global add_ints
section .text
add_ints:
    lea     rax, [rdi + rsi]    ; rdi=a, rsi=b
    ret
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>main.c</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> main.c <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
#include &lt;stdio.h&gt;

extern long add_ints(long a, long b);

int main(void) {
    printf(&quot;3 + 4 = %ld\\n&quot;, add_ints(3, 4));
    return 0;
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>macOS 下编译、链接、运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-g</span> math.asm <span class="token parameter variable">-o</span> math.o
cc <span class="token parameter variable">-g</span> <span class="token parameter variable">-o</span> app main.c math.o
./app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Linux 下只需把 <code>-f macho64</code> 换成 <code>-f elf64</code>。注意 macOS 的汇编符号名要加下划线（<code>_add_ints</code>），而 Linux 不加。</p><h3 id="_5-2-使用-inc-头文件复用常量-宏" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-inc-头文件复用常量-宏" aria-hidden="true">#</a> 5.2 使用 <code>.inc</code> 头文件复用常量/宏</h3><p>把常用结构体偏移量、系统调用号放进 <code>consts.inc</code>，用 <code>%include &quot;consts.inc&quot;</code> 引入，<code>-I</code> 指定搜索目录，避免重复定义。</p><p><code>consts.inc</code>：</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>; ---- 系统调用号（Linux x86_64）----
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用它的源码：</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>%include &quot;consts.inc&quot;

global _start
section .text
_start:
    mov     rax, SYS_WRITE
    mov     rdi, STDOUT_FILENO
    ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 <code>-I</code> 指定搜索目录：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nasm -I./inc <span class="token parameter variable">-f</span> elf64 app.asm <span class="token parameter variable">-o</span> app.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-3-宏系统-define-macro-rep" tabindex="-1"><a class="header-anchor" href="#_5-3-宏系统-define-macro-rep" aria-hidden="true">#</a> 5.3 宏系统（<code>%define</code> / <code>%macro</code> / <code>%rep</code>）</h3><p>nasm 的宏系统远比 <code>as</code> 强大。除简单的 <code>%define</code> 外，<code>%macro</code> 可以定义带参数的指令宏：</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>; 定义一个&quot;函数序言&quot;宏
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可变参数宏用 <code>%0</code> 表示参数个数，<code>%1</code>~<code>%n</code> 引用参数。<code>%rep</code> 可批量展开重复代码，配合 <code>%assign</code> 做循环计数：</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>%assign i 0
%rep 8
    mov     rax, i
    inc     rax
    %assign i i+1
%endrep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多行宏内用 <code>%rotate</code> 可循环左移参数列表，适合写需要反复取参数的宏。条件编译用 <code>%ifdef</code> / <code>%ifndef</code> / <code>%else</code> / <code>%endif</code>，配合命令行 <code>-D</code> 开关控制不同构建。</p><h3 id="_5-4-与调试器-gdb-lldb-配合" tabindex="-1"><a class="header-anchor" href="#_5-4-与调试器-gdb-lldb-配合" aria-hidden="true">#</a> 5.4 与调试器（gdb / lldb）配合</h3><p>编译时加 <code>-g</code>，在 gdb/lldb 中可用 <code>disassemble</code> 查看反汇编、用 <code>x/16bx</code> 查看内存字节，方便核对寄存器与内存布局。</p><p>常用 gdb 命令组合：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动并进入调试</span>
gdb ./app

<span class="token comment"># 在汇编函数入口下断点</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> <span class="token builtin class-name">break</span> add_ints
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> run

<span class="token comment"># 单步执行一条汇编指令</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> stepi

<span class="token comment"># 查看寄存器</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info registers rdi rsi rdx

<span class="token comment"># 查看内存（16 个字节，十六进制）</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> x/16bx <span class="token variable">$rsi</span>

<span class="token comment"># 查看反汇编当前函数</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> disassemble add_ints

<span class="token comment"># 同时显示汇编与源码</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> <span class="token builtin class-name">set</span> disassembly-flavor intel
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> layout asm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要点：用 <code>set disassembly-flavor intel</code> 让 gdb 用 Intel 语法反汇编，与 nasm 源码风格一致，减少心智负担。用 <code>stepi</code>（而非 <code>step</code>）逐指令跟踪，结合寄存器变化核对机器码与预期是否一致。</p><h3 id="_5-5-pic-与寻址方式" tabindex="-1"><a class="header-anchor" href="#_5-5-pic-与寻址方式" aria-hidden="true">#</a> 5.5 PIC 与寻址方式</h3><p>macOS 默认要求与位置无关（PIC）代码，访问全局数据务必用 <code>lea rsi, [rel msg]</code> 的 RIP 相对寻址，否则链接可能报错。</p><p>推荐规则：<strong>凡是在 <code>.data</code>/<code>.bss</code> 里声明的全局标签，都用 <code>lea reg, [rel label]</code> 取地址</strong>；普通临时数据可直接 <code>mov reg, imm</code>。Linux 默认 PIE 下也建议如此，便于生成重定位友好的代码。</p><h3 id="_5-6-预处理器与构建配置" tabindex="-1"><a class="header-anchor" href="#_5-6-预处理器与构建配置" aria-hidden="true">#</a> 5.6 预处理器与构建配置</h3><p>用 <code>-D</code>、<code>-U</code>（取消宏）、<code>-p</code>（预包含）、<code>-d</code>（依赖文件）控制构建变体：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 定义宏 + 预包含头文件</span>
nasm <span class="token parameter variable">-DDEBUG</span> <span class="token parameter variable">-p</span> config.inc <span class="token parameter variable">-f</span> elf64 app.asm <span class="token parameter variable">-o</span> app.o

<span class="token comment"># 生成 Makefile 依赖（供 make 跟踪 .inc 变化）</span>
nasm <span class="token parameter variable">-M</span> <span class="token parameter variable">-f</span> elf64 app.asm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-w+error</code> 把警告当错误，可在 CI 中强制代码质量；<code>-w-number</code> 可针对性关闭某类警告（如 <code>-w-number-overflow</code>）。</p><h3 id="_5-7-常用配置总结-一页速查" tabindex="-1"><a class="header-anchor" href="#_5-7-常用配置总结-一页速查" aria-hidden="true">#</a> 5.7 常用配置总结（一页速查）</h3><table><thead><tr><th>需求</th><th>命令</th></tr></thead><tbody><tr><td>macOS 64 位 + 调试信息</td><td><code>nasm -f macho64 -g -l app.lst app.asm -o app.o</code></td></tr><tr><td>Linux 64 位 + 调试信息</td><td><code>nasm -f elf64 -g app.asm -o app.o</code></td></tr><tr><td>裸二进制引导扇区</td><td><code>nasm -f bin -l boot.lst boot.asm -o boot.bin</code></td></tr><tr><td>用 .inc 头文件</td><td><code>nasm -I./inc -f elf64 app.asm -o app.o</code></td></tr><tr><td>只做预处理查看</td><td><code>nasm -E -f elf64 app.asm</code></td></tr><tr><td>警告变错误（CI）</td><td><code>nasm -w+error -f elf64 app.asm -o app.o</code></td></tr><tr><td>生成依赖文件</td><td><code>nasm -M -f elf64 app.asm</code></td></tr></tbody></table><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><strong>平台 syscall 号不同</strong>：macOS 的 write 是 <code>0x2000004</code>、exit 是 <code>0x2000001</code>，Linux 分别是 <code>1</code> 和 <code>60</code>。别把两种系统调用号混用，否则会得到错误行为甚至崩溃。建议把系统调用号集中放进 <code>.inc</code> 头文件按平台 <code>%ifdef</code> 区分。</li><li><strong>不要忘记 <code>BITS 64</code> / <code>BITS 16</code></strong>：在 bin 格式下，nasm 默认是 16 位。写 64 位裸代码必须显式声明 <code>BITS 64</code>，否则指令会被错误编码成 16 位。ELF/Mach-O 格式下 nasm 会按 <code>-f elf64</code> 等推断位数，但 <code>BITS</code> 声明仍是好习惯。</li><li><strong>程序入口符号要匹配平台</strong>：Linux 用 <code>_start</code>，macOS 用 <code>_main</code>（带下划线）。入口不对会导致链接或运行时崩溃。另外 Linux 下若用 C 运行库，入口通常还是 <code>_start</code>（由 crt 提供），别自定义成别的。</li><li><strong><code>org 0x7c00</code> 只对 bin 格式有效</strong>：引导程序必须让地址与物理内存对应，<code>org</code> 指令在 ELF/Mach-O 中会被忽略，别用它去调试普通程序。</li><li><strong>栈与退出码</strong>：直接 syscall 退出而不是 <code>ret</code> 返回，是因为汇编程序没有调用方提供返回地址；用 <code>ret</code> 会跳回未知地址导致段错误。裸机引导程序中同理，用 <code>hlt</code> 停机而非 <code>ret</code>。</li><li><strong>符号下划线规则</strong>：macOS/Windows 的 C 符号带前缀下划线，Linux 不带。C 里声明 <code>extern long add_ints(...)</code>，汇编里 macOS 写 <code>_add_ints</code>、Linux 写 <code>add_ints</code>。写跨平台汇编时用 <code>%ifdef</code> 或头文件统一处理。</li><li><strong>ABI 与寄存器约定</strong>：调用 C 库函数或从 C 调汇编时，必须遵循调用约定（macOS/Linux x64 是 System V）。破坏保留寄存器（<code>rbx, rbp, rsp, r12..r15</code>）会导致调用方崩溃。栈必须 16 字节对齐（<code>call</code> 前）。</li><li><strong>缓冲区溢出与越界</strong>：汇编器不做边界检查，数组越界、缓冲区溢出后果不可控。<code>mov [buf+rax], al</code> 这类动态寻址必须自行校验 <code>rax</code> 范围。</li><li><strong><code>mov</code> 与 <code>lea</code> 别搞混</strong>：<code>mov rax, [rel msg]</code> 把 msg 指向的<strong>内存内容</strong>装入 rax；<code>lea rax, [rel msg]</code> 把 msg 的<strong>地址</strong>装入 rax。取字符串地址要用 <code>lea</code>。</li><li><strong>常见的 <code>-w</code> 警告</strong>：<code>-w+error</code> 会把警告变错误；常见警告如 <code>number-overflow</code>（立即数溢出）、<code>label-redef</code>（标签重复定义）。可用 <code>-w-number-overflow</code> 单独关掉某类。</li><li><strong>性能注意</strong>：<code>mov rax, 0</code> 可被 <code>xor rax, rax</code> 替代（更短更快）；除法很慢，能用移位/乘法近似就避免；内存寻址尽量用 RIP 相对与简单索引，减少地址计算开销。</li><li><strong>安全建议</strong>：汇编器不做边界检查，写内核/驱动代码时务必亲自校验长度与对齐；不要盲信外部输入长度直接写入固定缓冲区。</li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_7-1-与-c-c-项目集成-cc-clang-gcc" tabindex="-1"><a class="header-anchor" href="#_7-1-与-c-c-项目集成-cc-clang-gcc" aria-hidden="true">#</a> 7.1 与 C/C++ 项目集成（cc / clang / gcc）</h3><p>把汇编函数编成目标文件后，用 C 编译器统一链接，是嵌入式、驱动、性能热点模块的常见做法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-g</span> crc32.asm <span class="token parameter variable">-o</span> crc32.o
cc <span class="token parameter variable">-O2</span> <span class="token parameter variable">-o</span> demo demo.c crc32.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>用 <code>gcc -S</code> 反看 C 的汇编输出、再手工优化热点函数，是&quot;先用 C 验证逻辑、再换成手工汇编提速&quot;的标准工作流：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-O2</span> <span class="token parameter variable">-S</span> demo.c            <span class="token comment"># 生成 demo.s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-2-makefile-自动化" tabindex="-1"><a class="header-anchor" href="#_7-2-makefile-自动化" aria-hidden="true">#</a> 7.2 Makefile 自动化</h3><p>编写 Makefile 管理多源文件与增量构建（<code>.asm</code> → <code>.o</code>）：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment"># 平台自适应</span>
UNAME_S <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> uname -s<span class="token punctuation">)</span>
<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span>UNAME_S<span class="token punctuation">)</span>,Linux<span class="token punctuation">)</span>
    FMT <span class="token operator">:=</span> elf64
    NASM_FLAGS <span class="token operator">:=</span> -f elf64 -g
<span class="token keyword">else</span>
    FMT <span class="token operator">:=</span> macho64
    NASM_FLAGS <span class="token operator">:=</span> -f macho64 -g
<span class="token keyword">endif</span>

CC      <span class="token operator">:=</span> cc
CFLAGS  <span class="token operator">:=</span> -O2 -Wall
NASM    <span class="token operator">:=</span> nasm
OBJS    <span class="token operator">:=</span> main.o crc32.o math.o

<span class="token target symbol">app</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJS<span class="token punctuation">)</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> -o <span class="token variable">$@</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJS<span class="token punctuation">)</span>

<span class="token target symbol">%.o</span><span class="token punctuation">:</span> %.asm
	<span class="token variable">$</span><span class="token punctuation">(</span>NASM<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>NASM_FLAGS<span class="token punctuation">)</span> <span class="token variable">$&lt;</span> -o <span class="token variable">$@</span>

<span class="token comment"># 自动追踪 .inc 头文件的依赖</span>
<span class="token target symbol">%.d</span><span class="token punctuation">:</span> %.asm
	<span class="token variable">$</span><span class="token punctuation">(</span>NASM<span class="token punctuation">)</span> -M -f <span class="token variable">$</span><span class="token punctuation">(</span>FMT<span class="token punctuation">)</span> <span class="token variable">$&lt;</span> &gt; <span class="token variable">$@</span>
<span class="token target symbol">-include <span class="token variable">$</span>(OBJS</span><span class="token punctuation">:</span>.o<span class="token operator">=</span>.d<span class="token punctuation">)</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> clean
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f app *.o *.d *.lst
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 <code>make</code> 一行完成构建，<code>make clean</code> 清理产物。</p><h3 id="_7-3-ci-集成-github-actions-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#_7-3-ci-集成-github-actions-gitlab-ci" aria-hidden="true">#</a> 7.3 CI 集成（GitHub Actions / GitLab CI）</h3><p>在 CI 里编译并运行测试，可针对多平台矩阵并行验证。<code>.github/workflows/nasm.yml</code> 示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> nasm build

<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">,</span> pull_request<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">os</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>ubuntu<span class="token punctuation">-</span>latest<span class="token punctuation">,</span> macos<span class="token punctuation">-</span>latest<span class="token punctuation">]</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.os <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install nasm
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          if [ &quot;$RUNNER_OS&quot; = &quot;macOS&quot; ]; then brew install nasm; fi
          if [ &quot;$RUNNER_OS&quot; = &quot;Linux&quot; ]; then sudo apt-get update &amp;&amp; sudo apt-get install -y nasm; fi</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> make
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests
        <span class="token key atrule">run</span><span class="token punctuation">:</span> ./app <span class="token important">&amp;&amp;</span> ./tests/run_tests.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键点：CI 中加 <code>-w+error</code> 强制无警告；在 Linux 与 macOS 双矩阵上跑，可自动暴露平台 syscall 号、符号下划线等差异。</p><h3 id="_7-4-批量处理与测试脚本" tabindex="-1"><a class="header-anchor" href="#_7-4-批量处理与测试脚本" aria-hidden="true">#</a> 7.4 批量处理与测试脚本</h3><p>对一组汇编文件批量编译并核对列表文件，适合做回归测试：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> tests/*.asm<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token assign-left variable">base</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> .asm<span class="token variable">)</span></span>
    nasm <span class="token parameter variable">-f</span> elf64 <span class="token parameter variable">-g</span> <span class="token parameter variable">-l</span> <span class="token string">&quot;build/<span class="token variable">$base</span>.lst&quot;</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token parameter variable">-o</span> <span class="token string">&quot;build/<span class="token variable">$base</span>.o&quot;</span> <span class="token operator">||</span> <span class="token punctuation">{</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;FAIL: <span class="token variable">$base</span>&quot;</span><span class="token punctuation">;</span> <span class="token builtin class-name">exit</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;All <span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> tests/*.asm <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> files assembled OK&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-5-生产级实践清单" tabindex="-1"><a class="header-anchor" href="#_7-5-生产级实践清单" aria-hidden="true">#</a> 7.5 生产级实践清单</h3><ul><li><strong>符号可见性</strong>：<code>global</code> 只导出需要被外部使用的符号，内部标签（如 <code>.loop</code>）用局部标号 <code>%%</code>/<code>.</code> 限定作用域，避免链接期符号冲突。</li><li><strong>代码注释与清单</strong>：提交 <code>.lst</code> 列表文件便于 review 核对机器码；在注释里标注对应 C 源码行与 ABI 说明。</li><li><strong>错误码与退出约定</strong>：程序用 <code>exit</code> syscall 返回非零错误码，CI 里据此判断失败。</li><li><strong>跨平台头文件</strong>：用 <code>%ifdef __?ELF?__</code> / <code>%ifdef __?MACH?__</code> 等自动检测平台，同一份源码适配多系统。</li><li><strong>安全硬化</strong>：对来自外部的长度/索引先做范围检查再寻址；敏感代码避免可预测的栈布局，降低被攻击面。</li></ul><p>以上就是 nasm 的常用用法与实战要点。遇到具体平台差异时，可优先查阅官方文档或 <code>nasm -h</code> 的完整帮助信息，并结合 <code>nasm -hf</code> 查看支持的全部输出格式。</p>`,92),l=[d];function c(o,t){return a(),s("div",null,l)}const u=n(i,[["render",c],["__file","nasm.html.vue"]]);export{u as default};
