import { useState, useEffect } from 'react';

const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

const metaphysicalMessages = [
  'the moon is listening',
  'your frequency is shifting',
  'magic is here now',
  'listen to the stars',
  'time bends for those who wait',
  'you are cosmic dust',
  'becoming is your nature',
  'the void embraces you',
];

export default function MoonPhaseWidget() {
  const [moonPhase, setMoonPhase] = useState(0);
  const [message, setMessage] = useState(0);

  useEffect(() => {
    // Calculate current moon phase (simplified)
    const now = new Date();
    const phase = Math.floor((now.getDate() % 29.53) / 29.53 * 8);
    setMoonPhase(phase);

    const msgIndex = Math.floor((now.getHours() + now.getMinutes()) % metaphysicalMessages.length);
    setMessage(msgIndex);

    const interval = setInterval(() => {
      setMessage((prev) => (prev + 1) % metaphysicalMessages.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="moon-widget">
      <div className="moon-display">{moonPhases[moonPhase]}</div>
      <div className="moon-message">{metaphysicalMessages[message]}</div>
      <div className="moon-time">
        {new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </div>
    </div>
  );
}
