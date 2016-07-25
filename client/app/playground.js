window.Component = React.Component;
window.PropTypes = React.PropTypes;


import {connect} from 'react-redux';
import './styles/index.scss';
import ReactOnRails from 'react-on-rails';
import Field from './components/Field';
import UserColumn from './components/UserColumn';

import {Provider} from 'react-redux';
import store from './store';
import {createField, join, setCurrentPlayer, domFieldReady} from './actions/actionTypes';
import {image, name, random } from 'faker';
import {times, uniqueId} from 'lodash';
import {moveTry} from './actions/moveTry';
import {map} from 'lodash';

const uniqueIdInt = () => parseInt(uniqueId());

const user1 = {login: name.firstName(), img: image.avatar(), id: uniqueIdInt()};
const user2 = {login: name.firstName(), img: image.avatar(), id: uniqueIdInt()};
const playDeck1 = times(5, card =>
    ({power: random.number(10),
        cardClass: 'P',
        pdef: random.number(10),
        mdef: random.number(10),
        directions: ['ne', 'se'],
        id: uniqueIdInt()}));
const playDeck2 = times(5, card =>
    ({power: random.number(10),
        cardClass: 'P',
        pdef: random.number(10),
        mdef: random.number(10),
        directions: ['nw', 'sw'],
        id: uniqueIdInt()}));
//
store.dispatch(createField());
store.dispatch(join(user1, playDeck1));
store.dispatch(join(user2, playDeck2));
store.dispatch(setCurrentPlayer(user1.id));


class PlaygroundApp extends Component {
    rNormal() {
        const p = this.props;
        const user1 = p.users[0];
        const user2 = p.users[1];
        return (
            <div className = 'playground-app'>
                <UserColumn img = {user1.img} login = {user1.login} cards = {p.decks[0]}
                            isActive = {user1.id === p.currentPlayer}
                            onMove = {(dragSourceRect, card) => {store.dispatch(moveTry(dragSourceRect, card))}}/>
                <Field field = {p.field} onFieldReady = {(tileMap) => store.dispatch(domFieldReady(tileMap))}/>
                <UserColumn img = {user2.img} login = {user2.login} cards = {p.decks[1]}
                            isActive = {user2.id === p.currentPlayer}
                            onMove = {(dragSourceRect, card) => store.dispatch(moveTry(dragSourceRect, card))}/>
            </div>
        )
    }

    rEmpty() {
        return (
            <div>
                Садимся за стол...
            </div>
        )
    }
    render() {
        return this.props.users.length ? this.rNormal() : this.rEmpty();
    }
}

PlaygroundApp.contextTypes = {store: PropTypes.object};

const ConnectedApp = connect((state) => {
    const users = map(state.users, user => user);

    if(users.length) {
        const decks = users.map(user => user.cardsInHand.map(cardId => state.cards[cardId]));
        const field = state.field.map(field => {
            if(field.card) {
                return {...field, card: state.cards[field.card]}
            }

            return field;
        });
        return {users, decks, field, currentPlayer: state.currentPlayer}
    }

    return {users: []}

})(PlaygroundApp);


const Root = () => <Provider store = {store}><ConnectedApp /></Provider>;

ReactOnRails.register({PlaygroundApp: Root});

$(() => console.log('hello!'));
