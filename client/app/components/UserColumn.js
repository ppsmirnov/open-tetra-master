import { block, elementForBlock} from '../utils/bem';
import CardInDeck from './CardInDeck';
import './user-column.scss';
import {bind} from 'lodash';

const userBlock = block('user-column'),
    userElement = elementForBlock(userBlock),
    infoBlock = block('user-column-info'),
    infoElement = elementForBlock(infoBlock),
    deckBlock = block('deck-block'),
    deckElement = elementForBlock(deckBlock);

export default class UserColumn extends Component {
    onMove = (dragSource, card) => {
        const dragSourceRect = dragSource.getBoundingClientRect();
         this.props.onMove(dragSourceRect, card);
    };

    render() {
        const {img, login, cards, isActive} = this.props;
        return <div className = {userBlock([{'is-active' : isActive}])}>
            <div className = {infoBlock()}>
                <div className = {infoElement('pic')}>
                    <img src={img}/>
                </div>
                <div className = {infoElement('title')}>{login}</div>
            </div>

            <div className = {deckBlock()}>
                {cards.map((card, index) => <CardInDeck key = {card.id}
                                                        dragStop = {bind(this.onMove, this, _, card.id)} {...card} />)}
            </div>
        </div>
    }
}