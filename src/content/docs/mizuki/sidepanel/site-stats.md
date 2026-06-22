---
title: 站点统计组件
description: Mizuki 主题侧边栏站点统计组件配置详解，显示文章数、运行天数等统计信息
---

站点统计组件用于在侧边栏显示站点的基本统计数据，包括文章数量、运行天数等信息。该组件通过 `sidebarLayoutConfig` 进行配置。

## 配置方式

站点统计组件的配置在 `src/config/sidebarConfig.ts` 文件中的 `sidebarLayoutConfig` 对象中：

```typescript
// src/config/sidebarConfig.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    // ...其他组件
    {
      type: "site-stats",        // 组件类型：站点统计组件
      position: "top",           // 组件位置："top" 表示固定在顶部
      class: "onload-animation", // CSS 类名
      animationDelay: 200,       // 动画延迟时间（毫秒）
    },
  ],
  components: {
    left: [...],
    right: ["site-stats", "calendar", ...],
    drawer: [...],
  },
};
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `type` | `string` | `"site-stats"` | 组件类型标识符 |
| `position` | `"top" \| "sticky"` | `"top"` | 组件定位方式 |
| `class` | `string` | `"onload-animation"` | CSS 类名 |
| `animationDelay` | `number` | `200` | 动画延迟时间（毫秒） |

## 显示内容

站点统计组件会自动显示以下信息：
- **文章数量**: 博客中的文章总数
- **运行天数**: 从 `siteStartDate` 配置的日期开始计算
- **标签数量**: 文章中使用的标签总数
- **分类数量**: 文章的分类总数

## siteStartDate 配置

运行天数基于 `src/config/siteConfig.ts` 中的 `siteStartDate` 配置：

```typescript
// src/config/siteConfig.ts
export const siteConfig: SiteConfig = {
  // ...其他配置
  siteStartDate: "2025-01-01", // 站点开始运行日期，用于站点统计组件计算运行天数
};
```

## 使用说明

- 统计数据会自动计算，无需手动配置
- 运行天数基于当前日期与 `siteStartDate` 的差值自动计算
- 组件通常显示在右侧侧边栏
