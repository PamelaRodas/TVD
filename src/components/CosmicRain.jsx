import { useEffect, useRef } from 'react';

export default function CosmicRain() {
  const containerRef = useRef(null);

  useEffect(() => {
    const createRain = () => {
      if (!containerRef.current) return;

      const rain = document.createElement('div');
      rain.className = 'cosmic-particle';
      rain.style.left = Math.random() * 100 + '%';
      rain.style.top = '-10px';
      
      const symbols = ['✦', '◆', '★', '○', '✧', '⋆', '∞', '✨'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      rain.textContent = symbol;
      
      containerRef.current.appendChild(rain);

      // Remove after animation
      setTimeout(() => {
        rain.remove();
      }, 4000);
    };

    const interval = setInterval(createRain, 300);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="cosmic-rain" />;
}
