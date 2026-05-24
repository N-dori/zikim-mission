"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Timer from '@/app/179trivia/group/[roomId]/Timer'
import ScoreTableList from '@/app/179trivia/group/[roomId]/ScoreTableList'
import FinalScreen from '@/app/179trivia/group/[roomId]/FinalScreen'
import { TgameActions, TgameState } from '@/app/types/types'
import { ChronicleQuestion, MCQuestion, TFQuestion } from '@/app/assets/data/otefChroniclesData'
import { shuffle } from '@/app/libs/round'

type Props = {
  roomId: string
  state: TgameState
  actions: TgameActions
  isAdmin: boolean
  dbPlayerCount?: number | null
  round: ChronicleQuestion[]
}

export default function ChroniclesGroupGame({ state, actions, isAdmin, dbPlayerCount, round }: Props) {
  const [winHeight, setWinHeight] = useState<{ height: number }>({ height: 450 })
  useEffect(() => {
    if (typeof window !== 'undefined') setWinHeight({ height: window.innerHeight })
  }, [])

  const current = round[state.qIndex] as MCQuestion | TFQuestion | undefined
  const isLast = state.qIndex === round.length - 1

  if (state.phase === 'FINAL') {
    return (
      <div className="chronicles">
        <div className="shell">
          <FinalScreen roomId="" winHeight={winHeight} scoreboard={state.finalScoreboard} dbPlayerCount={dbPlayerCount} />
        </div>
      </div>
    )
  }

  if (!current) return null

  return (
    <div className="chronicles">
      <div className="shell">
        <div className="hud">
          <div className="progress-wrap">
            <div className="progress-text">שאלה {state.qIndex + 1} מתוך {round.length}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.round((state.qIndex / round.length) * 100)}%` }} />
            </div>
          </div>
        </div>

        {state.phase === 'QUESTION' ? (
          <>
            <Timer roundStartedAt={state.roundStartedAt} roundEndsAt={state.roundEndsAt} />
            <QuestionView
              key={current.id}
              question={current}
              disabled={state.myAnswerSubmitted}
              onAnswer={actions.submitAnswer}
            />
          </>
        ) : state.phase === 'REVEAL' ? (
          <RevealView
            question={current}
            players={state.players}
            results={state.answers}
            dbPlayerCount={dbPlayerCount}
            isAdmin={isAdmin}
            isLast={isLast}
            onNext={actions.nextQuestion}
          />
        ) : null}
      </div>
    </div>
  )
}

// ---------- question (MC / TF) ----------
function QuestionView({ question, disabled, onAnswer }: {
  question: MCQuestion | TFQuestion
  disabled: boolean
  onAnswer: (score: 0 | 1, optionId: string) => void
}) {
  const [chosen, setChosen] = useState<string | null>(null)
  const locked = disabled || chosen !== null

  const pick = (correct: boolean, optionId: string) => {
    if (locked) return
    setChosen(optionId)
    onAnswer(correct ? 1 : 0, optionId)
  }

  const selectedStyle = (id: string) =>
    chosen === id
      ? { borderColor: 'var(--accent)', boxShadow: 'var(--shadow-glow)' }
      : undefined

  return (
    <article className="card">
      <div className="tags">
        <span className="tag">{question.topic}</span>
        <span className="tag">{question.difficulty}</span>
      </div>

      {question.img?.url && (
        <div className="q-img-wrap">
          <Image className="q-img" src={question.img.url} alt={question.img.desc || 'תמונה היסטורית'}
            fill sizes="(max-width: 700px) 92vw, 620px" quality={70} />
        </div>
      )}

      {question.kind === 'mc' ? (
        <>
          <h2 className="q-text">{question.question}</h2>
          <MCOptions question={question} locked={locked} selectedStyle={selectedStyle} onPick={pick} />
        </>
      ) : (
        <>
          <h2 className="q-text">{question.statement}</h2>
          <div className="tf-row">
            <button type="button" className="tf-btn" disabled={locked} style={selectedStyle('t')}
              onClick={() => pick(question.answerTrue === true, 't')}>נכון</button>
            <button type="button" className="tf-btn" disabled={locked} style={selectedStyle('f')}
              onClick={() => pick(question.answerTrue === false, 'f')}>לא נכון</button>
          </div>
        </>
      )}

      {locked && <p className="order-hint" style={{ marginTop: '0.8rem' }}>התשובה נשלחה — ממתינים לשאר המשתתפים…</p>}
    </article>
  )
}

function MCOptions({ question, locked, selectedStyle, onPick }: {
  question: MCQuestion
  locked: boolean
  selectedStyle: (id: string) => React.CSSProperties | undefined
  onPick: (correct: boolean, optionId: string) => void
}) {
  const shuffled = useMemo(() => shuffle(question.options), [question.id])
  return (
    <div className="options">
      {shuffled.map(opt => (
        <button key={opt.id} type="button" className="opt" disabled={locked} style={selectedStyle(opt.id)}
          onClick={() => onPick(opt.correct, opt.id)}>
          {opt.answer}
        </button>
      ))}
    </div>
  )
}

// ---------- reveal ----------
function RevealView({ question, players, results, dbPlayerCount, isAdmin, isLast, onNext }: {
  question: MCQuestion | TFQuestion
  players: TgameState['players']
  results: TgameState['answers']
  dbPlayerCount?: number | null
  isAdmin: boolean
  isLast: boolean
  onNext: () => void
}) {
  return (
    <article className="card">
      <h2 className="q-text">{question.kind === 'mc' ? question.question : question.statement}</h2>

      {question.kind === 'mc' ? (
        <div className="options">
          {question.options.map(opt => (
            <div key={opt.id} className={`opt ${opt.correct ? 'opt-correct' : ''}`}>{opt.answer}</div>
          ))}
        </div>
      ) : (
        <div className="tf-row">
          <div className={`tf-btn ${question.answerTrue ? 'opt-correct' : ''}`}>נכון</div>
          <div className={`tf-btn ${!question.answerTrue ? 'opt-correct' : ''}`}>לא נכון</div>
        </div>
      )}

      <div className="feedback">
        <p className="explanation">{question.explanation}</p>
        <div style={{ marginTop: '0.9rem' }}>
          <ScoreTableList players={players} results={results} dbPlayerCount={dbPlayerCount} />
        </div>
        {isAdmin && (
          <div className="actions">
            <button type="button" className="primary-btn" onClick={onNext}>
              {isLast ? 'לסיכום' : 'לשאלה הבאה'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
