---
title: 从 WordPress 迁移
description: 将 WordPress 博客迁移到 Mizuki 主题的详细指南
---

WordPress 是最流行的 CMS 系统。本文档介绍如何将 WordPress 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 WordPress 数据

```bash
# 备份数据库
mysqldump -u root -p wordpress > wordpress-backup.sql

# 备份上传文件
cp -r /path/to/wordpress/wp-content/uploads ~/wp-uploads-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 安装转换工具

```bash
npm install gray-matter turndown
```

---

## 内容导出

### 方式 1：使用 WordPress 导出工具

1. 登录 WordPress 后台
2. 进入 工具 → 导出
3. 选择"文章"
4. 点击"下载导出文件"
5. 下载 XML 文件

### 方式 2：使用 WP-CLI

```bash
# 安装 WP-CLI
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

# 导出文章
wp export --dir=./wp-export --post_type=post --post_status=publish
```

### 方式 3：使用数据库导出

```bash
# 导出文章
mysql -u root -p wordpress -e "
  SELECT 
    p.ID, p.post_title, p.post_name, p.post_content, 
    p.post_date, p.post_modified, p.post_status,
    p.post_excerpt, p.post_type
  FROM wp_posts p
  WHERE p.post_type = 'post' AND p.post_status = 'publish'
  INTO OUTFILE '/tmp/wp-posts.csv'
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n';
"

# 导出分类和标签
mysql -u root -p wordpress -e "
  SELECT 
    t.term_id, t.name, t.slug, tt.taxonomy, tt.description
  FROM wp_terms t
  JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
  WHERE tt.taxonomy IN ('category', 'post_tag')
  INTO OUTFILE '/tmp/wp-terms.csv'
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n';
"
```

---

## 格式转换

### 解析 WordPress XML

创建转换脚本 `convert-wordpress.js`：

```javascript
const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');
const TurndownService = require('turndown');
const matter = require('gray-matter');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// 读取 WordPress 导出的 XML
const xml = fs.readFileSync('./wordpress-export.xml', 'utf-8');

parseString(xml, (err, result) => {
  if (err) {
    console.error('XML 解析错误:', err);
    return;
  }
  
  const channel = result.rss.channel[0];
  const posts = channel.item.filter(item => 
    item['wp:post_type'][0] === 'post' && 
    item['wp:status'][0] === 'publish'
  );
  
  const postsDir = './src/content/posts';
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
  
  posts.forEach(post => {
    const title = post.title[0];
    const slug = post['wp:post_name'][0];
    const content = post['content:encoded'][0] || '';
    const excerpt = post['excerpt:encoded'][0] || '';
    const date = post['wp:post_date'][0];
    const categories = post.category?.filter(c => c.$.domain === 'category').map(c => c._) || [];
    const tags = post.category?.filter(c => c.$.domain === 'post_tag').map(c => c._) || [];
    
    // HTML 转 Markdown
    const markdown = turndownService.turndown(content);
    
    // 创建 frontmatter
    const frontmatter = {
      title: title,
      description: excerpt || markdown.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 100) || '',
      pubDate: new Date(date).toISOString().split('T')[0],
      tags: tags,
      category: categories[0] || '',
      slug: slug
    };
    
    // 生成文件
    const fileName = `${slug}.md`;
    const filePath = path.join(postsDir, fileName);
    
    const fileContent = matter.stringify(markdown, frontmatter);
    fs.writeFileSync(filePath, fileContent);
    
    console.log(`✅ Converted: ${fileName}`);
  });
});
```

### 运行转换

```bash
npm install xml2js turndown gray-matter
node convert-wordpress.js
```

### 处理 WordPress 特有内容

```javascript
// fix-wordpress-content.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 处理 WordPress 短代码
  content = content.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, '$1');
  content = content.replace(/\[gallery[^\]]*\]/g, '');
  content = content.replace(/\[embed[^\]]*\]([\s\S]*?)\[\/embed\]/g, '$1');
  
  // 处理 WordPress 图片
  content = content.replace(
    /!\[([^\]]*)\]\(\/wp-content\/uploads\/([^)]+)\)/g,
    '![$1](/images/posts/$2)'
  );
  
  // 处理 WordPress 链接
  content = content.replace(
    /\[([^\]]+)\]\(\/\?p=(\d+)\)/g,
    '[$1](/posts/$2/)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed content: ${file}`);
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

# 复制上传的图片
cp -r /path/to/wordpress/wp-content/uploads/* public/images/posts/
```

### 2. 处理 WordPress 媒体文件

WordPress 的媒体文件通常在 `wp-content/uploads/year/month/` 目录：

```bash
# 复制所有上传的文件
find /path/to/wordpress/wp-content/uploads -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) -exec cp {} public/images/posts/ \;
```

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: WordPress 的短代码如何处理？

A: 常见短代码的处理方法：

```markdown
<!-- WordPress 短代码 -->
[caption id="attachment_123" align="aligncenter" width="600"]
  <img src="image.jpg" alt="图片" />
  图片说明
[/caption]

<!-- Mizuki 格式 -->
![图片说明](/images/posts/image.jpg)
```

### Q: WordPress 的古腾堡块如何处理？

A: 古腾堡块需要转换为标准 Markdown：

```markdown
<!-- 古腾堡块 -->
<!-- wp:paragraph -->
<p>段落内容</p>
<!-- /wp:paragraph -->

<!-- wp:image -->
<figure class="wp-block-image">
  <img src="image.jpg" alt="图片"/>
</figure>
<!-- /wp:image -->

<!-- Mizuki 格式 -->
段落内容

![图片](/images/posts/image.jpg)
```

### Q: WordPress 的分类层级如何处理？

A: WordPress 支持多级分类，Mizuki 使用单级分类：

```yaml
# WordPress 格式
categories:
  - 技术
  - 前端
  - JavaScript

# Mizuki 格式
category: 技术
tags: [前端, JavaScript]
```

### Q: 如何保留 WordPress 的永久链接？

A: Mizuki 使用文件名作为 URL。如果需要保留 WordPress 的永久链接格式：

```yaml
---
slug: my-custom-url
---
```

### Q: WordPress 的评论如何处理？

A: Mizuki 使用第三方评论系统。你需要：

1. 导出 WordPress 评论数据
2. 配置 Mizuki 的评论系统（如 Twikoo、Waline 等）
3. 将评论数据导入新评论系统

### Q: 如何处理 WordPress 的页面？

A: WordPress 的页面需要转换为 Mizuki 的特殊页面：

```bash
# 导出页面
wp export --dir=./wp-export --post_type=page --post_status=publish
```

---

## 迁移检查清单

- [ ] WordPress 数据已备份
- [ ] 文章已导出
- [ ] 图片已复制
- [ ] HTML 已转换为 Markdown
- [ ] 短代码已处理
- [ ] 古腾堡块已转换
- [ ] Frontmatter 已创建
- [ ] 分类和标签已整理
- [ ] 页面已转换
- [ ] 评论系统已配置
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：WordPress 的内容格式较为复杂，建议转换后仔细检查每个文件，确保格式正确。
