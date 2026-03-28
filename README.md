# Beyond the Blue 🚀

> An immersive, cinematic scroll-driven WebGL experience narrating humanity's first crewed journey to Mars. 

Built for hackathons and interactive storytelling, **Beyond the Blue** combines React, Three.js, and Framer Motion to create a highly optimized, stunning narrative piece consisting of five stages: Countdown, Ignition, Transit, Landing, and Conclusion.

## 🌟 Key Features

* **Scroll-Driven Narrative:** Elements animate seamlessly bound to your scroll progression using `framer-motion` hooks.
* **Responsive 3D Realism:** A Three.js canvas renders a dynamic 4,000-point starfield and rotating PBR planets (Earth & Mars) using `@react-three/fiber` tied directly to user scrolling. 
* **Cinematic Stages:** 
  * **T-Minus Zero:** A live countdown accompanied by animated tracking particles.
  * **Ignition:** Ascending SVG rocket layered on top of live telemetry panels holding altitude, trajectory, max G-forces, and fuel levels.
  * **The Void (Horizontal Scroll):** A mapped horizontal-wrap section representing the multi-month journey, incorporating 3D-flipping personnel cards.
  * **Red Horizon:** Atmospheric shake on entry with drifting dust particles, a simulated parachute deployment, and a dynamically positioned hover-interactive map of the Martian surface.
  * **A New World:** A parallax terrain layout concluding with expandable debrief facts.
* **Optimized & Accessible:** Lazy-loaded module splitting, device pixel ratio (DPR) bounding, and total support for `prefers-reduced-motion`. Includes ARIA landmarks and a hidden custom cursor fallback for mobile.

## 🛠️ Technology Stack

* **Framework:** React 18 + Vite
* **Animations:** Framer Motion
* **3D Visuals:** Three.js / React Three Fiber / Drei
* **Styling:** Tailwind CSS (Custom thematic configs)
* **Design Systems:** Heavy use of Glassmorphism styling rules overlaid on dark/neon-cyan color theories.

## 🚀 Getting Started

To run this application locally:

### 1. Installation
Clone the repository, then install dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```
This generates a highly optimized static bundle inside the `dist/` folder ready for deployment on Vercel, Netlify, or any static host.

## 🕹️ Easter Egg
Type `HOUSTON` anywhere on the keyboard. See what happens.

---
*Created for the Hackathon. Keep reaching for the stars.* 🌌
