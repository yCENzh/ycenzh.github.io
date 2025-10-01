# Astro 博客 Umami 集成实现分析

本文档详细分析了 Astro 博客项目中 Umami 网站分析工具的实现方式，包括跟踪脚本集成、数据获取和访问量显示功能。

## 功能概述

Umami 是一个开源、轻量级、注重隐私的网站分析工具。在 Astro 博客中集成 Umami 可以帮助网站所有者：

- 跟踪网站访问量和用户行为
- 保护用户隐私，不使用 Cookie
- 提供简洁直观的分析仪表板
- 支持自建服务部署

## 实现分析

### 1. 基础配置

在 `src/config.ts` 文件中配置 Umami 相关参数：

```typescript
export const umamiConfig = {
  enabled: false, // 是否启用 Umami 统计
  shareURL: "https://us.umami.is/api/share/ABCD1234", // 分享 API 地址，支持自建服务
  scripts: `
<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // Umami 跟踪脚本
} as const;
```

### 2. 跟踪脚本集成

Umami 通过在网站中插入跟踪脚本来收集访问数据。跟踪脚本需要包含：

- `src`: Umami 服务的脚本地址
- `data-website-id`: 网站的唯一标识符
- `defer`: 延迟加载脚本以提高页面性能

### 3. 数据获取脚本

项目中包含 `public/js/umami-share.js` 文件，用于从 Umami 服务获取分享数据：

```javascript
(function (global) {
  const cacheKey = 'umami-share-cache';
  const cacheTTL = 3600_000; // 1小时缓存

  async function fetchShareData(baseUrl, shareId) {
    // 缓存机制实现
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < cacheTTL) {
          return parsed.value;
        }
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }
    
    // 从 Umami API 获取数据
    const res = await fetch(`${baseUrl}/api/share/${shareId}`);
    if (!res.ok) {
      throw new Error('获取 Umami 分享信息失败');
    }
    const data = await res.json();
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), value: data }));
    return data;
  }

  /**
   * 获取 Umami 分享数据（websiteId、token）
   * 在缓存 TTL 内复用；并用全局 Promise 避免并发请求
   */
  global.getUmamiShareData = function (baseUrl, shareId) {
    if (!global.__umamiSharePromise) {
      global.__umamiSharePromise = fetchShareData(baseUrl, shareId).catch((err) => {
        delete global.__umamiSharePromise;
        throw err;
      });
    }
    return global.__umamiSharePromise;
  };

  global.clearUmamiShareCache = function () {
    localStorage.removeItem(cacheKey);
    delete global.__umamiSharePromise;
  };
})(window);
```

### 4. 配置参数详解

- `enabled`: 控制是否在网站中启用 Umami 统计功能
- `shareURL`: Umami 分享 API 的地址，用于获取网站统计信息
- `scripts`: Umami 跟踪脚本，需要替换为实际的跟踪代码

## 部署方式

### 1. 使用 Umami Cloud 服务

1. 访问 [Umami Cloud](https://umami.is/) 注册账号
2. 创建新网站并获取跟踪代码
3. 将跟踪代码填入配置文件的 `scripts` 字段中
4. 设置 `enabled` 为 `true`

### 2. 自建 Umami 服务

1. 部署 Umami 服务到您的服务器（参考官方文档）
2. 登录 Umami 管理后台
3. 创建新网站并获取网站 ID
4. 将跟踪代码填入配置文件的 `scripts` 字段中
5. 设置 `enabled` 为 `true`

## 访问量显示实现

### 当前状态分析

通过代码分析发现，项目中已包含 Umami 集成的基础配置和数据获取脚本，但尚未实现前端访问量显示功能。当前实现包括：

1. Umami 跟踪脚本配置
2. 数据获取和缓存机制
3. 基础的配置选项

### 实现建议

要在前端显示访问量，可以按以下步骤实现：

#### 1. 创建访问量显示组件

创建一个新的 Astro 组件用于显示访问量数据：

```astro
---
// src/components/widget/VisitCounter.astro
import { umamiConfig } from '../../config';

// 从配置中提取 shareURL 和网站 ID
const shareUrl = umamiConfig.shareURL;
const websiteId = umamiConfig.scripts.match(/data-website-id="([^"]+)"/)?.[1];

// 获取访问量数据的函数
async function getVisitCount() {
  if (!shareUrl || !websiteId) return 0;
  
  try {
    // 这里需要根据实际的 Umami API 调整
    const response = await fetch(`${shareUrl}`);
    const data = await response.json();
    // 根据实际返回的数据结构提取访问量
    return data?.pageviews?.value || 0;
  } catch (error) {
    console.error('获取访问量数据失败:', error);
    return 0;
  }
}

const visitCount = await getVisitCount();
---
```

#### 2. 在页面中使用组件

在需要显示访问量的页面中引入并使用组件：

```astro
---
import VisitCounter from '../components/widget/VisitCounter.astro';
---
<VisitCounter />
```

#### 3. 添加到侧边栏

将访问量显示组件添加到侧边栏配置中：

```typescript
// src/config.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  components: [
    // ... 其他组件
    {
      type: "visit-counter",
      enable: true,
      order: 5,
      position: "sticky",
      class: "onload-animation",
      animationDelay: 250,
    },
  ],
};
```

## 高级功能

### 1. 自定义事件跟踪

在页面中添加自定义事件跟踪：

```javascript
// 跟踪自定义事件
umami.track('event-name', { data: 'value' });

// 跟踪页面视图
umami.trackView('/custom-page');

// 跟踪链接点击
umami.trackLink('https://example.com', 'External Link');
```

### 2. 忽略特定页面

通过设置 `data-umami-ignore` 属性忽略特定页面的跟踪：

```html
<html data-umami-ignore>
  <!-- 页面内容 -->
</html>
```

### 3. 忽略特定元素

通过设置 `data-umami-ignore` 属性忽略特定元素的交互跟踪：

```html
<button data-umami-ignore>不跟踪点击的按钮</button>
```

## 隐私保护

Umami 注重用户隐私保护：

- 不使用 Cookie
- 不收集个人身份信息
- 不与第三方共享数据
- 符合 GDPR 和 CCPA 等隐私法规

## 故障排除

### 1. 数据未显示

- 检查跟踪脚本是否正确加载
- 确认网站 ID 是否正确
- 查看浏览器控制台是否有错误信息
- 检查 Umami 服务是否正常运行

### 2. 脚本加载缓慢

- 确保 Umami 服务响应正常
- 考虑使用 CDN 加速
- 检查网络连接情况

### 3. 配置错误

- 验证配置文件中的 URL 和 ID 是否正确
- 确认 `enabled` 参数设置为 `true`
- 检查是否有语法错误

## 最佳实践

1. **定期检查数据**: 定期查看分析数据，了解网站访问趋势
2. **保护隐私**: 确保遵守相关隐私法规
3. **性能优化**: 监控 Umami 脚本对网站性能的影响
4. **备份配置**: 定期备份 Umami 配置和数据

## 相关资源

- [Umami 官方网站](https://umami.is/)
- [Umami GitHub 仓库](https://github.com/umami-software/umami)
- [Umami 文档](https://umami.is/docs/)