import React, { useContext, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';
import { toast } from './Toast';
import emailjs from '@emailjs/browser';
import CinematicTitle from './CinematicTitle';

const Contact = () => {
  const { t } = useContext(LanguageContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      emailjs.init('aCvqVepP2BYc_-p3okbY9');
      await emailjs.send(
        'service_km5e8pw',
        'template_rdmepqu',
        {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          title: 'Pesan dari Portfolio',
          time: new Date().toLocaleString('id-ID'),
        }
      );
      toast.success('Pesan berhasil terkirim! Terima kasih sudah menghubungi saya 🎉');
      e.target.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      const errMsg = err?.text || err?.message || JSON.stringify(err) || 'Unknown error';
      toast.error(`Error: ${errMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'Phone', icon: <FaPhoneAlt size={22} />, href: 'tel:+6285797982538', color: '#4f46e5' },
    { name: 'WhatsApp', icon: <FaWhatsapp size={24} />, href: 'https://wa.me/085797982538', color: '#25D366' },
    { name: 'GitHub', icon: <FaGithub size={24} />, href: 'https://github.com/eellyaaviolyn-web', color: 'var(--text-primary)' },
    { name: 'Instagram', icon: <FaInstagram size={24} />, href: 'https://www.instagram.com/zakiaabdillah_?igsh=Ym5hbWp6Zms5ajMw', color: '#E1306C' },
    { name: 'YouTube', icon: <FaYoutube size={24} />, href: 'https://www.youtube.com/@zakiaabdillah138', color: '#FF0000' }
  ];


  return (
    <>
    <section id="contact" className="section container">
      <GsapReveal>
        <CinematicTitle
          words={`${t.contact.title} ${t.contact.subtitle}`}
          highlightWords={[t.contact.title]}
          className="heading-lg"
          style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lead"
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}
        >
          {t.contact.desc}
        </motion.p>
      </GsapReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        {/* Contact Form */}
        <GsapReveal>
          <motion.div
            className="card glass"
            style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
            whileHover={{ boxShadow: '0 30px 60px rgba(99,102,241,0.15)' }}
          >
            {/* Decorative gradient top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), #ec4899)' }} />
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>✉️</span> {t.contact.formTitle || 'Kirim Pesan'}
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t.contact.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Nama kamu..."
                  className="input-field"
                  style={{ width: '100%', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t.contact.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="email@kamu.com"
                  className="input-field"
                  style={{ width: '100%', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Pesan kamu..."
                  className="input-field"
                  style={{ width: '100%', resize: 'vertical', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(99,102,241,0.35)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', fontSize: '1.05rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⏳</motion.span>
                    Mengirim...
                  </>
                ) : (
                  <>{t.contact.send}</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </GsapReveal>

        {/* Info & Social Links */}
        <GsapReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Quick Contact Cards */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>⚡</span> {t.contact.connectTitle || 'Hubungi Langsung'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '📞', label: 'Telepon', value: '+62 857-9798-2538', href: 'tel:+6285797982538' },
                  { icon: '💬', label: 'WhatsApp', value: '+62 857-9798-2538', href: 'https://wa.me/085797982538' },
                  { icon: '📍', label: 'Lokasi', value: 'Indonesia 🇮🇩', href: null },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>{item.value}</a>
                      ) : (
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem' }}>Follow Me</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass"
                    whileHover={{ y: -6, scale: 1.1, boxShadow: `0 15px 25px ${link.color}40`, borderColor: link.color }}
                    whileTap={{ scale: 0.95 }}
                    title={link.name}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px', color: link.color, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', transition: 'all 0.3s ease' }}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </GsapReveal>
      </div>
      
      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '6rem', padding: '3rem 0 2rem', borderTop: '1px solid var(--border-color)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ZA</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>— Portfolio</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', margin: 0 }}>
            © {new Date().getFullYear()} Zakia Abdillah Az-Zahra · Built with ❤️ & React
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: 0, opacity: 0.6 }}>
            {t.contact.rights}
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Contact;

