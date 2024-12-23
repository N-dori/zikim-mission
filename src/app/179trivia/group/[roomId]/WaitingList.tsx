'use client'

import { Tplayer } from '@/app/types/types'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import BeatLoader from "react-spinners/BeatLoader";
import PlayersList from './PlayersList'
import { getUrl } from '@/app/utils/utils';

type WaitingListProps = {
    roomId: string
    groupName:string|null
    currPlayer: Tplayer
    setIsAllReady: (isAllReady: boolean) => void
    getData: (_id: string) => void
    setPlayers: React.Dispatch<React.SetStateAction<Tplayer[]>>
    players:Tplayer[]
 

}

export default function WaitingList({ roomId, groupName, currPlayer, players, getData, setPlayers, setIsAllReady }: WaitingListProps) {

   
    
    useEffect(() => {
        getData(roomId)
        
    }, [])
    
    useEffect(() => {
        const socket = io(getUrl(''))
     
            if (typeof window !== 'undefined') {
                window.addEventListener('beforeunload', () => socket.close());
            }
        socket.on('connection', () => {
            console.log('Connected to server via Socket.IO');

        });

        socket.on('playerAdded', ({ player }) => {
            console.log('from waiting list the socket *****', player)
            //to make sure we dont show player of other rooms
            if (roomId !== player.roomId) {
                return
            }
            
             setPlayers((prevPlayers: Tplayer[]): Tplayer[] => {
                if (prevPlayers.some((p: Tplayer) => p.nickName === player.nickName)) {
                    return prevPlayers;
                }
                return [...prevPlayers, player];
            });
        })
        //listen to all here event: when group is ready to start trivia all clients toggel isAllReady in GroupRoom cmp
        socket.on('allHere', () => {
            setIsAllReady(true);
        });
        
        return () => {
            socket.off('playerAdded');
            socket.off('allHere');
            socket.disconnect();
        };

    }, [players])


const handelAllHere  = () => {
    const socket = io(getUrl(''))
    socket.emit('allHere', { roomId });
}

    return (
        <section className='waiting-room-container  flex-col gap3'>
          {groupName&& <h1 className='tac'> חדר המתנה לחדר {groupName} </h1>}

            <section className='start-game-btn-container flex-jc-ac'>
                {currPlayer?.isAdmin ?

                    <button onClick={handelAllHere} className='start-game-btn pointer'>
                        אתה מנהל החדר, כשכולם  כאן<br></br>לחץ פה! כדי להתחיל משחק
                    </button>
                    :
                    <section className='flex-col flex-jc-ac gap1'>
                        <BeatLoader
                            className='lodaer'
                            color={`#308f18`}
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <div className='start-game-btn flex-jc-ac'>
                            <span >המתן לאישור מנהל החדר לתחילת משחק</span>
                        </div>
                    </section>



                }

            </section>
            <p className='m-0'> מי כבר כאן...</p>
            <PlayersList players={players} />


        </section>
    )
}