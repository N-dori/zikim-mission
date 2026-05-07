'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}
export default function NavBar({}: Props) {
  return (
    <nav className='nav-bar flex-sb  full'>
          <div className='logo-container flex-col'>
          <Link href={'/'} >
          <Image className='logo' src={'/logo.png'}
          width={50}
          height={50}
          alt='logo'
          priority
          />
           </Link>
            </div>


           <Image
            className='hero'
            src={'/RAM.png'}
            width={80}
            height={80}
            alt='logo1'
            priority
            />

    </nav>
  )
}
