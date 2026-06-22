---
title: Bilibili 视频嵌入
description: 在 Mizuki 主题文章中嵌入 Bilibili 视频的方法和参数配置
---

Mizuki 主题支持在文章中嵌入 Bilibili 视频，使用 iframe 方式实现。

## 基础用法

### 获取嵌入代码

1. 打开 Bilibili 视频页面
2. 点击视频下方的 **分享** 按钮
3. 选择 **嵌入代码** 选项
4. 复制生成的 iframe 代码

### 基本嵌入

在 Markdown 文件中直接粘贴 iframe 代码：

```html
<iframe 
  src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1" 
  scrolling="no" 
  border="0" 
  frameborder="no" 
  framespacing="0" 
  allowfullscreen="true"
  width="100%"
  height="500"
>
</iframe>
```

## 响应式嵌入

为了在不同设备上获得良好的显示效果，推荐使用响应式方式嵌入：

### 方式一：固定宽高比容器

```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe 
    src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
  ></iframe>
</div>
```

### 方式二：简单宽度适配

```html
<iframe 
  src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1" 
  scrolling="no" 
  border="0" 
  frameborder="no" 
  framespacing="0" 
  allowfullscreen="true"
  style="width: 100%; aspect-ratio: 16/9;"
></iframe>
```

## URL 参数

Bilibili 播放器支持多种 URL 参数来控制播放行为：

| 参数 | 说明 | 示例值 |
|------|------|--------|
| `bvid` | 视频 BV 号 | `BV1xx411c7mD` |
| `aid` | 视频 AV 号（旧版） | `170001` |
| `cid` | 分P 的 cid | `12345678` |
| `p` | 分P 编号，从 1 开始 | `1` |
| `autoplay` | 是否自动播放，0=否 1=是 | `0` |
| `danmaku` | 是否显示弹幕，0=否 1=是 | `1` |
| `high_quality` | 画质，0=默认 1=高画质 | `1` |
| `page` | 分P 编号（同 p） | `1` |

### 常用参数组合

#### 默认播放

```html
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1"></iframe>
```

#### 禁用弹幕 + 自动播放

```html
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1&autoplay=1&danmaku=0"></iframe>
```

#### 高画质播放

```html
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1&high_quality=1"></iframe>
```

## 分P视频

对于有多个分P的视频，使用 `p` 参数指定播放哪一集：

```html
<!-- 播放第1P -->
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1"></iframe>

<!-- 播放第2P -->
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=2"></iframe>

<!-- 播放第3P -->
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=3"></iframe>
```

## 完整示例

```markdown
---
title: 我的视频文章
published: 2024-01-15
description: 这是一篇包含 Bilibili 视频的文章
tags: [视频, Bilibili]
category: 娱乐
---

## 视频介绍

下面是一个精彩的视频：

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe 
    src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&p=1&high_quality=1" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
  ></iframe>
</div>

## 视频亮点

- 时间点 1:30 - 精彩瞬间
- 时间点 5:00 - 高潮部分
```

## 注意事项

1. **协议**：使用 `//` 开头的 URL，自动适配 HTTP/HTTPS
2. **移动端**：iframe 在移动端可能被浏览器限制自动播放
3. **性能**：同一页面不建议嵌入过多视频，可能影响加载速度
4. **弹幕**：默认开启弹幕，如不需要可通过 `danmaku=0` 关闭
5. **版权**：嵌入视频前请确认视频的分享权限
6. **BV 号**：优先使用 BV 号而非 AV 号，BV 号是 Bilibili 当前的标准格式
7. **宽高比**：Bilibili 视频默认为 16:9 宽高比
8. **外链限制**：部分视频可能禁止外站嵌入，此时 iframe 会显示错误信息
