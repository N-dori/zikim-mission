"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { questions } from '../../assets/data/triviaData'
import { Confetti1 } from '../../cmps/Confetti'
import Link from 'next/link'
import { SingelTriviaPreview } from './SingelTriviaPreview'
import { shuffle, ROUND_MAX } from '@/app/libs/round'

type Props = {}

export default function SingelGame({}: Props) {
    const deck = useMemo(() => shuffle(questions).slice(0, ROUND_MAX), [])
    const [questIndex, setQuestIndex] = useState(0)
    const [isDone, setIsDone] = useState(false)
    const [winHeight, setwinHeight] = useState({ height: 450 })


    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Your window-dependent code here
            setwinHeight({ height: window.innerHeight })
        }
    }, [])


    const incrementIndex = () => {
        if (questIndex === deck.length - 1) {
            setIsDone(true)
            return
        }
        setQuestIndex(questIndex + 1)
    }

    const handelNewGame = () => {
        setQuestIndex(0)
        setIsDone(false)
    }

  return (
    <main className='gc2 flex-col flex-sb '>
    <article className='trivia-container  '>
    {isDone ? <section style={{ height: winHeight.height }} className='end-of-triva-msg-contaoner flex-col flex-jc-ac'>
        <Confetti1 />
        <p className='end-of-triva-msg'>כל הכבוד !!!</p>
         <Link className='no-under-line back-btn tac' href={'/'}>חזרה לעמוד הראשי</Link>
        <button type='button' className='back-btn' onClick={handelNewGame}>שחק מהתחלה</button>
    </section> :
        <SingelTriviaPreview incrementIndex={incrementIndex} question={deck[questIndex]} />

    }

</article>
</main>
  )
}