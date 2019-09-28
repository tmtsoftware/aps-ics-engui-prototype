/**
 * Created by smichaels on 6/23/17.
 */

import {FETCH_ASSEMBLY_CONFIG} from '../actions/index';
import {ActionTypes} from '../websockets';
import {FETCH_HCD_CONFIG} from "../actions";


const initialState = {
    stageConfigs: {
        A: {props: [{name: "dummy", value: "dummy"}]},
        B: {props: [{name: "dummy", value: "dummy"}]}
    }
}


export default function(state = [], action) {

    if (action.type.startsWith(FETCH_ASSEMBLY_CONFIG)) {

        console.log("reducer assembly config called");

        const stageName = action.payload.data.stageConfig.stageName

        console.log(stageName)

        return Object.assign({}, state, {
            stageConfigs: {
                ...state.stageConfigs,
                [stageName]: action.payload.data.stageConfig }
        });

    }

    return state;
}