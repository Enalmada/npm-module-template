---
"@enalmada/npm-module-template": minor
---

Major template improvements and modernization:

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
