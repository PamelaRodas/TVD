import { useEffect, useState } from 'react';
import '../styles/cursor.css';

const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .photo-card';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setIsHovering(Boolean(e.target.closest(interactiveSelector)));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsHovering(true);
    const handleMouseUp = (e) => {
      setIsHovering(Boolean(e.target.closest(interactiveSelector)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const sharedStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <>
      <div className={`cursor-aura ${isHovering ? 'hover' : ''} ${isVisible ? 'visible' : ''}`} style={sharedStyle} />
      <div className={`cursor-ring ${isHovering ? 'hover' : ''} ${isVisible ? 'visible' : ''}`} style={sharedStyle} />
      <div className={`cursor-dot ${isHovering ? 'hover' : ''} ${isVisible ? 'visible' : ''}`} style={sharedStyle} />
    </>
  );
}
