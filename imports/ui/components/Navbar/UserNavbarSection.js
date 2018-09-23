import React from "react";
import { Meteor } from "meteor/meteor";
import { Layout, Container } from "btech-layout";
import { HButtonGroup, HButtom, HNavItem } from "btech-horizantal-navbar";
import MaterialIcon from "react-material-iconic-font";
import { theme } from "../../theme";
import SideBarLink from "./SideBarLink";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";
import styled from "styled-components";
import LogoutBtn from "../smart/auth/logout-btn";
import NavbarUserButton from "../NavbarUserButton/NavbarUserButton";
import posed from "react-pose";

const SAddMaterialIcon = styled.span`
  > i {
    line-height: 55px;
  }
`;
/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
const Group = (props) => {
  // some logic
  return (
    <Container>
      <Container hide mdShow>
        <HButtonGroup rows={[1, 2, 1]} gap={8} rowGap={-2}>
          {props.children}
        </HButtonGroup>
      </Container>
      <Container mdHide inLine>
        <Layout mdHide colGap={"24px"} templateColumns={props.children.length}>
          {props.children}
        </Layout>
      </Container>
    </Container>
  );
};

const GroupContainer = posed.div({
  showUserOptions: {
    staggerChildren: 100,
  },
  hideUserOptions: {
    staggerChildren: 100
  }
});

const RenderCondition = posed.div({
  showUserOptions: { opacity: 1, y: "0" , scale : 1},
  hideUserOptions: { opacity: 0, y: "50px", scale : 0}
});

// const RenderCondition = props => {
//   return props.condition ? props.children : "";
// };

class UserNavbarSection extends React.Component {
  constructor(props) {
    super(props);
    this.policy = Meteor.settings.public.policyUrl;
    this.size = { width: 46, height: 53 };
    this.notSize = { width: 33, height: 39 };
    this.isOpenCreateSidebar = false;
  }

  onAddToggle() {
    this.props.toggleSideBar(!this.props.addSidebarIsOpen);
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
            <GroupContainer
              pose={isAuthenticated ? "showUserOptions" : "hideUserOptions"}
            >
              <Group authenticated={isAuthenticated}>
                <RenderCondition>
                  <HButtom
                    primary
                    size={this.size}
                    onClick={() => this.onAddToggle()}
                  >
                    <SAddMaterialIcon>
                      <MaterialIcon type={"plus"} size={2} />
                    </SAddMaterialIcon>
                  </HButtom>
                </RenderCondition>
                <RenderCondition>
                  <HNavItem
                    mt={{ xs: "5px", md: "0" }}
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
                </RenderCondition>
                <RenderCondition>
                  <HNavItem
                    mt={{ xs: "5px", md: "0" }}
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
                </RenderCondition>
                <Link to={avatarLink}>
                  <NavbarUserButton size={this.size} />
                </Link>
              </Group>
            </GroupContainer>
            <Layout
              rowGap="5px"
              padding="0 20px 20px;"
              className={"center terms"}
            >
              <ThemeProvider theme={theme}>
                <Layout rowGap="10px">
                  <LogoutBtn />
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

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: status => dispatch(toggleSideBar(status, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNavbarSection);
