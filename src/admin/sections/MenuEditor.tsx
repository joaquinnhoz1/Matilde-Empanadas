import { useState, useRef } from 'react';
import { api } from '../api';

interface CartaItem {
  name: string;
  desc: string;
  price: number;
  photo: string;
  popular?: boolean;
  veggie?: boolean;
}

interface CartaSection {
  id: string;
  label: string;
  folder: string;
  items: CartaItem[];
}

interface Props {
  initialData: CartaSection[];
}

function ItemRow({
  item,
  folder,
  onChange,
  onDelete,
}: {
  item: CartaItem;
  folder: string;
  onChange: (updated: CartaItem) => void;
  onDelete: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function set(key: keyof CartaItem, value: unknown) {
    onChange({ ...item, [key]: value });
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadImage(folder, file);
      const data = await res.json();
      if (res.ok) set('photo', data.filename);
      else alert('Error al subir imagen: ' + data.error);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  const photoSrc = item.photo
    ? `/carta/${folder}/${encodeURIComponent(item.photo)}`
    : null;

  return (
    <div className="adm-item">
      <div>
        {photoSrc
          ? <img className="adm-item__photo" src={photoSrc} alt={item.name} loading="lazy" />
          : <div className="adm-item__photo-placeholder">📷</div>
        }
        <label className="adm-item__photo-btn" style={{ marginTop: 4, display: 'block' }}>
          {uploading ? '...' : 'Cambiar foto'}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
        </label>
      </div>

      <div className="adm-item__fields">
        <input
          placeholder="Nombre"
          value={item.name}
          onChange={e => set('name', e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={item.desc}
          onChange={e => set('desc', e.target.value)}
          rows={2}
        />
      </div>

      <div className="adm-item__price">
        <label>Precio ($)</label>
        <input
          type="number"
          value={item.price}
          min={0}
          step={100}
          onChange={e => set('price', Number(e.target.value))}
        />
      </div>

      <div className="adm-item__flags">
        <label>
          <input type="checkbox" checked={!!item.popular} onChange={e => set('popular', e.target.checked)} />
          Popular
        </label>
        <label>
          <input type="checkbox" checked={!!item.veggie} onChange={e => set('veggie', e.target.checked)} />
          Veggie
        </label>
      </div>

      <div className="adm-item__actions">
        <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}

function SectionAccordion({
  section,
  onChange,
}: {
  section: CartaSection;
  onChange: (s: CartaSection) => void;
}) {
  const [open, setOpen] = useState(false);

  function updateItem(i: number, updated: CartaItem) {
    const items = section.items.map((it, idx) => idx === i ? updated : it);
    onChange({ ...section, items });
  }

  function deleteItem(i: number) {
    if (!confirm('¿Eliminar este ítem?')) return;
    const items = section.items.filter((_, idx) => idx !== i);
    onChange({ ...section, items });
  }

  function addItem() {
    const blank: CartaItem = { name: 'Nuevo ítem', desc: '', price: 0, photo: '' };
    onChange({ ...section, items: [...section.items, blank] });
  }

  return (
    <div className="adm-accordion">
      <button className="adm-accordion__header" onClick={() => setOpen(o => !o)}>
        <span>{section.label} <span style={{ color: '#888', fontWeight: 400 }}>({section.items.length} ítems)</span></span>
        <span className={`adm-accordion__chevron ${open ? 'adm-accordion__chevron--open' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="adm-accordion__body">
          {section.items.map((item, i) => (
            <ItemRow
              key={i}
              item={item}
              folder={section.folder}
              onChange={updated => updateItem(i, updated)}
              onDelete={() => deleteItem(i)}
            />
          ))}
          <div className="adm-add-item">
            <button className="adm-btn adm-btn--secondary adm-btn--sm" onClick={addItem}>+ Agregar ítem</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MenuEditor({ initialData }: Props) {
  const [carta, setCarta] = useState<CartaSection[]>(initialData);
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');

  function updateSection(i: number, updated: CartaSection) {
    setCarta(c => c.map((s, idx) => idx === i ? updated : s));
  }

  async function save() {
    setStatus('saving');
    try {
      const res = await api.putCarta(carta);
      setStatus(res.ok ? 'ok' : 'err');
    } catch {
      setStatus('err');
    }
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div>
      <h2 className="adm-main__title">Menú / Carta</h2>
      {carta.map((section, i) => (
        <SectionAccordion
          key={section.id}
          section={section}
          onChange={updated => updateSection(i, updated)}
        />
      ))}
      <div className="adm-save-row">
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Guardando...' : 'Guardar cambios'}
        </button>
        {status === 'ok' && <span className="adm-save-msg adm-save-msg--ok">✓ Guardado</span>}
        {status === 'err' && <span className="adm-save-msg adm-save-msg--err">✗ Error al guardar</span>}
      </div>
    </div>
  );
}
