---
title: 时间线页面
description: Mizuki 主题时间线页面配置指南，包括数据结构、事件类型和成就展示
---

时间线页面以垂直时间线的形式展示个人经历，包括教育、工作、项目和成就等事件。

## 页面结构

```
src/
├── data/
│   └── timeline.ts           ← 时间线数据文件
├── pages/
│   └── timeline.astro        ← 页面渲染逻辑
└── components/
    └── features/
        └── timeline/         ← 时间线组件和类型定义
```

## 数据结构

时间线数据定义在 `src/data/timeline.ts` 中，类型定义在 `src/components/features/timeline/types.ts`：

```typescript
export interface TimelineItem {
  id: string;               // 唯一标识
  title: string;            // 事件标题
  description: string;      // 事件描述
  type: "education" | "work" | "project" | "achievement";  // 事件类型
  startDate: string;        // 开始日期
  endDate?: string;         // 结束日期（可选，不填表示进行中）
  location?: string;        // 地点（可选）
  organization?: string;    // 组织/机构（可选）
  position?: string;        // 职位（可选）
  skills?: string[];        // 相关技能（可选）
  achievements?: string[];  // 成就列表（可选）
  links?: {                 // 相关链接（可选）
    name: string;
    url: string;
    type: string;
  }[];
  icon: string;             // Iconify 图标名称
  color: string;            // 主题颜色
  featured?: boolean;       // 是否为精选事件（可选）
}
```

### 添加新事件

在 `timelineData` 数组中添加新条目：

```typescript
export const timelineData: TimelineItem[] = [
  {
    id: "my-education",
    title: "计算机科学与技术",
    description: "就读于某大学计算机科学与技术专业。",
    type: "education",
    startDate: "2022-09-01",
    location: "北京",
    organization: "某大学",
    skills: ["Java", "Python", "JavaScript"],
    achievements: [
      "GPA: 3.8/4.0",
      "获得奖学金",
    ],
    icon: "material-symbols:school",
    color: "#059669",
    featured: true,
  },
];
```

## 事件类型

| 类型 | 说明 | 图标 |
|------|------|------|
| `education` | 教育经历 | `material-symbols:school` |
| `work` | 工作经历 | `material-symbols:work` |
| `project` | 项目经历 | `material-symbols:code` |
| `achievement` | 成就/荣誉 | `material-symbols:emoji-events` |

## 链接类型

链接支持以下类型：

| 类型 | 说明 |
|------|------|
| `project` | 项目链接 |
| `website` | 网站链接 |
| `certificate` | 证书链接 |

## 页面开关

在 `src/config/siteConfig.ts` 中启用时间线页面：

```typescript
featurePages: {
  timeline: true,  // 设为 false 关闭时间线页面
},
```

## 注意事项

1. `id` 字段必须唯一，用于区分不同事件
2. `icon` 使用 Iconify 图标名称格式，如 `material-symbols:school`
3. `color` 为十六进制颜色值，用于事件卡片的主题色
4. `endDate` 留空表示该事件仍在进行中
5. `featured` 为 `true` 的事件会优先展示
6. 页面支持按事件类型过滤
7. 关闭页面后访问 `/timeline` 会自动重定向到 404
