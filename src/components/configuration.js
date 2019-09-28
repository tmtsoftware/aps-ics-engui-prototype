import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';

import ConfigList from './config_list';
import Tabs from './tabs';
import Tab from './tab';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchConfig} from "../actions";


class Configuration extends Component {




    render() {

        const axisTitle2Name = new Map();
        axisTitle2Name.set("Fiber Source X", "source-x")
        axisTitle2Name.set("Fiber Source Y", "source-y")
        axisTitle2Name.set("Fiber Source Z", "source-z")
        axisTitle2Name.set("Pupil Mask X", "pupil-x")
        axisTitle2Name.set("Pupil Mask Y", "pupil-y")
        axisTitle2Name.set("Pupil Mask Phi", "pupil-phi")
        axisTitle2Name.set("DM Optic", "dm-optic")
        axisTitle2Name.set("Stimulus Intertion", "insertion")

        const axisTitle2AssemblyName = new Map();
        axisTitle2AssemblyName.set("Fiber Source X", "FiberSourceStage")
        axisTitle2AssemblyName.set("Fiber Source Y", "FiberSourceStage")
        axisTitle2AssemblyName.set("Fiber Source Z", "FiberSourceStage")
        axisTitle2AssemblyName.set("Pupil Mask X", "PupilMaskStage")
        axisTitle2AssemblyName.set("Pupil Mask Y", "PupilMaskStage")
        axisTitle2AssemblyName.set("Pupil Mask Phi", "PupilMaskStage")
        axisTitle2AssemblyName.set("DM Optic", "DmOpticStage")
        axisTitle2AssemblyName.set("Stimulus Intertion", "InsertionStage")

        return (

            <div>
            <h2>{this.props.axisName} Configuration</h2>


                    <div>

                        <ConfigList target="galilHCD" axis={axisTitle2Name.get(this.props.axisName)} assemblyName={axisTitle2AssemblyName.get(this.props.axisName)}/>

                    </div>


            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(null, mapDispatchToProps)(Configuration);
