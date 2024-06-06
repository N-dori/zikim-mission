"use client"
import React, { Suspense, useEffect, useState } from 'react'
import UsersList from '../cmps/UsersList'
import { getUrl } from '../utils/utils'
import { Tuser } from '../types/types';
type Props = {}

export default function ClientUsersIndex({}: Props) {
  const [users, setUsers] = useState()

useEffect(() => {
 getusers()

}, [])
const getusers = async () => {
  const user= await getData()
  setUsers(user)
  return user
}

const getData = async () => {
  try {
  const url =  process.env.NODE_ENV === 'development' ? 
        'http://localhost:3000/api/get_users' : 
        'https://zikim-mission.vercel.app/api/get_users';
    const res = await fetch(url, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (!data || !data.users) {
      console.error('Invalid JSON structure:', data);
      throw new Error("Invalid JSON structure");
    }

    return data.users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
  return (
    users?<UsersList users={users}/>:<></>
  )
}