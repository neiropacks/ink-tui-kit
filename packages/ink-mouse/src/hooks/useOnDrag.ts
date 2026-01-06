import type { ElementRef, MouseDragHandler } from '../types';
import { useMouseEventInternal } from './useMouseEventInternal';

/**
 * Hook for handling mouse drag events on an element.
 * Must be used within a MouseProvider.
 *
 * Drag events fire when the mouse moves while a button is held down.
 * This is useful for implementing drag-and-drop functionality.
 *
 * @param ref - Reference to the element.
 * @param handler - Mouse drag event handler.
 *
 * @throws {Error} If used outside of MouseProvider
 *
 * @example
 * ```tsx
 * function Draggable() {
 *   const ref = useRef<DOMElement>(null);
 *   const [isDragging, setIsDragging] = useState(false);
 *   const [position, setPosition] = useState({ x: 0, y: 0 });
 *
 *   useOnPress(ref, () => setIsDragging(true));
 *   useOnRelease(ref, () => setIsDragging(false));
 *
 *   useOnDrag(ref, (event) => {
 *     if (isDragging) {
 *       setPosition({ x: event.x, y: event.y });
 *     }
 *   });
 *
 *   return (
 *     <Box ref={ref} flexDirection="column">
 *       <Text>Position: {position.x}, {position.y}</Text>
 *       <Text>{isDragging ? '(dragging)' : '(not dragging)'}</Text>
 *     </Box>
 *   );
 * }
 * ```
 */
export function useOnDrag(ref: ElementRef, handler: MouseDragHandler | null | undefined): void {
  useMouseEventInternal('mouseDrag', ref, handler);
}
