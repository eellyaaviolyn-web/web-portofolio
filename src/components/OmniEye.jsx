import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const OmniEye = () => {
  const eyeRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Springs for very smooth, organic tracking
  const mouseX = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      // Center of the eye
      const eyeCX = rect.left + rect.width / 2;
      const eyeCY = rect.top + rect.height / 2;
      
      // Calculate angle and distance
      const dx = e.clientX - eyeCX;
      const dy = e.clientY - eyeCY;
      const angle = Math.atan2(dy, dx);
      
      // Cap the distance the pupil can travel (radius of the white part roughly)
      const maxDist = 12; 
      const dist = Math.min(Math.sqrt(dx*dx + dy*dy) / 10, maxDist);
      
      const pupilX = Math.cos(angle) * dist;
      const pupilY = Math.sin(angle) * dist;
      
      mouseX.set(pupilX);
      mouseY.set(pupilY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Random blinking logic
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150); // fast blink
        // Double blink chance
        if (Math.random() > 0.7) {
          setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
          }, 300);
        }
      }
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(blinkInterval);
    };
  }, [mouseX, mouseY]);

  // When clicked, pupil dilates (gets smaller because robot/focus)
  const pupilScale = isClicked ? 0.6 : 1;
  const irisColor = isClicked ? '#ef4444' : 'var(--accent-primary)'; // Turns red when clicking
  
  // Parallax outer container slightly
  const containerX = useTransform(mouseX, [-12, 12], [-5, 5]);
  const containerY = useTransform(mouseY, [-12, 12], [-5, 5]);

  return (
    <motion.div
      ref={eyeRef}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '60px',
        height: '60px',
        zIndex: 9990,
        pointerEvents: 'none',
        x: containerX,
        y: containerY,
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 1 }}
    >
      {/* Tech Ring Outer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          right: '-10px',
          bottom: '-10px',
          border: '1px dashed var(--accent-primary)',
          borderRadius: '50%',
          opacity: 0.3
        }}
      />
      
      {/* The Sclera (White/Base of the eye) */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--bg-secondary)',
          borderRadius: '50%',
          border: '2px solid var(--accent-primary)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Eyelid (Blinking mechanism) */}
        <motion.div
          initial={false}
          animate={{ height: isBlinking ? '100%' : '0%' }}
          transition={{ duration: 0.1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            background: 'var(--accent-primary)',
            zIndex: 10
          }}
        />

        {/* The Iris & Pupil */}
        <motion.div
          style={{
            width: '30px',
            height: '30px',
            background: irisColor,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            x: mouseX,
            y: mouseY,
            transition: 'background-color 0.3s ease',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          <motion.div
            animate={{ scale: pupilScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              width: '12px',
              height: '12px',
              background: '#000',
              borderRadius: '50%'
            }}
          >
            {/* Catchlight (Reflection) */}
            <div style={{
              width: '4px',
              height: '4px',
              background: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              right: '2px',
              opacity: 0.8
            }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OmniEye;
