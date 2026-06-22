---
title: 标签组件
description: Mizuki 主题侧边栏标签组件配置详解，支持自动折叠和标签云显示
---

标签组件用于在侧边栏显示文章标签列表，方便用户按标签浏览文章。该组件通过 `sidebarLayoutConfig` 进行配置。

## 配置方式

标签组件的配置在 `src/config/sidebarConfig.ts` 文件中的 `sidebarLayoutConfig` 对象中：

```typescript
// src/config/sidebarConfig.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    // ...其他组件
    {
      type: "tags",              // 组件类型：标签组件
      position: "top",           // 组件位置："top" 表示固定在顶部
      class: "onload-animation", // CSS 类名
      animationDelay: 250,       // 动画延迟时间（毫秒）
      responsive: {
        collapseThreshold: 20,   // 折叠阈值：当标签数量超过20个时自动折叠
      },
    },
  ],
  components: {
    left: ["profile", "announcement", "tags", ...],
    right: [...],
    drawer: [...],
  },
};
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `type` | `string` | `"tags"` | 组件类型标识符 |
| `position` | `"top" \| "sticky"` | `"top"` | 组件定位方式 |
| `class` | `string` | `"onload-animation"` | CSS 类名 |
| `animationDelay` | `number` | `250` | 动画延迟时间（毫秒） |
| `responsive.collapseThreshold` | `number` | `20` | 标签数量超过此值时自动折叠 |

## 使用说明

- 标签组件会自动从文章的 frontmatter 中提取标签
- 当标签数量超过 `collapseThreshold` 时，会自动折叠显示
- 可以通过 `components.left` 或 `components.right` 控制组件显示在哪个侧边栏
