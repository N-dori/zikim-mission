"use client"
import React, { useEffect, useRef, useState } from 'react'
import { questions } from '../../../assets/data/triviaData'
import { TrivaPreview } from '../../../cmps/TrivaPreview'
import { Tanswer, Tplayer } from '@/app/types/types'
import Timer from './Timer'
import ScoreTable from './ScoreTable'
import { io, Socket } from 'socket.io-client'
import FinalScreen from './FinalScreen'
import { getUrl } from '@/app/utils/utils'


type GroupTriviaGameProps = {
    players: Tplayer[]
    currPlayer: Tplayer
    setCurrPlayer: React.Dispatch<React.SetStateAction<Tplayer>>
    addPlayerScore: (answer: Tanswer) => void
    cheackVictory: () => void
    results: Tanswer[]

}

export default function GroupTriviaGame({ results, players, currPlayer, setCurrPlayer, addPlayerScore, cheackVictory }: GroupTriviaGameProps) {

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
        const socket = io(getUrl(''))

        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', function () {
                socket.close();
            });
            // for confeti cmp
            setwinHeight({ height: window.innerHeight })
        }
        socket.on('addPlayerScore', (newScore) => {
            addPlayerScore(newScore);
        });

        socket.on('next question', () => {
            getNextQuestion()

        });

        return () => {
            socket.off('next question')
            socket.off('updatePlayersScore');
        };

    }, [])

    const getNextQuestion = () => {
        incrementQuestionIndex()
        setIsRoundFinished(false)

    }
    const handelNextQuestion = () => {
        const socket = io(getUrl(''))
        socket.emit('next question');
    }

    const incrementQuestionIndex = () => {
        if (questIndex.current === questions.length - 1) {
            setIsGameOver(true)
            return
        }
        questIndex.current += 1
        console.log('incrementing index with : :', questIndex.current);
    }

    const handelAnswerClicked = (score: number, timeLeft: number, isVinner: boolean) => {
        clearInterval(timeInerval);
        const newScore = {
            score,
            time: initialTime - (+timeLeft.toFixed(1)), // calculate time in seconds
            isVinner,
            playerId: currPlayer._id,
            questionId: questIndex.current,
            nickName: currPlayer.nickName,
            img: currPlayer.img
        };
        const socket = io(getUrl(''))
        socket.emit('addPlayerScore', newScore);
    }


    const handelNewGame = () => {
        questIndex.current = 0
        setIsGameOver(false)
    }

    const handelTimeOver = () => {

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
            img: currPlayer.img
        };
        const socket = io(getUrl(''))
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
        results,
        winHeight,
        handelNewGame,
        players,
    }
    const scoreTableProps = {
        players,
        question: questions[questIndex.current],
        handelNextQuestion,
        currPlayer,
        results,
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