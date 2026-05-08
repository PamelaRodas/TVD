import { useEffect, useState } from 'react';

const easterEggs = [
  {
    sequence: ['g', 'r', 'i', 'm'],
    trigger: () => {
      document.body.style.filter = 'grayscale(100%) contrast(1.2)';
      const msg = document.createElement('div');
      msg.className = 'easter-egg-message';
      msg.textContent = '✦ the grimoire awakens ✦';
      document.body.appendChild(msg);
      setTimeout(() => {
        document.body.style.filter = 'none';
        msg.remove();
      }, 3000);
    },
  },
  {
    sequence: ['v', 'o', 'i', 'd'],
    trigger: () => {
      const void_particles = document.createElement('div');
      void_particles.className = 'void-particles';
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('span');
        particle.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          top: ${Math.random() * 100}vh;
          font-size: 2rem;
          opacity: 0.6;
          animation: void-float 4s ease-in-out forwards;
          pointer-events: none;
          z-index: 9998;
        `;
        particle.textContent = '∞';
        void_particles.appendChild(particle);
      }
      document.body.appendChild(void_particles);
      setTimeout(() => void_particles.remove(), 4000);
    },
  },
  {
    sequence: ['l', 'u', 'n', 'a'],
    trigger: () => {
      const luna = document.createElement('div');
      luna.className = 'easter-egg-message';
      luna.innerHTML = '🌙 luna 🌙<br><span style="font-size: 0.8rem;">the moon sees everything</span>';
      document.body.appendChild(luna);
      setTimeout(() => luna.remove(), 3000);
    },
  },
];

export default function EasterEggs() {
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const handleKeydown = (e) => {
      const key = e.key.toLowerCase();
      const newSequence = [...keySequence, key].slice(-4);
      setKeySequence(newSequence);

      easterEggs.forEach((egg) => {
        if (
          egg.sequence.length === newSequence.length &&
          egg.sequence.every((k, i) => k === newSequence[i])
        ) {
          egg.trigger();
          setKeySequence([]);
        }
      });
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [keySequence]);

  return null;
}
