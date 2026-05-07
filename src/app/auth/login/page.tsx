"use client"
import EyeSvg from '@/app/assets/svgs/EyeSvg'
import { apiFetch } from '@/app/libs/apiClient'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
useSession
type Props = {}

export default function login(props: Props) {
  return (
    <Suspense fallback={null}>
      <LoginInner {...props} />
    </Suspense>
  )
}

function LoginInner(props: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/menu'
  const [isVisible, setIsVisible] = useState(false)

  const handelIsPasswordVisible = () => {
    setIsVisible(true)
 
   setTimeout(() => {
     setIsVisible(false)
   }, 2000);
  }
  const handelSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!password || !email) {
      setError('בבקשה למלא את כל השדות')
      setTimeout(() => {
        setError('')
      }, 5000)
      return
    }
    try {
      const userExist = await apiFetch('/users/exists', {
        method: 'POST',
        body: JSON.stringify({ email }),
        auth: false,
      })
      const { user } = await userExist.json()
      if (!user) {
        setError("כתובת המייל לא קיימת יש צורך להירשם")
        return
  
      }
      const res = await signIn('credentials', {
        email, password, redirect: false,
      })
      if (!res) {
        setError('שגיאת רשת. נסה שוב')
        return
      }
      if (res.error || !res.ok) {
        console.log('signIn failed', res.error)
        setError('פרטים אינם נכונים')
        return
      }
      router.replace(callbackUrl)
    } catch (err) {
      console.log('had a problom...', err)
      setError('שגיאה לא צפויה. נסה שוב')
    }

  }
  return (
    <main className='login-signup-container gc2 full flex-jc-ac'>
      <Image className='signin-background-image' src={'/RAM.png'} width={100} height={100} alt='' />
      <section className='login-modal-container flex-col flex-jc-ac'>
        <h1 className='login-signup-title'>התחברות</h1>
        <form className='form-container flex-col' onSubmit={handelSubmit}>
          <input onChange={(e) => setEmail(e.target.value)} className='form-input' type='email' placeholder='אימייל ' ></input>
       
          <div className='password-container grid'>
          <EyeSvg handelIsPasswordVisible={handelIsPasswordVisible}></EyeSvg>
          <input onChange={(e) => setPassword(e.target.value)} className='password-input' type={isVisible?'text':'password'} placeholder='סיסמא' ></input>
          </div> 
          {error? <span className='msg err-msg'>{error}</span>:<></>}
          <button type='submit' className='signin-btn'>התחבר</button>
        </form>
        <p className='signup-link tac'>
          אין לך חשבון? <Link href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}>הירשם כאן</Link>
        </p>

      </section>
    </main>
  )
}