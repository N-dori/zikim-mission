import { Tplayer } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

type PlayerPreviewProps = {
    player: Tplayer
    i:number
}

export default function PlayerPreview({player, i}: PlayerPreviewProps) {
  return (
    <div key={player._id||i} className='player-warrper flex-jc-ac flex-col'>
    <Image src={player.img} width={70} height={70} alt={"player name"} />
    <p>{player.nickName}</p>

    </div>
  )
}