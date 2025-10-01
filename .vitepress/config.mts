import { defineConfig } from 'vitepress'
// 由于 vitepress-plugin-sidebar 是 CommonJS 模块，需要使用默认导入
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
      { text: 'Examples', link: '/markdown-examples' }
    ],

    // 使用 vitepress-plugin-sidebar 自动生成侧边栏
    sidebar: sidebarPlugin({
      contentRoot: '', // 相对于 srcDir ('vp') 的根目录
      contentDirs: ['.'], // 扫描 srcDir ('vp') 下的所有内容
      ignoreMDFiles: ['index.md'], // 忽略 index.md 文件
      collapsible: true, // 支持折叠
      collapsed: false, // 默认展开
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})