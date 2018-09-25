import React, { Component } from "react";
import { Layout, Container, mixins } from "btech-layout";
import { withRouter } from "react-router-dom";
import Styled from "styled-components";

import HNavbar from "./HNavbar";
import HomeButton from "./HomeButton";
import UserNavbarSection from "./UserNavbarSection";
import navs from "./nav.constant";
import posed from "react-pose/lib/index";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";

const SNavBarContainerStyled = Styled(Container)`
    z-index: 15;
//    hack for pose
   ${mixins.media.desktop`margin-top:0px!important;transform:none!important;`}
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

  openNavbar(isOpen){
    this.setState({ isOpen});
    this.props.onOpenNavbar&&this.props.onOpenNavbar(isOpen)
  }

  toggleNavbar=()=>{
    const isOpen=!this.state.isOpen;
    this.openNavbar(isOpen)
  }

  componentDidMount(){
    this.routeListen = this.props.history.listen((location, action) => {
      this.openNavbar(false)
      if(document.body.offsetWidth<993)
        this.props.closeSideBar();

    });
  }
  componentWillUnmount(){
    this.routeListen && this.routeListen();
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
            <HomeButton
              onOpenNavbar={this.toggleNavbar}
            />
          </Layout>
          <UserNavbarSection key={"footer"} curUser={this.props.curUser} callback={(value)=>this.openNavbar(value)}/>
        </HNavbar>
      </SNavBarContainer>
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
    closeSideBar: () => dispatch(toggleSideBar(false, false))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withRouter(Navbar));