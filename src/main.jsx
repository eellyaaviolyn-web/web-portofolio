import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 🛡️ Sembunyikan log internal di production — hacker tidak bisa intip info sensitif
if (import.meta.env.PROD) {
  const originalLog = window.console.log ? window.console.log.bind(console) : () => {};
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.info = () => {};

  // Pesan ramah di DevTools buat yang coba intip 😄
  setTimeout(() => {
    const style = 'color:#6366f1;font-size:18px;font-weight:bold;';
    const style2 = 'color:#475569;font-size:13px;';
    originalLog('%c🛡️ Portfolio Zakia', style);
    originalLog('%cHey! Kamu developer juga? Keren! 👋\nSilakan lihat kodenya di: https://github.com/eellyaaviolyn-web', style2);
  }, 100);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
