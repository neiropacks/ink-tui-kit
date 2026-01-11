# CLAUDE.md

This file provides guidance for the ink-mouse package.

## Package Overview

`@ink-tools/ink-mouse` is a package for adding mouse support to Ink applications. It provides
React components and hooks for handling mouse events in terminal environments.

## Common Commands

### Installation

```bash
pnpm install
```

### Building

```bash
pnpm run build          # Build using tsup
pnpm run dev            # Watch mode for development
```

### Testing

```bash
pnpm test               # Run all tests
pnpm run test:watch     # Run tests in watch mode
pnpm run test:coverage  # Run tests with coverage report
```

### Code Quality

```bash
pnpm run typecheck      # Type check with TypeScript
```

Format and lint are handled from the monorepo root.

## Code Organization

```text
src/
├── index.ts              # Public API exports
├── constants.ts          # Constants for mouse handling
├── context.ts            # React context for mouse state
├── geometry.ts           # Geometry utilities (Point, Rect, etc.)
├── provider.tsx          # MouseProvider component
├── types.ts              # TypeScript type definitions
├── hooks/                # React hooks
│   ├── index.ts
│   └── useMouse.ts       # Main useMouse hook
├── utils/                # Utility functions
│   └── index.ts
└── integration/          # Integration utilities
    └── index.ts
```

## Architecture

### Provider Pattern

The package uses React Context + Provider pattern to manage mouse state:

1. **MouseProvider** - Wraps your Ink application and manages mouse tracking
   - Initializes `xterm-mouse` for low-level protocol handling
   - Maintains mouse state (position, buttons, etc.)
   - Emits events to child components

2. **useMouse hook** - Access mouse state and events in components
   - Returns current mouse position, button states, and event handlers
   - Automatically re-renders components on mouse events

### Dependencies

- **`ink`** ^6.6.0 - React for CLIs (peer dependency)
- **`react`** ^19.2.3 - React (peer dependency)
- **`xterm-mouse** (workspace:\*) - Low-level xterm mouse protocol handling

### Additional Files

- **TEST-GUIDE.md** - Comprehensive testing guide for mouse interactions
- **CONTRIBUTING.md** - Contribution guidelines
- **examples/** - Example usage patterns (not included in published package)

## Ink Component Development

This package uses **Ink** (React for CLIs). Key concepts:

### Component Structure

```tsx
import type { FC } from 'react';
import { Box, Text } from 'ink';

const Example: FC<{ prop: string }> = ({ prop }) => {
  return (
    <Box>
      <Text>{prop}</Text>
    </Box>
  );
};

export default Example;
```

### Mouse Handling

This package specifically deals with mouse events in terminals:

- Mouse position tracking
- Click detection
- Scroll handling
- Drag and drop support
- Terminal-specific mouse protocols (xterm, SGR)

### Terminal Considerations

- Not all terminals support mouse events
- Mouse support varies by terminal emulator
- Always provide keyboard alternatives
- Test across different terminals (iTerm, Terminal.app, Alacritty, etc.)

## Common Issues

### Mouse Events Not Working

- Check if terminal supports mouse events
- Ensure mouse tracking is enabled in your terminal
- Some terminals require explicit mouse mode activation

### Performance

- Mouse events can fire rapidly; consider debouncing
- Use React.memo for components that re-render on mouse events
- Optimize render cycles in components with mouse handlers
