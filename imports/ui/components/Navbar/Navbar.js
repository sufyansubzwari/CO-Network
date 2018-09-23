import React, { Component } from "react";
import { Layout, Container, mixins } from "btech-layout";
import { withRouter } from "react-router-dom";
import Styled from "styled-components";

import HNavbar from "./HNavbar";
import HomeButton from "./HomeButton";
import UserNavbarSection from "./UserNavbarSection";
import navs from "./nav.constant";
import posed from "react-pose/lib/index";

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
              onOpenNavbar={() => this.setState({ isOpen: !this.state.isOpen })}
            />
          </Layout>
          <UserNavbarSection key={"footer"} curUser={this.props.curUser} />
        </HNavbar>
      </SNavBarContainer>
    );
  }
}

export default withRouter(Navbar);
