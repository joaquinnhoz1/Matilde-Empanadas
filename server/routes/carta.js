import { Router } from 'express';
import { readFileSync, writeFileSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { verifyJWT } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARTA_FILE = join(__dirname, '../data/carta.json');

function readCarta() {
  return JSON.parse(readFileSync(CARTA_FILE, 'utf-8'));
}

function writeCarta(data) {
  const tmp = CARTA_FILE + '.tmp';
  writeFileSync(tmp, JSON.stringify(data, null, 2));
  renameSync(tmp, CARTA_FILE);
}

export const cartaRouter = Router();

cartaRouter.get('/', (req, res) => {
  res.json(readCarta());
});

cartaRouter.put('/', verifyJWT, (req, res) => {
  const data = req.body;
  if (!Array.isArray(data)) return res.status(400).json({ error: 'Formato inválido' });
  writeCarta(data);
  res.json({ ok: true });
});
