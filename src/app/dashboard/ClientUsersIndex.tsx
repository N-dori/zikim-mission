"use client"
import React, { useEffect, useState } from 'react'
import UsersList from '../cmps/UsersList'
import { apiFetch } from '../libs/apiClient'

type Props = {}

export default function ClientUsersIndex({}: Props) {
  const [users, setUsers] = useState()

  useEffect(() => {
    getusers()
  }, [])

  const getusers = async () => {
    try {
      const res = await apiFetch('/users', { method: 'GET' })
      if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`)
        return
      }
      const data = await res.json()
      if (data && data.users) setUsers(data.users)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    }
  }

  return users ? <UsersList users={users} /> : <></>
}