"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

export default function signup() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [battalions, setBattalions] = useState<string[]>(["8130", "7029", "8104"])
  const [battalion, setBattalion] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState("")
  const handelSubmit = async (e: any) => {


    console.log(e);
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
      const userExist = await fetch('http://localhost:3000/api/userExists', {
        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ email })
      })
      const { user } = await userExist.json()
      if (user) {
        setError("כתובת האימייל קיימת במערכת")
        return
      }
      
      const res = await fetch('http://localhost:3000/api/registration/', {

        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ name, email, battalion, password })

      })
      if (res.ok) {
        const form = e.target
        form.reset()
      } else {
        console.log('user registration failed');
        setError("  פרטים אינם נכונים נסה שוב")

      }

    } catch (err) {
      console.log('had a problom...');

    }

  }
  return (
    <main className='login-signup-container gc2'>
      <section className='login-modal-container'>
        <h1 className='login-signup-title'>רישום זריז ומתחילים</h1>
        <form className='form-container flex-col' onSubmit={handelSubmit}>
          <input onChange={(e) => setName(e.target.value)} className='form-input' type='text' placeholder='שם מלא' ></input>
          <input onChange={(e) => setEmail(e.target.value)} className='form-input' type='email' placeholder=' אימייל' ></input>
          <select onChange={(e) => { setBattalion(e.target.value) }} >
            <option value={"בחר גדוד"}>בחר גדוד</option>
            {battalions.map((bet, i) => <option key={i} value={bet}>{bet}</option>)}

          </select>
          <input onChange={(e) => setPassword(e.target.value)} className='form-input' type='password' placeholder='סיסמא' ></input>
          {error && <span>{error}</span>}
          <button type='submit'>הרשם</button>
        </form>

      </section>
    </main>
  )
}
