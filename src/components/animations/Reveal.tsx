import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  fullHeight?: boolean;
  disabled?: boolean;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  fullHeight = false,
  disabled = false,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = container.current;
      if (!el || disabled) return;

      // Respect user's reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, clearProps: 'all' });
        return;
      }

      // Responsive, elegant translation distance
      const distance = window.innerWidth <= 768 ? 20 : 28;

      let y = 0;
      let x = 0;

      if (direction === 'up') y = distance;
      if (direction === 'down') y = -distance;
      if (direction === 'left') x = distance;
      if (direction === 'right') x = -distance;

      // GSAP fromTo ensures the element is prepared in its initial offset/hidden state
      // immediately on mount without lingering visible or snapping later.
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x,
          y,
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          clearProps: 'transform,opacity,willChange',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    },
    { dependencies: [direction, delay, disabled], scope: container }
  );

  return (
    <div
      ref={container}
      className={className}
      style={{
        height: fullHeight ? '100%' : 'auto',
        display: fullHeight ? 'flex' : 'block',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
