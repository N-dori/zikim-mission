import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy proxy so importing this module doesn't throw at build time when
// env vars haven't been injected yet (Next.js collects route metadata
// during `next build` by importing the module — without the secrets,
// createClient() throws "supabaseKey is required" and crashes the build).
//
// The real client is created on first property access (which is at request
// time on Vercel serverless, where env vars ARE available).

let cached: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (cached) return cached
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  }
  cached = createClient(url, key)
  return cached
}

const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver)
  },
})

export default supabase
