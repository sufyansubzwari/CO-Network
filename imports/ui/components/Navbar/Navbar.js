import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import {
  HNavbar,
  HNavItem,
  HButtonGroup,
  HButtom
} from "btech-horizantal-navbar";
import UserNavbarSection from "./UserNavbarSection";
import navs from "./nav.constant";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fullY gridArea="Navbar">
        <HNavbar
          mdRowGap={10}
          links={navs}
          activeEval={this.activeEval}
          itemOptions={{ title: { hide: true, mdShow: true } }}
        >
          <Layout key={"header"} mb={"30px"} mt={"35px"}>
            <Container ml={"-8px"}>
              <HNavItem
                icon={{ size: 60, src: "/images/logo/home.gif" }}
                activeEval={this.activeEval}
                hideHexagon
              />
            </Container>
          </Layout>
          <UserNavbarSection key={"footer"} />
        </HNavbar>
      </Container>
    );
  }
}

export default Navbar;
