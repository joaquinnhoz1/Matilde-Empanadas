import { useState, useEffect } from 'react';
import { site as fallback, type Site } from '@/config/site';
import { getApiBase } from '@/utils/apiBase';

// Caché de módulo: todos los componentes comparten un solo fetch
let cached: Site | null = null;
let pending: Promise<Site | null> | null = null;

function fetchSite(): Promise<Site | null> {
  if (!pending) {
    pending = fetch(`${getApiBase()}/site`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) cached = d; return d; })
      .catch(() => null);
  }
  return pending;
}

export function useSite() {
  const [data, setData] = useState<Site>(cached ?? fallback);

  useEffect(() => {
    if (cached) { setData(cached); return; }
    fetchSite().then(d => { if (d) setData(d); });
  }, []);

  return data;
}
