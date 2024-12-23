import { Tanswer, Tuser } from "../types/types"

export const getUrl = (endPoint: string) => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 
        'http://localhost:3000' : 
        'https://zikim-mission.vercel.app';
    if(endPoint === "")return baseUrl
    const url = `${baseUrl}/api/${endPoint}`;
    // console.log(`Constructed URL: ${url}`);
    return url;
};
export const handelForm = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
        case 'range':
            value = +value
            break;
        case 'checkbox':
            value = target.checked
            break;
    }
    return {[field]: value }
}

export const getUser = async (session) => {
    var currntUser :Tuser
    if (session) {
        const { email } = session.user

        const url = getUrl('userExists')
        const userExist = await fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email })
        })
        const { user } = await userExist.json()
         return user
    }
}
export function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }
  export  const removeDuplicates = (arr: Tanswer[]): Tanswer[] => {
    const seen = new Set<string>();
    return arr.filter(item => {
        const key = `${item.playerId}-${item.questionId}`;
        if (seen.has(key)) {
            return false;
        } else {
            seen.add(key);
            return true;
        }
    });
};

  