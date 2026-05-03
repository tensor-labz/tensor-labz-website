import { useCallback, useEffect, useState, useRef } from 'react';
export function useScroll(scrollY: number = 100): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const rafRef = useRef<number>();
  const isScheduledRef = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!isScheduledRef.current) {
      isScheduledRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > scrollY);
        isScheduledRef.current = false;
      });
    }
  }, [scrollY]);

  useEffect(() => {
    setIsVisible(window.scrollY > scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, scrollY]);

  return isVisible;
}

export default useScroll;
