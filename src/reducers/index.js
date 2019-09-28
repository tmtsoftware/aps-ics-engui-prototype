import { combineReducers } from 'redux';
import CommandsReducer from './reducer_commands';
import WebsocketsReducer from './reducer_websockets';
import CommandStatusReducer from './reducer_command_status';
import AssemblyConfigsReducer from './reducer_assembly_configs';
import HcdConfigsReducer from './reducer_hcd_configs';
import ContainerConfigsReducer from './reducer_container_configs';
import CheckboxesReducer from './reducer_checkboxes';

const rootReducer = combineReducers({

    commands: CommandsReducer,
    telemetry: WebsocketsReducer,
    commandStatus: CommandStatusReducer,
    assemblyConfigs: AssemblyConfigsReducer,
    hcdConfigs: HcdConfigsReducer,
    containerConfigs: ContainerConfigsReducer,
    checkboxes: CheckboxesReducer

});

export default rootReducer;
