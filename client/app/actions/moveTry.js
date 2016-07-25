import {map, without, chain, value} from 'lodash';
import {area} from '../utils/dom';
import {move, setCurrentPlayer} from './actionTypes';

export const moveTry = (dragSourceRect, card) => (dispatch, getState) => {
    const state = getState();
    const overlapData =  map(state.dom.tileMap, (tileRect) => {
        return area(dragSourceRect, tileRect)
    }).reduce((result, area, index) => {
        if(area > result.area) {
            return {area, index}
        }
        return result

    }, {area: 0, index: -1});

    if(overlapData.area > 1000) {
        const tile = state.field[overlapData.index];
        const nextPlayer = chain(state.users)
                .map(user => user.id)
                .without(state.currentPlayer)
                .get(0)
                .value()
            ;

        if(tile.stub || tile.card) return null;
        dispatch(move(state.currentPlayer, {x: tile.x, y: tile.y}, card));
        dispatch(setCurrentPlayer(nextPlayer))
    }
};