---
title: 代码块配置
description: 配置代码块显示样式和功能
---

代码块功能用于在文章中展示代码片段，支持语法高亮、行号显示、代码复制等功能。

## 配置位置

代码块配置位于 `src/config/expressiveCodeConfig.ts` 文件中。

## 配置项详解

```typescript
// src/config/expressiveCodeConfig.ts
import type { ExpressiveCodeConfig } from "../types/config";

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
  // 请选择深色主题，因为此博客主题目前仅支持深色背景
  theme: "github-dark",
  // 是否在主题切换时隐藏代码块以避免卡顿问题
  hideDuringThemeTransition: true,
};
```

### theme

- **类型**: `string`
- **默认值**: `"github-dark"`
- **说明**: 代码块的语法高亮主题

常用主题：

| 主题 | 说明 |
|------|------|
| `github-dark` | GitHub 暗色主题（默认） |
| `github-light` | GitHub 亮色主题 |
| `dracula` | Dracula 主题 |
| `one-dark-pro` | One Dark Pro 主题 |
| `material-theme` | Material 主题 |
| `night-owl` | Night Owl 主题 |
| `synthwave-84` | Synthwave '84 主题 |
| `catppuccin-mocha` | Catppuccin Mocha 主题 |

### hideDuringThemeTransition

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 在主题切换时是否隐藏代码块，避免闪烁。设为 `false` 时代码块会立即显示，可能会导致切换过程中出现卡顿。

## 使用说明

代码块支持以下功能：
- **语法高亮**: 根据编程语言自动高亮代码
- **行号显示**: 显示代码行号
- **代码复制**: 一键复制代码块内容
- **标题显示**: 可以为代码块添加标题

### 基本用法

````markdown
```javascript
console.log("Hello, Mizuki!");
```
````

### 带标题的代码块

````markdown
```javascript title="example.js"
console.log("Hello, Mizuki!");
```
````

### 显示行号

````markdown
```javascript showLineNumbers
const a = 1;
const b = 2;
const c = a + b;
```
````
