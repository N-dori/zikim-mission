"use client"
import React, {  useState } from 'react'
import GroupNameForm from './GroupNameForm'
import NicknameFrom from './NicknameFrom'
import { useRouter } from 'next/navigation'
import { getUrl } from '@/app/utils/utils'
import { useSession } from 'next-auth/react';
import {  Troom } from '@/app/types/types'
import io from 'socket.io-client';
type Props = {}

export default function CreatePlayer({ }: Props) {
    
    const [isStepOneFinished, setIsStepOneFinished] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [nickName, setNickName] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const [error, setError] = useState("")

    const router = useRouter()
    const { data: session } = useSession();


    

    const handelSubmit = async (ev: any) => {
        ev.preventDefault()

        if(!nickName){
            handelError('כדי להתקדם הזן כינוי יחודי לך!')
        
            return
        }
        const urlIsRoomExists = getUrl('trivia/getRoomById')
        try {
            // check first  if room already exists 
            const resRoom = await fetch(urlIsRoomExists, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ name: groupName })

            })

            let {room} = await resRoom.json()
           
            if (room ) {
                const isFirstRegistered = false
                addPlayer(room, nickName,isFirstRegistered);
                return 
            }
        const urlCreateTriviaRoom = getUrl('trivia/createTriviaRoom')

            const res = await fetch(urlCreateTriviaRoom, {

                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ name: groupName })

            })
            let {newRoom} = await res.json() 
            if (newRoom) {
                const isFirstRegistered = true
                addPlayer(newRoom, nickName ,isFirstRegistered)
            } else {
                throw new Error('could not open a new room');

            }

        } catch (error) {
            console.error(error.message);
        }


    }

    const addPlayer = async (room: Troom, nickName: string,isFirstRegistered:boolean) => {
     
        const player = {
            roomId:room._id,
            name:session.user.name,
            nickName,
            img: imgUrl,
            isAdmin:isFirstRegistered,
            answers: [
                {
                    score: 0,
                    time: 0,
                    isVinner: false,
                }
            ]         
        }       
        
        const bodyReq = {
            roomId:room._id,
            player:{...player}
        }
        // console.log('bodyReq in creat player' ,bodyReq);
        

        const urlAddPlayer = getUrl('trivia/addPlayer')
        const res = await fetch(urlAddPlayer, {

            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bodyReq)

        })
        const socket = io(getUrl('')); 
       
        socket.emit('playerAdded', { player });
        if(res.ok){
                let _id= room._id
                router.push(`/179trivia/group/${_id}`)    

        }
    }

    const  handelError =(msg:string) => {
        setError(msg)
        setTimeout(() => {
            setError("")
        }, 3000);
    }

    const groupNameFormProps = {
        groupName,
        error,
        handelError,
        setGroupName,
        setIsStepOneFinished,
    }

    const nickNaneFormProps = {
        groupName,
        nickName,
        setNickName,
        setImgUrl,
        error,
        setError,
        imgUrl,
        handelSubmit,
        session

    }

    return (
        <section className='group-name-form-container w100'>
            {!isStepOneFinished ?
                <GroupNameForm {...groupNameFormProps} />
                :
                <NicknameFrom {...nickNaneFormProps} />}

        </section>



    )
}
