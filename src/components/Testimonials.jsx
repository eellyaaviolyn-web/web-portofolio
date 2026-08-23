import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';
import { supabase } from '../lib/supabase';

const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    name: 'Andi Pratama',
    role: 'Teman Sekelas — SMK Bakti Nusantara 666',
    avatar: 'AP',
    content: 'Zakia sangat berbakat dalam desain UI. Proyek website sekolah yang kami kerjakan bersama mendapat pujian dari guru dan siswa. Kode-nya rapi dan selalu tepat waktu!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    role: 'Anggota Tim Proyek — Software Engineering',
    avatar: 'SR',
    content: 'Bekerja sama dengan Zakia sangat menyenangkan. Dia selalu punya ide kreatif dan tahu cara membuat tampilan web yang modern dan menarik. Sangat profesional!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Budi Santoso',
    role: 'Koordinator Ekstrakulikuler IT',
    avatar: 'BS',
    content: 'Zakia berhasil membuat website portofolio yang sangat memukau untuk presentasi PKL. Kemampuan React dan Supabase-nya jauh di atas rata-rata siswa seusianya.',
    rating: 5,
  },
];

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const { t } = useContext(LanguageContext);
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      setTestimonials(data && data.length > 0 ? data : SAMPLE_TESTIMONIALS);
      setIsLoading(false);
    };
    fetchTestimonials();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (isLoading || testimonials.length === 0) return null;

  const item = testimonials[current];

  return (
    <section id="testimonials" className="section container">
      <GsapReveal direction="up" distance={30} duration={1}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-lg">
            Apa Kata <span className="gradient-text">Mereka?</span>
          </h2>
          <p className="text-lead" style={{ margin: '1rem auto 0', maxWidth: '600px' }}>
            Ulasan dari teman, guru, dan rekan kerja yang pernah berkolaborasi bersama.
          </p>
        </div>
      </GsapReveal>

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="card glass"
            style={{ padding: '2.5rem', textAlign: 'center' }}
          >
            {/* Quote icon */}
            <div style={{ fontSize: '4rem', color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>"</div>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '2rem', fontStyle: 'italic' }}>
              {item.content}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              {/* Avatar */}
              {item.avatar && !item.avatar.startsWith('http') ? (
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0
                }}>
                  {item.avatar}
                </div>
              ) : (
                <img src={item.avatar} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{item.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.role}</p>
                <StarRating rating={item.rating || 5} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.5rem' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '50px',
                background: i === current ? 'var(--accent-primary)' : 'var(--border-color)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
