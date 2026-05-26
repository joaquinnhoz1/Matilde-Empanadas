import { useEffect, useState } from 'react';

/** True once window.scrollY exceeds threshold (with simple passive listener). */
export function useScrollPast(threshold: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    function update() { setPast(window.scrollY > threshold); }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);
  return past;
}
