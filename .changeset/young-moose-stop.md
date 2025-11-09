---
"@enalmada/npm-module-template": patch
---

Add publint validation to build process and fix test command

- Add publint --strict validation as final build step to catch package structure issues before publishing
- Fix test:unit script to use 'vitest run' instead of 'vitest' to prevent watch mode during CI/check commands
- Update turbo.json to include build:validate task with proper dependency chain
