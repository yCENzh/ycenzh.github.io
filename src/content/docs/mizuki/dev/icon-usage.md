---
title: 图标使用规范
description: Mizuki 主题基于 Iconify 的图标使用规范
---

## 概述

Mizuki 基于 [Iconify](https://iconify.design/) 生态系统，根据文件类型和运行场景，存在 **3 种标准化的图标使用方式**：

| 使用方式 | 属性名 | 导入来源 | 适用文件类型 |
|---------|--------|---------|-------------|
| `<Icon name="...">` | `name` | `astro-icon/components` | `.astro` 静态组件 |
| `<Icon icon="...">` | `icon` | `@iconify/svelte` | `.svelte` 客户端组件 |
| `<Icon icon="...">` | `icon` | 自定义 `Icon.astro` | `.astro`（需 loading 状态） |

:::danger[禁止]
禁止在业务代码中直接使用原生 `<iconify-icon>` 标签。
:::

## 方式一：astro-icon（`.astro` 文件首选）

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="material-symbols:arrow-back" class="text-base" />
<Icon name={dynamicIconName} class="text-xl" />
```

- **属性**: `name`
- **底层库**: `astro-icon` v^1.1.5
- **特点**: Astro 社区集成，构建时优化图标引用
- **适用场景**: 所有 `.astro` 页面和组件中的常规图标

## 方式二：@iconify/svelte（`.svelte` 文件唯一选择）

```svelte
<script lang="ts">
  import Icon from "@iconify/svelte";
</script>

<Icon icon="material-symbols:pause" class="text-xl" />
<Icon icon={dynamicIcon} class="text-lg" />
```

- **属性**: `icon`
- **底层库**: `@iconify/svelte` v^5.2.1
- **特点**: Iconify 官方 Svelte 组件，客户端动态渲染
- **适用场景**: 所有 `.svelte` 组件

## 方式三：自定义 Icon 组件（增强封装）

```astro
---
import Icon from "../../misc/Icon.astro";
---

<Icon icon="mdi:react" size="lg" color="#61DAFB" fallback="⚛" />
```

- **属性**: `icon`, `size`, `color`, `fallback`, `loading`
- **实现位置**: `src/components/atoms/Icon/Icon.astro`
- **包装器**: `src/components/misc/Icon.astro`
- **特点**: 内置 loading 状态、fallback 占位、尺寸系统
- **适用场景**: 需要 loading 状态管理或 fallback 的场景

## `name` vs `icon` 差异

这是两个不同库的 API 设计差异：

| 维度 | `astro-icon` (`name`) | `@iconify/svelte` (`icon`) |
|------|---------------------|---------------------------|
| **API 标准** | Astro 社区第三方集成 | Iconify 官方标准 API |
| **运行阶段** | 构建时处理 (SSR) | 浏览器端渲染 (CSR) |
| **性能特征** | 可内联 SVG，减少请求 | 从 CDN 按需加载 |
| **跨框架支持** | 仅限 Astro | 支持多框架 |

## 尺寸对照表

| 原生写法 | Tailwind 等效 | 用途 |
|---------|-------------|------|
| `width="10"` | `w-2.5 h-2.5 text-[0.625rem]` | 最小图标（节点等） |
| `width="14"` | `w-3.5 h-3.5 text-xs` | 元信息图标（日期、位置） |
| `width="16"` | `w-4 h-4 text-base` | 行内小图标（标签、按钮内） |
| `width="20"` | `text-lg` | 卡片头部图标 |
| `width="48"` | `text-5xl` | 占位大图标 |

:::tip[推荐]
优先使用 Tailwind 的 `text-*` 或 `w-* h-*` 类来控制图标大小，而非原生 `width`/`height` 属性。
:::
