---
title: 从 Halo 迁移
description: 将 Halo 博客迁移到 Mizuki 主题的详细指南
---

Halo 是一款现代化的开源博客系统。本文档介绍如何将 Halo 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Halo 数据

```bash
# 备份 Halo 数据目录
cp -r ~/.halo ~/halo-backup

# 或导出数据库
mysqldump -u root -p halo > halo-backup.sql
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 获取 Halo API Token

1. 登录 Halo 后台
2. 进入 设置 → 个人设置 → 令牌
3. 创建新令牌并复制

---

## 内容导出

### 方式 1：使用 Halo API

```bash
# 设置 Halo 地址和 Token
HALO_URL="http://your-halo-domain.com"
HALO_TOKEN="your-api-token"

# 导出文章列表
curl -H "Authorization: Bearer $HALO_TOKEN" \
  "$HALO_URL/apis/api.content.halo.run/v1alpha1/posts" \
  -o posts.json

# 导出单篇文章
curl -H "Authorization: Bearer $HALO_TOKEN" \
  "$HALO_URL/apis/api.content.halo.run/v1alpha1/posts/{slug}" \
  -o post-{slug}.json
```

### 方式 2：使用数据库导出

```bash
# 导出文章表
mysql -u root -p halo -e "SELECT * FROM posts INTO OUTFILE '/tmp/posts.csv'"

# 导出分类表
mysql -u root -p halo -e "SELECT * FROM categories INTO OUTFILE '/tmp/categories.csv'"

# 导出标签表
mysql -u root -p halo -e "SELECT * FROM tags INTO OUTFILE '/tmp/tags.csv'"
```

### 方式 3：使用 Halo 导出插件

安装并使用 Halo 的导出插件：

1. 登录 Halo 后台
2. 进入 插件 → 应用商店
3. 搜索并安装 "数据导出" 插件
4. 使用插件导出 Markdown 格式

---

## 格式转换

### 创建转换脚本

创建 `convert-halo.js`：

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 读取 Halo 导出的 JSON
const postsData = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));

const posts = postsData.items || postsData;

posts.forEach(post => {
  const frontmatter = {
    title: post.spec.title,
    description: post.spec.excerpt || post.spec.title,
    pubDate: new Date(post.spec.publishTime).toISOString().split('T')[0],
    updatedDate: post.spec.lastModifyTime ? 
      new Date(post.spec.lastModifyTime).toISOString().split('T')[0] : undefined,
    tags: post.spec.tags || [],
    category: post.spec.categories?.[0] || '',
    image: post.spec.cover || '',
    draft: !post.spec.publish
  };
  
  // 获取文章内容
  const content = post.spec.rawType === 'markdown' ? 
    post.spec.raw : 
    htmlToMarkdown(post.spec.raw);
  
  // 生成文件名
  const fileName = `${post.spec.slug}.md`;
  const filePath = path.join('./src/content/posts', fileName);
  
  // 写入文件
  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent);
  
  console.log(`✅ Converted: ${fileName}`);
});

// HTML 转 Markdown（简单实现）
function htmlToMarkdown(html) {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
```

### 运行转换

```bash
npm install gray-matter
node convert-halo.js
```

---

## 导入到 Mizuki

### 1. 复制转换后的内容

```bash
# 确保目录存在
mkdir -p src/content/posts
mkdir -p public/images/posts

# 复制文章
cp -r /path/to/converted/posts/* src/content/posts/

# 复制图片（从 Halo 上传目录）
cp -r ~/.halo/upload/* public/images/posts/
```

### 2. 整理分类和标签

```javascript
// organize-tags.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = './src/content/posts';
const allTags = new Set();
const allCategories = new Set();

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  
  if (data.tags) data.tags.forEach(tag => allTags.add(tag));
  if (data.category) allCategories.add(data.category);
});

console.log('所有标签:', [...allTags]);
console.log('所有分类:', [...allCategories]);
```

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: Halo 的附件如何处理？

A: Halo 的附件通常在 `~/.halo/upload/` 目录：

```bash
# 复制附件
cp -r ~/.halo/upload/images/* public/images/posts/
cp -r ~/.halo/upload/files/* public/files/
```

### Q: 如何处理 Halo 的自定义页面？

A: Halo 的自定义页面需要手动转换：

```bash
# 从 Halo 导出自定义页面
curl -H "Authorization: Bearer $HALO_TOKEN" \
  "$HALO_URL/apis/api.content.halo.run/v1alpha1/singlepages" \
  -o pages.json
```

然后转换为 Mizuki 的特殊页面格式。

### Q: 如何保留 Halo 的评论？

A: Mizuki 使用第三方评论系统。你需要：

1. 导出 Halo 评论数据
2. 配置 Mizuki 的评论系统（如 Twikoo、Waline 等）
3. 将评论数据导入新评论系统

### Q: 文章中的 Halo 特殊标签如何处理？

A: Halo 可能使用一些特殊标签，需要手动替换：

```html
<!-- Halo 特殊标签 -->
<halo:image src="..." />

<!-- 转换为标准 Markdown -->
![图片](/images/posts/...)
```

---

## 迁移检查清单

- [ ] Halo 数据已备份
- [ ] 文章已导出
- [ ] 图片和附件已复制
- [ ] Frontmatter 已转换
- [ ] 分类和标签已整理
- [ ] 特殊页面已转换
- [ ] 评论系统已配置
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Halo 的 Markdown 内容与 Mizuki 兼容性较好，主要需要调整 frontmatter 格式。
