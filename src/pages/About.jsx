import { useEffect, useState } from 'react';

const littleThings = [
  "handwritten affirmations and growth letters",
  "daily reflection and prayer",
  "time with loved ones, the safest space",
  "serving others with empathy",
  "stories that feel like transformation",
  "music that brings peace and focus",
  "moments of reflection, prayer, and intentional silence",
  "building habits that honor God"
];

const rotatingQuotes = [
  'your focus writes your future.',
  'clarity + intention + action = growth.',
  'discipline today, peace tomorrow.',
  'with God, progress is never wasted.',
];

const journeyMoments = [
  {
    id: 'foundation',
    step: '01',
    title: 'foundation season',
    verse: 'Proverbs 16:3',
    reflection: 'Commit your work to the Lord and build your day with clear priorities.',
    action: 'Write one goal and one action for today before starting your routine.',
    image: 'https://i.pinimg.com/736x/31/db/8b/31db8b3a216ad31112a60bff8e2e0acb.jpg'
  },
  {
    id: 'discipline',
    step: '02',
    title: 'discipline season',
    verse: 'Galatians 6:9',
    reflection: 'Consistency in small actions creates visible progress over time.',
    action: 'Complete one task you have postponed this week.',
    image: 'https://i.pinimg.com/736x/28/ea/cb/28eacb713bc16c7518b2bded6e1b872b.jpg'
  },
  {
    id: 'service',
    step: '03',
    title: 'service season',
    verse: 'Matthew 5:16',
    reflection: 'Growth is deeper when it blesses someone else too.',
    action: 'Do one practical act of kindness today without expecting recognition.',
    image: 'https://i.pinimg.com/1200x/f4/1c/17/f41c1752e32705d47a42fe0efdc79185.jpg'
  },
  {
    id: 'purpose',
    step: '04',
    title: 'purpose season',
    verse: 'Jeremiah 29:11',
    reflection: 'Trust that God is guiding your process even when it feels slow.',
    action: 'Review your week and note 3 ways God has helped you move forward.',
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
        <p className="eyebrow">About Me</p>
        <h2>faith-driven, intentional, and committed to growth</h2>
      </div>

      <div className="about-profile-band">
        <figure className="cosmic-avatar-frame">
          <img src={avatarImage} alt="profile" />
          <figcaption>walking in purpose</figcaption>
        </figure>

        <div className="quote-rotator">
          <p className="diary-label">current focus</p>
          <h3>{rotatingQuotes[quoteIndex]}</h3>
        </div>
      </div>

      <div className="about-grid">
        <article className="about-card profile-card">
          <span className="diary-label">hello, this is my world</span>
          <h3>grounded in faith, focused on progress</h3>
          <p>
            I believe in growing with responsibility, gratitude, and faith in God.
            This space helps me stay intentional, reflect often, and keep moving with purpose.
          </p>
          <div className="profile-stats">
            <span><strong>mood:</strong> calm, focused, grateful</span>
            <span><strong>style:</strong> purposeful and disciplined</span>
            <span><strong>core value:</strong> faith + consistency + service</span>
          </div>
        </article>

        <article className="about-card loves-card">
          <span className="diary-label">little things I love lately</span>
          <ul className="loves-list">
            {littleThings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="about-card quote-card">
          <p className="quote-mark">"</p>
          <p>
            This space is a reminder that small daily choices shape a meaningful life.
            With faith, discipline, and gratitude, growth becomes steady and real.
          </p>
          <div className="closing-signature">
            <p>with gratitude,</p>
            <p className="xoxo">all glory to God</p>
            <p className="faith">one day at a time, with purpose</p>
          </div>
        </article>
      </div>

      <section className="journey-explorer">
        <p className="diary-label">interactive journey explorer</p>

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
              <span>today's action</span>
              <strong>{activeJourney.action}</strong>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

