"use client"
import React, { useEffect, useState } from 'react'
import { questions } from '../assets/data/triviaData'
import {TrivaPreview} from '../cmps/TrivaPreview'
import { Confetti1 } from '../cmps/Confetti'

type Props = {}

export default function page({ }: Props) {
    const [questIndex, setQuestIndex] = useState(0)
    const [isDone, setIsDone] = useState(true)
    const [winHeight, setwinHeight] = useState({height: window.innerHeight})

   
    useEffect(() => {
        setwinHeight({height:window.innerHeight})
    }, [])
    

    const incrementIndex  =() => {
        if(questIndex === questions.length-1){
            setIsDone(false)
            return 
        }
        setQuestIndex(questIndex+1)
    }
  
   
    return (
        <main className='gc2 flex-col flex-sb '>
            <h2>חידון חטיבה 179</h2>
            <h3>גלו עובדות מעניינות </h3>
            <article className='trivia-container  '>
           { isDone? <TrivaPreview incrementIndex={incrementIndex} question={questions[questIndex]}/>:

            <section style={{height:winHeight.height}} className='end-of-triva-msg-contaoner flex-col flex-jc-ac'>
                           <Confetti1/>
                <p className='end-of-triva-msg'>כל הכבוד !!!</p>
                <button type='button' className='back-btn'>חזרה לעמוד הראשי</button>
                <button type='button' className='back-btn'>שחק מהתחלה</button>
            </section>}
  
            </article>
        </main>
    )
}