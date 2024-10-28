import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "npm-module-template",
			defaultLocale: "root", // optional
			locales: {
				root: {
					label: "English",
					lang: "en", // lang is required for root locales
				},
			},
			social: {
				github: "https://github.com/Enalmada/npm-module-template",
			},
			sidebar: [
				{
					label: "Getting Started",
					items: [
						{
							label: "Getting Started",
							link: "/guides/getting-started/",
						},
						{
							label: "Deploy Website",
							link: "/guides/website/",
						},
					],
				},
				{
					label: "Technologies",
					items: [
						{
							label: "Summary",
							link: "/technologies/summary/",
						},
						{
							label: "Build",
							link: "/technologies/build/",
						},
					],
				},
			],
			customCss: ["./src/assets/landing.css", "./src/tailwind.css"],
		}),
		react(),
		// applyBaseStyles causes lists to not work anymore
		tailwind({
			applyBaseStyles: false,
		}),
		prefetch(),
	],
});
