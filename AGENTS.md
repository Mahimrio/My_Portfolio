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
- **The hanging AUST ID card is intentionally hidden by the owner (2026-11-24).** All of its code (`src/components/IdCardDrop.tsx`, its styles in `src/index.css`, GSAP/Draggable logic, assets) must stay in the repo. It is hidden only by a `.hero-corner-card { display: none; }` rule in `src/index.css`. Do **not** delete the component, remove its code, or "fix" the visibility — leave it hidden unless the owner explicitly asks to restore it. To restore, remove that one CSS rule.
- **Unique per-project accent colors (2026-11-25):** Every project card in `ProjectsSection.tsx` MUST have a unique, clearly distinct `accent` color (avoid repeating or near-duplicate hues, especially on adjacent cards). Each card's `--accent` drives its persistent card border, subtle ambient glow, top accent bar, role badge, and tech stack tags at rest as well as on hover (while Live Demo and View Code buttons retain their unified styling). Whenever adding a new project, choose a fresh distinct hex color not already used in the registry below.

## Project Structure
```
src/
├── main.tsx                   Entry point, ErrorBoundary, registers ScrollTrigger & Draggable (no StrictMode)
├── App.tsx                    Root: Loader + BackgroundCanvas + SmoothScroll + Layout + sections
├── index.css                  All global styles (~2700 lines, CSS custom properties)
├── components/
│   ├── IdCardDrop.tsx         Interactive 3D hanging AUST student ID card (physics, Draggable, elastic recoil) — CODE KEPT, CURRENTLY HIDDEN via CSS (see "Current UI State")
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
│   │   ├── AchievementsSection.tsx 8 competition & hackathon awards in responsive card grid
│   │   ├── ProjectsSection.tsx 8 project cards with accent bars, GitHub links, and Live Demo buttons
│   │   ├── CertificatesSection.tsx Certificates cards with featured labels, badges & previews
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
{ title, issuer, date, description, image?: string, credentialId?: string, link?: string, accent?: string, featured?: boolean }
// Current (10 certificates, 4 pinned featured certificates + 6 expandable via "See More Certifications"):
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
14. **Topbar glowing & sliding transition** — cursor-following spotlight glow + smooth sliding pill indicator across nav tabs with dark/light mode contrast
15. **Achievements section** — added standalone section above Projects displaying 8 competition & hackathon placements
16. **Featured certificates** — added FastRoboX 1.0 (BUBT), 3rd IAIT National IT Fest, and RoboFusion 1.0 (Walton/UFTB) certificates with `★ FEATURED` badges
17. **Interactive 3D AUST ID Card Lanyard** — added `IdCardDrop.tsx` with GSAP elastic drop-in, pendulum swing, 3D hover tilt with glare, and Draggable spring-back physics in Hero section
