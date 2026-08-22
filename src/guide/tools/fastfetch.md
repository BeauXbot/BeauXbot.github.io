---
title: fastfetch
icon: gauge
category:
  - 工具
  - 系统信息
tag:
  - 系统与效率
  - fastfetch
---

# fastfetch（快速显示系统信息的工具（类 neofetch））

> Homebrew 版本 2.55.1 ｜ 主页：见官方文档 ｜ 安装：`brew install fastfetch`

## 一、它是什么

fastfetch 是一个用 C 语言编写的高性能系统信息采集工具，在终端里以 ASCII 艺术或字符 Logo 的形式展示操作系统、内核、CPU、内存、磁盘、GPU、Shell、桌面环境等关键信息。它定位为 neofetch 的更快替代品，启动速度极快（通常只需几毫秒），非常适合在 shell 启动配置（如 `.bashrc`、`.zshrc`）中调用，或者在展示终端截图时生成美观的系统信息面板。

## 二、安装与升级

```bash
# 安装
brew install fastfetch

# 升级
brew upgrade fastfetch

# 卸载
brew uninstall fastfetch

# 验证安装成功（查看版本号）
fastfetch --version
```

安装成功后，终端里直接输入 `fastfetch` 即可显示系统信息。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `fastfetch` | 无参数，默认输出完整系统信息 | `fastfetch` |
| `fastfetch --logo` | 指定 logo 样式（如 `none` 隐藏 logo） | `fastfetch --logo none` |
| `fastfetch --structure` | 自定义输出结构（逗号分隔的模块顺序） | `fastfetch --structure OS:Host:CPU:GPU:Memory` |
| `fastfetch --format json` | 以 JSON 格式输出，便于脚本解析 | `fastfetch --format json` |
| `fastfetch --format jsonc` | 以 JSONC（带注释 JSON）格式输出 | `fastfetch --format jsonc` |
| `fastfetch --list-presets` | 列出所有内置配置预设 | `fastfetch --list-presets` |
| `fastfetch --preset <name>` | 使用指定预设配置 | `fastfetch --preset mac` |
| `fastfetch --config <path>` | 使用自定义配置文件 | `fastfetch --config ~/.config/fastfetch/config.jsonc` |
| `fastfetch --help` | 显示完整帮助信息 | `fastfetch --help` |
| `fastfetch --version` | 显示版本号 | `fastfetch --version` |

## 四、实际示例

### 示例 1：基础使用（默认输出）

```bash
# 直接在终端运行，查看本机系统信息
fastfetch
```

运行后终端会显示类似下面的输出：操作系统、主机名、内核版本、Uptime、CPU、GPU、内存、磁盘、终端、Shell 等信息，左侧带苹果 logo（macOS 上）。

### 示例 2：隐藏 Logo，只显示信息

```bash
# 某些场景下（如脚本日志中）不需要 logo，可以隐藏
fastfetch --logo none
```

输出将不再显示 ASCII 艺术 logo，只保留各项系统信息，适合嵌入脚本或管道处理。

### 示例 3：以 JSON 格式输出供脚本解析

```bash
# 将系统信息导出为 JSON，交给 jq 等工具处理
fastfetch --format json | jq '.host'           # 提取主机名等信息
fastfetch --format json | jq '.cpu'            # 提取 CPU 信息
```

这会输出结构化的 JSON 数据，方便在 shell 脚本、CI 流程中自动化采集系统信息。

### 示例 4：生成自定义配置文件

```bash
# 首次生成默认配置文件到标准位置，然后编辑
fastfetch --gen-config

# 查看生成位置（macOS/Linux 常见路径）
cat ~/.config/fastfetch/config.jsonc
```

`--gen-config` 会在 `~/.config/fastfetch/config.jsonc` 生成一份带完整注释的默认配置，你可以在此基础上修改 logo、模块顺序、显示样式等。

## 五、进阶技巧与配置

### 1. 使用预设快速切换外观

```bash
# 查看所有可用预设
fastfetch --list-presets

# 使用 macOS 风格预设
fastfetch --preset mac
```

预设文件位于 fastfetch 安装目录下的 `presets/` 目录中（可通过 `brew --prefix fastfetch` 查看安装路径）。你也可以将自己的配置以 `*.jsonc` 放入 `~/.config/fastfetch/` 目录，用 `--preset 文件名` 调用。

### 2. 结合 shell 启动文件自动展示

在 `~/.zshrc` 或 `~/.bashrc` 末尾追加一行，登录终端时自动显示系统信息：

```bash
fastfetch --logo none
```

因为 fastfetch 启动极快（毫秒级），不会明显拖慢 shell 启动速度。

### 3. 模块结构自定义

配置文件中的 `structure` 字段控制显示顺序与内容，例如只显示常用模块：

```bash
fastfetch --structure OS:Host:Uptime:Kernel:CPU:Memory:Shell
```

你还可以在配置文件中为每个模块单独设置颜色、标签（key）、是否显示等细节。

### 4. 环境变量与主题色

fastfetch 支持通过环境变量调整部分行为，例如：

```bash
# 强制输出无颜色（用于管道或日志）
NO_COLOR=1 fastfetch

# 设置终端列数/宽度以调整 logo 缩放
COLUMNS=80 fastfetch
```

同时支持 `--title-color`、`--key-color` 等参数控制输出配色，可配合终端主题做统一风格。

### 5. 深入：配置文件逐模块精调

`fastfetch --gen-config` 生成的默认 `config.jsonc` 是理解 fastfetch 配置的最佳入口。核心结构如下（JSONC 支持 `//` 注释与尾逗号）：

```jsonc
// ~/.config/fastfetch/config.jsonc
{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/dev/doc/json_schema.json",
  "logo": {
    "type": "auto",          // auto / small / tiny / none / 具体路径
    "color": {
      "type": "auto"          // auto 跟随主题 / 指定颜色名 / 十六进制
    },
    "padding": { "top": 0, "left": 0 }
  },
  "display": {
    "separator": " → ",       // 键与值之间的分隔符
    "color": {
      "keys": "green",        // 左侧 key 的颜色
      "values": "default"     // 右侧 value 的颜色
    }
  },
  "modules": [
    { "type": "title", "color": { "title": "cyan" } },
    { "type": "os", "key": "OS" },
    { "type": "host", "key": "Host" },
    { "type": "cpu", "key": "CPU" },
    { "type": "memory", "key": "Memory" },
    { "type": "break" }        // 换行，控制左右布局
  ]
}
```

**常用模块 type 一览**：`title`、`separator`、`os`、`host`、`kernel`、`uptime`、`cpu`、`gpu`、`memory`、`disk`、`display`（分辨率）、`terminal`、`terminalfont`、`shell`、`wm`、`de`、`theme`、`icons`、`font`、`localip`、`publicip`、`break`（换行）、`blank`（空行）。

**给某个模块改标签与颜色**：

```jsonc
{ "type": "cpu", "key": "处理器", "color": { "key": "yellow" } }
```

**临时用命令行覆盖配置**（不改文件）比改配置更快，适合试效果：

```bash
# 只改分隔符 + 键颜色
fastfetch --separator ' → ' --key-color yellow

# 只显示指定模块
fastfetch --structure OS:CPU:Memory --logo small
```

### 6. 深入：自定义 Logo（ASCII 艺术 / 图片）

fastfetch 的 logo 高度灵活，是"个性化"的重头戏。常用四种方式：

**① 用内置 logo 类型**

```bash
fastfetch --logo small            # 缩小版系统 logo
fastfetch --logo tiny             # 最小 logo
fastfetch --logo none             # 隐藏 logo
fastfetch --logo retro            # 复古风格
```

**② 用一张图片作为 logo（需装 `chafa`）**

`chafa` 能把图片转成终端字符画。fastfetch 检测到图片路径时会调用它渲染：

```bash
# brew install chafa
fastfetch --logo /path/to/your.png

# 在配置文件里写死
# "logo": { "type": "/home/me/pics/logo.png", "width": 40 }
```

**③ 自定义 ASCII 文字 logo**

用 `toilet` 或 `figlet` 把文字生成 ASCII 艺术，再喂给 fastfetch：

```bash
# brew install toilet
# 生成文字 logo（showfigfonts 可列出字体）
toilet -f mono12 -F metal "MYHOST" > ~/.config/fastfetch/mylogo.txt

# 在配置里指定该文字文件
# "logo": { "type": "/Users/wangbo/.config/fastfetch/mylogo.txt" }
```

**④ 手写一个纯文本 logo 文件**

logo 文件就是普通文本，一行行摆放字符即可，换行控制高度，空格控制宽度：

```text
# ~/.config/fastfetch/neko.txt
 /\_/\
( o.o )
 > ^ <
```

**给 logo 上色**（在配置或命令行）：fastfetch 的 logo 颜色跟随主题自动取色，也可显式指定：

```bash
# 命令行指定 logo 颜色（颜色名 / 十六进制均可）
fastfetch --logo-color cyan
fastfetch --logo-color '#ff5500'
```

### 7. 深入：模块级颜色与 theme 色

fastfetch 没有独立"主题文件"，但可用 `.jsonc` 配置文件充当"主题"——把整套颜色/logo/结构存成一个文件，随 `--preset` 或 `--config` 切换：

```bash
# 存一份"浅色终端主题"配置
fastfetch --structure OS:CPU:Memory --key-color black --logo small > /dev/null

# 做成两个预设文件，写进 ~/.config/fastfetch/：
#   light.jsonc / dark.jsonc，用 --preset light / --preset dark 切换
```

**给不同模块配置不同颜色**的完整示例（写入配置文件的 `modules`）：

```jsonc
{ "type": "title",   "color": { "title": "cyan" } }
{ "type": "os",      "color": { "key": "yellow", "value": "default" } }
{ "type": "memory",  "color": { "key": "magenta" } }
{ "type": "disk",    "color": { "value": "blue" } }
```

### 8. 深入：模块级性能与隐私

fastfetch 采集信息时会执行系统命令（如 `sysctl`、`sw_vers`、`system_profiler` 等），个别模块可能有轻微开销或涉及隐私：

```bash
# 用 --structure 只保留必要的，能省去无关采集
fastfetch --structure OS:CPU:Memory

# 不想显示本机 IP 等隐私信息，就不要放 localip / publicip 模块
# 需要公网 IP 的模块会发起网络请求，离线/隐私场景直接删掉
```

### 9. 常用启动别名

把个性化结果固化成别名，一键切换风格：

```bash
# ~/.zshrc
alias ff='fastfetch'
alias ffmini='fastfetch --logo small'
alias ffnone='fastfetch --logo none'
alias ffjson='fastfetch --format json'
alias ffmac='fastfetch --preset mac'
alias ffosx='fastfetch --structure OS:CPU:Memory --separator " " --key-color yellow'
```

## 六、注意事项与常见问题

### 1. 首次运行缺少字体导致 Logo 错位

ASCII logo 对齐依赖等宽字体。如果 logo 出现错位，先检查终端是否使用等宽字体（如 Menlo、JetBrains Mono、Fira Code），或者直接使用 `fastfetch --logo none` 跳过 logo。

### 2. JSON 输出与默认输出差异

`--format json` 输出的是原始数据（键名小写），与默认的人类可读输出字段并不完全一一对应。脚本解析时建议先 `fastfetch --format json` 查看实际字段名，再编写解析逻辑。

### 3. 配置文件语法

配置文件为 JSONC（JSON with Comments）格式，支持 `//` 注释和尾逗号。如果你手动编辑时用了标准 JSON 且带注释，fastfetch 会报解析错误——务必使用 JSONC 语法。

### 4. 性能与频率

fastfetch 本身很轻量，但若在 shell 启动文件中每次打开终端都运行，频繁刷新磁盘/内核信息仍会有少量开销。建议只在交互式登录 shell 中调用，不要放进非交互式脚本（可用 `[[ $- == *i* ]]` 判断）的默认路径里。

### 5. 版本与升级

brew 升级后若遇到输出异常，先运行 `fastfetch --version` 确认版本。如从旧版本升级后配置不兼容，可备份后删除 `~/.config/fastfetch/` 重新生成默认配置，再按需调整。

### 6. 图片 logo 相关报错

| 现象 | 原因 | 解决办法 |
| --- | --- | --- |
| `--logo <图片>` 无输出或乱码 | 未装 `chafa`，或终端不支持真彩 | `brew install chafa`；或换 ASCII 文字 logo |
| 图片缩放失真/超出屏宽 | 未设 `width`/`height` | 配置里给 logo 加 `"width": 40`，或命令行用 `--logo-width 40` |
| 图片 logo 太占面积 | 图比信息区还大 | 用 `--logo-small`，或调小 `width` |

### 7. 换行/布局错乱

`break` 模块（换行）位置决定左右布局。若信息挤在一侧或混行，检查配置里 `break`/`blank` 模块的位置，或命令行用 `--structure` 显式控制顺序。

### 8. 安全注意点

- `publicip` 模块会发起**公网请求**暴露本机出口 IP，涉及隐私或离线环境时**不要**放进默认配置。
- 在共享/展示终端截图时，`host`、`localip`、`publicip` 可能泄露主机名与内网/公网地址，截图前按需精简 `structure`。

## 七、实战：与其它工具搭配与自动化

### 1. 脚本集成：把系统信息喂给 shell 脚本

fastfetch 的 `--format json` 是脚本友好的核心。配合 `jq` 可抽取任意字段：

```bash
# 抽取 CPU 型号
fastfetch --format json | jq -r '.cpu'

# 抽取内存总量（以可读字符串输出）
fastfetch --format json | jq -r '.memory'

# 抽取磁盘使用（第一个盘符）
fastfetch --format json | jq -r '.disk[0]'

# 组装成一行摘要（供写入日志/横幅）
SUMMARY=$(fastfetch --format json | jq -r '[.os, .host, .cpu, .memory] | join(" | ")')
echo "$SUMMARY"
```

### 2. 写进 shell 启动文件（个性化欢迎横幅）

在 `~/.zshrc` / `~/.bashrc` 末尾追加，登录即显示带自定义 logo 的欢迎界面：

```bash
# 只读交互式 shell 触发（非交互脚本不显示）
if [[ $- == *i* ]]; then
  fastfetch --logo small
fi
```

配合自定义 ASCII logo 文件，每次打开终端都是专属"开机画面"。

### 3. 与 `figlet` / `toilet` 组合做动态 banner

```bash
# 先用 toilet 生成当前时间/日期的文字 logo，再让 fastfetch 显示
# 生成一个"今日"文字 logo
toilet -f mono12 "$(date +%m月%d日)" > ~/.config/fastfetch/today.txt
# 用这张动态生成的 logo 显示
fastfetch --logo ~/.config/fastfetch/today.txt
```

### 4. 写进 Makefile 做"环境信息快照"

```makefile
# Makefile
.PHONY: info snapshot

# 显示本机信息
info:
	@fastfetch

# 导出 JSON 快照到文件，供后续脚本消费
snapshot:
	@mkdir -p .meta
	@fastfetch --format json > .meta/sysinfo_$$(date +%Y%m%d_%H%M%S).json
	@echo "已写入 .meta/"
```

### 5. CI 集成：采集 runner 环境信息

在 GitHub Actions / GitLab CI 里用 fastfetch 记录构建环境，便于复现问题：

```yaml
# .github/workflows/ci.yml（片段）
- name: 采集运行环境信息
  run: |
    fastfetch --version
    fastfetch --format json | jq '{os: .os, cpu: .cpu, memory: .memory}' \
      > env-snapshot.json
- name: 上传环境快照
  uses: actions/upload-artifact@v4
  with:
    name: env-snapshot
    path: env-snapshot.json
```

### 6. 与 `neofetch`/`screenfetch` 对比与迁移

从 neofetch 迁移过来时，注意：

```bash
# neofetch 用 --ascii_distro 指定发行版，fastfetch 用 --logo
fastfetch --logo arch        # 指定显示某发行版 logo
# neofetch 的 --off 隐藏 logo，fastfetch 用 --logo none

# 列出 fastfetch 支持的所有 logo 名称（用于 --logo）
fastfetch --list-logos | head
```

### 7. 生产级实践建议

- **让 `--format json` 成为脚本标准接口**：一切自动化采集（CI、日志、监控）都走 JSON，别解析彩色人类文本。
- **用配置文件取代一堆命令行参数**：把 logo、颜色、结构沉淀进 `~/.config/fastfetch/config.jsonc`，多机同步，处处一致。
- **自定义 logo 纳入 dotfiles 仓库**：ASCII logo 文件、图片、配置文件一起版本管理，换机一键恢复。
- **区分"交互欢迎"与"脚本取数"两套**：交互式 shell 用带 logo 的美观配置；脚本/cron 用 `--format json` 精简结构，互不干扰。
- **控制采集副作用**：默认配置里避免 `publicip`（公网请求）等有副作用/隐私模块，确需时按场景临时开启。
- **升级后重新 `--gen-config` 对比**：每次 brew 升级后跑一次 `fastfetch --gen-config --config /tmp/newcfg.jsonc` 与旧配置 diff，及时发现新增/变更字段。