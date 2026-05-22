import React, { useMemo, useState } from 'react'
import { OtefQuestion } from '../../assets/data/otefTriviaData'
import Image from 'next/image'

function shuffleArray<T>(arr: readonly T[]): T[] {
  const next = [...arr]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

type OtefTriviaPreviewProps = {
  question: OtefQuestion
  incrementIndex: () => void
}

export function OtefTriviaPreview({ question, incrementIndex }: OtefTriviaPreviewProps) {
  const [isRigthAnswer, setIsRigthAnswer] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [answerColor, setAnswerColor] = useState('')
  const shuffledOptions = useMemo(() => shuffleArray(question.options), [question.id])

  const handelCurrectAnswer = () => {
    setTimeout(() => {
      setIsRigthAnswer(!isRigthAnswer)
    }, 1000)
  }
  const setDefualtColor = () => {
    setTimeout(() => {
      setAnswerColor('')
    }, 1500)
  }
  const handelNextQuestion = () => {
    setIsRigthAnswer(false)
    incrementIndex()
  }

  const handelAnswerClicked = (ans: boolean, id: string) => {
    setCurrentAnswer(id)
    if (!ans) {
      setAnswerColor('red')
      setDefualtColor()
    } else {
      setAnswerColor('green')
      setDefualtColor()
      handelCurrectAnswer()
    }
  }

  return (
    <article className='trivia-question flex-col flex-jc'>
      <div className='flex-jc-ac' style={{ gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
        <span style={{ background: '#308f18', color: '#fff', borderRadius: '12px', padding: '2px 10px', fontSize: '0.8em' }}>
          {question.location}
        </span>
        <span style={{ background: '#222', color: '#fff', borderRadius: '12px', padding: '2px 10px', fontSize: '0.8em' }}>
          {question.category}
        </span>
        <span style={{ background: '#555', color: '#fff', borderRadius: '12px', padding: '2px 10px', fontSize: '0.8em' }}>
          {question.difficulty}
        </span>
      </div>

      <h2 className='question-title flex-jc-ac'><span className='tac'>{question.question}</span></h2>

      {!isRigthAnswer ? (
        <div className='options-container grid'>
          {shuffledOptions.map((ans, i) =>
            <button type='button' className={`btn-option btn-option${i + 1} tac`}
              key={ans.id}
              style={{
                border: `1px solid ${currentAnswer === ans.id ? answerColor : ''}`,
                backgroundColor: `${currentAnswer === ans.id ? answerColor : ''}`
              }}
              onClick={() => handelAnswerClicked(ans.currect, ans.id)}>{ans.answer}</button>
          )}
        </div>
      ) : (
        <div className='explanation-container flex-col flex-jc-ac'>
          <p className='explanation-txt '>{question.explanation}</p>
          {question.img?.url && (
            <div className='explanation-img-wrap'>
              <Image
                className='explanation-img'
                src={`/${question.img.url}`}
                alt={question.img.desc || 'תמונה להמחשה'}
                fill
                sizes='(max-width: 480px) 90vw, 360px'
                quality={70}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          {question.img?.desc && <span className="explanation-desc">{question.img.desc}</span>}
          <button className='next-quetion-btn' type='button' onClick={handelNextQuestion}>לשאלה הבאה</button>
        </div>
      )}
    </article>
  )
}
