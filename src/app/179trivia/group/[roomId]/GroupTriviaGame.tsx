"use client"

import React, { useEffect, useRef, useState } from 'react'
import { questions } from '../../../assets/data/triviaData'
import { TrivaPreview } from '../../../cmps/TrivaPreview'
import { Tanswer, Tplayer } from '@/app/types/types'
import Timer from './Timer'
import ScoreTable from './ScoreTable'
import FinalScreen from './FinalScreen'
import { getSocket } from '@/app/libs/socket'

type GroupTriviaGameProps = {
    roomId: string
    players: Tplayer[]
    currPlayer: Tplayer
    setCurrPlayer: React.Dispatch<React.SetStateAction<Tplayer>>
    addPlayerScore: (answer: Tanswer) => void
    cheackVictory: () => void
    results: Tanswer[]
}

export default function GroupTriviaGame({
    roomId,
    results,
    players,
    currPlayer,
    addPlayerScore,
    cheackVictory
}: GroupTriviaGameProps) {

    const [isGameOver, setIsGameOver] = useState(false)

    const [winHeight, setwinHeight] = useState({ height: 450 })

    const initialTime = 30

    const [timeLeft, setTimeLeft] = useState<number>(initialTime)

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false)

    const [isDisable, setIsDisable] = useState(false)

    const questIndex = useRef(0)

    const answeredQuestionRef = useRef<number | null>(null)

    const nextQuestionLockRef = useRef(false)

    useEffect(() => {

        if (typeof window !== 'undefined') {
            setwinHeight({ height: window.innerHeight })
        }

        let cleanup: (() => void) | undefined

        ;(async () => {

            const socket = await getSocket()

            const handleAddScore = (newScore: Tanswer) => {
                addPlayerScore(newScore)
            }

            const handleNextQuestion = () => {

                if (nextQuestionLockRef.current) return

                nextQuestionLockRef.current = true

                incrementQuestionIndex()

                setIsRoundFinished(false)

                setIsDisable(false)

                setTimeLeft(initialTime)

                answeredQuestionRef.current = null

                clearInterval(timerRef.current!)

                setTimeout(() => {
                    nextQuestionLockRef.current = false
                }, 300)
            }

            socket.off('addPlayerScore', handleAddScore)
            socket.off('next question', handleNextQuestion)

            socket.on('addPlayerScore', handleAddScore)
            socket.on('next question', handleNextQuestion)

            cleanup = () => {
                socket.off('addPlayerScore', handleAddScore)
                socket.off('next question', handleNextQuestion)
            }

        })()

        return () => cleanup?.()

    }, [roomId])

    const incrementQuestionIndex = () => {

        if (questIndex.current === questions.length - 1) {
            setIsGameOver(true)
            return
        }

        questIndex.current += 1

        console.log('incrementing index:', questIndex.current)
    }

    const handelNextQuestion = async () => {

        const socket = await getSocket()

        socket.emit('next question', { roomId })
    }

    const handelAnswerClicked = async (
        score: number,
        timeLeft: number,
        isVinner: boolean
    ) => {

        if (answeredQuestionRef.current === questIndex.current) return

        answeredQuestionRef.current = questIndex.current

        clearInterval(timerRef.current!)

        const newScore: Tanswer = {
            answerId: `${currPlayer._id}-${questIndex.current}`,
            score,
            time: initialTime - (+timeLeft.toFixed(1)),
            isVinner,
            playerId: currPlayer._id,
            questionId: questIndex.current,
            nickName: currPlayer.nickName,
            img: currPlayer.img,
            roomId,
        }

        const socket = await getSocket()

        socket.emit('addPlayerScore', newScore)
    }

    const handelTimeOver = async () => {

        if (answeredQuestionRef.current === questIndex.current) return

        if (isDisable) return

        answeredQuestionRef.current = questIndex.current

        const newScore: Tanswer = {
            answerId: `${currPlayer._id}-${questIndex.current}`,
            score: 0,
            time: initialTime,
            isVinner: false,
            playerId: currPlayer._id,
            questionId: questIndex.current,
            nickName: currPlayer.nickName,
            img: currPlayer.img,
            roomId,
        }

        const socket = await getSocket()

        socket.emit('addPlayerScore', newScore)

        clearInterval(timerRef.current!)
    }

    const handelNewGame = () => {

        questIndex.current = 0

        answeredQuestionRef.current = null

        nextQuestionLockRef.current = false

        setTimeLeft(initialTime)

        setIsDisable(false)

        setIsRoundFinished(false)

        setIsGameOver(false)
    }

    const triviaPreviewProps = {
        players,
        timeLeft,
        handelAnswerClicked,
        incrementQuestionIndex,
        question: questions[questIndex.current],
        isDisable,
        setIsDisable,
        handelNextQuestion,
        setIsRoundFinished,
        timerRef,
        setTimeLeft,
        initialTime,
        cheackVictory,
    }

    const timerProps = {
        handelTimeOver,
        timeLeft,
        setTimeLeft,
        timerRef,
        initialTime
    }

    const finalScreenProps = {
        roomId,
        results,
        winHeight,
        handelNewGame,
        players,
    }

    const scoreTableProps = {
        roomId,
        players,
        question: questions[questIndex.current],
        handelNextQuestion,
        currPlayer,
        results,
        isLastQuestion: questIndex.current === questions.length - 1,
    }

    return (
        <main className='gc2 flex-col flex-sb'>
            <article className='trivia-container'>

                {
                    isGameOver ?

                        <FinalScreen {...finalScreenProps} />

                        :

                        isRoundFinished ?

                            <ScoreTable {...scoreTableProps} />

                            :

                            <>
                                <Timer {...timerProps} />

                                <TrivaPreview {...triviaPreviewProps} />
                            </>
                }

            </article>
        </main>
    )
}