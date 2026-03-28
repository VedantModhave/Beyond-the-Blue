import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MarsMap from '../ui/MarsMap';

/* Parachute SVG component */
function Parachute() {
  return (
    <motion.svg
      viewBox="0 0 200 180"
      fill="none"
      className="w-40 md:w-56 mx-auto"
      initial={{ scaleY: 0, opacity: 0, originY: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      {/* Canopy */}
      <motion.path
        d="M 20 80 Q 30 10, 100 5 Q 170 10, 180 80"
        stroke="var(--color-star-white)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="300"
        initial={{ strokeDashoffset: 300 }}
        whileInView={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        viewport={{ once: true }}
      />
      {/* Canopy fill segments */}
      <path d="M 20 80 Q 30 10, 100 5 Q 170 10, 180 80 Z" fill="var(--color-launch)" opacity="0.15" />
      <path d="M 60 80 Q 70 25, 100 5 Q 130 25, 140 80 Z" fill="var(--color-launch)" opacity="0.25" />

      {/* Suspension lines */}
      <motion.line
        x1="20" y1="80" x2="90" y2="160"
        stroke="var(--color-star-white)" strokeWidth="0.5" opacity="0.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.line
        x1="100" y1="5" x2="100" y2="160"
        stroke="var(--color-star-white)" strokeWidth="0.5" opacity="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        viewport={{ once: true }}
      />
      <motion.line
        x1="180" y1="80" x2="110" y2="160"
        stroke="var(--color-star-white)" strokeWidth="0.5" opacity="0.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        viewport={{ once: true }}
      />

      {/* Payload capsule */}
      <rect x="85" y="155" width="30" height="20" rx="4" fill="#e8eaf0" opacity="0.8" />
      <rect x="85" y="155" width="15" height="20" rx="4" fill="#d0d3dd" opacity="0.8" />

      {/* Sway animation */}
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="-2 100 5; 2 100 5; -2 100 5"
        dur="4s"
        repeatCount="indefinite"
      />
    </motion.svg>
  );
}

/* Mars stats bar */
function StatBar({ label, value, displayValue, delay = 0 }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs tracking-[0.15em] text-star-white/50 uppercase">{label}</span>
        <span className="font-display text-sm text-glow">{displayValue}</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--color-mars-red), var(--color-launch))',
          }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

/**
 * Landing section — viewport shake entry, dust storm, parachute, Mars map, stats.
 */
export default function Landing() {
  const shouldReduce = useReducedMotion();

  // Dust particles
  const dustParticles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 3,
      })),
    []
  );

  // Shake keyframes
  const shakeVariants = {
    hidden: { x: 0 },
    visible: shouldReduce
      ? { x: 0 }
      : {
          x: [0, -8, 8, -6, 6, -4, 4, 0],
          transition: { duration: 0.6, ease: 'easeOut' },
        },
  };

  return (
    <section
      id="landing"
      className="relative min-h-screen overflow-hidden"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a0800 0%, #2d1000 30%, #3d1500 100%)',
        }}
      />

      {/* Dust storm particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dustParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: 'var(--color-dust)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{
              x: [-100 + Math.random() * 200, 100 - Math.random() * 200],
              y: [0, -20 + Math.random() * 40],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            viewport={{ once: false }}
          />
        ))}
      </div>

      {/* Shaking content wrapper */}
      <motion.div
        className="relative z-10"
        variants={shakeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-xs tracking-[0.3em] text-launch/60 mb-2">
              SECTION 04
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-star-white">
              RED HORIZON
            </h2>
            <p className="mt-3 text-sm text-star-white/40 tracking-wide">
              Atmospheric entry. 12,000 km/h to zero in 7 minutes.
            </p>
          </motion.div>

          {/* Parachute */}
          <div className="mb-16">
            <Parachute />
          </div>

          {/* Mars map */}
          <div className="mb-16">
            <MarsMap />
          </div>

          {/* Stats bars */}
          <motion.div
            className="max-w-lg mx-auto space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-lg tracking-[0.2em] text-glow/60 mb-4">
              SURFACE CONDITIONS
            </h3>
            <StatBar label="Surface Temperature" value={40} displayValue="-80°C avg" delay={0} />
            <StatBar label="Gravity" value={38} displayValue="38% of Earth" delay={0.2} />
            <StatBar label="Atmosphere — CO₂" value={95} displayValue="95% CO₂" delay={0.4} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
