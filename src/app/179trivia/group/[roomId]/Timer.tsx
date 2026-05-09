'use client'

import React, { useEffect, useReducer } from 'react'
import { getServerNow } from '@/app/libs/socket'
import { TimerProps } from '@/app/types/types'

export default function Timer({ roundStartedAt, roundEndsAt }: TimerProps) {

    const [, force] = useReducer((x: number) => x + 1, 0)

    useEffect(() => {
        const t = setInterval(force, 100)
        return () => clearInterval(t)
    }, [])

    const totalMs = Math.max(1, roundEndsAt - roundStartedAt)
    const remainingMs = Math.max(0, roundEndsAt - getServerNow())
    const remainingSec = remainingMs / 1000
    const percentage = Math.max(0, Math.min(100, (remainingMs / totalMs) * 100))
    const angle = (percentage / 100) * 360

    return (
        <section className='flex-jc-ac'>
            <div className="timer-circle-container flex-jc-ac">
                <svg viewBox="0 0 100 100" className="timer-circle-svg">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="timer-circle"
                        style={{
                            strokeDasharray: `${angle} 360`,
                            strokeDashoffset: `0`,
                        }}
                    />
                </svg>
                <div className="timer-info">
                    <p className='txt'>
                        {remainingSec.toFixed(1)}
                    </p>
                </div>
            </div>
        </section>
    )
}
