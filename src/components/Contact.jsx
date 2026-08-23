import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import GsapReveal from './GsapReveal';
import { toast } from './Toast';

const Contact = () => {
  const { t } = useContext(LanguageContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Pesan berhasil terkirim! Saya akan segera menghubungi Anda. 🎉');
        e.target.reset();
      } else {
        toast.error('Gagal mengirim pesan. Coba lagi nanti atau hubungi via WhatsApp.');
      }
    } catch (error) {
      toast.error('Koneksi gagal. Pastikan internet Anda stabil.');
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
        <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="gradient-text">{t.contact.title}</span> {t.contact.subtitle}
        </h2>
        <p className="text-lead" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
          {t.contact.desc}
        </p>
      </GsapReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        {/* Contact Form */}
        <GsapReveal>
          <div className="card glass" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.contact.formName}</label>
                <input type="text" id="name" name="name" required className="input-field" />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.contact.formEmail}</label>
                <input type="email" id="email" name="email" required className="input-field" />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.contact.formMessage}</label>
                <textarea id="message" name="message" rows="4" required className="input-field"></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem', transition: 'all 0.3s ease', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'Mengirim...' : t.contact.send}
              </motion.button>
            </form>
          </div>
        </GsapReveal>

        {/* Social Links */}
        <GsapReveal>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 600 }}>{t.contact.connectTitle}</h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', filter: 'url(#goo)' }}>
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass"
                  whileHover={{ y: -8, scale: 1.1, boxShadow: `0 15px 25px ${link.color}40`, borderColor: link.color }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '65px',
                    height: '65px',
                    borderRadius: '50%',
                    color: link.color,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </GsapReveal>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '6rem', padding: '2.5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>© {new Date().getFullYear()} Zakia Abdillah Az-Zahra. {t.contact.rights}</p>
      </div>
    </section>
    </>
  );
};

export default Contact;
