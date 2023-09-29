import { RefObject, useEffect, useState } from 'react';

export function useOnScreen<T extends HTMLElement>(
  ref: RefObject<T>,
  rootMargin = '0px'
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { current } = ref;

    if (current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(current);

    return () => {
      if (current == null) return;
      observer.unobserve(current);
    };
  }, [ref, rootMargin]);

  return visible;
}
