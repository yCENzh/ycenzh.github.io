---
title: 从 Hugo 迁移
description: 将 Hugo 博客迁移到 Mizuki 主题的详细指南
---

Hugo 是一个用 Go 编写的静态网站生成器。本文档介绍如何将 Hugo 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Hugo 博客

```bash
# 备份整个 Hugo 目录
cp -r /path/to/hugo-site /path/to/hugo-site-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

---

## 内容导出

### Hugo 内容结构

```
hugo-site/
├── content/
│   ├── posts/        # 文章目录
│   └── about.md      # 特殊页面
├── static/
│   └── images/       # 图片目录
├── themes/           # 主题
└── config.toml       # 配置文件
```

### 导出文章和图片

```bash
# 设置路径
HUGO_PATH="/path/to/hugo-site"
MIZUKI_PATH="/path/to/Mizuki"

# 复制文章
cp -r "$HUGO_PATH/content/posts/"* "$MIZUKI_PATH/src/content/posts/"

# 复制特殊页面
cp "$HUGO_PATH/content/about.md" "$MIZUKI_PATH/src/content/spec/" 2>/dev/null

# 复制图片
cp -r "$HUGO_PATH/static/images/"* "$MIZUKI_PATH/public/images/posts/"
```

---

## 格式转换

### Hugo Frontmatter 格式

Hugo 支持 TOML 和 YAML 格式的 frontmatter：

**TOML 格式**：
```toml
+++
title = "文章标题"
date = 2024-01-01T00:00:00Z
tags = ["标签1", "标签2"]
categories = ["分类1"]
description = "文章描述"
+++
```

**YAML 格式**：
```yaml
---
title: 文章标题
date: 2024-01-01T00:00:00Z
tags:
  - 标签1
  - 标签2
categories:
  - 分类1
description: 文章描述
---
```

### 转换 TOML 到 YAML

如果 Hugo 使用 TOML 格式，需要先转换：

```bash
npm install toml gray-matter
```

创建转换脚本 `convert-hugo.js`：

```javascript
const fs = require('fs');
const path = require('path');
const toml = require('toml');
const matter = require('gray-matter');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 检测是否为 TOML 格式
  if (content.startsWith('+++')) {
    // 提取 TOML 内容
    const tomlEnd = content.indexOf('+++', 3);
    const tomlContent = content.slice(3, tomlEnd).trim();
    const body = content.slice(tomlEnd + 3).trim();
    
    // 解析 TOML
    const data = toml.parse(tomlContent);
    
    // 转换为 Mizuki 格式
    const newData = {
      title: data.title || '无标题',
      description: data.description || body.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
      pubDate: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      category: data.categories?.[0] || '',
      draft: data.draft || false
    };
    
    // 重建文件
    const newContent = matter.stringify(body, newData);
    fs.writeFileSync(filePath, newContent);
    
    console.log(`✅ Converted TOML: ${file}`);
  } else {
    // YAML 格式，直接转换字段名
    const { data, content: body } = matter(content);
    
    const newData = {
      title: data.title || '无标题',
      description: data.description || body.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
      pubDate: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      updatedDate: data.lastmod ? new Date(data.lastmod).toISOString().split('T')[0] : undefined,
      tags: data.tags || [],
      category: data.categories?.[0] || '',
      image: data.featureimage || data.image || '',
      draft: data.draft || false
    };
    
    const newContent = matter.stringify(body, newData);
    fs.writeFileSync(filePath, newContent);
    
    console.log(`✅ Converted YAML: ${file}`);
  }
});
```

### 处理 Hugo 短代码

Hugo 使用短代码（shortcodes），需要转换：

```javascript
// fix-hugo-shortcodes.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 转换 {{< figure >}} 短代码
  content = content.replace(
    /\{\{< figure src="([^"]+)" alt="([^"]*)" >\}\}/g,
    '![$2]($1)'
  );
  
  // 转换 {{< highlight >}} 短代码
  content = content.replace(
    /\{\{< highlight ([^>]+) >\}\}\n([\s\S]*?)\{\{< \/highlight >\}\}/g,
    '```$1\n$2```'
  );
  
  // 转换 {{< /tweet >}} 短代码
  content = content.replace(
    /\{\{< tweet ([^>]+) >\}\}/g,
    '[Tweet $1](https://twitter.com/i/status/$1)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed shortcodes: ${file}`);
});
```

### 运行转换

```bash
node convert-hugo.js
node fix-hugo-shortcodes.js
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

# 复制特殊页面
cp /path/to/converted/about.md src/content/spec/

# 复制图片
cp -r /path/to/hugo/static/images/* public/images/posts/
```

### 2. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: Hugo 的 TOML frontmatter 如何处理？

A: 使用上面的转换脚本，它会自动检测并转换 TOML 格式。

### Q: Hugo 的短代码如何处理？

A: 常见短代码的转换方法：

```markdown
<!-- Hugo 短代码 -->
{{< figure src="image.jpg" alt="图片" >}}

<!-- Mizuki 格式 -->
![图片](image.jpg)
```

### Q: Hugo 的页面包（Page Bundles）如何处理？

A: Hugo 的页面包结构：

```
content/posts/my-post/
├── index.md
├── image1.jpg
└── image2.png
```

需要将图片移到公共目录：

```bash
# 移动图片
mv content/posts/my-post/*.jpg public/images/posts/
mv content/posts/my-post/*.png public/images/posts/

# 移动文章
mv content/posts/my-post/index.md src/content/posts/my-post.md
```

### Q: Hugo 的多语言支持如何处理？

A: Mizuki 目前不支持多语言，需要选择主要语言的内容进行迁移。

### Q: Hugo 的分类法（Taxonomies）如何处理？

A: Hugo 的分类法（tags、categories）会被转换为 Mizuki 的标签和分类：

```yaml
# Hugo 格式
tags: [tag1, tag2]
categories: [category1]
series: [series1]

# Mizuki 格式
tags: [tag1, tag2, series1]
category: category1
```

---

## 迁移检查清单

- [ ] Hugo 博客已备份
- [ ] 文章已导出
- [ ] 图片已复制
- [ ] TOML frontmatter 已转换
- [ ] 短代码已转换
- [ ] 页面包已处理
- [ ] Frontmatter 字段已调整
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Hugo 的 Markdown 格式与 Mizuki 兼容性较好，主要需要处理 TOML frontmatter 和短代码。
