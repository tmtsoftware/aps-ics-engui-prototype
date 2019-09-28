/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCommands} from '../actions/index';

class LoadButton extends Component {


    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.fetchCommands();
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group pull-left">
            <button type="submit" className="btn btn-primary">Load</button>
            </form>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchCommands}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoadButton);