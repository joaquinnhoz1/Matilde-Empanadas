import { useState, useEffect } from 'react';
import { site as fallback, type Site } from '@/config/site';

export function useSite() {
  const [data, setData] = useState<Site>(fallback);

  useEffect(() => {
    const apiBase = window.location.port === '5173' ? 'http://localhost:3001/api' : '/api';
    fetch(`${apiBase}/site`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  return data;
}
