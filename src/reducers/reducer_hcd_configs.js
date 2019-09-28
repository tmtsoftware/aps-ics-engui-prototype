/**
 * Created by smichaels on 6/23/17.
 */

import {FETCH_HCD_CONFIG} from '../actions/index';



const initialState = {
    axes: {
        A: {props: [{name: "dummy", value: "dummy"}]},
        B: {props: [{name: "dummy", value: "dummy"}]}
    }
}

export default function(state = [], action) {

    if (action.type.startsWith(FETCH_HCD_CONFIG)) {

        console.log("reducer_hcd_configs called");

        const axis = action.type[action.type.length-1]


        return Object.assign({}, state, {
            axes: {
                ...state.axes,
                [axis]: action.payload.data }
        });

    }

    return state;
}

