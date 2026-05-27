import { useState, useEffect } from 'react';
import { carta as fallback, type CartaSection } from '@/config/carta';

export function useCarta() {
  const [data, setData] = useState<CartaSection[]>(fallback);

  useEffect(() => {
    const apiBase = window.location.port === '5173' ? 'http://localhost:3001/api' : '/api';
    fetch(`${apiBase}/carta`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  return data;
}
