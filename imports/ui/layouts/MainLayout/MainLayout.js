import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { HNavbar, HNavItem , HButtonGroup,HButtom} from "btech-horizantal-navbar";
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
                  <HButtonGroup rows={[1,2,1]} gap={8} rowGap={-2}>
                    <HButtom big image={"https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png"}></HButtom>
                    <HButtom>a</HButtom>
                    <HButtom>a</HButtom>
                    <HButtom big primary>a</HButtom>
                  </HButtonGroup>
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
