import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 🛡️ Sembunyikan log internal di production — hacker tidak bisa intip info sensitif
if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.info = () => {};

  // Pesan ramah di DevTools buat yang coba intip 😄
  setTimeout(() => {
    console['log'] = function() {};
    const style = 'color:#6366f1;font-size:18px;font-weight:bold;';
    const style2 = 'color:#475569;font-size:13px;';
    window.__original_console_log(`%c🛡️ Portfolio Zakia`, style);
    window.__original_console_log(`%cHey! Kamu developer juga? Keren! 👋\nSilakan lihat kodenya di: https://github.com/eellyaaviolyn-web`, style2);
  }, 100);
  window.__original_console_log = window.console.log.bind(console);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
