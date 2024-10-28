// bun types conflicts with dom types so just putting it where it is needed
/// <reference types="bun-types" />

import { bunBuild, getSourceFiles } from "@enalmada/bun-externals";

async function buildWithExternals(): Promise<void> {
	const entrypoints = await getSourceFiles();

	// bunBuild handles build failure
	await bunBuild({
		entrypoints,
		outdir: "./dist",
		target: "node",
		external: ["*"],
		root: "./src",
	});
}

void buildWithExternals();
