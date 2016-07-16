window.Component = React.Component;
window.PropTypes = React.PropTypes;

import './styles/index.scss';
import ReactOnRails from 'react-on-rails';
import Field from './components/Field';
import UserColumn from './components/UserColumn';

import {Provider} from 'react-redux';
import store from './store';
import {createField, join} from './actions/actionTypes';
import {image, name, random } from 'faker';
import {times} from 'lodash';

const user1 = {login: name.firstName(), img: image.avatar()};
const user2 = {login: name.firstName(), img: image.avatar()};
const playDeck1 = times(5, (card) => ({power: random.number(10), cardClass: 'P', pdef: random.number(10), mdef: random.number(10), directions: ['ne', 'se']}));
const playDeck2 = times(5, (card) => ({power: random.number(10), cardClass: 'P', pdef: random.number(10), mdef: random.number(10), directions: ['nw', 'sw']}));
//
store.dispatch(createField());
store.dispatch(join(user1, playDeck1));
store.dispatch(join(user2, playDeck2));

const PlaygroundApp = () => <div className = 'playground-app'>
    <UserColumn img = {user1.img} login = {user1.login} cards = {playDeck1}/>
    <Field />
    <UserColumn img = {user2.img} login = {user2.login} cards = {playDeck2}/>
</div>;

const Root = () => <Provider store = {store}><PlaygroundApp /></Provider>;

ReactOnRails.register({PlaygroundApp: Root});

$(() => console.log('hello!'));
