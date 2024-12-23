"use client"
import React, { useEffect, useRef, useState } from 'react'
import WaitingList from './WaitingList'
import { Tanswer, Tplayer, Troom } from '@/app/types/types'
import GroupTriviaGame from './GroupTriviaGame'
import { getUrl, removeDuplicates } from '@/app/utils/utils'
import { useSession } from 'next-auth/react'
import { io } from 'socket.io-client'

type GroupRoomProps = {
    roomId: string
}

export default function GroupRoom({ roomId }: GroupRoomProps) {

    const [currPlayer, setCurrPlayer] = useState<Tplayer | null>(null)
    const [groupName, setGroupName] = useState<string | null>(null)
    const [isAllReady, setIsAllReady] = useState<boolean>(false)
    const [players, setPlayers] = useState<Tplayer[]>([])
    const [playersScores, setPlayersScores] = useState<Tanswer[]>([])
    const session = useSession()
    const scoresRef=useRef<Tanswer[]>([])
 
    useEffect(() => {
        const socket = io(getUrl(''))
        if (typeof window !== 'undefined') {
            // for confeti cmp
            window.addEventListener('beforeunload', function () {
                socket.close();
            });
        }
        socket.on('allHere', () => {
            setIsAllReady(true);
        });


        return () => {
            socket.off('allHere');
            socket.disconnect();
        };
    }, [playersScores]);

    const addPlayerScore = (newScore: Tanswer) => {
   
        scoresRef.current.push(newScore)  
    }

   
    const cheackVictory = () => {
        //cause we deal with sockets socres that not belong to current players are being added to scores ref and there is a need to remove them 
            const uniqueAnswers = removeDuplicates(scoresRef.current);
        // this func toggel the isVinner key of this round vinner
            getThisRoundVinner(uniqueAnswers);
    };

    const getThisRoundVinner = (playersScores: Tanswer[]) => {

        let lastCurrectAnswers: Tanswer[] = []
        // first getting last currect answers , push only the currect ones to lastCurrectAnswers
        playersScores.forEach((ans) => {
            const thisRoundAnswers:Tanswer[] = []
            const questionId= playersScores[playersScores.length-1].questionId
            if(ans.questionId === questionId ){
                if(ans.score)  lastCurrectAnswers.push(ans)
            }
          
        })
        
        let sortedCurrectAns: Tanswer[] = []
        if (lastCurrectAnswers.length) {
            // if there is only one obj in lastCurrectAnswers than he is the vinner of this round
            if(lastCurrectAnswers.length === 1) return  toggelIsVinner(lastCurrectAnswers[0])
         // if there is more than one obj in lastCurrectAnswers we sort by time and take the first one
            sortedCurrectAns = lastCurrectAnswers.sort((a, b) => {
                return  a.time - b.time 
            });
            // console.log('sortedCurrectAns', sortedCurrectAns);
            toggelIsVinner(sortedCurrectAns[0])
        } else {
            // case ther is no currect answers return null  
            return null
        }
    }
    const toggelIsVinner = (vinner:Tanswer) => {
        const idx = scoresRef.current.findIndex(ans => (ans.questionId === vinner.questionId && ans.playerId === vinner.playerId) )
        scoresRef.current[idx].isVinner= true
    }

    const getData = async (_id: string) => {
        if (!_id) {
            return
        }

        const url = getUrl('trivia/getParticipants')

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({ _id })
        })

        if ((res).ok) {
            const { room } = await res.json()
            setGroupName(room.name)
            const players = room.participants
            if (players) {
                setPlayers([...players])
            }
            const client: Tplayer = room.participants.find((player: Tplayer) => player.name === session?.data?.user?.name)

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