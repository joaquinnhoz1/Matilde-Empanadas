import { useSite } from '@/hooks/useSite';
import logoMatilde from '@/assets/logo-matilde.png.png';
import s from './Footer.module.css';

export function Footer() {
  const site = useSite();
  const f = site.footer;
  const b = site.brand;

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <img src={logoMatilde} alt={b.name} className={s.logo} />
          <div className={s.tag}>{f.tagline}</div>
          <div className={s.line}>{f.line}</div>
        </div>

        <div className={s.cols}>
          {f.columns.map((col) => (
            <div key={col.title} className={s.col}>
              <div className={s.colTitle}>{col.title}</div>
              {col.items.map((item) => (
                <div key={item}>{item}</div>
              ))}
              {'small' in col && col.small && (
                <div className={s.colSmall}>{col.small}</div>
              )}
            </div>
          ))}
          <div className={s.col}>
            <div className={s.colTitle}>Seguinos</div>
            <div>{b.instagram}</div>
            <div>{b.email}</div>
          </div>
        </div>
      </div>
      <div className={s.legal}>{f.legal}</div>
    </footer>
  );
}
