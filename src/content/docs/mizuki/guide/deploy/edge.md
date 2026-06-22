---
title: 部署到 EdgeOne Pages
description: 如何将 Mizuki 博客部署到 EdgeOne Pages
---

EdgeOne Pages 是腾讯云提供的边缘计算和静态网站托管服务，特别适合面向中国大陆用户的网站。

## 通过网站 UI 部署

1. 将你的代码推送到 GitHub 或 GitLab
2. 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
3. 进入 **Pages** > **创建项目**
4. 选择 **关联 Git 仓库**
5. 配置构建设置：
   - **框架预设**: Astro
   - **构建命令**: `pnpm i && pnpm build`
   - **输出目录**: `dist`
   - **Node.js 版本**: 18 或更高
6. 点击 **开始部署**

## 使用 CLI 部署

### 安装 EdgeOne CLI

```bash
npm install -g @edgeone/cli
```

### 登录

```bash
edgeone login
```

### 构建并部署

```bash
# 构建项目
pnpm build

# 部署到 EdgeOne Pages
edgeone pages deploy dist --project-name=mizuki-blog
```

## 自定义域名配置

1. 在 EdgeOne Pages 项目中选择 **自定义域名**
2. 添加你的域名
3. 配置 CNAME 记录指向 EdgeOne 提供的域名

:::tip[提示]
EdgeOne 提供免费的 SSL 证书，域名配置完成后会自动签发。
:::

## 环境变量配置

在项目设置中可以配置环境变量：

1. 进入项目 **设置** > **环境变量**
2. 添加所需的变量

:::caution[注意]
EdgeOne Pages 目前仅支持静态站点部署。确保 `astro.config.mjs` 中 `output` 设置为 `"static"`。
:::

## 中国大陆访问优化

EdgeOne Pages 的主要优势是针对中国大陆网络的优化：

- **边缘节点**: 在中国大陆有大量边缘节点，访问速度更快
- **备案支持**: 支持已备案域名的接入
- **合规性**: 符合中国大陆的网络监管要求

:::note[注意]
使用自定义域名面向中国大陆用户提供服务，域名需要完成 ICP 备案。
:::
