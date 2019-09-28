/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendWebsocketMessage} from '../actions/index';

class WsSendButton extends Component {


    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.sendWebsocketMessage();
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group pull-right">
            <button type="submit" className="btn btn-primary">Send Websocket Message</button>
            </form>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({sendWebsocketMessage}, dispatch);
}

export default connect(null, mapDispatchToProps)(WsSendButton);