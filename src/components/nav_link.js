import React, { Component } from 'react';
import PropTypes from 'prop-types'

class NavLink extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.linkName, this.props.panelType);
    }

    render() {
        const isActive = this.props.linkName === this.props.activeLinkName;
        return (
            <li className={`${isActive ? 'active' : ''}`}>
                <a onClick={this.handleTabClick} href="#">
                    <span className={this.props.iconClassName}></span> {this.props.linkName}
                </a>
            </li>
        );
    }
}

NavLink.propTypes = {
    onClick      : PropTypes.func,
    activeLinkName     : PropTypes.string.isRequired,
    isActive     : PropTypes.bool,
    iconClassName: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired
};

export default NavLink;