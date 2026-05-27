import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { authRouter } from './routes/auth.js';
import { cartaRouter } from './routes/carta.js';
import { siteRouter } from './routes/site.js';
import { uploadRouter } from './routes/upload.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

// ── Init: crear auth.json si no existe (Railway no persiste archivos gitignoreados) ──
const DATA_DIR = join(__dirname, 'data');
const AUTH_FILE = join(DATA_DIR, 'auth.json');
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
if (!existsSync(AUTH_FILE)) {
  // Usa ADMIN_PASSWORD_HASH si está seteado en Railway, sino usa el hash de 'matilde2025'
  const hash = process.env.ADMIN_PASSWORD_HASH
    || '$2b$10$xpucopm/vecVn/zEIl7twu2BRN27t3UjyHfjjfVeFeRzyPJksfI4O';
  writeFileSync(AUTH_FILE, JSON.stringify({ passwordHash: hash }));
  console.log('[admin] auth.json inicializado' + (process.env.ADMIN_PASSWORD_HASH ? ' desde env.' : ' con contraseña por defecto.'));
}

// ── CORS: acepta orígenes desde env o localhost en dev ──
const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173';
const allowedOrigins = rawOrigins.split(',').map(o => o.trim());

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin Origin (curl, Railway health checks, etc.)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origen no permitido — ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRouter);
app.use('/api/carta', cartaRouter);
app.use('/api/site', siteRouter);
app.use('/api/upload', uploadRouter);

// ── Servir frontend solo si dist/ existe (modo "todo en uno", no Railway API-only) ──
const distPath = join(__dirname, '../dist');
if (isProd && existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
  console.log('[server] Sirviendo frontend desde dist/');
}

app.listen(PORT, () => {
  console.log(`[server] Corriendo en http://localhost:${PORT}`);
});
