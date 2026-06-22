---
title: 主题介绍
description: Mizuki - 一个简约&功能丰富的 Astro 博客主题
---

欢迎使用 Mizuki 主题！👏

**Mizuki** 是一个基于 [Astro](https://astro.build/) 的现代化静态博客模板，具有丰富的功能和美观的设计。无论您是想写**生活类博客**、**技术类博客**，或者是**知识库、系列文档**等，主题都可以满足您的需求。

## 🚀 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Astro](https://astro.build/) | 6.x | 核心框架 |
| [Svelte](https://svelte.dev/) | 5.x | 交互组件 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | 样式系统 |
| [TypeScript](https://www.typescriptlang.org/) | 6.x | 类型安全 |
| [Pagefind](https://pagefind.app/) | 1.x | 搜索引擎 |

## ✨ 功能特性

### 🎨 设计与界面

- 基于 Astro + Tailwind CSS 构建
- 使用 [Swup](https://swup.js.org/) 实现流畅的页面过渡动画
- 明暗主题切换，支持系统偏好检测
- 可自定义主题色彩和动态横幅轮播
- 全屏背景图片，支持轮播、透明度和模糊效果
- 全设备响应式设计（移动端 / 平板 / 桌面端）
- 自动分辨率适配算法，智能优化布局
- JetBrains Mono 字体的优美排版

### 🔍 内容与搜索

- 基于 Pagefind 的高级搜索功能
- 增强的 Markdown 功能，支持语法高亮、数学公式（KaTeX）
- 交互式目录导航，支持自动滚动
- RSS / Atom 订阅生成
- 阅读时间估算
- 文章分类和标签系统
- 文章固定链接（Permalink）支持

### 📱 特色页面

- **追番页面** - 支持 Bangumi / Bilibili / 本地三种数据源
- **友链页面** - 精美卡片展示，支持标签过滤和随机排序
- **日记页面** - 支持静态数据和 Memos API
- **项目展示** - 支持分类过滤和精选标记
- **技能展示** - 卡片式技能展示，支持熟练度等级
- **时间线** - 垂直时间线展示个人经历
- **相册页面** - 自动扫描目录，支持瀑布流布局
- **设备展示** - 按品牌/类别分组展示

### 🎵 多媒体

- 音乐播放器，支持本地音乐和 Meting API（网易云/QQ 音乐等）
- Live2D 看板娘，支持自定义模型和交互对话
- 樱花飘落特效
- 全屏壁纸和横幅轮播

### 🔧 系统功能

- 组件化配置系统，支持动态组件管理和顺序配置
- 响应式侧边栏（左侧栏 / 右侧栏 / 抽屉侧栏）
- 内容分离功能，支持独立内容仓库
- 字体子集优化，自动压缩字体文件
- 评论系统（Twikoo / Giscus）
- 统计分析（Umami / Microsoft Clarity）
- 自动构建触发（Repository Dispatch）

## 📁 项目结构

```
Mizuki/
├── src/
│   ├── components/          # 组件目录
│   │   ├── atoms/           # 原子组件（Badge, Button, Chip, Icon...）
│   │   ├── control/         # 控制组件（BackToTop, Pagination, ThemeSwitch...）
│   │   ├── features/        # 功能组件（anime, diary, friends, projects...）
│   │   ├── organisms/       # 有机体组件（navigation, footer）
│   │   ├── widgets/         # 侧边栏小部件（profile, calendar, categories...）
│   │   ├── layout/          # 布局组件（Banner, RightSideBar, SidebarColumn）
│   │   ├── misc/            # 通用组件（ListContainer, ListDivider, Icon...）
│   │   └── common/          # 公共组件（FloatingButton）
│   ├── config/              # 配置文件目录
│   ├── content/             # 内容目录（文章、特殊页面）
│   ├── data/                # 数据文件（anime, friends, projects, skills...）
│   ├── layouts/             # 页面布局
│   ├── pages/               # 页面路由
│   ├── styles/              # 全局样式
│   ├── types/               # TypeScript 类型定义
│   └── utils/               # 工具函数
├── public/                  # 静态资源
├── scripts/                 # 构建脚本
└── docs/                    # 项目文档
```

## 💬 社区交流

- QQ 群：1007524064（主题交流群）
- [Discord 频道](https://discord.gg/MqW6TcQtVM)（面向全世界的 Mizuki 用户）

<details>
<summary>不了解 Astro？</summary>

[Astro](https://astro.build/) 是最适合构建像博客、营销网站、电子商务网站这样的以内容驱动的网站的 Web 框架。Astro 以开创了一种新的前端架构而闻名，与其他框架相比它减少了 JavaScript 的开销和复杂性。如果你需要一个加载速度快、具有良好 SEO 的网站，那么 Astro 就是你的选择。

</details>

