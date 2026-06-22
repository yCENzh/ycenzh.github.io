---
title: 友链页面
description: Mizuki 主题友链页面配置指南，包括数据结构、标签过滤和随机排序功能
---

友链页面用于展示友情链接，支持标签分类和随机排序功能。

## 页面结构

```
src/
├── data/
│   └── friends.ts            ← 友链数据文件
├── content/
│   └── spec/
│       └── friends.md        ← 友链页面的说明文字（可选）
├── pages/
│   └── friends.astro         ← 页面渲染逻辑
└── components/
    └── features/
        └── friends/          ← 友链卡片组件
```

## 数据结构

友链数据定义在 `src/data/friends.ts` 中：

```typescript
export interface FriendItem {
  id: number;           // 唯一标识
  title: string;        // 站点名称
  imgurl: string;       // 头像/Logo 图片 URL
  desc: string;         // 站点描述
  siteurl: string;      // 站点链接
  tags: string[];       // 标签列表，用于分类过滤
}
```

### 添加新友链

在 `friendsData` 数组中添加新条目：

```typescript
export const friendsData: FriendItem[] = [
  {
    id: 1,
    title: "Astro",
    imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
    desc: "The web framework for content-driven websites",
    siteurl: "https://github.com/withastro/astro",
    tags: ["Framework"],
  },
  {
    id: 2,
    title: "示例博客",
    imgurl: "https://example.com/avatar.webp",
    desc: "一个示例博客站点",
    siteurl: "https://example.com",
    tags: ["博客", "技术"],
  },
];
```

## 随机排序

友链页面默认使用随机排序功能，每次访问时友链的展示顺序都会变化。

数据文件中提供 `getShuffledFriendsList()` 函数：

```typescript
// 获取随机排序的友链列表
export const getShuffledFriendsList = () => {
  return [...friendsData].sort(() => Math.random() - 0.5);
};
```

## 标签过滤

页面顶部自动显示标签过滤栏，根据所有友链的 `tags` 字段自动收集标签。

- **全部**：显示所有友链
- **具体标签**：只显示包含该标签的友链

## 页面说明文字

在 `src/content/spec/friends.md` 中可以编写友链页面的说明文字（如友链申请规则）：

```markdown
## 友链申请

欢迎交换友情链接！

### 要求

- 站点内容积极向上
- 站点可以正常访问
- 已添加本站链接

### 格式

- 站点名称：xxx
- 站点链接：xxx
- 站点描述：xxx
- 头像链接：xxx
```

## 页面开关

在 `src/config/siteConfig.ts` 中启用友链页面：

```typescript
featurePages: {
  friends: true,  // 设为 false 关闭友链页面
},
```

## 注意事项

1. 头像图片建议使用正方形图片，推荐尺寸 640x640
2. `id` 字段必须唯一，用于区分不同友链
3. `tags` 数组至少需要一个标签，用于过滤功能
4. 关闭页面后访问 `/friends` 会自动重定向到 404
5. 友链页面支持评论功能，方便访客申请友链
