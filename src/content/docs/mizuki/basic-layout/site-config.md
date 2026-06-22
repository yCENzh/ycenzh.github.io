---
title: 基础配置
description: Mizuki 主题站点基础配置详解，包括站点信息、特色页面开关、顶栏标题和首页布局等配置项
---

站点配置位于 `src/config/siteConfig.ts` 文件中，是 Mizuki 主题最核心的配置文件。

## 基本信息

```typescript
// src/config/siteConfig.ts
export const siteConfig: SiteConfig = {
  title: "Mizuki",              // 站点标题
  subtitle: "One demo website", // 站点副标题
  siteURL: "https://example.com/", // 站点 URL，必须以斜杠结尾
  siteStartDate: "2025-01-01",  // 站点开始运行日期，用于站点统计组件计算运行天数
  lang: "en",                   // 站点语言代码，例如：'en', 'zh_CN', 'ja'
  themeColor: {
    hue: 240,    // 主题色色相，范围 0-360。红色：0，青色：200，蓝绿色：250，粉色：345
    fixed: false, // 设为 true 则对访问者隐藏主题色选择器
  },
};
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `title` | `string` | `"Mizuki"` | 站点标题，显示在浏览器标签页和 SEO 元数据中 |
| `subtitle` | `string` | — | 站点副标题 |
| `siteURL` | `string` | — | 站点完整 URL，必须以 `/` 结尾 |
| `siteStartDate` | `string` | — | 站点上线日期，格式 `YYYY-MM-DD` |
| `lang` | `string` | `"en"` | 站点语言代码 |
| `themeColor.hue` | `number` | `240` | 主题色色相值（0-360） |
| `themeColor.fixed` | `boolean` | `false` | 是否固定主题色，隐藏选择器 |

## 特色页面开关配置

关闭未使用的页面有助于提升 SEO。关闭后请记得在 `navbarConfig` 中移除对应导航链接。

```typescript
featurePages: {
  anime: true,     // 番剧页面
  diary: true,     // 日记页面
  friends: true,   // 友链页面
  projects: true,  // 项目页面
  skills: true,    // 技能页面
  timeline: true,  // 时间线页面
  albums: true,    // 相册页面
  devices: true,   // 设备页面
},
```

## 顶栏标题配置

控制导航栏左侧标题区域的显示方式。

```typescript
navbarTitle: {
  mode: "text-icon",  // 显示模式
  text: "MizukiUI",   // 标题文本
  icon: "assets/home/home.webp",       // 标题图标路径
  logo: "assets/home/default-logo.webp", // Logo 图片路径
},
```

### mode 可选值

| 值 | 说明 |
|----|------|
| `"text-icon"` | 显示图标 + 文本 |
| `"logo"` | 仅显示 Logo 图片 |

## 首页布局配置

### 文章列表布局

```typescript
postListLayout: {
  defaultMode: "list",  // 默认布局："list" 列表模式（单列），"grid" 网格模式（双列）
  enable: true,         // 启用布局切换功能
  allowSwitch: true,    // 允许用户手动切换布局
  categoryBar: {
    enable: true,       // 在文章列表页显示分类导航条
  },
},
```

> **注意：** 如果侧边栏配置启用了 `"both"` 双侧边栏，则无法使用 `"grid"` 网格（双列）布局。

### 标签样式

```typescript
tagStyle: {
  useNewStyle: false, // false = 外框常亮样式，true = 悬停高亮样式
},
```

### 壁纸模式

```typescript
wallpaperMode: {
  defaultMode: "banner", // 默认壁纸模式
  showModeSwitchOnMobile: "both", // 布局切换按钮显示设置
},
```

#### defaultMode 可选值

| 值 | 说明 |
|----|------|
| `"banner"` | 顶部横幅模式 |
| `"fullscreen"` | 全屏壁纸模式 |
| `"none"` | 无壁纸模式 |

#### showModeSwitchOnMobile 可选值

| 值 | 说明 |
|----|------|
| `"off"` | 不显示切换按钮 |
| `"mobile"` | 仅在移动端显示 |
| `"desktop"` | 仅在桌面端显示 |
| `"both"` | 在所有设备上显示 |

## 注意事项

1. 修改 `siteConfig` 后需要重启开发服务器才能生效。
2. `siteURL` 必须以 `/` 结尾，否则可能导致资源路径错误。
3. 关闭特色页面后，务必同步移除 `navBarConfig` 中的对应链接，避免出现 404 页面。
4. `themeColor.hue` 的值范围为 0-360，对应 HSL 色轮上的色相角度。
