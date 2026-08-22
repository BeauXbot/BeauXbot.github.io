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

`exercism` 支持通过环境变量直接指定认证信息，在脚本或 CI 中无需手动 `configure`。优先级上，环境变量会**覆盖**配置文件里已存在的同名设置，适合做临时切换或注入机密：

```bash
# 两个最核心的环境变量
export EXERCISM_TOKEN=你的API令牌
export EXERCISM_WORKSPACE=~/Exercism

# 一次性注入，命令结束后自动失效，更安全
EXERCISM_TOKEN=xxx exercism download --exercise=hello-world --track=python
```

> 安全提示：不要在 `.bashrc` / `.zshrc` 里硬编码 token。推荐用 `~/.config/exercism/config.json` 保存（权限 600），或通过 shell 密钥管理（`pass`、Keychain、CI Secrets）注入环境变量。

### 2. 配置文件位置与全部字段

CLI 的配置保存在本地 JSON 文件里，可手动查看或修改：

```bash
# 配置文件路径（macOS / Linux）
~/.config/exercism/config.json

# 查看内容
cat ~/.config/exercism/config.json
```

该文件的完整字段及其含义如下：

| 字段 | 说明 | 示例值 |
|------|------|--------|
| `token` | 个人 API 令牌，鉴权核心 | `"your-token"` |
| `workspace` | 练习下载根目录 | `"/Users/you/Exercism"` |
| `apibaseurl` | API 服务地址，默认官方；自建或镜像时改动 | `"https://api.exercism.io"` |
| `show` | 调试用的标记（一般不手动改） | `false` |

> 注意：该配置文件含 token，属于敏感信息。请确保权限收紧：`chmod 600 ~/.config/exercism/config.json`，并把它加入 `.gitignore` 防止误提交。

### 3. 设置 API 镜像 / 自建服务器

Exercism 支持自托管，可通过配置 `apibaseurl` 指向私有服务：

```bash
# 指向自建/镜像服务
exercism configure --api=https://api.your-exercism-server.com

# 查看配置确认生效
exercism configure --show
```

这对企业内部培训、内网离线环境、或高校教学平台很有用。切换回官方只需再 `--api=https://api.exercism.io`。配合 `exercism debug` 可确认请求确实打到目标主机。

### 4. 与 Git 版本管理搭配

练习目录往往可纳入 Git 管理，方便追踪你的学习历程：

```bash
cd ~/Exercism
git init
git add .
git commit -m "start learning"
# 每完成一个练习提交一次，形成自己的练习历史
```

进阶用法：为每个练习建立独立分支或 tag，方便回溯某一题不同版本：

```bash
# 完成一题后打 tag 记录
cd ~/Exercism/go/hello-world
git init
git add . && git commit -m "solve hello-world"
git tag v1-hello-world
# 之后再想改题，就 checkout 旧版本对比
git checkout v1-hello-world
```

> 提示：若工作目录顶层已 `git init`，下载进来的练习目录会被当作嵌套仓库，请用 `git` 的子模块或忽略外层 `.git`。更推荐**每个 track 目录单独建仓库**，结构更清晰。

### 5. 配置编写工具 / 编辑器集成

把 `exercism workspace` 指向你日常开发目录，并用别名快速定位题目：

```bash
# 在 shell 配置里加别名
alias exw='cd "$(exercism workspace)"'          # 跳到工作目录根
alias exo='exercism open --exercise'             # 快速在浏览器打开题目
# 用后用法示例：exo hello-world --track go

# 或直接用 fzf 交互式跳转（需已装 fzf）
function excd() {
  local dir
  dir=$(find "$(exercism workspace)" -maxdepth 3 -type d | fzf) && cd "$dir"
}
```

### 6. 只下载题目，不自动打开浏览器

默认 `exercism download` 有时会连带打开浏览器，脚本或自动化场景下可用参数抑制：

```bash
# 部分 CLI 版本支持 --no-open
exercism download --exercise=hello-world --track=go --no-open
```

若你的版本不带 `--no-open`，可改用环境变量并关闭交互：`export CI=true` 后再执行 `exercism download`，多数命令在非 TTY/CI 下会跳过浏览器与交互提示。

## 六、注意事项与常见问题

### 常见报错与解决办法

- **`you are not logged in` / `authentication required`**：token 未配置或已失效。运行 `exercism configure --token=你的token` 重新配置；若失效，去网站「Settings」重新生成 token。
- **`Unable to find the file`**：提交的文件名与题目要求不一致。回到题目目录核对 `README.md` 里指定的文件名（如 `hello_world.go` vs `hello_world_test.go`），只提交源文件不提交测试文件。
- **`exercise 'xxx' not found`**：练习名拼写或大小写不对。`exercism download --exercise=hello-world` 不能写成 `hello_world`；先在 `exercism tracks` 或网站上确认准确 slug。
- **`no track found with id 'xxx'`**：`--track` 的语言 ID 写错。如 Rust 是 `rust`、C++ 是 `cpp`、C 是 `c`、.NET 是 `csharp`，用 `exercism tracks` 核对。
- **`connection refused` / `timed out` / `read: connection reset`**：网络问题。设置代理后重试：

  ```bash
  # 使用代理（企业/受限网络常见）
  export HTTPS_PROXY=http://127.0.0.1:7890
  export HTTP_PROXY=http://127.0.0.1:7890
  # 然后执行 exercism debug 确认连通性
  exercism debug
  ```

- **`401 Unauthorized`**：token 无效或过期。重新在网站生成 token 并 `exercism configure --token=...`。
- **`Unknown command "fetch"`**：`fetch` 是旧版命令，新版已统一为 `download`。用 `exercism help` 查看最新命令列表。

### 新手易踩的坑

- **把 token 提交到公开仓库**：`~/.config/exercism/config.json` 或 `.env` 里含 token，一旦提交到 GitHub 即泄露。务必加入 `.gitignore`，并建议在 Exercism 后台**定期轮换 token**。
- **工作目录里建了嵌套 Git 仓库**：在 `~/Exercism` 顶层 `git init` 后，又下载新练习，会形成子目录内再建 `.git` 的嵌套仓库，导致提交混乱。建议每个 track 或整个工作目录统一管理，或利用 `.gitignore` 忽略嵌套。
- **提交了测试文件**：`exercism submit` 只提交你的**解答源文件**，不要提交 `_test` 结尾的测试文件；提交多余文件可能让评审失败。
- **忽略题目自带的约束**：很多练习有"不得导入 XX 包""不得修改接口签名"等约束，测试通过不等于合规。提交前通读 `README.md` 和 `.meta/` 里的 instructions。
- **本地测试通过但提交失败**：通常是因为你改了测试文件或用了与平台不同的编译器/依赖版本。**不要修改测试文件**，只改源文件；必要时 `go mod tidy`、`npm install` 让依赖齐全。

### 性能与使用建议

- 每次下载会拷贝模板，练习多了建议按需下载，不需要整包拉取所有题。
- `exercism download` 到**已存在同题目录**时会覆盖或报错，重做某题时先备份旧解法再下载。
- 尽量保持 `--track` 与 `--exercise` 全部显式，避免交互选择拖慢脚本。

## 七、实战：与其它工具搭配与自动化

### 1. 用脚本批量下载一批练习

练习之间相互独立，可用循环批量拉取同一 track 的多道题：

```bash
#!/usr/bin/env bash
# 批量下载 Python track 的几道入门题
export EXERCISM_WORKSPACE="$HOME/Exercism"
EXERCISES="hello-world two-fer isogram acronym rna-transcription"
for e in $EXERCISES; do
  echo "==> downloading $e"
  exercism download --exercise="$e" --track=python || echo "!! $e 下载失败"
done
```

> 说明：`exercism download` 一次只能下一道题，循环或写个 `download-list.sh` 即可成批处理。`||` 让单题失败不中断整个脚本。

### 2. 结合测试框架做「测试驱动（TDD）」闭环

每个下载的练习天然自带测试文件，正是做 TDD 的绝佳场景。以 Go 为例的完整闭环：

```bash
cd ~/Exercism/go/hello-world

# 1. 先跑一次测试，看到失败（红）
go test          # 输出 FAIL，因为 Hello() 尚未实现

# 2. 编辑源文件实现最小解法
cat > hello_world.go <<'EOF'
package hello

func Hello() string { return "Hello, World!" }
EOF

# 3. 再跑测试，看到通过（绿）
go test          # 输出 ok

# 4. 提交，获得 Mentor 反馈
exercism submit hello_world.go
```

按语言选择测试命令：Go 用 `go test`、Python 用 `python -m pytest` 或 `python -m unittest`、Rust 用 `cargo test`、JS/TS 用 `npm test` 或 `node --test`、C++ 用 `cmake` 后跑测试目标。**测试文件的路径和断言就是题目给的需求规格**，养成先看测试再写实现的习惯，能显著提升做题效率。

### 3. 用 Makefile 统一管理练习

把「下载 → 测试 → 提交」封装成 Makefile，一个 `make` 完成全流程：

```makefile
# 放到每个练习目录下使用
TRACK := go
EXERCISE := hello-world

download:
	exercism download --exercise=$(EXERCISE) --track=$(TRACK)

test:
	cd $(TRACK)/$(EXERCISE) && go test -v

submit:
	cd $(TRACK)/$(EXERCISE) && exercism submit .

all: download test submit
```

配合用法：`make download`、`make test`、`make submit`，或一条 `make` 全做。不同语言把 `test` 目标换成对应测试命令即可。

### 4. 接入 Git 钩子自动校验（pre-commit）

在练习仓库里加 pre-commit 钩子，提交前先跑测试，防止把不过测的代码提交：

```bash
# 在练习仓库里创建 .git/hooks/pre-commit
cat > .git/hooks/pre-commit <<'EOF'
#!/usr/bin/env bash
# 按语言跑对应测试，失败则阻止提交（以 Python 为例）
python -m pytest -q || { echo "测试未通过，禁止提交"; exit 1; }
EOF
chmod +x .git/hooks/pre-commit
```

### 5. 在 GitHub Actions 里做 CI 自动提交/校验

结合自己的练习仓库，可在 CI 中自动化「下载 → 测试 → 提交」：

```yaml
# .github/workflows/exercism.yml（放到你的练习仓库）
name: exercism-ci
on:
  push:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Run tests
        run: go test ./...
        working-directory: go/hello-world
      - name: Submit to Exercism
        run: exercism submit hello_world.go
        working-directory: go/hello-world
        env:
          EXERCISM_TOKEN: ${{ secrets.EXERCISM_TOKEN }}   # 仓库 Settings → Secrets 里配置
```

> 把 token 放入 GitHub Secrets 而非明文，避免泄露。这样每次 push 即自动跑测试并提交最新解法。

### 6. 与 `gh`/`tldr` 等工具组合

把练习与文档查询、GitHub 命令结合，形成"学习 + 版本管理"的完整工作流：

```bash
# 用 gh 给练习仓库建私有仓库并推送
cd ~/Exercism
gh repo create my-exercism --private --source=. --push

# 用 tldr 快速查某语言测试命令
tldr go test
tldr pytest

# 批量打 tag 标记完成的练习（配合 find + git）
find ~/Exercism -name README.md -path '*/go/*' -exec dirname {} \; \
  | while read d; do (cd "$d" && git tag -f "done-$(basename $d)" 2>/dev/null); done
```

### 7. 生产级学习实践建议

- **为每个练习独立提交、独立 tag**：让学习历史可按题检索、可回溯。
- **定期 `exercism configure --show` 检查配置**：确认 token 未过期、`workspace` 未漂移、`apibaseurl` 指向未被误改。
- **不要在公开仓库放解题答案**：Exercism 社区鼓励独立思考，公开大范围解法会影响他人体验，也违反平台精神；个人私有仓库记录即可。
- **离线环境**：无法访问官方 API 时，用 `apibaseurl` 指向内网镜像，或提前批量 `exercism download` 缓存到本地 Git 仓库再断网做题。