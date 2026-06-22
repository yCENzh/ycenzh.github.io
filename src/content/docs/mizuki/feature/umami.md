---
title: Umami 统计配置
description: 配置 Umami 网站统计分析
---

Umami 是一个开源的网站分析工具，注重隐私保护，不使用 Cookie。

## 配置位置

Umami 配置位于项目根目录的 `astro.config.mjs` 文件中，通过 `oddmisc` 插件集成。

## 配置项详解

```javascript
// astro.config.mjs
import { oddmisc } from "oddmisc";

export default defineConfig({
  integrations: [
    oddmisc({
      umami: {
        shareUrl: false, // 是否显示分享链接
      },
    }),
  ],
});
```

### umami.shareUrl

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否在统计页面显示分享链接

## 环境变量配置

`oddmisc` 插件会自动注入 Umami 跟踪脚本到页面中。你需要在 `.env` 文件中配置以下环境变量，这些变量会在构建时被 `oddmisc` 读取：

```txt
# .env
ODDMISC_UMAMI_WEBSITE_ID=your-website-id
ODDMISC_UMAMI_HOST_URL=https://your-umami-instance.com
```

> 具体的环境变量名称请参考 [oddmisc 官方文档](https://github.com/yCENzh/oddmisc)，不同版本可能有所不同。

### ODDMISC_UMAMI_WEBSITE_ID

- **说明**: Umami 网站 ID，在 Umami 控制台中获取

### ODDMISC_UMAMI_HOST_URL

- **说明**: Umami 实例的 URL 地址

> **Umami Cloud 用户注意**：如果你使用 Umami Cloud，请使用重定向后的链接地址，而非 Umami Cloud 的原始地址。

## 部署 Umami

### 方式一：使用官方托管

1. 访问 [Umami Cloud](https://cloud.umami.is/)
2. 注册账号并创建网站
3. 获取 Website ID

### 方式二：自托管

1. 克隆 [Umami 仓库](https://github.com/umami-software/umami)
2. 按照官方文档部署到你的服务器
3. 配置环境变量

## Mizuki 中的 Umami 集成

配置完成后，Mizuki 会在以下位置自动展示统计数据：

- **侧边栏个人资料卡片**：显示全站的总浏览量和总访问数
- **文章页面元信息**：显示每篇文章的浏览量和访问数

统计数据通过 `window.oddmisc` 全局对象获取，当 `oddmisc` 未加载或数据为零时，统计区域会自动隐藏。

## 查看统计数据

部署后，可以在 Umami 控制台查看：
- 页面浏览量
- 独立访客数
- 访问来源
- 浏览器和设备信息
- 地理位置分布
