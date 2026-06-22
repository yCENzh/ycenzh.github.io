---
title: 设备页面
description: Mizuki 主题设备页面配置指南，包括数据结构、品牌分类和设备展示
---

设备页面用于展示个人使用的电子设备，按品牌/类别分组展示，支持过滤功能。

## 页面结构

```
src/
├── data/
│   └── devices.ts            ← 设备数据文件
├── pages/
│   └── devices.astro         ← 页面渲染逻辑
└── components/
    └── features/
        └── devices/          ← 设备卡片组件
```

## 数据结构

设备数据定义在 `src/data/devices.ts` 中：

```typescript
export interface Device {
  name: string;           // 设备名称
  image: string;          // 设备图片路径
  specs: string;          // 规格信息
  description: string;    // 设备描述
  link: string;           // 官方链接
}

export type DeviceCategory = Record<string, Device[]>;
```

### 添加新设备

在 `devicesData` 对象中按品牌/类别添加设备：

```typescript
export const devicesData: DeviceCategory = {
  OnePlus: [
    {
      name: "OnePlus 13T",
      image: "/images/device/oneplus13t.webp",
      specs: "Gray / 16G + 1TB",
      description: "旗舰性能，哈苏影像，80W 超级闪充。",
      link: "https://www.oneplus.com/cn/13t",
    },
  ],
  Apple: [
    {
      name: "MacBook Pro 14",
      image: "/images/device/macbook-pro.webp",
      specs: "M3 Pro / 18GB / 512GB",
      description: "专业级笔记本电脑，适合开发和创作。",
      link: "https://www.apple.com/macbook-pro/",
    },
  ],
  Router: [
    {
      name: "GL-MT3000",
      image: "/images/device/mt3000.webp",
      specs: "1000Mbps / 2.5G",
      description: "便携式 WiFi 6 路由器。",
      link: "https://www.gl-inet.cn/products/gl-mt3000/",
    },
  ],
};
```

## 数据分类

设备按 `devicesData` 对象的键名进行分组，常见分类方式：

| 分类方式 | 示例 |
|----------|------|
| 品牌 | `Apple`、`OnePlus`、`Samsung`、`Xiaomi` |
| 类别 | `Phone`、`Laptop`、`Tablet`、`Router` |
| 自定义 | 可以使用任意字符串作为分类名 |

## 过滤功能

页面顶部自动显示过滤按钮，根据 `devicesData` 的键名生成：

- 点击品牌/类别按钮可过滤显示对应设备
- 默认显示第一个分类的设备

## 图片规范

- 图片路径相对于 `public` 目录
- 建议放在 `public/images/device/` 目录下
- 推荐使用 WebP 格式以获得更好的压缩效果
- 建议使用统一的图片尺寸比例

## 页面开关

在 `src/config/siteConfig.ts` 中启用设备页面：

```typescript
featurePages: {
  devices: true,  // 设为 false 关闭设备页面
},
```

## 注意事项

1. `devicesData` 的键名会自动成为过滤按钮的标签
2. 图片路径相对于 `public` 目录
3. `link` 字段建议填写设备官方页面链接
4. `specs` 字段用于展示简要规格信息，如颜色、存储容量等
5. 设备按添加顺序展示
6. 关闭页面后访问 `/devices` 会自动重定向到 404
