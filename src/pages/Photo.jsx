import { useState } from 'react';
import EmptyState from '../components/EmptyState';
import ImageLightbox from '../components/ImageLightbox';
import PageHeader from '../components/PageHeader';
import { useFavorites } from '../hooks/useFavorites';
import { getPhotoMoments } from '../services/contentService';

export default function PhotoDump() {
  const [moments] = useState(() => getPhotoMoments());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  const featuredMoment = moments[0];
  const galleryMoments = moments.slice(1);

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

  const togglePhotoFavorite = (event, id) => {
    event.stopPropagation();
    toggleFavorite('photos', id);
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
        <PageHeader
          eyebrow="Photo Album"
          title="portraits, quiet details, and moments worth remembering"
        >
          A small visual archive of scenes that feel personal, refined, and close to the heart.
        </PageHeader>

        {moments.length === 0 ? (
          <EmptyState title="no photos yet">
            Add your first image from Studio and it will appear here.
          </EmptyState>
        ) : (
          <>
            <div className="photo-feature">
              <button
                className="photo-feature-image"
                type="button"
                onClick={() => openLightbox(0)}
              >
                <img src={featuredMoment.image} alt={featuredMoment.caption} />
              </button>

              <div className="photo-feature-copy">
                <span className="diary-label">featured portrait</span>
                <h3>{featuredMoment.caption}</h3>
                <p>
                  A leading image for the album, chosen for its color, softness, and quiet presence.
                </p>
                <div className="photo-feature-actions">
                  <button className="primary-button" type="button" onClick={() => openLightbox(0)}>
                    view portrait
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={(event) => togglePhotoFavorite(event, featuredMoment.id)}
                  >
                    {isFavorite('photos', featuredMoment.id) ? 'saved' : 'save'}
                  </button>
                </div>
              </div>
            </div>

            <div className="photo-strip" aria-hidden="true">
              <span>portraits</span>
              <span>soft light</span>
              <span>red details</span>
              <span>kept moments</span>
            </div>

            <div className="photo-grid">
              {galleryMoments.map((moment, index) => {
                const originalIndex = index + 1;

                return (
                  <figure
                    key={moment.id}
                    className={`polaroid photo-card ${moment.size ?? ""}`.trim()}
                    onClick={() => openLightbox(originalIndex)}
                  >
                    <img src={moment.image} alt={moment.caption} />
                    <figcaption>{moment.caption}</figcaption>
                    <div className="photo-overlay">
                      <span className="expand-icon">view</span>
                      <button
                        className={`favorite-btn ${isFavorite('photos', moment.id) ? 'active' : ''}`}
                        onClick={(event) => togglePhotoFavorite(event, moment.id)}
                        title="Add to favorites"
                      >
                        heart
                      </button>
                    </div>
                  </figure>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
