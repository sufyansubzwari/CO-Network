import React, { Component } from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";
import * as type from "../../actions/SideBarActions/types";
import {Create} from "../../components";
import { CREATE_LINKS } from "./create-links";

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
        return (
          <Create
            options={CREATE_LINKS}
            noteText={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
            }
            onChangeRoute={() => this.props.toggleSideBar(false, null, true)}
            onBlur={() => console.log("adsdasdasdasd")}
          />
        );
      } else {
        switch (data.entityType) {
          case "events":
            return (
              <EventsFilter
                onClose={() =>
                  this.props.toggleSideBar && this.props.toggleSideBar(false)
                }
              />
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
