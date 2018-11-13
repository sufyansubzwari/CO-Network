import React from "react";
import { Link } from "react-router-dom";
import { Container } from "btech-layout";
import Styled from "styled-components";
import ReactSVG from "react-svg";
import { HIcon } from "btech-horizantal-navbar";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";

const HomeContainer = Styled.div`
    padding: 1px;
    border-radius: 50%;
    margin-top: -32px;
    display: inline-block;
    background: white;
    
    img{
      border-radius: 50%;
    }
`;

const HomeCurveBorder = Styled(ReactSVG)`
    position: absolute;
    top: -22px;
    left: 50%;
    margin-left: -43px;
`;

const SHomeButton = Styled(Container)`
    cursor: pointer;
`;

const border = {
  bottom: { size: 1, color: "#d4d3d7" }
};

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
const HomeButton = function(props) {
  const onUserToggle = () => {
    props.toggleSideBar(
      !props.profileSideBarIsOpen,
      false,
      !props.profileSideBarIsOpen
    );
  };

  return (
    <Container ml={{ xs: 0, sm: 0, md: 4, lg: 4 }} textCenter>
      <SHomeButton hide mdShow onClick={() => onUserToggle()}>
        <HIcon size={60} src={"/images/logo/home.gif"} centerSize={30} />
      </SHomeButton>
      <Container mdHide>
        <Container inLine>
          <HomeCurveBorder src={"/images/home-border.svg"} />
          <HomeContainer>
            <HIcon
              size={60}
              src={"/images/logo/home.gif"}
              centerSize={30}
              onClick={() => props.onOpenNavbar && props.onOpenNavbar()}
            />
          </HomeContainer>
          <Container border={border} width={"41px"} margin={"20px auto"} />
        </Container>
      </Container>
    </Container>
  );
};

const mapStateToProps = state => {
  const { sideBarStatus, sideBarEntity } = state;
  return {
    profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSideBar: () => dispatch(toggleSideBar(false, false, false)),
    toggleSideBar: (status, isAdd, profile, notifications, messages) =>
      dispatch(toggleSideBar(status, isAdd, profile, notifications, messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeButton);
