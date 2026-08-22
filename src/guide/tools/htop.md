---
title: htop
icon: gauge
category:
  - 工具
  - 系统监控
tag:
  - 系统与效率
  - htop
---

# htop（交互式进程查看器，top 的增强版）

> Homebrew 版本 3.4.1 ｜ 主页：见官方文档 ｜ 安装：`brew install htop`

## 一、它是什么

htop 是一个**交互式进程查看器**，是经典 `top` 命令的增强替代品。它以彩色、可视化的方式实时展示 CPU、内存、交换分区的使用情况，并将所有进程按树形层级展示，支持用鼠标或键盘直接操作，无需记忆繁琐的命令行参数。

相比 `top`，htop 最大的价值在于**可交互**：可以横着/竖着滚动查看长列表、直接按 F 键或用鼠标选中进程进行 kill（杀死）、renice（调整优先级）、搜索进程等，并且启动即可用、无需任何配置。典型应用场景：排查 CPU 或内存被谁吃满、定位僵尸进程、快速结束卡死的进程、观察系统整体负载趋势。

## 二、安装与升级

通过 Homebrew 安装、升级、卸载，以及验证：

```bash
# 安装
brew install htop

# 升级到最新版
brew upgrade htop

# 卸载
brew uninstall htop

# 验证安装成功（应输出 htop 3.4.1 之类）
htop --version
```

如果命令提示找不到，可先用 `brew update` 更新索引再安装；某些 macOS 老版本还需先安装 Xcode Command Line Tools。

## 三、常用命令速查

htop 分为「启动参数」和「运行中快捷键」两类，运行中的快捷键可以直接按字母键触发（不区分大小写，多个同键可在菜单里循环切换）：

| 命令 / 按键 | 参数说明 | 示例 / 说明 |
| --- | --- | --- |
| `htop` | 直接启动，默认展示全部进程 | `htop` |
| `htop -p PID` | 只显示指定 PID 的进程 | `htop -p 1234,5678`（PID 用逗号分隔） |
| `htop -u 用户名` | 只显示某用户的进程 | `htop -u wangbo` |
| `htop -d N` | 刷新间隔设为 N 秒（默认 1 秒） | `htop -d 3`（每 3 秒刷新） |
| `htop -t` | 启动即以树形视图显示 | `htop -t` |
| `F3`（`/`） | 搜索进程名 | 输入关键字即可定位进程 |
| `F4`（`\`） | 按关键字过滤进程 | 配合 `\` 再次输入清除过滤 |
| `F5`（`t`） | 切换树形 / 列表视图 | 按 `t` 同样可切换 |
| `F6`（`>`） | 选择进程排序字段 | 如按内存 `MEM%` 或 CPU 排序 |
| `F9`（`k`） | 杀死选中进程 | 会弹出信号列表，选 `SIGKILL`/`SIGTERM` |
| `F7` / `F8` | 提高 / 降低选中进程优先级（renice） | 只对有权操作的进程生效 |
| `F10`（`q`） | 退出 htop | 直接按 `q` 更快 |
| `空格` | 标记（tag）进程，便于批量操作 | 可配合 F9 一次杀掉多个进程 |
| `F1`（`?`） | 打开帮助页 | 里面列出全部快捷键 |

## 四、实际示例

### 示例 1：启动 htop 并筛选出 CPU 占用最高的进程

```bash
# 1. 直接启动
htop

# 2. 在运行界面中，按 F6（或 >）弹出排序字段选择，
#    用方向键选中 PERCENT_CPU，回车确认，进程即按 CPU 使用率降序排列
# 3. 若只想看占用高的几个，按 F4 输入关键字过滤，或直接观察顶部彩色进度条
```

结果：顶部彩色进度条实时反映各 CPU 核心（含逻辑核心）的使用率，列表第一行就是当前最吃 CPU 的进程。

### 示例 2：按用户名监控并树形查看进程

```bash
# 只查看用户 wangbo 的进程，并以树形视图展示父子关系
htop -u wangbo -t

# 运行中按 F5 可随时在"树形 / 列表"两种视图间来回切换
```

结果：能看到每个进程及其父进程的层级关系，便于判断哪些进程是谁拉起的。

### 示例 3：定位并杀死一个卡死的进程

```bash
# 1. 启动 htop 并按 F5 切到树形视图
htop

# 2. 按 / 搜索进程名，例如卡死的 node 服务
#    输入 node 回车后光标自动跳到对应进程

# 3. 按 F9 弹出信号列表，用方向键选中 SIGKILL，回车确认
#    （或用 F4 过滤出该进程，再空格标记、F9 批量处理）

# 4. 观察列表，该进程已消失，说明已成功终止
```

### 示例 4：调整刷新间隔，并在排查端口占用时聚焦观察

```bash
# 每 3 秒刷新一次，避免默认 1 秒刷新占用太多 CPU
htop -d 3

# 排查端口占用时，先找到占用 8080 的进程 PID，再进入 htop 精确观察其资源占用
lsof -nP -iTCP:8080 -sTCP:LISTEN   # 输出中的 PID 列即为占用进程
htop -p 8080                      # 改用上面查到的 PID，例如：htop -p 12345
```

> 提示：`htop -p` 后面要填**进程 PID**，不是端口号。想查端口 8080 被谁占用，请先用 `lsof -nP -iTCP:8080 -sTCP:LISTEN` 拿到 PID，再 `htop -p <PID>` 聚焦观察该进程的 CPU/内存。

## 五、进阶技巧与配置

### 1. 配置文件位置与结构

htop 的配置保存在 `~/.config/htop/htoprc`（新版 3.x）或 `~/.htoprc`（旧版 2.x）。首次退出时自动生成。配置文件是**键值对**格式，可直接手写。常用配置项如下：

```ini
# ~/.config/htop/htoprc
# 布局相关
left_meters=AllCPUs Memory Swap        # 左侧 Meters 显示哪些指标
right_meters=Tasks LoadAverage Uptime  # 右侧 Meters 显示哪些指标
left_meter_modes=1 1 1                 # 1=条形图 2=数字 3=文字，数量需与 left_meters 对应
right_meter_modes=2 2 2

# 显示相关
show_cpu_frequency=1                   # 显示 CPU 频率
show_cpu_temperature=1                 # 显示 CPU 温度（需对应传感器，mac 上可能无效）
show_program_path=0                    # 是否显示完整程序路径
highlight_base_name=1                  # 高亮进程名而非完整命令
highlight_deleted_exe=1                # 高亮已被删除的可执行文件（磁盘上的 bin 被删）
hide_kernel_threads=uwmY5PYwRXtihc9O   # 是否隐藏内核线程（0 显示 / 1 隐藏）
hide_userland_threads=0                # 是否隐藏用户态线程

# 树形视图
tree_view=0                            # 1 默认树形视图，0 默认列表
sort_key=PERCENT_MEM                    # 默认排序字段（见下方常见排序键）
sort_direction=1                       # 1 降序 0 升序

# 颜色主题
color_scheme=0                         # 0 默认 1 Monochrome 2 Black on White
enable_mouse=1                         # 是否启用鼠标支持
delay=15                               # 刷新间隔（1/10 秒单位，15 = 1.5 秒）
```

**常见排序键（`sort_key` 可选值）**：`PID`、`USER`、`PERCENT_CPU`、`PERCENT_MEM`、`M_RESIDENT`、`M_SIZE`、`TIME`、`COMMAND`。改这个键等价于在界面里按 `F6` 选排序字段。

### 2. 常用环境变量与启动参数

htop 除 `-d/-u/-p/-t` 外，还有一批实用启动参数，适合放进别名或脚本：

```bash
htop -h                     # 查看完整帮助
htop -C                     # 纯色（Monochrome）模式，适合浅色背景终端
htop -s PERCENT_MEM        # 启动即按内存排序
htop -F                     # 只显示指定 PID 及其子进程：htop -F 1234
htop --tree                 # 等价于 -t，启动即以树形视图显示
htop --no-color             # 等价于 -C

# 通过环境变量控制布局
COLUMNS=80 LINES=40 htop   # 指定终端尺寸布局
```

常用别名（写入 `~/.zshrc` 或 `~/.bashrc`）：

```bash
alias htopmem='htop -s PERCENT_MEM'   # 按内存排序
alias htopcpu='htop -s PERCENT_CPU'   # 按 CPU 排序
alias htoproot='sudo htop'            # root 视角查看所有进程
```

### 3. 自定义配色与布局（F2 Setup）

在 htop 内按 `F2`（Setup）进入配置界面，可调整颜色方案（`Monochrome`、`Black on White` 等）、增减列、开关树形视图、配置 Meters 显示哪些指标。改动会自动写回 `htoprc`，实现"一次配置、处处生效"。

进阶技巧：把配置好的 `htoprc` 放进 dotfiles 仓库版本管理，换新机器或 SSH 到服务器时同步即可保持一致的监控界面。

### 4. 多进程批量管理

按 `空格` 逐个标记（tag）多个进程后，按 `F9` 可一次性对标记的所有进程发送信号（如批量 `SIGTERM` 优雅关闭）。配合 `F8`/`F7` 还能批量调整优先级，适合清理僵尸或失控的批量任务。

标记后按 `F5` 切到树形视图，可快速看出哪些标记进程属于同一父进程，批量操作前先确认，避免误杀关键服务。

### 5. 与其它工具搭配

- 与 `ps`、`lsof`、`vm_stat` 结合做深度排查（如先用 `lsof` 找 PID，再用 `htop -p` 聚焦观察）；
- 与 `watch` 搭配做非交互快照：`watch -n 2 htop`（但更推荐直接 `htop -d 2`，交互能力更强）；
- 在 SSH 远程管理服务器时，htop 比 `top` 更直观，特别适合树形查看 nginx、php-fpm、Java 等父子进程关系；
- 与 `grep` 管道配合定位进程：`ps aux | grep -E 'node|java'` 先缩小范围，再进 htop 精准观察。

### 6. 深入：进程树视图（F5）的实战读法

按 `F5`（或 `t`）切换树形视图后，进程按**父子层级**缩进展示。这是排查"进程依赖/拉活/僵尸"最有力的武器：

- **看启动归属**：光标停在一个进程上，按 `l` 直接查看它打开的文件，按 `s` 查看它的系统调用（strace），按 `k` 精准发信号——树形视图能一眼看出"谁是谁拉起的"，避免误杀父进程导致整棵树崩溃。
- **看状态列（S）**：树形视图里留意每个进程的 STAT 列。`Z`（Zombie 僵尸，已死但未被父进程回收）是排查重点；`D`（不可中断睡眠）一般无法直接杀死；`T`（被停止）可用 `SIGCONT` 恢复。配合 `F4` 过滤 `Z`，可快速列出全部僵尸进程。
- **折叠整棵子树**：在树形视图下按 `+` / `-`（或方向键右/左）展开 / 折叠某个父进程的整棵子树，便于聚焦某一进程组而隐藏无关噪声。
- **定位整个进程组**：想对"某个服务及其全部子进程"统一处理时，先在树形视图里 `空格` 标记根进程，再按 `F9` 发 `SIGKILL`，注意此时要确认子树里没有关键服务。

> 注意：macOS 上树形视图对某些内核线程/launchd 层级展示与 Linux 略有差异，但父子关系逻辑一致。

### 7. 深入：筛选与排序的组合拳

`F4`（过滤）和 `F6`（排序）是日常定位的两把刷子，掌握它们的组合能极大提升效率：

```bash
# 运行中组合操作：
# 1) F4 输入关键字（如 node）→ 只显示含 node 的进程
# 2) F6 选 PERCENT_MEM → 在过滤结果内按内存排序
# 3) 空格标记可疑项 → F9 批量处理

# 通配符：F4 过滤支持简单通配（类似 shell glob），
# 输入 *node* 可模糊匹配路径/命令中任意位置的 node
```

常用筛选场景速记：

| 目标 | 操作 |
| --- | --- |
| 只看某用户进程 | 启动时 `htop -u 用户名`，或按 `u` 选择用户 |
| 只看某进程及其子进程 | `htop -F PID`（含全部后代） |
| 只看内存排序前几 | `F6` 选 `PERCENT_MEM`，配合 `F4` 过滤业务名 |
| 只看僵尸进程 | `F4` 输入 `Z`（STAT 列），或用 `ps aux \| awk '$8~/Z/'` 在外部定位 |
| 只看线程级占用 | 按 `H`（大写）切换"线程 / 进程"视图，默认只显示进程 |

> `H` 键在 htop 3.x 里切换线程显示；macOS 上线程视图能看清多线程程序的每个线程各自占多少 CPU，排查"单线程卡死"很有用。

### 8. 深入：发送信号的正确姿势（F9）

`F9` 弹出的信号列表是对进程"发信号"的门户，不同信号的语义天差地别，务必分清：

```text
SIGTERM (15)   —— 优雅终止，进程可捕获并做清理后退出。首选。
SIGKILL (9)    —— 强制杀死，不可捕获，可能丢数据/损坏文件。最后手段。
SIGSTOP (19)   —— 暂停进程（挂起），不终止，可用 SIGCONT 恢复。
SIGCONT (18)   —— 恢复被暂停的进程。
SIGHUP (1)     —— 挂断，常用于让守护进程重新加载配置（配合 -HUP 软重载）。
SIGINT (2)     —— 中断，等价于 Ctrl+C。
SIGUSR1/2      —— 程序自定义信号，常用于日志轮转/热重载（如 nginx reload）。
```

- 想让 nginx 热重载配置而不是杀掉它：找到 `nginx: master` 进程，`F9` 选 `SIGHUP`，比 `kill -HUP` 更直观。
- 让某个卡住的进程"暂停"观察而非杀死：`F9` 选 `SIGSTOP`，看完再用 `F9` 选 `SIGCONT` 恢复。
- 用 `F7`/`F8`（renice）调整进程优先级：`nice` 值越小优先级越高。普通用户只能把自己的进程往 `0` 方向调（提高 nice 即降低优先级），调低（提高优先级）需要 root。

### 9. 深入：完整监控面板解读

htop 的界面分为三块，读懂它们等于看懂整台机器的"体检报告"：

**① 顶部 Meters（左侧/右侧仪表区）**

- `AllCPUs`：每个 CPU 核心的独立进度条，颜色表示状态：绿色=用户态、红色=系统态（内核）、蓝色=低优先级、黄色/洋红=某些特殊状态。若满屏发红，说明系统调用/内核繁忙。
- `Memory`：内存使用条。百分比 =（total - available）/ total，`available` 包含可回收的缓存，所以"已用"未必是真实压力。
- `Swap`：交换分区使用。swap 长期高说明物理内存吃紧。
- `LoadAverage`：负载均值，`1.23/0.98/0.76` 分别是 1/5/15 分钟平均。单核机器 load > 1 即过载；多核则按核数判断。
- `Tasks` / `Threads` / `Uptime`：进程数、线程数、开机时长。

**② 中部表头**

各列含义：`PID`（进程号）、`USER`（属主）、`PRI`/`NI`（优先级）、`VIRT`（虚拟内存）、`RES`（常驻物理内存）、`SHR`（共享内存）、`S`（状态）、`CPU%`、`MEM%`、`TIME+`（累计 CPU 时间）、`Command`（命令）。

**③ 底部功能区**

列出 F1~F10 各功能键的即时提示，按对应键即可触发，是新手最好的"菜单栏"。

### 10. 深入：让 htop 自动匹配每台机器的配置

把配置做成"按主机/环境区分"的模板，配合脚本在 SSH 登录或 `tmux` 会话里自动加载：

```bash
# ~/.zshrc 里的辅助函数：按 SSH 目标主机加载不同 htoprc
htopssh() {
  local host="$1"
  # 若该主机有专属配置则用之，否则用默认
  if [ -f "$HOME/.config/htop/htoprc.$host" ]; then
    HTOP_HOME="$HOME/.config/htop" HOME="$HOME" htop \
      --config "$HOME/.config/htop/htoprc.$host"
  else
    htop
  fi
}
```

## 六、注意事项与常见问题

### 新手易踩的坑

1. **必须使用原生终端颜色**：htop 依赖终端 ANSI 颜色，某些浅色主题下文字可能看不清。可用 `htop -C`（Monochrome 纯色）运行，或在 `F2 -> Colors` 里切换为深色配色。

2. **`htop -p` 跟的是 PID 不是端口**：这是最常见的误解。想查端口占用必须先 `lsof -nP -iTCP:8080` 拿到 PID，再 `htop -p <PID>`，直接用端口号会报错或无输出。

3. **权限导致无法操作某些进程**：普通用户执行 `F9` 杀死 root 或其他用户的进程、`F7`/`F8` 调整其优先级会被拒绝。需要用 `sudo htop` 以 root 运行才能操作全部进程（`sudo` 后 htop 会显示所有用户进程）。

4. **`brew uninstall htop` 后残留配置**：Homebrew 默认不会删除 `~/.config/htop/htoprc`，重装后旧配置仍在。如需彻底清除，手动删除 `~/.config/htop` 目录即可。

5. **刷新间隔与负载**：默认每秒刷新一次。在配置很弱的机器或大量进程时，可调大刷新间隔（`htop -d 5`）以降低自身 CPU 占用；htop 本身是轻量程序，但海量进程下频繁刷新仍会有一点开销。

6. **在 CI/脚本中使用**：htop 是交互式工具，不适合在无人值守脚本中直接调用；自动化场景请改用 `ps` 或 `top -bn1` 等非交互输出（详见第七节）。

### 常见报错与解决办法

| 报错 / 现象 | 原因 | 解决办法 |
| --- | --- | --- |
| `htop: command not found` | 未安装或 PATH 未包含 | `brew install htop`；`brew update` 后重试 |
| 提示缺少 locale 或乱码 | 终端 locale 未设置 | `export LANG=en_US.UTF-8` 后重开终端 |
| CPU 温度/频率列不显示数据 | 传感器不被支持（macOS 常见） | 在 `F2 -> Display options` 关闭该 Meter |
| 颜色错乱、花屏 | 终端不支持 ANSI 或宽字符 | `htop -C` 强制纯色，或换用 iTerm2/kitty |
| `F9` 杀不掉进程 | 无权限或进程处于不可中断状态（D 状态） | `sudo htop`；D 状态进程一般只能重启系统 |
| htop 打开立即退出 | 终端尺寸过小 | `export COLUMNS=80 LINES=40` 或拉大窗口 |
| 某个进程 CPU% 超过 100% | 多核/多线程进程，CPU% 是相对单核百分比 | 属正常，说明该进程用满了一个以上核心 |
| 树形视图缩进错乱 | 父进程已退出或终端字体非等宽 | 确认用等宽字体；`F5` 重绘一次 |
| 运行中 `q` 退出后终端残留花屏 | 终端/环境异常 | 执行 `reset` 或 `stty sane` 恢复终端 |

### 性能与安全注意点

1. **性能**：在拥有数千进程的服务器上，默认 1 秒刷新会带来可见开销，建议 `htop -d 5` 或更高；排查高峰期别同时开多个 htop 实例。
2. **安全**：`sudo htop` 赋予的是整个终端的 root 权限，用完立即退出；不要长期挂 root 会话。
3. **SIGKILL 要慎重**：`F9` 默认列表在 `SIGKILL` 上（有些版本是 `SIGTERM`）。SIGKILL（9）不可被进程捕获，会直接强制终止、可能丢失未保存数据；优先尝试 `SIGTERM`（15）优雅退出，无效再升级到 SIGKILL。
4. **不要乱 `-HUP`**：给不支持 HUP 语义的进程发 `SIGHUP` 可能直接终止它，而非重载。确认目标进程文档里说明支持 HUP 再发。
5. **共享服务器上别开 `htop -u root` 挂机**：会暴露所有用户进程列表，涉及隐私；只在排障必要时临时使用并退出。

## 七、实战：与其它工具搭配与自动化

htop 本身是交互式工具，但可以把它与命令行工具、脚本、CI 组装成一套完整的**进程排查与监控工作流**。

### 1. 命令行排查链路（端口 → 进程 → 资源）

一条龙定位"谁占着端口 8080，吃了多少内存"：

```bash
# 第 1 步：找 PID
lsof -nP -iTCP:8080 -sTCP:LISTEN
# 输出：COMMAND  PID  ...  node   12345  ...  :::8080 (LISTEN)

# 第 2 步：确认进程身份（可选）
ps -p 12345 -o pid,ppid,user,cmd

# 第 3 步：htop 聚焦观察该进程的实时 CPU/内存
htop -p 12345

# 第 4 步：查看进程打开的文件/内存映射，判断是否异常
lsof -p 12345 | head -20
```

### 2. 脚本化：用非交互命令取数，喂给告警或日志

htop 无批处理模式，需要数据时用 `ps` 或 `top -bn1` 取非交互输出，再交给脚本处理：

```bash
#!/usr/bin/env bash
# monitor_cpu.sh —— 找出 CPU 占用最高的前 5 个进程
ps -A -o pcpu,pmem,pid,comm --sort=-pcpu | head -6
```

配合 `top -bn1` 拍快照，适合记录到日志：

```bash
# 单次快照输出到文件（-b 批处理 -n1 只拍一帧）
top -bn1 | head -20 > /tmp/top_snapshot_$(date +%Y%m%d%H%M%S).log
```

### 3. Makefile 自动化

把常用的监控任务固化到 Makefile，一键执行：

```makefile
# Makefile
.PHONY: mon top-log find-port zombie

# 交互式查看资源占用 Top
mon:
	htop -d 1

# 生成一份 top 快照日志
top-log:
	mkdir -p logs
	top -bn1 | head -25 > logs/top_$$(date +%Y%m%d_%H%M%S).log
	@echo "已写入 logs/"

# 查端口占用
find-port:
	@read -p "输入端口: " p; lsof -nP -iTCP:$$p -sTCP:LISTEN

# 列出全部僵尸进程（Z 状态）
zombie:
	ps aux | awk '$$8 ~ /Z/ {print}'
```

```bash
make mon        # 进入 htop 交互界面
make top-log    # 落一份 top 快照
make find-port  # 交互输入端口查占用
make zombie     # 列出僵尸进程
```

### 4. CI 集成：进程泄漏/内存压力检查

在 CI 中（如 GitHub Actions、GitLab CI）不能开交互式 htop，但可用 `ps`/`top` 做资源断言，防止提交导致内存泄漏或进程暴增：

```yaml
# .github/workflows/check.yml（片段）
- name: 检查进程数量
  run: |
    # 记录测试前后进程数，超过阈值即失败
    before=$(ps -e | wc -l | tr -d ' ')
    echo "before=$before"
    # ... 运行你的测试或应用 ...
    after=$(ps -e | wc -l | tr -d ' ')
    echo "after=$after"
    [ $((after - before)) -lt 50 ] && echo "进程数正常" || { echo "进程泄漏!"; exit 1; }
```

### 5. 批量处理：一次性清理一批僵尸/失控进程

先用 `ps` 过滤出目标，再批量发信号（避免误杀，先 `echo` 演练再真删）：

```bash
# 找出所有 python 异常进程并优雅终止（演练版：先只看不杀）
ps aux | awk '$3 > 90 && /python/ {print $2}'

# 确认后批量 SIGTERM
ps aux | awk '$3 > 90 && /python/ {print $2}' | xargs -r kill -15

# 若仍不退出，再升级 SIGKILL
ps aux | awk '$3 > 90 && /python/ {print $2}' | xargs -r kill -9
```

### 6. 信号发送与 `kill` 命令的脚本化等价

htop 里用 `F9` 发信号，脚本里对应 `kill` 命令。两者的信号语义完全一致，只是交互与批处理之别：

```bash
# 让 nginx 主进程热重载（等价于 htop 里选中 master 按 F9 选 SIGHUP）
kill -HUP $(pgrep -f 'nginx: master')

# 优雅停止全部 node 服务
pkill -TERM node

# 暂停/恢复某 PID（等价于 F9 选 SIGSTOP/SIGCONT）
kill -STOP 12345 && sleep 5 && kill -CONT 12345

# 列出某 PID 能收到的全部信号（调试用）
kill -l
```

### 7. 与 `tmux` / `screen` 搭配做"常驻监控窗格"

在服务器上常开一个 htop 监控窗格，不占主屏、随时切回查看：

```bash
# 在 tmux 会话里开一个专用监控窗格
tmux new -d -s mon 'htop -d 2'
# 之后随时切回：tmux attach -t mon
# 或在一个窗格里分屏：先 Ctrl+B "，再在新窗格跑 htop
```

### 8. 生产级实践清单

- **固定监控配置**：把精心调好的 `~/.config/htop/htoprc` 纳入 dotfiles 或配置管理工具（Ansible/Chef），全服务器统一界面。
- **非交互取数**：所有需要定时采集、告警、落库的场景一律用 `ps`/`top -bn1`/`vm_stat`，绝不在 cron 里跑 htop。
- **权限最小化**：运维机器人/CI 用非 root 账号跑监控脚本；需要杀进程时才临时 `sudo`。
- **多维度结合**：`htop`（实时交互）＋ `lsof`（端口/文件）＋ `vm_stat`/`top -bn1`（历史快照）三件套，覆盖"现在看什么、刚才怎样、谁占资源"三个问题。
- **树形视图排查依赖**：服务异常时按 `F5` 看父子关系，能快速判断是主进程挂了还是子进程被反复拉起，配合 `F9` 针对性地处理整个进程组。
- **先 SIGTERM 后 SIGKILL**：任何"杀进程"操作都遵守"先优雅、再强制"的顺序，并养成"先标记、后确认、再执行"的习惯，避免生产事故。