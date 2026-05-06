const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(/\/$/, '');

export function apiPath(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}/api${p}`;
}

export function getStoredToken() {
  return localStorage.getItem('token');
}

/**
 * @param {string} path - e.g. '/dashboard/stats' (after /api)
 * @param {RequestInit} [options]
 */
export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }
  const token = getStoredToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(apiPath(path), { ...options, headers });

  if (res.status === 401 && !path.startsWith('/auth/login')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const p = window.location.pathname;
    const safe = p.startsWith('/') && !p.startsWith('//') ? p : '/dashboard';
    window.location.assign(`/login?next=${encodeURIComponent(safe)}`);
  }

  return res;
}

export function apiGet(path) {
  return apiFetch(path, { method: 'GET' });
}

export function apiPost(path, body) {
  return apiFetch(path, { method: 'POST', body: JSON.stringify(body) });
}

export function apiPatch(path, body) {
  return apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) });
}
