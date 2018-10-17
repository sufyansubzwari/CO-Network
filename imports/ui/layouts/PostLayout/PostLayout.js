import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InternalLayout from "../InternalLayout/InternalLayout";
import { Container } from "btech-layout";
import { toggleSideBar } from "../../actions/SideBarActions";
import styled from "styled-components";
import { closeChatView, openChatView } from "../../actions/ChatView";

const SFormContainer = styled(Container)`
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;
/**
 * @module Data
 * @category PostLayout
 * @description This component is a wrapper for the PostLayout
 */
class PostLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.toggleSideBar(false);
    this.triggerFormViewStatus(true);
  }

  componentWillUnmount() {
    this.triggerFormViewStatus(false);
  }

  triggerFormViewStatus(isOpen) {
    if (this.props.isMobile)
      isOpen ? this.props.openChatView() : this.props.closeChatView();
  }

  getComponent(key) {
    const element = this.props.children;
    const needFilter = typeof element === "object" && element.length;
    return needFilter
      ? element.filter(function(comp) {
          return comp && comp.key === key;
        })
      : element.key === key
        ? element
        : null;
  }

  render() {
    return (
      <InternalLayout leftWidth={"52%"}>
        <SFormContainer fullY key={"leftSide"}>
          {this.getComponent("leftSide")}
        </SFormContainer>
        <Container fullY key={"rightSide"}>
          {this.getComponent("rightSide")}
        </Container>
      </InternalLayout>
    );
  }
}

PostLayout.propTypes = {
  example: PropTypes.bool
};

const mapStateToProps = state => {
  const { sideBarStatus, isMobile } = state;
  return {
    showSidebar: sideBarStatus ? sideBarStatus.status : false,
    isMobile: isMobile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: status => dispatch(toggleSideBar(status)),
    closeChatView: () => dispatch(closeChatView()),
    openChatView: () => dispatch(openChatView())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLayout);
