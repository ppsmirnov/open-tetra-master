import {JOIN, MOVE} from '../actions/actionTypes';
import {without} from 'lodash';

export const users = (state = {}, action) => {

    if(action.type === JOIN) {
        const joinedUser = action.payload.user;
        const cards = action.payload.playDeck;
        joinedUser.cardsInHand = cards.map(card => parseInt(card.id));
        joinedUser.cardsOnField = [];
        return {...state, [joinedUser.id]: joinedUser};
    }

    if(action.type === MOVE) {
        const {user, card} = action.payload;
        const currentUser = state[user];
        const cardsInHand = without(currentUser.cardsInHand, card);
        const cardsOnField = [...currentUser.cardsOnField, card];
        return {...state, [user]: {...currentUser, cardsInHand, cardsOnField}};
    }

    return state;
};