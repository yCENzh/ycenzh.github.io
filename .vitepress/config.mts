import { defineConfig } from 'vitepress'
import sidebarPlugin from 'vitepress-plugin-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "vp",
  
  title: "Asterris",
  description: "Protect What You Love.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: "Let's Go", link: '/go' },
      { text: 'Github', link: 'https://github.com/yCENzh' }
    ],

    sidebar: sidebarPlugin.sideBar('', {
      ignoreMDFiles: ['index.md'], // 忽略 index.md 文件
      collapsible: true, // 支持折叠
      collapsed: false, // 默认展开
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})