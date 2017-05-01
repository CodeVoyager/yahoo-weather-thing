import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import Config from '../../config';
import SuperAgent from 'superagent';
import { Provider } from 'react-redux';
import appStore from './config/app-store';

const style = require('../scss/style.scss');

ReactDOM.render(
    <Provider store={appStore}>
        <Main/>
    </Provider>,
    document.getElementById('app')
);