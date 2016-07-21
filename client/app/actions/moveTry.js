import {map} from 'lodash';
import {area} from '../utils/dom';
import {move} from './actionTypes';

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
        if(tile.stub) return null;
        dispatch(move(state.currentPlayer, {x: tile.x, y: tile.y}, card))
    }
};