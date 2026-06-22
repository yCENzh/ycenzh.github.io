---
title: 导航栏配置
description: Mizuki 主题导航栏配置详解，包括预设链接、自定义链接、多级菜单和图标设置
---

导航栏配置位于 `src/config/navBarConfig.ts` 文件中，用于自定义顶部导航栏的菜单项。

## 链接类型

`links` 数组中的每一项可以是以下两种类型之一：

### 类型一：预设链接（LinkPreset）

直接使用 `LinkPreset` 枚举，自动生成对应的名称、URL 和图标。

```typescript
import { LinkPreset } from "../types/config";

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,     // 首页
    LinkPreset.Archive,  // 归档
    LinkPreset.About,    // 关于
  ],
};
```

#### 可用预设值

| 预设值 | 页面 |
|--------|------|
| `LinkPreset.Home` | 首页 |
| `LinkPreset.Archive` | 归档 |
| `LinkPreset.About` | 关于 |
| `LinkPreset.Friends` | 友链 |
| `LinkPreset.Anime` | 番剧 |
| `LinkPreset.Diary` | 日记 |
| `LinkPreset.Albums` | 相册 |
| `LinkPreset.Projects` | 项目 |
| `LinkPreset.Skills` | 技能 |
| `LinkPreset.Timeline` | 时间线 |

### 类型二：自定义链接对象

```typescript
{
  name: "显示名称",        // 必填，菜单项显示的文字
  url: "/your-page/",     // 必填，链接地址
  icon: "icon-set:icon",  // 可选，Iconify 图标
  external: true,         // 可选，是否为外部链接（默认 false）
  children: [...]         // 可选，子菜单数组
}
```

## 多级菜单配置

通过 `children` 字段实现下拉子菜单，支持多级嵌套。

### 单级菜单

```typescript
{
  name: "About",
  url: "/about/",
  icon: "material-symbols:info",
}
```

### 一级下拉菜单

```typescript
{
  name: "Links",
  url: "/links/",
  icon: "material-symbols:link",
  children: [
    {
      name: "GitHub",
      url: "https://github.com",
      external: true,
      icon: "fa7-brands:github",
    },
    {
      name: "Bilibili",
      url: "https://bilibili.com",
      external: true,
      icon: "fa7-brands:bilibili",
    },
  ],
}
```

### 混合使用预设和自定义链接

```typescript
{
  name: "More",
  url: "#",
  icon: "material-symbols:more-horiz",
  children: [
    LinkPreset.Projects,  // 使用预设
    {
      name: "Skills",
      url: "/skills/",
      icon: "material-symbols:psychology",
    },  // 自定义
  ],
}
```

## 图标说明

`icon` 字段使用 Iconify 图标格式：`"集合名:图标名"`。

### 常用图标集合

| 集合名 | 说明 |
|--------|------|
| `material-symbols` | Google Material Symbols（推荐） |
| `mdi` | Material Design Icons |
| `fa7-brands` | Font Awesome 7 品牌图标 |
| `fa7-solid` | Font Awesome 7 实心图标 |
| `fa7-regular` | Font Awesome 7 线性图标 |
| `simple-icons` | Simple Icons（品牌 Logo） |

> 浏览更多图标：[Iconify 图标库](https://icon-sets.iconify.design/)

## external 字段说明

| 值 | 行为 |
|----|------|
| `true` | 外部链接，新标签页打开，并显示外链图标标识 |
| `false` | 内部链接，当前页面内导航（使用 Swup 无刷新跳转） |
| 不设置 | 默认视为内部链接 |

## 完整配置示例

```typescript
import type { NavBarConfig } from "../types/config";
import { LinkPreset } from "../types/config";

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,

    {
      name: "Links",
      url: "/links/",
      icon: "material-symbols:link",
      children: [
        {
          name: "GitHub",
          url: "https://github.com",
          external: true,
          icon: "fa7-brands:github",
        },
        {
          name: "Bilibili",
          url: "https://bilibili.com",
          external: true,
          icon: "fa7-brands:bilibili",
        },
      ],
    },

    {
      name: "About",
      url: "#",
      icon: "material-symbols:info",
      children: [
        { name: "About", url: "/about/", icon: "material-symbols:person" },
        LinkPreset.Friends,
      ],
    },
  ],
};
```

## 注意事项

1. 关闭特色页面后（`siteConfig.featurePages`），导航栏会自动隐藏对应链接，无需手动移除。
2. 内部链接 URL 格式为 `/page-name/`（以斜杠开头和结尾）。
3. 外部链接 URL 必须包含完整协议前缀（如 `https://`）。
4. 导航栏在移动端会自动收拢为汉堡菜单，子菜单以折叠面板形式展示。
5. `links` 数组的顺序即为导航栏从左到右的显示顺序。
6. 当前 UI 仅渲染一级下拉菜单，更深层级的嵌套需要配合前端组件改造。
