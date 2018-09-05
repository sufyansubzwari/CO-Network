import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { HNavbar, HNavItem } from "btech-horizantal-navbar";
import navs from "./nav.constant";
import { theme } from "../../theme";
// todo

class MainLayout extends Component {
  render() {
    return (
      <Layout
        customTemplateColumns={"1fr"}
        customTemplateRows={"1fr 80px"}
        mdCustomTemplateColumns={"100px 1fr"}
        mdCustomTemplateRows={"1fr"}
        layoutAreas={{ xs: `'content' 'navBar'`, md: `'navBar content'` }}
        fullWY
      >
        <Container fullY gridArea="navBar">
          <HNavbar
            mdRowGap={15}
            links={navs}
            activeEval={this.activeEval}
            itemOptions={{ title: { hide: true, mdShow: true } }}
          >
            <Layout
              key={"header"}
              mb={"35px"}
              mt={"35px"}
            >
              <Container ml={"-8px"}>
                <HNavItem
                  icon={{ size: 60, src: "/images/logo/home.gif" }}
                  activeEval={this.activeEval}
                  hideHexagon
                />
              </Container>
            </Layout>

            <Layout
              customTemplateRows={"1fr auto"}
              fullY
              textCenter
              className={"center nav-profile"}
              key={"footer"}
            >
              <Container />
              <Container>
                <Layout rowGap="15px">
                  <span> M</span>
                  <span> N</span>
                  <Layout
                    rowGap="5px"
                    padding="0 20px 20px;"
                    className={"center terms"}
                  >
                    {/*<a>Terms Policies </a>*/}
                    {/*<a> CONetwork © 2018 </a>*/}
                  </Layout>
                </Layout>
              </Container>
            </Layout>
          </HNavbar>
        </Container>
        <Container gridArea="content" />
      </Layout>
    );
  }
}
export default MainLayout;
