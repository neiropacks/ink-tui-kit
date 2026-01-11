# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Monorepo** for Ink-based TUI components using **pnpm workspaces**.

**Stack**: pnpm + Changesets + Vitest + tsup + Biome + dprint + markdownlint-cli2

**Ink** = React for CLIs. All packages work with Ink applications.

## Common Commands

```bash
# Installation
pnpm install

# Building
pnpm run build              # Build all packages
pnpm run dev                # Watch mode

# Code quality (runs via lefthook pre-commit)
pnpm run typecheck          # TypeScript check
pnpm run format             # Format all (Biome + dprint + markdownlint)
pnpm run check              # Check without auto-fix

# Testing
pnpm test                   # Run all tests
pnpm run test:coverage      # Coverage report (text)
pnpm run test:coverage:lcov # LCOV for CI/CD

# Verification
pnpm run verify:configs     # Check vitest configs
pnpm run verify:tests       # Detect vitest issues
```

## Package Structure

```text
packages/package-name/
├── src/              # Source files
├── dist/             # Build output (generated)
├── examples/         # Example scripts (optional)
├── test/             # Additional tests (optional)
├── docs/             # Package docs (optional)
├── tsup.config.ts    # Build config
├── tsconfig.json     # TypeScript config
├── biome.json        # Linting config (optional)
├── vitest.config.ts  # Vitest config (optional)
├── package.json      # Package metadata
├── README.md         # Documentation
├── CHANGELOG.md      # Changelog (generated)
└── LICENSE           # License file
```

### Current Packages

- **`@ink-tools/ink-mouse`** - Mouse support for Ink apps
  - React components/hooks for mouse events
  - Depends on `xterm-mouse` for low-level protocol
  - Peer deps: `ink`, `react`

- **`xterm-mouse`** - Low-level xterm mouse protocol library
  - Event-based and streaming APIs
  - Supports SGR and ESC protocols
  - Standalone (no Ink dependency)
  - Includes examples in `examples/`

### Package Build Configuration

Packages use **tsup**: ESM (`index.js`) + CJS (`index.cjs`) with types, node18 target, bundled & minified.

## Code Style

- **TS/JS** (Biome): 120 char width, single quotes, semicolons, 2-space indent
- **YAML** (dprint): 2-space indent, double quotes
- **Markdown** (markdownlint-cli2): 120 char width, proper spacing, code blocks need language
- **EditorConfig**: UTF-8, LF, 4-space indent (TS/JS: 2-space), 120 char limit

## Linting Rules

Biome enforces: React best practices (hooks, JSX keys), security (no dangerouslySetInnerHTML), code style (type aliases, no var), no import cycles, explicit types, no await in loops (warn).

Note: `dangerouslySetInnerXML` is safe in Ink for ANSI escapes.

## Git Hooks

Lefthook pre-commit: Biome → dprint → markdownlint → typecheck

## TypeScript Configuration

Target: ES2022, module resolution: bundler, strict mode, `noUncheckedIndexedAccess`, `noImplicitOverride`, JSX: react-jsx

## Testing

Use **Vitest**. Test files: `.test.ts` or `.spec.ts`.

```ts
import { test, expect } from "vitest";

test("description", () => {
  expect(value).toBe(expected);
});
```

### Important Notes

- **JSX tests** must use `.tsx` extension
- **Ink** requires `<Text>` wrapper for strings
- **Template literals in JSX**: use variables, then interpolate

### Coverage

Configured in root `vitest.config.ts`: 80% threshold, text reports default, LCOV on demand, excludes tests/mocks/fixtures/dist.

## Documentation

**ALWAYS use relative paths** - never absolute paths like `/Users/...`.

Repository-relative: `packages/ink-mouse/src/file.ts`
File-relative: `[Topic](./topic.md)`

Verify: `grep -r "/Users/" docs/` (should find nothing)

## Working with Ink

All packages use **Ink** (React for CLIs).

```tsx
import type { FC } from 'react';
import { Box, Text } from 'ink';

const Example: FC<{ name: string }> = ({ name }) => (
  <Box borderStyle="double" padding={1}>
    <Text color="green">Hello, {name}!</Text>
  </Box>
);
```

**Key concepts**: Components, hooks, props, stdin/stdout handled by Ink.

**Testing**: Test logic separate from rendering, use Vitest, mock stdin/stdout for interactive components.

**Typical peer deps**: `ink` ^6.6.0, `react` ^19.2.3

## Adding a New Package

1. Create `packages/new-package/`
2. `pnpm init` or manual package.json
3. Add tsup.config.ts and build scripts
4. Configure exports (ESM + CJS)
5. Add peer deps: `ink`, `react`
6. Add TypeScript config
7. Add README.md with examples

**Key package.json fields**: `type: "module"`, `main: "./dist/index.cjs"`, `module: "./dist/index.js"`, `exports` with conditional imports, `publishConfig.access: "public"`, `engines.node: ">=20"`, `files: ["dist", "README.md", "LICENSE", "CHANGELOG.md"]`

**Scripts**: `build: tsup`, `dev: tsup --watch`, `test: vitest run`, `test:watch: vitest watch`, `test:coverage: vitest run --coverage`
