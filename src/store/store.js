import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import rootReducer from './_reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware, routerMiddleware(history), loggerMiddleware)),
);

export default store;
