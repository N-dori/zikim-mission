import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { SignJWT } from 'jose'
import { authOptions } from '../[...nextauth]/authOptions'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 })
  }

  const raw = process.env.NEXTAUTH_SECRET
  if (!raw) {
    return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 })
  }

  const secret = new TextEncoder().encode(raw)
  const token = await new SignJWT({ email: session.user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret)

  return NextResponse.json({ token })
}
