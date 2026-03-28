import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Tracks normalized mouse position and returns spring-based parallax values.
 * Values range from -0.5 to 0.5 relative to viewport center.
 * @param {number} stiffness - Spring stiffness (default 50)
 * @param {number} damping - Spring damping (default 20)
 * @returns {{ x: MotionValue, y: MotionValue }}
 */
export function useMouseParallax(stiffness = 50, damping = 20) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness, damping });
  const y = useSpring(mouseY, { stiffness, damping });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normalizedX = (e.clientX / window.innerWidth) - 0.5;
      const normalizedY = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { x, y };
}

export default useMouseParallax;
