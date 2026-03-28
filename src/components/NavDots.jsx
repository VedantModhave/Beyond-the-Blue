import { motion } from 'framer-motion';
import { NAV_SECTIONS } from '../constants/data';

const dotVariants = {
  inactive: {
    scale: 1,
    backgroundColor: 'rgba(232, 234, 240, 0.3)',
    boxShadow: '0 0 0px rgba(0, 212, 255, 0)',
  },
  active: {
    scale: 1.4,
    backgroundColor: 'var(--color-glow)',
    boxShadow: '0 0 12px rgba(0, 212, 255, 0.6)',
  },
};

/**
 * Fixed right-side navigation dots. Active dot glows cyan.
 * Click scrolls to corresponding section.
 */
export default function NavDots({ activeSection = 0 }) {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden md:flex"
      aria-label="Section navigation"
    >
      {NAV_SECTIONS.map((section, index) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group relative flex items-center justify-end"
          aria-label={`Navigate to ${section.label}`}
          data-cursor="hover"
          tabIndex={0}
        >
          {/* Label tooltip */}
          <span className="absolute right-8 whitespace-nowrap text-xs font-body tracking-wider text-star-white/0 group-hover:text-star-white/80 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            {section.label}
          </span>

          {/* Dot */}
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            variants={dotVariants}
            animate={activeSection === index ? 'active' : 'inactive'}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.6 }}
          />

          {/* Active indicator line */}
          {activeSection === index && (
            <motion.div
              className="absolute right-[-8px] w-[2px] h-4 bg-glow rounded-full"
              layoutId="nav-active-line"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
