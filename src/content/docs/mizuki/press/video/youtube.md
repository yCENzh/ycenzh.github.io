---
title: YouTube 视频嵌入
description: 在 Mizuki 主题文章中嵌入 YouTube 视频的方法和参数配置
---

Mizuki 主题支持在文章中嵌入 YouTube 视频，使用 iframe 方式实现。

## 基础用法

### 获取嵌入代码

1. 打开 YouTube 视频页面
2. 点击视频下方的 **分享** 按钮
3. 选择 **嵌入** 选项
4. 复制生成的 iframe 代码

### 基本嵌入

在 Markdown 文件中直接粘贴 iframe 代码：

```html
<iframe 
  width="100%" 
  height="468" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen
></iframe>
```

## 响应式嵌入

### 方式一：固定宽高比容器

```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
  ></iframe>
</div>
```

### 方式二：aspect-ratio 方式

```html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen
  style="width: 100%; aspect-ratio: 16/9;"
></iframe>
```

:::tip
`padding-bottom: 56.25%` 对应 16:9 的宽高比，这是 YouTube 视频的标准比例。
:::

## URL 参数

YouTube 播放器支持多种 URL 参数：

| 参数 | 说明 | 示例值 |
|------|------|--------|
| `autoplay` | 自动播放，0=否 1=是 | `0` |
| `mute` | 静音，0=否 1=是 | `0` |
| `controls` | 显示播放控件，0=否 1=是 | `1` |
| `loop` | 循环播放，0=否 1=是 | `0` |
| `start` | 开始时间（秒） | `30` |
| `end` | 结束时间（秒） | `120` |
| `playlist` | 循环播放时需要指定视频 ID | `VIDEO_ID` |
| `rel` | 结束时显示相关视频，0=否 1=是 | `0` |
| `modestbranding` | 减少 YouTube 品牌标识，0=否 1=是 | `1` |
| `cc_load_policy` | 默认显示字幕，0=否 1=是 | `1` |
| `hl` | 播放器界面语言 | `zh-CN` |

### 常用参数组合

#### 静音自动播放

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1"></iframe>
```

#### 从指定时间开始播放

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID?start=60&end=120"></iframe>
```

#### 隐藏控件 + 循环播放

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID?controls=0&loop=1&playlist=VIDEO_ID"></iframe>
```

## 获取视频 ID

YouTube 视频 ID 是 URL 中 `v=` 参数后面的字符串：

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                 ^^^^^^^^^^^^
                                 这就是视频 ID
```

也可以从分享链接中获取：

```
https://youtu.be/dQw4w9WgXcQ
                 ^^^^^^^^^^^^
                 视频 ID
```

## 播放列表嵌入

嵌入整个播放列表：

```html
<iframe 
  src="https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID" 
  frameborder="0" 
  allowfullscreen
></iframe>
```

## 完整示例

```markdown
---
title: 视频教程
published: 2024-01-15
description: 包含 YouTube 视频的教程文章
tags: [教程, YouTube, 视频]
category: 学习
---

## 教程视频

以下是一个精彩的教程视频：

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
  <iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?start=30&cc_load_policy=1&hl=zh-CN" 
    title="教程视频" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
  ></iframe>
</div>

## 视频内容摘要

- 0:30 - 开场介绍
- 2:00 - 核心内容
- 5:00 - 实战演示
- 8:00 - 总结
```

## 多视频嵌入

同一篇文章可以嵌入多个视频：

```markdown
## 第一部分

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID_1" 
    frameborder="0" 
    allowfullscreen
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
  ></iframe>
</div>

## 第二部分

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID_2" 
    frameborder="0" 
    allowfullscreen
    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
  ></iframe>
</div>
```

## 注意事项

1. **协议**：使用 `https://` 开头确保安全性
2. **自动播放**：大多数浏览器限制自动播放，需要配合 `mute=1` 才能生效
3. **性能**：同一页面嵌入过多视频会影响性能，建议按需加载
4. **隐私**：可使用 `youtube-nocookie.com` 域名增强隐私保护：

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"></iframe>
```

5. **版权**：嵌入视频前请确认视频的分享权限
6. **地区限制**：部分视频可能存在地区访问限制
7. **字幕**：使用 `cc_load_policy=1` 默认显示字幕
8. **语言**：使用 `hl=zh-CN` 设置播放器界面语言为中文
