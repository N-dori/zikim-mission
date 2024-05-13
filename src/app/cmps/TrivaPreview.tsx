import React, { useEffect, useState } from 'react'
import { Question } from '../assets/data/triviaData'
import Image from 'next/image'

type TrivaPreviewProps = {
    question: Question
    incrementIndex:()=>void
}

export  function TrivaPreview({question,incrementIndex}: TrivaPreviewProps) {
  const [isRigthAnswer, setIsRigthAnswer] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [answerColor, setAnswerColor] = useState('')

  
  
  const handelCurrectAnswer = () => {
    setTimeout(() => {
      
      setIsRigthAnswer(!isRigthAnswer)
    }, 1000);
  }
  const setDefualtColor = () => {
    setTimeout(() => {
      setAnswerColor('')  
    }, 1500);
  }
  const handelNextQuestion = () => {
    setIsRigthAnswer(false)
    incrementIndex()
  }

  const handelAnswerClicked = (ans: boolean,id:string) => {
    setCurrentAnswer(id)
    if(!ans){
      setAnswerColor('red')
      setDefualtColor()
      }else{
          setAnswerColor('green')
          setDefualtColor() 
          handelCurrectAnswer()
      }
}
  return (
   

      <article className='trivia-question flex-col flex-jc'>
          <h2 className='question-title flex-jc-ac'><span className='tac'>{question.question}</span></h2>
         
          {!isRigthAnswer ? <div className='answers-container grid'>
              {question.answers.map((ans,i) =>
                  <button type='button' className={`btn-answer btn-answer${i+1} tac`}
                  key={ans.id}
                  style={{
                           border:`1px solid ${currentAnswer === ans.id?  answerColor:''}`,
                           backgroundColor:`${currentAnswer === ans.id?  answerColor:''}`}}
                   onClick={() => handelAnswerClicked(ans.currect ,ans.id)}>{ans.answer}</button>
              )}
          </div> :
              <div className='explanation-container flex-col flex-jc-ac' >

                <p className='explanation-txt '>{question.explanation}</p> 
                <Image className="explanation-img" src={`/${question.img.url}`} width={100} height={200} alt={'desc-pic'} /> 
                <span className="explanation-desc">{question.img.desc}</span>
                <button className='next-quetion-btn' type='button' onClick={handelNextQuestion}>לשאלה הבאה</button>
                  </div>}

      </article>

  )
}