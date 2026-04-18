
import Reveal from '../animations/Reveal';
import Button from '../ui/Button';
import heroImg from '../../assets/my-photo.jpg';

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
          <p className="hero-greeting"><span>Hello, I'm</span></p>
        </Reveal>
        <Reveal direction="down" delay={0.3}>
          <h1 className="hero-title"><span>Mahim Abdullah Rianto</span></h1>
        </Reveal>
        <Reveal direction="up" delay={0.5}>
          <h2 className="hero-subtitle"><span>Full-Stack Developer &amp; CSE Student</span></h2>
        </Reveal>
        <Reveal direction="up" delay={0.7}>
          <p className="hero-description">
            <span>Motivated and detail-oriented Computer Science &amp; Engineering student at Ahsanullah University of Science &amp; Technology (AUST), with hands-on experience in full-stack web development and embedded systems.</span>
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.9}>
          <div className="hero-cta" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="outline" onClick={() => {
              const link = document.createElement('a');
              link.href = `${import.meta.env.BASE_URL}cv.pdf`;
              link.download = 'Mahim_Abdullah_Rianto_CV.pdf';
              link.click();
            }}>
              <span>Download CV</span>
            </Button>
            <Button variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>View Projects</span>
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Contact Me</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
