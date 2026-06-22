---
title: Typecho 相关问题
description: 从 Typecho 迁移到 Mizuki 时可能遇到的问题和解决方案
---

本文档整理了从 Typecho 迁移到 Mizuki 时可能遇到的问题和解决方案。

## 迁移问题

### Q: Typecho 的数据库如何导出？

A: 根据你的 Typecho 版本选择导出方式：

**MySQL 版本**：
```bash
mysqldump -u root -p typecho > typecho-backup.sql
```

**SQLite 版本**：
```bash
cp /path/to/typecho/usr/data/typecho.db ~/typecho-backup.db
```

**使用插件**：
1. 登录 Typecho 后台
2. 进入 控制台 → 插件
3. 安装 "数据导出" 插件

### Q: Typecho 的文章内容如何提取？

A: 使用 SQL 查询提取文章：

```sql
-- MySQL
SELECT 
  cid, title, slug, text, created, modified, 
  type, status, allowComment, password
FROM typecho_contents 
WHERE type = 'post' AND status = 'publish';
```

```bash
# SQLite
sqlite3 /path/to/typecho.db \
  "SELECT * FROM typecho_contents WHERE type='post' AND status='publish';"
```

### Q: Typecho 的分类和标签如何导出？

A: Typecho 的分类和标签存储在不同的表中：

```sql
-- 导出分类
SELECT m.mid, m.name, m.slug, m.type
FROM typecho_metas m
WHERE m.type = 'category';

-- 导出标签
SELECT m.mid, m.name, m.slug, m.type
FROM typecho_metas m
WHERE m.type = 'tag';

-- 导出文章与分类/标签的关联
SELECT r.cid, r.mid, m.name, m.type
FROM typecho_relationships r
JOIN typecho_metas m ON r.mid = m.mid;
```

---

## 格式转换

### Q: Typecho 的 Markdown 格式与 Mizuki 有什么区别？

A: Typecho 使用标准 Markdown，Mizuki 支持增强语法：

| Typecho | Mizuki | 说明 |
|---------|--------|------|
| `<!--more-->` | `<!-- more -->` | 摘要分隔符 |
| `[caption]` | HTML figure | 图片说明 |
| `{text}` | 自定义语法 | 可能需要转换 |

### Q: Typecho 的附件如何迁移？

A: Typecho 的附件存储在 `usr/uploads/` 目录：

```bash
# 复制附件到 Mizuki
cp -r /path/to/typecho/usr/uploads/* /path/to/Mizuki/public/images/posts/

# 更新文章中的附件路径
# 从：/usr/uploads/2024/01/image.jpg
# 到：/images/posts/2024/01/image.jpg
```

---

## 数据库迁移

### Q: 如何从 SQLite 迁移到 Mizuki？

A: 使用 Node.js 读取 SQLite 数据库：

```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./typecho.db');

db.all(
  "SELECT * FROM typecho_contents WHERE type='post' AND status='publish'",
  (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    
    rows.forEach(row => {
      // 转换为 Mizuki 格式
      const frontmatter = {
        title: row.title,
        published: new Date(row.created * 1000).toISOString().split('T')[0],
        description: row.text.substring(0, 200),
      };
      
      // 生成 Markdown 文件
      // ...
    });
  }
);
```

---

## 相关文档

- [错误排查](/mizuki/problem/error/)：常见错误解决方案
- [Typecho 迁移指南](/mizuki/transfer/typecho-to-mizuki/)：详细迁移步骤
