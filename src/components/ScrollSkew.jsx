import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const ScrollSkew = ({ children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth the velocity to prevent jerky movements
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform velocity into a skew amount
  // When scrolling fast, it skews slightly. Max skew is 4 degrees.
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [4, -4]);
  const skew = useSpring(skewVelocity, { damping: 50, stiffness: 200 });
  const yOffset = useTransform(smoothVelocity, [-1000, 1000], [20, -20]);

  return (
    <motion.div 
      style={{ 
        skewY: skew,
        y: yOffset,
        transformOrigin: "center center" 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSkew;
