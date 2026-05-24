"use client"

import React, { useEffect, useState } from 'react'
import { Question } from '@/app/assets/data/triviaData'
import { TrivaPreview } from '@/app/cmps/TrivaPreview'
import { GroupTriviaGameProps } from '@/app/types/types'
import Timer from './Timer'
import ScoreTable from './ScoreTable'
import FinalScreen from './FinalScreen'

export default function GroupTriviaGame({
    roomId,
    state,
    actions,
    isAdmin,
    dbPlayerCount,
    round,
}: GroupTriviaGameProps) {

    const [winHeight, setWinHeight] = useState<{ height: number }>({ height: 450 })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWinHeight({ height: window.innerHeight })
        }
    }, [])

    const currentQuestion: Question | undefined = round[state.qIndex]
    const isLastQuestion = state.qIndex === round.length - 1

    return (
        <main className='gc2 flex-col flex-sb'>
            <article className='trivia-container'>
                {state.phase === 'FINAL' ? (
                    <FinalScreen
                        roomId={roomId}
                        winHeight={winHeight}
                        scoreboard={state.finalScoreboard}
                        dbPlayerCount={dbPlayerCount}
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
                        dbPlayerCount={dbPlayerCount}
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
