import { useCallback, useEffect, useState } from 'react'

export default function useScroll(scrollY:number=100):boolean {
      const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = useCallback(()=>window.scrollY > scrollY ?setIsVisible(true):setIsVisible(false),[scrollY]);
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, [toggleVisibility]);
  return isVisible
}