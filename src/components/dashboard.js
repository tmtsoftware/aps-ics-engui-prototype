import React, { Component } from 'react';
import DashboardAxesList from './dashboard_axes_list';
import {fetchConfig} from "../actions/index";
import {clearAllCheckboxes, selectAllCheckboxes} from "../actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import axios from "axios/index";



class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {statusHistory: ''};
    }

    componentDidMount() {
        console.log("Dashboard::MOUNT")

        // fetch all configs for each axis when component first mounts
        this.props.fetchConfig("container", "StageContainer.conf");
        this.props.clearAllCheckboxes();

    }



    checkTime(i, n) {

        if (n == 2)  {

            if (i < 10) {
                i = "0" + i;
            }
            return i;
        } else {

            if (i < 10) {
                i = "00" + i;
            } else if (i < 100) {
                i = "0" + i;
            }
            return i;
        }
    }

    nowFormatted() {
        const now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        var ms = now.getMilliseconds();

        m = this.checkTime(m,2);
        s = this.checkTime(s,2);
        h = this.checkTime(h,2);
        ms = this.checkTime(ms,3);
        return  h + ":" + m + ":" + s + "." + ms;

    }



    sendStopCommand() {

        const url = 'http://localhost:9000/v1/gs/motorOff'

        this.getSelectedStages().forEach(stageName => {

            const axisListString = this.getSelectedAxisList(stageName).join()

            console.log("about to update status history: " + this.nowFormatted())

            this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " +  "motorOff" + " Cmd Sent")

            axios.post(url, this.buildPostForm(stageName, axisListString)
            ).then(response => {
                console.log(response)
                this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " +  "motorOff" + " Cmd Completed: " + response.data)
            }).catch((error) => {
                this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " +  "motorOff" + " Communication Error")
                console.log(error);
            });
        })

        //this.props.clearAllCheckboxes();
    }

    sendInitCommand() {

        const url = 'http://localhost:9000/v1/gs/init'

        this.getSelectedStages().forEach(stageName => {

            const axisListString = this.getSelectedAxisList(stageName).join()
            this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " + "init" + " Cmd Sent")

            axios.post(url, this.buildPostForm(stageName, axisListString)
            ).then(response => {
                console.log(response)
                this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " +  "init" + " Cmd Completed: " + response.data)
            }).catch((error) => {
                this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " +  "init" + " Communication Error")
                console.log(error);
            });
        })

        //this.props.clearAllCheckboxes();
    }

    sendHomeCommand() {

        console.log(this.props);

        const url = 'http://localhost:9000/v1/gs/home'

        this.getSelectedStages().forEach(stageName => {

            const axisListString = this.getSelectedAxisList(stageName).join()


            this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " + "home" + " Cmd Sent")

            axios.post(url, this.buildPostForm(stageName, axisListString)
            ).then(response => {
                console.log(response)
                this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " + "home" + " Cmd Completed: " + response.data)
            }).catch((error) => {
                this.updateStatusHistory(this.nowFormatted() + "  Stage: " + stageName + ", Axes: " + axisListString + ": " + "home" + " Communication Error")
                console.log(error);
            });

        })

        //this.props.clearAllCheckboxes();
    }

    getAssemblies() {

        const map = new Map()
        const assemblies = this.props.containerConfig.components

        for (var key in assemblies) {

            const axesArray = assemblies[key].axes

            for (var i = 0; i < axesArray.length; i++) {


                map.set(assemblies[key].stageName, assemblies[key].stageName)
            }
        }

        return Array.from( map.keys() )
    }


    getSelectedStages() {
        const map = new Map()
        const assemblies = this.getAssemblies()
        assemblies.forEach (stageName => {
            this.props.checkboxes.forEach((v, key, m) => {
                // check if key startswith stageName
                if (key.startsWith(stageName)) {
                    map.set(stageName, stageName)
                }
            })
        })
        console.log(map)
        return Array.from (map.keys())

    }

    getSelectedAxisList(stageName) {
        const map = new Map()
        this.props.checkboxes.forEach((v, key, m) => {
            // check if key startswith stageName
            if (key.startsWith(stageName)) {

                // extract axisName
                const axisName = key.replace(stageName,'')
                map.set(axisName, axisName)
            }
        })
        return Array.from(map.keys())

    }

    getAllAxes() {

        const map = new Map()
        const assemblies = this.props.containerConfig.components

        for (var key in assemblies) {

            const axesArray = assemblies[key].axes

            for (var i = 0; i < axesArray.length; i++) {

                const obj = {
                    stageName: assemblies[key].stageName,
                    axisName: axesArray[i].AxisName
                }
                map.set(obj, obj)
            }
        }

        return Array.from( map.keys() )
    }



    buildPostForm(stageName, axisListString) {

        return {
            stageName: stageName,
            axesListString: axisListString,
            positionsString: "10",
            positionMethod: "absolute",
            positionCoords: "encoder"

        }
    }


    updateStatusHistory(newStatus) {

        this.setState((prevState, props) => ({
            statusHistory: prevState.statusHistory + "\n" + newStatus
        }));

    }

    handleCheckboxChange(stageName, axisName, checkboxState) {

        console.log("stageName = " + stageName + ", axisName = " + axisName + ", checkboxState = " + checkboxState)

    }

    handleMasterCheckboxChange(masterCheckboxState) {

        // call functions to clear or fill checkboxes
        if (masterCheckboxState === true) {
            this.props.selectAllCheckboxes(this.getAllAxes())
        } else {
            this.props.clearAllCheckboxes()
        }
    }

    render() {

        return (

            <div>
            <h2>Stimulus Dashboard</h2>


                <h3>Status and Command</h3>
                <DashboardAxesList updateStatusHistory={this.updateStatusHistory.bind(this)}
                handleCheckboxChange = {this.handleCheckboxChange.bind(this)}
                handleMasterCheckboxChange = {this.handleMasterCheckboxChange.bind(this)}/>

                <div className="container-fluid">
                <div className="row-fluid">
                    <div className="span6 offset6 pull-right" >
                        <div className={"btn-toolbar"}>
                            <button type="button" className="btn btn-primary" onClick={() => this.sendStopCommand()}>Stop Selected</button>

                            <button type="button" className="btn btn-primary" onClick={() => this.sendInitCommand()}>Init Selected</button>

                            <button type="button" className="btn btn-primary" onClick={() => this.sendHomeCommand()}>Home Selected</button>
                        </div>
                    </div>
                </div>
                </div>

                <h3>Command Status History</h3>

                <div class="form-group">
                    <textarea readOnly class="form-control" rows="10" id="comment" style={{width: '70%'}} value={this.state.statusHistory}>
                    </textarea>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        commands: state.commands,
        commandStatus: state.commandStatus,
        checkboxes: state.checkboxes,
        containerConfig: state.containerConfigs
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig, clearAllCheckboxes, selectAllCheckboxes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
