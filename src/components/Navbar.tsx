import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-logo">Rianto<span style={{ color: 'var(--primary-accent)' }}>.dev</span></div>
      <button
        className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        <a href="#about" onClick={handleLinkClick}>About</a>
        <a href="#education" onClick={handleLinkClick}>Education</a>
        <a href="#skills" onClick={handleLinkClick}>Skills</a>
        <a href="#projects" onClick={handleLinkClick}>Projects</a>
        <a href="#contact" onClick={handleLinkClick}>Contact</a>
        <a href="#socials" onClick={handleLinkClick}>Socials</a>
      </nav>
    </header>
  );
};

export default Navbar;
