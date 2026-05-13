import { useState } from 'react';
import MoonPhaseWidget from '../components/MoonPhaseWidget';

export default function Playlist() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [embedError, setEmbedError] = useState(false);

  const playlists = [
    {
      title: "Soft, Dark & Romantic",
      subtitle: "visuals and guided ambience",
      description: "A collection of cinematic, slow-motion visuals and whispered ambience for candlelit nights and reflective hours.",
      videos: [
        { id: 'b1XG2vJ8VYs', title: 'Candlelight Whisper - guided ambience' },
        { id: 'hK8Yz1q3G6I', title: 'Midnight Filmloop - soft motion' },
        { id: 'Jx7wQp2Z3Rg', title: 'Velvet Rain - slow visuals' }
      ],
      vibe: "melancholic and dreamy"
    },
    {
      title: "Cosmic Consciousness",
      subtitle: "meditations and astral visuals",
      description: "Short guided meditations, binaural ambience, and cosmic visual loops to help you open to the frequency of the universe.",
      videos: [
        { id: 'QwZT7T-TXT0', title: 'Stellar Drift - binaural journey' },
        { id: '2vjPBrBU-TM', title: 'Nebula Loops - visual meditation' },
        { id: 'e-ORhEE9VVg', title: 'Frequency Harmony - breathwork' }
      ],
      vibe: "ethereal and universal"
    },
    {
      title: "Midnight Mystique",
      subtitle: "esoteric visual set",
      description: "Short ritual-like videos, tarot ambiance, and moody visual textures for witching hour practice.",
      videos: [
        { id: 'kXYiU_JCYtU', title: 'Witchlight - ritual loop' },
        { id: '9bZkp7q19f0', title: 'Shadow Dance - monochrome loop' },
        { id: 'ScNNfyq3d_w', title: 'Moon Alchemy - slow motion' }
      ],
      vibe: "mystical and potent"
    },
    {
      title: "Manifestation & Frequency",
      subtitle: "guided visualizations",
      description: "Short manifestation videos and spoken prompts to help you anchor intentions with imagery and sound.",
      videos: [
        { id: 'fRh_vgS2dFE', title: 'I Am Becoming - guided visualization' },
        { id: '60ItHLz5WEA', title: 'Frequency of Abundance - soundscape' },
        { id: '3JZ_D3ELwOQ', title: 'Magnetic Reality - breath and focus' }
      ],
      vibe: "transformative and magnetic"
    }
  ];

  const currentPlaylist = playlists[selectedPlaylist];

  const choosePlaylist = (index) => {
    setSelectedPlaylist(index);
    setSelectedVideo(0);
    setEmbedError(false);
  };

  return (
    <>
      <MoonPhaseWidget />
      <section id="playlists" className="section playlist-section">
        <div className="section-heading">
          <p className="eyebrow">Playlists</p>
          <h2>my soundtrack for rainy nights, moonlight, cosmic journeys, and dramatic daydreams</h2>
        </div>

        <div className="playlist-tabs">
          {playlists.map((playlist, index) => (
            <button
              key={playlist.title}
              className={`playlist-tab ${index === selectedPlaylist ? 'active' : ''}`}
              onClick={() => choosePlaylist(index)}
            >
              <span className="tab-title">{playlist.title}</span>
              <span className="tab-vibe">{playlist.vibe}</span>
            </button>
          ))}
        </div>

        <div className="playlist-layout">
          <div className="playlist-note">
            <span className="diary-label">{currentPlaylist.subtitle}</span>
            <h3>{currentPlaylist.title}</h3>
            <p className="playlist-description">
              {currentPlaylist.description}
            </p>

            <ul className="track-list">
              {currentPlaylist.videos.map((video, index) => (
                <li
                  key={video.id}
                  className={index === selectedVideo ? 'active' : ''}
                  onClick={() => setSelectedVideo(index)}
                >
                  <span className="track-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="track-name">{video.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="playlist-embed">
            <div className="video-wrapper">
              <iframe
                key={currentPlaylist.videos[selectedVideo].id}
                title={`Video player - ${currentPlaylist.videos[selectedVideo].title}`}
                src={`https://www.youtube.com/embed/${currentPlaylist.videos[selectedVideo].id}?rel=0&modestbranding=1&playsinline=1`}
                width="100%"
                height="420"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setEmbedError(false)}
                onError={() => setEmbedError(true)}
              />
            </div>

            {embedError && (
              <div className="spotify-fallback">
                <p>The video player could not load here. Open the video on YouTube.</p>
                <a
                  className="spotify-open"
                  href={`https://www.youtube.com/watch?v=${currentPlaylist.videos[selectedVideo].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
