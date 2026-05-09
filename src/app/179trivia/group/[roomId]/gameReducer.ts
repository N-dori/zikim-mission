import {
  Tanswer,
  TgameAction,
  TgameState,
  TscoreSummary,
  TserverPlayer,
} from '@/app/types/types'

export const initialGameState: TgameState = {
  phase: 'WAITING',
  qIndex: 0,
  roundStartedAt: 0,
  roundEndsAt: 0,
  players: [],
  adminId: null,
  answers: [],
  roundWinnerAnswerId: null,
  finalScoreboard: null,
  myAnswerSubmitted: false,
}

export function gameReducer(state: TgameState, action: TgameAction): TgameState {
  switch (action.type) {
    case 'SYNC':
      return {
        phase: action.snapshot.phase,
        qIndex: action.snapshot.qIndex,
        roundStartedAt: action.snapshot.roundStartedAt,
        roundEndsAt: action.snapshot.roundEndsAt,
        players: action.snapshot.players,
        adminId: action.snapshot.adminId,
        answers: action.snapshot.answers,
        roundWinnerAnswerId: action.snapshot.roundWinnerAnswerId ?? null,
        finalScoreboard: action.snapshot.finalScoreboard ?? null,
        myAnswerSubmitted: false,
      }

    case 'ROUND_START':
      return {
        ...state,
        phase: 'QUESTION',
        qIndex: action.qIndex,
        roundStartedAt: action.startedAt,
        roundEndsAt: action.endsAt,
        roundWinnerAnswerId: null,
        myAnswerSubmitted: false,
      }

    case 'ANSWER_ADDED': {
      const idx = state.answers.findIndex(a => a.answerId === action.answer.answerId)
      const next = idx === -1
        ? [...state.answers, action.answer]
        : state.answers.map((a, i) => (i === idx ? action.answer : a))
      const isMine =
        action.selfPlayerId !== null && action.answer.playerId === action.selfPlayerId
      return {
        ...state,
        answers: next,
        myAnswerSubmitted: state.myAnswerSubmitted || isMine,
      }
    }

    case 'ROUND_END':
      return {
        ...state,
        phase: 'REVEAL',
        roundWinnerAnswerId: action.winnerAnswerId,
        answers: mergeAnswers(state.answers, action.answers),
      }

    case 'GAME_OVER':
      return {
        ...state,
        phase: 'FINAL',
        finalScoreboard: action.scoreboard,
      }

    case 'PLAYER_JOIN': {
      if (state.players.some(p => p.playerId === action.player.playerId)) return state
      return { ...state, players: [...state.players, action.player] }
    }

    case 'PLAYER_LEFT':
      return {
        ...state,
        players: state.players.filter(p => p.playerId !== action.playerId),
      }

    case 'ADMIN_CHANGED':
      return { ...state, adminId: action.adminId }

    case 'OPTIMISTIC_SUBMIT':
      return { ...state, myAnswerSubmitted: true }

    case 'RESET':
      return initialGameState

    default:
      return state
  }
}

function mergeAnswers(existing: Tanswer[], incoming: Tanswer[]): Tanswer[] {
  const byId = new Map(existing.map(a => [a.answerId, a]))
  for (const a of incoming) byId.set(a.answerId, a)
  return Array.from(byId.values())
}

export function buildScoreSummaries(
  players: TserverPlayer[],
  answers: Tanswer[]
): TscoreSummary[] {
  return players
    .map(p => {
      const ans = answers.filter(a => a.playerId === p.playerId)
      return {
        playerId: p.playerId,
        nickName: p.nickName,
        img: p.img,
        totalScore: ans.reduce((s, a) => s + a.score, 0),
        totalTime: ans.reduce((s, a) => s + a.time, 0),
        victories: ans.filter(a => a.isVinner).length,
      }
    })
    .sort(
      (a, b) =>
        b.totalScore - a.totalScore ||
        a.totalTime - b.totalTime ||
        b.victories - a.victories
    )
}
