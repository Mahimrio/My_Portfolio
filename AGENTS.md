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

## Current UI State — Read Before Changing Anything
- **The hanging AUST ID card is intentionally hidden by the owner (2026-11-24).** All of its code (`src/components/IdCardDrop.tsx`, its styles in `src/index.css`, GSAP/Draggable logic, `public/assets/`) must stay in the repo. It is hidden only by `.hero-corner-card { display: none; }` rules in `src/index.css` (`L502-510`). Do **not** delete the component, remove its code, or "fix" the visibility — leave it hidden unless the owner explicitly asks to restore it. To restore, remove the unconditional `.hero-corner-card { display: none; }` block at `L502-504` (keeping the `@media (max-width: 1100px)` rule if mobile should stay hidden).
- **Unique per-project accent colors (2026-11-25):** Every project card in `ProjectsSection.tsx` MUST have a unique, clearly distinct `accent` color (avoid repeating or near-duplicate hues, especially on adjacent cards). Each card's `--accent` drives its persistent card border, subtle ambient glow, top accent bar, role badge, and tech stack tags at rest as well as on hover (while Live Demo and View Code buttons retain their unified styling). Whenever adding a new project, choose a fresh distinct hex color not already used in the registry below.
- **3D flip project cards & nested wheel scrolling (2026-11-25):** Clicking (or pressing `Enter`/`Space` on) a project card flips it to `.project-card-back` showing the full project description in `.project-back-content`. Keep `allowNestedScroll: true` enabled in `SmoothScroll.tsx` so mouse-wheel scrolling works inside overflowing card descriptions without dragging the scrollbar.

## Project Structure
```
src/
├── main.tsx                   Entry point, ErrorBoundary, registers ScrollTrigger & Draggable (no StrictMode)
├── App.tsx                    Root: Loader + BackgroundCanvas + SmoothScroll + Layout + sections
├── index.css                  All global styles (~3100 lines, dark/light CSS custom properties)
├── lib/
│   └── themeTransition.ts     View Transition API + GSAP polygon-clip ("venom") theme switch effect
├── components/
│   ├── IdCardDrop.tsx         Interactive 3D hanging AUST student ID card (physics, Draggable, elastic recoil) — CODE KEPT, CURRENTLY HIDDEN via CSS (see "Current UI State")
│   ├── Layout.tsx             Navbar + main + Footer wrapper
│   ├── Navbar.tsx             Fixed header, scroll progress bar, spotlight + sliding pill nav, theme toggle, mobile tab bar, CV download button
│   ├── Footer.tsx             Back-to-top button, footer links, copyright
│   ├── Loader.tsx             Full-screen loading bar (simulated progress, 60ms interval)
│   ├── SmoothScroll.tsx       Lenis smooth scroll integration with GSAP ScrollTrigger (`allowNestedScroll: true`)
│   ├── animations/
│   │   └── Reveal.tsx         Scroll-triggered one-shot entrance animation (`once: true`, `fullHeight` and `disabled` props)
│   ├── canvas/
│   │   ├── BackgroundCanvas.tsx   Lazy R3F Canvas (theme-reactive lights + Particles via `'themechange'`)
│   │   └── Particles.tsx          1800-point particle sphere with auto-rotation and mouse tilt
│   ├── sections/
│   │   ├── HeroSection.tsx        Photo, typing effect (4 roles), CTA buttons, scroll cue, hidden IdCardDrop slot
│   │   ├── AboutSection.tsx       About cards, scroll-driven Education timeline, pure-CSS skill marquees, Strengths
│   │   ├── AchievementsSection.tsx 9 competition, hackathon & panelist awards in responsive card grid
│   │   ├── ProjectsSection.tsx    14 project cards (8 pinned + 6 expandable) with 3D flip overview, unique accents, GitHub & Live Demo links
│   │   ├── CertificatesSection.tsx 10 certificates (4 pinned featured + 6 expandable) with previews, badges & links
│   │   ├── ContactSection.tsx     2-column layout + EmailJS form (state machine)
│   │   └── SocialsSection.tsx     5 social media link cards (LinkedIn, GitHub, WhatsApp, FB, IG)
│   └── ui/
│       ├── Button.tsx         Variants: primary, outline, ghost
│       ├── Card.tsx           Glassmorphism card wrapper
│       └── Input.tsx          Labeled input with consistent styling
└── assets/
    └── my-photo.jpg           Profile photo used in HeroSection
public/
├── assets/                    Hanging ID card textures (`aust-badge.png`, `aust-id-card.png`, `aust-ribbon.png`)
├── certificates/              Certificate images & PDF (11 files referenced by CertificatesSection)
├── cv.pdf                     Downloadable CV (linked from Navbar)
├── favicon.svg                Site favicon
├── hero.png                   OpenGraph / Twitter card image
└── icons.svg                  SVG icon sprite
.github/
└── workflows/
    └── deploy.yml             GitHub Actions CI/CD: build + deploy to GitHub Pages on push to main
```

## Key Technical Decisions

### Smooth Scrolling (Lenis + GSAP)
- `SmoothScroll` wraps all children, using Lenis (`^1.3.23`) in window mode
- Automatically skipped when `(prefers-reduced-motion: reduce)` matches
- Config: `duration: 0.85`, exponential ease-out, `smoothWheel: true`, `wheelMultiplier: 1.15`, `touchMultiplier: 1.5`, `allowNestedScroll: true` (enables native mouse-wheel scrolling inside overflow containers such as flipped project card backs)
- Lenis drives `ScrollTrigger.update()` on scroll; GSAP ticker drives `lenis.raf()` (with `lagSmoothing(500, 33)`) and cleans up both RAF/listeners/ticker on unmount
- Refreshes `ScrollTrigger` once Lenis initializes and on `window` `load`

### CSS Architecture & Theming
- All styles in `src/index.css` (`~3100 lines`) — no CSS modules or co-located CSS files
- Full theming via `:root` custom properties and `data-theme="dark" | "light"` (`--bg-color`, `--primary-accent`, `--font-main`, `--font-ui`, `--font-mono`, `--nav-glow`, etc.)
- `index.html` initializes `data-theme` pre-paint from `localStorage` or `prefers-color-scheme` to avoid flash of wrong theme
- Theme switching dispatches a `'themechange'` `CustomEvent` (consumed by `BackgroundCanvas`) and uses `runThemeTransition` in `src/lib/themeTransition.ts`: wraps `flushSync` in `document.startViewTransition` animated with GSAP symbiote-like polygon tendrils (`--venom-clip`) expanding from/retracting to the theme toggle button, with instant fallback when unsupported or under reduced motion
- Fonts: **Outfit** (`300–800`), **Inter** (`400–700`), and **Space Mono** via Google Fonts (loaded in `index.html`)
- Glassmorphism: `backdrop-filter: blur()` on navbar and cards; shimmer buttons (`btn-shimmer`)
- Custom pure-CSS marquee (`CSSMarquee` in `AboutSection.tsx`, triplicated items, CSS animation with pause-on-hover)

### Animations (GSAP + @gsap/react)
- `useGSAP` hook from `@gsap/react` used in `Reveal`, `Navbar`, and `AboutSection`
- `Reveal` component: `gsap.fromTo` (`duration: 0.7`, `ease: 'power2.out'`, `clearProps: 'transform,opacity,willChange'`) with responsive offset (`20px` on `<= 768px`, `28px` desktop) and `ScrollTrigger` (`start: 'top 88%'`, `toggleActions: 'play none none none'`, `once: true`); supports `fullHeight` and `disabled` props (used for dynamically expanded cards) and honors `prefers-reduced-motion`
- **Education Timeline (`AboutSection.tsx`):** `useGSAP` + `ScrollTrigger` (`start: 'top 68%'`, `end: 'bottom 68%'`, `scrub: 0.15`, `invalidateOnRefresh: true`) and a `ResizeObserver` dynamically measure `.edu-dot` centers, scrub `.education-timeline-fill` (`scaleY`) and `.education-timeline-orb`, and toggle `.is-reached` on milestone dots
- Scroll progress bar (`Navbar.tsx`): GPU-composited `scaleX: 1` animation tied to body scroll (`scrub: 0.05`)
- Mobile tab bar (`Navbar.tsx`): GSAP slide-up entrance when `window.innerWidth <= 768` (skipped under `prefers-reduced-motion`)

### Navbar
- `IntersectionObserver`-based active section highlighting (`{ threshold: [0.2, 0.5] }`, selects the section with the highest `intersectionRatio` among `hero`, `presence`, and `navLinks` targets)
- **7 nav links** (`navLinks` at module scope): `About`, `Education`, `Skills`, `Achievements`, `Projects`, `Certificates`, `Contact` (each with inline SVG icon for the mobile tab bar)
- Desktop hover/active effects: cursor-tracking radial spotlight (`.nav-spotlight` via `--mouse-x`/`--mouse-y`) and sliding pill indicator (`.nav-slider-pill`)
- Theme toggle button (`theme-toggle`) + CV download button (`<a>` with `download` attribute, `import.meta.env.BASE_URL + 'cv.pdf'`)

### Contact Form (EmailJS)
- Environment variables: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- State machine: `'idle' | 'sending' | 'success' | 'error'`
- 5 form fields: `user_name`, `user_email`, `user_phone` (optional), `subject`, `message`
- Fails gracefully to `'error'` state if env vars are missing (logs warning in `DEV` only)
- Contact info panel: Email, Phone, Location (`Dhaka, Bangladesh`), University Email

### 3D Background (Three.js / R3F)
- `BackgroundCanvas` is lazy-loaded via `React.lazy()` + `Suspense`
- **1800 particles** in spherical distribution (`frustumCulled: false`), slow `groupRef` rotation + interactive mouse-tilt lerp
- Theme-reactive via `'themechange'`: dark mode (`#00ff88`, size `0.025`, opacity `0.4`) vs light mode (`#2563eb`, size `0.04`, opacity `0.7`)

### Known Issue: removeChild Error During HMR
- A `NotFoundError: removeChild` DOM exception can occur during Vite HMR when React 19 reconciliation conflicts with Lenis/GSAP DOM operations
- `ErrorBoundary` in `src/main.tsx` catches runtime errors and renders a diagnostic view displaying the error message and stack trace
- Development-only HMR hazard; production builds are stable

### CI/CD (GitHub Actions)
- `.github/workflows/deploy.yml` runs on push to `main` + manual `workflow_dispatch`
- Concurrency group `pages-deploy` with `cancel-in-progress: true`
- Node 22, `npm ci`, injects EmailJS secrets as env vars during build
- Uses `actions/upload-pages-artifact` + `actions/deploy-pages` (OIDC-based deployment)

## Data Structures

### Achievements (AchievementsSection.tsx)
```ts
{ place: string, category: string, event: string, scope: string, accent: string, icon: 'trophy' | 'medal' | 'star' }
// Current (9 items rendered in responsive card grid):
//   1. 1st Runners Up — AI Hackathon       | 3rd IAIT National IT Fest             (Nationals)
//   2. 2nd Runners Up — IoT Hackathon      | FastRoboX 1.0 · IEEE Student Branch   (Nationals)
//   3. Top 5 — UI/UX                       | AUST CSE Carnival 7.0                 (University)
//   4. Top 10 — Techathon                  | UFTB RoboFusion 1.0                   (Nationals)
//   5. Top 10 — Project Showcase           | AUST CSE Carnival 8.0                 (University)
//   6. 9th Place — IAPC                    | AUST CSE Carnival 8.0                 (University)
//   7. Top 15 — Techathon                  | IUT Techathon & Rover Summit          (Nationals)
//   8. Finalist — AI Hackathon             | SciBlitz 2.0 · CUET IEEE Branch       (Nationals)
//   9. Star Panelist — Member (Fall 2025)  | AUSTCAIC                              (University)
```

### Projects (ProjectsSection.tsx)
```ts
{ title, subtitle, description, tags: string[], role, github: string | null, live: string | null, inDevelopment?: boolean, featured?: boolean, accent: string }
// Current (14 projects, 8 pinned by default with 3D click-to-flip overview + "See More Projects" toggle):
// Rule: Always assign a unique, visually distinct `accent` color to every project (existing & future).
//   Pinned (8):
//     1. DhakaPath             — accent: #eab308 (Solar Gold)       | live: dhaka-path.vercel.app (Featured)
//     2. HydroSense-SWOT       — accent: #6366f1 (Cosmic Indigo)    | live: nasa-hackathon-seven.vercel.app (Featured)
//     3. KendraFi              — accent: #d946ef (Electric Fuchsia) | live: kendrafi.vercel.app (Featured, In Development)
//     4. InternLink            — accent: #3b82f6 (Royal Blue)       | live: intern-link-eight.vercel.app
//     5. ShasthyaHub-AI        — accent: #10b981 (Emerald Green)    | live: shasthyahub-ai.vercel.app
//     6. OfficeVolt            — accent: #ef4444 (Crimson Red)      | live: officevolt.vercel.app
//     7. Heaven Furniture Mart — accent: #d4a373 (Champagne Bronze) | live: heaven-furniture-mart-alpha.vercel.app
//     8. CampusOS              — accent: #2dd4bf (Aquamarine Mint)  | live: cse-carnival-8-aibuild-hackathon-iota.vercel.app
//   Expanded (6):
//     9. Eventify              — accent: #a855f7 (Orchid Purple)    | live: eventi-fy.me
//    10. Interactive Portfolio — accent: #ec4899 (Rose Pink)        | live: mahimrio.github.io/My_Portfolio/
//    11. Zenith Protocol       — accent: #f59e0b (Amber Gold)       | live: null (In Development)
//    12. MRP                   — accent: #06b6d4 (Cyan)             | live: null
//    13. LockIn                — accent: #84cc16 (Lime Green)       | live: mahimrio.github.io/LockIn/ (In Development)
//    14. Fire Fighting Bot     — accent: #ff6b35 (Flame Orange)     | github: null, live: null
```

### Certifications (CertificatesSection.tsx)
```ts
{ title, issuer, date, description, image?: string, credentialId?: string, link?: string, accent?: string, featured?: boolean, previewTags?: { topLeft, topRight, heading, subtext, footerText } }
// Current (10 certificates, 4 pinned featured certificates + 6 expandable via "See More Certifications"):
// Images & PDFs served from `public/certificates/`.
//   Pinned / Featured (4):
//     1. 3rd IAIT National IT Fest – AI Hackathon Certificate of Achievement (Runner Up)
//     2. FastRoboX 1.0 – IoT Hackathon Certificate of Achievement (2nd Runner Up)
//     3. 2026 NASA Space Apps Challenge – Galactic Problem Solver
//     4. RoboFusion 1.0 – Techathon Certificate of Participation
//   Expanded (6):
//     5. 3rd IAIT National IT Fest – AI Hackathon Certificate of Participation
//     6. SciBlitz 2.0 – AI Hackathon Certificate of Achievement
//     7. Unpacking AI – Practical Foundations Certificate
//     8. Techathon 2026 – Hackathon Certificate of Participation
//     9. Securing the Digital Future – Certificate of Participation
//    10. Future-Proof Your Cyber Career – Certificate of Participation
```

### Education (AboutSection.tsx)
```ts
{ degree, status: 'Ongoing' | 'Completed', institution, result, year,
  courseworkLabel?: string, coursework?: string[], achievements?: string[],
  extraCurricular?: string[], skillsAcquired?: string }
// Current: BSc in CSE (AUST), HSC (SPSC), SSC (Monipur High School & College)
// Notes:
//   - BSc displays `Coursework (Relevant)` (incl. Computer Networks, Introduction to AI, Operating Systems)
//   - BSc omits `achievements` (deduplicated against standalone Achievements section); HSC & SSC keep General Board Scholarship `achievements`
//   - BSc Involvement includes Associate Executive - AUSTCAIC, Member - AUSTPIC, Member - AUSTIDC, national robotics competitions, and Student Mentor for SSC and HSC as Home Tutor
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
// Fallback:    first 3 uppercase letters of skill name
```

### Strengths / Soft Skills (AboutSection.tsx)
```ts
// Heading: "Strengths" (4 items):
//   Teamwork & Collaboration, Problem-Solving, Tutoring & Mentoring, Analytical Thinking
```

## Environment Variables
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```
See `.env.example`. Also configured as GitHub repository secrets for CI/CD builds.

## Git Branches
- `main` — production (current active branch)
- Recent merged PR branches (`#46`–`#53`): `feature/hide-id-card`, `feature/scroll-animation-performance`, `feature/project-accents-and-new-certs`, `feature/add-new-projects-and-internlink-live`, `feature/add-kendrafi-and-dhakapath`, `feature/featured-projects-and-card-scroll`, `feature/scroll-education-timeline`
- Earlier feature branches: `feature/venom-theme-transition`, `feature/achievements-and-featured-certs`, `feature/aust-id-card-lanyard`, `feature/ui-ux-polish`, `feature/certifications-and-ui-enhancements`, `feature/code-review-fixes`, `feature/live-demo-buttons`, `fix/align-view-code-button`, `feature/ui-navigation-overhaul`, `feature/milestone-*`, etc.

## Recent Changes (merged to `main`)
1. **Live Demo buttons & alignment** (`feature/live-demo-buttons`, `fix/align-view-code-button`) — right-aligned `Live Demo` & `View Code` links on project cards
2. **GitHub Actions CI/CD** — `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`
3. **Topbar glowing & sliding transition** — cursor-following `.nav-spotlight` glow, `.nav-slider-pill`, and dark/light theme toggle across 7 nav items
4. **Venom View Transition theme switch** (`src/lib/themeTransition.ts`) — GSAP polygon tendril reveal on dark/light toggle with pre-paint theme script in `index.html` and theme-reactive particles
5. **Achievements section** — standalone grid displaying competition & hackathon placements
6. **Interactive 3D AUST ID Card Lanyard** (`IdCardDrop.tsx`, hidden via `.hero-corner-card { display: none; }` in PR `#46`)
7. **Scroll animation & particle performance** (PR `#47`–`#48`) — one-shot `Reveal` (`once: true`), GPU-composited `scaleX` scroll progress bar, and 1800-particle field
8. **3D click-to-flip project cards & wheel scroll** (PR `#48`, `#52`) — front shows tags/role/actions, back shows scrollable overview (`allowNestedScroll: true` in `SmoothScroll.tsx`), cleaned up flip hint copy
9. **Unique per-project accents, 14 projects & 10 certificates** (PR `#49`–`#52`) — added HydroSense-SWOT, KendraFi, DhakaPath, Heaven Furniture Mart, CampusOS, InternLink live URL, pinned top 8 projects (`Featured` badges on DhakaPath, HydroSense-SWOT, KendraFi), and updated `public/certificates/`
10. **Scroll-driven Education timeline** (PR `#53`) — animated track fill (`scaleY`), tracking orb, and `.is-reached` milestone dots synchronized via `ResizeObserver` + `ScrollTrigger`
11. **Education, Achievements & AGENTS.md sync** — removed duplicated achievements from BSc Education card, added CS coursework (`Computer Networks`, `Introduction to AI`, `Operating Systems`), changed BSc label to `Coursework (Relevant)`, updated club involvements (`AUSTCAIC`, `AUSTPIC`, `AUSTIDC`, SSC/HSC home tutoring), added 9th Achievement (`Star Panelist — Member (Fall 2025)` for `AUSTCAIC`), and synced `AGENTS.md`
