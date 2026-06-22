---
title: PicFlow API
description: Mizuki 主题中图片瀑布流功能的 PicFlow API 配置和使用指南
---

本文档介绍如何在 Mizuki 中配置和使用 PicFlow API 图片瀑布流功能。

## 简介

PicFlow 是一个图片管理和展示 API，用于在 Mizuki 中实现图片瀑布流（Masonry）布局。支持本地图片、远程图片和多种图床服务。

## 配置步骤

### 1. 本地图片配置

将图片放置在 `public/images/albums/` 目录：

```
public/images/albums/
├── 相册1/
│   ├── cover.webp
│   ├── image1.webp
│   └── image2.webp
└── 相册2/
    ├── cover.webp
    └── image1.webp
```

### 2. 配置 Mizuki

相册页面通过自动扫描目录生成数据，无需额外配置。

---

## 图片规范

### 推荐格式

| 格式 | 说明 | 推荐度 |
|------|------|--------|
| `.webp` | 现代格式，体积小 | ⭐⭐⭐ |
| `.jpg` | 通用格式 | ⭐⭐ |
| `.png` | 无损格式 | ⭐ |

### 推荐尺寸

- **封面图**：400x300 或 16:9 比例
- **内容图**：宽度不超过 2000px
- **缩略图**：自动生成

### 文件命名

建议使用有意义的文件名：

```
✅ 好的命名
- 2024-summer-trip-01.webp
- tokyo-skytree.jpg

❌ 不好的命名
- IMG_20240101_001.jpg
- DSC00001.png
```

---

## 使用远程图片

如果想使用远程图片，可以在数据文件中配置：

```typescript
// src/data/albums.ts
export const albums = [
  {
    id: "remote-album",
    title: "远程相册",
    cover: "https://example.com/cover.jpg",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
  },
];
```

---

## 图床服务

### 推荐图床

| 服务 | 说明 | 链接 |
|------|------|------|
| Cloudflare Images | 稳定快速 | [cloudflare.com](https://www.cloudflare.com/products/cloudflare-images/) |
| Imgur | 免费图床 | [imgur.com](https://imgur.com/) |
| SM.MS | 国内图床 | [sm.ms](https://sm.ms/) |
| 阿里云 OSS | 国内服务 | [aliyun.com](https://www.aliyun.com/product/oss) |

### 使用图床

将图片上传到图床后，使用远程 URL 引用：

```markdown
![图片](https://your-image-host.com/image.jpg)
```

---

## 相关文档

- [相册页面配置](/mizuki/special/gallery/)：相册页面详细配置
- [图片语法](/mizuki/press/image/)：图片使用指南
- [错误排查](/mizuki/problem/error/)：常见错误解决方案
