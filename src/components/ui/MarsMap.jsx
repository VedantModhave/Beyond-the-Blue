import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MARS_ZONES } from '../../constants/data';

const popoverVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 8,
    transition: { duration: 0.2 },
  },
};

/**
 * Simplified Mars surface map with 3 clickable zones and info popovers.
 */
export default function MarsMap() {
  const [activeZone, setActiveZone] = useState(null);

  const handleZoneClick = (zoneId) => {
    setActiveZone(activeZone === zoneId ? null : zoneId);
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto aspect-[16/10] rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
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
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 62.5">
          <path d="M0,35 Q25,30 50,33 T100,35" stroke="#d4956a" strokeWidth="0.3" fill="none" />
          <path d="M0,42 Q30,38 60,41 T100,40" stroke="#d4956a" strokeWidth="0.2" fill="none" />
          <path d="M0,48 Q40,45 70,47 T100,48" stroke="#d4956a" strokeWidth="0.15" fill="none" />
          <circle cx="20" cy="28" r="8" stroke="#a04010" strokeWidth="0.3" fill="none" opacity="0.4" />
          <path d="M45,50 Q55,45 75,50" stroke="#8b2500" strokeWidth="0.5" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(232,234,240,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,234,240,0.3) 1px, transparent 1px)',
          backgroundSize: '10% 10%',
        }}
      />

      {/* Zone markers */}
      {MARS_ZONES.map((zone) => (
        <div
          key={zone.id}
          className="absolute"
          style={{
            left: `${zone.coords.x}%`,
            top: `${zone.coords.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 -m-3 rounded-full border border-glow/40"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* Clickable marker */}
          <button
            className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm glass border border-glow/30 hover:border-glow transition-colors"
            onClick={() => handleZoneClick(zone.id)}
            data-cursor="hover"
            aria-label={`View info about ${zone.name}`}
            tabIndex={0}
          >
            {zone.icon}
          </button>

          {/* Popover */}
          <AnimatePresence>
            {activeZone === zone.id && (
              <motion.div
                className="absolute z-20 bottom-12 left-1/2 -translate-x-1/2 w-64 md:w-72 glass-strong p-4 rounded-xl"
                variants={popoverVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-display text-base tracking-wider text-glow">
                    {zone.name}
                  </h4>
                  <button
                    className="text-star-white/40 hover:text-star-white text-xs ml-2"
                    onClick={() => setActiveZone(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-dust tracking-wide mb-2">{zone.elevation}</p>
                <p className="text-xs text-star-white/70 leading-relaxed">{zone.fact}</p>

                {/* Notch arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white/5 border-r border-b border-white/10" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Map title */}
      <div className="absolute top-3 left-4">
        <p className="font-display text-xs tracking-[0.2em] text-glow/50">MARS SURFACE MAP</p>
      </div>

      {/* Coordinate readout */}
      <div className="absolute bottom-3 right-4 text-[10px] text-star-white/30 font-mono">
        4.5°N, 135.9°E — ISIDIS PLANITIA
      </div>
    </motion.div>
  );
}
