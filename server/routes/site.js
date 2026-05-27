import { Router } from 'express';
import { readFileSync, writeFileSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { verifyJWT } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_FILE = join(__dirname, '../data/site.json');

function readSite() {
  return JSON.parse(readFileSync(SITE_FILE, 'utf-8'));
}

function writeSite(data) {
  const tmp = SITE_FILE + '.tmp';
  writeFileSync(tmp, JSON.stringify(data, null, 2));
  renameSync(tmp, SITE_FILE);
}

export const siteRouter = Router();

siteRouter.get('/', (req, res) => {
  res.json(readSite());
});

siteRouter.put('/', verifyJWT, (req, res) => {
  const data = req.body;
  if (typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Formato inválido' });
  }
  writeSite(data);
  res.json({ ok: true });
});
