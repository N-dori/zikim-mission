'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}
export default function NavBar({}: Props) {

  return (
    <nav className='nav-bar flex-sb  full'>
          <Link href={'/'} className='logo-container '>
          <Image className='logo' src={'/logo.png'}
          width={50}
          height={50}
          alt='logo'
          priority
          />
           </Link>
           <Image
            className='hero'
            src={'/RAM.png'}
            width={50}
            height={50}
            alt='logo1'
            priority
          />
         
    </nav>
  )
}