import React from 'react'
import ChroniclesGroupRoom from './ChroniclesGroupRoom'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'

export default async function Participant({ params }) {
    const { roomId } = params
    if (!roomId) return

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect(`/auth/login?callbackUrl=${encodeURIComponent(`/otef-chronicles/group/${roomId}`)}`)
    }

    return (
        <main className='trivia-waiting-room-warpper gc2'>
            <h1 className='tac'>רצועת עזה</h1>
            <ChroniclesGroupRoom roomId={roomId} />
        </main>
    )
}
