"use client"

import { Tplayer, TserverPlayer, WaitingListProps } from '@/app/types/types'
import React from 'react'
import BeatLoader from "react-spinners/BeatLoader"
import PlayersList from './PlayersList'

export default function WaitingList({
    groupName,
    currPlayer,
    players,
    serverPlayers,
    isAdmin,
    onStartGame,
}: WaitingListProps) {

    const merged = mergePlayers(players, serverPlayers)

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
                    currPlayer && isAdmin ?

                        <button
                            onClick={onStartGame}
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

            <PlayersList players={merged} />

        </section>
    )
}

function mergePlayers(rest: Tplayer[], live: TserverPlayer[]): Tplayer[] {
    if (live.length === 0) return rest
    const byNick = new Map<string, Tplayer>()
    for (const p of rest) byNick.set(p.nickName, p)
    for (const p of live) {
        if (!byNick.has(p.nickName)) {
            byNick.set(p.nickName, {
                _id: p.playerId,
                name: p.nickName,
                nickName: p.nickName,
                img: p.img,
                answers: [],
                isAdmin: false,
            })
        }
    }
    return Array.from(byNick.values())
}
