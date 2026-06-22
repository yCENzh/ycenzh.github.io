---
title: 技能页面
description: Mizuki 主题技能页面配置指南，包括数据结构、技能分类和熟练度等级
---

技能页面以卡片形式展示个人技术技能，支持按类别过滤，显示熟练度和经验时长。

## 页面结构

```
src/
├── data/
│   └── skills.ts             ← 技能数据文件
├── pages/
│   └── skills.astro          ← 页面渲染逻辑
└── components/
    └── features/
        └── skills/           ← 技能卡片组件
```

## 数据结构

技能数据定义在 `src/data/skills.ts` 中：

```typescript
export interface Skill {
  id: string;               // 唯一标识
  name: string;             // 技能名称
  description: string;      // 技能描述
  icon: string;             // Iconify 图标名称
  category: "frontend" | "backend" | "database" | "tools" | "other";  // 技能类别
  level: "beginner" | "intermediate" | "advanced" | "expert";         // 熟练度
  experience: {             // 经验时长
    years: number;
    months: number;
  };
  projects?: string[];      // 相关项目 ID（可选）
  certifications?: string[];// 相关证书（可选）
  color?: string;           // 卡片主题颜色（可选）
}
```

### 添加新技能

在 `skillsData` 数组中添加新条目：

```typescript
export const skillsData: Skill[] = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "现代 JavaScript 开发，包括 ES6+ 语法、异步编程和模块化开发。",
    icon: "logos:javascript",
    category: "frontend",
    level: "advanced",
    experience: { years: 3, months: 6 },
    projects: ["my-blog", "portfolio"],
    color: "#F7DF1E",
  },
  {
    id: "python",
    name: "Python",
    description: "Python 后端开发、数据分析和自动化脚本。",
    icon: "logos:python",
    category: "backend",
    level: "intermediate",
    experience: { years: 2, months: 0 },
    color: "#3776AB",
  },
];
```

## 技能类别

| 类别 | 说明 | 图标 |
|------|------|------|
| `frontend` | 前端技术 | `material-symbols:web` |
| `backend` | 后端技术 | `material-symbols:dns` |
| `database` | 数据库 | `material-symbols:storage` |
| `tools` | 开发工具 | `material-symbols:build` |
| `other` | 其他 | `material-symbols:widgets` |

## 熟练度等级

| 等级 | 说明 |
|------|------|
| `beginner` | 初学者 |
| `intermediate` | 中级 |
| `advanced` | 高级 |
| `expert` | 专家 |

## 图标规范

`icon` 字段使用 Iconify 图标名称格式，推荐使用以下图标集：

- **技术 Logo**：`logos:javascript`、`logos:typescript-icon`、`logos:react`、`logos:vue`
- **Material Symbols**：`material-symbols:code`、`material-symbols:database`
- **Devicons**：`devicon:git`、`devicon:docker`

可在 [Iconify](https://iconify.design/) 网站搜索可用图标。

## 页面开关

在 `src/config/siteConfig.ts` 中启用技能页面：

```typescript
featurePages: {
  skills: true,  // 设为 false 关闭技能页面
},
```

## 注意事项

1. `id` 字段必须唯一，用于区分不同技能
2. `icon` 需要使用 Iconify 支持的图标名称格式
3. `experience` 中的 `years` 和 `months` 用于展示经验时长
4. `color` 为十六进制颜色值，用于技能卡片的主题色
5. `projects` 数组中的值对应项目页面中的 `id`
6. 页面支持按类别过滤
7. 关闭页面后访问 `/skills` 会自动重定向到 404
