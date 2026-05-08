import QuoteCarousel from './QuoteCarousel';
import ParallaxSection from './ParallaxSection';

const heroImage = "https://i.pinimg.com/1200x/bb/fe/0b/bbfe0b5e2a1a71f39f679cf54e9c475d.jpg";

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
          <div className="ambient ambient-two" />
          <div className="floating floating-one">♡</div>
          <div className="floating floating-two">✦</div>
          <div className="floating floating-three">✿</div>

          <div className="hero-copy">
            <div className="hero-heading">
              <h1 className="hero-title">moments in velvet</h1>
              <p className="hero-subtitle">where memories become poetry and nights whisper their secrets</p>
            </div>

            <div className="hero-actions">
              <a className="primary-button" href="#diary">read the diary</a>
              <a className="secondary-button" href="#photo-dump">open the photo dump</a>
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

          <div className="hero-visual">
            <div className="glow glow-a" />
            <div className="glow glow-b" />

            <div className="polaroid hero-polaroid">
              <img src={heroImage} alt="Cinematic diary collage" />
              <div className="polaroid-caption">
                <span>the kind of night that feels like a love letter</span>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <QuoteCarousel />

      <ParallaxSection intensity={0.2}>
        <section className="featured-content section">
          <div className="featured-header">
            <h2 className="section-title">what you'll find here</h2>
            <div className="title-accent">✦</div>
          </div>
          
          <div className="featured-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>the diary</h3>
              <p>unfiltered thoughts that linger in the 3am hours. confessions wrapped in metaphors and midnight clarity.</p>
              <a href="/diary" className="feature-link">explore →</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🖼</div>
              <h3>photo dump</h3>
              <p>a collection of fleeting moments. candid frames that capture the aesthetic of longing and beauty in stillness.</p>
              <a href="/photo-dump" className="feature-link">browse →</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">♪</div>
              <h3>playlists</h3>
              <p>curated soundtracks for every mood. songs that understand what you're feeling when words aren't enough.</p>
              <a href="/playlists" className="feature-link">listen →</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✍</div>
              <h3>about me</h3>
              <p>a glimpse into the mind behind these moments. who i am, what moves me, and why i create.</p>
              <a href="/about" className="feature-link">discover →</a>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section className="intro-section section">
        <div className="intro-content">
          <h2 className="section-title">welcome to the archive</h2>
          
          <p className="intro-text">
            this is a space where aesthetics meet introspection. where cinematic nights blend with philosophical musings, and every corner holds a story waiting to breathe. here, beauty is melancholic, romance is honest, and silence speaks louder than words.
          </p>

          <p className="intro-text">
            whether you're drawn to dark academia vibes, romantic reverie, or simply the art of finding meaning in the mundane—you're in the right place. scroll through the archives, lose yourself in the playlists, and remember: every moment, no matter how fleeting, is worth treasuring.
          </p>

          <div className="intro-divider">✦</div>

          <div className="cta-secondary">
            <p>ready to dive deeper?</p>
            <a href="/diary" className="nav-pill">
              <span>start here</span>
              <span style={{fontSize: '0.9rem'}}>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
