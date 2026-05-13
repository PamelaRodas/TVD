import { useState, useEffect } from 'react';
import MoonPhaseWidget from '../components/MoonPhaseWidget';

const affirmations = [
  "i am a magnet for abundance and joy",
  "the universe conspires in my favor",
  "my frequency attracts my reality",
  "i am worthy of all that i desire",
  "every cell of my body vibrates with manifestation power",
  "i align with the cosmic flow of abundance",
  "my intentions ripple through the universe",
  "i am becoming my greatest self",
  "the universe listens to my thoughts",
  "my dreams are already manifesting",
  "i attract what i believe i deserve",
  "my energy is a beacon for blessings",
];

const manifestationPrompts = [
  "what are you calling into existence today?",
  "what frequency do you want to embody?",
  "what abundance are you ready to receive?",
  "who are you becoming?",
  "what is your biggest desire?",
  "what does your dream life feel like?",
  "what are you grateful for in advance?",
  "what blocks are you releasing?",
];

const phases = [
  { mark: "new", name: "New Moon" },
  { mark: "waxing", name: "Waxing Crescent" },
  { mark: "first", name: "First Quarter" },
  { mark: "waxing", name: "Waxing Gibbous" },
  { mark: "full", name: "Full Moon" },
  { mark: "waning", name: "Waning Gibbous" },
  { mark: "last", name: "Last Quarter" },
  { mark: "waning", name: "Waning Crescent" },
];

export default function Manifestation() {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [manifestationDays, setManifestationDays] = useState(() => {
    const saved = localStorage.getItem('manifestationStart');
    if (!saved) return 0;
    return Math.floor((new Date() - new Date(saved)) / (1000 * 60 * 60 * 24));
  });
  const [sealedIntention, setSealedIntention] = useState(() => localStorage.getItem('sealedIntention'));
  const [intention, setIntention] = useState('');
  const [lunarPhase] = useState(() => {
    const now = new Date();
    const phase = Math.floor((now.getDate() % 29.53) / 29.53 * 8);
    return phases[phase];
  });
  const [activePrompt] = useState(() => (
    manifestationPrompts[Math.floor(Math.random() * manifestationPrompts.length)]
  ));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation(prev => (prev + 1) % affirmations.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const sealIntention = () => {
    if (intention.trim()) {
      localStorage.setItem('sealedIntention', intention);
      setSealedIntention(intention);
      localStorage.setItem('manifestationStart', new Date().toISOString());
      setManifestationDays(0);
      setIntention('');
    }
  };

  const clearIntention = () => {
    localStorage.removeItem('sealedIntention');
    setSealedIntention(null);
    setManifestationDays(0);
  };

  return (
    <>
      <MoonPhaseWidget />
      <section className="manifestation-section section">
        <div className="section-heading">
          <p className="eyebrow">Manifestation</p>
          <h2>calling your reality into existence</h2>
        </div>

        <div className="lunar-info-card">
          <div className="lunar-phase-large">{lunarPhase.mark}</div>
          <div className="lunar-phase-name">{lunarPhase.name}</div>
          <p className="lunar-description">
            {lunarPhase.name.includes('New') && "Perfect for new beginnings and planting seeds of intention."}
            {lunarPhase.name.includes('Waxing') && "Time to build and grow your manifestations."}
            {lunarPhase.name.includes('Full') && "Amplified manifestation power: your intentions peak."}
            {lunarPhase.name.includes('Waning') && "Release what no longer serves you."}
            {lunarPhase.name.includes('Quarter') && "Pause, check your direction, and choose with clarity."}
          </p>
        </div>

        <div className="affirmation-carousel">
          <p className="affirmation-label">today's frequency</p>
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
          <h3>seal your intention</h3>

          {!sealedIntention ? (
            <div className="intention-form">
              <p className="prompt-label">{activePrompt}</p>
              <textarea
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="Write your intention here. Be specific, be bold, be honest..."
                className="intention-input"
              />
              <button className="seal-button" onClick={sealIntention}>
                seal this intention
              </button>
            </div>
          ) : (
            <div className="sealed-intention-card">
              <div className="sealed-label">intention sealed</div>
              <p className="sealed-text">"{sealedIntention}"</p>
              <div className="manifestation-counter">
                <span className="counter-label">days manifesting</span>
                <span className="counter-number">{manifestationDays}</span>
              </div>
              <button className="release-button" onClick={clearIntention}>
                release this intention
              </button>
            </div>
          )}
        </div>

        <div className="manifestation-steps">
          <h3>the path to manifestation</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>clarity</h4>
              <p>know exactly what you want. be specific. feel it in your bones.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>belief</h4>
              <p>believe you deserve it. believe it's already yours. embody that frequency.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>alignment</h4>
              <p>take aligned action. move in the direction of your dreams. the universe meets you halfway.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h4>surrender</h4>
              <p>let go of how it arrives. trust the timing. the universe has a perfect plan.</p>
            </div>
          </div>
        </div>

        <div className="rituals-section">
          <h3>align your frequency</h3>
          <div className="rituals-grid">
            <div className="ritual-card">
              <span className="ritual-icon">01</span>
              <h4>moonlight meditation</h4>
              <p>sit under the moonlight. visualize your manifestation. feel it as real.</p>
            </div>
            <div className="ritual-card">
              <span className="ritual-icon">02</span>
              <h4>manifestation writing</h4>
              <p>write your desires in present tense. "i am" not "i will be". make it real now.</p>
            </div>
            <div className="ritual-card">
              <span className="ritual-icon">03</span>
              <h4>visualization ritual</h4>
              <p>close your eyes. see your life. feel the emotions. taste the success.</p>
            </div>
            <div className="ritual-card">
              <span className="ritual-icon">04</span>
              <h4>gratitude ceremony</h4>
              <p>thank the universe as if it's already done. gratitude is the highest frequency.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
