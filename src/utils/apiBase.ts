/**
 * Resuelve la base URL del API según el entorno:
 *  - VITE_API_URL definido (Vercel build): usa esa URL + /api
 *  - Dev sin env var (puerto 5173): llama directo a Express en localhost:3001
 *  - Producción sin env var (Express sirve todo): usa /api relativo
 */
export function getApiBase(): string {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (envUrl) return `${envUrl.replace(/\/$/, '')}/api`;
  if (typeof window !== 'undefined' && window.location.port === '5173') {
    return 'http://localhost:3001/api';
  }
  return '/api';
}
