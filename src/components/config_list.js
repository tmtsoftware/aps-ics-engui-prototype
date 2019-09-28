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



class ConfigList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);

    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        console.log("ConfigList::MOUNT")

        // fetch all configs for each axis when component first mounts
        this.fetchAll()

    }


    fetchAll() {
        this.props.fetchConfig("assembly", "PupilMaskStageAssembly.conf");
        this.props.fetchConfig("assembly", "FiberSourceStageAssembly.conf");
        this.props.fetchConfig("assembly", "DmOpticStageAssembly.conf");
    }



    componentDidUpdate() {
        // refresh should reset the data
        console.log("UPDATE")
     }


    //_addNotification(event) {
    //    event.preventDefault();
    //    this._notificationSystem.addNotification({
    //        message: 'Notification Message',
    //        level: 'success'
    //    })
    //}

    // updates of each config item's data
    onUpdate(data) {

        console.log("data = " + data)
        this.setState(data)

        console.log("state = ")
        console.log(this.state)

    }

    substitute(arr, key, value) {
        let obj = arr.find((o, i) => {
            if (o.name === key) {
                arr[i] = {name: key, value: value};
                return true; // stop searching
            }
        });
    }


    updateServer() {
        console.log("updateServer:: state = ");
        console.log(this.state);

        var arr = [];

        const axis = this.props.assemblyConfigs.stageConfigs[this.props.assemblyName].axes.find(x => x.AxisName == this.props.axis)

        var temp = Object.assign({}, axis);

        if (this.state) {
            Object.keys(this.state).map((key) =>
                temp[key] = this.state[key]
            );
        }

        console.log("temp = ")
        console.log(temp)


        // the stage config for the axis we are updating is completed, but we need to create the entire file

        var newAssemblyConfig = Object.assign({}, this.props.assemblyConfigs.stageConfigs[this.props.assemblyName])

        const index = newAssemblyConfig.axes.findIndex(x => x.AxisName == this.props.axis)
        newAssemblyConfig.axes[index] = temp

        console.log(newAssemblyConfig)



        //const jsonString = JSON.stringify(newAssemblyConfig)

        //console.log("JSON String = " + jsonString)


        axios.post('http://localhost:9000/v1/gs/setConfig?filename=' + this.props.assemblyName + "Assembly.conf",
            {
                stageConfig: newAssemblyConfig
            }
        ).then(response => {
            //console.log(response);

            if (response.status == 200) {
                // do it here
                this._notificationSystem.addNotification({
                    title: 'Update Success',
                    message: 'The Configuration was successfully updated',
                    level: 'success',
                    position: 'tl'
                });

            } else {
                this._notificationSystem.addNotification({
                    title: 'Update Error',
                    message: 'Error updating configuration: ' + response.status,
                    level: 'error',
                    position: 'tl'
                });
            }

            // Update the list here
            //this.props.fetchConfig("assembly", this.props.axis);
            this.fetchAll()


        });



    }

    renderList() {

        console.log("renderList::assemblyConfigs = ")
        console.log(this.props.assemblyConfigs)

        var test = null;
        if (this.props.assemblyConfigs) {
            if (this.props.assemblyConfigs.stageConfigs) {
                console.log(this.props.assemblyConfigs.stageConfigs)
                console.log(this.props.assemblyName)
                const axes = this.props.assemblyConfigs.stageConfigs[this.props.assemblyName].axes
                const axis = axes.find(x => x.AxisName == this.props.axis)
                console.log(axis)
                test = axis
            }

        }


        //const componentConfigs = (this.props.assemblyConfigs) ?  null : this.props.assemblyConfigs.stageConfig.axes.find(x => x.AxisName == this.props.axis);
        const componentConfigs = test


            console.log("componentConfigs: " + this.props.axis)
            console.log(componentConfigs)

            if (componentConfigs == null) {
                return "Error querying axis configuration";
            }

            // each field of the object needs to be turned into a name value pair
            var arr = [];

            Object.keys(componentConfigs).map((key) =>
                    // search through an array for a field value (name = InterpolationCounts)

                arr.push({
                    name: key,
                    value: componentConfigs[key]
                })
            );





        return arr.map((config) => {

                //console.log(config)
                //const commandState = (this.props.commandStatus && this.props.commandStatus.commandSetupConfig == command.commandSetupConfig) ? this.props.commandStatus.overallStatus : command.commandState

                // key is config.name and the axis, since this component is used by each axis page and they should be unique
            return (
                <ConfigListItem key={config.name + "_" + this.props.axis} configName={config.name}
                                 configValue={config.value} onUpdate={this.onUpdate.bind(this)} />
            );

        });
    }

    render() {
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
                {this.renderList()}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary" onClick={() => this.updateServer()}>Update</button>
        </form>
    );
    }

}

function mapStateToProps(state) {

    // this is where we decide which data to put into the component
    // if it is an HCD config, then use the hcdConfig

        console.log("state.assemblyConfigs = " + state.assemblyConfigs)

        return {
            assemblyConfigs: state.assemblyConfigs,
            hcdConfigs: state.hcdConfigs

        }


}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);