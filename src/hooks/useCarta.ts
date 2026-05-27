import { useState, useEffect } from 'react';
import { carta as fallback, type CartaSection } from '@/config/carta';
import { getApiBase } from '@/utils/apiBase';

// Caché de módulo: todos los componentes comparten un solo fetch
let cached: CartaSection[] | null = null;
let pending: Promise<CartaSection[] | null> | null = null;

function fetchCarta(): Promise<CartaSection[] | null> {
  if (!pending) {
    pending = fetch(`${getApiBase()}/carta`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) cached = d; return d; })
      .catch(() => null);
  }
  return pending;
}

export function useCarta() {
  const [data, setData] = useState<CartaSection[]>(cached ?? fallback);

  useEffect(() => {
    if (cached) { setData(cached); return; }
    fetchCarta().then(d => { if (d) setData(d); });
  }, []);

  return data;
}
