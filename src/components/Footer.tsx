

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" style={{ padding: '3rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={handleScrollToTop}>
        Rianto<span style={{ color: 'var(--primary-accent)' }}>.dev</span>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}><span>About</span></a>
        <a href="#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}><span>Projects</span></a>
        <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}><span>Contact</span></a>
        <a href="#socials" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}><span>Socials</span></a>
      </div>

      <div style={{ width: '100%', maxWidth: '600px', height: '1px', background: 'var(--card-border)', opacity: 0.5 }} />

      <p style={{ margin: 0 }}><span>&copy; {new Date().getFullYear()} Mahim Abdullah Rianto. All rights reserved.</span></p>
    </footer>
  );
};

export default Footer;
