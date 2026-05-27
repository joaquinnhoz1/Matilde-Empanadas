import { useState, useEffect } from 'react';
import { api, clearToken } from './api';
import { MenuEditor } from './sections/MenuEditor';
import { ContentEditor } from './sections/ContentEditor';
import { BranchEditor } from './sections/BranchEditor';
import { ImageUploader } from './sections/ImageUploader';
import { PasswordChanger } from './sections/PasswordChanger';

type Tab = 'menu' | 'content' | 'branches' | 'images' | 'password';

const TABS: { id: Tab; label: string }[] = [
  { id: 'menu', label: 'Menú' },
  { id: 'content', label: 'Contenido' },
  { id: 'branches', label: 'Sucursales' },
  { id: 'images', label: 'Imágenes' },
  { id: 'password', label: 'Contraseña' },
];

interface Props {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('menu');
  const [cartaData, setCartaData] = useState<unknown>(null);
  const [siteData, setSiteData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getCarta(), api.getSite()])
      .then(([carta, site]) => {
        setCartaData(carta);
        setSiteData(site);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    clearToken();
    onLogout();
  }

  return (
    <div className="adm-layout">
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">MATILDE</div>
        <nav className="adm-sidebar__nav">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`adm-sidebar__link ${tab === t.id ? 'adm-sidebar__link--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="adm-sidebar__logout">
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </aside>

      <main className="adm-main">
        {loading ? (
          <div style={{ color: '#888', fontSize: 14 }}>Cargando datos...</div>
        ) : (
          <>
            {tab === 'menu' && cartaData && (
              <MenuEditor initialData={cartaData as never} />
            )}
            {tab === 'content' && siteData && (
              <ContentEditor
                initialData={siteData as never}
                onSaved={setSiteData}
              />
            )}
            {tab === 'branches' && siteData && (
              <BranchEditor
                initialData={siteData as never}
                onSaved={setSiteData}
              />
            )}
            {tab === 'images' && <ImageUploader />}
            {tab === 'password' && <PasswordChanger />}
          </>
        )}
      </main>
    </div>
  );
}
