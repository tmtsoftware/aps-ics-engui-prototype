import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';

import ConfigList from './config_list';
import Tabs from './tabs';
import Tab from './tab';


class Assembly extends Component {


    render() {

        return (

            <div>
            <h2>{this.props.assemblyName}</h2>

            <Tabs>

                <Tab iconClassName={'glyphicon glyphicon-cog'} linkName={'Command'}>
                    <div className="tab-pane active">
                        <div className="pull-right">
                            <LoadButton />
                        </div>
                        <h3>Commands</h3>
                        <CommandList />

                        <div className="pull-right">
                            Mode: <button type="button" className="btn btn-success">Normal</button>
                        </div>
                        <h3>Telemetry</h3>
                        <TelemetryList />
                    </div>
                </Tab>

                <Tab iconClassName={'glyphicon glyphicon-wrench'} linkName={'Configure'}>
                    <div className="tab-pane active">

                        <h3>Configuration</h3>
                        <div className="pull-right">
                            <LoadButton configFile="singleAxis" />
                        </div>

                        <h3>Assembly Config</h3>
                        <ConfigList target="singleAxis"/>
                        <div className="pull-right">
                            <LoadButton configFile="galilHCD" />
                        </div>
                        <h3>GalilHCD Config</h3>
                        <ConfigList target="galilHCD"/>

                    </div>
                </Tab>
                <Tab iconClassName={'glyphicon glyphicon-eye-open'} linkName={'View Logging'}>
                    <h3>Not yet implemented</h3>
                </Tab>
            </Tabs>
            </div>
        );
    }
}

export default Assembly;