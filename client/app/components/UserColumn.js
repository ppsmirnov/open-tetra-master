import React, {Component, PropTypes} from 'react';
import { block, elementForBlock} from '../utils/bem';
import Card from './Card';

const userBlock = block('user-column'),
    userElement = elementForBlock(userBlock),
    infoBlock = block('user-column-info'),
    infoElement = elementForBlock(infoBlock),
    deckBlock = block('deck-block'),
    deckElement = elementForBlock(deckBlock);

export default class UserColumn extends Component {
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
                {cards.map((card, index) => <Card key = {index} {...card} />)}
            </div>
        </div>
    }
}