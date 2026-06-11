const BASE = import.meta.env.VITE_API_URL || '/api'

async function request(method, path, body, token) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }
  if (token) opts.headers['Authorization'] = `Bearer ${token}`
  if (body)  opts.body = JSON.stringify(body)

  const res  = await fetch(`${BASE}${path}`, opts)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (name, email, password) =>
    request('POST', '/auth/register', { name, email, password }),

  login: (email, password) =>
    request('POST', '/auth/login', { email, password }),

  logout: (token) =>
    request('POST', '/auth/logout', null, token),
}

// ── Accounts ──────────────────────────────────────────────────────────────────
export const accountApi = {
  create: (token) =>
    request('POST', '/accounts', {}, token),

  getAll: (token) =>
    request('GET', '/accounts', null, token),

  getBalance: (accountId, token) =>
    request('GET', `/accounts/balance/${accountId}`, null, token),
}

// ── Transactions ──────────────────────────────────────────────────────────────
export const transactionApi = {
  create: (fromAccount, toAccount, amount, idempotencyKey, token) =>
    request('POST', '/transactions', { fromAccount, toAccount, amount, idempotencyKey }, token),

  getAll: (token) =>
    request('GET', '/transactions', null, token),
}