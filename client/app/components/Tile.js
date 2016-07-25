import {block, elementForBlock} from '../utils/bem';
import './tile.scss';
import Card from './Card';

const b = block('tile');
const el = elementForBlock(b);

class Tile extends Component {
    render() {
        return (<div className = {b([{stub: this.props.stub}, 'x-' + this.props.x, 'y-' + this.props.y])} >
            {this.props.card && <Card {...this.props.card}/>}
        </div>)
    }
}
export default Tile;