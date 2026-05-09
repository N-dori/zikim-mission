'use client'
import { io, Socket } from 'socket.io-client'
import { getApiToken } from './apiClient'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

let socket: Socket | null = null
let connectingPromise: Promise<Socket> | null = null

let serverClockOffset = 0

export function getSocket(): Promise<Socket> {
  if (typeof window === 'undefined') {
    throw new Error('getSocket() called on the server')
  }
  if (socket) return Promise.resolve(socket)
  if (connectingPromise) return connectingPromise

  connectingPromise = (async () => {
    const token = await getApiToken()
    const s = io(API_BASE, {
      auth: token ? { token } : undefined,
      autoConnect: true,
      transports: ['websocket', 'polling'],
    })
    socket = s
    connectingPromise = null
    return s
  })()

  return connectingPromise
}

export function recordServerNow(serverNow: number): void {
  serverClockOffset = serverNow - Date.now()
}

export function getServerNow(): number {
  return Date.now() + serverClockOffset
}
