import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contentVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.15 },
    },
  },
};

/**
 * Accordion component. Only one panel open at a time.
 * @param {{ items: Array<{ title: string, content: string }> }} props
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      {items.map((item, index) => (
        <div key={index} className="glass overflow-hidden">
          {/* Header */}
          <button
            className="w-full flex items-center justify-between p-4 md:p-5 text-left group"
            onClick={() => toggle(index)}
            data-cursor="hover"
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
            tabIndex={0}
          >
            <span className="flex items-center gap-3">
              <span className="font-display text-sm tracking-[0.15em] text-glow/50">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-base md:text-lg tracking-wider text-star-white group-hover:text-glow transition-colors duration-300">
                {item.title}
              </span>
            </span>

            {/* Chevron */}
            <motion.span
              className="text-star-white/40 text-lg flex-shrink-0 ml-4"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▾
            </motion.span>
          </button>

          {/* Content */}
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                id={`accordion-content-${index}`}
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="exit"
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 md:px-5 md:pb-5 pl-12 md:pl-14">
                  <p className="text-sm text-star-white/60 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
