/**
 * Created by smichaels on 6/27/17.
 */

export default reduxWebsocketMiddleware

export const WebsocketActionTypes = {
    CONNECTED: 'redux-websocket-middleware::CONNECTED',
    DISCONNECTED: 'redux-websocket-middleware::DISCONNECTED',
    ERROR: 'redux-websocket-middleware::ERROR',
    RECEIVE: 'redux-websocket-middleware::RECEIVE',
    SEND: 'redux-websocket-middleware::SEND'
}

export function reduxWebsocketMiddleware (endpoint) {

    return function (store) {

        var connection = setupSocket(endpoint);


        return function (next) {
            return function (action) {

                if (!isWebsocketAction(action)) {
                    return next(action)
                }

                console.log('this is a socket action: ' + action.type);


                if (endpoint === null) {
                    throw new Error(undefinedEndpointErrorMessage(action))
                }

                if (action.type == WebsocketActionTypes.SEND) {
                    console.log('sending message: ' + action.payload + ' to server');

                    const result = JSON.stringify(action);

                    connection.websocket.send(result);
                } else if (action.type == WebsocketActionTypes.DISCONNECTED) {
                    if (connection.websocket != null) {
                        connection.websocket.close();
                        connection.websocket = null;
                    }
                    connection = setupSocket(endpoint);


                } else {
                    return next(action)
                }
            }
        }

        function setupSocket (endpoint) {
            console.log("endpoint = " + endpoint);
            const connection = {
                endpoint: endpoint,
                websocket: new WebSocket(endpoint),
                queue: []
            }

            connection.websocket.onmessage = (function (evt) {
                store.dispatch(messageActionCreator(evt))
            })

            connection.websocket.onopen = (function () {
                console.log('onopen called');
                store.dispatch(openActionCreator())
            })

            connection.websocket.onclose = (function () {
                store.dispatch(closeActionCreator())
            })

            connection.websocket.onerror = (function (error) {
                store.dispatch(errorActionCreator(error))
            })

            return connection
        }
    }
}

export function isWebsocketAction (action) {

    if (!action) return false;
    if (!action.type) return false;

    return Boolean([
            WebsocketActionTypes.CONNECTED,
            WebsocketActionTypes.DISCONNECTED,
            WebsocketActionTypes.RECEIVE,
            WebsocketActionTypes.ERROR,
            WebsocketActionTypes.SEND
        ].indexOf(action.type) >= 0);
}

function openActionCreator () {
    return {
        type: WebsocketActionTypes.CONNECTED
    }
}

function closeActionCreator () {
    return {
        type: WebsocketActionTypes.DISCONNECTED
    }
}

function errorActionCreator (error) {
    return {
        type: WebsocketActionTypes.ERROR,
        payload: new Error(error)
    }
}

function messageActionCreator (evt) {

    //console.log('Creating incoming message action: ' + evt.data)

    return {
        type: WebsocketActionTypes.RECEIVE,
        payload: evt.data
    }
}

function undefinedEndpointErrorMessage (action) {
    return `No endpoint defined: ${JSON.stringify(action, null, 4)}`
}