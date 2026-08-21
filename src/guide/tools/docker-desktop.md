---
title: docker-desktop
icon: image
category:
  - 工具
  - 容器工具
tag:
  - 图像与其它
  - docker-desktop
---

# docker-desktop（Docker 桌面版图形应用（容器管理））

> Homebrew 版本 cask ｜ 主页：见官方文档 ｜ 安装：`brew install docker-desktop`

## 一、它是什么

docker-desktop 是 Docker 官方推出的**桌面版图形应用**，以图形界面（菜单栏图标、Dashboard 面板）管理本地容器与镜像，让普通开发者无需记忆大量 `docker` 命令也能完成拉取镜像、运行/停止容器、查看日志等日常操作。

它解决的核心问题是：**在 macOS 上以最省心的方式运行 Docker 引擎**。Docker 依赖 Linux 内核特性（cgroups、namespaces），无法在 macOS 上原生运行，docker-desktop 通过内置的 Linux 虚拟机（HyperKit / Virtualization.framework）在后台静默承载 Docker 引擎，用户只需启动应用即可获得可用的 `docker` 命令。典型应用场景：本地搭建开发环境、一键运行 MySQL/Redis/Postgres 等中间件、快速验证别人分享的镜像或 compose 工程。

## 二、安装与升级

docker-desktop 是 Homebrew 的 **cask** 类软件（带 GUI 的桌面应用，不是 command-line 类），因此安装、升级、卸载都走 `brew install --cask` / `--cask` 一族：

```bash
# 安装（cask 安装到 /Applications）
brew install --cask docker-desktop

# 升级到最新版（cask 也支持 upgrade）
brew upgrade --cask docker-desktop

# 卸载
brew uninstall --cask docker-desktop

# 验证安装：应用已放入应用程序目录
ls /Applications/Docker.app

# 启动应用后（首次会弹出许可协议与初始化向导，需同意并输入系统密码授权内核扩展/虚拟化）
open -a Docker

# 等待引擎就绪后再验证 docker 命令是否可用
docker --version
docker info
```

> 注意：cask 只安装应用本体，**不自动启动**。第一次需要手动打开 Docker.app 完成初始化，之后引擎才会在后台运行，`docker` 命令才有响应。

## 三、常用命令速查

docker-desktop 日常使用分两块：一是**图形界面操作**（点菜单栏图标、进 Dashboard），二是**命令行操作**（引擎就绪后就是标准 `docker` 命令）。以下以命令行为主：

| 命令 | 参数说明 | 示例 / 说明 |
| --- | --- | --- |
| `open -a Docker` | 启动 Docker 桌面版应用 | `open -a Docker`（也可点 Finder 里的 Docker.app） |
| `docker --version` | 查看 docker 客户端版本 | `docker --version`（应输出 `Docker version 24.x.x` 之类） |
| `docker info` | 查看引擎/守护进程信息，判断是否就绪 | `docker info`（若连接失败说明引擎未启动） |
| `docker ps` | 列出正在运行的容器 | `docker ps`（加 `-a` 列出包括已停止的） |
| `docker images` | 列出本地已有的镜像 | `docker images` |
| `docker pull 镜像名` | 拉取镜像到本地 | `docker pull nginx:latest` |
| `docker run -d -p 端口:端口 镜像` | 运行容器并映射端口 | `docker run -d -p 8080:80 nginx` |
| `docker exec -it 容器名 bash` | 进入容器内的交互式 shell | `docker exec -it mynginx bash` |
| `docker compose up -d` | 按 compose 文件启动一组容器 | `docker compose up -d`（在工程目录内执行） |
| `docker logs 容器名` | 查看容器日志 | `docker logs -f mynginx`（`-f` 持续跟踪） |
| `docker system prune -a` | 清理无用镜像/容器/缓存，释放磁盘 | `docker system prune -a`（会提示确认） |

## 四、实际示例

### 示例 1：启动应用并跑起第一个 Nginx 容器

```bash
# 1. 启动 Docker 桌面版，等待菜单栏的鲸鱼图标变绿（引擎就绪）
open -a Docker

# 2. 确认引擎已就绪（能正常输出信息即成功）
docker info

# 3. 拉取官方 nginx 镜像
docker pull nginx:latest

# 4. 以后台方式运行容器，把容器 80 端口映射到本机 8080
docker run -d --name mynginx -p 8080:80 nginx

# 5. 查看运行中的容器
docker ps
```

结果：在浏览器打开 `http://localhost:8080` 就能看到 Nginx 的默认欢迎页，`docker ps` 里能看到一个名字为 `mynginx` 的容器。

### 示例 2：用 Docker 一键启动 MySQL 做本地开发

```bash
# 启动 MySQL 8 容器，映射 3306 端口，设置 root 密码，并挂载数据卷便于持久化
docker run -d \
  --name mymysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=devpass \
  -e MYSQL_DATABASE=appdb \
  -v mysql-data:/var/lib/mysql \
  mysql:8

# 查看是否启动成功（STATUS 应为 Up）
docker ps

# 用 mysql 客户端连接验证（没有客户端可用 docker exec 进入容器）
docker exec -it mymysql mysql -uroot -pdevpass -e "SHOW DATABASES;"
```

结果：登录进去能看到 `appdb` 等数据库；即使删掉容器（`docker rm -f mymysql`），数据也保留在 `mysql-data` 卷里，下次重新 `docker run` 数据还在。

### 示例 3：用 docker compose 拉起一套 Web + Redis 环境

先在工作目录新建 `docker-compose.yml`：

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
  cache:
    image: redis:7
    ports:
      - "6379:6379"
```

然后在同一目录执行：

```bash
# 按 compose 文件在后台启动全部服务
docker compose up -d

# 查看服务列表与状态
docker compose ps

# 跟踪 web 容器日志
docker compose logs -f web

# 停止并移除这套环境
docker compose down
```

结果：一条命令同时起好 Nginx 和 Redis 两个容器，且能用 `docker compose ps` 统一查看状态，适合本地搭多服务开发环境。

## 五、进阶技巧与配置

1. **资源限制**：打开 Docker.app → 顶部菜单栏鲸鱼图标 → Settings → Resources，可调整 **CPUs**（CPU 核数）、**Memory**（内存，默认约 2GB）、**Disk image size**（虚拟磁盘大小，默认约 64GB）。做重活（跑大镜像、多容器）时把内存调到 4GB 以上能显著提速；磁盘空间紧张时可在此调大上限。

2. **镜像加速（国内拉取提速）**：在 Settings → Docker Engine 的 JSON 配置里加入 `"registry-mirrors"` 字段，填入可用的镜像加速地址（如 DaoCloud、中科大等镜像站），保存并重启 Docker。这会大幅加快 `docker pull` 的速度：

   ```json
   {
     "registry-mirrors": ["https://docker.m.daocloud.io"]
   }
   ```

3. **配置与数据位置**：docker-desktop 的引擎数据、镜像、卷都存放在其内置虚拟磁盘（`~/Library/Containers/com.docker.docker` 下）中，而非系统根目录，卸载应用或清理时不需担心污染磁盘根分区。日常的 `docker` 配置（daemon.json、注册表登录态）也由应用统一管理，命令行里改完需在应用里重启引擎生效。

4. **与其它工具搭配**：
   - 与 `docker compose`（v2 已内置）搭配编排多容器工程，是开发环境标配；
   - 与 `docker-compose` 的旧版脚本配合：旧工程可 `brew install docker-compose`，新工程优先用内置的 `docker compose` 子命令；
   - 配合 VS Code 的 Docker 插件，可在编辑器里可视化浏览镜像、容器并右键启停，图形界面与命令行互补；
   - 与 `lsof`/`nc` 排查端口冲突：先 `lsof -nP -iTCP:8080 -sTCP:LISTEN` 看端口被谁占用，再决定是否调整 `-p` 映射。

## 六、注意事项与常见问题

1. **必须启动 Docker.app 后引擎才可用**：`docker` 命令单独安装/升级 cask 不会自动拉起守护进程。出现 `Cannot connect to the Docker daemon` 或 `connection refused` 时，先打开 Docker.app 等菜单栏图标变绿再重试。

2. **首次启动需要授权与许可**：第一次打开 Docker.app 会弹「Accept terms」（接受许可）、询问是否安装内核扩展/使用虚拟化，需要输入 macOS 管理员密码并允许。若被系统拒绝或安装失败，通常在系统设置 → 隐私与安全里允许对应扩展后重启应用即可。

3. **Windows 老镜像或架构不匹配**：macOS（Apple Silicon 或 Intel）默认按本机架构拉镜像。碰到提示 `no matching manifest for linux/amd64` 或无法运行 x86 镜像时，可在 Docker Desktop Settings → Docker Engine 的 JSON 里加上 `"platform": "linux/amd64"` 或改用 `docker run --platform linux/amd64` 显式指定架构。

4. **磁盘占用增长很快**：镜像、卷、日志累积会让内置虚拟磁盘膨胀，导致 macOS 磁盘空间报警。定期用 `docker system prune -a`（慎用 `-a`，会删所有未使用的镜像）清理，或在 Settings → Resources 查看并调整 Disk image size。

5. **端口映射冲突**：`docker run -p 8080:80` 如果 8080 已被本机其它程序占用，会报 `port is already allocated`。先用 `lsof -nP -iTCP:8080 -sTCP:LISTEN` 查占用，换一个端口或停掉占用程序再重试。

6. **数据要挂卷持久化**：容器一旦删除，未挂卷的数据会随之丢失。重要数据（数据库、上传文件）务必用 `-v 卷名:容器路径` 挂卷，避免 `docker rm` 后数据消失。

7. **引擎重启后资源设置生效**：在 Settings 里改 CPU/内存/磁盘后需要点「Apply & Restart」重启引擎才生效；重启期间所有容器会中断，请避免在生产式任务中直接重启。