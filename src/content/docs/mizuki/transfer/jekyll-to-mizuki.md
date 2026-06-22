---
title: 从 Jekyll 迁移
description: 将 Jekyll 博客迁移到 Mizuki 主题的详细指南
---

Jekyll 是一个简单的静态博客生成器，GitHub Pages 原生支持。本文档介绍如何将 Jekyll 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Jekyll 博客

```bash
# 备份整个 Jekyll 目录
cp -r /path/to/jekyll-site /path/to/jekyll-site-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

---

## 内容导出

### Jekyll 内容结构

```
jekyll-site/
├── _posts/           # 文章目录
├── _drafts/          # 草稿目录
├── _pages/           # 页面目录
├── assets/
│   └── images/       # 图片目录
├── _config.yml       # 配置文件
└── Gemfile           # Ruby 依赖
```

### 导出文章和图片

```bash
# 设置路径
JEKYLL_PATH="/path/to/jekyll-site"
MIZUKI_PATH="/path/to/Mizuki"

# 复制文章
cp -r "$JEKYLL_PATH/_posts/"* "$MIZUKI_PATH/src/content/posts/"

# 复制草稿
cp -r "$JEKYLL_PATH/_drafts/"* "$MIZUKI_PATH/src/content/posts/"

# 复制页面
cp "$JEKYLL_PATH/_pages/about.md" "$MIZUKI_PATH/src/content/spec/" 2>/dev/null

# 复制图片
cp -r "$JEKYLL_PATH/assets/images/"* "$MIZUKI_PATH/public/images/posts/"
```

---

## 格式转换

### Jekyll Frontmatter 格式

Jekyll 使用的 frontmatter 格式：

```yaml
---
title: 文章标题
date: 2024-01-01 00:00:00 +0800
tags:
  - 标签1
  - 标签2
categories:
  - 分类1
  - 分类2
description: 文章描述
image: /assets/images/cover.jpg
published: true
---
```

### 转换为 Mizuki 格式

创建转换脚本 `convert-jekyll.js`：

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  // 转换 frontmatter
  const newData = {
    title: data.title || '无标题',
    description: data.description || data.excerpt || body.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
    pubDate: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    updatedDate: data.last_modified_at ? new Date(data.last_modified_at).toISOString().split('T')[0] : undefined,
    tags: data.tags || [],
    category: data.categories?.[0] || '',
    image: data.image || data.cover || '',
    draft: data.published === false || false
  };
  
  // 重建文件
  const newContent = matter.stringify(body, newData);
  fs.writeFileSync(filePath, newContent);
  
  console.log(`✅ Converted: ${file}`);
});
```

### 处理 Jekyll 文件名格式

Jekyll 的文件名格式为 `YYYY-MM-DD-title.md`，需要重命名：

```javascript
// rename-posts.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  // 检查是否为 Jekyll 格式的文件名
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (match) {
    const [_, date, slug] = match;
    const newFile = `${slug}.md`;
    
    const oldPath = path.join(postsDir, file);
    const newPath = path.join(postsDir, newFile);
    
    // 读取内容并更新日期
    const content = fs.readFileSync(oldPath, 'utf-8');
    const { data, content: body } = matter(content);
    
    if (!data.pubDate) {
      data.pubDate = date;
    }
    
    const newContent = matter.stringify(body, data);
    fs.writeFileSync(newPath, newContent);
    fs.unlinkSync(oldPath);
    
    console.log(`✅ Renamed: ${file} → ${newFile}`);
  }
});
```

### 运行转换

```bash
npm install gray-matter
node convert-jekyll.js
node rename-posts.js
```

---

## 导入到 Mizuki

### 1. 复制转换后的内容

```bash
# 确保目录存在
mkdir -p src/content/posts
mkdir -p src/content/spec
mkdir -p public/images/posts

# 复制文章
cp -r /path/to/converted/posts/* src/content/posts/

# 复制页面
cp /path/to/converted/about.md src/content/spec/

# 复制图片
cp -r /path/to/jekyll/assets/images/* public/images/posts/
```

### 2. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: Jekyll 的 `excerpt` 如何处理？

A: Jekyll 的 `excerpt` 会被转换为 `description`：

```yaml
# Jekyll 格式
excerpt: 这是文章摘要

# Mizuki 格式
description: 这是文章摘要
```

### Q: Jekyll 的 `published: false` 如何处理？

A: 转换为 Mizuki 的 `draft: true`：

```yaml
# Jekyll 格式
published: false

# Mizuki 格式
draft: true
```

### Q: Jekyll 的永久链接如何处理？

A: Mizuki 使用文件名作为 URL。如果需要保留 Jekyll 的永久链接格式：

```yaml
# Jekyll 格式
permalink: /blog/:year/:month/:title/

# Mizuki 格式
slug: my-custom-url
```

### Q: Jekyll 的 Liquid 模板标签如何处理？

A: Jekyll 使用 Liquid 模板标签，需要移除或转换：

```markdown
<!-- Jekyll 格式 -->
{{ page.title }}
{{ site.url }}
{% include image.html src="image.jpg" %}

<!-- Mizuki 格式 -->
直接使用 Markdown
```

### Q: Jekyll 的 `_data` 目录如何处理？

A: Jekyll 的 `_data` 目录包含 YAML/JSON 数据文件，需要转换为 Mizuki 的 TypeScript 数据文件。

---

## 迁移检查清单

- [ ] Jekyll 博客已备份
- [ ] 文章已导出
- [ ] 图片已复制
- [ ] Frontmatter 已转换
- [ ] 文件名已调整
- [ ] Liquid 标签已处理
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Jekyll 的 Markdown 格式与 Mizuki 兼容性很好，主要需要调整 frontmatter 和处理 Liquid 标签。
