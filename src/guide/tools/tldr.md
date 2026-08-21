---
title: tldr
icon: gauge
category:
  - 工具
  - 帮助文档
tag:
  - 系统效率
  - tldr
---

# tldr（简化的命令手册（community cheatsheets））

> Homebrew 版本 1.0 ｜ 主页：见官方文档 ｜ 安装：`brew install tldr`

## 一、它是什么

tldr（Too Long; Didn't Read）是一个"简化的命令行手册"工具：它把 Linux/Unix 命令的官方 `man` 手册浓缩成一张张**精简的速查表（cheatsheet）**，只保留最常用、最实用的参数和示例，让你一眼就能上手某个命令，而不是在几千行的 man 手册里大海捞针。它解决的是"知道有某个命令但记不住用法""懒得翻 man 手册"的痛点，典型应用场景是：快速复习 `tar`、`git`、`awk` 等常用命令的常见组合，或在新装的服务器上快速确认某个工具怎么用。

## 二、安装与升级

```bash
# 安装
brew install tldr

# 升级
brew upgrade tldr

# 卸载
brew uninstall tldr

# 验证安装成功（查看版本）
tldr --version
```

安装后 `tldr` 即进入 PATH，直接可全局调用。若之前用 `npm install -g tldr` 装过别的实现，建议先卸载旧版再 `brew install` 以免命令冲突。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `tldr 命令名` | 查看某个命令的简化手册 | `tldr tar` |
| `-p, --platform=平台` | 指定操作系统平台（linux / osx / sunos / windows / common） | `tldr -p osx open` |
| `-r, --render=路径` | 渲染本地的手册文件（用于测试/自建） | `tldr -r ./mypage.md tar` |
| `-u, --update` | 更新本地手册数据库 | `tldr --update` |
| `-c, --clear-cache` | 清空本地数据库缓存 | `tldr --clear-cache` |
| `-l, --list` | 列出本地数据库里的全部命令条目 | `tldr --list` |
| `-C, --color` | 强制彩色输出 | `tldr -C git` |
| `-V, --verbose` | 更新/清空缓存时显示详细过程 | `tldr -u -V` |

> 提示：`-V`（大写）是 verbose，`-v`（小写）才是版本号。

## 四、实际示例

### 示例 1：查看 `tar` 命令的常用用法

```bash
# 准备：无需任何准备，tldr 首次使用时会自动下载数据库
tldr tar
```

输出形如：

```
tar

  Archiving utility. Often combined with a compression method, such as gzip or bzip.
  More information: https://www.gnu.org/software/tar/.

  - Create an archive from files:
      tar cf target.tar file1 file2 file3

  - Create a gzipped archive:
      tar czf target.tar.gz file1 file2 file3

  - Extract a (compressed) archive into the current directory:
      tar xzf source.tar.gz
  ...
```

### 示例 2：按平台查看（macOS 与 Linux 命令差异）

```bash
# macOS 上查看 open 命令的速查（open 是 mac 专属）
tldr -p osx open

# 查看 Linux 平台下的 ifconfig（不同平台参数不同）
tldr -p linux ifconfig
```

### 示例 3：更新缓存并查看全部可用命令

```bash
# 更新本地数据库到最新
tldr --update

# 列出本地已有全部命令条目（方便发现新工具）
tldr --list
```

### 示例 4：快速对比多个相似命令

```bash
# 一口气查三个压缩/归档相关命令，快速对比用法
tldr tar && tldr zip && tldr gzip
```

## 五、进阶技巧与配置

**1. 用 shell 别名绑定常用命令速查**

在 `~/.zshrc` 或 `~/.bashrc` 里加：

```bash
alias tl='tldr'        # 少敲几个字
alias man2='tldr'      # 把 tldr 当"精简 man"用
```

**2. 与 `which`/`command -v` 搭配快速查工具**

```bash
# 先确认命令确实存在，再查用法
command -v jq && tldr jq
```

**3. 与 fzf 联动，本地数据库交互式浏览**

```bash
# 用 fzf 在本地命令列表里模糊选择再查看
tldr --list | fzf | xargs -I{} tldr {}
```

**4. 数据库与缓存管理**

- 首次运行 `tldr` 时自动下载数据库并缓存到本地；之后离线也能查。
- 若内容过旧或想强制刷新，运行 `tldr --update`。
- 清理缓存用 `tldr --clear-cache`，配合 `-V` 可看清理了哪些文件。
- Homebrew 版的数据库默认放在 Homebrew 缓存目录下，一般无需手动干预。

## 六、注意事项与常见问题

**1. 首次使用需要联网**

第一次运行 `tldr` 会从网络拉取数据库，如果没网或代理配置不对，会报错或卡住。解决办法：检查网络/代理后重试，或先 `tldr --update` 手动触发下载。

**2. `-v` 与 `-V` 别搞混**

- `tldr -v`：打印版本号。
- `tldr -V`（大写）：配合 `-u`/`-c` 显示详细输出。
新手常把大写当版本号用而报错。

**3. 命令名大小写与平台差异**

tldr 的速查表按平台区分，`osx`（macOS）与 `linux` 的同名命令参数可能不同。在 macOS 上查 Linux 专用命令（如 `apt`）时，记得加 `-p linux` 否则可能提示找不到。

**4. 找不到某个命令**

如果 `tldr foo` 提示找不到，可能原因：
- 该命令确实没有对应的速查表（tldr 覆盖的是社区常见命令）。
- 数据库太旧，先 `tldr --update` 再试。
- 也可以用 `tldr --list | grep foo` 确认是否收录。

**5. 它只是速查表，不是完整手册**

tldr 只提供最常用参数，不覆盖 man 的全部细节。遇到边界情况、高级配置或版本差异时，仍应以 `man 命令名` 或官方文档为准——把 tldr 当作"快速上手入口"，man 当作"权威参考"。

**6. 数据库是社区维护的，可能有瑕疵**

tldr 的速查表由 tldr-pages 社区众包维护，个别条目可能过时或不完整。命令行为与预期不符时，多结合 `man` 和 `--version` 交叉核对。