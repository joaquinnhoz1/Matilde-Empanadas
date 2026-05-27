import { useState } from 'react';
import { api } from '../api';

interface SiteData {
  brand: {
    name: string;
    short: string;
    tagline: string;
    instagram: string;
    instagramUrl: string;
    email: string;
    foundedYear: number;
  };
  hero: {
    kicker: string;
    titleLines: string[];
    titleScript: string;
    titleHighlight: string;
    lead: string;
    ctaLabel: string;
    stickerTop: string;
    stickerBig: string;
    stickerYear: string;
  };
  about: {
    kicker: string;
    titleLines: string[];
    titleScript: string;
    titleClose: string;
    paragraphs: string[];
    quote: string;
    stampPrimary: string;
    stampSecondary: string;
  };
  pillars: { icon: string; title: string; text: string }[];
  whyUs: {
    kicker: string;
    titleLines: string[];
    items: { n: string; title: string; text: string }[];
  };
  products: {
    kicker: string;
    titleLines: string[];
    titleScript: string;
    feature: {
      tag: string;
      title: string;
      description: string;
      ctaLabel: string;
    };
    secondary: { tag: string; title: string; description: string; ctaLabel: string }[];
    extras: { tag: string; items: string[]; ctaLabel: string };
  };
  ctaFinal: { titleLines: string[]; titleScript: string };
  footer: {
    tagline: string;
    line: string;
    legal: string;
    columns: { title: string; items: string[]; small?: string }[];
  };
  marquee: string[];
  [key: string]: unknown;
}

interface Props {
  initialData: SiteData;
  onSaved: (data: SiteData) => void;
}

function Field({ label, value, onChange, textarea = false, rows = 2 }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; rows?: number;
}) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} />
        : <input value={value} onChange={e => onChange(e.target.value)} />
      }
    </div>
  );
}

export function ContentEditor({ initialData, onSaved }: Props) {
  const [data, setData] = useState<SiteData>(initialData);
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');

  function set(path: string, value: unknown) {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] as Record<string, unknown>;
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function save() {
    setStatus('saving');
    try {
      const res = await api.putSite(data);
      if (res.ok) { setStatus('ok'); onSaved(data); }
      else setStatus('err');
    } catch {
      setStatus('err');
    }
    setTimeout(() => setStatus('idle'), 3000);
  }

  const d = data;

  return (
    <div>
      <h2 className="adm-main__title">Contenido de la web</h2>

      {/* Marca */}
      <div className="adm-section">
        <div className="adm-section__title">Marca</div>
        <div className="adm-grid-2">
          <Field label="Nombre" value={d.brand.name} onChange={v => set('brand.name', v)} />
          <Field label="Tagline" value={d.brand.tagline} onChange={v => set('brand.tagline', v)} />
          <Field label="Instagram" value={d.brand.instagram} onChange={v => set('brand.instagram', v)} />
          <Field label="URL Instagram" value={d.brand.instagramUrl} onChange={v => set('brand.instagramUrl', v)} />
          <Field label="Email" value={d.brand.email} onChange={v => set('brand.email', v)} />
        </div>
      </div>

      {/* Hero */}
      <div className="adm-section">
        <div className="adm-section__title">Hero (banner principal)</div>
        <Field label="Kicker / subtítulo superior" value={d.hero.kicker} onChange={v => set('hero.kicker', v)} />
        <Field label="Título línea 1" value={d.hero.titleLines[0]} onChange={v => set('hero.titleLines', [v])} />
        <div className="adm-grid-2">
          <Field label="Título script" value={d.hero.titleScript} onChange={v => set('hero.titleScript', v)} />
          <Field label="Título highlight" value={d.hero.titleHighlight} onChange={v => set('hero.titleHighlight', v)} />
        </div>
        <Field label="Descripción (lead)" value={d.hero.lead} onChange={v => set('hero.lead', v)} textarea />
        <Field label="Botón CTA" value={d.hero.ctaLabel} onChange={v => set('hero.ctaLabel', v)} />
        <div className="adm-grid-3">
          <Field label="Sticker superior" value={d.hero.stickerTop} onChange={v => set('hero.stickerTop', v)} />
          <Field label="Sticker grande" value={d.hero.stickerBig} onChange={v => set('hero.stickerBig', v)} />
          <Field label="Sticker año" value={d.hero.stickerYear} onChange={v => set('hero.stickerYear', v)} />
        </div>
      </div>

      {/* Marquee */}
      <div className="adm-section">
        <div className="adm-section__title">Tira animada (marquee)</div>
        {d.marquee.map((item, i) => (
          <Field
            key={i}
            label={`Item ${i + 1}`}
            value={item}
            onChange={v => {
              const arr = [...d.marquee];
              arr[i] = v;
              set('marquee', arr);
            }}
          />
        ))}
      </div>

      {/* Pilares */}
      <div className="adm-section">
        <div className="adm-section__title">Pilares (3 bloques)</div>
        {d.pillars.map((p, i) => (
          <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < d.pillars.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
            <div className="adm-grid-3">
              <Field label={`Pillar ${i + 1} — Ícono`} value={p.icon} onChange={v => {
                const arr = [...d.pillars];
                arr[i] = { ...arr[i], icon: v };
                set('pillars', arr);
              }} />
              <Field label="Título" value={p.title} onChange={v => {
                const arr = [...d.pillars];
                arr[i] = { ...arr[i], title: v };
                set('pillars', arr);
              }} />
              <Field label="Texto" value={p.text} onChange={v => {
                const arr = [...d.pillars];
                arr[i] = { ...arr[i], text: v };
                set('pillars', arr);
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quiénes somos */}
      <div className="adm-section">
        <div className="adm-section__title">Quiénes somos</div>
        <div className="adm-grid-2">
          <Field label="Kicker" value={d.about.kicker} onChange={v => set('about.kicker', v)} />
          <Field label="Título línea 1" value={d.about.titleLines[0]} onChange={v => set('about.titleLines', [v])} />
          <Field label="Título script" value={d.about.titleScript} onChange={v => set('about.titleScript', v)} />
          <Field label="Título cierre" value={d.about.titleClose} onChange={v => set('about.titleClose', v)} />
        </div>
        {d.about.paragraphs.map((p, i) => (
          <Field key={i} label={`Párrafo ${i + 1}`} value={p} onChange={v => {
            const arr = [...d.about.paragraphs];
            arr[i] = v;
            set('about.paragraphs', arr);
          }} textarea />
        ))}
        <div className="adm-grid-3">
          <Field label="Hashtag / cita" value={d.about.quote} onChange={v => set('about.quote', v)} />
          <Field label="Sello primario" value={d.about.stampPrimary} onChange={v => set('about.stampPrimary', v)} />
          <Field label="Sello secundario" value={d.about.stampSecondary} onChange={v => set('about.stampSecondary', v)} />
        </div>
      </div>

      {/* Productos */}
      <div className="adm-section">
        <div className="adm-section__title">Sección Productos</div>
        <div className="adm-grid-2">
          <Field label="Kicker" value={d.products.kicker} onChange={v => set('products.kicker', v)} />
          <Field label="Título línea 1" value={d.products.titleLines[0]} onChange={v => set('products.titleLines', [v])} />
          <Field label="Título script" value={d.products.titleScript} onChange={v => set('products.titleScript', v)} />
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 10 }}>TARJETA GRANDE — EMPANADAS</div>
          <div className="adm-grid-2">
            <Field label="Tag" value={d.products.feature.tag} onChange={v => set('products.feature.tag', v)} />
            <Field label="CTA" value={d.products.feature.ctaLabel} onChange={v => set('products.feature.ctaLabel', v)} />
          </div>
          <Field label="Título" value={d.products.feature.title} onChange={v => set('products.feature.title', v)} />
          <Field label="Descripción" value={d.products.feature.description} onChange={v => set('products.feature.description', v)} textarea />
        </div>
        {d.products.secondary.map((s, i) => (
          <div key={i} style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 10 }}>TARJETA PEQUEÑA — {s.tag}</div>
            <div className="adm-grid-2">
              <Field label="Tag" value={s.tag} onChange={v => {
                const arr = [...d.products.secondary];
                arr[i] = { ...arr[i], tag: v };
                set('products.secondary', arr);
              }} />
              <Field label="CTA" value={s.ctaLabel} onChange={v => {
                const arr = [...d.products.secondary];
                arr[i] = { ...arr[i], ctaLabel: v };
                set('products.secondary', arr);
              }} />
              <Field label="Título" value={s.title} onChange={v => {
                const arr = [...d.products.secondary];
                arr[i] = { ...arr[i], title: v };
                set('products.secondary', arr);
              }} />
              <Field label="Descripción" value={s.description} onChange={v => {
                const arr = [...d.products.secondary];
                arr[i] = { ...arr[i], description: v };
                set('products.secondary', arr);
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Por qué Matilde */}
      <div className="adm-section">
        <div className="adm-section__title">Por qué Matilde (4 razones)</div>
        <div className="adm-grid-2">
          <Field label="Kicker" value={d.whyUs.kicker} onChange={v => set('whyUs.kicker', v)} />
          <Field label="Título línea 1" value={d.whyUs.titleLines[0]} onChange={v => set('whyUs.titleLines', [v, d.whyUs.titleLines[1]])} />
          <Field label="Título línea 2" value={d.whyUs.titleLines[1]} onChange={v => set('whyUs.titleLines', [d.whyUs.titleLines[0], v])} />
        </div>
        {d.whyUs.items.map((item, i) => (
          <div key={i} style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
            <div className="adm-grid-3">
              <Field label={`${item.n} Título`} value={item.title} onChange={v => {
                const arr = [...d.whyUs.items];
                arr[i] = { ...arr[i], title: v };
                set('whyUs.items', arr);
              }} />
              <div style={{ gridColumn: 'span 2' }}>
                <Field label="Texto" value={item.text} onChange={v => {
                  const arr = [...d.whyUs.items];
                  arr[i] = { ...arr[i], text: v };
                  set('whyUs.items', arr);
                }} textarea />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Final */}
      <div className="adm-section">
        <div className="adm-section__title">CTA Final</div>
        <div className="adm-grid-2">
          <Field label="Línea 1" value={d.ctaFinal.titleLines[0]} onChange={v => set('ctaFinal.titleLines', [v, d.ctaFinal.titleLines[1]])} />
          <Field label="Línea 2" value={d.ctaFinal.titleLines[1]} onChange={v => set('ctaFinal.titleLines', [d.ctaFinal.titleLines[0], v])} />
          <Field label="Script" value={d.ctaFinal.titleScript} onChange={v => set('ctaFinal.titleScript', v)} />
        </div>
      </div>

      {/* Footer */}
      <div className="adm-section">
        <div className="adm-section__title">Footer</div>
        <div className="adm-grid-2">
          <Field label="Tagline" value={d.footer.tagline} onChange={v => set('footer.tagline', v)} />
          <Field label="Línea descriptiva" value={d.footer.line} onChange={v => set('footer.line', v)} />
          <Field label="Legal / copyright" value={d.footer.legal} onChange={v => set('footer.legal', v)} />
        </div>
      </div>

      <div className="adm-save-row">
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Guardando...' : 'Guardar contenido'}
        </button>
        {status === 'ok' && <span className="adm-save-msg adm-save-msg--ok">✓ Guardado</span>}
        {status === 'err' && <span className="adm-save-msg adm-save-msg--err">✗ Error al guardar</span>}
      </div>
    </div>
  );
}
