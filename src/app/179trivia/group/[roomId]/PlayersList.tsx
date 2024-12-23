import { Tplayer } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'
import PlayerPreview from './PlayerPreview'

type PlayersListProps = {
    players:Tplayer[]
}

export default function PlayersList({players}:PlayersListProps ) {
  return (
    <section  className='players-container flex'>
    {players &&
        players.map((player,i) =>
             <PlayerPreview key={player._id || i} player={player} i={i}/>
           )}
           </section>
  )
}