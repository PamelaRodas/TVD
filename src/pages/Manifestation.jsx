import { useState, useEffect } from 'react';

const affirmations = [
  "God guides my steps every day",
  "I grow with discipline, faith, and purpose",
  "My thoughts, words, and actions are aligned",
  "I am grateful for every new opportunity",
  "I trust God's timing in every process",
  "I choose peace, clarity, and consistency",
  "I am becoming the person I am called to be",
  "Today I move forward with courage",
];

const growthPrompts = [
  "What goal will you work on today?",
  "What habit do you want to strengthen this week?",
  "What do you need to let go of to move forward?",
  "What are you grateful for today?",
  "How can you serve others better this week?",
  "What is one action you can take right now?",
];

const growthVideos = [
  { id: 'trg06GQ3VkU', title: 'Growth video 1' },
  { id: 'm82svXjWpwE', title: 'Growth video 2' },
  { id: 'aFGS8BPxYy0', title: 'Growth video 3' },
  { id: 'QX70le3E9hM', title: 'Growth video 4' },
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
        <p className="eyebrow">Growth</p>
        <h2>faith, focus, and daily progress</h2>
      </div>

      <div className="growth-progress-panel">
        <div><span className="diary-label">days in progress</span><strong>{growthDays}</strong></div>
        <div><span className="diary-label">weekly check-ins</span><strong>{completedDays}/7</strong></div>
        <div><span className="diary-label">consistency</span><strong>{consistency}%</strong></div>
        <div><span className="diary-label">current streak</span><strong>{currentStreak} days</strong></div>
        <div><span className="diary-label">best streak</span><strong>{bestStreak} days</strong></div>
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
        <h3>practical growth path</h3>
        <div className="steps-grid">
          <div className="step-card"><div className="step-number">1</div><h4>clarity</h4><p>define one clear goal with a real deadline.</p></div>
          <div className="step-card"><div className="step-number">2</div><h4>discipline</h4><p>work daily in small actions, even when motivation is low.</p></div>
          <div className="step-card"><div className="step-number">3</div><h4>faith</h4><p>trust God while doing your part with integrity and perseverance.</p></div>
          <div className="step-card"><div className="step-number">4</div><h4>gratitude</h4><p>thank God for progress and lessons while you keep moving forward.</p></div>
        </div>
      </div>

      <div className="rituals-section">
        <h3>healthy daily practices</h3>
        <div className="rituals-grid">
          <div className="ritual-card"><span className="ritual-icon">01</span><h4>morning prayer</h4><p>start your day with prayer and gratitude before any task.</p></div>
          <div className="ritual-card"><span className="ritual-icon">02</span><h4>intentional journaling</h4><p>write what you learned, what you need, and what you will do today.</p></div>
          <div className="ritual-card"><span className="ritual-icon">03</span><h4>quiet reflection</h4><p>take a few minutes in silence to reset your mind and priorities.</p></div>
          <div className="ritual-card"><span className="ritual-icon">04</span><h4>service mindset</h4><p>look for one concrete way to help someone each day.</p></div>
        </div>
      </div>

      <div className="growth-videos-section">
        <h3>recommended videos</h3>
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
