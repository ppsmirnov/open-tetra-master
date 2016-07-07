import React from 'react'
import ReactOnRails from 'react-on-rails';
import Field from './components/Field';
import {Provider} from 'react-redux';
import store from './store';
import {createField} from './actions/actionTypes';

store.dispatch(createField());
const PlaygroundApp = () => <div className = 'playground-app'>
    <Field />
</div>;

const Root = () => <Provider store = {store}><PlaygroundApp/></Provider>;

ReactOnRails.register({PlaygroundApp: Root});

$(() => console.log('hello!'));
