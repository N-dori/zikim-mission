"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState ,useMemo } from 'react'
type Props = {
    articel: string
}
export function ProgressBar({ articel }: Props) {


    const [scrollProcentage, setScrollProcentage] = useState(0)
    const session = useSession()

    useEffect(() => {
        const handelScroll = () => {
            const winScroll = document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (winScroll / height) * 100
    
            setScrollProcentage(scrolled)
        }
        window.addEventListener('scroll', handelScroll)
  
        return () => {
            window.removeEventListener('scroll', handelScroll)
            console.log('about to update User Reading Progress ',scrollProcentage);
            if(scrollProcentage>50)
            updateUserReadingProgress(scrollProcentage)
        }
    }, [scrollProcentage])

    const updateUserReadingProgress = async (scrolled:number) => {
        const email = session?.data?.user?.email
        try {
        
                const res = await fetch('api/updateUserProgress', {
                    method: 'PUT',
                    headers: { "Content-type": "appliction/json" },
                    body: JSON.stringify({ email, articel, scrollProcentage })
                })
                if (res.ok) {
                    console.log('update User Reading Progress works',res.json());
                    
                }
            
        }catch(err){
            console.log('update User Reading Progress dose not works',err);

        }
       
}

    return (
        <section className='Progress-bar-container'
        >
            <div className='progress-field' style={{
                width: `${scrollProcentage}%`
            }}></div>
        </section>
    )
}