---
title: 自定义字体
description: Mizuki 主题自定义字体配置详解，包括英文字体、中日韩字体和字体子集优化
---

字体配置位于 `src/config/siteConfig.ts` 文件中的 `font` 对象，支持分别配置英文字体和中日韩（CJK）字体。

## 配置结构

```typescript
// src/config/siteConfig.ts
font: {
  asciiFont: {
    fontFamily: "ZenMaruGothic-Medium",  // 英文字体名称
    fontWeight: "400",                    // 字体粗细
    localFonts: ["ZenMaruGothic-Medium.ttf"], // 本地字体文件
    enableCompress: true,                 // 启用字体子集优化
  },
  cjkFont: {
    fontFamily: "萝莉体 第二版",          // 中日韩字体名称
    fontWeight: "500",                    // 字体粗细
    localFonts: ["loli.ttf"],             // 本地字体文件
    enableCompress: true,                 // 启用字体子集优化
  },
},
```

## 字体类型

### ASCII 字体（asciiFont）

英文字体优先级最高，指定为英文字体后无论字体包含多大范围，都只会保留 ASCII 字符子集。

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `fontFamily` | `string` | 字体名称，需与字体文件中的名称一致 |
| `fontWeight` | `string` | 字体粗细，如 `"400"`、`"500"`、`"700"` |
| `localFonts` | `string[]` | 本地字体文件名数组 |
| `enableCompress` | `boolean` | 是否启用字体子集优化 |

### CJK 字体（cjkFont）

中日韩字体作为回退字体，用于显示中文、日文、韩文等字符。

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `fontFamily` | `string` | 字体名称 |
| `fontWeight` | `string` | 字体粗细 |
| `localFonts` | `string[]` | 本地字体文件名数组 |
| `enableCompress` | `boolean` | 是否启用字体子集优化 |

## 字体文件放置

本地字体文件需要放置在项目的字体资源目录中，并在 `src/styles/main.css` 中引入：

```css
/* src/styles/main.css */
@font-face {
  font-family: "ZenMaruGothic-Medium";
  src: url("/assets/font/ZenMaruGothic-Medium.ttf") format("truetype");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "萝莉体 第二版";
  src: url("/assets/font/loli.ttf") format("truetype");
  font-weight: 500;
  font-display: swap;
}
```

## 字体子集优化

启用 `enableCompress: true` 后，主题会在构建时自动对字体进行子集优化：

### 工作原理

1. 扫描所有页面内容，收集实际使用的字符
2. 从原始字体文件中仅提取需要的字符子集
3. 生成优化后的字体文件，显著减小文件大小

### 优化效果

| 字体类型 | 优化前 | 优化后 | 减少 |
|----------|--------|--------|------|
| ASCII 字体 | ~200KB | ~30KB | ~85% |
| CJK 字体 | ~5MB | ~500KB | ~90% |

> **注意：** 字体子集优化功能目前仅支持 TTF 格式字体。开启后需要在生产环境（`pnpm build`）才能看到效果，开发环境（`pnpm dev`）下显示的是浏览器默认字体。

## 配置示例

### 使用单一字体

如果只需要一种字体同时覆盖英文和中文：

```typescript
font: {
  asciiFont: {
    fontFamily: "Noto Sans SC",
    fontWeight: "400",
    localFonts: ["NotoSansSC-Regular.ttf"],
    enableCompress: true,
  },
  cjkFont: {
    fontFamily: "Noto Sans SC",
    fontWeight: "400",
    localFonts: ["NotoSansSC-Regular.ttf"],
    enableCompress: true,
  },
},
```

### 使用不同字体分别配置

```typescript
font: {
  asciiFont: {
    fontFamily: "Inter",
    fontWeight: "400",
    localFonts: ["Inter-Regular.ttf"],
    enableCompress: true,
  },
  cjkFont: {
    fontFamily: "LXGW WenKai",
    fontWeight: "400",
    localFonts: ["LXGWWenKai-Regular.ttf"],
    enableCompress: true,
  },
},
```

## 注意事项

1. 自定义字体需要在 `src/styles/main.css` 中通过 `@font-face` 引入字体文件。
2. 字体子集优化仅支持 TTF 格式，OTF、WOFF2 等格式不受支持。
3. 字体子集优化仅在生产构建（`pnpm build`）时生效，开发模式下显示浏览器默认字体。
4. CJK 字体文件通常较大，强烈建议启用 `enableCompress` 以优化加载性能。
5. `fontWeight` 需要与字体文件实际支持的粗细匹配，否则可能导致字体无法正确加载。
6. 使用 `font-display: swap` 可以在字体加载完成前先显示系统字体，避免页面白屏。
