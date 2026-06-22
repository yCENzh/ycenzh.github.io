---
title: 分类组件
description: Mizuki 主题侧边栏分类组件配置详解，支持自动折叠和响应式显示
---

分类组件用于在侧边栏显示文章分类列表，方便用户按分类浏览文章。该组件通过 `sidebarLayoutConfig` 进行配置。

## 配置方式

分类组件的配置在 `src/config/sidebarConfig.ts` 文件中的 `sidebarLayoutConfig` 对象中：

```typescript
// src/config/sidebarConfig.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    // ...其他组件
    {
      type: "categories",        // 组件类型：分类组件
      position: "sticky",        // 组件位置："sticky" 表示粘性定位，可滚动
      class: "onload-animation", // CSS 类名
      animationDelay: 150,       // 动画延迟时间（毫秒）
      responsive: {
        collapseThreshold: 5,    // 折叠阈值：当分类数量超过5个时自动折叠
      },
    },
  ],
  components: {
    left: [...],
    right: ["categories", ...],
    drawer: [..., "categories", ...],
  },
};
```

## 配置项详解

### type

- **类型**: `"categories"`
- **说明**: 组件类型标识符，固定为 `"categories"`。

### position

- **类型**: `"top" | "sticky"`
- **默认值**: `"sticky"`
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
- **默认值**: `150`
- **说明**: 动画延迟时间（毫秒），用于错开各组件的加载动画。

### responsive

- **类型**: `object`
- **说明**: 响应式配置。

#### responsive.collapseThreshold

- **类型**: `number`
- **默认值**: `5`
- **说明**: 折叠阈值。当分类数量超过此值时，组件自动折叠，用户需点击展开查看更多。

## 配置示例

### 基础配置

```typescript
{
  type: "categories",
  position: "sticky",
  class: "onload-animation",
  animationDelay: 150,
  responsive: {
    collapseThreshold: 5,
  },
}
```

### 高折叠阈值配置

```typescript
{
  type: "categories",
  position: "top",
  class: "onload-animation",
  animationDelay: 150,
  responsive: {
    collapseThreshold: 10,
  },
}
```

### 固定位置配置

```typescript
{
  type: "categories",
  position: "top",
  class: "onload-animation",
  animationDelay: 200,
  responsive: {
    collapseThreshold: 3,
  },
}
```

## 布局分配

在 `components` 中指定分类组件的位置：

```typescript
components: {
  // 放在右侧边栏
  right: ["site-stats", "calendar", "categories"],
  // 或放在左侧边栏
  left: ["profile", "announcement", "categories", "tags"],
  // 移动端抽屉菜单
  drawer: ["profile", "announcement", "categories"],
},
```

## 分类数据来源

分类数据自动从文章的 frontmatter 中提取。在文章的 Markdown 文件中设置 `category`：

```markdown
---
title: 文章标题
category: 技术
---
```

## 注意事项

1. `collapseThreshold` 建议设置为 5-10，过多分类会占用大量侧边栏空间。
2. `position` 设为 `"sticky"` 时，组件会随页面滚动，在长页面中效果更好。
3. 分类组件通常放在右侧边栏，移动端会自动移入抽屉菜单。
4. 没有分类的文章不会在组件中显示。
5. 分类名称区分大小写，`"技术"` 和 `"技术"` 视为同一分类。
