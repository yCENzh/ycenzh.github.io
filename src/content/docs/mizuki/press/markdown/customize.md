---
title: Markdown 增强功能
description: Mizuki 主题提供的 Markdown 增强语法，包括 GitHub 卡片、提示框、剧透等内容
---

Mizuki 主题在标准 Markdown 基础上提供了多种增强语法，让文章内容更加丰富和交互化。

## GitHub 仓库卡片

可以动态展示 GitHub 仓库信息的卡片，页面加载时会自动从 GitHub API 获取仓库数据。

### 语法

```markdown
::github{repo="用户名/仓库名"}
```

### 示例

```markdown
::github{repo="LyraVoid/Mizuki"}
```

渲染效果将显示一个包含仓库名称、描述、星标数等信息的精美卡片。

### 注意事项

- 需要提供完整的 `用户名/仓库名` 格式
- 卡片信息来自 GitHub API，需确保仓库为公开状态
- 卡片会自动适配深色/浅色主题

## 提示框（Admonitions）

提示框用于突出显示不同类型的信息，支持五种内置类型。

### 基础语法

使用三个冒号 `:::` 包裹提示框内容：

```markdown
:::note
高亮用户应该注意的信息，即使在快速浏览时。
:::

:::tip
帮助用户更成功的可选信息。
:::

:::important
用户成功所必需的关键信息。
:::

:::warning
由于潜在风险需要用户立即关注的关键内容。
:::

:::caution
某个操作可能带来的负面后果。
:::
```

### 渲染效果

:::note
高亮用户应该注意的信息，即使在快速浏览时。
:::

:::tip
帮助用户更成功的可选信息。
:::

:::important
用户成功所必需的关键信息。
:::

:::warning
由于潜在风险需要用户立即关注的关键内容。
:::

:::caution
某个操作可能带来的负面后果。
:::

### 自定义标题

可以自定义提示框的标题：

```markdown
:::note[自定义标题]
这是一个带有自定义标题的提示框。
:::
```

渲染效果：

:::note[自定义标题]
这是一个带有自定义标题的提示框。
:::

### GitHub 兼容语法

Mizuki 主题同时支持 GitHub 风格的提示框语法：

```markdown
> [!NOTE]
> 这是 GitHub 风格的注意提示。

> [!TIP]
> 这是 GitHub 风格的技巧提示。

> [!IMPORTANT]
> 这是 GitHub 风格的重要提示。

> [!WARNING]
> 这是 GitHub 风格的警告提示。

> [!CAUTION]
> 这是 GitHub 风格的危险提示。
```

渲染效果：

> [!NOTE]
> 这是 GitHub 风格的注意提示。

> [!TIP]
> 这是 GitHub 风格的技巧提示。

> [!IMPORTANT]
> 这是 GitHub 风格的重要提示。

> [!WARNING]
> 这是 GitHub 风格的警告提示。

> [!CAUTION]
> 这是 GitHub 风格的危险提示。

## 折叠剧透

使用剧透语法可以创建默认折叠的内容，用户需要点击才能查看。

### 语法

```markdown
:spoiler[这是隐藏的文字内容]
```

### 示例

```markdown
答案是 :spoiler[42]，这是宇宙的终极答案。
```

渲染时，`:spoiler[42]` 部分会以模糊效果显示，用户点击后才会揭示具体内容。

### 适用场景

- 谜底或答案
- 剧透内容
- 需要用户主动确认才能查看的敏感信息
- 游戏攻略或提示

## 数学公式增强

Mizuki 主题使用 KaTeX 渲染数学公式，支持完整的 LaTeX 数学语法。

### 行内公式

```markdown
质能方程 $E = mc^2$ 是物理学的基础。
```

### 块级公式

```markdown
$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$
```

### 常用公式示例

#### 矩阵

```markdown
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

#### 分段函数

```markdown
$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$
```

## 注意事项

1. 增强语法均基于 Mizuki 主题内置的插件实现
2. GitHub 仓库卡片依赖外部 API，请确保网络可访问
3. 提示框支持嵌套，但不建议过度嵌套
4. 剧透内容在 RSS 订阅和搜索引擎中可能被直接显示
5. 数学公式使用 KaTeX 引擎，支持大部分 LaTeX 数学语法
