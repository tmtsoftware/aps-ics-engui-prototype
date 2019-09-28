
import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateCheckbox} from "../actions/index";
import {bindActionCreators} from "redux";


class Checkbox extends Component {
    state = {
        isChecked: false,
    }

    toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        // the redux function to call that accumulates all line item checkbox states
        this.props.updateCheckbox(this.props.stageName, this.props.axisName, !this.state.isChecked);

    }

    render() {

        // this is where we change it to use redux state
        const axisChecked = this.props.checkboxes.get(this.props.stageName + this.props.axisName);

        const isChecked = (axisChecked === undefined) ? false : axisChecked;

        //console.log("render: ")
        //console.log(this.props.checkboxes)
        //console.log(isChecked)

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                </label>
            </div>
        );
    }
}

function mapStateToProps(state) {


    return {
        checkboxes: state.checkboxes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateCheckbox}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);

