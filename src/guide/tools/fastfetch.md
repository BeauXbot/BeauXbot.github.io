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