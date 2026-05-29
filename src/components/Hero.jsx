import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuoteCarousel from './QuoteCarousel';
import ParallaxSection from './ParallaxSection';

const heroImage = "https://i.pinimg.com/1200x/a9/95/73/a9957370978d94c77f456e662397624f.jpg";

const focusPrompts = [
  'What is one action I can complete today?',
  'What do I need to surrender to God today?',
  'Who can I serve with a practical action?',
  'What habit will improve my week?',
  'What should I stop postponing right now?',
];

const verses = [
  "Philippians 4:13 - I can do all things through Christ who strengthens me.",
  "Proverbs 3:5 - Trust in the Lord with all your heart.",
  "Psalm 46:1 - God is our refuge and strength.",
  "Isaiah 41:10 - Fear not, for I am with you.",
  "Jeremiah 29:11 - I know the plans I have for you, declares the Lord.",
];

const homeVideos = [
  { id: 'trg06GQ3VkU', title: 'Faith and Discipline' },
  { id: 'm82svXjWpwE', title: 'Consistency and Focus' },
  { id: 'aFGS8BPxYy0', title: 'Purpose and Gratitude' },
];

const reflectionCards = [
  { title: 'today I will finish', text: 'One task with complete focus and no excuses.' },
  { title: 'today I will trust', text: 'In God\'s process while I do my part faithfully.' },
  { title: 'today I will serve', text: 'With a practical action that helps others.' },
  { title: 'today I will grow', text: 'Small consistency builds lasting strength.' },
];

export default function Hero() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [verseIndex, setVerseIndex] = useState(() => {
    const day = new Date().getDate();
    return day % verses.length;
  });

  const nextPrompt = () => {
    setPromptIndex((current) => (current + 1) % focusPrompts.length);
  };

  const nextVerse = () => {
    setVerseIndex((current) => (current + 1) % verses.length);
  };

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
              <p className="eyebrow hero-kicker">faith + purpose + growth</p>
              <h1 className="hero-title">grow with intention and God's guidance</h1>
              <p className="hero-subtitle">a personal journal for discipline, gratitude, reflection and daily progress</p>
            </div>

            <div className="hero-actions">
              <Link className="primary-button" to="/diary">open your journal</Link>
              <Link className="secondary-button" to="/growth">visit growth</Link>
            </div>

            <div className="hero-tags">
              <span>gratitude</span>
              <span>prayer</span>
              <span>discipline</span>
              <span>focus</span>
              <span>purpose</span>
              <span>service</span>
              <span>consistency</span>
            </div>

            <div className="gratitude-widget">
              <p className="diary-label">focus question</p>
              <strong>{focusPrompts[promptIndex]}</strong>
              <div className="gratitude-actions">
                <button className="primary-button" type="button" onClick={nextPrompt}>next question</button>
              </div>
            </div>

            <div className="verse-widget">
              <p className="diary-label">verse of the day</p>
              <strong>{verses[verseIndex]}</strong>
              <div className="gratitude-actions">
                <button className="secondary-button" type="button" onClick={nextVerse}>another verse</button>
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
            <div className="title-accent">No. 01</div>
          </div>

          <div className="featured-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>growth journal</h3>
              <p>daily notes to align your goals, thoughts and actions.</p>
              <Link to="/diary" className="feature-link">explore {'->'}</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>faith-based focus</h3>
              <p>practical steps of prayer, gratitude and discipline for real growth.</p>
              <Link to="/growth" className="feature-link">explore {'->'}</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>moments of purpose</h3>
              <p>images and reflections to remind you where you're heading.</p>
              <Link to="/photo-dump" className="feature-link">discover {'->'}</Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section className="home-video-section section">
        <div className="featured-header">
          <h2 className="section-title">video highlights</h2>
          <div className="title-accent">No. 02</div>
        </div>
        <div className="home-video-grid">
          {homeVideos.map((video) => (
            <article key={video.id} className="home-video-card">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p>{video.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-reflection-section section">
        <div className="featured-header">
          <h2 className="section-title">reflection flow</h2>
          <div className="title-accent">No. 03</div>
        </div>
        <div className="reflection-carousel-track">
          {reflectionCards.concat(reflectionCards).map((item, index) => (
            <article className="reflection-mini-card" key={`${item.title}-${index}`}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="intro-section section">
        <div className="intro-content">
          <h2 className="section-title">welcome to your purpose space</h2>

          <p className="intro-text">
            this is a space to grow with clarity, responsibility and faith. each page is designed to help you move forward with intention.
          </p>

          <p className="intro-text">
            here we seek progress that honors God: consistent actions, a grateful heart and service to others.
          </p>

          <div className="intro-divider">walk in purpose every day</div>

          <div className="cta-secondary">
            <p>ready to begin?</p>
            <Link to="/diary" className="nav-pill">
              <span>start here</span>
              <span aria-hidden="true">{'->'}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="faith-tribute section">
        <p className="eyebrow">Tribute</p>
        <h2>all honor and glory to God</h2>
        <p>
          this project is a small offering of gratitude. may every goal, every step and every achievement be guided by God and used for good.
        </p>
      </section>
    </>
  );
}
