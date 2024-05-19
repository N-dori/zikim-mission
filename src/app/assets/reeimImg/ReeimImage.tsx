'use client'
import Image from 'next/image';
import React from 'react'

type Props = {}

export default function ReeimImage({}: Props) {
  return (
    <>
    <Image className="Image" width={150} height={150} 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/101894_reeim_-_memorial_PikiWiki_Israel.jpg/800px-101894_reeim_-_memorial_PikiWiki_Israel.jpg" 
    alt="memorial for the masecere in reeim" 
    onError={({ currentTarget }:any) => {
        currentTarget.src = "/reeim_memorial.png ";
        currentTarget.onerror = null; // prevents looping
    }} 
    />
    <span className="Image-desc">מתחם הטבח ברעים ההיסוריה חוזרת על עצמה</span>  
    
    </>)
}