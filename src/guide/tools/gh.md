---
title: gh
icon: gauge
category:
  - 工具
  - Git 工具
tag:
  - 系统与效率
  - gh
---

# gh（GitHub 官方命令行工具）

> Homebrew 版本 2.83.1 ｜ 主页：见官方文档 ｜ 安装：`brew install gh`

## 一、它是什么
`gh` 是 GitHub 官方推出的命令行工具，它把 GitHub 的核心功能（仓库、PR、Issue、Release、CI）直接搬进终端，让你无需在浏览器和终端之间来回切换。它解决的是开发者在 Git 工作流中频繁「离开终端、打开网页、点击鼠标」的割裂问题，典型应用场景包括：从终端创建/查看仓库、快速发起和合并 Pull Request、管理 Issue、查看 Actions 运行状态、发布 Release 以及维护 GitHub Codespaces。

## 二、安装与升级
macOS 上推荐通过 Homebrew 安装 `gh`，安装后 `gh` 会自动加入 PATH（`/opt/homebrew/bin`），并可通过交互式 `gh auth login` 完成认证。

```bash
# 安装
brew install gh

# 验证安装
gh --version
# 期望输出：gh version 2.83.1 (2025-xx-xx)
# https://github.com/cli/cli/releases/latest

# 查看命令帮助
gh --help

# 升级到最新版
brew upgrade gh

# 卸载
brew uninstall gh
```

安装后首次使用需要登录 GitHub 账号：

```bash
# 交互式登录（支持浏览器 / 浏览器自动 / token 三种方式）
gh auth login

# 查看当前登录状态
gh auth status

# 登出
gh auth logout
```

## 三、常用命令速查

| 命令 | 参数/说明 | 示例 |
|------|-----------|------|
| `gh auth login` | 登录 GitHub 账号（支持 HTTPS/SSH、浏览器/token） | `gh auth login` |
| `gh repo create` | 创建仓库（`--public` 公开、`--clone` 本地克隆、`--source` 从已有目录推送） | `gh repo create myrepo --public --source=. --push` |
| `gh repo view` | 查看仓库信息（`-w` 在浏览器打开） | `gh repo view --web` |
| `gh repo clone` | 克隆仓库到本地 | `gh repo clone cli/cli` |
| `gh pr create` | 创建 Pull Request（`-t` 标题、`-b` 说明、`-f` 用 commit 信息） | `gh pr create -t "fix bug" -b "detail"` |
| `gh pr list` | 列出 PR（`--author`、`--state`、`-R` 指定仓库） | `gh pr list --state open` |
| `gh pr merge` | 合并 PR（`--squash`/`--rebase`、`-d` 删除分支） | `gh pr merge 123 --squash -d` |
| `gh issue list` | 列出 Issue | `gh issue list --label bug` |
| `gh issue create` | 创建 Issue | `gh issue create -t "标题" -b "描述"` |
| `gh run list` | 查看 Actions 工作流运行记录 | `gh run list --limit 10` |
| `gh run watch` | 实时跟踪某个工作流运行 | `gh run watch 1234567` |
| `gh release create` | 发布 Release | `gh release create v1.0.0 --generate-notes` |

## 四、实际示例

### 示例 1：从本地目录创建并推送一个新仓库
```bash
# 1. 初始化 Git 仓库并提交代码
git init
git add .
git commit -m "init project"

# 2. 用 gh 创建远程公开仓库，并从当前目录推送
gh repo create my-awesome-tool --public --source=. --push

# 3. 查看仓库是否创建成功
gh repo view my-awesome-tool --web
```
执行后终端会返回仓库地址（如 `https://github.com/<你的用户名>/my-awesome-tool`），并自动把本地代码推送上去。

### 示例 2：发起并合并一个 Pull Request
```bash
# 1. 基于 main 分支创建功能分支
git checkout -b feature/new-login
# ... 修改代码并提交 ...
git add . && git commit -m "add login page"

# 2. 推送分支到远端
git push -u origin feature/new-login

# 3. 创建 PR（标题自动取 commit 信息）
gh pr create --title "新增登录页" --body "实现邮箱密码登录" --base main

# 4. 查看该 PR
gh pr view --web

# 5. 检查通过后合并（squash 合并并删除远程分支）
gh pr merge --squash --delete-branch
```

### 示例 3：查看并跟踪 GitHub Actions 的运行结果
```bash
# 1. 列出最近的 5 次工作流运行
gh run list --limit 5
# 输出示例：X  main  2025-xx-xxT12:00:00Z  CI  1234567  completed

# 2. 实时跟踪某次运行（直到结束，日志实时滚动）
gh run watch 1234567

# 3. 查看某次运行中失败 job 的日志
gh run view 1234567 --log-failed
```

### 示例 4：发布一个 Release 版本
```bash
# 1. 打标签并推送
git tag v1.0.0
git push origin v1.0.0

# 2. 用 gh 发布 Release（自动从 commit 生成发布说明）
gh release create v1.0.0 --title "v1.0.0 稳定版" --generate-notes

# 3. 上传二进制附件
gh release upload v1.0.0 ./dist/app-darwin-arm64.tar.gz

# 4. 查看发布页
gh release view v1.0.0 --web
```

## 五、进阶技巧与配置

### 1. 配置别名（alias）加速日常操作
配置文件位于 `~/.config/gh/config.yml`，可以用 `gh alias set` 快速定义：

```bash
# 定义 alias：git co 等效于 gh pr checkout
gh alias set co 'pr checkout'
# 之后即可：gh co 123

# 定义 alias：pco 创建 PR 并直接 checkout 到对应分支
gh alias set pco 'pr create --fill'

# 查看所有 alias
gh alias list
```

`gh alias set` 还支持两种更高级的别名形态，能把日常高频动作压成一两个字符：

```bash
# ① 参数透传（shell 别名）：在命令前面加 ! 即把整条命令交给 shell 执行，可自由混用其他命令
gh alias set prw '!gh pr view --web && gh pr checks --watch'
# 之后执行：gh prw            （会在浏览器打开当前分支的 PR 并等待 CI 通过）

# ② 参数占位（graphql 别名）：把 flag 加在引号内，调用时补齐
gh alias set prj 'pr view --json number,title,author {0}'
# 之后执行：gh prj 123        （等价于 gh pr view --json ... 123）

# ③ 删除别名
gh alias delete co
```

alias 也支持多级（子命令）形式，例如 `gh issue` 与 `gh pr` 各自维护别名空间：
```bash
# 为 issue 单独定义：gh issue w 等价于 gh issue view --web
gh alias set issue.w 'issue view --web'
```
配置文件 `~/.config/gh/config.yml` 中对应的原始内容形如：
```yaml
aliases:
  co: pr checkout
  pco: pr create --fill
  prw: '!gh pr view --web && gh pr checks --watch'
```

### 2. 环境变量与配置
常用环境变量可直接在 shell 中设置：

```bash
# 指定默认仓库（避免每条命令带 -R）
export GH_REPO=octo-org/octo-repo

# 指定默认编辑器（用于 gh 打开编辑器写 PR/Issue 说明）
export GH_EDITOR=vim

# 指定默认浏览器
export GH_BROWSER=open

# 关闭交互式提示，用于脚本/CI 场景
export GH_PROMPT_DISABLED=1
```

这些变量可统一写进 shell 的配置文件（`~/.zshrc` / `~/.bashrc`）持久生效：
```bash
# ~/.zshrc 追加以下内容
export GH_EDITOR=vim
export GH_BROWSER=open
# 让 gh 自动接管 git 的 push/fetch 认证（走 gh 的凭据管理器）
export GH_PROMPT_DISABLED=1
git config --global credential.helper '!gh auth git-credential'
```

其它常用的环境变量/配置项一览：

| 配置项 | 作用 | 示例值 |
|--------|------|--------|
| `GH_REPO` | 默认仓库（`owner/repo`），省去每条命令 `-R` | `octo-org/octo-repo` |
| `GH_TOKEN` | 认证令牌，脚本/CI 中优先于交互登录 | `ghp_xxxx` |
| `GH_HOST` | 目标 GitHub 主机（GHES 企业实例） | `github.example.com` |
| `GH_CONFIG_DIR` | 配置文件所在目录（默认 `~/.config/gh`） | `~/.config/gh` |
| `GH_EDITOR` | 写 PR/Issue 说明时使用的编辑器 | `code` / `vim` |
| `GH_BROWSER` | 打开链接时使用的浏览器 | `open` / `firefox` |
| `GH_PAGER` | 长输出的分页器（默认 `less`） | `cat` / `less -R` |
| `GH_PROMPT_DISABLED` | 设为 `1` 关闭所有交互提示 | `1` |
| `GH_NO_UPDATE_NOTIFIER` | 设为 `1` 关闭版本升级提醒 | `1` |
| `GH_FORCE_TTY` | 强制以 TTY 模式输出（脚本中常配合 `| cat` 使用） | `80` |
| `GH_COLUMNS` | 表格/列表输出的列数 | `120` |
| `DEBUG` | 设为 `api` 打印底层 HTTP 请求（排查问题极有用） | `api` |

```bash
# 调试模式示例：查看 gh 实际发起的 API 请求
DEBUG=api gh pr view 123
```

### 3. 在脚本 / CI 中无交互使用
用个人访问令牌（Personal Access Token）认证后即可在脚本中安全调用：

```bash
# 认证（也可用 GH_TOKEN 环境变量）
gh auth login --with-token <<< "ghp_xxxxxx"

# 脚本中设置 token 后直接调用
export GH_TOKEN=ghp_xxxxxx
gh pr list --state open --limit 50 --json number,title,headRefName
```

脚本中强烈推荐配合 `--json` + `-q` 做结构化解析，输出干净且稳定：

```bash
# 只取 PR 编号和标题，交给 jq 处理
gh pr list --state open --json number,title,author \
  --jq '.[] | "\(.number) \(.title) (@\(.author.login))"'

# 判断当前分支是否已有 PR，若没有则创建（适合 CI 自动提 PR）
if ! gh pr view --json number -q .number >/dev/null 2>&1; then
  gh pr create --fill --base main
fi

# 用 jq 断言 Release 是否已存在（幂等判断，避免重复发版）
gh release view v1.0.0 --json tagName -q .tagName >/dev/null 2>&1 \
  || gh release create v1.0.0 --generate-notes
```

写脚本时的几个关键实践：
- **绝不硬编码 token**：token 从环境变量或 CI secrets 注入，见下方「七」的 GitHub Actions 示例。
- **幂等性**：命令前先做存在性判断（如上面的 `if ! gh release view`），避免重复创建导致 CI 失败。
- **超时与失败处理**：依赖第三方服务会偶发失败，建议 `gh run watch --exit-status --interval 10` 并配合重试。
- **去掉交互提示**：始终 `export GH_PROMPT_DISABLED=1`，避免脚本因等待输入而挂死。

### 4. 与 Git 原生命令搭配
`gh` 不替代 `git`，而是补充它。常见搭配：

```bash
# 先 git 本地提交，再用 gh 推送并建 PR 一条龙
git add . && git commit -m "feat: x" && git push
gh pr create --fill

# 用 gh 查看某个 PR 对应的本地分支差异
git diff main...$(gh pr view 123 --json headRefName -q .headRefName)

# 拉取某 PR 到本地分支并基于它新建开发分支
gh pr checkout 456
git checkout -b my-local-work

# 合并时想用 rebase 并自动删除分支
gh pr merge --rebase --delete-branch --match-commit-author
```

### 5. 常用命令的进阶参数
**PR 工作流：**
```bash
# 一次创建 PR 并直接指派 reviewer、打 label、关联 issue
gh pr create --title "feat" --body "说明" \
  --reviewer alice,bob \
  --label "enhancement,documentation" \
  --assignee @me \
  --milestone v2.0

# 查看 PR 的完整审查状态，持续阻塞直到全部通过或失败
gh pr checks --watch

# 快速修改某 PR 的标题
gh pr edit 123 --title "新标题" --add-label "bug"

# 把 issue 一键转成 PR 的分支（issue 号即分支后缀）
gh issue develop 88 --checkout
```

**Issue 工作流：**
```bash
# 带 label/milestone/assignee 创建
gh issue create -t "性能优化" -b "详情..." -l "perf" -a @me

# 列出并按多种条件过滤
gh issue list --state open --assignee @me --limit 30 --json number,title

# 给 issue 添加评论
gh issue comment 88 --body "正在处理，预计周三修复"

# 用 `gh issue transfer` 或 `gh issue close` 收尾
gh issue close 88 --comment "已在 #123 修复"
```

**Release 与版本发布：**
```bash
# 发布草稿（不对外可见，供内部核对）
gh release create v1.1.0 --draft --generate-notes

# 标记为最新版本 / 预发布
gh release create v2.0.0-rc.1 --prerelease

# 批量上传多个二进制
gh release upload v1.1.0 dist/*.tar.gz dist/*.dmg

# 列出所有附件并下载
gh release download v1.1.0 --pattern "*.dmg" --dir ./installers

# 删除误发的版本
gh release delete v0.9.0 --yes
```

**仓库管理：**
```bash
# 给仓库打主题标签、设置描述和主页
gh repo edit --description "..." --homepage https://... --add-topic cli,devops

# 查看依赖关系（Dependabot 告警）
gh api repos/{owner}/{repo}/vulnerability-alerts
```

### 6. `gh api`：直接调用 GitHub REST/GraphQL API
`gh api` 是通向全部 GitHub 能力的「万能钥匙」，凡 `gh` 没有封装的功能都能用它直接调用：

```bash
# 拉取某仓库的 issue 评论数
gh api repos/cli/cli/issues/1/comments --jq '.[] | .user.login'

# 用 GraphQL 做跨对象查询（变量随 -f 传入）
gh api graphql -F owner=cli -F repo=cli \
  -f query='
    query($owner:String!, $repo:String!) {
      repository(owner:$owner, name:$repo) {
        stargazerCount
        issues(states:OPEN) { totalCount }
      }
    }'

# 批量给仓库创建 label（脚本化）
for l in "bug:d73a4a" "enhancement:0052cc" "docs:fbca04"; do
  name=${l%%:*}; color=${l##*:}
  gh api -X POST repos/cli/cli/labels \
    -f name="$name" -f color="$color" || true
done

# 用 --paginate 自动翻页拉全量数据
gh api --paginate repos/cli/cli/issues --jq '.[].number' | tail -20
```

## 六、注意事项与常见问题

### 常见报错与解决
- **登录是前提**：大部分 `gh` 命令需要先 `gh auth login`，否则报错 `could not read Username` 或 `authentication required`。用 `gh auth status` 检查登录状态。
- **首次登录网络问题**：`gh auth login` 走浏览器跳转，若在公司内网/代理环境失败，可改用 `--with-token` 方式直接粘贴 PAT，或设置 `HTTPS_PROXY` 环境变量。
- **token 权限不足**：创建 PR/Release 需要 `repo` 权限；管理组织仓库需要 `read:org` 等。权限不足会报 `Resource not accessible by integration`，去 GitHub Settings 重新生成 token 并勾选对应 scope。
- **密钥冲突（auth host refused）**：本地已有 SSH 时，`gh auth login` 建议选 HTTPS；若坚持 SSH 会报 `failed to sign in using ssh key`，可在 `gh auth login` 时显式选择 `GitHub.com` + `SSH` 并重启终端。
- **路径/别名覆盖**：若你曾用 `git` 定义过同名 alias（如 `git co`），`gh alias set` 的别名独立于 git，互不影响；但注意 `gh` 默认不接管 `git` 命令，二者是平行关系。
- **隐私与安全**：`GH_TOKEN` 属于敏感凭据，不要写进会被提交到仓库的文件；建议用 `gh auth login --with-token` 或系统钥匙串，并定期在 GitHub 后台撤销无用 token。
- **升级后行为变化**：`gh` 迭代较快，跨大版本时默认值可能变化（如 PR 合并策略），升级后运行 `gh --help` 或 `gh pr merge --help` 确认新语法。

### 更多新手踩坑点
- **`--fill` 的「聪明」也有副作用**：它默认取当前分支的最后一条 commit 作为 PR 标题/正文，若 commit 信息不完整，PR 会很难看。多 commit 时用 `gh pr create --fill-verbose` 逐条拼接。
- **未配置 Git 用户信息报错**：`git commit` 会报 `Please tell me who you are`，需先 `git config --global user.name` / `user.email`；`gh` 只负责远端交互，不代理本地提交。
- **`gh pr merge` 反复失败**：多半是 CI 有 `required status check` 未通过，或被 branch protection 拦截。先 `gh pr checks --watch` 确认，再决定用 `--admin`（管理员跳过检查）——慎用，需有权限。
- **`gh run watch` 卡住**：工作流触发条件未满足（如只在特定分支触发）会导致 `--exit-status` 一直等待。用 `gh run list --event push` 确认触发事件，必要时加 `--interval 30` 降低轮询频率。
- **大仓库 clone/操作慢**：加 `--depth`（浅克隆）或指定 `--filter` 减少体积；`gh repo clone` 接受透传 git 参数。
- **输出被 less 分页锁住**：长列表默认走分页器，在脚本或管道里用 `| cat`，或 `export GH_PAGER=cat` 直接输出。
- **Windows/WSL 差异**：`GH_BROWSER=open` 仅适用于 macOS；Windows 上用 `start`，Linux 桌面用 `xdg-open`。路径分隔符与 home 目录写法也需注意。

### 性能与安全注意点
- **网络依赖**：`gh` 每次调用都会走网络，脚本里尽量合并成一次 `gh api`（GraphQL 可一次查询多份数据），避免成百次单独调用。
- **token 最小权限**：为脚本单独创建 fine-grained token，只授予所需仓库与权限，避免使用有全部权限的经典 token。
- **慎用 `--admin`**：合并 PR 时 `--admin` 会绕过保护分支，非必要不用，防止绕过 review 流程。
- **及时轮换凭据**：在 GitHub Settings → Developer settings → Personal access tokens 里定期撤销不再使用的 token。
- **HTTPS 而非 SSH**：在代理/公司网络中 HTTPS + `gh auth git-credential` 比 SSH 更少踩坑，且无需维护私钥。

## 七、实战：与其它工具搭配与自动化

### 1. 与 `jq` 搭配做结构化处理
`gh` 的 `--json` 输出配 `jq` 是脚本化标配：

```bash
# 汇总某仓库所有 open PR 的标题，按 author 分组统计
gh pr list --state open --limit 100 --json number,title,author \
  | jq -r 'group_by(.author.login)[] | "\(.[0].author.login): \(length) 个 PR"'

# 找出 30 天内创建、尚未合并的旧 PR
gh pr list --state open --json number,title,createdAt \
  | jq -r '.[] | select((now - (.createdAt|fromdateiso8601)) > 30*86400)
            | "\(.number) 超期 \(.title)"'
```

### 2. 与 `fzf` 搭配做交互式选择
`fzf` 让 `gh` 的输出可模糊搜索、回车选定，非常适合日常交互：

```bash
# 交互式检出某个 PR（输入即过滤，回车 checkout）
gh pr list --state open --json number,title \
  --jq '.[] | "\(.number)\t\(.title)"' \
  | fzf --delimiter='\t' --with-nth=2 \
  | cut -f1 | xargs -I{} gh pr checkout {}

# 交互式查看某个 issue 详情
gh issue list --state open --json number,title \
  --jq '.[] | "\(.number)\t\(.title)"' \
  | fzf --delimiter='\t' --with-nth=2 | cut -f1 \
  | xargs -I{} gh issue view {}
```

### 3. 与 Makefile / 脚本搭配
在项目根目录写一个 `Makefile`，把发版、提 PR 等重复动作固化成目标：

```makefile
.PHONY: pr release clean

# 提交并自动创建 PR（简化：git add/commit/push + gh pr create）
pr:
	git add .
	git commit -m "$(M)"
	git push -u origin HEAD
	gh pr create --fill --base main

# 发布版本：打标签 + 生成发布说明 + 上传二进制
release:
	@test -n "$(V)" || (echo "用法: make release V=v1.0.0" && exit 1)
	git tag $(V)
	git push origin $(V)
	gh release create $(V) --generate-notes --title "$(V)"
	@for f in dist/*; do gh release upload $(V) "$$f"; done

# 一键完成：提交 → 建 PR → 等 CI → 合并 → 删分支 → 发版
ship: pr
	gh pr checks --watch
	gh pr merge --squash --delete-branch
	@make release V=$(V)
```

对应的 Shell 脚本版本（`scripts/release.sh`）：
```bash
#!/usr/bin/env bash
set -euo pipefail                      # 任何错误立即退出，脚本更稳
export GH_PROMPT_DISABLED=1            # 无交互

VERSION="${1:?用法: ./scripts/release.sh v1.0.0}"
TAG="$VERSION"

# 幂等：若 tag 已存在则跳过打标签
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  git tag "$TAG" && git push origin "$TAG"
fi

# 幂等：若 release 已存在则删除重建（或跳过）
gh release view "$TAG" --json tagName -q .tagName >/dev/null 2>&1 \
  || gh release create "$TAG" --generate-notes --title "$VERSION"

# 上传产物（dist 目录下的文件）
for f in dist/*; do
  gh release upload "$TAG" "$f" --clobber 2>/dev/null || true
done
echo "已发布 $TAG"
```
别忘了 `chmod +x scripts/release.sh`。

### 4. 批量处理
`gh` 支持遍历循环做批量操作，适合清理、迁移、补全元数据：

```bash
# 批量关闭 30 天前无人回复的 stale issue
gh issue list --state open --json number,updatedAt --limit 200 \
  | jq -r '.[] | select((now - (.updatedAt|fromdateiso8601)) > 30*86400) | .number' \
  | while read n; do
      gh issue comment "$n" --body "30 天无活动，自动关闭。如需继续讨论请重新打开。"
      gh issue close "$n"
    done

# 批量给某仓库所有 open issue 打 label
gh issue list --state open --json number --limit 500 \
  | jq -r '.[].number' \
  | xargs -I{} gh issue edit {} --add-label "triage"

# 批量给 Release 上传同一目录下多个平台的二进制
for f in build/*.tar.gz; do
  gh release upload v2.0.0 "$f"
done
```

### 5. 与 Git 命令深度配合
```bash
# 提交后推送并立即打开浏览器查看 PR
git add . && git commit -m "feat: x" && git push -u origin HEAD \
  && gh pr create --fill && gh pr view --web

# 用 gh 拿到当前分支 PR 的状态，决定是否合并
if gh pr checks --watch --exit-status; then
  gh pr merge --squash --delete-branch
fi

# 基于最新 main 重开一个干净的 PR 分支
git checkout main && git pull && git checkout -b fix/typo \
  && gh pr create --fill --base main
```

### 6. 集成到 GitHub Actions（CI）
`gh` 在 Actions 里已经内置，无需手动认证，直接拿 `${{ github.token }}` 用。常见场景：

**① 发布 Release 的自动化工作流**（`.github/workflows/release.yml`）：
```yaml
name: release
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write            # 关键：授予 gh release 写权限
    steps:
      - uses: actions/checkout@v4
      - name: 构建产物
        run: |
          mkdir -p dist
          echo "demo" > dist/app.txt
      - name: 创建 Release
        run: |
          gh release create "$GITHUB_REF_NAME" --generate-notes \
            dist/* --title "$GITHUB_REF_NAME"
        env:
          GH_TOKEN: ${{ github.token }}
```

**② 自动给合并后的 PR 打标签 / 发布说明**：
```yaml
on:
  pull_request:
    types: [closed]
jobs:
  changelog:
    runs-on: ubuntu-latest
    if: github.event.pull_request.merged == true
    steps:
      - uses: actions/checkout@v4
      - run: |
          # 用 gh 读取合并 PR 的标题生成 changelog 条目
          echo "## 变更" > CHANGELOG.md
          gh pr view "${{ github.event.pull_request.number }}" \
            --json title,body -q '.title' >> CHANGELOG.md
```

**③ 跨仓库自动同步 / 批量操作**：可在 Actions 里用 PAT（存到 repo secrets）做跨仓库的 `gh api` 调用，例如批量关闭旧 issue、给另一个仓库提 PR 等。

### 7. 生产级实践清单
- **版本与依赖锁定**：CI 里用固定版本的 `gh`（`gh --version` 记录），避免上游行为变化影响流水线。
- **错误即失败**：脚本统一加 `set -euo pipefail`，`gh` 非零退出立即终止，避免「带病继续」。
- **结构化而非文本解析**：一律用 `--json` + `jq`，绝不 `grep` 文本表格，格式变化才不易崩。
- **最小权限 + 临时 token**：CI 用 `${{ github.token }}`（自动、短时有效），跨仓库场景才申请 PAT 并存入 secrets。
- **可观测性**：关键步骤 `echo "::group::发布 Release"` … `echo "::endgroup::"`，让 CI 日志可折叠、可排查。
- **优雅处理幂等**：所有「可能已存在」的操作先查后建，避免 CI 重跑时报错。

---

> **延伸阅读**：`gh api` 官方文档、`.github/workflows` 语法手册、以及 `gh` 各子命令的 `--help` 输出是快速上手的最终参考。