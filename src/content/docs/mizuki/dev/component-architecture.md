---
title: 组件架构设计
description: Mizuki 主题组件分层架构设计规范
---

## 概述

Mizuki 项目采用**原子设计（Atomic Design）**理念，将组件分为多个层次，每个层次有明确的职责和复用策略。

## 分层架构

```
atoms (原子) → control (控制) → features (功能) → organisms (有机体)
                                    ↓
                              widgets (小部件)
                                    ↓
                                misc (通用)
```

### Atoms - 原子组件

**目录**：`src/components/atoms/`

**定义**：构成 UI 的最基础、不可再分的元素。

**特点**：
- 职责单一，功能简单
- 无业务逻辑
- 高度可复用
- 不依赖其他组件

**现有组件**：

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

### Control - 控制组件

**目录**：`src/components/control/`

**定义**：页面控制和交互组件，提供导航、切换等操作功能。

**现有组件**：

| 组件 | 路径 | 用途 |
|------|------|------|
| `BackToTop` | `control/BackToTop.astro` | 返回顶部按钮 |
| `BackToHome` | `control/BackToHome.astro` | 返回首页按钮 |
| `Pagination` | `control/Pagination.astro` | 分页导航 |
| `ThemeSwitch` | `control/ThemeSwitch.svelte` | 主题切换 |
| `LayoutSwitch` | `control/LayoutSwitch.svelte` | 布局切换 |
| `FloatingTOC` | `control/FloatingTOC.astro` | 悬浮目录 |
| `FloatingControls` | `control/FloatingControls.astro` | 悬浮控制组 |
| `MusicFabButton` | `control/MusicFabButton.svelte` | 音乐 FAB 按钮 |
| `PageProgressBar` | `control/PageProgressBar/` | 页面进度条 |
| `ButtonLink` | `control/ButtonLink.astro` | 按钮式链接 |
| `ButtonTag` | `control/ButtonTag.astro` | 按钮式标签 |

### Features - 功能组件

**目录**：`src/components/features/`

**定义**：特定功能领域的业务组件，对应各个特色页面。

**现有组件**：

| 组件 | 路径 | 用途 |
|------|------|------|
| `anime` | `features/anime/` | 番剧页面组件 |
| `diary` | `features/diary/` | 日记页面组件 |
| `friends` | `features/friends/` | 友链页面组件 |
| `projects` | `features/projects/` | 项目展示组件 |
| `skills` | `features/skills/` | 技能展示组件 |
| `timeline` | `features/timeline/` | 时间线组件 |
| `albums` | `features/albums/` | 相册组件 |
| `devices` | `features/devices/` | 设备展示组件 |
| `posts` | `features/posts/` | 文章列表组件 |
| `toc` | `features/toc/` | 目录导航组件 |
| `settings` | `features/settings/` | 设置面板组件 |
| `stats` | `features/stats/` | 统计组件 |
| `pio` | `features/pio/` | Live2D 看板娘 |
| `auth` | `features/auth/` | 认证组件 |
| `page-header` | `features/page-header/` | 页面头部 |
| `section-title` | `features/section-title/` | 章节标题 |

### Organisms - 有机体组件

**目录**：`src/components/organisms/`

**定义**：复杂的全局业务组件，通常是页面级的布局组件。

**现有组件**：

| 组件 | 路径 | 用途 |
|------|------|------|
| `navigation` | `organisms/navigation/` | 导航栏 |
| `footer` | `organisms/footer/` | 页脚 |

### Widgets - 小部件组件

**目录**：`src/components/widgets/`

**定义**：侧边栏的小功能模块，通过配置系统动态加载。

**现有组件**：

| 组件 | 路径 | 用途 |
|------|------|------|
| `profile` | `widgets/profile/` | 个人资料 |
| `announcement` | `widgets/announcement/` | 公告 |
| `categories` | `widgets/categories/` | 分类 |
| `tags` | `widgets/tags/` | 标签 |
| `calendar` | `widgets/calendar/` | 日历 |
| `site-stats` | `widgets/site-stats/` | 站点统计 |
| `music-player` | `widgets/music-player/` | 音乐播放器 |
| `music-sidebar` | `widgets/music-sidebar/` | 侧栏音乐 |
| `toc` | `widgets/toc/` | 目录 |
| `card-toc` | `widgets/card-toc/` | 卡片式目录 |
| `sidebar` | `widgets/sidebar/` | 侧边栏容器 |
| `common` | `widgets/common/` | 通用组件（WidgetLayout, WidgetHeader） |
| `feed` | `widgets/feed/` | 信息流 |

### Misc - 通用组件

**目录**：`src/components/misc/`

**定义**：跨功能域的通用组件，提供基础 UI 能力。

**现有组件**：

| 组件 | 路径 | 用途 |
|------|------|------|
| `Icon` | `misc/Icon.astro` | 图标封装（带 loading 和 fallback） |
| `ListContainer` | `misc/ListContainer.astro` | 卡片容器（标题+图标+徽章） |
| `ListDivider` | `misc/ListDivider.astro` | 列表分隔线 |
| `Markdown` | `misc/Markdown.astro` | Markdown 渲染 |
| `License` | `misc/License.astro` | 版权信息 |
| `SharePoster` | `misc/SharePoster.svelte` | 分享海报 |
| `FullscreenWallpaper` | `misc/FullscreenWallpaper.astro` | 全屏壁纸 |
| `ConfigCarrier` | `misc/ConfigCarrier.astro` | 配置载体 |

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `Button.astro`, `ThemeSwitch.svelte` |
| 组件目录 | kebab-case | `atoms/`, `music-player/` |
| 类型文件 | camelCase | `types.ts`, `config.ts` |
| 工具文件 | camelCase | `widget-manager.ts`, `date-utils.ts` |

## 文件依赖管理

```
atoms/ ← 不依赖其他组件
  ↓
control/ ← 可依赖 atoms/
  ↓
features/ ← 可依赖 atoms/, control/, misc/
  ↓
organisms/ ← 可依赖 atoms/, features/, widgets/
  ↓
widgets/ ← 可依赖 atoms/, misc/
  ↓
layouts/ ← 可依赖所有组件
```

:::caution[注意]
避免循环依赖。高层组件可以依赖低层组件，但低层组件不应依赖高层组件。
:::
