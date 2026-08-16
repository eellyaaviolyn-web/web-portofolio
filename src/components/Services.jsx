import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';
import TiltCard from './TiltCard';
import GlowCard from './GlowCard';
import GlitchText from './GlitchText';
import TextScramble from './TextScramble';
import RevealText from './RevealText';
import MarqueeText from './MarqueeText';
import { BsCodeSlash, BsDatabase, BsPalette } from 'react-icons/bs';

const Services = () => {
  const { t } = useContext(LanguageContext);

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 60, damping: 15 } 
    }
  };

  const icons = [
    <BsCodeSlash size={32} color="var(--accent-primary)" />,
    <BsDatabase size={32} color="var(--accent-secondary)" />,
    <BsPalette size={32} color="var(--accent-primary)" />
  ];

  return (
    <section id="services" className="section container" style={{ paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
      <MarqueeText />
      <GsapReveal direction="up" distance={50} stagger={0.2} duration={1}>
        <div style={{ marginBottom: '3rem' }}>
          <motion.h4 variants={itemVariants} style={{ color: 'var(--accent-secondary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '1rem', margin: 0, marginBottom: '1rem' }}>
            <span style={{ width: '40px', height: '2px', background: 'var(--accent-secondary)' }}></span>
            <TextScramble text={t.services.title + " " + t.services.subtitle} />
          </motion.h4>
          
          <h2 className="heading-lg" style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
            <GlitchText text={t.services.title} /> <br/> 
            <span className="gradient-text"><GlitchText text={t.services.subtitle} /></span>
          </h2>
          
          <div className="text-lead" style={{ maxWidth: '600px', color: 'var(--text-secondary)' }}>
            <RevealText text={t.services.desc} delay={0.2} />
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {t.services.list.map((service, index) => (
            <TiltCard key={index} className={`service-item-${index}`}>
              <GlowCard 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={itemVariants} 
                className="card glass" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  padding: '2.5rem'
                }}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  border: '1px solid var(--border-color)'
                }}>
                  {icons[index % icons.length]}
                </div>
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                  {service.desc}
                </p>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </GsapReveal>
    </section>
  );
};

export default Services;
