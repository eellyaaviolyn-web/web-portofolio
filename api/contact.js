import { Client } from '@notionhq/client';

// In-memory rate limiting store (Warm serverless instance protection)
const ipStore = new Map();
const RATE_LIMIT_MAX = 5; // max 5 messages
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // per 10 minutes

// Cleanup old entries periodically to avoid memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (now - record.windowStart > RATE_LIMIT_WINDOW) {
      ipStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip) {
  const now = Date.now();
  const record = ipStore.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    ipStore.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW - now) / 1000);
    return { allowed: false, retryAfter };
  }
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

// Allowed origins
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/web-portofolio-kappa-nine\.vercel\.app$/,
  /^https:\/\/.*portfolio-zakia.*\.vercel\.app$/,
  /^http:\/\/localhost:(3000|5173|4173)$/,
];

function isOriginAllowed(origin) {
  if (!origin) return true; // Direct/same-origin requests often omit the Origin header
  return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

export default async function handler(req, res) {
  const origin = req.headers.origin || req.headers.referer;
  const isAllowed = isOriginAllowed(origin);

  // Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (isAllowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, X-CSRF-Token, X-Requested-With, Accept'
  );

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    if (!isAllowed) {
      return res.status(403).json({ message: 'Forbidden: Origin not allowed.' });
    }
    return res.status(204).end();
  }

  // Restrict to POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Gunakan POST.' });
  }

  // Cross-Origin check
  if (!isAllowed) {
    return res.status(403).json({ message: 'Akses ditolak.' });
  }

  // Client IP extraction & Rate limit
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || 'unknown-ip');
  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfter));
    return res.status(429).json({
      success: false,
      message: `Terlalu banyak permintaan. Silakan coba lagi dalam ${Math.ceil(rateLimit.retryAfter / 60)} menit.`,
    });
  }

  try {
    const { name, email, message } = req.body || {};

    // Input sanitization & validation
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ message: 'Format input tidak valid.' });
    }

    const cleanName = name.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim().slice(0, 100);
    const cleanEmail = email.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim().slice(0, 120);
    const cleanMessage = message.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '').trim().slice(0, 2500);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({ message: 'Nama, email, dan pesan wajib diisi.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.error('Konfigurasi Notion belum lengkap.');
      return res.status(500).json({
        success: false,
        message: 'Layanan pesan sedang dalam pemeliharaan konfigurasi.',
      });
    }

    // Initialize Notion client securely
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTION_DATABASE_ID;

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: cleanName } }],
        },
        Email: {
          email: cleanEmail,
        },
        Message: {
          rich_text: [{ text: { content: cleanMessage } }],
        },
        Date: {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Pesan berhasil dikirim!',
      id: response.id,
    });
  } catch (error) {
    console.error('Contact API Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengirim pesan ke server. Silakan coba beberapa saat lagi.',
    });
  }
}
