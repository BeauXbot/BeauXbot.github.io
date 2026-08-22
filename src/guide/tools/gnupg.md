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

5. **子密钥（Subkey）管理**：推荐"主密钥离线保管 + 子密钥日常使用"。生成时默认自动生成一个签名子钥与加密子钥；加密/签名操作实际使用的是子密钥，主密钥只用于签发/吊销子密钥。日常导出用子密钥，主密钥备份单独封存：
   ```bash
   gpg --list-secret-keys --with-subkey-fingerprint KEYID
   # 备份仅私钥子钥（不含主密钥），适合放入 YubiKey 等智能卡
   gpg --export-secret-subkeys KEYID! > subkey-backup.asc
   ```

6. **批量生成密钥（非交互）**：用 `--batch` + 参数文件可无人值守生成，适合脚本与 CI：
   ```bash
   # keygen-input 文件内容见下方"批量生成参数模板"
   gpg --batch --generate-key keygen-input
   ```
   参数模板示例（`keygen-input`）：
   ```
   %no-protection
   Key-Type: eddsa
   Key-Curve: ed25519
   Key-Usage: sign
   Subkey-Type: ecdh
   Subkey-Curve: cv25519
   Subkey-Usage: encrypt
   Name-Real: CI Bot
   Name-Email: ci@example.com
   Expire-Date: 1y
   %commit
   ```

7. **智能卡 / YubiKey**：GnuPG 支持 OpenPGP 智能卡，配合 `gpg-agent` 与 `scdaemon` 将私钥安全存放在硬件上。插入卡片后验证：
   ```bash
   gpg --card-status          # 查看卡片信息与公钥
   gpg --card-edit            # 交互式设置 PIN、管理密钥槽
   gpg --edit-key KEYID        # 用 keytocard 命令把子密钥转移到卡上
   ```

8. **对称加密（无公钥）**：只有口令、不需密钥对时用 `-c`，适合个人备份或临时分享：
   ```bash
   gpg -c secret.txt               # 提示输入口令，生成 secret.txt.gpg
   gpg -c --cipher-algo AES256 -o secret.asc secret.txt   # 指定算法并装甲
   ```

9. **输出重定向与内存安全**：所有明文文件操作建议显式加 `--output` 而非隐式改名，避免误覆盖。解密时若不加 `--output` 会直接打印到 stdout，请勿重定向到终端以外的危险命令；涉及敏感内容可配合 `--no-symkey-cache` 禁用对称密钥缓存。

## 六、注意事项与常见问题

- **私钥绝不外泄**：`--export-secret-keys` 导出的私钥一旦泄露，任何人可冒充你签名、解密你的数据。备份私钥文件时应加密存储，且不同平台分开保管。吊销证书（`gpg --gen-revoke KEYID`）应在生成密钥时就生成并妥善保存。
- **口令（passphrase）遗忘无法找回**：GPG 私钥加密后没有找回机制，忘记口令即永久失去该私钥，请务必使用密码管理器保存。
- **公钥信任与认证**：仅导入公钥不等于信任其身份，建议通过 `gpg --edit-key KEYID` 进入交互模式用 `trust` 命令设置信任级别，防止中间人攻击。
- **常见报错 `no valid OpenPGP data found`**：通常因解密/校验对象不是 GPG 数据（如未加密的普通文件），或导入的是一段被截断的 ASCII 内容——检查文件类型并确保命令与对象匹配。
- **性能与安全**：非对称加密（RSA/ECC）较慢，加密大文件时建议先压缩（如 `tar czf`）再加密；或先用对称加密（`gpg -c`）再用公钥加密会话密钥。生成密钥时选择 3072 位 RSA 或 256 位 ECC（如 `ed25519`）为目前推荐强度。

### 新手踩坑

- **改了密钥目录却不生效**：设置 `GNUPGHOME` 后若与旧目录一致，可用 `--homedir` 临时指定并确认 `gpg --list-keys` 有内容；多密钥集务必确认当前 `GNUPGHOME` 指向正确。
- **Git 提交报 `gpg: skipped ... no secret key`**：通常是 `user.signingkey` 填成了公钥指纹而非私钥 ID，或 `GPG_TTY` 未导出导致无法弹出口令窗口。在 shell 配置（`~/.zshrc`/`~/.bashrc`）里加入：
  ```bash
  export GPG_TTY=$(tty)
  ```
- **`gpg: keyserver receive failed: No name`**：多为 keyserver 域名拼写错误或网络被墙；改用国内可达的 keyserver 或 hkps 端口。
- **`Inappropriate ioctl for device`（macOS 弹窗问题）**：同上，多数因 `GPG_TTY` 未设置；或在 `~/.gnupg/gpg-agent.conf` 加 `pinentry-program` 指向图形 pinentry。
- **导入别人密钥后加密仍报找不到密钥**：确认用 `gpg --list-keys` 能看到对方 UID；多公钥同邮箱时用完整指纹或 `!` 后缀精确指定收件人，如 `-r 0xABC...!`。
- **吊销证书（revocation cert）务必离线保存**：它不加密私钥，任何人都可用它吊销你的公钥。生成后立即存到安全介质（U 盘/U 盾），不要和私钥放一起，也不要放在已导出的 `.asc` 备份里。

## 七、实战：与其它工具搭配与自动化

### 1. 加密压缩包并自动命名

```bash
# 先用 tar 压缩再用公钥加密（对称加密会先压缩，公钥加密不会）
tar czf backup.tar.gz ./important/
gpg -e -r alice@example.com -o backup.tar.gz.gpg backup.tar.gz
rm backup.tar.gz   # 安全删除明文压缩包
```

### 2. 与 find 批量加密/解密

```bash
# 批量加密某个目录下所有 .txt 文件（保留原文件）
find ./docs -name '*.txt' -exec gpg -e -r alice@example.com {} \;
# 批量解密所有 .gpg 文件到原始名
find ./docs -name '*.gpg' -exec sh -c 'gpg -d "$1" -o "${1%.gpg}"' _ {} \;
```

### 3. 与 rsync/scp/网络传输搭配

```bash
# 边加密边传输到远端，避免明文落盘
tar czf - ./confidential | gpg -e -r alice@example.com | ssh server 'cat > /remote/confidential.gpg'
# 远端解密
ssh server 'gpg -d /remote/confidential.gpg' | tar xzf -
```

### 4. Makefile 自动化签名发布包

```makefile
# Makefile —— 发布前自动签名并校验
VERSION := 2.4.8
KEYID   := YOUR_KEYID
PKG     := release-$(VERSION).tar.gz

dist: $(PKG)
	@echo "=== 签名发布包 ==="
	gpg --detach-sign --armor -u $(KEYID) $(PKG)
	@echo "=== 校验签名 ==="
	gpg --verify $(PKG).asc $(PKG)

verify:
	gpg --verify $(PKG).asc $(PKG)

clean:
	rm -f $(PKG) $(PKG).asc
```

### 5. GitHub Actions 中解密机密

CI 中常用"加密的机密文件"来安全传递密钥。先在本地用对称加密，再在 Actions 里解密：

```bash
# 本地：用口令加密 secrets.env（GPG 走非交互读环境变量 GPG_PASS）
echo "API_TOKEN=xxx" | gpg -c --cipher-algo AES256 -o secrets.env.gpg
# 把 secrets.env.gpg 提交入库，把口令放进 GitHub Secrets 名为 GPG_PASS
```

```yaml
# .github/workflows/release.yml（片段）
- name: 解密机密
  run: |
    echo "${{ secrets.GPG_PASS }}" | gpg --batch --yes --passphrase-fd 0 \
      -d secrets.env.gpg -o secrets.env
  # 随后 source secrets.env 或读取所需变量
```

> 提示：更推荐的做法是使用专用的"GPG 私钥"作为 Secret，配合 `crazy-max/ghaction-import-gpg` 在 Actions 里导入用于签名发布产物。将私钥 base64 后存入 GitHub Secrets，再加 passphrase Secret：
> ```yaml
> - uses: crazy-max/ghaction-import-gpg@v6
>   with:
>     gpg_private_key: ${{ secrets.GPG_PRIVATE_KEY }}
>     passphrase: ${{ secrets.GPG_PASSPHRASE }}
> ```

### 6. 与密码管理器/备份脚本结合

```bash
#!/usr/bin/env bash
# backup.sh —— 每日加密备份
set -euo pipefail
TS=$(date +%F)
tar czf "/tmp/bak-$TS.tar.gz" ~/Documents ~/Pictures
gpg -e -r alice@example.com -o "$HOME/backups/bak-$TS.tar.gz.gpg" "/tmp/bak-$TS.tar.gz"
rm "/tmp/bak-$TS.tar.gz"
echo "已备份到 $HOME/backups/bak-$TS.tar.gz.gpg"
```

### 7. 用脚本校验上游发布包（供应链安全）

```bash
# 下载软件及其签名与公钥，校验后安装
curl -fsSL -O https://example.com/app.tar.gz
curl -fsSL -O https://example.com/app.tar.gz.asc
gpg --keyserver hkps://keys.openpgp.org --recv-keys 0xABC...   # 获取开发者公钥
gpg --verify app.tar.gz.asc app.tar.gz && echo "签名有效，可安全安装"
```