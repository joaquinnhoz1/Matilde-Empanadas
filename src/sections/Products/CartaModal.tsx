import { useEffect } from 'react';
import type { CartaSection } from '@/config/carta';
import s from './CartaModal.module.css';

type Props = {
  section: CartaSection;
  onClose: () => void;
};

export function CartaModal({ section, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <div className={s.head}>
          <h2 className={s.title}>{section.label}</h2>
          <button className={s.close} onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className={s.grid}>
          {section.items.map(item => (
            <article key={item.name} className={s.item}>
              <img
                className={s.photo}
                src={`/carta/${section.folder}/${encodeURIComponent(item.photo)}`}
                alt={item.name}
                loading="lazy"
              />
              <div className={s.info}>
                <div className={s.itemHead}>
                  <span className={s.name}>{item.name}</span>
                  <div className={s.badges}>
                    {item.popular && <span className={s.badge}>✦ Popular</span>}
                    {item.veggie && <span className={`${s.badge} ${s.badgeVeggie}`}>● Veggie</span>}
                  </div>
                </div>
                {item.desc && <p className={s.desc}>{item.desc}</p>}
                <span className={s.price}>${item.price.toLocaleString('es-AR')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
