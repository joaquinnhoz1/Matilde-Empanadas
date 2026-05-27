import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Styles must load in this order: reset → fonts → tokens → global
import './styles/reset.css';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';

import App from './App';
import { AdminApp } from './admin/AdminApp';

const isAdmin = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </StrictMode>,
);
