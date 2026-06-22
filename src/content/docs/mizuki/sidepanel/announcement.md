---
title: 公告组件
description: Mizuki 主题侧边栏公告组件配置详解，支持自定义标题、内容和链接
---

公告组件配置位于 `src/config/announcementConfig.ts` 文件中。该组件用于在侧边栏显示重要公告或通知信息。

## 配置项详解

```typescript
// src/config/announcementConfig.ts
export const announcementConfig: AnnouncementConfig = {
  title: "",                                          // 公告标题，填空使用i18n字符串Key.announcement
  content: "ブログへようこそ！これはサンプルの告知です",  // 公告内容
  closable: true,                                     // 允许用户关闭公告
  link: {
    enable: true,                                     // 启用链接
    text: "Learn More",                               // 链接文本
    url: "/about/",                                   // 链接 URL
    external: false,                                  // 内部链接
  },
};
```

### title

- **类型**: `string`
- **默认值**: `""`（空字符串）
- **说明**: 公告标题。填空则使用 i18n 字符串 `Key.announcement` 作为默认标题。

### content

- **类型**: `string`
- **说明**: 公告内容，支持纯文本。

### closable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否允许用户关闭公告。设为 `false` 后公告始终显示。

### link

- **类型**: `object`
- **说明**: 公告链接配置。

#### link.enable

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否在公告下方显示链接。

#### link.text

- **类型**: `string`
- **说明**: 链接显示文本。

#### link.url

- **类型**: `string`
- **说明**: 链接地址，支持内部路径和外部 URL。

#### link.external

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否为外部链接。内部链接设为 `false`，外部链接设为 `true`。

## 配置示例

### 基础公告

```typescript
export const announcementConfig: AnnouncementConfig = {
  title: "公告",
  content: "欢迎来到我的博客！",
  closable: true,
  link: {
    enable: false,
  },
};
```

### 带链接的公告

```typescript
export const announcementConfig: AnnouncementConfig = {
  title: "最新动态",
  content: "博客已更新至 Mizuki 最新版本，新增多项功能！",
  closable: true,
  link: {
    enable: true,
    text: "查看详情",
    url: "/posts/update-log/",
    external: false,
  },
};
```

### 外部链接公告

```typescript
export const announcementConfig: AnnouncementConfig = {
  title: "友情链接",
  content: "欢迎访问我的 GitHub 主页获取更多项目",
  closable: false,
  link: {
    enable: true,
    text: "访问 GitHub",
    url: "https://github.com",
    external: true,
  },
};
```

### 使用 i18n 默认标题

```typescript
export const announcementConfig: AnnouncementConfig = {
  title: "",  // 留空使用 i18n 默认标题
  content: "这是公告内容",
  closable: true,
  link: {
    enable: false,
  },
};
```

## 侧边栏布局配置

公告组件需要在 `sidebarLayoutConfig` 中配置才能显示：

```typescript
// 在 sidebarLayoutConfig.properties 中添加
{
  type: "announcement",
  position: "top",
  class: "onload-animation",
  animationDelay: 50,
},
```

## 注意事项

1. `title` 留空时会使用 i18n 国际化字符串作为标题，适合多语言站点。
2. `closable` 设为 `true` 时，用户关闭公告后会在当前会话中保持关闭状态。
3. 内部链接使用相对路径（如 `/about/`），外部链接使用完整 URL。
4. 公告内容建议保持简洁，过长的内容可能影响侧边栏布局。
5. 公告组件通常放置在个人资料组件下方，通过 `animationDelay` 控制加载顺序。
