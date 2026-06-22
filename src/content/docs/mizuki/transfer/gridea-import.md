---
title: 从 Gridea 导入
description: 将 Gridea 博客内容迁移到 Mizuki 主题的详细指南
---

Gridea 是一个静态博客写作客户端，使用 Markdown 格式。本文档介绍如何将 Gridea 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Gridea 博客

```bash
# 备份整个 Gridea 目录
cp -r ~/Documents/Gridea ~/Documents/Gridea-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

---

## 内容导出

### Gridea 内容位置

Gridea 的内容通常存储在以下位置：

```
~/Documents/Gridea/
├── posts/          # 文章源文件（Markdown）
├── images/         # 文章图片
├── config.json     # 博客配置
└── themes/         # 主题文件
```

### 导出文章

```bash
# 设置路径
GRIDEA_PATH="$HOME/Documents/Gridea"
MIZUKI_PATH="/path/to/Mizuki"

# 复制文章
cp -r "$GRIDEA_PATH/posts/"* "$MIZUKI_PATH/src/content/posts/"

# 复制图片
cp -r "$GRIDEA_PATH/images/"* "$MIZUKI_PATH/public/images/posts/"
```

---

## 格式转换

### Gridea Frontmatter 格式

Gridea 使用的 frontmatter 格式：

```yaml
---
title: 文章标题
date: 2024-01-01 00:00:00
tags:
  - 标签1
  - 标签2
---
```

### 转换为 Mizuki 格式

创建转换脚本 `convert-gridea.js`：

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
    description: body.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
    pubDate: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    category: data.categories?.[0] || '',
    draft: false
  };
  
  // 重建文件
  const newContent = matter.stringify(body, newData);
  fs.writeFileSync(filePath, newContent);
  
  console.log(`✅ Converted: ${file}`);
});
```

运行转换：

```bash
node convert-gridea.js
```

### 批量调整图片路径

```javascript
// fix-images.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 替换 Gridea 图片路径
  content = content.replace(
    /!\[([^\]]*)\]\(\/media\/([^)]+)\)/g,
    '![$1](/images/posts/$2)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed images: ${file}`);
});
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
cp -r /path/to/gridea/images/* public/images/posts/
```

### 2. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

### 3. 检查内容

- [ ] 文章是否正确显示
- [ ] 图片是否正常加载
- [ ] 标签是否正确
- [ ] 日期是否正确

---

## 常见问题

### Q: Gridea 的图片路径是什么格式？

A: Gridea 通常使用 `/media/` 或相对路径：

```markdown
<!-- Gridea 格式 -->
![图片](/media/2024/01/image.jpg)
![图片](../images/image.jpg)

<!-- Mizuki 格式 -->
![图片](/images/posts/image.jpg)
```

### Q: 如何处理 Gridea 的草稿？

A: Gridea 的草稿通常在 `posts/drafts/` 目录。导入时需要设置 `draft: true`：

```yaml
---
title: 草稿标题
draft: true
---
```

### Q: 如何保留 Gridea 的自定义域名？

A: 如果使用自定义域名，在 Mizuki 的部署配置中设置相同的域名即可。

### Q: 文章中的 HTML 代码如何处理？

A: Mizuki 支持 Markdown 中的 HTML，但建议转换为纯 Markdown：

```html
<!-- HTML 格式 -->
<img src="image.jpg" alt="图片">

<!-- Markdown 格式 -->
![图片](image.jpg)
```

---

## 迁移检查清单

- [ ] 所有文章已导出
- [ ] 图片已复制到正确位置
- [ ] Frontmatter 已转换为 Mizuki 格式
- [ ] 图片路径已更新
- [ ] 标签和分类已整理
- [ ] 草稿已标记
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Gridea 的 Markdown 格式与 Mizuki 兼容性较好，大部分内容可以直接使用。
