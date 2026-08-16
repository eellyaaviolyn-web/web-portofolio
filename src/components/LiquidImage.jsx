import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const LiquidImage = ({ src, alt, style = {}, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const filterId = useRef(`liquid-filter-${Math.random().toString(36).substr(2, 9)}`).current;
  const filterRef = useRef(null);
  
  // Use springs for smooth ripple return
  const mouseX = useSpring(0, { damping: 20, stiffness: 100 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 100 });
  const scale = useSpring(0, { damping: 10, stiffness: 50 });

  useEffect(() => {
    // Update SVG filter directly for performance
    const unsubscribeScale = scale.onChange(v => {
      if (filterRef.current) {
        filterRef.current.setAttribute('scale', v);
      }
    });
    
    return () => unsubscribeScale();
  }, [scale]);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    scale.set(60); // Maximum distortion
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(60);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(0); // Return to flat
  };

  return (
    <div 
      className={className} 
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap 
            ref={filterRef}
            in="SourceGraphic" 
            in2="noise" 
            scale="0" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>
      
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          filter: `url(#${filterId})`,
          transform: 'scale(1.1)', // Prevent edges from tearing
          ...style
        }} 
      />
    </div>
  );
};

export default LiquidImage;
