---
title: 樱花飘落特效
description: Mizuki 主题樱花飘落特效配置详解，可自定义樱花数量、大小、速度等参数
---

樱花飘落特效配置位于 `src/config/effectsConfig.ts` 文件中。该功能可以为网站添加浪漫的樱花飘落动画效果。

## 配置项详解

```typescript
// src/config/effectsConfig.ts
export const sakuraConfig: SakuraConfig = {
  enable: false,
  switchable: true,
  sakuraNum: 21,
  limitTimes: -1,
  size: {
    min: 0.5,
    max: 1.1,
  },
  opacity: {
    min: 0.3,
    max: 0.9,
  },
  speed: {
    horizontal: {
      min: -1.7,
      max: -1.2,
    },
    vertical: {
      min: 1.5,
      max: 2.2,
    },
    rotation: 0.03,
    fadeSpeed: 0.03,
  },
  zIndex: 100,
};
```

### enable

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否启用樱花飘落特效。默认关闭，需手动开启。

### switchable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否允许用户切换特效开关。设为 `false` 后用户无法自行关闭。

### sakuraNum

- **类型**: `number`
- **默认值**: `21`
- **说明**: 同时显示的樱花数量。数值越大，樱花越密集。

### limitTimes

- **类型**: `number`
- **默认值**: `-1`
- **说明**: 樱花飘落次数限制。`-1` 表示无限循环。

| 值 | 说明 |
|----|------|
| `-1` | 无限循环 |
| `0` | 禁用 |
| `正整数` | 飘落指定次数后停止 |

### size

- **类型**: `object`
- **说明**: 樱花大小配置。

#### size.min

- **类型**: `number`
- **默认值**: `0.5`
- **说明**: 樱花最小尺寸倍数。

#### size.max

- **类型**: `number`
- **默认值**: `1.1`
- **说明**: 樱花最大尺寸倍数。

### opacity

- **类型**: `object`
- **说明**: 樱花透明度配置。

#### opacity.min

- **类型**: `number`
- **默认值**: `0.3`
- **说明**: 樱花最小不透明度（0-1）。

#### opacity.max

- **类型**: `number`
- **默认值**: `0.9`
- **说明**: 樱花最大不透明度（0-1）。

### speed

- **类型**: `object`
- **说明**: 樱花运动速度配置。

#### speed.horizontal

- **类型**: `object`
- **说明**: 水平移动速度配置。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `min` | `number` | `-1.7` | 水平速度最小值（负值向左） |
| `max` | `number` | `-1.2` | 水平速度最大值（负值向左） |

#### speed.vertical

- **类型**: `object`
- **说明**: 垂直移动速度配置。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `min` | `number` | `1.5` | 垂直速度最小值 |
| `max` | `number` | `2.2` | 垂直速度最大值 |

#### speed.rotation

- **类型**: `number`
- **默认值**: `0.03`
- **说明**: 旋转速度。

#### speed.fadeSpeed

- **类型**: `number`
- **默认值**: `0.03`
- **说明**: 消失速度。不应大于最小不透明度。

### zIndex

- **类型**: `number`
- **默认值**: `100`
- **说明**: CSS 层级，确保樱花在合适的层级显示。

## 配置示例

### 基础配置

```typescript
export const sakuraConfig: SakuraConfig = {
  enable: true,
  switchable: true,
  sakuraNum: 21,
  limitTimes: -1,
  size: { min: 0.5, max: 1.1 },
  opacity: { min: 0.3, max: 0.9 },
  speed: {
    horizontal: { min: -1.7, max: -1.2 },
    vertical: { min: 1.5, max: 2.2 },
    rotation: 0.03,
    fadeSpeed: 0.03,
  },
  zIndex: 100,
};
```

### 密集樱花效果

```typescript
export const sakuraConfig: SakuraConfig = {
  enable: true,
  switchable: true,
  sakuraNum: 50,
  limitTimes: -1,
  size: { min: 0.3, max: 0.8 },
  opacity: { min: 0.5, max: 1.0 },
  speed: {
    horizontal: { min: -2.0, max: -1.0 },
    vertical: { min: 1.0, max: 3.0 },
    rotation: 0.05,
    fadeSpeed: 0.02,
  },
  zIndex: 100,
};
```

### 轻柔樱花效果

```typescript
export const sakuraConfig: SakuraConfig = {
  enable: true,
  switchable: false,
  sakuraNum: 15,
  limitTimes: -1,
  size: { min: 0.6, max: 1.2 },
  opacity: { min: 0.2, max: 0.7 },
  speed: {
    horizontal: { min: -1.0, max: -0.5 },
    vertical: { min: 0.8, max: 1.5 },
    rotation: 0.02,
    fadeSpeed: 0.01,
  },
  zIndex: 100,
};
```

## 注意事项

1. 樱花特效默认关闭，需要手动设置 `enable: true` 开启。
2. `sakuraNum` 过大可能影响页面性能，建议根据目标设备性能调整。
3. `fadeSpeed` 不应大于 `opacity.min`，否则樱花会突然消失。
4. `zIndex` 需要根据页面其他元素的层级合理设置，避免被遮挡或遮挡其他内容。
5. `switchable` 设为 `true` 时，用户可通过页面上的开关按钮控制特效显示。
6. 移动设备上建议适当减少 `sakuraNum` 以保证流畅度。
