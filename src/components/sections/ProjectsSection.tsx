import { useState, type CSSProperties } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Reveal from '../animations/Reveal';

interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  role: string;
  github: string | null;
  live: string | null;
  inDevelopment?: boolean;
  featured?: boolean;
  accent: string;
}

const projects: ProjectItem[] = [
  // --- PINNED PROJECTS (first PINNED_COUNT shown by default) ---
  // Each project MUST have a unique, clearly distinct accent color (see AGENTS.md).
  {
    title: "DhakaPath",
    subtitle: "Live Urban Transit & Route Intelligence for Dhaka",
    description: "Every morning in Dhaka, millions of students and office workers play a guessing game just to cross the city. Google Maps does not know which local bus accepts a ten-taka student half-pass, how much a rickshaw surges when Malibagh floods, or when a sudden blockade shuts down Shahbagh — leaving commuters stranded or overpaying.\n\nDhakaPath fixes this: commuters simply ask in Banglish how to reach Motijheel under fifty taka. The platform checks crowd-verified street alerts, filters out fake reports, calculates the exact multi-leg route across buses, Metro Rail, and shared rickshaws, and exports an offline route card when phone battery or internet dies.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS 3", "Next.js BFF", "Python FastAPI", "Supabase Postgres"],
    role: "Full-Stack Developer",
    github: "https://github.com/FazleRabbiMugdho/DhakaPath.git",
    live: "https://dhaka-path.vercel.app/",
    featured: true,
    accent: "#eab308", // Solar Gold
  },
  {
    title: "HydroSense-SWOT",
    subtitle: "Decadal Earth System Trend Detection Meets Real-Time Agrarian Flood Warning in Northeastern Bangladesh",
    description: "HydroSense-SWOT was built for the NASA International Space Apps Challenge 2026 under the challenge \"Be An Earth System Trend Detective!\". Our mission combines rigorous multi-decadal Earth system trend detection with actionable, physics-based flood routing to protect agrarian communities in Bangladesh's Haor basin.\n\nIn the flash-flood-vulnerable Haor basin of northeastern Bangladesh, ripening Boro rice feeds over 20 million people. We investigate 25 years (2001–2025) of authentic NASA satellite observations to detect whether pre-monsoon precipitation patterns are intensifying, and connect those climate trends to actionable agricultural flood advisories.",
    tags: ["NASA SWOT", "GPM IMERG", "Data Pipelines", "Coordinate Transformations", "Offline Fixtures", "Next.js", "Three.js", "Gemini API", "Supabase"],
    role: "Data Pipelines, Ingestion & Infrastructure Engineer",
    github: "https://github.com/Mahimrio/Nasa_Hackathon.git",
    live: "https://nasa-hackathon-seven.vercel.app/",
    featured: true,
    accent: "#6366f1", // Cosmic Indigo
  },
  {
    title: "KendraFi",
    subtitle: "Zero-Trust Cooperative Risk & Programmable B2B Escrow · FinSphere AI",
    description: "Zero-Trust Multi-Agent Cooperative Risk and Programmable B2B Escrow Protocol for Bangladesh SME working capital — International AI Builders Congress 2026 (FinSphere AI · SME Capital Engine).",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS 3", "Next.js BFF", "Python FastAPI", "Supabase Postgres", "Solidity 0.8.20", "Foundry", "Base Sepolia", "Vercel"],
    role: "Full-Stack Developer",
    github: "https://github.com/shads-01/KendraFi.git",
    live: "https://kendrafi.vercel.app/",
    inDevelopment: true,
    featured: true,
    accent: "#d946ef", // Electric Fuchsia
  },
  {
    title: "InternLink",
    subtitle: "AI-Powered Career & Internship Portal",
    description: "InternLink — AI-powered university career & internship portal for CSE 3200 (implementation) + CSE 3224 (design/SQA), AUST. Connects students, companies, counselors, and admins through a single platform with AI for resume analysis, job matching, and interview prep.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ASP.NET Core 8", "EF Core 8", "Npgsql", "Supabase PostgreSQL"],
    role: "Full-Stack Developer (Frontend & Backend)",
    github: "https://github.com/Mahimrio/InternLink.git",
    live: "https://intern-link-eight.vercel.app/",
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
    title: "Heaven Furniture Mart",
    subtitle: "Luxury Bespoke Furniture & Interior Styling Studio · RACDOX Hackathon",
    description: "A conversion-focused luxury landing page for Heaven Furniture Mart, a bespoke furniture & interior styling studio in Agrabad, Chattogram. Built for the RACDOX Hackathon with Next.js 16 App Router, GSAP ScrollTrigger & SplitText animations, Lenis smooth scroll, self-hosted Cormorant Garamond & Manrope typography, and Zod-validated inquiry forms.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP 3", "Motion", "Lenis", "React Hook Form", "Zod", "Vercel"],
    role: "Full-Stack Developer",
    github: "https://github.com/Mahimrio/RACDOX_Hackathon.git",
    live: "https://heaven-furniture-mart-alpha.vercel.app",
    accent: "#d4a373", // Champagne Bronze
  },
  {
    title: "CampusOS",
    subtitle: "Intelligent University Operating System · AUST CSE Carnival 8.0 (AI Build Hackathon)",
    description: "Students struggle daily with scattered campus information — class schedule changes buried in messaging groups, deadlines forgotten, room conflicts, and no centralized pulse of campus activities. CampusOS solves this with a unified, role-based university management dashboard and an autonomous AI Agent powered by Gemini function calling.\n\n• 5 Live Campus Data Systems: Schedules, Rooms, Events, Announcements, and Assignments with real-time synchronization and persistent full CRUD.\n• Autonomous AI Agent: Multi-source reasoning, real-time lookups, room booking, event registration, smart clarification on vague prompts, and strict authorization checks.\n• Role-Based Access Control (RBAC): Hierarchical permissions for Super Admin, Data Managers (CR / SR), and Student accounts with an approval pipeline.\n• Smart Data Entry (Gemini Vision): Upload photos of physical notices or timetable routines for automated parsing into a human-in-the-loop review queue.\n• Public Audit Trail: Every addition, update, deletion, room booking, and event registration is logged to an immutable public timeline.",
    tags: ["Next.js 15", "Tailwind CSS v4", "shadcn/ui", "Space Grotesk + Inter", "Supabase Postgres", "Supabase Auth", "Supabase Storage", "Supabase Realtime", "Zod v4", "React Hook Form"],
    role: "Full-Stack Developer",
    github: "https://github.com/Mahimrio/cse-carnival-8-aibuild-hackathon.git",
    live: "https://cse-carnival-8-aibuild-hackathon-iota.vercel.app/",
    accent: "#2dd4bf", // Aquamarine Mint
  },

  // --- ADDITIONAL PROJECTS (Expanded on "See More") ---
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
            Click any card to flip and view project overview
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
                  onClick={() => {
                    if (window.getSelection()?.toString()) return;
                    toggleFlip(project.title);
                  }}
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
                          {project.featured && (
                            <span className="project-featured-badge">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                              <span>Featured</span>
                            </span>
                          )}
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
