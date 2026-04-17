import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

const projects = [
  {
    title: "Project Alpha",
    description: "A high-performance 3D e-commerce platform built with Next.js and WebGL elements.",
    tags: ["React", "Three.js", "GSAP"]
  },
  {
    title: "Project Beta",
    description: "Real-time dashboard for tracking financial markets utilizing WebSockets.",
    tags: ["TypeScript", "Tailwind", "React Query"]
  },
  {
    title: "Project Gamma",
    description: "Interactive immersive 3D configurator for a luxury brand's digital storefront.",
    tags: ["WebGL", "Three.js", "React"]
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="content-section">
      <Reveal direction="down">
        <h2 className="section-title">Selected Works</h2>
      </Reveal>
      
      <div className="about-grid">
        {projects.map((project, index) => (
          <Reveal key={index} direction="up" delay={0.2 * index}>
            <Card className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
