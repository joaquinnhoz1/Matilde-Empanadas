import { useState } from 'react';
import { site } from '@/config/site';
import { carta } from '@/config/carta';
import { CartaModal } from './CartaModal';
import s from './Products.module.css';

export function Products() {
  const p = site.products;
  const [vinos, dips] = p.secondary;
  const extras = p.extras;
  const [openSection, setOpenSection] = useState<string | null>(null);
  const activeSection = carta.find(c => c.id === openSection) ?? null;

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
        <article className={`${s.bentoLarge} ${s.clickable}`} onClick={() => setOpenSection('empanadas')}>
          <div className={`${s.photoLarge} photo photo--food-bright`}>
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
        <article className={`${s.bentoSmall} ${s.bentoSmallPink} ${s.clickable}`} onClick={() => setOpenSection('vinos')}>
          <div className={`${s.photoSm} photo photo--wine`}>
            <span className="sr-only">Botella de vino</span>
          </div>
          <div className={s.tag}>{vinos.tag}</div>
          <h3 className={s.bentoTitleSm}>{vinos.title}</h3>
          <p className={s.bentoTextSm}>{vinos.description}</p>
          <span className={s.bentoLink}>{vinos.ctaLabel}</span>
        </article>

        {/* Small — Dips */}
        <article className={`${s.bentoSmall} ${s.bentoSmallYellow} ${s.clickable}`} onClick={() => setOpenSection('dips')}>
          <div className={`${s.photoSm} photo photo--dips`}>
            <span className="sr-only">Dips</span>
          </div>
          <div className={s.tag}>{dips.tag}</div>
          <h3 className={s.bentoTitleSm}>{dips.title}</h3>
          <p className={s.bentoTextSm}>{dips.description}</p>
          <span className={s.bentoLink}>{dips.ctaLabel}</span>
        </article>

        {/* Small — Pizzas */}
        <article className={`${s.bentoSmall} ${s.bentoSmallBlue} ${s.clickable}`} onClick={() => setOpenSection('pizzas')}>
          <div className={`${s.photoSm} photo photo--pizza`}>
            <span className="sr-only">Pizza</span>
          </div>
          <div className={s.tag}>04 / PIZZAS</div>
          <h3 className={s.bentoTitleSm}>A la pala.</h3>
          <p className={s.bentoTextSm}>Fugazzeta, fungi, cuatro quesos y más.</p>
          <span className={s.bentoLink}>Ver pizzas →</span>
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

      {activeSection && (
        <CartaModal section={activeSection} onClose={() => setOpenSection(null)} />
      )}
    </section>
  );
}
