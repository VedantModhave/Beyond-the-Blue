import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const letterVariants = {
  hidden: { y: 80, opacity: 0, rotateX: -40 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const reducedLetterVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.02, duration: 0.3 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const HEADLINE = 'JOURNEY TO MARS';

/**
 * Hero section: headline letter animation, countdown, launch button with particles.
 */
export default function Hero() {
  const shouldReduce = useReducedMotion();
  const [countdown, setCountdown] = useState(10);
  const [countdownDone, setCountdownDone] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [particles, setParticles] = useState([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCountdownDone(true);
      setShowFlash(true);
      const flashTimer = setTimeout(() => setShowFlash(false), 200);
      return () => clearTimeout(flashTimer);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Format countdown
  const formatCountdown = (val) => {
    const abs = Math.max(0, val);
    const mins = String(Math.floor(abs / 60)).padStart(2, '0');
    const secs = String(abs % 60).padStart(2, '0');
    return `T-00:${mins}:${secs}`;
  };

  // Launch button click
  const handleLaunch = useCallback(() => {
    // Create particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360,
    }));
    setParticles(newParticles);

    // Flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 150);

    // Scroll to launch section
    setTimeout(() => {
      const el = document.getElementById('launch');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 600);

    // Clean particles
    setTimeout(() => setParticles([]), 1000);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Flash overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-white/20 z-40 pointer-events-none" />
      )}

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-3xl">
          {/* Mission label */}
          <motion.p
            className="font-display text-sm md:text-base tracking-[0.3em] text-glow/70 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            MISSION ARES-1 // LAUNCH DAY
          </motion.p>

          {/* Headline */}
          <h1
            className="font-display leading-none mb-6 flex flex-wrap"
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 9rem)',
              perspective: '600px',
            }}
          >
            {HEADLINE.split(' ').map((word, wordIndex, wordsArray) => {
              const startIndex = wordsArray.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
              return (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
                  {word.split('').map((char, cIndex) => {
                    const globalIndex = startIndex + cIndex;
                    const isMarsLetter = globalIndex >= 11;
                    return (
                      <motion.span
                        key={cIndex}
                        custom={globalIndex}
                        variants={shouldReduce ? reducedLetterVariants : letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block gpu-accelerated"
                        style={{
                          color: isMarsLetter ? 'var(--color-launch)' : 'var(--color-star-white)',
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          {/* Countdown */}
          <motion.div
            className="font-display text-2xl md:text-4xl tracking-[0.2em] text-glow mb-6 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              {formatCountdown(countdown).split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block flip-card"
                >
                  <span className="flip-card-inner">
                    {char}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Subtitle (appears after countdown) */}
          {countdownDone && (
            <motion.p
              className="text-base md:text-lg text-star-white/60 max-w-lg leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              225,000,000 km. 7 months. One way or another — we go.
            </motion.p>
          )}

          {/* Launch button */}
          <motion.div className="relative inline-block" variants={fadeUp} initial="hidden" animate="visible">
            <motion.button
              className="relative px-8 py-3 rounded-full font-display text-lg tracking-[0.2em] border border-launch text-launch overflow-hidden gpu-accelerated"
              whileHover={{
                backgroundColor: 'var(--color-launch)',
                color: '#ffffff',
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLaunch}
              data-cursor="hover"
              aria-label="Launch — scroll to next section"
              tabIndex={0}
            >
              <span className="relative z-10">▷ LAUNCH</span>
            </motion.button>

            {/* Particle burst */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-launch"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((p.angle * Math.PI) / 180) * 120,
                  y: Math.sin((p.angle * Math.PI) / 180) * 120,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-star-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs tracking-[0.2em] font-display">SCROLL TO LAUNCH</span>
        <motion.span
          className="text-lg"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
