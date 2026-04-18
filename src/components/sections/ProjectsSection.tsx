import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

const projects = [
  {
    title: "Eventify",
    subtitle: "Event Management System",
    description: "A web-based platform that allows users to host events and purchase tickets online. Supports event creation, ticket management, and user authentication.",
    tags: ["React.js", "PHP Laravel", "MySQL"],
    role: "Full-Stack Developer",
    github: "https://github.com/FazleRabbiMugdho/Eventify.git",
    accent: "#00ff88",
  },
  {
    title: "MRP",
    subtitle: "Market Rate Management System",
    description: "A system designed to track and display market prices publicly, aiming to reduce market syndicate activities and create consumer awareness.",
    tags: ["React.js", "MongoDB"],
    role: "Full-Stack Developer",
    github: "https://github.com/FazleRabbiMugdho/mrp.git",
    accent: "#00d4ff",
  },
  {
    title: "Fire Fighting Bot",
    subtitle: "Arduino-Based Robot",
    description: "An autonomous Arduino-powered robot equipped with various sensors and controllers to detect fire, navigate toward the source, and extinguish it by spraying water.",
    tags: ["Microprocessor", "Microcontrollers", "Proteus", "C Language"],
    role: "Embedded Systems Developer",
    github: null,
    accent: "#ff6b35",
  },
  {
    title: "Interactive Portfolio",
    subtitle: "Personal Web Showcase",
    description: "A highly interactive, 3D animated personal portfolio website. Features smooth scrolling, performant CSS animations, and a responsive glassmorphic UI.",
    tags: ["React.js", "TypeScript", "Vite", "GSAP"],
    role: "Frontend Developer",
    github: "https://github.com/Mahimrio/My_Portfolio",
    accent: "#a855f7",
  },
  {
    title: "Task Flow Pro",
    subtitle: "Productivity Application",
    description: "A comprehensive task management dashboard with real-time updates, kanban boards, and team collaboration features.",
    tags: ["Next.js", "TailwindCSS", "Supabase"],
    role: "Full-Stack Developer",
    github: null,
    accent: "#eab308",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="content-section">
      <Reveal direction="down">
        <h2 className="section-title">My Projects</h2>
      </Reveal>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={index} direction="up" delay={0.2 * index}>
            <Card className="project-card">
              <div className="project-accent-bar" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />
              <div className="project-header">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
                <span className="project-role">{project.role}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View Code
                  </a>
                )}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
