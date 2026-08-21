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

### 3. 在脚本 / CI 中无交互使用
用个人访问令牌（Personal Access Token）认证后即可在脚本中安全调用：

```bash
# 认证（也可用 GH_TOKEN 环境变量）
gh auth login --with-token <<< "ghp_xxxxxx"

# 脚本中设置 token 后直接调用
export GH_TOKEN=ghp_xxxxxx
gh pr list --state open --limit 50 --json number,title,headRefName
```

### 4. 与 Git 原生命令搭配
`gh` 不替代 `git`，而是补充它。常见搭配：

```bash
# 先 git 本地提交，再用 gh 推送并建 PR 一条龙
git add . && git commit -m "feat: x" && git push
gh pr create --fill

# 用 gh 查看某个 PR 对应的本地分支差异
git diff main...$(gh pr view 123 --json headRefName -q .headRefName)
```

## 六、注意事项与常见问题

- **登录是前提**：大部分 `gh` 命令需要先 `gh auth login`，否则报错 `could not read Username` 或 `authentication required`。用 `gh auth status` 检查登录状态。
- **首次登录网络问题**：`gh auth login` 走浏览器跳转，若在公司内网/代理环境失败，可改用 `--with-token` 方式直接粘贴 PAT，或设置 `HTTPS_PROXY` 环境变量。
- **token 权限不足**：创建 PR/Release 需要 `repo` 权限；管理组织仓库需要 `read:org` 等。权限不足会报 `Resource not accessible by integration`，去 GitHub Settings 重新生成 token 并勾选对应 scope。
- **密钥冲突（auth host refused）**：本地已有 SSH 时，`gh auth login` 建议选 HTTPS；若坚持 SSH 会报 `failed to sign in using ssh key`，可在 `gh auth login` 时显式选择 `GitHub.com` + `SSH` 并重启终端。
- **路径/别名覆盖**：若你曾用 `git` 定义过同名 alias（如 `git co`），`gh alias set` 的别名独立于 git，互不影响；但注意 `gh` 默认不接管 `git` 命令，二者是平行关系。
- **隐私与安全**：`GH_TOKEN` 属于敏感凭据，不要写进会被提交到仓库的文件；建议用 `gh auth login --with-token` 或系统钥匙串，并定期在 GitHub 后台撤销无用 token。
- **升级后行为变化**：`gh` 迭代较快，跨大版本时默认值可能变化（如 PR 合并策略），升级后运行 `gh --help` 或 `gh pr merge --help` 确认新语法。