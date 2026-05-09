"use client"
import React, { useEffect, useRef, useState } from 'react'
import WaitingList from './WaitingList'
import { Tanswer, Tplayer } from '@/app/types/types'
import GroupTriviaGame from './GroupTriviaGame'
import { removeDuplicates } from '@/app/utils/utils'
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
    const scoresRef=useRef<Tanswer[]>([])
 
    useEffect(() => {
        let cleanup: (() => void) | undefined
        ;(async () => {
            const socket = await getSocket()
            await joinRoom(roomId)
            const handleAllHere = () => setIsAllReady(true)
            socket.on('allHere', handleAllHere)
            cleanup = () => socket.off('allHere', handleAllHere)
        })()
        return () => { cleanup?.() }
    }, [roomId]);

    const addPlayerScore = (newScore: Tanswer) => {
        const key = (a: Tanswer) => `${a.nickName ?? a.playerId}-${a.questionId}`
        const idx = scoresRef.current.findIndex(a => key(a) === key(newScore))
        if (idx === -1) {
            scoresRef.current.push(newScore)
            return
        }
        // Same (player, question) already recorded — keep the better one.
        // Higher score wins; on a tie keep the faster (lower time).
        const existing = scoresRef.current[idx]
        const incomingIsBetter =
            newScore.score > existing.score ||
            (newScore.score === existing.score && newScore.time < existing.time)
        if (incomingIsBetter) scoresRef.current[idx] = newScore
    }

   
    const cheackVictory = () => {
        //cause we deal with sockets socres that not belong to current players are being added to scores ref and there is a need to remove them 
            const uniqueAnswers = removeDuplicates(scoresRef.current);
        // this func toggle the is winner key of this round winner
            getThisRoundWinner(uniqueAnswers);
    };

    const getThisRoundWinner = (playersScores: Tanswer[]) => {

        let lastCorrectAnswers: Tanswer[] = []
        // first getting last currect answers , push only the currect ones to lastCurrectAnswers
        playersScores.forEach((ans) => {
            const thisRoundAnswers:Tanswer[] = []
            const questionId= playersScores[playersScores.length-1].questionId
            if(ans.questionId === questionId ){
                if(ans.score)  lastCorrectAnswers.push(ans)
            }
          
        })
        
        let sortedCorrectAns: Tanswer[] = []
        if (lastCorrectAnswers.length) {
            // if there is only one obj in lastCurrectAnswers than he is the vinner of this round
            if(lastCorrectAnswers.length === 1) return  toggleIsWinner(lastCorrectAnswers[0])
         // if there is more than one obj in lastCorrectAnswers we sort by time and take the first one
            sortedCorrectAns = lastCorrectAnswers.sort((a, b) => {
                return  a.time - b.time 
            });
            // console.log('sortedCurrectAns', sortedCurrectAns);
            toggleIsWinner(sortedCorrectAns[0])
        } else {
            // case ther is no currect answers return null  
            return null
        }
    }
    const toggleIsWinner = (winner:Tanswer) => {
        const idx = scoresRef.current.findIndex(ans => (
            ans.questionId === winner.questionId &&
            (ans.nickName ?? ans.playerId) === (winner.nickName ?? winner.playerId)
        ))
        if (idx === -1) return
        scoresRef.current[idx].isVinner = true
    }

    const getData = async (_id: string) => {
        if (!_id) {
            return
        }

        const res = await apiFetch('/trivia/getParticipants', {
            method: 'POST',
            auth: false,
            headers: { 'Cache-Control': 'no-cache' },
            body: JSON.stringify({ id: _id })
        })

        if ((res).ok) {
            const { room } = await res.json()
            setGroupName(room.name)
            const players = room.participants
            if (players) {
                setPlayers([...players])
            }
            const myNickName = typeof window !== 'undefined'
                ? sessionStorage.getItem(`trivia:nickName:${roomId}`)
                : null
            const client: Tplayer = room.participants.find(
                (player: Tplayer) => player.nickName === myNickName
            )

            if (client) {
                setCurrPlayer(client)

            } else {
                setCurrPlayer(room.participants[room.participants.length - 1])

            }
        }

        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    }
    const WaitingListProps = {
        roomId,
        setCurrPlayer,
        currPlayer,
        setIsAllReady,
        getData,
        setPlayers,
        players,
        groupName

    }
    const groupTriviaGameProps = {


        roomId,
        players,
        currPlayer,
        setCurrPlayer,
        addPlayerScore,
        cheackVictory,
        results: scoresRef.current
    }

    return (
        <>
            {
                isAllReady ?
                    <GroupTriviaGame {...groupTriviaGameProps} /> :

                    <WaitingList {...WaitingListProps} />
            }

        </>
    )
}