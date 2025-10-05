# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a template for creating npm modules using Bun as the build tool. The project uses TypeScript and is configured for ES2022 module output. While Bun is used for development, the built module targets Node.js environments (>=18.0.0).

## Common Commands

### Development
- `bun run build` - Full build process (clean, bundle with Bun, generate TypeScript declarations)
- `bun run check` - Run all quality checks in parallel (lint, type-check, test:unit)
- `bun run type-check` - Run TypeScript type checking without emitting files
- `bun run dev:website` - Run the documentation website locally

### Testing
- `bun run test` - Run all unit tests via Turbo
- `bun run test:unit` - Run unit tests directly with Vitest
- Tests use Vitest with `globals: true`, so no need to import `describe`, `it`, `expect`
- Test files: `test/**/*.test.ts` and `src/**/*.test.ts`

### Linting & Formatting
- `bun run lint` - Run Biome linter and formatter with auto-fix

### Release
- `bunx changeset` - Create a new changeset for versioning
- `bun run release` - Build and publish to npm (requires proper setup)
- `bun run build:pack` - Build and create npm tarball for testing

## Build Architecture

### Build Process
The build uses a custom Bun-based bundler from `@enalmada/bun-externals`:

1. **`build:clear`** - Removes the `dist/` directory (cross-platform Node.js script)
2. **`build:script`** - Bundles all source files from `src/` using Bun with all dependencies marked as external
3. **`build:declaration`** - Generates TypeScript declaration files using `tsc`

The build script (`build.ts`) automatically discovers all source files and bundles them, externalizing all dependencies. Turbo orchestrates the build with proper dependency chaining.

### Package.json Configuration
- **Module format**: ES modules (`"type": "module"`)
- **Entry points**:
  - `main`: `dist/index.js`
  - `types`: `dist/index.d.ts`
  - `exports`: Modern exports field with types/import/default conditions
- **Tree-shaking**: `"sideEffects": false` for better optimization
- **Files**: Only `dist/` is published to npm

### Source Structure
- `src/` - All TypeScript source files (template includes just `index.ts` placeholder)
- `dist/` - Build output (gitignored, only published to npm)
- `test/` - Test files using `*.test.ts` naming convention
- `build.ts` - Custom build script using `@enalmada/bun-externals`

### TypeScript Configuration
- Target: ES2022 with ES modules
- Module Resolution: `Bundler` (modern, optimized for bundlers like Bun)
- Path alias: `@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vitest.config.ts`)
- Strict mode with additional strictness:
  - `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`
  - `exactOptionalPropertyTypes` for stricter optional property handling
  - `isolatedModules` for better build performance
- Declaration files generated separately from bundling

## Code Quality Tools

### Biome
- Replaces ESLint and Prettier for both linting and formatting
- Configuration: `biome.jsonc` (supports comments)
- Formatting:
  - Tabs for indentation
  - Double quotes
  - 120 character line width
  - Trailing commas: all for JS/TS, none for JSON
- Import organization: Enabled via `assist.actions.source.organizeImports: "on"`
- Linter rules: `noUnusedImports` set to error
- VCS integration enabled to respect .gitignore

### Git Hooks (Lefthook)
Pre-commit hooks run in parallel (`parallel: true`) for performance:

1. **type-check**: Validates TypeScript on staged `.ts/.tsx` files
   - Runs: `bun run type-check`
   - Fail message provides instructions to fix errors

2. **lint**: Runs Biome check with auto-fix on staged files
   - Runs: `biome check --fix --unsafe {staged_files}`
   - Auto-stages fixed files (`stage_fixed: true`)
   - Fail message indicates most issues are auto-fixed

3. **package-fix**: Normalizes `package.json` when modified
   - Runs: `npm pkg fix && fixpack`
   - Ensures consistent package.json ordering

All hooks provide custom fail messages for better developer experience.

### Turbo
Uses Turbo for task orchestration and caching:

- **Build tasks**: Dependency chain ensures `build:clear` → `build:script` → `build:declaration`
- **Input tracking**: Each task specifies which files invalidate its cache
  - `lint`: Source files + `biome.jsonc`
  - `test:unit`: Source/test files + `vitest.config.ts`
  - `type-check`: Source files + `tsconfig.json`
- **Output tracking**: Build tasks declare `dist/**` as output
- **Caching**: All tasks cached except `build:clear` (always runs)

## Testing

- Framework: Vitest
- Configuration: `vitest.config.ts`
- Test pattern: `test/**/*.test.ts` and `src/**/*.test.ts`
- Globals enabled: No need to import `describe`, `it`, `expect`
- Path alias `@` configured for imports in tests
- Watch mode available: `vitest --watch` or append `--watch` to test commands

## Publishing Workflow

Uses Changesets for version management:

1. Create changeset: `bunx changeset`
2. Changesets committed to `.changeset/` directory
3. CI automatically creates version PRs via GitHub Actions
4. Merge version PR to trigger release workflow
5. Release workflow builds and publishes to npm

### CI/CD
- **Run Tests** (`run-tests.yml`): Runs on push/PR to main
- **Release** (`release.yml`): Publishes to npm on push to main (requires `NPM_TOKEN` secret)
- **Changesets Renovate** (`changesets-renovate.yml`): Automatically creates changesets for Renovate PRs

### Dependency Management
Renovate configuration (`renovate.json`):
- Auto-merges major versions (consider changing to minor/patch only)
- Groups all updates together
- 3-day minimum release age for stability
- Auto-merge scheduled for early Mondays

## Template Usage

When using this template to create a new npm module:

1. Update `package.json`: name, description, author, repository, homepage
2. Replace `src/index.ts` with your module code
3. Add tests to `test/` directory
4. Update `README.md` with module-specific documentation
5. Configure npm publishing: Add `NPM_TOKEN` to GitHub secrets
6. Run `bun run check` before commits to ensure quality
