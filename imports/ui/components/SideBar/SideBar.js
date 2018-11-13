import React, { Component } from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import { Create, LoginSidebar } from "../../components";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";
import { CREATE_LINKS } from "./create-links";
import EventsFilters from "../../modules/event-module/filters";
import JobsFilters from "../../modules/jobs-module/filters";
import ColloquiumFilters from "../../modules/colloquium-module/filters";
import OrganizationFilters from "../../modules/organization-module/filters";
import MembersFilters from "../../modules/members-module/filters";
import ProfileSideBar from "../../modules/user-module/profileSidebar/profileSidebar";
import NotificationsMenu from "../Notifications/NotificationsMenu";
import MessagesSideBar from "../Messages/Sidebar/MessagesSidebar";
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
    if (!this.props.isOpen) return null;
    if (this.props.isAddAction) {
      return (
        <Create
          options={CREATE_LINKS}
          onChangeRoute={() => this.props.toggleSideBar(false, null, true)}
          onClose={() =>
            this.props.toggleSideBar && this.props.toggleSideBar(false)
          }
        />
      );
    } else if (this.props.isProfileAction) {
      return this.props.curUser ? (
        <ProfileSideBar
          curUser={this.props.curUser}
          onClose={() =>
            this.props.toggleSideBar && this.props.toggleSideBar(false)
          }
        />
      ) : (
        <LoginSidebar
          curUser={this.props.curUser}
          onClose={() =>
            this.props.toggleSideBar && this.props.toggleSideBar(false)
          }
        />
      );
    } else if (this.props.isNotificationsAction) {
      return (
        <NotificationsMenu
          {...this.props}
          onClose={() =>
            this.props.toggleSideBar && this.props.toggleSideBar(false)
          }
        />
      );
    } else if (this.props.isMessagesAction) {
      return (
        <MessagesSideBar
          {...this.props}
          onClose={() =>
            this.props.toggleSideBar && this.props.toggleSideBar(false)
          }
        />
      );
    } else {
      const typeEntity = this.props.filterEntityType || "events";
      switch (typeEntity.toLowerCase()) {
        case "events":
          return (
            <EventsFilters
              {...this.props}
              onClose={() =>
                this.props.toggleSideBar && this.props.toggleSideBar(false)
              }
            />
          );
        case "jobs":
          return (
            <JobsFilters
              {...this.props}
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
        case "members":
          return (
            <MembersFilters
              {...this.props}
              onClose={() =>
                this.props.toggleSideBar && this.props.toggleSideBar(false)
              }
            />
          );
        case "colloquiums":
          return (
            <ColloquiumFilters
              {...this.props}
              onClose={() =>
                this.props.toggleSideBar && this.props.toggleSideBar(false)
              }
            />
          );
        default:
          return (
            <div>
              You must implement the filters for {this.props.filterEntityType}{" "}
              entity type
            </div>
          );
      }
    }
  }

  render() {
    const isOpen = this.props.isOpen;
    return (
      <SSideBarContainer
        mdPadding={"0"}
        pose={isOpen ? "openSidebar" : "closedSidebar"}
        background={"white"}
        fullY
        gridArea="SideBar"
        mr={{ xs: "-100%", md: "0px" }}
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
    filterEntityType: sideBarEntity ? sideBarEntity.entityType : null,
    isProfileAction: sideBarStatus ? sideBarStatus.profile : false,
    isNotificationsAction: sideBarStatus ? sideBarStatus.notifications : false,
    isMessagesAction: sideBarStatus ? sideBarStatus.messages : false
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
