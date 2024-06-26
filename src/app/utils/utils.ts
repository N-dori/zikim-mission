import { Tuser } from "../types/types"
export const getUrl = (endPoint: string) => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 
        'http://localhost:3000' : 
        'https://zikim-mission.vercel.app';

    const url = `${baseUrl}/api/${endPoint}`;
    console.log(`Constructed URL: ${url}`);
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