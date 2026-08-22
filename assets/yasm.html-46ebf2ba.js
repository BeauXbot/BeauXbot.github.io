import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-4490560f.js";const o={},c=e(`<h1 id="yasm-nasm-的模块化重实现汇编器" tabindex="-1"><a class="header-anchor" href="#yasm-nasm-的模块化重实现汇编器" aria-hidden="true">#</a> yasm（NASM 的模块化重实现汇编器）</h1><blockquote><p>Homebrew 版本 1.3.0 ｜ 主页：见官方文档 ｜ 安装：<code>brew install yasm</code></p></blockquote><h2 id="一、它是什么" tabindex="-1"><a class="header-anchor" href="#一、它是什么" aria-hidden="true">#</a> 一、它是什么</h2><p>yasm 是一个从零开始、模块化重写的汇编器，兼容 NASM 语法，但架构设计上比 NASM 更清晰、更易于扩展。它把汇编器的各个阶段（预处理、解析、优化、代码生成、对象格式输出）拆成独立模块，因此能原生支持多种指令集架构（x86、x86-64、AMD64）和多种对象文件格式（ELF、Mach-O、COFF、Win32/Win64 PE），在 macOS/Linux 上表现尤其出色。典型应用场景包括：手写性能关键的内核或加密汇编、编译 FFmpeg/x264/x265 等媒体库时作为其内部汇编器、以及逆向工程与系统级开发。</p><h2 id="二、安装与升级" tabindex="-1"><a class="header-anchor" href="#二、安装与升级" aria-hidden="true">#</a> 二、安装与升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
brew <span class="token function">install</span> yasm

<span class="token comment"># 升级到最新版本</span>
brew upgrade yasm

<span class="token comment"># 卸载</span>
brew uninstall yasm

<span class="token comment"># 查看版本信息</span>
yasm <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，运行 <code>yasm --version</code> 应能看到类似 <code>yasm 1.3.0</code> 的输出。若命令找不到，确认 Homebrew 的 bin 目录（通常是 <code>/opt/homebrew/bin</code> 或 <code>/usr/local/bin</code>）已在 <code>PATH</code> 中。</p><blockquote><p><strong>补充：从源码编译安装</strong>（当需要非 Homebrew 的更新版或自定义特性时）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/yasm/yasm.git
<span class="token builtin class-name">cd</span> yasm
./autogen.sh
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/.local/yasm&quot;</span>   <span class="token comment"># 指定安装前缀</span>
<span class="token function">make</span> -j<span class="token variable"><span class="token variable">$(</span><span class="token function">sysctl</span> <span class="token parameter variable">-n</span> hw.ncpu<span class="token variable">)</span></span>                 <span class="token comment"># macOS 上并行编译</span>
<span class="token function">make</span> <span class="token function">install</span>
<span class="token comment"># 让当前 shell 直接使用该版本（无需写入 PATH）</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">yasm</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/.local/yasm/bin/yasm&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><h2 id="三、常用命令速查" tabindex="-1"><a class="header-anchor" href="#三、常用命令速查" aria-hidden="true">#</a> 三、常用命令速查</h2><table><thead><tr><th>命令</th><th>参数说明</th><th>示例</th></tr></thead><tbody><tr><td><code>yasm -f</code></td><td>指定对象文件格式（macho64/elf64/elf32/bin/win64 等），<strong>必需参数</strong></td><td><code>yasm -f macho64 foo.asm</code></td></tr><tr><td><code>yasm -o</code></td><td>指定输出文件名</td><td><code>yasm -f elf64 -o foo.o foo.asm</code></td></tr><tr><td><code>yasm -g</code></td><td>生成调试信息（dwarf2/stabs 等）</td><td><code>yasm -f elf64 -g dwarf2 foo.asm</code></td></tr><tr><td><code>yasm -l</code></td><td>生成列表文件（.lst），便于查看每行对应的机器码</td><td><code>yasm -f elf64 -l foo.lst foo.asm</code></td></tr><tr><td><code>yasm -E</code></td><td>只做预处理，输出展开后的汇编代码</td><td><code>yasm -E foo.asm &gt; foo.expanded.asm</code></td></tr><tr><td><code>yasm -p</code></td><td>指定预处理器（默认 <code>nasm</code>，也可用 <code>raw</code>）</td><td><code>yasm -p raw foo.asm</code></td></tr><tr><td><code>yasm -D</code></td><td>定义预处理宏，等价于 <code>-D NAME=VALUE</code></td><td><code>yasm -f elf64 -D DEBUG=1 foo.asm</code></td></tr><tr><td><code>yasm --help</code></td><td>查看完整参数列表与说明</td><td><code>yasm --help</code></td></tr><tr><td><code>yasm --license</code></td><td>查看许可证与软件声明</td><td><code>yasm --license</code></td></tr><tr><td><code>yasm -a x86</code></td><td>强制指定指令集架构（x86/x86-64/amd64）</td><td><code>yasm -a x86 -f elf32 foo.asm</code></td></tr><tr><td><code>yasm -m x86</code></td><td>强制指定机器/位宽模式（32 位/64 位）</td><td><code>yasm -m x86 -f win32 foo.asm</code></td></tr><tr><td><code>yasm -O0</code></td><td>设置优化级别（<code>-O0</code>~<code>-O2</code>，默认 <code>-O2</code>）</td><td><code>yasm -O0 -f elf64 foo.asm</code></td></tr></tbody></table><blockquote><p><strong>提示</strong>：<code>-a</code>（architecture）与 <code>-m</code>（machine）可单独覆盖默认的架构/位宽推断。多数场景下 yasm 会依据 <code>-f</code> 自动推断，无需手动指定；仅在交叉编译或格式推断异常时才有必要显式给出。</p></blockquote><h2 id="四、实际示例" tabindex="-1"><a class="header-anchor" href="#四、实际示例" aria-hidden="true">#</a> 四、实际示例</h2><h3 id="示例-1-编译一个-x86-64-的-mach-o-程序-macos" tabindex="-1"><a class="header-anchor" href="#示例-1-编译一个-x86-64-的-mach-o-程序-macos" aria-hidden="true">#</a> 示例 1：编译一个 x86-64 的 Mach-O 程序（macOS）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 准备源代码 hello.asm</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出会显示 <code>val dd ((3)*(3))</code>，即宏被完全展开后的汇编代码。<code>-E</code> 是排查复杂宏定义错误的好帮手。</p><h2 id="五、进阶技巧与配置" tabindex="-1"><a class="header-anchor" href="#五、进阶技巧与配置" aria-hidden="true">#</a> 五、进阶技巧与配置</h2><ol><li><p><strong>格式与系统调用号的对应</strong>：yasm 只负责汇编，不处理系统调用。同一段汇编在 macOS 用 <code>0x2000000</code> 开头的系统调用号（如 write=0x2000004、exit=0x2000001），在 Linux 则直接用 <code>0/1/60</code> 等小号。跨平台代码常用 <code>%ifdef</code> 配合 <code>-D</code> 宏条件编译来区分平台。</p></li><li><p><strong>与其它工具链搭配</strong>：日常流程是「yasm 汇编 + 系统链接器链接」。在 macOS 用 <code>ld -lSystem</code> 或直接交给 <code>clang hello.o</code> 自动链接；C/C++ 混编时，先用 <code>yasm -f macho64</code> 产出 <code>.o</code>，再与 <code>gcc</code>/<code>clang</code> 编译的 C 目标文件一起链接。媒体库（FFmpeg、x264 等）的构建脚本通常自动探测并调用 yasm。</p></li><li><p><strong>列表文件与调试信息</strong>：加 <code>-l xxx.lst</code> 生成列表文件，逐行对照「汇编代码 → 机器码 → 地址」；配合 <code>-g dwarf2</code> 生成 DWARF 调试信息，就能在 lldb/gdb 里对汇编源码打断点单步执行，是学习或排查汇编逻辑的利器。</p></li><li><p><strong>RIP 相对寻址</strong>：在 64 位 Mach-O 中访问全局数据必须用 <code>lea rsi, [rel msg]</code> 这样的 RIP 相对寻址，直接写 <code>mov rsi, msg</code> 会链接失败。这是 macOS 汇编新手最常见的坑，建议统一使用 <code>rel</code> 前缀。</p></li><li><p><strong>优化级别 <code>-O0</code>~<code>-O2</code></strong>：yasm 内置多种优化开关，默认 <code>-O2</code> 会做「短跳转/短分支」收缩与最小化指令编码。若为排错或想精确控制每条指令的字节布局（例如对齐固定的 <code>nop</code> 序列用于热补丁），可用 <code>-O0</code> 关闭优化。反汇编对比 <code>.lst</code> 即可直观看到优化前后的编码差异。</p></li><li><p><strong>用 <code>%ifdef</code> / <code>%if</code> 做配置化源码</strong>：这是 yasm 最重要的配置手段，比在外部拼多个 <code>.asm</code> 文件更优雅：</p><div class="language-nasm line-numbers-mode" data-ext="nasm"><pre class="language-nasm"><code><span class="token operator">%</span>ifdef DEBUG
    <span class="token operator">%</span>define TRACE(x)  mov <span class="token register variable">rdi</span>, x
<span class="token operator">%</span>else
    <span class="token operator">%</span>define TRACE(x)
<span class="token operator">%</span>endif

<span class="token keyword">section .data</span>
<span class="token operator">%</span>ifndef MAXBUF
    <span class="token operator">%</span>define MAXBUF <span class="token number">4096</span>
<span class="token operator">%</span>endif
    buf resb MAXBUF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译时用 <code>yasm -DDEBUG -DMAXBUF=8192 -f elf64 foo.asm</code> 即可注入配置，不改源码。</p></li><li><p><strong>宏单行定义 vs 多行宏</strong>：<code>%define</code> 是单行文本替换（适合常量/简单表达式），<code>%macro ... %endmacro</code> 是多行宏（适合带 <code>%1</code>/<code>%2</code> 参数的指令序列）。多行宏常配合 <code>%assign</code>（可重赋值计数器）实现循环展开：</p><div class="language-nasm line-numbers-mode" data-ext="nasm"><pre class="language-nasm"><code><span class="token operator">%</span>macro ZERO_REGS <span class="token number">0</span>
    <span class="token operator">%</span>assign i <span class="token number">0</span>
    <span class="token operator">%</span>rep <span class="token number">4</span>
        mov qword <span class="token operator">[</span><span class="token register variable">rax</span> <span class="token operator">+</span> i<span class="token operator">*</span><span class="token number">8</span><span class="token operator">]</span>, <span class="token number">0</span>
        <span class="token operator">%</span>assign i i<span class="token operator">+</span><span class="token number">1</span>
    <span class="token operator">%</span>endrep
<span class="token operator">%</span>endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>结构化 <code>%if</code> / <code>%else</code> / <code>%elif</code></strong>：yasm 的条件汇编与 C 预处理高度相似，适合做「同一份汇编适配多种调用约定 / 平台」。配合 <code>-p nasm</code> 预处理器，几乎所有 NASM 指令（<code>%include</code>、<code>%error</code>、<code>%warning</code> 等）都可用。<code>%include &quot;common.inc&quot;</code> 可把共享的头文件/宏库抽出来复用。</p></li><li><p><strong>ELF 下的重定位与 PIC</strong>：Linux 生成动态库或 PIE 可执行文件时，需用 <code>default rel</code> 让相对寻址默认启用，避免链接时报 R_X86_64_32S 之类错误：</p><div class="language-nasm line-numbers-mode" data-ext="nasm"><pre class="language-nasm"><code>default rel
<span class="token keyword">section .text</span>
    <span class="token keyword">global func</span>
<span class="token label function">func:</span>
    lea <span class="token register variable">rdi</span>, <span class="token operator">[</span>msg<span class="token operator">]</span>   <span class="token comment">; 现在自动生成 RIP 相对引用</span>
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>与 NASM 的直接兼容策略</strong>：yasm 与 NASM 语法几乎 1:1 兼容，多数 <code>.asm</code> 源码可直接在两者间切换。差别集中在命令行参数（如 yasm 用 <code>-f macho64</code>，NASM 用 <code>-f macho64</code>，基本一致）和少量指令集支持上。<strong>建议</strong>：将关键的 <code>.asm</code> 文件同时用 <code>yasm --version</code> 与 <code>nasm -v</code> 编译一次做双保险，确保构建脚本在两种汇编器下都能跑。</p></li></ol><h2 id="六、注意事项与常见问题" tabindex="-1"><a class="header-anchor" href="#六、注意事项与常见问题" aria-hidden="true">#</a> 六、注意事项与常见问题</h2><ul><li><p><strong>忘记 <code>-f</code> 参数</strong>：yasm 默认不生成对象文件，必须显式用 <code>-f</code> 指定格式。macOS 用 <code>macho64</code>，Linux 用 <code>elf64</code>/<code>elf32</code>，Windows 用 <code>win64</code>/<code>win32</code>。选错格式会导致链接器无法识别目标文件。</p></li><li><p><strong>Mach-O 与 ELF 的链接差异</strong>：macOS 的入口符号是 <code>_main</code>（带下划线），Linux 是 <code>_start</code>（不带下划线）；macOS 链接需加 <code>-lSystem</code>。把 Linux 教程里的 <code>_start</code> 原样复制到 macOS 编译会链接报错。</p></li><li><p><strong>全局符号在 macOS 必须加下划线</strong>：Mach-O 约定 C 符号都带前导下划线，因此函数名要写成 <code>_main</code> 而不是 <code>main</code>，否则链接时找不到入口。</p></li><li><p><strong>64 位寻址报错</strong>：<code>mov</code> 指令把 64 位地址直接当立即数常触发「invalid combination of opcode and operands」或链接 relocation 错误。改用 <code>lea</code> + <code>[rel symbol]</code> 模式即可。</p></li><li><p><strong>版本较老</strong>：Homebrew 的 yasm 长期停留在 1.3.0（2014 年发布）。它足够稳定成熟，但多年未更新。若需要新指令集扩展支持，可考虑改用 NASM（<code>brew install nasm</code>），两者语法基本兼容。</p></li><li><p><strong><code>-E</code> 误以为在编译</strong>：<code>yasm -E foo.asm</code> 只做预处理、不会生成对象文件。若直接 <code>./foo</code> 会提示不存在该可执行文件。要「预处理 + 编译」得分开两步：先 <code>-E</code> 导出，再用 <code>-f</code> 编译导出结果。</p></li><li><p><strong><code>resb</code>/<code>resq</code> 与 <code>dd</code>/<code>dq</code> 混淆</strong>：<code>dd</code>/<code>dq</code> 是「初始化数据」，会在目标文件中占用并写入字节；<code>resb</code>/<code>resq</code> 是「预留空间」（BSS），不占文件字节。把缓冲区错写成 <code>dd</code> 会导致可执行文件异常膨胀或数据区错位。</p></li><li><p><strong><code>.lst</code> 中文/编码问题</strong>：源码含 UTF-8 中文注释时，<code>-l</code> 生成的列表文件默认按 ASCII 处理，<code>objdump</code>/文本编辑器可能显示乱码。建议源码注释统一用英文，或生成列表时用 <code>yasm -l</code> 后以 UTF-8 重新编码查看。</p></li><li><p><strong>性能注意</strong>：<code>-O2</code>（默认）会改变编码长度，导致 <code>objdump -d</code> 看到的地址/字节与手写假设不符。追求可预测的机器码（如引导扇区、精确指令计数）务必显式 <code>-O0</code>。</p></li><li><p><strong>安全注意</strong>：直接 <code>yasm -f bin</code> 产出裸二进制（无段、无重定位），一旦 <code>org</code> 基址写错，跳转全部失效且难以定位。引导扇区/裸 bin 场景务必先核对 <code>-l</code> 列表文件中的绝对地址。</p></li><li><p><strong>常见报错：<code>error: directive must appear in a section</code></strong>：<code>%define</code>/<code>%macro</code> 等预处理指令可放文件顶部，但真正的指令与 <code>section</code> 定义有顺序要求。把 <code>section .data</code> 放在所有数据定义之前即可解决。</p></li><li><p><strong>常见报错：<code>error: symbol &#39;msg&#39; not defined</code></strong>：通常是访问了未声明或大小写不匹配的符号。yasm 符号区分大小写，<code>msg</code> 与 <code>Msg</code> 是不同符号；跨段引用请确认已用 <code>global</code>/<code>extern</code> 声明。</p></li><li><p><strong>常见报错：<code>ld: warning: -pie being ignored</code></strong>：在 macOS 上 <code>ld</code> 直链 <code>_main</code> 入口的裸汇编时常见，属于正常提示，可忽略；或用 <code>clang</code> 包装链接器自动处理。</p></li></ul><h2 id="七、实战-与其它工具搭配与自动化" tabindex="-1"><a class="header-anchor" href="#七、实战-与其它工具搭配与自动化" aria-hidden="true">#</a> 七、实战：与其它工具搭配与自动化</h2><h3 id="_1-c-c-混编-把汇编函数暴露给-c" tabindex="-1"><a class="header-anchor" href="#_1-c-c-混编-把汇编函数暴露给-c" aria-hidden="true">#</a> 1. C/C++ 混编：把汇编函数暴露给 C</h3><p>把性能敏感函数（SIMD、加密、媒体处理）写成汇编，再由 C 调用，是 yasm 最高频的生产场景。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>; math.asm —— 导出供 C 调用的函数（注意 macOS 下符号带下划线）
section .text
    global _add3
_add3:                 ; int add3(int a, int b, int c) 按 SysV ABI 传参
    lea eax, [rdi + rsi]
    add eax, edx
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">// main.c</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token keyword">extern</span> <span class="token keyword">int</span> <span class="token function">add3</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">add3</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 60</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 一步到位：yasm 汇编 + clang 编译 + 链接</span>
yasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-g</span> dwarf2 math.asm <span class="token parameter variable">-o</span> math.o
clang <span class="token parameter variable">-O2</span> <span class="token parameter variable">-g</span> main.c math.o <span class="token parameter variable">-o</span> app
./app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-用-makefile-自动化多目标构建" tabindex="-1"><a class="header-anchor" href="#_2-用-makefile-自动化多目标构建" aria-hidden="true">#</a> 2. 用 Makefile 自动化多目标构建</h3><p>把「汇编 → 链接 → 测试」固化成可复现的流程，并支持不同格式/优化级别：</p><div class="language-make line-numbers-mode" data-ext="make"><pre class="language-make"><code># Makefile
AS      := yasm
FORMAT  ?= macho64    # Linux 用 make FORMAT=elf64 覆盖
ASFLAGS := -f $(FORMAT) -g dwarf2 -l
CC      := clang
TARGET  := app
OBJS    := math.o main.o

all: $(TARGET)

%.o: %.asm
	$(AS) $(ASFLAGS) $&lt; -o $@

%.o: %.c
	$(CC) -O2 -c $&lt; -o $@

$(TARGET): $(OBJS)
	$(CC) -o $@ $(OBJS)

.PHONY: clean
clean:
	rm -f *.o *.lst $(TARGET)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span>                 <span class="token comment"># 默认 macho64</span>
<span class="token function">make</span> <span class="token assign-left variable">FORMAT</span><span class="token operator">=</span>elf64    <span class="token comment"># 跨平台覆盖格式</span>
<span class="token function">make</span> <span class="token parameter variable">-j4</span>             <span class="token comment"># 并行构建</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-批量处理-脚本循环编译与对照反汇编" tabindex="-1"><a class="header-anchor" href="#_3-批量处理-脚本循环编译与对照反汇编" aria-hidden="true">#</a> 3. 批量处理：脚本循环编译与对照反汇编</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 批量编译目录下所有 .asm，并逐一生成列表与反汇编供核对</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> *.asm<span class="token punctuation">;</span> <span class="token keyword">do</span>
    yasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-l</span> <span class="token string">&quot;<span class="token variable">\${f<span class="token operator">%</span>.asm}</span>.lst&quot;</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token parameter variable">-o</span> <span class="token string">&quot;<span class="token variable">\${f<span class="token operator">%</span>.asm}</span>.o&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;FAIL: <span class="token variable">$f</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token comment"># 核对目标文件里的机器码（macOS 下反汇编调用的是系统 otool/llvm-objdump）</span>
objdump <span class="token parameter variable">-d</span> math.o            <span class="token comment"># Linux 用 objdump</span>
otool <span class="token parameter variable">-tv</span> math.o             <span class="token comment"># macOS 用 otool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-ci-集成-github-actions-跨平台矩阵测试" tabindex="-1"><a class="header-anchor" href="#_4-ci-集成-github-actions-跨平台矩阵测试" aria-hidden="true">#</a> 4. CI 集成：GitHub Actions 跨平台矩阵测试</h3><p>确保同源码在 macOS 与 Linux 都能用 yasm 编译通过：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/asm.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> asm<span class="token punctuation">-</span>build
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">,</span> pull_request<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">os</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>macos<span class="token punctuation">-</span>latest<span class="token punctuation">,</span> ubuntu<span class="token punctuation">-</span>latest<span class="token punctuation">]</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.os <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install yasm
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          if [ &quot;\${{ runner.os }}&quot; = &quot;macOS&quot; ]; then brew install yasm; fi
          if [ &quot;\${{ runner.os }}&quot; = &quot;Linux&quot; ];  then sudo apt-get install -y yasm; fi</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          make clean
          make FORMAT=\${{ runner.os == &#39;macOS&#39; &amp;&amp; &#39;macho64&#39; || &#39;elf64&#39; }}</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run
        <span class="token key atrule">run</span><span class="token punctuation">:</span> ./app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>yasm 在主流发行版与 Homebrew 中均有预编译包，CI 无需从源码编译，装上即用。</p></blockquote><h3 id="_5-与调试器配合的完整链路" tabindex="-1"><a class="header-anchor" href="#_5-与调试器配合的完整链路" aria-hidden="true">#</a> 5. 与调试器配合的完整链路</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 带符号编译 → lldb 单步</span>
yasm <span class="token parameter variable">-f</span> macho64 <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-l</span> math.lst math.asm <span class="token parameter variable">-o</span> math.o
clang <span class="token parameter variable">-O0</span> <span class="token parameter variable">-g</span> main.c math.o <span class="token parameter variable">-o</span> app

lldb ./app
<span class="token punctuation">(</span>lldb<span class="token punctuation">)</span> b _add3
<span class="token punctuation">(</span>lldb<span class="token punctuation">)</span> run
<span class="token punctuation">(</span>lldb<span class="token punctuation">)</span> register <span class="token builtin class-name">read</span> rdi rsi rdx     <span class="token comment"># 查看入参</span>
<span class="token punctuation">(</span>lldb<span class="token punctuation">)</span> stepi                         <span class="token comment"># 单步指令</span>
<span class="token punctuation">(</span>lldb<span class="token punctuation">)</span> x/4bx <span class="token variable">$rsp</span>                    <span class="token comment"># 查看栈上字节</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>列表文件 <code>math.lst</code> 里的地址与 lldb 的 <code>disassemble</code> 输出对照，可精确定位每条指令在内存中的位置。</p><h3 id="_6-生产级实践清单" tabindex="-1"><a class="header-anchor" href="#_6-生产级实践清单" aria-hidden="true">#</a> 6. 生产级实践清单</h3><ul><li><strong>默认开 <code>-g dwarf2</code> + <code>-l</code></strong>：永远留下可调试、可对照的产物，不要省这两行参数。</li><li><strong>统一符号命名约定</strong>：导出符号集中写在文件头部注释，macOS 加下划线、Linux 不加，用 <code>%ifdef</code> 区分平台生成。</li><li><strong>为关键模块加 <code>-O0</code></strong>：安全/引导类代码禁止优化，性能敏感路径才开 <code>-O2</code>，并在 <code>.lst</code> 中人工复核。</li><li><strong>版本锁定</strong>：在 <code>requirements</code>/<code>.tool-versions</code>/CI 中锁定 yasm 版本（如 <code>1.3.0</code>），避免不同机器优化差异引发回归。</li><li><strong>单测验证 ABI</strong>：对每个导出函数写一个 C 调用单测，校验返回值与系统调用号，防止寄存器使用违规。</li></ul>`,46),d=[c];function i(l,t){return s(),a("div",null,d)}const m=n(o,[["render",i],["__file","yasm.html.vue"]]);export{m as default};
