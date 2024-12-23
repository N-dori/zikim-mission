import React, { useEffect, useRef, useState } from 'react'

type TimerProps = {
    timeLeft:number
    setTimeLeft:React.Dispatch<React.SetStateAction<number>>
    handelTimeOver:()=>void
    timeInerval:any
    initialTime:number
}

export default function Timer({initialTime,timeInerval,setTimeLeft, timeLeft, handelTimeOver}: TimerProps) {
  


    useEffect(() => {
      timeInerval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft((prevTime) => prevTime - 0.1);
            } else {
                clearInterval(timeInerval);
                handelTimeOver()
            }
        }, 100);

        return () => {
            clearInterval(timeInerval)};
    }, [timeLeft]);

  

    const calculateAngle = (): number => {
        const percentage = (timeLeft / (initialTime - 15)) * 100; // Calculate percentage of time left
        const angle = (percentage / 100) * 360; // Calculate current angle based on percentage
        return angle;
    };


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
                <p className='txt'>{timeLeft.toFixed(1)}</p>
            </div>
        </div>
    </section>



  )
}