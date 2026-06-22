---
title: 本地构建
description: 如何在本地构建和预览 Mizuki 博客
---

本文介绍如何在本地环境中构建和预览 Mizuki 博客。

## 环境要求

- **Node.js**: 18.0 或更高版本
- **pnpm**: 8.0 或更高版本（推荐使用 corepack 安装）

## 安装依赖

```bash
# 启用 corepack（推荐）
corepack enable

# 克隆项目
git clone https://github.com/your-username/mizuki-blog.git
cd mizuki-blog

# 安装依赖
pnpm install
```

## 本地开发

启动开发服务器：

```bash
pnpm dev
```

开发服务器将在 `http://localhost:3000` 启动，并支持热模块替换（HMR）。

## 构建项目

```bash
pnpm build
```

构建完成后，静态文件将输出到 `dist` 目录。

:::tip[提示]
Mizuki 的构建过程会自动执行以下步骤：
1. 更新番剧数据
2. 构建 Astro 项目
3. 生成 Pagefind 搜索索引
4. 压缩字体文件
:::

## 预览构建结果

构建完成后，可以在本地预览：

```bash
pnpm preview
```

预览服务器将在 `http://localhost:4321` 启动。

## 其他常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览构建结果 |
| `pnpm check` | 运行 Astro 类型检查 |
| `pnpm type-check` | 运行 TypeScript 类型检查 |
| `pnpm lint` | 代码检查 |
| `pnpm format` | 代码格式化 |
| `pnpm new-post` | 创建新文章 |

## 内容同步

如果你使用内容分离功能，可以在构建前同步内容：

```bash
# 手动同步内容
pnpm sync-content
```

:::note[注意]
`pnpm dev` 和 `pnpm build` 命令会自动执行内容同步，无需手动运行。
:::

## 环境变量配置

创建 `.env` 文件配置环境变量：

```txt
# 内容同步配置
ENABLE_CONTENT_SYNC=true
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git
USE_SUBMODULE=false

# 番剧更新配置（可选）
BILIBILI_UID=你的B站UID
```

## 常见问题

### 构建失败

如果构建失败，请尝试：

```bash
# 清除缓存
rm -rf node_modules dist .astro

# 重新安装依赖
pnpm install

# 重新构建
pnpm build
```

### 端口被占用

如果端口 3000 被占用，可以在 `astro.config.mjs` 中修改：

```javascript
server: {
  port: 3001, // 修改为其他端口
},
```

### 内存不足

如果构建时出现内存不足错误：

```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

:::caution[注意]
本地构建的 `dist` 目录可以部署到任何静态文件托管服务，包括 Nginx、Apache、Cloudflare Pages 等。
:::
