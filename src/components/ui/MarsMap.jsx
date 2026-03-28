import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MARS_ZONES } from '../../constants/data';

/**
 * Simplified Mars surface map with 3 interactive zones.
 * Hover-based popovers with smart top/bottom positioning.
 */
export default function MarsMap() {
  const [activeZone, setActiveZone] = useState(null);
  const hideTimer = useRef(null);

  const handleMouseEnter = (zoneId) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveZone(zoneId);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => {
      setActiveZone(null);
    }, 100);
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto aspect-[16/10]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      {/* Background container (clips the gradients and svg, but allows popovers outside) */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/5">
        {/* Mars surface background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, #b8541a 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, #a04010 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, #8b2500 0%, transparent 60%),
              linear-gradient(180deg, #c1440e 0%, #8b2500 40%, #5a1800 100%)
            `,
          }}
        >
          {/* Surface texture lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 62.5" preserveAspectRatio="none">
            <path d="M0,35 Q25,30 50,33 T100,35" stroke="#d4956a" strokeWidth="0.3" fill="none" />
            <path d="M0,42 Q30,38 60,41 T100,40" stroke="#d4956a" strokeWidth="0.2" fill="none" />
            <path d="M0,48 Q40,45 70,47 T100,48" stroke="#d4956a" strokeWidth="0.15" fill="none" />
            <circle cx="20" cy="28" r="8" stroke="#a04010" strokeWidth="0.3" fill="none" opacity="0.4" />
            <path d="M45,50 Q55,45 75,50" stroke="#8b2500" strokeWidth="0.5" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(232,234,240,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,234,240,0.3) 1px, transparent 1px)',
            backgroundSize: '10% 10%',
          }}
        />
        
        {/* Map title inside container bounds */}
        <div className="absolute top-3 left-4 pointer-events-none">
          <p className="font-display text-xs tracking-[0.2em] text-glow/50">MARS SURFACE MAP</p>
        </div>

        {/* Coordinate readout inside container bounds */}
        <div className="absolute bottom-3 right-4 text-[10px] text-star-white/30 font-mono pointer-events-none">
          4.5°N, 135.9°E — ISIDIS PLANITIA
        </div>
      </div>

      {/* Zone markers — Rendered outside hidden overflow to allow large popovers */}
      <div className="absolute inset-0">
        {MARS_ZONES.map((zone) => {
          const isTopHalf = zone.coords.y < 50;
          const isActive = activeZone === zone.id;
          
          return (
            <div
              key={zone.id}
              className="absolute"
              style={{
                left: `${zone.coords.x}%`,
                top: `${zone.coords.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 50 : 10,
              }}
              onMouseEnter={() => handleMouseEnter(zone.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Ping animation (pulses to draw attention) */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-full border border-glow shadow-[0_0_15px_var(--color-glow)] pointer-events-none"
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.8, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />

              {/* Marker Button */}
              <div
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm glass border border-glow/30 hover:bg-glow/20 transition-colors cursor-pointer"
                data-cursor="hover"
                aria-label={`View info about ${zone.name}`}
              >
                {zone.icon}
              </div>

              {/* Smart Popover */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute z-50 left-1/2 -translate-x-1/2 w-64 md:w-80 backdrop-blur-xl bg-space-black/70 border border-glow/30 p-5 rounded-xl shadow-2xl"
                    style={{
                      // Smart positioning logic: BELOW if top half, ABOVE if bottom half
                      top: isTopHalf ? 'calc(100% + 16px)' : 'auto',
                      bottom: !isTopHalf ? 'calc(100% + 16px)' : 'auto',
                    }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: isTopHalf ? -10 : 10 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } },
                      exit: { opacity: 0, scale: 0.95, y: isTopHalf ? -5 : 5, transition: { duration: 0.15 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Notch arrow */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-space-black/70 backdrop-blur-xl pointer-events-none"
                      style={{
                        top: isTopHalf ? '-8px' : 'auto',
                        bottom: !isTopHalf ? '-8px' : 'auto',
                        borderTop: isTopHalf ? '1px solid rgba(0,212,255,0.3)' : 'none',
                        borderLeft: isTopHalf ? '1px solid rgba(0,212,255,0.3)' : 'none',
                        borderBottom: !isTopHalf ? '1px solid rgba(0,212,255,0.3)' : 'none',
                        borderRight: !isTopHalf ? '1px solid rgba(0,212,255,0.3)' : 'none',
                      }}
                    />

                    <div className="relative z-10">
                      <h4 className="font-display text-xl tracking-wider text-glow m-0 leading-none">
                        {zone.name}
                      </h4>
                      <p className="font-mono text-[10px] text-star-white/40 tracking-widest uppercase mt-2">
                        {zone.coords.x.toFixed(1)}°N, {zone.coords.y.toFixed(1)}°E
                      </p>
                      
                      {/* Thin divider */}
                      <div className="w-full h-px bg-glow/20 my-3" />
                      
                      <p className="text-[13px] text-star-white/80 leading-relaxed m-0 font-body">
                        {zone.fact}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
