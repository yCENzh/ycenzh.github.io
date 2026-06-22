---
title: Twikoo 评论系统
description: 配置 Twikoo 评论系统
---

Twikoo 是一个简洁、安全的评论系统，支持多种部署方式，适合个人博客使用。

## 配置位置

评论系统配置位于 src/config/commentConfig.ts 文件中。

## 配置项详解

```typescript
// src/config/commentConfig.ts
import type { CommentConfig } from "../types/config";
import { SITE_LANG } from "./siteConfig";

export const commentConfig: CommentConfig = {
  enable: false, // 启用评论功能
  system: "twikoo", // 评论系统选择: "twikoo" | "giscus"
  twikoo: {
    envId: "https://twikoo.vercel.app",
    lang: SITE_LANG,
  },
};
```

### enable

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否启用评论功能。设为 `false` 时评论组件将不会显示。

### system

- **类型**: `"twikoo" | "giscus"`
- **默认值**: `"twikoo"`
- **说明**: 选择评论系统类型

### twikoo.envId

- **类型**: `string`
- **必填**: 是
- **说明**: Twikoo 服务端部署地址

### twikoo.lang

- **类型**: `string`
- **默认值**: 站点语言（`SITE_LANG`）
- **说明**: 评论界面语言

支持的语言：

| 语言 | 说明 |
|------|------|
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en` | 英语 |
| `ja` | 日语 |

### 文章级评论控制

你可以在文章的 frontmatter 中设置 `comment` 字段来单独控制某篇文章是否显示评论：

```yaml
---
title: 文章标题
comment: false  # 禁用本篇文章的评论
---
```

## 部署 Twikoo 服务端

### 方式一：Vercel 部署（推荐）

1. **Fork Twikoo 仓库**

   访问 [Twikoo 仓库](https://github.com/imaegoo/twikoo)，点击 Fork 按钮。

2. **登录 Vercel**

   访问 [Vercel](https://vercel.com/) 并登录。

3. **导入项目**

   - 点击 "New Project"
   - 选择 Fork 的 Twikoo 仓库
   - 点击 "Deploy"

4. **获取环境 ID**

   部署完成后，Vercel 会分配一个域名（如 `xxx.vercel.app`），这就是你的 `envId`。

### 方式二：腾讯云部署

1. **注册腾讯云账号**

   访问 [腾讯云](https://cloud.tencent.com/) 注册账号。

2. **创建云开发环境**

   - 进入云开发控制台
   - 创建新环境
   - 记录环境 ID

3. **配置环境变量**

   在云开发环境中配置必要的环境变量。

### 方式三：Railway 部署

1. **登录 Railway**

   访问 [Railway](https://railway.app/) 并登录。

2. **部署项目**

   - 选择 "Deploy from GitHub repo"
   - 选择 Twikoo 仓库
   - 点击 "Deploy Now"

## 完整配置示例

```typescript
// src/config/commentConfig.ts
export const commentConfig = {
  enable: true,
  system: "twikoo",
  twikoo: {
    envId: "https://your-app.vercel.app",
    lang: "zh-CN",
  },
};
```

## 文章级控制

在文章的 frontmatter 中可以单独控制评论功能：

```yaml
---
title: 文章标题
comment: false  # 禁用当前文章的评论
---
```

## 评论管理

### 访问管理面板

1. 在评论区域点击右上角的设置图标
2. 输入管理员密码
3. 进入管理面板

### 管理功能

- **评论审核**: 审核待发布的评论
- **评论管理**: 编辑、删除、置顶评论
- **垃圾评论**: 标记和清理垃圾评论
- **数据导入导出**: 支持从其他评论系统迁移
