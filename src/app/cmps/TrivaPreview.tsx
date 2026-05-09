import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Question } from '../assets/data/triviaData'
import { Tplayer } from '../types/types'

function shuffleArray<T>(arr: readonly T[]): T[] {

    const next = [...arr]

    for (let i = next.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1))

        ;[next[i], next[j]] = [next[j], next[i]]
    }

    return next
}

type TrivaPreviewProps = {
    players: Tplayer[]
    question: Question
    handelAnswerClicked: (
        score: number,
        time: number,
        isVinner: boolean
    ) => void
    timeLeft: number
    isDisable: boolean
    setIsDisable: (isDisable: boolean) => void
    setIsRoundFinished: (isRoundFinished: boolean) => void
    setTimeLeft: (time: number) => void
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
    initialTime: number
    cheackVictory: () => void
}

export function TrivaPreview({
    initialTime,
    timerRef,
    question,
    timeLeft,
    setTimeLeft,
    handelAnswerClicked,
    isDisable,
    setIsDisable,
    setIsRoundFinished,
    cheackVictory
}: TrivaPreviewProps) {

    const [currentOpt, setCurrentOpt] = useState('')

    const roundFinishedRef = useRef(false)

    const shuffledOptions = useMemo(
        () => shuffleArray(question.options),
        [question.id]
    )

    useEffect(() => {

        roundFinishedRef.current = false

        setCurrentOpt('')

        const roundTimeout = setTimeout(() => {

            if (roundFinishedRef.current) return

            roundFinishedRef.current = true

            setIsRoundFinished(true)

            setIsDisable(false)

            clearInterval(timerRef.current!)

            setTimeLeft(initialTime)

            cheackVictory()

        }, 35000)

        return () => {

            roundFinishedRef.current = true

            clearTimeout(roundTimeout)
        }

    }, [question.id])

    const handelOptClicked = (
        isCurrect: boolean,
        id: string
    ) => {

        if (isDisable) return

        setCurrentOpt(id)

        setIsDisable(true)

        setOptStyle(id)

        handelAnswerClicked(
            isCurrect ? 1 : 0,
            timeLeft,
            false
        )
    }

    const setOptStyle = (id: string) => {
        setCurrentOpt(id)
    }

    return (

        <article className='trivia-question flex-col flex-jc'>

            <h2 className='question-title flex-jc-ac'>
                <span className='tac'>
                    {question.question}
                </span>
            </h2>

            <div className='options-container grid'>

                {
                    shuffledOptions.map((opt, i) => (

                        <button
                            type='button'
                            className={`btn-option btn-option${i + 1} tac`}
                            disabled={isDisable}
                            key={opt.id}
                            style={{
                                fontSize: '1em',
                                border: '6px solid transparent',
                                borderImage:
                                    'linear-gradient(45deg, rgb(34, 34, 34), rgb(59, 208, 22))',
                                borderImageSlice: 1,
                                color: currentOpt === opt.id ? '#fff' : '',
                                background:
                                    currentOpt === opt.id
                                        ? 'linear-gradient(45deg, #308f18, #041405)'
                                        : '',
                            }}
                            onClick={() =>
                                handelOptClicked(
                                    opt.currect,
                                    opt.id
                                )
                            }
                        >
                            {opt.answer}
                        </button>
                    ))
                }

            </div>

        </article>
    )
}