import * as actionTypes from '../actions/actionTypes';

export const dom = (state = {}, action) => {
    if(action.type === actionTypes.DOM_FIELD_READY) {
        return {...state, tileMap: action.payload.tileMap}
    }

    return state;
}