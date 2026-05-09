"use client"

import { Tplayer } from '@/app/types/types'
import React, { useEffect } from 'react'
import { getSocket } from '@/app/libs/socket'
import BeatLoader from "react-spinners/BeatLoader"
import PlayersList from './PlayersList'

type WaitingListProps = {
    roomId: string
    groupName: string | null
    currPlayer: Tplayer | null
    setCurrPlayer: React.Dispatch<React.SetStateAction<Tplayer | null>>
    setIsAllReady: (isAllReady: boolean) => void
    getData: (_id: string) => void
    setPlayers: React.Dispatch<React.SetStateAction<Tplayer[]>>
    players: Tplayer[]
}

export default function WaitingList({
    roomId,
    groupName,
    currPlayer,
    players,
    getData,
    setPlayers,
    setIsAllReady
}: WaitingListProps) {

    useEffect(() => {
        getData(roomId)
    }, [roomId])

    useEffect(() => {

        let cleanup: (() => void) | undefined

        ;(async () => {

            const socket = await getSocket()

            socket.off('playerAdded')
            socket.off('allHere')

            const handlePlayerAdded = ({ player }: { player: Tplayer }) => {

                setPlayers((prevPlayers) => {

                    const exists = prevPlayers.some(
                        p => p._id === player._id
                    )

                    if (exists) return prevPlayers

                    return [...prevPlayers, player]
                })
            }

            const handleAllHere = () => {
                setIsAllReady(true)
            }

            socket.on('playerAdded', handlePlayerAdded)
            socket.on('allHere', handleAllHere)

            cleanup = () => {
                socket.off('playerAdded')
                socket.off('allHere')
            }

        })()

        return () => cleanup?.()

    }, [roomId])

    const handelAllHere = async () => {

        const socket = await getSocket()

        socket.emit('allHere', { roomId })
    }

    return (
        <section className='waiting-room-container flex-col gap3'>

            {
                groupName &&
                <h1 className='tac'>
                    חדר המתנה לחדר {groupName}
                </h1>
            }

            <section className='start-game-btn-container flex-jc-ac'>

                {
                    currPlayer?.isAdmin ?

                        <button
                            onClick={handelAllHere}
                            className='start-game-btn pointer'
                        >
                            אתה מנהל החדר, כשכולם כאן
                            <br />
                            לחץ פה כדי להתחיל משחק
                        </button>

                        :

                        <section className='flex-col flex-jc-ac gap1'>

                            <BeatLoader
                                className='lodaer'
                                color='#308f18'
                                loading={true}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />

                            <div className='start-game-btn flex-jc-ac'>
                                <span>
                                    המתן לאישור מנהל החדר לתחילת המשחק
                                </span>
                            </div>

                        </section>
                }

            </section>

            <p className='m-0'>
                מי כבר כאן...
            </p>

            <PlayersList players={players} />

        </section>
    )
}