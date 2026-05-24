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
      const isUser = await userExist.json()
      console.log('isUser', isUser)
      if (!isUser) {
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
          אין לך חשבון? <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}>הירשם כאן</Link>
        </p>

      </section>
    </main>
  )
}
/*
```The real blocker: it's not CORS
login/page.tsx:47-57 does:


const userExist = await apiFetch('/users/exists', ...)
const { user } = await userExist.json()
if (!user) { setError("כתובת המייל לא קיימת..."); return }
But users.js:40 returns { exists: true/false } — there is no user field. So user is always undefined, !user is always true, and every login attempt aborts with "email doesn't exist" before signIn() is ever called. Looks like a network/auth failure but it's a JSON shape mismatch.

Same bug exists in signup/page.tsx:69 — the duplicate-email check is silently broken (the 23505 handler on the server still catches duplicates, so registration is safe, just no nice message).

The actual CORS setup is correct
server.js:14-26 — parses comma-separated origins, includes OPTIONS, mounts cors() before routes
Default cors reflects requested headers, so Authorization is fine
Backend backend/.env includes http://localhost:3000 and the Vercel origin — good
Bearer-token auth (no cookies), so credentials: true is unused but harmless
The /users/login call inside authOptions.ts:28 runs server-side — never touches the browser CORS path
One CORS gotcha worth checking
zikim-mission/.env.local points the local dev frontend at the deployed Render backend. Render uses its own dashboard env vars, not the local backend/.env. If Render's ALLOWED_ORIGIN is missing http://localhost:3000, every dev request will preflight-fail. I can't see Render config from here — please verify in Render → Environment that ALLOWED_ORIGIN matches the local .env value.

End-point map (no CORS issues in code)
Endpoint	Auth	Notes
POST /users/exists	none	shape mismatch with FE (above)
POST /users/login	none	called server-side by NextAuth, no CORS path
POST /users/register	none	OK
PUT /users/progress	none	OK
GET /users	Bearer	OK
GET /trivia/questions	Bearer	OK
POST /trivia/createRoom, /getRoom, /getParticipants, PUT /addPlayer	Bearer	OK
POST /wiki, /wiki/link	none	OK
Want me to fix the destructure bug?
Two-line change in each file — const { user } → const { exists }, then flip the conditions. That'll likely make login work immediately. Should I apply it?```
*/