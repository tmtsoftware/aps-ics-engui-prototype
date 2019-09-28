/**
 * Created by smichaels on 6/26/17.
 */
import React, {Component} from 'react';

class TelemeteryValue  extends Component {
    constructor(props) {
        super(props);

        this.state = {value: ''};

        socket.on('receive telemetry1', (payload) => {
            this.updateCodeFromSockets(payload)});
    }

    updateCodeFromSockets(payload) {
        this.setState({value: payload.newCode})
    }
}