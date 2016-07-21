import {THROW_COIN} from '../actions/actionTypes';

export const currentPlayer = (state = -1, action) => {
    if(action.type === THROW_COIN) {
        return action.payload.wonUser;
    }
    return state;
};