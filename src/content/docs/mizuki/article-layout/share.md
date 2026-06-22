---
title: 分享组件配置
description: 配置文章分享功能
---

分享组件允许读者将文章分享到各种社交媒体平台。

## 配置位置

分享组件配置位于 `src/config/shareConfig.ts` 文件中。

## 配置项详解

```typescript
// src/config/shareConfig.ts
import type { ShareConfig } from "../types/config";

export const shareConfig: ShareConfig = {
  enable: true, // 启用分享功能
};
```

### enable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否启用分享功能。设为 `false` 将禁用文章页面的分享按钮。

## 使用说明

启用分享功能后，文章页面会显示分享按钮，读者可以将文章分享到各大社交媒体平台。
