import type { ElementRef, MouseLeaveHandler } from '../types';
import { useMouseEventInternal } from './useMouseEventInternal';

/**
 * Hook for handling mouse leave events on an element.
 * Must be used within a MouseProvider.
 *
 * @param ref - Reference to the element.
 * @param handler - Mouse leave event handler.
 *
 * @throws {Error} If used outside of MouseProvider
 *
 * @example
 * ```tsx
 * function Component() {
 *   const ref = useRef<DOMElement>(null);
 *   const [message, setMessage] = useState('');
 *
 *   useOnMouseLeave(ref, () => setMessage('Mouse left!'));
 *
 *   return (
 *     <Box ref={ref}>
 *       <Text>{message}</Text>
 *     </Box>
 *   );
 * }
 * ```
 */
export function useOnMouseLeave(ref: ElementRef, handler: MouseLeaveHandler | null | undefined): void {
  useMouseEventInternal('mouseLeave', ref, handler);
}
