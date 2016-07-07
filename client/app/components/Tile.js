import React from 'react';
import {block, elementForBlock} from '../utils/bem';
import './tile.scss';

const b = block('tile');
const el = elementForBlock(b);

const Tile = (props) => <div className = {b([{stub: props.stub}, 'x-' + props.x, 'y-' + props.y])} />;
export default Tile;