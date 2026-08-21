---
title: gnupg
icon: gauge
category:
  - 工具
  - 加密工具
tag:
  - 系统与效率
  - gnupg
---

# gnupg（GPG 加密签名工具（PGP 实现））

> Homebrew 版本 2.4.8 ｜ 主页：见官方文档 ｜ 安装：`brew install gnupg`

## 一、它是什么

GnuPG（GNU Privacy Guard，简称 GPG）是 PGP（Pretty Good Privacy）加密标准的自由开源实现，用于数据加密、数字签名以及身份认证。它解决的核心问题是如何在公开网络上安全地传输数据、验证文件来源的真实性和完整性——典型场景包括：用公钥加密文件后发送给他人、对发布包或 Git 提交做数字签名、以及用密钥对加密和解密口令/备份。其加密算法基于现代非对称加密（如 RSA、ECC），安全性经过了全球广泛验证。

## 二、安装与升级

```bash
# 安装
brew install gnupg

# 升级（先更新 brew 索引）
brew update
brew upgrade gnupg

# 卸载
brew uninstall gnupg

# 验证安装成功（应输出类似 gpg (GnuPG) 2.4.8）
gpg --version
```

## 三、常用命令速查

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `gpg --full-generate-key` | 交互式生成新密钥对（推荐用 `--full-*` 以便自定义算法） | `gpg --full-generate-key` |
| `gpg --list-keys` | 列出本地所有公钥 | `gpg --list-keys` |
| `gpg --list-secret-keys` | 列出本地所有私钥 | `gpg --list-secret-keys` |
| `gpg --export` | 导出公钥（ASCII 格式用 `--armor`） | `gpg --armor --export alice@example.com` |
| `gpg --import` | 导入他人公钥 | `gpg --import bob.pub.asc` |
| `gpg -e` / `--encrypt` | 加密文件（配合 `-r` 指定收件人公钥） | `gpg -e -r bob@example.com secret.txt` |
| `gpg -d` / `--decrypt` | 解密文件 | `gpg -d secret.txt.gpg` |
| `gpg -s` / `--sign` | 对文件做签名（默认二进制签名） | `gpg -s release.tar.gz` |
| `gpg --verify` | 验证签名 | `gpg --verify release.tar.gz.sig release.tar.gz` |
| `gpg --delete-secret-keys` | 删除私钥（删除公钥用 `--delete-keys`） | `gpg --delete-secret-keys KEYID` |
| `gpg --export-secret-keys` | 备份私钥（务必加 `--armor` 并妥善保管） | `gpg --armor --export-secret-keys KEYID > backup.asc` |

## 四、实际示例

### 示例 1：生成密钥对

```bash
# 交互式生成，按提示选择密钥类型与用途，设置口令（passphrase）
gpg --full-generate-key

# 查看生成的密钥
gpg --list-keys

# 输出示例（KEYID 是第二行十六进制指纹的后 16 位）
# pub   rsa3072 2026-01-01 [SC] [有效至: 2028-01-01]
#       ABCDEF0123456789ABCDEF0123456789ABCDEF01
# uid           [ 终极 ] Alice <alice@example.com>
# sub   rsa3072 2026-01-01 [E] [有效至: 2028-01-01]
```

### 示例 2：加密与解密文件

```bash
# 1. 导出自己的公钥发给对方（或导入对方的公钥）
gpg --armor --export alice@example.com > alice.pub.asc

# 2. 导入对方（Bob）的公钥
gpg --import bob.pub.asc

# 3. 用 Bob 的公钥加密文件（只有 Bob 的私钥能解密）
echo "绝密内容" > secret.txt
gpg -e -r bob@example.com secret.txt
# 生成 secret.txt.gpg

# 4. Bob 解密
gpg -d secret.txt.gpg
# 输出原始内容到屏幕；如需写回文件用 --output
gpg -d secret.txt.gpg --output secret.txt
```

### 示例 3：签名并校验文件完整性

```bash
# 1. 对发布包做二进制签名
gpg -s release-2.4.8.tar.gz
# 生成 release-2.4.8.tar.gz.gpg（内含原文+签名）

# 2. 单独分离签名（--detach-sign），不修改原文件
gpg --detach-sign --armor release-2.4.8.tar.gz
# 生成 release-2.4.8.tar.gz.asc

# 3. 校验签名
gpg --verify release-2.4.8.tar.gz.asc release-2.4.8.tar.gz
# 输出 gpg: 好的签名 以及签名者身份，说明文件未被篡改
```

## 五、进阶技巧与配置

1. **为 Git 提交签名**：GPG 与 Git 搭配是最常见的场景。生成密钥后执行：
   ```bash
   git config --global user.signingkey KEYID
   git config --global commit.gpgsign true   # 之后所有提交自动签名
   git commit -S -m "签名提交"              # 或临时用 -S 强制签名
   ```
   在 GitHub/GitLab 的 SSH 或 GPG 设置里粘贴 `gpg --armor --export KEYID` 的输出来绑定身份。

2. **配置文件位置**：用户级配置在 `~/.gnupg/`，常用文件为 `~/.gnupg/gpg.conf`（命令行默认参数）、`~/.gnupg/dirmngr.conf`（密钥服务器网络）。可在 `gpg.conf` 里持久化常用选项，例如：
   ```bash
   # ~/.gnupg/gpg.conf
   default-key KEYID
   keyserver hkps://keys.openpgp.org
   auto-key-retrieve
   ```

3. **明文输出与二进制混合**：加密时若希望可读/可传输到邮件，加 `--armor` 生成 ASCII 装甲格式（`.asc`）；不加则默认二进制。命令行参数优先级高于配置文件。

4. **环境变量**：GPG 常用 `GNUPGHOME` 指定密钥目录（默认 `~/.gnupg`），便于多密钥集隔离或用于 CI：
   ```bash
   export GNUPGHOME=/path/to/my/gpg-home
   gpg --list-keys
   ```

## 六、注意事项与常见问题

- **私钥绝不外泄**：`--export-secret-keys` 导出的私钥一旦泄露，任何人可冒充你签名、解密你的数据。备份私钥文件时应加密存储，且不同平台分开保管。吊销证书（`gpg --gen-revoke KEYID`）应在生成密钥时就生成并妥善保存。
- **口令（passphrase）遗忘无法找回**：GPG 私钥加密后没有找回机制，忘记口令即永久失去该私钥，请务必使用密码管理器保存。
- **公钥信任与认证**：仅导入公钥不等于信任其身份，建议通过 `gpg --edit-key KEYID` 进入交互模式用 `trust` 命令设置信任级别，防止中间人攻击。
- **常见报错 `no valid OpenPGP data found`**：通常因解密/校验对象不是 GPG 数据（如未加密的普通文件），或导入的是一段被截断的 ASCII 内容——检查文件类型并确保命令与对象匹配。
- **性能与安全**：非对称加密（RSA/ECC）较慢，加密大文件时建议先压缩（如 `tar czf`）再加密；或先用对称加密（`gpg -c`）再用公钥加密会话密钥。生成密钥时选择 3072 位 RSA 或 256 位 ECC（如 `ed25519`）为目前推荐强度。