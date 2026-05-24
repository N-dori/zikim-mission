'use client'

import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import type { Socket } from 'socket.io-client'
import { getServerNow, getSocket, recordServerNow } from '@/app/libs/socket'
import {
  Tanswer,
  TgameState,
  TscoreSummary,
  TserverPlayer,
  TserverSnapshot,
} from '@/app/types/types'
import { gameReducer, initialGameState } from './gameReducer'

type RoundStartEvt = {
  qIndex: number
  startedAt: number
  endsAt: number
  serverNow: number
}

type RoundEndEvt = {
  qIndex: number
  winnerAnswerId: string | null
  answers: Tanswer[]
}

type GameOverEvt = { scoreboard: TscoreSummary[] }

export type GameActions = {
  startGame: () => void
  submitAnswer: (score: 0 | 1, optionId: string) => void
  nextQuestion: () => void
  requestSync: () => void
}

export type UseGameSocketResult = {
  state: TgameState
  actions: GameActions
  selfPlayerId: string | null
  isAdmin: boolean
}

export function useGameSocket(
  roomId: string,
  selfNickName: string | null,
  selfImg: string | null,
  questionsCount?: number
): UseGameSocketResult {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)
  const socketRef = useRef<Socket | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state

  const selfPlayerId = useMemo(() => {
    if (!selfNickName) return null
    const me = state.players.find(p => p.nickName === selfNickName)
    return me ? me.playerId : null
  }, [state.players, selfNickName])

  const selfPlayerIdRef = useRef<string | null>(null)
  selfPlayerIdRef.current = selfPlayerId

  useEffect(() => {
    if (!roomId || !selfNickName || !selfImg) return

    let cancelled = false
    let s: Socket | null = null

    const join = { roomId, nickName: selfNickName, img: selfImg, questionsCount }

    const handleConnect = () => {
      if (!s) return
      s.emit('joinRoom', join)
      s.emit('syncRequest')
    }

    const handleSyncState = (snapshot: TserverSnapshot) => {
      recordServerNow(snapshot.serverNow)
      dispatch({ type: 'SYNC', snapshot })
    }

    const handleRoundStart = (evt: RoundStartEvt) => {
      recordServerNow(evt.serverNow)
      dispatch({
        type: 'ROUND_START',
        qIndex: evt.qIndex,
        startedAt: evt.startedAt,
        endsAt: evt.endsAt,
      })
    }

    const handleAnswerAdded = (answer: Tanswer) => {
      dispatch({
        type: 'ANSWER_ADDED',
        answer,
        selfPlayerId: selfPlayerIdRef.current,
      })
    }

    const handleRoundEnd = (evt: RoundEndEvt) => {
      dispatch({
        type: 'ROUND_END',
        qIndex: evt.qIndex,
        winnerAnswerId: evt.winnerAnswerId,
        answers: evt.answers,
      })
    }

    const handleGameOver = (evt: GameOverEvt) => {
      dispatch({ type: 'GAME_OVER', scoreboard: evt.scoreboard })
    }

    const handlePlayerJoined = (player: TserverPlayer) => {
      dispatch({ type: 'PLAYER_JOIN', player })
    }

    const handlePlayerLeft = ({ playerId }: { playerId: string }) => {
      dispatch({ type: 'PLAYER_LEFT', playerId })
    }

    const handleAdminChanged = ({ adminId }: { adminId: string }) => {
      dispatch({ type: 'ADMIN_CHANGED', adminId })
    }

    ;(async () => {
  const socket = await getSocket()

  if (cancelled) return

  s = socket
  socketRef.current = socket

  // REGISTER LISTENERS FIRST
  socket.on('syncState', handleSyncState)
  socket.on('roundStart', handleRoundStart)
  socket.on('answerAdded', handleAnswerAdded)
  socket.on('roundEnd', handleRoundEnd)
  socket.on('gameOver', handleGameOver)
  socket.on('playerJoined', handlePlayerJoined)
  socket.on('playerLeft', handlePlayerLeft)
  socket.on('adminChanged', handleAdminChanged)

  socket.on('connect', handleConnect)

  socket.on('connect_error', (err) => {
    console.log('SOCKET CONNECT ERROR', err.message)
  })

  socket.on('disconnect', (reason) => {
    console.log('SOCKET DISCONNECTED', reason)
  })

  console.log('SOCKET READY', {
    connected: socket.connected,
    id: socket.id,
  })

  // IMPORTANT:
  // if socket already connected, manually trigger join
  if (socket.connected) {
    handleConnect()
  }
})()

    return () => {
      cancelled = true
      if (s) {
        s.off('connect', handleConnect)
        s.off('syncState', handleSyncState)
        s.off('roundStart', handleRoundStart)
        s.off('answerAdded', handleAnswerAdded)
        s.off('roundEnd', handleRoundEnd)
        s.off('gameOver', handleGameOver)
        s.off('playerJoined', handlePlayerJoined)
        s.off('playerLeft', handlePlayerLeft)
        s.off('adminChanged', handleAdminChanged)
      }
      socketRef.current = null
    }
  }, [roomId, selfNickName, selfImg, questionsCount])

  const startGame = useCallback(() => {
    socketRef.current?.emit('startGame')
  }, [])

  const submitAnswer = useCallback((score: 0 | 1, optionId: string) => {
    const s = socketRef.current
    if (!s) return
    const { roundStartedAt, roundEndsAt, qIndex } = stateRef.current
    const durationSec = Math.max(0.1, (roundEndsAt - roundStartedAt) / 1000)
    const elapsedMs = Math.max(0, getServerNow() - roundStartedAt)
    const time = Math.min(durationSec, elapsedMs / 1000)
    dispatch({ type: 'OPTIMISTIC_SUBMIT' })
    s.emit('submitAnswer', { qIndex, score, time, optionId })
  }, [])

  const nextQuestion = useCallback(() => {
    socketRef.current?.emit('nextQuestion')
  }, [])

  const requestSync = useCallback(() => {
    socketRef.current?.emit('syncRequest')
  }, [])

  const actions = useMemo<GameActions>(
    () => ({ startGame, submitAnswer, nextQuestion, requestSync }),
    [startGame, submitAnswer, nextQuestion, requestSync]
  )

  const isAdmin =
    selfPlayerId !== null && state.adminId !== null && state.adminId === selfPlayerId

  return { state, actions, selfPlayerId, isAdmin }
}
