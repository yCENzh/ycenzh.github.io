---
title: 错误排查
description: Mizuki 主题常见错误和问题的排查指南
---

本文档整理了 Mizuki 主题使用过程中可能遇到的常见错误和问题，以及相应的解决方案。

## 安装和依赖问题

### Error: Cannot find module 'xxx'

**原因**：缺少依赖包

**解决方案**：
```bash
# 清除缓存并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 如果是特定包缺失
pnpm install xxx
```

### Error: ERR_PNPM_PEER_DEP_ISSUES

**原因**：依赖版本冲突

**解决方案**：
```bash
# 方法 1：忽略 peer 依赖
pnpm install --no-strict-peer-dependencies

# 方法 2：使用 --force
pnpm install --force

# 方法 3：检查并更新依赖
pnpm outdated
pnpm update
```

### Error: EACCES permission denied

**原因**：权限不足

**解决方案**：
```bash
# Linux/Mac
sudo chown -R $(whoami) ~/.pnpm-store
sudo chown -R $(whoami) node_modules

# Windows
# 以管理员身份运行 PowerShell
```

---

## 开发服务器问题

### Error: listen EADDRINUSE: address already in use

**原因**：端口被占用

**解决方案**：
```bash
# 查找占用端口的进程
# Linux/Mac
lsof -i :4321

# Windows
netstat -ano | findstr :4321

# 杀死进程
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows

# 或使用其他端口
pnpm dev --port 3000
```

### Error: Module not found

**原因**：模块路径错误或模块不存在

**解决方案**：
```bash
# 检查导入路径是否正确
# 检查模块是否安装
pnpm list

# 清除缓存
rm -rf .astro node_modules
pnpm install
```

### Error: Unexpected token '<'

**原因**：HTML 文件被错误地作为 JavaScript 处理

**解决方案**：
1. 检查文件扩展名是否正确
2. 检查导入语句是否正确
3. 检查 Astro 组件语法

---

## 构建问题

### Error: Build failed

**原因**：构建过程中出现错误

**解决方案**：
```bash
# 查看详细错误信息
pnpm build --verbose

# 清除构建缓存
rm -rf dist .astro
pnpm build
```

### Error: JavaScript heap out of memory

**原因**：内存不足

**解决方案**：
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# 或在 package.json 中设置
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' astro build"
  }
}
```

### Error: Static page generation failed

**原因**：静态页面生成失败

**解决方案**：
1. 检查页面代码是否有错误
2. 检查数据获取是否正确
3. 检查 Markdown 文件格式

---

## 内容分离问题

### Error: 未启用内容分离功能

**原因**：`ENABLE_CONTENT_SYNC` 未设置或设置为 `false`

**解决方案**：
```bash
# 检查 .env 文件
cat .env

# 确保有以下配置
ENABLE_CONTENT_SYNC=true
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git
```

### Error: 未设置 CONTENT_REPO_URL

**原因**：启用了内容分离但未配置仓库地址

**解决方案**：
```bash
# 在 .env 中添加
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git
```

### Error: Git clone failed

**原因**：Git 克隆失败，可能是网络问题或权限问题

**解决方案**：
```bash
# 测试 Git 连接
git ls-remote https://github.com/your-username/Mizuki-Content.git

# 如果是私有仓库，确保配置了 SSH 密钥或 Token
ssh -T git@github.com

# 或使用 HTTPS + Token
CONTENT_REPO_URL=https://YOUR_TOKEN@github.com/your-username/Mizuki-Content.git
```

---

## 部署问题

### Error: 404 Not Found

**原因**：部署配置错误或文件路径问题

**解决方案**：
1. 检查部署平台的构建配置
2. 确保输出目录正确（通常是 `dist`）
3. 检查路由配置

```json
// Vercel 配置
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist"
}
```

### Error: Environment variable not found

**原因**：环境变量未配置

**解决方案**：
1. 在部署平台添加环境变量
2. 确保变量名正确
3. 重新部署

### Error: Build timeout

**原因**：构建时间过长

**解决方案**：
1. 优化构建配置
2. 使用缓存
3. 升级部署平台的套餐

---

## API 问题

### Error: Bangumi API 401 Unauthorized

**原因**：Access Token 无效或过期

**解决方案**：
```bash
# 检查 Token 是否正确
echo $BANGUMI_ACCESS_TOKEN

# 重新获取 Token
curl -X POST "https://bgm.tv/oauth/access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "refresh_token",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

### Error: Meting API 无法访问

**原因**：API 服务不可用或跨域问题

**解决方案**：
1. 检查 API 服务是否正常
2. 使用自建 Meting API
3. 配置代理

```typescript
// src/config/music.ts
export const musicConfig = {
  api: 'http://your-server:3000/',  // 自建 API
};
```

---

## 图片和媒体问题

### Error: 图片不显示

**原因**：图片路径错误或图片不存在

**解决方案**：
```bash
# 检查图片是否存在
ls -la public/images/posts/

# 检查图片路径是否正确
# 在 Markdown 中使用正确的路径
![图片](/images/posts/image.jpg)
```

### Error: 图片加载缓慢

**原因**：图片文件过大或网络问题

**解决方案**：
1. 压缩图片
2. 使用 WebP 格式
3. 使用懒加载
4. 使用 CDN

```bash
# 压缩图片
npx sharp-cli -i 'public/images/**/*.jpg' -o 'public/images/compressed' --quality 80

# 转换为 WebP
npx sharp-cli -i 'public/images/**/*.jpg' -o 'public/images/webp' --format webp
```

---

## 样式和布局问题

### Error: 样式不生效

**原因**：CSS 优先级或选择器错误

**解决方案**：
1. 检查选择器是否正确
2. 检查 CSS 是否被覆盖
3. 使用浏览器开发者工具调试

```css
/* 提高优先级 */
.my-component .title {
  color: red !important;
}
```

### Error: 布局错乱

**原因**：HTML 结构或 CSS 布局问题

**解决方案**：
1. 检查 HTML 结构
2. 检查 CSS 布局
3. 使用浏览器开发者工具调试

---

## 搜索问题

### Error: 搜索功能不工作

**原因**：Pagefind 索引未生成或配置错误

**解决方案**：
```bash
# 重新构建搜索索引
pnpm build

# 检查 Pagefind 配置
cat pagefind.yml

# 确保搜索索引文件存在
ls -la dist/pagefind/
```

### Error: 搜索结果不准确

**原因**：搜索索引需要更新

**解决方案**：
```bash
# 清除旧索引并重新构建
rm -rf dist/pagefind
pnpm build
```

---

## 评论系统问题

### Error: 评论加载失败

**原因**：评论系统配置错误或服务不可用

**解决方案**：
1. 检查评论系统配置
2. 检查服务是否正常
3. 检查网络连接

```typescript
// src/config/comment.ts
export const commentConfig = {
  twikoo: {
    enabled: true,
    envId: 'your-env-id',  // 确保配置正确
  },
};
```

---

## 性能问题

### 页面加载缓慢

**原因**：资源文件过大或请求过多

**解决方案**：
1. 优化图片
2. 启用压缩
3. 使用缓存
4. 减少请求

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
```

### 内存占用过高

**原因**：内存泄漏或资源未释放

**解决方案**：
1. 检查是否有内存泄漏
2. 优化代码
3. 增加服务器内存

---

## 调试技巧

### 使用浏览器开发者工具

1. 打开浏览器开发者工具（F12）
2. 查看 Console 面板的错误信息
3. 查看 Network 面板的请求状态
4. 查看 Elements 面板的 HTML 结构

### 查看构建日志

```bash
# 查看详细构建日志
pnpm build --verbose

# 查看开发服务器日志
pnpm dev --verbose
```

### 使用调试模式

```bash
# 启用调试模式
DEBUG=* pnpm dev

# 或特定模块
DEBUG=astro:* pnpm dev
```

---

## 获取帮助

如果以上方法都无法解决问题：

1. **搜索问题**：在 GitHub Issues 中搜索
2. **提交 Issue**：提供详细的错误信息
3. **社区讨论**：在 GitHub Discussions 中讨论

```bash
# 收集环境信息
node -v
pnpm -v
cat package.json
cat .env
```

> 💡 **提示**：遇到问题时不要慌张，仔细阅读错误信息，按照步骤排查，通常都能找到解决方案。
