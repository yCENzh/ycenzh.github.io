---
title: 专栏
description: 专栏功能的实现方法
---

# 专栏

本文档详细介绍了如何在 Astro 博客项目中实现专栏（series）功能，包括数据结构设计、组件实现、配置更新等技术细节。

This document provides a detailed introduction on how to implement the series feature in an Astro blog project, including data structure design, component implementation, configuration updates, and other technical details.

## 功能概述

专栏功能允许将相关文章组织在一起，方便读者按主题浏览相关内容。该功能包括：
- 在文章 frontmatter 中指定所属专栏
- 在文章页面侧边栏显示同专栏的其他文章
- 支持响应式设计和折叠功能
- 完整的国际化支持

The series feature allows organizing related articles together, making it convenient for readers to browse related content by topic. This feature includes:
- Specifying the series in the article frontmatter
- Displaying other articles from the same series in the article page sidebar
- Supporting responsive design and collapse functionality
- Complete internationalization support

## 使用方法

1. 在文章 frontmatter 中添加 `series: "专栏名称"` 字段
2. 确保侧边栏配置中启用了 series 组件
3. 组件会自动显示同系列的其他文章

1. Add the `series: "series name"` field in the article frontmatter
2. Ensure the series component is enabled in the sidebar configuration
3. The component will automatically display other articles from the same series

## 实现步骤

### 1. 数据结构设计

#### Content Collections 配置

在 Astro 项目的 `src/content/config.ts` 文件中，需要为文章集合添加 series 字段：

In the Astro project's `src/content/config.ts` file, you need to add the series field to the posts collection:

```typescript
const postsCollection = defineCollection({
  schema: z.object({
    // ... 其他字段 ...
    series: z.string().optional(),
    // ... 其他字段 ...
  }),
});
```

#### Frontmatter 配置

在文章的 frontmatter 中添加 series 字段：

Add the series field in the article's frontmatter:

```yaml
---
title: 文章标题
published: 2023-01-01
series: "专栏名称"
---
```

### 2. 工具函数实现

在 `src/utils/content-utils.ts` 中添加获取同专栏文章的函数：

Add a function to get articles from the same series in `src/utils/content-utils.ts`:

```typescript
export async function getPostSeries(
  seriesName: string,
): Promise<{ body: string; data: CollectionEntry<"posts">["data"]; slug: string }[]> {
  const posts = (await getCollection('posts', ({ data }) => {
    return (
      (import.meta.env.PROD ? data.draft !== true : true) &&
      data.series === seriesName
    )
  })) as unknown as { body: string; data: CollectionEntry<"posts">["data"]; slug: string }[]

  posts.sort((a, b) => {
    const dateA = new Date(a.data.published)
    const dateB = new Date(b.data.published)
    return dateA > dateB ? 1 : -1
  })

  return posts
}
```

### 3. 组件实现

#### Series 组件

创建 `src/components/widget/Series.astro` 组件文件：

Create the `src/components/widget/Series.astro` component file:

```astro
---
import { getPostSeries } from '../../utils/content-utils'
import { getPostUrlBySlug } from '../../utils/url-utils'
import WidgetLayout from './WidgetLayout.astro'
import type { CollectionEntry } from "astro:content";
import { i18n } from '@i18n/translation';
import I18nKey from '@i18n/i18nKey';

const COLLAPSED_HEIGHT = '7.5rem'

interface Props {
  class?: string
  style?: string
  series: string
}
const className = Astro.props.class
const style = Astro.props.style
const seriesName = Astro.props.series

let series: { body: string; data: CollectionEntry<"posts">["data"]; slug: string }[] = []
let isCollapsed = false

if (seriesName) {
  series = await getPostSeries(seriesName)
  isCollapsed = series.length >= 10
}
---

{seriesName && series.length > 0 && (
  <WidgetLayout name={i18n(I18nKey.series) + " - " + seriesName} id="series" isCollapsed={isCollapsed} collapsedHeight={COLLAPSED_HEIGHT} class={className} style={style}>
      <div class="flex flex-col gap-1">
          {series.map((t) => (
              <a href={getPostUrlBySlug(t.slug)}
                  aria-label={t.data.title}
                  class="group btn-plain h-10 w-full rounded-lg hover:text-[initial]"
              >
                  <!-- dot and line -->
                  <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                      <div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                      bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                      outline outline-4 z-50
                      outline-[var(--card-bg)]
                      group-hover:outline-[var(--btn-plain-bg-hover)]
                      group-active:outline-[var(--btn-plain-bg-active)]
                      "
                      ></div>
                  </div>
                  <!-- post title -->
                  <div class="w-[85%] text-left font-bold
                      group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                      text-75 pr-15 whitespace-nowrap overflow-ellipsis overflow-hidden" title={t.data.title}
                  >
                          {t.data.title}
                  </div>
              </a>
          ))}
      </div>
  </WidgetLayout>
)}
```

### 4. 侧边栏集成

#### Widget Manager 更新

在 `src/utils/widget-manager.ts` 中注册 Series 组件：

Register the Series component in `src/utils/widget-manager.ts`:

```typescript
export const WIDGET_COMPONENT_MAP = {
  // ... 其他组件 ...
  series: "../components/widget/Series.astro",
  // ... 其他组件 ...
} as const;
```

#### SideBar 组件更新

在 `src/components/widget/SideBar.astro` 中添加组件映射和参数传递：

Add component mapping and parameter passing in `src/components/widget/SideBar.astro`:

```typescript
// 组件映射表
const componentMap = {
  // ... 其他组件 ...
  series: Series,
};

// 渲染组件的辅助函数
function renderComponent(component: any, index: number, components: any[]) {
  const ComponentToRender =
    componentMap[component.type as keyof typeof componentMap];
  if (!ComponentToRender) return null;

  const componentClass = widgetManager.getComponentClass(component, index);
  const componentStyle = widgetManager.getComponentStyle(component, index);

  return {
    Component: ComponentToRender,
    props: {
      class: componentClass,
      style: componentStyle,
      headings: component.type === "toc" ? headings : undefined,
      series: component.type === "series" ? series : undefined,
      ...component.customProps,
    },
  };
}
```

#### 配置更新

在 `src/config.ts` 中添加侧边栏组件配置：

Add sidebar component configuration in `src/config.ts`:

```typescript
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  // ... 其他配置 ...
  components: [
    // ... 其他组件 ...
    {
      type: "series",
      enable: true,
      order: 4,
      position: "sticky",
      class: "onload-animation",
      animationDelay: 200,
      responsive: {
        collapseThreshold: 10,
      },
    },
    // ... 其他组件 ...
  ],
  // ... 其他配置 ...
};
```

### 5. 布局和页面集成

#### MainGridLayout 更新

在 `src/layouts/MainGridLayout.astro` 中传递 series 参数：

Pass the series parameter in `src/layouts/MainGridLayout.astro`:

```astro
---
// ... 其他属性 ...
interface Props {
  // ... 其他属性 ...
  series?: string;
}
// ... 其他代码 ...
const {
  // ... 其他属性 ...
  series,
} = Astro.props;
---

<!-- 在 SideBar 组件中传递 series 参数 -->
<SideBar class={`${sidebarClass} ${transparentClass}`} headings={headings} series={series}></SideBar>
```

#### 文章页面更新

在 `src/pages/posts/[...slug].astro` 中传递 series 参数：

Pass the series parameter in `src/pages/posts/[...slug].astro`:

```astro
<MainGridLayout
    // ... 其他属性 ...
    series={entry.data.series}
>
```

### 6. 国际化支持

#### I18nKey 更新

在 `src/i18n/i18nKey.ts` 中添加键值：

Add key values in `src/i18n/i18nKey.ts`:

```typescript
enum I18nKey {
  // ... 其他键值 ...
  // 专栏
  series = "series",
  seriesOtherPosts = "seriesOtherPosts",
  // ... 其他键值 ...
}
```

#### 翻译文件更新

在各语言文件中添加翻译，例如 `src/i18n/languages/en.ts`：

Add translations in language files, for example `src/i18n/languages/en.ts`:

```typescript
export const en: Translation = {
  // ... 其他翻译 ...
  // Series
  [Key.series]: "Series",
  [Key.seriesOtherPosts]: "Other Posts in Series",
  // ... 其他翻译 ...
};
```