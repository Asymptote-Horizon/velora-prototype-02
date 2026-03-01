# VELORA 1.0 — Dare to Compete

> **A 24-hour hackathon by Cipher, the coding club of MIT Academy of Engineering, Alandi.**
> Open to all college students. Free to participate. Built to wreck your comfort zone.

---

```
██╗   ██╗███████╗██╗      ██████╗ ██████╗  █████╗
██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗██╔══██╗
██║   ██║█████╗  ██║     ██║   ██║██████╔╝███████║
╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔══██╗██╔══██║
 ╚████╔╝ ███████╗███████╗╚██████╔╝██║  ██║██║  ██║
  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
```

---

## What is this?

This is the official website for **Velora 1.0** — a 24-hour hackathon organized by [Cipher](https://mitaoe.ac.in), the coding club of MIT Academy of Engineering, Alandi, Pune.

The site is built with a **comic book / Spider-Verse aesthetic** — bold typography, chromatic aberration, halftone overlays, glitch animations, and easter eggs hidden throughout. No templates. No UI kits. All hand-crafted.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 7 |
| Scroll Animations | GSAP + ScrollTrigger |
| UI Animations | Framer Motion |
| Smooth Scroll | Lenis |
| Fonts | Bangers (display), Plus Jakarta Sans (body) |
| Styling | CSS custom properties + inline styles |
| Cursor Effect | Canvas API (Catmull-Rom spline) |

---

## Features

- **Cursor web trail** — your mouse leaves a silk thread that sags with gravity and dissolves from the tail
- **Glitch animations** — navbar wordmark, section headers, and hover states
- **Horizontal scroll timeline** — pinned GSAP timeline on desktop, vertical on mobile
- **Comic panel layout** — About, Tracks, Judges sections styled as comic book panels
- **Live countdown timer** — days, hours, minutes, seconds until the event
- **Four easter eggs** — try the Konami Code, stay idle for 30 seconds, click the logo 5 times fast, or press `N`
- **Noir mode** — full grayscale/contrast toggle via `data-theme="noir"` on the document root
- **Responsive** — hamburger nav, scroll-snap mobile tracks, vertical timeline on mobile

---

## Getting Started

```bash
npm install       # install dependencies
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # fixed nav, glitch effects, mobile overlay
│   ├── Hero.jsx          # full-viewport hero, countdown, SVG web lines
│   ├── About.jsx         # three comic panels, GSAP stagger
│   ├── Tracks.jsx        # 4 universe cards, color-coded per track
│   ├── Timeline.jsx      # pinned horizontal scroll (desktop), vertical (mobile)
│   ├── Prizes.jsx        # grand prize + per-track + participation tiers
│   ├── Judges.jsx        # trading card layout, classified cards
│   ├── Sponsors.jsx      # three-tier grid, grayscale→color on hover
│   ├── FAQ.jsx           # speech bubble accordion
│   ├── Register.jsx      # full-viewport CTA → Unstop
│   ├── Footer.jsx        # static, Velora 2.0 teaser
│   ├── EasterEggs.jsx    # Konami, idle bubble, origin story, noir mode
│   └── CursorWeb.jsx     # canvas cursor trail
├── data/
│   ├── tracks.js         # hackathon tracks + problem statements + prizes
│   ├── timeline.js       # event phases with status (upcoming/active/completed)
│   ├── judges.js         # judge profiles (isClassified for unconfirmed)
│   ├── faqs.js           # FAQ content
│   └── sponsors.js       # sponsor tiers (title/gold/silver)
└── styles/
    └── globals.css       # CSS custom properties, noir mode, reset
```

### Updating content

All event-specific content lives in `src/data/`. You don't need to touch any component to update dates, judges, prizes, or FAQ answers — just edit the data files.

**Timeline phases** — set `status: 'active'` on the current phase and the component automatically renders the glowing border + pulse indicator.

**Judges** — set `isClassified: true` and the card renders as a redacted "CLASSIFIED" panel until the judge is confirmed.

**Sponsors** — if all sponsors have `TBA` logos, the section automatically renders an "Allies Assembling..." placeholder instead of empty cards.

---

## Easter Eggs

| Trigger | Effect |
|---|---|
| `↑↑↓↓←→←→BA` (Konami Code) | Fullscreen glitch storm + secret message |
| Idle for 30 seconds | Speech bubble: *"Hey. The multiverse won't save itself."* |
| Click **VELORA** logo 5× rapidly | Origin story comic panel slides up |
| Press `N` (outside an input) | Toggles Noir Mode — full grayscale + rain overlay |

---

## Visual Conventions

- **Chromatic aberration** — `text-shadow` with offset red/cyan/yellow layers on the VELORA wordmark
- **Comic panels** — thick black border, panel number badge top-left
- **CTA buttons** — yellow `#FFE600` bg, black border, black offset box-shadow, zero border-radius
- **Color palette** — `#FF2D55` (red), `#00D4FF` (cyan), `#FFE600` (yellow), `#0A0A0A` (near-black)

---

## Built by Cipher

**Cipher** is the official coding club of MIT Academy of Engineering, Alandi, Pune.
We run workshops, hackathons, and competitions for students who want to build things that matter.

> *Velora 2.0 — The Verse Expands. 2026.*
