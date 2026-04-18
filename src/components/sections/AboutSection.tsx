import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';
import MarqueePackage from 'react-fast-marquee';

// Fix for ESM/CJS interop issues with react-fast-marquee in some environments
const Marquee = (MarqueePackage as any).default || MarqueePackage;

const languages = ["Assembly", "C", "C++", "Java", "JavaScript", "TypeScript"];
const frameworks = ["React.js", "Next.js", "Node.js", "Django", "PHP Laravel"];
const databases = ["MySQL", "MSSQL", "MongoDB", "Firebase", "Supabase"];
const tools = ["Git", "VS Code", "Arduino", "Proteus", "iGraphics"];

const education = [
  {
    degree: "BSc in CSE",
    status: "Ongoing",
    institution: "Ahsanullah University of Science & Technology (AUST)",
    result: "CGPA: 3.5+",
    year: "2023 – Present",
  },
  {
    degree: "HSC",
    status: "",
    institution: "Shaheed Police Smrity College",
    result: "GPA: 5.00",
    year: "2022",
  },
  {
    degree: "SSC",
    status: "",
    institution: "Monipur High School and College",
    result: "GPA: 5.00",
    year: "2020",
  },
];

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
              I am a motivated Computer Science & Engineering student at AUST with hands-on experience in full-stack web development and embedded systems. I'm passionate about building innovative solutions that solve real-world problems.
            </p>
          </Card>
        </Reveal>

        <Reveal direction="left" delay={0.4}>
          <Card className="about-card">
            <h3>What I Do</h3>
            <p>
              From building event management platforms to designing autonomous fire-fighting robots, I love working across the full technology stack. I'm eager to contribute technical skills and a passion for problem-solving to dynamic projects.
            </p>
          </Card>
        </Reveal>
      </div>

      {/* Education Section */}
      <Reveal direction="up" delay={0.3}>
        <div id="education" className="education-container">
          <h3 className="skills-title">Education</h3>
          <div className="education-timeline">
            {education.map((edu, i) => (
              <div key={i} className="education-item">
                <div className="edu-dot" />
                <Card className="education-card">
                  <div className="edu-header">
                    <h4>
                      {edu.degree}
                      {edu.status && <span className="edu-status">{edu.status}</span>}
                    </h4>
                    <span className="edu-year">{edu.year}</span>
                  </div>
                  <p className="edu-institution">{edu.institution}</p>
                  <p className="edu-result">{edu.result}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Skills Section */}
      <Reveal direction="up" delay={0.6}>
        <div id="skills" className="skills-container">
          <h3 className="skills-title">Technical Skills</h3>

          <p className="skill-category-label">Languages</p>
          <div className="skills-marquee">
            <Marquee speed={40} gradient={false} autoFill={true} pauseOnHover={true}>
              {languages.map((skill, index) => (
                <span key={`lang-${index}`} className="skill-pill">
                  {skill}
                </span>
              ))}
            </Marquee>
          </div>

          <p className="skill-category-label">Frameworks & Technologies</p>
          <div className="skills-marquee">
            <Marquee speed={35} direction="right" gradient={false} autoFill={true} pauseOnHover={true}>
              {frameworks.map((skill, index) => (
                <span key={`fw-${index}`} className="skill-pill">
                  {skill}
                </span>
              ))}
            </Marquee>
          </div>

          <p className="skill-category-label">Databases & Tools</p>
          <div className="skills-marquee">
            <Marquee speed={38} gradient={false} autoFill={true} pauseOnHover={true}>
              {[...databases, ...tools].map((skill, index) => (
                <span key={`db-${index}`} className="skill-pill">
                  {skill}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </Reveal>

      {/* Soft Skills */}
      <Reveal direction="up" delay={0.8}>
        <div className="soft-skills-container">
          <h3 className="skills-title">Strengths</h3>
          <div className="soft-skills-grid">
            {[
              { icon: "🤝", label: "Teamwork & Collaboration" },
              { icon: "🧩", label: "Problem-Solving" },
              { icon: "📚", label: "Tutoring & Mentoring" },
              { icon: "🧠", label: "Analytical Thinking" },
            ].map((item, i) => (
              <div key={i} className="soft-skill-chip">
                <span className="soft-skill-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutSection;
