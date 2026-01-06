import type { ElementRef, MousePressHandler } from '../types';
import { useMouseEventInternal } from './useMouseEventInternal';

/**
 * Hook for handling mouse button press events on an element.
 * Must be used within a MouseProvider.
 *
 * Press events fire immediately when a mouse button is pressed down,
 * before the click event (which requires press + release).
 *
 * @param ref - Reference to the element.
 * @param handler - Mouse press event handler.
 *
 * @throws {Error} If used outside of MouseProvider
 *
 * @example
 * ```tsx
 * function Button() {
 *   const ref = useRef<DOMElement>(null);
 *   const [isPressed, setIsPressed] = useState(false);
 *
 *   useOnPress(ref, () => setIsPressed(true));
 *   useOnRelease(ref, () => setIsPressed(false));
 *
 *   return (
 *     <Box ref={ref}>
 *       <Text>{isPressed ? 'Pressed!' : 'Press me'}</Text>
 *     </Box>
 *   );
 * }
 * ```
 */
export function useOnPress(ref: ElementRef, handler: MousePressHandler | null | undefined): void {
  useMouseEventInternal('mousePress', ref, handler);
}
