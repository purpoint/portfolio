# Manan N. Ghodasara — Portfolio

A single-page, heavily-animated personal portfolio for a Full-Stack & AI
engineer. Art direction is **"molten editorial"** — warm charcoal, molten
amber/ember accents, fashion-magazine typography, an interactive 3D centrepiece,
a pinned horizontal-scrolling work gallery, and cinematic scroll choreography.

Built in the spirit of Awwwards-tier sites (ORYZO), not as a clone.

---

## Tech stack

| Concern        | Tool                                                        |
| -------------- | ----------------------------------------------------------- |
| Framework      | React 18 + Vite + TypeScript (single page)                  |
| 3D             | `three` + `@react-three/fiber` + `@react-three/drei`        |
| Scroll motion  | `gsap` + `ScrollTrigger` (pin, scrub, horizontal, reveals)  |
| Smooth scroll  | `lenis` inertia scroll, synced to ScrollTrigger             |
| Styling        | Tailwind CSS, themed from custom molten tokens              |

No component library — everything is hand-built and componentized.

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build locally
```

Requires Node 18+ (developed on Node 25).

---

## Editing the content

**All copy, links, skills, projects and metrics live in one file:**
[`src/data.ts`](src/data.ts). You almost never need to touch components.

- **Personal links** — `links` object (`email`, `phone`, `github`, `linkedin`).
  Leave any link as an empty string `''` and its UI element is hidden rather
  than rendered as a dead link.
- **Projects** — the `work.projects` array. Each entry has its stack, bullets,
  molten `stats`, a `live` URL, a `code` URL, and an `image` path.
- **About / Education / Skills / Contact** — their respective exported objects.

---

## Dropping in project screenshots

The work panels look their best with real screenshots. Drop them here:

```
public/projects/collabboard.png
public/projects/wasteiq.png
public/projects/mindvault.png
public/projects/echovision.png
```

(Paths are set per-project via `image` in `src/data.ts`.) Until a screenshot is
present, each panel shows a styled placeholder telling you exactly which file to
add. Screenshots are rendered under a warm duotone overlay that lifts to full
colour on hover, so they always look art-directed. Landscape ~16:11 works best.

---

## Project structure

```
src/
  data.ts                  ← all editable content
  App.tsx                  ← section composition
  index.css                ← molten theme, atmosphere, reduced-motion
  lib/gsap.ts              ← registers ScrollTrigger
  hooks/
    useLenis.ts            ← Lenis smooth-scroll synced to GSAP
    useReducedMotion.ts    ← motion + 3D-capability detection
  components/
    Nav · ScrollProgress · GrainOverlay · ScrollCue
    Reveal · WordReveal · CountUp · Marquee   ← reusable motion primitives
    three/                 ← MoltenObject, HeroCanvas (lazy), CSS fallback
    work/                  ← ProjectPanel, ProjectMedia
    sections/              ← Hero, About, Education, Skills, Work, Contact
```

---

## Accessibility & performance

- Full `prefers-reduced-motion` support — all scroll choreography and the WebGL
  hero switch off; a lightweight CSS molten blob replaces the 3D object.
- The 3D hero also falls back to the CSS blob on mobile / low-power devices, is
  code-split and lazy-loaded, caps `devicePixelRatio` at 2, and pauses its
  render loop when scrolled offscreen.
- Semantic HTML, keyboard-navigable, visible molten focus rings, alt text,
  fonts preconnected/preloaded, no layout shift.
- The horizontal work gallery collapses to stacked vertical cards on mobile.

---

Built with React, Three.js, GSAP & Lenis.
