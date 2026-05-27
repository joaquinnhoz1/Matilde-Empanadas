import { useSite } from '@/hooks/useSite';
import s from './About.module.css';

export function About() {
  const site = useSite();
  const a = site.about;

  return (
    <section id="historia" className={s.section}>
      <div className={s.kickerBox}>
        <span className={s.kickerLine} />
        <span className={s.kicker}>{a.kicker}</span>
        <span className={s.kickerLine} />
      </div>

      <h2 className={s.title}>
        {a.titleLines[0]}<br />
        <span className={s.titleScript}>{a.titleScript}</span><br />
        {a.titleClose}
      </h2>

      <div className={s.grid}>
        <div className={s.photoWrap}>
          <div className={`${s.photo} photo photo--cocina`}>
            <span className="sr-only">{a.photoCaption}</span>
          </div>
          <div className={s.stamp1}>{a.stampPrimary}</div>
          <div className={s.stamp2}>{a.stampSecondary}</div>
        </div>

        <div className={s.text}>
          {a.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className={s.quoteBox}>
            <span className={s.quoteMark}>"</span>
            <p className={s.quoteTxt}>{a.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
