'use client'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

let cachedToken: string | null = null
let cachedAt = 0
let inflight: Promise<string | null> | null = null
const TTL_MS = 50 * 60 * 1000 // refresh 10 min before the 1h server expiry

async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch('/api/auth/express-token')
    if (!res.ok) return null
    const { token } = await res.json()
    return token || null
  } catch {
    return null
  }
}

export async function getApiToken(): Promise<string | null> {
  if (cachedToken && Date.now() - cachedAt < TTL_MS) return cachedToken
  if (inflight) return inflight
  inflight = (async () => {
    const token = await fetchToken()
    if (token) {
      cachedToken = token
      cachedAt = Date.now()
    }
    inflight = null
    return token
  })()
  return inflight
}

function clearToken() {
  cachedToken = null
  cachedAt = 0
}

type ApiFetchOptions = RequestInit & { auth?: boolean }

export async function apiFetch(path: string, opts: ApiFetchOptions = {}): Promise<Response> {
  const { auth = true, headers: incomingHeaders, ...rest } = opts
  const headers = new Headers(incomingHeaders)

  if (auth) {
    const token = await getApiToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }
  if (rest.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
  let res = await fetch(url, { ...rest, headers })

  // If a previously cached token expired between fetches, refresh once and retry.
  if (auth && res.status === 401 && cachedToken) {
    clearToken()
    const fresh = await getApiToken()
    if (fresh) {
      headers.set('Authorization', `Bearer ${fresh}`)
      res = await fetch(url, { ...rest, headers })
    }
  }

  return res
}
