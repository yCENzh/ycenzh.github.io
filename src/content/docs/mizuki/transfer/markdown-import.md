---
title: Markdown 导入
description: 将 Markdown 文件导入到 Mizuki 主题的详细指南
---

本文档介绍如何将 Markdown 格式的文件导入到 Mizuki 主题。这是最通用的导入方式，适用于任何支持 Markdown 的平台。

## 前置准备

### 1. 准备 Markdown 文件

将所有需要导入的 Markdown 文件放在一个目录中：

```
import/
├── posts/
│   ├── post1.md
│   ├── post2.md
│   └── images/
│       ├── image1.jpg
│       └── image2.png
└── pages/
    └── about.md
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 安装依赖

```bash
npm install gray-matter
```

---

## 内容格式要求

### Mizuki Frontmatter 格式

Mizuki 使用以下 frontmatter 格式：

```yaml
---
title: 文章标题
description: 文章描述
pubDate: 2024-01-01
updatedDate: 2024-01-02
tags: [标签1, 标签2]
category: 分类
image: /images/posts/cover.jpg
draft: false
---
```

### 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 文章标题 |
| description | string | 文章描述 |
| pubDate | date | 发布日期（YYYY-MM-DD 格式） |

### 可选字段

| 字段 | 类型 | 说明 |
|------|------|------|
| updatedDate | date | 更新日期 |
| tags | array | 标签列表 |
| category | string | 分类 |
| image | string | 封面图片路径 |
| draft | boolean | 是否为草稿 |
| slug | string | 自定义 URL |

---

## 格式转换

### 检查和修复 Frontmatter

创建转换脚本 `convert-markdown.js`：

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const inputDir = './import/posts';
const outputDir = './src/content/posts';

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(inputDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  // 检查必填字段
  if (!data.title) {
    // 从内容中提取标题
    const titleMatch = body.match(/^#\s+(.+)$/m);
    data.title = titleMatch ? titleMatch[1] : file.replace('.md', '');
  }
  
  if (!data.description) {
    // 从内容中提取描述
    const lines = body.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    data.description = lines[0]?.slice(0, 100) || '';
  }
  
  if (!data.pubDate) {
    // 尝试从文件名提取日期
    const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
    data.pubDate = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  }
  
  // 确保日期格式正确
  if (data.pubDate) {
    data.pubDate = new Date(data.pubDate).toISOString().split('T')[0];
  }
  
  // 设置默认值
  data.draft = data.draft || false;
  
  // 生成输出文件
  const outputContent = matter.stringify(body, data);
  const outputPath = path.join(outputDir, file);
  
  fs.writeFileSync(outputPath, outputContent);
  console.log(`✅ Converted: ${file}`);
});
```

### 修复图片路径

```javascript
// fix-image-paths.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 修复相对路径图片
  content = content.replace(
    /!\[([^\]]*)\]\((?!\/|https?:\/\/)([^)]+)\)/g,
    '![$1](/images/posts/$2)'
  );
  
  // 修复绝对路径图片
  content = content.replace(
    /!\[([^\]]*)\]\(\/assets\/images\/([^)]+)\)/g,
    '![$1](/images/posts/$2)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed images: ${file}`);
});
```

### 运行转换

```bash
node convert-markdown.js
node fix-image-paths.js
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
cp /path/to/import/pages/about.md src/content/spec/

# 复制图片
cp -r /path/to/import/posts/images/* public/images/posts/
```

### 2. 手动调整

转换后可能需要手动调整：

1. **检查 frontmatter**：确保所有必填字段都已填写
2. **修复图片路径**：确保图片路径正确
3. **整理标签和分类**：统一标签和分类格式
4. **检查 Markdown 格式**：确保 Markdown 渲染正确

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: 如何处理没有 frontmatter 的 Markdown 文件？

A: 转换脚本会自动从内容中提取标题和描述，或使用文件名作为标题。

### Q: 如何批量添加 frontmatter？

A: 使用以下脚本批量添加：

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 检查是否已有 frontmatter
  if (content.startsWith('---')) {
    console.log(`⏭️ Skipped (has frontmatter): ${file}`);
    return;
  }
  
  // 从内容中提取标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
  
  // 创建 frontmatter
  const frontmatter = {
    title: title,
    description: content.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
    pubDate: new Date().toISOString().split('T')[0],
    draft: false
  };
  
  // 添加 frontmatter
  const newContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, newContent);
  
  console.log(`✅ Added frontmatter: ${file}`);
});
```

### Q: 如何处理不同的日期格式？

A: 转换脚本会尝试解析各种日期格式：

```javascript
// 支持的日期格式
const dateFormats = [
  '2024-01-01',
  '2024/01/01',
  'January 1, 2024',
  '1 Jan 2024',
  '2024-01-01T00:00:00Z'
];
```

### Q: 如何处理中文文件名？

A: Mizuki 支持中文文件名，但建议使用英文或拼音：

```bash
# 重命名中文文件名为拼音
# 可以使用工具如 pinyin-pro
npm install pinyin-pro
```

### Q: 如何处理 Markdown 中的 HTML？

A: Mizuki 支持 Markdown 中的 HTML，但建议转换为纯 Markdown：

```html
<!-- HTML 格式 -->
<img src="image.jpg" alt="图片">

<!-- Markdown 格式 -->
![图片](image.jpg)
```

---

## 高级导入

### 使用 Pandoc 批量转换

```bash
# 安装 Pandoc
# Windows: choco install pandoc
# Mac: brew install pandoc
# Linux: sudo apt install pandoc

# 批量转换
for file in import/*.md; do
  pandoc -f markdown -t markdown -o "src/content/posts/$(basename "$file")" "$file"
done
```

### 使用 Python 脚本

```python
import os
from pathlib import Path
import frontmatter

input_dir = Path('./import/posts')
output_dir = Path('./src/content/posts')
output_dir.mkdir(parents=True, exist_ok=True)

for md_file in input_dir.glob('*.md'):
    post = frontmatter.load(md_file)
    
    # 确保有必填字段
    if 'title' not in post:
        post['title'] = md_file.stem
    if 'description' not in post:
        post['description'] = post.content[:100] if post.content else ''
    if 'pubDate' not in post:
        post['pubDate'] = '2024-01-01'
    
    # 保存文件
    output_file = output_dir / md_file.name
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(frontmatter.dumps(post))
    
    print(f'✅ Converted: {md_file.name}')
```

---

## 迁移检查清单

- [ ] Markdown 文件已收集
- [ ] 图片已收集
- [ ] Frontmatter 已检查和修复
- [ ] 图片路径已更新
- [ ] 标签和分类已整理
- [ ] 日期格式已统一
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Markdown 导入是最灵活的方式，建议先导入少量文件进行测试，确认无误后再批量导入。
