import { useState, useEffect } from 'react';

const affirmations = [
  "Dios guía mis pasos cada día",
  "Crezco con disciplina, fe y propósito",
  "Mis pensamientos, palabras y acciones están alineados",
  "Estoy agradecido por cada nueva oportunidad",
  "Confío en el tiempo de Dios en cada proceso",
  "Elijo paz, claridad y consistencia",
  "Me estoy convirtiendo en la persona que estoy llamado a ser",
  "Hoy avanzo con coraje",
];

const growthPrompts = [
  "¿En qué meta trabajarás hoy?",
  "¿Qué hábito quieres fortalecer esta semana?",
  "¿Qué necesitas soltar para avanzar?",
  "¿Por qué estoy agradecido hoy?",
  "¿Cómo puedo servir mejor a otros esta semana?",
  "¿Cuál es una acción que puedo tomar ahora mismo?",
];

const growthVideos = [
  { id: 'trg06GQ3VkU', title: 'Video de crecimiento 1' },
  { id: 'm82svXjWpwE', title: 'Video de crecimiento 2' },
  { id: 'aFGS8BPxYy0', title: 'Video de crecimiento 3' },
  { id: 'QX70le3E9hM', title: 'Video de crecimiento 4' },
];

export default function Manifestation() {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [growthDays, setGrowthDays] = useState(() => {
    const saved = localStorage.getItem('growthStart');
    if (!saved) return 0;
    return Math.floor((new Date() - new Date(saved)) / (1000 * 60 * 60 * 24));
  });
  const [sealedIntention, setSealedIntention] = useState(() => localStorage.getItem('sealedIntention'));
  const [intention, setIntention] = useState('');
  const [activePrompt] = useState(() => (
    growthPrompts[Math.floor(Math.random() * growthPrompts.length)]
  ));

  const [weeklyChecks, setWeeklyChecks] = useState(() => {
    const saved = localStorage.getItem('growthWeeklyChecks');
    return saved ? JSON.parse(saved) : [false, false, false, false, false, false, false];
  });

  const storedBest = (() => {
    const saved = localStorage.getItem('growthBestStreak');
    return saved ? Number(saved) : 0;
  })();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('growthWeeklyChecks', JSON.stringify(weeklyChecks));
  }, [weeklyChecks]);

  const sealIntention = () => {
    if (intention.trim()) {
      localStorage.setItem('sealedIntention', intention);
      setSealedIntention(intention);
      localStorage.setItem('growthStart', new Date().toISOString());
      setGrowthDays(0);
      setIntention('');
    }
  };

  const clearIntention = () => {
    localStorage.removeItem('sealedIntention');
    setSealedIntention(null);
    setGrowthDays(0);
  };

  const toggleDay = (index) => {
    setWeeklyChecks((current) => current.map((item, i) => (i === index ? !item : item)));
  };

  const completedDays = weeklyChecks.filter(Boolean).length;
  const consistency = Math.round((completedDays / 7) * 100);

  const currentStreak = (() => {
    let streak = 0;
    for (let i = weeklyChecks.length - 1; i >= 0; i -= 1) {
      if (!weeklyChecks[i]) break;
      streak += 1;
    }
    return streak;
  })();

  const bestStreak = Math.max(storedBest, currentStreak);

  useEffect(() => {
    if (currentStreak > storedBest) {
      localStorage.setItem('growthBestStreak', String(currentStreak));
    }
    // storedBest is read-once from localStorage; updating localStorage here avoids
    // calling setState inside effects and keeps the displayed `bestStreak` correct.
  }, [currentStreak, storedBest]);

  return (
    <section className="manifestation-section section">
      <div className="section-heading">
        <p className="eyebrow">Crecimiento</p>
        <h2>fe, enfoque y progreso diario</h2>
      </div>

      <div className="growth-progress-panel">
        <div><span className="diary-label">días en progreso</span><strong>{growthDays}</strong></div>
        <div><span className="diary-label">verificaciones semanales</span><strong>{completedDays}/7</strong></div>
        <div><span className="diary-label">consistencia</span><strong>{consistency}%</strong></div>
        <div><span className="diary-label">racha actual</span><strong>{currentStreak} días</strong></div>
        <div><span className="diary-label">mejor racha</span><strong>{bestStreak} días</strong></div>
      </div>

      <div className="weekly-check-grid">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <button key={day + index} className={`week-day ${weeklyChecks[index] ? 'done' : ''}`} onClick={() => toggleDay(index)}>
            <span>{day}</span>
          </button>
        ))}
      </div>

      <div className="affirmation-carousel">
        <p className="affirmation-label">today's affirmation</p>
        <div className="affirmation-text">"{affirmations[currentAffirmation]}"</div>
        <div className="affirmation-dots">
          {affirmations.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentAffirmation ? 'active' : ''}`}
              onClick={() => setCurrentAffirmation(i)}
              aria-label={`Affirmation ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="intention-container">
        <h3>write your intention</h3>

        {!sealedIntention ? (
          <div className="intention-form">
            <p className="prompt-label">{activePrompt}</p>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Write your goal or prayer intention clearly..."
              className="intention-input"
            />
            <button className="seal-button" onClick={sealIntention}>
              save intention
            </button>
          </div>
        ) : (
          <div className="sealed-intention-card">
            <div className="sealed-label">saved intention</div>
            <p className="sealed-text">"{sealedIntention}"</p>
            <button className="release-button" onClick={clearIntention}>
              clear intention
            </button>
          </div>
        )}
      </div>

      <div className="manifestation-steps">
        <h3>camino de crecimiento práctico</h3>
        <div className="steps-grid">
          <div className="step-card"><div className="step-number">1</div><h4>claridad</h4><p>define una meta clara con una fecha límite real.</p></div>
          <div className="step-card"><div className="step-number">2</div><h4>disciplina</h4><p>trabaja diariamente en pequeñas acciones, incluso cuando la motivación es baja.</p></div>
          <div className="step-card"><div className="step-number">3</div><h4>fe</h4><p>confía en Dios mientras haces tu parte con integridad y perseverancia.</p></div>
          <div className="step-card"><div className="step-number">4</div><h4>gratitud</h4><p>agradece a Dios por el progreso y las lecciones mientras avanzas.</p></div>
        </div>
      </div>

      <div className="rituals-section">
        <h3>prácticas diarias saludables</h3>
        <div className="rituals-grid">
          <div className="ritual-card"><span className="ritual-icon">01</span><h4>oración matutina</h4><p>comienza tu día con oración y gratitud antes de cualquier tarea.</p></div>
          <div className="ritual-card"><span className="ritual-icon">02</span><h4>escritura intencional</h4><p>escribe lo que aprendiste, lo que necesitas y lo que harás hoy.</p></div>
          <div className="ritual-card"><span className="ritual-icon">03</span><h4>reflexión silenciosa</h4><p>toma unos minutos en silencio para reiniciar tu mente y prioridades.</p></div>
          <div className="ritual-card"><span className="ritual-icon">04</span><h4>mentalidad de servicio</h4><p>busca una forma concreta de ayudar a alguien cada día.</p></div>
        </div>
      </div>

      <div className="growth-videos-section">
        <h3>videos recomendados</h3>
        <div className="growth-videos-grid">
          {growthVideos.map((video) => (
            <article key={video.id} className="growth-video-card">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
