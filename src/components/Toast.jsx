import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let addToastFn = null;

export const toast = {
  success: (msg) => addToastFn?.({ type: 'success', msg }),
  error: (msg) => addToastFn?.({ type: 'error', msg }),
  info: (msg) => addToastFn?.({ type: 'info', msg }),
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, msg }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  const icons = {
    success: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    error:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    info:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };

  const colors = {
    success: { border: 'rgba(16,185,129,0.35)', color: '#10b981' },
    error:   { border: 'rgba(239,68,68,0.35)',  color: '#ef4444' },
    info:    { border: 'rgba(59,130,246,0.35)',  color: '#3b82f6' },
  };

  return (
    <div style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:99999, display:'flex', flexDirection:'column', gap:'0.75rem', pointerEvents:'none' }}>
      <AnimatePresence>
        {toasts.map(t => {
          const c = colors[t.type];
          return (
            <motion.div key={t.id}
              initial={{ opacity:0, x:60, scale:0.9 }}
              animate={{ opacity:1, x:0, scale:1 }}
              exit={{ opacity:0, x:60, scale:0.9 }}
              transition={{ type:'spring', stiffness:300, damping:25 }}
              style={{
                display:'flex', alignItems:'center', gap:'0.75rem',
                padding:'0.9rem 1.25rem',
                background:'var(--bg-secondary)',
                backdropFilter:'blur(20px)',
                border:`1px solid ${c.border}`,
                borderLeft:`4px solid ${c.color}`,
                borderRadius:'0.75rem',
                boxShadow:'0 10px 30px rgba(0,0,0,0.25)',
                color:'var(--text-primary)',
                fontSize:'0.95rem', fontWeight:500,
                maxWidth:'320px', pointerEvents:'auto',
              }}
            >
              <span style={{ color:c.color, flexShrink:0 }}>{icons[t.type]}</span>
              <span>{t.msg}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
