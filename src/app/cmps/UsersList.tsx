import React from 'react'
import { Tuser } from '../types/types'
import UserPriview from './UserPriview';

type UsersListProps = {
    users: Tuser[]
}

export default function UsersList({ users }: UsersListProps) {
    

    return (
        users ? <section className='users-list-container grid'>
                <span className='user-name gc1'>
            שם המשתמש
    </span>
    <span className='user-email gc2'>
   אימייל
    </span>
    <span className='user-battalion gc3'>
   גדוד
    </span>
     <span className='user-isEarlyHistoryCompleted gc4'>
       היסטוריה קדומה
    </span>
     <span className='user-isOtefAzaCompleted gc5'>
   עוטף עזה 
    </span>
     <span className='user-createdAt gc6'>
       נוצר 
    </span>
            {users? users.map(user =>
                <UserPriview key={user.email} user={user} />

            ):<></>}

        </section> : <div>Loading.....</div>
    )
}