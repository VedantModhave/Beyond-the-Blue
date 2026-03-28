import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_TEXT = 'LOADING MISSION DATA...';

const containerVariants = {
  visible: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: '-100%',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

const progressVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 2.5, ease: 'easeInOut' },
  },
};

/**
 * Full-screen loader overlay. Types out text, fills progress bar, then exits.
 * Prevents scroll until dismissed.
 */
export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-space-black"
          style={{ zIndex: 'var(--z-loader)' }}
          variants={containerVariants}
          initial="visible"
          exit="exit"
          role="alert"
          aria-label="Loading mission data"
        >
          {/* Mission label */}
          <p className="font-display text-sm tracking-[0.3em] text-glow/60 mb-6 uppercase">
            Mission ARES-1
          </p>

          {/* Typing text */}
          <div className="font-display text-2xl md:text-3xl tracking-widest text-star-white mb-10">
            {LOADING_TEXT.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ minWidth: char === ' ' ? '0.5em' : 'auto' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full origin-left rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--color-electric), var(--color-glow))',
              }}
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>

          {/* Percentage counter */}
          <motion.p
            className="mt-4 font-body text-xs text-star-white/40 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            INITIALIZING SYSTEMS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
