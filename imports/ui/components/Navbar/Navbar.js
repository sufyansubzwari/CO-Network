import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { withRouter } from "react-router-dom";
import Styled from "styled-components";
import {
  HNavbar,
  HNavItem,
  HButtonGroup,
  HButtom
} from "btech-horizantal-navbar";
import UserNavbarSection from "./UserNavbarSection";
import navs from "./nav.constant";

const SNavBarContainer = Styled(Container)`
    z-index: 1;
`;

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
  }

  render() {
    return (
      <SNavBarContainer fullY gridArea="Navbar" background={"white"}>
        <HNavbar
          mdRowGap={10}
          links={navs}
          activeEval={this.activeEval}
          itemOptions={{ title: { hide: true, mdShow: true } }}
        >
          <Layout key={"header"} mdMarginY={"30px"} lgMarginY={"30px"}>
            <Container ml={{ xs: 0, sm: 0, md: -8, lg: -8 }}>
              <HNavItem
                link={"/"}
                icon={{ size: 60, src: "/images/logo/home.gif" }}
                activeEval={this.activeEval}
                hideHexagon
              />
            </Container>
          </Layout>
          <UserNavbarSection key={"footer"} curUser={this.props.curUser} />
        </HNavbar>
      </SNavBarContainer>
    );
  }
}

export default withRouter(Navbar);
