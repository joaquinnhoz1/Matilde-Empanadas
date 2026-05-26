import { site } from '@/config/site';
import s from './Pillars.module.css';

export function Pillars() {
  return (
    <section className={s.pillars}>
      {site.pillars.map((p) => (
        <div key={p.title} className={s.card}>
          <span className={s.icon}>{p.icon}</span>
          <span className={s.title}>{p.title}</span>
          <span className={s.sep}>—</span>
          <span className={s.txt}>{p.text}</span>
        </div>
      ))}
    </section>
  );
}
