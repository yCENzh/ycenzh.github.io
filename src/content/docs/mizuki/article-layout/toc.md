---
title: 目录导航配置
description: 配置文章目录导航功能
---

目录导航（Table of Contents）功能可以帮助读者快速了解文章结构并跳转到指定章节。

## 配置位置

目录导航配置位于 `src/config/siteConfig.ts` 文件中的 `toc` 对象。

## 配置项详解

```typescript
// src/config/siteConfig.ts
export const siteConfig: SiteConfig = {
  // ...其他配置
  toc: {
    enable: true, // 总开关，启用目录功能
    mobileTop: true, // 手机端顶部 TOC 按钮
    desktopSidebar: true, // 电脑端右侧边栏 TOC
    floating: true, // 悬浮 TOC 按钮
    depth: 2, // 目录深度，1-6
    useJapaneseBadge: true, // 使用日语假名标记
  },
};
```

### enable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否启用目录导航功能

### mobileTop

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在手机端顶部显示 TOC 按钮

### desktopSidebar

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在电脑端右侧边栏显示 TOC

### floating

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否显示悬浮 TOC 按钮

### depth

- **类型**: `number`
- **默认值**: `2`
- **取值范围**: `1-6`
- **说明**: 目录深度。`1` 表示只显示 h1 标题，`2` 表示显示 h1 和 h2，依此类推

### useJapaneseBadge

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否使用日语假名标记（あ、い、う...）代替数字（1、2、3...）

## 使用说明

目录导航会自动从文章内容中提取标题（h1-h6），并根据 `depth` 配置显示相应深度的目录。

- 在电脑端，目录通常显示在右侧边栏
- 在移动端，可以通过顶部按钮或悬浮按钮访问目录
- 开启后在首页也会生效，会变成文章列表导航
