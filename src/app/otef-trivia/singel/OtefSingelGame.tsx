"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {
    otefQuestions,
    otefTopics,
    otefDifficulties,
    OTEF_ROUND_SIZE,
    topicOf,
    OtefQuestion,
    OtefDifficulty,
} from '../../assets/data/otefTriviaData'
import { Confetti1 } from '../../cmps/Confetti'
import Link from 'next/link'
import { OtefTriviaPreview } from './OtefTriviaPreview'

type Props = {}
type Phase = 'setup' | 'play' | 'done'
type DiffFilter = OtefDifficulty | 'הכל'
type TopicFilter = string // נושא או 'הכל'

const SEEN_KEY = 'otef:seenIds'

function loadSeen(): Set<string> {
    if (typeof window === 'undefined') return new Set()
    try {
        const raw = window.localStorage.getItem(SEEN_KEY)
        return new Set(raw ? (JSON.parse(raw) as string[]) : [])
    } catch {
        return new Set()
    }
}

function saveSeen(seen: Set<string>) {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(seen)))
    } catch {
        /* מתעלמים משגיאות אחסון */
    }
}

function shuffle<T>(arr: readonly T[]): T[] {
    const next = [...arr]
    for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]]
    }
    return next
}

// בונה סבב חדש: סדר אקראי, בלי לחזור על שאלות שכבר הוצגו (עד שמיצינו את המאגר).
function buildRound(pool: OtefQuestion[]): OtefQuestion[] {
    const seen = loadSeen()
    let unseen = pool.filter(q => !seen.has(q.id))
    let already = pool.filter(q => seen.has(q.id))

    // מיצינו את כל המאגר המסונן — מאפסים את המעקב עבור מאגר זה ומתחילים סבב נקי.
    if (unseen.length === 0) {
        pool.forEach(q => seen.delete(q.id))
        unseen = pool
        already = []
    }

    const ordered = shuffle(unseen).concat(shuffle(already))
    const round = ordered.slice(0, OTEF_ROUND_SIZE)
    round.forEach(q => seen.add(q.id))
    saveSeen(seen)
    return round
}

export default function OtefSingelGame({}: Props) {
    const [phase, setPhase] = useState<Phase>('setup')
    const [diff, setDiff] = useState<DiffFilter>('הכל')
    const [topic, setTopic] = useState<TopicFilter>('הכל')
    const [round, setRound] = useState<OtefQuestion[]>([])
    const [questIndex, setQuestIndex] = useState(0)
    const [winHeight, setWinHeight] = useState({ height: 450 })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWinHeight({ height: window.innerHeight })
        }
    }, [])

    // השאלות שמתאימות לסינון הנוכחי (לפני הגרלה והגבלה ל-12).
    const matching = useMemo(
        () =>
            otefQuestions.filter(
                q =>
                    (diff === 'הכל' || q.difficulty === diff) &&
                    (topic === 'הכל' || topicOf(q) === topic)
            ),
        [diff, topic]
    )

    const roundSize = Math.min(matching.length, OTEF_ROUND_SIZE)

    const startGame = () => {
        if (matching.length === 0) return
        setRound(buildRound(matching))
        setQuestIndex(0)
        setPhase('play')
    }

    const incrementIndex = () => {
        if (questIndex >= round.length - 1) {
            setPhase('done')
            return
        }
        setQuestIndex(questIndex + 1)
    }

    const backToSetup = () => {
        setPhase('setup')
        setQuestIndex(0)
    }

    // ---------- מסך בחירה ----------
    if (phase === 'setup') {
        const diffOptions: DiffFilter[] = ['הכל', ...otefDifficulties]
        const topicOptions: TopicFilter[] = ['הכל', ...otefTopics]

        return (
            <section className='otef-setup flex-col flex-jc-ac'>
                <p className='otef-setup-lead tac'>בחרו את סוג החידון שתרצו לשחק</p>

                <div className='otef-setup-group flex-col'>
                    <h3 className='otef-setup-title'>רמת קושי</h3>
                    <div className='otef-chips flex-jc-ac'>
                        {diffOptions.map(d => (
                            <button
                                key={d}
                                type='button'
                                className={`otef-chip ${diff === d ? 'is-selected' : ''}`}
                                onClick={() => setDiff(d)}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='otef-setup-group flex-col'>
                    <h3 className='otef-setup-title'>נושא</h3>
                    <select
                        className='otef-select'
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                    >
                        {topicOptions.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

             

                <button
                    type='button'
                    className='game-type-btn'
                    onClick={startGame}
                    disabled={matching.length === 0}
                >
                    התחילו לשחק
                </button>
            </section>
        )
    }

    // ---------- סיום סבב ----------
    if (phase === 'done') {
        return (
            <main className='gc2 flex-col flex-sb'>
                <article className='trivia-container'>
                    <section style={{ height: winHeight.height }} className='end-of-triva-msg-contaoner flex-col flex-jc-ac'>
                        <Confetti1 />
                        <p className='end-of-triva-msg'>כל הכבוד !!!</p>
                        <Link className='no-under-line back-btn tac' href={'/'}>חזרה לעמוד הראשי</Link>
                        <button type='button' className='back-btn' onClick={backToSetup}>סבב חדש</button>
                    </section>
                </article>
            </main>
        )
    }

    // ---------- משחק ----------
    const current = round[questIndex]
    return (
        <main className='gc2 flex-col flex-sb'>
            <article className='trivia-container'>
                <p className='otef-progress tac'>שאלה {questIndex + 1} מתוך {round.length}</p>
                {current && <OtefTriviaPreview incrementIndex={incrementIndex} question={current} />}
            </article>
        </main>
    )
}
