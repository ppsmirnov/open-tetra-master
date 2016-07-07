import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {field} from '../reducers/field';

const root = combineReducers({field});

export default createStore(root, applyMiddleware(thunk));

