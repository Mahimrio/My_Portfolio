import { useEffect, useRef, useCallback } from 'react';

interface IdCardDropProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
}

const N_SEGMENTS = 18;
const REST_LENGTH = 230; // Strictly fixed ribbon length in px (no stretching)
const SEGMENT_LEN = REST_LENGTH / N_SEGMENTS;
const GRAVITY = 1600; // px/s^2
const DAMPING = 0.985;
const BENDING_STIFFNESS = 0.16;

const IdCardDrop = ({ className = '' }: IdCardDropProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const isDraggingRef = useRef(false);
  const dragPosRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const prevDragPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number>(0);
  const dragDistanceRef = useRef(0);

  // Store tilt in ref to prevent any React re-renders during mouse move
  const badgeTiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const ribbonImgRef = useRef<HTMLImageElement | null>(null);

  const anchorXRef = useRef(240); // Center of 480px container
  const badgeAngleRef = useRef(0);

  // Initialize particles above screen for drop animation
  const initParticles = useCallback((anchorX: number) => {
    const pts: Particle[] = [];
    const dropStartY = -460;
    for (let i = 0; i <= N_SEGMENTS; i++) {
      const frac = i / N_SEGMENTS;
      const y = dropStartY + frac * REST_LENGTH;
      // initial wavy wave curl during fall
      const x = anchorX + Math.sin(frac * Math.PI * 2.5) * 20;
      pts.push({
        x,
        y,
        oldX: x + (i % 2 === 0 ? 1.5 : -1.5),
        oldY: y - 11, // downward initial impulse (~660px/s)
      });
    }
    // Anchor particle strictly pinned
    pts[0].x = anchorX;
    pts[0].y = 0;
    pts[0].oldX = anchorX;
    pts[0].oldY = 0;
    return pts;
  }, []);

  useEffect(() => {
    // Load ribbon texture
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}assets/aust-ribbon.png`;
    img.onload = () => {
      ribbonImgRef.current = img;
    };

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.offsetWidth || 480;
    const height = container.offsetHeight || 580;
    anchorXRef.current = width / 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Initialize particles starting above screen for the drop — RUNS EXACTLY ONCE
    particlesRef.current = initParticles(anchorXRef.current);
    lastTimeRef.current = performance.now();

    // Physics + Render Loop
    const tick = (now: number) => {
      let dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      if (dt > 0.05) dt = 0.016; // guard against large time steps after tab inactive

      const particles = particlesRef.current;
      const anchorX = anchorXRef.current;
      const isDragging = isDraggingRef.current;
      const dragPos = dragPosRef.current;

      if (particles.length > 0) {
        // 1. Verlet Integration for free particles
        for (let i = 1; i <= N_SEGMENTS; i++) {
          if (i === N_SEGMENTS && isDragging) continue;

          const p = particles[i];
          const vx = (p.x - p.oldX) * DAMPING;
          const vy = (p.y - p.oldY) * DAMPING + GRAVITY * dt * dt;

          p.oldX = p.x;
          p.oldY = p.y;
          p.x += vx;
          p.y += vy;
        }

        // If dragging badge, drive bottom particle directly
        if (isDragging) {
          particles[N_SEGMENTS].x = dragPos.x;
          particles[N_SEGMENTS].y = dragPos.y;
          particles[N_SEGMENTS].oldX = prevDragPosRef.current.x;
          particles[N_SEGMENTS].oldY = prevDragPosRef.current.y;
        }

        // 2. Rigid Inextensible Constraint Relaxation (Fixed Ribbon Length — No Stretch)
        const iterations = 16; // High iterations for perfectly inextensible cloth ribbon
        for (let iter = 0; iter < iterations; iter++) {
          // Strictly pin anchor point at (anchorX, 0) - NEVER MOVES!
          particles[0].x = anchorX;
          particles[0].y = 0;

          for (let i = 0; i < N_SEGMENTS; i++) {
            const p1 = particles[i];
            const p2 = particles[i + 1];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy) || 0.0001;
            const diff = (dist - SEGMENT_LEN) / dist;

            // Strict 100% rigid correction: ribbon length does not stretch
            const corrX = dx * diff * 0.5;
            const corrY = dy * diff * 0.5;

            if (i > 0) {
              p1.x += corrX;
              p1.y += corrY;
            }
            if (i + 1 < N_SEGMENTS || !isDragging) {
              p2.x -= corrX;
              p2.y -= corrY;
            }
          }

          // 3. Angular Bending Stiffness (produces wavy, continuous cloth ribbon)
          for (let i = 1; i < N_SEGMENTS; i++) {
            const midX = (particles[i - 1].x + particles[i + 1].x) * 0.5;
            const midY = (particles[i - 1].y + particles[i + 1].y) * 0.5;
            particles[i].x += (midX - particles[i].x) * BENDING_STIFFNESS;
            particles[i].y += (midY - particles[i].y) * (BENDING_STIFFNESS * 0.6);
          }
        }

        // Final anchor enforcement
        particles[0].x = anchorX;
        particles[0].y = 0;

        // 4. Draw Ribbon on Canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.scale(dpr, dpr);

          const ribbonImg = ribbonImgRef.current;
          const ribbonW = 28; // displayed ribbon width in CSS pixels

          if (ribbonImg && ribbonImg.complete && ribbonImg.naturalWidth > 0) {
            // Draw ribbon slices along the particle spine
            for (let i = 0; i < N_SEGMENTS; i++) {
              const p1 = particles[i];
              const p2 = particles[i + 1];
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const len = Math.hypot(dx, dy);
              const angle = Math.atan2(dy, dx) - Math.PI / 2;

              const srcY = (i / N_SEGMENTS) * ribbonImg.height;
              const srcH = ribbonImg.height / N_SEGMENTS;

              ctx.save();
              ctx.translate(p1.x, p1.y);
              ctx.rotate(angle);

              // 1.5px overlap eliminates sub-pixel gaps between rotated slices
              ctx.drawImage(
                ribbonImg,
                0,
                srcY,
                ribbonImg.width,
                srcH,
                -ribbonW / 2,
                0,
                ribbonW,
                len + 1.5
              );
              ctx.restore();
            }
          } else {
            // Fallback ribbon stroke if image is still loading
            ctx.beginPath();
            ctx.moveTo(particles[0].x, particles[0].y);
            for (let i = 1; i <= N_SEGMENTS; i++) {
              ctx.lineTo(particles[i].x, particles[i].y);
            }
            ctx.strokeStyle = '#059669';
            ctx.lineWidth = ribbonW;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
          }

          ctx.restore();
        }

        // 5. Update Badge DOM Element Position & Rotation
        const badge = badgeRef.current;
        if (badge) {
          const endP = particles[N_SEGMENTS];
          const prevP = particles[N_SEGMENTS - 1];
          const dx = endP.x - prevP.x;
          const dy = endP.y - prevP.y;
          const targetAngle = Math.atan2(dx, dy);

          // Smooth rotational pendulum response
          badgeAngleRef.current += (targetAngle - badgeAngleRef.current) * 0.22;
          const rotDeg = (badgeAngleRef.current * 180) / Math.PI;

          // Smooth lerp for 3D tilt
          const tilt = badgeTiltRef.current;
          tilt.x += (tilt.targetX - tilt.x) * 0.16;
          tilt.y += (tilt.targetY - tilt.y) * 0.16;

          const badgeW = badge.offsetWidth || 210;
          const posX = endP.x - badgeW / 2;
          const posY = endP.y;

          badge.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(
            1
          )}px, 0) rotateZ(${-rotDeg.toFixed(2)}deg) rotateX(${tilt.x.toFixed(
            1
          )}deg) rotateY(${tilt.y.toFixed(1)}deg)`;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      if (!container || !canvas) return;
      const w = container.offsetWidth || 480;
      const h = container.offsetHeight || 580;
      anchorXRef.current = w / 2;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles]);

  // Pointer interactions on Badge
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!container || !badge) return;

    const rect = container.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    const particles = particlesRef.current;
    if (particles.length === 0) return;

    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    badge.classList.add('is-dragging');

    const endP = particles[N_SEGMENTS];
    dragOffsetRef.current = {
      x: pointerX - endP.x,
      y: pointerY - endP.y,
    };
    dragPosRef.current = { x: endP.x, y: endP.y };
    prevDragPosRef.current = { x: endP.x, y: endP.y };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!container || !badge) return;

    const rect = container.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const anchorX = anchorXRef.current;
      const rawTargetX = pointerX - dragOffsetRef.current.x;
      const rawTargetY = pointerY - dragOffsetRef.current.y;

      // Fixed ribbon length: distance from anchor cannot exceed REST_LENGTH (no stretching)
      const dx = rawTargetX - anchorX;
      const dy = rawTargetY;
      const dist = Math.hypot(dx, dy) || 0.001;

      let targetX = rawTargetX;
      let targetY = Math.max(35, rawTargetY);

      // If dragged further than the fixed ribbon reach, strictly lock distance to REST_LENGTH
      if (dist > REST_LENGTH) {
        targetX = anchorX + (dx / dist) * REST_LENGTH;
        targetY = (dy / dist) * REST_LENGTH;
        if (targetY < 35) targetY = 35;
      }

      prevDragPosRef.current = { ...dragPosRef.current };
      dragPosRef.current = { x: targetX, y: targetY };
      dragDistanceRef.current += Math.hypot(e.movementX, e.movementY);
    }

    // 3D Tilt calculation based on mouse position relative to badge
    const badgeRect = badge.getBoundingClientRect();
    const relX = e.clientX - badgeRect.left;
    const relY = e.clientY - badgeRect.top;
    const normX = (relX / badgeRect.width - 0.5) * 2;
    const normY = (relY / badgeRect.height - 0.5) * 2;

    // Mutate ref directly without triggering any component re-render
    badgeTiltRef.current.targetX = -normY * 16;
    badgeTiltRef.current.targetY = normX * 18;

    // Dynamic glare overlay
    if (glareRef.current) {
      glareRef.current.style.opacity = '0.4';
      glareRef.current.style.background = `radial-gradient(circle at ${relX}px ${relY}px, rgba(255,255,255,0.7), transparent 60%)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const badge = badgeRef.current;
      if (badge) badge.classList.remove('is-dragging');

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // already released
      }

      // Impart spring fling velocity
      const particles = particlesRef.current;
      if (particles.length > 0) {
        const p = particles[N_SEGMENTS];
        p.oldX = p.x - (dragPosRef.current.x - prevDragPosRef.current.x) * 1.4;
        p.oldY = p.y - (dragPosRef.current.y - prevDragPosRef.current.y) * 1.4;
      }
    }
  };

  const handleMouseLeave = () => {
    badgeTiltRef.current.targetX = 0;
    badgeTiltRef.current.targetY = 0;
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  // Click bounce pluck if clicked without substantial dragging
  const handleClick = () => {
    if (dragDistanceRef.current < 8) {
      const particles = particlesRef.current;
      if (particles.length > 0) {
        const p = particles[N_SEGMENTS];
        p.oldY = p.y - 25; // downward elastic snap
        p.oldX = p.x + (Math.random() - 0.5) * 22; // slight random pendulum swing
      }
    }
  };

  return (
    <div ref={containerRef} className={`id-card-container ${className}`}>
      {/* Top Viewport Anchor Mount — strictly pins top of lanyard */}
      <div className="id-card-anchor" aria-hidden="true" />

      {/* Physics Canvas for Wavy Ribbon */}
      <canvas ref={canvasRef} className="id-card-canvas" />

      {/* Interactive 3D Cardholder Badge with Dynamic Glare & Physics Snap */}
      <div
        ref={badgeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        title="Drag and release to snap back"
        className="id-card-badge-wrapper"
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/aust-badge.png`}
          alt="Mahim Abdullah Rianto — AUST CSE Student ID"
          draggable={false}
          className="id-card-badge-img"
        />

        {/* Dynamic Specular Plastic Surface Glare */}
        <div ref={glareRef} className="id-card-glare" />
      </div>
    </div>
  );
};

export default IdCardDrop;
