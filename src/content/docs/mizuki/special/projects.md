---
title: 项目页面
description: Mizuki 主题项目页面配置指南，包括数据结构、分类过滤和状态管理
---

项目页面用于展示个人项目作品，支持按类别过滤，可标记精选项目。

## 页面结构

```
src/
├── data/
│   └── projects.ts           ← 项目数据文件
├── pages/
│   └── projects.astro        ← 页面渲染逻辑
└── components/
    └── features/
        └── projects/         ← 项目卡片组件
```

## 数据结构

项目数据定义在 `src/data/projects.ts` 中：

```typescript
export interface Project {
  id: string;               // 唯一标识
  title: string;            // 项目名称
  description: string;      // 项目描述
  image: string;            // 项目封面图路径
  category: "web" | "mobile" | "desktop" | "other";  // 项目类别
  techStack: string[];      // 技术栈列表
  status: "completed" | "in-progress" | "planned";    // 项目状态
  liveDemo?: string;        // 在线演示链接（可选）
  sourceCode?: string;      // 源代码链接（可选）
  visitUrl?: string;        // 访问链接（可选）
  startDate: string;        // 开始日期
  endDate?: string;         // 结束日期（可选）
  featured?: boolean;       // 是否为精选项目（可选）
  tags?: string[];          // 标签列表（可选）
  showImage?: boolean;      // 是否显示封面图（可选，默认 true）
}
```

### 添加新项目

在 `projectsData` 数组中添加新条目：

```typescript
export const projectsData: Project[] = [
  {
    id: "my-project",
    title: "我的项目",
    description: "这是一个示例项目。",
    image: "/assets/projects/my-project.webp",
    category: "web",
    techStack: ["Astro", "TypeScript", "Tailwind CSS"],
    status: "completed",
    sourceCode: "https://github.com/username/my-project",
    liveDemo: "https://my-project.example.com",
    startDate: "2025-01-01",
    endDate: "2025-06-01",
    featured: true,
    tags: ["博客", "开源"],
  },
];
```

## 项目类别

| 类别 | 说明 | 图标 |
|------|------|------|
| `web` | Web 项目 | `material-symbols:language` |
| `mobile` | 移动端项目 | `material-symbols:smartphone` |
| `desktop` | 桌面端项目 | `material-symbols:desktop-windows` |
| `other` | 其他项目 | `material-symbols:widgets` |

## 项目状态

| 状态 | 说明 |
|------|------|
| `completed` | 已完成 |
| `in-progress` | 开发中 |
| `planned` | 计划中 |

## 页面开关

在 `src/config/siteConfig.ts` 中启用项目页面：

```typescript
featurePages: {
  projects: true,  // 设为 false 关闭项目页面
},
```

## 注意事项

1. `id` 字段必须唯一，用于区分不同项目
2. 封面图路径相对于 `public` 目录，建议使用 WebP 格式
3. 设置 `featured: true` 可将项目标记为精选
4. 设置 `showImage: false` 可隐藏封面图，适用于没有合适图片的项目
5. `category` 字段用于顶部过滤标签栏的分类
6. 关闭页面后访问 `/projects` 会自动重定向到 404
