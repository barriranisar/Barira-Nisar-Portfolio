# Barira Nisar — Personal Creative Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Live Site](https://img.shields.io/badge/Live%20Site-bariranisar.vercel.app-8b5cf6?style=for-the-badge&logo=vercel)](https://bariranisar.vercel.app)

> A personal creative engineering and photography portfolio exploring the confluence of **Data Science**, **Full-Stack Web Engineering**, and **Visual Storytelling**.

---

## 📸 Showcase & Preview

![Barira Nisar Portfolio Demo](assets/hero-demo.png)
*(Drop your preview screenshot or GIF into `assets/hero-demo.png`)*

---

## 🌟 Highlights & Key Engineering Features

### 1. High-Performance Three.js WebGL Hero Sculpture
- **Interactive Morphing Sculpture**: Bespoke Torus Knot with 3 concentric gyroscope rings representing Data Science (Cyan), Web Engineering (Purple), and Camera Optics (Coral).
- **Adaptive Performance**: Pixel ratio capped at 2 (`Math.min(devicePixelRatio, 2)`), particle count dynamically adjusted for mobile/low-power devices (400 vs 1,400).
- **Battery & Memory Safe**: Pauses render loop when scrolled out of view (`IntersectionObserver`) or when tab is hidden (`visibilitychange`). Disposes all geometries, materials, textures, and cancels requestAnimationFrame on unmount.
- **Scroll-Linked Rotation**: Master sculpture and wireframe mesh rotate and morph subtly with document scroll progress.
- **Accessibility**: Freezes into a single crisp static render if `prefers-reduced-motion` is active.

### 2. Tri-Discipline Semantic Color System
- 🔬 **Data Science**: Cyan (`#06b6d4`)
- 💻 **Web Engineering**: Purple (`#8b5cf6`)
- 📷 **Photography**: Coral (`#f97316`)
- ✨ **Highlights**: Rare Pink (`#ec4899`) and Blue (`#3b82f6`)
- Synchronized theme-color meta tag (`#07040e`), glassmorphism card borders, ambient canvas particles, and glow shaders.

### 3. Interactive In-Browser Machine Learning Sandbox (Phase 5)
- **Closed-Form Ordinary Least Squares (OLS)**: No fake animations — calculates actual regression parameters directly in browser memory:
  - Slope ($\beta_1$) & Intercept ($\beta_0$)
  - Coefficient of Determination ($R^2$)
  - Mean Squared Error (MSE)
  - Pearson correlation coefficient ($r$)
- **Interactive SVG Scatter Plot**: Drag existing points in real time or click directly on the canvas to add custom sensor readings. Residual lines and metrics update instantaneously.

### 4. Photography Optics & Color Analytics (Phase 4)
- **Live RGB Histogram**: Downsamples photos offscreen to extract pixel color frequencies across 256 bins, rendering responsive Red, Green, and Blue composite curves on an interactive HTML5 canvas.
- **5-Color Dominant Palette**: Uses in-browser k-means clustering in RGB space to quantify the 5 most dominant colors with percentage weights and one-click HEX copying.
- **Camera EXIF HUD**: Real-time telemetry displaying Camera Body, Lens, Focal Length, Aperture, ISO, and Shutter Speed.

### 5. Shared-Element Modal Transitions & Accessibility (Phase 3 & 7)
- **Fluid Layout Transitions**: Framer Motion shared-element transition (`layoutId`) seamlessly morphs project cards into detailed 2-column modal dialogs and back.
- **Full WCAG Accessibility**:
  - Focus trap keeps keyboard navigation inside active modals.
  - Returns focus to trigger element on close.
  - Full keyboard control (`Escape`, `ArrowLeft`, `ArrowRight`, `Tab`, `Enter`).
  - Standard ARIA semantics: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-live="polite"`.
  - Non-intrusive custom cursor disabled automatically on touch screens.

### 6. Serverless Contact API & Resend Integration (Phase 6)
- **Vercel Serverless Function** (`api/contact.ts`):
  - Validates name, email, subject, and message length.
  - In-memory IP rate limiter (5 submissions per 15 minutes).
  - Invisible honeypot field (`botField`) mitigating automated spam bots without CAPTCHAs.
  - Sends emails using [Resend](https://resend.com) via standard `fetch`.
  - Graceful fallback: If API is unconfigured (local preview), automatically triggers the user's default `mailto:` client with pre-filled subject and body.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 19 + TypeScript (Strict Mode)
- **Build Tool**: Vite 8 with Rolldown / Rolldown Runtime
- **Styling**: Tailwind CSS 4 (`@theme` token definitions, glassmorphism)
- **3D Graphics**: Three.js (lazy-loaded, chunk-split into `three-vendor`)
- **Animations**: Framer Motion (lazy-loaded vendor chunk)
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti
- **Deployment**: Vercel

---

## 📁 Project Structure

```
├── api/
│   └── contact.ts              # Vercel serverless contact API (Resend, honeypot, rate-limit)
├── src/
│   ├── components/
│   │   ├── Canvas3DHero.tsx         # Lazy-loaded WebGL Three.js hero sculpture
│   │   ├── Canvas3DHeroFallback.tsx # Lightweight fallback for SSR / non-WebGL
│   │   ├── ExpertiseExperiences.tsx # 3 interactive sandboxes (OLS, MERN, Viewfinder)
│   │   ├── Lightbox.tsx             # Photo lightbox with live RGB histogram & palette
│   │   ├── ProjectModal.tsx         # Accessible shared-element project modal
│   │   └── ...
│   ├── data/                   # Centralized content store (all text, metrics, projects)
│   │   ├── achievements.ts
│   │   ├── experiences.ts
│   │   ├── photography.ts
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── regressionData.ts
│   │   └── uiChallenges.ts
│   ├── sections/               # Page sections
│   ├── utils/
│   │   └── imageAnalysis.ts    # RGB histogram & k-means clustering algorithms
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

---

## ⚙️ Environment Variables (Vercel)

To enable direct email dispatch via the contact form, configure these environment variables in your Vercel Project Settings (`Settings > Environment Variables`):

| Variable | Description | Example |
|---|---|---|
| `RESEND_API_KEY` | Your API key from [Resend](https://resend.com/api-keys) | `re_123456789...` |
| `CONTACT_TO_EMAIL` | Email address where messages should be received | `bariranisar9@gmail.com` |

*Note: If these variables are not configured, the contact form automatically falls back to opening the visitor's mail client with the message pre-filled.*

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```

3. **Check code quality**:
   ```bash
   npm run lint
   ```

4. **Production build**:
   ```bash
   npm run build
   ```

5. **Local preview**:
   ```bash
   npm run preview
   ```

---

## 📄 License

MIT © [Barira Nisar](https://github.com/barriranisar)
