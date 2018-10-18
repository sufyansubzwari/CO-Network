import React from "react";
import PropTypes from "prop-types";
import { Container, mixins } from "btech-layout";
import styled from "styled-components";
import { toggleSideBar } from "../../actions/SideBarActions";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

const SMainContainer = styled.div`
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const STitle = styled(Container)`
  font-size: 24px;
  font-family: Helvetica Neue LT Std;
  color: #ababab;
  line-height: 30px;

  ${mixins.media.desktop`
    font-size: 28px;
  `};
`;

const SSubTitle = styled(Container)`
  font-size: 14px;
  color: #ababab;
`;

const STitleAction = styled.span`
  color: ${props => props.theme.color.primary};
  cursor: pointer;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EmptyList
 */
const EmptyList = function(props) {
  const onAddToggle = () => {
    props.toggleSideBar && props.toggleSideBar(!props.addSidebarIsOpen, true);
  };

  const onUserToggle = () => {
      props.toggleSideBar(
          !props.profileSideBarIsOpen,
          false,
          !props.profileSideBarIsOpen
      );
  }

  const handleText = () => {
      if(props.curUser && props.curUser._id)
        return (
            <Container textCenter>
                <STitle>No {props.entityName}</STitle>
                <STitle>To Show</STitle>
                <SSubTitle mt={{ md: "10px" }}>
                    Feel free to{" "}
                    <STitleAction onClick={() => onAddToggle()}>create</STitleAction> your
                </SSubTitle>
                <SSubTitle>first one...</SSubTitle>
            </Container>
        );
      else
        return (
            <Container textCenter>
                <STitle>No {props.entityName}</STitle>
                <STitle>To Show</STitle>
                <SSubTitle>Sorry you're not logged in yet</SSubTitle>
                <SSubTitle mt={{ md: "10px" }}>
                    Want to fix it?, Just click{" "}
                    <STitleAction onClick={() => onUserToggle()}>here</STitleAction>
                </SSubTitle>
            </Container>
        )
  }

  return (
    <SMainContainer>
        {handleText()}
    </SMainContainer>
  );
};

EmptyList.defaultProps = {};

EmptyList.propTypes = {
  entityName: PropTypes.string
};

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd,
    profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, isAdd, profile, notifications, messages) => dispatch(toggleSideBar(status, isAdd, profile, notifications, messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyList);
