# Project Context: My_Portfolio

## Identity
- **Owner:** Mahim Abdullah Rianto (Mahimrio)
- **Stack:** Vite ^8 + React 19 + TypeScript ~6.0.2
- **Deployment:** GitHub Pages at `https://mahimrio.github.io/My_Portfolio/` (legacy build, `gh-pages` branch)
- **Base URL:** `/My_Portfolio/`

## Quick Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | `eslint .` |
| `npm run deploy` | `gh-pages -d dist` (pushes to `gh-pages` branch) |
| `npm run preview` | `vite preview` (serve production build locally) |

## Project Structure
```
src/
├── main.tsx                   Entry point, ErrorBoundary, registers ScrollTrigger
├── App.tsx                    Root: Loader + BackgroundCanvas + SmoothScroll + Layout + sections
├── index.css                  All global styles (~1527 lines, CSS custom properties)
├── components/
│   ├── Layout.tsx             Navbar + main + Footer wrapper
│   ├── Navbar.tsx             Fixed header, scroll progress bar, mobile tab bar
│   ├── Footer.tsx             Back-to-top button, footer links, copyright
│   ├── Loader.tsx             Full-screen loading bar (fake progress, 60ms interval)
│   ├── SmoothScroll.tsx       Lenis smooth scroll integration with GSAP ScrollTrigger
│   ├── animations/
│   │   └── Reveal.tsx         Scroll-triggered entrance animation (opacity + translate)
│   ├── canvas/
│   │   ├── BackgroundCanvas.tsx   R3F Canvas (dark bg, city HDR, lights)
│   │   └── Particles.tsx          3000-point particle sphere with mouse interaction
│   ├── sections/
│   │   ├── HeroSection.tsx    Photo, typing effect (4 roles), CTA buttons
│   │   ├── AboutSection.tsx   About cards, education timeline, skill marquees (CSS), soft skills
│   │   ├── ProjectsSection.tsx 8 project cards with accent bars and GitHub links
│   │   ├── ContactSection.tsx 2-column layout + EmailJS form (state machine)
│   │   └── SocialsSection.tsx 5 social media link cards (LinkedIn, GitHub, WhatsApp, FB, IG)
│   └── ui/
│       ├── Button.tsx         Variants: primary, outline, ghost
│       ├── Card.tsx           Glassmorphism card wrapper
│       └── Input.tsx          Labeled input with consistent styling
├── assets/
│   ├── hero.png               OpenGraph image
│   └── my-photo.jpg           Profile photo used in HeroSection
```

## Key Technical Decisions

### Smooth Scrolling (Lenis + GSAP)
- `SmoothScroll` wraps all children, uses Lenis default mode (window wrapper, document.documentElement content)
- Lenis drives `ScrollTrigger.update()` on scroll; GSAP ticker drives `lenis.raf()`
- Initialized inside `requestAnimationFrame` to avoid DOM conflicts during mount
- Lenis v1: `duration: 1.5`, custom easing, `wheelMultiplier: 1.1`, `touchMultiplier: 2`

### CSS Architecture
- All styles in `src/index.css` (1527 lines) — no CSS modules or co-located styles
- Full theming via `:root` CSS custom properties (`--bg-color`, `--primary-accent`, `--font-main`, etc.)
- Glassmorphism: `backdrop-filter: blur()` on navbar, cards
- Shimmer gradient buttons: `btn-shimmer` keyframe animation
- Custom CSS marquee (triplicated content, CSS animation) instead of `react-fast-marquee`

### Animations (GSAP)
- `Reveal` component: Each wrapped element gets its own `ScrollTrigger` with `toggleActions: 'play none none reverse'`
- Scroll progress bar: GSAP animates width from 0 to 100% based on body scroll
- Mobile tab bar: GSAP entrance animation from bottom

### Contact Form (EmailJS)
- Environment variables: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- State machine: `'idle' | 'sending' | 'success' | 'error'`
- Falls back gracefully if env vars are missing

### 3D Background (Three.js / R3F)
- `BackgroundCanvas` is lazy-loaded via `React.lazy()` + `Suspense`
- 3000 particles in spherical distribution, green (`#00ff88`), 0.025 size
- Auto-rotation + mouse-follow with lerp interpolation
- `frustumCulled: false` (all particles rendered)

### Known Issue: removeChild Error During HMR
- A `NotFoundError: removeChild` DOM exception can occur during Vite HMR when React 19 reconciliation conflicts with Lenis/GSAP DOM operations
- The `ErrorBoundary` in `main.tsx` catches this and shows a "Reload Page" button
- It's a development-only issue; production build is stable

## Data Structures

### Projects (ProjectsSection.tsx)
```ts
{ title, subtitle, description, tags: string[], role, github: string | null, accent: string }
// Current: Eventify, MRP, Fire Fighting Bot, Interactive Portfolio,
//          Zenith Protocol, ShasthyaHub-AI, LockIn, OfficeVolt
```

### Education (AboutSection.tsx)
```ts
{ degree, status: 'Ongoing' | 'Completed', institution, result, year,
  coursework?: string[], achievements?: string[], extraCurricular?: string[],
  skillsAcquired?: string }
// Current: BSc in CSE (AUST), HSC (SPSC), SSC (Monipur High School)
```

### Social Links (SocialsSection.tsx)
```ts
{ name, url, icon: JSX.Element, color: string }
// Current: LinkedIn, GitHub, WhatsApp, Facebook, Instagram
```

### Skills (AboutSection.tsx)
```ts
// Categories: languages, frameworks, databases, tools
// Icons from: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons
// Fallback: first 3 chars of skill name
```

## Environment Variables
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

## Git Branches
- `main` — production
- `feature/code-review-fixes` — latest active branch (code review fixes + new projects)
- Previous: `feature/ui-navigation-overhaul`, `feature/milestone-*`, `feature/social-presence`, etc.

## Recent Changes (feature/code-review-fixes)
1. Fixed HeroSection typing effect cascading render (wrapped state updates in setTimeout)
2. Properly typed ErrorBoundary (no `any`)
3. Typed Particles refs (`ThreePoints` and `Group` from three.js)
4. Moved `navLinks` to module scope (stable useEffect deps)
5. GSAP ticker cleanup on unmount in SmoothScroll
6. Removed redundant `<span>` wrappers across all sections
7. Added `.env.example` for EmailJS config
8. Added 4 new projects: Zenith Protocol, ShasthyaHub-AI, LockIn, OfficeVolt
9. Removed Task Flow Pro project
