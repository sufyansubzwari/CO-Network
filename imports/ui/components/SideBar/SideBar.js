import React, { Component } from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";
import { Create } from "../../components";
import { CREATE_LINKS } from "./create-links";
import EventsFilters from "../../modules/event-module/filters";
import JobsFilters from "../../modules/jobs-module/filters";
import OrganizationFilters from "../../modules/organization-module/filters";
import posed from "react-pose";

const SSideBarContainerStyed = styled(Container)`
  border-right: ${props => "1px solid " + props.theme.borderColor};
  overflow: hidden;
  z-index: 10;
`;
const SSideBarContainer = posed(SSideBarContainerStyed)({
  openSidebar: {
    x: "0%",
    staggerChildren: 50,
    transition: {
      ease: "circOut" //circOut
    }
  },
  closedSidebarRight: {
    x: "100%",
    transition: {
      ease: "circOut" //circOut
    }
  },
  closedSidebar: {
    x: "-100%",
    transition: {
      ease: "circOut" //circOut
    }
  }
});

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
    if (this.props.isAddAction) {
      return (
        <Create
          options={CREATE_LINKS}
          onChangeRoute={() => this.props.toggleSideBar(false, null, true)}
          onBlur={() => console.log("adsdasdasdasd")}
        />
      );
    } else {
      const typeEntity = this.props.filterEntityType || "events";
      switch (typeEntity.toLowerCase()) {
        case "events":
          return (
            <EventsFilters
              onClose={() =>
                this.props.toggleSideBar && this.props.toggleSideBar(false)
              }
            />
          );
        case "jobs":
          return (
            <JobsFilters
              onClose={() =>
                this.props.toggleSideBar && this.props.toggleSideBar(false)
              }
            />
          );
        case "corporations":
          return (
            <OrganizationFilters
              onClose={() =>
                this.props.toggleSideBar && this.props.toggleSideBar(false)
              }
            />
          );
        default:
          return (
            <div>
              You must implement the filters for {this.props.filterEntityType}
              entity type
            </div>
          );
      }
    }
  }

  render() {
    const isOpen= this.props.isOpen;
    const right= this.props.right;
    return (
      <SSideBarContainer
        pose={isOpen ? "openSidebar" : (right?"closedSidebarRight":"closedSidebar")}
        background={"white"}
        fullY
        gridArea="SideBar"
      >
        {this.renderSidebar()}
      </SSideBarContainer>
    );
  }
}

const mapStateToProps = state => {
  const { sideBarStatus, sideBarEntity } = state;
  return {
    isAddAction: sideBarStatus ? sideBarStatus.isAdd : false,
    filterEntityType: sideBarEntity ? sideBarEntity.entityType : null
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
