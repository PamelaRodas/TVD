import { useEffect, useState } from 'react';

const littleThings = [
  "afirmaciones escritas a mano y cartas de crecimiento",
  "reflexión diaria y oración",
  "tiempo con seres queridos, el espacio más seguro",
  "servir a otros con empatía",
  "historias que se sienten como transformación",
  "música que trae paz y enfoque",
  "momentos de reflexión, oración y silencio intencional",
  "construir hábitos que honren a Dios"
];

const rotatingQuotes = [
  'tu enfoque escribe tu futuro.',
  'claridad + intención + acción = crecimiento.',
  'disciplina hoy, paz mañana.',
  'con Dios, el progreso nunca se desperdicia.',
];

const journeyMoments = [
  {
    id: 'foundation',
    step: '01',
    title: 'estación de fundación',
    verse: 'Proverbios 16:3',
    reflection: 'Encomienda tu trabajo al Señor y construye tu día con prioridades claras.',
    action: 'Escribe una meta y una acción para hoy antes de comenzar tu rutina.',
    image: 'https://i.pinimg.com/736x/31/db/8b/31db8b3a216ad31112a60bff8e2e0acb.jpg'
  },
  {
    id: 'discipline',
    step: '02',
    title: 'estación de disciplina',
    verse: 'Gálatas 6:9',
    reflection: 'La consistencia en pequeñas acciones crea progreso visible a lo largo del tiempo.',
    action: 'Completa una tarea que has pospuesto esta semana.',
    image: 'https://i.pinimg.com/736x/28/ea/cb/28eacb713bc16c7518b2bded6e1b872b.jpg'
  },
  {
    id: 'service',
    step: '03',
    title: 'estación de servicio',
    verse: 'Mateo 5:16',
    reflection: 'El crecimiento es más profundo cuando también bendice a alguien más.',
    action: 'Haz un acto práctico de bondad hoy sin esperar reconocimiento.',
    image: 'https://i.pinimg.com/1200x/f4/1c/17/f41c1752e32705d47a42fe0efdc79185.jpg'
  },
  {
    id: 'purpose',
    step: '04',
    title: 'estación de propósito',
    verse: 'Jeremías 29:11',
    reflection: 'Confía en que Dios está guiando tu proceso incluso cuando se siente lento.',
    action: 'Revisa tu semana y anota 3 formas en que Dios te ha ayudado a avanzar.',
    image: 'https://i.pinimg.com/1200x/76/df/be/76dfbe2db895b14dc049dfe074c390a0.jpg'
  },
];

const avatarImage = 'https://i.pinimg.com/736x/31/db/8b/31db8b3a216ad31112a60bff8e2e0acb.jpg';

export default function About() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeJourney, setActiveJourney] = useState(journeyMoments[0]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % rotatingQuotes.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="about-me" className="section about-section">
      <div className="section-heading">
        <p className="eyebrow">Acerca de mí</p>
        <h2>impulsada por fe, intencional y comprometida con el crecimiento</h2>
      </div>

      <div className="about-profile-band">
        <figure className="cosmic-avatar-frame">
          <img src={avatarImage} alt="profile" />
          <figcaption>caminando en propósito</figcaption>
        </figure>

        <div className="quote-rotator">
          <p className="diary-label">enfoque actual</p>
          <h3>{rotatingQuotes[quoteIndex]}</h3>
        </div>
      </div>

      <div className="about-grid">
        <article className="about-card profile-card">
          <span className="diary-label">hola, este es mi mundo</span>
          <h3>enraizada en fe, enfocada en progreso</h3>
          <p>
            Creo en crecer con responsabilidad, gratitud y fe en Dios.
            Este espacio me ayuda a mantenerme intencional, reflexionar a menudo y seguir avanzando con propósito.
          </p>
          <div className="profile-stats">
            <span><strong>ánimo:</strong> tranquilo, enfocado, agradecido</span>
            <span><strong>estilo:</strong> propositivo y disciplinado</span>
            <span><strong>valor central:</strong> fe + consistencia + servicio</span>
          </div>
        </article>

        <article className="about-card loves-card">
          <span className="diary-label">las pequeñas cosas que amo últimamente</span>
          <ul className="loves-list">
            {littleThings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="about-card quote-card">
          <p className="quote-mark">"</p>
          <p>
            Este espacio es un recordatorio de que las pequeñas elecciones diarias crean una vida significativa.
            Con fe, disciplina y gratitud, el crecimiento se vuelve constante y real.
          </p>
          <div className="closing-signature">
            <p>con gratitud,</p>
            <p className="xoxo">toda gloria a Dios</p>
            <p className="faith">un día a la vez, con propósito</p>
          </div>
        </article>
      </div>

      <section className="journey-explorer">
        <p className="diary-label">explorador de viaje interactivo</p>

        <div className="journey-tabs" role="tablist" aria-label="journey moments">
          {journeyMoments.map((moment) => (
            <button
              key={moment.id}
              type="button"
              className={`journey-tab ${activeJourney.id === moment.id ? 'active' : ''}`}
              onClick={() => setActiveJourney(moment)}
            >
              <span>{moment.step}</span>
              <strong>{moment.title}</strong>
            </button>
          ))}
        </div>

        <article className="journey-panel">
          <img src={activeJourney.image} alt={activeJourney.title} />
          <div className="journey-copy">
            <p className="diary-label">{activeJourney.verse}</p>
            <h3>{activeJourney.title}</h3>
            <p>{activeJourney.reflection}</p>
            <div className="journey-action">
              <span>acción de hoy</span>
              <strong>{activeJourney.action}</strong>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

