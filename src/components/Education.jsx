import React, { useContext, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';

const Education = () => {
  const { t } = useContext(LanguageContext);

  const educationData = t.education.list;
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="education" className="section container">
      <GsapReveal direction="up" distance={40} stagger={0.15} duration={1}>
        <div style={{ overflow: 'hidden', paddingBottom: '5px' }}>
          <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            {t.education.title} <span className="gradient-text">{t.education.subtitle}</span>
          </h2>
        </div>
      </GsapReveal>
      
      <div ref={containerRef} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '1.5rem' }}>
        {/* The Continuous Git Line Background */}
        <div style={{ position: 'absolute', top: '2rem', bottom: '2rem', left: '0px', width: '4px', background: 'var(--border-color)', borderRadius: '2px' }}></div>
        
        {/* The Glowing Scroll-Lit Line */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            top: '2rem', 
            bottom: '2rem', 
            left: '0px', 
            width: '4px', 
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))', 
            borderRadius: '2px', 
            scaleY,
            transformOrigin: 'top',
            boxShadow: '0 0 10px var(--accent-primary)',
            zIndex: 1
          }} 
        ></motion.div>

        {educationData.map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -50, rotateY: -10, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 50 }}
            className="glass" 
            style={{ 
              padding: '2rem 2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'relative',
              marginBottom: index !== educationData.length - 1 ? '3rem' : '0',
              overflow: 'visible',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Git Commit Node */}
            <motion.div 
              whileInView={{ scale: [1, 1.5, 1], backgroundColor: ['var(--bg-primary)', 'var(--accent-primary)', 'var(--bg-primary)'] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false, margin: "-200px" }}
              style={{ 
                position: 'absolute', 
                top: '2rem', 
                left: '-24px', // Aligns with the absolute line
                width: '24px', 
                height: '24px', 
                background: 'var(--bg-primary)',
                border: '4px solid var(--accent-primary)',
                borderRadius: '50%',
                zIndex: 2,
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)'
              }}
            ></motion.div>
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(79, 70, 229, 0.05) 0%, transparent 100%)', pointerEvents: 'none', borderRadius: '1rem' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', padding: '0.4rem 1.2rem', background: 'var(--selection-bg)', color: 'var(--accent-primary)', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(99,102,241,0.3)' }}>
                {item.year}
              </span>
            </div>
            
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 700 }}>{item.degree}</h3>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 500 }}>{item.institution}</h4>
            <p className="text-lead" style={{ fontSize: '1.05rem', margin: 0, lineHeight: '1.7' }}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
