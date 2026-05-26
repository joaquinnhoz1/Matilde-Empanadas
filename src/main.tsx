import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Styles must load in this order: reset → fonts → tokens → global
import './styles/reset.css';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
