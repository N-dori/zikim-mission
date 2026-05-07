'use client'
import { io, Socket } from 'socket.io-client'
import { getApiToken } from './apiClient'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

let socket: Socket | null = null
let connectingPromise: Promise<Socket> | null = null

export async function getSocket(): Promise<Socket> {
  if (typeof window === 'undefined') {
    throw new Error('getSocket() called on the server')
  }
  if (socket) return socket
  if (connectingPromise) return connectingPromise

  connectingPromise = (async () => {
    const token = await getApiToken()
    socket = io(API_BASE, {
      auth: token ? { token } : undefined,
      autoConnect: true,
      transports: ['websocket', 'polling'],
    })
    connectingPromise = null
    return socket
  })()

  return connectingPromise
}

export async function joinRoom(roomId: string): Promise<void> {
  if (!roomId) return
  const s = await getSocket()
  if (s.connected) s.emit('joinRoom', { roomId })
  else s.once('connect', () => s.emit('joinRoom', { roomId }))
}
