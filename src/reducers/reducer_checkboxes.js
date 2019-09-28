/**
 * Created by smichaels on 6/23/17.
 */

import {UPDATE_CHECKBOX, CLEAR_ALL_CHECKBOXES, SELECT_ALL_CHECKBOXES} from '../actions/index';


export default function(state = [], action) {


    switch (action.type) {


        case UPDATE_CHECKBOX:
            //console.log("reducer_checkboxes: action = " + action + ", state = " + state)

            //console.log(action.payload)
            // here is where we add the state

            if (state === undefined || state.length == 0) {
                state = new Map()
            }
            if (action.payload.isChecked === true) {
                console.log("add to state")
                state.set(action.payload.stageName + action.payload.axisName, true)
            } else {
                console.log("delete from state")
                state.delete(action.payload.stageName + action.payload.axisName)
            }

            console.log(state)
            return state;

        case CLEAR_ALL_CHECKBOXES:

            // here is where we add the state
            state = new Map()

            return state;

        case SELECT_ALL_CHECKBOXES:

            // here is where we add the state
            state = new Map()

            for (var key in action.payload) {

                const stageAxis = action.payload[key]

                state.set(stageAxis.stageName + stageAxis.axisName, true)

            }
            console.log(state)
            return state;

    }

    return state;
}