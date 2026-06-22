---
title: 关于页面
description: Mizuki 主题关于页面配置指南，包括内容编写、GitHub 卡片、注意框等高级语法
---

关于页面用于展示站长的个人介绍、技能、经历等信息，是博客中最重要的个人展示页面之一。

## 页面结构

关于页面的内容从 `src/content/spec/about.md` 文件中读取，使用 Markdown 格式编写，由 `src/pages/about.astro` 渲染。

```
src/
├── content/
│   └── spec/
│       └── about.md          ← 关于页面的 Markdown 内容
└── pages/
    └── about.astro           ← 页面渲染逻辑（通常无需修改）
```

## 基本配置

在 `src/content/spec/about.md` 中编写关于页面的内容：

```markdown
# 关于我

你好！欢迎来到我的博客。

我是一名热爱技术的开发者，专注于 Web 开发和开源项目。

## 技能

- 前端开发：HTML、CSS、JavaScript、TypeScript
- 框架：React、Vue、Astro
- 后端：Node.js、Python
```

## 高级语法

### GitHub 卡片

使用 `::github` 语法可以在关于页面中嵌入 GitHub 仓库卡片：

```markdown
::github{repo="用户名/仓库名"}
```

示例：

```markdown
## 我的项目

::github{repo="withastro/astro"}
::github{repo="microsoft/vscode"}
```

### 注意框

支持类似 GitHub 风格的注意框语法：

```markdown
> [!NOTE]
> 这是一个提示框，用于展示一般信息。

> [!TIP]
> 这是一个技巧框，用于展示有用的建议。

> [!WARNING]
> 这是一个警告框，用于提醒需要注意的事项。
```

### 数学公式

支持 LaTeX 数学公式语法：

行内公式：`$E = mc^2$`

块级公式：

```markdown
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

### 图片

使用标准 Markdown 图片语法：

```markdown
![图片描述](/images/about/profile.webp)
```

## 注意事项

1. 关于页面的内容文件位于 `src/content/spec/about.md`，而不是 `src/content/posts/` 目录
2. `spec` 是一个特殊的内容集合，用于存储主题的特殊页面内容
3. 修改内容后需要重新构建才能看到效果
4. GitHub 卡片需要网络连接才能加载仓库信息
5. 页面支持评论功能，评论路径为 `/about/`
