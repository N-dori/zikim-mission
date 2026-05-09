import React, { useEffect, useMemo, useState } from 'react'
import { Question } from '../assets/data/triviaData'

function shuffleArray<T>(arr: readonly T[]): T[] {
    const next = [...arr]
    for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[next[i], next[j]] = [next[j], next[i]]
    }
    return next
}

type TrivaPreviewProps = {
    question: Question
    disabled: boolean
    onAnswer: (score: 0 | 1, optionId: string) => void
}

export function TrivaPreview({ question, disabled, onAnswer }: TrivaPreviewProps) {

    const [currentOpt, setCurrentOpt] = useState('')

    const shuffledOptions = useMemo(
        () => shuffleArray(question.options),
        [question.id]
    )

    useEffect(() => {
        setCurrentOpt('')
    }, [question.id])

    const handleOptClicked = (isCorrect: boolean, id: string) => {
        if (disabled) return
        setCurrentOpt(id)
        onAnswer(isCorrect ? 1 : 0, id)
    }

    return (
        <article className='trivia-question flex-col flex-jc'>

            <h2 className='question-title flex-jc-ac'>
                <span className='tac'>
                    {question.question}
                </span>
            </h2>

            <div className='options-container grid'>

                {shuffledOptions.map((opt, i) => (
                    <button
                        type='button'
                        className={`btn-option btn-option${i + 1} tac`}
                        disabled={disabled}
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
                        onClick={() => handleOptClicked(opt.currect, opt.id)}
                    >
                        {opt.answer}
                    </button>
                ))}

            </div>

        </article>
    )
}
