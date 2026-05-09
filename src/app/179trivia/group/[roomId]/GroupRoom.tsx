"use client"

import React, { useCallback, useEffect, useState } from 'react'
import WaitingList from './WaitingList'
import { Tplayer } from '@/app/types/types'
import GroupTriviaGame from './GroupTriviaGame'
import { apiFetch } from '@/app/libs/apiClient'
import { useGameSocket } from './useGameSocket'

type GroupRoomProps = {
    roomId: string
}

export default function GroupRoom({ roomId }: GroupRoomProps) {

    const [currPlayer, setCurrPlayer] = useState<Tplayer | null>(null)
    const [groupName, setGroupName] = useState<string | null>(null)
    const [players, setPlayers] = useState<Tplayer[]>([])
    const [needsNickName, setNeedsNickName] = useState(false)

    const { state, actions, selfPlayerId, isAdmin } = useGameSocket(
        roomId,
        currPlayer ? currPlayer.nickName : null,
        currPlayer ? currPlayer.img : null,
    )

    const getData = useCallback(async (_id: string) => {

        if (!_id) return

        const res = await apiFetch('/trivia/getParticipants', {
            method: 'POST',
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

        const me = myNickName
            ? room.participants.find((p: Tplayer) => p.nickName === myNickName)
            : null

        if (me) {
            setCurrPlayer(me)
        } else {
            setNeedsNickName(true)
        }
    }, [roomId])

    useEffect(() => {
        getData(roomId)
    }, [roomId, getData])

    if (needsNickName) {
        return (
            <section className='waiting-room-container flex-col gap3'>
                <h1 className='tac'>נא להירשם לחדר זה דרך עמוד הקבוצה</h1>
                <a className='start-game-btn flex-jc-ac' href='/179trivia/group'>
                    חזרה לרישום
                </a>
            </section>
        )
    }

    if (!currPlayer || state.phase === 'WAITING') {
        return (
            <WaitingList
                roomId={roomId}
                currPlayer={currPlayer}
                players={players}
                serverPlayers={state.players}
                groupName={groupName}
                isAdmin={isAdmin}
                onStartGame={actions.startGame}
            />
        )
    }

    return (
        <GroupTriviaGame
            roomId={roomId}
            currPlayer={currPlayer}
            state={state}
            actions={actions}
            selfPlayerId={selfPlayerId}
            isAdmin={isAdmin}
        />
    )
}
