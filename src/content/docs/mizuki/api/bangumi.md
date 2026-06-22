---
title: Bangumi API
description: Mizuki 主题中 Bangumi 番剧追踪功能的 API 配置和使用指南
---

本文档介绍如何在 Mizuki 中配置和使用 Bangumi 番剧追踪功能。

## 简介

Bangumi 是一个中文番剧追踪网站，Mizuki 通过 Bangumi API 获取你的番剧观看记录，并在博客中展示。

## 配置步骤

### 1. 获取 Bangumi 用户 ID

1. 访问 [Bangumi](https://bangumi.tv/) 并登录
2. 进入个人主页
3. 从 URL 中获取用户 ID（例如：`https://bangumi.tv/user/123456`，用户 ID 为 `123456`）

### 2. 配置 Mizuki

在 `src/config/siteConfig.ts` 中配置：

```typescript
export const siteConfig: SiteConfig = {
  // ...其他配置
  bangumi: {
    userId: "your-bangumi-id", // 替换为你的 Bangumi 用户 ID
    fetchOnDev: false, // 是否在开发环境下获取数据
  },
};
```

### 3. 构建数据

```bash
# 构建时自动获取 Bangumi 数据
pnpm build
```

---

## 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `userId` | `string` | — | Bangumi 用户 ID |
| `fetchOnDev` | `boolean` | `false` | 是否在开发环境下获取数据 |

---

## 常见问题

### Q: 如何测试 Bangumi 功能？

A: 可以使用测试用户 ID `sai`：

```typescript
bangumi: {
  userId: "sai", // 测试用户
  fetchOnDev: true, // 开发环境也获取数据
},
```

### Q: 数据什么时候更新？

A: Bangumi 数据在构建时获取，部署后不会自动更新。需要重新构建和部署才能更新数据。

### Q: 出现 401 错误怎么办？

A: Bangumi API 不需要认证，如果出现 401 错误，请检查：
- 用户 ID 是否正确
- 用户是否设置了隐私保护

---

## 相关文档

- [番剧页面配置](/mizuki/special/anime/)：番剧页面详细配置
- [错误排查](/mizuki/problem/error/)：常见错误解决方案
