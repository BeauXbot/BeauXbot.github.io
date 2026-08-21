---
title: exercism
icon: image
category:
  - 工具
  - 学习练习
tag:
  - 学习练习
  - exercism
---

# exercism（Exercism 编程练习平台命令行工具）

> Homebrew 版本 3.5.8 ｜ 主页：见官方文档 ｜ 安装：`brew install exercism`

## 一、它是什么

`exercism` 是 Exercism 编程练习平台的官方命令行客户端。Exercism 是一个免费开源的编程练习社区，提供 70+ 种编程语言的上千个练习题（Exercises），让你在真实语言环境下通过做练习来精进编程技能，并获取社区 Mentor 的反馈。`exercism` 命令行工具解决的是「如何在终端里无缝下载练习题、提交解答、获取反馈」的问题，典型应用场景包括：用 `exercism download` 拉取指定题目的模板代码、本地编写解法后用 `exercism submit` 一键提交、以及用 `exercism configure` 配置 API token 与工作目录。

## 二、安装与升级

macOS 上推荐通过 Homebrew 安装 `exercism`，安装后 `exercism` 会自动加入 PATH，并可通过交互式 `exercism configure` 完成认证。

```bash
# 安装
brew install exercism

# 验证安装
exercism version
# 期望输出：exercism v3.5.8 (OpenAPI spec: v3.0.0)
# https://github.com/exercism/cli/releases

# 查看命令帮助
exercism help

# 升级到最新版
brew upgrade exercism

# 卸载
brew uninstall exercism
```

安装后首次使用需要配置 API token（在 Exercism 网站上「Settings」页获取个人 token）：

```bash
# 交互式配置（会提示输入 token 和选择工作目录）
exercism configure

# 手动指定 token 与工作目录（非交互，适合脚本）
exercism configure --token=YOUR_TOKEN --workspace=/Users/you/Exercism

# 查看当前配置
exercism configure --show

# 重新配置或清空配置
exercism configure --token=
```

## 三、常用命令速查

| 命令 | 参数/说明 | 示例 |
|------|-----------|------|
| `exercism version` | 查看版本号 | `exercism version` |
| `exercism configure` | 配置 token、工作目录（`--token`、`--workspace`、`--show`） | `exercism configure --show` |
| `exercism download` | 下载某个练习（`--exercise`、`--track`、`-t` 指定语言） | `exercism download --exercise hello-world --track go` |
| `exercism submit` | 提交解答（可一次提交多个文件） | `exercism submit hello_world.go` |
| `exercism open` | 在浏览器打开某个练习 | `exercism open --exercise hello-world --track go` |
| `exercism tracks` | 列出可用的语言 track | `exercism tracks` |
| `exercism workspace` | 显示当前工作目录 | `exercism workspace` |
| `exercism debug` | 显示调试信息（用于排查认证/网络问题） | `exercism debug` |
| `exercism help` | 查看命令帮助 | `exercism help submit` |

## 四、实际示例

### 示例 1：下载并完成你的第一个练习（hello-world）

```bash
# 1. 先配置好 token 与工作目录（首次使用）
exercism configure --token=YOUR_TOKEN --workspace=~/Exercism

# 2. 下载 Go 语言 track 的 hello-world 练习
exercism download --exercise=hello-world --track=go

# 3. 进入下载到的练习目录（路径通常为 ~/Exercism/go/hello-world）
cd ~/Exercism/go/hello-world

# 4. 查看题目与测试文件
ls
cat README.md

# 5. 编辑你的解法（hello_world.go），让测试通过
# 例如实现：func Hello() string { return "Hello, World!" }

# 6. 本地运行测试验证（Go 练习用 go test）
go test

# 7. 通过后提交解答
exercism submit hello_world.go
```

执行 `exercism submit` 后，CLI 会返回练习的网页链接，你的解答会出现在 Exercism 网站上等待 Mentor 审阅。

### 示例 2：提交多个文件（多文件练习）

```bash
# 某些练习涉及多个源文件，可一次全部提交
exercism submit src/foo.clj test/foo_test.clj

# 或直接提交整个目录中的源文件
exercism submit src/ src/foo.clj
```

### 示例 3：查看可用的语言 track 并浏览练习

```bash
# 1. 列出全部支持的语言 track
exercism tracks

# 2. 在浏览器中打开某个练习的页面（查看完整题目描述）
exercism open --exercise=isogram --track=python

# 3. 下载该练习到本地
exercism download --exercise=isogram --track=python
```

### 示例 4：在脚本 / CI 中非交互式使用

```bash
# 设置好环境变量后即可无交互使用
export EXERCISM_TOKEN=YOUR_TOKEN
export EXERCISM_WORKSPACE=~/Exercism

# 一条命令完成下载（无需 configure）
exercism download --exercise=hello-world --track=python
```

## 五、进阶技巧与配置

### 1. 环境变量替代交互配置

`exercism` 支持通过环境变量直接指定认证信息，在脚本或 CI 中无需手动 `configure`：

```bash
# 两个最核心的环境变量
export EXERCISM_TOKEN=你的API令牌
export EXERCISM_WORKSPACE=~/Exercism
```

设置后 `exercism download` 等命令会自动读取，适合在 CI 流水线中批量拉取/提交练习。

### 2. 配置文件位置

CLI 的配置保存在本地 JSON 文件里，可手动查看或修改：

```bash
# 配置文件路径（macOS）
~/.config/exercism/config.json

# 查看内容
cat ~/.config/exercism/config.json
```

该文件包含 `token`、`workspace`、`apibaseurl` 等字段，亦可直接用编辑器修改。

### 3. 设置 API 镜像/自建服务器

Exercism 支持自托管，可通过配置 `apibaseurl` 指向私有服务：

```bash
exercism configure --api=https://api.your-exercism-server.com
```

这对企业内部培训或离线环境很有用。

### 4. 与 Git 版本管理搭配

练习目录往往可纳入 Git 管理，方便追踪你的学习历程：

```bash
cd ~/Exercism
git init
git add .
git commit -m "start learning"
# 每完成一个练习提交一次，形成自己的练习历史
```

## 六、注意事项与常见问题

- **token 必须配置**：`exercism download`/`submit` 前必须 `exercism configure`，否则报错 `you are not logged in` 或 `authentication required`。token 在 Exercism 网站「Settings」页获取，不要泄露到公开仓库。
- **`--exercise` 参数是必需且精确匹配**：练习名大小写敏感（如 `hello-world` 不能写成 `hello_world`），下载前可用 `exercism tracks` 和网站题库确认准确名称。
- **`--track` 语言参数不能漏**：不同语言对应不同 track，`exercism download --exercise=hello-world` 不带 `--track` 会提示你选择语言；脚本中建议总是显式指定。
- **解答文件命名要对**：提交的文件名必须与题目要求的源文件一致，否则服务端可能无法正确识别或评审你的解法，报错 `Unable to find the file` 时检查文件名。
- **网络/代理问题**：下载或提交失败多因网络问题，报错 `connection refused` 或 `timed out` 时可设置 `HTTPS_PROXY` 环境变量，或用 `exercism debug` 排查。
- **版本差异**：老版本 CLI 语法（如 `exercism fetch`）已废弃，现统一为 `exercism download`；遇到 Unknown command 报错时用 `exercism help` 查看最新用法。