import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory()

const middleware = applyMiddleware(thunk, routerMiddleware(history));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}
