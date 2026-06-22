---
title: 全屏布局
description: Mizuki 主题全屏壁纸配置详解，包括壁纸图片源、轮播、透明度、模糊等配置项
---

全屏壁纸配置位于 `src/config/backgroundWallpaper.ts` 文件中，用于设置覆盖整个页面背景的全屏壁纸效果。

## 壁纸图片源

支持桌面端和移动端分别配置不同的壁纸图片。

```typescript
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
  enable: true,
  src: {
    desktop: [
      "/assets/desktop-banner/1.webp",
      "/assets/desktop-banner/2.webp",
      "/assets/desktop-banner/3.webp",
      "/assets/desktop-banner/4.webp",
    ],
    mobile: [
      "/assets/mobile-banner/1.webp",
      "/assets/mobile-banner/2.webp",
      "/assets/mobile-banner/3.webp",
      "/assets/mobile-banner/4.webp",
    ],
  },
  position: "center", // 壁纸定位
  switchable: true,    // 允许用户切换壁纸模式
};
```

### 壁纸定位 (position)

等同于 CSS `object-position` 属性。

| 值 | 说明 |
|----|------|
| `"top"` | 顶部对齐 |
| `"center"` | 居中对齐（默认） |
| `"bottom"` | 底部对齐 |

## 轮播设置

当图片数组包含多张图片时启用轮播。

```typescript
carousel: {
  enable: true,  // 启用轮播
  interval: 5,   // 切换间隔，单位为秒
},
```

## 层级控制

控制壁纸在页面中的层叠顺序。

```typescript
zIndex: -1, // 默认值 -1，确保壁纸在内容下方
```

## 透明度与模糊

控制壁纸的整体透明度和背景模糊效果。

```typescript
opacity: 0.8, // 壁纸不透明度，范围 0-1
blur: 1,      // 背景模糊半径，单位为像素
```

## 叠加层配置

通过 `overlay` 对象精细控制壁纸叠加效果和用户可调节选项。

```typescript
overlay: {
  opacity: 0.8,       // 壁纸不透明度，0-1
  blur: 1.5,          // 背景模糊半径（px）
  cardOpacity: 0.8,   // 卡片不透明度，0-1
  switchable: {
    opacity: true,     // 允许用户调节不透明度
    blur: true,        // 允许用户调节模糊度
    cardOpacity: true, // 允许用户调节卡片不透明度
  },
},
```

## 全屏模式切换

控制全屏壁纸模式下用户可调节的选项。

```typescript
fullscreen: {
  switchable: {
    opacity: true, // 允许用户调节不透明度
    blur: true,    // 允许用户调节模糊度
  },
},
```

## 完整配置示例

```typescript
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
  enable: true,
  src: {
    desktop: ["/assets/desktop-banner/1.webp"],
    mobile: ["/assets/mobile-banner/1.webp"],
  },
  position: "center",
  carousel: {
    enable: true,
    interval: 5,
  },
  zIndex: -1,
  opacity: 0.8,
  blur: 1,
  switchable: true,
  overlay: {
    opacity: 0.8,
    blur: 1.5,
    cardOpacity: 0.8,
    switchable: {
      opacity: true,
      blur: true,
      cardOpacity: true,
    },
  },
  fullscreen: {
    switchable: {
      opacity: true,
      blur: true,
    },
  },
};
```

## 注意事项

1. 全屏壁纸模式需要在 `siteConfig.wallpaperMode.defaultMode` 中设置为 `"fullscreen"` 才会生效。
2. `zIndex` 设为 `-1` 可确保壁纸始终在页面内容下方，一般不建议修改。
3. `opacity` 和 `blur` 值过大会影响文字可读性，建议 `opacity` 不低于 0.5。
4. 启用过多的模糊效果可能影响页面性能，建议在移动端适当降低 `blur` 值。
5. 壁纸图片建议使用 WebP 格式并适当压缩，以减少加载时间。
