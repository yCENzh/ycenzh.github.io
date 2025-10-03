// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './index.css'
import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout
} satisfies Theme