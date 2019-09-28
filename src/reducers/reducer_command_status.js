/**
 * Created by smichaels on 6/23/17.
 */


import {WebsocketActionTypes} from '../websockets';


export default function(state = [], action) {

    switch (action.type) {

        case WebsocketActionTypes.RECEIVE:
            //console.log('command status reducer received data: ' + action.payload);

            const payload = JSON.parse(action.payload);

            if (payload.overallStatus) {
                return payload;
            }

            return state;

        case WebsocketActionTypes.CONNECTED:
            console.log('websocket connected: ' + action.payload);
            return state;
    }

    return state;
}