import { useState, useEffect } from 'react';

const moonPhases = ['new', 'waxing', 'first', 'waxing', 'full', 'waning', 'last', 'waning'];

const metaphysicalMessages = [
  'the moon is listening',
  'your frequency is shifting',
  'magic is here now',
  'listen to the quiet',
  'time softens what hurts',
  'you are becoming',
  'your heart knows',
  'begin again gently',
];

export default function MoonPhaseWidget() {
  const [moonPhase] = useState(() => {
    const now = new Date();
    return Math.floor((now.getDate() % 29.53) / 29.53 * 8);
  });
  const [message, setMessage] = useState(() => {
    const now = new Date();
    return Math.floor((now.getHours() + now.getMinutes()) % metaphysicalMessages.length);
  });

  useEffect(() => {
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
        })}
      </div>
    </div>
  );
}
