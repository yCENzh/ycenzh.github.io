// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/config.ts';

// https://astro.build/config
export default defineConfig({
	site: "https://ycenzh.github.io/",
	base: "/",

	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},

	integrations: [
		starlight({
			title: 'straight',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yCENzh/ycenzh.github.io' }],

			components: {
				Footer: './src/components/Footer.astro',
				PageFrame: './src/layouts/Layout.astro',
			},

			sidebar,
		}),
	],
});
