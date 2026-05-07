import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'

type Credentials = {
    email: string,
    password: string
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider(
            {
                name: 'Credentials',
                credentials: {},
                async authorize(credentials) {
                    const { email, password } = (credentials || {}) as Credentials
                    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL
                    if (!apiBase) {
                        console.error('[auth] NEXT_PUBLIC_API_BASE_URL is not set — set it in the deployment env and redeploy')
                        return null
                    }
                    if (!email || !password) {
                        console.warn('[auth] missing email or password in credentials submission')
                        return null
                    }
                    const url = `${apiBase}/users/login`
                    try {
                        const res = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password }),
                        })
                        if (!res.ok) {
                            const body = await res.text().catch(() => '')
                            console.warn(`[auth] backend rejected login (${res.status}) email=${email} body=${body}`)
                            return null
                        }
                        const { user } = await res.json()
                        if (!user) {
                            console.warn(`[auth] backend returned 200 but no user in body email=${email}`)
                            return null
                        }
                        return user
                    } catch (err) {
                        console.error(`[auth] fetch failed POST ${url} email=${email}`, err)
                        return null
                    }
                }
            }
        ),

    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30 * 3 // 60 seconds * 60 minutes * 24 hours * 30 days * 3 month
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login'
    }
}
