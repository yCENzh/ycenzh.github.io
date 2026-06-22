---
title: 固定链接
description: Mizuki 主题文章固定链接和自定义 URL 路径功能
---

Mizuki 主题允许通过 `alias` 字段自定义文章的 URL 路径，实现固定链接（Permalink）功能。

## 默认 URL 结构

默认情况下，文章的 URL 由文件名决定：

```
文件路径: src/content/posts/my-first-post.md
URL:      /posts/my-first-post/
```

```
文件路径: src/content/posts/2024/hello-world.md
URL:      /posts/2024/hello-world/
```

## 自定义固定链接

在 frontmatter 中使用 `alias` 字段自定义 URL 路径：

```yaml
---
title: 我的特殊文章
published: 2024-01-15
alias: "my-special-article"
---
```

设置后，文章可通过 `/posts/my-special-article/` 访问。

## 使用场景

### 1. 简化复杂文件名

当文件名因组织需要而较长时，可以设置简短的 alias：

```yaml
# 文件: src/content/posts/2024/01/astro-mizuki-theme-complete-guide.md
title: Mizuki 主题完整指南
alias: "mizuki-guide"
```

访问路径：`/posts/mizuki-guide/`

### 2. 支持中文 URL

文件名使用英文，但 URL 可以展示更友好的路径：

```yaml
# 文件: src/content/posts/hello-world.md
title: 你好世界
alias: "hello-world"
```

### 3. 版本化文章

为不同版本的文章设置固定链接：

```yaml
# 文件: src/content/posts/javascript-guide-v2.md
title: JavaScript 指南 2.0
alias: "javascript-guide"
```

### 4. 迁移兼容

从其他平台迁移时，保持原有 URL 结构：

```yaml
# 文件: src/content/posts/new-post-about-astro.md
title: 深入了解 Astro
alias: "p/123"  # 保持原 WordPress 格式
```

## 文件夹文章的固定链接

文件夹结构的文章同样支持 alias：

```
src/content/posts/
└── detailed-guide/
    └── index.md
```

```yaml
---
title: 详细指南
alias: "guide"
---
```

访问路径：`/posts/guide/`

## 与文件名的关系

| 配置 | URL 路径 |
|------|----------|
| 无 alias | `/posts/{文件名}/` |
| 有 alias | `/posts/{alias}/` |
| 文件夹 + 无 alias | `/posts/{文件夹名}/` |
| 文件夹 + 有 alias | `/posts/{alias}/` |

:::note
设置 `alias` 后，原始文件名路径将不再有效，文章只能通过 alias 路径访问。
:::

## URL 设计建议

### 推荐的 URL 格式

```yaml
# 简洁明了
alias: "astro-guide"

# 使用日期前缀（可选）
alias: "2024/astro-guide"

# 使用分类前缀（可选）
alias: "tech/astro-guide"
```

### URL 命名规范

1. 使用小写英文字母
2. 使用连字符 `-` 分隔单词
3. 避免使用特殊字符和中文
4. 保持简短且有意义
5. 避免与现有路由冲突

```yaml
# ✅ 推荐
alias: "getting-started-with-astro"

# ✅ 推荐
alias: "js-array-methods"

# ❌ 不推荐
alias: "post-123456"

# ❌ 不推荐
alias: "My_Blog_Post!"
```

## 注意事项

1. **唯一性**：每篇文章的 alias 必须是唯一的，不能重复
2. **路径冲突**：确保 alias 不会与其他页面路由冲突
3. **稳定性**：设置后尽量不要修改，否则会导致旧链接失效
4. **SEO 影响**：修改 alias 会影响搜索引擎已收录的链接
5. **重定向**：如果必须修改 alias，建议配置适当的重定向规则
6. **中文路径**：虽然可以使用中文 alias，但强烈建议使用英文以确保兼容性
