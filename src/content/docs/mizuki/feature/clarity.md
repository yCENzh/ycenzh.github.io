---
title: Microsoft Clarity 配置
description: 配置 Microsoft Clarity 网站分析
---

Microsoft Clarity 是一个免费的用户行为分析工具，提供热力图、会话录制等功能。

## 配置位置

Microsoft Clarity 配置位于 `src/config/siteConfig.ts` 文件中的 `thirdPartyAnalytics` 对象。

## 配置项详解

```typescript
// src/config/siteConfig.ts
export const siteConfig: SiteConfig = {
  // ...其他配置
  thirdPartyAnalytics: {
    enable: false,           // 是否启用第三方统计
    clarityId: "",           // Clarity 项目 ID
  },
};
```

### thirdPartyAnalytics.enable

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否启用 Microsoft Clarity 统计功能。默认关闭，启用可能影响 Lighthouse 评分。

### thirdPartyAnalytics.clarityId

- **类型**: `string`
- **默认值**: `""`
- **说明**: Microsoft Clarity 项目 ID

## 配置步骤

### 步骤一：获取 Clarity 项目 ID

1. 访问 [Microsoft Clarity](https://clarity.microsoft.com/)
2. 使用 Microsoft 账号登录
3. 点击 "Add new project"
4. 输入项目名称和网站 URL
5. 复制项目 ID

### 步骤二：配置 Mizuki

在 `src/config/siteConfig.ts` 中启用 Clarity：

```typescript
export const siteConfig: SiteConfig = {
  // ...其他配置
  thirdPartyAnalytics: {
    enable: true,
    clarityId: "your-clarity-project-id", // 替换为你的项目 ID
  },
};
```

### 步骤三：验证部署

1. 部署网站后，访问几个页面
2. 在 Clarity 控制台查看是否有数据
3. 数据通常需要几分钟到几小时才会显示

## Clarity 功能

### 热力图

- **点击热力图**: 显示用户点击的位置
- **滚动热力图**: 显示用户滚动的深度
- **关注区域**: 用户最关注的页面区域

### 会话录制

- 录制用户的实际浏览过程
- 可以回放用户操作
- 帮助发现用户体验问题

### 洞察分析

- **快速浏览**: 关键指标概览
- **用户行为**: 页面停留时间、跳出率
- **技术信息**: 浏览器、设备、操作系统

## 注意事项

:::caution[性能影响]
启用 Clarity 可能会影响 Lighthouse 评分，因为它会加载额外的 JavaScript。如果性能是首要考虑，可以：
- 仅在生产环境启用
- 考虑使用 Umami 等轻量级方案
:::

:::tip[隐私合规]
Clarity 会收集用户行为数据，请确保：
- 在隐私政策中说明
- 遵守相关法律法规（如 GDPR）
:::
