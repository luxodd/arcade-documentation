import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const LANDING_PAGE_URL =
	process.env.LANDING_PAGE_URL ||
	"https://landing-page-195979437523.us-central1.run.app";

// PostHog configuration
const POSTHOG_KEY = process.env.POSTHOG_KEY;
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";

// Check if we're in staging environment to disable PostHog
const isStaging = LANDING_PAGE_URL.toLowerCase().includes("staging");

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

	customFields: {
		ADMIN_URL: process.env.ADMIN_PAGE_URL,
		APP_URL: process.env.APP_PAGE_URL,
		UNITY_DOCS_URL: process.env.UNITY_DOCS_URL,
		POSTHOG_KEY: POSTHOG_KEY,
		POSTHOG_HOST: POSTHOG_HOST,
		LANDING_PAGE_URL: LANDING_PAGE_URL,
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

	plugins: [
		// Only include PostHog plugin if not in staging and we have a key
		...(!isStaging && POSTHOG_KEY
			? [
				[
					"posthog-docusaurus",
					{
						apiKey: POSTHOG_KEY,
						appUrl: POSTHOG_HOST,
						enableInDevelopment: false, // Disabled in development, but we handle staging separately
					},
				],
			]
			: []),
		"./src/plugins/posthog-enhancements.js",
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
					to: LANDING_PAGE_URL,
					label: "Website",
					position: "left",
					activeBaseRegex: "^/$",
					target: "_self",
				},
				{
					to: `${LANDING_PAGE_URL}/about`,
					label: "About",
					position: "left",
					target: "_self",
				},
				{
					to: `${LANDING_PAGE_URL}/pre-order`,
					label: "Pre-Order",
					position: "left",
					target: "_self",
				},
				{
					to: `${LANDING_PAGE_URL}/products`,
					label: "Products",
					position: "left",
					target: "_self",
					items: [
						{
							label: 'Arcade Cabinets',
							to: '/products#flagship-cabinets',
							className: 'submenu-item',
						},
						{
							label: 'Games',
							to: '/products#game-development',
							className: 'submenu-item',
						},
						{
							label: 'Games Conversion',
							to: '/products#bring-retro-games',
							className: 'submenu-item',
						},
					],
				},
				{
					to: `${LANDING_PAGE_URL}/waitlist`,
					label: "Waitlist",
					position: "left",
					target: "_self",
				},
				{
					to: `${LANDING_PAGE_URL}/crowdfund`,
					label: "Crowdfund",
					position: "left",
					target: "_self",
				},
				{
					to: `${LANDING_PAGE_URL}/developer`,
					label: "Build with Us",
					position: "left",
					target: "_self",
				},
				{
					to: `${LANDING_PAGE_URL}/articles`,
					label: "Articles",
					position: "left",
					target: "_self",
				},
				{
					label: "Feedback",
					href: "https://github.com/luxodd/arcade-documentation/issues/new?title=Feedback&labels=feedback",
					position: "right",
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
							label: "Onboard your game",
							to: "/docs/intro",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Facebook",
							href: "https://web.facebook.com/profile.php?id=61558767922849#",
						},
						{
							label: "X",
							href: "https://x.com/luxoddgames",
						},
						{
							label: "LinkedIn",
							href: "https://www.linkedin.com/showcase/luxodd-games/",
						},
						{
							label: "Discord",
							href: "https://discord.gg/vSfXMeC2BX",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "Articles",
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
