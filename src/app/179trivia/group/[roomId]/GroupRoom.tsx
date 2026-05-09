"use client"

import React, { useEffect, useRef, useState } from 'react'
import WaitingList from './WaitingList'
import { Tanswer, Tplayer } from '@/app/types/types'
import GroupTriviaGame from './GroupTriviaGame'
import { getSocket, joinRoom } from '@/app/libs/socket'
import { apiFetch } from '@/app/libs/apiClient'

type GroupRoomProps = {
    roomId: string
}

export default function GroupRoom({ roomId }: GroupRoomProps) {

    const [currPlayer, setCurrPlayer] = useState<Tplayer | null>(null)
    const [groupName, setGroupName] = useState<string | null>(null)
    const [isAllReady, setIsAllReady] = useState<boolean>(false)
    const [players, setPlayers] = useState<Tplayer[]>([])

    const scoresRef = useRef<Tanswer[]>([])

    useEffect(() => {

        let cleanup: (() => void) | undefined

        ;(async () => {

            const socket = await getSocket()

            await joinRoom(roomId)

            socket.off('allHere')

            const handleAllHere = () => {
                setIsAllReady(true)
            }

            socket.on('allHere', handleAllHere)

            cleanup = () => {
                socket.off('allHere')
            }

        })()

        return () => cleanup?.()

    }, [roomId])

    const addPlayerScore = (newScore: Tanswer) => {

        const idx = scoresRef.current.findIndex(
            ans => ans.answerId === newScore.answerId
        )

        // first insert
        if (idx === -1) {
            scoresRef.current.push(newScore)
            return
        }

        // keep best answer
        const existing = scoresRef.current[idx]

        const incomingIsBetter =
            newScore.score > existing.score ||
            (
                newScore.score === existing.score &&
                newScore.time < existing.time
            )

        if (incomingIsBetter) {
            scoresRef.current[idx] = newScore
        }
    }

    const cheackVictory = () => {

        if (!scoresRef.current.length) return

        const latestQuestionId =
            scoresRef.current[scoresRef.current.length - 1]?.questionId

        if (latestQuestionId === undefined) return

        const roundAnswers = scoresRef.current.filter(ans =>
            ans.questionId === latestQuestionId &&
            ans.score > 0
        )

        if (!roundAnswers.length) return

        roundAnswers.sort((a, b) => a.time - b.time)

        const winner = roundAnswers[0]

        const idx = scoresRef.current.findIndex(
            ans => ans.answerId === winner.answerId
        )

        if (idx !== -1) {
            scoresRef.current[idx].isVinner = true
        }
    }

    const getData = async (_id: string) => {

        if (!_id) return

        const res = await apiFetch('/trivia/getParticipants', {
            method: 'POST',
            auth: false,
            headers: { 'Cache-Control': 'no-cache' },
            body: JSON.stringify({ id: _id })
        })

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`)
        }

        const { room } = await res.json()

        setGroupName(room.name)

        if (room.participants) {
            setPlayers(room.participants)
        }

        const myNickName =
            typeof window !== 'undefined'
                ? sessionStorage.getItem(`trivia:nickName:${roomId}`)
                : null

        const client = room.participants.find(
            (player: Tplayer) => player.nickName === myNickName
        )

        if (client) {
            setCurrPlayer(client)
        } else {
            setCurrPlayer(room.participants[room.participants.length - 1])
        }
    }

    if (!currPlayer) {
        return (
            <WaitingList
                roomId={roomId}
                setCurrPlayer={setCurrPlayer}
                currPlayer={currPlayer}
                setIsAllReady={setIsAllReady}
                getData={getData}
                setPlayers={setPlayers}
                players={players}
                groupName={groupName}
            />
        )
    }

    return (
        <>
            {
                isAllReady ?

                    <GroupTriviaGame
                        roomId={roomId}
                        players={players}
                        currPlayer={currPlayer}
                        setCurrPlayer={setCurrPlayer}
                        addPlayerScore={addPlayerScore}
                        cheackVictory={cheackVictory}
                        results={scoresRef.current}
                    />

                    :

                    <WaitingList
                        roomId={roomId}
                        setCurrPlayer={setCurrPlayer}
                        currPlayer={currPlayer}
                        setIsAllReady={setIsAllReady}
                        getData={getData}
                        setPlayers={setPlayers}
                        players={players}
                        groupName={groupName}
                    />
            }
        </>
    )
}