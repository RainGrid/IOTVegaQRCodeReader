import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

let middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, logger];
}
export const store = createStore(rootReducer, applyMiddleware(...middleware));