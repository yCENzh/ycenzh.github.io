---
title: 音乐播放器
description: Mizuki 主题音乐播放器配置详解，支持本地音乐和 Meting API 在线音乐
---

音乐播放器配置位于 `src/config/musicConfig.ts` 文件中。Mizuki 支持本地音乐播放和通过 Meting API 获取在线音乐。

## 配置项详解

```typescript
// src/config/musicConfig.ts
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true, // 启用音乐播放器功能
  showFloatingPlayer: true, // 显示悬浮播放器 UI
  floatingEntryMode: "fab", // 悬浮入口模式："default" 为独立悬浮播放器，"fab" 为集成到通用 FAB 组
  mode: "local", // 音乐播放器模式，可选 "local" 或 "meting"
  meting_api:
    "https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // Meting API 地址
  id: "14164869977", // 歌单ID
  server: "netease", // 音乐源服务器。有的meting的api源支持更多平台,一般来说,netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
  type: "playlist", // 播单类型
};
```

### enable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否启用音乐播放器功能。设为 `false` 将完全禁用播放器。

### showFloatingPlayer

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否显示悬浮播放器 UI。关闭后播放器将隐藏但仍可播放。

### floatingEntryMode

- **类型**: `"default" | "fab"`
- **默认值**: `"fab"`
- **说明**: 悬浮入口模式。`"default"` 为独立悬浮播放器，`"fab"` 为集成到通用 FAB 组。

### mode

- **类型**: `"local" | "meting"`
- **默认值**: `"local"`
- **说明**: 音乐播放器模式。

| 模式 | 说明 |
|------|------|
| `local` | 本地音乐模式，播放本地音频文件 |
| `meting` | 在线音乐模式，通过 Meting API 获取音乐 |

### meting_api

- **类型**: `string`
- **说明**: Meting API 地址。仅在 `mode` 为 `"meting"` 时生效。

API 地址支持以下占位符：

| 占位符 | 说明 |
|--------|------|
| `:server` | 音乐源服务器 |
| `:type` | 播单类型 |
| `:id` | 歌单/歌曲 ID |
| `:auth` | 认证信息 |
| `:r` | 随机数 |

### id

- **类型**: `string`
- **说明**: 歌单/歌曲/专辑 ID。仅在 `mode` 为 `"meting"` 时生效。

### server

- **类型**: `string`
- **默认值**: `"netease"`
- **说明**: 音乐源服务器。仅在 `mode` 为 `"meting"` 时生效。

| 值 | 说明 |
|----|------|
| `netease` | 网易云音乐 |
| `tencent` | QQ 音乐 |
| `kugou` | 酷狗音乐 |
| `xiami` | 虾米音乐 |
| `baidu` | 百度音乐 |

### type

- **类型**: `string`
- **默认值**: `"playlist"`
- **说明**: 播单类型。仅在 `mode` 为 `"meting"` 时生效。

| 值 | 说明 |
|----|------|
| `playlist` | 歌单 |
| `song` | 单曲 |
| `album` | 专辑 |
| `artist` | 歌手 |

## 配置示例

### 网易云音乐歌单

```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true,
  showFloatingPlayer: true,
  floatingEntryMode: "fab",
  mode: "meting",
  meting_api: "https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
  id: "14164869977",
  server: "netease",
  type: "playlist",
};
```

### QQ 音乐专辑

```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true,
  showFloatingPlayer: true,
  floatingEntryMode: "fab",
  mode: "meting",
  meting_api: "https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
  id: "003OUlho2HcRHC",
  server: "tencent",
  type: "album",
};
```

### 本地音乐模式

```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true,
  showFloatingPlayer: true,
  floatingEntryMode: "fab",
  mode: "local",
  meting_api: "",
  id: "",
  server: "netease",
  type: "playlist",
};
```

## 注意事项

1. 使用 Meting API 时，请确保 API 地址可访问，否则音乐将无法加载。
2. 部分音乐源可能有地区限制，请根据实际情况选择合适的服务器。
3. `floatingEntryMode` 设为 `"fab"` 时，播放器将与其他浮动按钮整合，界面更简洁。
4. 移动端播放器会自动适配屏幕尺寸，建议保持 `showFloatingPlayer: true` 以获得最佳体验。
