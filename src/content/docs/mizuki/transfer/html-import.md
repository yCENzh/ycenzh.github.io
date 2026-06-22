---
title: HTML 导入
description: 将 HTML 文件导入到 Mizuki 主题的详细指南
---

本文档介绍如何将 HTML 格式的内容导入到 Mizuki 主题。

## 前置准备

### 1. 准备 HTML 文件

将所有需要导入的 HTML 文件放在一个目录中：

```
import/
├── post1.html
├── post2.html
├── images/
│   ├── image1.jpg
│   └── image2.png
└── index.html
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 安装转换工具

```bash
npm install -g turndown
npm install gray-matter
```

---

## 内容导出

### 从浏览器导出

1. 打开博客页面
2. 使用浏览器开发者工具复制 HTML
3. 保存为 `.html` 文件

### 从 CMS 导出

大多数 CMS 支持导出 HTML 格式：

**WordPress**：
- 工具 → 导出 → 选择"文章"
- 下载导出的 XML 文件

**其他 CMS**：
- 查看 CMS 的导出功能
- 选择 HTML 格式导出

### 使用爬虫工具

```bash
# 使用 wget 下载整个网站
wget -r -np -k -P ./html-export https://your-blog.com

# 使用 httrack
httrack https://your-blog.com -O ./html-export
```

---

## 格式转换

### HTML 转 Markdown

创建转换脚本 `convert-html.js`：

```javascript
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const matter = require('gray-matter');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// 配置 Turndown
turndownService.addRule('images', {
  filter: 'img',
  replacement: function(content, node) {
    const alt = node.getAttribute('alt') || '';
    const src = node.getAttribute('src') || '';
    return `![${alt}](/images/posts/${path.basename(src)})`;
  }
});

const htmlDir = './html-export';
const postsDir = './src/content/posts';

// 确保输出目录存在
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

fs.readdirSync(htmlDir).forEach(file => {
  if (!file.endsWith('.html')) return;
  
  const filePath = path.join(htmlDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // 提取标题
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : file.replace('.html', '');
  
  // 提取日期
  const dateMatch = html.match(/datetime="([^"]+)"/i) || 
                    html.match(/<time[^>]*>(.*?)<\/time>/i);
  const date = dateMatch ? new Date(dateMatch[1]) : new Date();
  
  // 转换为 Markdown
  const markdown = turndownService.turndown(html);
  
  // 创建 frontmatter
  const frontmatter = {
    title: title,
    description: markdown.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
    pubDate: date.toISOString().split('T')[0],
    draft: false
  };
  
  // 生成文件
  const fileName = file.replace('.html', '.md');
  const content = matter.stringify(markdown, frontmatter);
  
  fs.writeFileSync(path.join(postsDir, fileName), content);
  console.log(`✅ Converted: ${fileName}`);
});
```

### 处理内嵌样式

HTML 文件可能包含内嵌样式，需要清理：

```javascript
// clean-html.js
const fs = require('fs');
const path = require('path');

const htmlDir = './html-export';

fs.readdirSync(htmlDir).forEach(file => {
  if (!file.endsWith('.html')) return;
  
  const filePath = path.join(htmlDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // 移除 style 标签
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // 移除内嵌样式属性
  html = html.replace(/\s+style="[^"]*"/gi, '');
  
  // 移除 script 标签
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // 移除注释
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  
  fs.writeFileSync(filePath, html);
  console.log(`✅ Cleaned: ${file}`);
});
```

### 运行转换

```bash
node clean-html.js
node convert-html.js
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
cp -r /path/to/html-export/images/* public/images/posts/
```

### 2. 手动调整

转换后可能需要手动调整：

1. **检查 Markdown 格式**：确保转换正确
2. **修复图片路径**：确保图片路径正确
3. **添加 frontmatter**：补充缺失的元数据
4. **清理多余内容**：移除不需要的 HTML 残留

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: HTML 中的表格如何处理？

A: Turndown 可以处理简单的表格，但复杂表格可能需要手动调整：

```markdown
<!-- 转换后的表格 -->
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
```

### Q: HTML 中的代码块如何处理？

A: Turndown 会自动转换代码块：

```markdown
<!-- 转换后的代码块 -->
```javascript
const greeting = "Hello!";
```
```

### Q: 如何处理 HTML 中的链接？

A: 链接会被自动转换：

```markdown
<!-- 转换后的链接 -->
[链接文本](https://example.com)
```

### Q: 如何处理相对路径的图片？

A: 需要更新图片路径：

```javascript
// 修复相对路径
content = content.replace(
  /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
  '![$1](/images/posts/$2)'
);
```

### Q: 如何处理 HTML 中的特殊字符？

A: HTML 实体字符会被自动转换：

```markdown
<!-- HTML -->
&amp; &lt; &gt; &quot;

<!-- Markdown -->
& < > "
```

---

## 高级转换

### 使用 Pandoc

Pandoc 是一个强大的文档转换工具：

```bash
# 安装 Pandoc
# Windows: choco install pandoc
# Mac: brew install pandoc
# Linux: sudo apt install pandoc

# HTML 转 Markdown
pandoc -f html -t markdown -o output.md input.html

# 批量转换
for file in html-export/*.html; do
  pandoc -f html -t markdown -o "posts/$(basename "$file" .html).md" "$file"
done
```

### 使用 Python

```python
import os
from bs4 import BeautifulSoup
from markdownify import markdownify as md
import frontmatter

html_dir = './html-export'
posts_dir = './src/content/posts'

for filename in os.listdir(html_dir):
    if not filename.endswith('.html'):
        continue
    
    with open(os.path.join(html_dir, filename), 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 提取标题
    title = soup.find('h1')
    title_text = title.get_text() if title else filename.replace('.html', '')
    
    # 转换为 Markdown
    markdown = md(html, heading_style='ATX')
    
    # 创建 frontmatter
    post = frontmatter.Post(markdown)
    post['title'] = title_text
    post['pubDate'] = '2024-01-01'
    
    # 保存文件
    output_filename = filename.replace('.html', '.md')
    with open(os.path.join(posts_dir, output_filename), 'w', encoding='utf-8') as f:
        f.write(frontmatter.dumps(post))
    
    print(f'✅ Converted: {output_filename}')
```

---

## 迁移检查清单

- [ ] HTML 文件已收集
- [ ] 图片已下载
- [ ] HTML 已转换为 Markdown
- [ ] 内嵌样式已清理
- [ ] Frontmatter 已添加
- [ ] 图片路径已更新
- [ ] 格式已检查
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：HTML 转 Markdown 可能不完美，建议转换后仔细检查每个文件。
