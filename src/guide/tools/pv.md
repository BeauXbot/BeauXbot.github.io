---
title: pv
icon: gauge
category:
  - 工具
  - 管道工具
tag:
  - 系统与效率
  - pv
---

# pv 命令使用教程（版本 1.10.2）

> **pv**（Pipe Viewer）是一个基于终端的管道监视器，它通过一条管道传输数据，并显示进度信息：当前传输速率、已用时间、剩余时间、完成百分比和传输总量。它常用于监控大型文件复制、压缩解压、数据库导入、备份恢复等耗时任务的实时进度。

## 一、它是什么

`pv` 全称 **Pipe Viewer**，是一个小巧而强大的命令行工具。它的核心作用是**夹在管道中间监视数据流量**，让你实时看到数据从一端流向另一端的速度和进度。

典型应用场景：

- 监控 `tar`、`gzip`、`bzip2`、`xz` 等压缩/解压过程的实时进度；
- 监控大文件复制（`cp`）、`dd` 镜像写入的进度；
- 监控 MySQL/PostgreSQL 数据库导入、逻辑备份的进度；
- 监控网络传输、日志流等任何管道数据的流量；
- 需要限速（如限制磁盘 IO 或网络带宽）的场景。

## 二、安装与升级

通过 Homebrew 安装、升级、卸载：

```bash
# 安装 pv
brew install pv

# 升级 pv
brew upgrade pv

# 卸载 pv
brew uninstall pv
```

验证安装成功并查看版本：

```bash
pv --version
```

输出示例：

```
pv 1.10.2 - Copyright 2024 Andrew Wood
```

> 提示：如果你的 Homebrew 尚未安装，请先参考 [brew.sh](https://brew.sh) 安装 Homebrew。
>
> 在 Linux 发行版上也可通过系统包管理器安装（如 `apt install pv` / `yum install pv` / `dnf install pv`）。

## 三、常用命令速查

| 参数 | 说明 | 示例 |
|------|------|------|
| `-p` | 显示进度百分比（默认开启） | `pv -p file` |
| `-t` | 显示已用时间 | `pv -t file` |
| `-r` | 显示当前传输速率 | `pv -r file` |
| `-e` | 显示已消耗时间 | `pv -e file` |
| `-b` | 显示已传输字节数 | `pv -b file` |
| `-a` | 显示平均传输速率 | `pv -a file` |
| `-s SIZE` | 指定预期总大小（配合百分比使用） | `pv -s 1G file` |
| `-n` | 以纯数字输出（适合脚本解析） | `pv -n file` |
| `-q` | 安静模式，仅显示错误信息 | `pv -q file` |
| `-L RATE` | 限制传输速率（如 `-L 10m` 表示 10MB/s） | `pv -L 10m file` |
| `-c` | 使用光标定位（配合多行信息刷新） | `pv -c file` |
| `-N NAME` | 为进度条命名（多管道任务区分） | `pv -N "copy" file` |
| `-w WIDTH` | 指定终端宽度 | `pv -w 80 file` |
| `-f` | 强制显示（标准输出非终端时也显示） | `pv -f file` |

最常用的组合是把多个参数叠加，例如 `pv -ptebar file` 会同时显示百分比、时间、字节数、速率、平均速率和进度条。

**其他实用参数补充**：

| 参数 | 说明 | 示例 |
|------|------|------|
| `-B BYTES` | 设置缓冲区大小（默认 512KiB） | `pv -B 4M file` |
| `-R PID` | 绑定到指定 PID 的已运行 pv 进程 | `pv -R 12345` |
| `-i SECS` | 设置刷新间隔秒数（配合 `-c` 使用） | `pv -i 2 -c file` |
| `-E ERRS` | 允许忽略指定数量的传输错误 | `pv -E 5 file` |
| `-y` | 跳过提示（当输入不是常规文件时） | `pv -y file` |
| `-T` | 配合 `-R` 从目标进程读取计时信息 | `pv -R PID -T` |
| `-W` | 等待数据到达后再开始显示 | `pv -W file` |

## 四、实际示例

### 示例 1：监视大文件复制进度

```bash
# 准备一个测试文件（生成 200MB 随机数据）
dd if=/dev/zero of=/tmp/bigfile bs=1M count=200

# 用 pv 监视复制进度
pv /tmp/bigfile > /tmp/bigfile.copy
```

执行后你会看到类似下面的实时输出：

```
 200MiB 0:00:00 [ 585MiB/s] [============================>] 100%
```

### 示例 2：监视 tar 打包解压进度

```bash
# 打包并监视进度（把目录打包成 tar 文件）
tar -cf - /path/to/your/folder | pv -s $(du -sb /path/to/your/folder | awk '{print $1}') > backup.tar

# 解压并监视进度（先看压缩包大小）
ls -lh backup.tar
# 假设压缩包大小为 1.2G，则：
pv backup.tar | tar -xf - -C /path/to/extract/
```

**小技巧**：`-s` 参数指定总大小，这样 `tar` 打包时才能正确显示百分比。

### 示例 3：限速传输（限制 IO 或带宽）

```bash
# 限制复制速度为 10MB/s
pv -L 10m /tmp/bigfile > /tmp/bigfile.slow

# 结合 ssh 限制传输带宽（避免占满带宽）
pv -L 5m /tmp/bigfile | ssh user@host "cat > /tmp/bigfile.remote"
```

### 示例 4：数据库导入进度监视

```bash
# 导入 SQL 到 MySQL 并监视进度（先看文件大小）
ls -lh /tmp/dump.sql
# 假设文件为 800M
pv /tmp/dump.sql | mysql -u root -p your_database

# 带总大小信息，显示百分比
pv -s 800M /tmp/dump.sql | mysql -u root -p your_database
```

## 五、进阶技巧与配置

### 1. 用 `-n` 输出纯数字方便脚本处理

`-n` 模式每次输出一个数字（0-100），配合循环可以做成简易监控脚本：

```bash
pv -n /tmp/bigfile > /tmp/out | while read i; do
  echo "已完成 $i%"
done
```

### 2. 多管道任务用 `-N` 命名区分

多个管道并行时，用 `-N` 给每个进度条命名，避免混淆：

```bash
pv -N "file1" /tmp/a > /tmp/a.out &
pv -N "file2" /tmp/b > /tmp/b.out &
wait
```

### 3. 用 `-f` 强制显示进度

在非交互式环境（如脚本、CI）中，标准输出不是终端时 `pv` 默认不显示进度。用 `-f` 强制显示：

```bash
# 强制显示进度（适合日志重定向场景）
pv -f /tmp/bigfile > /tmp/out 2>&1
```

### 4. 与 tar + 加密工具组合

```bash
# 加密压缩并监视进度
tar -cf - /path/to/folder | pv -s $(du -sb /path/to/folder | awk '{print $1}') | gzip -9 > backup.tar.gz

# 配合 openssl 加密
tar -cf - /path/to/folder | openssl enc -aes-256-cbc -salt | pv -N "encrypt" > backup.enc
```

### 5. 配置文件与环境变量

- pv 没有全局配置文件，所有行为都通过命令行参数控制。
- 支持环境变量 `PV_DISPLAY` 设置默认显示选项，例如 `export PV_DISPLAY="-pteb"` 后，所有 pv 调用默认显示百分比、时间、字节数和速率。
- 也支持 `PV_ESCAPE`（设置转义序列）、`PV_SLEEP`（设置刷新间隔毫秒数）等环境变量。

#### 常用环境变量一览

| 环境变量 | 作用 | 示例 |
|---------|------|------|
| `PV_DISPLAY` | 设置默认显示选项 | `export PV_DISPLAY="-ptebar"` |
| `PV_SLEEP` | 设置两次刷新之间的毫秒间隔 | `export PV_SLEEP=1000` |
| `PV_ESCAPE` | 设置用于状态行更新的转义序列 | `export PV_ESCAPE="\033[K"` |
| `PV_REMOTE` | 远程输出模式（配合 `-f`） | `export PV_REMOTE=1` |
| `PV_WATCH` | 从标准输入读取并在屏幕上监视数据 | `export PV_WATCH=1` |
| `PV_RSIZE` | 设置接收缓冲区大小 | `export PV_RSIZE=1048576` |
| `PV_WSIZE` | 设置发送缓冲区大小 | `export PV_WSIZE=1048576` |

把这些环境变量写入 `~/.bashrc`、`~/.zshrc` 或 `~/.profile` 即可实现持久化个性化配置。例如：

```bash
# ~/.zshrc
export PV_DISPLAY="-ptebar"        # 默认显示所有主要信息
export PV_SLEEP=500               # 每 500ms 刷新一次
```

#### 缓冲大小与性能调优

- 默认缓冲区大小为 512 KiB，对大多数场景足够。
- 在高吞吐管道（如 NVMe、内存盘）上，适当调大缓冲区可减少系统调用开销：

```bash
pv -B 8M /dev/nvme0n1 > disk.img   # 用 8MiB 缓冲区
```

- 批量使用 pv 时，建议在 shell 配置里设置 `PV_SLEEP` 为 100~500ms，既能看到流畅进度，又不浪费 CPU。

#### 组合显示选项的建议

- 日常交互用 `pv -ptebar file`：百分比、时间、字节、速率、平均速率、进度条一应俱全。
- 网络传输用 `pv -rab file`：速率与平均值对带宽判断最直观。
- 脚本内用 `pv -n file` 或 `pv -q file`：避免污染输出。

### 6. 多流进度显示（`-c` 光标控制 + `-i` 刷新间隔）

`pv` 支持在多个管道同时运行时，在同一个终端区域刷新各自的进度条：

```bash
# 同时监控两个文件的复制进度
pv -c -N "a" /tmp/a > /tmp/a.out &
pv -c -N "b" /tmp/b > /tmp/b.out &
wait
```

配合 `-i` 指定刷新间隔，减少频繁重绘：

```bash
pv -c -i 1 -N "copy" /tmp/big > /tmp/out
```

> 注意：`-c` 依赖光标定位，必须输出到终端（或配合 `-f` 在合适环境使用），否则进度条会错乱。

### 7. 精确计算目录大小的可移植写法

`du -sb` 在部分系统（如 macOS 的 BSD `du`）上没有 `-b` 参数。跨平台可用 `stat` 或 `find` 替代：

```bash
# Linux（GNU stat）
tar -cf - folder | pv -s $(stat -c%s folder) > folder.tar

# macOS（BSD stat）
tar -cf - folder | pv -s $(stat -f%z folder) > folder.tar
```

## 六、注意事项与常见问题

### 1. 没有显示百分比 / 进度不动

- **原因**：`pv` 不知道数据总量时无法计算百分比。
- **解决**：用 `-s` 指定总大小，例如 `pv -s 500M file`。

### 2. 输出乱码或重叠

- **原因**：多行刷新在非终端环境下出错。
- **解决**：脚本中使用 `-n`（纯数字）或 `-q`（安静），交互终端下可加 `-c` 启用光标控制。

### 3. `-s` 与 `du` 的大小不一致导致百分比不准

- **原因**：`du -sb` 统计的是实际磁盘占用，与文件逻辑大小可能略有差异（如稀疏文件）。
- **解决**：用 `stat -c%s file` 获取文件逻辑大小：`pv -s $(stat -c%s file) file`。

### 4. 性能与 IO 开销

- `pv` 本身开销极低，但在高速管道（如 NVMe 磁盘）上，默认的刷新频率可能略影响吞吐。
- 通过环境变量 `PV_SLEEP` 调大刷新间隔可降低开销：`export PV_SLEEP=1000`（毫秒）。
- 对极致吞吐的场景，可同时调大缓冲区：`pv -B 4M -i 2 -f file`。

### 5. 限速时注意单位

- `-L` 的单位是字节/秒，支持 `k`、`m`、`g` 后缀（如 `-L 10m` 表示 10 MB/s，即每秒 10 兆字节），不要与比特混淆（网络带宽常用 `Mb/s`）。
- 当 `-L` 限制速率低于数据读取能力时，`pv` 会主动节流，可能让进度条看起来"卡住"，这是正常现象。

### 6. 管道退出码

- 当上游命令失败时，`pv` 仍可能成功退出，导致下游继续执行。若需严格判断，可用 `set -o pipefail`（bash）让管道返回第一个失败命令的退出码。

### 7. 文件大小未知且非流式输入

- **现象**：直接把 `pv` 接在某个命令后（如 `some_cmd | pv > out`），只见速率、不见百分比。
- **原因**：`pv` 无法预知总量。
- **解决**：若上游能估算总量，手动 `-s`；否则接受无百分比状态，用 `-pt` 显示时间与速率即可。

### 8. 多流进度条串行/重叠

- **现象**：多个 `pv` 后台并行，进度条互相覆盖、混在一起。
- **原因**：每个 `pv` 独立刷新同一行。
- **解决**：全部加 `-c` 并放在同一终端，或用 `-N` 命名区分；脚本中建议改用 `-n` 各自输出。

### 9. `-L` 限速与稀疏文件/空洞

- **现象**：对包含大量空洞的文件限速复制，速度显示异常。
- **原因**：`pv` 仍会逐字节读取空洞，拖慢整体速度。
- **解决**：如需跳过空洞，先用 `cp --sparse=always`（GNU cp）或 `rsync -S` 处理，再交给 `pv` 监视。

### 10. 常见报错及应对

- `pv: No such file or directory`：文件路径错误，检查拼写。
- `pv: Permission denied`：无读取权限，加 `sudo` 或用对应用户运行。
- `pv: Interrupted`：收到中断信号（如 Ctrl+C），管道任务随之终止，属于正常行为。
- `pv: /dev/stdin: ...`：输入无法读取，确认使用 `<` 重定向或命名管道方式。

## 七、实战：与其它工具搭配与自动化

### 1. 与 `dd` 配合做磁盘/分区镜像并限速

```bash
# 备份整块磁盘到镜像文件，限速避免影响线上服务
sudo dd if=/dev/sda bs=4M | pv -s $(sudo blockdev --getsize64 /dev/sda) | dd of=/backup/sda.img bs=4M

# 恢复镜像并监视进度
pv /backup/sda.img | sudo dd of=/dev/sda bs=4M
```

### 2. 与 `tar` 配合做远程备份（网络流式）

```bash
# 本地打包 + 远程解包，全程显示进度
tar -cf - /data | pv -s $(du -sb /data | awk '{print $1}') | ssh user@host "tar -xf - -C /backup"

# 限制网络带宽为 2MB/s
tar -cf - /data | pv -L 2m -s $(du -sb /data | awk '{print $1}') | ssh user@host "cat > /backup/data.tar"
```

### 3. 配合 `gzip`/`xz` 压缩解压

```bash
# 压缩并显示进度（用实际大小做 -s 基数，注意是压缩前大小）
tar -cf - /data | pv -s $(du -sb /data | awk '{print $1}') | gzip -9 > data.tar.gz

# 解压压缩包并显示进度
pv data.tar.gz | gzip -dc | tar -xf - -C /restore
```

### 4. 网络下载限速（配合 `curl`）

```bash
# 用 curl 下载并通过 pv 限速（限制为 5MB/s）
curl -sL https://example.com/big.iso | pv -L 5m > /tmp/big.iso

# 结合 wget，利用 pv 显示进度
wget -qO- https://example.com/big.iso | pv -b > /tmp/big.iso
```

### 5. 写入共享工作区的脚本化监控

把 pv 的纯数字输出写到文件，供其它脚本轮询，实现"脱离终端"的进度：

```bash
#!/usr/bin/env bash
# monitor.sh —— 把进度写入 progress.log，供其他程序读取
pv -n -f /tmp/bigfile > /tmp/bigfile.copy 2>/tmp/progress.log &
PID=$!
# 模拟下游读取
while kill -0 $PID 2>/dev/null; do
  printf '进度: %s%%\n' "$(tail -1 /tmp/progress.log)"
  sleep 1
done
```

### 6. Makefile 自动化集成

在 Makefile 中用 `pv` 包装耗时的构建/复制步骤，输出进度：

```makefile
BACKUP_DIR  := ./backup
DATA_DIR    := ./data
SIZE_CMD    := du -sb $(DATA_DIR) | awk '{print $$1}'

backup:
	tar -cf - $(DATA_DIR) | pv -s $$($(SIZE_CMD)) > $(BACKUP_DIR)/data.tar
	@echo "备份完成: $(BACKUP_DIR)/data.tar"
```

> 注意：Makefile 中 shell 变量需转义为 `$$`，否则 Make 会提前展开。

### 7. CI 集成（GitHub Actions / GitLab CI）

在 CI 中 pv 默认不输出（非终端），需要 `-f` 强制显示，或改用 `-n` 便于日志分析：

```yaml
# .github/workflows/backup.yml
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - run: sudo apt-get install -y pv
      - run: |
          tar -cf - ./data | pv -f -s $(du -sb ./data | awk '{print $1}') | gzip -9 > data.tar.gz
      - uses: actions/upload-artifact@v4
        with:
          name: backup
          path: data.tar.gz
```

> 在 CI 中建议输出到日志时关闭进度条重绘，仅保留总字节和速率：`pv -f -b -a ...`。

### 8. 批量处理多个文件（循环 + 并行）

```bash
# 串行：逐个文件限速复制
for f in /tmp/data/*.dat; do
  pv -L 10m "$f" > "$f.copy"
done

# 并行：多个文件同时限速复制（配合 -N 区分）
for f in /tmp/data/*.dat; do
  pv -c -N "$(basename $f)" "$f" > "$f.copy" &
done
wait
```

### 9. 生产级实践要点

- **限速**：任何可能影响生产服务的复制/传输都加上 `-L` 限速，避免占满磁盘 IO 或带宽。
- **缓冲**：大文件备份用 `-B 4M`~`-B 8M` 提升吞吐。
- **退出码**：在脚本顶部加 `set -o pipefail`，确保管道任一段失败都返回非零退出码，CI 才能正确判失败。
- **日志友好**：脚本/CI 中统一用 `-n`（纯数字）或 `-b`（仅字节），便于机器解析。
- **权限**：涉及系统设备（如 `/dev/sda`）务必用 `sudo`，并在 `dd` 时核对目标设备，避免误覆盖。

## 参考链接

- [pv 官方文档（man page）](https://www.ivarch.com/programs/pv.shtml)
- [Homebrew pv 页面](https://formulae.brew.sh/formula/pv)