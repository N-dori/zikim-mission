import React, { useEffect, useState } from 'react'
import { Question } from '../assets/data/triviaData'
import Image from 'next/image'
import { Tplayer } from '../types/types'

type TrivaPreviewProps = {
  players:Tplayer[]
  question: Question
  handelAnswerClicked: (score: number, time: number ,isVinner:boolean) => void
  timeLeft: number
  isDisable: boolean
  setIsDisable: (isDisable: boolean) => void
  setIsRoundFinished: (isRoundFinished: boolean) => void
  setTimeLeft: (time: number) => void
  timeInerval: any
  initialTime: number
  cheackVictory:() => void 
}

export function TrivaPreview({ players,initialTime, timeInerval, question, timeLeft, setTimeLeft, handelAnswerClicked, isDisable, setIsDisable, setIsRoundFinished,cheackVictory }: TrivaPreviewProps) {

  const [currentOpt, setCurrentOpt] = useState('')
  const [optColor, setOptColor] = useState('')
  // useEffect(() => {

  // }, [question.question])


  useEffect(() => {

    setTimeout(() => {

      setIsRoundFinished(true)
      setIsDisable(false)
      clearInterval(timeInerval)
      setTimeLeft(initialTime)
      cheackVictory()
    }, 35000);
  }, [])

  const handelOptClicked = (isCurrect: boolean, id: string) => {

    setCurrentOpt(id)
    // keep the record of the answer
    if (isCurrect) {
      handelAnswerClicked(1, timeLeft, false)

    } else {
      handelAnswerClicked(0, timeLeft, false)

    }

    setIsDisable(!isDisable)// disable all buttons
    setOptColor(`linear-gradient( #308f18, #041405)`)

  }

  return (


    <article className='trivia-question flex-col flex-jc'>
      <h2 className='question-title flex-jc-ac'><span className='tac'>{question.question}</span></h2>

      <div className='options-container grid'>
        {question.options.map((opt, i) =>
          <button type='button' className={`btn-option btn-option${i + 1} tac`}
            disabled={isDisable}
            key={opt.id}
            style={{
              fontSize:'1em',
              border: " 6px solid transparent",
              borderImage: `linear-gradient(45deg, rgb(34, 34, 34),rgb(59, 208, 22))`,
              borderImageSlice: 1,
              color: `${currentOpt === opt.id ? '#fff' : ''}`,
              background: `${currentOpt === opt.id ?` linear-gradient(45deg, #308f18, #041405)` : ''}`,
            }}
            onClick={() => handelOptClicked(opt.currect, opt.id)}
          >
            {opt.answer}

          </button>
        )}
      </div>

    </article >

  )
}