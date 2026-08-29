import React from 'react';
import { motion } from 'framer-motion';

/**
 * BorderBeam — rotating laser/neon glow border effect.
 * Place inside a `position: relative` parent.
 * The parent needs `overflow: visible` or the beam should be clipped carefully.
 */
const BorderBeam = ({
  duration = 5,
  colorFrom = '#8b5cf6',
  colorTo = '#0ea5e9',
  size = 120,
  borderRadius = '1rem',
  delay = 0,
}) => {
  return (
    <>
      {/* Outer glow layer — rotating conic gradient sitting BEHIND the card */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -2,
          borderRadius,
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 20%, ${colorTo} 40%, transparent 60%)`,
          filter: 'blur(6px)',
          opacity: 0.75,
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      />
      {/* Sharp inner mask so only the edge glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 2,
          borderRadius: `calc(${typeof borderRadius === 'number' ? borderRadius + 'px' : borderRadius} - 2px)`,
          background: 'var(--card-bg, var(--bg-secondary))',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default BorderBeam;
