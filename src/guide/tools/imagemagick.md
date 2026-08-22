---
title: imagemagick
icon: image
category:
  - 工具
  - 图像处理
tag:
  - 图像与其它
  - imagemagick
---

# imagemagick（强大的命令行图像处理套件）

> Homebrew 版本 7.1.2-9 ｜ 主页：见官方文档 ｜ 安装：`brew install imagemagick`

## 一、它是什么

ImageMagick 是一套功能极其强大的**命令行图像处理套件**，通过 `convert`、`magick`、`identify`、`montage` 等子命令对图像进行创建、转换、合成、裁剪、缩放、加水印、加边框、分析等操作，无需打开任何 GUI 即可批量处理海量图片。它解决的核心问题是"用一行命令搞定图像处理的重复劳动"，典型应用场景包括：批量缩放/压缩网站图片、把多种格式统一转成 JPEG/PNG/WebP、给图片加水印和缩略图、拼接对比图、读取图片元数据（EXIF/尺寸/色彩空间）等。

> 注：ImageMagick 7 起，传统 `convert` 命令已迁移到统一的 `magick` 命令（`magick convert` 别名保留兼容）。本文示例以 7.x 的 `magick` 为主，同时注明旧版 `convert` 写法。

## 二、安装与升级

```bash
# 安装
brew install imagemagick

# 升级
brew upgrade imagemagick

# 卸载
brew uninstall imagemagick

# 验证安装成功（查看版本，应显示 7.1.2-9 之类）
magick --version

# 查看已启用的组件（编码器、委托工具等）
magick -version
```

安装后 `magick`、`convert`、`identify`、`montage`、`mogrify`、`compare` 等命令即进入 PATH，直接可全局调用。ImageMagick 默认编译了大量格式支持（JPEG、PNG、GIF、TIFF、WebP、HEIC 等），无需额外安装编解码器即可覆盖绝大多数场景。

> 可选依赖：如需更强的编解码能力（HEIC、RAW、PDF 页级转换等），可安装 `brew install heif libheif libraw ghostscript` 等。查看当前缺失的 delegate 可用 `magick -list delegate`，再针对性安装。

## 三、常用命令速查

| 命令 | 参数说明 | 示例 |
| --- | --- | --- |
| `magick input.png -resize 50% out.png` | 缩放图片（支持百分比或像素尺寸） | `magick a.png -resize 800x600 b.png` |
| `magick input.png -quality 80 out.jpg` | 设置 JPEG 压缩质量（0-100） | `magick a.png -quality 80 a.jpg` |
| `magick input.png -crop 300x300+50+50 out.png` | 裁剪：宽x高+左偏移+上偏移 | `magick a.png -crop 100x100+0+0 b.png` |
| `magick input.png -rotate 90 out.png` | 旋转角度（支持顺时针正数/逆时负数） | `magick a.png -rotate -90 b.png` |
| `magick input.png -format "%wx%h" info:` | 读取图片宽高（identify 的替代） | `magick a.png -format "%wx%h" info:` |
| `identify input.png` | 查看图片信息（尺寸、类型、色彩） | `identify photo.jpg` |
| `magick *.png -append out.png` | 垂直拼接多图；`+append` 为水平拼接 | `magick 1.png 2.png +append row.png` |
| `magick input.png -gravity center -pointsize 40 -annotate +0+0 "文本" out.png` | 在图上居中叠加文字 | `magick a.png -gravity south -annotate +0+10 "© 2024" b.png` |
| `mogrify -resize 50% *.png` | 原地批量处理（直接覆盖原文件） | `mogrify -resize 50% -path out/ *.jpg` |
| `magick -size 800x600 gradient:blue-red out.png` | 生成渐变等合成图像 | `magick -size 100x100 plasma:fractal noise.png` |

## 四、实际示例

### 示例 1：批量缩放压缩一组照片

```bash
# 准备：创建测试图片（用 ImageMagick 生成几张渐变图）
mkdir -p ~/imgtest && cd ~/imgtest
magick -size 2000x1500 gradient:skyblue-navy p1.png
magick -size 1800x1200 plasma:fractal p2.png

# 批量缩放到宽 1200（保持比例），输出到 out/ 目录并转成 JPEG
mkdir -p out
magick p1.png -resize 1200x out/p1.jpg
magick p2.png -resize 1200x out/p2.jpg

# 查看结果尺寸与文件大小
identify out/p1.jpg out/p2.jpg
ls -lh out/
```

输出形如：

```
out/p1.jpg PNG 1200x900 1200x900+0+0 8-bit sRGB 96KB 0.000u 0:00.000
out/p2.jpg PNG 1200x750 1200x750+0+0 8-bit sRGB 61KB 0.000u 0:00.000
```

### 示例 2：给图片加水印并导出 WebP

```bash
# 准备：生成一张原图和一张半透明水印
cd ~/imgtest
magick -size 1600x1000 gradient:purple-orange photo.png
magick -size 400x100 xc:none -fill "rgba(255,255,255,0.6)" \
  -gravity center -pointsize 48 -annotate +0+0 "BeauXbot" watermark.png

# 把水印合成到原图右下角，导出为质量 85 的 WebP
magick photo.png watermark.png -gravity southeast -geometry +20+20 \
  -composite -quality 85 photo.webp

# 校验输出
identify photo.webp
```

### 示例 3：读取并分析图片信息

```bash
# 准备：随便找一张已有图片
cd ~/imgtest

# 完整信息
identify -verbose photo.png

# 仅提取关键字段
identify -format "尺寸: %wx%h\n类型: %m\n色彩: %[colorspace]\n" photo.png

# 用 magick 的 info: 读取尺寸（脚本友好，可赋值给变量）
width=$(magick photo.png -format "%w" info:)
height=$(magick photo.png -format "%h" info:)
echo "宽=$width 高=$height"
```

输出形如：

```
尺寸: 1600x1000
类型: PNG
色彩: sRGB
宽=1600 高=1000
```

### 示例 4：拼接对比图（before/after）

```bash
# 准备：一张原图、一张模糊处理后的图
cd ~/imgtest
magick photo.png blur_photo.png

# 水平并排拼接成对比图
magick photo.png blur_photo.png +append before_after.png

# 查看拼接结果
identify before_after.png
```

## 五、进阶技巧与配置

### 5.1 用 `-path` 避免覆盖原文件

`mogrify` 默认原地覆盖。批量处理时用 `-path 输出目录` 把结果写到新目录，避免误毁原图：

```bash
mogrify -resize 50% -quality 80 -path ./thumb/ *.jpg
```

> 注意：`mogrify -path` 输出的**文件名与输入保持一致**。若需改名，用 `-set filename:out "%t"` 等 `%[filename]` 转义，或配合 `find/xargs` 逐张处理。

### 5.2 并发加速与资源限制

多核机器上 ImageMagick 默认尽量多线程，但海量小图时单进程反而更快。可按需控制：

```bash
# 环境变量控制全局线程数
export MAGICK_THREAD_LIMIT=4

# 单条命令内临时限制（-limit 语法）
magick -limit thread 2 -resize 50% big.png out.png

# 用 xargs 的 -P 做进程级并发（每个进程 1 线程，互不干扰）
find . -name '*.jpg' -print0 | xargs -0 -P 4 -I{} \
  mogrify -resize 800x -path ./out/ {}
```

原则：大图、多核重活优先 `-limit thread` 单进程多线程；海量小文件优先 `xargs -P` 多进程。

### 5.3 格式转换工作流（JPEG / PNG / WebP / AVIF）

ImageMagick 是天然的"格式枢纽"，靠**输出扩展名**决定目标格式：

```bash
# 统一转成质量 80 的 WebP（体积约为 JPEG 的 60-70%）
magick photo.png -strip -quality 80 photo.webp

# 转成 AVIF（新一代，体积更小，兼容性逐年提升）
magick photo.png -strip -quality 60 photo.avif

# 保留透明通道转 PNG，去掉背景转 JPEG（JPEG 不支持透明，需先填白底）
magick photo.png -background white -flatten photo.jpg

# 批量：png -> webp，保留原文件名
find . -name '*.png' -print0 | while IFS= read -r -d '' f; do
  magick "$f" -strip -resize 1200x -quality 80 "${f%.png}.webp"
done
```

常用工作流建议：

- **网站首图**：WebP `-quality 80` + `-strip`（去 EXIF/ICC 等元数据，进一步减小体积）。
- **需兼容老环境**：JPEG `-quality 82` + `-interlace Plane`（渐进式，Web 友好）。
- **图标/贴纸**：PNG，可加 `-strip` 去冗余元数据。
- **动画**：GIF 保留多帧，`-coalesce` 统一各帧画布；转 WebP 动画用 `-loop 0`。

### 5.4 批量处理 + 排序输出

```bash
# 当前目录所有 JPEG 缩放到 800 宽，按文件名排序，输出到 out/
find . -name '*.jpg' -print0 | sort -z | xargs -0 -I{} \
  magick {} -resize 800x -path ./out/ {}.thumb.jpg
```

### 5.5 批量缩放不超尺寸（fit within）与裁剪填充（cover）

区分两种需求：

```bash
# 等比缩放，确保完全落在 800x600 内（不变形，可能小于画布）
magick in.png -resize 800x600 -background white -gravity center -extent 800x600 out.png

# 填充裁剪：先放大铺满再居中裁出 800x600（封面图常用，不留白）
magick in.png -resize 800x600^ -gravity center -extent 800x600 out.png
```

`800x600^` 的 `^` 表示"放大到至少填满"，配合 `-extent` 裁出精确尺寸，是制作博客封面/轮播图的黄金组合。

### 5.6 配置与委托（delegates）

- 环境变量：
  - `MAGICK_HOME`：安装根目录。
  - `MAGICK_CONFIGURE_PATH`：配置文件搜索路径（可叠加多个，用系统路径分隔符 `:` 分隔）。
  - `MAGICK_FONT_PATH`：字体搜索路径，处理中文水印时把中文字体目录加进来可避免乱码。
  - `MAGICK_THREAD_LIMIT`：全局线程上限（0 表示不限制，遵循 CPU）。
  - `MAGICK_MEMORY_LIMIT` / `MAGICK_MAP_LIMIT` / `MAGICK_DISK_LIMIT`：全局内存/映射/磁盘上限，等效 `-limit` 的持久化版本。
- 配置文件：ImageMagick 从编译时预设的路径（Homebrew 下为 `/usr/local/etc/ImageMagick-7` 或 `/opt/homebrew/etc/ImageMagick-7`）读取 `policy.xml`（安全策略）、`delegates.xml`（委托外部程序）、`colors.xml`、`type.xml` 等。查看实际生效路径：

```bash
magick -debug configure info: 2>&1 | grep -i config
# 或直接打印配置汇总
magick -version
magick -list configure | grep -E 'PREFIX|CONFIGURE|FONT'
```

- 查看已支持的编码器与委托工具：

```bash
magick -list format
magick -list delegate
```

> **个性化实用配置**：若嫌中文字体每次都要 `-font` 指定，可新建 `type.xml` 片段并入搜索路径，或用 `-define` 设置默认滤镜。更简单的做法：为常用风格写一个 shell 函数（见第七节）。

### 5.7 常用 `-define` 与滤镜选项

- `-define jpeg:size=1000x1000`：JPEG **分块解码**，读取大图只解码到所需尺寸再缩放，极大省内存（先缩后解）。
- `-define filter:support=2.0` / `-filter Lanczos`：控制缩放滤镜质量，`Lanczos`、`LanczosSharp`、`Catrom` 质量较高但慢；`Triangle`、`Box` 快但糊。默认 `Undefined`（自动）。
- `-strip`：删除全部元数据（EXIF、XMP、ICC、注释），压缩利器。
- `-interlace Plane`：写渐进式 JPEG；`-interlace None` 写基线式。
- `-sharpen 0x1`：缩放后轻度锐化，弥补重采样损失。
- `-dither FloydSteinberg` / `-colors 256`：量化到 256 色，GIF/缩略图减体积。

### 5.8 颜色空间与通道处理

```bash
# 转灰度（灰度图体积约为 RGB 的 1/3）
magick in.png -colorspace Gray out.png

# 转 sRGB（跨设备统一显示）
magick in.jpg -colorspace sRGB out.jpg

# 提取/合成单通道（制作透明遮罩）
magick in.png -alpha extract mask.png

# 反转遮罩（黑白对调）
magick mask.png -negate mask_inv.png
```

`-colorspace Gray`、`-alpha extract` 在制作抠图遮罩、缩略图占位图时很常用。

## 六、注意事项与常见问题

**1. 7.x 的 `convert` 已变体**

ImageMagick 7 统一使用 `magick`，旧的 `convert` 被重命名为 `convert`（`magick convert` 别名）。Homebrew 安装 7.x 后 `convert` 命令默认仍指向 `magick` 的兼容入口，但建议新脚本直接用 `magick`，避免与系统其他软件（如 macOS 自带的 `convert`）冲突。

> 排障：若 `magick` 提示 `command not found`，先 `brew link imagemagick` 或在 shell 中 `export PATH="/opt/homebrew/bin:$PATH"`（Apple Silicon）。

**2. `-crop` 的 `+x+y` 是"原点偏移"而非裁剪尺寸**

新手常把 `-crop 300x200+100+50` 误以为从中心裁剪。实际上 `+100+50` 表示从左上角偏移 (100,50) 处取 300x200 的区域。要"从中心裁"，可配合 `-gravity center`：

```bash
magick big.png -gravity center -crop 800x600+0+0 +repage out.png
```

`+repage` 用来重置画布偏移，否则输出会带有虚拟画布偏移导致尺寸异常。

**3. 中文文字水印乱码**

默认字体不含中文字形。叠加中文前先指定中文字体路径，或用系统字体目录：

```bash
magick photo.png -font /System/Library/Fonts/PingFang.ttc -pointsize 60 \
  -gravity north -annotate +0+20 "中文水印" out.png
```

若 `-font` 解析失败，先 `magick -list font | grep -i pingfang` 确认可用字体名。

> 注意：`-annotate` 有 `+y`（基线偏上）与 `-y`（基线偏下）方向差异；`-draw "text ..."` 走不同渲染路径，转义规则略异，混用时易踩坑。含中文/空格/特殊字符时建议用 `-annotate` 并用双引号包裹。

**4. 大图处理的内存/磁盘开销**

处理超大图（几百 MB 像素）时 ImageMagick 会占用大量内存，可能 OOM 崩溃。用 `-limit` 限制资源，或改用流式处理：

```bash
magick -limit memory 1GiB -limit map 2GiB -resize 50% huge.tif out.png

# 超大图优先"先缩后解"（jpeg:size 仅分块解码，大幅省内存）
magick -define jpeg:size=2000x2000 huge.jpg -resize 50% out.png
```

处理大量文件时优先 `mogrify -path` 输出到独立目录，便于中途失败时重跑不覆盖原图。

> 磁盘：当内存/map 用尽时图像落盘到临时文件，注意 `TMPDIR` 所在分区剩余空间；`-limit disk` 可设上限。

**5. `-quality` 对 JPEG/PNG/WebP 含义不同**

- JPEG：0-100 压缩质量（数值越小体积越小、画质越差）。
- PNG：无损，`-quality` 数值 0-100 实际表示 `zlib` 压缩级别（10 为 9 级压缩）与滤波器选择，默认即可。
- WebP：0-100，意义同 JPEG。
做"压缩"时先明确目标格式再设 `-quality`，否则可能无效。

> 常见误解：对 PNG 设 `-quality 50` 不会让画质变差，只是压缩级别；真正减少 PNG 体积常用 `-strip` + 降位深 + 调色板（`-colors 256`）。

**6. 安全注意：`policy.xml` 与恶意文件**

ImageMagick 历史上出现过解析恶意 SVG/MVg 文件导致代码执行的漏洞（如 2016 年的 ImageTragick）。生产环境建议收紧 `policy.xml`，禁用有风险的 delegate（如 `MVG`、`PS`、`EPHEMERAL`、`URL` 读取）：

```xml
<!-- 放在 <policymap> ... </policymap> 内部 -->
<policy domain="coder" rights="none" pattern="MVG" />
<policy domain="coder" rights="none" pattern="URL" />
<policy domain="coder" rights="none" pattern="EPHEMERAL" />
<policy domain="coder" rights="none" pattern="HTTPS" />
<policy domain="coder" rights="none" pattern="HTTP" />
<policy domain="delegate" rights="none" pattern="gs" />
```

其他建议：

- 处理不可信来源的图片前，先 `identify` 看基本信息；不确定时不要直接 `-composite` 或触发 delegate。
- 限制资源：`-limit memory 256MiB -limit map 256MiB -limit disk 1GiB -limit time 30`。
- 上传接口：先做格式白名单校验（扩展名+`magick -format %m` 实际探测），禁用 SVG/PDF 直传。
- 定期 `brew upgrade imagemagick` 拉取安全修复。

**7. 脚本中等待/进度输出**

批量任务可用 `-monitor` 显示进度，用 `-quiet` 抑制多余日志，配合 `set -e` 让脚本在出错时立即退出：

```bash
magick -monitor -resize 50% -path out/ *.jpg
```

**8. 常见报错速查**

- `no decode delegate for this image format` / `unable to open image`: 缺格式 delegate，先 `magick -list format` 确认，安装对应 Homebrew 包（如 HEIC→`brew install libheif`，SVG→`brew install librsvg`）。
- `cache resources exhausted`: 内存/map 超限，用 `-limit memory`/`-limit map` 放大或走流式。
- `unable to read font`: `-font` 路径错误或字体缺失，`magick -list font` 查可用名。
- `improper image header` / `invalid colormap index`: 源文件损坏，先 `identify` 复核。
- `Segmentation fault`：多在旧版本或特定 delegate 上，优先升级/复现最小命令。
- 权限类：Homebrew 目录只读时改 `-path` 输出到用户可写目录，别用 `sudo` 乱改 `/opt/homebrew/etc`。

## 七、实战：与其它工具搭配与自动化

### 7.1 与 `find` / `xargs` 的批量管道

海量文件批处理的标准姿势：用 `-print0`/`-0` 规避文件名中的空格，`xargs -P` 并行：

```bash
# 全部 JPG 压成 WebP（保留比例、最长边 1200）
find . -name '*.jpg' -print0 | xargs -0 -P 4 -I{} \
  magick {} -strip -resize '1200x>' -quality 82 {}.webp
# '1200x>' 表示"仅当大于 1200 时才缩小"，避免放大糊图

# 全部 PNG 统一缩放到宽 400 并改名 _thumb
find . -name '*.png' -print0 | while IFS= read -r -d '' f; do
  magick "$f" -resize 400x -quality 85 "${f%.png}_thumb.png"
done
```

### 7.2 Makefile 自动化

适合"有输入、有产物"的图片构建流，支持增量构建（源没变就不重跑）：

```makefile
# Makefile —— 站点图片优化
SRC := $(wildcard img-src/*.png)
OUT := $(patsubst img-src/%.png,img-out/%.webp,$(SRC))

all: $(OUT)

img-out/%.webp: img-src/%.png | img-out
	magick $< -strip -resize '1200x>' -quality 80 $@

img-out:
	mkdir -p $@

# 把目录下所有 png 生成一张缩略图拼图
sprite.png: $(SRC)
	montage $^ -tile 5x -geometry 200x200+8+8 -background none $@

clean:
	rm -rf img-out sprite.png
```

用法：`make` 全量、`make img-out/a.webp` 单张、`make clean` 清理。`$<`=首个依赖、`$@`=目标、`$^`=全部依赖。

### 7.3 CI 集成（GitHub Actions）

在 CI 里批量压缩图片并提交回仓库（需配套 `actions/checkout` 与 `stefanzweifel/git-auto-commit-action` 类步骤）：

```yaml
# .github/workflows/optimize-images.yml
name: Optimize images
on:
  push:
    paths: ['public/images/**']
jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install ImageMagick
        run: sudo apt-get update && sudo apt-get install -y imagemagick
      - name: Optimize WebP
        run: |
          find public/images -name '*.png' -o -name '*.jpg' | while read f; do
            magick "$f" -strip -resize '1600x>' -quality 80 "${f%.*}.webp"
          done
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: optimize images"
```

要点：CI 环境常是 Debian 系（无 Homebrew），用 `apt-get` 装；可加 `gh-actions-cache` 缓存 delegate 安装以提速；输出到独立目录再 git add，避免污染源图。

### 7.4 与其他工具的管道

ImageMagick 走标准输入输出，可接入各种工具链：

```bash
# 截图 → 处理 → 直接粘贴到剪贴板（macOS）
screencapture -x -t png - | magick - -resize 50% - | pbcopy

# 生成缩略图并上传到对象存储（配合 curl）
magick in.png -resize 400x thumb.png && curl -F "file=@thumb.png" https://oss.example.com/upload

# 用变量记录尺寸再做条件分支（配合 shell）
w=$(magick in.png -format "%w" info:)
[ "$w" -gt 1200 ] && magick in.png -resize 1200x out.png

# 对比两张图（配合 compare 输出差异图/度量）
compare -metric RMSE before.png after.png diff.png 2>&1
# 配合 jq 解析 JSON 型像素差度量
compare -metric PSNR before.png after.png null: 2>&1
```

### 7.5 生产级脚本模板

一个带参数、幂等、可重入的批量处理脚本骨架：

```bash
#!/usr/bin/env bash
# imgflow —— 站点图片批量处理入口
set -euo pipefail

SRC_DIR="${1:-./img-src}"   # 源目录
OUT_DIR="${2:-./img-out}"   # 输出目录
QUALITY="${QUALITY:-80}"    # 可由环境变量覆盖
MAX_W="${MAX_W:-1600}"      # 最长边上限
THREADS="${THREADS:-$(nproc)}"

mkdir -p "$OUT_DIR"
export MAGICK_THREAD_LIMIT=1   # 让 xargs -P 进程级并行接管

find "$SRC_DIR" \( -name '*.jpg' -o -name '*.png' -o -name '*.webp' \) -print0 \
  | xargs -0 -P "$THREADS" -I{} bash -c '
      f="$1"
      out="$2/$(basename "${f%.*}.webp")"
      # 幂等：输出已存在且新于输入则跳过
      if [[ -f "$out" && "$out" -nt "$f" ]]; then exit 0; fi
      magick "$f" -strip -resize "${3}x>" -quality "$4" "$out"
    ' _ {} "$OUT_DIR" "$MAX_W" "$QUALITY"

# 汇总统计
echo "--- 输出统计 ---"
find "$OUT_DIR" -name '*.webp' | xargs identify -format "%f %wx%h %b\n"
```

特性：环境变量可配、`nproc` 自适应并行、`-nt` 实现增量跳过、错误时 `set -e` 立即退出。

### 7.6 用 shell 函数固化常用风格

```bash
# 放入 ~/.bashrc / ~/.zshrc
# 封面图：填满 1200x630（OG 图规格）
og_cover() { magick "$1" -strip -resize '1200x630^' -gravity center -extent 1200x630 -quality 82 "${1%.*}-og.jpg"; }
# 缩略图：最长边 400
thumb() { magick "$1" -strip -resize '400x>' -quality 80 "${1%.*}-thumb.webp"; }
# 统一压缩成 webp
towebp() { magick "$1" -strip -resize "${2:-1600}x>" -quality "${3:-80}" "${1%.*}.webp"; }

# 使用
og_cover banner.png
thumb photo.jpg
towebp big.png 1200 75
```

### 7.7 批量加编号/时间戳与 EXIF 写入

```bash
# 批量加时间戳水印
for f in *.jpg; do
  magick "$f" -gravity southeast -pointsize 30 \
    -fill "rgba(255,255,255,0.7)" \
    -annotate +15+15 "$(date +%Y-%m-%d)" "stamped_$f"
done

# 写 EXIF（作者/版权/描述）
magick in.jpg -set exif:Artist "BeauXbot" -set exif:Copyright "© 2024" out.jpg

# 只读 EXIF 部分字段（配合 jq 解析）
identify -format "%[EXIF:DateTimeOriginal]\n" photo.jpg
```

---