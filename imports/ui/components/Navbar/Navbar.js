import React, { Component } from "react";
import { Container, Layout, mixins } from "btech-layout";
import { withRouter } from "react-router-dom";
import Styled from "styled-components";
import HNavbar from "./HNavbar";
import HNavBarButtons from "./HNavBarButtons";
import UserNavbarSection from "./UserNavbarSection";
import navs from "./nav.constant";
import posed from "react-pose/lib/index";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";

const SNavBarContainerStyled = Styled(Container)`
   z-index: 15;
   
   ${mixins.media.desktop`
    margin-top:0px !important;
    transform:none !important;
   `}
`;

const SNavBarContainer = posed(SNavBarContainerStyled)({
  open: {
    y: "-100%",
    marginTop: "121px",
    staggerChildren: 100,
    transition: {
      ease: "circOut" //circOut
    }
  },
  close: {
    y: "0%",
    marginTop: "0px",
    staggerChildren: 100,
    transition: {
      ease: "circOut" //circOut
    }
  }
});

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class Navbar extends Component {
  activeEval = item => {
    return item.link === "/"
      ? this.props.location.pathname === "/"
      : this.props.location.pathname.startsWith(item.link);
  };

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  openNavbar(isOpen) {
    this.setState({ isOpen });
    this.props.onOpenNavbar && this.props.onOpenNavbar(isOpen);
  }

  toggleNavbar = () => {
    const isOpen = !this.state.isOpen;
    this.openNavbar(isOpen);
  };

  onAddToggle() {
    this.props.toggleSideBar(!this.props.addSidebarIsOpen, true, false);
    this.openNavbar(false);
  }

  componentDidMount() {
    this.routeListen = this.props.history.listen((location, action) => {
      this.openNavbar(false);
      if (document.body.offsetWidth < 993) this.props.closeSideBar();
    });
  }

  componentWillUnmount() {
    this.routeListen && this.routeListen();
  }

  onUserToggle() {
    this.props.toggleSideBar(
      !this.props.profileSideBarIsOpen,
      false,
      !this.props.profileSideBarIsOpen
    );
    this.openNavbar(false);
  }

  onNotificationToggle() {
    this.props.toggleSideBar(
      !this.props.notificationsSideBarIsOpen,
      false,
      false,
      !this.props.notificationsSideBarIsOpen
    );
    this.openNavbar(false);
  }

  render() {
    let activeLink = -1;
    navs.some((item, index) => {
      if (this.activeEval(item)) {
        activeLink = index;
        return true;
      }
    });
    return (
      <SNavBarContainer
        fullY
        gridArea="Navbar"
        height="100vh"
        mdHeight="inherit"
        pose={this.state.isOpen ? "open" : "close"}
      >
        <HNavbar
          mdRowGap={10}
          activeLink={activeLink}
          isShow={this.props.isShow}
          links={navs}
          activeEval={this.activeEval}
          itemOptions={{ title: { hide: true, mdShow: true } }}
        >
          <Layout key={"header"} mdMarginY={"30px"} lgMarginY={"30px"}>
            <HNavBarButtons
              isOpen={this.state.isOpen}
              onToggleNavBar={this.toggleNavbar}
              onAddToggle={() => this.onAddToggle()}
              onUserToggle={() => this.onUserToggle()}
              onNotificationToggle={() => this.onNotificationToggle()}
              curUser={this.props.curUser}
            />
          </Layout>
          <UserNavbarSection
            key={"footer"}
            curUser={this.props.curUser}
            callback={value => this.openNavbar(value)}
          />
        </HNavbar>
      </SNavBarContainer>
    );
  }
}

const mapStateToProps = state => {
  const { sideBarStatus, sideBarEntity } = state;
  return {
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd,
    filterEntityType: sideBarEntity ? sideBarEntity.entityType : null,
    profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile,
    notificationsSideBarIsOpen:
      sideBarStatus.status && sideBarStatus.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSideBar: () => dispatch(toggleSideBar(false, false, false)),
    toggleSideBar: (status, isAdd, profile, notifications) =>
      dispatch(toggleSideBar(status, isAdd, profile, notifications))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
