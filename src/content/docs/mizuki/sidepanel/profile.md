---
title: 个人资料组件
description: Mizuki 主题侧边栏个人资料组件配置详解，支持头像、名称、简介和社交链接
---

个人资料组件配置位于 `src/config/profileConfig.ts` 文件中。该组件显示在侧边栏顶部，展示博主的基本信息和社交链接。

## 配置项详解

```typescript
// src/config/profileConfig.ts
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
  name: "まつざか ゆき",
  bio: "世界は大きい、君は行かなければならない",
  typewriter: {
    enable: true, // 启用个人简介打字机效果
    speed: 80, // 打字速度（毫秒）
  },
  links: [
    {
      name: "Bilibili",
      icon: "fa7-brands:bilibili",
      url: "https://space.bilibili.com/701864046",
    },
    {
      name: "Gitee",
      icon: "mdi:git",
      url: "https://gitee.com/matsuzakayuki",
    },
    {
      name: "GitHub",
      icon: "fa7-brands:github",
      url: "https://github.com/matsuzaka-yuki",
    },
    {
      name: "Codeberg",
      icon: "simple-icons:codeberg",
      url: "https://codeberg.org",
    },
    {
      name: "Discord",
      icon: "fa7-brands:discord",
      url: "https://discord.gg/MqW6TcQtVM",
    },
  ],
};
```

### avatar

- **类型**: `string`
- **说明**: 头像路径。相对于 `/src` 目录；如果以 `/` 开头，则相对于 `/public` 目录。

| 路径格式 | 说明 |
|----------|------|
| `assets/images/avatar.webp` | 相对于 `/src` 目录 |
| `/images/avatar.webp` | 相对于 `/public` 目录 |

### name

- **类型**: `string`
- **说明**: 博主名称，显示在头像下方。

### bio

- **类型**: `string`
- **说明**: 个人简介文字，显示在名称下方。

### typewriter

- **类型**: `object`
- **说明**: 打字机效果配置。

#### typewriter.enable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否启用个人简介的打字机效果。

#### typewriter.speed

- **类型**: `number`
- **默认值**: `80`
- **说明**: 打字速度，单位为毫秒/字符。数值越小打字越快。

### links

- **类型**: `array`
- **说明**: 社交媒体链接数组。

#### links[].name

- **类型**: `string`
- **说明**: 链接名称，鼠标悬停时显示。

#### links[].icon

- **类型**: `string`
- **说明**: 图标标识符，使用 [Iconify](https://icon-sets.iconify.design/) 图标库格式。

常用图标格式：`前缀:图标名`，例如：

| 前缀 | 图标库 | 示例 |
|------|--------|------|
| `fa7-brands` | Font Awesome Brands | `fa7-brands:github` |
| `mdi` | Material Design Icons | `mdi:git` |
| `simple-icons` | Simple Icons | `simple-icons:codeberg` |
| `ri` | Remix Icon | `ri:twitter-x-line` |

#### links[].url

- **类型**: `string`
- **说明**: 链接地址，支持外部链接和内部链接。

## 配置示例

### 基础配置

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.webp",
  name: "Mizuki",
  bio: "一个简约的博客主题",
  typewriter: {
    enable: true,
    speed: 100,
  },
  links: [
    { name: "GitHub", icon: "fa7-brands:github", url: "https://github.com" },
  ],
};
```

### 完整社交链接配置

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "/images/avatar.webp",
  name: "まつざか ゆき",
  bio: "世界は大きい、君は行かなければならない",
  typewriter: {
    enable: true,
    speed: 80,
  },
  links: [
    { name: "Bilibili", icon: "fa7-brands:bilibili", url: "https://space.bilibili.com/701864046" },
    { name: "Gitee", icon: "mdi:git", url: "https://gitee.com/matsuzakayuki" },
    { name: "GitHub", icon: "fa7-brands:github", url: "https://github.com/matsuzaka-yuki" },
    { name: "Codeberg", icon: "simple-icons:codeberg", url: "https://codeberg.org" },
    { name: "Discord", icon: "fa7-brands:discord", url: "https://discord.gg/example" },
    { name: "Twitter", icon: "ri:twitter-x-line", url: "https://twitter.com" },
    { name: "Email", icon: "mdi:email", url: "mailto:example@example.com" },
  ],
};
```

### 禁用打字机效果

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.webp",
  name: "Mizuki",
  bio: "简洁、优雅、功能丰富",
  typewriter: {
    enable: false,
    speed: 80,
  },
  links: [],
};
```

## 侧边栏布局配置

个人资料组件需要在 `sidebarLayoutConfig` 中配置才能显示：

```typescript
// 在 sidebarLayoutConfig.properties 中添加
{
  type: "profile",
  position: "top",
  class: "onload-animation",
  animationDelay: 0,
},
```

## 注意事项

1. 头像图片建议使用 WebP 格式以获得更好的加载性能。
2. `links` 数组中的图标需要确保 Iconify 支持，可在 [Iconify 搜索](https://icon-sets.iconify.design/) 查找可用图标。
3. `typewriter.speed` 过快可能导致文字难以阅读，建议设置在 50-150 之间。
4. 社交链接数量不宜过多，建议控制在 5-7 个以保持界面整洁。
5. `avatar` 路径以 `/` 开头时相对于 `public` 目录，否则相对于 `src` 目录。
