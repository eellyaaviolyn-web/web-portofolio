import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SkillSphere = ({ skills, radius = 150 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !skills || skills.length === 0) return;

    // Clear previous children if any
    container.innerHTML = '';

    const tags = [];
    const size = skills.length;
    
    // Distribute points on a sphere (Fibonacci sphere)
    for (let i = 0; i < size; i++) {
      const phi = Math.acos(-1 + (2 * i) / size);
      const theta = Math.sqrt(size * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const el = document.createElement('span');
      el.textContent = skills[i];
      el.className = 'sphere-tag';
      
      Object.assign(el.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate3d(-50%, -50%, 0)`, // Will update in loop
        fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
        fontWeight: '600',
        color: 'var(--accent-primary)',
        transition: 'color 0.3s, font-size 0.3s',
        cursor: 'default',
        padding: '5px 10px',
        whiteSpace: 'nowrap',
        userSelect: 'none'
      });

      // Hover effect on individual tags
      el.addEventListener('mouseenter', () => {
        el.style.color = 'var(--text-primary)';
        el.style.textShadow = '0 0 10px var(--accent-primary)';
        el.style.fontSize = 'clamp(1rem, 2vw, 1.3rem)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.color = 'var(--accent-primary)';
        el.style.textShadow = 'none';
        el.style.fontSize = 'clamp(0.85rem, 1.5vw, 1.1rem)';
      });

      container.appendChild(el);
      tags.push({ el, x, y, z });
    }

    let animationFrame;
    let angleX = Math.PI / 500;
    let angleY = Math.PI / 500;
    
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Calculate mouse position relative to center of container (-1 to 1)
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    const update = () => {
      // Add mouse influence to base rotation
      const targetAngleX = Math.PI / 500 - mouseY * 0.02;
      const targetAngleY = Math.PI / 500 + mouseX * 0.02;

      // Smooth interpolation
      angleX += (targetAngleX - angleX) * 0.1;
      angleY += (targetAngleY - angleY) * 0.1;

      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      tags.forEach(t => {
        // Rotate around X axis
        let y1 = t.y * cosX - t.z * sinX;
        let z1 = t.z * cosX + t.y * sinX;

        // Rotate around Y axis
        let x2 = t.x * cosY + z1 * sinY;
        let z2 = z1 * cosY - t.x * sinY;

        t.x = x2;
        t.y = y1;
        t.z = z2;

        // Calculate perspective
        const perspective = 300;
        const scale = perspective / (perspective - t.z);
        const alpha = (t.z + radius) / (2 * radius);

        // Apply transforms
        const tX = t.x * scale;
        const tY = t.y * scale;

        t.el.style.transform = `translate3d(calc(-50% + ${tX}px), calc(-50% + ${tY}px), ${t.z}px) scale(${scale})`;
        t.el.style.opacity = 0.2 + alpha * 0.8;
        t.el.style.zIndex = Math.round(t.z + radius);
      });

      animationFrame = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [skills, radius]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, type: 'spring' }}
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        overflow: 'hidden' // Keeps tags from spilling out too far
      }}
    >
      <div 
        ref={containerRef} 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%',
          transformStyle: 'preserve-3d'
        }} 
      />
    </motion.div>
  );
};

export default SkillSphere;
