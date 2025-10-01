import { defineConfig } from 'vitepress'
import sidebarPlugin from 'vitepress-plugin-sidebar'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "vp",
  
  title: "Asterris",
  description: "Protect What You Love.",
  
  markdown: {
    lineNumbers: true
  },

  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: 'Search',
        placeholder: '往事书',
        emptyText: '空空如也',
        heading: '共: {{searchResult}} 条结果'
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

    sidebar: sidebarPlugin.sideBar('vp', {
      ignoreMDFiles: ['index'], // 只写文件名，不带.md扩展名
      collapsible: true, // 支持折叠
      collapsed: false, // 默认展开
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yCENzh' }
    ],

    search: {
      provider: 'local'
    }
  }
})