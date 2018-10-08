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
  text-align: center;

  ${mixins.media.desktop`
     display: none;
 `};
`;

const SIconContainer = styled.span`
  i {
    font-size: 18px;
    line-height: 38px;
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
  const hideIcons = props.isOpen || !props.curUser;
  return (
    <Container paddingX={"15px"}>
      <Layout mdHide colGap={"24px"} templateColumns={5} mdTemplateColumns={1}>
        <SContainerIcon>
          <Container hide={hideIcons}>
            <HButtom
              primary
              size={this.size}
              onClick={() => props.onAddToggle && props.onAddToggle()}
            >
              <SIconContainer>
                <MaterialIcon type={"plus"} />
              </SIconContainer>
            </HButtom>
          </Container>
        </SContainerIcon>
        <SContainerIcon>
          <Container
            hide={hideIcons}
            onClick={() =>
              props.onMessageToggle && props.onMessageToggle()
            }
          >
            <HNavItem
              mt={{ xs: "5px", md: "0" }}
              size={notSize}
              icon={{ size: 35, src: "/images/nav/messages.svg" }}
              number={{
                top: "-5px",
                right: "-5px",
                value: Math.floor(Math.random() * 120),
                primary: true,
                size: { width: 22, height: 24 }
              }}
            />
          </Container>
        </SContainerIcon>
        <HomeButton
          onOpenNavbar={() => props.onToggleNavBar && props.onToggleNavBar()}
        />
        <SContainerIcon>
          <Container
            hide={hideIcons}
            onClick={() =>
              props.onNotificationToggle && props.onNotificationToggle()
            }
          >
            <HNavItem
              mt={{ xs: "5px", md: "0" }}
              size={notSize}
              icon={{ size: 35, src: "/images/nav/notifications.svg" }}
              number={{
                top: "-5px",
                right: "-5px",
                value: Math.floor(Math.random() * 120),
                primary: true,
                size: { width: 22, height: 24 }
              }}
            />
          </Container>
        </SContainerIcon>
        <SContainerIcon>
          <Container
            hide={hideIcons}
            onClick={() => props.onUserToggle && props.onUserToggle()}
          >
            <NavbarUserButton size={size} />
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
  isOpen: PropTypes.bool
};

export default HNavBarButtons;
