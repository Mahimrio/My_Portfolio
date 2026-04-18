# Rianto's Portfolio

> A high-performance, fluid, and interactive 3D portfolio built with modern web technologies.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

This repository contains the source code for a stunning, highly animated portfolio website. Designed and developed to highlight interactive 3D background elements using Three.js as well as beautifully smooth scroll animations executed via GreenSock (GSAP). 

---

## 🎯 Project Goals

- **Performance-First**: Fast load times optimized via Vite.
- **Fluid & Dynamic UX**: Complex scroll-triggered animations and fluid transitions mimicking industry-leading interactive portfolios.
- **Modern UI Design**: Utilizing dark mode aesthetics, glassmorphism, and minimal typography.
- **Responsive WebGL Layout**: Full 3D background canvases reacting to device orientation and mouse events without hurting mobile UX.

## 🛠️ Components & Technologies

- **Frontend Core:** [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **3D Engine:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations:** [GSAP (GreenSock)](https://gsap.com/) & [Lenis Smooth Scroll](https://lenis.studiofreight.com/)
- **Styling:** CSS3 variables & custom modular design systems

## 📅 Roadmap / Milestones

We successfully developed this project symmetrically with the following structured milestones:

- [x] **Milestone 1:** Foundation & Git Configuration (Vite + TS setup, Basic Layouts)
- [x] **Milestone 2:** Theming & Styling System (Global variables, Custom premium typography)
- [x] **Milestone 3:** 3D Elements Integration (Three.js canvas setup, WebGL models/particles)
- [x] **Milestone 4:** Fluid Scroll Animations (GSAP scroll triggers, Lenis smooth scroll)
- [x] **Milestone 5:** Core Sections Implementation (Hero, About, Projects, Contact blocks)
- [x] **Milestone 6:** Initial Polish (Loader states, UI alignments)
- [x] **Milestone 7:** Bug Fixes 🐛 (Resolved GSAP hooks, implemented performance-first Custom CSS Marquee)
- [x] **Milestone 8:** Hero Visual 🖼️ (Integrated profile imagery and rich glowing CSS pseudo-animations)
- [x] **Milestone 9:** Functional Contact Form 📬 (Integrated EmailJS with granular idle/sending/success UI states)
- [x] **Milestone 10:** Navigation Enhancement 🧭 (IntersectionObservers for active scroll-state highlighting & GSAP progress bars)
- [x] **Milestone 11:** Content Expansion 📋 (Filled project gallery, additional marquee icons, robust copy, Download CV button)
- [x] **Milestone 12:** Performance & A11y ⚡♿ (React.lazy / Suspense for WebGL layer, `aria` accessibility, refined Lenis scroll physics, sophisticated UI hover spring animations)
- [x] **Milestone 13:** Polish & Deploy 🚀 (Expanded rich footer, resolved all strict TS compilation factors, deployed seamlessly via `gh-pages`)

---

## 🚀 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mahimrio/My_Portfolio.git
   ```
2. **Navigate to directory:**
   ```bash
   cd My_Portfolio
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   > The application will typically start running at `http://localhost:5173`

---
*Designed & Developed with ❤️ by Mahimrio.*
