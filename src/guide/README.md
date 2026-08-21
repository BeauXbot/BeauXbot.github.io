---
title: 博客模板使用说明
icon: book
category:
  - 指南
tag:
  - 模板
  - vuepress-theme-hope
---

# 博客模板使用说明

这是基于 **VuePress 2 + vuepress-theme-hope** 的博客模板。本文档详细介绍模板提供的所有功能，以及如何使用和扩展它。

> 模板源：`vuepress-theme-hope-template`，主题文档见 [vuepress-theme-hope](https://theme-hope.vuejs.press/zh/)。

## 目录结构

```text
src/                    # 博客源码目录（页面都放这里）
├── .vuepress/          # 全局配置
│   ├── config.ts       # 站点配置（标题、描述、base）
│   ├── theme.ts        # 主题配置（作者、导航、功能开关、插件）
│   ├── navbar.ts       # 顶部导航栏
│   ├── sidebar.ts      # 侧边栏
│   └── styles/         # 自定义样式
│       ├── palette.scss    # 主题色
│       ├── config.scss     # 颜色配置
│       └── index.scss      # 自定义全局样式
├── README.md           # 博客主页
└── 文章目录/           # 你写文章的地方（可任意创建）
```

## 快速开始

### 写第一篇文章

在 `src/` 下任意目录新建一个 `.md` 文件，例如 `src/posts/hello.md`：

```markdown
---
title: 你好，世界
date: 2024-01-01
author: wangbo
category: 随笔
tag:
  - 入门
---

这里是文章正文，使用 Markdown 语法书写。

博客插件会自动根据 `category` 分类、根据 `tag` 打标签，并生成时间线。
```

保存后，本地运行 `pnpm run docs:dev` 预览，或推送到 GitHub 后由 Actions 自动构建部署。

### 支持的 Frontmatter 字段

博客文章可用的 frontmatter 字段（常用）：

| 字段 | 说明 |
|------|------|
| `title` | 文章标题 |
| `date` | 文章日期（用于排序和时间线） |
| `author` | 作者（默认使用主题里的全局 author） |
| `category` | 文章分类（可多个：`category: [A, B]`） |
| `tag` / `tags` | 文章标签 |
| `sticky` | 置顶（数字越大越靠前） |
| `draft` | 设为 `true` 则草稿不发布 |
| `cover` | 文章封面图 |
| `icon` | 文章图标 |
| `description` | 摘要（默认自动截取正文前若干字） |
| `image` | 封面图（同 cover） |

## 博客功能

本模板通过 `blog: true` 启用了博客插件，自动生成以下页面：

- **文章列表** — `/article/`，按时间倒序列出全部文章
- **分类** — `/category/`，按 `category` 分组
- **标签** — `/tag/`，按 `tag` 分组
- **时间线** — `/timeline/`，按年份归档
- **博主信息** — 显示博客描述与社交链接（`theme.ts` 中的 `blog` 配置）

### 博主信息配置

在 `src/.vuepress/theme.ts` 中：

```ts
blog: {
  description: "你的博客介绍",        // 博主自我介绍
  medias: {
    GitHub: "https://github.com/你的账号", // 社交图标，可加多个
    // BiliBili: "https://...",
    // Zhihu: "https://...",
  },
},
```

## 顶部导航栏（navbar）

编辑 `src/.vuepress/navbar.ts`：

```ts
export default navbar([
  "/",                                        // 首页
  "/posts/",                                  // 文章目录
  {
    text: "分类",                             // 下拉菜单
    icon: "folder",
    children: [
      { text: "前端", icon: "code", link: "/category/前端/" },
      { text: "随笔", icon: "pen", link: "/category/随笔/" },
    ],
  },
]);
```

## 侧边栏（sidebar）

编辑 `src/.vuepress/sidebar.ts`：

```ts
export default sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",        // 前缀，自动拼到子项前面
      children: "structure",   // 自动扫描该目录结构
    },
  ],
});
```

`children: "structure"` 会自动扫描 `prefix` 目录下的所有 Markdown 文件并按目录结构生成侧边栏，非常适合存放大量文章。

## 强大的 Markdown 增强功能

模板启用了 `mdEnhance` 插件，几乎全套功能开放。以下都可直接在文章中使用：

### 对齐 / 标记 / 上下标

```markdown
::: left
左对齐内容
:::

::: right
右对齐内容
:::

==高亮文本==

上标 2^10^  下标 H~2~O
```

### 图表（chart / echarts / mermaid / flowchart）

在代码块中指定语言即可渲染图表，例如用 `chart`、`echarts`、`mermaid` 或 `flowchart` 作为代码块语言标记。

### 选项卡 / 代码组（code-tabs）

用 `::: code-tabs` 和 `@tab 标签名` 组织多语言代码：

```markdown
::: code-tabs
@tab JavaScript
console.log("js");
@tab Python
print("python")
:::
```

### 图片尺寸 / 懒加载

```markdown
![图片](/logo.svg){width=200px height=100px}   <!-- 指定尺寸 -->

![](/logo.svg)                                 <!-- 默认懒加载 -->
```

### 数学公式（KaTeX）

```markdown
行内公式 $E = mc^2$

$$
\frac{1}{2} + \frac{1}{3}
$$
```

### 幻灯片（Presentation）

在 frontmatter 加 `layout: Slide`，正文用幻灯片语法（基于 reveal.js），支持高亮、数学、搜索、笔记、缩放（`presentation: ["highlight", "math", "search", "notes", "zoom"]`）。

### 其它

- **Tabs 选项卡**：`:tabs` / `::: tabs`
- **图注 figure**：`![描述](/img.png) **图注**`
- **推荐标记**：`*Recommended*` 会自动渲染成「推荐」徽章（stylize 规则）
- **Playground / Vue Playground**：在线运行 Vue 或 TS 代码

## 评论系统

模板默认配置了 **Waline**（当前是官方演示服务）：

```ts
comment: {
  provider: "Waline",
  serverURL: "https://waline-comment.vuejs.press", // 换你自己部署的服务地址
},
```

如需启用自己的评论，把 `serverURL` 替换为自建 Waline 服务即可。

## 自定义样式

- **主题色**：改 `src/.vuepress/styles/palette.scss` 里的 `$theme-color`。
- **可选颜色**：改 `src/.vuepress/styles/config.scss` 里的 `$colors`（影响代码高亮等）。
- **全局样式**：在 `src/.vuepress/styles/index.scss` 里写自定义 CSS/SCSS。

## PWA（渐进式 Web 应用）

`theme.ts` 中有一段被注释的 `pwa` 配置。如需支持离线访问、安装到桌面，取消注释并填好 `favicon`、`manifest` 图标路径（`src/.vuepress/public/assets/icon/` 下已有示例图标），然后启用 `pwa` 插件即可。

## 部署到 GitHub Pages

模板自带 `.github/workflows/deploy-docs.yml`：推送代码到 `main` 分支后，GitHub Actions 会自动构建 `vuepress build` 并部署到 `gh-pages` 分支。

**前置条件**：在仓库 **Settings → Pages → Build and deployment** 将 Source 设为 **Deploy from a branch**，分支选择 **`gh-pages`**，目录 `/`（root）。

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm run docs:dev` | 本地开发预览（带热更新） |
| `pnpm run docs:build` | 生产构建（输出到 `src/.vuepress/dist`） |
| `pnpm run docs:clean-dev` | 清缓存后开发预览 |
| `pnpm run docs:update-package` | 升级主题相关依赖 |

## 常见问题

- **新增文章不显示？** 确认 frontmatter 有 `title`，且不是 `draft: true`。
- **改完配置不生效？** `theme.ts` 是 TS 文件，改完重启 `docs:dev`（或重跑 `docs:build`）。
- **图片路径？** 放到 `src/.vuepress/public/` 下，引用时用 `/文件名`（根路径）。