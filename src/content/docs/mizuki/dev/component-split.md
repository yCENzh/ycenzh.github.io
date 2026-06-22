---
title: 组件拆分指南
description: Mizuki 主题组件拆分方法和最佳实践
---

## 概述

本文档提供详细的组件拆分方法和最佳实践，帮助你识别需要拆分的组件，并进行有效的重构。

## 识别需要拆分的组件

### 拆分信号清单

当一个组件出现以下信号时，应该考虑拆分：

#### 1. 代码量过大

| 状态 | 行数 | 建议 |
|------|------|------|
| ✅ 良好 | < 300 行 | 无需拆分 |
| ⚠️ 注意 | 300-500 行 | 可以考虑拆分 |
| ❌ 必须拆分 | > 500 行 | 必须拆分 |

#### 2. 职责过多

组件承担了多个不相关的功能时应该拆分。

**❌ 错误示例**：
```astro
---
// 一个组件同时负责：
// 1. 搜索功能
// 2. 导航菜单
// 3. 主题切换
// 4. 侧边栏
// 5. 用户认证
---
```

**✅ 正确示例**：
```astro
<SearchModule />
<NavbarMenu />
<ThemeToggle />
<Sidebar />
<AuthModule />
```

#### 3. 状态复杂度高

- 状态变量数量 > 10 个
- 状态嵌套层级 > 3 层
- 状态更新逻辑分散

#### 4. DOM 操作过多

- 大量 `document.getElementById` 或 `querySelector`
- 复杂的事件监听器绑定
- 动态创建/删除元素

#### 5. 依赖过多

- 导入了 10+ 个外部依赖
- 导入了多个大型第三方库

## 拆分原则

### 1. 单一职责原则（SRP）

拆分后的每个组件应该只有一个明确的职责。

**示例：MusicPlayer 拆分**

```
MusicPlayer/
├── MusicPlayer.svelte           # 组合层，协调各子组件
├── MiniPlayer.svelte            # 迷你播放器 UI
├── ExpandedPlayer.svelte        # 展开播放器 UI
├── PlaylistPanel.svelte         # 播放列表 UI
├── controls/
│   ├── PlayControls.svelte      # 播放控制按钮
│   ├── ProgressBar.svelte       # 进度条
│   └── VolumeControl.svelte     # 音量控制
└── hooks/
    ├── useAudio.ts              # 音频播放逻辑
    ├── usePlaylist.ts           # 播放列表管理
    └── useVolume.ts             # 音量控制逻辑
```

### 2. 接口隔离原则（ISP）

组件应该只依赖于它需要的接口。

**示例**：
```astro
---
// ❌ 错误：直接依赖所有功能
import { getAllPosts } from '../utils/blog'
import { calculateDates } from '../utils/calendar'
import { formatTime } from '../utils/date'
import { handleNav } from '../utils/navigation'
// ... 10+ 个依赖

// ✅ 正确：提取 Hook
import { useCalendar } from '../hooks/useCalendar'
const { dates, currentMonth, handleMonthChange } = useCalendar()
---
```

### 3. 依赖倒置原则（DIP）

高层模块不应该依赖低层模块，两者都应该依赖抽象。

## 拆分步骤

### 步骤 1：分析组件职责

列出组件的所有职责，识别独立的功能单元。

### 步骤 2：创建子组件

将独立的职责提取为子组件，放在同一目录下。

### 步骤 3：定义接口

使用 TypeScript 定义清晰的 Props 接口。

```typescript
// types.ts
export interface MiniPlayerProps {
  isPlaying: boolean
  currentSong: Song | null
  onPlay: () => void
  onPause: () => void
  onExpand: () => void
}
```

### 步骤 4：重构主组件

将主组件改为组合层，协调各子组件。

### 步骤 5：验证

- 确保所有功能正常工作
- 检查 TypeScript 类型检查通过
- 运行 `pnpm run lint` 确保代码质量

## 避免常见错误

### ❌ 过度拆分

不要将简单的组件拆分为过多的子组件，这会增加复杂度。

### ❌ 拆分后仍然耦合

拆分后的子组件应该可以独立使用，而不是必须依赖其他子组件。

### ❌ 忽略性能

拆分时注意避免不必要的 props 传递和重渲染。
