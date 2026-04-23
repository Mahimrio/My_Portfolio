import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';



const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animation for the bottom bar on mobile
    if (window.innerWidth <= 768) {
      gsap.from(menuRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.5
      });
    }

    // Scroll Progress Bar
    gsap.to(progressBarRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, { dependencies: [], scope: menuRef });

  const navLinks = [
    { 
      href: '#about', 
      label: 'About', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> 
    },
    { 
      href: '#education', 
      label: 'Education', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> 
    },
    { 
      href: '#skills', 
      label: 'Skills', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/></svg> 
    },
    { 
      href: '#projects', 
      label: 'Projects', 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg> 
    },
    { 
      href: '#contact', 
      label: 'Contact', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'hero' ? '' : `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sectionIds = ['hero', ...navLinks.map((l) => l.href.split('#')[1])];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const cvHref = `${import.meta.env.BASE_URL}cv.pdf`;

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" ref={progressBarRef} />
      </div>

      <header className="navbar">
        {/* Logo */}
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>Rianto</span>
          <span style={{ color: 'var(--primary-accent)' }}>.dev</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="nav-links desktop-only">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'nav-active' : ''}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <a
            href={cvHref}
            download="Mahim_Abdullah_Rianto_CV.pdf"
            className="nav-cv-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 20h14v-2H5v2zm14-9h-4V3H9v8H5l7 7 7-7z" />
            </svg>
            <span>Download CV</span>
          </a>
        </div>
      </header>

      <nav className="mobile-tab-bar" ref={menuRef}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`tab-item ${activeSection === link.href ? 'tab-active' : ''}`}
          >
            <span className="tab-icon">{link.icon}</span>
            <span className="tab-label">{link.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
