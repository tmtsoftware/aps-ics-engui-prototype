/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import CommandListItem from './command_list_item';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';

class CommandList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    // called once the component updated
    componentDidUpdate() {

        if (this.props.commandStatus.overallStatus == 'AllCompleted') {
            // do it here
            this._notificationSystem.addNotification({
                title: 'Success',
                message: 'The SetupConfig was successfully submitted',
                level: 'success',
                position: 'tl'
            });

        } else if (this.props.commandStatus.overallStatus == 'NotAccepted') {
            this._notificationSystem.addNotification({
                title: 'SetupConfig Error',
                message: this.props.commandStatus.detail,
                level: 'error',
                position: 'tl'
            });
        }

    }


    renderList() {

        return this.props.commands.map((command) => {

            const commandState = (this.props.commandStatus && this.props.commandStatus.commandSetupConfig == command.commandSetupConfig) ? this.props.commandStatus.overallStatus : command.commandState
            
            return (
                <CommandListItem key={command.commandName} commandName={command.commandName}
                                 commandState={commandState}
                                 commandArgs={command.commandArgs}
                                 commandSetupConfig={command.commandSetupConfig}
                                 />
            );

        });
    }

    render() {


    return (
        <form className="form-inline">

            <NotificationSystem ref="notificationSystem"  />
            <table className="table">
                <caption>Select a command and press Submit to send.</caption>
                <thead>
                <tr>
                    <th>Command</th>
                    <th>Arguments</th>
                    <th> </th>
                    <th>Submit Status</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {this.renderList()}
                </tbody>
            </table>
        </form>
    );
    }

}

function mapStateToProps(state) {
    return {
        commands: state.commands,
        commandStatus: state.commandStatus
    }
}

export default connect(mapStateToProps)(CommandList);