import { Confetti1 } from '@/app/cmps/Confetti'
import Link from 'next/link'
import React from 'react'
import { Tanswer, Tplayer } from '@/app/types/types'
import ScoreTableList from './ScoreTableList'

type FinalScreenProps = {
  roomId: string
  winHeight: {
    height: number
  }
  handelNewGame: () => void
  players: Tplayer[]
  results: Tanswer[]
}

export default function FinalScreen({
  roomId,
  players,
  winHeight,
  results,
}: FinalScreenProps) {

  return (
    <section
      style={{ height: winHeight.height }}
      className='end-of-triva-msg-conatiner flex-col flex-jc-ac'
    >

      <Confetti1 />

      <p className='end-of-triva-msg'>
        כל הכבוד !!!
      </p>

      <ScoreTableList
        roomId={roomId}
        players={players}
        results={results}
      />

      <Link
        className='no-under-line back-btn tac'
        href='/'
      >
        חזרה לעמוד הראשי
      </Link>

    </section>
  )
}