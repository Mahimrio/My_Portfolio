import { useState, useEffect } from 'react';
import Reveal from '../animations/Reveal';
import Button from '../ui/Button';
import heroImg from '../../assets/my-photo.jpg';

const roles = [
  'Full-Stack Developer',
  'React & Node.js Dev',
  'Embedded Systems Dev',
  'Open Source Enthusiast',
];

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((p) => (p + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setText(current.slice(0, charIdx + (deleting ? -1 : 1)));
        setCharIdx((p) => p + (deleting ? -1 : 1));
      }, deleting ? 45 : 110);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  return (
    <span>
      {text}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
};

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

        <h2 className="hero-subtitle">
          <TypingEffect />
        </h2>

        <Reveal direction="up" delay={0.7}>
          <p className="hero-description">
            Motivated and detail-oriented Computer Science &amp; Engineering student at
            Ahsanullah University of Science &amp; Technology (AUST), with hands-on experience
            in full-stack web development and embedded systems.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.9}>
          <div className="hero-cta">
            <Button variant="primary" onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }>
              View Projects
            </Button>
            <Button variant="outline" onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }>
              Contact Me
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
