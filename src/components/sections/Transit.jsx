import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import CrewCard from '../ui/CrewCard';
import OrbitPath from '../ui/OrbitPath';
import { CREW, TRANSIT_STOPS } from '../../constants/data';

/* Small CSS sphere for Earth/Mars visuals in the strip */
function CSSPlanet({ color, size, glow, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-full gpu-accelerated"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${glow}, ${color} 60%, #000 100%)`,
          boxShadow: `0 0 40px ${glow}40, inset -8px -8px 20px rgba(0,0,0,0.5)`,
        }}
      />
      <span className="font-display text-xs tracking-[0.2em] text-star-white/40">{label}</span>
    </div>
  );
}

/* Animated asteroid field particles */
function AsteroidField() {
  const asteroids = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 60,
        size: 2 + Math.random() * 4,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {asteroids.map((a) => (
        <motion.div
          key={a.id}
          className="absolute rounded-full bg-star-white/30"
          style={{
            left: `${a.x}%`,
            top: `${a.y}%`,
            width: a.size,
            height: a.size,
          }}
          animate={{
            x: [0, -60 + Math.random() * 120, 0],
            y: [0, -30 + Math.random() * 60, 0],
            opacity: [0, a.opacity, 0],
          }}
          transition={{
            duration: a.duration,
            delay: a.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Transit section — 400vh sticky container with horizontal scroll strip.
 * 5 stops: Earth receding, Month 1, Asteroid belt, Month 4, Mars approaching.
 */
export default function Transit() {
  const shouldReduce = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal movement (desktop horizontal strip)
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw']);

  return (
    <section id="transit" ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden relative" style={{ zIndex: 'var(--z-content)' }}>
        {/* Orbit path overlay (stays within sticky container) */}
        <OrbitPath progress={scrollYProgress} />
        {/* Mobile: vertical scroll, Desktop: horizontal strip */}
        <div className="block md:hidden">
          {/* Mobile vertical layout */}
          <div className="h-screen overflow-y-auto px-6 py-20 space-y-16">
            {TRANSIT_STOPS.map((stop, i) => (
              <MobileStop key={stop.id} stop={stop} index={i} />
            ))}

            {/* Crew cards in mobile */}
            <div className="space-y-4">
              <h3 className="font-display text-xl tracking-[0.15em] text-glow mb-4">YOUR CREW</h3>
              {CREW.map((member, i) => (
                <CrewCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop horizontal strip */}
        <motion.div
          className="hidden md:flex h-full items-center"
          style={{
            width: '500vw',
            x: shouldReduce ? 0 : xTranslate,
          }}
        >
          {/* Stop 1: Earth receding */}
          <div className="w-screen h-full flex items-center justify-center px-20 flex-shrink-0">
            <div className="flex items-center gap-20">
              <CSSPlanet
                color="#1a6cf6"
                glow="#4488ff"
                size="120px"
                label="EARTH"
              />
              <div className="max-w-md">
                <p className="font-display text-xs tracking-[0.2em] text-glow/50 mb-2">
                  {TRANSIT_STOPS[0].title.toUpperCase()}
                </p>
                <p className="text-lg text-star-white/70 leading-relaxed">
                  {TRANSIT_STOPS[0].text}
                </p>
              </div>
            </div>
          </div>

          {/* Stop 2: Month 1 — Systems Check */}
          <div className="w-screen h-full flex items-center justify-center px-20 flex-shrink-0">
            <div className="max-w-2xl text-center">
              <p className="font-display text-6xl tracking-[0.2em] text-star-white/10 mb-4">
                MONTH 01
              </p>
              <p className="font-display text-xl tracking-[0.15em] text-glow mb-3">
                {TRANSIT_STOPS[1].title.toUpperCase()}
              </p>
              <p className="text-base text-star-white/60 leading-relaxed italic">
                {TRANSIT_STOPS[1].text}
              </p>
            </div>
          </div>

          {/* Stop 3: Asteroid belt + crew cards */}
          <div className="w-screen h-full flex items-center justify-center px-12 flex-shrink-0 relative">
            <AsteroidField />
            <div className="relative z-10 w-full max-w-4xl">
              <p className="font-display text-xl tracking-[0.15em] text-glow mb-8 text-center">
                {TRANSIT_STOPS[2].title.toUpperCase()}
              </p>
              <p className="text-center text-star-white/50 mb-10 max-w-md mx-auto">
                {TRANSIT_STOPS[2].text}
              </p>

              {/* Crew cards 2x2 grid */}
              <h3 className="font-display text-lg tracking-[0.2em] text-star-white/30 mb-5 text-center">
                YOUR CREW
              </h3>
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {CREW.map((member, i) => (
                  <CrewCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Stop 4: Month 4 — Halfway */}
          <div className="w-screen h-full flex items-center justify-center px-20 flex-shrink-0">
            <div className="max-w-2xl text-center">
              <p className="font-display text-6xl tracking-[0.2em] text-star-white/10 mb-4">
                MONTH 04
              </p>
              <p className="font-display text-xl tracking-[0.15em] text-glow mb-3">
                {TRANSIT_STOPS[3].title.toUpperCase()}
              </p>
              <p className="text-base text-star-white/60 leading-relaxed italic">
                {TRANSIT_STOPS[3].text}
              </p>

              {/* Tiny sun */}
              <motion.div
                className="mx-auto mt-8 rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: 'radial-gradient(circle, #fff 0%, #ffdd44 40%, transparent 70%)',
                  boxShadow: '0 0 30px #ffdd4480, 0 0 60px #ffdd4440',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <p className="text-xs text-star-white/20 mt-2 tracking-widest">THE SUN</p>
            </div>
          </div>

          {/* Stop 5: Mars approaching */}
          <div className="w-screen h-full flex items-center justify-center px-20 flex-shrink-0">
            <div className="flex items-center gap-20">
              <div className="max-w-md text-right">
                <p className="font-display text-xs tracking-[0.2em] text-glow/50 mb-2">
                  {TRANSIT_STOPS[4].title.toUpperCase()}
                </p>
                <p className="text-lg text-star-white/70 leading-relaxed">
                  {TRANSIT_STOPS[4].text}
                </p>
              </div>
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <CSSPlanet
                  color="#c1440e"
                  glow="#e86830"
                  size="160px"
                  label="MARS"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Mobile-specific stop rendering */
function MobileStop({ stop, index }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {stop.month && (
        <p className="font-display text-4xl tracking-[0.2em] text-star-white/10 mb-2">
          MONTH {String(stop.month).padStart(2, '0')}
        </p>
      )}
      <p className="font-display text-lg tracking-[0.15em] text-glow mb-2">
        {stop.title.toUpperCase()}
      </p>
      <p className="text-sm text-star-white/60 leading-relaxed">{stop.text}</p>
    </motion.div>
  );
}
