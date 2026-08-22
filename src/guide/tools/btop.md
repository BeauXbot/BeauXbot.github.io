---
title: btop
icon: gauge
category:
  - 工具
  - 系统监控
tag:
  - 系统效率
  - btop
---

# btop（现代化终端资源监控器（CPU/内存/网络/磁盘））

> Homebrew 版本 1.4.5 ｜ 主页：见官方文档 ｜ 安装：`brew install btop`

## 一、它是什么

btop 是一款用 C++ 编写的现代化终端资源监控器，对标经典 htop，用实时曲线、柱状图和彩色界面直观展示 CPU、内存、网络和磁盘的使用情况。它解决了传统 top 命令信息冗长、不直观的问题，让你在一个界面里就能看清整台机器的运行状态，特别适合服务器运维、性能排查和日常压测时观察资源占用。

## 二、安装与升级

```bash
# 安装
brew install btop

# 升级（先更新 Homebrew 索引）
brew update && brew upgrade btop

# 卸载
brew uninstall btop

# 验证安装成功（查看版本号）
btop --version
# 输出示例：btop v1.4.5
```

安装完成后直接输入 `btop` 即可进入实时监控界面，按 `q` 或 `Esc` 退出。

## 三、常用命令速查

btop 主要通过交互式界面内的按键操作，也有少量命令行参数：

| 命令 / 按键 | 说明 | 示例 |
| --- | --- | --- |
| `btop` | 启动监控界面 | `btop` |
| `btop -p 1,2,3` | 指定预设布局（1/2/3），显示不同模块组合 | `btop -p 1` |
| `btop -t` | 启用强制 256 色模式（配合终端的真彩模式） | `btop -t` |
| `btop -v` | 输出版本号 | `btop -v` |
| `-r <ms>` | 设置刷新间隔（毫秒，默认 1500） | `btop -r 500` |
| `-d` | 直接显示磁盘 IO 模块 | `btop -d` |
| `--utf-force` | 强制 UTF-8 模式（处理特殊字符乱码） | `btop --utf-force` |
| `--low-color` | 使用低颜色方案，减少终端性能负担 | `btop --low-color` |
| `--update 1` | 设置刷新间隔为 1 秒（等价于 `-r 1000`） | `btop --update 1` |
| `m` | 切换内存 / 交换分区显示 | `btop` 内按 `m` |
| `n` | 切换网络总览 / 进程显示 | `btop` 内按 `n` |
| `d` | 切换磁盘总览 / 分区 IO 显示 | `btop` 内按 `d` |
| `p` | 在预设布局间循环切换 | `btop` 内按 `p` |
| `?` 或 `h` | 打开按键帮助 | `btop` 内按 `?` |
| `f` | 按关键字过滤进程（支持正则） | `btop` 内按 `f` |
| `t` | 切换进程树 / 列表视图 | `btop` 内按 `t` |
| `c` | 切换进程排序方式（树状时） | `btop` 内按 `c` |
| `+` / `-` | 展开 / 折叠进程树节点 | `btop` 内按 `+` / `-` |
| `k` | 向选中进程发送信号（默认 SIGTERM） | `btop` 内按 `k` |
| `e` | 查看进程的环境变量 | `btop` 内按 `e` |

## 四、实际示例

### 示例 1：启动并查看整体资源占用

```bash
# 直接进入默认监控界面
btop
```

界面顶部是 CPU 和内存曲线，中部是进程列表（按 CPU 占用排序）。观察要点：

- 数字块颜色：绿色表示负载低，黄色表示中，红色表示高。
- 按 `↑`/`↓` 在进程间移动，按 `Enter` 或 `o` 查看该进程的详细信息（PID、线程、打开的文件等）。
- 按 `k` 直接结束选中的进程（会先要求确认）。

### 示例 2：快速定位高 CPU 进程并排序

```bash
# 以 500ms 刷新、第一套布局启动，便于观察瞬时峰值
btop -r 500 -p 1
```

进入界面后，在进程区反复按 `P`（大写，CPU 排序）可以切换排序方向，找出占用最高的进程；按 `M` 按内存排序，排查内存泄漏。定位到可疑进程后按 `Enter` 查看其 PID，再配合 `kill <PID>` 在另一个终端里处理。

### 示例 3：监控网络流量与磁盘 IO

```bash
# 直接打开网络模块
btop -d
```

在界面内按 `n` 循环切换网络总览和网络进程视图，查看实时上传 / 下载速率（默认单位 bytes，可在设置中改成 bits）。按 `↑`/`↓` 或鼠标滚轮选择某个网卡，下方曲线会显示该网卡的实时吞吐。磁盘模块同理，能看到各分区读写速度和 IO 等待时间。

## 五、进阶技巧与配置

### 1. 配置文件与目录结构

btop 的配置文件位于 `~/.config/btop/`，首次运行后自动生成。目录结构如下：

```bash
~/.config/btop/
├── btop.conf          # 主配置文件
├── themes/            # 自定义主题目录（可选）
│   └── mytheme.theme
└── btop.log           # 日志文件（出错时排查用）
```

```bash
# 用编辑器打开配置
vim ~/.config/btop/btop.conf
```

修改配置后，不需要重启 btop，直接在界面内按 `Esc` 打开主菜单 → `Options` → `Reload config`（或直接按 `r`）即可热重载，非常方便。

### 2. 完整配置项逐条说明

`btop.conf` 是 INI 风格，`#` 开头为注释。以下是一个经过整理、可直接使用的配置示例：

```ini
# ==== 主题与颜色 ====
color_theme = "dracula"          # 内置主题：default/dracula/monokai/nord/palenight/onedark/tokyo-night/ttcn 等
theme_background = false         # 主题是否带背景色，true 时背景参与主题配色
truecolor = true                 # 是否使用真彩（24-bit），旧终端可关掉
force_256 = false                # 强制 256 色（终端不支持真彩时开）

# ==== 刷新与界面 ====
update_ms = 1500                 # 刷新间隔（毫秒），与 -r 参数等价
lowcolor = false                 # 低颜色方案，终端卡顿时可开
tty_theme = "default"            # TTY 下使用的主题
graph_symbol = "braille"         # 曲线字符集：braille / block / tty / half
graph_symbol = "block"           # 后写覆盖前写，最终以 block 为准（曲线更醒目）

# ==== 显示模块（控制首屏显示哪些面板） ====
shown_boxes = "cpu mem net proc" # 空格分隔，可选：cpu/mem/net/proc/disk
# 顺序即显示顺序，例如想看磁盘和进程：shown_boxes = "proc cpu disk"

# ==== CPU ====
cpu_graph_upper = "total"        # 顶部曲线：total（总览）/ per_core（每核）/ single（单核）
cpu_graph_lower = "total"        # 底部曲线
cpu_bottom_left = "cpu"          # 左下：cpu/disk/net/auto
cpu_bottom_right = "mem"         # 右下：cpu/disk/net/auto

# ==== 内存 ====
mem_graph_upper = "system"       # system / used / free / hard
mem_graph_lower = "system"
mem_bottom_left = "mem"          # mem / swap
mem_bottom_right = "swap"

# ==== 网络 ====
net_download = 100               # 下载速度图例上限（Mebibyte/s）
net_upload = 100                 # 上传速度图例上限
net_auto = true                  # 自动调整速度上限
net_sync = false                 # 上下行曲线同步
net_iface = ""                   # 默认监控网卡，留空自动探测

# ==== 磁盘 ====
disk_show_io = true              # 是否显示 IO 活动
disk_io_speeds = true            # 是否显示 IO 速度
disk_free_priv = false           # 只有 root 能查看分区详细信息

# ==== 进程 ====
proc_sorting = "cpu"             # 默认排序：cpu / mem / pid / name
proc_reversed = true             # 是否降序（true 从大到小）
proc_tree = false                # 默认是否树状显示
proc_filter = ""                 # 默认过滤关键字（可留空）
proc_granularity = true          # 进程占用精度（true 时计入所有线程）
proc_per_core = false            # 是否按每核 CPU 占用显示
proc_mem_bytes = true            # 内存列是否以字节精确显示
show_uptime = true               # 是否显示开机时长
show_process = true              # 是否显示进程列表
check_temp = true                # 是否检测温度（需硬件支持）
temp_scale = "celsius"           # 温度单位：celsius / fahrenheit / kelvin
```

### 3. 主题定制

btop 主题是简单的 `.theme` 文件，放在 `~/.config/btop/themes/` 下，重启后在 `Options → Color theme` 里就能看到。以下是一个自定义主题的最小骨架：

```bash
# 创建一个极简主题文件
mkdir -p ~/.config/btop/themes
cat > ~/.config/btop/themes/ocean.theme << 'EOF'
[color]
main = "\e[38;2;97;175;239m"
proc_cpu = "\e[38;2;255;255;255m"
proc_mem = "\e[38;2;142;188;255m"
proc_misc = "\e[38;2;135;150;200m"
cpu_core = "\e[38;2;86;156;214m"
cpu_user = "\e[38;2;97;175;239m"
cpu_system = "\e[38;2;198;120;221m"
cpu_nice = "\e[38;2;142;188;255m"
mem_used = "\e[38;2;255;200;87m"
mem_cached = "\e[38;2;97;175;239m"
mem_free = "\e[38;2;46;160;67m"
EOF
# 然后启动 btop，在 Options → Color theme 里选择 ocean
```

### 4. 环境变量

```bash
# 让 btop 使用真彩（24-bit）配色（推荐，界面更鲜艳）
export COLORTERM=truecolor

# 强制 256 色（真彩发灰或乱码时）
export COLORTERM=1

# 让 btop 跟随系统深浅色主题（需终端与桌面环境支持）
export BTOP_DARK_BG=1

# 覆盖配置文件路径（自定义配置目录时很有用）
export BTOP_CONFIG_DIR="$HOME/.config/btop_alt"
btop   # 此时会读取新目录下的配置
```

### 5. 命令行进阶参数

```bash
# 用环境变量关闭颜色，方便无颜色日志导出
btop -t 2>/dev/null   # -t 为 256 色；输出到管道时建议配合 --low-color

# 组合参数：500ms 刷新 + 仅显示 CPU 和内存模块 + 强 256 色
btop -r 500 -p cpu,mem -t

# 查看完整命令行帮助
btop --help
# 输出示例：
#   Usage: btop [OPTIONS]
#   -h, --help        Print this help message and exit
#   -v, --version     Print version information and exit
#   -l, --low-color   Disable truecolor theme
#   -t, --force-256   Force 256 color even if truecolor is detected
#   --utf-force        Force start even if no UTF-8 locale is detected
#   --update <ms>     Set the update rate in milliseconds
#   --threads         Show threads and process groups
```

### 6. 完整监控面板逐模块解读

btop 的"面板"用 `shown_boxes` 控制，每个模块都有独立的数据语义。读懂这些模块 = 读懂一台机器的健康度：

**CPU 面板**

- 顶部大曲线默认 `cpu_graph_upper = "total"`：显示全部核心的**总和占用**随时间变化；切到 `per_core` 则显示每个核心各自的曲线堆叠（可看清是否"单核打满、多核空闲"——常见于单线程程序瓶颈）。
- 左下/右下小图是"当前核心"的细分：`cpu_user`（用户态）、`cpu_system`（内核态）、`cpu_nice`（低优先级）、`cpu_io`（等待 IO）。若 `system` 常年高，说明有系统调用/内核工作瓶颈（如频繁中断、磁盘 IO 等待）。

**内存面板**

- `mem_graph_upper = "system"`：系统总内存的构成堆叠。把鼠标移到图上看图例：`used`（已用）、`cached`（缓存，可回收）、`free`（空闲）。
- **判断真实压力的关键**：`used + cached + free` 才是"物理总量"，`cached` 是系统为加速读取临时占用的、**可以释放**的，所以"used"高不一定内存紧张，要看 `free + cached` 是否长期逼近 0，以及 swap 是否开始被频繁读写。

**网络面板**

- 两张曲线分别画**下行（下载）**与**上行（上传）**速率，`net_download`/`net_upload` 决定图例纵轴上限，`net_auto = true` 时自动缩放。
- 数字区域给出当前瞬时速率，`net_iface` 可固定要监控的网卡（多网卡/服务器场景很关键，否则自动探测可能抓到错误的回环接口）。
- 按 `n` 切换到"网络进程"视图，可看**哪个进程正在占带宽**——排查"谁在偷偷上传/下载"的利器。

**磁盘面板**

- 上方是各分区读/写速率曲线，`disk_show_io` 控制是否显示 IO 等待时间（`iowait`）。**iowait 高**意味着磁盘成为瓶颈（CPU 在干等磁盘），即使 CPU 占用不高，整机也慢。
- 按 `d` 切换到"分区总览"视图看容量与挂载点，配合 `ncdu` 定位谁占空间。

**进程面板**

- 排序：`P`（CPU）、`M`（内存）、`T`（累计 CPU 时间）、`N`（PID）、`I`（进程名）。`proc_sorting` 设置默认排序。
- `proc_granularity`：默认 `true` 会把进程的所有线程占用都**合计**进该进程，避免"每个线程只有 0.x%，看不出来谁在忙"的盲区。
- `proc_tree` / 按 `t`：树形视图展示父子关系，按 `c` 切换排序，按 `+`/`-` 折叠节点。
- `proc_per_core = true` 时，CPU 列显示的是"占了多少个核心"，大于 1 说明该进程是多线程并行。

### 7. 脚本模式与「纯文本」输出

btop 本身是 TUI，不直接输出可解析文本。但有两个脚本友好的方向：

**① 用 `btop` 做"人工决策 + 脚本执行"**
btop 只负责"人眼观察"，真正要交给 cron/CI 的数据采集一律走 `ps` / `top -b` / `sysctl` / `vm_stat`（见第七节），这是脚本化的正确姿势。

**② 结合 `tmux` / `script` 把 TUI 输出落档**
若确需把 btop 的实时画面保存为文本，可用 `tmux` 捕获窗格内容，或 `script` 记录会话：

```bash
# 用 script 记录整段 btop 会话到文件（之后可 cat 查看）
script /tmp/btop_session.log
btop
exit

# 或用 tmux 窗格捕获
tmux new -d -s cap 'btop -r 2000'
sleep 3
tmux capture-pane -t cap -p | head -40   # 抓当前画面文本
tmux kill-session -t cap
```

### 8. 与其它工具搭配

- 用 `watch -n 1 btop -r 1000` 以固定节奏刷新观察；
- 结合 `htop` / `top` 做交叉对比；
- 配合 SSH 远程登录服务器后运行，实时查看远端机器负载（注意网络延迟，可把刷新间隔调大，如 `btop -r 3000`）。

### 9. 预设布局与个性化

btop 内置 3 套预设布局（`-p 1/2/3`），也可以通过配置 `shown_boxes` 组合出属于自己的布局。实际调法：

```bash
# 只保留 CPU + 网络（做网络压测观察时，省掉进程/磁盘噪声）
btop -p cpu,net

# 只保留内存 + 进程（查内存泄漏时聚焦）
btop -p mem,proc

# 想看全：磁盘 + CPU + 网络 + 内存 + 进程
btop -p cpu,mem,net,proc,disk
```

把最常用的那套写进 `btop.conf` 的 `shown_boxes`，开机即用，免去每次手动切换。

## 六、注意事项与常见问题

### 1. 终端兼容性

btop 需要较新的终端（如 iTerm2、kitty、Windows Terminal、支持真彩的 xterm），老终端可能出现乱码或颜色异常。遇到花屏先尝试 `btop -t`，或升级终端。若字符显示为方块乱码，可能是终端未启用 UTF-8 编码，可用 `btop --utf-force` 强制启动。

### 2. 按键与中文输入法冲突

在中文输入法开启时，快捷键（如 `q`、`p`）可能无法触发。按 `Ctrl+Space` 或 `Ctrl+` 切换到英文输入法再操作。

### 3. 进程列表为空或乱序

macOS 上若权限不足，部分进程信息可能不完整。建议通过 sudo 或确保当前用户权限正常；磁盘模块在某些容器 / 虚拟化环境可能显示不出 IO。

### 4. 刷新太频繁导致高 CPU 占用

`-r` 设太小的值（如 200ms）会让 btop 自身消耗较多资源，干扰观察结果。日常用默认 1500ms 即可，排查瞬时峰值再临时调小。

### 5. 退出方式

直接按 `q` 或 `Esc` 退出；若界面卡住，可先按 `Ctrl+C` 再按 `q` 兜底，正常不会留下残留进程。

### 6. 常见报错与解决办法

```bash
# 报错：Fatal error: Could not find a usable terminal
# 原因：终端环境变量 TERM 缺失或异常
export TERM=xterm-256color && btop

# 报错：Unsupported terminal. Setting TERM to xterm or installing a newer
#       terminal emulator is recommended.
# 原因：终端不支持所需特性，用 -t 强制 256 色，或升级终端
btop -t

# 报错：No UTF-8 locale detected
# 原因：系统语言环境非 UTF-8，用 --utf-force 强制，或修正 locale
btop --utf-force
# 永久修复：export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# 界面全是方块、曲线缺失
# 原因：graph_symbol 字符集不被终端支持，改用 block 或 lowcolor
btop --low-color
# 或改配置 graph_symbol = "block"

# 温度模块不显示
# 原因：硬件未暴露温度传感器或权限不足，可忽略 check_temp = false

# 网络曲线始终是 0 或抓错网卡
# 原因：net_iface 未固定或自动探测抓到了 lo 回环
# 在配置里显式固定网卡，如 net_iface = "en0"（macOS）或 eth0（Linux）

# 内存"已用"接近 100% 但系统不卡
# 原因：cached 缓存被计入 used，并非真实内存压力
# 看 free+cached 是否仍有余额，以及 swap 是否在涨；别被单一数字吓到

# 磁盘 IO 显示不出来的场景
# 原因：虚拟化/容器环境对 /proc/diskstats 或 sysctl 读取受限
# 用 df -h 兜底看容量，IO 速率改用 iostat / sar 侧证
```

### 7. 性能与安全注意点

- **避免在生产/线上机器长时间开着高频刷新**：`btop -r 200` 会显著吃掉 CPU，若需长时间监控用默认间隔或 `btop --update 1`。
- **不要用 `watch btop` 在无 tty 的 CI 或脚本里反复启动**：btop 需要交互式终端（tty），在 `cron`、`nohup` 或管道重定向中会直接报 `Could not find a usable terminal`，此时应改用 `ps` / `top -b -n 1` 或 `sar`。
- **进程信号发送要谨慎**：按 `k` 结束进程时默认发 `SIGTERM`，确认 PID 无误再确认；误杀关键系统进程可能导致机器卡死。
- **安全提示**：在多人共享服务器上，`e` 查看进程环境变量可能泄露密钥等敏感信息，注意不要将包含凭据的进程信息截图外传。
- **日志文件增长**：若 btop 内部出错，`~/.config/btop/btop.log` 会持续写入，可定期清理或删除该目录。
- **macOS 上温度/IO 读数可能缺失**：Apple Silicon 的传感器接口与 Linux 不同，温度、某些磁盘 IO 指标读不到属正常，别误判为故障。

## 七、实战：与其它工具搭配与自动化

### 1. 一键监控脚本（含报警）

btop 本身无告警能力，但可配合 Shell 脚本 + `osascript`（macOS）或 `notify-send`（Linux）实现资源超限提醒：

```bash
#!/bin/bash
# monitor.sh —— 一键启动带视觉提示的监控，资源超限时响铃提醒
btop -r 1000 &
BTOP_PID=$!
# 后台每秒检查一次 CPU 负载
while kill -0 $BTOP_PID 2>/dev/null; do
    load=$(sysctl -n vm.loadavg | awk '{print $1}')   # macOS 负载均值
    if awk -v l="$load" 'BEGIN {exit !(l > 2.0)}'; then
        echo "⚠️ 负载过高: $load"
        afplay /System/Library/Sounds/Sosumi.aiff &   # macOS 提示音
        sleep 10                                       # 冷却，避免刷屏
    fi
    sleep 1
done
```

```bash
chmod +x monitor.sh && ./monitor.sh
```

### 2. 与 `htop` / `top` 交叉排查

btop 适合整体概览，`htop` 适合精细进程树，`top -b` 适合无交互输出。定位问题时按角色分工：

```bash
# 1) btop 快速看哪个模块异常（CPU/内存/磁盘）
btop -r 500

# 2) 切到 htop 按 F5 看进程树、F4 过滤定位嫌疑进程
htop

# 3) 用 top 批处理模式导出快照用于分析（无 tty 也能跑）
top -b -n 1 -o %CPU | head -30 > /tmp/cpu_snapshot.txt
cat /tmp/cpu_snapshot.txt
```

### 3. 批量采集与巡检（配合 cron）

btop 无法直接在脚本里输出数据，但可用它做人工巡检，数据采集交给 `top -b` 或 `sar`。下面演示把监控数据归档：

```bash
#!/bin/bash
# snapshot.sh —— 定时抓取资源快照，供人工巡检
mkdir -p ~/monitor
ts=$(date +%Y%m%d_%H%M%S)
# 进程 TOP 数据（CPU/内存排序各一份）
top -b -n 1 -o %CPU | head -25 > ~/monitor/top_cpu_$ts.txt
top -b -n 1 -o %MEM | head -25 > ~/monitor/top_mem_$ts.txt
# 磁盘空间
df -h > ~/monitor/disk_$ts.txt
# 保留最近 7 天，清理更旧的
find ~/monitor -name '*.txt' -mtime +7 -delete
```

配合 `crontab -e` 每 30 分钟执行一次：

```cron
*/30 * * * * /Users/wangbo/monitor/snapshot.sh
```

### 4. CI / CD 集成（非交互环境）

CI 是纯非交互环境，btop 会因无 tty 失败，此时**不要用 btop**，改用如下方案做资源门槛检查：

```yaml
# GitHub Actions 示例：构建前检查可用内存（防止 OOM）
- name: Check available memory
  run: |
    mem=$(sysctl -n hw.memsize)   # macOS runner
    echo "Total memory: $(( mem / 1024 / 1024 / 1024 )) GB"
    free_mem=$(vm_stat | awk '/free/ {print $3}' | tr -d '.')
    echo "Free pages: $free_mem"
```

或使用 `nproc`、`ulimit` 配合构建工具限制并发：

```bash
# 限制构建并发以控制内存峰值（配合 btop 本地观察）
export MAKEFLAGS="-j$(nproc --ignore=1)"
# 或显式降并发
make -j2
```

### 5. 与 `ncdu` / `du` 结合排查磁盘

btop 磁盘模块只给速率和容量，不定位“谁占了空间”，配合 `ncdu` 快速定位大文件：

```bash
# 先看哪块盘满了
btop -d
# 再定位大目录（交互式，方向键浏览）
ncdu /path/to/disk
# 或命令行快速排序
du -ah /path 2>/dev/null | sort -rh | head -20
```

### 6. 与 `lsof` / `netstat` 结合排查进程与端口

btop 按 `Enter` 查看进程详细信息，若需知道进程占用了哪些端口/文件：

```bash
# 先记下可疑进程 PID
# 查该 PID 打开的端口
lsof -i -P -n | grep <PID>
# 查该 PID 打开的文件
lsof -p <PID>
# 网络连接状态统计
netstat -an | awk '{print $6}' | sort | uniq -c
```

### 7. Makefile 一键化监控

把常用监控命令收进 Makefile，实现一键调用：

```makefile
# Makefile —— make monitor 即可监控
.PHONY: monitor top net disk help

monitor:          ## 打开交互式 btop
	@btop -r 1000

top:              ## 输出 CPU 排序快照
	@top -b -n 1 -o %CPU | head -30

net:              ## 显示网卡流量
	@ifstat -i en0 1 5

disk:             ## 显示磁盘占用
	@df -h

help:             ## 显示帮助
	@grep '^[a-zA-Z]' Makefile | awk -F':' '{print $$1}'
```

```bash
make help && make monitor
```

### 8. 生产级实践清单

- **监控前先校准基线**：在负载正常时跑一次 `btop` 截图记录各模块典型值，作为日后对比基准。
- **区分“瞬时”与“持续”**：用 `btop -r 500` 抓瞬时峰值，再用 `top -b -n 60 | tail` 或 `sar` 看持续趋势，避免被单次毛刺误导。
- **善用进程树与线程**：按 `t` 切到树状视图、配合 `e` 查看环境变量，能快速发现“僵尸进程”或异常多线程进程。
- **远程排查注意延迟**：SSH 高延迟时把 `update_ms` 调大到 3000 以上，否则界面会严重卡顿且刷新失真。
- **把 btop 当作“入口”，把 `ps/lsof/ncdu/sar` 当作“手术刀”**：btop 负责快速定位问题模块，专业工具负责深挖细节，两者配合效率最高。
- **固定配置文件**：把调好的 `~/.config/btop/btop.conf` 和自定义主题纳入 dotfiles 版本管理，多台机器一键同步，监控界面全局一致。