import { Link } from 'react-router-dom';
import QuoteCarousel from './QuoteCarousel';
import ParallaxSection from './ParallaxSection';

const heroImage = "https://i.pinimg.com/736x/0f/e4/e5/0fe4e533505dbb8792ef2d1bcef4ed5c.jpg";

export default function Hero() {
  return (
    <>
      <ParallaxSection intensity={0.3}>
        <section id="home" className="hero section hero-section">
          <div className="hero-video-wrap" aria-hidden="true">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={heroImage}
            >
              <source src="https://cdn.coverr.co/videos/coverr-fog-in-the-forest-1579/1080p.mp4" type="video/mp4" />
            </video>
            <div className="hero-film" />
          </div>

          <div className="ambient ambient-one" />

          <div className="hero-copy">
            <div className="hero-heading">
              <p className="eyebrow hero-kicker">personal archive</p>
              <h1 className="hero-title">moments in velvet</h1>
              <p className="hero-subtitle">a soft journal of red lipstick, old rooms, quiet faith, and cinematic memories</p>
            </div>

            <div className="hero-actions">
              <Link className="primary-button" to="/diary">read the diary</Link>
              <Link className="secondary-button" to="/photo-dump">open the photo dump</Link>
            </div>

            <div className="hero-tags">
              <span>late-night thoughts</span>
              <span>dark romance</span>
              <span>old books</span>
              <span>red lips</span>
              <span>moonlight</span>
              <span>velvet dresses</span>
              <span>cinematic memories</span>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <QuoteCarousel />

      <ParallaxSection intensity={0.2}>
        <section className="featured-content section">
          <div className="featured-header">
            <h2 className="section-title">what you'll find here</h2>
            <div className="title-accent">No. 01</div>
          </div>

          <div className="featured-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>the diary</h3>
              <p>unfiltered thoughts that linger in the 3am hours. confessions wrapped in metaphors and midnight clarity.</p>
              <Link to="/diary" className="feature-link">explore {'->'}</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>photo dump</h3>
              <p>a collection of fleeting moments. candid frames that capture longing, beauty, and stillness.</p>
              <Link to="/photo-dump" className="feature-link">browse {'->'}</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>about me</h3>
              <p>a glimpse into the mind behind these moments: what moves me, what I love, and why I create.</p>
              <Link to="/about" className="feature-link">discover {'->'}</Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section className="intro-section section">
        <div className="intro-content">
          <h2 className="section-title">welcome to the archive</h2>

          <p className="intro-text">
            this is a space where aesthetics meet introspection. cinematic nights blend with soft thoughts, and every corner holds a story waiting to breathe.
          </p>

          <p className="intro-text">
            if you love romantic details, dark academia, quiet faith, and the art of turning ordinary moments into little memories, you are in the right place.
          </p>

          <div className="intro-divider">the archive is open</div>

          <div className="cta-secondary">
            <p>ready to dive deeper?</p>
            <Link to="/diary" className="nav-pill">
              <span>start here</span>
              <span aria-hidden="true">{'->'}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
