import ReconnectingWebSocket from 'reconnecting-websocket';
import { store } from '../store/initStore';
import { checkUser, loginUserFailed, loginUserSuccess, logoutUser } from '../actions/userActions';
import { wsSetConnected, wsSetDisconnected } from '../actions/wsActions';

const url = window.vega_server_url || 'http://127.0.0.1:8002/';

export var socket = new ReconnectingWebSocket(url);

socket.on = function (trigger, callback) {
    if (!socket.triggers) {
        socket.triggers = [];
    }
    socket.triggers.push({ trigger, callback });
}

socket.fire = function (event, data) {
    if(socket.triggers) {
        let curTrigger = socket.triggers.find(el => el.trigger === event);
        if(curTrigger) {
            if(typeof curTrigger.callback === 'function') {
                curTrigger.callback(data);
            }
        }
    }
}

socket.addEventListener('open', () => {
    store.dispatch(wsSetConnected());
    setTimeout(() => {
        store.dispatch(checkUser());
    }, 100);
})

socket.addEventListener('close', () => {
    store.dispatch(wsSetDisconnected('Connection closed'));
    store.dispatch(logoutUser());
})

socket.addEventListener('message', (message) => {
    try {
        var response = JSON.parse(message.data);
        socket.fire(response.cmd, response);
    } catch (error) {
        console.error(error);
    }
})

socket.on('auth_resp', (response) => {
    if (!response.status) {
        store.dispatch(loginUserFailed(response.err_string));
    } else {
        store.dispatch(loginUserSuccess(response.token));
    }
})

socket.on('token_auth_resp', (response) => {
    if (!response.status) {
        store.dispatch(loginUserFailed(response.err_string));
    } else {
        store.dispatch(loginUserSuccess(response.token));
    }
})

export function sendRequest(request) {
    try {
        var message = JSON.stringify(request);
        if (socket.OPEN) {
            socket.send(message);
        }
    } catch (error) {
        console.error(error);
    }
}