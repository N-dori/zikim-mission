import Image from 'next/image'
import React from 'react'

type ExplantionProps = {
    imgDesc:string
    img:string
    explanation:string
    setIsExplantionShown:(is:boolean)=> void
}

export default function Explantion({setIsExplantionShown,img,explanation,imgDesc}: ExplantionProps) {
  return (
    <div className='explanation-container flex-col flex-jc-ac' >
  
    <p className='explanation-txt '>{explanation}</p> 
    <Image className="explanation-img" src={`/${img}`} width={250} height={200} alt={'desc-pic'} /> 
    <span className="explanation-desc">{imgDesc}</span>
    <button type='button' className='btn pointer' 
          onClick={()=>setIsExplantionShown(false)}>
חזרה ללוח התוצאות         </button>
      </div>
     
  )
}