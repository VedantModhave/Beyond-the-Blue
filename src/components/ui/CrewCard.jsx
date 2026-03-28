import { useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * Crew card with front/back flip. Hover on desktop, tap on mobile.
 * @param {{ member: object, index: number }} props
 */
export default function CrewCard({ member, index = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-56 md:h-64"
      style={{ perspective: 1000 }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      data-cursor="hover"
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsFlipped(!isFlipped)}
        onHoverStart={() => {
          if (window.innerWidth >= 768) setIsFlipped(true);
        }}
        onHoverEnd={() => {
          if (window.innerWidth >= 768) setIsFlipped(false);
        }}
        role="button"
        tabIndex={0}
        aria-label={`${member.name} - ${member.role}. Click to see details.`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 glass-strong p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Top */}
          <div>
            <span className="text-3xl">{member.flag}</span>
            <h4 className="font-display text-xl tracking-wider mt-2 text-star-white">
              {member.name}
            </h4>
            <p className="text-sm text-glow/80 tracking-wide mt-1">{member.role}</p>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-2 text-xs text-star-white/40">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-glow" />
            <span>{member.nationality}</span>
            <span className="ml-auto text-star-white/20">HOVER FOR DETAILS →</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 glass-strong p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <p className="text-xs tracking-[0.15em] text-glow/60 uppercase mb-2">Personnel File</p>
            <p className="text-sm text-star-white/80 leading-relaxed mb-3">{member.stat}</p>
            <div className="w-8 h-px bg-star-white/20 mb-3" />
            <p className="text-sm text-star-white/60 leading-relaxed">{member.detail}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-star-white/30">
            <span>CLEARANCE: LEVEL 5</span>
            <span className="ml-auto">ARES-1</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
