import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <>
      <NewsletterSignup />
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-line"></div>
          <p className="footer-text">construido con gratitud, disciplina y fe.</p>
          <span className="script-note">toda gloria a Dios</span>
          <p className="footer-tagline">crece con propósito. sirve con amor.</p>
          <span className="footer-brand">Diario de Crecimiento</span>

          <div className="social-links" aria-label="Social links">
            <a href="https://instagram.com/iansomerhalder" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <span>IG</span>
            </a>
            <a href="https://www.tiktok.com/@itscandiceking" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon">
              <span>TT</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon">
              <span>X</span>
            </a>
            <a href="mailto:contact@example.com" aria-label="Email" className="social-icon">
              <span>@</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
