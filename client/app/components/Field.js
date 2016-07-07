import React, {Component, PropTypes} from 'react';
import {block, elementForBlock} from '../utils/bem';
import Tile from './Tile';
import './field.scss';

const b = block('field');

export default class Field extends Component {
    static contextTypes = {store: PropTypes.object};
    render() {
        return <div className = {b()}>
            {this.context.store.getState().field
                .map((value, index)=> <Tile key = {index} x = {value.x} y = {value.y} stub = {value.stub}/>)}
        </div>
    }
}