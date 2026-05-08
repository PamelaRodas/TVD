import { useState } from 'react';

const secretMessages = [
  "you are the universe experiencing itself",
  "the void is not empty, it's full of possibility",
  "your frequency is your power",
  "magic is real when you believe it is",
  "every thought is a spell",
  "you are stardust in human form",
  "the moon remembers your name",
  "your shadow is where your power lives",
  "the universe whispers in symbols",
  "you are exactly where you need to be",
];

export default function SacredSpace() {
  const [isUnlocked, setIsUnlocked] = useState(localStorage.getItem('sacredSpaceUnlocked') === 'true');
  const [password, setPassword] = useState('');
  const [reflection, setReflection] = useState('');
  const [reflections, setReflections] = useState(() => {
    const saved = localStorage.getItem('sacredReflections');
    return saved ? JSON.parse(saved) : [];
  });

  const correctPassword = 'moonlight';

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword) {
      setIsUnlocked(true);
      localStorage.setItem('sacredSpaceUnlocked', 'true');
      setPassword('');
    } else {
      alert('the universe whispers: try again');
      setPassword('');
    }
  };

  const addReflection = () => {
    if (reflection.trim()) {
      const newReflections = [
        ...reflections,
        {
          id: Date.now(),
          text: reflection,
          date: new Date().toLocaleDateString(),
          message: secretMessages[Math.floor(Math.random() * secretMessages.length)],
        },
      ];
      setReflections(newReflections);
      localStorage.setItem('sacredReflections', JSON.stringify(newReflections));
      setReflection('');
    }
  };

  if (!isUnlocked) {
    return (
      <section className="sacred-space-section section">
        <div className="sacred-lock">
          <div className="lock-icon">🔮</div>
          <h2>sacred space</h2>
          <p>this is a private sanctuary. only your deepest truths belong here.</p>
          
          <form onSubmit={handleUnlock} className="lock-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter the password"
              className="password-input"
            />
            <button type="submit" className="unlock-button">unlock</button>
          </form>
          
          <p className="lock-hint">hint: what lights up the night?</p>
        </div>
      </section>
    );
  }

  return (
    <section className="sacred-space-section section unlocked">
      <div className="sacred-header">
        <h2>your sacred space</h2>
        <p className="sacred-subtitle">where only your truth matters</p>
      </div>

      <div className="secret-message">
        <p className="daily-secret">"{secretMessages[Math.floor(Math.random() * secretMessages.length)]}"</p>
      </div>

      <div className="reflection-container">
        <h3>private reflections</h3>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="write what only the universe needs to know..."
          className="reflection-input"
        />
        <button onClick={addReflection} className="save-reflection">
          ✦ save to the void ✦
        </button>
      </div>

      {reflections.length > 0 && (
        <div className="reflections-archive">
          <h3>your private archive</h3>
          <div className="reflections-list">
            {reflections.map((ref) => (
              <div key={ref.id} className="reflection-card">
                <p className="reflection-text">"{ref.text}"</p>
                <p className="reflection-date">{ref.date}</p>
                <p className="reflection-message">— {ref.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
