import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConversions from './components/CurrencyConversions';
import CurrencyProgressions from './components/CurrencyProgressions';
import BitcoinHistory from './components/bitcoin/BitcoinHistory';

import Router from './router';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

import(`./components/currencyCalculations.scss`);

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
