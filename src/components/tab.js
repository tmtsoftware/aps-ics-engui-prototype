import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Tab extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.tabIndex);
    }

    render() {
        return (
            <li className={`${this.props.isActive ? 'active' : ''}`}>
                <a onClick={this.handleTabClick} href="#">
                    <span className={this.props.iconClassName}></span> {this.props.linkName}
                </a>
            </li>
        );
    }
}

Tab.propTypes = {
    onClick      : PropTypes.func,
    tabIndex     : PropTypes.number,
    isActive     : PropTypes.bool,
    iconClassName: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired
};

export default Tab;