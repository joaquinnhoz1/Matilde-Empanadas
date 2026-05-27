import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFileSync, writeFileSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JWT_SECRET, verifyJWT } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUTH_FILE = join(__dirname, '../data/auth.json');

function readAuth() {
  return JSON.parse(readFileSync(AUTH_FILE, 'utf-8'));
}

function writeAuth(data) {
  const tmp = AUTH_FILE + '.tmp';
  writeFileSync(tmp, JSON.stringify(data, null, 2));
  renameSync(tmp, AUTH_FILE);
}

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Contraseña requerida' });

  const { passwordHash } = readAuth();
  const ok = await bcrypt.compare(password, passwordHash);
  if (!ok) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

authRouter.post('/change-password', verifyJWT, async (req, res) => {
  const { current, newPassword } = req.body;
  if (!current || !newPassword) return res.status(400).json({ error: 'Faltan campos' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });

  const { passwordHash } = readAuth();
  const ok = await bcrypt.compare(current, passwordHash);
  if (!ok) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

  const newHash = await bcrypt.hash(newPassword, 10);
  writeAuth({ passwordHash: newHash });
  res.json({ ok: true });
});
