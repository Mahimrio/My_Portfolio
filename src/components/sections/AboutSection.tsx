import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';
import Marquee from 'react-fast-marquee';

const skills1 = ["React.js", "TypeScript", "Three.js", "GSAP", "Next.js", "Tailwind CSS"];
const skills2 = ["Node.js", "WebGL", "Figma", "Redux", "Framer Motion", "Vite"];

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
          <Marquee gradient={false} speed={40} className="skills-marquee">
            {skills1.map((skill, index) => (
              <span key={`s1-${index}`} className="skill-pill">
                {skill}
              </span>
            ))}
          </Marquee>
          <Marquee gradient={false} speed={30} direction="right" className="skills-marquee">
             {skills2.map((skill, index) => (
              <span key={`s2-${index}`} className="skill-pill">
                {skill}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutSection;
