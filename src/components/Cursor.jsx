import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor with dot + ring. Ring follows with spring lag.
 * Scales on data-cursor="hover" elements. Hidden on mobile.
 */
export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (e.target.closest('[data-cursor="hover"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('[data-cursor="hover"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: 4,
          height: 4,
          backgroundColor: 'var(--color-star-white)',
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 'var(--z-cursor)',
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: 32,
          height: 32,
          border: `1.5px solid ${isHovering ? 'var(--color-glow)' : 'rgba(232,234,240,0.5)'}`,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 'var(--z-cursor)',
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 2 : 1,
          borderColor: isHovering ? 'var(--color-glow)' : 'rgba(232,234,240,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  );
}
