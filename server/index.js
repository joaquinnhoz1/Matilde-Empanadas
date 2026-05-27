import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/auth.js';
import { cartaRouter } from './routes/carta.js';
import { siteRouter } from './routes/site.js';
import { uploadRouter } from './routes/upload.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRouter);
app.use('/api/carta', cartaRouter);
app.use('/api/site', siteRouter);
app.use('/api/upload', uploadRouter);

if (isProd) {
  const distPath = join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] Corriendo en http://localhost:${PORT}`);
  if (isProd) console.log('[server] Modo producción — sirviendo dist/');
});
