import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const RepellingLetter = ({ char, mousePosition, force = 60, radius = 100 }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [basePosition, setBasePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // Only capture center relative to viewport once on mount or resize
      setBasePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, []);

  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;
    
    // Fallback if base position isn't set
    if (basePosition.x === 0 && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setBasePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }

    const dx = mousePosition.x - basePosition.x;
    const dy = mousePosition.y - basePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      const pushFactor = (radius - distance) / radius;
      // Calculate repulsion vector (opposite of cursor)
      const moveX = -(dx / distance) * force * pushFactor;
      const moveY = -(dy / distance) * force * pushFactor;
      
      controls.start({
        x: moveX,
        y: moveY,
        scale: 1 + pushFactor * 0.2, // Slightly enlarge when repelled
        transition: { type: 'spring', stiffness: 400, damping: 20 }
      });
    } else {
      controls.start({
        x: 0,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 200, damping: 10 }
      });
    }
  }, [mousePosition, basePosition, controls, force, radius]);

  return (
    <motion.span
      ref={ref}
      animate={controls}
      style={{ display: 'inline-block', originX: 0.5, originY: 0.5 }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const RepellingText = ({ text, className = "", style = {}, force = 60, radius = 100 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // To prevent calculating all the time across the whole site, only track when mouse is relatively close
    // We'll attach it to window but we can optimize by checking hover on container
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className} style={{ ...style, display: 'inline-flex', flexWrap: 'wrap' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <RepellingLetter 
              key={`${wordIndex}-${charIndex}`} 
              char={char} 
              mousePosition={mousePosition}
              force={force}
              radius={radius}
            />
          ))}
        </span>
      ))}
    </div>
  );
};

export default RepellingText;
