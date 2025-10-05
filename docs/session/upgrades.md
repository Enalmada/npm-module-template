# 📋 Template Modernization Checklist

Copy these changes to modernize any project with production-grade tooling improvements.

---

## 1. 🗑️ Remove lint-staged

**Delete file:**
- `.lintstagedrc.js`

**Remove from package.json devDependencies:**
```json
"lint-staged": "16.2.3"  // DELETE THIS LINE
```

---

## 2. 🎨 Upgrade Biome Configuration

**Rename file:**
- `biome.json` → `biome.jsonc`

**Replace entire `biome.jsonc` content:**
```jsonc
{
	"$schema": "https://biomejs.dev/schemas/2.2.5/schema.json",
	"vcs": {
		"enabled": true,
		"clientKind": "git",
		"useIgnoreFile": true
	},
	"files": {
		"ignoreUnknown": false,
		"includes": ["src/**", "test/**", "*.ts", "*.js", "*.json", "!dist", "!node_modules"]
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "tab",
		"lineWidth": 120
	},
	"assist": {
		"enabled": true,
		"actions": {
			"source": {
				"organizeImports": "on"
			}
		}
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"correctness": {
				"noUnusedImports": "error"
			}
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "double",
			"trailingCommas": "all"
		}
	},
	"json": {
		"formatter": {
			"trailingCommas": "none"
		}
	}
}
```

**Key changes:**
- ✅ Enable VCS integration
- ✅ Set line width to 120
- ✅ Add `assist.actions.source.organizeImports: "on"` (replaces deprecated top-level key)
- ✅ Add `noUnusedImports: "error"`
- ✅ Add trailing commas rules

---

## 3. ⚡ Upgrade Lefthook

**Replace entire `lefthook.yml` content:**
```yaml
pre-commit:
  parallel: true
  commands:
    type-check:
      glob: "**/*.{ts,tsx}"
      run: bun run type-check
      fail_text: "❌ TypeScript errors found! Run 'bun run type-check' to see details."

    lint:
      glob: "*.{js,ts,cjs,mjs,jsx,tsx,json}"
      run: biome check --fix --unsafe {staged_files}
      stage_fixed: true
      fail_text: "❌ Linting errors found! Most have been auto-fixed. Please review the changes and commit again."

    package-fix:
      files: git diff --cached --name-only --diff-filter=ACM package.json
      run: npm pkg fix && fixpack
      fail_text: "❌ package.json format issues! Run 'npm pkg fix && fixpack' to fix."
```

**Key changes:**
- ✅ Add `parallel: true` for concurrent hook execution
- ✅ Add type-check hook
- ✅ Use `{staged_files}` instead of lint-staged
- ✅ Add `stage_fixed: true` to auto-stage fixes
- ✅ Add custom `fail_text` messages

---

## 4. 📘 Modernize TypeScript Config

**Update `tsconfig.json` compilerOptions:**
```json
{
	"compilerOptions": {
		// Module configuration
		"module": "ES2022",
		"moduleResolution": "Bundler",
		"target": "ES2022",
		"lib": ["ES2022"],

		// Emit configuration
		"declaration": true,
		"noEmit": false,
		"isolatedModules": true,

		// Type checking
		"strict": true,
		"strictNullChecks": true,
		"noImplicitAny": true,
		"noUnusedLocals": true,
		"exactOptionalPropertyTypes": true,

		// Module resolution
		"allowJs": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"resolveJsonModule": true,
		"forceConsistentCasingInFileNames": true,
		"skipLibCheck": true,

		// Path configuration
		"outDir": "./dist",
		"rootDir": "./src",
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"include": ["src/**/*.ts", "src/**/*.tsx"],
	"exclude": ["dist", "node_modules", "test"]
}
```

**Key changes:**
- ✅ Change `moduleResolution` to `"Bundler"`
- ✅ Add `isolatedModules: true`
- ✅ Add `exactOptionalPropertyTypes: true`
- ✅ Add `baseUrl` and `paths` for path aliases

---

## 5. 📦 Enhance package.json

**Add new fields:**
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  },
  "sideEffects": false,
  "engines": {
    "node": ">=18.0.0"
  },
  "files": [
    "dist"
  ]
}
```

**Add `check` script:**
```json
{
  "scripts": {
    "check": "turbo lint type-check test:unit"
  }
}
```

**Fix Windows compatibility in build:clear:**
```json
{
  "scripts": {
    "build:clear": "node -e \"require('fs').rmSync('dist', {recursive: true, force: true})\""
  }
}
```

---

## 6. 🔧 Update Turbo Config

**Update `turbo.json`:**
```json
{
	"$schema": "https://turbo.build/schema.json",
	"tasks": {
		"build:clear": {
			"cache": false
		},
		"build:declaration": {
			"dependsOn": ["build:script"],
			"outputs": ["dist/**"]
		},
		"build:script": {
			"dependsOn": ["build:clear"],
			"outputs": ["dist/**"]
		},
		"lint": {
			"inputs": ["src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx", "biome.jsonc"]
		},
		"test:unit": {
			"inputs": ["src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx", "vitest.config.ts"]
		},
		"type-check": {
			"inputs": ["src/**/*.ts", "src/**/*.tsx", "tsconfig.json"]
		}
	}
}
```

**Key changes:**
- ✅ Update lint inputs to reference `biome.jsonc`
- ✅ Add `type-check` task
- ✅ Add proper input tracking for cache invalidation
- ✅ Remove recursive task definitions

---

## 7. 🧪 Update Vitest Config (if applicable)

**Remove GraphQL workaround and add explicit test patterns:**
```typescript
export default defineConfig({
	plugins: [],
	test: {
		include: ["test/**/*.test.ts", "src/**/*.test.ts"],
		exclude: [...configDefaults.exclude],
		globals: true,
		// Remove 'watch: false' to allow watch mode
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
```

---

## 8. 🗂️ Update .gitignore

**Add:**
```
dist/
```

---

## 9. 📝 Update .changeset/config.json

**If you have public packages, change:**
```json
{
  "access": "public"
}
```

---

## 10. 📚 Update Documentation

### README.md
**Replace outdated tool references:**
- ❌ Remove: `lint-staged`, `husky`, `eslint`, `prettier`
- ✅ Add: `lefthook`, `biome`, `turbo`

### Example tech stack list:
```markdown
* [bun](https://bun.sh/docs/bundler) build
* [vitest](https://vitest.dev/) test framework
* [biome](https://biomejs.dev/) for linting and formatting
* [fixpack](https://www.npmjs.com/package/fixpack) to normalize package.json
* [lefthook](https://github.com/evilmartians/lefthook) pre-commit hooks
* [turbo](https://turbo.build/) task orchestration and caching
* [changesets](https://github.com/changesets/changesets) versioning
* [renovate](https://github.com/renovatebot/renovate) dependency management
```

---

## 📋 Quick Verification Checklist

After making all changes, verify:

```bash
# 1. Install dependencies
bun install

# 2. Reinstall lefthook
bun run prepare

# 3. Run checks
bun run check

# 4. Test build
bun run build

# 5. Test pre-commit hooks (stage a file and commit)
git add <file>
git commit -m "test"
```

---

## 🎯 Benefits Summary

| Change | Impact |
|--------|--------|
| Parallel lefthook | **2-3x faster** pre-commit |
| Biome improvements | Auto-import organization, cleaner code |
| TypeScript modernization | Better tree-shaking, stricter types |
| Package.json exports | Modern module resolution |
| Type-check hook | Catch errors before commit |
| Windows compatibility | Cross-platform builds |

---

## 🔄 Optional: Renovate Config

**Update `renovate.json` for safer auto-merging:**
```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": [
		"config:js-lib",
		":automergeMinor",
		"schedule:automergeEarlyMondays",
		"group:all"
	],
	"packageRules": [
		{
			"matchDatasources": ["npm"],
			"minimumReleaseAge": "3 days"
		}
	]
}
```

---

**That's it!** 🎉 Your project now has production-grade tooling with faster commits, better type safety, and modern best practices.
