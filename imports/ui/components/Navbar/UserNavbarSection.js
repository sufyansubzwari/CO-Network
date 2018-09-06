import React from "react";
import { Meteor } from "meteor/meteor";
import { Layout, Container } from "btech-layout";
import { HButtonGroup, HButtom, HNavItem } from "btech-horizantal-navbar";
import { theme } from "../../theme";
import SideBarLink from "./SideBarLink";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class UserNavbarSection extends React.Component {
  constructor(props) {
    super(props);
    this.policy = Meteor.settings.public.policyUrl;
    this.size = { width: 46, height: 53 };
    this.notSize = { width: 33, height: 39 };
  }

  render() {
    const isAuthenticated = this.props.curUser;
    const avatarLink = isAuthenticated ? "/profile" : "/";
    return (
      <Layout
        customTemplateRows={"1fr auto"}
        fullY
        textCenter
        className={"center nav-profile"}
      >
        <Container />
        <Container>
          <Layout rowGap="15px">
            <HButtonGroup rows={[1, 2, 1]} gap={8} rowGap={-2}>
              <Link to={avatarLink}>
                <HButtom
                  image={
                    "https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png"
                  }
                  size={this.size}
                />
              </Link>
              <HNavItem
                size={this.notSize}
                icon={{ size: 20, src: "/images/logo/home.gif" }}
                number={{
                  top: "-5px",
                  right: "-5px",
                  value: Math.floor(Math.random() * 120),
                  primary: true,
                  size: { width: 22, height: 24 }
                }}
                activeEval={this.activeEval}
              />
              <HNavItem
                size={this.notSize}
                icon={{ size: 20, src: "/images/logo/home.gif" }}
                number={{
                  top: "-5px",
                  right: "-5px",
                  value: Math.floor(Math.random() * 120),
                  primary: true,
                  size: { width: 22, height: 24 }
                }}
                activeEval={this.activeEval}
              />
              <HButtom primary size={this.size}>
                a
              </HButtom>
            </HButtonGroup>
            <Layout
              rowGap="5px"
              padding="0 20px 20px;"
              className={"center terms"}
            >
              <ThemeProvider theme={theme}>
                <Layout rowGap="10px">
                  <SideBarLink href={this.policy}> Terms Policies </SideBarLink>
                  <SideBarLink> CONetwork © 2018 </SideBarLink>
                </Layout>
              </ThemeProvider>
            </Layout>
          </Layout>
        </Container>
      </Layout>
    );
  }
}

export default UserNavbarSection;
