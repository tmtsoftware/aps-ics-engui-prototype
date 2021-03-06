/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';

import axios from 'axios';
import CommandArg from './command_arg';


class CommandListItem extends Component {


    constructor(props) {
        super(props);
        this.sendCommand = this.sendCommand.bind(this);
        this.state = {positionMethod: "absolute", positionCounts: 25, positionCoords: "stage"}
    }

    renderArgs() {

        return this.props.commandArgs.map((arg) => {

            return (
                <CommandArg key={arg.argName} argName={arg.argName} onUpdate={this.onUpdate.bind(this)}/>
            );

        });

    }

    onUpdate(data) {
        this.setState(data);
    }

    sendCommand() {

        console.log(this.state);

        var arr = [];
        if (this.state) {
            Object.keys(this.state).map((key) =>
                arr.push({
                    argName: key,
                    argValue: this.state[key]
                })
            );
        }


        axios.post('http://localhost:9000/v1/gs/' + this.props.commandName, this.buildPostForm())
            .then(response => console.log(response));

    }

    buildPostForm() {

        return {
            axesListString: this.props.axisName,
            stageName: this.props.assemblyName,
            positionsString: this.state.positionCounts,
            positionMethod: this.state.positionMethod,
            positionCoords: this.state.positionCoords

        }
    }

    render() {
        return (

            <tr>
                <td>{this.props.commandName}</td>
                <td>
                    {this.renderArgs()}
                </td>
                <td><button type="button" className="btn btn-primary" onClick={() => this.sendCommand()}>Submit</button></td>
                <td>{this.props.commandState}</td>
            </tr>

        );
    }

}


export default CommandListItem;


// webpack-dev-server --port 3000 --hot --host 0.0.0.0