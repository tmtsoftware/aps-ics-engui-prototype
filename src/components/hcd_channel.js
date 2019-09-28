import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';

import HcdSettingsList from './hcd_settings_list';
import HcdStateList from './hcd_state_list';
import Tabs from './tabs';
import Tab from './tab';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchConfig} from "../actions";
import axios from "axios/index";


class HcdChannel extends Component {


    constructor(props) {
        super(props);
        this.state = {statusHistory: ''};
    }


    updateStatusHistory(newStatus) {

        this.setState((prevState, props) => ({
            statusHistory: prevState.statusHistory + "\n" + newStatus
        }));

    }


    render() {

        return (

            <div>
            <h2>HCD {this.props.hcdChannelName}</h2>


                <div className="row">
                    <div className="col-md-6">
                        <h3>Commands</h3>
                        <HcdSettingsList axis={this.props.axis} updateStatusHistory={this.updateStatusHistory.bind(this)}/>
                    </div>
                    <div className="col-md-6">

                        <h3>State</h3>
                        <HcdStateList axis={this.props.axis}/>

                        <h3>Command Status</h3>
                        <div className="form-group">
                            <textarea readOnly className="form-control" rows="10" id="comment" style={{width: '100%'}} value={this.state.statusHistory}></textarea>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(null, mapDispatchToProps)(HcdChannel);
