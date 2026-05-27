import { useState } from 'react';
import './admin.css';
import { LoginPage } from './LoginPage';
import { AdminPanel } from './AdminPanel';

export function AdminApp() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));

  function handleLogin(newToken: string) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
  }

  // Mark body for admin-specific CSS scoping
  document.body.classList.add('admin-mode');

  if (!token) return <LoginPage onLogin={handleLogin} />;
  return <AdminPanel onLogout={handleLogout} />;
}
