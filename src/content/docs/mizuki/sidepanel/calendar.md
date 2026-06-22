---
title: 日历组件
description: Mizuki 主题侧边栏日历组件配置详解，显示文章发布日历
---

日历组件用于在侧边栏显示文章发布日历，方便用户查看文章发布时间分布。该组件通过 `sidebarLayoutConfig` 进行配置。

## 配置方式

日历组件的配置在 `src/config/sidebarConfig.ts` 文件中的 `sidebarLayoutConfig` 对象中：

```typescript
// src/config/sidebarConfig.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    // ...其他组件
    {
      type: "calendar",          // 组件类型：日历组件（移动端不显示）
      position: "top",           // 组件位置："top" 表示固定在顶部
      class: "onload-animation", // CSS 类名
      animationDelay: 250,       // 动画延迟时间（毫秒）
    },
  ],
  components: {
    left: [...],
    right: [..., "calendar", ...],
    drawer: [...],
  },
};
```

## 配置项详解

### type

- **类型**: `"calendar"`
- **说明**: 组件类型标识符，固定为 `"calendar"`。

### position

- **类型**: `"top" | "sticky"`
- **默认值**: `"top"`
- **说明**: 组件定位方式。

| 值 | 说明 |
|----|------|
| `top` | 固定在顶部，不随页面滚动 |
| `sticky` | 粘性定位，随页面滚动但会粘在视口顶部 |

### class

- **类型**: `string`
- **默认值**: `"onload-animation"`
- **说明**: CSS 类名，用于应用样式和动画效果。

### animationDelay

- **类型**: `number`
- **默认值**: `250`
- **说明**: 动画延迟时间（毫秒），用于错开各组件的加载动画。

## 配置示例

### 基础配置

```typescript
{
  type: "calendar",
  position: "top",
  class: "onload-animation",
  animationDelay: 250,
}
```

### 粘性定位配置

```typescript
{
  type: "calendar",
  position: "sticky",
  class: "onload-animation",
  animationDelay: 300,
}
```

## 布局分配

在 `components` 中指定日历组件的位置：

```typescript
components: {
  // 通常放在右侧边栏
  right: ["site-stats", "calendar", "categories"],
  // 或放在左侧边栏
  left: ["profile", "announcement", "calendar", "tags"],
  // 移动端抽屉菜单（移动端通常不显示日历）
  drawer: ["profile", "announcement", "categories"],
},
```

## 日历数据来源

日历组件自动从文章的 frontmatter 中提取发布日期：

```markdown
---
title: 文章标题
published: 2025-06-15
---
```

日历会高亮显示有文章发布的日期，用户可以点击日期查看当天发布的文章。

## 日历显示规则

| 规则 | 说明 |
|------|------|
| 当前月份 | 默认显示当前月份的日历 |
| 有文章的日期 | 高亮显示，可点击跳转 |
| 无文章的日期 | 正常显示，不可点击 |
| 当天日期 | 特殊标记 |

## 注意事项

1. 日历组件在移动端通常不显示，建议只在 `right` 或 `left` 中配置，不放入 `drawer`。
2. 日历数据基于文章的 `published` 字段，确保文章 frontmatter 中包含正确的发布日期。
3. 日历组件通常放在站点统计组件下方。
4. 组件样式会自动适配主题配色方案。
5. 点击有文章的日期会跳转到对应日期的文章列表页面。
6. 日历组件的高度相对固定，建议使用 `position: "top"` 定位。
