---
title: 部署到 Vercel
description: 如何将 Mizuki 博客部署到 Vercel
---

Vercel 是推荐的 Mizuki 部署平台之一，提供免费的静态网站托管服务。

## 通过网站 UI 部署

1. 将你的代码推送到在线 Git 存储库（GitHub、GitLab、BitBucket 等）
2. [导入你的项目](https://vercel.com/new) 至 Vercel
3. Vercel 将自动检测 Astro 项目并配置正确的设置
4. 你的应用程序已部署完成！（例如：`astro.vercel.app`）

部署后，所有后续推送到生产分支外的分支都将自动生成**预览部署**，对生产分支的更改将自动部署为**生产部署**。

## 通过 CLI 部署（推荐）

1. 安装 [Vercel CLI](https://vercel.com/docs/cli) 并运行 `vercel` 进行部署：

```bash
pnpm add -g vercel
vercel
```

2. Vercel 将自动检测 Astro 项目并配置正确的设置
3. 当被问及 `Want to override the settings? [y/N]` 时，选择 N
4. 你的应用程序已部署完成！

## 使用 vercel.json 配置项目

你可以使用 `vercel.json` 来覆盖 Vercel 的默认行为并配置其他设置。

详细请参考 [Vercel 文档的项目配置](https://vercel.com/docs/project-configuration)。

## 环境变量配置

如果需要配置环境变量，可以在 Vercel 项目设置中添加：

1. 进入项目 Settings
2. 选择 Environment Variables
3. 添加所需的环境变量

:::tip[提示]
建议通过 Vercel 的环境变量功能配置敏感信息，而不是将 `.env` 文件提交到 Git。
:::

## 内容分离模式

如果使用内容分离功能（独立内容仓库），需要在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 值 | 说明 |
|-------|---|------|
| `ENABLE_CONTENT_SYNC` | `true` | 启用内容分离 |
| `CONTENT_REPO_URL` | `https://github.com/...` | 内容仓库地址 |
| `USE_SUBMODULE` | `false` | 推荐在 Vercel 上使用 `false` |

:::caution[重要提示]
如果使用 `USE_SUBMODULE=true`，请确保 `.gitignore` 中的 `content/` 行已被注释掉，否则会导致部署失败。推荐在 Vercel 上使用 `USE_SUBMODULE=false`（独立仓库模式）。
:::

### 私有内容仓库

**方式 A：授权 Vercel 访问**

在连接 GitHub 仓库时，确保授权包括内容仓库的访问权限。

**方式 B：使用 Token**

添加环境变量：

```
ENABLE_CONTENT_SYNC=true
GITHUB_TOKEN=ghp_your_personal_access_token
CONTENT_REPO_URL=https://${GITHUB_TOKEN}@github.com/your-username/Mizuki-Content-Private.git
USE_SUBMODULE=true
```

更多详情请参考 [内容分离配置](/mizuki/other/separation/)。
