import React, { useCallback, useLayoutEffect, useState } from 'react';

const getDimensions = (element: Element) => element.getBoundingClientRect();

export function useDimensions(responsive = true) {
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);
  const [element, setElement] = useState<Element | null>(null);

  const hook = useCallback(element => setElement(element), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimensions = () => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      };

      updateDimensions();
    
      if (responsive) {
        window.addEventListener('resize', updateDimensions);

        return () => {
          window.removeEventListener('resize', updateDimensions);
        }
      }
    }
  }, [element, hook, responsive]);

  return {hook, dimensions, element};
}