"use client"
import EyeSvg from '@/app/assets/svgs/EyeSvg'
import { svgs } from '@/app/assets/svgs/svg'
import { getUrl } from '@/app/utils/utils'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function signup() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [battalions, setBattalions] = useState<string[]>(["8130", "7029", "8104"])
  const [battalion, setBattalion] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  
  const router = useRouter()

  const session = useSession()

 useEffect(() => {
  
if(session){
  if(session?.data?.user?.email){
    router.push('/menu')

  }
}
 }, [session?.data?.user?.email])
 
 const handelIsPasswordVisible = () => {
   setIsVisible(true)

  setTimeout(() => {
    setIsVisible(false)
  }, 2000);
 }

  const handelSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    //   if(e.target.value === 'google') return
    if (!password || !name) {
      setError('בבקשה למלא את כל השדות')
      setTimeout(() => {
        setError('')
      }, 5000)
      return
    }
    try {
      const url =  getUrl('userExists')
      const userExist = await fetch(url, {
        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ email })
      })
      const { user } = await userExist.json()
      if (user) {
        setError("כתובת האימייל קיימת במערכת")
        return
      }
      const urlRegistration =  getUrl('registration')

      const res = await fetch(urlRegistration, {

        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ name, email, battalion, password })

      })
      if (res.ok) {
        //loging in mainly for session
        const res =  await signIn('credentials', {
          email, password , redirect:false
                                             })
        const form = e.target
        form.reset()
        console.log('user has registered');
        router.push('/menu')

      } else {
        console.log('user registration failed');
        setError("  פרטים אינם נכונים נסה שוב יש להירשם עם הסיסמא הנכונה")

      }

    } catch (err) {
      console.log('had a problom...',err);

    }

  }

  return (
    <main className='login-signup-container full flex-jc-ac'>
      <Image className='signin-background-image' src={'/RAM.png'} width={100} height={100} alt='' />

      <section className='login-modal-container flex-col flex-jc-ac '>
        <h1 className='login-signup-title '>רישום זריז ומתחילים</h1>
        <h2 className='sub-title tac'>ודאו שאתם נרשמים עם הסיסמא שקיבלתם</h2>

        <form className='form-container flex-col' onSubmit={handelSubmit}>
          <input onChange={(e) => setName(e.target.value)} className='form-input' type='text' placeholder='שם מלא' ></input>
          <input onChange={(e) => setEmail(e.target.value)} className='form-input' type='email' placeholder=' אימייל' ></input>
          <select className='form-input form-select-input' onChange={(e) => { setBattalion(e.target.value) }} >
            <option hidden>בחר גדוד</option>
            {battalions.map((bet, i) => <option key={i} value={bet}>{bet}</option>)}
          </select>
         <div className='password-container grid'>
          <EyeSvg handelIsPasswordVisible={handelIsPasswordVisible}></EyeSvg>
          <input onChange={(e) => setPassword(e.target.value)} className='password-input' type={isVisible?'text':'password'} placeholder='סיסמא' ></input>
          </div> 
          {error && <span className='msg'>{error}</span>}
          <button type='submit' className='signin-btn'>הרשם</button>
        </form>
        <Link className='registered-msg msg clean' href={'/auth/login'}> רשום?  לחץ כאן להתחברות </Link>
      </section>
    </main>
  )
}
