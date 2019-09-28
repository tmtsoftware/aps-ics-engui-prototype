/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';

import axios from 'axios';
import CommandArg from './command_arg';


class ConfigListItem extends Component {


    constructor(props) {
        super(props);
        this.state = {configValue: this.props.configValue};
    }

    render() {
        return (

            <tr>
                <td>{this.props.configName}</td>
                <td>
                    <div className="form-group">

                    <input type="text" onChange={event => this.update(event)} value={this.state.configValue} className="form-control"/>

                    </div>
                </td>
            </tr>

        );
    }

    update(event) {
        console.log(event.target.value);
        this.setState({configValue: event.target.value});

        this.props.onUpdate({[this.props.configName]: event.target.value});
    }

}


export default ConfigListItem;

