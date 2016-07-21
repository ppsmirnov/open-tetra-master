import {JOIN} from '../actions/actionTypes';
export const cards = (state = {}, action) => {

    if(action.type === JOIN) {
        const newCards = action.payload.playDeck.reduce((result, card) => ({...result, [card.id]: card}), {});
        return {...state, ...newCards}
    }

    return state;
};