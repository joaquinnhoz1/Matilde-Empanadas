import { useState, useEffect } from 'react';
import { carta as fallback, type CartaSection } from '@/config/carta';
import { getApiBase } from '@/utils/apiBase';

export function useCarta() {
  const [data, setData] = useState<CartaSection[]>(fallback);

  useEffect(() => {
    fetch(`${getApiBase()}/carta`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  return data;
}
