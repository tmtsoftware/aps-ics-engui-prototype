/**
 * Created by smichaels on 6/23/17.
 */

import {FETCH_COMMANDS} from '../actions/index';
import {ActionTypes} from '../websockets';


export default function(state = [], action) {

    switch (action.type) {

        case FETCH_COMMANDS:

            const commands = [
                {commandName: "init", commandArgs: [], commandSetupConfig: ""},
                {commandName: "home", commandArgs: [], commandSetupConfig: ""},
                {commandName: "position", commandArgs: [], commandSetupConfig: ""},
                {commandName: "motorOff", commandArgs: [], commandSetupConfig: ""}
            ]


            return commands;
        
    }

    return state;
}