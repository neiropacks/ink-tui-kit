# @neiropacks/ink-mouse

Mouse support for [Ink](https://github.com/vadimdemedes/ink) applications.
Provides a React-based API for handling mouse events in terminal user
interfaces.

## Features

- **Click detection** - Detect mouse clicks on elements
- **Press/Release tracking** - Track individual button press and release events
- **Hover tracking** - Track when mouse enters/exits elements
- **Mouse move tracking** - Track mouse movement over elements
- **Drag support** - Track mouse drag operations
- **Wheel/scroll support** - Handle mouse wheel events
- **Automatic hit testing** - Uses element bounds for accurate event detection
- **Dynamic layout support** - Recalculates element positions on each event
- **Terminal compatibility** - Works with xterm-compatible terminals

## Installation

```bash
bun add @neiropacks/ink-mouse
# or
npm install @neiropacks/ink-mouse
# or
yarn add @neiropacks/ink-mouse
# or
pnpm add @neiropacks/ink-mouse
```

## Peer Dependencies

This package requires the following peer dependencies:

- `ink` ^6.6.0
- `react` ^19.2.3

## Quick Start

```tsx
import React from 'react';
import { Box, Text } from 'ink';
import { MouseProvider, useOnClick } from '@neiropacks/ink-mouse';

function Button() {
 const ref = React.useRef(null);

 useOnClick(ref, () => {
  console.log('Button clicked!');
 });

 return (
  <Box ref={ref}>
   <Text>Click me!</Text>
  </Box>
 );
}

function App() {
 return (
  <MouseProvider>
   <Button />
  </MouseProvider>
 );
}
```

## API Reference

### `<MouseProvider>`

Wrapper component that enables mouse tracking for your application.

**Props:**

- `autoEnable?: boolean` - Automatically enable mouse tracking on mount (default: `true`)

**Example:**

```tsx
<MouseProvider autoEnable={true}>
 <App />
</MouseProvider>
```

### `useMouse()`

Hook for accessing mouse state and control methods.

**Returns:**

```typescript
{
 isEnabled: boolean;   // Is mouse tracking enabled?
 isTracking: boolean;  // Are mouse events being received?
 isSupported: boolean; // Does terminal support mouse?
 enable: () => void;   // Enable mouse tracking
 disable: () => void;  // Disable mouse tracking
}
```

**Example:**

```tsx
function Status() {
 const mouse = useMouse();

 return (
  <Box>
   <Text>Mouse: {mouse.isEnabled ? 'On' : 'Off'}</Text>
   <Text>Supported: {mouse.isSupported ? 'Yes' : 'No'}</Text>
  </Box>
 );
}
```

### `useOnClick(ref, handler)`

Hook for handling click events on an element.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Click handler function

**Example:**

```tsx
function Clickable() {
 const ref = React.useRef(null);

 useOnClick(ref, (event) => {
  console.log(`Clicked at ${event.x}, ${event.y}`);
  console.log(`Button: ${event.button}`);
 });

 return <Box ref={ref}>Click me</Box>;
}
```

### `useOnMouseEnter(ref, handler)`

Hook for handling mouse enter events only.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Mouse enter handler

**Example:**

```tsx
function Hoverable() {
 const ref = React.useRef(null);
 const [message, setMessage] = React.useState('');

 useOnMouseEnter(ref, () => setMessage('Mouse entered!'));

 return (
  <Box ref={ref}>
   <Text>{message}</Text>
  </Box>
 );
}
```

### `useOnMouseLeave(ref, handler)`

Hook for handling mouse leave events only.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Mouse leave handler

**Example:**

```tsx
function Hoverable() {
 const ref = React.useRef(null);
 const [message, setMessage] = React.useState('');

 useOnMouseLeave(ref, () => setMessage('Mouse left!'));

 return (
  <Box ref={ref}>
   <Text>{message}</Text>
  </Box>
 );
}
```

### `useOnWheel(ref, handler)`

Hook for handling mouse wheel/scroll events.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Wheel handler function

**Example:**

```tsx
function Scrollable() {
 const ref = React.useRef(null);
 const [offset, setOffset] = React.useState(0);

 useOnWheel(ref, (event) => {
  if (event.button === 'wheel-up') {
   setOffset((prev) => Math.max(0, prev - 1));
  } else if (event.button === 'wheel-down') {
   setOffset((prev) => prev + 1);
  }
 });

 return (
  <Box ref={ref} height={10}>
   <Box flexDirection="column" translateY={-offset}>
    {items.map((item) => (
     <Text key={item.id}>{item.name}</Text>
    ))}
   </Box>
  </Box>
 );
}
```

### `useOnPress(ref, handler)`

Hook for handling mouse button press events on an element.

Press events fire immediately when a mouse button is pressed down, before the
click event (which requires press + release).

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Press event handler

**Example:**

```tsx
function Button() {
 const ref = useRef<DOMElement>(null);
 const [isPressed, setIsPressed] = useState(false);

 useOnPress(ref, () => setIsPressed(true));
 useOnRelease(ref, () => setIsPressed(false));

 return (
  <Box ref={ref}>
   <Text>{isPressed ? 'Pressed!' : 'Press me'}</Text>
  </Box>
 );
}
```

### `useOnRelease(ref, handler)`

Hook for handling mouse button release events on an element.

Release events fire when a mouse button is released.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Release event handler

**Example:**

```tsx
function Button() {
 const ref = useRef<DOMElement>(null);
 const [isPressed, setIsPressed] = useState(false);

 useOnPress(ref, () => setIsPressed(true));
 useOnRelease(ref, () => setIsPressed(false));

 return (
  <Box ref={ref}>
   <Text>{isPressed ? 'Pressed!' : 'Press me'}</Text>
  </Box>
 );
}
```

### `useOnMouseMove(ref, handler)`

Hook for handling mouse move events on an element.

Move events fire when the mouse cursor moves within the element's bounds.
Unlike hover events, move events fire continuously as the mouse moves.

**Performance Note:** Move events fire very frequently. Consider debouncing or
throttling handlers for performance-sensitive applications.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Mouse move event handler

**Example:**

```tsx
function Tracker() {
 const ref = useRef<DOMElement>(null);
 const [position, setPosition] = useState({ x: 0, y: 0 });

 useOnMouseMove(ref, (event) => {
  setPosition({ x: event.x, y: event.y });
 });

 return (
  <Box ref={ref}>
   <Text>Mouse position: {position.x}, {position.y}</Text>
  </Box>
 );
}
```

### `useOnDrag(ref, handler)`

Hook for handling mouse drag events on an element.

Drag events fire when the mouse moves while a button is held down. This is
useful for implementing drag-and-drop functionality.

**Parameters:**

- `ref: RefObject<DOMElement>` - Reference to the element
- `handler: (event: InkMouseEvent) => void` - Drag event handler

**Example:**

```tsx
function Draggable() {
 const ref = useRef<DOMElement>(null);
 const [isDragging, setIsDragging] = useState(false);
 const [position, setPosition] = useState({ x: 0, y: 0 });

 useOnPress(ref, () => setIsDragging(true));
 useOnRelease(ref, () => setIsDragging(false));

 useOnDrag(ref, (event) => {
  if (isDragging) {
   setPosition({ x: event.x, y: event.y });
  }
 });

 return (
  <Box ref={ref} flexDirection="column">
   <Text>Position: {position.x}, {position.y}</Text>
   <Text>{isDragging ? '(dragging)' : '(not dragging)'}</Text>
  </Box>
 );
}
```

## Geometry Utilities

The package also provides utilities for working with element positions:

### `getBoundingClientRect(node)`

Get the bounding rectangle of an element.

**Parameters:**

- `node: DOMElement | null` - The element to measure

**Returns:** `BoundingClientRect | undefined`

```typescript
interface BoundingClientRect {
 readonly x: number;
 readonly y: number;
 readonly width: number;
 readonly height: number;
 readonly top: number;
 readonly right: number;
 readonly bottom: number;
 readonly left: number;
}
```

### `useBoundingClientRect(ref, deps?)`

React hook for tracking element bounds.

**Parameters:**

- `ref: RefObject<DOMElement | null>` - Reference to the element
- `deps?: unknown[]` - Dependencies to trigger recalculation (default: `[]`)

**Returns:** `BoundingClientRect`

## Event Object

All event handlers receive an `InkMouseEvent` object:

```typescript
interface InkMouseEvent {
 x: number;              // X coordinate (terminal column)
 y: number;              // Y coordinate (terminal row)
 button: string;          // Button pressed ('left', 'middle', 'right', 'wheel-up', 'wheel-down', etc.)
 action: string;          // Action type ('press', 'release', 'click', 'wheel', 'move', 'drag')
 shift: boolean;         // Shift key modifier
 alt: boolean;           // Alt key modifier
 ctrl: boolean;          // Ctrl key modifier
 raw: number;            // Raw event code
 data: string;           // Raw event data
 protocol: string;       // Mouse protocol ('SGR' or 'ESC')
}
```

## Terminal Requirements

Mouse events require terminal support. Most modern terminals support mouse events:

- **macOS**: Terminal.app, iTerm2, Warp
- **Linux**: GNOME Terminal, Konsole, Alacritty, kitty
- **Windows**: Windows Terminal, PowerShell 7+, ConEmu

To check if your terminal supports mouse events:

```tsx
import { useMouse } from '@neiropacks/ink-mouse';

function CheckSupport() {
 const { isSupported } = useMouse();

 return <Text>Mouse support: {isSupported ? 'Yes' : 'No'}</Text>;
}
```

## Advanced Usage

### Manual Enable/Disable

```tsx
function App() {
 const mouse = useMouse();

 React.useEffect(() => {
  // Enable mouse tracking only when needed
  mouse.enable();

  return () => {
   mouse.disable();
  };
 }, [mouse]);

 return <Component />;
}
```

### Element Hit Testing

The package uses [`getBoundingClientRect`](#getboundingclientrectnode) to
calculate element positions on **every mouse event**. This ensures accurate
hit detection even when elements:

- Change position (e.g., scrolling lists)
- Change size (e.g., dynamic content)
- Are added/removed from the DOM

### Multiple Event Handlers

You can combine multiple hooks on the same element:

```tsx
function MultiHandler() {
 const ref = React.useRef(null);

 useOnClick(ref, () => console.log('Clicked!'));
 useOnMouseEnter(ref, () => console.log('Entered!'));
 useOnMouseLeave(ref, () => console.log('Exited!'));
 useOnPress(ref, () => console.log('Pressed!'));
 useOnRelease(ref, () => console.log('Released!'));
 useOnMouseMove(ref, (e) => console.log(`Moved to ${e.x}, ${e.y}`));

 return <Box ref={ref}>Multi-handler element</Box>;
}
```

For a complete draggable component with press/release/drag tracking:

```tsx
function DraggableButton() {
 const ref = React.useRef(null);
 const [isDragging, setIsDragging] = React.useState(false);
 const [position, setPosition] = React.useState({ x: 0, y: 0 });

 useOnPress(ref, () => setIsDragging(true));
 useOnRelease(ref, () => setIsDragging(false));
 useOnDrag(ref, (event) => {
  if (isDragging) {
   setPosition({ x: event.x, y: event.y });
  }
 });

 return (
  <Box ref={ref}>
   <Text>
    Position: {position.x}, {position.y} {isDragging ? '(dragging)' : ''}
   </Text>
  </Box>
 );
}
```

## License

MIT

## Related Packages

- [@neiropacks/xterm-mouse](https://github.com/neiropacks/xterm-mouse) - Low-level xterm mouse protocol handler
