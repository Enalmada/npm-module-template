// bun types conflicts with dom types so just putting it where it is needed
/// <reference types="bun-types" />

import getExternalDependencies, { bunBuild } from '@enalmada/bun-externals';

async function buildWithExternals(): Promise<void> {
  // Workaround to make all node_modules as external see: oven-sh/bun#6351
  const externalDeps = await getExternalDependencies();

  // bunBuild handles build failure
  await bunBuild({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    external: externalDeps,
    root: './src',
  });
}

void buildWithExternals();
