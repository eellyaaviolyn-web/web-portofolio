import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import SpotlightCard from './SpotlightCard';
import TextScramble from './TextScramble';
import LiquidImage from './LiquidImage';
import GsapReveal from './GsapReveal';
import { ProjectSkeleton } from './Skeleton';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useContext(LanguageContext);

  const handleLike = async (e, id, currentLikes) => {
    e.stopPropagation();
    const newLikes = (currentLikes || 0) + 1;
    setProjects(projects.map(p => p.id === id ? { ...p, likes: newLikes } : p));
    await supabase.from('projects').update({ likes: newLikes }).eq('id', id);
  };

  const handleProjectClick = async (project) => {
    setSelectedProject(project);
    const newViews = (project.views || 0) + 1;
    setProjects(projects.map(p => p.id === project.id ? { ...p, views: newViews } : p));
    await supabase.from('projects').update({ views: newViews }).eq('id', project.id);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
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
            themeColor: '#8b5cf6',
            tags: ['React.js', 'Node.js'],
          },
          {
            id: 2,
            title: 'Weather Dashboard',
            description: 'Real-time weather tracking using OpenWeather API.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
            themeColor: '#0ea5e9',
            tags: ['React.js', 'JavaScript'],
          },
          {
            id: 3,
            title: 'Task Management',
            description: 'A drag-and-drop task management tool built with Vite.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80',
            themeColor: '#f43f5e',
            tags: ['React.js', 'Tailwind CSS'],
          }
        ]);
      }
      setIsLoading(false);
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

  // Get all unique tags from all projects
  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags || []))];
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => (p.tags || []).includes(activeFilter));

  return (
    <section id="projects" className="section container">
      {/* Title Section */}
      <GsapReveal direction="up" distance={30} stagger={0.2} duration={1}>
        <div style={{ overflow: 'hidden', paddingBottom: '5px' }}>
          <h2 className="heading-lg" style={{ textAlign: 'center', margin: '0' }}>
            <TextScramble text={t.projects.title} /> <span className="gradient-text"><TextScramble text={t.projects.subtitle} /></span>
          </h2>
        </div>
        <p className="text-lead" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          {t.projects.desc}
        </p>
      </GsapReveal>

      {/* Filter Buttons */}
      {!isLoading && allTags.length > 1 && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={activeFilter === tag ? 'btn btn-primary' : 'btn glass'}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: activeFilter === tag ? 'none' : '1px solid var(--border-color)',
              }}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      )}

      {/* Skeleton Loading */}
      {isLoading ? (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {[1,2].map(i => <ProjectSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>{t.projects.empty}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {filtered.map((project, index) => (
              <GsapReveal
                key={project.id}
                direction="up"
                distance={100}
                duration={0.8}
                delay={0.1}
                style={{
                  position: 'sticky',
                  top: `calc(15vh + ${index * 30}px)`,
                  marginBottom: index === filtered.length - 1 ? '0' : '60vh',
                  zIndex: index,
                  width: '100%',
                  maxWidth: '900px',
                  margin: '0 auto',
                  paddingBottom: index === filtered.length - 1 ? '10vh' : '0',
                  cursor: 'pointer'
                }}
              >
                <div onMouseEnter={() => handleProjectHover(project.themeColor)} onMouseLeave={handleProjectLeave} onClick={() => handleProjectClick(project)}>
                  <SpotlightCard
                    variants={cardVariants}
                    whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
                    className="card glass"
                    style={{ padding: 0, display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 -10px 30px rgba(0,0,0,0.1)' }}
                  >
                    <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <LiquidImage src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none' }} />
                      
                      {/* Likes & Views Badge on Card */}
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 3 }}>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => handleLike(e, project.id, project.likes)} style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 0.75rem', borderRadius: '50px', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                          <span style={{ color: '#ef4444' }}>💖</span> {project.likes || 0}
                        </motion.button>
                        <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 0.75rem', borderRadius: '50px', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                          👁️ {project.views || 0}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
                      <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--text-primary)', fontWeight: 700 }}>{project.title}</h3>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                          {project.tags.map(tag => (
                            <span key={tag} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '50px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(99,102,241,0.2)', fontWeight: 600 }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-lead" style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                        {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
                      </p>
                      
                      <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Click to see details <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </GsapReveal>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="card glass"
              style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: 0, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => setSelectedProject(null)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{selectedProject.title}</h2>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => handleLike(e, selectedProject.id, selectedProject.likes)} className="btn glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#ef4444' }}>💖</span> {selectedProject.likes || 0}
                    </motion.button>
                    <div className="btn glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'default' }}>
                      👁️ {selectedProject.views || 0}
                    </div>
                  </div>
                </div>

                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {selectedProject.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(99,102,241,0.2)', fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginBottom: '3rem' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>About This Project</h4>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                    {selectedProject.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live Demo
                    </motion.a>
                  )}
                  {selectedProject.github_link && (
                    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={selectedProject.github_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
