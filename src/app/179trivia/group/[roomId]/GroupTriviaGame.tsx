"use client"
import React, { useEffect, useRef, useState } from 'react'
import { questions } from '../../../assets/data/triviaData'
import { TrivaPreview } from '../../../cmps/TrivaPreview'
import { Tanswer, Tplayer } from '@/app/types/types'
import Timer from './Timer'
import ScoreTable from './ScoreTable'
import FinalScreen from './FinalScreen'
import { getSocket, joinRoom } from '@/app/libs/socket'


type GroupTriviaGameProps = {
    roomId: string
    players: Tplayer[]
    currPlayer: Tplayer
    setCurrPlayer: React.Dispatch<React.SetStateAction<Tplayer>>
    addPlayerScore: (answer: Tanswer) => void
    cheackVictory: () => void
    results: Tanswer[]

}

export default function GroupTriviaGame({ roomId, results, players, currPlayer, setCurrPlayer, addPlayerScore, cheackVictory }: GroupTriviaGameProps) {

    const [isGameOver, setIsGameOver] = useState(false)
    const [winHeight, setwinHeight] = useState({ height: 450 })

    // for timer and for knowing how much time it took to answer
    const [initialTime] = useState<number>(30); // Time left in seconds
    const [timeLeft, setTimeLeft] = useState<number>(initialTime); // Time left in seconds
    const [timeInerval] = useState<any>() // Time left in seconds

    const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false); // gets updated after time of each round is over
    const [isDisable, setIsDisable] = useState(false)//for one knowing if player already pick an an answer and two for not leting to pick another answer
    const questIndex = useRef(0)



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setwinHeight({ height: window.innerHeight })
        }
        let cleanup: (() => void) | undefined
        ;(async () => {
            const socket = await getSocket()
            await joinRoom(roomId)

            const handleAddScore = (newScore: Tanswer) => addPlayerScore(newScore)
            const handleNextQuestion = () => getNextQuestion()

            socket.on('addPlayerScore', handleAddScore);
            socket.on('next question', handleNextQuestion);

            cleanup = () => {
                socket.off('addPlayerScore', handleAddScore)
                socket.off('next question', handleNextQuestion)
            }
        })()
        return () => { cleanup?.() }

    }, [roomId])

    const getNextQuestion = () => {
        incrementQuestionIndex()
        setIsRoundFinished(false)

    }
    const handelNextQuestion = async () => {
        const socket = await getSocket()
        socket.emit('next question', { roomId });
    }

    const incrementQuestionIndex = () => {
        if (questIndex.current === questions.length - 1) {
            setIsGameOver(true)
            return
        }
        questIndex.current += 1
        console.log('incrementing index with : :', questIndex.current);
    }

    const handelAnswerClicked = async (score: number, timeLeft: number, isVinner: boolean) => {
        clearInterval(timeInerval);
        const newScore = {
            score,
            time: initialTime - (+timeLeft.toFixed(1)), // calculate time in seconds
            isVinner,
            playerId: currPlayer._id,
            questionId: questIndex.current,
            nickName: currPlayer.nickName,
            img: currPlayer.img,
            roomId,
        };
        const socket = await getSocket()
        socket.emit('addPlayerScore', newScore);
    }


    const handelNewGame = () => {
        questIndex.current = 0
        setIsGameOver(false)
    }

    const handelTimeOver = async () => {

        let isPlayerPickedAnswer: boolean = isDisable // all buttons are disabled if it is true
        if (isPlayerPickedAnswer) {
            console.log('isPlayerPickedAnswer', isPlayerPickedAnswer);
            return
        }
        const newScore = {
            score: 0,
            time: initialTime,
            isVinner: false,
            playerId: currPlayer._id,
            questionId: questIndex.current,
            nickName: currPlayer.nickName,
            img: currPlayer.img,
            roomId,
        };
        const socket = await getSocket()
        socket.emit('addPlayerScore', newScore);
        clearInterval(timeInerval)
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
        timeInerval,
        setTimeLeft,
        initialTime,
        cheackVictory,

    }
    const timerProps = {
        handelTimeOver,
        timeLeft,
        setTimeLeft,
        timeInerval,
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
        <main className='gc2 flex-col flex-sb '>
            <article className='trivia-container  '>
                {isGameOver ?
                    <FinalScreen {...finalScreenProps} /> :

                    isRoundFinished ?
                        <ScoreTable {...scoreTableProps} /> :
                        <>
                            <Timer {...timerProps} />
                            <TrivaPreview  {...triviaPreviewProps} />
                        </>

                }



            </article>
        </main>
    )
}