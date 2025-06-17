'use client';

import { useState, useEffect, type RefObject } from 'react';

export function useOnScreen(ref: RefObject<HTMLElement>, rootMargin: string = '0px', threshold: number = 0.1): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // Ensure IntersectionObserver is available (client-side only)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for server-side rendering or old browsers
      setIntersecting(true); 
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIntersecting(entry.isIntersecting);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
}
