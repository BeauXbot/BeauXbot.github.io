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

**1. 用 `-path` 避免覆盖原文件**

`mogrify` 默认原地覆盖。批量处理时用 `-path 输出目录` 把结果写到新目录，避免误毁原图：

```bash
mogrify -resize 50% -quality 80 -path ./thumb/ *.jpg
```

**2. 一次批量处理多张图 + 并发加速**

用 shell 循环或 `mogrify` 批量处理。多核机器上可用 `-define magick:threads=4` 或设置 `MAGICK_THREAD_LIMIT` 环境变量控制并发，避免拖垮机器：

```bash
# 环境变量控制线程数（1 到 N，N 为 CPU 核心数）
export MAGICK_THREAD_LIMIT=4
# 在脚本里临时限制
magick -limit thread 2 -resize 50% big.png out.png
```

**3. 与脚本/其他工具搭配（批量压缩 + 排序输出）**

```bash
# 把当前目录所有 JPEG 缩放到 800 宽并按文件名排序输出
find . -name '*.jpg' -print0 | sort -z | xargs -0 -I{} magick {} -resize 800x -path ./out/ {}.thumb.jpg
```

**4. 配置与委托（delegates）**

- 环境变量：`MAGICK_HOME` 指向安装目录，`MAGICK_CONFIGURE_PATH` 指向配置文件目录，`MAGICK_FONT_PATH` 指定字体搜索路径（处理中文水印时把中文字体目录加进来可避免乱码）。
- 配置文件：ImageMagick 从编译时预设的路径（Homebrew 下为 `/usr/local/etc/ImageMagick-7` 或 `/opt/homebrew/etc/ImageMagick-7`）读取 `policy.xml`（安全策略）、`delegates.xml`（委托外部程序）、`colors.xml`、`type.xml` 等。查看实际路径：

```bash
magick -debug configure info: 2>&1 | grep -i config
```

- 查看已支持的编码器与委托工具：

```bash
magick -list format
magick -list delegate
```

## 六、注意事项与常见问题

**1. 7.x 的 `convert` 已变体**

ImageMagick 7 统一使用 `magick`，旧的 `convert` 被重命名为 `convert`（`magick convert` 别名）。Homebrew 安装 7.x 后 `convert` 命令默认仍指向 `magick` 的兼容入口，但建议新脚本直接用 `magick`，避免与系统其他软件（如 macOS 自带的 `convert`）冲突。

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

**4. 大图处理的内存/磁盘开销**

处理超大图（几百 MB 像素）时 ImageMagick 会占用大量内存，可能 OOM 崩溃。用 `-limit` 限制资源，或改用流式处理：

```bash
magick -limit memory 1GiB -limit map 2GiB -resize 50% huge.tif out.png
```

处理大量文件时优先 `mogrify -path` 输出到独立目录，便于中途失败时重跑不覆盖原图。

**5. `-quality` 对 JPEG/PNG/WebP 含义不同**

- JPEG：0-100 压缩质量（数值越小体积越小、画质越差）。
- PNG：无损，`-quality` 数值 0-100 实际表示 `zlib` 压缩级别（10 为 9 级压缩）与滤波器选择，默认即可。
- WebP：0-100，意义同 JPEG。
做"压缩"时先明确目标格式再设 `-quality`，否则可能无效。

**6. 安全注意：`policy.xml` 与恶意文件**

ImageMagick 历史上出现过解析恶意 SVG/MVg 文件导致代码执行的漏洞。生产环境建议收紧 `policy.xml`，禁用有风险的 delegate（如 `MVG`、`PS`、`EPHEMERAL`、`URL` 读取），例如：

```xml
<policy domain="coder" rights="none" pattern="MVG" />
<policy domain="coder" rights="none" pattern="URL" />
<policy domain="coder" rights="none" pattern="EPHEMERAL" />
```

处理不可信来源的图片时，先用 `identify` 查看基本信息，并限制 `-limit` 资源，避免被恶意文件拖垮。

**7. 脚本中等待/进度输出**

批量任务可用 `-monitor` 显示进度，用 `-quiet` 抑制多余日志，配合 `set -e` 让脚本在出错时立即退出：

```bash
magick -monitor -resize 50% -path out/ *.jpg
```