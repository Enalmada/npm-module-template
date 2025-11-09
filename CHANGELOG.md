# @enalmada/storybook-addon-mock-urql

## 0.1.1

### Patch Changes

- a17728d: Add publint validation to build process and fix test command

  - Add publint --strict validation as final build step to catch package structure issues before publishing
  - Fix test:unit script to use 'vitest run' instead of 'vitest' to prevent watch mode during CI/check commands
  - Update turbo.json to include build:validate task with proper dependency chain

## 0.1.0

### Minor Changes

- b9eb332: Major template improvements and modernization:

  **Removed lint-staged** - Migrated to native lefthook features using `{staged_files}` placeholder for better performance

  **Enhanced Biome configuration:**

  - Added `assist.actions.source.organizeImports` for auto-import organization
  - Increased line width to 120 characters
  - Added trailing commas for better git diffs
  - Added `noUnusedImports` linter rule
  - Enabled VCS integration

  **Improved Lefthook:**

  - Added `parallel: true` for 2-3x faster pre-commit hooks
  - Added type-check command on staged TypeScript files
  - Auto-stages fixed files with `stage_fixed: true`
  - Added helpful custom fail messages

  **Modernized TypeScript config:**

  - Changed `moduleResolution` to `Bundler` (optimized for modern bundlers)
  - Added `exactOptionalPropertyTypes` for stricter type safety
  - Added `isolatedModules` for better build performance
  - Added path alias support (`@/*` → `./src/*`)

  **Package.json improvements:**

  - Added modern `exports` field for better module resolution
  - Added `engines`, `files`, and `sideEffects` fields
  - Fixed Windows compatibility in build:clear script

  **Enhanced Turbo configuration:**

  - Cleaned up task definitions to prevent recursion
  - Added proper input tracking for all tasks
  - Improved caching strategy

  **Added `check` command** - Run lint, type-check, and tests in parallel

  **Documentation:**

  - Updated README.md to reflect actual tech stack
  - Completely rewrote CLAUDE.md with comprehensive guidance
  - Fixed all documentation inconsistencies

## 0.0.8

### Patch Changes

- 32272e3: dependency updates
- 32272e3: biome
- c4e5f2f: Updated dependency `@scaleway/changesets-renovate` to `1.4.0`.
  Updated dependency `@types/node` to `20.10.6`.
  Updated dependency `@typescript-eslint/eslint-plugin` to `6.17.0`.
  Updated dependency `@typescript-eslint/parser` to `6.17.0`.
  Updated dependency `bun-types` to `1.0.21`.
  Updated dependency `eslint-plugin-prettier` to `5.1.2`.
  Updated dependency `vitest` to `1.1.1`.

## 0.0.7

### Patch Changes

- 7d5bf51: Updated dependency `lint-staged` to `15.0.2`.

## 0.0.6

### Patch Changes

- de14d1f: automated external in build

## 0.0.5

### Patch Changes

- dac135c: fixpack

## 0.0.4

### Patch Changes

- c4a16a7: pre-commit to executable, lintstaged to import

## 0.0.3

### Patch Changes

- 507c17b: fix lint, add tests

## 0.0.2

### Patch Changes

- effe886: bun.lockb file needs to be binary

## 0.0.3

### Patch Changes

- 16dba9f: export type Mock

## 0.0.2

### Patch Changes

- 616efc8: readme
