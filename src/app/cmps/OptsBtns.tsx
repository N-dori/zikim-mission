'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
type Props = {}

export default function OptsBtns({ }: Props) {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
    // console.log(session.data);
  if(!session.data){
router.push('/auth/signup')

  }
  }, [session.data])

  


  return (
    <main className="ops-btns-container gc2 grid">
      <h1 className="title full flex-jc-ac tac">  קובץ ידיעת הארץ גדוד 8130 </h1>

      <Link href={'/orientation'} className='nav-btn flex-jc-ac nav-btn1'>
        <Image className='nav-btn-img' src={'/Map-map-marker-icon.png'} width={111} height={111} alt={'image of a map'} />
        <span className='nav-btn-txt'>התמצאות במרחב</span>
      </Link>

      <Link href={'/early_history'} className='nav-btn flex-jc-ac nav-btn2'>
        <Image className='nav-btn-img' src={'/tuthmosisIII_conq.jpeg'} width={111} height={111} alt={'image of a map'} />
        <span className='nav-btn-txt'>רצועת עזה היסטוריה קדומה</span>
      </Link>

      <Link href={'/otef_aza'} className='nav-btn flex-jc-ac nav-btn3'>
        <Image className='nav-btn-img' src={'/otef_aza.webp'} width={111} height={111} alt={'image of a map'} />
        <span className='nav-btn-txt'>עוטף עזה שטח הפקר </span>
      </Link>

      <Link href={'/179trivia'} className='nav-btn flex-jc-ac nav-btn4'>
        <Image className='nav-btn-img' src={'/RAM.png'} width={111} height={111} alt={'image of a map'} />
        <span className='nav-btn-txt'>חידון חטיבה 179</span>
      </Link>
      <div className='filler'></div>
    </main>
  )
}