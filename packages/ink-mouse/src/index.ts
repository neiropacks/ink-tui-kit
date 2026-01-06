// Types

// Context (exported for advanced use cases)
export { MouseContext } from './context';
// Geometry functions
export {
  getBoundingClientRect,
  getElementDimensions,
  getElementPosition,
  useBoundingClientRect,
  useElementDimensions,
  useElementPosition,
} from './geometry';
// Hooks
export {
  useMouse,
  useOnClick,
  useOnDrag,
  useOnMouseEnter,
  useOnMouseLeave,
  useOnMouseMove,
  useOnPress,
  useOnRelease,
  useOnWheel,
} from './hooks';
// Provider
export { MouseProvider } from './provider';
export type {
  BoundingClientRect,
  ClickHandler,
  DOMRect,
  ElementRef,
  InkMouseEvent,
  MouseContextValue,
  MouseDragHandler,
  MouseEnterHandler,
  MouseLeaveHandler,
  MouseMoveHandler,
  MousePressHandler,
  MouseReleaseHandler,
  WheelHandler,
} from './types';

// Utilities
export * from './utils';
