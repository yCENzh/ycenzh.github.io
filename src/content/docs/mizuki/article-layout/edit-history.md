---
title: 编辑历史
description: 配置文章编辑历史显示
---

编辑历史功能可以显示文章的创建时间和最后修改时间，帮助读者了解文章的时效性。

## 配置位置

编辑历史配置位于 `src/config/siteConfig.ts` 文件中。

## 配置项详解

```typescript
// src/config/siteConfig.ts
export const siteConfig: SiteConfig = {
  // ...其他配置
  showLastModified: true, // 控制"上次编辑"卡片显示的开关
};
```

### showLastModified

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 控制文章页面是否显示"上次编辑"信息卡片。设为 `false` 将隐藏编辑历史。

## 使用说明

启用编辑历史后，文章页面会显示：
- 文章创建时间
- 最后修改时间

这有助于读者了解文章的时效性和更新频率。
