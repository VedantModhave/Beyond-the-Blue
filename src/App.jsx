import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import NavDots from './components/NavDots';
import StarField from './components/StarField';
import Hero from './components/sections/Hero';
import { useActiveSection } from './hooks/useScrollProgress';

/* Lazy load heavier sections for performance */
const Launch = lazy(() => import('./components/sections/Launch'));
const Transit = lazy(() => import('./components/sections/Transit'));
const Landing = lazy(() => import('./components/sections/Landing'));
const Conclusion = lazy(() => import('./components/sections/Conclusion'));

/* Simple suspense fallback */
function SectionFallback() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="font-display text-sm tracking-[0.2em] text-star-white/20 animate-pulse">
        LOADING SECTION...
      </div>
    </div>
  );
}

/* Glitch easter egg overlay */
function GlitchOverlay({ onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-space-black/90 glitch-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="font-display text-4xl md:text-6xl tracking-wider text-star-white rgb-split">
        Houston, we have a problem.
      </p>
    </motion.div>
  );
}

/**
 * App root — orchestrates loader, cursor, nav, starfield, and all sections.
 * Easter egg: typing "HOUSTON" triggers glitch overlay.
 */
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const { activeSection, setRef } = useActiveSection();

  // Easter egg: listen for "HOUSTON" keystrokes
  useEffect(() => {
    let buffer = '';
    const handleKeyDown = (e) => {
      buffer += e.key.toUpperCase();
      if (buffer.length > 7) buffer = buffer.slice(-7);
      if (buffer === 'HOUSTON') {
        setShowGlitch(true);
        buffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Loader overlay */}
      <Loader onComplete={handleLoadComplete} />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Navigation dots */}
      <NavDots activeSection={activeSection} />

      {/* Three.js starfield — fixed behind everything */}
      <StarField activeSection={activeSection} />

      {/* Easter egg glitch */}
      <AnimatePresence>
        {showGlitch && (
          <GlitchOverlay onDismiss={() => setShowGlitch(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        id="main-content"
        className="relative"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <div ref={setRef(0)}>
          <Hero />
        </div>

        <Suspense fallback={<SectionFallback />}>
          <div ref={setRef(1)}>
            <Launch />
          </div>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <div ref={setRef(2)}>
            <Transit />
          </div>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <div ref={setRef(3)}>
            <Landing />
          </div>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <div ref={setRef(4)}>
            <Conclusion />
          </div>
        </Suspense>
      </main>
    </>
  );
}
