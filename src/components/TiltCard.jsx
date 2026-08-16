import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = '', style = {} }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse position
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation (subtle max tilt of 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          scale,
          borderRadius: style.borderRadius || 'inherit',
          transition: 'box-shadow 0.3s ease',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
