import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {field} from '../reducers/field';
import {dom} from '../reducers/dom';
import {users} from '../reducers/users';
import {cards} from '../reducers/cards';
import {currentPlayer} from '../reducers/currentPlayer';

const root = combineReducers({field, dom, users, cards, currentPlayer });

const store =  createStore(root, compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f));

window.__store__ = store;
export default store;