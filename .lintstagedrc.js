const tsc = () => "bun --bun tsc --noEmit";

export default {
	"**/*.{js,jsx,ts,tsx,json,yaml,yml,md,css,scss}": () =>
		"biome check --fix --unsafe",
	"./package.json": ["npm pkg fix", "fixpack"],
};
