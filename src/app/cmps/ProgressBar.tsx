"use client"
import React, { useEffect, useRef, useState  } from 'react'
import {Tuser} from '../types/types'
import { getUrl } from '../utils/utils'
import { usePathname, useSearchParams  } from 'next/navigation'
type ProgressBarProps = {
    articel: string,
    user:Tuser|null
    
}
export function ProgressBar({user, articel }: ProgressBarProps) {
    //for displaying the most updated value
    const [scrollPescentage, setScrollPescentage] = useState(0)
    // to keep trak after the value
    const scrollPescentageRef = useRef(0); 

    const pathname = usePathname()
    const searchParams= useSearchParams()

   
    useEffect(() => {
        const handelScroll = () => {
            const winScroll = document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (winScroll / height) * 100
            
            scrollPescentageRef.current=scrolled
            setScrollPescentage(scrolled)
        }

        window.addEventListener('scroll', handelScroll)
        return () => {
     
            window.removeEventListener('scroll', handelScroll) 
            }
        
    }, [scrollPescentage])

  useEffect(() => {
//pathname,searchParams trigger this func when the path is changing
    return () => {

            if(scrollPescentageRef.current>0){
                if(articel === 'early History'){   
                            if(scrollPescentageRef.current > +(user.isEarlyHistoryCompleted)){
                                console.log('about to update isEarlyHistoryCompleted Reading Progress ', +(user.isEarlyHistoryCompleted ))
                                updateUserReadingProgress(scrollPescentageRef.current)
                                
                            }
                        }else {
                            if(scrollPescentageRef.current > +(user.isOtefAzaCompleted)){
                                console.log('about to update isOtefAzaCompleted Reading Progress ', +(user.isEarlyHistoryCompleted ))
                                updateUserReadingProgress(scrollPescentageRef.current)
                
                            }
                        } 

            }
    
    };
  }, [pathname,searchParams]);

    

    const updateUserReadingProgress = async (scrollProcentage:number) => {
        const email = user.email
        try {
            const url = getUrl('updateUserProgress')

                const res = await fetch(url, {
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
                width: `${scrollPescentage}%`
            }}></div>
        </section>
    )
}