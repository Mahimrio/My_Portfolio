import { useState, type CSSProperties } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Reveal from '../animations/Reveal';

const projects = [
  // --- PINNED PROJECTS (first PINNED_COUNT shown by default) ---
  // Each project MUST have a unique, clearly distinct accent color (see AGENTS.md).
  {
    title: "InternLink",
    subtitle: "AI-Powered Career & Internship Portal",
    description: "InternLink — AI-powered university career & internship portal for CSE 3200 (implementation) + CSE 3224 (design/SQA), AUST. Connects students, companies, counselors, and admins through a single platform with AI for resume analysis, job matching, and interview prep.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ASP.NET Core 8", "EF Core 8", "Npgsql", "Supabase PostgreSQL"],
    role: "Full-Stack Developer (Frontend & Backend)",
    github: "https://github.com/Mahimrio/InternLink.git",
    live: null,
    accent: "#3b82f6", // Royal Blue
  },
  {
    title: "ShasthyaHub-AI",
    subtitle: "Multi-Agent AI Healthcare Platform",
    description: "A comprehensive healthcare platform designed for rural Bangladesh featuring three AI-powered agents. Built for SciBlitz AI Challenge 2026. Supports bilingual interface (English & বাংলা) and is PWA-enabled for offline access.",
    tags: ["Next.js 15", "Supabase", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Google Gemini", "Groq Llama", "PWA"],
    role: "Full-Stack Developer",
    github: "https://github.com/Mahimrio/ShasthyaHub-AI.git",
    live: "https://shasthyahub-ai.vercel.app/",
    accent: "#10b981", // Emerald Green
  },
  {
    title: "Eventify",
    subtitle: "Event Management System",
    description: "A web-based platform that allows users to host events and purchase tickets online. Supports event creation, ticket management, and user authentication.",
    tags: ["React.js", "PHP Laravel", "MySQL"],
    role: "Full-Stack Developer",
    github: "https://github.com/FazleRabbiMugdho/Eventify.git",
    live: "https://eventi-fy.me/",
    accent: "#a855f7", // Orchid Purple
  },
  {
    title: "OfficeVolt",
    subtitle: "Techathon 2026",
    description: "A real-time office energy monitoring dashboard and Discord bot that simulates 15 smart devices across 3 rooms, surfaces live power usage, and pushes intelligent alerts when devices are left on after hours or running too long. Built for the ones who want to know why the electricity bill is higher than that.",
    tags: ["Node.js", "Express", "Socket.IO", "React", "Vite", "Tailwind CSS", "Discord.js", "DeepSeek API"],
    role: "Full-Stack Developer (Frontend & Backend)",
    github: "https://github.com/FazleRabbiMugdho/Techathon2026-Team_Prognosis.git",
    live: "https://officevolt.vercel.app/",
    accent: "#ef4444", // Crimson Red
  },
  {
    title: "Zenith Protocol",
    subtitle: "Scalable Web-Based Game Platform",
    description: "A highly scalable web-based game platform employing a Plugin Architecture where a central React 'Host App' lazy-loads self-contained game modules via dynamic imports and communicates through a shared event bus. Scores, authentication, and state validation are securely handled via a robust Laravel 11 backend.",
    tags: ["React 18+", "Vite", "TypeScript", "Tailwind CSS", "Zustand", "GSAP 3", "Laravel 11", "MySQL 8+"],
    role: "Full-Stack Developer",
    github: "https://github.com/Mahimrio/Zenith-Protocol.git",
    live: null,
    inDevelopment: true,
    accent: "#f59e0b", // Amber Gold
  },
  {
    title: "Interactive Portfolio",
    subtitle: "Personal Web Showcase",
    description: "A highly interactive, 3D animated personal portfolio website. Features smooth scrolling, performant CSS animations, and a responsive glassmorphic UI.",
    tags: ["React.js", "TypeScript", "Vite", "GSAP"],
    role: "Frontend Developer",
    github: "https://github.com/Mahimrio/My_Portfolio",
    live: "https://mahimrio.github.io/My_Portfolio/",
    accent: "#ec4899", // Rose Pink
  },
  {
    title: "MRP",
    subtitle: "Market Rate Management System",
    description: "A system designed to track and display market prices publicly, aiming to reduce market syndicate activities and create consumer awareness.",
    tags: ["React.js", "MongoDB"],
    role: "Full-Stack Developer",
    github: "https://github.com/FazleRabbiMugdho/mrp.git",
    live: null,
    accent: "#06b6d4", // Cyan
  },
  {
    title: "LockIn",
    subtitle: "Semester Routine Tracker",
    description: "A personal static web app for tracking semester routines and schedules. Built as a lightweight React site with no backend dependency.",
    tags: ["Vite", "React 18", "Tailwind CSS"],
    role: "Frontend Developer",
    github: "https://github.com/Mahimrio/LockIn.git",
    live: "https://mahimrio.github.io/LockIn/",
    inDevelopment: true,
    accent: "#84cc16", // Lime Green
  },

  // --- ADDITIONAL PROJECTS (Expanded on "See More") ---
  {
    title: "Fire Fighting Bot",
    subtitle: "Arduino-Based Robot",
    description: "An autonomous Arduino-powered robot equipped with various sensors and controllers to detect fire, navigate toward the source, and extinguish it by spraying water.",
    tags: ["Microprocessor", "Microcontrollers", "Proteus", "C Language"],
    role: "Embedded Systems Developer",
    github: null,
    live: null,
    accent: "#ff6b35", // Flame Orange
  },
];

const PINNED_COUNT = 8;

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleToggle = () => {
    if (showAll) {
      setIsCollapsing(true);
      setTimeout(() => {
        setShowAll(false);
        setIsCollapsing(false);
        ScrollTrigger.refresh();
      }, 350);
    } else {
      setShowAll(true);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
    }
  };

  const toggleFlip = (title: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const visibleProjects = (showAll || isCollapsing) ? projects : projects.slice(0, PINNED_COUNT);
  const isExpandedActive = showAll && !isCollapsing;

  return (
    <section id="projects" className="content-section">
      <Reveal direction="down">
        <div className="projects-section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="projects-flip-hint-text">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>Click any card to flip and view project overview</span>
          </p>
        </div>
      </Reveal>

      <div className="projects-grid">
        {visibleProjects.map((project, index) => {
          const isExtra = index >= PINNED_COUNT;
          let animClass = '';
          if (isExtra) {
            animClass = isCollapsing ? 'collapse-animate' : 'expand-animate';
          }
          const rowStagger = (index % 2) * 0.08;
          const isFlipped = !!flippedCards[project.title];

          return (
            <Reveal
              key={project.title}
              direction="up"
              delay={rowStagger}
              disabled={isExtra}
            >
              <div
                className={`project-flip-card ${animClass}`}
                style={{
                  '--accent': project.accent,
                  ...(isExtra ? { animationDelay: `${(index - PINNED_COUNT) * 0.04}s` } : {}),
                } as CSSProperties}
              >
                <div
                  className={`project-flip-inner ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => toggleFlip(project.title)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(project.title);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${project.title} card, click to ${isFlipped ? 'flip back to tags' : 'flip and read description'}`}
                >
                  {/* ─── FRONT FACE ─── */}
                  <div className="project-card-face project-card-front">
                    <div
                      className="project-accent-bar"
                      style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                    />

                    <div className="project-header">
                      <div>
                        <div className="project-title-row">
                          <h3 className="project-title">{project.title}</h3>
                          {project.inDevelopment && <span className="project-status">In Development</span>}
                        </div>
                        <span className="project-subtitle">{project.subtitle}</span>
                      </div>
                      <span className="project-role">{project.role}</span>
                    </div>

                    <div className="project-front-body">
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-footer">
                      <div className="project-actions">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link project-link--live"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span>View Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ─── BACK FACE ─── */}
                  <div className="project-card-face project-card-back">
                    <div
                      className="project-accent-bar"
                      style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                    />

                    <div className="project-back-header">
                      <div>
                        <span className="project-back-eyebrow">Project Overview</span>
                        <h3 className="project-title" style={{ fontSize: '1.25rem' }}>{project.title}</h3>
                      </div>
                      <button
                        type="button"
                        className="project-flip-back-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(project.title);
                        }}
                        aria-label={`Flip ${project.title} card back to front`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M8 21H3v-5" />
                        </svg>
                        <span>Flip Back</span>
                      </button>
                    </div>

                    <div className="project-back-content">
                      <p className="project-description project-description--full">
                        {project.description}
                      </p>
                    </div>

                    <div className="project-footer">
                      <div className="project-actions">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link project-link--live"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span>View Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {projects.length > PINNED_COUNT && (
        <div className="see-more-container">
          <button
            className="see-more-btn"
            onClick={handleToggle}
            aria-expanded={isExpandedActive}
          >
            <span>{isExpandedActive ? 'Show Less' : `See More Projects (${projects.length - PINNED_COUNT}+)`}</span>
            <svg
              className={`see-more-chevron ${isExpandedActive ? 'chevron-up' : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
