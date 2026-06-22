---
title: Meting API
description: Mizuki 主题中音乐播放器功能的 Meting API 配置和使用指南
---

本文档介绍如何在 Mizuki 中配置和使用 Meting API 音乐播放器功能。

## 简介

Meting 是一个通用的音乐 API 框架，支持网易云音乐、QQ 音乐、虾米音乐等多个平台。Mizuki 通过 Meting API 在博客中嵌入音乐播放器。

## 配置步骤

### 1. 选择音乐平台

Meting 支持以下平台：

| 平台 | ID | 说明 |
|------|-----|------|
| 网易云音乐 | `netease` | 推荐，API 稳定 |
| QQ 音乐 | `tencent` | 需要处理跨域 |
| 酷狗音乐 | `kugou` | 支持有限 |
| 酷我音乐 | `kuwo` | 支持有限 |
| 百度音乐 | `baidu` | 支持有限 |

### 2. 配置 Mizuki

在 `src/config/musicConfig.ts` 中配置：

```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true, // 启用音乐播放器
  mode: "meting", // 使用 Meting 模式
  meting_api: "https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
  id: "14164869977", // 歌单 ID
  server: "netease", // 音乐平台
  type: "playlist", // 类型：playlist, song, album, artist
};
```

### 3. 获取歌单 ID

以网易云音乐为例：

1. 打开 [网易云音乐](https://music.163.com/)
2. 找到你想使用的歌单
3. 从 URL 中获取歌单 ID（例如：`https://music.163.com/playlist?id=14164869977`）

---

## 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enable` | `boolean` | `true` | 是否启用音乐播放器 |
| `mode` | `"local" \| "meting"` | `"local"` | 播放器模式 |
| `meting_api` | `string` | — | Meting API 地址 |
| `id` | `string` | — | 歌单/歌曲 ID |
| `server` | `string` | `"netease"` | 音乐平台 |
| `type` | `string` | `"playlist"` | 资源类型 |

### type 可选值

| 值 | 说明 |
|----|------|
| `playlist` | 歌单 |
| `song` | 单曲 |
| `album` | 专辑 |
| `artist` | 歌手 |

---

## 自建 Meting API

如果公共 API 不稳定，可以自建 Meting API：

### 1. 克隆 Meting 项目

```bash
git clone https://github.com/metowolf/Meting.git
cd Meting
```

### 2. 部署到服务器

将 Meting 部署到你的服务器或 Vercel、Netlify 等平台。

### 3. 更新配置

```typescript
meting_api: "https://your-meting-api.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
```

---

## 相关文档

- [音乐播放器配置](/mizuki/feature/music-player/)：详细配置说明
- [错误排查](/mizuki/problem/error/)：常见错误解决方案
