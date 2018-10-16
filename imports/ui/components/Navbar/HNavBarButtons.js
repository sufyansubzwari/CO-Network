import React from "react";
import PropTypes from "prop-types";
import { Container, Layout, mixins } from "btech-layout";
import HomeButton from "./HomeButton";
import styled from "styled-components";
import NavbarUserButton from "../NavbarUserButton/NavbarUserButton";
import { HButtom, HNavItem } from "btech-horizantal-navbar";
import MaterialIcon from "react-material-iconic-font";

const SContainerIcon = styled(Container)`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  display: initial;
  opacity: ${props => (props.isActive ? "1" : "0.3")};
  text-align: center;

  ${mixins.media.desktop`
     display: none;
 `};
`;

const SIconContainer = styled.span`
  i {
    font-size: 24px;
    line-height: 45px;
  }
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the HNavbarButtons
 */
const HNavBarButtons = function(props) {
  const size = { width: 38, height: 45 };
  const notSize = { width: 30, height: 34 };
  const witOutUser = !props.curUser;
  return (
    <Container paddingX={"15px"}>
      <Layout mdHide colGap={"24px"} templateColumns={5} mdTemplateColumns={1}>
        <SContainerIcon isActive={!witOutUser}>
          <Container hide={props.isOpen}>
            <HButtom
              primary={!witOutUser}
              size={size}
              onClick={() => {
                if (witOutUser) props.onToggleNavBar && props.onToggleNavBar();
                else props.onAddToggle && props.onAddToggle();
              }}
            >
              <SIconContainer>
                <MaterialIcon type={"plus"} />
              </SIconContainer>
            </HButtom>
          </Container>
        </SContainerIcon>
        <SContainerIcon isActive={!witOutUser}>
          <Container
            hide={props.isOpen}
            onClick={() => {
              if (witOutUser) props.onToggleNavBar && props.onToggleNavBar();
              else props.onMessageToggle && props.onMessageToggle();
            }}
          >
            <HNavItem
              mt={{ xs: "5px", md: "0" }}
              size={notSize}
              icon={{ size: 35, src: "/images/nav/messages.svg" }}
              number={{
                top: "-5px",
                right: "-5px",
                value: props.messages || 0,
                primary: true,
                size: { width: 22, height: 24 }
              }}
            />
          </Container>
        </SContainerIcon>
        <HomeButton
          onOpenNavbar={() => props.onToggleNavBar && props.onToggleNavBar()}
        />
        <SContainerIcon isActive={!witOutUser}>
          <Container
            hide={props.isOpen}
            onClick={() => {
              if (witOutUser) props.onToggleNavBar && props.onToggleNavBar();
              else props.onNotificationToggle && props.onNotificationToggle();
            }}
          >
            <HNavItem
              mt={{ xs: "5px", md: "0" }}
              size={notSize}
              icon={{ size: 35, src: "/images/nav/notifications.svg" }}
              number={{
                top: "-5px",
                right: "-5px",
                value: props.notifications || 0,
                primary: true,
                size: { width: 22, height: 24 }
              }}
            />
          </Container>
        </SContainerIcon>
        <SContainerIcon isActive={!witOutUser}>
          <Container
            hide={props.isOpen}
            onClick={() => {
              if (witOutUser) props.onToggleNavBar && props.onToggleNavBar();
              else props.onUserToggle && props.onUserToggle();
            }}
          >
            <NavbarUserButton size={size} isMobile={props.isMobile} />
          </Container>
        </SContainerIcon>
      </Layout>
    </Container>
  );
};

HNavBarButtons.defaultProps = {
  isOpen: false
};

HNavBarButtons.propTypes = {
  onToggleNavBar: PropTypes.func,
  onAddToggle: PropTypes.func,
  onUserToggle: PropTypes.func,
  onMessageToggle: PropTypes.func,
  onNotificationToggle: PropTypes.func,
  curUser: PropTypes.object,
  isOpen: PropTypes.bool,
  counts: PropTypes.object
};

export default HNavBarButtons;
