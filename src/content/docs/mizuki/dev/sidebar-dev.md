---
title: 侧栏组件开发指南
description: Mizuki 主题侧栏组件接入流程和开发规范
---

> 本文档用于规范侧栏相关组件的开发流程，避免出现"配置了组件但页面不显示"的遗漏。

## 适用范围

- 新增或重构侧栏组件（如 `music-sidebar`、自定义统计组件等）
- 调整 `sidebarLayoutConfig` 中的组件布局
- 在左侧栏、右侧栏、抽屉侧栏中复用同一组件

## 架构说明

Mizuki 的侧边栏系统基于**配置驱动**的架构：

```
sidebarLayoutConfig (配置)
        ↓
   WidgetManager (管理器)
        ↓
WIDGET_COMPONENT_MAP (组件映射)
        ↓
   SidebarColumn (渲染器)
```

- `sidebarLayoutConfig` 定义组件的属性和布局分配
- `WidgetManager` 负责根据配置动态加载和排序组件
- `WIDGET_COMPONENT_MAP` 将组件类型映射到实际的组件路径
- `SidebarColumn` 负责最终渲染

---

## 接入步骤

### 步骤 1：在类型系统中声明组件类型

文件：`src/types/config.ts`

在 `WidgetComponentType` 中新增类型：

```typescript
export type WidgetComponentType =
  | "profile"
  | "announcement"
  | "categories"
  | "tags"
  | "toc"
  | "card-toc"
  | "music-player"
  | "music-sidebar"
  | "pio"
  | "site-stats"
  | "calendar"
  | "custom"
  | "my-new-widget"; // ✅ 新增类型
```

:::caution[重要]
所有侧栏组件必须先在 `WidgetComponentType` 中声明。缺少此步 TypeScript 编译不通过。
:::

---

### 步骤 2：在 `sidebarLayoutConfig` 中配置布局

文件：`src/config/sidebarConfig.ts`

在 `properties` 中添加组件属性配置：

```typescript
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    // ...其他组件
    {
      type: "my-new-widget",
      position: "sticky",
      class: "onload-animation",
      animationDelay: 300,
    },
  ],
  components: {
    left: ["profile", "announcement", "categories", "tags"],
    right: ["site-stats", "calendar", "my-new-widget"], // 在右侧栏显示
    drawer: ["profile", "announcement", "my-new-widget", "categories", "tags"],
  },
  // ...
};
```

**配置项说明**：

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `type` | `WidgetComponentType` | 组件类型标识符 |
| `position` | `"top" \| "sticky"` | `top` 固定在顶部，`sticky` 粘性定位 |
| `class` | `string` | CSS 类名，通常为 `"onload-animation"` |
| `animationDelay` | `number` | 动画延迟时间（毫秒） |
| `responsive` | `object` | 响应式配置（可选） |

---

### 步骤 3：在 `WIDGET_COMPONENT_MAP` 中注册组件

文件：`src/utils/widget-manager.ts`

在组件映射表中添加新组件的路径：

```typescript
export const WIDGET_COMPONENT_MAP = {
  profile: "../components/widgets/profile/Profile.astro",
  announcement: "../components/widgets/announcement/Announcement.astro",
  categories: "../components/widgets/categories/Categories.astro",
  tags: "../components/widgets/tags/Tags.astro",
  toc: "../components/widgets/toc/TOC.astro",
  "card-toc": "../components/widgets/card-toc/CardTOC.astro",
  "music-player": "../components/widgets/music-player/MusicPlayer.svelte",
  "music-sidebar": "../components/widgets/music-sidebar/MusicSidebarWidget.astro",
  pio: "../components/widget/Pio.astro",
  "site-stats": "../components/widgets/site-stats/SiteStats.astro",
  calendar: "../components/widgets/calendar/Calendar.astro",
  custom: null,
  "my-new-widget": "../components/widgets/my-new-widget/MyNewWidget.astro", // ✅ 新增
} as const;
```

:::caution[最容易遗漏的步骤]
如果未在 `WIDGET_COMPONENT_MAP` 中注册，组件类型会被静默忽略，页面不会显示任何错误提示。
:::

---

## 响应式配置

组件支持响应式行为，可以在特定设备上隐藏或自动折叠：

```typescript
{
  type: "categories",
  position: "sticky",
  class: "onload-animation",
  animationDelay: 150,
  responsive: {
    hidden: ["mobile"],           // 在移动端隐藏
    collapseThreshold: 5,         // 当分类数量超过 5 个时自动折叠
  },
}
```

### 设备类型

| 设备 | 断点 | 说明 |
|------|------|------|
| `mobile` | < 768px | 手机端，使用 drawer 侧栏 |
| `tablet` | 768px - 1279px | 平板端，仅显示左侧栏 |
| `desktop` | ≥ 1280px | 桌面端，显示左右侧栏 |

---

## 常见问题排查

### Q1：配置了组件但页面不显示

请按以下顺序排查：

1. `src/types/config.ts` 中的 `WidgetComponentType` 是否包含该类型？
2. `src/config/sidebarConfig.ts` 中 `sidebarLayoutConfig.components` 的对应数组是否包含该类型？
3. `src/utils/widget-manager.ts` 中 `WIDGET_COMPONENT_MAP` 是否注册了该组件路径？
4. 该侧栏在当前设备宽度下是否被响应式逻辑隐藏了？
5. 组件自身是否有 `enable` 配置导致不渲染？

### Q2：组件在 SSR 报错 `window is not defined`

Svelte 组件在服务端渲染阶段访问了 `window` 对象。

```astro
<!-- ❌ 错误：服务端仍会渲染组件 -->
<MyComponent client:idle />

<!-- ✅ 正确：只在浏览器执行 -->
<MyComponent client:only="svelte" />
```

### Q3：移动端不显示右侧栏内容

移动端完全由 `drawer` 配置决定，不会合并左右侧栏。请确保组件在 `components.drawer` 中有配置。

---

## 代码审查检查清单

- [ ] `src/types/config.ts` 的 `WidgetComponentType` 中已声明新组件类型
- [ ] `src/config/sidebarConfig.ts` 的 `sidebarLayoutConfig` 中已配置该组件
- [ ] `src/utils/widget-manager.ts` 的 `WIDGET_COMPONENT_MAP` 中已注册组件路径
- [ ] Svelte 组件使用了正确的 `client:*` 指令
- [ ] 组件自身的功能开关已正确配置
