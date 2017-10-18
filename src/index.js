import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'react-router-redux'

import { Route } from 'react-router'

import { history } from './store/configureStore'
import configureStore from './store/configureStore';

import StartPage from './components/StartPage'
import UserWall from './components/UserWall'

import './App.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <div>
        <Route path={'/'} component={StartPage} />
        <Route exact path={'/:username'} component={UserWall} />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
