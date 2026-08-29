import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['💖', '✨', '⭐', '💫', '🌟', '💕'];

/**
 * ParticleBurst — wraps any element.
 * On click it fires a confetti / heart particle explosion.
 * Pass `onLike` to handle the like side-effect.
 */
const ParticleBurst = ({ children, onLike, disabled = false }) => {
  const [particles, setParticles] = useState([]);

  const handleClick = useCallback((e) => {
    if (disabled) return;
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const count = 12;

    const burst = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360;
      const distance = 45 + Math.random() * 35;
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const id = Date.now() + i + Math.random();
      return { id, cx, cy, angle, distance, emoji, size: 0.8 + Math.random() * 0.6 };
    });

    setParticles(prev => [...prev, ...burst]);

    // Cleanup after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !burst.some(b => b.id === p.id)));
    }, 900);

    onLike?.();
  }, [onLike, disabled]);

  return (
    <div
      onClick={handleClick}
      style={{ position: 'relative', display: 'inline-flex', cursor: disabled ? 'default' : 'pointer' }}
    >
      {children}

      <AnimatePresence>
        {particles.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance - 15; // slight upward drift
          return (
            <motion.span
              key={p.id}
              initial={{
                x: p.cx - 12,
                y: p.cy - 12,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: p.cx - 12 + tx,
                y: p.cy - 12 + ty,
                scale: [0, p.size * 1.4, p.size * 0.9, 0],
                opacity: [1, 1, 0.6, 0],
              }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontSize: `${p.size}rem`,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 99999,
                lineHeight: 1,
              }}
            >
              {p.emoji}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ParticleBurst;
