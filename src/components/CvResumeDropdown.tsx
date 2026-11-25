import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DownloadOption {
  href: string;
  download: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const downloadOptions: DownloadOption[] = [
  {
    href: `${import.meta.env.BASE_URL}cv.pdf`,
    download: 'Mahim_Abdullah_Rianto_CV.pdf',
    title: 'Download CV',
    subtitle: 'Full curriculum vitae · PDF',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    href: `${import.meta.env.BASE_URL}resume.pdf`,
    download: 'Mahim_Abdullah_Rianto_Resume.pdf',
    title: 'Download Resume',
    subtitle: 'One-page summary · PDF',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
    ),
  },
];

const CvResumeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState({ top: 0, height: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasMountedRef = useRef(false);

  const showSlider = isOpen && activeIdx !== null;

  const closeMenu = () => {
    setActiveIdx(null);
    setIsOpen(false);
  };

  const activateItem = (idx: number) => {
    setActiveIdx(idx);
    const target = itemRefs.current[idx];
    if (target) {
      setSliderPos({ top: target.offsetTop, height: target.offsetHeight });
    }
  };

  useEffect(() => {
    const menuEl = menuRef.current;
    if (!menuEl) return;

    const animItems = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null);

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      gsap.set(menuEl, { autoAlpha: 0, y: -8, scale: 0.96 });
      gsap.set(animItems, { opacity: 0, y: 8 });
      return;
    }

    tlRef.current?.kill();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(menuEl, isOpen ? { autoAlpha: 1, y: 0, scale: 1 } : { autoAlpha: 0, y: -8, scale: 0.96 });
      gsap.set(animItems, isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 });
      return;
    }

    const tl = gsap.timeline();
    tlRef.current = tl;

    if (isOpen) {
      if (Number(gsap.getProperty(menuEl, 'opacity')) < 0.05) {
        gsap.set(animItems, { opacity: 0, y: 8 });
      }
      tl.to(menuEl, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.28,
        ease: 'power3.out',
      }).to(
        animItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '-=0.18'
      );
    } else {
      tl.to(animItems, {
        opacity: 0,
        y: -4,
        duration: 0.13,
        stagger: { each: 0.03, from: 'end' },
        ease: 'power2.in',
      }).to(
        menuEl,
        {
          autoAlpha: 0,
          y: -8,
          scale: 0.96,
          duration: 0.18,
          ease: 'power2.in',
        },
        '-=0.05'
      );
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
        if (!items.length) return;
        const currentIdx = items.indexOf(document.activeElement as HTMLAnchorElement);
        const nextIdx =
          e.key === 'ArrowDown'
            ? (currentIdx + 1) % items.length
            : (currentIdx - 1 + items.length) % items.length;
        items[nextIdx]?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMenuMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const rect = menuEl.getBoundingClientRect();
    menuEl.style.setProperty('--menu-x', `${e.clientX - rect.left}px`);
    menuEl.style.setProperty('--menu-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="nav-cv-dropdown" ref={dropdownRef}>
      <button
        type="button"
        ref={triggerRef}
        className={`nav-cv-btn ${isOpen ? 'is-open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Download CV or Resume"
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
      >
        <svg className="nav-cv-download-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M5 20h14v-2H5v2zm14-9h-4V3H9v8H5l7 7 7-7z" />
        </svg>
        <span>CV / Resume</span>
        <svg
          className={`nav-cv-chevron ${isOpen ? 'is-open' : ''}`}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        ref={menuRef}
        className={`nav-cv-menu ${isOpen ? 'is-open' : ''}`}
        role="menu"
        aria-label="Download CV or Resume"
        onMouseMove={handleMenuMouseMove}
        onMouseLeave={() => setActiveIdx(null)}
      >
        <div className="nav-cv-menu-spotlight" aria-hidden="true" />
        <div
          className={`nav-cv-slider ${showSlider ? 'is-visible' : ''}`}
          style={{
            transform: `translate3d(0, ${sliderPos.top}px, 0)`,
            height: `${sliderPos.height}px`,
          }}
          aria-hidden="true"
        />

        {downloadOptions.map((option, idx) => (
          <a
            key={option.title}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            href={option.href}
            download={option.download}
            className={`nav-cv-option ${activeIdx === idx ? 'is-active' : ''}`}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            onMouseEnter={() => activateItem(idx)}
            onFocus={() => activateItem(idx)}
            onBlur={() => setActiveIdx(null)}
            onClick={closeMenu}
          >
            <span className="nav-cv-option-icon" aria-hidden="true">
              {option.icon}
            </span>
            <span className="nav-cv-option-text">
              <span className="nav-cv-option-title">{option.title}</span>
              <span className="nav-cv-option-sub">{option.subtitle}</span>
            </span>
            <span className="nav-cv-option-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CvResumeDropdown;
