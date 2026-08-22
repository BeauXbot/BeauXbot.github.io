---
title: libsodium
icon: code
category:
  - 工具
  - 加密库
tag:
  - 开发构建
  - libsodium
---

# libsodium（现代加密/解密 C 库）

> Homebrew 版本 1.0.20 ｜ 主页：见官方文档 ｜ 安装：`brew install libsodium`

## 一、它是什么

libsodium 是一个现代、易用、可移植的加密/解密 C 库，它把 NaCl（Networking and Cryptography library）中经过实战验证的密码学原语封装成一套**简洁、安全、面向误用的 API**。它的核心设计哲学是"默认安全"——尽量避免开发者因选错算法、用错参数或误用底层细节而引入漏洞，同时提供密码学领域的多项推荐实现。

典型应用场景：消息/文件的对称与非对称加密、数字签名、密钥交换（如 X25519）、哈希与密码哈希（如 Argon2、scrypt）、一次性口令（TOTP/HOTP），以及随机数生成等。它被大量语言绑定（Python、Go、Rust、Node、PHP 等）作为底层密码学后端，广泛用于聊天工具、即时通讯、网络协议和各类需要加密能力的应用。

## 二、安装与升级

通过 Homebrew 安装、升级、卸载，以及验证：

```bash
# 安装
brew install libsodium

# 升级到最新版
brew upgrade libsodium

# 卸载
brew uninstall libsodium

# 验证安装成功（应输出类似 1.0.20）
pkg-config --modversion libsodium

# 查看是否已在系统中正确链接
brew info libsodium

# 确认库文件存在（Apple Silicon 路径）
ls /opt/homebrew/lib/libsodium.*
```

`pkg-config --modversion libsodium` 输出 `1.0.20` 即表示安装成功。若提示 `command not found`，先确认 `/opt/homebrew/bin`（Apple Silicon）或 `/usr/local/bin`（Intel）已在 PATH 中。

## 三、常用命令速查

libsodium 是一个**库**而非命令行工具，因此"命令"体现为 `pkg-config` 查询、编译链接参数以及库内常用函数调用。下表给出最常见的用法：

| 命令/函数 | 参数说明 | 示例 |
| --- | --- | --- |
| `pkg-config --cflags --libs libsodium` | 输出编译与链接参数 | `cc app.c $(pkg-config --cflags --libs libsodium)` |
| `sodium_init()` | 初始化库（需在其它函数前调用） | `if (sodium_init() < 0) return 1;` |
| `randombytes_buf(buf, n)` | 生成 n 字节安全随机数 | `randombytes_buf(key, 32);` |
| `crypto_aead_xchacha20poly1305_ietf_encrypt()` | AEAD 认证加密（带密钥交换） | 见示例 2 |
| `crypto_box_easy()` | 公钥认证加密（密封/非密封） | 见示例 2 |
| `crypto_sign_detached()` | 生成 Ed25519 签名 | 见示例 3 |
| `crypto_pwhash_str()` | 密码哈希（Argon2id） | 见示例 4 |
| `crypto_secretbox_easy()` | 对称密钥加密 | `crypto_secretbox_easy(c, m, mlen, nonce, key)` |
| `sodium_mlock()` / `sodium_munlock()` | 锁定/解锁内存防交换到磁盘 | `sodium_mlock(secret, sizeof secret);` |

## 四、实际示例

libsodium 是纯库，以下示例演示如何在 C/C++ 中链接并使用它做加密、签名与密码哈希。

### 示例 1：最小可编译的对称加密（secretbox）

用 C 编写一个使用对称密钥加密/解密的完整程序：

```bash
# 1. 准备源码
cat > secretbox_demo.c <<'EOF'
#include <sodium.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    if (sodium_init() < 0) { /* 初始化失败，无法使用密码学函数 */
        return 1;
    }
    unsigned char key[crypto_secretbox_KEYBYTES];
    unsigned char nonce[crypto_secretbox_NONCEBYTES];
    randombytes_buf(key, sizeof key);
    randombytes_buf(nonce, sizeof nonce);

    const char *msg = "Hello, libsodium!";
    unsigned long long mlen = strlen(msg) + 1; /* 含结尾 '\0' */

    unsigned char ciphertext[mlen + crypto_secretbox_MACBYTES];
    crypto_secretbox_easy(ciphertext, (const unsigned char *)msg, mlen, nonce, key);

    /* 解密验证 */
    unsigned char decrypted[mlen];
    if (crypto_secretbox_open_easy(decrypted, ciphertext, sizeof ciphertext, nonce, key) != 0) {
        printf("解密失败，数据被篡改或密钥错误\n");
        return 1;
    }
    printf("解密成功: %s\n", decrypted);
    return 0;
}
EOF

# 2. 编译并链接（pkg-config 自动带入 -I 和 -L/-lsodium）
cc secretbox_demo.c -o secretbox_demo $(pkg-config --cflags --libs libsodium)

# 3. 运行
./secretbox_demo
```

输出应为 `解密成功: Hello, libsodium!`。若更改密文中任意一个字节再解密，`crypto_secretbox_open_easy` 会返回非 0，体现 AEAD 的完整性校验。

### 示例 2：公钥加密与密钥交换（crypto_box / X25519）

生成密钥对并用对方公钥加密，这是端到端加密的典型模式：

```bash
cat > box_demo.c <<'EOF'
#include <sodium.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    if (sodium_init() < 0) return 1;

    unsigned char alice_pk[crypto_box_PUBLICKEYBYTES];
    unsigned char alice_sk[crypto_box_SECRETKEYBYTES];
    unsigned char bob_pk[crypto_box_PUBLICKEYBYTES];
    unsigned char bob_sk[crypto_box_SECRETKEYBYTES];
    crypto_box_keypair(alice_pk, alice_sk);
    crypto_box_keypair(bob_pk, bob_sk);

    const char *msg = "secret for Bob";
    unsigned long long mlen = strlen(msg) + 1;
    unsigned char nonce[crypto_box_NONCEBYTES];
    randombytes_buf(nonce, sizeof nonce);

    /* Alice 用 Bob 公钥 + 自己私钥加密 */
    unsigned char ciphertext[mlen + crypto_box_MACBYTES];
    crypto_box_easy(ciphertext, (const unsigned char *)msg, mlen, nonce,
                    bob_pk, alice_sk);

    /* Bob 用自己的私钥 + Alice 公钥解密 */
    unsigned char decrypted[mlen];
    if (crypto_box_open_easy(decrypted, ciphertext, sizeof ciphertext, nonce,
                             alice_pk, bob_sk) != 0) {
        printf("解密失败\n");
        return 1;
    }
    printf("Bob 收到: %s\n", decrypted);
    return 0;
}
EOF

cc box_demo.c -o box_demo $(pkg-config --cflags --libs libsodium)
./box_demo
```

输出为 `Bob 收到: secret for Bob`。双方各自持有公钥/私钥，即可在不共享对称密钥的情况下安全通信。

### 示例 3：Ed25519 数字签名

用私钥签名、公钥验签，适用于软件包、文档或消息的完整性校验：

```bash
cat > sign_demo.c <<'EOF'
#include <sodium.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    if (sodium_init() < 0) return 1;

    unsigned char pk[crypto_sign_PUBLICKEYBYTES];
    unsigned char sk[crypto_sign_SECRETKEYBYTES];
    crypto_sign_keypair(pk, sk);

    const char *msg = "important message";
    unsigned long long mlen = strlen(msg) + 1;
    unsigned char sig[crypto_sign_BYTES];

    /* 对消息生成分离式签名 */
    crypto_sign_detached(sig, NULL, (const unsigned char *)msg, mlen, sk);

    /* 用公钥验证签名 */
    if (crypto_sign_verify_detached(sig, (const unsigned char *)msg, mlen, pk) == 0) {
        printf("签名有效\n");
    } else {
        printf("签名无效\n");
    }
    return 0;
}
EOF

cc sign_demo.c -o sign_demo $(pkg-config --cflags --libs libsodium)
./sign_demo
```

输出为 `签名有效`。将 `msg` 改为另一串字符串再验签，会输出 `签名无效`。

### 示例 4：密码哈希与校验（Argon2id）

存储密码时用 `crypto_pwhash_str` 生成带随机盐的哈希字符串，用 `crypto_pwhash_str_verify` 校验，切勿明文存储密码：

```bash
cat > pwhash_demo.c <<'EOF'
#include <sodium.h>
#include <stdio.h>

int main(void) {
    if (sodium_init() < 0) return 1;

    const char *password = "correct horse battery staple";
    char hashed[crypto_pwhash_STRBYTES];

    /* 生成 Argon2id 哈希（自动使用安全默认参数并内嵌随机盐） */
    if (crypto_pwhash_str(hashed, password, strlen(password),
                          crypto_pwhash_OPSLIMIT_INTERACTIVE,
                          crypto_pwhash_MEMLIMIT_INTERACTIVE) != 0) {
        printf("内存不足，哈希失败\n");
        return 1;
    }
    printf("哈希: %s\n", hashed);

    /* 校验正确密码 */
    if (crypto_pwhash_str_verify(hashed, password, strlen(password)) == 0) {
        printf("密码校验通过\n");
    } else {
        printf("密码校验失败\n");
    }
    return 0;
}
EOF

cc pwhash_demo.c -o pwhash_demo $(pkg-config --cflags --libs libsodium)
./pwhash_demo
```

输出包含一长串以 `$argon2id$` 开头的哈希，并打印 `密码校验通过`。同一密码每次运行得到的哈希不同，因为盐是随机的。

## 五、进阶技巧与配置

### 1. 用 pkg-config 简化编译，避免手写路径

只要保证 `PKG_CONFIG_PATH` 指向 Homebrew 的 `lib/pkgconfig`，即可用 `$(pkg-config --cflags --libs libsodium)` 自动获得正确的头文件与链接路径，无需手写 `-I` 和 `-L`。若 CMake 使用，可这样引入：

```cmake
# CMakeLists.txt 中
find_package(PkgConfig)
pkg_check_modules(SODIUM REQUIRED libsodium)
target_link_libraries(myapp PRIVATE ${SODIUM_LIBRARIES})
target_include_directories(myapp PRIVATE ${SODIUM_INCLUDE_DIRS})
```

> **提示**：Homebrew 安装的 pkg-config 文件位于 `$(brew --prefix libsodium)/lib/pkgconfig/sodium.pc`。若 `pkg-config` 找不到，显式导出：
>
> ```bash
> export PKG_CONFIG_PATH="$(brew --prefix libsodium)/lib/pkgconfig:${PKG_CONFIG_PATH}"
> ```

### 2. 一个可直接复用的通用 Makefile 配置

把常用编译、链接与测试步骤固化到 `Makefile`，可避免每次敲一长串命令：

```makefile
CC      ?= cc
CFLAGS  ?= -O2 -Wall -Wextra
LIBS    := $(shell pkg-config --cflags --libs libsodium)

all: secretbox_demo box_demo sign_demo pwhash_demo aead_demo

%.o: %.c
	$(CC) $(CFLAGS) $(LIBS) -c $< -o $@

secretbox_demo: secretbox_demo.o
	$(CC) $^ $(LIBS) -o $@

box_demo: box_demo.o
	$(CC) $^ $(LIBS) -o $@

sign_demo: sign_demo.o
	$(CC) $^ $(LIBS) -o $@

pwhash_demo: pwhash_demo.o
	$(CC) $^ $(LIBS) -o $@

aead_demo: aead_demo.o
	$(CC) $^ $(LIBS) -o $@

test: all
	./secretbox_demo
	./box_demo
	./sign_demo
	./pwhash_demo
	./aead_demo

clean:
	rm -f *.o secretbox_demo box_demo sign_demo pwhash_demo aead_demo

.PHONY: all test clean
```

### 3. 需要 AES 加速时启用编译期宏

libsodium 在部分平台默认可检测 AES-NI 并自动启用。若需显式控制，可在编译时定义宏：

```bash
cc aes_demo.c -o aes_demo $(pkg-config --cflags --libs libsodium)
# 若需强制开启 AES 硬件加速，可加 -Dsodium_SSE2 等构建相关宏（依赖平台）
```

多数场景不必手动干预，优先使用 `crypto_aead_xchacha20poly1305_ietf_*` 这类推荐算法，其默认参数即安全。

### 4. 内存安全：锁定密钥并清除敏感数据

密钥常驻内存会被换页到磁盘，存在泄露风险。用 `sodium_mlock` 锁定，用 `sodium_memzero` 或 `sodium_free` 及时清除：

```c
unsigned char key[crypto_secretbox_KEYBYTES];
randombytes_buf(key, sizeof key);
sodium_mlock(key, sizeof key);          /* 防止被换出到磁盘 */
/* ... 使用 key ... */
sodium_memzero(key, sizeof key);        /* 用完后立即清零 */
sodium_munlock(key, sizeof key);
```

### 5. 对称密钥的派生：`crypto_generichash` 与 `crypto_kdf`

从主密钥派生子密钥，或用密钥+上下文派生多个用途不同的子密钥，是密码学实践中的常见需求：

```c
#include <sodium.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    if (sodium_init() < 0) return 1;

    /* crypto_kdf：由主密钥派生多个子密钥 */
    unsigned char master_key[crypto_kdf_KEYBYTES];
    unsigned char subkey1[crypto_kdf_BYTES_MIN];
    unsigned char subkey2[crypto_kdf_BYTES_MIN];
    randombytes_buf(master_key, sizeof master_key);

    /* context 固定 8 字节，标识用途 */
    const char ctx[8] = "appmail";
    if (crypto_kdf_derive_from_key(subkey1, sizeof subkey1, 1, ctx, master_key) != 0 ||
        crypto_kdf_derive_from_key(subkey2, sizeof subkey2, 2, ctx, master_key) != 0) {
        return 1;
    }

    /* crypto_generichash：用密钥作 MAC 的消息认证 */
    unsigned char mac[crypto_generichash_BYTES];
    unsigned char key[crypto_generichash_KEYBYTES];
    randombytes_buf(key, sizeof key);
    const char *msg = "authenticate me";
    crypto_generichash(mac, sizeof mac,
                       (const unsigned char *)msg, strlen(msg),
                       key, sizeof key);
    printf("generichash MAC: ");
    for (size_t i = 0; i < sizeof mac; i++) printf("%02x", mac[i]);
    printf("\n");
    return 0;
}
```

### 6. 流式加密：大文件分块处理

对于大文件，不应一次性把整块内容放入 `crypto_secretbox_easy`。用 `crypto_secretstream_xchacha20poly1305_*` 做分块加密流，可边读边写：

```c
#include <sodium.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    if (sodium_init() < 0) return 1;

    unsigned char key[crypto_secretstream_xchacha20poly1305_KEYBYTES];
    randombytes_buf(key, sizeof key);

    crypto_secretstream_xchacha20poly1305_state st;
    unsigned char header[crypto_secretstream_xchacha20poly1305_HEADERBYTES];
    crypto_secretstream_xchacha20poly1305_init_push(&st, header, key);

    unsigned char plaintext[] = "chunked message";
    unsigned long long plen = strlen(plaintext) + 1;
    unsigned char ciphertext[plen + crypto_secretstream_xchacha20poly1305_ABYTES];
    unsigned char tag;
    crypto_secretstream_xchacha20poly1305_push(
        &st, ciphertext, NULL, (const unsigned char *)plaintext, plen,
        NULL, 0, crypto_secretstream_xchacha20poly1305_TAG_FINAL);
    printf("header+stream ciphertext written; total %llu bytes\n",
           (unsigned long long)sizeof header + sizeof ciphertext);
    return 0;
}
```

### 7. 结合语言绑定使用同一份 C 库

libsodium 提供 Python（pynacl）、Go（golang.org/x/crypto/nacl）、Rust（sodiumoxide）、Node（libsodium-wrappers）等绑定，底层都调用这份 C 库。用 `brew install libsodium` 装好后，Python 侧即可：

```bash
pip install pynacl
python3 -c "import nacl.bindings as b; print(b.sodium_init())"
```

Python 侧用 PyNaCl 做对称加密，与 C 端互操作：

```bash
python3 - <<'PY'
from nacl.secret import SecretBox
box = SecretBox(b"12345678901234567890123456789012")
enc = box.encrypt(b"hello from python")
print("ciphertext bytes:", len(enc))
print("decrypted:", box.decrypt(enc))
PY
```

若出现找不到共享库的错误，通常是因为系统未安装 libsodium 或动态库路径未指向 `/opt/homebrew/lib`。可用 `DYLD_LIBRARY_PATH="$(brew --prefix libsodium)/lib"` 临时指定，或配置 `pip` 前的 `LDFLAGS` 环境变量。

### 8. 用环境变量辅助多平台构建

在不同的机器（Intel/Apple Silicon/CI）上，路径可能不同。用环境变量与 `uname` 自动适配：

```bash
SOD_PREFIX="$(brew --prefix libsodium)"
export PKG_CONFIG_PATH="${SOD_PREFIX}/lib/pkgconfig"
export CFLAGS="${CFLAGS:-} $(pkg-config --cflags libsodium)"
export LDFLAGS="${LDFLAGS:-} $(pkg-config --libs libsodium)"

# 统一编译入口
build_app() {
    cc "$1" -o "$2" ${CFLAGS} ${LDFLAGS}
}
```

## 六、注意事项与常见问题

### 1. 忘记调用 `sodium_init()` 导致崩溃或未定义行为

libsodium 要求在使用密码学函数前先调用 `sodium_init()`。新手最容易忘记，导致随机数生成或加密函数行为异常。请在 `main` 开头统一初始化，并检查其返回值。

### 2. 编译时报 "fatal error: 'sodium.h' file not found"

说明头文件路径未找到。确认通过 `pkg-config` 传递了 `--cflags`，或检查 Homebrew 安装路径：`brew --prefix libsodium` 输出的目录应存在于编译器的头文件搜索路径中。

### 3. 链接时报 "Undefined symbols ... _sodium_init"

链接时遗漏了 `-lsodium` 或库路径。务必在编译命令末尾加上 `$(pkg-config --libs libsodium)`，或显式写 `-L/opt/homebrew/lib -lsodium`（Intel 机为 `/usr/local/lib`）。

### 4. 先设 nonce 再设 key 的误区

libsodium 的很多 API 在加密前会把内部状态初始化为 zero。因此**每次加密都必须使用不同的随机 nonce**，绝不可复用。常见错误是固定或复用 nonce，导致加密强度崩塌。用 `randombytes_buf(nonce, sizeof nonce)` 生成每次不同的 nonce。

### 5. 用旧版 API 踩雷

`crypto_box_easy` / `crypto_secretbox_easy` 等新版 API 会自动处理 MAC 校验，而旧版 `crypto_box` / `crypto_secretbox` 需要手动分配 MAC 空间并自行校验。优先使用 `_easy` 系列或 `crypto_aead_*`，避免底层细节出错。

### 6. 性能与安全注意点

- `crypto_pwhash_str` 默认的交互式参数（OPSLIMIT_INTERACTIVE）适合登录场景；对高安全性场景应提高 OPSLIMIT 与 MEMLIMIT，但会显著增加耗时和内存。
- 不要自行实现协议或重排 nonce/密文，直接使用 `crypto_box` / `crypto_aead` 封装好的接口，其设计已规避大量常见攻击。
- 把密钥长度、nonce 长度等**永远通过 `crypto_*_BYTES` 宏获取**，不要硬编码数字，以免因版本差异而出错。
- 密码学库通常较难做 FIPS 合规，若业务有强制合规要求，需评估 libsodium 是否满足你的合规目标。

### 7. `DYLD_LIBRARY_PATH` 在 macOS 上默认被 SIP 清空

Apple Silicon / macOS 上，系统会出于安全考虑默认清空 `DYLD_LIBRARY_PATH`，导致动态库找不到。不要依赖它，正确的做法是：**直接把 `/opt/homebrew/lib` 加入链接路径**（静态链接或让可执行文件记录安装路径），或在 `~/.zshrc` 中 `export LDFLAGS="-L/opt/homebrew/lib"`。若用 Python 等解释器，优先用 `brew install` 的绑定包，它们已正确链接。

### 8. 混用不同内存分配器导致崩溃

libsodium 用 `sodium_malloc` 分配的内存应配套 `sodium_free` 释放。若与 `free()` / `realloc()` 混用，会造成堆损坏。务必成对使用 libsodium 的内存接口。

### 9. 线程安全

libsodium 的核心函数（加密、签名、哈希）是**线程安全的**（sodium_init 后）。但在多线程中：`sodium_init()` 只应调用一次（或保证互斥），且**不要在线程间共享可变状态对象**（如 secretstream 状态机、generichash 状态）。每个线程用各自的 state 对象。

### 10. 误用 `randombytes` 直接生成密码/密钥字符串

`randombytes_buf` 产生的是**二进制随机字节**，可能含不可打印字符，不能直接当作字符串密钥传给需要可打印文本的接口（如某些 RPC）。要生成可打印的密钥/口令，应先用随机字节做 Base64/Hex 编码：

```c
/* 生成 32 字节随机密钥并编码为 hex 字符串 */
unsigned char key[32];
char hex[sizeof(key) * 2 + 1];
randombytes_buf(key, sizeof key);
sodium_bin2hex(hex, sizeof hex, key, sizeof key);
printf("hex key: %s\n", hex);
```

### 11. 大文件一次性读入内存导致的 OOM

用 `crypto_secretbox_easy` 加密数百 MB 文件时，若一次 `fread` 全部读入，会瞬间占满内存。对大文件务必改用**流式方案**（见第五节第 6 条 `crypto_secretstream_*`）或分块读写。

## 七、实战：与其它工具搭配与自动化

### 1. 与 shell 脚本配合做批量文件加密

写一个脚本遍历目录下所有 `.conf` 文件，用对称密钥加密为 `.enc`，并记录校验和：

```bash
#!/usr/bin/env bash
set -euo pipefail

KEYFILE="${1:-key.bin}"
SRC_DIR="${2:-./configs}"
OUT_DIR="${3:-./encrypted}"

mkdir -p "$OUT_DIR"

# 生成 32 字节密钥（若不存在）
if [[ ! -f "$KEYFILE" ]]; then
    head -c 32 /dev/urandom > "$KEYFILE"
    chmod 600 "$KEYFILE"
    echo "已生成密钥: $KEYFILE"
fi

for f in "$SRC_DIR"/*.conf; do
    [[ -e "$f" ]] || continue
    base="$(basename "$f")"
    ./encrypt_file "$KEYFILE" "$f" "$OUT_DIR/${base}.enc"
    echo "已加密: $f -> ${OUT_DIR}/${base}.enc"
done
```

其中 `encrypt_file` 是一个用 `crypto_secretstream` 流式加密文件的 C 小程序。加密后可用 `shasum -a 256` 验证文件一致性。

### 2. 与 `openssl` 对比：统一用 libsodium 做口令派生

不熟悉 libsodium 时容易用 `openssl passwd` 或自写 hash，建议统一用 Argon2id：

```bash
# 生成一个可存库的 Argon2id 哈希
./pwhash_demo | head -n 1
```

### 3. 与 Makefile / CI 集成做加密密钥的分发

在 CI 中，把签名密钥（.sk 文件）放入加密的 secret 变量，构建时派生并写入编译产物签名：

```yaml
# .github/workflows/build.yml 片段
- name: 生成签名并校验
  run: |
    ./sign_demo >/dev/null        # 确保依赖已编译
    # 用 CI secret 环境变量提供密钥派生上下文
    echo "SODIUM_CTX=${SODIUM_CTX}" >> $GITHUB_ENV
```

在本地则用 Makefile 的目标封装签名流程：

```makefile
sign: release.tar.gz
	./sign_tool $(SIGN_KEY) release.tar.gz release.sig
	shasum -a 256 release.tar.gz > release.tar.gz.sha256

verify:
	./verify_tool $(VERIFY_PUBKEY) release.tar.gz release.sig
```

### 4. 与 Python 脚本批量处理用户密码

把 C 端 `crypto_pwhash_str` 的哈希能力通过 PyNaCl 暴露，批量迁移明文密码库：

```bash
python3 - <<'PY'
import sys, csv, hashlib
import nacl.pwhash

def hash_pw(pw: str) -> str:
    # 使用 Argon2id（与 C 端 crypto_pwhash_str 同算法）
    return nacl.pwhash.str(pw.encode("utf-8")).decode("ascii")

with open("users.csv", newline="") as f:
    for row in csv.reader(f):
        uid, pw = row[0], row[1]
        print(f"{uid},{hash_pw(pw)}")
PY
```

### 5. 生产级实践清单

- **密钥托管**：把主密钥（master key）用 `sodium_mlock` 锁定，进程结束前清零；生产环境建议用 KMS（如云厂商密钥管理服务）托管，密钥不落盘。
- **滚动密钥**：用 `crypto_kdf` 按版本号派生不同子密钥，旧版本保留解密、新版本用于加密，实现优雅的密钥轮换。
- **审计日志**：记录"何时、用哪个密钥版本、加密了哪些文件"到日志，便于安全事故回溯。
- **完整性**：除加密外，对明文/密文同时计算 `crypto_generichash` 或 `crypto_sign`，防止中间人篡改。
- **测试**：在 CI 中跑「加密→篡改一个字节→解密必须失败」的负面测试，确保 AEAD 完整性校验生效。