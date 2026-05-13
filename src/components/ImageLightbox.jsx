import { useEffect } from 'react';

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
        <button className="lightbox-close" onClick={onClose}>x</button>

        <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
          previous
        </button>

        <div className="lightbox-image-container">
          <img src={image} alt="Enlarged view" className="lightbox-image" />
        </div>

        <button className="lightbox-nav lightbox-next" onClick={nextImage}>
          next
        </button>

        <div className="lightbox-info">
          <p>Use arrow keys to navigate. Press ESC to close.</p>
        </div>
      </div>
    </div>
  );
}
