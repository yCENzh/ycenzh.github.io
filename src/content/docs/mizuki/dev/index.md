---
title: 开发规范
description: Mizuki 主题开发规范文档索引
---

本目录包含 Mizuki 项目的开发规范文档，用于指导组件化开发和代码重构。

## 规范列表

### 1. [组件架构设计](/mizuki/dev/component-architecture/)

定义 Mizuki 的组件分层架构、命名规范和代码组织方式。

**关键点**：
- 组件分层架构（atoms / control / features / organisms / widgets）
- 文件命名和组织规范
- 组件职责分离原则

### 2. [组件拆分指南](/mizuki/dev/component-split/)

如何识别需要拆分的组件，以及拆分的具体方法和最佳实践。

**关键点**：
- 组件拆分的判断标准
- 超大型组件拆分实例
- 拆分步骤和验证方法

### 3. [原子化组件使用规范](/mizuki/dev/atom-usage/)

规定必须优先使用现有原子化组件，以及在缺少合适组件时创建新组件。

**关键点**：
- 优先使用现有 atoms/ 和 misc/ 组件
- 重复 UI 代码超过 2 次应考虑抽取为组件
- 创建新组件的判断标准

### 4. [CSS 样式指南](/mizuki/dev/css-guide/)

CSS 样式规范，禁止使用 `!important`（Twikoo 除外）。

**关键点**：
- 禁止使用 `!important`（Twikoo 组件除外）
- 使用 CSS 变量和 Tailwind 工具类
- 提高选择器优先级替代 `!important`

### 5. [侧栏组件开发指南](/mizuki/dev/sidebar-dev/)

规范侧栏组件的接入流程，避免"配置了组件但页面不显示"的遗漏。

**关键点**：
- 侧栏组件接入的完整步骤
- WidgetComponentType 类型声明
- sidebarLayoutConfig 配置
- WIDGET_COMPONENT_MAP 注册

### 6. [图标使用规范](/mizuki/dev/icon-usage/)

基于 Iconify 生态系统的图标使用规范。

**关键点**：
- astro-icon（`.astro` 文件首选）
- @iconify/svelte（`.svelte` 文件唯一选择）
- 自定义 Icon 组件（增强封装）

## 代码审查检查清单

在提交代码前，请确保：

- [ ] 组件遵循分层架构规范
- [ ] 组件文件名符合命名规范（PascalCase）
- [ ] 组件行数控制在合理范围内（< 500行）
- [ ] **优先使用现有原子化组件（atoms/、misc/）**
- [ ] **重复 UI 代码超过 2 次应抽取为新组件**
- [ ] 使用 TypeScript 定义 Props 接口
- [ ] 没有使用 `!important`（Twikoo 组件除外）
- [ ] 使用 Tailwind 工具类或 CSS 变量
- [ ] **侧栏组件已在 WIDGET_COMPONENT_MAP 中注册**
- [ ] **侧栏组件的类型已在 WidgetComponentType 中声明**
