---
title: 自动构建触发
description: 内容仓库更新时自动触发 Mizuki 代码仓库构建的配置指南
---

## 问题

启用内容分离后，内容仓库（Mizuki-Content）更新不会自动触发代码仓库（Mizuki）的重新部署。

## 解决方案（推荐）

使用 **Repository Dispatch** 让内容更新时自动触发构建，适用于所有部署平台。

---

## 5 步快速配置

### Step 1：创建 GitHub Token

访问：https://github.com/settings/tokens

- 点击 **Generate new token (classic)**
- Note：`Mizuki Content Trigger`
- Scopes：勾选 ✅ `repo`
- 点击生成并**复制 Token** ⚠️（只显示一次）

### Step 2：添加 Secret

在**内容仓库**（Mizuki-Content）：

Settings → Secrets and variables → Actions → New repository secret

- Name：`DISPATCH_TOKEN`
- Secret：粘贴刚才的 Token

### Step 3：修改触发器配置

编辑内容仓库的 `.github/workflows/trigger-build.yml`，找到第 27 行，修改为你的代码仓库：

```yaml
repository: your-username/Mizuki  # 改为你的
```

### Step 4：更新代码仓库工作流

编辑代码仓库的 `.github/workflows/deploy.yml`，在 `on:` 部分添加：

```yaml
on:
  push:
    branches:
      - main
  repository_dispatch:  # 添加这个
    types:
      - content-updated
  workflow_dispatch:
```

### Step 5：测试

在内容仓库推送一次：

```bash
git add .
git commit -m "test: trigger build"
git push
```

查看：
1. 内容仓库 Actions - 确认触发器运行
2. 代码仓库 Actions - 确认部署被触发

---

## 故障排查

### Token 问题

错误：`Bad credentials`

- 确认 Token 复制完整
- 确认 Token 有 `repo` 权限
- 重新生成 Token

### 仓库名称问题

错误：`Not Found`

- 确认格式：`owner/repo`（用斜杠分隔）
- 确认拼写正确

---

## 相关文档

- [内容分离配置](/mizuki/other/separation/)：基础配置
- [仓库结构](/mizuki/other/structure/)：内容仓库结构
- [错误排查](/mizuki/problem/error/)：常见错误解决方案
