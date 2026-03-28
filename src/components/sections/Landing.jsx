import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MarsMap from '../ui/MarsMap';

/* Curved suspension lines for a realistic look */
function Parachute() {
  const shouldReduce = useReducedMotion();

  // Root parachute sway
  const swayVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }
    }
  };

  const pendulumAnimation = shouldReduce ? {} : {
    rotate: [-3, 3, -3],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  };

  const bobAnimation = shouldReduce ? {} : {
    y: [-2, 2, -2],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  };

  return (
    <motion.div
      variants={swayVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-40 md:w-56 mx-auto relative z-20"
      style={{ originY: 0 }}
    >
      <motion.svg
        viewBox="0 0 200 180"
        fill="none"
        className="w-full h-auto drop-shadow-2xl"
        animate={pendulumAnimation}
        style={{ originY: 0, originX: '50%' }}
      >
        {/* Canopy outline */}
        <path
          d="M 20 80 Q 30 10, 100 5 Q 170 10, 180 80"
          stroke="var(--color-star-white)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Canopy fill segments */}
        <path d="M 20 80 Q 30 10, 100 5 Q 170 10, 180 80 Z" fill="var(--color-launch)" opacity="0.3" />
        <path d="M 60 80 Q 70 25, 100 5 Q 130 25, 140 80 Z" fill="var(--color-launch)" opacity="0.5" />

        {/* Curved suspension lines */}
        <path d="M 20 80 Q 55 120, 85 155" stroke="var(--color-star-white)" strokeWidth="0.5" opacity="0.4" />
        <path d="M 100 5 Q 100 80, 100 155" stroke="var(--color-star-white)" strokeWidth="0.5" opacity="0.3" />
        <path d="M 180 80 Q 145 120, 115 155" stroke="var(--color-star-white)" strokeWidth="0.5" opacity="0.4" />

        {/* Payload capsule with slight independent bob */}
        <motion.g animate={bobAnimation}>
          <rect x="85" y="155" width="30" height="20" rx="4" fill="#e8eaf0" opacity="0.9" />
          <rect x="85" y="155" width="15" height="20" rx="4" fill="#d0d3dd" opacity="0.9" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

/* Dust Storm Particles */
function DustStorm() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate 60 particles
    const items = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // starting viewport x %
      y: Math.random() * 100, // starting viewport y %
      size: 2 + Math.random() * 3, // 2-5px
      drift: 100 + Math.random() * 200, // horizontal drift distance
      duration: 3 + Math.random() * 4, // 3-7s duration
      delay: Math.random() * 2, // staggered start
    }));
    setParticles(items);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }} // Activates 1s after section entry
      viewport={{ once: true }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: 'rgba(180, 80, 20, 0.5)',
            boxShadow: '0 0 4px rgba(180,80,20,0.4)'
          }}
          animate={{
            x: p.drift,
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </motion.div>
  );
}

/* Surface Conditions Bar */
function StatBar({ label, value, displayValue, barColor, delay = 0 }) {
  return (
    <motion.div
      className="space-y-1.5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-baseline">
        <span className="text-xs tracking-[0.15em] text-star-white/50 uppercase">{label}</span>
        <span className="font-display text-sm" style={{ color: barColor }}>{displayValue}</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: barColor, boxShadow: `0 0 10px ${barColor}` }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Shimmer effect inside the bar fill */}
          <motion.div 
            className="absolute top-0 bottom-0 w-8 bg-white/40 skew-x-[-20deg]"
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, delay: delay + 1.5, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Landing section — Viewport shake, cinematic sequence, complete dust and parallax elements.
 */
export default function Landing() {
  const shouldReduce = useReducedMotion();

  // Cinematic Shake Effect Delay 1.2s
  const shakeVariants = {
    hidden: { x: 0 },
    visible: shouldReduce ? { x: 0 } : {
      x: [0, -10, 10, -8, 8, -5, 5, -2, 2, 0],
      transition: { duration: 0.8, ease: 'easeInOut', delay: 1.2 }
    }
  };

  return (
    <section
      id="landing"
      className="relative min-h-screen overflow-hidden flex flex-col justify-end"
      style={{
        zIndex: 'var(--z-content)',
        background: 'linear-gradient(180deg, #1a0400 0%, #5c1500 50%, #c1440e 100%)'
      }}
    >
      {/* 6. Atmosphere & Visual Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(193,68,14,0.4) 0%, transparent 60%)' }}
      />
      
      {/* Terrain Silhouette */}
      <div 
        className="absolute bottom-0 w-full h-48 bg-[#0a0200] z-0"
        style={{
          clipPath: 'polygon(0% 100%, 0% 60%, 15% 40%, 30% 65%, 45% 30%, 60% 70%, 75% 45%, 90% 60%, 100% 35%, 100% 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 w-full h-32 bg-[#170500] z-0 opacity-80"
        style={{
          clipPath: 'polygon(0% 100%, 0% 40%, 20% 70%, 40% 30%, 55% 55%, 70% 20%, 85% 60%, 100% 40%, 100% 100%)'
        }}
      />

      <DustStorm />

      {/* Main Content Wrapper (Shakes on entry) */}
      <motion.div
        className="relative z-20 w-full flex-grow flex flex-col pt-24 pb-12"
        variants={shakeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-grow">
          
          {/* LEFT: Entry Sequence & Parachute */}
          <div className="flex flex-col items-center justify-center text-center lg:text-left lg:items-start h-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-xs tracking-[0.3em] text-launch/60 mb-2">
                SECTION 04
              </p>
            </motion.div>

            <motion.h2
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-star-white mb-4"
              initial={{ y: -60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true }}
            >
              RED HORIZON
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-star-white/50 tracking-wide max-w-md mx-auto lg:mx-0 mb-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Atmospheric entry. 12,000 km/h to zero in 7 minutes. Turbulence expected as we pierce the Martian atmosphere.
            </motion.p>
            
            <Parachute />
          </div>

          {/* RIGHT: Mars Map & Conditions */}
          <div className="flex flex-col justify-end space-y-12">
            
            {/* Mars Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <MarsMap />
            </motion.div>

            {/* Surface Conditions Grid */}
            <div className="w-full max-w-md mx-auto lg:mx-0 space-y-6">
              <h3 className="font-display text-lg tracking-[0.2em] text-glow/60 border-b border-glow/20 pb-2">
                SURFACE CONDITIONS ALIVE
              </h3>
              <StatBar 
                label="Surface Temperature" 
                value={45} 
                displayValue="-80°C" 
                barColor="#4fc3f7" 
                delay={1.6} 
              />
              <StatBar 
                label="Gravity Level" 
                value={38} 
                displayValue="38% OF EARTH" 
                barColor="#ff9800" 
                delay={1.8} 
              />
              <StatBar 
                label="Atmospheric Density" 
                value={95} 
                displayValue="95% CO₂" 
                barColor="#ef5350" 
                delay={2.0} 
              />
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
