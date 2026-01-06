import { useContext, useEffect, useRef } from 'react';
import { DEV_WARNING, ERRORS } from '../constants';
import { MouseRegistryContext } from '../context';
import type { ElementRef, InkMouseEvent } from '../types';

/**
 * Internal universal hook for mouse event registration
 * Handles common logic for all mouse event hooks
 *
 * @internal
 */
export function useMouseEventInternal(
  eventType: 'click' | 'mouseEnter' | 'mouseLeave' | 'wheel',
  ref: ElementRef,
  handler: ((event: InkMouseEvent) => void) | null | undefined,
): void {
  const registry = useContext(MouseRegistryContext);
  const idRef = useRef<string | null>(null);

  // Generate unique ID with event type
  if (idRef.current === null) {
    idRef.current = `${eventType}-${Date.now()}-${Math.random()}`;
  }

  useEffect(() => {
    if (!registry) {
      throw new Error(`${DEV_WARNING} ${ERRORS.NO_PROVIDER}`);
    }

    if (!ref) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`${DEV_WARNING} ${ERRORS.NULL_REF}`);
      }
      return;
    }

    if (!handler) {
      return;
    }

    const id = idRef.current;
    if (!id) {
      return;
    }

    registry.registerHandler(id, ref, eventType, handler);

    return () => {
      registry.unregisterHandler(id);
    };
  }, [ref, handler, registry, eventType]);
}
