---
title: 版权信息配置
description: 配置文章版权信息显示
---

版权信息功能可以在文章底部显示版权声明，保护原创内容。

## 配置位置

版权信息配置位于 `src/config/licenseConfig.ts` 文件中。

## 配置项详解

```typescript
// src/config/licenseConfig.ts
import type { LicenseConfig } from "../types/config";

export const licenseConfig: LicenseConfig = {
  enable: true, // 启用版权信息
  name: "CC BY-NC-SA 4.0", // 许可证名称
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 许可证链接
};
```

### enable

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否启用版权信息功能。设为 `false` 将不显示文章底部的版权信息。

### name

- **类型**: `string`
- **默认值**: `"CC BY-NC-SA 4.0"`
- **说明**: 许可证名称，显示在文章底部

### url

- **类型**: `string`
- **默认值**: Creative Commons 许可证链接
- **说明**: 许可证详情页面的 URL

## 常用许可证

| 许可证 | 说明 |
|--------|------|
| `CC BY 4.0` | 署名 |
| `CC BY-SA 4.0` | 署名-相同方式共享 |
| `CC BY-NC 4.0` | 署名-非商业性使用 |
| `CC BY-NC-SA 4.0` | 署名-非商业性使用-相同方式共享 |
| `CC BY-ND 4.0` | 署名-禁止演绎 |
| `CC BY-NC-ND 4.0` | 署名-非商业性使用-禁止演绎 |
| `MIT` | MIT 许可证 |
| `Apache-2.0` | Apache 许可证 2.0 |
