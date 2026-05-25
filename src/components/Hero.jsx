import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuoteCarousel from './QuoteCarousel';
import ParallaxSection from './ParallaxSection';

const heroImage = "https://i.pinimg.com/1200x/a9/95/73/a9957370978d94c77f456e662397624f.jpg";

const focusPrompts = [
  '¿Cuál es una acción que puedo terminar hoy?',
  '¿Qué necesito entregar a Dios hoy?',
  '¿A quién puedo servir con una acción práctica?',
  '¿Qué hábito mejorará mi semana?',
  '¿Qué debo dejar de posponer ahora?',
];

const verses = [
  "Filipenses 4:13 - Todo lo puedo en Cristo que me fortalece.",
  "Proverbios 3:5 - Confía en el Señor con todo tu corazón.",
  "Salmo 46:1 - Dios es nuestro refugio y fortaleza.",
  "Isaías 41:10 - No temas, pues yo estoy contigo.",
  "Jeremías 29:11 - Yo sé los planes que tengo para ti, dice el Señor.",
];

const homeVideos = [
  { id: 'trg06GQ3VkU', title: 'Fe y disciplina' },
  { id: 'm82svXjWpwE', title: 'Consistencia y enfoque' },
  { id: 'aFGS8BPxYy0', title: 'Propósito y gratitud' },
];

const reflectionCards = [
  { title: 'hoy terminaré', text: 'Una tarea con enfoque total y sin excusas.' },
  { title: 'hoy confiaré', text: 'En el proceso de Dios mientras hago mi parte fielmente.' },
  { title: 'hoy serviré', text: 'Una acción práctica que ayude a otros.' },
  { title: 'hoy crecerré', text: 'Pequeña consistencia que construye una fortaleza duradera.' },
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
              <p className="eyebrow hero-kicker">fe + propósito + crecimiento</p>
              <h1 className="hero-title">crece con intención y la guía de Dios</h1>
              <p className="hero-subtitle">un diario personal para disciplina, gratitud, reflexión y progreso diario</p>
            </div>

            <div className="hero-actions">
              <Link className="primary-button" to="/diary">abre tu diario</Link>
              <Link className="secondary-button" to="/growth">visita Crecimiento</Link>
            </div>

            <div className="hero-tags">
              <span>gratitud</span>
              <span>oración</span>
              <span>disciplina</span>
              <span>enfoque</span>
              <span>propósito</span>
              <span>servicio</span>
              <span>consistencia</span>
            </div>

            <div className="gratitude-widget">
              <p className="diary-label">pregunta de enfoque</p>
              <strong>{focusPrompts[promptIndex]}</strong>
              <div className="gratitude-actions">
                <button className="primary-button" type="button" onClick={nextPrompt}>siguiente pregunta</button>
              </div>
            </div>

            <div className="verse-widget">
              <p className="diary-label">versículo del día</p>
              <strong>{verses[verseIndex]}</strong>
              <div className="gratitude-actions">
                <button className="secondary-button" type="button" onClick={nextVerse}>otro versículo</button>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <QuoteCarousel />

      <ParallaxSection intensity={0.2}>
        <section className="featured-content section">
          <div className="featured-header">
            <h2 className="section-title">qué encontrarás aquí</h2>
            <div className="title-accent">No. 01</div>
          </div>

          <div className="featured-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>diario de crecimiento</h3>
              <p>notas diarias para alinear tus metas, pensamientos y acciones.</p>
              <Link to="/diary" className="feature-link">explorar {'->'}</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>enfoque basado en fe</h3>
              <p>pasos prácticos de oración, gratitud y disciplina para crecimiento real.</p>
              <Link to="/growth" className="feature-link">explorar {'->'}</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>momentos de propósito</h3>
              <p>imágenes y reflexiones que te recuerdan hacia dónde vas.</p>
              <Link to="/photo-dump" className="feature-link">descubrir {'->'}</Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section className="home-video-section section">
        <div className="featured-header">
          <h2 className="section-title">destacados de video</h2>
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
          <h2 className="section-title">flujo de reflexión</h2>
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
          <h2 className="section-title">bienvenido a tu espacio de propósito</h2>

          <p className="intro-text">
            este es un espacio para crecer con claridad, responsabilidad y fe. cada página está diseñada para ayudarte a avanzar con intención.
          </p>

          <p className="intro-text">
            aquí buscamos progreso que honre a Dios: acciones consistentes, corazón agradecido y servicio a otros.
          </p>

          <div className="intro-divider">camina en propósito cada día</div>

          <div className="cta-secondary">
            <p>¿listo para comenzar?</p>
            <Link to="/diary" className="nav-pill">
              <span>comienza aquí</span>
              <span aria-hidden="true">{'->'}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="faith-tribute section">
        <p className="eyebrow">Tributo</p>
        <h2>todo honor y gloria a Dios</h2>
        <p>
          este proyecto es una pequeña ofrenda de gratitud. que cada meta, cada paso y cada logro sea dirigido por Dios y usado para el bien.
        </p>
      </section>
    </>
  );
}
