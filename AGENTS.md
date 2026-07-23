# Project Context: My_Portfolio

## Identity
- **Owner:** Mahim Abdullah Rianto (Mahimrio)
- **Stack:** Vite ^8 + React 19 + TypeScript ~6.0.2
- **Deployment:** GitHub Pages at `https://mahimrio.github.io/My_Portfolio/` via GitHub Actions (`deploy.yml`) — builds on push to `main`, deploys with `actions/deploy-pages` (OIDC)
- **Base URL:** `/My_Portfolio/`

## Quick Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | `eslint .` |
| `npm run deploy` | `gh-pages -d dist` (legacy manual deploy — CI/CD now preferred) |
| `npm run preview` | `vite preview` (serve production build locally) |

## Project Structure
```
src/
├── main.tsx                   Entry point, ErrorBoundary, registers ScrollTrigger (no StrictMode)
├── App.tsx                    Root: Loader + BackgroundCanvas + SmoothScroll + Layout + sections
├── index.css                  All global styles (~1342 lines, CSS custom properties)
├── components/
│   ├── Layout.tsx             Navbar + main + Footer wrapper
│   ├── Navbar.tsx             Fixed header, scroll progress bar, mobile tab bar, CV download button
│   ├── Footer.tsx             Back-to-top button, footer links, copyright
│   ├── Loader.tsx             Full-screen loading bar (fake progress, 60ms interval)
│   ├── SmoothScroll.tsx       Lenis smooth scroll integration with GSAP ScrollTrigger
│   ├── animations/
│   │   └── Reveal.tsx         Scroll-triggered entrance animation (opacity + translate, fullHeight prop)
│   ├── canvas/
│   │   ├── BackgroundCanvas.tsx   R3F Canvas (dark bg, city HDR, lights)
│   │   └── Particles.tsx          3000-point particle sphere with mouse interaction
│   ├── sections/
│   │   ├── HeroSection.tsx    Photo, typing effect (4 roles), CTA buttons
│   │   ├── AboutSection.tsx   About cards, education timeline, skill marquees (pure CSS), soft skills
│   │   ├── ProjectsSection.tsx 8 project cards with accent bars, GitHub links, and Live Demo buttons
│   │   ├── CertificatesSection.tsx Certificates & Achievements cards with category badges
│   │   ├── ContactSection.tsx 2-column layout + EmailJS form (state machine)
│   │   └── SocialsSection.tsx 5 social media link cards (LinkedIn, GitHub, WhatsApp, FB, IG)
│   └── ui/
│       ├── Button.tsx         Variants: primary, outline, ghost
│       ├── Card.tsx           Glassmorphism card wrapper
│       └── Input.tsx          Labeled input with consistent styling
├── assets/
│   ├── hero.png               OpenGraph image
│   └── my-photo.jpg           Profile photo used in HeroSection
public/
├── cv.pdf                     Downloadable CV (linked from Navbar)
├── favicon.svg                Site favicon
└── icons.svg                  SVG icon sprite
.github/
└── workflows/
    └── deploy.yml             GitHub Actions CI/CD: build + deploy to GitHub Pages on push to main
```

## Key Technical Decisions

### Smooth Scrolling (Lenis + GSAP)
- `SmoothScroll` wraps all children, uses Lenis default mode (window wrapper, document.documentElement content)
- Lenis drives `ScrollTrigger.update()` on scroll; GSAP ticker drives `lenis.raf()`
- Initialized inside `requestAnimationFrame` to avoid DOM conflicts during mount
- Lenis v1: `duration: 1.5`, custom easing, `wheelMultiplier: 1.1`, `touchMultiplier: 2`
- GSAP ticker callback cleaned up on unmount

### CSS Architecture
- All styles in `src/index.css` (~1342 lines) — no CSS modules or co-located styles
- Full theming via `:root` CSS custom properties (`--bg-color`, `--primary-accent`, `--font-main`, etc.)
- Fonts: **Outfit** (300–800) + **Space Mono** (mono) via Google Fonts (loaded in `index.html`)
- Glassmorphism: `backdrop-filter: blur()` on navbar, cards
- Shimmer gradient buttons: `btn-shimmer` keyframe animation
- Custom pure-CSS marquee (`CSSMarquee` component, triplicated content, CSS animation) instead of `react-fast-marquee`
- Note: `react-fast-marquee` is still listed in `package.json` dependencies and in `vite.config.ts` `optimizeDeps.include`, but is **not imported or used** in any component

### Animations (GSAP + @gsap/react)
- `useGSAP` hook from `@gsap/react` used in `Reveal` and `Navbar` components
- `Reveal` component: Each wrapped element gets its own `ScrollTrigger` with `toggleActions: 'play none none reverse'`
- `Reveal` supports `fullHeight` prop for flex-layout children (used in AboutSection cards)
- Scroll progress bar: GSAP animates width from 0 to 100% based on body scroll
- Mobile tab bar: GSAP entrance animation from bottom (window width ≤ 768px)

### Navbar
- IntersectionObserver-based active section highlighting (`rootMargin: '-30% 0px -70% 0px'`)
- 5 nav links: About, Education, Skills, Projects, Contact (each with inline SVG icon for mobile tab bar)
- CV download button: `<a>` with `download` attribute, uses `import.meta.env.BASE_URL + 'cv.pdf'`
- `navLinks` defined at module scope (stable reference for hooks)

### Contact Form (EmailJS)
- Environment variables: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- State machine: `'idle' | 'sending' | 'success' | 'error'`
- 5 form fields: `user_name`, `user_email`, `user_phone` (optional), `subject`, `message`
- Falls back gracefully if env vars are missing
- Contact info panel: Email, Phone, Location (Dhaka, Bangladesh), University Email

### 3D Background (Three.js / R3F)
- `BackgroundCanvas` is lazy-loaded via `React.lazy()` + `Suspense`
- 3000 particles in spherical distribution, green (`#00ff88`), 0.025 size, 0.4 opacity
- Auto-rotation + mouse-follow with lerp interpolation
- `frustumCulled: false` (all particles rendered)

### Known Issue: removeChild Error During HMR
- A `NotFoundError: removeChild` DOM exception can occur during Vite HMR when React 19 reconciliation conflicts with Lenis/GSAP DOM operations
- The `ErrorBoundary` in `main.tsx` catches this and shows a "Reload Page" button
- It's a development-only issue; production build is stable

### CI/CD (GitHub Actions)
- `.github/workflows/deploy.yml` runs on push to `main` + manual `workflow_dispatch`
- Concurrency group `pages-deploy` with `cancel-in-progress: true`
- Node 22, `npm ci`, injects EmailJS secrets as env vars during build
- Uses `actions/upload-pages-artifact` + `actions/deploy-pages` (OIDC-based deployment)

## Data Structures

### Projects (ProjectsSection.tsx)
```ts
{ title, subtitle, description, tags: string[], role, github: string | null, live: string | null, accent: string }
// Current (9 projects, 4 pinned by default + "See More Projects" expansion toggle):
//   Pinned (4):
//     1. InternLink        — github: github.com/Mahimrio/InternLink.git
//     2. ShasthyaHub-AI    — live: shasthyahub-ai.vercel.app
//     3. Eventify          — live: eventi-fy.me
//     4. OfficeVolt        — live: officevolt.vercel.app
//   Expanded (5):
//     5. Zenith Protocol    — live: null (In Development)
//     6. Interactive Portfolio — live: mahimrio.github.io/My_Portfolio/
//     7. MRP               — live: null
//     8. LockIn            — live: mahimrio.github.io/LockIn/ (In Development)
//     9. Fire Fighting Bot  — github: null, live: null
```

### Certifications (CertificatesSection.tsx)
```ts
{ title, issuer, date, description, credentialId?: string, link?: string, accent?: string }
// Features 3 pinned certificates + "See More Certifications" toggle with smooth scale/entrance animation.
// Slots ready for PDF links when provided.
```

### Education (AboutSection.tsx)
```ts
{ degree, status: 'Ongoing' | 'Completed', institution, result, year,
  coursework?: string[], achievements?: string[], extraCurricular?: string[],
  skillsAcquired?: string }
// Current: BSc in CSE (AUST), HSC (SPSC), SSC (Monipur High School)
```

### Contact Info (ContactSection.tsx)
```ts
{ icon: JSX.Element, label, value, href: string | null }
// Current: Email (rockrianto231@gmail.com), Phone (+880 1609302952),
//          Location (Dhaka, Bangladesh), University Email (mahim.cse.20230104015@aust.edu)
```

### Social Links (SocialsSection.tsx)
```ts
{ name, url, icon: JSX.Element, color: string }
// Current: LinkedIn, GitHub, WhatsApp, Facebook, Instagram
```

### Skills (AboutSection.tsx)
```ts
// Categories: languages, frameworks, databases, tools
// Languages:   Assembly, C, C++, Java, JavaScript, TypeScript
// Frameworks:  React.js, Next.js, Node.js, Django, PHP Laravel
// Databases:   MySQL, MSSQL, MongoDB, Firebase, Supabase
// Tools:       Git, VS Code, Arduino, Proteus, iGraphics
// Icons from:  https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons
// Fallback:    first 3 chars of skill name (uppercase)
```

### Soft Skills (AboutSection.tsx)
```ts
// 4 items: Teamwork & Collaboration, Problem-Solving, Tutoring & Mentoring, Analytical Thinking
```

## Environment Variables
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```
Also configured as GitHub repository secrets for CI/CD builds.

## Git Branches
- `main` — production (current active branch)
- `feature/code-review-fixes` — code review fixes + new projects (merged)
- `feature/live-demo-buttons` — added Live Demo links to project cards (merged)
- `fix/align-view-code-button` — right-aligned action buttons in project cards (merged)
- Previous: `feature/ui-navigation-overhaul`, `feature/cv-content-update`, `feature/mobile-optimization-v2`, `feature/shield-rest-and-edu-update`, `feature/social-presence`, `feature/milestone-*`, etc.

## Recent Changes (merged to main)
1. **Live Demo buttons** — project cards now show "Live Demo ↗" links for deployed projects (`feature/live-demo-buttons`)
2. **Action button alignment** — project card action buttons (View Code, Live Demo) are right-aligned (`fix/align-view-code-button`)
3. **GitHub Actions CI/CD** — added `deploy.yml` workflow for automated build & deploy to GitHub Pages on push to `main`
4. **CV & profile photo update** — updated `public/cv.pdf` and profile photo asset
5. Fixed HeroSection typing effect cascading render
6. Properly typed ErrorBoundary (no `any`)
7. Typed Particles refs (`ThreePoints` and `Group` from three.js)
8. Moved `navLinks` to module scope (stable useEffect deps)
9. GSAP ticker cleanup on unmount in SmoothScroll
10. Removed redundant `<span>` wrappers across all sections
11. Added `.env.example` for EmailJS config
12. Added 4 projects: Zenith Protocol, ShasthyaHub-AI, LockIn, OfficeVolt
13. Removed Task Flow Pro project
