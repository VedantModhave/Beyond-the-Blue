import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import Accordion from '../ui/Accordion';
import { DEBRIEF_FACTS } from '../../constants/data';

/* SVG flag with pole */
function Flag() {
  return (
    <div className="flex flex-col items-center">
      {/* Flag + pole */}
      <div className="relative">
        {/* Pole */}
        <motion.div
          className="w-1 bg-gradient-to-b from-star-white to-star-white/60 mx-auto origin-bottom"
          style={{ height: 120 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />

        {/* Flag cloth */}
        <motion.div
          className="absolute top-0 left-1 w-20 h-14 rounded-r-sm overflow-hidden animate-waveflag"
          initial={{ scaleX: 0, opacity: 0, originX: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Flag design — simplified Mars flag */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-mars-red to-launch" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-star-white/80" />
            </div>
            {/* Wave overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Base */}
      <div className="w-6 h-1.5 bg-star-white/30 rounded-full mt-0.5" />
    </div>
  );
}

/* Confetti burst */
function ConfettiBurst() {
  const confetti = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (i / 20) * 360,
        distance: 60 + Math.random() * 80,
        color: ['#ff5c1a', '#1a6cf6', '#00d4ff', '#c1440e', '#d4956a', '#e8eaf0'][i % 6],
        size: 3 + Math.random() * 5,
        duration: 0.8 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <>
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-sm"
          style={{
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            top: '50%',
            left: '50%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            x: Math.cos((c.angle * Math.PI) / 180) * c.distance,
            y: Math.sin((c.angle * Math.PI) / 180) * c.distance - 40,
            opacity: 0,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: c.duration, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

/**
 * Conclusion section — Mars horizon, flag plant, confetti, accordion debrief, share CTA.
 */
export default function Conclusion() {
  const shouldReduce = useReducedMotion();
  const { x: parallaxX, y: parallaxY } = useMouseParallax();
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Trigger confetti when flag appears
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1200);
    const hideTimer = setTimeout(() => setShowConfetti(false), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShareTwitter = useCallback(() => {
    const text = encodeURIComponent('I just traveled 225,000,000 km to Mars! 🚀🔴 #JourneyToMars #ARES1');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  }, []);

  const handleShareLinkedIn = useCallback(() => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  }, []);

  return (
    <section
      id="conclusion"
      className="relative min-h-screen overflow-hidden"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Mars horizon background */}
      <div className="absolute inset-0">
        {/* Sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #2d0e00 0%, #8b2500 60%, #c1440e 85%, #d4956a 100%)',
          }}
        />

        {/* Stars parallax layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: shouldReduce ? 0 : parallaxX,
            y: shouldReduce ? 0 : parallaxY,
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-star-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                width: 1 + Math.random() * 2,
                height: 1 + Math.random() * 2,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Terrain silhouette parallax */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            x: shouldReduce ? 0 : parallaxX,
            height: '30%',
          }}
        >
          <svg viewBox="0 0 1440 300" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,300 L0,200 Q100,150 200,180 Q350,100 500,160 Q600,120 700,150 Q850,80 1000,140 Q1100,100 1200,130 Q1300,90 1440,120 L1440,300 Z"
              fill="#1a0800"
            />
            <path
              d="M0,300 L0,230 Q150,200 300,220 Q450,180 600,210 Q750,170 900,200 Q1050,160 1200,190 Q1350,170 1440,180 L1440,300 Z"
              fill="#0d0400"
            />
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-xs tracking-[0.3em] text-glow/50 mb-2">SECTION 05</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-star-white">
            A NEW WORLD
          </h2>
        </motion.div>

        {/* Flag plant with confetti */}
        <div className="relative flex justify-center mb-20">
          <Flag />
          {showConfetti && <ConfettiBurst />}
        </div>

        {/* Quote */}
        <motion.blockquote
          className="text-center text-xl md:text-2xl lg:text-3xl italic text-star-white/70 max-w-3xl mx-auto mb-20 leading-relaxed"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          "That's one small step off Earth, one giant leap for our species."
        </motion.blockquote>

        {/* Mission Debrief Accordion */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-xl tracking-[0.2em] text-glow text-center mb-8">
            MISSION DEBRIEF
          </h3>
          <Accordion items={DEBRIEF_FACTS} />
        </motion.div>

        {/* Share CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-star-white/50 mb-6">
            You just traveled 225,000,000 km. Share the journey.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Twitter / X */}
            <button
              className="px-5 py-2.5 rounded-full glass text-sm font-display tracking-wider text-star-white hover:bg-white/10 transition-colors"
              onClick={handleShareTwitter}
              data-cursor="hover"
              aria-label="Share on Twitter"
              tabIndex={0}
            >
              𝕏 SHARE
            </button>

            {/* LinkedIn */}
            <button
              className="px-5 py-2.5 rounded-full glass text-sm font-display tracking-wider text-star-white hover:bg-white/10 transition-colors"
              onClick={handleShareLinkedIn}
              data-cursor="hover"
              aria-label="Share on LinkedIn"
              tabIndex={0}
            >
              in SHARE
            </button>

            {/* Copy Link */}
            <button
              className="px-5 py-2.5 rounded-full glass text-sm font-display tracking-wider text-star-white hover:bg-white/10 transition-colors min-w-[130px]"
              onClick={handleCopyLink}
              data-cursor="hover"
              aria-label="Copy link"
              tabIndex={0}
            >
              {copied ? '✓ COPIED' : '🔗 COPY LINK'}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/5 text-xs text-star-white/20 tracking-widest">
            <p>MISSION ARES-1 // JOURNEY TO MARS</p>
            <p className="mt-1">AN INTERACTIVE EXPERIENCE</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-star-white/60 hover:text-glow transition-colors z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleScrollToTop}
          data-cursor="hover"
          aria-label="Scroll to top"
          tabIndex={0}
        >
          ↑
        </motion.button>
      )}
    </section>
  );
}
