import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e as n}from"./app-42caee4a.js";const d={},c=n(`<h1 id="yasm-nasm-的模块化重实现汇编器" tabindex="-1"><a class="header-anchor" href="#yasm-nasm-的模块化重实现汇编器" aria-hidden="true">#</a> yasm（NASM 的模块化重实现汇编器）</h1><blockquote><p>Homebrew 版本 1.3.0 ｜ 主页：见官方文档 ｜ 安装：<code>brew install yasm</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>yasm 是一个从零开始、模块化重写的汇编器，兼容 NASM 语法，但架构设计上比 NASM 更清晰、更易于扩展。它把汇编器的各个阶段（预处理、解析、优化、代码生成、对象格式输出）拆成独立模块，因此能原生支持多种指令集架构（x86、x86-64、AMD64）和多种对象文件格式（ELF、Mach-O、COFF、Win32/Win64 PE），在 macOS/Linux 上表现尤其出色。典型应用场景包括：手写性能关键的内核或加密汇编、编译 FFmpeg/x264/x265 等媒体库时作为其内部汇编器、以及逆向工程与系统级开发。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> yasm

<span class="token comment"># 升级到最新版本</span>
brew upgrade yasm

<span class="token comment"># 卸载</span>
brew uninstall yasm

<span class="token comment"># 查看版本信息</span>
yasm <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，运行 <code>yasm --version</code> 应能看到类似 <code>yasm 1.3.0</code> 的输出。若命令找不到，确认 Homebrew 的 bin 目录（通常是 <code>/opt/homebrew/bin</code> 或 <code>/usr/local/bin</code>）已在 <code>PATH</code> 中。</p><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>yasm -f</code></td><td>指定对象文件格式（macho64/elf64/elf32/bin/win64 等），<strong>必需参数</strong></td><td><code>yasm -f macho64 foo.asm</code></td></tr><tr><td><code>yasm -o</code></td><td>指定输出文件名</td><td><code>yasm -f elf64 -o foo.o foo.asm</code></td></tr><tr><td><code>yasm -g</code></td><td>生成调试信息（dwarf2/stabs 等）</td><td><code>yasm -f elf64 -g dwarf2 foo.asm</code></td></tr><tr><td><code>yasm -l</code></td><td>生成列表文件（.lst），便于查看每行对应的机器码</td><td><code>yasm -f elf64 -l foo.lst foo.asm</code></td></tr><tr><td><code>yasm -E</code></td><td>只做预处理，输出展开后的汇编代码</td><td><code>yasm -E foo.asm &gt; foo.expanded.asm</code></td></tr><tr><td><code>yasm -p</code></td><td>指定预处理器（默认 <code>nasm</code>，也可用 <code>raw</code>）</td><td><code>yasm -p raw foo.asm</code></td></tr><tr><td><code>yasm -D</code></td><td>定义预处理宏，等价于 <code>-D NAME=VALUE</code></td><td><code>yasm -f elf64 -D DEBUG=1 foo.asm</code></td></tr><tr><td><code>yasm --help</code></td><td>查看完整参数列表与说明</td><td><code>yasm --help</code></td></tr><tr><td><code>yasm --license</code></td><td>查看许可证与软件声明</td><td><code>yasm --license</code></td></tr></tbody></table><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-编译一个-x86-64-的-mach-o-程序-macos" tabindex="-1"><a class="header-anchor" href="#示例-1-编译一个-x86-64-的-mach-o-程序-macos" aria-hidden="true">#</a> 示例 1：编译一个 x86-64 的 Mach-O 程序（macOS）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源代码 hello.asm</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> hello.asm <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
section .data
    msg db &#39;Hello, YASM!&#39;, 0xA
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
EOF</span>

<span class="token comment"># 2. 用 yasm 编译为 Mach-O 64 位对象文件（macOS 上的默认格式）</span>
yasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-l</span> hello.lst hello.asm

<span class="token comment"># 3. 链接（macOS 用 clang 自带的链接器）</span>
ld <span class="token parameter variable">-o</span> hello hello.o <span class="token parameter variable">-lSystem</span>

<span class="token comment"># 4. 运行</span>
./hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后终端会打印 <code>Hello, YASM!</code>。生成的 <code>hello.lst</code> 列表文件会显示每条指令对应的机器码字节，方便对照学习。</p><h3 id="示例-2-编译-64-位-elf-并链接运行-linux-风格-语法同样适用于-mac" tabindex="-1"><a class="header-anchor" href="#示例-2-编译-64-位-elf-并链接运行-linux-风格-语法同样适用于-mac" aria-hidden="true">#</a> 示例 2：编译 64 位 ELF 并链接运行（Linux 风格，语法同样适用于 mac）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源代码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> sum.asm <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
section .text
    global _start
_start:
    mov rax, 60      ; Linux 的 exit 系统调用号
    xor rdi, rdi
    syscall
EOF</span>

<span class="token comment"># 2. 用 yasm 编译为 ELF64 对象文件</span>
yasm <span class="token parameter variable">-f</span> elf64 sum.asm <span class="token parameter variable">-o</span> sum.o

<span class="token comment"># 3. 用系统链接器链接</span>
ld <span class="token parameter variable">-o</span> <span class="token function">sum</span> sum.o

<span class="token comment"># 4. 运行（退出码 0 表示成功）</span>
./sum <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;exit ok: <span class="token variable">$?</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>$?</code> 会输出 <code>exit ok: 0</code>。这个示例演示了 yasm 作为编译器的核心用法：<code>-f elf64</code> 生成 ELF64 目标文件，再交由系统链接器处理。</p><h3 id="示例-3-只做预处理展开宏" tabindex="-1"><a class="header-anchor" href="#示例-3-只做预处理展开宏" aria-hidden="true">#</a> 示例 3：只做预处理展开宏</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备带宏的源码</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> macro.asm <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
%define SQUARE(x) ((x)*(x))
section .data
    val dd SQUARE(3)
EOF</span>

<span class="token comment"># 2. 展开宏查看预处理结果</span>
yasm <span class="token parameter variable">-E</span> macro.asm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出会显示 <code>val dd ((3)*(3))</code>，即宏被完全展开后的汇编代码。<code>-E</code> 是排查复杂宏定义错误的好帮手。</p><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><ol><li><p><strong>格式与系统调用号的对应</strong>：yasm 只负责汇编，不处理系统调用。同一段汇编在 macOS 用 <code>0x2000000</code> 开头的系统调用号（如 write=0x2000004、exit=0x2000001），在 Linux 则直接用 <code>0/1/60</code> 等小号。跨平台代码常用 <code>%ifdef</code> 配合 <code>-D</code> 宏条件编译来区分平台。</p></li><li><p><strong>与其它工具链搭配</strong>：日常流程是「yasm 汇编 + 系统链接器链接」。在 macOS 用 <code>ld -lSystem</code> 或直接交给 <code>clang hello.o</code> 自动链接；C/C++ 混编时，先用 <code>yasm -f macho64</code> 产出 <code>.o</code>，再与 <code>gcc</code>/<code>clang</code> 编译的 C 目标文件一起链接。媒体库（FFmpeg、x264 等）的构建脚本通常自动探测并调用 yasm。</p></li><li><p><strong>列表文件与调试信息</strong>：加 <code>-l xxx.lst</code> 生成列表文件，逐行对照「汇编代码 → 机器码 → 地址」；配合 <code>-g dwarf2</code> 生成 DWARF 调试信息，就能在 lldb/gdb 里对汇编源码打断点单步执行，是学习或排查汇编逻辑的利器。</p></li><li><p><strong>RIP 相对寻址</strong>：在 64 位 Mach-O 中访问全局数据必须用 <code>lea rsi, [rel msg]</code> 这样的 RIP 相对寻址，直接写 <code>mov rsi, msg</code> 会链接失败。这是 macOS 汇编新手最常见的坑，建议统一使用 <code>rel</code> 前缀。</p></li></ol><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><p><strong>忘记 <code>-f</code> 参数</strong>：yasm 默认不生成对象文件，必须显式用 <code>-f</code> 指定格式。macOS 用 <code>macho64</code>，Linux 用 <code>elf64</code>/<code>elf32</code>，Windows 用 <code>win64</code>/<code>win32</code>。选错格式会导致链接器无法识别目标文件。</p></li><li><p><strong>Mach-O 与 ELF 的链接差异</strong>：macOS 的入口符号是 <code>_main</code>（带下划线），Linux 是 <code>_start</code>（不带下划线）；macOS 链接需加 <code>-lSystem</code>。把 Linux 教程里的 <code>_start</code> 原样复制到 macOS 编译会链接报错。</p></li><li><p><strong>全局符号在 macOS 必须加下划线</strong>：Mach-O 约定 C 符号都带前导下划线，因此函数名要写成 <code>_main</code> 而不是 <code>main</code>，否则链接时找不到入口。</p></li><li><p><strong>64 位寻址报错</strong>：<code>mov</code> 指令把 64 位地址直接当立即数常触发「invalid combination of opcode and operands」或链接 relocation 错误。改用 <code>lea</code> + <code>[rel symbol]</code> 模式即可。</p></li><li><p><strong>版本较老</strong>：Homebrew 的 yasm 长期停留在 1.3.0（2014 年发布）。它足够稳定成熟，但多年未更新。若需要新指令集扩展支持，可考虑改用 NASM（<code>brew install nasm</code>），两者语法基本兼容。</p></li></ul>`,23),i=[c];function o(l,t){return a(),s("div",null,i)}const v=e(d,[["render",o],["__file","yasm.html.vue"]]);export{v as default};
