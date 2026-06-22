---
title: 内容分离配置
description: Mizuki 主题内容分离完整配置指南，支持本地模式与独立仓库模式
---

本指南详细说明如何在 Mizuki 中使用内容分离功能，包括基础配置、私有仓库、CI/CD 部署等所有场景。

## 快速开始

### 新手推荐：本地模式（最简单）

**不需要任何配置**，直接开始使用：

```bash
# 克隆项目
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki

# 安装依赖
pnpm install

# 直接开发
pnpm dev
```

内容存放在 `src/content/` 和 `public/images/` 目录，与代码一起管理。

### 进阶：启用内容分离

如果需要将内容独立管理（多人协作、私有内容、独立版本控制），按以下步骤配置：

```bash
# 1. 创建 .env 文件
cp .env.example .env

# 2. 编辑 .env，启用内容分离
ENABLE_CONTENT_SYNC=true
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git

# 3. 同步内容
pnpm run sync-content

# 4. 启动开发
pnpm dev
```

---

## ENABLE_CONTENT_SYNC 控制开关

| 值 | 说明 | 适用场景 |
|----|------|----------|
| `false` 或未设置 | 禁用内容分离（默认） | 新手、个人博客、内容较少 |
| `true` | 启用内容分离 | 团队协作、私有内容、大量文章 |

---

## 环境变量配置

在 `.env` 文件中配置：

```txt
# 功能开关
ENABLE_CONTENT_SYNC=true

# 内容仓库地址（支持 HTTPS 和 SSH）
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git

# 内容目录路径（默认 ./content，一般无需改动）
CONTENT_DIR=./content
```

---

## 私有仓库配置

### 方式一：SSH 密钥（推荐）

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加公钥到 GitHub
cat ~/.ssh/id_ed25519.pub
# 复制公钥，添加到 GitHub Settings -> SSH keys

# 配置 .env
CONTENT_REPO_URL=git@github.com:your-username/Mizuki-Content-Private.git
```

### 方式二：HTTPS + Token

```bash
# 生成 GitHub Token
# Settings -> Developer settings -> Personal access tokens

# 配置 .env
CONTENT_REPO_URL=https://YOUR_TOKEN@github.com/your-username/Mizuki-Content-Private.git
```

---

## CI/CD 部署配置

### GitHub Actions

在 `.github/workflows/deploy.yml` 中配置：

```yaml
name: Deploy

on:
  push:
    branches:
      - main
  repository_dispatch:
    types:
      - content-updated

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build site
        run: pnpm build
        env:
          ENABLE_CONTENT_SYNC: true
          CONTENT_REPO_URL: ${{ secrets.CONTENT_REPO_URL }}
          USE_SUBMODULE: true
```

### Vercel

在 Vercel 项目设置中添加环境变量：

| 变量名 | 值 |
|-------|---|
| `ENABLE_CONTENT_SYNC` | `true` |
| `CONTENT_REPO_URL` | 内容仓库地址 |
| `USE_SUBMODULE` | `false` |

:::caution[注意]
Vercel 上推荐使用 `USE_SUBMODULE=false`，使用独立仓库模式。
:::

### Netlify

在 Netlify 项目设置中添加相同的环境变量。

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm run init-content` | 运行交互式初始化向导 |
| `pnpm run sync-content` | 手动同步内容仓库 |
| `pnpm dev` | 启动开发服务器（自动同步） |
| `pnpm build` | 构建项目（自动同步） |

---

## 故障排查

### 内容同步失败

**错误**: `fatal: repository not found`

**解决**:
- 检查 `CONTENT_REPO_URL` 是否正确
- 确认内容仓库存在且可访问
- 如果是私有仓库，检查认证配置

### 内容仓库更新后站点未重新部署

**解决**:
- 配置 Repository Dispatch 自动触发构建
- 详见 [自动构建触发](/mizuki/other/auto/)

### `.env` 文件不生效

**解决**:
- 确保 `.env` 文件在项目根目录
- 检查变量名是否正确（区分大小写）
- 重启开发服务器

---

## 相关文档

- [仓库结构](/mizuki/other/structure/)：内容仓库的推荐目录结构
- [自动构建](/mizuki/other/auto/)：内容更新时自动触发构建
- [错误排查](/mizuki/problem/error/)：常见错误解决方案
