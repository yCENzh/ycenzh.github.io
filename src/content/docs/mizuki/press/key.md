---
title: 文章加密
description: Mizuki 主题文章密码保护功能，控制文章的访问权限和内容可见性
---

Mizuki 主题支持文章级别的密码保护功能，可以为特定文章设置访问密码，保护私密内容。

## 启用加密

在文章的 frontmatter 中添加加密相关字段：

```yaml
---
title: 私密文章
published: 2024-01-15
description: 这是一篇加密文章
encrypted: true
password: "mypassword123"
passwordHint: "密码是我的生日"
---
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `encrypted` | boolean | ✅ | 设为 `true` 启用加密功能 |
| `password` | string | ✅ | 访问密码 |
| `passwordHint` | string | 可选 | 密码提示，显示在密码输入框下方 |
| `hideHomeContent` | boolean | 可选 | 是否隐藏公开摘要，默认 `true` |

## 完整示例

```yaml
---
title: 个人日记
published: 2024-06-01
description: 我的私人日记
encrypted: true
password: "diary2024"
passwordHint: "年份 + 日记的英文"
hideHomeContent: true
tags: [日记, 个人]
category: 生活
---

这是只有输入正确密码才能看到的内容...
```

## 加密效果

### 公开信息

加密文章在网站上会显示以下公开信息：

- ✅ 文章标题
- ✅ 发布日期
- ✅ 标签
- ✅ 分类
- ❌ 文章正文内容（被隐藏）

### 密码保护

- 访问加密文章时会显示密码输入界面
- 用户需输入正确密码才能查看完整内容
- 密码验证在客户端完成

### 首页摘要控制

`hideHomeContent` 字段控制是否在首页、标签页等列表中显示文章摘要：

```yaml
# 默认行为：设置 password 后自动隐藏摘要
hideHomeContent: true

# 显式允许显示摘要
hideHomeContent: false
```

:::warning
即使 `hideHomeContent` 设为 `false`，文章的完整内容仍然需要密码才能查看。这只影响列表中的摘要预览。
:::

## 使用场景

### 个人私密日记

```yaml
---
title: 2024年6月日记
encrypted: true
password: "mydiary6"
passwordHint: "我的日记 + 月份"
---
```

### 受邀阅读

```yaml
---
title: 项目内部文档
encrypted: true
password: "project2024"
passwordHint: "项目代号 + 年份"
---
```

### 试读内容

```yaml
---
title: 深度技术分析
encrypted: true
password: "premium"
passwordHint: "会员等级"
hideHomeContent: false
---
```

## 安全注意事项

:::caution
请注意以下安全限制：
:::

1. **客户端验证**：密码验证在浏览器端完成，技术用户可能通过查看源代码获取内容
2. **构建输出**：加密内容仍会包含在构建产物中
3. **RSS 订阅**：加密内容不会出现在 RSS 订阅中
4. **搜索引擎**：加密内容不会被搜索引擎索引
5. **API 访问**：加密内容不会出现在公开 API 响应中

:::tip
文章加密适合用于轻量级的内容保护场景，如个人笔记、团队内部分享等。如果需要严格的安全保护，建议使用服务端认证方案。
:::

## 密码管理建议

1. 使用有意义且容易记忆的密码
2. 善用 `passwordHint` 提供足够的提示
3. 避免在公开场合泄露密码
4. 定期更换敏感内容的密码
5. 不要在源代码仓库中存放敏感密码

## 注意事项

1. 加密功能仅保护文章正文，标题、日期等元数据仍为公开
2. 密码区分大小写
3. 加密文章不会出现在搜索结果中
4. 加密文章不会生成搜索引擎索引
5. 建议将加密文章的 `draft` 保持为 `false`，否则文章完全不可见
