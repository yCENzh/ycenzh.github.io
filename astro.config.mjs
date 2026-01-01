// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Zevur',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yCENzh/ycenzh.github.io' }],
			components: {
				Footer: './src/components/Footer.astro',
			},
			sidebar: [
				{
					label: 'Astro',
					items: [
						{ label: 'umami', slug: 'astro/umami' },
						{ label: '专栏', slug: 'astro/series' },
						{ label: 'fancybox', slug: 'astro/fancybox' },
					],
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
