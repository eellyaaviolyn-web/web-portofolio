import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';
import { supabase } from '../lib/supabase';

const Blog = () => {
  const { t } = useContext(LanguageContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (data) {
        setBlogs(data);
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="section container">
      <GsapReveal direction="up" distance={40} stagger={0.2} duration={1}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 className="heading-lg">
            {t.blog.title} <span className="gradient-text">{t.blog.subtitle}</span>
          </h2>
          <p className="text-lead" style={{ margin: '1rem auto 0', maxWidth: '600px' }}>
            {t.blog.desc}
          </p>
        </div>
      </GsapReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {blogs.map((blog, index) => (
          <GsapReveal key={blog.id} direction="up" distance={50} delay={0.1}>
            <article 
              className="card glass" 
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>{blog.date}</p>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{blog.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.excerpt}</p>
              <a href={blog.link} className="btn btn-outline" style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>{t.blog.readMore}</a>
            </article>
          </GsapReveal>
        ))}
      </div>
    </section>
  );
};

export default Blog;
