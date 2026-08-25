import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import GsapCursor from './components/GsapCursor';
import AuroraBackground from './components/AuroraBackground';
import FilmGrain from './components/FilmGrain';
import AudioReactor from './components/AudioReactor';
import Preloader from './components/Preloader';
import { ToastContainer } from './components/Toast';
import { playHoverSound, playClickSound } from './utils/sound';
import { supabase } from './lib/supabase';

// Lazy load Admin Dashboard for performance
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Supabase Auth Check
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="pulse-dot" style={{ width: '20px', height: '20px', background: 'var(--accent-primary)' }}></div></div>;

  return session ? children : <Navigate to="/login" replace />;
};

function App() {
  // Persist theme preference in localStorage
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global Audio Engine (Tactile Feedback)
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input[type="submit"], .interactive')) {
        playHoverSound();
      }
    };
    
    const handleMouseDown = (e) => {
      if (e.target.closest('a, button, input[type="submit"], .interactive')) {
        playClickSound();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <LanguageProvider>
      {/* Global Gooey Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Global Toast Notifications */}
      <ToastContainer />
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <FilmGrain />
          <AudioReactor />
          <AuroraBackground />
          <GsapCursor />
          <Router>
            <Routes>
              <Route path="/" element={<Portfolio theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="pulse-dot" style={{ width: '20px', height: '20px', background: 'var(--accent-primary)' }}></div></div>}>
                      <AdminDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              {/* Custom 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </>
      )}
    </LanguageProvider>
  );
}

export default App;
