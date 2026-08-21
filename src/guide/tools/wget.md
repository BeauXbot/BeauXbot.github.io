---
title: wget
icon: gauge
category:
  - 工具
  - 网络工具
tag:
  - 系统与效率
  - wget
---

# wget（命令行文件下载工具）

> Homebrew 版本 1.25.0 ｜ 主页：见官方文档 ｜ 安装：`brew install wget`

## 一、它是什么
wget 是 GNU 项目出品的经典命令行文件下载工具，支持 HTTP、HTTPS 和 FTP 协议，擅长**非交互式**批量下载与断点续传——即使终端断开或脚本后台运行也能继续拉取文件。它主要解决服务器间搬运文件、抓取网页镜像、定时拉取数据包等自动化场景，配合 shell 脚本可完全无人值守。典型应用包括：下载软件包/镜像、爬取整个网站、批量抓取一页上的所有资源、以及用 `cron` 定时同步文件。

## 二、安装与升级
macOS 不自带 wget（预装的是 `curl`），通过 Homebrew 安装后会自动加入 PATH。

```bash
# 安装（默认编译版；如需 HTTPS 支持已内置）
brew install wget

# 验证安装（注意：1.25.0 已是 wget 的最终版本，GNU 已停止维护 wget，改为 wget2）
wget --version
# 期望输出首行：GNU Wget 1.25.0 built on darwin22.6.0

# 查看帮助
wget --help

# 升级（一般不会再有新版）
brew upgrade wget

# 卸载
brew uninstall wget
```

安装后 `wget` 位于 `/opt/homebrew/bin/wget`（Apple Silicon）或 `/usr/local/bin/wget`（Intel）。

## 三、常用命令速查

| 命令 | 参数/说明 | 示例 |
|------|-----------|------|
| `wget <url>` | 下载单个文件到当前目录 | `wget https://example.com/file.zip` |
| `-O` | 指定保存文件名 | `wget -O index.html https://example.com/` |
| `-c` | 断点续传（从上次中断处继续） | `wget -c https://example.com/big.iso` |
| `-b` | 后台下载，日志写入 wget-log | `wget -b https://example.com/a.iso` |
| `-r` | 递归抓取整个网站 | `wget -r -np https://example.com/docs/` |
| `-A` / `-R` | 只接受/拒绝指定后缀 | `wget -r -A jpg,png https://example.com/gallery/` |
| `-P` | 保存到指定目录 | `wget -P ~/downloads https://example.com/a.tar.gz` |
| `--limit-rate` | 限制下载速率（避免占满带宽） | `wget --limit-rate=200k https://example.com/a.iso` |
| `-i` | 从文件读取 URL 列表批量下载 | `wget -i urls.txt` |
| `-q` | 安静模式，不打印进度 | `wget -q https://example.com/a.txt` |

## 四、实际示例

### 示例 1：下载单个文件并重命名
```bash
# 1. 进入下载目录
mkdir -p ~/downloads && cd ~/downloads

# 2. 下载 Go 官方安装包（真实存在的 URL）
wget https://go.dev/dl/go1.23.4.darwin-arm64.tar.gz

# 3. 下载过程中会显示进度条、速度与剩余时间，结束后检查
ls -lh go1.23.4.darwin-arm64.tar.gz
# 输出示例：-rw-r--r--  1 wangbo  staff    61M ... go1.23.4.darwin-arm64.tar.gz

# 4. 用 -O 直接改名保存
wget -O go.tgz https://go.dev/dl/go1.23.4.darwin-arm64.tar.gz
```

### 示例 2：断点续传 + 后台下载大文件
```bash
# 1. 后台下载并限制速度，日志写入 wget-log
wget -b --limit-rate=500k https://releases.ubuntu.com/24.04/ubuntu-24.04.1-desktop-amd64.iso

# 2. 查看后台进度（按需多次执行）
tail -f wget-log

# 3. 若中断，用 -c 续传（会接着已有部分下载，而非重新开始）
wget -c https://releases.ubuntu.com/24.04/ubuntu-24.04.1-desktop-amd64.iso

# 4. 完成后查看文件
ls -lh ubuntu-24.04.1-desktop-amd64.iso
```

### 示例 3：递归抓取一个文档站点（本地镜像）
```bash
# 1. 递归抓取、不上升到父目录、不追外链、转本地可浏览
wget -r -np -k -p -P ./mirror https://example.com/docs/

# 参数说明：
#   -r    递归
#   -np   不进入父目录（--no-parent）
#   -k    把链接转为本地相对链接（--convert-links）
#   -p    下载页面所需的图片/样式等资源（--page-requisites）
#   -P    保存到 ./mirror 目录

# 2. 完成后在浏览器打开镜像首页
open ./mirror/example.com/docs/index.html
```

### 示例 4：从列表批量下载 + 自动命名
```bash
# 1. 准备一个 URL 列表（每行一个地址）
printf '%s\n' \
  'https://example.com/a.zip' \
  'https://example.com/b.zip' \
  'https://example.com/c.zip' > urls.txt

# 2. 批量下载
wget -i urls.txt

# 3. 全部下载完成，查看结果
ls -lh a.zip b.zip c.zip
```

## 五、进阶技巧与配置

### 1. 登录认证与代理
wget 支持 HTTP Basic 认证与常见代理变量，配合环境变量可穿透代理：
```bash
# 基本认证（用户名:密码 形式）
wget --user=alice --password=secret https://example.com/private/file

# 走 HTTP 代理（也可用环境变量 HTTPS_PROXY）
wget -e use_proxy=yes -e http_proxy=http://127.0.0.1:7890 https://example.com/a.zip
```

### 2. 覆盖与反爬策略
默认 wget 的 UA 是 `Wget/1.25.0`，部分站点会拦截。用 `-U` 伪装浏览器 UA、用 `--header` 附加自定义请求头：
```bash
wget -U "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
     --header="Referer: https://example.com/" \
     https://example.com/restricted/file.pdf
```

### 3. 定时任务 + 增量同步（搭配 cron 与 rsync）
wget 常与 `cron` 组合实现每日自动下载，再配合 `rsync` 增量同步到远端：
```bash
# 1. 写一个下载脚本
cat > ~/bin/daily_dl.sh <<'EOF'
#!/bin/bash
cd ~/data
wget -N -q https://example.com/feeds/latest.csv   # -N 仅当远端更新时才下载
rsync -az ~/data/ user@server:/srv/data/
EOF
chmod +x ~/bin/daily_dl.sh

# 2. 加入 crontab，每天凌晨 2 点执行
(crontab -l 2>/dev/null; echo "0 2 * * * /Users/wangbo/bin/daily_dl.sh") | crontab -
crontab -l   # 确认已添加
```

### 4. 配置文件 `~/.wgetrc`
wget 支持全局配置，把常用参数写进 `~/.wgetrc` 可免去每次敲参数：
```text
# ~/.wgetrc 示例内容
use_proxy = on
http_proxy = http://127.0.0.1:7890
https_proxy = http://127.0.0.1:7890
user_agent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
quiet = off
limit_rate = 500k
```
此后所有 wget 调用默认走代理、限速并带该 UA。

## 六、注意事项与常见问题

### 1. 断点续传的前提是服务器支持
`-c` 依赖服务器的 `Range`/`Accept-Ranges` 支持。若服务器不支持续传，`-c` 会从头重下并可能把已有文件**追加**坏——此时应先删除损坏文件再重下。排查：先看响应头里有没有 `Accept-Ranges: bytes`。

### 2. HTTPS 证书与自签名站点
访问自签名或过期证书的站点会报 `ERROR: cannot verify ... not certified`，原因是 wget 默认严格校验证书。**不要**随手用 `--no-check-certificate` 绕过（有中间人风险），应使用 `--ca-certificate` 或安装根证书：
```bash
# 用 CA 证书链验证（推荐）
wget --ca-certificate=/path/to/ca-bundle.crt https://internal.example.com/file

# 仅在内网测试环境才考虑：wget --no-check-certificate https://...
```

### 3. 递归抓取容易爬爆磁盘与带宽
`-r` 不加 `-np`/`-l` 会顺着外链越爬越远，几分钟就能拉下几个 GB 或触发对方服务器封 IP。务必加上 `-np`（不越级）、`-l 1` 等限制深度，并对大批量抓取设置 `--limit-rate` 与 `--wait` 礼貌下载：
```bash
wget -r -np -l 2 --wait=2 --limit-rate=500k https://example.com/
```

### 4. 后台下载后要记得清理日志
`-b` 后台模式会把日志写入当前目录的 `wget-log`，每次后台任务都会覆盖这个同名文件。若同时跑多个后台任务，改用 `-o` 指定各自日志，避免相互覆盖：
```bash
wget -b -o dl_a.log url_a
wget -b -o dl_b.log url_b
```

### 5. wget 已停止维护，可迁移到 wget2
GNU 已于 2024 年停止维护 wget 1.x（1.25.0 为最终版），后续功能（HTTP/2、并发下载、更完善的重试）都在 wget2 上。若需要新特性，可安装：
```bash
brew install wget2
wget2 https://example.com/a.iso   # 用法与 wget 大体兼容
```
日常简单下载用 wget 1.25.0 完全够用；追求新特性与性能建议用 wget2 或 curl。