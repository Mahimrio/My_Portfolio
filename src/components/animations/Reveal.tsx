import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = 'up' }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let y = 0;
    let x = 0;

    if (direction === 'up') y = 75;
    if (direction === 'down') y = -75;
    if (direction === 'left') x = 75;
    if (direction === 'right') x = -75;

    gsap.from(container.current, {
      opacity: 0,
      y: y,
      x: x,
      duration: 1.2,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ opacity: 1 }}>
      {children}
    </div>
  );
};

export default Reveal;
