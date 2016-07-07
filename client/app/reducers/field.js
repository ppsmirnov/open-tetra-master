import * as actionTypes from '../actions/actionTypes';
import {times, findIndex} from 'lodash';

export const field = (state = {}, action) => {
    if(action.type === actionTypes.CREATE_FIELD) {
        //generate deadlock positions
        let stubs = 0;
        return times(16, (number) => {
            const isStub = !!Math.round(Math.random()) && (stubs < 5) && stubs++;
            return ({x: number%4, y: Math.floor(number/4), stub: isStub, card: null });
        });
    }

    if(action.type === actionTypes.MOVE) {
        const {pos, card} = action.payload;
        const index = 4*pos.y + pos.x;

        if(state[index].stub) return state;

        const newState = [...state];
        newState[index].card = card;
        return newState;
    }
    
    if(action.type === actionTypes.CHANGE_CARD) {
        const {newCard, oldCard} = action.payload;
        const index = findIndex(state, oldCard);
        const newState = [...state];
        newState[index] = newCard;
        return newState;
    }
    
    if(action.type == actionTypes.PROCESS) {
        
    }

    return state;
};