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

### 5. 限速时注意单位

- `-L` 的单位是字节/秒，支持 `k`、`m`、`g` 后缀（如 `-L 10m` 表示 10 MB/s，即每秒 10 兆字节），不要与比特混淆（网络带宽常用 `Mb/s`）。

### 6. 管道退出码

- 当上游命令失败时，`pv` 仍可能成功退出，导致下游继续执行。若需严格判断，可用 `set -o pipefail`（bash）让管道返回第一个失败命令的退出码。

## 参考链接

- [pv 官方文档（man page）](https://www.ivarch.com/programs/pv.shtml)
- [Homebrew pv 页面](https://formulae.brew.sh/formula/pv)