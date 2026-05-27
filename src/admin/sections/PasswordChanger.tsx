import { useState } from 'react';
import { api } from '../api';

export function PasswordChanger() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPass !== confirm) {
      setErrorMsg('Las contraseñas nuevas no coinciden');
      return;
    }
    if (newPass.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setStatus('saving');
    setErrorMsg('');
    try {
      const res = await api.changePassword(current, newPass);
      const data = await res.json();
      if (res.ok) {
        setStatus('ok');
        setCurrent(''); setNewPass(''); setConfirm('');
      } else {
        setErrorMsg(data.error ?? 'Error al cambiar contraseña');
        setStatus('err');
      }
    } catch {
      setErrorMsg('No se pudo conectar con el servidor');
      setStatus('err');
    }
    setTimeout(() => { if (status !== 'ok') setStatus('idle'); }, 4000);
  }

  return (
    <div>
      <h2 className="adm-main__title">Cambiar contraseña</h2>
      <div className="adm-section" style={{ maxWidth: 420 }}>
        <form onSubmit={handleSubmit}>
          <div className="adm-field">
            <label>Contraseña actual</label>
            <input type="password" value={current} onChange={e => setCurrent(e.target.value)} autoComplete="current-password" />
          </div>
          <div className="adm-field">
            <label>Nueva contraseña</label>
            <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} autoComplete="new-password" />
          </div>
          <div className="adm-field">
            <label>Confirmar nueva contraseña</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password" />
          </div>
          {errorMsg && <div style={{ fontSize: 13, color: '#c0392b', marginBottom: 8 }}>{errorMsg}</div>}
          <div className="adm-save-row">
            <button className="adm-btn adm-btn--primary" type="submit" disabled={status === 'saving' || !current || !newPass || !confirm}>
              {status === 'saving' ? 'Guardando...' : 'Cambiar contraseña'}
            </button>
            {status === 'ok' && <span className="adm-save-msg adm-save-msg--ok">✓ Contraseña actualizada</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
