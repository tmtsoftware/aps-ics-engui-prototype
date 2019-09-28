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



class HcdSettingsList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            positionCounts: "",
            relTargetCounts: "",
            absTargetCounts: "",
            jogSpeed: "",
            brushlessModulus: "",
            homingMode: "",
            interpCounts: "",
            brushlessZero: "",
            relTargetEnabled: false,
            absTargetEnabled: false,
            jogSpeedEnabled: false,
            brushlessModulusEnabled: false,
            analogFeedbackEnabled: false,
            brushlessZeroEnabled: false
        }

        this.handleRelTargetCountsChange = this.handleRelTargetCountsChange.bind(this);
        this.handleAbsTargetCountsChange = this.handleAbsTargetCountsChange.bind(this);
        this.handleJogSpeedChange = this.handleJogSpeedChange.bind(this);
        this.handleBrushlessModulusChange = this.handleBrushlessModulusChange.bind(this);
        this.handleBrushlessZeroChange = this.handleBrushlessZeroChange.bind(this);
        this.handleHomingModeChange = this.handleHomingModeChange.bind(this);
        this.handleInterpCountsChange = this.handleInterpCountsChange.bind(this);


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



    sendSetRelTargetCommand() {

        const url = 'http://localhost:9000/v1/gs/setRelTarget?axis=' + this.props.axis + "&target=" + this.state.relTargetCounts

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": setRelTarget(" + this.state.relTargetCounts + " counts) Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setRelTarget" + "(" + this.state.relTargetCounts + " counts) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setRelTarget" + " Communication Error")
            console.log(error);
        });

    }

    sendSetAbsTargetCommand() {

        const url = 'http://localhost:9000/v1/gs/setAbsTarget?axis=' + this.props.axis + "&target=" + this.state.absTargetCounts

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": setAbsTarget(" + this.state.absTargetCounts + " counts) Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setAbsTarget" + "(" + this.state.absTargetCounts + " counts) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setAbsTarget" + " Communication Error")
            console.log(error);
        });
    }

    sendJogCommand() {

        const url = 'http://localhost:9000/v1/gs/setJogSpeed?axis=' + this.props.axis + "&speed=" + this.state.jogSpeed

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": setJogSpeed(" + this.state.jogSpeed + " counts/sec) Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setJogSpeed" + "(" + this.state.jogSpeed + " counts/sec) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setJogSpeed" + " Communication Error")
            console.log(error);
        });
    }

    sendHomingModeCommand() {

        const cmd = (this.state.homingMode === "home") ?
            'setHomingMode' :
            'setFindIndexMode'

        const url = 'http://localhost:9000/v1/gs/' + cmd + '?axis=' + this.props.axis

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": " + cmd + " Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + cmd + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + cmd + " Communication Error")
            console.log(error);
        });
    }

    sendBrushlessModulusCommand() {

        const url = 'http://localhost:9000/v1/gs/setBrushlessModulus?axis=' + this.props.axis + "&brushlessModulus=" + this.state.brushlessModulus

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": setBrushlessModulus(" + this.state.brushlessModulus + " ) Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setBrushlessModulus" + "(" + this.state.brushlessModulus + " ) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setBrushlessModulus" + " Communication Error")
            console.log(error);
        });
    }

    sendBrushlessZeroCommand() {

        const url = 'http://localhost:9000/v1/gs/brushlessZero?axis=' + this.props.axis + "&volts=" + this.state.brushlessZero

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": setBrushlessZero(" + this.state.brushlessZero + " ) Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setBrushlessZero" + "(" + this.state.brushlessZero + " ) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setBrushlessZero" + " Communication Error")
            console.log(error);
        });
    }

    sendAnalogFeedbackCommand() {

        const url = 'http://localhost:9000/v1/gs/setAnalogFeedbackSelect?axis=' + this.props.axis + "&interpCounts=" + this.state.interpCounts

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": setAnalogFeedbackSelect(" + this.state.interpCounts + " ) Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setAnalogFeedbackSelect" + "(" + this.state.interpCounts + " ) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "setAnalogFeedbackSelect" + " Communication Error")
            console.log(error);
        });
    }

    sendBeginMotionCommand() {

        const url = 'http://localhost:9000/v1/gs/beginMotion?axis=' + this.props.axis

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": beginMotion Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "beginMotion" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "beginMotion" + " Communication Error")
            console.log(error);
        });
    }

    sendBrushlessAxisCommand() {

        const url = 'http://localhost:9000/v1/gs/setBrushlessAxis?axis=' + this.props.axis

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": brushlessAxis Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "brushlessAxis" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "brushlessAxis" + " Communication Error")
            console.log(error);
        });
    }

    sendStopMotorCommand() {

        const url = 'http://localhost:9000/v1/gs/channelMotorOff?axis=' + this.props.axis

        this.props.updateStatusHistory(this.nowFormatted() + " Axis: " + this.props.axis + ": channelMotorOff Cmd Sent")

        axios.post(url,
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "channelMotorOff" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Axis: " + this.props.axis + ": " + "channelMotorOff" + " Communication Error")
            console.log(error);
        });
    }


    handleRelTargetCountsChange(event) {

        this.setState({relTargetEnabled: (event.target.value != "")})
        this.setState({relTargetCounts: event.target.value});
    }

    handleAbsTargetCountsChange(event) {
        this.setState({absTargetEnabled: (event.target.value != "")})
        this.setState({absTargetCounts: event.target.value});
    }

    handleJogSpeedChange(event) {
        this.setState({jogSpeedEnabled: (event.target.value != "")})
        this.setState({jogSpeed: event.target.value});
    }

    handleBrushlessModulusChange(event) {
        this.setState({brushlessModulusEnabled: (event.target.value != "")})
        this.setState({brushlessModulus: event.target.value});
    }

    handleBrushlessZeroChange(event) {
        this.setState({brushlessZeroEnabled: (event.target.value != "")})
        this.setState({brushlessZero: event.target.value});
    }

    handleHomingModeChange(event) {
        this.setState({homingMode: event.target.value});
    }

    handleInterpCountsChange(event) {
        this.setState({analogFeedbackEnabled: (event.target.value != "")})
        this.setState({interpCounts: event.target.value});
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
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Relative Target(counts)</td>
                    <td><input type="text" className="form-control" value={this.state.relTargetCounts} size="2" onChange={this.handleRelTargetCountsChange}></input></td>
                    <td><button type="button" disabled={!this.state.relTargetEnabled} className="btn btn-primary" onClick={() => this.sendSetRelTargetCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Absolute Target(counts)</td>
                    <td><input type="text" className="form-control" value={this.state.absTargetCounts} size="2" onChange={this.handleAbsTargetCountsChange}></input></td>
                    <td><button type="button" disabled={!this.state.absTargetEnabled} className="btn btn-primary" onClick={() => this.sendSetAbsTargetCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Jog Speed(counts/sec)</td>
                    <td><input type="text" className="form-control" value={this.state.jogSpeed} size="2" onChange={this.handleJogSpeedChange}></input></td>
                    <td><button type="button" disabled={!this.state.jogSpeedEnabled} className="btn btn-primary" onClick={() => this.sendJogCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Homing Mode</td>
                    <td>
                        <select value={this.state.homingMode} onChange={this.handleHomingModeChange}>
                        <option value="home">Home</option>
                        <option value="index">Index</option>
                        </select>
                    </td>
                    <td><button type="button" className="btn btn-primary" onClick={() => this.sendHomingModeCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Brushless Modulus</td>
                    <td><input type="text" className="form-control" value={this.state.brushlessModulus} size="4" onChange={this.handleBrushlessModulusChange}></input></td>
                    <td><button type="button" disabled={!this.state.brushlessModulusEnabled} className="btn btn-primary" onClick={() => this.sendBrushlessModulusCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Analog Feedback</td>
                    <td><input type="text" className="form-control" value={this.state.interpCounts} size="1" onChange={this.handleInterpCountsChange}></input></td>
                    <td><button type="button" disabled={!this.state.analogFeedbackEnabled} className="btn btn-primary" onClick={() => this.sendAnalogFeedbackCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Brushless Axis</td>
                    <td></td>
                    <td><button type="button" className="btn btn-primary" onClick={() => this.sendBrushlessAxisCommand()}>Set</button></td>
                </tr>

                <tr>
                    <td>Brushless Zero (volts)</td>
                    <td><input type="text" className="form-control" value={this.state.brushlessZero} size="2" onChange={this.handleBrushlessZeroChange}></input></td>
                    <td><button type="button" disabled={!this.state.brushlessZeroEnabled} className="btn btn-primary" onClick={() => this.sendBrushlessZeroCommand()}>Command</button></td>
                </tr>

                <tr>
                    <td>Begin Motion</td>
                    <td> </td>
                    <td><button type="button" className="btn btn-primary" onClick={() => this.sendBeginMotionCommand()}>Command</button></td>
                </tr>

                <tr>
                    <td>Stop Motor</td>
                    <td> </td>
                    <td><button type="button" className="btn btn-primary" onClick={() => this.sendStopMotorCommand()}>Command</button></td>
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
            hcdConfigs: state.hcdConfigs

        }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HcdSettingsList);