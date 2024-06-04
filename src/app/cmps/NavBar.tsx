'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

type Props = {}
export default function NavBar({}: Props) {
  
  const {data:session}=useSession()
  
  useEffect(() => {
  }, [])


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
          
          {session?.user?.email? 
          <span className='greeting' onClick={()=>signOut}>שלום {session?.user?.name}  </span> :
          <div><Link href={'/auth/login'} className='login-link'>התחבר</Link></div>
          }  
          {
           session?.user?.email === 'dori.nadav@gmail.com' ?  
            <div><Link href={'/dashboard'} className='login-link'>משתמשים</Link></div>:
            <></>
          }
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