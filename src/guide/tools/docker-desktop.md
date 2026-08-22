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
>
> 小技巧：安装后建议立刻执行一次 `docker context ls`，确认当前 context 是 `desktop-linux`（Apple Silicon 或新版）还是 `default`，这决定 `docker` 命令连的是哪套引擎。

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

### 更完整的容器生命周期命令

| 命令 | 作用 |
| --- | --- |
| `docker stop 容器` / `docker start 容器` | 停止 / 再次启动（保留容器，数据不丢） |
| `docker restart 容器` | 重启容器（stop 后再 start） |
| `docker rm -f 容器` | 删除容器（`-f` 强制，即使运行中） |
| `docker kill 容器` | 直接强杀进程（比 stop 更暴力，慎用） |
| `docker pause 容器` / `docker unpause 容器` | 暂停 / 恢复进程执行（CPU 被冻结） |
| `docker rename 旧名 新名` | 给容器改名 |
| `docker stats` | 实时查看各容器 CPU/内存/网络占用（类似 `top`） |
| `docker inspect 容器` | 查看容器的底层 JSON 配置、网络 IP、挂载等详细状态 |
| `docker port 容器` | 查看容器的端口映射关系 |

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

### 示例 4：进入容器排障并拷贝文件

```bash
# 进入运行中容器的 shell（缺 bash 时有些精简镜像只有 sh，用 sh）
docker exec -it mynginx bash

# 容器内操作：查看目录、进程、安装临时工具等
# 把容器里的配置文件拷到本机
docker cp mynginx:/etc/nginx/nginx.conf ./nginx.conf

# 反过来把本机文件拷进容器
docker cp ./app.js mynginx:/usr/share/nginx/html/
```

## 五、进阶技巧与配置

### 5.1 资源限制与调优

打开 Docker.app → 顶部菜单栏鲸鱼图标 → Settings → Resources，可调整 **CPUs**（CPU 核数）、**Memory**（内存，默认约 2GB）、**Disk image size**（虚拟磁盘大小，默认约 64GB）。做重活（跑大镜像、多容器）时把内存调到 4GB 以上能显著提速；磁盘空间紧张时可在此调大上限。

进阶建议：

- **用 `docker stats` 观测实际占用**再决定调多大，别盲目加内存。若发现容器频繁 OOM 被杀死（`docker inspect` 里 `"OOMKilled": true`），再逐步上调 Memory。
- **Apple Silicon 上建议至少分配 4GB 内存 + 4 个 CPU**，因为部分镜像（尤其带编译器、Android 构建）在 arm64 仿真 x86 时开销很大。
- 资源调整后必须点 **Apply & Restart** 才会重建虚拟机生效。

### 5.2 镜像加速（国内拉取提速）

在 Settings → Docker Engine 的 JSON 配置里加入 `"registry-mirrors"` 字段，填入可用的镜像加速地址（如 DaoCloud、中科大等镜像站），保存并重启 Docker。这会大幅加快 `docker pull` 的速度：

```json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
```

> 注意：镜像站经常变动，失效时换一家并 `docker system prune` 清掉失败缓存；也可装 `docker-pull-proxy` 类工具做本地代理。

### 5.3 Docker Engine 常用配置项（daemon.json）

Settings → Docker Engine 编辑的是守护进程 `daemon.json`。除了 `registry-mirrors`，这些字段也常用：

```json
{
  "registry-mirrors": ["https://docker.m.daocloud.io"],
  "insecure-registries": ["localhost:5000", "192.168.1.100:5000"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-address-pools": [
    { "base": "172.20.0.0/16", "size": 24 }
  ],
  "features": {
    "buildkit": true
  }
}
```

各字段含义：

| 字段 | 作用 |
| --- | --- |
| `registry-mirrors` | 镜像加速源，加速 `docker pull` |
| `insecure-registries` | 允许走 HTTP 的私有仓库（自建 Harbor/Registry），否则拉取会被 TLS 拦截 |
| `log-driver` / `log-opts` | 限制容器日志大小，防止日志无限膨胀撑爆磁盘（`max-size`+`max-file`） |
| `default-address-pools` | 自定义容器网段的网段池，避免与公司内网/VPN 网段冲突 |
| `features.buildkit` | 开启 BuildKit（新版默认开），让 `docker build` 更快、支持 `RUN --mount` 缓存 |

改完记得 Apply & Restart 生效。

### 5.4 配置与数据位置

docker-desktop 的引擎数据、镜像、卷都存放在其内置虚拟磁盘（`~/Library/Containers/com.docker.docker` 下）中，而非系统根目录，卸载应用或清理时不需担心污染磁盘根分区。日常的 `docker` 配置（daemon.json、注册表登录态）也由应用统一管理，命令行里改完需在应用里重启引擎生效。

- 登录镜像仓库状态：`docker login` 后凭证存于 `~/.docker/config.json`。
- 清理虚拟磁盘空间：除了 `docker system prune`，还可在 Settings → Resources → Troubleshoot → **Clean / Purge data** 彻底重置（会清空所有镜像、卷、容器）。

### 5.5 与其它工具搭配

- 与 `docker compose`（v2 已内置）搭配编排多容器工程，是开发环境标配；
- 与 `docker-compose` 的旧版脚本配合：旧工程可 `brew install docker-compose`，新工程优先用内置的 `docker compose` 子命令；
- 配合 VS Code 的 Docker 插件，可在编辑器里可视化浏览镜像、容器并右键启停，图形界面与命令行互补；
- 与 `lsof`/`nc` 排查端口冲突：先 `lsof -nP -iTCP:8080 -sTCP:LISTEN` 看端口被谁占用，再决定是否调整 `-p` 映射；
- 与 `docker-completion`（bash/zsh 自动补全）配合：`brew install docker-completion`，配好后敲 `docker <Tab>` 能补全命令、镜像名、容器名，大幅减少手打；
- 与 `jq` 配合解析 `docker inspect` 的 JSON 输出：`docker inspect mynginx | jq '.[0].NetworkSettings.IPAddress'` 快速取容器 IP。

## 六、注意事项与常见问题

1. **必须启动 Docker.app 后引擎才可用**：`docker` 命令单独安装/升级 cask 不会自动拉起守护进程。出现 `Cannot connect to the Docker daemon` 或 `connection refused` 时，先打开 Docker.app 等菜单栏图标变绿再重试。

2. **首次启动需要授权与许可**：第一次打开 Docker.app 会弹「Accept terms」（接受许可）、询问是否安装内核扩展/使用虚拟化，需要输入 macOS 管理员密码并允许。若被系统拒绝或安装失败，通常在系统设置 → 隐私与安全里允许对应扩展后重启应用即可。

3. **Windows 老镜像或架构不匹配**：macOS（Apple Silicon 或 Intel）默认按本机架构拉镜像。碰到提示 `no matching manifest for linux/amd64` 或无法运行 x86 镜像时，可在 Docker Desktop Settings → Docker Engine 的 JSON 里加上 `"platform": "linux/amd64"` 或改用 `docker run --platform linux/amd64` 显式指定架构。

4. **磁盘占用增长很快**：镜像、卷、日志累积会让内置虚拟磁盘膨胀，导致 macOS 磁盘空间报警。定期用 `docker system prune -a`（慎用 `-a`，会删所有未使用的镜像）清理，或在 Settings → Resources 查看并调整 Disk image size。

5. **端口映射冲突**：`docker run -p 8080:80` 如果 8080 已被本机其它程序占用，会报 `port is already allocated`。先用 `lsof -nP -iTCP:8080 -sTCP:LISTEN` 查占用，换一个端口或停掉占用程序再重试。

6. **数据要挂卷持久化**：容器一旦删除，未挂卷的数据会随之丢失。重要数据（数据库、上传文件）务必用 `-v 卷名:容器路径` 挂卷，避免 `docker rm` 后数据消失。

7. **引擎重启后资源设置生效**：在 Settings 里改 CPU/内存/磁盘后需要点「Apply & Restart」重启引擎才生效；重启期间所有容器会中断，请避免在生产式任务中直接重启。

8. **Apple Silicon 的 x86 镜像慢到怀疑人生**：用 `--platform linux/amd64` 跑 x86 镜像会走 Rosetta 仿真，性能骤降、内存暴涨。优先找 arm64 官方多架构镜像（`--platform linux/arm64`），能省一半时间。

9. **容器里访问宿主机服务**：新版用 `host.docker.internal` 指向宿主机的 `localhost`，而不是老的 `docker.for.mac.host.internal`。容器内连接宿主 MySQL 用 `host.docker.internal:3306`。

10. **DNS / 网络连不上外网**：公司网络有代理或 DNS 污染时，容器可能解析不了域名。在 Settings → Resources → Proxies 配置 HTTP/HTTPS 代理，或在 daemon.json 里给容器配置固定 DNS `"dns": ["8.8.8.8", "114.114.114.114"]`。

11. **`docker` 命令权限/未找到**：确认 `/usr/local/bin` 或 `/opt/homebrew/bin` 在 PATH 里，且 cask 版本正常。若提示 `command not found: docker`，重装 cask 或 `brew link docker` 修复。

12. **升级后引擎起不来 / 一直转圈**：多为旧版本数据不兼容或磁盘文件损坏。先备份卷数据，再到 Settings → Troubleshoot → Restart / Reset to factory defaults 重置；仍不行就彻底卸载重装 cask。

## 七、实战：与其它工具搭配与自动化

### 7.1 用 Makefile 封装常用命令

把反复敲的命令收进 `Makefile`，一键完成「起环境、看状态、进容器、清理」：

```makefile
# Makefile（放在工程根目录，与 docker-compose.yml 同级）
.PHONY: up down logs shell clean ps pull build

up:            ## 后台启动整套环境
	docker compose up -d

down:          ## 停止并移除整套环境
	docker compose down

ps:            ## 查看服务状态
	docker compose ps

logs:          ## 跟踪全部服务日志
	docker compose logs -f

shell:         ## 进入 web 容器 shell
	docker compose exec web bash

pull:          ## 拉取并更新镜像
	docker compose pull

build:         ## 重新构建镜像
	docker compose build --pull

clean:         ## 清理无用镜像/缓存/卷
	docker system prune -a --volumes
```

用法：`make up`、`make logs`、`make clean` 即可，团队协作时还能统一命令习惯。

### 7.2 与 docker compose 的高级编排

生产级 compose 常带环境变量、健康检查、依赖顺序和资源限制：

```yaml
services:
  db:
    image: postgres:16
    environment: &pg_env
      POSTGRES_USER: ${POSTGRES_USER:-app}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secret}
      POSTGRES_DB: ${POSTGRES_DB:-appdb}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 1g

  web:
    build: .
    ports:
      - "8080:80"
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/appdb

volumes:
  pgdata:
```

`docker compose up -d --wait` 会等所有 `healthcheck` 通过后才返回，方便脚本里判断就绪。

### 7.3 环境变量与多环境切换

用 `.env` 文件区分开发/测试/生产，配合 compose 的 `${VAR}` 插值：

```bash
# .env（开发环境）
POSTGRES_USER=dev
POSTGRES_PASSWORD=devpass
TAG=latest

# .env.prod（生产）
POSTGRES_USER=prod
POSTGRES_PASSWORD=supersecret
TAG=v1.2.0
```

```bash
# 按环境加载（compose 自动读取同目录 .env，也可显式指定）
docker compose --env-file .env.prod up -d
docker compose --env-file .env.prod ps
```

### 7.4 CI 集成（GitHub Actions / GitLab CI）

Docker 命令可直接放进 CI 脚本，用 `--platform`、`-f`、`--env-file` 保持与本地一致：

```yaml
# .github/workflows/ci.yml 片段
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build image
        run: docker compose -f docker-compose.yml build --pull
      - name: Smoke test
        run: docker compose up -d --wait && curl -fsS http://localhost:8080
      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USER }}" --password-stdin
          docker compose push
```

### 7.5 批量处理：循环 + 常用批量命令

```bash
# 批量停止/删除所有容器（开发环境一键清场）
docker ps -q | xargs -r docker stop
docker ps -aq | xargs -r docker rm

# 批量清理悬空镜像（<none> 镜像）
docker images -q -f dangling=true | xargs -r docker rmi

# 批量移除卷（仅当确认无用！）
docker volume ls -q -f dangling=true | xargs -r docker volume rm

# 批量给所有运行容器打标签
for c in $(docker ps -q); do docker commit "$c" "backup-$(date +%Y%m%d)"; done
```

> 批量命令很危险，先 `echo` 预览要处理的对象，确认无误再去掉 `xargs` 前的 `-r` 保护或换成实际执行。

### 7.6 生产级实践要点

- **日志一定要限流**：在 daemon.json 配 `log-opts.max-size=10m`，否则容器无限写日志会撑爆虚拟磁盘，CI 里尤其容易触发。
- **镜像体积**：多用多阶段构建（multi-stage build）、`.dockerignore` 排除 `node_modules`、`dist`、`.git`；小镜像用 alpine 或 distroless。
- **版本固定**：`docker pull postgres:16`、compose 里锁死 tag 或摘要（`image: postgres@sha256:...`），避免上游更新打破生产。
- **机密安全**：密码/密钥别硬编码进 Dockerfile，用环境变量、`.env`（不入 git）、或 Docker Desktop 的 Secret 功能 / 密钥管理器注入。
- **数据可回滚**：数据库镜像挂命名卷，升级前先 `docker compose exec db pg_dump -U app appdb > backup.sql` 或快照卷，便于回滚。

### 7.7 一键备份与恢复（shell 脚本）

把「起环境→备份→清理」串成脚本，支持命令行参数：

```bash
#!/usr/bin/env bash
# backup-docker.sh —— 备份所有命名卷数据到当前目录 tar 包
set -euo pipefail
STAMP="$(date +%Y%m%d_%H%M%S)"
OUT="docker-volumes-${STAMP}.tar"
# 1. 临时起一个挂载全部命名卷的 alpine 容器
VOLS=$(docker volume ls -q)
[ -z "$VOLS" ] && { echo "没有卷可备份"; exit 0; }
# 2. 逐个导出
for vol in $VOLS; do
  docker run --rm -v "${vol}:/data" -v "$PWD:/backup" alpine \
    tar czf "/backup/${vol}-${STAMP}.tgz" -C /data .
done
echo "已备份到：$PWD 下的 *_${STAMP}.tgz"
```

恢复：`docker volume create myvol` 后 `docker run --rm -v myvol:/data -v $PWD:/backup alpine tar xzf /backup/myvol-xxx.tgz -C /data`。