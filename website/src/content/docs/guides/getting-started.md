---
title: Getting Started
description: A guide how to use this repository.
---

## Installation
Click the [Use this template](https://github.com/Enalmada/npm-module-template/generate) button to create a new repository.
You can also run `bun create Enalmada/npm-module-template <your-new-library-name>`

### Github settings

* add NPM_TOKEN with access to deploy to npm to environment variables 
* Actions > General > Workflow Permissions
  * Read and Write (to allow changesets to create changelog, and release)
  * Allow github actions to create and approve PR

### Git settings
Follow the directions [here](https://bun.sh/docs/install/lockfile) to modify your git settings to properly handle 
the lockfile
```shell
git config --global diff.lockb.textconv bun
git config --global diff.lockb.binary true
```

## Workflow
* install dependencies `bun install`
* lint files `bun lint:fix`
* run tests `bun run test` (not `bun test` as we are not using native tests)
* run build `bun run build` (not `bun build` as we are using build script)
* create changeset before PR `changeset` and choose appropriate semver and changelog

## Migrate existing repository
* `git remote add template https://github.com/Enalmada/npm-module-template`
* `git fetch template`
* `git merge template/main --allow-unrelated-histories`
* resolve conflicts and merge