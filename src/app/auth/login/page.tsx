"use client"
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
useSession
type Props = {}

export default function login(props: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()


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
      const userExist = await fetch('api/userExists', {
        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ email })
      })
      const { user } = await userExist.json()     
      if (!user) {
        setError("כתובת המייל לא קיימת יש צורך להירשם")
        return
  
      }
      const res =  await signIn('credentials', {
        email, password , redirect:false
                                           })
        if(res.error){
          setError('פרטים אינם נכוvנים')
          return
        }                                          
        router.replace('/menu')
    } catch (err) {
      console.log('had a problom...',err);

    }

  }
  return (
    <main className='login-signup-container gc2 full flex-jc-ac'>
      <Image className='signin-background-image' src={'/RAM.png'} width={100} height={100} alt='' />
      <section className='login-modal-container flex-col flex-jc-ac'>
        <h1 className='login-signup-title'>התחברות</h1>
        <form className='form-container flex-col' onSubmit={handelSubmit}>
          <input onChange={(e) => setEmail(e.target.value)} className='form-input' type='email' placeholder='אימייל ' ></input>
          
          <input onChange={(e) => setPassword(e.target.value)} className='form-input' type='password' placeholder='סיסמא' ></input>
          {error? <span className='msg err-msg'>{error}</span>:<></>}
          <Link className='msg' href={'/auth/signup'}>לא רשום עדיין? לחץ כאן</Link>
          <button type='submit' className='signin-btn'>התחבר</button>
        </form>

      </section>
    </main>
  )
}