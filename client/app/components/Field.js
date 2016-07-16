import {block, elementForBlock} from '../utils/bem';
import {findDOMNode} from 'react-dom';
import Tile from './Tile';
import {domFieldReady} from '../actions/actionTypes';
import './field.scss';
import {map} from 'lodash';

const b = block('field');

export default class Field extends Component {
    static contextTypes = {store: PropTypes.object};

    componentDidMount() {
        setTimeout(() => {
            const tileMap = map(this.refs, (tile) => {
                const domTile = findDOMNode(tile);
                return domTile.getBoundingClientRect();
            });
            this.context.store.dispatch(domFieldReady(tileMap))
        }, 200)
    }
    
    render() {
        return <div className = {b()}>
            {this.context.store.getState().field
                .map((value, index)=> <Tile ref = {`tile-${index}`} key = {index} x = {value.x} y = {value.y} stub = {value.stub}/>)}
        </div>
    }
}