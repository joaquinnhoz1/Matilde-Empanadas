import isologo from '@/assets/isologo-m.png.png';
import s from './Marquee.module.css';

const WORDS = ['AL DISCO', 'VINITO', '+DIPS'];

function IsoLogo() {
  return <img src={isologo} alt="" className={s.iso} />;
}

// 12 copies → -50% shifts 6 full sets (~2600px) — covers up to QHD without gaps
const track = Array.from({ length: 12 }, () => WORDS).flat();

export function Marquee() {
  return (
    <div className={s.marquee} aria-hidden="true">
      <div className={s.track}>
        {track.map((word, i) => (
          <span key={i} className={s.item}>
            <span className={s.word}>{word}</span>
            <IsoLogo />
          </span>
        ))}
      </div>
    </div>
  );
}
