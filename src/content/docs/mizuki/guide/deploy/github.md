---
title: 部署到 GitHub Pages
description: 如何将 Mizuki 博客部署到 GitHub Pages
---

:::caution[注意]
GitHub Pages 不是推荐的部署方式，建议使用 [Vercel](/mizuki/guide/deploy/vercel) 或 [Netlify](/mizuki/guide/deploy/netlify)。
:::

## 配置 base 路径

在 `astro.config.mjs` 中配置 `base` 选项：

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  base: 'my-repo',
})
```

:::note[说明]
`base` 的值应该是你的仓库名称，以正斜杠开头，例如 `/my-blog`。这样做是为了让 Astro 理解你的网站根目录是 `/my-repo`，而不是默认的 `/`。[点击查看更多`base`值相关信息](https://docs.astro.build/zh-cn/reference/configuration-reference/#base)

当配置了这个值后，你所有的内部页面链接都必须以你的 base 值作为前缀：
```html
<a href="/my-repo/about">关于本站</a>
```
:::

## 部署到自定义域名

你需要在 `src/config/siteConfig.ts` 中配置 [`site`](https://docs.astro.build/zh-cn/reference/configuration-reference/#site) 为你的自定义域名：

```ts
siteURL: "https://mizuki.mysqil.com/"
```

### 在 GitHub Pages 上使用自定义域名

你可以选择通过将一个 `./public/CNAME` 文件添加到你的项目中，来设置自定义域：

```
sub.mydomain.com
```

要配置 Astro 以在 GitHub Pages 上使用自定义域名，请将你的域名设置为 `site` 的值。不要为 `base` 设置值：

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
    site: 'https://example.com',
})
```

## 配置 GitHub Action

1. 在你的项目中的 `.github/workflows/` 目录创建一个新文件 `deploy.yml`，参考 Mizuki 项目中的 [deploy.yml](https://github.com/yCENzh/ycenzh.github.io/blob/main/.github/workflows/deploy.yml) 工作流配置

2. （可选）如果你在本地开发期间或预览构建期间将环境变量传入给 Astro 项目，则需要在 `deploy.yml` 文件中定义它们：

```yaml
jobs:
   build:
     runs-on: ubuntu-latest
     steps:
       - name: Checkout your repository using git
         uses: actions/checkout@v4
       - name: Install, build, and upload your site
         uses: withastro/action@v3
         env:
           # 在此添加你的环境变量
           ENABLE_CONTENT_SYNC: 'true'
           CONTENT_REPO_URL: ${{ secrets.CONTENT_REPO_URL }}
```

3. 在 GitHub 上，跳转到存储库的 **Settings** 选项卡并找到 **Pages** 部分
4. 选择 **GitHub Actions** 作为你网站的 Source，然后按 **Save**

:::tip[提示]
提交前记得把 workflows 里的另外两个文件删了，不然 action 会报错哦OvO
:::

你的网站现在应该已完成发布了！当你将更改推送到 Astro 项目的存储库时，GitHub Action 将自动为你部署它们。

## 内容分离模式

如果使用内容分离功能，需要在 GitHub 仓库中配置 Secrets：

1. 进入仓库 Settings → Secrets and variables → Actions
2. 添加以下 Secrets：

| Secret 名称 | 值 | 说明 |
|-------------|---|------|
| `CONTENT_REPO_URL` | `https://github.com/...` | 内容仓库地址 |

3. 在 `deploy.yml` 中启用环境变量：

```yaml
- name: Build site
  run: pnpm run build
  env:
    ENABLE_CONTENT_SYNC: true
    CONTENT_REPO_URL: ${{ secrets.CONTENT_REPO_URL }}
    USE_SUBMODULE: true
```

### 私有内容仓库配置

**同账号私有仓库**（推荐）：
- 无需额外配置，自动使用 `GITHUB_TOKEN` 访问

**跨账号私有仓库（SSH）**：

```yaml
- name: Setup SSH Key
  uses: webfactory/ssh-agent@v0.8.0
  with:
    ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

- name: Checkout
  uses: actions/checkout@v4
  with:
    submodules: true
```

在 Secrets 中添加：
- `SSH_PRIVATE_KEY`：SSH 私钥内容
- `CONTENT_REPO_URL`：`git@github.com:other-user/repo.git`

更多详情请参考 [内容分离配置](/mizuki/other/separation/)。
