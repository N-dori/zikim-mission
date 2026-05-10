import type { Question } from '@/app/assets/data/triviaData'

export interface Tuser {
        _id: string,
        name: string,
        email: string,
        battalion: string,
        password: string,
        isEarlyHistoryCompleted: number,
        isOtefAzaCompleted: number,
        createdAt: string


}
export type Tfilter = {
        name: ''
}

export type Tanswer = {
        id?: string,
        answerId: string,
        score: number,
        time: number,
        isVinner:boolean,
        playerId?:string,
        questionId?: number,
        nickName?:string,
        img?:string,
        roomId?:string,
}

export type Tplayer = {

        _id?: string,
        name:string,
        nickName: string,
        img: string,
        answers: Tanswer[],
        isAdmin: boolean

}



export type Troom = {
        id?: string,
        name: string,
        participants: Tplayer[]

}

export type Phase = 'WAITING' | 'QUESTION' | 'REVEAL' | 'FINAL'

export type TserverPlayer = {
        playerId: string,
        nickName: string,
        img: string,
}

export type TscoreSummary = {
        playerId: string,
        nickName: string,
        img: string,
        totalScore: number,
        totalTime: number,
        victories: number,
}

export type TserverSnapshot = {
        phase: Phase,
        qIndex: number,
        roundStartedAt: number,
        roundEndsAt: number,
        serverNow: number,
        players: TserverPlayer[],
        answers: Tanswer[],
        adminId: string | null,
        roundWinnerAnswerId?: string | null,
        finalScoreboard?: TscoreSummary[] | null,
}

export type TgameState = {
        phase: Phase,
        qIndex: number,
        roundStartedAt: number,
        roundEndsAt: number,
        players: TserverPlayer[],
        adminId: string | null,
        answers: Tanswer[],
        roundWinnerAnswerId: string | null,
        finalScoreboard: TscoreSummary[] | null,
        myAnswerSubmitted: boolean,
}

export type TgameAction =
        | { type: 'SYNC'; snapshot: TserverSnapshot }
        | { type: 'ROUND_START'; qIndex: number; startedAt: number; endsAt: number }
        | { type: 'ANSWER_ADDED'; answer: Tanswer; selfPlayerId: string | null }
        | {
                type: 'ROUND_END'
                qIndex: number
                winnerAnswerId: string | null
                answers: Tanswer[]
          }
        | { type: 'GAME_OVER'; scoreboard: TscoreSummary[] }
        | { type: 'PLAYER_JOIN'; player: TserverPlayer }
        | { type: 'PLAYER_LEFT'; playerId: string }
        | { type: 'ADMIN_CHANGED'; adminId: string }
        | { type: 'OPTIMISTIC_SUBMIT' }
        | { type: 'RESET' }

export type TroundStartEvt = {
        qIndex: number,
        startedAt: number,
        endsAt: number,
        serverNow: number,
}

export type TroundEndEvt = {
        qIndex: number,
        winnerAnswerId: string | null,
        answers: Tanswer[],
}

export type TgameOverEvt = {
        scoreboard: TscoreSummary[],
}

export type TgameActions = {
        startGame: () => void,
        submitAnswer: (score: 0 | 1, optionId: string) => void,
        nextQuestion: () => void,
        requestSync: () => void,
}

export type TuseGameSocketResult = {
        state: TgameState,
        actions: TgameActions,
        selfPlayerId: string | null,
        isAdmin: boolean,
}

export type GroupRoomProps = {
        roomId: string,
}

export type WaitingListProps = {
        roomId: string,
        groupName: string | null,
        currPlayer: Tplayer | null,
        players: Tplayer[],
        serverPlayers: TserverPlayer[],
        isAdmin: boolean,
        onStartGame: () => void,
}

export type GroupTriviaGameProps = {
        roomId: string,
        currPlayer: Tplayer,
        state: TgameState,
        actions: TgameActions,
        selfPlayerId: string | null,
        isAdmin: boolean,
        dbPlayerCount?: number | null,
}

export type TimerProps = {
        roundStartedAt: number,
        roundEndsAt: number,
}

export type TrivaPreviewProps = {
        question: Question,
        disabled: boolean,
        onAnswer: (score: 0 | 1, optionId: string) => void,
}

export type ScoreTableProps = {
        roomId: string,
        players: TserverPlayer[],
        question: Question,
        results: Tanswer[],
        roundWinnerAnswerId: string | null,
        isAdmin: boolean,
        onNextQuestion: () => void,
        isLastQuestion: boolean,
        dbPlayerCount?: number | null,
}

export type ScoreTableListProps = {
        players: TserverPlayer[],
        results?: Tanswer[],
        precomputed?: TscoreSummary[] | null,
        dbPlayerCount?: number | null,
}

export type FinalScreenProps = {
        roomId: string,
        winHeight: { height: number },
        scoreboard: TscoreSummary[] | null,
        dbPlayerCount?: number | null,
}

export type PlayersListProps = {
        players: Tplayer[],
}
