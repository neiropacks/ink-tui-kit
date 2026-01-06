import type { ElementRef, MouseMoveHandler } from '../types';
import { useMouseEventInternal } from './useMouseEventInternal';

/**
 * Hook for handling mouse move events on an element.
 * Must be used within a MouseProvider.
 *
 * Move events fire when the mouse cursor moves within the element's bounds.
 * Unlike hover events, move events fire continuously as the mouse moves.
 *
 * **Performance Note:** Move events fire very frequently. Consider debouncing
 * or throttling handlers for performance-sensitive applications.
 *
 * @param ref - Reference to the element.
 * @param handler - Mouse move event handler.
 *
 * @throws {Error} If used outside of MouseProvider
 *
 * @example
 * ```tsx
 * function Tracker() {
 *   const ref = useRef<DOMElement>(null);
 *   const [position, setPosition] = useState({ x: 0, y: 0 });
 *
 *   useOnMouseMove(ref, (event) => {
 *     setPosition({ x: event.x, y: event.y });
 *   });
 *
 *   return (
 *     <Box ref={ref}>
 *       <Text>Mouse position: {position.x}, {position.y}</Text>
 *     </Box>
 *   );
 * }
 * ```
 */
export function useOnMouseMove(ref: ElementRef, handler: MouseMoveHandler | null | undefined): void {
  useMouseEventInternal('mouseMove', ref, handler);
}
