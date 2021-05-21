//create store to maintain a connection to the server-side data 

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const initialState = [];

const middleware = [thunk, logger];

const store = createStore(
  rootReducer,
  initialState,
  //take all middlewares otherwise error- middleware is not a function!
  applyMiddleware(...middleware)
);


export default store;