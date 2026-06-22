---
title: 部署到 Netlify
description: 如何将 Mizuki 博客部署到 Netlify
---

Netlify 是一个流行的静态网站托管平台，提供免费的静态网站托管服务。

## 网站 UI 部署方式

1. 在 [Netlify dashboard](https://app.netlify.com/) 页面上，点击 **Add a new site**
2. 选择 **Import an existing project**
3. 从 Git 提供商中导入 Astro 仓库，Netlify 会自动检测并预填充正确的配置设置
4. 确保已输入以下设置，然后按下 **Deploy** 按钮：
   - **Build Command**: `astro build` 或 `npm run build`
   - **Publish directory**: `dist`
5. 部署后，你将被重定向到站点概览页面

根据你的部署配置，未来对源代码库的任何修改都将触发预览和生产部署。

## 使用 netlify.toml 配置

你可以在项目仓库的顶层创建 `netlify.toml` 文件来配置构建设置：

```toml
[build]
  command = "pnpm run build"
  publish = "dist"
```

更多信息可以在 Netlify 的博客文章 [部署现有的 Astro Git 仓库](https://www.netlify.com/blog/how-to-deploy-astro/#deploy-an-existing-git-repository-to-netlify) 中找到。

## CLI 部署方式

你也可以通过 Netlify CLI 来部署：

1. 全局安装 Netlify CLI 工具：

```bash
npm install --global netlify-cli
```

2. 运行 `netlify login` 并按照指示进行登录并授权 Netlify
3. 运行 `netlify init` 并按照指示进行操作
4. 确认你的构建命令 (`astro build`)
5. 推送到 Git 来触发构建和部署

CLI 将自动检测构建设置（`astro build`）和部署目录（`dist`），并将提供一个自动生成的 `netlify.toml` 文件。

:::tip[提示]
CLI 将向仓库添加一个部署密钥，这意味着每次你使用 `git push` 时，你的网站都会在 Netlify 上自动重新构建。
:::
