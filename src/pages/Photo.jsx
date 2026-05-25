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
          eyebrow="Álbum de Fotos"
          title="momentos de energía significativa"
        >
          Representaciones visuales de prácticas saludables, intenciones y la energía que rodea nuestra práctica de crecimiento.
        </PageHeader>

        {moments.length === 0 ? (
          <EmptyState title="sin momentos aún">
            Agrega tu primer momento de energía desde Estudio y aparecerá aquí.
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
                <span className="diary-label">momento destacado</span>
                <h3>{featuredMoment.caption}</h3>
                <p className="entry-author">por {featuredMoment.author || 'alma anónima'}</p>
                <p>
                  Una imagen significativa elegida por su energía, intención y poder para anclar tu práctica de crecimiento.
                </p>
                <div className="photo-feature-actions">
                  <button className="primary-button" type="button" onClick={() => openLightbox(0)}>
                    ver momento
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={(event) => togglePhotoFavorite(event, featuredMoment.id)}
                  >
                    {isFavorite('photos', featuredMoment.id) ? 'guardado' : 'guardar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="photo-strip" aria-hidden="true">
              <span>prácticas saludables</span>
              <span>enfoque</span>
              <span>crecimiento personal</span>
              <span>momentos significativos</span>
            </div>

            <div className="photo-grid">
              {galleryMoments.map((moment, index) => {
                const originalIndex = index + 1;
                const sizeClass = index % 5 === 0 ? 'tall' : index % 3 === 0 ? 'wide' : '';

                return (
                  <figure
                    key={moment.id}
                    className={`polaroid photo-card ${sizeClass}`.trim()}
                    onClick={() => openLightbox(originalIndex)}
                  >
                    <img src={moment.image} alt={moment.caption} />
                    <figcaption>{moment.caption}</figcaption>
                    <p className="entry-author">by {moment.author || 'anonymous soul'}</p>
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
