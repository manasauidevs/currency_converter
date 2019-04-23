import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CurrencyConversions from './components/CurrencyConversions';
import CurrencyProgressions from './components/CurrencyProgressions';
import BitcoinHistory from './components/bitcoin/BitcoinHistory';
import Home from './components/Home';

export default () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/CurrencyConversions" component={ CurrencyConversions } />
        <Route exact path="/CurrencyProgressions" component={ CurrencyProgressions } />
        <Route exact path="/BitcoinHistory" component={ BitcoinHistory } />
        <Route path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
};