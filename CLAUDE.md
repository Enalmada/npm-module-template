# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a template for creating npm modules using Bun as the build tool. The project uses TypeScript and is configured for ES2022 module output.

## Common Commands

### Development
- `bun run build` - Full build process (clean, bundle with Bun, generate TypeScript declarations)
- `bun run dev:website` - Run the documentation website locally
- `bun run type-check` - Run TypeScript type checking without emitting files

### Testing
- `bun run test` - Run all unit tests (uses Vitest)
- `bun run test:unit` - Run unit tests directly
- Note: Tests use Vitest with globals enabled, so no need to import `describe`, `it`, `expect`

### Linting & Formatting
- `bun run lint` - Run Biome linter and formatter with auto-fix
- Pre-commit hooks automatically run Biome check on staged files via lint-staged

### Release
- `bunx changeset` - Create a new changeset for versioning
- `bun run release` - Build and publish to npm (requires proper setup)

## Build Architecture

### Build Process
The build uses a custom Bun-based bundler from `@enalmada/bun-externals`:

1. **`build:clear`** - Removes the `dist/` directory
2. **`build:script`** - Bundles all source files from `src/` using Bun with all dependencies marked as external
3. **`build:declaration`** - Generates TypeScript declaration files using `tsc`

The build script (`build.ts`) automatically discovers all source files and bundles them, externalizing all dependencies.

### Source Structure
- `src/` - All TypeScript source files (currently template has just `index.ts`)
- `dist/` - Build output (gitignored)
  - `dist/index.js` - Main entry point
  - `dist/index.d.ts` - Type definitions
- `test/` - Test files using `*.test.ts` naming convention

### TypeScript Configuration
- Target: ES2022 with ES modules
- Path alias: `@` maps to `./src`
- Strict mode enabled with `noUnusedLocals` and `noImplicitAny`
- Declaration files generated separately from bundling

## Code Quality Tools

### Biome
- Uses Biome for both linting and formatting (replacing ESLint/Prettier)
- Configuration: `biome.json`
- Formatting: Tabs for indentation, double quotes
- Import organization enabled
- Ignores: `dist/**`, `website/.astro`

### Git Hooks (Husky)
- Pre-commit hook runs `bun lint-staged`
- Lint-staged config in `.lintstagedrc.js`:
  - Runs Biome check on JS/TS/JSON/YAML/MD/CSS files
  - Runs `npm pkg fix` and `fixpack` on `package.json` changes

### Turbo
- Uses Turbo for task orchestration and caching
- Build tasks have dependency chain: `build:clear` → `build:script` → `build:declaration`
- Test and lint tasks configured with proper input tracking

## Testing Notes

- Vitest config includes special server.deps.inline configuration to fix GraphQL double-loading issues
- Tests run with `globals: true`, so test functions are available globally
- Watch mode disabled by default
- Path alias `@` configured for imports in tests

## Publishing Workflow

Uses Changesets for version management:
1. Create changes with `bunx changeset`
2. Changesets are committed to `.changeset/` directory
3. CI automatically creates version PRs
4. Release workflow publishes to npm when version PRs are merged

## Package Manager

- Uses Bun (version 1.2.23) as the package manager
- Note: While Bun is used for development, the built module targets Node.js environments
