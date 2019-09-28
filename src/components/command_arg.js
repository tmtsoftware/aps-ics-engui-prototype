/**
 * Created by smichaels on 7/6/17.
 */
import React, {Component} from 'react';

class CommandArg extends Component {
    constructor(props) {
        super(props);
        this.state = {argValue: ''};
    }

    render() {
        const placeholder = `Enter ${this.props.argName}`;
        return (
            <div className="form-group">
                {this.props.argName}: <input onChange={event => this.update(event)} type="text" className="form-control" placeholder={placeholder} /> meters
            </div>
        );
    }

    update(event) {
        console.log(event.target.value);

        this.props.onUpdate({[this.props.argName]: event.target.value});
    }

}

export default CommandArg;