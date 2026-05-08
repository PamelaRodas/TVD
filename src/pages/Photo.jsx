import { useState } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import { useFavorites } from '../hooks/useFavorites';

const moments = [
  { 
    image: "https://i.pinimg.com/736x/60/db/05/60db05143f5c93b143ccab2018529bea.jpg", 
    caption: "Do not torture yourself with memories of the past." 
  },
  { 
    image: "https://i.pinimg.com/736x/fd/69/51/fd695156e0e5fdfaf267c91e44e57708.jpg", 
    caption: "I have to believe that there's good in people." 
  },
  { 
    image: "https://i.pinimg.com/736x/a7/f7/0a/a7f70a4ec7c3c1c38878567f650daf2c.jpg", 
    caption: "The choices we make define who we are." 
  },
  { 
    image: "https://i.pinimg.com/736x/b9/c9/19/b9c9195fa7665868b8fc1929060a7a6d.jpg", 
    caption: "Always and forever." 
  },
  { 
    image: "https://i.pinimg.com/736x/76/3f/67/763f678bd2053acda41c720e0d2605a7.jpg", 
    caption: "I am who I am." 
  },
  { 
    image: "https://i.pinimg.com/736x/57/da/e3/57dae3744e73a4669f711fbcda44865f.jpg", 
    caption: "Even miracles take a little time." 
  },
  { 
    image: "https://i.pinimg.com/736x/6f/a7/a3/6fa7a3b9858f8a9a8dcd6a78b2c3ae06.jpg", 
    caption: "I'll love you forever." 
  }
];

export default function PhotoDump() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  const openLightbox = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % moments.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + moments.length) % moments.length);
  };

  return (
    <>
      <ImageLightbox
        isOpen={lightboxOpen}
        image={moments[selectedImage]?.image}
        onClose={closeLightbox}
        nextImage={nextImage}
        prevImage={prevImage}
      />
      <section id="photo-dump" className="section photo-dump-section">
        <div className="section-heading">
          <p className="eyebrow">Photo Dump</p>
          <h2>pinterest-style memories, tiny fragments, and cinematic snapshots</h2>
        </div>

        <div className="photo-grid">
          {moments.map((moment, index) => (
            <figure 
              key={moment.caption} 
              className={`polaroid photo-card ${moment.size ?? ""}`.trim()}
              onClick={() => openLightbox(index)}
              style={{ cursor: 'none' }}
            >
              <img src={moment.image} alt={moment.caption} />
              <figcaption>{moment.caption}</figcaption>
              <div className="photo-overlay">
                <span className="expand-icon">↗</span>
                <button
                  className={`favorite-btn ${isFavorite('photos', index) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('photos', index);
                  }}
                  title="Add to favorites"
                >
                  ♡
                </button>
              </div>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
