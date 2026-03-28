import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import TelemetryPanel from '../ui/TelemetryPanel';
import { LAUNCH_NARRATIVE } from '../../constants/data';

/* Detailed SVG rocket component */
function Rocket() {
  return (
    <svg
      viewBox="0 0 80 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 md:w-20 lg:w-24"
    >
      {/* Nose cone */}
      <path d="M40 0 L55 50 L25 50 Z" fill="#e8eaf0" stroke="#a0a4b0" strokeWidth="0.5" />
      <path d="M40 0 L40 50 L25 50 Z" fill="#d0d3dd" />
      {/* Window */}
      <circle cx="40" cy="38" r="5" fill="#1a6cf6" stroke="#a0a4b0" strokeWidth="0.5" />
      <circle cx="40" cy="38" r="2.5" fill="#00d4ff" opacity="0.6" />
      {/* Body */}
      <rect x="25" y="50" width="30" height="100" rx="2" fill="#e8eaf0" />
      <rect x="25" y="50" width="15" height="100" rx="2" fill="#d0d3dd" />
      {/* Body stripe */}
      <rect x="25" y="70" width="30" height="4" fill="#ff5c1a" />
      <rect x="25" y="120" width="30" height="4" fill="#ff5c1a" />
      {/* ARES-1 text area */}
      <rect x="30" y="85" width="20" height="15" rx="1" fill="#1a6cf6" opacity="0.3" />
      {/* Side fins */}
      <path d="M25 130 L10 170 L25 160 Z" fill="#c1440e" stroke="#8b2500" strokeWidth="0.5" />
      <path d="M55 130 L70 170 L55 160 Z" fill="#c1440e" stroke="#8b2500" strokeWidth="0.5" />
      {/* Center fin */}
      <path d="M35 150 L40 175 L45 150 Z" fill="#8b2500" />
      {/* Engine nozzles */}
      <rect x="30" y="150" width="8" height="10" rx="1" fill="#555" />
      <rect x="42" y="150" width="8" height="10" rx="1" fill="#555" />
      <ellipse cx="34" cy="160" rx="5" ry="3" fill="#333" />
      <ellipse cx="46" cy="160" rx="5" ry="3" fill="#333" />
    </svg>
  );
}

/* Flame / exhaust effect */
function RocketFlame() {
  return (
    <div className="flex flex-col items-center -mt-1">
      {/* Main flame */}
      <div
        className="w-8 h-16 md:w-10 md:h-20 rounded-b-full flame-flicker gpu-accelerated"
        style={{
          background: 'linear-gradient(180deg, #ff5c1a 0%, #ffaa00 40%, #ff5c1a 70%, transparent 100%)',
        }}
      />
      {/* Inner hot core */}
      <div
        className="w-4 h-10 md:w-5 md:h-14 rounded-b-full -mt-14 flame-flicker gpu-accelerated"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #ffdd44 50%, transparent 100%)',
          animationDelay: '0.05s',
        }}
      />
      {/* Outer glow */}
      <div
        className="w-12 h-10 md:w-16 md:h-12 rounded-b-full -mt-8 opacity-40 flame-flicker gpu-accelerated"
        style={{
          background: 'radial-gradient(ellipse, #ff5c1a 0%, transparent 70%)',
          animationDelay: '0.08s',
        }}
      />
    </div>
  );
}

/**
 * Launch section: 300vh sticky container with rocket rising, telemetry, narrative.
 */
export default function Launch() {
  const shouldReduce = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Rocket vertical position: starts at bottom, flies up and off screen
  const rocketY = useTransform(scrollYProgress, [0, 1], ['80vh', '-150vh']);
  const rocketScale = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 1.1, 0.9, 0.6]);

  // Exhaust trail grows
  const exhaustScaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1.5]);
  const exhaustOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.5, 0]);

  // Background gradient transition
  const bgGradient = useTransform(scrollYProgress, [0, 1], [
    'linear-gradient(180deg, #050d2e 0%, #050d2e 100%)',
    'linear-gradient(180deg, #030610 0%, #000000 100%)',
  ]);

  // Narrative line reveal thresholds
  const thresholds = [0.1, 0.3, 0.5, 0.7, 0.9];

  return (
    <section id="launch" ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden flex"
        style={{ background: bgGradient, zIndex: 'var(--z-content)' }}
      >
        {/* Telemetry panel — left side */}
        <div className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10">
          <TelemetryPanel progress={scrollYProgress} />
        </div>

        {/* Narrative copy — right side */}
        <div className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 max-w-xs">
          <div className="space-y-4">
            {LAUNCH_NARRATIVE.map((line, i) => (
              <NarrativeLine
                key={i}
                text={line}
                progress={scrollYProgress}
                threshold={thresholds[i]}
              />
            ))}
          </div>
        </div>

        {/* Rocket + flame — center */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div
            className="gpu-accelerated flex flex-col items-center"
            style={{
              y: shouldReduce ? 0 : rocketY,
              scale: shouldReduce ? 1 : rocketScale,
            }}
            data-cursor="hover"
          >
            <Rocket />
            <RocketFlame />
          </motion.div>

          {/* Exhaust trail */}
          <motion.div
            className="w-3 md:w-4 origin-top gpu-accelerated"
            style={{
              scaleY: shouldReduce ? 0 : exhaustScaleY,
              opacity: shouldReduce ? 0 : exhaustOpacity,
              height: '50vh',
              background: 'linear-gradient(180deg, rgba(255,92,26,0.6), rgba(255,170,0,0.2), transparent)',
              filter: 'blur(4px)',
            }}
          />
        </div>

        {/* Section title watermark */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <p className="font-display text-xs tracking-[0.3em] text-star-white/10 uppercase">
            IGNITION
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/** Single narrative line that reveals at a scroll threshold */
function NarrativeLine({ text, progress, threshold }) {
  const opacity = useTransform(progress, [threshold - 0.05, threshold + 0.05], [0, 1]);
  const y = useTransform(progress, [threshold - 0.05, threshold + 0.05], [30, 0]);

  return (
    <motion.p
      className="text-sm md:text-base text-star-white/70 leading-relaxed font-body"
      style={{ opacity, y }}
    >
      {text}
    </motion.p>
  );
}
