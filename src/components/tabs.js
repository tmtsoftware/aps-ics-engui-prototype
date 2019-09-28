import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Tabs extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTabIndex: 0
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tabIndex) {
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }

    // Encapsulate <Tabs/> component API as props for <Tab/> children
    renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex
            });
        });
    }

    // Render current active tab content
    renderActiveTabContent() {
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

    render() {
        return (
            <div className="tab">
                <ul className="nav nav-tabs">
                    {this.renderChildrenWithTabsApiAsProps()}
                </ul>
                <div className="tab-content tabs">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        );
    }
};

Tabs.propTypes = {
    defaultActiveTabIndex: PropTypes.number
};

Tabs.defaultProps = {
    defaultActiveTabIndex: null
};

export default Tabs;