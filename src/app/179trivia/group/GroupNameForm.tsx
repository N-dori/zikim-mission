"use client"
import React, { useState } from 'react'

type GroupNameFormProps = {
    setGroupName:(string:string) => void
    error:string
    handelError:(error:string) => void
    groupName: string
    setIsStepOneFinished:(finished:boolean) => void
}
export default function GroupNameForm({error, groupName,handelError, setGroupName,setIsStepOneFinished}: GroupNameFormProps) {

    const handelSubmit = (ev:any) => {
    ev.preventDefault()
    if (!groupName) {
        handelError("יש להיכנס עם שם המחלקה שלכם")
        return
    }
    setIsStepOneFinished(true)
}


  

    return (
            <div className='flex-col'>
                <h2 className='tac'>כאן אתם יוצרים חדר, החדר יקרא על שם המחלקה שלכם</h2>
                <form className='flex-col' onSubmit={handelSubmit} >
                    <input className='group-name-input' type='text' onChange={(ev) => setGroupName(ev.target.value)} placeholder='הכניסו כאן את שם המחלקה שלכם' />
                    {error && <span className='error-txt'>{error}</span>}
                    <button className='open-room-btn' >כניסה לחדר</button>

                </form>
            </div>
    )
}