import { useRef, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';

/**
 * SVG arc from Earth to Mars with animated stroke and traveling dot.
 * @param {{ progress: MotionValue<number> }} props
 */
export default function OrbitPath({ progress }) {
  const dashOffset = useTransform(progress, [0, 1], [1, 0]);
  const dotPosition = useTransform(progress, [0, 1], [0, 100]);

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[80vw] max-w-3xl z-30 pointer-events-none hidden md:block">
      <svg viewBox="0 0 800 80" fill="none" className="w-full">
        {/* Path background */}
        <path
          d="M 40 60 Q 400 -20 760 60"
          stroke="rgba(232,234,240,0.08)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
        />

        {/* Animated path */}
        <motion.path
          d="M 40 60 Q 400 -20 760 60"
          stroke="var(--color-glow)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="1"
          strokeDashoffset={dashOffset}
          pathLength={1}
          style={{
            pathLength: useTransform(progress, [0, 1], [0, 1]),
          }}
          opacity={0.6}
        />

        {/* Earth label */}
        <circle cx="40" cy="60" r="6" fill="var(--color-electric)" opacity="0.8" />
        <text x="40" y="78" textAnchor="middle" fill="var(--color-star-white)" fontSize="8" opacity="0.5" fontFamily="Inter">
          EARTH
        </text>

        {/* Mars label */}
        <circle cx="760" cy="60" r="6" fill="var(--color-mars-red)" opacity="0.8" />
        <text x="760" y="78" textAnchor="middle" fill="var(--color-star-white)" fontSize="8" opacity="0.5" fontFamily="Inter">
          MARS
        </text>

        {/* Traveling dot */}
        <motion.circle
          r="4"
          fill="var(--color-glow)"
          filter="url(#glow)"
        >
          <animateMotion
            dur="1s"
            fill="freeze"
            path="M 40 60 Q 400 -20 760 60"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
        </motion.circle>

        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Progress text */}
      <div className="flex justify-between mt-1 px-6 text-[10px] tracking-[0.15em] text-star-white/30">
        <span>DEPARTURE</span>
        <ProgressBreadcrumb progress={progress} />
        <span>ARRIVAL</span>
      </div>
    </div>
  );
}

function ProgressBreadcrumb({ progress }) {
  const pct = useTransform(progress, [0, 1], [0, 100]);

  return (
    <motion.span className="text-glow/60">
      <BreadcrumbValue value={pct} />
    </motion.span>
  );
}

function BreadcrumbValue({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const unsub = value.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}% COMPLETE`;
      }
    });
    return () => unsub();
  }, [value]);

  return <span ref={ref}>0% COMPLETE</span>;
}

