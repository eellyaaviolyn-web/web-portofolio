import React from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const marqueeItems = [
  { text: 'AVAILABLE FOR HIRE', emoji: '✦' },
  { text: 'OPEN TO WORK', emoji: '🚀' },
  { text: 'LET\'S COLLABORATE', emoji: '🤝' },
  { text: 'HIRE ME NOW', emoji: '⚡' },
  { text: 'AVAILABLE FOR HIRE', emoji: '✦' },
  { text: 'OPEN TO WORK', emoji: '🚀' },
  { text: 'LET\'S COLLABORATE', emoji: '🤝' },
  { text: 'HIRE ME NOW', emoji: '⚡' },
];

const MarqueeFooter = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '0',
        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary, #7c3aed))',
        position: 'relative',
        marginTop: '4rem',
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Top row — left scroll */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          color: '#fff',
          paddingTop: '0.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            width: '100%',
            skew: skewVelocity
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              gap: '0',
              animation: 'marquee-scroll-left 25s linear infinite',
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0 2rem',
                }}
              >
                <span style={{ color: 'var(--accent-primary)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', opacity: 0.6 }}>
                  {item.emoji}
                </span>
                <span style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', letterSpacing: '0.05em', fontFamily: 'Inter, Outfit, sans-serif' }}>
                  {item.text}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row — right scroll */}
      <div
        style={{
          color: 'rgba(255,255,255,0.35)',
          paddingBottom: '0.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            width: '100%',
            skew: skewVelocity
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              animation: 'marquee-scroll-right 35s linear infinite',
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0 1.5rem',
                  fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ opacity: 0.5 }}>{item.emoji}</span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </motion.div>
  );
};

export default MarqueeFooter;
