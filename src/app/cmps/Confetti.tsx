import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

export  function Confetti1() {
  const [windowDimen, setwindowDimen] = useState({width:window.innerWidth,hight:window.innerHeight})
const setWindowSize = () => {
  setwindowDimen({width:window.innerWidth,hight:window.innerHeight})
}
useEffect(() => {
  addEventListener('resize',setWindowSize)

  return () => {
removeEventListener('resize',setWindowSize)
  }
}, [windowDimen])

    return (
        <div>
       <ReactConfetti 
       width={windowDimen.width}
       height={windowDimen.hight}/>

    </div>
  )
}
