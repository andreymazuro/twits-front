import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}
