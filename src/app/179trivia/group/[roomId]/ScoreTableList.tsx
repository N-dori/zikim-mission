import { Tanswer, TscoreSummary, TserverPlayer } from '@/app/types/types'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { buildScoreSummaries } from './gameReducer'

type ScoreTableListProps = {
  players: TserverPlayer[]
  results?: Tanswer[]
  precomputed?: TscoreSummary[] | null
}

export default function ScoreTableList({ players, results, precomputed }: ScoreTableListProps) {

  const summaries = useMemo<TscoreSummary[]>(() => {
    if (precomputed && precomputed.length) return precomputed
    return buildScoreSummaries(players, results || [])
  }, [precomputed, players, results])

  const bestTime = useMemo(() => {
    const scored = summaries.filter(p => p.totalScore > 0)
    if (!scored.length) return null
    return Math.min(...scored.map(p => p.totalTime))
  }, [summaries])

  return (
    <section className='score-table-warpper flex-col flex-jc-ac'>
      {summaries.map((player, i) => {
        const isRecord =
          bestTime !== null &&
          player.totalScore > 0 &&
          player.totalTime === bestTime
        return (
          <article key={player.playerId} className='player-container flex gap1'>
            <span className='flex place'>{i + 1}.</span>
            <Image width={40} height={40} src={player.img} alt={`image of ${player.nickName}`} />
            <span className='player-name flex-jc-ac'>{player.nickName}</span>
            <span className='player-score flex-jc-ac'>{player.totalScore} נק׳</span>
            <span className={`player-time flex-jc-ac${isRecord ? ' player-time-record' : ''}`}>
              {isRecord && '⚡ '}{player.totalTime.toFixed(1)}s
            </span>
            {player.victories > 0 && (
              <span className='player-victories flex-jc-ac'>🏆 {player.victories}</span>
            )}
          </article>
        )
      })}
    </section>
  )
}
