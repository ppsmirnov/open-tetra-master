import {block, elementForBlock} from '../utils/bem';
import './tile.scss';

const b = block('tile');
const el = elementForBlock(b);

class Tile extends Component {
    render() {
        return <div className = {b([{stub: this.props.stub}, 'x-' + this.props.x, 'y-' + this.props.y])} />;
    }
}
export default Tile;