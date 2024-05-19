
import Image from 'next/image';
import React from 'react'

type Props = {}

export default function ReeimImage({}: Props) {
  return (
    <>
    <Image className="Image" width={150} height={150} 
    src= "/reeim_memorial.png"
    alt="memorial for the masecere in reeim"  
    />
    <span className="Image-desc">מתחם הטבח ברעים ההיסוריה חוזרת על עצמה</span>  
    
    </>)
}