import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind'
import { headConfig } from './head.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "vp",
  
  title: "Asterris",
  description: "Protect What You Love.",
  lang: 'zh-CN',
  
  // Sitemap configuration
  sitemap: {
    hostname: 'https://ycenzh.github.io'
  },

  head: headConfig,

  markdown: {
    lineNumbers: true
  },

  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: '搜索',
        placeholder: '旧语新知',
        emptyText: '空空如也',
        heading: '共: {{searchResult}} 条结果',
        customSearchQuery: chineseSearchOptimize,
      })
    ]
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: "Let's Go", link: '/go' },
      { text: 'Github', link: 'https://github.com/yCENzh' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yCENzh' }
    ],

    sidebar: generateSidebar({
      documentRootPath: 'vp',
      useTitleFromFrontmatter: true,
      useTitleFromFileHeading: true,
      collapsed: true,
      useFolderLinkFromSameNameSubFile: true,
      rootGroupText: '往事书',
    })
  }
})