import type { DOMElement } from 'ink';

/**
 * Create a mock Yoga node with computed layout
 */
export function createMockYogaNode(layout: { left: number; top: number; width: number; height: number }): {
  getComputedLayout: () => typeof layout;
} {
  return {
    getComputedLayout: () => layout,
  };
}

/**
 * Create a mock DOMElement for testing Ink components
 *
 * @example
 * ```ts
 * const element = createMockDOMElement({
 *   left: 10,
 *   top: 20,
 *   width: 100,
 *   height: 50,
 * });
 * ```
 */
export function createMockDOMElement(props: {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  parentNode?: DOMElement | undefined;
}): DOMElement {
  const { left = 0, top = 0, width = 10, height = 10, parentNode = undefined } = props;

  const yogaNode = createMockYogaNode({ left, top, width, height });

  const element: Partial<DOMElement> = {
    yogaNode: yogaNode as unknown as DOMElement['yogaNode'],
    parentNode,
  };

  return element as DOMElement;
}

/**
 * Create a mock DOMElement with a parent chain
 *
 * @param elements - Array of elements from child to root
 * @returns The child element with full parent chain
 *
 * @example
 * ```ts
 * const child = createMockDOMElementChain([
 *   { left: 5, top: 5, width: 50, height: 30 },  // child
 *   { left: 10, top: 10, width: 100, height: 50 }, // parent
 * ]);
 * ```
 */
export function createMockDOMElementChain(
  elements: Array<{ left: number; top: number; width: number; height: number }>,
): DOMElement {
  if (elements.length === 0) {
    throw new Error('At least one element is required');
  }

  // Build chain from root to child
  let parentElement: DOMElement | undefined;

  for (let i = elements.length - 1; i >= 0; i--) {
    const element = createMockDOMElement({
      ...elements[i],
      parentNode: parentElement,
    });
    parentElement = element;
  }

  return parentElement as DOMElement;
}
