---
title: 仓库结构说明
description: Mizuki 内容仓库的推荐目录结构和组织方式
---

本文档介绍 Mizuki 内容仓库的推荐目录结构，帮助你更好地组织和管理博客内容。

## 推荐目录结构

```
Mizuki-Content/
├── posts/              # 博客文章
│   ├── tech/           # 技术文章分类
│   │   ├── post-1.md
│   │   └── post-2.md
│   ├── life/           # 生活文章分类
│   │   └── post-3.md
│   └── diary/          # 日记
│       └── 2024-01-01.md
├── spec/               # 特殊页面
│   ├── about.md        # 关于页面
│   ├── friends.md      # 友链页面
│   └── projects.md     # 项目页面
├── data/               # 数据文件
│   ├── anime.ts        # 番剧数据
│   ├── projects.ts     # 项目数据
│   ├── skills.ts       # 技能数据
│   └── timeline.ts     # 时间线数据
└── images/             # 图片资源
    ├── albums/         # 相册图片
    ├── diary/          # 日记图片
    └── posts/          # 文章图片
```

---

## 目录详细说明

### posts/ - 博客文章

存放所有博客文章，支持多级分类目录。

**文件命名规则**：
- 使用小写字母和连字符
- 建议使用有意义的名称
- 支持中文文件名（但建议使用英文）

**示例**：
```
posts/
├── astro-mizuki-guide.md
├── 2024/
│   └── new-year-post.md
└── tech/
    └── typescript-tips.md
```

### spec/ - 特殊页面

存放特殊页面的 Markdown 内容，如关于页面、友链页面等。

### data/ - 数据文件

存放 TypeScript 数据文件，用于番剧、项目、技能、时间线等页面。

### images/ - 图片资源

存放所有图片资源，按用途分目录存放。

---

## 图片管理

### 文章图片

```
images/posts/
├── 2024/
│   ├── post-1-cover.webp
│   └── post-1-diagram.webp
└── covers/
    └── post-1.webp
```

### 相册图片

```
images/albums/
├── 旅行/
│   ├── cover.webp
│   ├── photo1.webp
│   └── photo2.webp
└── 美食/
    ├── cover.webp
    └── photo1.webp
```

---

## 相关文档

- [内容分离配置](/mizuki/other/separation/)：如何启用内容分离
- [自动构建](/mizuki/other/auto/)：内容更新时自动触发构建
- [迁移指南](/mizuki/other/migration/)：从其他平台迁移
