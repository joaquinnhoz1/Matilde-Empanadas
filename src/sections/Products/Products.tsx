import { site } from '@/config/site';
import s from './Products.module.css';

export function Products() {
  const p = site.products;
  const [vinos, dips] = p.secondary;
  const extras = p.extras;

  return (
    <section id="productos" className={s.section}>
      <div className={s.head}>
        <span className={s.kicker}>{p.kicker}</span>
        <h2 className={s.title}>
          {p.titleLines[0]}<br />
          <span className={s.titleScript}>{p.titleScript}</span>
        </h2>
      </div>

      <div className={s.bento}>
        {/* Large — Empanadas */}
        <article className={s.bentoLarge}>
          <div className={`${s.photoLarge} photo photo--lasagna`}>
            <span className="sr-only">Empanadas variadas</span>
          </div>
          <div className={s.bentoContent}>
            <div className={s.tag}>{p.feature.tag}</div>
            <h3 className={s.bentoTitle}>
              {p.feature.title.split('\n').map((l, i) => (
                <span key={i}>{l}{i === 0 && <br />}</span>
              ))}
            </h3>
            <p className={s.bentoText}>{p.feature.description}</p>
            <span className={s.bentoLink}>{p.feature.ctaLabel}</span>
          </div>
        </article>

        {/* Small — Vinos */}
        <article className={`${s.bentoSmall} ${s.bentoSmallPink}`}>
          <div className={`${s.photoSm} photo photo--wine`}>
            <span className="sr-only">Botella</span>
          </div>
          <div className={s.tag}>{vinos.tag}</div>
          <h3 className={s.bentoTitleSm}>{vinos.title}</h3>
          <p className={s.bentoTextSm}>{vinos.description}</p>
          <span className={s.bentoLink}>{vinos.ctaLabel}</span>
        </article>

        {/* Small — Dips */}
        <article className={`${s.bentoSmall} ${s.bentoSmallYellow}`}>
          <div className={`${s.photoSm} photo photo--dips`}>
            <span className="sr-only">Dips</span>
          </div>
          <div className={s.tag}>{dips.tag}</div>
          <h3 className={s.bentoTitleSm}>{dips.title}</h3>
          <p className={s.bentoTextSm}>{dips.description}</p>
          <span className={s.bentoLink}>{dips.ctaLabel}</span>
        </article>

        {/* Extras */}
        <article className={s.bentoExtras}>
          <div className={s.extrasTag}>{extras.tag}</div>
          <ul className={s.extrasList}>
            {extras.items.map((item, i) => (
              <li key={i}>
                <span className={s.extrasBullet}>·</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
          <span className={s.bentoLink}>{extras.ctaLabel}</span>
        </article>
      </div>
    </section>
  );
}
