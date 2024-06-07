"use client"
import React, { useEffect, useState } from 'react'
import { Tfilter, Tuser } from '../types/types'
import UserPriview from './UserPriview';
import UsersFilter from '../dashboard/UsersFilter';

type UsersListProps = {
    users: Tuser[]
}

export default function UsersList({ users }: UsersListProps) {

    const [filteredUsers, setFilteredUsers] = useState<Tuser[]>(users)
    const [filter, setFilter] = useState({ name: '',battalion:'',earlyHistory:false, otefAza:false})

    useEffect(() => {
        let filtered = [...users];

        if (filter.name.trim() !== '') {
            const regex = new RegExp(filter.name, 'i');
            filtered = filtered.filter(user => regex.test(user.name));
        }

        if (filter.battalion !== "") {
            filtered = filtered.filter(user => user.battalion === filter.battalion);
        }

        if (filter.earlyHistory) {
            filtered = filtered.sort((a, b) => b.isEarlyHistoryCompleted - a.isEarlyHistoryCompleted);
        }

        if (filter.otefAza) {
            filtered = filtered.sort((a, b) => b.isOtefAzaCompleted - a.isOtefAzaCompleted);
        }

        setFilteredUsers(filtered);
    }, [filter, users]);

    useEffect(() => {
        if (filter.earlyHistory && filter.otefAza) {
            setFilter(prevFilter => ({ ...prevFilter, otefAza: false }));
        } else if (filter.otefAza && filter.earlyHistory) {
            setFilter(prevFilter => ({ ...prevFilter, earlyHistory: false }));
        }
    }, [filter.earlyHistory, filter.otefAza]);


    return (

        <main>

            <UsersFilter filter={filter} setFilter={setFilter} />

            {users ? <section className='users-list-container grid'>
                <span className='total-students'>משתמשים רשומים {users.length}</span>
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
                
                {filteredUsers && filteredUsers.map(user =>
                    <UserPriview key={user._id} user={user} />
                ) }
                {filteredUsers.length===0?<div>אין תוצאות מתאימות </div>:<></>}

            </section> : <div>Loading.....</div>
            }

        </main>
    )
}