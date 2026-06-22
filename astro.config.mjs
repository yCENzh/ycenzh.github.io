// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'straight',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			
			components: {
				Footer: './src/components/Footer.astro',
			},
			
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'Mizuki 主题文档',
					items: [
						{
							label: '从这里开始',
							items: [
								{ label: '主题介绍', slug: 'mizuki/guide/intro' },
								{ label: '快速开始', slug: 'mizuki/guide/get-started' },
								{
									label: '部署',
									items: [
										{ label: 'Vercel (推荐)', slug: 'mizuki/guide/deploy/vercel' },
										{ label: 'Netlify', slug: 'mizuki/guide/deploy/netlify' },
										{ label: 'GitHub Pages', slug: 'mizuki/guide/deploy/github' },
										{ label: 'Cloudflare Pages', slug: 'mizuki/guide/deploy/cloudflare' },
										{ label: 'EdgeOne Pages (推荐)', slug: 'mizuki/guide/deploy/edge' },
										{ label: '服务器部署', slug: 'mizuki/guide/deploy/server' },
										{ label: 'Docker 部署', slug: 'mizuki/guide/deploy/docker' },
										{ label: '本地构建', slug: 'mizuki/guide/deploy/local' },
									],
								},
							],
						},
						{
							label: '基础布局',
							items: [
								{ label: '基础配置', slug: 'mizuki/basic-layout/site-config' },
								{ label: '横幅配置', slug: 'mizuki/basic-layout/layout/banner' },
								{ label: '全屏布局', slug: 'mizuki/basic-layout/layout/fullscreen' },
								{ label: '纯色背景配置', slug: 'mizuki/basic-layout/layout/hide' },
								{ label: '页脚配置', slug: 'mizuki/basic-layout/footer' },
								{ label: '页面自动缩放', slug: 'mizuki/basic-layout/auto-res-algo' },
								{ label: '导航栏配置', slug: 'mizuki/basic-layout/navbarconfig' },
								{ label: '自定义字体', slug: 'mizuki/basic-layout/font' },
							],
						},
						{
							label: '文章布局',
							items: [
								{ label: '目录导航配置', slug: 'mizuki/article-layout/toc' },
								{ label: '分享组件配置', slug: 'mizuki/article-layout/share' },
								{ label: '编辑历史', slug: 'mizuki/article-layout/edit-history' },
								{ label: '版权信息配置', slug: 'mizuki/article-layout/copyright' },
								{ label: '代码块配置', slug: 'mizuki/article-layout/codeblock' },
								{ label: 'Twikoo 评论系统', slug: 'mizuki/article-layout/twikoo' },
								{ label: 'Giscus 评论系统', slug: 'mizuki/article-layout/giscus' },
							],
						},
						{
							label: '特色组件',
							items: [
								{ label: '音乐播放器', slug: 'mizuki/feature/music-player' },
								{ label: 'Live2D', slug: 'mizuki/feature/pio' },
								{ label: '樱花飘落特效', slug: 'mizuki/feature/sakura' },
								{ label: 'Umami 统计', slug: 'mizuki/feature/umami' },
								{ label: 'Microsoft Clarity', slug: 'mizuki/feature/clarity' },
							],
						},
						{
							label: '侧边栏布局',
							items: [
								{ label: '基础位置配置', slug: 'mizuki/sidepanel/global' },
								{ label: '个人资料组件', slug: 'mizuki/sidepanel/profile' },
								{ label: '公告组件', slug: 'mizuki/sidepanel/announcement' },
								{ label: '分类组件', slug: 'mizuki/sidepanel/categories' },
								{ label: '标签组件', slug: 'mizuki/sidepanel/tag' },
								{ label: '站点统计组件', slug: 'mizuki/sidepanel/site-stats' },
								{ label: '日历组件', slug: 'mizuki/sidepanel/calendar' },
							],
						},
						{
							label: '页面配置',
							items: [
								{ label: '关于页面', slug: 'mizuki/special/about' },
								{ label: '日记页面', slug: 'mizuki/special/diary' },
								{ label: '友链页面', slug: 'mizuki/special/friends' },
								{ label: '项目页面', slug: 'mizuki/special/projects' },
								{ label: '时间线页面', slug: 'mizuki/special/timeline' },
								{ label: '技能页面', slug: 'mizuki/special/skills' },
								{ label: '设备页面', slug: 'mizuki/special/devices' },
								{ label: '番剧页面', slug: 'mizuki/special/anime' },
								{ label: '相册页面', slug: 'mizuki/special/gallery' },
							],
						},
						{
							label: '编写文章',
							items: [
								{ label: 'Markdown 基础', slug: 'mizuki/press/markdown/markdown' },
								{ label: 'Markdown 增强', slug: 'mizuki/press/markdown/customize' },
								{ label: '图表', slug: 'mizuki/press/markdown/chart' },
								{ label: '文件管理', slug: 'mizuki/press/file' },
								{ label: '文件夹结构', slug: 'mizuki/press/folder' },
								{ label: '文章加密', slug: 'mizuki/press/key' },
								{ label: '固定链接', slug: 'mizuki/press/permalink' },
								{ label: '图片语法', slug: 'mizuki/press/image' },
								{ label: 'Bilibili 视频', slug: 'mizuki/press/video/bilibili' },
								{ label: 'YouTube 视频', slug: 'mizuki/press/video/youtube' },
							],
						},
						{
							label: '内容分离',
							items: [
								{ label: '内容分离', slug: 'mizuki/other/separation' },
								{ label: '仓库结构', slug: 'mizuki/other/structure' },
								{ label: '自动构建', slug: 'mizuki/other/auto' },
							],
						},
						{
							label: '迁移指南',
							items: [
								{ label: '迁移指南', slug: 'mizuki/other/migration' },
								{ label: 'Gridea 导入', slug: 'mizuki/transfer/gridea-import' },
								{ label: 'Halo 迁移', slug: 'mizuki/transfer/halo-to-mizuki' },
								{ label: 'Hexo 迁移', slug: 'mizuki/transfer/hexo-to-mizuki' },
								{ label: 'HTML 导入', slug: 'mizuki/transfer/html-import' },
								{ label: 'Hugo 迁移', slug: 'mizuki/transfer/hugo-to-mizuki' },
								{ label: 'Jekyll 迁移', slug: 'mizuki/transfer/jekyll-to-mizuki' },
								{ label: 'Markdown 导入', slug: 'mizuki/transfer/markdown-import' },
								{ label: 'Typecho 迁移', slug: 'mizuki/transfer/typecho-to-mizuki' },
								{ label: 'WordPress 迁移', slug: 'mizuki/transfer/wordpress-to-mizuki' },
								{ label: 'Z-Blog 导入', slug: 'mizuki/transfer/zblog-import' },
							],
						},
						{
							label: 'API 文档',
							items: [
								{ label: 'Bangumi API', slug: 'mizuki/api/bangumi' },
								{ label: 'Meting API', slug: 'mizuki/api/metings' },
								{ label: 'PicFlow API', slug: 'mizuki/api/picflow' },
							],
						},
						{
							label: '常见问题',
							items: [
								{ label: '提问的艺术', slug: 'mizuki/problem/question' },
								{ label: 'WordPress 相关', slug: 'mizuki/problem/wordpress' },
								{ label: 'Typecho 相关', slug: 'mizuki/problem/type' },
								{ label: '错误排查', slug: 'mizuki/problem/error' },
							],
						},
						{
							label: '开发规范',
							items: [
								{ label: '规范总览', slug: 'mizuki/dev' },
								{ label: '组件架构设计', slug: 'mizuki/dev/component-architecture' },
								{ label: '组件拆分指南', slug: 'mizuki/dev/component-split' },
								{ label: '原子化组件使用', slug: 'mizuki/dev/atom-usage' },
								{ label: 'CSS 样式指南', slug: 'mizuki/dev/css-guide' },
								{ label: '侧栏组件开发', slug: 'mizuki/dev/sidebar-dev' },
								{ label: '图标使用规范', slug: 'mizuki/dev/icon-usage' },
							],
						},
					],
				},
			],
		}),
	],
});
