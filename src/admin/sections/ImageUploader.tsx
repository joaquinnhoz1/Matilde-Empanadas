import { useState, useRef } from 'react';
import { api } from '../api';

const FOLDERS = [
  { value: 'empanadas', label: 'Empanadas' },
  { value: 'pizzas', label: 'Pizzas' },
  { value: 'dips', label: 'Dips' },
  { value: 'vinos', label: 'Vinitos' },
  { value: 'fotos', label: 'Fotos del sitio' },
];

export function ImageUploader() {
  const [folder, setFolder] = useState('empanadas');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ name: string; ok: boolean }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(e.target.files ?? []));
    setResults([]);
  }

  async function upload() {
    if (!files.length) return;
    setUploading(true);
    const res: { name: string; ok: boolean }[] = [];
    for (const file of files) {
      try {
        const r = await api.uploadImage(folder, file);
        res.push({ name: file.name, ok: r.ok });
      } catch {
        res.push({ name: file.name, ok: false });
      }
    }
    setResults(res);
    setFiles([]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div>
      <h2 className="adm-main__title">Imágenes</h2>
      <div className="adm-section">
        <div className="adm-section__title">Subir imágenes</div>
        <div className="adm-field">
          <label>Carpeta destino</label>
          <select value={folder} onChange={e => setFolder(e.target.value)}>
            {FOLDERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        <label className="adm-upload-area">
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} />
          <div className="adm-upload-area__icon">📁</div>
          <div className="adm-upload-area__text">Hacé clic para elegir imágenes</div>
          <div className="adm-upload-area__sub">JPG, PNG o WEBP · máx 5 MB por archivo</div>
        </label>

        {files.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 8 }}>{files.length} archivo(s) seleccionado(s):</div>
            <div className="adm-upload-preview">
              {files.map((f, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
                  <div style={{ fontSize: 10, color: '#888', marginTop: 3, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="adm-save-row">
          <button
            className="adm-btn adm-btn--primary"
            onClick={upload}
            disabled={!files.length || uploading}
          >
            {uploading ? 'Subiendo...' : 'Subir imágenes'}
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {results.map((r, i) => (
              <div key={i} style={{ fontSize: 13, padding: '4px 0', color: r.ok ? '#16a34a' : '#c0392b' }}>
                {r.ok ? '✓' : '✗'} {r.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="adm-section">
        <div className="adm-section__title">Importante</div>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          Para reemplazar una imagen existente, subí una nueva con el <strong>mismo nombre</strong> que la original.<br />
          Para agregar una imagen nueva al menú, primero subila acá y después editá el ítem en la sección <strong>Menú</strong>.
        </p>
      </div>
    </div>
  );
}
