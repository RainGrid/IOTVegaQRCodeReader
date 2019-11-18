import { combineReducers } from 'redux';
import { userReducer } from './user';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
    user: userReducer,
    ws: wsReducer
})
