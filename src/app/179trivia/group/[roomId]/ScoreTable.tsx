import { Question } from '@/app/assets/data/triviaData'
import { Tanswer, Tplayer } from '@/app/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Explantion from './Explantion'
import { BeatLoader } from 'react-spinners'
import ScoreTableList from './ScoreTableList'
import { CheckSvg } from '@/app/assets/svgs/CheckSvg'

type ScoreTableProps = {
  players?: Tplayer[]
  question?: Question
  handelNextQuestion?: () => void
  currPlayer?:Tplayer
  results:Tanswer[]
}

export default function ScoreTable({results,currPlayer,handelNextQuestion, players, question }: ScoreTableProps) {
 
  const [isExplantionShown, setIsExplantionShown] = useState<boolean>(false)
  const currectAnswer = question.options.find(opt=> opt.currect)

  const explantionProps = {
    explanation: question.explanation,
    img: question.img.url,
    imgDesc: question.img.desc,
    setIsExplantionShown

  }

  return (
    <main className='score-table-container flex-col flex-sb '>
      <h2 className='headline tac'>
{  !isExplantionShown? "לוח תוצאות":"הסבר לשאלה"} 
     </h2>
     {  !isExplantionShown && 
     <div className='currect-answer flex-jc-ac gap1'>
       <CheckSvg/>התשובה הנכונה היא :   { currectAnswer.answer}
       <button type='button' className='btn pointer' 
          onClick={()=>setIsExplantionShown(!isExplantionShown)}>
         הצג הסבר
        </button>
      </div>} 

      {!isExplantionShown ?
      <ScoreTableList players={players} results={results} />
      :
         <Explantion {...explantionProps}/>
      }
      <section className='btns-container flex-col '>
        <div className=' flex-jc-ac gap2'>
         

        {
          currPlayer.isAdmin?
          <button type='button' className='btn pointer'
          onClick={handelNextQuestion}
          >אתה מנהל החדר לחץ כאן למעבר לשאלה הבאה</button>
          :
          <div className='start-game-btn flex-col flex-jc-ac'>
          <span className='wait-for-next-question-txt'>המתן לשאלה הבאה </span>
      <BeatLoader
          className='lodaer'
          color={`#308f18`}
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
          </div>
        }

        </div>
      </section>



    </main>
  )
}