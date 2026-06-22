---
title: 从 Z-Blog 导入
description: 将 Z-Blog 博客迁移到 Mizuki 主题的详细指南
---

Z-Blog 是一个流行的中文博客程序，支持 ASP 和 PHP 版本。本文档介绍如何将 Z-Blog 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Z-Blog 数据

```bash
# ASP 版本：备份数据库文件
cp -r /path/to/zblog/zb_users/data ~/zblog-data-backup

# PHP 版本：备份数据库
mysqldump -u root -p zblog > zblog-backup.sql

# 备份上传文件
cp -r /path/to/zblog/zb_users/upload ~/zblog-upload-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 获取数据库信息

**ASP 版本**：
- 数据库文件通常在 `zb_users/data/` 目录
- 使用 Access 数据库（`.mdb` 文件）

**PHP 版本**：
- 从配置文件获取数据库连接信息
- 通常在 `zb_system/config.php`

---

## 内容导出

### 方式 1：使用 Z-Blog 后台导出

1. 登录 Z-Blog 后台
2. 进入 插件管理
3. 安装并使用"数据导出"插件
4. 导出为 Markdown 或 XML 格式

### 方式 2：使用数据库导出

**ASP 版本（Access 数据库）**：

```bash
# 使用 mdb-tools 读取 Access 数据库
sudo apt install mdb-tools

# 导出文章表
mdb-export zb_users/data/zblog.mdb zblog_post > posts.csv

# 导出分类表
mdb-export zb_users/data/zblog.mdb zblog_category > categories.csv

# 导出标签表
mdb-export zb_users/data/zblog.mdb zblog_tag > tags.csv
```

**PHP 版本（MySQL 数据库）**：

```bash
# 导出文章
mysql -u root -p zblog -e "
  SELECT 
    log_ID, log_Title, log_Content, log_Intro,
    log_PostTime, log_UpdateTime, log_Status,
    log_CateID, log_Tag
  FROM zblog_post
  WHERE log_Status = 0
  INTO OUTFILE '/tmp/zblog-posts.csv'
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n';
"
```

### 方式 3：使用 Z-Blog API

```bash
# 使用 Z-Blog 的 XML-RPC API
curl -X POST http://your-zblog-domain.com/zb_system/xml-rpc/ \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0"?>
<methodCall>
  <methodName>blogger.getUsersBlogs</methodName>
  <params>
    <param><value><string>your_username</string></value></param>
    <param><value><string>your_password</string></value></param>
  </params>
</methodCall>'
```

---

## 格式转换

### 创建转换脚本

创建 `convert-zblog.js`：

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 读取导出的数据
const postsData = JSON.parse(fs.readFileSync('./zblog-posts.json', 'utf-8'));

const postsDir = './src/content/posts';

// 确保输出目录存在
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

postsData.forEach(post => {
  // 解析内容
  let content = post.log_Content;
  
  // 处理 Z-Blog 的摘要
  const intro = post.log_Intro || '';
  
  // 创建 frontmatter
  const frontmatter = {
    title: post.log_Title,
    description: intro.replace(/<[^>]+>/g, '').slice(0, 100) || 
                 content.replace(/<[^>]+>/g, '').split('\n')[0]?.slice(0, 100) || '',
    pubDate: new Date(post.log_PostTime * 1000).toISOString().split('T')[0],
    updatedDate: post.log_UpdateTime ? 
      new Date(post.log_UpdateTime * 1000).toISOString().split('T')[0] : undefined,
    tags: post.log_Tag ? post.log_Tag.split(',').map(t => t.trim()) : [],
    category: post.category_name || '',
    draft: post.log_Status !== 0
  };
  
  // 生成文件名
  const slug = post.log_Title.replace(/[^\w\u4e00-\u9fa5]/g, '-').toLowerCase();
  const fileName = `${slug}.md`;
  const filePath = path.join(postsDir, fileName);
  
  // 写入文件
  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent);
  
  console.log(`✅ Converted: ${fileName}`);
});
```

### 处理 Z-Blog 特有内容

```javascript
// fix-zblog-content.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 处理 Z-Blog 的 UBB 标签
  content = content.replace(/\[b\]([\s\S]*?)\[\/b\]/g, '**$1**');
  content = content.replace(/\[i\]([\s\S]*?)\[\/i\]/g, '*$1*');
  content = content.replace(/\[u\]([\s\S]*?)\[\/u\]/g, '<u>$1</u>');
  content = content.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/g, '[$2]($1)');
  content = content.replace(/\[img\]([\s\S]*?)\[\/img\]/g, '![]($1)');
  
  // 处理 Z-Blog 的代码块
  content = content.replace(
    /\[code\]([\s\S]*?)\[\/code\]/g,
    '```\n$1```'
  );
  
  // 处理 Z-Blog 的图片路径
  content = content.replace(
    /!\[([^\]]*)\]\(\/zb_users\/upload\/([^)]+)\)/g,
    '![$1](/images/posts/$2)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed content: ${file}`);
});
```

### 运行转换

```bash
npm install gray-matter
node convert-zblog.js
node fix-zblog-content.js
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
cp -r /path/to/zblog/zb_users/upload/* public/images/posts/
```

### 2. 处理 Z-Blog 的附件

Z-Blog 的附件通常在 `zb_users/upload/` 目录：

```bash
# 复制所有附件
find /path/to/zblog/zb_users/upload -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) -exec cp {} public/images/posts/ \;
```

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: Z-Blog 的 UBB 标签如何处理？

A: UBB 标签需要转换为 Markdown：

```markdown
<!-- Z-Blog UBB 标签 -->
[b]粗体[/b]
[i]斜体[/i]
[url=http://example.com]链接[/url]
[img]http://example.com/image.jpg[/img]

<!-- Mizuki 格式 -->
**粗体**
*斜体*
[链接](http://example.com)
![](http://example.com/image.jpg)
```

### Q: Z-Blog 的分类层级如何处理？

A: Z-Blog 的分类会被转换为 Mizuki 的分类和标签：

```yaml
# Z-Blog 格式
分类: 技术
标签: 前端, JavaScript

# Mizuki 格式
category: 技术
tags: [前端, JavaScript]
```

### Q: 如何处理 Z-Blog 的静态页面？

A: Z-Blog 的静态页面需要转换为 Mizuki 的特殊页面：

```bash
# 导出静态页面
mysql -u root -p zblog -e "
  SELECT * FROM zblog_post
  WHERE log_Type = 1 AND log_Status = 0
  INTO OUTFILE '/tmp/zblog-pages.csv'
"
```

### Q: Z-Blog 的评论如何处理？

A: Mizuki 使用第三方评论系统。你需要：

1. 导出 Z-Blog 评论数据
2. 配置 Mizuki 的评论系统（如 Twikoo、Waline 等）
3. 将评论数据导入新评论系统

### Q: 如何保留 Z-Blog 的永久链接？

A: Mizuki 使用文件名作为 URL。如果需要保留 Z-Blog 的永久链接格式：

```yaml
---
slug: my-custom-url
---
```

---

## 迁移检查清单

- [ ] Z-Blog 数据已备份
- [ ] 文章已导出
- [ ] 图片已复制
- [ ] UBB 标签已转换
- [ ] HTML 已转换为 Markdown
- [ ] Frontmatter 已创建
- [ ] 分类和标签已整理
- [ ] 静态页面已转换
- [ ] 评论系统已配置
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Z-Blog 的内容格式较为特殊，特别是 UBB 标签，建议转换后仔细检查每个文件。
