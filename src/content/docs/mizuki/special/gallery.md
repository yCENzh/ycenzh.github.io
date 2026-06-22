---
title: 相册页面
description: Mizuki 主题相册页面配置指南，包括相册目录结构、info.json 配置、本地与外链模式
---

相册页面用于展示图片相册，采用**自动扫描**机制，只需创建文件夹、放置图片和配置文件即可。支持本地图片模式和外链图片模式。

## 页面结构

```
src/
├── pages/
│   └── albums.astro          ← 页面渲染逻辑
├── utils/
│   └── album-scanner.ts      ← 相册扫描工具
└── components/
    └── features/
        └── albums/           ← 相册卡片组件
public/
    └── images/
        └── albums/           ← 相册图片目录
```

## 快速开始

创建一个相册只需 3 步：

1. 在 `public/images/albums/` 下创建一个文件夹（文件夹名即为相册 ID）
2. 在文件夹中放置 `cover.jpg`（或 `cover.webp`）封面图和其他照片
3. 创建 `info.json` 配置文件

完成！相册会自动出现在相册列表页面。

### 目录结构

```
public/images/albums/
├── my-travel-2024/              # 相册文件夹（文件夹名 = 相册ID）
│   ├── info.json                # 相册配置文件（必需）
│   ├── cover.jpg                # 封面图（必需）
│   ├── photo1.jpg               # 相册照片
│   ├── photo2.jpg
│   └── photo3.jpg
├── daily-life/                  # 另一个相册
│   ├── info.json
│   ├── cover.jpg
│   └── ...
```

## 相册配置

### info.json 配置文件

每个相册目录必须包含 `info.json` 配置文件。

#### 本地图片模式

```json
{
  "title": "我的旅行相册",
  "description": "2024年夏天的美好回忆",
  "date": "2024-08-01",
  "location": "日本东京",
  "tags": ["旅行", "风景", "夏天"],
  "layout": "masonry",
  "columns": 3,
  "hidden": false
}
```

**配置项说明：**

| 字段 | 必需 | 说明 | 默认值 |
|------|------|------|--------|
| `title` | 是 | 相册标题 | 使用文件夹名 |
| `description` | 否 | 相册描述 | 空 |
| `date` | 否 | 相册日期（格式：YYYY-MM-DD） | 当前日期 |
| `location` | 否 | 拍摄地点 | 空 |
| `tags` | 否 | 标签数组 | `[]` |
| `layout` | 否 | 布局方式：`grid`（网格）或 `masonry`（瀑布流） | `grid` |
| `columns` | 否 | 列数（2-4） | `3` |
| `hidden` | 否 | 是否隐藏相册 | `false` |

#### 外链图片模式

如果想使用外部图片链接（例如使用图床），设置 `mode: "external"`：

```json
{
  "mode": "external",
  "title": "外链相册示例",
  "description": "使用外部图片链接的相册",
  "date": "2024-08-28",
  "location": "网络",
  "tags": ["外链", "示例"],
  "layout": "masonry",
  "columns": 3,
  "cover": "https://example.com/cover.jpg",
  "photos": [
    {
      "id": "photo-1",
      "src": "https://example.com/photo1.jpg",
      "alt": "图片描述",
      "title": "图片标题",
      "description": "详细描述",
      "tags": ["标签1"],
      "width": 1920,
      "height": 1280
    }
  ]
}
```

**外链模式额外字段：**

| 字段 | 必需 | 说明 |
|------|------|------|
| `mode` | 是 | 设置为 `"external"` 启用外链模式 |
| `cover` | 是 | 封面图片 URL（仅外链模式需要） |
| `photos` | 是 | 照片数组，详见下表 |

**photos 数组中每张图片的字段说明（仅外链模式）：**

| 字段 | 必需 | 说明 | 示例 |
|------|------|------|------|
| `id` | 否 | 照片唯一标识符 | `"photo-1"` |
| `src` | 是 | 照片 URL 地址 | `"https://example.com/photo.jpg"` |
| `thumbnail` | 否 | 缩略图 URL（不提供则使用原图） | `"https://example.com/thumb.jpg"` |
| `alt` | 否 | 图片替代文本 | `"美丽的日落"` |
| `title` | 否 | 照片标题 | `"海边日落"` |
| `description` | 否 | 照片详细描述 | `"2024年夏天在海边拍摄的日落"` |
| `tags` | 否 | 照片标签数组 | `["日落", "海边"]` |
| `date` | 否 | 拍摄日期（YYYY-MM-DD） | `"2024-08-01"` |
| `location` | 否 | 拍摄地点 | `"冲绳海滩"` |
| `width` | 否 | 照片宽度（像素） | `1920` |
| `height` | 否 | 照片高度（像素） | `1280` |
| `camera` | 否 | 相机型号 | `"Canon EOS R5"` |
| `lens` | 否 | 镜头型号 | `"RF 24-70mm F2.8"` |
| `settings` | 否 | 拍摄参数 | `"f/2.8, 1/500s, ISO 100"` |

> [!NOTE]
> 本地图片模式**不需要**配置 `photos` 字段，系统会自动扫描文件夹中的所有图片文件。外链模式**必须**手动配置 `photos` 数组。

## 布局选项

### 网格布局 (Grid)

```json
{
  "layout": "grid",
  "columns": 3
}
```

- 适合尺寸统一的照片
- 支持 2-4 列
- 照片会被裁剪为正方形

### 瀑布流布局 (Masonry)

```json
{
  "layout": "masonry",
  "columns": 3
}
```

- 适合不同尺寸的照片
- 保持照片原始比例
- 自动排列，视觉效果更自然

## 隐藏相册

设置 `"hidden": true` 可以隐藏相册，使其不在相册列表中显示，但仍可通过 URL 直接访问：

```json
{
  "title": "私密相册",
  "hidden": true,
  "tags": ["私人"]
}
```

访问地址：`/albums/your-album-id/`

## 文件名标签（实验性）

系统支持从文件名解析标签（格式：`基本名_标签1_标签2.ext`）：

```
photo_sunset_beach.jpg  →  标签：sunset, beach
```

## 图片格式建议

### 封面图片

- **尺寸**：800×600px（4:3 比例）
- **格式**：JPG 或 WebP（外链模式可支持更多格式）
- **大小**：建议 < 200KB

### 相册照片

- **格式**：JPG、JPEG、PNG、WebP、GIF、SVG、AVIF
- **尺寸**：建议最大宽度 1920px
- **优化**：建议压缩后上传，提升加载速度

## 标签过滤

页面顶部自动显示标签过滤栏：

- **全部**：显示所有相册
- **具体标签**：只显示包含该标签的相册

标签从所有相册的 `info.json` 中自动收集，无需手动维护。

## 页面开关

在 `src/config/siteConfig.ts` 中启用相册页面：

```typescript
featurePages: {
  albums: true,  // 设为 false 关闭相册页面
},
```

## 注意事项

1. 每个相册目录必须包含 `info.json` 配置文件，否则该相册将被跳过
2. 本地图片模式下，封面图命名为 `cover.jpg` 或 `cover.webp`
3. 外链模式下，封面图通过 `info.json` 中的 `cover` 字段指定
4. 图片路径相对于 `public` 目录
5. 推荐使用 WebP 格式以获得更好的压缩效果
6. 修改相册内容后需要重新构建项目
7. 设置 `hidden: true` 的相册可通过直接访问 URL 查看
8. 关闭页面后访问 `/albums` 会自动重定向到 404
