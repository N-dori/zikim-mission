import React, { useEffect } from 'react'

type TimerProps = {
    timeLeft: number
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>
    handelTimeOver: () => void
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
    initialTime: number
}

export default function Timer({
    initialTime,
    timerRef,
    setTimeLeft,
    timeLeft,
    handelTimeOver
}: TimerProps) {

    useEffect(() => {

        clearInterval(timerRef.current!)

        timerRef.current = setInterval(() => {

            setTimeLeft(prevTime => {

                const nextTime = +(prevTime - 0.1).toFixed(1)

                if (nextTime <= 0) {

                    clearInterval(timerRef.current!)

                    handelTimeOver()

                    return 0
                }

                return nextTime
            })

        }, 100)

        return () => {
            clearInterval(timerRef.current!)
        }

    }, [])

    const calculateAngle = (): number => {

        const percentage = (timeLeft / initialTime) * 100

        const angle = (percentage / 100) * 360

        return angle
    }

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
                            strokeDasharray: `${calculateAngle()} 360`,
                            strokeDashoffset: `0`,
                        }}
                    />

                </svg>

                <div className="timer-info">
                    <p className='txt'>
                        {timeLeft.toFixed(1)}
                    </p>
                </div>

            </div>

        </section>
    )
}