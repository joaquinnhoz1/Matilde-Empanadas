import { useState } from 'react';
import { api } from './api';

interface Props {
  onLogin: (token: string) => void;
}

export function LoginPage({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.login(password);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al iniciar sesión');
      } else {
        localStorage.setItem('admin_token', data.token);
        onLogin(data.token);
      }
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-login__box" onSubmit={handleSubmit}>
        <div className="adm-login__logo">MATILDE</div>
        <div className="adm-login__sub">Panel de administración</div>
        <label className="adm-login__label" htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          className="adm-login__input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
        />
        {error && <div className="adm-login__error">{error}</div>}
        <button className="adm-login__btn" type="submit" disabled={loading || !password}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
