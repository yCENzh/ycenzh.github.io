---
title: Fancybox
description: Astro项目中fancybox的具体实现
---

# Fancybox 灯箱替换 PhotoSwipe 指南

本文档详细说明如何将 Mizuki 主题中的 PhotoSwipe 灯箱替换为 Fancybox。

Fuck matsuzaka-yuki,谁教你这么写相册页面的

## 1. 当前 PhotoSwipe 实现分析

PhotoSwipe 的实现主要在以下文件中：

1. `src/layouts/Layout.astro` - PhotoSwipe 初始化脚本
2. `src/styles/photoswipe.css` - PhotoSwipe 样式定制
3. `package.json` - PhotoSwipe 依赖

### 1.1 PhotoSwipe 初始化代码

在 `src/layouts/Layout.astro` 文件末尾，有以下 PhotoSwipe 初始化代码：

```javascript
<script>
import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

let lightbox: PhotoSwipeLightbox

function createPhotoSwipe() {
  lightbox = new PhotoSwipeLightbox({
    gallery: ".custom-md img, #post-cover img, .moment-images img",
    pswpModule: () => import("photoswipe"),
    closeSVG: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-424Z"/></svg>',
    zoomSVG: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M340-540h-40q-17 0-28.5-11.5T260-580q0-17 11.5-28.5T300-620h40v-40q0-17 11.5-28.5T380-700q17 0 28.5 11.5T420-660v40h40q17 0 28.5 11.5T500-580q0 17-11.5 28.5T460-540h-40v40q0 17-11.5 28.5T380-460q-17 0-28.5-11.5T340-500v-40Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>',
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    wheelToZoom: true,
    arrowPrev: false,
    arrowNext: false,
    imageClickAction: 'close',
    tapAction: 'close',
    doubleTapAction: 'zoom',
  })

  // Add filter BEFORE lightbox is initialized
  lightbox.addFilter("domItemData", (itemData, element) => {
    if (element instanceof HTMLImageElement) {
      itemData.src = element.src

      itemData.w = Number(element.naturalWidth || window.innerWidth)
      itemData.h = Number(element.naturalHeight || window.innerHeight)

      itemData.msrc = element.src
    }

    return itemData
  })

  // Initialize lightbox AFTER adding filters
  lightbox.init()
}

const setup = () => {
  if (!lightbox) {
    createPhotoSwipe()
  }
  window.swup.hooks.on("page:view", () => {
    createPhotoSwipe()
  })

  window.swup.hooks.on(
    "content:replace",
    () => {
      lightbox?.destroy?.()
    },
    { before: true },
  )
}

if (window.swup) {
  setup()
} else {
  document.addEventListener("swup:enable", setup)
}
</script>
```

### 1.2 PhotoSwipe 样式文件

在 `src/styles/photoswipe.css` 文件中：

```css
/* PhotoSwipe 按钮样式 */
.pswp__button {
    @apply transition bg-black/40 hover:bg-black/50 active:bg-black/60 flex items-center justify-center mr-0 w-12 h-12 !important;
}
.pswp__button--zoom, .pswp__button--close {
    @apply mt-4 rounded-xl active:scale-90 !important;
}
.pswp__button--zoom {
    @apply mr-2.5 !important;
}
.pswp__button--close {
    @apply mr-4 !important;
}
```

## 2. 替换步骤

### 2.1 安装 Fancybox 依赖

您已经运行了 `pnpm add @fancyapps/ui`，这会安装 Fancybox 所需的依赖。

### 2.2 修改 Layout.astro 文件

需要替换 PhotoSwipe 初始化代码为 Fancybox 初始化代码。

#### 2.2.1 删除 PhotoSwipe 相关代码

删除 `src/layouts/Layout.astro` 文件末尾的整个 PhotoSwipe 脚本部分。

#### 2.2.2 添加 Fancybox 初始化代码

在相同位置添加以下 Fancybox 初始化代码：

```javascript
<script>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function initFancybox() {
  // 销毁现有的 Fancybox 实例（如果存在）
  Fancybox.close();
  
  // 为相册图片添加 Fancybox 支持
  Fancybox.bind(".custom-md img, #post-cover img, .moment-images img", {
    groupAll: true,
    Thumbs: {
      autoStart: true,
      showOnStart: "yes",
    },
    // 添加自定义按钮
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [
          "zoomIn",
          "zoomOut",
          "toggle1to1",
          "rotateCCW",
          "rotateCW",
          "flipX",
          "flipY",
        ],
        right: ["slideshow", "thumbs", "close"],
      },
    },
    // 动画效果
    animated: true,
    // 是否支持拖拽
    dragToClose: true,
    // 是否支持键盘导航
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    // 自适应图片大小
    fitToView: true,
    // 图片预加载
    preload: 3,
    // 循环浏览
    infinite: true,
    // 智能图片适配
    Panzoom: {
      maxScale: 3,
      minScale: 1,
    },
    // 幻灯片设置
    Carousel: {
      transition: "slide",
      preload: 2,
    },
  });
  
  // 为相册中的链接添加 Fancybox 支持
  Fancybox.bind(".moment-images a[data-fancybox]", {
    Thumbs: {
      autoStart: true,
      showOnStart: "yes",
    },
    // 工具栏配置
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [
          "zoomIn",
          "zoomOut",
          "toggle1to1",
          "rotateCCW",
          "rotateCW",
          "flipX",
          "flipY",
        ],
        right: ["slideshow", "thumbs", "close"],
      },
    },
    // 动画效果
    animated: true,
    // 是否支持拖拽
    dragToClose: true,
    // 是否支持键盘导航
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    // 自适应图片大小
    fitToView: true,
    // 图片预加载
    preload: 3,
    // 循环浏览
    infinite: true,
    // 智能图片适配
    Panzoom: {
      maxScale: 3,
      minScale: 1,
    },
    // 自定义源获取
    source: (el) => {
      return el.getAttribute("data-src") || el.getAttribute("href");
    }
  });
  
  // 为单独的 fancybox 图片添加支持
  Fancybox.bind("[data-fancybox]:not(.moment-images a)", {
    // 自定义选项
    Thumbs: {
      autoStart: true,
      showOnStart: "yes",
    },
    // 工具栏配置
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [
          "zoomIn",
          "zoomOut",
          "toggle1to1",
          "rotateCCW",
          "rotateCW",
          "flipX",
          "flipY",
        ],
        right: ["slideshow", "thumbs", "close"],
      },
    },
    // 动画效果
    animated: true,
    // 是否支持拖拽
    dragToClose: true,
    // 是否支持键盘导航
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    // 自适应图片大小
    fitToView: true,
    // 图片预加载
    preload: 3,
    // 循环浏览
    infinite: true,
    // 智能图片适配
    Panzoom: {
      maxScale: 3,
      minScale: 1,
    },
  });
}

const setup = () => {
  // 初始化 Fancybox
  initFancybox();
  
  // 在页面视图更改时重新初始化
  window.swup.hooks.on("page:view", () => {
    // 等待 DOM 更新后初始化
    setTimeout(() => {
      initFancybox();
    }, 100);
  });
}

if (window.swup) {
  setup()
} else {
  document.addEventListener("swup:enable", setup)
  
  // 如果 swup 尚未初始化，则直接初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFancybox);
  } else {
    initFancybox();
  }
}
</script>
```

### 2.3 更新相册页面链接属性

需要更新相册页面中的图片链接属性，以支持 Fancybox 并避免默认跳转行为。

修改 `src/pages/albums/[id]/index.astro` 文件中的图片链接部分：

将原来的：

```astro
<a 
  href={photo.src}
  data-pswp-width={photo.width || 1200}
  data-pswp-height={photo.height || 800}
  target="_blank"
  class="block"
>
```

替换为：

```astro
<a 
  href="javascript:void(0)"
  data-src={photo.src}
  data-fancybox="gallery"
  data-caption={photo.title || photo.alt}
  class="block"
>
```

这样可以避免默认的链接跳转行为，同时让 Fancybox 正确显示图片。

### 2.4 添加 Fancybox 自定义样式（可选）

如果需要自定义 Fancybox 的外观，可以在 `src/styles/` 目录下创建一个新的 CSS 文件，例如 `fancybox-custom.css`：

```css
/* Fancybox 自定义样式 */
.fancybox__container {
  --fancybox-bg: rgba(0, 0, 0, 0.9);
  --fancybox-thumbs-width: 64px;
  --fancybox-thumbs-ratio: 1;
  --fancybox-thumbs-border-radius: 4px;
}

.fancybox__toolbar {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  padding: 8px;
  backdrop-filter: blur(4px);
}

.fancybox__caption {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  font-size: 1rem;
  padding: 1rem;
  text-align: center;
  backdrop-filter: blur(4px);
  border-radius: 8px;
  margin: 0 1rem 1rem 1rem;
}

.fancybox__nav {
  --carousel-button-svg-width: 24px;
  --carousel-button-svg-height: 24px;
}

.fancybox__thumbs {
  background: rgba(0, 0, 0, 0.7);
  padding: 2px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.fancybox__thumb {
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.fancybox__thumb.is-loading {
  background: rgba(255, 255, 255, 0.1);
}

.fancybox__thumb:hover {
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.fancybox__thumb.is-active {
  border-color: #fff;
}

/* 按钮样式 */
.fancybox__button {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.fancybox__button:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.fancybox__button svg {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
}

.fancybox__infobar {
  color: white;
  font-size: 0.9rem;
  padding: 0 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .fancybox__toolbar {
    padding: 4px;
  }
  
  .fancybox__button {
    width: 36px;
    height: 36px;
  }
  
  .fancybox__caption {
    font-size: 0.9rem;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem 0.5rem;
  }
  
  .fancybox__thumbs {
    --fancybox-thumbs-width: 48px;
  }
}

@media (max-width: 480px) {
  .fancybox__button {
    width: 32px;
    height: 32px;
  }
  
  .fancybox__caption {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
  
  .fancybox__thumbs {
    --fancybox-thumbs-width: 40px;
  }
}
```

然后在 `src/layouts/Layout.astro` 中导入这个样式文件：

```astro
<link rel="stylesheet" href="/styles/fancybox-custom.css" />
```

## 3. Fancybox 配置选项

以下是一些常用的 Fancybox 配置选项：

### 3.1 基本配置

```javascript
Fancybox.bind("[data-fancybox]", {
  // 启动时显示缩略图
  Thumbs: {
    autoStart: true,
    showOnStart: "yes",
  },
  // 工具栏配置
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: [
        "zoomIn",
        "zoomOut",
        "toggle1to1",
        "rotateCCW",
        "rotateCW",
        "flipX",
        "flipY",
      ],
      right: ["slideshow", "thumbs", "close"],
    },
  },
  // 动画效果
  animated: true,
  // 是否支持拖拽
  dragToClose: true,
  // 是否支持键盘导航
  keyboard: {
    Escape: "close",
    Delete: "close",
    Backspace: "close",
    PageUp: "next",
    PageDown: "prev",
    ArrowUp: "next",
    ArrowDown: "prev",
    ArrowRight: "next",
    ArrowLeft: "prev",
  },
});
```

### 3.2 高级配置

```javascript
Fancybox.bind("[data-fancybox]", {
  // 自适应图片大小
  fitToView: true,
  // 图片预加载
  preload: 3,
  // 循环浏览
  infinite: true,
  // 幻灯片播放间隔（毫秒）
  slideshow: {
    autoplay: false,
    delay: 3000,
  },
  // 缩放选项
  Panzoom: {
    maxScale: 3,
    minScale: 1,
  },
  // 幻灯片设置
  Carousel: {
    transition: "slide",
    preload: 2,
  },
  // 移动端优化
  mobile: {
    click: "close",
    tap: "close",
    doubleTap: "zoom",
  },
});
```

## 4. 测试验证

完成上述更改后，请执行以下步骤验证替换是否成功：

1. 运行开发服务器：`pnpm dev`
2. 访问相册页面，点击图片查看是否正常显示 Fancybox 灯箱
3. 检查控制台是否有错误信息
4. 测试不同设备上的显示效果

## 5. 注意事项

1. 保留 PhotoSwipe 依赖包，按照您的要求不删除
2. 确保 Fancybox 的 CSS 样式正确加载
3. 如果遇到图片加载问题，检查图片路径是否正确
4. 测试所有包含图片的页面，确保 Fancybox 正常工作

## 6. 故障排除

如果遇到问题，请检查以下几点：

1. 确认 `@fancyapps/ui` 已正确安装
2. 检查 Fancybox 初始化代码是否正确
3. 确认图片链接包含正确的 `data-fancybox` 属性
4. 查看浏览器控制台是否有错误信息