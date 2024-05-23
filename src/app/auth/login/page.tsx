"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

export default  function  login(props: Props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
   const router = useRouter()

  
    const handelSubmit = async (e:any) => {
      console.log(e);
      e.preventDefault()
      e.stopPropagation()
    //   if(e.target.value === 'google') return
      if ( !password || !email ) {
        setError('בבקשה למלא את כל השדות')
        setTimeout(() => {
          setError('')
        }, 5000)
        return
      }
      try{
      const res =  await signIn('credentials', {
           email,  password , redirect:false
                                               })
      if(res?.error){
      setError("  פרטים אינם נכונים נסה שוב")
      return 
   }
   router.replace("/")
  }catch( err ){
    console.log('had a problom...');
    
  }
  
    }
  return (
    <main className='login-signup-container gc2'>
        <section className='login-modal-container'>
            <h1 className='login-signup-title'>רישום זריז ומתחילים</h1>
            <form className='form-container' onSubmit={handelSubmit}>
 <input onChange={(e) => setEmail(e.target.value)} className='form-input' type='email' placeholder='אימייל ' ></input>
 <input onChange={(e) => setPassword(e.target.value)} className='form-input' type='password' placeholder='סיסמא' ></input>

                <button type='submit'>התחבר</button>
            </form>

        </section>
        </main>
  )
}