import {
    WS_SET_CONNECTED,
    WS_SET_DISCONNECTED
} from '../actions/wsActions';

const initialState = {
    connected: false,
    error: null
}

export function wsReducer(state = initialState, action) {
    switch (action.type) {
        case WS_SET_DISCONNECTED:
            return { ...state, connected: false, error: action.payload };
        case WS_SET_CONNECTED:
            return { ...state, connected: true, error: null };
        default:
            return state;
    }
}