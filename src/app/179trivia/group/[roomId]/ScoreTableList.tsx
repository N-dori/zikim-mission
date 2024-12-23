import { Tanswer, Tplayer } from '@/app/types/types'
import { getUrl, removeDuplicates } from '@/app/utils/utils'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

type ScoreTableListProps = {
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

export default function ScoreTableList({ players, results }: ScoreTableListProps) {
  const [scoresSummery, setScoresSummery] = useState<TscoreSummery[]>([])
  const [scoreTable, setScoreTable] = useState<Tplayer[]>([])
  const uniqueResultsRef = useRef([])
  const scoresSummeryRef = useRef<TscoreSummery[]>([])

  useEffect(() => {
    
    const socket = io(getUrl(''))
    socket.on('setFinalResultes', (newScoreSummery) => {

      getScoreTable(newScoreSummery)
  });
  }, [scoreTable.length])

  useEffect(() => {
    deleteDuplicates()
  
    getScoreSummery()
      


  }, [])
 

  const deleteDuplicates = () => {
    const uniqueAnswers = removeDuplicates(results);
    console.log('uniqueAnswers',uniqueAnswers);
    uniqueResultsRef.current = [...uniqueAnswers]
    
  }
  
  const getScoreSummery = () => {
    let newScoreSummery: TscoreSummery[] = []
    // console.log('players',players);
    
    players.forEach(player => {
      // get summery of each player score time victories ...
      const scoreSummery: TscoreSummery = getPlayerTotalScore(player)
      if (!scoreSummery.playerId) return
      newScoreSummery.push(scoreSummery)
    })
    console.log('newScoreSummery',newScoreSummery);
    
    scoresSummeryRef.current= [...newScoreSummery]
    if(newScoreSummery.length === players.length){
      const socket = io('http://localhost:3000'); 
       
      socket.emit('setFinalResultes',  newScoreSummery )
    }
  }
  const getPlayerTotalScore = (player: Tplayer) => {
    console.log('getting Total Score of ',player);
    let totalScore = 0
    let totalTime = 0
    let victories = 0
    let playerId = ''
    let nickName = ''
    let img =''
    uniqueResultsRef.current.forEach(res => {
      if (res.playerId === player._id) {
        totalScore += res.score
        totalTime += res.time
        playerId = player._id
        nickName = player.nickName,
        img = player.img
        if (res.isVinner) {
          victories += 1
        }
      }
    }
    )
    return { totalScore, victories, totalTime, playerId , nickName, img }
  }
  const getScoreTable = (newScoreSummery) => {
    console.log('getScoreTable',newScoreSummery);
    
    const sortedScores = [...newScoreSummery].sort((a, b) => {
         // First sort by victories in descending order
      if (b.victories !== a.victories) {
        return b.victories - a.victories;
      }
      // If victories are equal, sort by totalScore in descending order
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      // If totalScore is also equal, sort by totalTime in ascending order
      return a.totalTime - b.totalTime;
    });
    console.log(' sortedScores', sortedScores);


    
    setScoreTable([...sortedScores])
  }

  return (
    <section className='score-table-warpper flex-col flex-jc-ac'>
      {scoreTable &&
        scoreTable.map((player, i) =>
          <article key={player._id || i} className='player-container flex'>
            <span className='flex place'>{i + 1}.</span>
            <Image width={40} height={40} src={player.img} alt={`image of ${player.name}`} />
            <span className='player-name flex-jc-ac'>{player.nickName}</span>

          </article>)
      }
    </section>
  )
}