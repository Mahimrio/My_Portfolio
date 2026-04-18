import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (menuOpen) {
      // Open animation
      gsap.to(menuRef.current, {
        right: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      
      gsap.fromTo(
        linksRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.2,
        }
      );
    } else {
      // Close animation
      gsap.to(menuRef.current, {
        right: '-100%',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
    { href: "#socials", label: "Socials" },
  ];

  useEffect(() => {
    // Scroll progress bar
    gsap.to(progressBarRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    // Intersection Observer for active sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" } // trigger when near the middle
    );

    navLinks.forEach((link) => {
      const sectionId = link.href.split('#')[1];
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" ref={progressBarRef} />
      </div>
      <header className="navbar">
      <div className="nav-logo">Rianto<span style={{ color: 'var(--primary-accent)' }}>.dev</span></div>
      
      <button
        className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Backdrop for mobile menu */}
      <div 
        className={`nav-backdrop ${menuOpen ? 'backdrop-active' : ''}`} 
        onClick={() => setMenuOpen(false)}
      />

      <nav className="nav-links" ref={menuRef}>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            ref={(el) => (linksRef.current[i] = el as HTMLAnchorElement)}
            className={activeSection === link.href ? 'nav-active' : ''}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  </>
  );
};

export default Navbar;
