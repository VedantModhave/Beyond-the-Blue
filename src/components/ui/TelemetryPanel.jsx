import { useRef, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { TELEMETRY_TARGETS } from '../../constants/data';

/**
 * Glassmorphism telemetry panel showing altitude, velocity, g-force, fuel.
 * Values animate based on scroll progress.
 * @param {{ progress: MotionValue<number> }} props
 */
export default function TelemetryPanel({ progress }) {
  const altitude = useTransform(progress, [0, 0.8], [0, TELEMETRY_TARGETS.altitude]);
  const velocity = useTransform(progress, [0, 0.7], [0, TELEMETRY_TARGETS.velocity]);
  const gForce = useTransform(progress, [0, 0.3, 0.6, 1], [1.0, 3.2, 3.2, 1.0]);
  const fuel = useTransform(progress, [0, 1], [100, 0]);

  return (
    <motion.div
      className="glass-strong p-6 w-full max-w-xs relative overflow-hidden"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      {/* Scan line effect */}
      <div className="scan-line absolute inset-0 pointer-events-none" />

      {/* Header */}
      <h3 className="font-display text-lg tracking-[0.2em] text-glow mb-5 relative">
        MISSION TELEMETRY
      </h3>

      {/* Stats */}
      <div className="space-y-4">
        <TelemetryStat label="ALTITUDE" value={altitude} unit="km" decimals={0} />
        <TelemetryStat label="VELOCITY" value={velocity} unit="km/h" decimals={0} />
        <TelemetryStat label="G-FORCE" value={gForce} unit="G" decimals={1} />
        <TelemetryStat label="FUEL" value={fuel} unit="%" decimals={0} />
      </div>

      {/* Status indicator */}
      <div className="mt-5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-star-white/50 tracking-wider">SYSTEMS NOMINAL</span>
      </div>
    </motion.div>
  );
}

function TelemetryStat({ label, value, unit, decimals = 0 }) {
  return (
    <div className="border-b border-white/5 pb-3">
      <span className="text-[10px] tracking-[0.15em] text-star-white/40 uppercase">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className="font-display text-2xl text-star-white tabular-nums">
          <TelemetryValue value={value} decimals={decimals} />
        </span>
        <span className="text-xs text-star-white/40">{unit}</span>
        <span className="ml-auto text-glow/60 text-sm animate-pulse">▌</span>
      </div>
    </div>
  );
}

/** Subscribes to a MotionValue and renders the formatted number. */
function TelemetryValue({ value, decimals }) {
  const ref = useRef(null);

  useEffect(() => {
    const unsub = value.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Number(v).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
    });
    return () => unsub();
  }, [value, decimals]);

  return <span ref={ref}>0</span>;
}

