import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';
import { BlogSkeleton } from './Skeleton';
import { supabase } from '../lib/supabase';
import ParticleBurst from './ParticleBurst';
import CinematicTitle from './CinematicTitle';

const Blog = () => {
  const { t } = useContext(LanguageContext);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (data) setBlogs(data);
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleLike = async (id, currentLikes) => {
    const newLikes = (currentLikes || 0) + 1;
    setBlogs(blogs.map(b => b.id === id ? { ...b, likes: newLikes } : b));
    await supabase.from('blogs').update({ likes: newLikes }).eq('id', id);
  };

  const handleView = async (blog) => {
    if (blog.link && blog.link !== '#') {
      window.open(blog.link, '_blank');
      const newViews = (blog.views || 0) + 1;
      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, views: newViews } : b));
      await supabase.from('blogs').update({ views: newViews }).eq('id', blog.id);
    }
  };

  if (!isLoading && blogs.length === 0) return null;

  return (
    <section id="blog" className="section container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <CinematicTitle
          words={`${t.blog.title} ${t.blog.subtitle}`}
          highlightWords={[t.blog.subtitle]}
          className="heading-lg"
          style={{ textAlign: 'center', justifyContent: 'center' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lead"
          style={{ margin: '1rem auto 0', maxWidth: '600px' }}
        >
          {t.blog.desc}
        </motion.p>
      </div>


      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {isLoading
          ? [1, 2, 3].map(i => <BlogSkeleton key={i} />)
          : blogs.map((blog, index) => (
          <GsapReveal key={blog.id} direction="up" distance={50} delay={index * 0.1}>
            <motion.article
              className="card glass"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {blog.image ? (
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />
                  
                  {/* Likes & Views Badge */}
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.5rem', zIndex: 3 }}>
                    <ParticleBurst onLike={() => handleLike(blog.id, blog.likes)}>
                      <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 0.6rem', borderRadius: '50px', color: 'white', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                        <span style={{ color: '#ef4444' }}>💖</span> {blog.likes || 0}
                      </div>
                    </ParticleBurst>
                    <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 0.6rem', borderRadius: '50px', color: 'white', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
                      👁️ {blog.views || 0}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ height: '100px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', opacity: 0.7, flexShrink: 0 }}>
                  📝
                </div>
              )}

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 700, background: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid rgba(99, 102, 241, 0.2)', width: 'fit-content' }}>
                  {blog.date}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, margin: 0 }}>
                  {blog.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', flexGrow: 1, lineHeight: 1.7, fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                  {blog.excerpt}
                </p>

                {blog.link && blog.link !== '#' && (
                  <motion.button
                    onClick={() => handleView(blog)}
                    className="btn btn-outline"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ alignSelf: 'flex-start', padding: '0.5rem 1.25rem', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {t.blog.readMore}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                  </motion.button>
                )}
              </div>
            </motion.article>
          </GsapReveal>
        ))}
      </div>
    </section>
  );
};

export default Blog;

