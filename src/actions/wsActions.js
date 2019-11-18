export const WS_SET_CONNECTED = 'WS_SET_CONNECTED';
export const WS_SET_DISCONNECTED = 'WS_SET_DISCONNECTED';

export function wsSetConnected() {
    return {
        type: WS_SET_CONNECTED
    };
}

export function wsSetDisconnected(error) {
    return {
        type: WS_SET_DISCONNECTED,
        payload: error
    };
}