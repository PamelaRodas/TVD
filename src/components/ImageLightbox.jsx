import { useEffect, useState } from 'react';

export default function ImageLightbox({ isOpen, image, onClose, nextImage, prevImage }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, nextImage, prevImage]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>✕</button>
        
        <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
          ‹
        </button>
        
        <div className="lightbox-image-container">
          <img src={image} alt="Enlarged view" className="lightbox-image" />
        </div>
        
        <button className="lightbox-nav lightbox-next" onClick={nextImage}>
          ›
        </button>

        <div className="lightbox-info">
          <p>Press ← → to navigate • Press ESC to close</p>
        </div>
      </div>
    </div>
  );
}
