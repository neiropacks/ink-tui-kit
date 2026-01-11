---
"xterm-mouse": patch
"@ink-tools/ink-mouse": patch
---

Refactored Mouse class into smaller focused components for better testability and maintainability. Public API remains unchanged.

**Internal Changes (xterm-mouse):**
- Split 1583-line Mouse class into 7 focused classes:
  - `ClickDetector` - Detects click events from press+release
  - `PositionTracker` - Tracks latest mouse position
  - `TTYController` - Manages TTY raw mode and ANSI codes
  - `MouseEventManager` - Wraps EventEmitter for type-safe events
  - `MouseConvenienceMethods` - Helper methods (waitForClick, etc.)
  - `EventStreamFactory` - Creates async generator streams
  - `Mouse` - Orchestrates all components

**Test Improvements (xterm-mouse):**
- Added co-located tests for all new classes (296 total tests)
- Improved test coverage: EventStreamFactory (90.75%), TTYController (85.07%)

**Internal Changes (ink-mouse):**
- Extracted `useElementBoundsCache` hook for caching element bounds
- Extracted `useMouseInstance` hook for managing Mouse instance lifecycle
- Refactored provider logic into focused, testable functions
- Added comprehensive test coverage for hooks and provider (9 test files)
- Excluded barrel files from coverage report in vitest config

**General Improvements:**
- Added GC test support with `--expose-gc` flag
- Added `test:gc` command for running tests with GC enabled
- Updated CI to run tests with `NODE_OPTIONS="--expose-gc"`

**Migration:** No changes required - public API is unchanged.
