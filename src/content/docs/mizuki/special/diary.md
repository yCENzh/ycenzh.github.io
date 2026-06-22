---
title: 日记页面
description: Mizuki 主题日记页面配置指南，包括数据结构、标签过滤和 Memos API 集成
---

日记页面用于发布简短的生活动态、心情记录，类似朋友圈/微博的时间线形式展示。

## 页面结构

```
src/
├── data/
│   └── diary.ts              ← 日记数据文件
├── pages/
│   └── diary.astro           ← 页面渲染逻辑
└── components/
    └── features/
        └── diary/            ← 日记相关组件
```

## 数据结构

日记数据定义在 `src/data/diary.ts` 中：

```typescript
export interface DiaryItem {
  id: number;           // 唯一标识
  content: string;      // 日记内容（支持文本）
  date: string;         // 发布时间，ISO 8601 格式
  images?: string[];    // 图片列表（可选）
  location?: string;    // 位置信息（可选）
  mood?: string;        // 心情标签（可选）
  tags?: string[];      // 标签列表（可选，用于分类过滤）
}
```

### 添加新日记

在 `diaryData` 数组中添加新条目：

```typescript
const diaryData: DiaryItem[] = [
  {
    id: 1,
    content: "今天天气真好，出去散步了。",
    date: "2025-06-21T10:30:00Z",
    images: ["/images/diary/sunny-day.webp"],
    location: "北京",
    mood: "开心",
    tags: ["日常", "散步"],
  },
  {
    id: 2,
    content: "完成了一个新项目的开发。",
    date: "2025-06-20T18:00:00Z",
    tags: ["工作", "开发"],
  },
];
```

## 数据文件说明

`diary.ts` 提供以下导出函数：

| 函数 | 说明 |
|------|------|
| `getDiaryList(limit?)` | 获取日记列表，按时间倒序排列，可选限制数量 |
| `getAllTags()` | 获取所有不重复的标签，用于过滤功能 |

## Memos API 集成

除了静态数据，日记页面还支持通过 Memos API 动态获取数据。

在 `src/config/siteConfig.ts` 中配置 API 地址：

```typescript
diaryApiUrl: "https://your-memos-instance.com/api/v1",
```

留空则使用 `diary.ts` 中的静态数据。

## 页面开关

在 `src/config/siteConfig.ts` 中启用日记页面：

```typescript
featurePages: {
  diary: true,  // 设为 false 关闭日记页面
},
```

## 注意事项

1. 日期格式使用 ISO 8601 标准（如 `2025-06-21T10:30:00Z`）
2. 图片路径相对于 `public` 目录
3. 标签用于页面顶部的过滤标签栏，支持按标签筛选
4. 配置 Memos API 后，静态数据将被忽略
5. 关闭页面后访问 `/diary` 会自动重定向到 404
