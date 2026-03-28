import { useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { NAV_SECTIONS } from '../constants/data';

/**
 * Tracks scroll progress through a container and determines the active section.
 * @param {React.RefObject} containerRef - Ref to the scrollable container section
 * @param {object} options - Framer useScroll offset options
 * @returns {{ scrollYProgress: MotionValue, activeSection: number }}
 */
export function useScrollProgress(containerRef, options = {}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: options.offset || ['start start', 'end end'],
    ...options,
  });

  return { scrollYProgress };
}

/**
 * Determines which section is currently active based on viewport intersection.
 * @returns {{ activeSection: number, sectionRefs: React.RefObject[] }}
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  const setRef = useCallback((index) => (el) => {
    sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const observers = [];

    NAV_SECTIONS.forEach((_, index) => {
      const el = sectionRefs.current[index];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return { activeSection, setRef, sectionRefs };
}

export default useScrollProgress;
