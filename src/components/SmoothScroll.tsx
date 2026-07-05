import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerCallback: gsap.TickerCallback;

    const raf = requestAnimationFrame(() => {
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
