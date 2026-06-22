---
title: 番剧页面
description: Mizuki 主题番剧页面配置指南，包括 Bangumi、Bilibili 和本地三种数据源模式
---

番剧页面用于展示追番记录，支持三种数据源模式：Bangumi API、Bilibili API 和本地数据。

## 页面结构

```
src/
├── data/
│   └── anime.ts              ← 本地番剧数据文件
├── pages/
│   └── anime.astro           ← 页面渲染逻辑
├── styles/
│   └── anime.css             ← 番剧页面样式
└── components/
    └── features/
        └── anime/            ← 番剧相关组件
```

## 数据源模式

在 `src/config/siteConfig.ts` 中配置番剧数据源：

```typescript
anime: {
  mode: "local",  // 可选值："bangumi"、"bilibili"、"local"
},
```

### Bangumi 模式

使用 Bangumi API 获取番剧数据。

```typescript
anime: {
  mode: "bangumi",
},

bangumi: {
  userId: "your-bangumi-id",   // Bangumi 用户 ID
  fetchOnDev: false,           // 开发环境下是否获取数据
},
```

**配置步骤：**

1. 注册 [Bangumi](https://bangumi.tv/) 账号
2. 获取用户 ID（个人主页 URL 中的 ID）
3. 将 `userId` 替换为你的用户 ID
4. 设为 `"sai"` 可测试

### Bilibili 模式

使用 Bilibili API 获取番剧数据，支持观看进度同步。

```typescript
anime: {
  mode: "bilibili",
},

bilibili: {
  vmid: "your-bilibili-vmid",  // Bilibili 用户 UID
  fetchOnDev: false,            // 开发环境下是否获取数据
  coverMirror: "",              // 封面图片镜像源（可选）
  useWebp: true,                // 是否使用 WebP 格式
},
```

**配置步骤：**

1. 获取 Bilibili 用户 UID（个人空间 URL 中的数字）
2. 将 `vmid` 替换为你的 UID
3. 如需同步观看进度，需配置 `SESSDATA` 环境变量

**SESSDATA 配置：**

- 本地开发：在 `.env` 文件中添加 `BILI_SESSDATA=your_SESSDATA`
- 远程构建：在 GitHub 仓库 Settings → Secrets 中添加 `BILI_SESSDATA`

> [!WARNING]
> SESSDATA 为账号凭证，请勿硬编码在代码中。如已泄露，请通过 B 站手机端 → 我的 → 设置 → 安全隐私 → 登录设备管理 → 一键退登来销毁凭证。

### 本地模式

使用 `src/data/anime.ts` 中的静态数据。

```typescript
anime: {
  mode: "local",
},
```

## 本地数据结构

本地番剧数据定义在 `src/data/anime.ts` 中：

```typescript
export interface AnimeItem {
  title: string;                        // 番剧标题
  status: "watching" | "completed" | "planned";  // 观看状态
  rating: number;                       // 评分
  cover: string;                        // 封面图路径
  description: string;                  // 描述
  episodes: string;                     // 集数信息
  year: string;                         // 年份
  genre: string[];                      // 类型标签
  studio: string;                       // 制作公司
  link: string;                         // 番剧链接
  progress: number;                     // 当前进度
  totalEpisodes: number;                // 总集数
  startDate: string;                    // 开始观看日期
  endDate: string;                      // 结束观看日期
}
```

### 添加本地番剧

```typescript
const localAnimeList: AnimeItem[] = [
  {
    title: "Lycoris Recoil",
    status: "completed",
    rating: 9.8,
    cover: "/assets/anime/lkls.webp",
    description: "少女的枪战日常",
    episodes: "12 episodes",
    year: "2022",
    genre: ["Action", "Slice of life"],
    studio: "A-1 Pictures",
    link: "https://www.bilibili.com/bangumi/media/md28338623",
    progress: 12,
    totalEpisodes: 12,
    startDate: "2022-07",
    endDate: "2022-09",
  },
];
```

## 观看状态

| 状态 | 说明 |
|------|------|
| `watching` | 正在观看 |
| `completed` | 已看完 |
| `planned` | 计划观看 |

## 页面开关

在 `src/config/siteConfig.ts` 中启用番剧页面：

```typescript
featurePages: {
  anime: true,  // 设为 false 关闭番剧页面
},
```

## 注意事项

1. 三种模式只能选择其一，通过 `anime.mode` 配置
2. Bangumi 模式和 Bilibili 模式需要先执行 `pnpm build` 构建 JSON 数据文件
3. `fetchOnDev` 默认为 `false`，开发环境下不会自动获取 API 数据
4. Bilibili 模式的封面图镜像源可用于解决图片防盗链问题
5. 本地模式的封面图路径相对于 `public` 目录
6. 关闭页面后访问 `/anime` 会自动重定向到 404
