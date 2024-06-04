import React from 'react'
import { Tuser } from '../types/types'

type UserPriviewProps = {
    user:Tuser
}

export default function UserPriview({user}: UserPriviewProps) {
  return (
    <>
    <span className='item user-name gc1'>
       {user.name}
    </span>
    <span className='item user-email gc2'>
       {user.email}
    </span>
    <span className='item user-battalion gc3'>
       {user.battalion}
    </span>
     <span className='item user-isEarlyHistoryCompleted gc4'>
       {Math.round(+(user.isEarlyHistoryCompleted))}
    </span>
     <span className='item user-isOtefAzaCompleted gc5'>
       {Math.round(+(user.isOtefAzaCompleted))}
    </span>
     <span className='item user-createdAt gc6'>
       {user.createdAt}
    </span>
        </>
  )
}