# PureSqueeze: React and Three.js Learning Project

PureSqueeze is a small interactive juice product page built while learning the fundamentals of React, Three.js, and React Three Fiber. It combines a React-driven scroll story with a real-time 3D bottle scene.

The page presents four scroll stages:

1. **Hero:** introduces the cold-pressed juice brand.
2. **Benefits:** reveals three product benefits one at a time.
3. **Ingredients:** lists what is inside the bottle.
4. **Testimonials:** fades in customer quotes in sequence.

As the user scrolls, the bottle moves between stage positions, scales away for the testimonials section, and rotates continuously. The result is a focused exercise in coordinating DOM layout, scroll progress, and a Three.js render loop.

## Learning Goals

This project explores:

- Building a React application with Vite.
- Creating a 3D scene with `@react-three/fiber`.
- Using `@react-three/drei` helpers such as `Environment`, `ContactShadows`, `Html`, and `useProgress`.
- Creating a simple bottle from Three.js cylinder geometries and materials.
- Driving animation from scroll position instead of mouse or click events.
- Using refs for high-frequency animation data without re-rendering React on every frame.
- Separating coarse UI state (`stage` and `localProgress`) from precise 3D animation state (`progressRef`).
- Applying easing with interpolation and `smoothstep` for more natural transitions.
- Organizing a page into React components and a reusable custom hook.

## Tech Stack

- React 19
- React DOM
- Vite
- Three.js
- React Three Fiber
- Drei
- ESLint
- Fraunces and Space Grotesk fonts loaded from Google Fonts

## Getting Started

### Prerequisites

- Node.js and npm installed locally.
- A modern browser with WebGL support.

### Install dependencies

From this directory, run:

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

The compiled files are written to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Project Structure

```text
juice-website/
├── index.html                 # HTML shell, fonts, and app mount point
├── package.json               # Dependencies and npm scripts
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── public/                    # Static files served as-is
└── src/
	├── App.jsx                # Top-level page composition
	├── main.jsx               # React entry point
	├── index.css              # Global reset, colors, fonts, and base styles
	├── hooks/
	│   └── useScrollStory.js  # Scroll progress and stage state
	├── components/
	│   ├── Nav.jsx            # Fixed PureSqueeze navigation
	│   ├── StoryScene.jsx     # Active scroll-story layout and copy
	│   ├── Scene.jsx          # React Three Fiber canvas and lighting
	│   ├── JuiceBottle.jsx    # Procedural bottle and scroll animation
	│   ├── Footer.jsx         # Closing call to action
	│   ├── Hero.jsx           # Standalone hero learning example
	│   ├── Features.jsx        # Standalone benefits section example
	│   ├── Ingredients.jsx     # Standalone ingredients section example
	│   └── Testimonials.jsx    # Standalone testimonials section example
	└── assets/                # Images and starter assets
```

## How the Scroll Animation Works

`StoryScene` creates a wrapper that is five viewport-heights tall and keeps the scene sticky for the duration of the story. `useScrollStory` calculates a continuous scroll value and clamps it to four stages:

```text
0.0 - 1.0  Hero
1.0 - 2.0  Benefits
2.0 - 3.0  Ingredients
3.0 - 4.0  Testimonials
```

The hook stores the precise value in `progressRef`. `JuiceBottle` reads that ref inside React Three Fiber's `useFrame` loop, so bottle movement does not cause a React render every time the browser scrolls or renders a frame. React receives the lower-frequency `stage` and `localProgress` values to show and hide HTML content.

For each stage, `JuiceBottle` has a starting position and scale. During the final 30% of a stage, it interpolates toward the next stage using `smoothstep`, then rotates slightly on every frame. This creates reading time before the bottle begins moving to the next section.

## Important Files to Explore

- `src/hooks/useScrollStory.js`: start here to understand scroll measurement, clamping, stages, and render frequency.
- `src/components/StoryScene.jsx`: see how React content is layered over the canvas and revealed by stage progress.
- `src/components/Scene.jsx`: inspect the canvas, camera, lights, environment, shadows, and Suspense fallback.
- `src/components/JuiceBottle.jsx`: learn how primitive Three.js meshes, materials, interpolation, and `useFrame` work together.
- `src/index.css`: find the visual tokens used by the page, including the color palette and font families.

## Current Scope and Possible Next Steps

This is a learning project rather than a complete commerce site. The navigation labels and "Shop the range" button are visual UI only; there is no shop route, product data, cart, or backend. The bottle is built from primitive cylinders, and the loading fallback is prepared for asynchronous assets even though the current scene does not load a model.

The standalone `Hero`, `Features`, `Ingredients`, and `Testimonials` components are retained as simpler section examples. The current page uses `StoryScene` to combine those ideas into one scroll-driven experience.

Good follow-up exercises include:

- Replace the primitive bottle with a `.glb` model.
- Add a real product or shop route.
- Make the navigation links functional.
- Add responsive layout rules for smaller screens.
- Move inline styles into component stylesheets or a design system.
- Add reduced-motion behavior for users who prefer less animation.
- Add tests for the scroll-stage calculation and bottle transform rules.

## License

This repository is a personal learning project.
