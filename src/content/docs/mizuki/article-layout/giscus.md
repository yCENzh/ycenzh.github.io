---
title: Giscus 评论系统
description: 配置基于 GitHub Discussions 的 Giscus 评论系统
---

Giscus 是一个基于 GitHub Discussions 的评论系统，利用 GitHub 的基础设施提供评论功能。

## 配置位置

评论系统配置位于 `src/config/commentConfig.ts` 文件中。

## 配置项详解

```typescript
// src/config/commentConfig.ts
import type { CommentConfig } from "../types/config";
import { SITE_LANG } from "./siteConfig";

export const commentConfig: CommentConfig = {
  enable: false,
  system: "giscus",
  giscus: {
    repo: "your-github-username/your-repo-name",
    repoId: "your-repo-id",
    category: "Announcements",
    categoryId: "your-category-id",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: SITE_LANG,
    loading: "lazy",
  },
};
```

### repo

- **类型**: `string`
- **必填**: 是
- **说明**: GitHub 仓库名称，格式为 `owner/repo`

### repoId

- **类型**: `string`
- **必填**: 是
- **说明**: GitHub Discussions 的仓库 GraphQL Node ID

### category

- **类型**: `string`
- **默认值**: `"Announcements"`
- **说明**: 用于存储评论的 GitHub Discussions 分类名称

### categoryId

- **类型**: `string`
- **必填**: 是
- **说明**: GitHub Discussions 分类的 GraphQL Node ID

### mapping

- **类型**: `string`
- **默认值**: `"pathname"`
- **说明**: 页面与 Discussion 的映射方式

| 值 | 说明 |
|----|------|
| `pathname` | 按页面路径映射 |
| `url` | 按完整 URL 映射 |
| `title` | 按页面标题映射 |
| `og:title` | 按 Open Graph 标题映射 |

### theme

- **类型**: `string`
- **默认值**: `"preferred_color_scheme"`
- **说明**: 评论组件的主题

| 主题 | 说明 |
|------|------|
| `light` | 亮色主题 |
| `dark` | 暗色主题 |
| `preferred_color_scheme` | 跟随系统主题 |

### lang

- **类型**: `string`
- **默认值**: 站点语言
- **说明**: 评论界面语言

### loading

- **类型**: `string`
- **默认值**: `"lazy"`
- **说明**: 加载方式

## 文章级评论控制

你可以在文章的 frontmatter 中设置 `comment` 字段来单独控制某篇文章是否显示评论：

```yaml
---
title: 文章标题
comment: false  # 禁用本篇文章的评论
---
```

## 配置步骤

### 步骤一：安装 Giscus 应用

1. 访问 [GitHub Apps - Giscus](https://github.com/apps/giscus)
2. 点击 "Install"
3. 选择要安装的仓库

### 步骤二：获取配置

1. 访问 [giscus.app](https://giscus.app/)
2. 输入仓库名称
3. 选择 Discussions 分类
4. 获取生成的配置信息

### 步骤三：填写配置

将获取到的配置信息填入 `src/config/commentConfig.ts` 文件中。
