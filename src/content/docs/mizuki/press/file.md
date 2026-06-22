---
title: 文件管理
description: Mizuki 主题单文件文章管理方案，详细介绍 frontmatter 字段和文件组织方式
---

Mizuki 主题使用 Markdown 文件管理文章内容，这是最简洁的文章管理方式——每篇文章对应一个 `.md` 文件。

## 文件位置

所有文章文件应放置在 `src/content/posts/` 目录下：

```
src/content/posts/
├── my-first-post.md
├── hello-world.md
└── another-post.md
```

## Frontmatter 字段

每个 Markdown 文件的开头需要使用 YAML 格式的 frontmatter 元数据：

```yaml
---
title: 文章标题
published: 2024-01-15
description: 文章简短描述
tags: [标签1, 标签2]
category: 分类名称
draft: false
---
```

### 完整字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题 |
| `published` | date | ✅ | 发布日期，格式为 `YYYY-MM-DD` |
| `description` | string | 推荐 | 文章简短描述，显示在首页和 SEO 信息中 |
| `tags` | string[] | 可选 | 文章标签列表 |
| `category` | string | 可选 | 文章分类 |
| `draft` | boolean | 可选 | 是否为草稿，草稿不会显示，默认 `false` |
| `pinned` | boolean | 可选 | 是否置顶显示，默认 `false` |
| `image` | string | 可选 | 文章封面图片路径 |
| `updated` | date | 可选 | 最后更新日期 |
| `alias` | string | 可选 | 文章别名，用于自定义 URL 路径 |
| `licenseName` | string | 可选 | 文章版权许可证名称 |
| `author` | string | 可选 | 文章作者 |
| `sourceLink` | string | 可选 | 原文链接或参考来源 |

### 加密相关字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `encrypted` | boolean | 是否启用密码保护 |
| `password` | string | 文章访问密码 |
| `passwordHint` | string | 密码提示信息 |
| `hideHomeContent` | boolean | 是否在首页隐藏文章摘要 |

## 字段详解

### title（必填）

文章的标题，会在页面标题、列表、搜索结果和 SEO 信息中显示：

```yaml
title: 我的第一篇博客文章
```

### published（必填）

文章发布日期，用于排序和显示：

```yaml
published: 2024-01-15
```

### description（推荐）

文章的简短描述，用于：

- 首页文章卡片展示
- SEO meta description 标签
- RSS 订阅源
- 社交媒体分享预览

```yaml
description: 这篇文章介绍了如何使用 Mizuki 主题搭建博客
```

### tags

标签列表，用于文章分类和标签页面：

```yaml
tags: [Astro, Blog, 前端]
```

### category

文章所属分类，每篇文章只属于一个分类：

```yaml
category: 技术笔记
```

### draft

草稿标记，设置为 `true` 时文章不会在网站上显示：

```yaml
draft: true
```

:::tip
开发阶段可以将未完成的文章标记为草稿，完成后再改为 `false` 发布。
:::

### pinned

置顶标记，设置为 `true` 的文章会在文章列表中置顶显示：

```yaml
pinned: true
```

### image

封面图片路径，支持三种格式：

```yaml
# 远程图片
image: https://example.com/cover.jpg

# public 目录下的图片
image: /images/cover.jpg

# 相对于当前 Markdown 文件的路径
image: ./cover.jpg
```

### alias

自定义 URL 别名，文章可通过 `/posts/{alias}/` 访问：

```yaml
alias: "my-special-article"
```

设置后，文章可以通过 `/posts/my-special-article/` 访问，而不是使用文件名。

## 完整示例

```yaml
---
title: 如何使用 Mizuki 主题
published: 2024-01-15
updated: 2024-03-20
description: Mizuki 主题完整使用教程，从安装到配置到写文章
image: /images/posts/mizuki-guide.jpg
tags: [Astro, Mizuki, 博客, 教程]
category: 技术教程
draft: false
pinned: true
licenseName: "CC BY-NC-SA 4.0"
author: "Your Name"
sourceLink: "https://github.com/LyraVoid/Mizuki"
---
```

## 注意事项

1. **文件名即 URL**：文件名会直接作为文章的 URL 路径，例如 `my-post.md` 对应 `/posts/my-post/`
2. **文件名建议**：使用英文小写字母、数字和连字符，避免使用中文和特殊字符
3. **日期格式**：`published` 和 `updated` 必须使用 `YYYY-MM-DD` 格式
4. **编码格式**：文件必须使用 UTF-8 编码
5. **标签语法**：标签列表可以使用 `[tag1, tag2]` 或换行 `- tag1` 格式
6. **封面图片**：使用相对路径时，图片文件应与 Markdown 文件在同一目录或子目录下
7. **草稿发布**：将 `draft` 从 `true` 改为 `false` 即可发布文章
