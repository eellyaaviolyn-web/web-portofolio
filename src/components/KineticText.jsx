import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const KineticLetter = ({ char, mouseX, mouseY }) => {
  const ref = useRef(null);
  const baseX = useRef(0);
  const baseY = useRef(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      baseX.current = rect.left + rect.width / 2;
      baseY.current = rect.top + rect.height / 2;
    }
  }, []);

  // Use spring for very smooth rubber-band feeling
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const stretchX = useSpring(0, springConfig);
  const stretchY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dx = e.clientX - baseX.current;
      const dy = e.clientY - baseY.current;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const maxDistance = 300;
      if (distance < maxDistance && distance > 0) {
        // Closer = more stretch
        const intensity = (1 - distance / maxDistance);
        // Stretch towards the mouse
        stretchX.set((dx / distance) * 40 * intensity);
        stretchY.set((dy / distance) * 60 * intensity);
      } else {
        stretchX.set(0);
        stretchY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [stretchX, stretchY]);

  // Combine stretch into transforms
  const x = stretchX;
  const y = stretchY;
  const scaleY = useTransform(stretchY, [-60, 0, 60], [1.5, 1, 1.5]);
  const skewX = useTransform(stretchX, [-40, 0, 40], [-20, 0, 20]);

  return (
    <motion.span
      ref={ref}
      style={{
        display: 'inline-block',
        x,
        y,
        scaleY,
        skewX,
        transformOrigin: 'center center',
        textShadow: '0 10px 30px rgba(0,0,0,0.5)',
        WebkitTextStroke: '1px rgba(255,255,255,0.1)',
        color: 'transparent',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const KineticText = ({ text }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      textAlign: 'center',
      pointerEvents: 'none', // Allow clicking through
      zIndex: -1,
      fontSize: 'clamp(3rem, 10vw, 12rem)',
      fontWeight: 900,
      fontFamily: 'Outfit, sans-serif',
      whiteSpace: 'nowrap',
      opacity: 0.8
    }}>
      {text.split('').map((char, i) => (
        <KineticLetter key={i} char={char} />
      ))}
    </div>
  );
};

export default KineticText;
