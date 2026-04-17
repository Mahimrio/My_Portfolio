import React from 'react';
import Reveal from '../animations/Reveal';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <Reveal direction="down" delay={0.2}>
          <h1 className="hero-title">Creative Developer</h1>
        </Reveal>
        <Reveal direction="up" delay={0.4}>
          <h2 className="hero-subtitle">Building Immersive Experiences</h2>
        </Reveal>
        <Reveal direction="up" delay={0.6}>
          <p className="hero-description">
            I specialize in 3D WebGL, modern UI animations, and high-performance frontend applications that bridge the gap between design and technology.
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.8}>
          <div className="hero-cta" style={{ marginTop: '2rem' }}>
            <Button variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Work
            </Button>
            <Button variant="outline" style={{ marginLeft: '1rem' }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
