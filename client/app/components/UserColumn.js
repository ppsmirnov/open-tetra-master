import { block, elementForBlock} from '../utils/bem';
import CardInDeck from './CardInDeck';
import './user-column.scss';
import {moveTry} from '../actions/moveTry';

const userBlock = block('user-column'),
    userElement = elementForBlock(userBlock),
    infoBlock = block('user-column-info'),
    infoElement = elementForBlock(infoBlock),
    deckBlock = block('deck-block'),
    deckElement = elementForBlock(deckBlock);

export default class UserColumn extends Component {
    static contextTypes = {store: PropTypes.object};

    onMove = (dragSource) => {
        const dragSourceRect = dragSource.getBoundingClientRect();
        this.context.store.dispatch(moveTry(dragSourceRect));
    };

    render() {
        const {img, login, cards} = this.props;
        return <div className = {userBlock()}>
            <div className = {infoBlock()}>
                <div className = {infoElement('pic')}>
                    <img src={img}/>
                </div>
                <div className = {infoElement('title')}>{login}</div>
            </div>

            <div className = {deckBlock()}>
                {cards.map((card, index) => <CardInDeck key = {index} dragStop = {this.onMove} {...card} />)}
            </div>
        </div>
    }
}