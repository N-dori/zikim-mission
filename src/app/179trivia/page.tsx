"use client"
import React, { useEffect, useState } from 'react'
import { questions } from '../assets/data/triviaData'
import { TrivaPreview } from '../cmps/TrivaPreview'
import { Confetti1 } from '../cmps/Confetti'
import Link from 'next/link'

type Props = {}

export default function page({ }: Props) {
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
        if (questIndex === questions.length - 1) {
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
            <h2>חידון חטיבה 179</h2>
            <h3>גלו עובדות מעניינות </h3>
            <article className='trivia-container  '>
                {isDone ? <section style={{ height: winHeight.height }} className='end-of-triva-msg-contaoner flex-col flex-jc-ac'>
                    <Confetti1 />
                    <p className='end-of-triva-msg'>כל הכבוד !!!</p>
                     <Link className='no-under-line back-btn tac' href={'/'}>חזרה לעמוד הראשי</Link>
                    <button type='button' className='back-btn' onClick={handelNewGame}>שחק מהתחלה</button>
                </section> :
                    <TrivaPreview incrementIndex={incrementIndex} question={questions[questIndex]} />

                }

            </article>
        </main>
    )
}