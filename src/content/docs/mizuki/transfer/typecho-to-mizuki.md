---
title: 从 Typecho 迁移
description: 将 Typecho 博客迁移到 Mizuki 主题的详细指南
---

Typecho 是一个轻量级的 PHP 博客程序。本文档介绍如何将 Typecho 博客迁移到 Mizuki。

## 前置准备

### 1. 备份 Typecho 数据

```bash
# 备份数据库
mysqldump -u root -p typecho > typecho-backup.sql

# 备份上传文件
cp -r /path/to/typecho/usr/uploads ~/typecho-uploads-backup
```

### 2. 安装 Mizuki

```bash
git clone https://github.com/LyraVoid/Mizuki.git
cd Mizuki
pnpm install
```

### 3. 获取数据库信息

从 Typecho 的 `config.inc.php` 获取数据库连接信息：

```php
$db = new Typecho_Db('Pdo_Mysql', 'typecho');
$db->addServer(array(
  'host' => 'localhost',
  'user' => 'your_username',
  'password' => 'your_password',
  'database' => 'typecho',
  charset => 'utf8mb4'
), Typecho_Db::READ | Typecho_Db::WRITE);
```

---

## 内容导出

### 方式 1：使用数据库导出

```bash
# 导出文章
mysql -u root -p typecho -e "
  SELECT 
    cid, title, slug, text, created, modified, 
    type, status, allowComment, password
  FROM typecho_contents 
  WHERE type = 'post' AND status = 'publish'
  INTO OUTFILE '/tmp/typecho-posts.csv'
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n';
"

# 导出分类和标签
mysql -u root -p typecho -e "
  SELECT 
    m.mid, m.name, m.slug, m.type, m.description,
    r.cid, r.mid
  FROM typecho_metas m
  LEFT JOIN typecho_relationships r ON m.mid = r.mid
  INTO OUTFILE '/tmp/typecho-metas.csv'
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n';
"
```

### 方式 2：使用 Typecho 插件

安装并使用 Typecho 的导出插件：

1. 登录 Typecho 后台
2. 进入 控制台 → 插件
3. 安装 "数据导出" 插件
4. 使用插件导出 Markdown 格式

### 方式 3：使用 API 导出

```bash
# 使用 Typecho 的 XML-RPC API
curl -X POST http://your-typecho-domain.com/xmlrpc.php \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0"?>
<methodCall>
  <methodName>metaWeblog.getRecentPosts</methodName>
  <params>
    <param><value><string>1</string></value></param>
    <param><value><string>your_username</string></value></param>
    <param><value><string>your_password</string></value></param>
    <param><value><int>1000</int></value></param>
  </params>
</methodCall>'
```

---

## 格式转换

### 创建转换脚本

创建 `convert-typecho.js`：

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 读取导出的数据
const postsData = JSON.parse(fs.readFileSync('./typecho-posts.json', 'utf-8'));

const postsDir = './src/content/posts';

// 确保输出目录存在
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

postsData.forEach(post => {
  // 解析 Markdown 内容
  let content = post.text;
  
  // Typecho 使用 {<!--more-->} 作为摘要分隔符
  const moreIndex = content.indexOf('<!--more-->');
  const excerpt = moreIndex > -1 ? content.slice(0, moreIndex) : content.split('\n')[0];
  
  // 创建 frontmatter
  const frontmatter = {
    title: post.title,
    description: excerpt.replace(/[#*]/g, '').trim().slice(0, 100),
    pubDate: new Date(post.created * 1000).toISOString().split('T')[0],
    updatedDate: post.modified ? new Date(post.modified * 1000).toISOString().split('T')[0] : undefined,
    tags: post.tags || [],
    category: post.category || '',
    draft: post.status !== 'publish'
  };
  
  // 生成文件名
  const fileName = `${post.slug}.md`;
  const filePath = path.join(postsDir, fileName);
  
  // 写入文件
  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent);
  
  console.log(`✅ Converted: ${fileName}`);
});
```

### 处理 Typecho 特有标签

```javascript
// fix-typecho-tags.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 移除摘要分隔符
  content = content.replace(/<!--more-->/g, '');
  
  // 处理 Typecho 的图片标签
  content = content.replace(
    /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g,
    '![$1]($2)'
  );
  
  // 处理 Typecho 的代码块
  content = content.replace(
    /\[code\s+lang(?:uage)?="([^"]+)"\]([\s\S]*?)\[\/code\]/g,
    '```$1\n$2```'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed tags: ${file}`);
});
```

### 运行转换

```bash
npm install gray-matter
node convert-typecho.js
node fix-typecho-tags.js
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
cp -r /path/to/typecho/usr/uploads/* public/images/posts/
```

### 2. 处理图片路径

Typecho 的图片路径通常是 `/usr/uploads/year/month/`，需要更新：

```javascript
// fix-upload-paths.js
const fs = require('fs');
const path = require('path');

const postsDir = './src/content/posts';

fs.readdirSync(postsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 替换 Typecho 上传路径
  content = content.replace(
    /!\[([^\]]*)\]\(\/usr\/uploads\/([^)]+)\)/g,
    '![$1](/images/posts/$2)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed upload paths: ${file}`);
});
```

### 3. 验证内容

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 查看文章
```

---

## 常见问题

### Q: Typecho 的密码保护文章如何处理？

A: Mizuki 不支持密码保护文章，需要移除密码或设置为草稿：

```yaml
# 设置为草稿
draft: true
```

### Q: Typecho 的自定义字段如何处理？

A: Typecho 的自定义字段需要手动转换为 frontmatter：

```yaml
# Typecho 自定义字段
fields:
  subtitle: 文章副标题
  banner: /images/banner.jpg

# Mizuki frontmatter
subtitle: 文章副标题
image: /images/banner.jpg
```

### Q: 如何处理 Typecho 的页面？

A: Typecho 的页面（Pages）需要转换为 Mizuki 的特殊页面：

```bash
# 导出页面
mysql -u root -p typecho -e "
  SELECT * FROM typecho_contents 
  WHERE type = 'page' AND status = 'publish'
  INTO OUTFILE '/tmp/typecho-pages.csv'
"
```

### Q: Typecho 的评论如何处理？

A: Mizuki 使用第三方评论系统。你需要：

1. 导出 Typecho 评论数据
2. 配置 Mizuki 的评论系统（如 Twikoo、Waline 等）
3. 将评论数据导入新评论系统

### Q: 如何保留 Typecho 的永久链接？

A: Mizuki 使用文件名作为 URL。如果需要保留 Typecho 的永久链接格式：

```yaml
---
slug: my-custom-url
---
```

---

## 迁移检查清单

- [ ] Typecho 数据已备份
- [ ] 文章已导出
- [ ] 图片已复制
- [ ] Frontmatter 已转换
- [ ] 图片路径已更新
- [ ] 分类和标签已整理
- [ ] 页面已转换
- [ ] 评论系统已配置
- [ ] 开发服务器测试通过
- [ ] 构建测试通过

> 💡 **提示**：Typecho 的 Markdown 内容与 Mizuki 兼容性较好，主要需要调整 frontmatter 和图片路径。
