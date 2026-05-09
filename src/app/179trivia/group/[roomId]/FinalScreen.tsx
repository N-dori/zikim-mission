import { Confetti1 } from '@/app/cmps/Confetti'
import Link from 'next/link'
import React from 'react'
import { TscoreSummary } from '@/app/types/types'
import ScoreTableList from './ScoreTableList'

type FinalScreenProps = {
  roomId: string
  winHeight: { height: number }
  scoreboard: TscoreSummary[] | null
}

export default function FinalScreen({ winHeight, scoreboard }: FinalScreenProps) {

  return (
    <section
      style={{ height: winHeight.height }}
      className='end-of-triva-msg-conatiner flex-col flex-jc-ac'
    >
      <Confetti1 />

      <p className='end-of-triva-msg'>
        כל הכבוד !!!
      </p>

      <ScoreTableList players={[]} precomputed={scoreboard} />

      <Link
        className='no-under-line back-btn tac'
        href='/'
      >
        חזרה לעמוד הראשי
      </Link>
    </section>
  )
}
