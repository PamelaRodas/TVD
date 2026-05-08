import { useState, useEffect } from 'react';

const metaphysicalQuotes = [
  "the universe writes poems on the skin of those who listen",
  "in silence, the soul remembers what the mind forgot",
  "we are made of stardust and midnight thoughts",
  "every moment is a sacred act of becoming",
  "the moon knows your secrets before you do",
  "beauty is a frequency that only broken hearts can hear",
  "time is a lover that returns to those who wait",
  "in the space between heartbeats, magic lives",
  "we are not lost; we are exactly where the stars placed us",
  "some nights feel like reincarnations of old love",
  "the void is not empty; it's full of potential",
  "your scars are maps to places of rebirth",
];

export default function QuoteCarousel() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % metaphysicalQuotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-carousel">
      <div className="quote-content">
        <span className="quote-symbol">✦</span>
        <p className="quote-text">{metaphysicalQuotes[currentQuote]}</p>
        <span className="quote-symbol">✦</span>
      </div>
      <div className="quote-indicators">
        {metaphysicalQuotes.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentQuote ? 'active' : ''}`}
            onClick={() => setCurrentQuote(index)}
            aria-label={`Quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
