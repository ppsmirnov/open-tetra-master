import './card.scss';
import {block, elementForBlock } from '../utils/bem';

const b = block('card');
const el = elementForBlock(b);
export default class Card extends Component {
    static propTypes = {
        power: PropTypes.number,
        cardClass: PropTypes.string,
        pdef: PropTypes.number,
        mdef: PropTypes.number,
        directions: PropTypes.array
    };

    render() {
        return(
            <div className = {b()}>
                <div className = {el('stats')}>
                    <span className = {el('power')}>{this.props.power}</span>
                    <span className = {el('class')}>{this.props.cardClass}</span>
                    <span className = {el('pdef')}>{this.props.pdef}</span>
                    <span className = {el('mdef')}>{this.props.mdef}</span>
                </div>
                <div className = {el('directions')}>
                    {this.props.directions.map(dir => <div key = {dir}  className = {el('direction', [dir])}></div>)}
                </div>
            </div>
        )
    }
}