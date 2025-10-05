import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcssVite from "@tailwindcss/vite";
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
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/Enalmada/npm-module-template",
				},
			],
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
		prefetch(),
		tailwindcssVite(),
	],
});
