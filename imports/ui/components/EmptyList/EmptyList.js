import React from "react";
import PropTypes from "prop-types";
import { Container } from "btech-layout";
import styled from "styled-components";
import { toggleSideBar } from "../../actions/SideBarActions";
import { connect } from "react-redux";

const SMainContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STitle = styled(Container)`
  font-size: 28px;
  font-family: Helvetica Neue LT Std;
  color: #ababab;
  line-height: 30px;
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
    props.toggleSideBar && props.toggleSideBar(!props.addSidebarIsOpen);
  };

  return (
    <SMainContainer>
      <Container textCenter>
        <STitle>No {props.entityName}</STitle>
        <STitle>To Show</STitle>
        <SSubTitle mt={"10px"}>
          Feel free to{" "}
          <STitleAction onClick={() => onAddToggle()}>create</STitleAction> your
        </SSubTitle>
        <SSubTitle>first one...</SSubTitle>
      </Container>
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
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: status => dispatch(toggleSideBar(status, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyList);
