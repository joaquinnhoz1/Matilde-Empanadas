import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { verifyJWT } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '../../public');

const ALLOWED_FOLDERS = ['empanadas', 'pizzas', 'dips', 'vinos', 'fotos'];
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

function storageFor(folder) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = folder === 'fotos'
        ? join(PUBLIC_DIR, 'fotos')
        : join(PUBLIC_DIR, 'carta', folder);
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const base = file.originalname.replace(ext, '');
      cb(null, `${base}${ext}`);
    },
  });
}

function fileFilter(req, file, cb) {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, png, webp)'));
  }
}

export const uploadRouter = Router();

uploadRouter.post('/:folder', verifyJWT, (req, res) => {
  const { folder } = req.params;
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return res.status(400).json({ error: 'Carpeta inválida' });
  }

  const upload = multer({
    storage: storageFor(folder),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single('image');

  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' });
    res.json({ filename: req.file.filename });
  });
});
