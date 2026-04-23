import { useState, useEffect } from 'react';

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Floating back-to-top button */}
      <button
        className={`back-to-top-btn ${visible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
        </svg>
      </button>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo" onClick={scrollToTop}>
            Rianto<span>.dev</span>
          </div>

          <p className="footer-tagline">Building the future, one commit at a time.</p>

          <nav className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="#presence">Socials</a>
          </nav>

          <div className="footer-divider" />

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Mahim Abdullah Rianto. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
