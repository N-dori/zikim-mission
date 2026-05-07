
import React from 'react'
import GroupRoom from './GroupRoom';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'

type Props = {
  roomId: string;
};





export default async function Praticipent({ params }) {
  const { roomId } = params;
  if (!roomId) {
    return
  }

  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(`/179trivia/group/${roomId}`)}`)
  }


  return (
    <main className='trivia-waiting-room-warpper gc2' >
      <h1 className='tac'>  חידון 179 </h1>
      <GroupRoom roomId={roomId}/>
  

    </main>
  )
}