---
title: WordPress 相关问题
description: 从 WordPress 迁移到 Mizuki 时可能遇到的问题和解决方案
---

本文档整理了从 WordPress 迁移到 Mizuki 时可能遇到的问题和解决方案。

## 迁移问题

### Q: WordPress 导出的 XML 文件如何解析？

A: 使用 xml2js 库解析：

```javascript
const { parseString } = require('xml2js');
const fs = require('fs');

const xml = fs.readFileSync('./wordpress-export.xml', 'utf-8');

parseString(xml, (err, result) => {
  if (err) {
    console.error('XML 解析错误:', err);
    return;
  }
  
  const posts = result.rss.channel[0].item;
  console.log(`找到 ${posts.length} 篇文章`);
});
```

### Q: WordPress 的 HTML 内容如何转换为 Markdown？

A: 使用 turndown 库：

```javascript
const TurndownService = require('turndown');
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

const html = '<h2>标题</h2><p>段落内容</p>';
const markdown = turndownService.turndown(html);
// 输出：## 标题\n\n段落内容
```

### Q: WordPress 的短代码（Shortcodes）如何处理？

A: WordPress 短代码需要手动转换为 Markdown 或 HTML：

| WordPress 短代码 | Mizuki 等效 |
|-----------------|-------------|
| `[caption]` | 使用 HTML figure 标签 |
| `[gallery]` | 使用图片画廊语法 |
| `[code]` | 使用 Markdown 代码块 |
| `[embed]` | 使用 iframe 嵌入 |

### Q: WordPress 的分类和标签如何迁移？

A: WordPress 的分类和标签需要转换为 Mizuki 的 frontmatter 格式：

```yaml
---
title: 文章标题
tags: [标签1, 标签2]
category: 分类名称
---
```

---

## 图片迁移

### Q: WordPress 的图片路径如何处理？

A: WordPress 图片通常存储在 `wp-content/uploads/` 目录：

```bash
# 复制图片到 Mizuki
cp -r /path/to/wordpress/wp-content/uploads/* /path/to/Mizuki/public/images/posts/

# 更新文章中的图片路径
# 从：/wp-content/uploads/2024/01/image.jpg
# 到：/images/posts/2024/01/image.jpg
```

### Q: 如何批量替换图片路径？

A: 使用 sed 或脚本批量替换：

```bash
# 使用 sed 替换
find src/content/posts -name "*.md" -exec sed -i 's|/wp-content/uploads/|/images/posts/|g' {} \;

# 或使用 Node.js 脚本
const fs = require('fs');
const glob = require('glob');

glob('src/content/posts/**/*.md', (err, files) => {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/\/wp-content\/uploads\//g, '/images/posts/');
    fs.writeFileSync(file, content);
  });
});
```

---

## 数据库迁移

### Q: 如何从 MySQL 导出 WordPress 文章？

A: 使用 SQL 查询导出：

```sql
SELECT 
  p.ID,
  p.post_title,
  p.post_name,
  p.post_content,
  p.post_date,
  p.post_modified,
  p.post_excerpt,
  GROUP_CONCAT(t.name) as tags,
  c.name as category
FROM wp_posts p
LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
LEFT JOIN wp_terms t ON tt.term_id = t.term_id
LEFT JOIN wp_terms c ON tt.term_id = c.term_id AND tt.taxonomy = 'category'
WHERE p.post_type = 'post' AND p.post_status = 'publish'
GROUP BY p.ID;
```

---

## 相关文档

- [错误排查](/mizuki/problem/error/)：常见错误解决方案
- [迁移指南](/mizuki/other/migration/)：详细迁移步骤
