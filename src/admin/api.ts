import { getApiBase } from '@/utils/apiBase';

function BASE() {
  return getApiBase();
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

function getToken() {
  return localStorage.getItem('admin_token') ?? '';
}

async function request(method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE()}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    clearToken();
    window.location.reload();
  }
  return res;
}

export const api = {
  login: (password: string) =>
    fetch(`${BASE()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }),

  changePassword: (current: string, newPassword: string) =>
    request('POST', '/auth/change-password', { current, newPassword }),

  getCarta: () => fetch(`${BASE()}/carta`).then(r => r.json()),
  putCarta: (data: unknown) => request('PUT', '/carta', data),

  getSite: () => fetch(`${BASE()}/site`).then(r => r.json()),
  putSite: (data: unknown) => request('PUT', '/site', data),

  uploadImage: async (folder: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${BASE()}/upload/${folder}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: form,
    });
    if (res.status === 401) { clearToken(); window.location.reload(); }
    return res;
  },
};
