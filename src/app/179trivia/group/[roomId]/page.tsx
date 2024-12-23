
import React from 'react'
import GroupRoom from './GroupRoom';

type Props = {
  roomId: string;
};





export default async function Praticipent({ params }) {
  const { roomId } = params;
  if (!roomId) {
    return
  }


  return (
    <main className='trivia-waiting-room-warpper gc2' >
      <h1 className='tac'>  חידון 179 </h1>
      <GroupRoom roomId={roomId}/>
  

    </main>
  )
}