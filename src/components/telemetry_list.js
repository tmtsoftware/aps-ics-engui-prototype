/**
 * Created by smichaels on 6/26/17.
 */

import React, {Component} from 'react';
import TelemetryListItem from './telemetry_list_item';
import {connect} from 'react-redux';

class TelemetryList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList() {

        return this.props.telemetry.map((telemetry) => {

            return (
                <TelemetryListItem key={telemetry.field} source={telemetry.source} fieldName={telemetry.field} fieldValue={telemetry.value}
                                 fieldUnits={telemetry.units} />
            );

        });
    }

    render() {
        return (
            <form className="form-inline">

                <table className="table">
                    <thead>
                    <tr>
                        <th>Source</th>
                        <th>Field</th>
                        <th>Value</th>
                        <th>Units</th>
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
        telemetry: state.telemetry
    }
}

export default connect(mapStateToProps)(TelemetryList);