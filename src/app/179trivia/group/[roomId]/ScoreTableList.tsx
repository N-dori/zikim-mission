import { Tanswer, Tplayer } from '@/app/types/types'
import { removeDuplicates } from '@/app/utils/utils'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { getSocket, joinRoom } from '@/app/libs/socket'

type ScoreTableListProps = {
  roomId: string
  players: Tplayer[]
  results: Tanswer[]
}
type TscoreSummery = {
  playerId: string
  totalScore: number;
  totalTime: number
  victories: number;
  nickName: string
  img: string

}

export default function ScoreTableList({ roomId, players, results }: ScoreTableListProps) {
  const [scoresSummery, setScoresSummery] = useState<TscoreSummery[]>([])
  const [scoreTable, setScoreTable] = useState<TscoreSummery[]>([])
  const uniqueResultsRef = useRef([])
  const scoresSummeryRef = useRef<TscoreSummery[]>([])

  useEffect(() => {
    let cleanup: (() => void) | undefined
    ;(async () => {
      const socket = await getSocket()
      await joinRoom(roomId)
      const handleFinalResultes = (payload: { summery: TscoreSummery[] } | TscoreSummery[]) => {
        const summery = Array.isArray(payload) ? payload : payload?.summery
        if (summery) getScoreTable(summery)
      }
      socket.on('setFinalResultes', handleFinalResultes);
      cleanup = () => socket.off('setFinalResultes', handleFinalResultes)
    })()
    return () => { cleanup?.() }
  }, [roomId])

  useEffect(() => {
    deleteDuplicates()
  
    getScoreSummery()
      


  }, [])
 

  const deleteDuplicates = () => {
    const uniqueAnswers = removeDuplicates(results);
    console.log('uniqueAnswers',uniqueAnswers);
    uniqueResultsRef.current = [...uniqueAnswers]
    
  }
  
  const getScoreSummery = async () => {
    let newScoreSummery: TscoreSummery[] = []

    players.forEach(player => {
      // get summery of each player score time victories ...
      const scoreSummery: TscoreSummery = getPlayerTotalScore(player)
      newScoreSummery.push(scoreSummery)
    })

    scoresSummeryRef.current = [...newScoreSummery]
    if (newScoreSummery.length === players.length) {
      const socket = await getSocket()
      socket.emit('setFinalResultes', { summery: newScoreSummery, roomId })
    }
  }
  const getPlayerTotalScore = (player: Tplayer) => {
    let totalScore = 0
    let totalTime = 0
    let victories = 0
    uniqueResultsRef.current.forEach(res => {
      if (res.nickName === player.nickName) {
        totalScore += res.score
        totalTime += res.time
        if (res.isVinner) {
          victories += 1
        }
      }
    })
    return {
      totalScore,
      victories,
      totalTime,
      playerId: player.nickName,
      nickName: player.nickName,
      img: player.img,
    }
  }
  const getScoreTable = (newScoreSummery) => {
    const sortedScores = [...newScoreSummery].sort((a, b) => {
      // 1. More correct answers wins
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      // 2. Tie: faster total response time wins
      if (a.totalTime !== b.totalTime) {
        return a.totalTime - b.totalTime;
      }
      // 3. Still tied: more round-victories (fastest correct) wins
      return b.victories - a.victories;
    });
    setScoreTable([...sortedScores])
  }

  // Find the best (lowest) total time among players who actually scored —
  // we'll mark that player so their time stands out as the "record".
  const bestTime = (() => {
    const scored = scoreTable.filter(p => p.totalScore > 0)
    if (!scored.length) return null
    return Math.min(...scored.map(p => p.totalTime))
  })()

  return (
    <section className='score-table-warpper flex-col flex-jc-ac'>
      {scoreTable &&
        scoreTable.map((player, i) => {
          const isRecord = bestTime !== null && player.totalScore > 0 && player.totalTime === bestTime
          return (
            <article key={player.playerId || i} className='player-container flex'>
              <span className='flex place'>{i + 1}.</span>
              <Image width={40} height={40} src={player.img} alt={`image of ${player.nickName}`} />
              <span className='player-name flex-jc-ac'>{player.nickName}+ " "</span>
              <span className='player-score flex-jc-ac'>{player.totalScore} נק׳</span>
              <span className={`player-time flex-jc-ac${isRecord ? ' player-time-record' : ''}`}>
                {isRecord && '⚡ '}{player.totalTime.toFixed(1)}s
              </span>
              {player.victories > 0 && (
                <span className='player-victories flex-jc-ac'>🏆 {player.victories}</span>
              )}
            </article>
          )
        })
      }
    </section>
  )
}