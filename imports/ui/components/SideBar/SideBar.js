import React, { Component } from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";
import * as type from "../../actions/SideBarActions/types";

const SSideBarContainer = styled(Container)`
  border-right: ${props => "1px solid " + props.theme.color.grey};
`;

/**
 * @module Data
 * @category SideBar
 * @description This component is a wrapper for the react-table
 */
class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  renderSidebar() {
    const data = this.props.sidebar;
    if (data) {
      if (data.isAdd) {
        //  render add
        return <div>Add element</div>;
      } else {
        switch (data.entityType) {
          case "events":
            return (
              <Button
                onClick={() =>
                  this.props.toggleSideBar && this.props.toggleSideBar(false)
                }
              >
                Hidde Filters
              </Button>
            );
          default:
            return <div>You must implement this filters</div>;
        }
      }
    }
  }

  render() {
    return (
      <SSideBarContainer hide mdShow lgShow fullY gridArea="SideBar">
        {this.renderSidebar()}
      </SSideBarContainer>
    );
  }
}

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    sidebar: sideBarStatus || {
      status: false,
      type: type.HIDE_SIDEBAR,
      entityType: null
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: status => dispatch(toggleSideBar(status, null))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
