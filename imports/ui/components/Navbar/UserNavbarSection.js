import React from "react";
import { Meteor } from "meteor/meteor";
import { Layout, Container } from "btech-layout";
import { HButtonGroup, HButtom } from "btech-horizantal-navbar";
import { theme } from "../../theme";
import SideBarLink from "./SideBarLink";
import { ThemeProvider } from "styled-components";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class UserNavbarSection extends React.Component {
  constructor(props) {
    super(props);
    this.policy = Meteor.settings.public.policyUrl;
  }

  render() {
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
              <HButtom
                big
                image={
                  "https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png"
                }
              />
              <HButtom>a</HButtom>
              <HButtom>a</HButtom>
              <HButtom big primary>
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
