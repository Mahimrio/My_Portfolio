import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Respect users who prefer reduced motion: skip Lenis smooth scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let lenis: Lenis | null = null;
    let tickerCallback: gsap.TickerCallback;

    const raf = requestAnimationFrame(() => {
      lenis = new Lenis({
        duration: 0.85, // Snappy, responsive scroll without sluggish lingering inertia
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.15, // Natural travel per wheel notch
        touchMultiplier: 1.5,
        allowNestedScroll: true, // Allow native mouse-wheel scrolling inside overflow containers
      });

      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      // Keep standard lag smoothing to protect against momentary micro-stutters
      gsap.ticker.lagSmoothing(500, 33);

      // Refresh ScrollTrigger once Lenis is synchronized
      ScrollTrigger.refresh();
    });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', handleLoad);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
