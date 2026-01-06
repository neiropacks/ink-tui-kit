import type { ElementRef, MouseReleaseHandler } from '../types';
import { useMouseEventInternal } from './useMouseEventInternal';

/**
 * Hook for handling mouse button release events on an element.
 * Must be used within a MouseProvider.
 *
 * Release events fire when a mouse button is released.
 *
 * @param ref - Reference to the element.
 * @param handler - Mouse release event handler.
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
export function useOnRelease(ref: ElementRef, handler: MouseReleaseHandler | null | undefined): void {
  useMouseEventInternal('mouseRelease', ref, handler);
}
