import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "Luxodd Game Docs",
	tagline: "",
	favicon: "img/favicon.ico",

	// Set the production url of your site here
	url: "https://app.luxoddgames.com",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "Luxodd", // Usually your GitHub org/user name.
	projectName: "arcade-documentation", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: "https://github.com/luxodd/arcade-documentation/tree/main",
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ["rss", "atom"],
						xslt: true,
					},
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// Useful options to enforce blogging best practices
					onInlineTags: "warn",
					onInlineAuthors: "warn",
					onUntruncatedBlogPosts: "warn",
				},
				theme: {
					customCss: "./src/css/index.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: "img/docusaurus-social-card.jpg",
		colorMode: {
			defaultMode: "dark",
			disableSwitch: true,
			respectPrefersColorScheme: false,
		},
		navbar: {
			logo: {
				alt: "Luxodd Logo",
				src: "img/logo.png",
			},
			items: [
				{
					to: "https://landing-page-195979437523.us-west1.run.app",
					label: "Home",
					position: "left",
					activeBaseRegex: "^/$",
				},
				{
					to: "https://landing-page-195979437523.us-west1.run.app/reservation",
					label: "Reservation",
					position: "left",
				},
				{
					to: "https://landing-page-195979437523.us-west1.run.app/#timeline",
					label: "Timeline",
					position: "left",
				},
				{
					to: "https://landing-page-195979437523.us-west1.run.app/crowdfund",
					label: "Crowdfund",
					position: "left",
				},
				{
					to: "https://landing-page-195979437523.us-west1.run.app/developer",
					label: "Build with Us",
					position: "left",
				},
				{ to: "/blog", label: "Blog & Articles", position: "left" },
				{
					label: "Feedback",
					href: "https://github.com/luxodd/arcade-documentation/issues/new?title=Feedback&labels=feedback",
					position: "right",
				},
				{
					to: "/",
					label: "Documentation",
					position: "left",
					activeBaseRegex: "^(\/($|docs))",
				}
			],
		},
		footer: {
			logo: {
				alt: "Luxodd Logo",
				src: "img/logo.png",
				width: 200,
				height: 100,
			},
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Tutorial",
							to: "/docs/intro",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Facebook",
							href: "#",
						},
						{
							label: "Discord",
							href: "#",
						},
						{
							label: "Instagram",
							href: "#",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "Blog",
							to: "/blog",
						},
					],
				},
			],
			copyright:
				"© Luxodd. All Rights Reserved. | Luck is odd and strategy makes you a fortune 🚀",
		},
		prism: {
			theme: prismThemes.oneDark,
			darkTheme: prismThemes.oneDark,
			additionalLanguages: ["csharp"],
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
