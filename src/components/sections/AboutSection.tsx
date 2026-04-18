import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

// Pure CSS marquee — no external dependency, works with all Vite/React versions
interface CSSMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

const CSSMarquee: React.FC<CSSMarqueeProps> = ({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
}) => {
  const duration = `${Math.round(200 / (speed / 20))}s`;
  const items = React.Children.toArray(children);
  // Duplicate items to create a seamless loop, with unique keys per copy
  const allItems = [
    ...items.map((item, i) => <React.Fragment key={`orig-${i}`}>{item}</React.Fragment>),
    ...items.map((item, i) => <React.Fragment key={`copy1-${i}`}>{item}</React.Fragment>),
    ...items.map((item, i) => <React.Fragment key={`copy2-${i}`}>{item}</React.Fragment>),
  ];
  return (
    <div className="css-marquee-wrapper" style={pauseOnHover ? undefined : undefined}>
      <div
        className={`css-marquee-track ${pauseOnHover ? 'pause-on-hover' : ''}`}
        style={{
          animationDuration: duration,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {allItems}
      </div>
    </div>
  );
};

const languages = ["Assembly", "C", "C++", "Java", "JavaScript", "TypeScript"];
const frameworks = ["React.js", "Next.js", "Node.js", "Django", "PHP Laravel"];
const databases = ["MySQL", "MSSQL", "MongoDB", "Firebase", "Supabase"];
const tools = ["Git", "VS Code", "Arduino", "Proteus", "iGraphics"];

const education = [
  {
    degree: "BSc in CSE",
    status: "Ongoing",
    institution: "Ahsanullah University of Science & Technology (AUST)",
    result: "CGPA: 3.50+ (in 5th semester)",
    year: "2023 – Present",
    coursework: [
      "Digital System Design", "MicroProcessors & MicroControllers", "Data Communications",
      "Computer Architecture", "Assembly Language Programming", "Numerical Methods",
      "Electronic Devices & Circuits", "Discrete Math", "OOP(Java)",
      "Elementary Structured Programming (C language)", "Data Structures & Algorithms",
      "Database Management Systems", "Software Engineering", "Artificial Intelligence",
      "Miscellaneous non-departmental courses"
    ],
    extraCurricular: ["Member: AUST PIC"],
    skillsAcquired: "Full-stack development, Logic Circuit Design & Embeded System Development"
  },
  {
    degree: "HSC",
    status: "Completed",
    institution: "Shaheed Police Smrity College",
    result: "GPA: 5.00 / 5.00",
    year: "2022",
    coursework: ["Physics", "Chemistry", "Higher Mathematics"],
    achievements: [
      "Participated in Intra College Physics Olympiad",
      "Participated in Science Fair with smart parking system"
    ],
    skillsAcquired: "Foundational programming in C/C++"
  },
  {
    degree: "SSC",
    status: "Completed",
    institution: "Monipur High School and College",
    result: "GPA: 5.00 / 5.00",
    year: "2020",
    coursework: ["General Science"],
    achievements: [
      "Won Intra school Cricket tournament",
      "Participated in Intra school Math Olympiad",
      "Participated in Science Fair with Smart obstacle detection system for model cars"
    ]
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="content-section">
      <Reveal direction="up">
        <h2 className="section-title"><span>About Me</span></h2>
      </Reveal>

      <div className="about-grid">
        <Reveal direction="right" delay={0.2}>
          <Card className="about-card">
            <h3><span>Who I am</span></h3>
            <p>
              <span>I am a motivated Computer Science & Engineering student at AUST with hands-on experience in full-stack web development and embedded systems. I'm passionate about building innovative solutions that solve real-world problems.</span>
            </p>
          </Card>
        </Reveal>

        <Reveal direction="left" delay={0.4}>
          <Card className="about-card">
            <h3><span>What I Do</span></h3>
            <p>
              <span>From building event management platforms to designing autonomous fire-fighting robots, I love working across the full technology stack. I'm eager to contribute technical skills and a passion for problem-solving to dynamic projects.</span>
            </p>
          </Card>
        </Reveal>
      </div>

      {/* Education Section */}
      <Reveal direction="up" delay={0.3}>
        <div id="education" className="education-container">
          <h3 className="skills-title"><span>Education</span></h3>
          <div className="education-timeline">
            {education.map((edu, i) => (
              <div key={i} className="education-item">
                <div className="edu-dot" />
                <Card className="education-card">
                  <div className="edu-header">
                    <h4>
                      <span>{edu.degree}</span>
                      {edu.status && (
                        <span className={`edu-status ${edu.status.toLowerCase() === 'ongoing' ? 'status-ongoing' : 'status-completed'}`}>
                          <span>{edu.status}</span>
                        </span>
                      )}
                    </h4>
                    <span className="edu-year"><span>{edu.year}</span></span>
                  </div>
                  <p className="edu-institution"><span><span>{edu.institution}</span></span></p>
                  <p className="edu-result"><span><span>{edu.result}</span></span></p>

                  <div className="edu-details">
                    {edu.coursework && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label">📚 Coursework:</span>
                        <span className="edu-detail-content">{edu.coursework.join(', ')}</span>
                      </div>
                    )}

                    {edu.achievements && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label">🏆 Achievements:</span>
                        <ul className="edu-detail-list">
                          {edu.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {edu.extraCurricular && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label">🤝 Involvement:</span>
                        <span className="edu-detail-content">{edu.extraCurricular.join(', ')}</span>
                      </div>
                    )}

                    {edu.skillsAcquired && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label">⚙️ Skills:</span>
                        <span className="edu-detail-content">{edu.skillsAcquired}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Skills Section */}
      <Reveal direction="up" delay={0.6}>
        <div id="skills" className="skills-container">
          <h3 className="skills-title"><span>Technical Skills</span></h3>

          <p className="skill-category-label"><span>Languages</span></p>
          <div className="skills-marquee">
            <CSSMarquee speed={65} direction="left" pauseOnHover={true}>
              {languages.map((skill, index) => (
                <span key={`lang-${index}`} className="skill-pill">
                  <span>{skill}</span>
                </span>
              ))}
            </CSSMarquee>
          </div>

          <p className="skill-category-label"><span>Frameworks & Technologies</span></p>
          <div className="skills-marquee">
            <CSSMarquee speed={55} direction="right" pauseOnHover={true}>
              {frameworks.map((skill, index) => (
                <span key={`fw-${index}`} className="skill-pill">
                  <span>{skill}</span>
                </span>
              ))}
            </CSSMarquee>
          </div>

          <p className="skill-category-label"><span>Databases & Tools</span></p>
          <div className="skills-marquee">
            <CSSMarquee speed={60} direction="left" pauseOnHover={true}>
              {[...databases, ...tools].map((skill, index) => (
                <span key={`db-${index}`} className="skill-pill">
                  <span>{skill}</span>
                </span>
              ))}
            </CSSMarquee>
          </div>
        </div>
      </Reveal>

      {/* Soft Skills */}
      <Reveal direction="up" delay={0.8}>
        <div className="soft-skills-container">
          <h3 className="skills-title"><span>Strengths</span></h3>
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
