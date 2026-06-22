---
title: 原子化组件使用规范
description: Mizuki 主题原子化组件使用规范和最佳实践
---

## 黄金法则

> **在编写新代码前，先检查是否存在可复用的原子化组件。如果没有，就创建一个。**

```
❌ 错误：在组件中直接编写重复的 UI 结构
✅ 正确：使用现有原子组件或创建新的原子组件
```

## 现有原子组件清单

### atoms/ - 原子组件

| 组件 | 路径 | 用途 |
|------|------|------|
| `Badge` | `atoms/Badge/` | 序号徽章、计数徽章 |
| `Button` | `atoms/Button/` | 按钮（支持多种变体） |
| `Chip` | `atoms/Chip/` | 标签、分类标签 |
| `Icon` | `atoms/Icon/` | 图标渲染 |
| `Image` | `atoms/Image/` | 图片（支持懒加载） |
| `Link` | `atoms/Link/` | 链接（带图标等） |
| `Loader` | `atoms/Loader/` | 加载动画 |
| `tag-chip` | `atoms/tag-chip/` | 文章标签 |
| `custom-scrollbar` | `atoms/custom-scrollbar/` | 自定义滚动条 |
| `filter-tabs` | `atoms/filter-tabs/` | 筛选标签页 |
| `typewriter-text` | `atoms/typewriter-text/` | 打字机效果 |

### misc/ - 通用组件

| 组件 | 路径 | 用途 |
|------|------|------|
| `ListContainer` | `misc/ListContainer.astro` | 卡片容器（标题+图标+徽章） |
| `ListDivider` | `misc/ListDivider.astro` | 列表分隔线 |
| `Icon` | `misc/Icon.astro` | 图标封装（带 loading 和 fallback） |
| `Markdown` | `misc/Markdown.astro` | Markdown 渲染 |
| `License` | `misc/License.astro` | 版权信息 |

### control/ - 控制组件

| 组件 | 路径 | 用途 |
|------|------|------|
| `BackToTop` | `control/BackToTop.astro` | 返回顶部按钮 |
| `Pagination` | `control/Pagination.astro` | 分页导航 |
| `ThemeSwitch` | `control/ThemeSwitch.svelte` | 主题切换 |
| `LayoutSwitch` | `control/LayoutSwitch.svelte` | 布局切换 |
| `FloatingTOC` | `control/FloatingTOC.astro` | 悬浮目录 |

## 使用决策流程

```
开始编写新 UI
       │
       ▼
┌──────────────────────┐
│ 存在可用的原子组件？  │
└──────────────────────┘
       │
   是  │  否
   ▼   ▼
使用   考虑创建新组件
现有   │
组件   ▼
   ┌──────────────────┐
   │ 多个场景可复用？ │
   └──────────────────┘
       │
   是  │  否
   ▼   ▼
创建   直接实现
原子   但标记待重构
组件
```

## 实践指南

### 场景 1：需要显示序号

```astro
<!-- ❌ 错误：直接写死样式 -->
<div class="w-6 h-6 rounded-md bg-enter-btn text-primary flex items-center justify-center">
    {index + 1}
</div>

<!-- ✅ 正确：使用 Badge 组件 -->
<Badge variant="number">{index + 1}</Badge>
```

### 场景 2：需要分类标签

```astro
<!-- ❌ 错误：直接写死样式 -->
<span class="px-1.5 py-0.5 rounded bg-btn-regular-bg text-btn-content">
    {category}
</span>

<!-- ✅ 正确：使用 Chip 组件 -->
<Chip>{category}</Chip>
```

### 场景 3：需要卡片容器（标题+图标+内容）

```astro
<!-- ❌ 错误：重复编写卡片头部 -->
<div class="card-base p-5">
    <div class="flex items-center gap-2 pb-3 border-b border-dashed">
        <Icon name="material-symbols:article" class="text-xl text-primary" />
        <span class="font-bold">标题</span>
    </div>
    <!-- 内容 -->
</div>

<!-- ✅ 正确：使用 ListContainer 组件 -->
<ListContainer title="标题" icon="material-symbols:article">
    <!-- 内容 -->
</ListContainer>
```

### 场景 4：需要列表分隔线

```astro
<!-- ❌ 错误：重复编写分隔线 -->
<div class="border-b border-dashed border-line-divider"></div>

<!-- ✅ 正确：使用 ListDivider 组件 -->
<ListDivider />
```

## 创建新原子组件的判断标准

| 标准 | 说明 |
|------|------|
| **重复出现 2+ 次** | 相同的 UI 结构在多个文件中出现 |
| **职责单一** | 组件只负责一件事 |
| **可独立存在** | 不依赖特定业务逻辑 |
| **可配置化** | 通过 Props 控制外观和行为 |
