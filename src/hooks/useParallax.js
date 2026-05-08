import { useEffect, useRef, useState } from 'react';

export default function useParallax(intensity = 0.5) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const scrollPercentage =
            (windowHeight - elementTop) / (windowHeight + elementHeight);
          setOffset(scrollPercentage * 100 * intensity);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return [ref, offset];
}
