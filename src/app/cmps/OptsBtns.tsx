'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function OptsBtns({}: Props) {
  return (
    <main className="ops-btns-container gc2 grid">
        <h1 className="title full tac">  קובץ ידיעת הארץ גדוד 8130 </h1>
        
    <Link href={'/orientation'} className='nav-btn flex-jc-ac nav-btn1'>
    <span className='nav-btn-txt'>התמצאות במרחב</span>  </Link>
    <Link href={'/early_history'}  className='nav-btn flex-jc-ac nav-btn2'><span className='nav-btn-txt'>רצועת עזה היסטוריה קדומה</span></Link>
    <Link href={'/otef_aza'}  className='nav-btn flex-jc-ac nav-btn3'><span className='nav-btn-txt'>עוטף עזה שטח הפקר </span>  </Link>
    <Link href={'/179trivia'}  className='nav-btn flex-jc-ac nav-btn4'><span className='nav-btn-txt'>חידון חטיבה 179</span></Link>
     <div className='filler'></div>
  </main>
  )
}