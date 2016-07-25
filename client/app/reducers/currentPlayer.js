import {SET_CURRENT_PLAYER, MOVE} from '../actions/actionTypes';

export const currentPlayer = (state = -1, action) => {
    if(action.type === SET_CURRENT_PLAYER) {
        return action.payload.player;
    }

    return state;
};