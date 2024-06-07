"use client"

import React, { useState } from 'react'
import { handelForm } from '../utils/utils'




export default function UsersFilter({filter, setFilter}) {
 
    const [battalions] = useState<string[]>(["8130", "7029", "8104"])
    
    const handelChange = (ev:any,battalion:string) => {    
      const newInput =  handelForm(ev)
      
        setFilter((prevFilter) => ({ ...prevFilter, ...newInput}))
    
    }

  return (
    <section > 
<form className='filter-from-container flex-col '>

<label>
    <input type="checkbox" name='otefAza' onChange={(ev)=>handelChange(ev,ev.target.value)} />
     מי קרא עוטף עזה שטח הפקר
</label>
<br/>
<label >
    <input type="checkbox" name='earlyHistory' onChange={(ev)=>handelChange(ev,ev.target.value)} />
  מי קרא היסטוריה קדומה
</label>
<br/>
    <input className='form-input' type='text' name='name' onChange={(ev)=>handelChange(ev,"")}  placeholder='חפש לפי שם'/>
    <select className='form-input form-select-input' name='battalion' onChange={(ev)=>handelChange(ev,ev.target.value) } >
            <option hidden>חפש לפי גדוד</option>
            {battalions.map((bet, i) => <option key={i} value={bet}>{bet}</option>)}
          </select>
 
</form>

    </section>
  )
}