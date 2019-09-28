import axios from 'axios';
import {WebsocketActionTypes} from '../websockets';

const ROOT_URL = `http://localhost:9000`;

export const FETCH_COMMANDS = 'FETCH_COMMANDS';
export const FETCH_ASSEMBLY_CONFIG = 'FETCH_ASSEMBLY_CONFIG';
export const FETCH_CONTAINER_CONFIG = 'FETCH_CONTAINER_CONFIG';
export const FETCH_HCD_CONFIG = 'FETCH_HCD_CONFIG';

export const UPDATE_CHECKBOX = 'UPDATE_CHECKBOX';
export const SELECT_ALL_CHECKBOXES = 'SELECT_ALL_CHECKBOXES';
export const CLEAR_ALL_CHECKBOXES = 'CLEAR_ALL_CHECKBOXES';


export function fetchCommands() {

    const request = axios.get(`${ROOT_URL}/commands`);

    return {
        type: FETCH_COMMANDS,
        payload: request
    };
}

export function fetchConfig(configType, filename) {




    if (configType == "container") {

        const request1 = axios.get(`${ROOT_URL}/v1/gs/getContainerAssemblyInfo?filename=${filename}`);

        console.log("fetchConfig::request")
        console.log(request1)

        return {
            type: FETCH_CONTAINER_CONFIG,
            payload: request1
        };
    }

    if (configType == "assembly") {

        console.log(`${ROOT_URL}/v1/gs/getConfig?filename=${filename}`);

        const request2 = axios.get(`${ROOT_URL}/v1/gs/getConfig?filename=${filename}`);

        console.log("fetchConfig::request")
        console.log(request2)


        return {
            type: FETCH_ASSEMBLY_CONFIG,
            payload: request2
        };


    }

}


export function sendWebsocketMessage() {

    console.log('sendWebsocketMessage called');

    return {
        type: WebsocketActionTypes.WEBSOCKET_SEND,
        payload: "Scott Websocket rocks",
        meta: { websocket: true }
    }
}



export function updateCheckbox(stageName, axisName, isChecked) {

    console.log('updateCheckboxes called');

    return {
        type: UPDATE_CHECKBOX,
        payload: { stageName: stageName, axisName: axisName, isChecked: isChecked }
    }
}

export function clearAllCheckboxes() {

    console.log('clearCheckboxes called');

    return {
        type: CLEAR_ALL_CHECKBOXES,
        payload: {  }
    }
}

export function selectAllCheckboxes(stageAxisList) {

    console.log('selectAllCheckboxes called');

    return {
        type: SELECT_ALL_CHECKBOXES,
        payload: stageAxisList
    }
}