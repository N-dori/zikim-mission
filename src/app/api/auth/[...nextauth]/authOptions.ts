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
                    try {
                        const { email, password } = credentials as Credentials
                        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL
                        if (!apiBase) {
                            console.error('NEXT_PUBLIC_API_BASE_URL not set')
                            return null
                        }
                        const res = await fetch(`${apiBase}/users/login`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password }),
                        })
                        if (!res.ok) return null
                        const { user } = await res.json()
                        return user || null
                    } catch (err) {
                        console.log(err)
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
