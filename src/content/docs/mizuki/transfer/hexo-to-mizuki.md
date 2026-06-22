---
title: 从 Hexo 迁移
description: 将 Hexo 博客迁移到 Mizuki 主题的详细指南
---

Hexo 是一个流行的静态博客框架，使用 Markdown 格式。本文档介绍如何将 Hexo 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Hexo 博客

```bash
# 备份整个 Hexo 目录
cp -r /path/to/hexo-blog /path/to/hexo-blog-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

---

## 内容导出

### Hexo 内容结构

```
hexo-blog/
├── source/
│   ├── _posts/       # 文章目录
│   └── images/       # 图片目录
├── themes/           # 主题
└── _config.yml       # 配置文件
```

### 导出文章和图片

```bash
# 设置路径
HEXO_PATH="/path/to/hexo-blog"
MIZUKI_PATH="/path/to/Mizuki"

# 复制文章
cp -r "$HEXO_PATH/source/_posts/"* "$MIZUKI_PATH/src/content/posts/"

# 复制图片
cp -r "$HEXO_PATH/source/images/"* "$MIZUKI_PATH/public/images/posts/"

# 如果图片在文章目录中
find "$HEXO_PATH/source/_posts/" -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" | while read img; do
  cp "$img" "$MIZUKI_PATH/public/images/posts/"
done
```

---

## 格式转换

### Hexo Frontmatter 格式

Hexo 使用的 frontmatter 格式：

```yaml
---
title: 文章标题
date: 2024-01-01 00:00:00
tags:
  - 标签1
  - 标签2
categories:
  - 分类1
  - 分类2
description: 文章描述
photos:
  - /images/photo1.jpg
---
```

### 转换为 Mizuki 格式

创建转换脚本 `convert-hexo.js`：

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
    description: data.description || body.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
    pubDate: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    updatedDate: data.updated ? new Date(data.updated).toISOString().split('T')[0] : undefined,
    tags: data.tags || [],
    category: data.categories?.[0] || '',
    image: data.photos?.[0] || '',
    draft: data.published === false || false
  };
  
  // 重建文件
  const newContent = matter.stringify(body, newData);
  fs.writeFileSync(filePath, newContent);
  
  console.log(`✅ Converted: ${file}`);
});
```

### 处理 Hexo 特有标签

Hexo 使用一些特有的标签插件，需要转换：

```javascript
// fix-hexo-tags.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 转换 {% asset_img %} 标签
  content = content.replace(
    /{% asset_img ([^%]+) %}/g,
    '![](/images/posts/$1)'
  );
  
  // 转换 {% post_link %} 标签
  content = content.replace(
    /{% post_link ([^%]+) %}/g,
    '[$1](/posts/$1/)'
  );
  
  // 转换 {% codeblock %} 标签
  content = content.replace(
    /{% codeblock ([^%]+) %}\n([\s\S]*?){% endcodeblock %}/g,
    '```$1\n$2```'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed tags: ${file}`);
});
```

### 运行转换

```bash
npm install gray-matter
node convert-hexo.js
node fix-hexo-tags.js
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

# 复制图片
cp -r /path/to/hexo/source/images/* public/images/posts/
```

### 2. 处理 Hexo 的 assets 目录

如果 Hexo 使用了 `post_asset_folder`：

```bash
# Hexo 的文章资源目录
HEXO_POSTS="/path/to/hexo/source/_posts"

# 遍历所有文章目录
find "$HEXO_POSTS" -type d | while read dir; do
  # 复制目录中的图片
  if ls "$dir"/*.{jpg,png,gif,webp} 2>/dev/null; then
    cp "$dir"/*.{jpg,png,gif,webp} public/images/posts/
  fi
done
```

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: Hexo 的 `asset_img` 标签如何处理？

A: `asset_img` 是 Hexo 的资源图片标签，需要转换为标准 Markdown：

```markdown
<!-- Hexo 格式 -->
{% asset_img image.jpg 图片描述 %}

<!-- Mizuki 格式 -->
![图片描述](/images/posts/image.jpg)
```

### Q: Hexo 的分类层级如何处理？

A: Hexo 支持多级分类，Mizuki 使用单级分类：

```yaml
# Hexo 格式
categories:
  - 技术
  - 前端

# Mizuki 格式
category: 技术
tags: [前端]
```

### Q: 如何处理 Hexo 的草稿？

A: Hexo 的草稿在 `source/_drafts/` 目录：

```bash
# 复制草稿
cp -r /path/to/hexo/source/_drafts/* src/content/posts/

# 设置为草稿状态
# 在 frontmatter 中添加 draft: true
```

### Q: Hexo 的 `post_link` 标签如何处理？

A: 转换为标准 Markdown 链接：

```markdown
<!-- Hexo 格式 -->
{% post_link hello-world %}

<!-- Mizuki 格式 -->
[hello-world](/posts/hello-world/)
```

### Q: 如何保留 Hexo 的永久链接？

A: Mizuki 使用文件名作为 URL。如果需要保留 Hexo 的永久链接格式，可以在 frontmatter 中设置：

```yaml
---
slug: my-custom-url
---
```

---

## 迁移检查清单

- [ ] Hexo 博客已备份
- [ ] 文章已导出
- [ ] 图片已复制
- [ ] Hexo 标签已转换
- [ ] Frontmatter 已转换
- [ ] 分类和标签已整理
- [ ] 草稿已处理
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Hexo 的 Markdown 格式与 Mizuki 兼容性很好，大部分内容可以直接使用，主要需要调整 frontmatter 和处理 Hexo 特有标签。
