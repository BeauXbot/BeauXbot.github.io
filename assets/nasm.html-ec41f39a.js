import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e as s}from"./app-f7ddf95e.js";const d={},l=s(`<h1 id="nasm-netwide-assembler-x86-x64-汇编器" tabindex="-1"><a class="header-anchor" href="#nasm-netwide-assembler-x86-x64-汇编器" aria-hidden="true">#</a> nasm（Netwide Assembler，x86/x64 汇编器）</h1><blockquote><p>Homebrew 版本 3.01 ｜ 主页：见官方文档 ｜ 安装：<code>brew install nasm</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>nasm（Netwide Assembler）是一个开源的 x86/x64 汇编器，用于把人类可读的汇编源码翻译成机器可执行的二进制目标文件。它支持多种输出格式（ELF、Mach-O、PE/COFF、bin 等），既能为 Linux/macOS 编译 64 位程序，也能为 Windows 或裸机/引导程序输出原始二进制，是学习底层、编写高性能代码、以及做操作系统/内核开发时的常用工具。</p><p>相比 GNU 汇编器（as）和 Intel 自带汇编器，nasm 采用更接近 Intel 语法的指令书写方式、宏支持更友好，且可移植性极佳——同一份源码稍作配置即可在多个平台交叉编译。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> nasm

<span class="token comment"># 升级到最新版</span>
brew upgrade nasm

<span class="token comment"># 卸载</span>
brew uninstall nasm

<span class="token comment"># 验证安装成功（应显示版本号，如 3.01）</span>
nasm <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nasm <span class="token parameter variable">-v</span>
NASM version <span class="token number">3.01</span> compiled on <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>-f &lt;fmt&gt;</code></td><td>指定输出格式，如 <code>elf64</code>（Linux 64 位）、<code>macho64</code>（macOS 64 位）、<code>bin</code>（裸二进制）</td><td><code>nasm -f macho64 hello.asm -o hello.o</code></td></tr><tr><td><code>-o &lt;file&gt;</code></td><td>指定输出文件名</td><td><code>nasm -f bin boot.asm -o boot.bin</code></td></tr><tr><td><code>-l &lt;file&gt;</code></td><td>生成 .lst 列表文件（含地址与机器码，便于调试）</td><td><code>nasm -f elf64 -l hello.lst hello.asm</code></td></tr><tr><td><code>-g</code></td><td>生成调试信息（配合 gdb 使用）</td><td><code>nasm -g -f macho64 hello.asm -o hello.o</code></td></tr><tr><td><code>-I &lt;dir&gt;</code></td><td>添加头文件（.inc）搜索路径</td><td><code>nasm -I./inc -f elf64 main.asm -o main.o</code></td></tr><tr><td><code>-D &lt;macro&gt;</code></td><td>定义宏，等价于源码里的 <code>%define</code></td><td><code>nasm -DDEBUG -f elf64 app.asm -o app.o</code></td></tr><tr><td><code>-E &lt;file&gt;</code></td><td>只做预处理并把结果输出到文件</td><td><code>nasm -E -f elf64 -o out.i app.asm</code></td></tr><tr><td><code>-p &lt;file&gt;</code></td><td>预包含某个文件（类似 C 的 <code>#include</code>）</td><td><code>nasm -p std.inc -f elf64 app.asm -o app.o</code></td></tr><tr><td><code>-w &lt;warn&gt;</code></td><td>控制警告，如 <code>-w+error</code> 把警告视为错误</td><td><code>nasm -w+error -f elf64 app.asm -o app.o</code></td></tr><tr><td><code>-v</code></td><td>打印版本信息</td><td><code>nasm -v</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-macos-mach-o-64-位-下的-hello-world" tabindex="-1"><a class="header-anchor" href="#示例-1-macos-mach-o-64-位-下的-hello-world" aria-hidden="true">#</a> 示例 1：macOS（Mach-O 64 位）下的 &quot;Hello, World&quot;</h3><p>先编写源文件 <code>hello.asm</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> hello.asm <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><ul><li><strong>在 C/C++ 中混合汇编</strong>：nasm 只负责生成目标文件，链接交给 C 编译器。用 <code>-f macho64 -g</code> 生成带调试信息的 <code>.o</code>，再用 <code>cc -o app app.c app.o</code> 一起链接，C 代码里用 <code>extern</code> 声明汇编函数即可。</li><li><strong>使用 <code>.inc</code> 头文件复用常量/宏</strong>：把常用结构体偏移量、系统调用号放进 <code>consts.inc</code>，用 <code>%include &quot;consts.inc&quot;</code> 引入，<code>-I</code> 指定搜索目录，避免重复定义。</li><li><strong>与调试器配合</strong>：编译时加 <code>-g</code>，在 gdb/lldb 中可用 <code>disassemble</code> 查看反汇编、用 <code>x/16bx</code> 查看内存字节，方便核对寄存器与内存布局。</li><li><strong>注意 PIC 与寻址方式</strong>：macOS 默认要求与位置无关（PIC）代码，访问全局数据务必用 <code>lea rsi, [rel msg]</code> 的 RIP 相对寻址，否则链接可能报错。</li><li><strong>检查指令编码</strong>：遇到问题先用 <code>-l</code> 生成列表文件核对机器码，再对照 Intel/AMD 指令集手册（或者 nginx 社区整理的 x86 opcode 参考）确认编码正确。</li></ul><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><strong>平台 syscall 号不同</strong>：macOS 的 write 是 <code>0x2000004</code>、exit 是 <code>0x2000001</code>，Linux 分别是 <code>1</code> 和 <code>60</code>。别把两种系统调用号混用，否则会得到错误行为甚至崩溃。</li><li><strong>不要忘记 <code>BITS 64</code> / <code>BITS 16</code></strong>：在 bin 格式下，nasm 默认是 16 位。写 64 位裸代码必须显式声明 <code>BITS 64</code>，否则指令会被错误编码成 16 位。</li><li><strong>程序入口符号要匹配平台</strong>：Linux 用 <code>_start</code>，macOS 用 <code>_main</code>（带下划线）。入口不对会导致链接或运行时崩溃。</li><li><strong><code>org 0x7c00</code> 只对 bin 格式有效</strong>：引导程序必须让地址与物理内存对应，<code>org</code> 指令在 ELF/Mach-O 中会被忽略，别用它去调试普通程序。</li><li><strong>栈与退出码</strong>：直接 syscall 退出而不是 <code>ret</code> 返回，是因为汇编程序没有调用方提供返回地址；用 <code>ret</code> 会跳回未知地址导致段错误。</li><li><strong>安全建议</strong>：汇编器不做边界检查，数组越界、缓冲区溢出后果不可控；写内核/驱动代码时务必亲自校验长度与对齐。</li></ul><p>以上就是 nasm 的常用用法。遇到具体平台差异时，可优先查阅官方文档或 <code>nasm -h</code> 的完整帮助信息。</p>`,35),i=[l];function o(c,r){return n(),a("div",null,i)}const v=e(d,[["render",o],["__file","nasm.html.vue"]]);export{v as default};
