import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import SpotlightCard from './SpotlightCard';
import TextScramble from './TextScramble';
import LiquidImage from './LiquidImage';
import GsapReveal from './GsapReveal';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Fallback Data if empty
        setProjects([
          {
            id: 1,
            title: 'E-commerce App',
            description: 'A modern fullstack e-commerce solution with React and Node.js.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
            themeColor: '#8b5cf6' // Violet
          },
          {
            id: 2,
            title: 'Weather Dashboard',
            description: 'Real-time weather tracking using OpenWeather API.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
            themeColor: '#0ea5e9' // Sky Blue
          },
          {
            id: 3,
            title: 'Task Management',
            description: 'A drag-and-drop task management tool built with Vite.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80',
            themeColor: '#f43f5e' // Rose
          }
        ]);
      }
    };
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 15 } 
    }
  };

  // Chameleon Theme Handlers
  const handleProjectHover = (color) => {
    if (!color) return;
    const root = document.documentElement;
    // Store originals if not already stored
    if (!root.style.getPropertyValue('--orig-accent-primary')) {
      const computed = getComputedStyle(root);
      root.style.setProperty('--orig-accent-primary', computed.getPropertyValue('--accent-primary'));
      root.style.setProperty('--orig-accent-secondary', computed.getPropertyValue('--accent-secondary'));
    }
    
    // Apply new colors
    root.style.setProperty('--accent-primary', color);
    // Generate a slightly darker/analogous color for secondary
    root.style.setProperty('--accent-secondary', color);
  };

  const handleProjectLeave = () => {
    const root = document.documentElement;
    const origPrimary = root.style.getPropertyValue('--orig-accent-primary');
    const origSecondary = root.style.getPropertyValue('--orig-accent-secondary');
    
    if (origPrimary) {
      root.style.setProperty('--accent-primary', origPrimary);
      root.style.setProperty('--accent-secondary', origSecondary);
    }
  };

  return (
    <section id="projects" className="section container">
      {/* Title Section */}
      <GsapReveal direction="up" distance={30} stagger={0.2} duration={1}>
        <div style={{ overflow: 'hidden', paddingBottom: '5px' }}>
          <h2 className="heading-lg" style={{ textAlign: 'center', margin: '0' }}>
            <TextScramble text={t.projects.title} /> <span className="gradient-text"><TextScramble text={t.projects.subtitle} /></span>
          </h2>
        </div>
        <p className="text-lead" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          {t.projects.desc}
        </p>
      </GsapReveal>
      
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>{t.projects.empty}</p>
        </div>
      ) : (
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative',
            marginTop: '2rem'
          }}
        >
          {projects.map((project, index) => (
            <GsapReveal 
              key={project.id} 
              direction="up"
              distance={100}
              duration={0.8}
              delay={0.1}
              style={{
                position: 'sticky',
                top: `calc(15vh + ${index * 30}px)`, // Stacking offset
                marginBottom: index === projects.length - 1 ? '0' : '60vh', // Scrolling distance
                zIndex: index,
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                paddingBottom: index === projects.length - 1 ? '10vh' : '0' // extra padding at the end
              }}
            >
              <div
                onMouseEnter={() => handleProjectHover(project.themeColor)}
                onMouseLeave={handleProjectLeave}
              >
                <SpotlightCard 
                  variants={cardVariants}
                  whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
                  className="card glass" 
                  style={{ 
                    padding: 0, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: '0 -10px 30px rgba(0,0,0,0.1)', // Default shadow
                  }}
                >
                  <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <LiquidImage 
                      src={project.image} 
                      alt={project.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none' }}></div>
                  </div>
                  <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>{project.title}</h3>
                    <p className="text-lead" style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                      {project.description}
                    </p>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary" 
                      style={{ width: 'fit-content', fontSize: '1rem', padding: '0.8rem 2rem' }}
                    >
                      {t.projects.viewProject}
                    </motion.a>
                  </div>
                </SpotlightCard>
              </div>
            </GsapReveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
