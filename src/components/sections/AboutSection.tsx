import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

// ─── Inline icons ─────────────────────────────────────────────────────────────
const iconProps = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const BookIcon = () => (
  <svg {...iconProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);
const TrophyIcon = () => (
  <svg {...iconProps}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);
const HandshakeIcon = () => (
  <svg {...iconProps}><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></svg>
);
const GearIcon = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);
const PuzzleIcon = () => (
  <svg {...iconProps}><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.075.84-.505 1.02-.969a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" /></svg>
);
const BrainIcon = () => (
  <svg {...iconProps}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /></svg>
);

// ─── Devicon URL helper ───────────────────────────────────────────────────────
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillIconUrl: Record<string, string> = {
  'C': `${DEVICON}/c/c-original.svg`,
  'C++': `${DEVICON}/cplusplus/cplusplus-original.svg`,
  'Java': `${DEVICON}/java/java-original.svg`,
  'JavaScript': `${DEVICON}/javascript/javascript-original.svg`,
  'TypeScript': `${DEVICON}/typescript/typescript-original.svg`,
  'React.js': `${DEVICON}/react/react-original.svg`,
  'Next.js': `${DEVICON}/nextjs/nextjs-original.svg`,
  'Node.js': `${DEVICON}/nodejs/nodejs-original.svg`,
  'Django': `${DEVICON}/django/django-plain.svg`,
  'PHP Laravel': `${DEVICON}/laravel/laravel-original.svg`,
  'MySQL': `${DEVICON}/mysql/mysql-original.svg`,
  'MSSQL': `${DEVICON}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
  'MongoDB': `${DEVICON}/mongodb/mongodb-original.svg`,
  'Firebase': `${DEVICON}/firebase/firebase-plain.svg`,
  'Supabase': `${DEVICON}/supabase/supabase-original.svg`,
  'Git': `${DEVICON}/git/git-original.svg`,
  'VS Code': `${DEVICON}/vscode/vscode-original.svg`,
  'Arduino': `${DEVICON}/arduino/arduino-original.svg`,
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
const languages = ['Assembly', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript'];
const frameworks = ['React.js', 'Next.js', 'Node.js', 'Django', 'PHP Laravel'];
const databases = ['MySQL', 'MSSQL', 'MongoDB', 'Firebase', 'Supabase'];
const tools = ['Git', 'VS Code', 'Arduino', 'Proteus', 'iGraphics'];

const education = [
  {
    degree: 'BSc in Computer Science & Engineering',
    status: 'Ongoing',
    institution: 'Ahsanullah University of Science & Technology (AUST)',
    result: 'CGPA: 3.25',
    year: '2023 – Present',
    coursework: [
      'OOP (C++, Java)',
      'Data Structures & Algorithms',
      'DBMS (Oracle, MySQL)',
      'Software Engineering & Design Patterns',
      'Microprocessors & Embedded Systems (Assembly, Arduino)',
      'Theory of Computation',
    ],
    achievements: [
      '3rd IAIT National IT Fest 2026 – 1st Runners Up (AI Hackathon)',
      'FastRoboX 1.0 (IEEE BUBT) – 2nd Runners Up (IoT Hackathon)',
      'SciBlitz 2.0 (CUET IEEE Branch) – Finalist (AI Hackathon)',
      'AUST CSE Carnival 7.0 – Top 5 in UI/UX Design',
      'UFTB RoboFusion 1.0 – Top 10 in Techathon',
      'AUST CSE Carnival 8.0 – Top 10 in Project Showcase',
    ],
    extraCurricular: [
      'Organizing Committee Member, SciBlitz 2.0 & AUST Robotics Events',
      'Active participant in National Robotics Competitions (RoboFusion 1.0, FastRoboX 1.0)',
      'Student Mentor for junior CSE peers in C++ and Data Structures',
    ],
    skillsAcquired: 'Full-Stack Web Dev (React, Next.js, Node.js), Embedded Systems, IoT Prototyping, Agile Collaboration',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    status: 'Completed',
    institution: 'Shaheed Police Smrity College (SPSC)',
    result: 'GPA: 5.00 / 5.00',
    year: '2020 – 2022',
    coursework: ['Physics', 'Chemistry', 'Higher Mathematics', 'ICT', 'Biology'],
    achievements: ['GPA 5.00 in Science Group with General Board Scholarship'],
    extraCurricular: ['Science Club Member', 'Annual Sports Meet Volunteer', 'Intra-College Math Olympiad Participant'],
    skillsAcquired: 'Analytical Problem Solving, Foundations of Computing & Logic',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    status: 'Completed',
    institution: 'Monipur High School & College',
    result: 'GPA: 5.00 / 5.00',
    year: '2018 – 2020',
    coursework: ['General Science', 'Higher Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT'],
    achievements: ['GPA 5.00 in Science Group with General Board Scholarship'],
    extraCurricular: ['Debate Club Member', 'School Cricket Team'],
    skillsAcquired: 'Mathematics, Basic Programming Logic, Team Collaboration',
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
        <Reveal direction="right" delay={0.06} fullHeight>
          <Card className="about-card">
            <h3>Who I Am</h3>
            <p>
              I am a motivated Computer Science &amp; Engineering student at AUST with
              hands-on experience in full-stack web development and embedded systems.
              I'm passionate about building innovative solutions that solve real-world problems.
            </p>
          </Card>
        </Reveal>

        <Reveal direction="left" delay={0.12} fullHeight>
          <Card className="about-card">
            <h3>What I Do</h3>
            <p>
              From building event management platforms to designing autonomous fire-fighting
              robots, I love working across the full technology stack — from the browser to the
              bare-metal microcontroller.
            </p>
          </Card>
        </Reveal>

        <Reveal direction="up" delay={0.18} fullHeight>
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
      <Reveal direction="up" delay={0.05}>
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
                        <span className="edu-detail-label"><BookIcon /> Coursework</span>
                        <span className="edu-detail-content">{edu.coursework.join(', ')}</span>
                      </div>
                    )}
                    {edu.achievements && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label"><TrophyIcon /> Achievements</span>
                        <ul className="edu-detail-list">
                          {edu.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {edu.extraCurricular && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label"><HandshakeIcon /> Involvement</span>
                        <div className="edu-detail-content">
                          {edu.extraCurricular.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    {edu.skillsAcquired && (
                      <div className="edu-detail-row">
                        <span className="edu-detail-label"><GearIcon /> Skills</span>
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
      <Reveal direction="up" delay={0.05}>
        <div id="skills" className="skills-container">
          <h3 className="skills-title">Technical Skills</h3>

          <p className="skill-category-label">Languages</p>
          <div className="skills-marquee">
            <CSSMarquee speed={90} direction="left" pauseOnHover>
              {languages.map((skill, i) => <SkillPill key={`lang-${i}`} skill={skill} />)}
            </CSSMarquee>
          </div>

          <p className="skill-category-label">Frameworks &amp; Technologies</p>
          <div className="skills-marquee">
            <CSSMarquee speed={80} direction="right" pauseOnHover>
              {frameworks.map((skill, i) => <SkillPill key={`fw-${i}`} skill={skill} />)}
            </CSSMarquee>
          </div>

          <p className="skill-category-label">Databases &amp; Tools</p>
          <div className="skills-marquee">
            <CSSMarquee speed={85} direction="left" pauseOnHover>
              {[...databases, ...tools].map((skill, i) => <SkillPill key={`db-${i}`} skill={skill} />)}
            </CSSMarquee>
          </div>
        </div>
      </Reveal>

      {/* Soft Skills */}
      <Reveal direction="up" delay={0.05}>
        <div className="soft-skills-container">
          <h3 className="skills-title">Strengths</h3>
          <div className="soft-skills-grid">
            {[
              { icon: <HandshakeIcon />, label: 'Teamwork & Collaboration' },
              { icon: <PuzzleIcon />, label: 'Problem-Solving' },
              { icon: <BookIcon />, label: 'Tutoring & Mentoring' },
              { icon: <BrainIcon />, label: 'Analytical Thinking' },
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
