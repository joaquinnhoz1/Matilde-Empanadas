import { site } from '@/config/site';
import { whatsappUrl } from '@/utils/whatsapp';
import s from './Branches.module.css';

function WaIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Branches() {
  const b = site.branches;
  const [lp, cb] = b.list;

  return (
    <section id="sucursales" className={s.section}>
      <span className={s.kicker}>{b.kicker}</span>
      <h2 className={s.title}>
        {b.titleLines[0]}<br />
        <span className={s.titleScript}>{b.titleScript}</span>
      </h2>

      <div className={s.grid}>
        {/* La Plata */}
        <div className={s.card}>
          <div className={s.tab}>SUCURSAL 1</div>
          <div className={s.cardInner}>
            <h3 className={s.name}>{lp.name}</h3>
            <div className={s.sub}>{lp.subtitle} · {lp.modality}</div>
            <div className={s.map}>
              <iframe
                src={lp.mapEmbedUrl}
                className={s.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa ${lp.name}`}
                allowFullScreen
              />
            </div>
            {lp.mapsUrl && (
              <a href={lp.mapsUrl} target="_blank" rel="noopener noreferrer" className={s.mapsLink}>
                📍 Ver en Google Maps
              </a>
            )}
            <dl className={s.meta}>
              <div><dt>Dirección</dt><dd>{lp.address}</dd></div>
              <div><dt>Horario</dt><dd>{lp.hours}</dd></div>
              <div><dt>Modalidad</dt><dd>{lp.coverage}</dd></div>
              <div><dt>Formas de pago</dt><dd>{lp.paymentMethods}</dd></div>
            </dl>
            <a
              className={s.btnSticker}
              href={whatsappUrl(lp.whatsapp, lp.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WaIcon color="#fff" />
              <span className={s.btnName}>WhatsApp La Plata</span>
            </a>
          </div>
        </div>

        {/* Citybell */}
        <div className={`${s.card} ${s.cardBlue}`}>
          <div className={`${s.tab} ${s.tabBlue}`}>SUCURSAL 2</div>
          <div className={s.cardInner}>
            <h3 className={`${s.name} ${s.nameCream}`}>{cb.name}</h3>
            <div className={`${s.sub} ${s.subCream}`}>{cb.subtitle} · {cb.modality}</div>
            <div className={s.map}>
              <iframe
                src={cb.mapEmbedUrl}
                className={s.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa ${cb.name}`}
                allowFullScreen
              />
            </div>
            {cb.mapsUrl && (
              <a href={cb.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${s.mapsLink} ${s.mapsLinkCream}`}>
                📍 Ver en Google Maps
              </a>
            )}
            <dl className={`${s.meta} ${s.metaCream}`}>
              <div><dt>Dirección</dt><dd>{cb.address}</dd></div>
              <div><dt>Horario</dt><dd>{cb.hours}</dd></div>
              <div><dt>Modalidad</dt><dd>{cb.coverage}</dd></div>
              <div><dt>Formas de pago</dt><dd>{cb.paymentMethods}</dd></div>
            </dl>
            <a
              className={`${s.btnSticker} ${s.btnStickerCream}`}
              href={whatsappUrl(cb.whatsapp, cb.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WaIcon color="var(--brand-blue)" />
              <span className={`${s.btnName} ${s.btnNameBlue}`}>WhatsApp Citybell</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
