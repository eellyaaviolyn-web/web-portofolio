import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playQuackSound } from '../utils/sound';

const RubberDuck = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    if (isSpinning) return;
    playQuackSound();
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000); 
  };

  return (
    <motion.div
      onClick={handleClick}
      animate={{
        y: isSpinning ? [0, -100, 0] : [0, -15, 0],
        rotateZ: isSpinning ? 360 : 0,
        scale: isSpinning ? 1.2 : 1
      }}
      transition={{
        y: { 
          duration: isSpinning ? 1 : 3, 
          repeat: isSpinning ? 0 : Infinity, 
          ease: "easeInOut" 
        },
        rotateZ: { 
          duration: 1, 
          ease: "easeInOut" 
        },
        scale: {
          duration: 1
        }
      }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '40px',
        fontSize: '3rem',
        cursor: 'pointer',
        zIndex: 9990,
        userSelect: 'none',
        filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.4))'
      }}
      title="Rubber Duck Debugging! Quack!"
    >
      🦆
    </motion.div>
  );
};

export default RubberDuck;
