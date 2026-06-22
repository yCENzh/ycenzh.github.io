---
title: 迁移指南总览
description: 从其他博客平台迁移到 Mizuki 主题的完整指南
---

本指南帮助你将现有博客内容迁移到 Mizuki 主题。无论你使用什么平台，都可以在这里找到对应的迁移方案。

## 支持的平台

### 静态博客框架

| 平台 | 迁移难度 | 说明 |
|------|---------|------|
| [Hexo](/mizuki/transfer/hexo-to-mizuki/) | ⭐⭐ 简单 | Markdown 文件，格式相近 |
| [Hugo](/mizuki/transfer/hugo-to-mizuki/) | ⭐⭐ 简单 | Markdown 文件，需要调整 frontmatter |
| [Jekyll](/mizuki/transfer/jekyll-to-mizuki/) | ⭐⭐ 简单 | Markdown 文件，格式相近 |
| [Gridea](/mizuki/transfer/gridea-import/) | ⭐⭐ 简单 | Markdown 文件，直接导入 |

### CMS 系统

| 平台 | 迁移难度 | 说明 |
|------|---------|------|
| [WordPress](/mizuki/transfer/wordpress-to-mizuki/) | ⭐⭐⭐ 中等 | 需要数据库导出和格式转换 |
| [Typecho](/mizuki/transfer/typecho-to-mizuki/) | ⭐⭐⭐ 中等 | 需要数据库导出和格式转换 |
| [Halo](/mizuki/transfer/halo-to-mizuki/) | ⭐⭐⭐ 中等 | 支持 API 导出 |
| [Z-Blog](/mizuki/transfer/zblog-import/) | ⭐⭐⭐ 中等 | 需要数据库导出 |

### 通用导入

| 方式 | 适用场景 | 说明 |
|------|---------|------|
| [Markdown 导入](/mizuki/transfer/markdown-import/) | 任意平台 | 手动导入 Markdown 文件 |
| [HTML 导入](/mizuki/transfer/html-import/) | 任意平台 | 导入 HTML 文件并转换 |

---

## 迁移前准备

### 1. 备份原博客

在开始迁移之前，**务必备份**原博客的所有内容：

```bash
# 备份整个博客目录
cp -r /path/to/old-blog /path/to/old-blog-backup

# 或使用 Git
cd /path/to/old-blog
git archive -o backup.zip HEAD
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 了解 Mizuki 的文件结构

```
src/
├── content/
│   └── posts/        # 文章目录
├── data/             # 数据文件
└── assets/           # 资源文件
public/
└── images/           # 图片目录
```

---

## 迁移步骤

### 通用迁移流程

1. **导出内容**：从原平台导出文章和图片
2. **转换格式**：将内容转换为 Mizuki 兼容的 Markdown 格式
3. **导入文件**：将转换后的文件放入 Mizuki 相应目录
4. **调整配置**：根据需要调整 frontmatter 和配置
5. **测试验证**：本地运行测试，确保内容正确显示

---

## 相关文档

- [错误排查](/mizuki/problem/error/)：常见错误解决方案
- [提问的艺术](/mizuki/problem/question/)：如何有效提问
