import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

const skills1 = ["React.js", "TypeScript", "Three.js", "GSAP", "Next.js", "Tailwind CSS"];
const skills2 = ["Node.js", "WebGL", "Figma", "Redux", "Framer Motion", "Vite"];

const CustomMarquee = ({ children, direction = 'left', speed = 40 }: { children: React.ReactNode, direction?: 'left'|'right', speed?: number }) => {
  return (
    <div style={{ display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div className={`marquee-track ${direction === 'right' ? 'marquee-reverse' : ''}`} style={{ animationDuration: `${100 / speed}s` }}>
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="content-section">
      <Reveal direction="up">
        <h2 className="section-title">About Me</h2>
      </Reveal>
      
      <div className="about-grid">
        <Reveal direction="right" delay={0.2}>
          <Card className="about-card">
            <h3>Who I am</h3>
            <p>
              I am a passionate creative developer obsessed with interactive design and high-performance web applications. I bridge the gap between complex engineering and beautiful, intuitive interfaces.
            </p>
          </Card>
        </Reveal>

        <Reveal direction="left" delay={0.4}>
          <Card className="about-card">
            <h3>My Philosophy</h3>
            <p>
              The web should be an experience. By combining modern frameworks with WebGL and fluid animation engines, I construct digital products that feel alive and engaging to the user.
            </p>
          </Card>
        </Reveal>
      </div>

      <Reveal direction="up" delay={0.6}>
        <div id="skills" className="skills-container">
          <h3 className="skills-title">Core Technologies</h3>
          <div className="skills-marquee">
            <CustomMarquee speed={30}>
              {skills1.map((skill, index) => (
                <span key={`s1-${index}`} className="skill-pill">
                  {skill}
                </span>
              ))}
            </CustomMarquee>
          </div>
          <div className="skills-marquee">
            <CustomMarquee speed={25} direction="right">
               {skills2.map((skill, index) => (
                <span key={`s2-${index}`} className="skill-pill">
                  {skill}
                </span>
              ))}
            </CustomMarquee>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutSection;
