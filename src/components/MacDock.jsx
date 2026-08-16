import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BsHouse, BsPerson, BsBriefcase, BsBook, BsPen, BsEnvelope } from 'react-icons/bs';

const MacDock = () => {
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { name: 'Home', href: '#home', icon: BsHouse },
    { name: 'About', href: '#about', icon: BsPerson },
    { name: 'Services', href: '#services', icon: BsBriefcase },
    { name: 'Projects', href: '#projects', icon: BsBriefcase },
    { name: 'Education', href: '#education', icon: BsBook },
    { name: 'Blog', href: '#blog', icon: BsPen },
    { name: 'Contact', href: '#contact', icon: BsEnvelope },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {navItems.map((item, i) => (
          <DockIcon key={i} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const DockIcon = ({ mouseX, item }) => {
  const ref = useRef(null);

  // Calculate distance from mouse to the center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale based on distance (closer = bigger)
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  
  // Smooth out the scale
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      }}
      ref={ref}
      style={{
        width: 40,
        height: 40,
        scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        textDecoration: 'none'
      }}
      whileHover={{ y: -10 }}
      title={item.name}
    >
      <Icon size={20} />
      {/* Tooltip */}
      <span 
        className="dock-tooltip"
        style={{
          position: 'absolute',
          top: '-40px',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          padding: '0.2rem 0.6rem',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          opacity: 0,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.2s ease',
          border: '1px solid var(--border-color)',
        }}
      >
        {item.name}
      </span>
      <style>{`
        a:hover .dock-tooltip {
          opacity: 1 !important;
        }
      `}</style>
    </motion.a>
  );
};

export default MacDock;
