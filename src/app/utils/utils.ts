import { Tanswer } from "../types/types"

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

export function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

export const removeDuplicates = (arr: Tanswer[]): Tanswer[] => {
    const seen = new Set<string>();
    return arr.filter(item => {
        const playerKey = item.nickName || item.playerId
        const key = `${playerKey}-${item.questionId}`;
        if (seen.has(key)) {
            return false;
        } else {
            seen.add(key);
            return true;
        }
    });
};
