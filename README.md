# Alone Hometown — Bloodsteal SMP

A dark-themed website for a **Bloodsteal SMP** Minecraft server — *Alone Hometown*. Built with React + Vite, featuring interactive glow effects, WebGL specular buttons, and Minecraft-styled typography.

## Tech Stack

**Frontend:**
- React 19 + Vite 8
- Tailwind CSS v4
- OGL (WebGL) — specular button shader effects
- Motion — glow effect animations
- Minecraft font for branding elements

**Backend:**
- Node.js + Express
- (API server for the SMP)

## Features

- Rain animation canvas overlay with lightning flashes
- Mouse-tracking border glow on rule/mechanic cards
- WebGL specular highlight buttons
- Minecraft pixel heart favicon
- Responsive layout with animated scroll-reveal sections
- Leaderboard, shop, staff, FAQ sections

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
npm run build
```

Output goes to `frontend/dist/`.

## Project Structure

```
frontend/
├── public/              # Static assets (favicon)
├── src/
│   ├── components/ui/   # GlowingEffect, SpecularButton
│   ├── fonts/           # Minecraft.ttf
│   ├── hooks/           # useLandingEffects
│   ├── layout/          # Navbar
│   ├── lib/             # utils (cn)
│   ├── sections/        # Hero, About, Mechanics, Shop, etc.
│   └── styles/          # global.css
├── index.html
└── package.json
```
