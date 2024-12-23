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
        score: number,
        time: number,
        isVinner:boolean,
        playerId?:string,
        questionId?:string,
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
        _id?: string,
        name: string,
        participants: Tplayer[]

} 
