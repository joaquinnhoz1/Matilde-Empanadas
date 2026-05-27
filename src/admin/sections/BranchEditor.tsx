import { useState } from 'react';
import { api } from '../api';

interface Branch {
  id: string;
  name: string;
  subtitle: string;
  modality: string;
  address: string;
  hours: string;
  coverage: string;
  paymentMethods: string;
  whatsapp: string;
  whatsappMessage?: string;
  theme: string;
  mapEmbedUrl: string;
  mapsUrl?: string;
}

interface SiteData {
  branches: {
    kicker: string;
    titleLines: string[];
    titleScript: string;
    list: Branch[];
  };
  [key: string]: unknown;
}

interface Props {
  initialData: SiteData;
  onSaved: (data: SiteData) => void;
}

function BranchForm({
  branch,
  label,
  onChange,
}: {
  branch: Branch;
  label: string;
  onChange: (b: Branch) => void;
}) {
  function set(key: keyof Branch, value: string) {
    onChange({ ...branch, [key]: value });
  }

  return (
    <div className="adm-section">
      <div className="adm-section__title">{label}</div>
      <div className="adm-grid-2">
        <div className="adm-field">
          <label>Nombre</label>
          <input value={branch.name} onChange={e => set('name', e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Subtítulo</label>
          <input value={branch.subtitle} onChange={e => set('subtitle', e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Modalidad</label>
          <input value={branch.modality} onChange={e => set('modality', e.target.value)} placeholder="DELIVERY / TAKE AWAY" />
        </div>
        <div className="adm-field">
          <label>Dirección</label>
          <input value={branch.address} onChange={e => set('address', e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Horarios</label>
          <input value={branch.hours} onChange={e => set('hours', e.target.value)} placeholder="Mar a Dom · 19:30 – 23:30" />
        </div>
        <div className="adm-field">
          <label>Cobertura / Modalidad detalle</label>
          <input value={branch.coverage} onChange={e => set('coverage', e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Formas de pago</label>
          <input value={branch.paymentMethods} onChange={e => set('paymentMethods', e.target.value)} />
        </div>
        <div className="adm-field">
          <label>WhatsApp (número, sin símbolos)</label>
          <input value={branch.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="5492214000000" />
        </div>
      </div>
      <div className="adm-field">
        <label>Mensaje pre-cargado WhatsApp</label>
        <input value={branch.whatsappMessage ?? ''} onChange={e => set('whatsappMessage', e.target.value)} />
      </div>
      <div className="adm-field">
        <label>URL embed Google Maps (iframe src)</label>
        <textarea value={branch.mapEmbedUrl} onChange={e => set('mapEmbedUrl', e.target.value)} rows={3} />
      </div>
      <div className="adm-field">
        <label>Link Google Maps (botón "Ver en Google Maps")</label>
        <input value={branch.mapsUrl ?? ''} onChange={e => set('mapsUrl', e.target.value)} />
      </div>
    </div>
  );
}

export function BranchEditor({ initialData, onSaved }: Props) {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');

  function updateBranch(i: number, updated: Branch) {
    setSiteData(d => ({
      ...d,
      branches: {
        ...d.branches,
        list: d.branches.list.map((b, idx) => idx === i ? updated : b),
      },
    }));
  }

  async function save() {
    setStatus('saving');
    try {
      const res = await api.putSite(siteData);
      if (res.ok) { setStatus('ok'); onSaved(siteData); }
      else setStatus('err');
    } catch {
      setStatus('err');
    }
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div>
      <h2 className="adm-main__title">Sucursales</h2>
      {siteData.branches.list.map((branch, i) => (
        <BranchForm
          key={branch.id}
          branch={branch}
          label={`Sucursal ${i + 1} — ${branch.name}`}
          onChange={updated => updateBranch(i, updated)}
        />
      ))}
      <div className="adm-save-row">
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Guardando...' : 'Guardar sucursales'}
        </button>
        {status === 'ok' && <span className="adm-save-msg adm-save-msg--ok">✓ Guardado</span>}
        {status === 'err' && <span className="adm-save-msg adm-save-msg--err">✗ Error al guardar</span>}
      </div>
    </div>
  );
}
