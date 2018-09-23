import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InternalLayout from "../InternalLayout/InternalLayout";
import { Container } from "btech-layout";
import { toggleSideBar } from "../../actions/SideBarActions";

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
        <Container fullY key={"leftSide"}>
          {this.getComponent("leftSide")}
        </Container>
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
  const { sideBarStatus } = state;
  return {
    showSidebar: sideBarStatus ? sideBarStatus.status : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: status => dispatch(toggleSideBar(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLayout);
