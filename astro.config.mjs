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
						{ label: '从这里开始', collapsed: true, items: [
							'mizuki/guide/intro',
							'mizuki/guide/get-started',
							{ label: '部署', items: [{ autogenerate: { directory: 'mizuki/guide/deploy' } }] },
						]},
						{ label: '基础布局', collapsed: true, items: [
							'mizuki/basic-layout/site-config',
							{ label: '布局模式', items: [
								'mizuki/basic-layout/layout/banner',
								'mizuki/basic-layout/layout/fullscreen',
								'mizuki/basic-layout/layout/hide',
							] },
							'mizuki/basic-layout/footer',
							'mizuki/basic-layout/auto-res-algo',
							'mizuki/basic-layout/navbarconfig',
							'mizuki/basic-layout/font',
						] },
						{ label: '文章布局', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/article-layout' } }] },
						{ label: '特色组件', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/feature' } }] },
						{ label: '侧边栏布局', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/sidepanel' } }] },
						{ label: '页面配置', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/special' } }] },
						{ label: '编写文章', collapsed: true, items: [
							{ label: 'Markdown', items: [
								'mizuki/press/markdown/markdown',
								'mizuki/press/markdown/customize',
								'mizuki/press/markdown/chart',
							] },
							'mizuki/press/file',
							'mizuki/press/folder',
							'mizuki/press/key',
							'mizuki/press/permalink',
							'mizuki/press/image',
							{ label: '视频', items: [
								'mizuki/press/video/bilibili',
								'mizuki/press/video/youtube',
							] },
						] },
						{ label: '内容分离', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/other' } }] },
						{ label: '迁移指南', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/transfer' } }] },
						{ label: 'API 文档', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/api' } }] },
						{ label: '常见问题', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/problem' } }] },
						{ label: '开发规范', collapsed: true, items: [{ autogenerate: { directory: 'mizuki/dev' } }] },
					],
				},
			],
		}),
	],
});
