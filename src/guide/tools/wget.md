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

# 密码走环境变量，避免明文出现在 history 或进程列表（/proc 或 ps 中可见）
export WGET_PASSWORD='secret'
wget --user=alice --password="$WGET_PASSWORD" https://example.com/private/file

# 走 HTTP 代理（也可用环境变量 HTTPS_PROXY）
wget -e use_proxy=yes -e http_proxy=http://127.0.0.1:7890 https://example.com/a.zip

# 基于 Cookie 的会话认证：先保存登录后的 Cookie 再携带
wget --save-cookies cookies.txt --keep-session-cookies \
     --post-data='user=alice&pass=secret' \
     https://example.com/login
wget --load-cookies cookies.txt https://example.com/members-only/page.html
```

### 2. 覆盖与反爬策略
默认 wget 的 UA 是 `Wget/1.25.0`，部分站点会拦截。用 `-U` 伪装浏览器 UA、用 `--header` 附加自定义请求头：
```bash
wget -U "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
     --header="Referer: https://example.com/" \
     https://example.com/restricted/file.pdf

# 组合多个请求头，模拟真实浏览器请求
wget -U "$UA" \
     --header="Accept: text/html,application/xhtml+xml" \
     --header="Accept-Language: zh-CN,zh;q=0.9,en;q=0.8" \
     --header="Cookie: session=abc123" \
     https://example.com/page
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
wget 支持全局配置，把常用参数写进 `~/.wgetrc` 可免去每次敲参数。配置文件的作用域依次为：系统级 `/etc/wgetrc` → 用户级 `~/.wgetrc`（后者覆盖前者），命令行参数优先级最高。**命令行写法与配置文件的对应规则**：命令行中的长选项 `--user_agent=xxx` 在配置文件中去掉 `--` 并把 `-` 换成 `_` 即可，如 `--timeout` → `timeout`。
```text
# ~/.wgetrc 示例内容
use_proxy = on
http_proxy = http://127.0.0.1:7890
https_proxy = http://127.0.0.1:7890
user_agent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
quiet = off
limit_rate = 500k

# ---- 进阶：下载行为 ----
# 断点续传默认开启
continue = on
# 服务器不支持续传时，强制删除并重下（配合 continue）
# （在配置里写 continue=on 后，不要再用 -c；否则会报“已是最新”而跳过）
# 重试次数与超时
tries = 5
timeout = 60
waitretry = 10
# 重试间隔基准（秒），配合 --waitretry 实现指数退避
# 默认 5 个并发连接、单文件不分片
max_redirect = 20
# 递归抓取的默认深度限制（慎开全局递归，否则每个命令都递归）
recursive = off
# 时间戳对比，仅下载更新的文件
timestamping = on
# 不进入父目录
no_parent = on
# 日志文件路径
output_document = /dev/stdout
# 保存 HTML 页面所需的资源
page_requisites = on
# 把下载的 HTML 转成本地可浏览的相对链接
convert_links = on
# 配置代理认证（如代理需要用户名密码）
proxy_user = myproxy
proxy_password = myproxysecret
```
> 提示：全局打开 `continue = on` 后，个别命令想强制重下可用 `--no-clobber` 的相反行为，或临时用命令行 `--continue`/不续传覆盖；多配置文件可用 `wget --config=my.conf` 指定，或 `--no-config` 完全忽略配置文件。

### 5. 下载策略：限速、限时、限重试
对大文件或慢网络，控制带宽与超时很关键：
```bash
# 限速（支持 k/M/G 单位），避免占满家庭/办公带宽
wget --limit-rate=300k https://example.com/big.iso

# 分时段限速：24 小时内每天凌晨限速最狠
wget --limit-rate=300k --timeout=120 https://example.com/big.iso

# 限制总下载量（bytes），超出即中止，适合按量计费网络
wget --quota=500m https://example.com/iso/*.iso

# 设定各类超时（连接/读取/总时长），单位秒
wget --connect-timeout=10 --read-timeout=30 --timeout=120 https://example.com/a.iso

# 失败重试 + 指数退避（等待间隔每次翻倍）
wget --tries=10 --waitretry=5 https://unstable.example.com/a.iso

# 完全静默 + 遇到失败返回非零退出码，便于脚本判断
wget -q --tries=3 https://example.com/a.txt && echo OK || echo FAIL
```

### 6. 多连接与并行下载
wget 1.x 对单个文件**不支持**分片多连接，但可对多个 URL 并行（后台模式），或用 wget2 / axel / aria2 实现单文件分片：
```bash
# 1. 并行下载多个文件：每个 -b 独立后台 + 独立日志
wget -b -o dl_a.log url_a
wget -b -o dl_b.log url_b
wget -b -o dl_c.log url_c

# 2. 单文件分片并行：wget2 原生支持
wget2 --max-threads=8 https://example.com/big.iso

# 3. 或用 aria2 做分片下载（更主流，-x 指定每文件连接数）
aria2c -x 16 -s 16 https://example.com/big.iso
```

### 7. 基于时间戳的增量抓取与镜像同步
利用 `-N`/`--timestamping` 只下载更新的文件，实现轻量增量同步：
```bash
# 只下载比本地更新的文件（HTTP 与 FTP 均支持）
wget -N -m https://example.com/files/

# -m（镜像）等价于 -r -N -l inf -np，适合整站镜像
wget -m -k -p -e robots=off https://example.com/

# 结合 cron 每日增量镜像：只拉新增/变更，配合 --wait 礼貌抓取
# 0 3 * * * cd ~/mirror && wget -N -m --wait=1 --limit-rate=500k https://example.com/
```

### 8. 输出格式与日志轮转
wget 的进度/日志可定制，方便接入自动化与日志系统：
```bash
# 进度条风格：bar / dot（适合管道日志）/ none
wget --progress=bar https://example.com/a.iso
wget --progress=dot:mega https://example.com/a.iso   # 每 1M 一个点

# 指定日志文件（后台与前台都可）
wget -o /var/log/wget_dl.log https://example.com/a.iso

# 追加而非覆盖日志（--append-output）
wget -a /var/log/wget_all.log https://example.com/b.iso

# 内容同时发到 stdout 和日志
wget -o dl.log https://example.com/a.iso
```

## 六、注意事项与常见问题

### 1. 断点续传的前提是服务器支持
`-c` 依赖服务器的 `Range`/`Accept-Ranges` 支持。若服务器不支持续传，`-c` 会从头重下并可能把已有文件**追加**坏——此时应先删除损坏文件再重下。排查：先看响应头里有没有 `Accept-Ranges: bytes`。
```bash
# 用 curl 检查服务器是否支持断点续传
curl -sI https://example.com/big.iso | grep -i 'accept-ranges'
# 输出 accept-ranges: bytes 则支持；无该头则不支持，需删掉旧文件再重下
```

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
配合 `-e robots=off` 可忽略对方的 `robots.txt` 限制，但**仅在确实需要且不违法/不违规时**使用——默认 wget 会遵守 robots.txt。

### 4. 后台下载后要记得清理日志
`-b` 后台模式会把日志写入当前目录的 `wget-log`，每次后台任务都会覆盖这个同名文件。若同时跑多个后台任务，改用 `-o` 指定各自日志，避免相互覆盖：
```bash
wget -b -o dl_a.log url_a
wget -b -o dl_b.log url_b
```

### 5. 文件名冲突与覆盖陷阱
默认 wget 若发现本地已有同名文件会**静默跳过**（不覆盖）。想覆盖旧文件：
```bash
# 强制覆盖
wget -O file.zip https://example.com/file.zip

# 让 wget 生成唯一名（file.zip.1、file.zip.2 ...）
wget --content-disposition https://example.com/file.zip
```

### 6. 编码/中文文件名乱码
部分站点文件名是 URL 编码的（`%E4%B8%AD` 等），wget 默认按原始字节保存，导致中文名乱码。可让 wget 从响应头 `Content-Disposition` 解析文件名：
```bash
wget --content-disposition 'https://example.com/文件.pdf'
```
若服务器不给 `Content-Disposition` 头，需配合 `-O` 手工指定正确文件名。

### 7. 动态渲染页面下载不完整
wget 只拉取静态 HTML，**不会执行 JavaScript**。对 SPA 站点（React/Vue）或需要 JS 渲染内容的页面，wget 拿到的往往只有空壳骨架。此时应改用 curl + 浏览器渲染工具（如 Playwright/Puppeteer）或直接下载站点提供的 API/导出文件。

### 8. 性能与安全提示
- **限速**：大批量抓取务必 `--limit-rate` + `--wait`，既保护自己也避免被封。
- **不轻易关证书校验**：`--no-check-certificate` 等于放弃 HTTPS 完整性，仅限已知内网。
- **密码保密**：`--password` 会出现在 shell history 与 `ps` 输出，敏感密码改用环境变量或 `--password=$(cat secret)`。
- **磁盘空间**：递归镜像前先用 `du -sh .` 评估磁盘余量，`--quota` 可设总下载上限。

## 七、实战：与其它工具搭配与自动化

### 1. 与 pv 搭配：直观限速与进度监控
`wget` 自带进度条，但配合 `pv`（Pipe Viewer）可精确控制流速并显示累计吞吐：
```bash
brew install pv   # 若未安装

# 用 pv 做限速（-L 每秒字节数，-r -b 显示速率与累计）
wget -qO- https://example.com/big.iso | pv -L 200k -r -b > big.iso

# 下载 tar 包直接流式解压，边下边看进度
wget -qO- https://example.com/app.tar.gz | pv -L 300k | tar -xz -C ./app
```

### 2. 与 curl 对比与互补
- **wget**：擅长递归、镜像、断点续传、后台、批量列表下载。
- **curl**：擅长单次请求、上传、POST/API、输出到 stdout、单行管道。
实际中常混用：wget 负责批量拉文件，curl 负责调用 API：
```bash
# 用 curl 拿下载地址，再用 wget 批量下载
curl -s https://api.example.com/versions | grep -o 'https://[^"]*' > urls.txt
wget -i urls.txt -P ./dist/
```

### 3. 与 aria2 协作做高速分片下载
wget 单文件不分片，大批量/大文件场景可交给 aria2：
```bash
# 先用 wget 抓列表，再交给 aria2 并行分片
wget -q https://example.com/manifest.txt -O- > files.txt
aria2c -i files.txt -x 8 -s 8 -d ./downloads

# 断点续传交给 aria2（其 -c 默认开启）
aria2c -c -x 16 https://example.com/ubuntu.iso
```

### 4. Makefile / 脚本自动化
把下载逻辑封装进 Makefile，配合哈希校验保证产物正确：
```makefile
# Makefile 片段
VERSION := 1.23.4
PKG := go1.$(VERSION).darwin-arm64.tar.gz
URL := https://go.dev/dl/$(PKG)
SHA := $(shell grep "$(PKG)" checksums.txt | awk '{print $$1}')

.PHONY: fetch verify
fetch: $(PKG)

$(PKG):
	wget -O $@ $(URL)

verify: fetch
	echo "$(SHA)  $(PKG)" | shasum -a 256 -c -   # 校验 SHA-256
```
脚本里建议**显式检查退出码**，避免半成品被后续步骤误用：
```bash
# download.sh —— 带重试与状态检查
#!/bin/bash
set -euo pipefail
URL="$1"; OUT="$2"
for i in 1 2 3; do
  wget -q -O "$OUT.part" "$URL" && mv "$OUT.part" "$OUT" && break
  echo "retry $i ..."; sleep $((i*3))
done
test -s "$OUT" && echo "OK: $OUT" || { echo "download failed"; exit 1; }
```

### 5. CI 集成（GitHub Actions）
在 CI 中下载依赖产物并做校验：
```yaml
# .github/workflows/dl.yml 片段
name: fetch-assets
on: [push]
jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Download assets
        run: |
          wget --tries=3 --timeout=30 \
               --header="Authorization: token ${{ secrets.PAT }}" \
               -P ./assets \
               https://api.github.com/repos/.../asset.zip
      - name: Verify checksum
        run: |
          echo "expected-hash  ./assets/asset.zip" | sha256sum -c -
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          path: assets/
```
CI 里用 `wget` 比 `curl -O` 更适合需要重试、限速、递归下载的镜像/资源场景。

### 6. 批量站点镜像与离线文档
抓取官网文档做成离线包，方便离线查阅：
```bash
# 整站镜像（含资源、转本地链接、忽略 robots、限速礼貌抓取）
wget -m -k -p -e robots=off \
     --wait=1 --random-wait --limit-rate=500k \
     -P ~/docs-offline \
     https://example.com/docs/

# 用 zip 打包成单一归档
cd ~/docs-offline && zip -r docs-offline.zip .
```

### 7. 登录态资源批量下载（认证 + 时间戳 + 日志）
综合前面所有技巧的完整生产级脚本：
```bash
#!/bin/bash
# mirror_download.sh —— 带认证的增量镜像脚本
set -euo pipefail
BASE="https://example.com/members"
DEST="$HOME/mirror"
mkdir -p "$DEST"
wget \
  --load-cookies "$HOME/.wget_cookies.txt" \
  --keep-session-cookies \
  -N -m -np -k -p \
  --wait=1 --random-wait --limit-rate=300k \
  --tries=5 --timeout=30 \
  --user-agent "Mozilla/5.0 ..." \
  -P "$DEST" -o /var/log/wget_mirror.log \
  "$BASE/"
echo "done at $(date)" >> /var/log/wget_mirror.log
```

### 8. wget 已停止维护，可迁移到 wget2
GNU 已于 2024 年停止维护 wget 1.x（1.25.0 为最终版），后续功能（HTTP/2、并发下载、更完善的重试）都在 wget2 上。若需要新特性，可安装：
```bash
brew install wget2
wget2 https://example.com/a.iso   # 用法与 wget 大体兼容

# wget2 特色：并发线程、HTTP/2、更好的重试
wget2 --max-threads=8 --retry-connrefused https://example.com/a.iso
```
日常简单下载用 wget 1.25.0 完全够用；追求新特性与性能建议用 wget2 或 curl。