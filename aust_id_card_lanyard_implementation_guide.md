# Interactive 3D AUST ID Card Lanyard — Implementation Guide

> **Target Executor:** Antigravity (AI Coding Agent) / Developer  
> **Objective:** Implement a physics-based, interactive 3D hanging student ID card component (`IdCardDrop.tsx`) that drops down with elastic gravity on page load/refresh, swings like a pendulum, tilts in 3D on hover with dynamic plastic glare, and supports multi-directional drag-and-snap-back physics via GSAP `Draggable`.

---

## 1. Agent Execution Directives (Instructions for Antigravity)

Follow these exact steps to integrate the interactive ID card into the portfolio project without breaking existing styles or layouts:

1. **Detect Framework & Directory Structure:**
   - Check `package.json` to identify whether the project uses **Next.js** (App Router or Pages Router) or **Vite / Create React App**.
   - **Important for Next.js App Router:** If the project uses Next.js (`app/` directory), prepend `"use client";` to the very top of `IdCardDrop.tsx`.
2. **Install Dependencies:**
   - Install `gsap` if it is not already present in `package.json` (`Draggable` is bundled inside the standard `gsap` package).
3. **Verify Static Asset:**
   - Check if `public/assets/aust-id-card.png` exists. If the user placed the image under a different filename or path in `public/`, update the default `imageSrc` prop in `IdCardDrop.tsx` accordingly.
4. **Create the Lanyard Component:**
   - Create `src/components/IdCardDrop.tsx` (or `components/IdCardDrop.tsx` depending on project structure) using the exact source code in **Section 4**.
5. **Integrate into the Hero Section:**
   - If the portfolio already has an existing Hero component, mount `<IdCardDrop />` in the right column container aligned to the top edge (`self-start`) so the ribbon appears anchored to the top of the viewport.
   - If creating a new Hero section, use the complete `HeroSection.tsx` code in **Section 5**.

---

## 2. Asset Preparation Checklist

Before testing the animation, ensure the extended AUST ID card image meets these criteria:
- **File Path:** `public/assets/aust-id-card.png`
- **Background:** Transparent PNG (remove the solid white background so the drop shadow contours strictly around the green ribbon, metal clip, and plastic card holder).
- **Top Crop Alignment:** Ensure the top edge of the green lanyard strap touches the very top edge (`y = 0`) of the image canvas so there is no empty gap between the top of the screen and the ribbon.

---

## 3. Dependencies & Environment Setup

Run the following command in the project root to install GSAP:

```bash
npm install gsap
```

*(Note: TypeScript definitions and the `Draggable` plugin are built directly into the `gsap` package—no extra `@types/gsap` package is needed).*

Ensure **Tailwind CSS** is active in the project, as the component uses Tailwind arbitrary values for 3D perspective (`[perspective:1200px]`, `[transform-style:preserve-3d]`) and ambient emerald drop shadows.

---

## 4. Lanyard Physics Component (`src/components/IdCardDrop.tsx`)

Create `src/components/IdCardDrop.tsx` with the following complete implementation:

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface IdCardDropProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
}

const IdCardDrop: React.FC<IdCardDropProps> = ({
  imageSrc = "/assets/aust-id-card.png",
  altText = "Mahim Abdullah Rianto - AUST CSE ID Card",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardWrapperRef.current) return;

      // Initial off-screen state anchored at the top center of the lanyard ribbon
      gsap.set(cardWrapperRef.current, {
        y: -650,
        rotationZ: -12,
        rotationX: 15,
        scaleY: 0.96,
        transformOrigin: "50% 0%",
        opacity: 1,
      });

      // Page load / refresh drop and pendulum damping timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setIsDropped(true),
      });

      tl.to(cardWrapperRef.current, {
        y: 0,
        duration: 1.8,
        ease: "elastic.out(1.05, 0.38)",
      })
        .to(
          cardWrapperRef.current,
          {
            scaleY: 1,
            rotationX: 0,
            duration: 0.9,
            ease: "elastic.out(1.2, 0.3)",
          },
          "-=1.4"
        )
        .to(
          cardWrapperRef.current,
          {
            rotationZ: 8,
            duration: 0.45,
            ease: "sine.inOut",
          },
          "-=1.5"
        )
        .to(
          cardWrapperRef.current,
          {
            rotationZ: -5,
            duration: 0.45,
            ease: "sine.inOut",
          },
          "-=1.05"
        )
        .to(
          cardWrapperRef.current,
          {
            rotationZ: 2.5,
            duration: 0.4,
            ease: "sine.inOut",
          },
          "-=0.6"
        )
        .to(
          cardWrapperRef.current,
          {
            rotationZ: 0,
            duration: 0.6,
            ease: "sine.out",
          },
          "-=0.2"
        );

      // Interactive multi-directional drag & spring-release physics
      Draggable.create(cardWrapperRef.current, {
        type: "x,y",
        bounds: { minX: -180, maxX: 180, minY: -35, maxY: 220 },
        edgeResistance: 0.78,
        minimumMovement: 6,
        onPress() {
          isDraggingRef.current = true;
          setIsDragging(true);
          gsap.killTweensOf(cardWrapperRef.current);
        },
        onDrag() {
          if (!cardWrapperRef.current) return;
          const dragX = this.x;
          const dragY = this.y;
          const stretchY = 1 + Math.max(0, dragY) * 0.00075;

          gsap.set(cardWrapperRef.current, {
            rotationZ: -dragX * 0.14,
            rotationY: dragX * 0.18,
            rotationX: -dragY * 0.09,
            scaleY: stretchY,
          });

          if (glareRef.current) {
            const glareX = 50 + (dragX / 180) * 40;
            const glareY = 50 + (dragY / 220) * 40;
            gsap.set(glareRef.current, {
              opacity: 0.45,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.75), transparent 65%)`,
            });
          }
        },
        onRelease() {
          isDraggingRef.current = false;
          setIsDragging(false);

          gsap.to(cardWrapperRef.current, {
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            scaleY: 1,
            duration: 1.65,
            ease: "elastic.out(1.25, 0.28)",
            overwrite: "auto",
          });

          if (glareRef.current) {
            gsap.to(glareRef.current, {
              opacity: 0,
              duration: 0.45,
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardWrapperRef.current || !isDropped || isDraggingRef.current) return;

    const rect = cardWrapperRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const normX = (relX / rect.width - 0.5) * 2;
    const normY = (relY / rect.height - 0.5) * 2;

    gsap.to(cardWrapperRef.current, {
      rotationY: normX * 16,
      rotationX: -normY * 12,
      rotationZ: -normX * 4,
      y: Math.max(0, normY * 10),
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.35,
        background: `radial-gradient(circle at ${relX}px ${relY}px, rgba(255,255,255,0.65), transparent 60%)`,
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardWrapperRef.current || isDraggingRef.current) return;

    gsap.to(cardWrapperRef.current, {
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      y: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  const handlePullBounce = () => {
    if (!cardWrapperRef.current || isDraggingRef.current) return;

    gsap.fromTo(
      cardWrapperRef.current,
      { y: 38, scaleY: 1.04, rotationZ: gsap.utils.random(-6, 6) },
      {
        y: 0,
        scaleY: 1,
        rotationZ: 0,
        duration: 1.5,
        ease: "elastic.out(1.2, 0.3)",
        overwrite: true,
      }
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex justify-center items-start select-none [perspective:1200px] ${className}`}
    >
      {/* Top Viewport Anchor Mount */}
      <div className="pointer-events-none absolute top-0 z-20 h-3 w-16 rounded-b-full bg-emerald-950/80 shadow-[0_4px_20px_rgba(16,185,129,0.45)] backdrop-blur-md border-x border-b border-emerald-500/30" />

      {/* Draggable & 3D Interactive Lanyard Wrapper */}
      <div
        ref={cardWrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handlePullBounce}
        title="Drag and release to snap back"
        className="relative z-10 cursor-grab active:cursor-grabbing opacity-0 will-change-transform [transform-style:preserve-3d] touch-none group"
      >
        <div
          className={`relative w-[240px] sm:w-[280px] md:w-[310px] transition-shadow duration-300 ${
            isDragging
              ? "drop-shadow-[0_45px_65px_rgba(16,185,129,0.42)]"
              : "drop-shadow-[0_28px_38px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_35px_50px_rgba(16,185,129,0.28)]"
          }`}
        >
          <img
            src={imageSrc}
            alt={altText}
            draggable={false}
            className="w-full h-auto object-contain pointer-events-none"
          />

          {/* Dynamic Plastic Badge Surface Glare */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-x-[12%] bottom-[4%] h-[42%] rounded-2xl opacity-0 mix-blend-overlay transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};

export default IdCardDrop;
```

---

## 5. Hero Section Integration (`src/components/HeroSection.tsx`)

### Option A: Full Standalone Hero Section
If replacing or creating the Hero section from scratch, create `src/components/HeroSection.tsx`:

```tsx
"use client";

import React from "react";
import IdCardDrop from "./IdCardDrop";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white px-6 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Left Column: Intro & CTA */}
        <div className="lg:col-span-7 pt-24 lg:pt-32 space-y-6">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Available for Projects & Research
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Mahim Abdullah <span className="text-emerald-400">Rianto</span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed">
            Full-Stack Developer & CSE Undergraduate at AUST crafting
            high-performance web applications, AI systems, and interactive 3D
            experiences.
          </p>
        </div>

        {/* Right Column: Top-Aligned Hanging ID Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end self-start -mt-2">
          <IdCardDrop imageSrc="/assets/aust-id-card.png" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

### Option B: Integrating into an Existing Navbar / Hero Layout
If the portfolio already has a fixed or sticky top Navbar:
1. Ensure the parent container holding `<IdCardDrop />` has `self-start` and a higher `z-index` (e.g., `z-30`) or starts right beneath the top edge of the Hero section so the lanyard drops cleanly from the top border.
2. Avoid placing `overflow-hidden` on the immediate small wrapper around `<IdCardDrop />` so the card does not get clipped when dragged horizontally or vertically.

---

## 6. Post-Implementation Verification Checklist

Once Antigravity finishes creating the files, verify the following:
- [ ] **Page Refresh Drop:** Refreshing the browser triggers the elastic drop from `-650px` with a smooth pendulum swing that settles to `0deg`.
- [ ] **3D Hover & Glare:** Moving the cursor across the ID card tilts it in 3D space and renders a subtle radial light reflection on the plastic badge holder.
- [ ] **Drag & Elastic Snap-Back:** Clicking, dragging the card in any direction, and releasing causes the ribbon to stretch slightly and whip back elastically to its resting position.
- [ ] **Click Bounce:** Clicking/tapping the card without dragging triggers a quick downward pull-and-bounce recoil.