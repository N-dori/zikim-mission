import { Tplayer } from '@/app/types/types'
import React from 'react'
import PlayerPreview from './PlayerPreview'

type PlayersListProps = {
    players: Tplayer[]
}

export default function PlayersList({ players }: PlayersListProps) {
  return (
    <section className='players-container flex'>
      {players
        .filter(p => p._id || p.nickName)
        .map((player, i) => (
          <PlayerPreview
            key={player._id || player.nickName}
            player={player}
            i={i}
          />
        ))}
    </section>
  )
}