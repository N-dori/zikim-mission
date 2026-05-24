"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import WaitingList from '@/app/179trivia/group/[roomId]/WaitingList'
import { useGameSocket } from '@/app/179trivia/group/[roomId]/useGameSocket'
import { GroupRoomProps, Tplayer } from '@/app/types/types'
import { apiFetch } from '@/app/libs/apiClient'
import { buildRound, roomLabel } from '@/app/libs/round'
import { chronicleGroupDeck } from '@/app/assets/data/otefChroniclesData'
import ChroniclesGroupGame from './ChroniclesGroupGame'

export default function ChroniclesGroupRoom({ roomId }: GroupRoomProps) {
    const [currPlayer, setCurrPlayer] = useState<Tplayer | null>(null)
    const [groupName, setGroupName] = useState<string | null>(null)
    const [players, setPlayers] = useState<Tplayer[]>([])
    const [needsNickName, setNeedsNickName] = useState(false)
    const [dbPlayerCount, setDbPlayerCount] = useState<number | null>(null)

    // Same shuffled 12 for everyone in this room (seeded by roomId).
    const round = useMemo(() => buildRound(chronicleGroupDeck, roomId), [roomId])

    const { state, actions, selfPlayerId, isAdmin } = useGameSocket(
        roomId,
        currPlayer ? currPlayer.nickName : null,
        currPlayer ? currPlayer.img : null,
        round.length,
    )

    const getData = useCallback(async (_id: string) => {
        if (!_id) return
        const res = await apiFetch('/trivia/getParticipants', {
            method: 'POST',
            headers: { 'Cache-Control': 'no-cache' },
            body: JSON.stringify({ id: _id })
        })
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)

        const { room } = await res.json()
        setGroupName(roomLabel(room.name))

        if (room.participants) {
            setPlayers(room.participants)
            const uniqueNicks = new Set((room.participants as Tplayer[]).map(p => p.nickName))
            setDbPlayerCount(uniqueNicks.size)
        }

        const myNickName = typeof window !== 'undefined'
            ? sessionStorage.getItem(`trivia:nickName:${roomId}`)
            : null
        const me = myNickName
            ? room.participants.find((p: Tplayer) => p.nickName === myNickName)
            : null

        if (me) setCurrPlayer(me)
        else setNeedsNickName(true)
    }, [roomId])

    useEffect(() => { getData(roomId) }, [roomId, getData])

    useEffect(() => {
        if (!roomId) return
        const id = setInterval(() => {
            getData(roomId).catch(() => { /* swallow poll errors */ })
        }, 30_000)
        return () => clearInterval(id)
    }, [roomId, getData])

    if (needsNickName) {
        return (
            <section className='waiting-room-container flex-col gap3'>
                <h1 className='tac'>נא להירשם לחדר זה דרך עמוד הקבוצה</h1>
                <a className='start-game-btn flex-jc-ac' href='/otef-chronicles/group'>
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
        <ChroniclesGroupGame
            roomId={roomId}
            state={state}
            actions={actions}
            isAdmin={isAdmin}
            dbPlayerCount={dbPlayerCount}
            round={round}
        />
    )
}
