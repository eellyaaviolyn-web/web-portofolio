import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

const SkillsMarquee = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '3rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
      
      {/* Gradient Mask for fading edges */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '100%', background: 'linear-gradient(to right, var(--bg-secondary), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '100%', background: 'linear-gradient(to left, var(--bg-secondary), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 25, repeat: Infinity }}
        style={{ display: 'flex', width: 'max-content', gap: '3rem', paddingLeft: '3rem' }}
      >
        {/* Double array for seamless looping */}
        {[...SKILLS, ...SKILLS].map((skill, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-primary)', padding: '0.75rem 1.5rem', borderRadius: '50px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <img src={skill.icon} alt={skill.name} style={{ width: '24px', height: '24px', filter: skill.name === 'Next.js' ? 'var(--invert-icon, none)' : 'none' }} />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsMarquee;
