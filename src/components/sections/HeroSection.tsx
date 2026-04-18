
import Reveal from '../animations/Reveal';
import Button from '../ui/Button';
import heroImg from '../../assets/hero.png';

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <Reveal direction="down" delay={0.1}>
          <div className="hero-photo-wrapper">
            <img src={heroImg} alt="Mahim Abdullah Rianto" className="hero-photo" />
          </div>
        </Reveal>
        <Reveal direction="down" delay={0.2}>
          <p className="hero-greeting">Hello, I'm</p>
        </Reveal>
        <Reveal direction="down" delay={0.3}>
          <h1 className="hero-title">Mahim Abdullah Rianto</h1>
        </Reveal>
        <Reveal direction="up" delay={0.5}>
          <h2 className="hero-subtitle">Full-Stack Developer &amp; CSE Student</h2>
        </Reveal>
        <Reveal direction="up" delay={0.7}>
          <p className="hero-description">
            Motivated and detail-oriented Computer Science &amp; Engineering student at Ahsanullah University of Science &amp; Technology (AUST), with hands-on experience in full-stack web development and embedded systems.
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.9}>
          <div className="hero-cta" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
