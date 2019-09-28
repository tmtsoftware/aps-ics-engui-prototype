/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';

import axios from 'axios';
import CommandArg from './command_arg';
import {connect} from "react-redux";
import Checkbox from './checkbox'


class DashboardAxesListItem extends Component {


    constructor(props) {
        super(props);
        this.sendPositionCommand = this.sendPositionCommand.bind(this);
        this.sendStopCommand = this.sendStopCommand.bind(this);
        this.sendInitCommand = this.sendInitCommand.bind(this);
        this.sendHomeCommand = this.sendHomeCommand.bind(this);
        this.state = {positionMethod: "absolute", positionCounts: 25, positionCoords: "stage"}

        this.handlePositionMethodChange = this.handlePositionMethodChange.bind(this);
        this.handlePositionCountsChange = this.handlePositionCountsChange.bind(this);
        this.handlePositionCoordsChange = this.handlePositionCoordsChange.bind(this);

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


    sendPositionCommand() {


        const url = 'http://localhost:9000/v1/gs/position'

        this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + this.state.positionMethod + "(" + this.state.positionCounts + " counts) Cmd Sent")

        axios.post(url, this.buildPostForm()
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + this.state.positionMethod + "(" + this.state.positionCounts + " counts) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + this.state.positionMethod + " Communication Error")
            console.log(error);
        });

    }

    sendStopCommand() {


        console.log(this.props);

        const url = 'http://localhost:9000/v1/gs/motorOff'

        this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "motorOff" + " Cmd Sent")

        axios.post(url, this.buildPostForm()
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "motorOff" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " +  "motorOff" + " Communication Error")
            console.log(error);
        });

    }

    sendInitCommand() {

        const url = 'http://localhost:9000/v1/gs/init'

        this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "init" + " Cmd Sent")

        axios.post(url, this.buildPostForm()
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "init" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "init" + " Communication Error")
            console.log(error);
        });

    }

    sendHomeCommand() {

        console.log(this.props);

        const url = 'http://localhost:9000/v1/gs/home'

        this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "home" + " Cmd Sent")

        axios.post(url, this.buildPostForm()
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "home" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Stage: " + this.props.stageName + ", Axes: " + this.props.axisName + ": " + "home" + " Communication Error")
            console.log(error);
        });

    }


    buildPostForm() {

        return {
            axesListString: this.props.axisName,
            stageName: this.props.stageName,
            positionsString: this.state.positionCounts,
            positionMethod: this.state.positionMethod,
            positionCoords: this.state.positionCoords

        }
    }

    handlePositionMethodChange(event) {
        this.setState({positionMethod: event.target.value});
    }

    handlePositionCoordsChange(event) {
        this.setState({positionCoords: event.target.value});
    }

    handlePositionCountsChange(event) {
        this.setState({positionCounts: event.target.value});
    }

    render() {

        var result = null
        if (this.props.telemetry && this.props.telemetry.axes) {
            result = this.props.telemetry.axes.find(x => x.axis == this.props.channel)
        }

        return (

            <tr>
                <td>{this.props.stageName}</td>
                <td>{this.props.axisName}</td>
                <td>{result ? result.status : 'Unknown'}</td>
                <td>{result ? result.position : 'Unknown'}</td>

                <td>
                    <select className="form-control" value={this.state.positionMethod} onChange={this.handlePositionMethodChange}>
                        <option value="absolute">absolute</option>
                        <option value="relative">relative</option>
                    </select>
                </td>


                <td>
                    <input type="text" className="form-control"value={this.state.positionCounts} size="2" onChange={this.handlePositionCountsChange}></input>
                </td>
                <td>
                    <select className="form-control" value={this.state.positionCoords} onChange={this.handlePositionCoordsChange}>
                        <option value="stage">stage mm</option>
                        <option value="encoder">enc counts</option>
                    </select>
                </td>


                <td><button type="button" className="btn btn-primary" onClick={() => this.sendPositionCommand()}>Submit</button></td>

                <td><button type="button" className="btn btn-primary" onClick={() => this.sendStopCommand()}>Stop</button></td>

                <td><button type="button" className="btn btn-primary" onClick={() => this.sendInitCommand()}>Init</button></td>

                <td><button type="button" className="btn btn-primary" onClick={() => this.sendHomeCommand()}>Home</button></td>

                <td><Checkbox
                    stageName={this.props.stageName}
                    axisName={this.props.axisName}
                    handleCheckboxChange = {this.props.handleCheckboxChange.bind(this)}/></td>

            </tr>

        );
    }



    getAxisConfigProps() {
        if (this.props.hcdConfigs.axes) {
            var testObj = this.nameValueArrayToObject(this.props.hcdConfigs.axes[this.props.channel].props)
            console.log(testObj)
            return testObj;
        }

    }

    nameValueArrayToObject(arr) {
        var obj = {};
        arr.forEach(function(data){
           obj[data.name] = data.value
        });
        return obj;
    }

}

function mapStateToProps(state) {

    //console.log(state.hcdConfigs)

    return {
         hcdConfigs: state.hcdConfigs,
        telemetry: state.telemetry
    }


}

export default connect(mapStateToProps, null)(DashboardAxesListItem);
