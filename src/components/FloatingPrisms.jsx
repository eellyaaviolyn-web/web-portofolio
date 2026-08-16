import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Prism = ({ size, color, initialX, initialY, delay, speed = 1, rotationDir = 1, scrollY }) => {
  // Parallax effect: moves opposite to scroll, speed determined by 'speed' prop
  const yOffset = useTransform(scrollY, [0, 2000], [0, -400 * speed]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 2, delay }}
      style={{
        position: 'absolute',
        top: `${initialY}%`,
        left: `${initialX}%`,
        y: yOffset,
        width: size,
        height: size,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <motion.div
        animate={{
          rotateX: rotationDir > 0 ? [0, 360] : [360, 0],
          rotateY: rotationDir > 0 ? [0, 360] : [360, 0],
          rotateZ: [0, 180, 360],
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Simple 3D Cube/Prism structure made of glass planes */}
        {[
          { rx: 0, ry: 0, tz: size / 2 },          // Front
          { rx: 0, ry: 180, tz: size / 2 },        // Back
          { rx: 0, ry: -90, tz: size / 2 },        // Left
          { rx: 0, ry: 90, tz: size / 2 },         // Right
          { rx: 90, ry: 0, tz: size / 2 },         // Top
          { rx: -90, ry: 0, tz: size / 2 },        // Bottom
        ].map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${color}20, ${color}40)`,
              border: `1px solid ${color}50`,
              backdropFilter: 'blur(4px)',
              boxShadow: `0 0 20px ${color}10 inset`,
              transform: `rotateX(${face.rx}deg) rotateY(${face.ry}deg) translateZ(${face.tz}px)`
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const FloatingPrisms = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random prisms
  const prismData = [
    { size: 80, color: '#4f46e5', x: 10, y: 15, delay: 0, speed: 1.2, dir: 1 },
    { size: 120, color: '#ec4899', x: 85, y: 30, delay: 0.5, speed: 0.8, dir: -1 },
    { size: 60, color: '#8b5cf6', x: 20, y: 70, delay: 1, speed: 1.5, dir: 1 },
    { size: 100, color: '#0ea5e9', x: 75, y: 80, delay: 1.5, speed: 1.1, dir: -1 },
    { size: 90, color: '#f43f5e', x: 50, y: 45, delay: 2, speed: 0.5, dir: 1 },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', perspective: '1000px' }}>
        {prismData.map((p, i) => (
          <Prism
            key={i}
            size={p.size}
            color={p.color}
            initialX={p.x}
            initialY={p.y}
            delay={p.delay}
            speed={p.speed}
            rotationDir={p.dir}
            scrollY={scrollY}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingPrisms;
