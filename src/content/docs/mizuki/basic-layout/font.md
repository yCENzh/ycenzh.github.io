---
title: 自定义字体
description: Mizuki 主题自定义字体配置详解，基于 Astro Font API 支持本地字体和远程字体
---

Mizuki 使用 [Astro Font API](https://docs.astro.build/en/guides/fonts/) 管理字体。所有字体配置集中在 `astro.config.mjs` 的 `fonts` 数组中，Astro 会自动处理 `@font-face` 生成、字体文件缓存和优化加载。

## 配置位置

```js
// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    // 在这里添加字体配置
  ],
});
```

## 添加字体

### 使用本地字体文件

1. 将字体文件放入 `src/assets/fonts/` 目录
2. 在 `astro.config.mjs` 中添加配置：

```js
fonts: [
  {
    name: "MyFont",
    cssVariable: "--font-body",
    provider: fontProviders.local(),
    options: {
      variants: [
        {
          src: ["./src/assets/fonts/MyFont.ttf"],
          weight: "400",
          style: "normal",
        },
      ],
    },
    fallbacks: ["sans-serif"],
  },
],
```

### 使用 Fontsource 字体

[Fontsource](https://fontsource.org/) 提供开源字体的 npm 包，Astro 会自动下载并托管：

```js
fonts: [
  {
    name: "Roboto",
    cssVariable: "--font-roboto",
    provider: fontProviders.fontsource(),
    weights: [400, 500, 700],
  },
],
```

### 使用其他提供商

Astro 内置支持多种字体提供商：

| 提供商 | 用法 | 说明 |
|--------|------|------|
| `fontProviders.fontsource()` | Fontsource npm 包 | 开源字体，自动下载托管 |
| `fontProviders.google()` | Google Fonts | 自动下载托管，不泄露用户 IP |
| `fontProviders.local()` | 本地字体文件 | 放在 `src/assets/fonts/` 下 |
| `fontProviders.bunny()` | Bunny Fonts | 隐私友好的 Google Fonts 替代 |
| `fontProviders.fontshare()` | Fontshare | 免费商业字体 |

## 默认字体配置

Mizuki 默认配置了 3 个字体：

```js
fonts: [
  {
    name: "JetBrains Mono",
    cssVariable: "--font-jetbrains-mono",
    provider: fontProviders.fontsource(),
    styles: ["normal", "italic"],
  },
  {
    name: "ZenMaruGothic-Medium",
    cssVariable: "--font-body",
    provider: fontProviders.local(),
    options: {
      variants: [
        {
          src: ["./src/assets/fonts/ZenMaruGothic-Medium.ttf"],
          weight: "500",
          style: "normal",
        },
      ],
    },
    fallbacks: ["sans-serif"],
  },
  {
    name: "Loli",
    cssVariable: "--font-cjk",
    provider: fontProviders.local(),
    options: {
      variants: [
        {
          src: ["./src/assets/fonts/loli.ttf"],
          weight: "400",
          style: "normal",
        },
      ],
    },
    fallbacks: ["sans-serif"],
  },
],
```

| CSS 变量 | 用途 | 默认字体 |
|----------|------|----------|
| `--font-body` | 正文主字体 | ZenMaruGothic-Medium（本地） |
| `--font-cjk` | CJK 回退字体 | 萝莉体 第二版（本地） |
| `--font-jetbrains-mono` | 代码块等宽字体 | JetBrains Mono（Fontsource） |

## CSS 变量与 Tailwind

Astro Font API 会自动将每个字体注入为 CSS 变量。在 `src/styles/main.css` 中，`--font-sans` 引用这些变量作为 Tailwind 的默认字体：

```css
@theme {
  --font-sans: var(--font-body), var(--font-cjk), ui-sans-serif, system-ui, sans-serif, ...;
}
```

正文元素自动使用 `--font-sans`，代码块使用 `--font-jetbrains-mono`。无需手动设置 `@font-face` 或 `font-family`。

## 换字体操作步骤

### 替换为其他本地字体

1. 将新字体文件放入 `src/assets/fonts/`
2. 修改 `astro.config.mjs` 中对应字体的 `name`、`src`、`weight` 等配置
3. 重新构建即可，无需修改 CSS 或其他文件

### 替换为 Fontsource 字体

1. 在 [Fontsource](https://fontsource.org/) 找到目标字体
2. 将 `provider` 改为 `fontProviders.fontsource()`，移除 `options` 字段
3. 按需设置 `weights`、`styles`、`subsets` 等参数

### 添加新字体

在 `fonts` 数组中追加新条目，指定 `cssVariable` 名称，然后在 CSS 中通过 `var(--your-variable)` 使用。

## Fallback 字体

每个字体的 `fallbacks` 数组定义了回退字体。Astro 会自动生成优化的回退字体度量（font metrics），减少布局偏移：

```js
{
  name: "MyFont",
  cssVariable: "--font-body",
  provider: fontProviders.local(),
  options: { variants: [...] },
  fallbacks: ["sans-serif"],  // 回退到系统无衬线字体
},
```

## 注意事项

1. 字体文件放在 `src/assets/fonts/` 而非 `public/`。Astro 会在构建时自动复制到 `dist/_astro/fonts/` 并添加内容哈希，避免重复文件。
2. 修改字体配置后需要**重启开发服务器**才能生效。
3. Astro 会自动对字体进行子集优化（按页面实际使用的字符裁剪），无需手动配置压缩脚本。
4. 本地字体文件建议使用 TTF 或 WOFF2 格式。
5. 更多用法请参考 [Astro 官方字体文档](https://docs.astro.build/en/guides/fonts/)。
