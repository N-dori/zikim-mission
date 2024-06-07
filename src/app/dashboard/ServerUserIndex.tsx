import React, { Suspense } from 'react'
import { getUrl } from '../utils/utils'
import UsersList from '../cmps/UsersList'
import { Tuser } from '../types/types'

type Props = {}

const getData = async () => {
    const url = getUrl('get_users')
    const res = await fetch(url, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
    })
    if ((res).ok) {
        return res.json()
    }

    if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        throw new Error(`HTTP error! status: ${res.status}`);
    }
}


export default async function ServerUserIndex({ }: Props) {
    const { users } = await getData()
  


    return (
        <Suspense fallback={'Loading...'}>
           
            {users ? <UsersList users={users} /> : <></>}

        </Suspense>
    )
}