import NewsletterSignup from './NewsletterSignup';
import StatsWidget from './StatsWidget';

export default function Footer() {
  return (
        <>
          <StatsWidget />
          <NewsletterSignup />
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-line"></div>
        <p className="footer-text">made of moonlight, red lipstick, and tiny memories.</p>
        <div className="footer-divider">
          <span>✦</span>
        </div>
        <span className="script-note">xoxo, luv.prc</span>
        <p className="footer-tagline">yo con Dios quien contra mi</p>
        <span className="footer-brand">tvd journal</span>
        
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon">
                  <span>📷</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok" className="social-icon">
                  <span>🎵</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-icon">
                  <span>✦</span>
                </a>
                <a href="mailto:contact@example.com" title="Email" className="social-icon">
                  <span>💌</span>
                </a>
              </div>
      </div>
    </footer>
    </>
  );
}
