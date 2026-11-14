import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
    href: '#achievements', 
    label: 'Achievements', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg> 
  },
  { 
    href: '#projects', 
    label: 'Projects', 
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg> 
  },
  { 
    href: '#certificates', 
    label: 'Certificates', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-2 5l3-2l3 2l-2-5"/><path d="M15.5 10a3.5 3.5 0 1 0 -7 0a3.5 3.5 0 0 0 7 0z"/><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2z"/></svg> 
  },
  { 
    href: '#contact', 
    label: 'Contact', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 
  },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // localStorage unavailable — ignore
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    setTheme(next);
  };

  const targetHref = hoveredHref || activeSection;

  useEffect(() => {
    const updatePosition = () => {
      if (!targetHref) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const targetEl = linkRefs.current.get(targetHref);
      const container = navContainerRef.current;
      if (targetEl && container) {
        setIndicator({
          left: targetEl.offsetLeft,
          top: targetEl.offsetTop,
          width: targetEl.offsetWidth,
          height: targetEl.offsetHeight,
          opacity: 1,
        });
      } else {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    const frame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(frame);
  }, [targetHref, activeSection]);

  useEffect(() => {
    const handleResize = () => {
      if (!targetHref) return;
      const targetEl = linkRefs.current.get(targetHref);
      if (targetEl) {
        setIndicator({
          left: targetEl.offsetLeft,
          top: targetEl.offsetTop,
          width: targetEl.offsetWidth,
          height: targetEl.offsetHeight,
          opacity: 1,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [targetHref]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const container = navContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    container.style.setProperty('--mouse-x', `${x}px`);
    container.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    setHoveredHref(null);
  };

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

  useEffect(() => {
    const ratios = new Map<string, number>();
    const navHrefs = new Set(navLinks.map((l) => l.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        // Pick the most-visible section on screen
        let bestId = '';
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        const href = `#${bestId}`;
        setActiveSection(navHrefs.has(href) ? href : '');
      },
      { threshold: [0.15, 0.35, 0.6, 0.85] }
    );

    const sectionIds = ['hero', 'presence', ...navLinks.map((l) => l.href.split('#')[1])];
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
        <button
          type="button"
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          aria-label="Back to top"
        >
          <span>Rianto</span>
          <span style={{ color: 'var(--primary-accent)' }}>.dev</span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          ref={navContainerRef}
          className="nav-links desktop-only"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Spotlight cursor glow */}
          <div className="nav-spotlight" aria-hidden="true" />

          {/* Sliding glowing pill indicator */}
          <div
            className={`nav-slider-pill ${indicator.opacity > 0 ? 'is-visible' : ''} ${
              hoveredHref ? 'is-hovering' : activeSection ? 'is-active-resting' : ''
            }`}
            style={{
              transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
              width: `${indicator.width}px`,
              height: `${indicator.height}px`,
            }}
            aria-hidden="true"
          />

          {navLinks.map((link) => {
            const isHighlighted = targetHref === link.href;
            const isCurrentSection = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el);
                  else linkRefs.current.delete(link.href);
                }}
                onMouseEnter={() => setHoveredHref(link.href)}
                onFocus={() => setHoveredHref(link.href)}
                onBlur={() => setHoveredHref(null)}
                onClick={() => setActiveSection(link.href)}
                className={`nav-link-item ${isHighlighted ? 'is-highlighted' : ''} ${
                  isCurrentSection ? 'nav-active' : ''
                }`}
              >
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
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
