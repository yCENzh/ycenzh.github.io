---
title: Live2D 看板娘
description: Mizuki 主题 Live2D 看板娘配置详解，支持自定义模型和交互对话
---

看板娘配置位于 `src/config/pioConfig.ts` 文件中。Mizuki 集成了 Live2D 看板娘功能，可以为网站添加可爱的动态角色。

## 配置项详解

```typescript
// src/config/pioConfig.ts
export const pioConfig: PioConfig = {
  enable: true, // 启用看板娘
  models: ["/pio/models/NOIR/noir.model3.json"], // 默认模型路径
  position: "left", // 模型位置
  width: 280, // 默认宽度
  height: 250, // 默认高度
  mode: "draggable", // 默认为可拖拽模式
  hiddenOnMobile: true, // 默认在移动设备上隐藏
  hideAboutMenu: false, // 隐藏内置 About 菜单按钮
  dialog: {
    welcome: "Welcome to Mizuki Website!", // 欢迎词
    touch: [
      "What are you doing?",
      "Stop touching me!",
      "HENTAI!",
      "Don't bully me like that!",
    ], // 触摸提示
    home: "Click here to go back to homepage!", // 首页提示
    skin: ["Want to see my new outfit?", "The new outfit looks great~"], // 换装提示
    close: "QWQ See you next time~", // 关闭提示
    link: "https://github.com/LyraVoid/Mizuki", // 关于链接
  },
};
```

### enable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否启用看板娘功能。设为 `false` 将完全禁用看板娘。

### models

- **类型**: `string[]`
- **默认值**: `["/pio/models/NOIR/noir.model3.json"]`
- **说明**: 模型路径数组。支持多个模型，用户可切换。路径相对于 `public` 目录。

### position

- **类型**: `"left" | "right"`
- **默认值**: `"left"`
- **说明**: 看板娘显示位置。

| 值 | 说明 |
|----|------|
| `left` | 显示在页面左侧 |
| `right` | 显示在页面右侧 |

### width

- **类型**: `number`
- **默认值**: `280`
- **说明**: 看板娘显示宽度（像素）。

### height

- **类型**: `number`
- **默认值**: `250`
- **说明**: 看板娘显示高度（像素）。

### mode

- **类型**: `"static" | "fixed" | "draggable"`
- **默认值**: `"draggable"`
- **说明**: 展现模式。

| 值 | 说明 |
|----|------|
| `draggable` | 可拖拽模式，用户可自由移动看板娘位置 |
| `fixed` | 固定模式，看板娘固定在配置的位置 |
| `static` | 静态模式，看板娘以静态方式展示 |

### hiddenOnMobile

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在移动设备上隐藏看板娘。建议开启以提升移动端性能和体验。

### hideAboutMenu

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否隐藏内置的 About 菜单按钮。

### dialog

- **类型**: `object`
- **说明**: 对话内容配置，用于自定义看板娘的交互对话。

#### dialog.welcome

- **类型**: `string | string[]`
- **说明**: 欢迎词，页面加载时显示。支持单个字符串或字符串数组。

#### dialog.touch

- **类型**: `string | string[]`
- **说明**: 触摸提示，用户点击看板娘时显示。支持单个字符串或字符串数组（随机显示）。

#### dialog.home

- **类型**: `string`
- **说明**: 首页提示，点击时跳转到首页。

#### dialog.skin

- **类型**: `[string, string]`
- **说明**: 换装提示元组，格式为 `[切换前提示, 切换后提示]`。

#### dialog.close

- **类型**: `string`
- **说明**: 关闭提示，关闭看板娘时显示。

#### dialog.link

- **类型**: `string`
- **说明**: 关于链接，点击关于按钮时跳转。

#### dialog.custom

- **类型**: `Array<{ selector: string; type: "read" | "link"; text?: string }>`
- **说明**: 自定义对话配置。通过 CSS 选择器匹配页面元素，当用户点击匹配的元素时触发对话。
  - `selector`：CSS 选择器
  - `type`：类型，`"read"` 为读取文本，`"link"` 为跳转链接
  - `text`：自定义显示文本（可选）

### tips

- **类型**: `object`
- **说明**: 提示气泡配置，用于在看板娘旁显示循环提示信息。

#### tips.welcomeMessage

- **类型**: `string[]`
- **说明**: 欢迎语数组。

#### tips.messages

- **类型**: `string[]`
- **说明**: 循环提示内容数组。

#### tips.duration

- **类型**: `number`
- **说明**: 每条 tips 展示时长（毫秒）。

#### tips.interval

- **类型**: `number`
- **说明**: tips 循环间隔（毫秒）。

### menus

- **类型**: `object`
- **说明**: 菜单配置，用于自定义看板娘的菜单项。

#### menus.items

- **类型**: `Array<{ icon?: string; label: string; action: string }>`
- **说明**: 菜单项数组。
  - `icon`：Iconify 图标名称（可选）
  - `label`：无障碍标题
  - `action`：预定义动作名称

#### menus.align

- **类型**: `"left" | "right"`
- **说明**: 菜单对齐方式。

## 配置示例

### 多模型切换

```typescript
export const pioConfig: PioConfig = {
  enable: true,
  models: [
    "/pio/models/NOIR/noir.model3.json",
    "/pio/models/PIKO/piko.model3.json",
  ],
  position: "right",
  width: 300,
  height: 280,
  mode: "draggable",
  hiddenOnMobile: true,
  hideAboutMenu: false,
  dialog: {
    welcome: "欢迎来到我的博客！",
    touch: ["你在干什么？", "不要碰我啦！", "HENTAI！", "别欺负我啦！"],
    home: "点击这里回到首页哦~",
    skin: ["想看我的新衣服吗？", "新衣服好看吗~"],
    close: "下次再见啦~",
    link: "https://github.com/LyraVoid/Mizuki",
  },
};
```

### 固定模式配置

```typescript
export const pioConfig: PioConfig = {
  enable: true,
  models: ["/pio/models/NOIR/noir.model3.json"],
  position: "left",
  width: 250,
  height: 220,
  mode: "fixed",
  hiddenOnMobile: true,
  hideAboutMenu: true,
  dialog: {
    welcome: "Hi~ Welcome!",
    touch: ["别戳我！"],
    home: "回到首页~",
    skin: ["换装时间到！"],
    close: "拜拜~",
    link: "",
  },
};
```

## 模型文件说明

Live2D 模型文件需要放置在 `public/pio/models/` 目录下。每个模型文件夹通常包含：

```
public/pio/models/
└── NOIR/
    ├── noir.model3.json    # 模型配置文件
    ├── noir.moc3           # 模型数据文件
    ├── textures/           # 贴图文件夹
    └── motions/            # 动作文件夹
```

## 注意事项

1. 模型文件路径相对于 `public` 目录，确保文件放置在正确位置。
2. 大型模型文件可能影响页面加载速度，建议优化模型文件大小。
3. `hiddenOnMobile` 建议设为 `true`，因为 Live2D 在移动设备上可能影响性能。
4. `mode` 设为 `"draggable"` 时，用户可以自由拖动看板娘，但位置不会保存。
5. 多个模型时，用户可通过切换按钮在不同模型之间切换。
