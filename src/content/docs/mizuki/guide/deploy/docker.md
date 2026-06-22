---
title: Docker 部署
description: 如何使用 Docker 部署 Mizuki 博客
---

使用 Docker 部署 Mizuki 博客可以实现环境隔离、快速部署和轻松扩展。

## 前提条件

- 已安装 Docker（推荐使用最新稳定版）
- 已安装 pnpm（Mizuki 使用的包管理器）

## 准备工作

### 安装 Docker

在 Ubuntu/Debian 系统上安装 Docker：

```bash
sudo apt update
sudo apt install docker.io -y
```

安装完成后，确保 Docker 服务已启动：

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 准备项目文件

将 Mizuki 项目克隆到本地：

```bash
git clone https://github.com/matsuzaka-yuki/Mizuki.git
cd Mizuki
```

---

## 创建 Docker 配置文件

### 1. 创建 .dockerignore 文件

在项目根目录创建 `.dockerignore` 文件：

```txt
.git
node_modules
dist
.gitignore
Dockerfile
.dockerignore
.vscode
.github
docs
scripts
.astro
frontmatter.json
pagefind.yml
vercel.json
```

### 2. 创建 Dockerfile

在项目根目录创建 `Dockerfile` 文件：

```dockerfile
# 使用 Node.js 官方镜像作为基础镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建项目
RUN pnpm run build || pnpm exec astro build && pnpm exec pagefind --site dist

# 使用 nginx 作为运行时镜像
FROM nginx:alpine

# 复制构建结果到 nginx 的 html 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 设置文件权限
RUN chmod -R 755 /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html/

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口 80
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 3. 创建 nginx.conf

在项目根目录创建 `nginx.conf` 文件：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # 支持前端路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 构建 Docker 镜像

完成上述配置后，使用以下命令构建 Docker 镜像：

```bash
docker build -t mizuki-blog .
```

:::tip[提示]
- `-t mizuki-blog`：为构建的镜像添加标签，命名为 mizuki-blog
- `.`：表示使用当前目录作为构建上下文
:::

---

## 运行容器

使用以下命令运行容器：

```bash
docker run -d --name mizuki-blog -p 5090:80 mizuki-blog
```

:::tip[提示]
- `-d`：在后台运行容器
- `--name mizuki-blog`：为容器指定名称
- `-p 5090:80`：将主机的 5090 端口映射到容器的 80 端口
:::

---

## 访问应用

容器启动成功后，可以通过以下地址访问博客：

- 本地访问：`http://localhost:5090`
- 远程访问：`http://服务器IP地址:5090`

---

## Docker Compose

创建 `docker-compose.yml` 文件来简化部署：

```yaml
version: '3'

services:
  mizuki-blog:
    build: .
    container_name: mizuki-blog
    ports:
      - "5090:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

使用 Docker Compose 启动：

```bash
docker compose up -d
```

---

## 自动更新脚本

```bash
#!/bin/bash

# 构建 Docker 镜像
echo "正在构建 Docker 镜像..."
docker build -t mizuki-blog .

# 检查是否有正在运行的容器并停止
echo "检查是否有正在运行的容器..."
container_id=$(docker ps -q --filter "name=mizuki-blog")

if [ -n "$container_id" ]; then
  echo "停止正在运行的容器: $container_id"
  docker stop $container_id
  docker rm $container_id
fi

# 运行新容器
echo "启动新容器..."
docker run -d -p 5090:80 --name mizuki-blog mizuki-blog
```

---

## 常见问题

### 端口冲突

如果端口 5090 已被占用，可以修改端口映射：

```bash
docker run -d --name mizuki-blog -p 8080:80 mizuki-blog
```

### 构建失败

如果构建失败，可能是由于：
1. 网络问题 - 检查网络连接
2. 依赖安装失败 - 尝试更新 Dockerfile 中的 Node.js 版本
3. 权限问题 - 确保当前用户有 Docker 权限

### 容器无法访问

1. 检查容器是否正在运行：`docker ps`
2. 检查端口映射是否正确
3. 查看容器日志：`docker logs mizuki-blog`

---

## 相关文档

- [服务器部署](/mizuki/guide/deploy/server/)：传统服务器部署方式
- [Vercel 部署](/mizuki/guide/deploy/vercel/)：推荐的云平台部署
- [本地构建](/mizuki/guide/deploy/local/)：本地构建和预览
