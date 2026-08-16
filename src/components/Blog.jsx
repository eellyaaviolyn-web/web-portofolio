import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';

const Blog = () => {
  const { t } = useContext(LanguageContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('portfolio_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Default sample blogs
      const sampleBlogs = [
        {
          id: 1,
          title: 'Memahami React Hooks',
          date: '12 Mei 2026',
          excerpt: 'React Hooks mengubah cara kita menulis komponen fungsional dengan state dan efek samping.',
          link: '#'
        },
        {
          id: 2,
          title: 'Styling Modern dengan Tailwind CSS',
          date: '05 April 2026',
          excerpt: 'Mengapa utility-first CSS framework seperti Tailwind sangat populer di kalangan developer frontend.',
          link: '#'
        }
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('portfolio_blogs', JSON.stringify(sampleBlogs));
    }
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
