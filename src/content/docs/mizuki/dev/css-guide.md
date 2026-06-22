---
title: CSS 样式指南
description: Mizuki 主题 CSS 样式规范和最佳实践
---

## 核心原则

### 禁止使用 `!important`

项目中**应该尽量避免使用 `!important` 级别的 CSS**，原因如下：

1. **破坏样式优先级**：`!important` 会打破 CSS 的自然级联规则
2. **难以维护**：一旦使用 `!important`，后续修改将不得不使用更多的 `!important`
3. **与主题系统冲突**：`!important` 可能导致不可预期的样式冲突
4. **Tailwind CSS 不兼容**：Tailwind 的原子类设计基于正常的 CSS 优先级

### 例外：Twikoo 评论区样式

在 `src/styles/twikoo.css` 文件中**允许使用 `!important`**。

**理由**：
- Twikoo 是第三方评论系统，其样式通过 JavaScript 动态注入
- Twikoo 内部样式使用了较高的选择器优先级
- 影响范围仅限于评论区，不会影响其他组件

```css
/* ✅ 允许：在 twikoo.css 中覆盖 Twikoo 默认样式 */
.tk-loading {
  display: flex !important;
  justify-content: center !important;
}
```

## 正确做法

### 1. 提高选择器优先级

```css
/* ❌ 错误 */
.album-card {
  background-color: white !important;
}

/* ✅ 正确：通过更具体的选择器覆盖 */
.album-card.card-base {
  background-color: white;
}

.dark .album-card.card-base {
  background-color: black;
}
```

### 2. 使用 CSS 变量

```css
/* ❌ 错误 */
.button {
  background-color: #3b82f6 !important;
}

/* ✅ 正确 */
:root {
  --primary: #3b82f6;
}

.button {
  background-color: var(--primary);
}
```

### 3. 利用 Tailwind 的优先级

```astro
<!-- ❌ 错误 -->
<div class="!bg-white !text-black">

<!-- ✅ 正确：Tailwind 类按顺序应用 -->
<div class="bg-white dark:bg-black text-black dark:text-white">
```

### 4. 使用作用域样式

```astro
<!-- ✅ 正确：Astro 的作用域样式自动提供选择器隔离 -->
<style>
  .card {
    background: var(--card-bg);
    color: var(--text-color);
  }
</style>
```

## 暗色主题实现

使用 CSS 变量实现暗色主题：

```css
:root {
  --card-bg: white;
  --text-color: black;
}

[data-theme="dark"] {
  --card-bg: #1a1a1a;
  --text-color: white;
}
```
