import React from 'react'
import UsersList from '../cmps/UsersList'
import { getUrl } from '../utils/utils'

const getData = async () => {
  try {
  const url =  process.env.NODE_ENV === 'development' ? 
        'http://localhost:3000/api/get_users' : 
        'http://localhost:3000/api/get_users';
    const res = await fetch(url, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Unexpected content type: ${contentType}`);
      throw new TypeError("Received non-JSON response");
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

export default async function dashboard() {
const users = await getData()

  return (
    <main className='gc2'>
    <h1 className='title'>רשימת מתשמשים </h1>

    <UsersList users={users}/>

    </main>
  )
}