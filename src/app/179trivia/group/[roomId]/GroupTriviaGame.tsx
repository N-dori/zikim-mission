"use client"

import React, { useEffect, useState } from 'react'
import { Question } from '@/app/assets/data/triviaData'
import { TrivaPreview } from '@/app/cmps/TrivaPreview'
import { GroupTriviaGameProps } from '@/app/types/types'
import Timer from './Timer'
import ScoreTable from './ScoreTable'
import FinalScreen from './FinalScreen'
import { getQuestions } from '@/app/libs/triviaQuestions'
import { BeatLoader } from 'react-spinners'

export default function GroupTriviaGame({
    roomId,
    state,
    actions,
    isAdmin,
}: GroupTriviaGameProps) {

    const [winHeight, setWinHeight] = useState<{ height: number }>({ height: 450 })
    const [questions, setQuestions] = useState<Question[] | null>(null)
    const [loadError, setLoadError] = useState<string | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWinHeight({ height: window.innerHeight })
        }
    }, [])

    useEffect(() => {
        let cancelled = false
        getQuestions()
            .then(qs => {
                if (!cancelled) setQuestions(qs)
            })
            .catch(err => {
                if (!cancelled) setLoadError(String(err))
            })
        return () => { cancelled = true }
    }, [])

    if (loadError) {
        return (
            <main className='gc2 flex-col flex-jc-ac'>
                <p className='tac'>שגיאה בטעינת השאלות</p>
            </main>
        )
    }

    if (!questions) {
        return (
            <main className='gc2 flex-col flex-jc-ac'>
                <BeatLoader color='#308f18' loading={true} size={30} />
            </main>
        )
    }

    const currentQuestion: Question | undefined = questions[state.qIndex]
    const isLastQuestion = state.qIndex === questions.length - 1

    return (
        <main className='gc2 flex-col flex-sb'>
            <article className='trivia-container'>
                {state.phase === 'FINAL' ? (
                    <FinalScreen
                        roomId={roomId}
                        winHeight={winHeight}
                        scoreboard={state.finalScoreboard}
                    />
                ) : state.phase === 'REVEAL' && currentQuestion ? (
                    <ScoreTable
                        roomId={roomId}
                        players={state.players}
                        question={currentQuestion}
                        results={state.answers}
                        roundWinnerAnswerId={state.roundWinnerAnswerId}
                        isAdmin={isAdmin}
                        onNextQuestion={actions.nextQuestion}
                        isLastQuestion={isLastQuestion}
                    />
                ) : state.phase === 'QUESTION' && currentQuestion ? (
                    <>
                        <Timer
                            roundStartedAt={state.roundStartedAt}
                            roundEndsAt={state.roundEndsAt}
                        />
                        <TrivaPreview
                            question={currentQuestion}
                            disabled={state.myAnswerSubmitted}
                            onAnswer={actions.submitAnswer}
                        />
                    </>
                ) : null}
            </article>
        </main>
    )
}
