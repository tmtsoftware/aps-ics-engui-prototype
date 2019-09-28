/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import DashboardAxesListItem from './dashboard_axes_list_item';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import {bindActionCreators} from "redux";
import {fetchConfig} from '../actions/index';
import MasterCheckbox from './master_checkbox'

class DashboardAxesList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }


    renderList() {


        console.log("CONTAINER CONFIGS: renderList(): ")
        console.log(this.props.containerConfig.components)

        // loop over each assembly
        //var keys = Object.keys(this.props.containerConfig.components);
        //keys.forEach((key, index) => {
        //    console.log('key = ' + key + ", object = " + this.props.containerConfig.components.${index})
        //})

        var axesProps = []
        const assemblies = this.props.containerConfig.components
        for (var key in assemblies) {
            console.log(key, assemblies[key]);
            const axesArray = assemblies[key].axes

            for (var i = 0; i < axesArray.length; i++) {
                console.log(axesArray[i].AxisName)

                const axisProps = {
                    assemblyName: key,
                    axisName: axesArray[i].AxisName,
                    stageName: assemblies[key].stageName,
                    axisNumber: axesArray[i].AxisNumber,
                    channel: axesArray[i].Channel,
                    axisType: axesArray[i].AxisType
                }

                axesProps.push(axisProps);
            }
        }


        return (axesProps).map((axisProps) => {

            return (
                <DashboardAxesListItem key={axisProps.axisName} channel={axisProps.channel}
                                    stageName={axisProps.stageName}
                                    axisName={axisProps.axisName}
                                    positionCommand='absolute'
                                       positionCoords='stage'
                                    positionCounts='30'
                                    updateStatusHistory={this.props.updateStatusHistory.bind(this)}
                                       handleCheckboxChange = {this.props.handleCheckboxChange.bind(this)}/>
            );

        });
    }

    render() {


    return (



        <form className="form-horizonal">
            <div class="table-responsive">
            <table className="table table-bordered table-striped table-highlight">
                <thead>
                <tr>
                    <th>Stage</th>
                    <th>Axis</th>
                    <th>Status</th>
                    <th>Position</th>
                    <th>Cmd Type</th>
                    <th>Value</th>
                    <th>Units</th>
                    <th> </th>
                    <th> </th>
                    <th> </th>
                    <th> </th>
                    <th style={{width: 19}}><MasterCheckbox handleMasterCheckboxChange={this.props.handleMasterCheckboxChange.bind(this)}/></th>
                </tr>
                </thead>
                <tbody>
                {this.renderList()}
                </tbody>
            </table>
            </div>


        </form>
    );
    }

}

function mapStateToProps(state) {


    return {
        commands: state.commands,
        commandStatus: state.commandStatus,
        containerConfig: state.containerConfigs
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAxesList);