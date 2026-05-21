import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    const saved = localStorage.getItem('newsletterEmail');
    return !!saved;
  });
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      localStorage.setItem('newsletterEmail', email);
      setIsSubscribed(true);
      setMessage('welcome to your frequency rising practice');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem('newsletterEmail');
    setIsSubscribed(false);
    setMessage('you can return whenever you want');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="newsletter-signup">
      <div className="newsletter-content">
        <h3>join the manifestation circle</h3>
        <p>weekly rituals, moon phase updates, energy tips, and manifestation prompts to amplify your frequency.</p>

        {isSubscribed ? (
          <div className="subscribed-message">
            <p className="subscribed-text">you are aligned with our community now</p>
            <button onClick={handleUnsubscribe} className="unsubscribe-btn">
              unsubscribe
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              subscribe
            </button>
          </form>
        )}

        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </div>
  );
}
