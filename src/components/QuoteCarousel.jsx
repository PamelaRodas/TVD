import { useState, useEffect } from 'react';

const metaphysicalQuotes = [
  "the universe writes poems on the skin of those who listen",
  "in silence, the soul remembers what the mind forgot",
  "we are made of stardust and midnight thoughts",
  "every moment is a sacred act of becoming",
  "the moon knows your secrets before you do",
  "beauty is a frequency that only honest hearts can hear",
  "time returns softly to those who wait",
  "in the space between heartbeats, magic lives",
  "we are not lost; we are exactly where the stars placed us",
  "some nights feel like old love returning",
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
        <span className="quote-symbol">quote</span>
        <p className="quote-text">{metaphysicalQuotes[currentQuote]}</p>
      </div>
      <div className="quote-indicators">
        {metaphysicalQuotes.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === (currentQuote % 5) ? 'active' : ''}`}
            onClick={() => setCurrentQuote(index)}
            aria-label={`Quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
