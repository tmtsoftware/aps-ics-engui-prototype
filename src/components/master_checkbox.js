
import React, { Component } from 'react';
import {connect} from "react-redux";
import {selectAllCheckboxes, clearAllCheckboxes} from "../actions/index";
import {bindActionCreators} from "redux";


class MasterCheckbox extends Component {
    state = {
        isChecked: false,
    }

    toggleCheckboxChange = () => {

        const newCheckState = !this.state.isChecked

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        this.props.handleMasterCheckboxChange(newCheckState)

    }

    render() {


        const isChecked = this.state.isChecked;

        //console.log("render: ")
        //console.log(this.props.checkboxes)
        //console.log(isChecked)

        return (
            <div style={{width:15}}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={this.toggleCheckboxChange}
                />
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({clearAllCheckboxes, selectAllCheckboxes}, dispatch);
}

export default connect(mapDispatchToProps)(MasterCheckbox);

