import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import { HButtom, HButtonGroup, HNavItem } from "btech-horizantal-navbar";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import { connect } from "react-redux";
import { setFilterEntity, toggleSideBar } from "../../actions/SideBarActions";
import NavbarUserButton from "../NavbarUserButton/NavbarUserButton";
import services from "../LoginModal/service.constant";
import posed from "react-pose";
import Authorization from "../../services/authorization";

const SAddMaterialIcon = styled.span`
  > i {
    line-height: 30px;
    font-size: 1.2rem;

    ${mixins.media.desktop`     
      line-height: 55px;
    `};
  }
`;

const SLoginTitle = styled.div`
  font-family: ${props => props.theme.texts.title.fontFamily};
  font-size: 13px;
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
const Group = props => {
  // some logic
  return (
    <Container>
      <Container hide mdShow>
        <HButtonGroup rows={[1, 2, 1]} gap={8} rowGap={-2}>
          {props.children}
        </HButtonGroup>
      </Container>
      <Container mdHide inLine>
        {props.title ? (
          <Container>
            <SLoginTitle>{props.title}</SLoginTitle>
          </Container>
        ) : null}
        <Layout mdHide colGap={"24px"} templateColumns={props.children.length}>
          {props.children}
        </Layout>
      </Container>
    </Container>
  );
};

const GroupSocial = props => {
  return (
    <Container mdHide inLine>
      {props.title ? (
        <Container>
          <SLoginTitle>{props.title}</SLoginTitle>
        </Container>
      ) : null}
      <Layout mdHide colGap={"24px"} templateColumns={props.children.length}>
        {props.children}
      </Layout>
    </Container>
  );
};

const GroupContainer = posed.div({
  showUserOptions: {
    staggerChildren: 100
  },
  hideUserOptions: {
    staggerChildren: 100
  }
});

const RenderCondition = posed.div({
  showUserOptions: { opacity: 1, y: "0", scale: 1 },
  hideUserOptions: { opacity: 0, y: "50px", scale: 0 }
});

const RenderSocialCondition = posed.div({
  hideUserOptions: { opacity: 1, y: "0", scale: 1 },
  showUserOptions: { opacity: 0, y: "50px", scale: 0 }
});

class UserNavbarSection extends React.Component {
  constructor(props) {
    super(props);
    this.size = { width: 46, height: 53 };
    this.notSize = { width: 33, height: 39 };
    this.loginSize = { width: 28, height: 33 };
    this.loginServices = services.filter(element => element.visible);
    this.state = {};
  }

  onAddToggle() {
    this.props.toggleSideBar(!this.props.addSidebarIsOpen, true);
    this.props.callback && this.props.callback(false);
  }

  processAuthRequest(service) {
    Authorization.login(service);
  }

  onUserToggle() {
    this.props.toggleSideBar(
      !this.props.profileSideBarIsOpen,
      false,
      !this.props.profileSideBarIsOpen
    );
    this.props.callback && this.props.callback(false);
  }

  render() {
    const isAuthenticated = this.props.curUser;
    return (
      <Layout
        customTemplateRows={"1fr auto"}
        fullY
        textCenter
        className={"center nav-profile"}
      >
        <Container />
        <Container paddingY={"10px"} paddingT={"0px"}>
          <Layout rowGap="15px">
            <GroupContainer
              pose={isAuthenticated ? "showUserOptions" : "hideUserOptions"}
            >
              <GroupSocial
                authenticated={isAuthenticated}
                title={!isAuthenticated ? "Login" : null}
              >
                {this.loginServices.map((service, index) => {
                  return (
                    <RenderSocialCondition key={index}>
                      <HButtom
                        size={this.loginSize}
                        onClick={() => this.processAuthRequest(service.service)}
                      >
                        <SAddMaterialIcon>
                          <MaterialIcon
                            type={service.label || service.service}
                          />
                        </SAddMaterialIcon>
                      </HButtom>
                    </RenderSocialCondition>
                  );
                })}
              </GroupSocial>
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
                    icon={{ size: 35, src: "/images/nav/messages.svg" }}
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
                    icon={{ size: 35, src: "/images/nav/notifications.svg" }}
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
                  <Container onClick={() => this.onUserToggle()}>
                    <NavbarUserButton size={this.size} />
                  </Container>
                </RenderCondition>
              </Group>
            </GroupContainer>
          </Layout>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd,
    profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, isAdd, profile) =>
      dispatch(toggleSideBar(status, isAdd, profile)),
    setFilterEntity: entityType => dispatch(setFilterEntity(entityType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNavbarSection);
