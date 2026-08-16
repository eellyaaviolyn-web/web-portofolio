import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GithubGraph from './GithubGraph';
import GlowCard from './GlowCard';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';
import TextScramble from './TextScramble';
import RevealText from './RevealText';
import GlitchText from './GlitchText';
import SkillSphere from './SkillSphere';
import GsapReveal from './GsapReveal';

const About = () => {
  const { t } = useContext(LanguageContext);
  const [isJsonView, setIsJsonView] = useState(false);
  
  const profileData = {
    name: "Zakia Abdillah Az-Zahra",
    role: t.about.roleTitle1 + " " + t.about.roleTitle2,
    description: t.about.desc1,
    skills: t.about.skills,
    organization: t.about.orgDesc,
    contact: "Available for hire"
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

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

  return (
    <section id="about" className="section container" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative' }}>
      <GsapReveal direction="up" distance={50} stagger={0.2} duration={1}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <motion.h4 variants={itemVariants} style={{ color: 'var(--accent-secondary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '1rem', margin: 0 }}>
            <span style={{ width: '40px', height: '2px', background: 'var(--accent-secondary)' }}></span>
            <TextScramble text={`${t.about.title} ${t.about.subtitle}`} />
          </motion.h4>
          <motion.button 
            variants={itemVariants}
            onClick={() => setIsJsonView(!isJsonView)}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            {isJsonView ? '</> View UI' : '{ } View JSON'}
          </motion.button>
        </div>
        
        {isJsonView ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card glass"
            style={{ padding: '2rem', overflowX: 'auto', background: '#1e1e1e', color: '#ce9178', fontFamily: '"Fira Code", monospace', border: '1px solid #333' }}
          >
            <pre style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
              <span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#4fc1ff' }}>developer</span> <span style={{ color: '#d4d4d4' }}>= </span>
              {JSON.stringify(profileData, null, 2)}
            </pre>
          </motion.div>
        ) : (
          <div className="bento-grid">
          
          {/* Kolom Kiri Atas (Span 2) */}
          <TiltCard className="bento-item-1">
            <GlowCard initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="card glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <h2 className="heading-lg" style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>
                <GlitchText text={t.about.roleTitle1} /> <br/> 
                <span className="gradient-text"><GlitchText text={t.about.roleTitle2} /></span>
              </h2>
              <div className="text-lead" style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                <RevealText text={t.about.desc1} />
              </div>
            </GlowCard>
          </TiltCard>
          
          {/* Kolom Kanan Atas (Span 1, Row 2) */}
          <TiltCard className="bento-item-2">
            <GlowCard initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="card glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h2 className="heading-lg" style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                <GlitchText text={t.about.skillsTitle} />
              </h2>
              <div className="text-lead" style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                <RevealText text={t.about.skillsDesc} delay={0.2} />
              </div>
              <div style={{ marginTop: '1.5rem', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <SkillSphere skills={t.about.skills} radius={140} />
              </div>
            </GlowCard>
          </TiltCard>

          {/* Kolom Kiri Bawah (Span 1) */}
          <TiltCard className="bento-item-3">
            <GlowCard initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="card glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <h2 className="heading-lg" style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                <GlitchText text={t.about.orgTitle} />
              </h2>
              <div className="text-lead" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                <RevealText text={t.about.orgDesc} delay={0.1} />
              </div>
            </GlowCard>
          </TiltCard>

          {/* Kolom Kanan Bawah (Span 1) */}
          <div className="bento-item-4">
            <GlowCard initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="card glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <h2 className="heading-lg" style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                <GlitchText text={t.about.connectTitle} />
              </h2>
              <div className="text-lead" style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                <RevealText text={t.about.connectDesc} delay={0.2} />
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const target = document.getElementById('contact');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = '#contact';
                  }
                }}
                className="btn btn-primary"
                style={{ width: 'fit-content', marginTop: '1rem', cursor: 'pointer', position: 'relative', zIndex: 9999, pointerEvents: 'all' }}
              >
                {t.about.connectBtn}
              </button>
            </GlowCard>
          </div>

        </div>
        )}
        
        {/* GitHub Contributions Heatmap (Interactive) */}
        <GithubGraph />
      </GsapReveal>
    </section>
  );
};

export default About;
