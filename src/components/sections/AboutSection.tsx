import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

// ─── Devicon URL helper ───────────────────────────────────────────────────────
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillIconUrl: Record<string, string> = {
  'C':           `${DEVICON}/c/c-original.svg`,
  'C++':         `${DEVICON}/cplusplus/cplusplus-original.svg`,
  'Java':        `${DEVICON}/java/java-original.svg`,
  'JavaScript':  `${DEVICON}/javascript/javascript-original.svg`,
  'TypeScript':  `${DEVICON}/typescript/typescript-original.svg`,
  'React.js':    `${DEVICON}/react/react-original.svg`,
  'Next.js':     `${DEVICON}/nextjs/nextjs-original.svg`,
  'Node.js':     `${DEVICON}/nodejs/nodejs-original.svg`,
  'Django':      `${DEVICON}/django/django-plain.svg`,
  'PHP Laravel': `${DEVICON}/laravel/laravel-original.svg`,
  'MySQL':       `${DEVICON}/mysql/mysql-original.svg`,
  'MSSQL':       `${DEVICON}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
  'MongoDB':     `${DEVICON}/mongodb/mongodb-original.svg`,
  'Firebase':    `${DEVICON}/firebase/firebase-plain.svg`,
  'Supabase':    `${DEVICON}/supabase/supabase-original.svg`,
  'Git':         `${DEVICON}/git/git-original.svg`,
  'VS Code':     `${DEVICON}/vscode/vscode-original.svg`,
  'Arduino':     `${DEVICON}/arduino/arduino-original.svg`,
};

// ─── Skill Pill ───────────────────────────────────────────────────────────────
const SkillPill = ({ skill }: { skill: string }) => {
  const icon = skillIconUrl[skill];
  const fallback = skill.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  return (
    <span className="skill-pill">
      {icon ? (
        <img src={icon} alt="" className="skill-pill-icon" aria-hidden="true" loading="lazy" />
      ) : (
        <span className="skill-pill-icon-fallback" aria-hidden="true">{fallback}</span>
      )}
      <span>{skill}</span>
    </span>
  );
};

// ─── Pure CSS Marquee ─────────────────────────────────────────────────────────
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
  const allItems = [
    ...items.map((item, i) => <React.Fragment key={`orig-${i}`}>{item}</React.Fragment>),
    ...items.map((item, i) => <React.Fragment key={`copy1-${i}`}>{item}</React.Fragment>),
    ...items.map((item, i) => <React.Fragment key={`copy2-${i}`}>{item}</React.Fragment>),
  ];
  return (
    <div className="css-marquee-wrapper">
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const languages   = ['Assembly', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript'];
const frameworks  = ['React.js', 'Next.js', 'Node.js', 'Django', 'PHP Laravel'];
const databases   = ['MySQL', 'MSSQL', 'MongoDB', 'Firebase', 'Supabase'];
const tools       = ['Git', 'VS Code', 'Arduino', 'Proteus', 'iGraphics'];

const education = [
  {
    degree: 'BSc in CSE',
    status: 'Ongoing',
    institution: 'Ahsanullah University of Science & Technology (AUST)',
    result: 'CGPA: 3.50+ (in 5th semester)',
    year: '2023 – Present',
    coursework: [
      'Digital System Design', 'MicroProcessors & MicroControllers', 'Data Communications',
      'Computer Architecture', 'Assembly Language Programming', 'Numerical Methods',
      'Electronic Devices & Circuits', 'Discrete Math', 'OOP (Java)',
      'Elementary Structured Programming (C)', 'Data Structures & Algorithms',
      'Database Management Systems', 'Software Engineering', 'Artificial Intelligence',
    ],
    extraCurricular: ['Member: AUST PIC'],
    skillsAcquired: 'Full-stack development, Logic Circuit Design & Embedded Systems Development',
  },
  {
    degree: 'HSC',
    status: 'Completed',
    institution: 'Shaheed Police Smrity College',
    result: 'GPA: 5.00 / 5.00',
    year: '2022',
    coursework: ['Physics', 'Chemistry', 'Higher Mathematics'],
    achievements: [
      'Participated in Intra College Physics Olympiad',
      'Participated in Science Fair with smart parking system',
    ],
    skillsAcquired: 'Foundational programming in C/C++',
  },
  {
    degree: 'SSC',
    status: 'Completed',
    institution: 'Monipur High School and College',
    result: 'GPA: 5.00 / 5.00',
    year: '2020',
    coursework: ['General Science'],
    achievements: [
      'Won Intra school Cricket tournament',
      'Participated in Intra school Math Olympiad',
      'Participated in Science Fair with Smart obstacle detection system for model cars',
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const AboutSection = () => {
  return (
    <section id="about" className="content-section">
      <Reveal direction="up">
        <h2 className="section-title">About Me</h2>
      </Reveal>

      <div className="about-grid">
        <Reveal direction="right" delay={0.2} fullHeight>
          <Card className="about-card">
            <h3>Who I Am</h3>
            <p>
              I am a motivated Computer Science &amp; Engineering student at AUST with
              hands-on experience in full-stack web development and embedded systems.
              I'm passionate about building innovative solutions that solve real-world problems.
            </p>
          </Card>
        </Reveal>

        <Reveal direction="left" delay={0.4} fullHeight>
          <Card className="about-card">
            <h3>What I Do</h3>
            <p>
              From building event management platforms to designing autonomous fire-fighting
              robots, I love working across the full technology stack — from the browser to the
              bare-metal microcontroller.
            </p>
          </Card>
        </Reveal>

        <Reveal direction="up" delay={0.5} fullHeight>
          <Card className="about-card">
            <h3>My Interests</h3>
            <p>
              I enjoy competitive programming, open-source contributions, and exploring the
              intersection of AI and embedded systems. Outside of code, I'm a cricket enthusiast
              and enjoy tutoring fellow students.
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
                      {edu.status && (
                        <span className={`edu-status ${edu.status.toLowerCase() === 'ongoing' ? 'status-ongoing' : 'status-completed'}`}>
                          {edu.status}
                        </span>
                      )}
                    </h4>
                    <span className="edu-year">{edu.year}</span>
                  </div>
                  <p className="edu-institution">{edu.institution}</p>
                  <p className="edu-result">{edu.result}</p>

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
          <h3 className="skills-title">Technical Skills</h3>

          <p className="skill-category-label">Languages</p>
          <div className="skills-marquee">
            <CSSMarquee speed={65} direction="left" pauseOnHover>
              {languages.map((skill, i) => <SkillPill key={`lang-${i}`} skill={skill} />)}
            </CSSMarquee>
          </div>

          <p className="skill-category-label">Frameworks &amp; Technologies</p>
          <div className="skills-marquee">
            <CSSMarquee speed={55} direction="right" pauseOnHover>
              {frameworks.map((skill, i) => <SkillPill key={`fw-${i}`} skill={skill} />)}
            </CSSMarquee>
          </div>

          <p className="skill-category-label">Databases &amp; Tools</p>
          <div className="skills-marquee">
            <CSSMarquee speed={60} direction="left" pauseOnHover>
              {[...databases, ...tools].map((skill, i) => <SkillPill key={`db-${i}`} skill={skill} />)}
            </CSSMarquee>
          </div>
        </div>
      </Reveal>

      {/* Soft Skills */}
      <Reveal direction="up" delay={0.8}>
        <div className="soft-skills-container">
          <h3 className="skills-title">Strengths</h3>
          <div className="soft-skills-grid">
            {[
              { icon: '🤝', label: 'Teamwork & Collaboration' },
              { icon: '🧩', label: 'Problem-Solving' },
              { icon: '📚', label: 'Tutoring & Mentoring' },
              { icon: '🧠', label: 'Analytical Thinking' },
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
