---
title: 部署到 Cloudflare Pages
description: 如何将 Mizuki 博客部署到 Cloudflare Pages
---

Cloudflare Pages 提供全球 CDN 和免费的静态网站托管服务，是部署 Mizuki 博客的优秀选择。

## 通过网站 UI 部署

1. 将你的代码推送到 GitHub 或 GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages** > **Create** > **Pages** > **Connect to Git**
4. 选择你的仓库并配置以下设置：
   - **Framework preset**: Astro
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
5. 添加环境变量（可选）：
   - `NODE_VERSION`: `18` 或更高版本
6. 点击 **Save and Deploy**

部署完成后，Cloudflare 会自动分配一个 `*.pages.dev` 域名。

## 使用 Wrangler CLI 部署

### 安装 Wrangler

```bash
pnpm add -g wrangler
```

### 登录 Cloudflare

```bash
wrangler login
```

### 构建并部署

```bash
# 构建项目
pnpm build

# 部署到 Cloudflare Pages
wrangler pages deploy dist --project-name=mizuki-blog
```

## 自定义域名配置

1. 进入 Cloudflare Pages 项目设置
2. 选择 **Custom domains**
3. 添加你的域名
4. 按照提示配置 DNS 记录

:::tip[提示]
如果域名已在 Cloudflare 管理，DNS 配置会自动完成。
:::

## 环境变量配置

在 Cloudflare Pages 项目设置中可以配置环境变量：

1. 进入项目 **Settings** > **Environment variables**
2. 添加生产环境和预览环境的变量

常用环境变量：

| 变量名 | 说明 |
|--------|------|
| `NODE_VERSION` | Node.js 版本 |
| `ENABLE_CONTENT_SYNC` | 是否启用内容同步 |
| `CONTENT_REPO_URL` | 内容仓库地址 |

## 预览部署

Cloudflare Pages 会为每个非生产分支的推送自动创建预览部署，方便你在合并前测试更改。

:::caution[注意]
确保 `astro.config.mjs` 中的 `site` 配置为你的实际域名，否则 RSS、Sitemap 等功能可能无法正常工作。
:::

# 部署到 Cloudflare Worker
- 参照 https://fuwari.oh1.top/posts/Essay/fuwari_develop/ 

部署到`worker`,可以使用高级的自定义路由,适合将项目改造为全栈