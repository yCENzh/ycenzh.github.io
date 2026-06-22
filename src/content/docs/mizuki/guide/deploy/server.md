---
title: 服务器部署
description: 如何将 Mizuki 博客部署到自己的服务器
---

本文介绍如何将 Mizuki 博客部署到自己的服务器上，适合需要完全控制部署环境的用户。

## 环境要求

- **Node.js**: 18.0 或更高版本
- **pnpm**: 8.0 或更高版本
- **Web 服务器**: Nginx、Apache 或 Caddy

## 构建项目

### 本地构建后上传

```bash
# 克隆项目
git clone https://github.com/your-username/mizuki-blog.git
cd mizuki-blog

# 安装依赖
pnpm install

# 构建项目
pnpm build
```

构建完成后，`dist` 目录包含所有静态文件。

### 上传到服务器

使用 `scp` 或 `rsync` 上传：

```bash
# 使用 scp
scp -r dist/* user@your-server:/var/www/mizuki/

# 使用 rsync（推荐）
rsync -avz --delete dist/ user@your-server:/var/www/mizuki/
```

## Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/mizuki;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 静态资源缓存
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # 自定义 404 页面
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

## Apache 配置

在项目根目录创建 `.htaccess` 文件：

```apache
# 启用 URL 重写
RewriteEngine On

# 强制 HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 缓存静态资源
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Caddy 配置

```txt
your-domain.com {
    root * /var/www/mizuki
    file_server
    try_files {path} {path}/ {path}/index.html

    header /_astro/* Cache-Control "public, max-age=31536000, immutable"
    header /assets/* Cache-Control "public, max-age=31536000, immutable"

    encode gzip
}
```

## 自动化部署

### 使用 GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm build

      - name: Deploy to server
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          SOURCE: "dist/"
          TARGET: "/var/www/mizuki"
```

需要在 GitHub 仓库的 Secrets 中配置：

| Secret 名称 | 说明 |
|-------------|------|
| `SSH_PRIVATE_KEY` | SSH 私钥 |
| `REMOTE_HOST` | 服务器地址 |
| `REMOTE_USER` | 服务器用户名 |

:::caution[注意]
确保服务器已安装 Node.js 和 pnpm，或者在本地构建后上传 `dist` 目录。
:::

## HTTPS 配置

建议使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```
