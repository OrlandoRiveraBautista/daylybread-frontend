import { useCallback, useState } from "react";

const DEFAULT_THRESHOLD = 8;

/**
 * Frosted headers stay clear at the top of the page and materialize
 * once content scrolls underneath (Apple large-title / nav bar pattern).
 */
export const useHeaderScrolled = (threshold = DEFAULT_THRESHOLD) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(
    (event: CustomEvent) => {
      const scrollTop = event.detail?.scrollTop ?? 0;
      const next = scrollTop > threshold;
      setIsScrolled((prev) => (prev === next ? prev : next));
    },
    [threshold]
  );

  return { isScrolled, handleScroll };
};
