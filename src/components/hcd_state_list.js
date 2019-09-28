/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import ConfigListItem from './config_list_item';
import {connect} from 'react-redux';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import {bindActionCreators} from "redux";
import {fetchConfig} from '../actions/index';



class HcdStateList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            positionCounts: 0
        }
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        console.log("ConfigList::MOUNT")

        // fetch all configs for each axis when component first mounts


    }






    componentDidUpdate() {
        // refresh should reset the data
        console.log("UPDATE")
     }









    render() {

        var result = null
        if (this.props.telemetry && this.props.telemetry.axes) {
            result = this.props.telemetry.axes.find(x => x.axis == this.props.axis)
        }



        return (
        <form className="form-inline">

            <NotificationSystem ref="notificationSystem"  />
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Status</td>
                    <td>{result ? result.status : 'Unknown'}</td>
                </tr>

                <tr>
                    <td>Reference Position</td>
                    <td>{result ? result.referencePosition : 'Unknown'}</td>
                </tr>

                <tr>
                    <td>Motor Position</td>
                    <td>{result ? result.motorPosition : 'Unknown'}</td>
                </tr>

                <tr>
                    <td>Position Error</td>
                    <td>{result ? result.positionError : 'Unknown'}</td>
                </tr>

                <tr>
                    <td>Velocity</td>
                    <td>{result ? result.velocity : 'Unknown'}</td>
                </tr>

                <tr>
                    <td>Torque</td>
                    <td>{result ? result.torque : 'Unknown'}</td>
                </tr>

                <tr>
                    <td>Error Code</td>
                    <td>{result ? result.errorCode : 'Unknown'}</td>
                </tr>



                </tbody>
            </table>

        </form>
    );
    }

}

function mapStateToProps(state) {

    // this is where we decide which data to put into the component
    // if it is an HCD config, then use the hcdConfig

        return {
            assemblyConfigs: state.assemblyConfigs,
            hcdConfigs: state.hcdConfigs,
            telemetry: state.telemetry

        }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HcdStateList);