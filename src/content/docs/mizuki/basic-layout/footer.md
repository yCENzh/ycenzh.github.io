---
title: 页脚配置
description: Mizuki 主题 Footer 页脚配置详解，包括自定义 HTML 内容和备案号等设置
---

页脚配置位于 `src/config/footerConfig.ts` 文件中，用于自定义页面底部的页脚内容。

## 配置文件

```typescript
// src/config/footerConfig.ts
import type { FooterConfig } from "../types/config";

export const footerConfig: FooterConfig = {
  enable: false,    // 是否启用 Footer HTML 注入功能
  customHtml: "",   // HTML 格式的自定义页脚信息
};
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enable` | `boolean` | `false` | 是否启用页脚 HTML 注入 |
| `customHtml` | `string` | `""` | 自定义 HTML 内容 |

## 使用方式

### 方式一：通过 customHtml 配置

直接在配置文件中写入 HTML 内容：

```typescript
export const footerConfig: FooterConfig = {
  enable: true,
  customHtml: `
    <div style="text-align: center; padding: 1rem;">
      <p>© 2025 My Blog. All rights reserved.</p>
      <p>
        <a href="https://beian.miit.gov.cn/" target="_blank">
          京ICP备XXXXXXXX号
        </a>
      </p>
    </div>
  `,
};
```

### 方式二：通过 FooterConfig.html 文件

也可以直接编辑 `src/FooterConfig.html` 文件来添加自定义内容：

```html
<!-- src/FooterConfig.html -->
<div style="text-align: center; padding: 1rem;">
  <p>© 2025 My Blog. All rights reserved.</p>
  <p>
    <a href="https://beian.miit.gov.cn/" target="_blank">
      京ICP备XXXXXXXX号
    </a>
  </p>
</div>
```

> **优先级说明：** 若 `customHtml` 不为空，则使用 `customHtml` 中的内容；若 `customHtml` 留空，则使用 `FooterConfig.html` 文件中的内容。

## 常见用例

### 备案号

```html
<div style="text-align: center; font-size: 0.85rem; opacity: 0.7;">
  <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
    京ICP备XXXXXXXX号
  </a>
</div>
```

### 版权信息 + 社交链接

```html
<div style="text-align: center; padding: 1rem;">
  <p>© 2025 My Blog. Built with <a href="https://astro.build">Astro</a> & Mizuki.</p>
  <p>
    <a href="https://github.com/yourname" target="_blank">GitHub</a> ·
    <a href="https://twitter.com/yourname" target="_blank">Twitter</a>
  </p>
</div>
```

### 多行备案信息

```html
<div style="text-align: center; font-size: 0.8rem; opacity: 0.6; line-height: 1.8;">
  <p>© 2025 My Blog. All rights reserved.</p>
  <p>
    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
      京ICP备XXXXXXXX号
    </a>
    &nbsp;|&nbsp;
    <a href="https://www.beian.gov.cn/" target="_blank" rel="noopener noreferrer">
      京公网安备 XXXXXXXXXXXXXXX号
    </a>
  </p>
</div>
```

## 注意事项

1. `enable` 设为 `false` 时，不会渲染任何自定义页脚内容。
2. `customHtml` 中的内容会直接作为 HTML 插入，请确保内容安全，避免 XSS 风险。
3. `FooterConfig.html` 文件可能在未来版本中被弃用，建议优先使用 `customHtml` 配置。
4. 自定义 HTML 中的样式建议使用内联样式，避免与主题样式冲突。
