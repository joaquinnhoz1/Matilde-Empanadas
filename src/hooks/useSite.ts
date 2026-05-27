import { useState, useEffect } from 'react';
import { site as fallback, type Site } from '@/config/site';
import { getApiBase } from '@/utils/apiBase';

export function useSite() {
  const [data, setData] = useState<Site>(fallback);

  useEffect(() => {
    fetch(`${getApiBase()}/site`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  return data;
}
