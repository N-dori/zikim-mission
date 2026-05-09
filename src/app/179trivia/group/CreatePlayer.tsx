"use client"
import React, { useState } from 'react'
import GroupNameForm from './GroupNameForm'
import NicknameFrom from './NicknameFrom'
import { useRouter } from 'next/navigation'
import { Troom } from '@/app/types/types'
import { apiFetch } from '@/app/libs/apiClient'

export default function CreatePlayer() {

    const [isStepOneFinished, setIsStepOneFinished] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [nickName, setNickName] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handelSubmit = async (ev: any) => {
        ev.preventDefault()

        if (!nickName) {
            handelError('כדי להתקדם הזן כינוי יחודי לך!')
            return
        }

        const imgUrl = `https://robohash.org/${encodeURIComponent(nickName)}?set=set4`
        try {
            const resRoom = await apiFetch('/trivia/getRoom', {
                method: 'POST',
                body: JSON.stringify({ name: groupName })
            })

            let { room } = await resRoom.json()

            if (room) {
                addPlayer(room, nickName, imgUrl)
                return
            }

            const res = await apiFetch('/trivia/createRoom', {
                method: 'POST',
                body: JSON.stringify({ name: groupName })
            })
            if (res.status === 401) {
                router.push('/auth/login?callbackUrl=%2F179trivia%2Fgroup')
                return
            }
            let { newRoom } = await res.json()
            if (newRoom) {
                addPlayer(newRoom, nickName, imgUrl)
            } else {
                throw new Error('could not open a new room');
            }

        } catch (error) {
            console.error(error instanceof Error ? error.message : error);
        }
    }

    const addPlayer = async (room: Troom, nickName: string, imgUrl: string) => {

        const player = {
            roomId: room.id,
            name: nickName,
            nickName,
            img: imgUrl,
            answers: [],
        }

        const bodyReq = {
            roomId: room.id,
            player: { ...player }
        }

        const res = await apiFetch('/trivia/addPlayer', {
            method: 'PUT',
            body: JSON.stringify(bodyReq)
        })
        if (res.status === 401) {
            router.push('/auth/login')
            return
        }

        if (res.ok) {
            try {
                sessionStorage.setItem(`trivia:nickName:${room.id}`, nickName)
            } catch { }
            let _id = room.id
            router.push(`/179trivia/group/${_id}`)
        }
    }

    const handelError = (msg: string) => {
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
        error,
        setError,
        handelSubmit,
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
