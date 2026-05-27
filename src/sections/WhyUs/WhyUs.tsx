import { useSite } from '@/hooks/useSite';
import s from './WhyUs.module.css';

export function WhyUs() {
  const site = useSite();
  const w = site.whyUs;

  return (
    <section className={s.section}>
      <div className={s.kicker}>{w.kicker}</div>
      <h2 className={s.title}>
        {w.titleLines[0]}<br />
        {w.titleLines[1]}
      </h2>
      <div className={s.grid}>
        {w.items.map((item) => (
          <div key={item.n} className={s.card}>
            <div className={s.num}>{item.n}</div>
            <h3 className={s.cardTitle}>{item.title}</h3>
            <p className={s.cardText}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
