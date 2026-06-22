---
title: 侧边栏基础配置
description: Mizuki 主题侧边栏布局配置详解，控制组件的显示、排序和响应式行为
---

侧边栏布局配置位于 `src/config/sidebarConfig.ts` 文件中。该配置控制侧边栏组件的显示、排序、动画和响应式行为。

## 配置结构

```typescript
// src/config/sidebarConfig.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [...],      // 组件属性配置列表
  components: {...},      // 组件布局分配（left, right, drawer）
  defaultAnimation: {...}, // 默认动画配置
  responsive: {...},      // 响应式布局配置（断点配置）
};
```

## properties - 组件属性配置

`properties` 数组定义每个组件的属性，包括位置、动画和响应式行为。

```typescript
properties: [
  {
    type: "profile",           // 组件类型：用户资料组件
    position: "top",           // 组件位置："top" 表示固定在顶部
    class: "onload-animation", // CSS 类名，用于应用样式和动画
    animationDelay: 0,         // 动画延迟时间（毫秒），用于错开动画效果
  },
  {
    type: "announcement",      // 组件类型：公告组件
    position: "top",
    class: "onload-animation",
    animationDelay: 50,
  },
  {
    type: "music-sidebar",     // 组件类型：侧栏音乐组件
    position: "sticky",
    class: "onload-animation",
    animationDelay: 100,
  },
  {
    type: "categories",        // 组件类型：分类组件
    position: "sticky",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
      collapseThreshold: 5,    // 折叠阈值：当分类数量超过5个时自动折叠
    },
  },
  {
    type: "tags",              // 组件类型：标签组件
    position: "top",
    class: "onload-animation",
    animationDelay: 250,
    responsive: {
      collapseThreshold: 20,   // 折叠阈值：当标签数量超过20个时自动折叠
    },
  },
  {
    type: "card-toc",          // 组件类型：卡片式目录组件
    position: "sticky",
    class: "onload-animation",
    animationDelay: 200,
  },
  {
    type: "site-stats",        // 组件类型：站点统计组件
    position: "top",
    class: "onload-animation",
    animationDelay: 200,
  },
  {
    type: "calendar",          // 组件类型：日历组件（移动端不显示）
    position: "top",
    class: "onload-animation",
    animationDelay: 250,
  },
],
```

### 组件属性说明

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `string` | 组件类型标识符 |
| `position` | `"top" \| "sticky"` | 组件定位方式 |
| `class` | `string` | CSS 类名，用于样式和动画 |
| `animationDelay` | `number` | 动画延迟时间（毫秒） |
| `responsive` | `object` | 响应式配置 |
| `responsive.hidden` | `array` | 在指定设备上隐藏组件（`"mobile"`, `"tablet"`, `"desktop"`） |
| `responsive.collapseThreshold` | `number` | 折叠阈值（用于分类、标签等组件） |
| `customProps` | `object` | 自定义属性，用于扩展组件功能 |

### position 说明

| 值 | 说明 |
|----|------|
| `top` | 固定在顶部，不随页面滚动 |
| `sticky` | 粘性定位，随页面滚动但会粘在视口顶部 |

### 支持的组件类型

| 类型 | 说明 |
|------|------|
| `profile` | 个人资料组件 |
| `announcement` | 公告组件 |
| `music-sidebar` | 侧栏音乐组件 |
| `categories` | 分类组件 |
| `tags` | 标签组件 |
| `card-toc` | 卡片式目录组件 |
| `site-stats` | 站点统计组件 |
| `calendar` | 日历组件 |

## components - 组件布局分配

`components` 对象定义各侧边栏包含的组件及其顺序。

```typescript
components: {
  // 左侧边栏组件列表（按顺序从上到下排列）
  left: ["profile", "announcement", "tags", "card-toc"],
  // 右侧边栏组件列表（按顺序从上到下排列）
  right: ["site-stats", "calendar", "categories", "music-sidebar"],
  // 移动端抽屉菜单中的组件列表
  drawer: ["profile", "announcement", "music-sidebar", "categories", "tags"],
},
```

### 布局说明

| 属性 | 说明 |
|------|------|
| `left` | 左侧边栏组件列表（按顺序从上到下排列） |
| `right` | 右侧边栏组件列表（按顺序从上到下排列） |
| `drawer` | 移动端抽屉菜单中的组件列表 |

:::caution[注意]
如果组件设置在 `right`，请确保布局配置中 `layout.position` 为 `"both"`，否则右侧栏不会显示。移动端通常不显示右侧栏内容。
:::

## defaultAnimation - 默认动画配置

```typescript
defaultAnimation: {，每个组件依次增加的延迟
},

// 响应式布局配置
responsive: {
  breakpoints: {
    mobile: 768,   // 移动端断点：屏幕宽度小于768px
    tablet: 1280,  // 平板端断点：屏幕宽度小于1280px
    desktop: 1280, // 桌面端断点：屏幕宽度大于等于1280px
  },
  enable: true,    // 是否启用默认动画
  baseDelay: 0,    // 基础延迟时间（毫秒）
  increment: 50,   // 递增延迟时间（毫秒）
},
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `true` | 是否启用组件加载动画 |
| `baseDelay` | `number` | `0` | 第一个组件的动画延迟 |
| `increment` | `number` | `50` | 每个组件依次增加的延迟 |

## responsive - 响应式布局配置

```typescript
responsive: {
  breakpoints: {
    mobile: 768,    // 移动端断点
    tablet: 1280,   // 平板端断点
    desktop: 1280,  // 桌面端断点
  },
},
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mobile` | `number` | `768` | 移动端断点（px），小于此宽度为移动端 |
| `tablet` | `number` | `1280` | 平板端断点（px） |
| `desktop` | `number` | `1280` | 桌面端断点（px），大于等于此宽度为桌面端 |

## 配置示例

### 双侧边栏布局

```typescript
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    { type: "profile", position: "top", class: "onload-animation", animationDelay: 0 },
    { type: "announcement", position: "top", class: "onload-animation", animationDelay: 50 },
    { type: "categories", position: "sticky", class: "onload-animation", animationDelay: 150 },
    { type: "tags", position: "top", class: "onload-animation", animationDelay: 250 },
    { type: "site-stats", position: "top", class: "onload-animation", animationDelay: 200 },
    { type: "calendar", position: "top", class: "onload-animation", animationDelay: 250 },
  ],
  components: {
    left: ["profile", "announcement", "tags"],
    right: ["site-stats", "calendar", "categories"],
    drawer: ["profile", "announcement", "categories", "tags"],
  },
  defaultAnimation: { enable: true, baseDelay: 0, increment: 50 },
  responsive: {
    breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 },
  },
};
```

### 单侧边栏布局

```typescript
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    { type: "profile", position: "top", class: "onload-animation", animationDelay: 0 },
    { type: "announcement", position: "top", class: "onload-animation", animationDelay: 50 },
    { type: "categories", position: "sticky", class: "onload-animation", animationDelay: 150 },
    { type: "tags", position: "top", class: "onload-animation", animationDelay: 200 },
    { type: "site-stats", position: "top", class: "onload-animation", animationDelay: 250 },
  ],
  components: {
    left: ["profile", "announcement", "categories", "tags", "site-stats"],
    right: [],
    drawer: ["profile", "announcement", "categories", "tags"],
  },
  defaultAnimation: { enable: true, baseDelay: 0, increment: 50 },
  responsive: {
    breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 },
  },
};
```

## 注意事项

1. `components.left` 和 `components.right` 中的组件顺序决定了显示顺序。
2. `drawer` 配置仅在移动端生效，用于定义抽屉菜单中的组件。
3. 使用双侧边栏时，文章列表的网格布局（grid）不可用。
4. `animationDelay` 用于错开各组件的加载动画，避免同时出现。
5. `responsive.breakpoints` 可根据设计需求调整响应式断点。
6. 移动端通常只显示左侧栏内容，右侧栏组件需确保 `layout.position` 为 `"both"`。
