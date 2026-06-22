---
title: 文件夹结构
description: Mizuki 主题推荐的文件夹文章管理方案，适用于包含图片等资源的文章
---

对于包含封面图片、附加图片或其他资源的文章，推荐使用文件夹结构来组织文章和相关资源。

## 目录结构

```
src/content/posts/
├── my-post/
│   ├── index.md          ← 文章内容文件
│   ├── cover.png         ← 封面图片
│   ├── diagram.png       ← 文章内引用的图片
│   └── assets/           ← 其他资源文件（可选）
│       └── data.json
├── another-post.md       ← 单文件文章也可以共存
└── hello-world/
    ├── index.md
    └── hero.jpg
```

## 为什么推荐文件夹结构？

### 1. 资源就近管理

文章的所有资源文件（图片、附件等）都集中在同一个文件夹内，便于管理和维护。

### 2. 封面图片引用方便

在 frontmatter 中可以直接使用相对路径引用封面图片：

```yaml
---
title: 我的文章
image: ./cover.png
---
```

### 3. 图片路径简洁

文章正文中引用图片也更直观：

```markdown
![图片描述](./diagram.png)
```

### 4. 便于迁移和备份

整个文件夹可以作为一个独立单元进行迁移或备份，不会丢失关联资源。

## 创建文件夹文章

### 方式一：手动创建

```bash
# 创建文章目录
mkdir src/content/posts/my-new-post

# 创建文章文件
touch src/content/posts/my-new-post/index.md
```

### 方式二：使用脚本

Mizuki 主题提供了文章创建脚本：

```bash
pnpm new-post
```

该脚本会引导你输入文章信息，并自动创建对应的文件夹和文件结构。

## Frontmatter 配置

文件夹文章的 frontmatter 与单文件文章完全一致：

```yaml
---
title: 文章标题
published: 2024-01-15
description: 文章描述
image: ./cover.png
tags: [标签1, 标签2]
category: 分类
draft: false
---
```

### 封面图片路径

在文件夹结构中，封面图片使用相对路径：

```yaml
# ✅ 推荐：相对路径
image: ./cover.png

# ✅ 也可以：引用子目录
image: ./images/hero.jpg

# ✅ 也可以：使用公共目录
image: /images/posts/cover.png
```

## 图片引用示例

### 文章内引用图片

```markdown
![架构图](./architecture.png)

![效果展示](./screenshots/demo-1.png)
```

### 使用子目录管理图片

```
my-post/
├── index.md
├── images/
│   ├── architecture.png
│   ├── screenshots/
│   │   ├── demo-1.png
│   │   └── demo-2.png
│   └── diagrams/
│       └── flow.svg
└── cover.png
```

文章中引用：

```markdown
![架构图](./images/architecture.png)

![演示效果](./images/screenshots/demo-1.png)
```

## 图片优化建议

Mizuki 主题内置图片优化功能：

1. **自动压缩**：构建时会自动优化图片大小
2. **格式转换**：支持自动转换为 WebP 格式
3. **响应式图片**：自动生成多种尺寸
4. **懒加载**：图片默认使用懒加载

### 推荐的图片规格

| 用途 | 推荐尺寸 | 格式 |
|------|----------|------|
| 封面图片 | 1200×630 px | JPG/PNG/WebP |
| 文章内图片 | 宽度不超过 1200px | JPG/PNG/WebP |
| 图标 | 64×64 px 以上 | SVG/PNG |

## 混合使用

单文件和文件夹两种方式可以在同一个 `src/content/posts/` 目录下混合使用：

```
src/content/posts/
├── simple-post.md              ← 简单文章使用单文件
├── detailed-guide/             ← 复杂文章使用文件夹
│   ├── index.md
│   └── cover.jpg
├── tech-review/
│   ├── index.md
│   ├── cover.png
│   └── images/
│       ├── benchmark.png
│       └── comparison.png
└── quick-note.md               ← 快速笔记使用单文件
```

## 注意事项

1. **index.md 命名**：文件夹内文章必须命名为 `index.md`
2. **文件夹命名**：使用英文小写字母、数字和连字符，避免中文和特殊字符
3. **资源文件**：除图片外，也可以存放其他类型的资源文件
4. **路径引用**：frontmatter 中的 `image` 字段和正文中的图片路径都使用相对路径
5. **构建优化**：Mizuki 构建时会自动处理图片资源，无需手动配置
6. **版本控制**：建议在 `.gitignore` 中保留图片等资源文件的版本控制
