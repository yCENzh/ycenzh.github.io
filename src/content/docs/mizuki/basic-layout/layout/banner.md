---
title: 横幅配置
description: Mizuki 主题 Banner 横幅配置详解，包括图片设置、轮播、水波纹效果、主页文本等
---

横幅（Banner）配置位于 `src/config/siteConfig.ts` 文件中的 `banner` 对象，控制页面顶部横幅区域的显示效果。

## 核心图片配置

支持单张图片或图片数组。当数组长度 > 1 时自动启用轮播功能。

```typescript
banner: {
  src: {
    desktop: [
      "/assets/desktop-banner/1.webp",
      "/assets/desktop-banner/2.webp",
      "/assets/desktop-banner/3.webp",
    ], // 桌面端横幅图片
    mobile: [
      "/assets/mobile-banner/1.webp",
      "/assets/mobile-banner/2.webp",
      "/assets/mobile-banner/3.webp",
    ], // 移动端横幅图片
  },
  position: "center", // 图片定位
},
```

### 图片定位 (position)

等同于 CSS `object-position` 属性，控制图片在横幅区域中的对齐方式。

| 值 | 说明 |
|----|------|
| `"top"` | 图片顶部对齐 |
| `"center"` | 图片居中对齐（默认） |
| `"bottom"` | 图片底部对齐 |

## 轮播设置

当 `src` 数组包含多张图片时，自动启用轮播功能。

```typescript
carousel: {
  enable: true,    // 启用轮播
  interval: 3,     // 切换间隔，单位为秒
  switchable: true, // 允许用户手动切换图片
},
```

## 水波纹效果

在横幅底部显示动态水波纹动画效果。

```typescript
waves: {
  enable: true,         // 启用水波纹效果
  performanceMode: false, // 性能模式，降低效果质量以提升性能
  mobileDisable: false,   // 在移动端禁用水波纹效果
  switchable: true,       // 允许用户切换水波纹开关
},
```

> **性能提示：** 如果在低端设备上出现卡顿，可以启用 `performanceMode` 或设置 `mobileDisable: true`。

## 智能图片 API

支持 [PicFlow API](https://github.com/matsuzaka-yuki/PicFlow-API) 获取随机图片。

```typescript
imageApi: {
  enable: false, // 启用图片 API
  url: "http://domain.com/api_v2.php?format=text&count=4", // API 地址
},
```

API 需要返回 `format=text` 格式，即每行一个图片链接的纯文本。需要自行搭建 API 服务。

## 主页文本

在横幅区域显示标题和副标题文本。

```typescript
homeText: {
  enable: true,
  title: "わたしの部屋",      // 主标题
  switchable: true,           // 允许用户切换显示/隐藏
  subtitle: [                 // 副标题数组（随机显示或打字机效果）
    "特別なことはないけど、君がいると十分です",
    "今でもあなたは私の光",
    "君ってさ、知らないうちに私の毎日になってたよ",
  ],
  typewriter: {
    enable: true,       // 启用打字机效果
    speed: 100,         // 打字速度（毫秒/字符）
    deleteSpeed: 50,    // 删除速度（毫秒/字符）
    pauseTime: 2000,    // 完全显示后的暂停时间（毫秒）
  },
},
```

## 版权信息

在横幅区域显示图片来源或版权信息。

```typescript
credit: {
  enable: false,    // 显示版权信息
  text: "Describe", // 来源文本
  url: "",          // （可选）原始作品或艺术家页面链接
},
```

## 导航栏融合

控制导航栏与横幅的融合效果。

```typescript
navbar: {
  transparentMode: "semifull", // 导航栏透明模式
},
```

### transparentMode 可选值

| 值 | 说明 |
|----|------|
| `"semi"` | 半透明加圆角效果 |
| `"full"` | 完全透明 |
| `"semifull"` | 动态透明（默认），滚动时自动切换透明状态 |

## 完整配置示例

```typescript
banner: {
  src: {
    desktop: ["/assets/desktop-banner/1.webp"],
    mobile: ["/assets/mobile-banner/1.webp"],
  },
  position: "center",
  carousel: {
    enable: true,
    interval: 5,
    switchable: true,
  },
  waves: {
    enable: true,
    performanceMode: false,
    mobileDisable: false,
    switchable: true,
  },
  imageApi: {
    enable: false,
    url: "",
  },
  homeText: {
    enable: true,
    title: "My Blog",
    switchable: true,
    subtitle: ["Welcome to my blog"],
    typewriter: {
      enable: true,
      speed: 100,
      deleteSpeed: 50,
      pauseTime: 2000,
    },
  },
  credit: {
    enable: false,
    text: "",
    url: "",
  },
  navbar: {
    transparentMode: "semifull",
  },
},
```

## 注意事项

1. 建议桌面端和移动端分别准备不同尺寸的图片，以获得最佳显示效果。
2. 图片推荐使用 WebP 格式以获得更好的压缩率。
3. 启用 `imageApi` 后，本地图片配置 `src` 将被忽略。
4. 打字机效果仅在 `typewriter.enable` 为 `true` 且 `subtitle` 数组长度 >= 1 时生效。
5. `interval` 设置过短会导致图片切换过于频繁，建议设置为 3 秒以上。
