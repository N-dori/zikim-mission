"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  chronicleCore,
  chronicleRapid,
  ChronicleQuestion,
  MCQuestion,
  TFQuestion,
  OrderQuestion,
} from '../assets/data/otefChroniclesData'
import { ROUND_MAX } from '@/app/libs/round'

type Phase = 'title' | 'play' | 'done'
type Mode = 'core' | 'rapid'

const RAPID_SECONDS = 15

function shuffle<T>(arr: readonly T[]): T[] {
  const next = [...arr]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export default function OtefChronicles() {
  const [phase, setPhase] = useState<Phase>('title')
  const [mode, setMode] = useState<Mode>('core')
  const [deck, setDeck] = useState<ChronicleQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)

  const start = () => {
    const base = mode === 'core' ? chronicleCore : chronicleRapid
    setDeck(shuffle(base).slice(0, ROUND_MAX))
    setIndex(0)
    setScore(0)
    setPhase('play')
  }

  const handleAnswered = (correct: boolean) => {
    if (correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (index >= deck.length - 1) {
      setPhase('done')
    } else {
      setIndex(i => i + 1)
    }
  }

  const restart = () => {
    setPhase('title')
    setDeck([])
    setIndex(0)
    setScore(0)
  }

  // ---------- title ----------
  if (phase === 'title') {
    return (
      <div className="chronicles" dir="rtl">
        <section className="hero">
          <span className="kicker">חידון היסטורי</span>
          <h1 className="title-he">רְצוּעַת עַזָּה</h1>
          <span className="title-en">The Gaza Strip · 5,000 שנות היסטוריה</span>
          <div className="rule" />
          <p className="lead">
            מסע בן אלפי שנים בעקבות עזה, הנגב והעוטף — אנשים, מקומות ואירועים שעיצבו את חבל הארץ הזה.
            בחרו מסלול והתחילו.
          </p>

          <div className="modes">
            <button
              type="button"
              className={`mode-btn ${mode === 'core' ? 'mode-selected' : ''}`}
              onClick={() => setMode('core')}
            >
              <span className="mode-name">מסע מלא</span>
              <span className="mode-desc">{chronicleCore.length} שאלות</span>
            </button>

            <button
              type="button"
              className={`mode-btn ${mode === 'rapid' ? 'mode-selected' : ''}`}
              onClick={() => setMode('rapid')}
            >
              <span className="mode-name"> מהיר אש</span>
              <span className="mode-desc">{chronicleRapid.length} שאלות  </span>
            </button>
          </div>

          <button type="button" className="start-btn" onClick={start}>
            התחילו את המסע
          </button>

          <Link href="/otef-chronicles/group" className="ghost-btn" style={{ marginTop: '0.85rem' }}>
            משחק קבוצתי
          </Link>
        </section>
      </div>
    )
  }

  // ---------- done ----------
  if (phase === 'done') {
    const total = deck.length
    const pct = total ? Math.round((score / total) * 100) : 0
    let msg = 'יש על מה לבנות — סבב נוסף ויהיה אחרת!'
    if (pct >= 85) msg = 'מצוין! אתם ממש בקיאים .'
    else if (pct >= 60) msg = 'יפה מאוד! ידע היסטורי מכובד בהחלט.'
    else if (pct >= 40) msg = 'התחלה טובה — עוד סבב והפערים ייסגרו.'

    return (
      <div className="chronicles" dir="rtl">
        <section className="summary">
          <span className="kicker">סיכום המסע</span>
          <div className="summary-score">{score} / {total}</div>
          <p className="summary-msg">{msg}</p>
          <div className="summary-actions">
            <button type="button" className="start-btn" onClick={restart}>
              למסך הפתיחה
            </button>
            <Link className="ghost-btn" href="/">חזרה לעמוד הראשי</Link>
          </div>
        </section>
      </div>
    )
  }

  // ---------- play ----------
  const q = deck[index]
  const total = deck.length
  const progress = total ? Math.round(((index) / total) * 100) : 0

  return (
    <div className="chronicles" dir="rtl">
      <div className="shell">
        <div className="hud">
          <div className="progress-wrap">
            <div className="progress-text">שאלה {index + 1} מתוך {total}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="score">ניקוד <span>{score}</span></div>
        </div>

        <QuestionCard
          key={q.id}
          question={q}
          mode={mode}
          isLast={index === total - 1}
          onAnswered={handleAnswered}
          onNext={handleNext}
        />
      </div>
    </div>
  )
}

// =====================================================================
// כרטיס שאלה — מטפל בשלושת סוגי השאלות, במשוב ובטיימר (במצב אש מהירה).
// =====================================================================
type CardProps = {
  question: ChronicleQuestion
  mode: Mode
  isLast: boolean
  onAnswered: (correct: boolean) => void
  onNext: () => void
}

function QuestionCard({ question, mode, isLast, onAnswered, onNext }: CardProps) {
  const [revealed, setRevealed] = useState(false)
  const [correct, setCorrect] = useState(false)
  const answeredRef = useRef(false)
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [remaining, setRemaining] = useState(RAPID_SECONDS)

  const reveal = (isCorrect: boolean) => {
    if (answeredRef.current) return
    answeredRef.current = true
    setCorrect(isCorrect)
    setRevealed(true)
    onAnswered(isCorrect)
    if (mode === 'rapid') {
      advanceRef.current = setTimeout(onNext, 1600)
    }
  }

  // טיימר למצב "אש מהירה"
  useEffect(() => {
    if (mode !== 'rapid') return
    if (revealed) return
    if (remaining <= 0) {
      reveal(false) // נגמר הזמן = תשובה שגויה
      return
    }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [remaining, revealed, mode])

  // ניקוי טיימר קידום בעת מעבר שאלה
  useEffect(() => {
    return () => { if (advanceRef.current) clearTimeout(advanceRef.current) }
  }, [])

  return (
    <article className="card">
      <div className="tags">
        <span className="tag">{question.topic}</span>
        <span className="tag">{question.difficulty}</span>
        <span className="tag">{question.source === 'early_history' ? 'היסטוריה קדומה' : 'עוטף עזה'}</span>
      </div>

      {mode === 'rapid' && !revealed && (
        <div className="timer">
          <div className="timer-fill" style={{ width: `${(remaining / RAPID_SECONDS) * 100}%` }} />
        </div>
      )}

      {question.img?.url && (
        <>
          <div className="q-img-wrap">
            <Image
              className="q-img"
              src={question.img.url}
              alt={question.img.desc || 'תמונה היסטורית'}
              fill
              sizes="(max-width: 700px) 92vw, 620px"
              quality={70}
            />
          </div>
          {question.img.desc && <div className="q-img-caption">{question.img.desc}</div>}
        </>
      )}

      {question.kind === 'mc' && (
        <MCBody question={question} revealed={revealed} onReveal={reveal} />
      )}
      {question.kind === 'tf' && (
        <TFBody question={question} revealed={revealed} onReveal={reveal} />
      )}
      {question.kind === 'order' && (
        <OrderBody question={question} revealed={revealed} onReveal={reveal} />
      )}

      {revealed && (
        <div className="feedback">
          <div className={`verdict ${correct ? 'verdict-good' : 'verdict-bad'}`}>
            {correct ? '✓ נכון!' : '✗ לא מדויק'}
          </div>
          <p className="explanation">{question.explanation}</p>
          <div className="actions">
            <button type="button" className="primary-btn" onClick={onNext}>
              {isLast ? 'לסיכום' : 'לשאלה הבאה'}
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

// ---------- multiple choice (incl. who / location / cause) ----------
function MCBody({ question, revealed, onReveal }: {
  question: MCQuestion; revealed: boolean; onReveal: (c: boolean) => void
}) {
  const [chosen, setChosen] = useState<string | null>(null)
  const shuffled = useMemo(() => shuffle(question.options), [question.id])

  const click = (id: string, isCorrect: boolean) => {
    if (revealed) return
    setChosen(id)
    onReveal(isCorrect)
  }

  return (
    <>
      <h2 className="q-text">{question.question}</h2>
      <div className="options">
        {shuffled.map(opt => {
          let cls = 'opt'
          if (revealed && opt.correct) cls = 'opt opt-correct'
          else if (revealed && chosen === opt.id && !opt.correct) cls = 'opt opt-wrong'
          return (
            <button key={opt.id} type="button" className={cls} disabled={revealed}
              onClick={() => click(opt.id, opt.correct)}>
              {opt.answer}
            </button>
          )
        })}
      </div>
    </>
  )
}

// ---------- true / false ----------
function TFBody({ question, revealed, onReveal }: {
  question: TFQuestion; revealed: boolean; onReveal: (c: boolean) => void
}) {
  const [chosen, setChosen] = useState<boolean | null>(null)
  const click = (val: boolean) => {
    if (revealed) return
    setChosen(val)
    onReveal(val === question.answerTrue)
  }
  const cls = (val: boolean) => {
    if (!revealed) return 'tf-btn'
    if (val === question.answerTrue) return 'tf-btn opt-correct'
    if (chosen === val) return 'tf-btn opt-wrong'
    return 'tf-btn'
  }
  return (
    <>
      <h2 className="q-text">{question.statement}</h2>
      <div className="tf-row">
        <button type="button" className={cls(true)} disabled={revealed} onClick={() => click(true)}>נכון</button>
        <button type="button" className={cls(false)} disabled={revealed} onClick={() => click(false)}>לא נכון</button>
      </div>
    </>
  )
}

// ---------- timeline ordering ----------
function OrderBody({ question, revealed, onReveal }: {
  question: OrderQuestion; revealed: boolean; onReveal: (c: boolean) => void
}) {
  const display = useMemo(() => shuffle(question.items), [question.id])
  const [seq, setSeq] = useState<string[]>([])

  const toggle = (id: string) => {
    if (revealed) return
    setSeq(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const submit = () => {
    if (revealed || seq.length !== question.items.length) return
    const isCorrect = seq.every((id, i) => id === question.correctOrder[i])
    onReveal(isCorrect)
  }

  const itemClass = (id: string) => {
    if (!revealed) return 'order-item'
    const userPos = seq.indexOf(id)
    const correctPos = question.correctOrder.indexOf(id)
    return userPos === correctPos ? 'order-item order-correct' : 'order-item order-wrong'
  }

  return (
    <>
      <h2 className="q-text">{question.question}</h2>
      <p className="order-hint">הקישו על הפריטים לפי הסדר הכרונולוגי (מהקדום למאוחר).</p>
      <div className="order-list">
        {display.map(item => {
          const pos = seq.indexOf(item.id)
          return (
            <button key={item.id} type="button" className={itemClass(item.id)} disabled={revealed}
              onClick={() => toggle(item.id)}>
              <span className={`order-num ${pos >= 0 ? 'order-num-active' : ''}`}>
                {pos >= 0 ? pos + 1 : ''}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
      {!revealed && (
        <div className="actions">
          <button type="button" className="primary-btn" disabled={seq.length !== question.items.length}
            onClick={submit}>
            בדקו את הסדר
          </button>
        </div>
      )}
    </>
  )
}
